import type express from "express";
import fs from "fs";
import path from "path";
import multer from "multer";
import crypto from "crypto";
import { config } from "../config";

interface GalleryItem {
  id: string;
  file_url: string;
  thumbnail_url: string;
  media_type: "image" | "video";
  original_name: string;
  file_size: number;
  uploader_token_hash: string;
  created_at: string;
  likes: number;
  comments: number;
}

const dbPath = path.join(config.rootDir, "gallery_db.json");

const defaultItems: GalleryItem[] = [
  {
    id: "seed_1",
    file_url: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1200&q=80",
    thumbnail_url: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=400&q=80",
    media_type: "image",
    original_name: "krabi-emerald-pool.jpg",
    file_size: 102400,
    uploader_token_hash: "seed_hash_1",
    created_at: new Date(Date.now() - 4 * 3600000).toISOString(),
    likes: 42,
    comments: 5,
  },
  {
    id: "seed_2",
    file_url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    thumbnail_url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80",
    media_type: "image",
    original_name: "sunset-party.jpg",
    file_size: 204800,
    uploader_token_hash: "seed_hash_2",
    created_at: new Date(Date.now() - 3 * 3600000).toISOString(),
    likes: 89,
    comments: 12,
  },
  {
    id: "seed_3",
    file_url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
    thumbnail_url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=400&q=80",
    media_type: "image",
    original_name: "krabi-resort.jpg",
    file_size: 153600,
    uploader_token_hash: "seed_hash_3",
    created_at: new Date(Date.now() - 2 * 3600000).toISOString(),
    likes: 15,
    comments: 2,
  },
  {
    id: "seed_4",
    file_url: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
    thumbnail_url: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&q=80",
    media_type: "image",
    original_name: "island-hopping.jpg",
    file_size: 512000,
    uploader_token_hash: "seed_hash_4",
    created_at: new Date(Date.now() - 1 * 3600000).toISOString(),
    likes: 56,
    comments: 8,
  },
];

function getDBItems(): GalleryItem[] {
  try {
    if (!fs.existsSync(dbPath)) {
      fs.writeFileSync(dbPath, JSON.stringify(defaultItems, null, 2), "utf8");
      return defaultItems;
    }
    const data = fs.readFileSync(dbPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Gallery database read error, recovering with defaults:", error);
    return defaultItems;
  }
}

function saveDBItems(items: GalleryItem[]) {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(items, null, 2), "utf8");
  } catch (error) {
    console.error("Gallery database save error:", error);
  }
}

const uploadLimits = new Map<string, { count: number; firstUploadTime: number }>();

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

function validateMagicMimeType(filePath: string, expectedMime: string): boolean {
  try {
    const buffer = Buffer.alloc(8);
    const fd = fs.openSync(filePath, "r");
    fs.readSync(fd, buffer, 0, 8, 0);
    fs.closeSync(fd);

    const hex = buffer.toString("hex").toUpperCase();

    if (expectedMime.startsWith("image/")) {
      if (hex.startsWith("FFD8FF")) return true;
      if (hex.startsWith("89504E470D0A1A0A")) return true;
      if (hex.startsWith("52494646") && hex.substring(16, 24) === "57454250") return true;
      if (hex.startsWith("474946383761") || hex.startsWith("474946383961")) return true;
    } else if (expectedMime.startsWith("video/")) {
      const checkRange = buffer.toString("ascii", 4, 8);
      if (checkRange === "ftyp" || hex.startsWith("000000")) return true;
      if (hex.startsWith("1A45DFA3")) return true;
    }
    return true;
  } catch {
    return false;
  }
}

function hasAdminSession(req: express.Request) {
  const adminSessionToken = req.signedCookies.admin_session;
  if (!adminSessionToken) {
    return false;
  }

  const parts = adminSessionToken.split(".");
  if (parts.length !== 2) {
    return false;
  }

  const [sessionVal, signature] = parts;
  const expectedSignature = crypto
    .createHmac("sha256", config.sessionSecret)
    .update(sessionVal)
    .digest("hex");

  return signature === expectedSignature && sessionVal === "active_admin";
}

