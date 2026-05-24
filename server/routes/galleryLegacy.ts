import type express from "express";
import { config } from "../config";
import {
  createAdminSession,
  isAdminPasswordValid,
  isAdminSessionValid,
  revokeAdminSession,
} from "../services/authService";
import {
  createGalleryMedia,
  deleteGalleryMedia,
  listGalleryMedia,
} from "../services/galleryService";
import {
  createGalleryUploader,
  finalizeUploadedGalleryFile,
  removeFileIfExists,
} from "../services/uploadService";

const uploadLimits = new Map<string, { count: number; firstUploadTime: number }>();

function getOwnerToken(req: express.Request): string {
  const headerToken = req.header("X-Owner-Token");
  if (headerToken?.trim()) {
    return headerToken.trim();
  }

  const bodyToken = typeof req.body?.uploaderId === "string" ? req.body.uploaderId : "";
  if (bodyToken.trim()) {
    return bodyToken.trim();
  }

  const queryToken = typeof req.query.uploaderId === "string" ? req.query.uploaderId : "";
  return queryToken.trim();
}

function getSignedAdminToken(req: express.Request): string | undefined {
  const token = req.signedCookies.admin_session;
  return typeof token === "string" ? token : undefined;
}

function hasAdminSession(req: express.Request) {
  return isAdminSessionValid(getSignedAdminToken(req));
}

function rateLimitMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
  const ip = (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress || "unknown_ip";
  const now = Date.now();
  const limitWindow = 60000;
  const maxUploadsPerWindow = 10;

  const limitData = uploadLimits.get(ip);
  if (!limitData) {
    uploadLimits.set(ip, { count: 1, firstUploadTime: now });
    return next();
  }

  if (now - limitData.firstUploadTime < limitWindow) {
    if (limitData.count >= maxUploadsPerWindow) {
      return res.status(429).json({ error: "上传过于频繁，请稍后再试" });
    }
    limitData.count += 1;
    uploadLimits.set(ip, limitData);
  } else {
    uploadLimits.set(ip, { count: 1, firstUploadTime: now });
  }
  return next();
}

export function registerLegacyGalleryRoutes(app: express.Express, uploadsDir: string) {
  const upload = createGalleryUploader(uploadsDir);

  app.get("/api/gallery", (req, res) => {
    res.json(listGalleryMedia(getOwnerToken(req)));
  });

  app.post("/api/gallery/upload", rateLimitMiddleware, (req, res) => {
    upload.single("file")(req, res, (uploadError: unknown) => {
      if (uploadError) {
        const message = uploadError instanceof Error ? uploadError.message : "上传失败";
        return res.status(400).json({ error: message });
      }

      if (!req.file) {
        return res.status(400).json({ error: "未检测到有效的文件" });
      }

      const ownerToken = getOwnerToken(req);
      if (!ownerToken) {
        removeFileIfExists(req.file.path);
        return res.status(400).json({ error: "需要携带合法的匿名识别符" });
      }

      const finalized = finalizeUploadedGalleryFile(req.file, req.body?.thumbnail, uploadsDir);
      if (finalized.ok === false) {
        return res.status(400).json({ error: finalized.error });
      }

      try {
        return res.json(createGalleryMedia(finalized.file, ownerToken));
      } catch (error) {
        removeFileIfExists(finalized.file.filePath);
        removeFileIfExists(finalized.file.thumbnailPath);
        console.error("Server upload handler exception:", error);
        return res.status(500).json({ error: "服务端发生异常" });
      }
    });
  });

  app.delete("/api/gallery/:id", (req, res) => {
    const result = deleteGalleryMedia(req.params.id, {
      ownerToken: getOwnerToken(req),
      isAdmin: hasAdminSession(req),
    });

    if ("error" in result) {
      return res.status(result.status).json({ error: result.error });
    }

    return res.json({ success: true, message: "删除成功！" });
  });

  app.post("/api/gallery/admin/login", (req, res) => {
    const password = typeof req.body?.password === "string" ? req.body.password : "";
    if (!password) {
      return res.status(400).json({ error: "密码不能为空" });
    }

    if (!isAdminPasswordValid(password)) {
      return res.status(401).json({ error: "密码输入错误" });
    }

    const session = createAdminSession();
    res.cookie("admin_session", session.token, {
      httpOnly: true,
      signed: true,
      maxAge: session.maxAgeMs,
      sameSite: "lax",
      path: "/",
    });

    return res.json({ success: true, admin: true });
  });

  app.get("/api/gallery/admin-status", (req, res) => {
    res.json({ isAdmin: hasAdminSession(req) });
  });

  app.post("/api/gallery/admin/logout", (req, res) => {
    revokeAdminSession(getSignedAdminToken(req));
    res.clearCookie("admin_session", { path: "/" });
    res.json({ success: true, admin: false });
  });

  if (config.nodeEnv === "production" && !config.adminPassword) {
    console.warn("[gallery] ADMIN_PASSWORD is not configured; admin login will be disabled.");
  }
}