export function registerLegacyGalleryRoutes(app: express.Express, uploadsDir: string) {
  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, uploadsDir);
    },
    filename: (_req, file, cb) => {
      const fileId = crypto.randomUUID();
      const ext = path.extname(file.originalname).toLowerCase();
      cb(null, `${fileId}${ext}`);
    },
  });

  const upload = multer({
    storage,
    limits: {
      fileSize: 100 * 1024 * 1024,
    },
  });

  app.get("/api/gallery", (_req, res) => {
    const items = getDBItems();
    const sorted = [...items].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    res.json(sorted);
  });

  app.post("/api/gallery/upload", rateLimitMiddleware, upload.single("file"), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "未检测到有效的文件" });
      }

      const uploaderId = (req.body.uploaderId as string) || "";
      if (!uploaderId.trim()) {
        fs.unlinkSync(req.file.path);
        return res.status(400).json({ error: "需要携带合法的匿名识别符(uploaderId)" });
      }

      const mimetype = req.file.mimetype.toLowerCase();
      const originalName = req.file.originalname;
      const fileSize = req.file.size;
      const fileExtension = path.extname(originalName).toLowerCase();

      const isImage =
        ["image/jpeg", "image/png", "image/webp", "image/gif"].includes(mimetype) ||
        [".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(fileExtension);
      const isVideo =
        ["video/mp4", "video/quicktime", "video/webm", "video/x-matroska"].includes(mimetype) ||
        [".mp4", ".mov", ".webm", ".mkv"].includes(fileExtension);

      if (!isImage && !isVideo) {
        fs.unlinkSync(req.file.path);
        return res.status(400).json({ error: "只允许上传常见的图片格式 (jpg/png/webp) 或视频格式 (mp4/mov/webm)" });
      }

      if (isImage && fileSize > 10 * 1024 * 1024) {
        fs.unlinkSync(req.file.path);
        return res.status(400).json({ error: "图片文件大小不能超过 10MB" });
      }
      if (isVideo && fileSize > 100 * 1024 * 1024) {
        fs.unlinkSync(req.file.path);
        return res.status(400).json({ error: "视频文件大小不能超过 100MB" });
      }

      const mimeToCheck = isImage ? "image/jpeg" : "video/mp4";
      if (!validateMagicMimeType(req.file.path, mimeToCheck)) {
        fs.unlinkSync(req.file.path);
        return res.status(400).json({ error: "安全校验失败：上传的文件内容与其属性或扩展名不符" });
      }

      const uploaderTokenHash = crypto.createHash("sha256").update(uploaderId).digest("hex");

      let thumbnail_url = "";
      const base64Thumbnail = req.body.thumbnail as string;
      const itemId = path.basename(req.file.filename, fileExtension);
      const media_type = isImage ? "image" : ("video" as "image" | "video");
      const file_url = `/uploads/${req.file.filename}`;

      if (base64Thumbnail && base64Thumbnail.startsWith("data:image/")) {
        try {
          const thumbData = base64Thumbnail.replace(/^data:image\/\w+;base64,/, "");
          const thumbBuffer = Buffer.from(thumbData, "base64");
          const thumbFilename = `thumb_${itemId}.jpg`;
          const thumbFilePath = path.join(uploadsDir, thumbFilename);

          fs.writeFileSync(thumbFilePath, thumbBuffer);
          thumbnail_url = `/uploads/${thumbFilename}`;
        } catch (error) {
          console.error("Failed to decode client thumb:", error);
          thumbnail_url = file_url;
        }
      } else {
        thumbnail_url = file_url;
      }

      const newRecord: GalleryItem = {
        id: itemId,
        file_url,
        thumbnail_url,
        media_type,
        original_name: originalName,
        file_size: fileSize,
        uploader_token_hash: uploaderTokenHash,
        created_at: new Date().toISOString(),
        likes: 0,
        comments: 0,
      };

      const items = getDBItems();
      items.unshift(newRecord);
      saveDBItems(items);

      return res.json(newRecord);
    } catch (error) {
      console.error("Server upload handler exception:", error);
      return res.status(500).json({ error: "服务端发生异常" });
    }
  });

  app.delete("/api/gallery/:id", (req, res) => {
    try {
      const fileId = req.params.id;
      const items = getDBItems();
      const itemIndex = items.findIndex((item) => item.id === fileId);

      if (itemIndex === -1) {
        return res.status(404).json({ error: "未找到指定的照片或视频" });
      }

      const currentItem = items[itemIndex];
      const isAdmin = hasAdminSession(req);

      if (!isAdmin) {
        const uploaderId = (req.query.uploaderId as string) || "";
        if (!uploaderId.trim()) {
          return res.status(403).json({ error: "拒绝删除：无凭证无法安全验证上传者" });
        }

        const clientHash = crypto.createHash("sha256").update(uploaderId).digest("hex");
        if (clientHash !== currentItem.uploader_token_hash) {
          return res.status(403).json({ error: "你只能删除自己上传的内容" });
        }
      }

      const normalizePath = (pUrl: string) => {
        if (pUrl.startsWith("/uploads/")) {
          return path.join(uploadsDir, pUrl.replace("/uploads/", ""));
        }
        return "";
      };

      const filePathOnDisk = normalizePath(currentItem.file_url);
      const thumbPathOnDisk = normalizePath(currentItem.thumbnail_url);

      if (filePathOnDisk && fs.existsSync(filePathOnDisk)) {
        try {
          fs.unlinkSync(filePathOnDisk);
        } catch (error) {
          console.error("Disk file unlink error:", error);
        }
      }

      if (thumbPathOnDisk && thumbPathOnDisk !== filePathOnDisk && fs.existsSync(thumbPathOnDisk)) {
        try {
          fs.unlinkSync(thumbPathOnDisk);
        } catch (error) {
          console.error("Thumb file unlink error:", error);
        }
      }

      items.splice(itemIndex, 1);
      saveDBItems(items);

      return res.json({ success: true, message: "删除成功！" });
    } catch (error) {
      console.error("Delete exception occurred:", error);
      return res.status(500).json({ error: "服务器内部错误，删除失败" });
    }
  });

  app.post("/api/gallery/admin/login", (req, res) => {
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ error: "密码不能为空" });
    }

    if (password !== config.adminPassword) {
      return res.status(401).json({ error: "密码输入错误" });
    }

    const baseValue = "active_admin";
    const signature = crypto
      .createHmac("sha256", config.sessionSecret)
      .update(baseValue)
      .digest("hex");
    const signedSession = `${baseValue}.${signature}`;

    res.cookie("admin_session", signedSession, {
      httpOnly: true,
      signed: true,
      maxAge: 7 * 24 * 3600000,
      sameSite: "lax",
      path: "/",
    });

    return res.json({ success: true, admin: true });
  });

  app.get("/api/gallery/admin-status", (req, res) => {
    res.json({ isAdmin: hasAdminSession(req) });
  });

  app.post("/api/gallery/admin/logout", (_req, res) => {
    res.clearCookie("admin_session", { path: "/" });
    res.json({ success: true, admin: false });
  });
}
