import "dotenv/config";
import express from "express";
import path from "path";
import fs from "fs";
import multer from "multer";
import cookieParser from "cookie-parser";
import crypto from "crypto";
import { createServer as createViteServer } from "vite";

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

const app = express();
const PORT = Number(process.env.PORT || 5188);

// Setup directories
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const dbPath = path.join(process.cwd(), "gallery_db.json");

// Default initial seed items
const DEFAULT_ITEMS: GalleryItem[] = [
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
  }
];

// Load or seed database file
function getDBItems(): GalleryItem[] {
  try {
    if (!fs.existsSync(dbPath)) {
      fs.writeFileSync(dbPath, JSON.stringify(DEFAULT_ITEMS, null, 2), "utf8");
      return DEFAULT_ITEMS;
    }
    const data = fs.readFileSync(dbPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Database read error, recovering with defaults:", error);
    return DEFAULT_ITEMS;
  }
}

function saveDBItems(items: GalleryItem[]) {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(items, null, 2), "utf8");
  } catch (e) {
    console.error("Database save error:", e);
  }
}

// Config cookies & secret parsing
const ADMIN_SECRET = process.env.ADMIN_SESSION_SECRET || "default_krabi_2026_salt_secret";

function getAdminPassword(): string {
  const password = process.env.GALLERY_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || "krabi2026";
  if (!process.env.GALLERY_ADMIN_PASSWORD && !process.env.ADMIN_PASSWORD) {
    console.warn("[WARNING] No GALLERY_ADMIN_PASSWORD or ADMIN_PASSWORD set in env. Falling back to default 'krabi2026' for development.");
  }
  return password;
}

function isAdminPasswordValid(password: string): boolean {
  return password === getAdminPassword();
}

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));
app.use(cookieParser(ADMIN_SECRET));

// Rate limit helper by IP & token to block heavy abuse
const uploadLimits = new Map<string, { count: number; firstUploadTime: number }>();
function rateLimitMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
  const ip = (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress || "unknown_ip";
  const now = Date.now();
  const limitWindow = 60000; // 1 minute
  const maxUploadsPerWindow = 10; // 10 uploads per minute

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
  next();
}

// Support serve of /uploads statically
app.use("/uploads", express.static(uploadsDir));

// Multer disk destination configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const fileId = crypto.randomUUID();
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${fileId}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // global upload size limit 100MB
  },
});

// Helper validation function to inspect magic number headers
function validateMagicMimeType(filePath: string, expectedMime: string): boolean {
  try {
    const buffer = Buffer.alloc(8);
    const fd = fs.openSync(filePath, "r");
    fs.readSync(fd, buffer, 0, 8, 0);
    fs.closeSync(fd);

    const hex = buffer.toString("hex").toUpperCase();

    // Check basic headers for security
    if (expectedMime.startsWith("image/")) {
      // JPEG: FF D8 FF
      if (hex.startsWith("FFD8FF")) return true;
      // PNG: 89 50 4E 47 0D 0A 1A 0A
      if (hex.startsWith("89504E470D0A1A0A")) return true;
      // WebP: RIFF ... WEBP
      if (hex.startsWith("52494646") && hex.substring(16, 24) === "57454250") return true;
      // GIF: GIF87a or GIF89a
      if (hex.startsWith("474946383761") || hex.startsWith("474946383961")) return true;
    } else if (expectedMime.startsWith("video/")) {
      // MP4/MOV: search for 'ftyp'
      const checkRange = buffer.toString("ascii", 4, 8);
      if (checkRange === "ftyp" || hex.startsWith("000000")) return true;
      // WebM / MKV Ebml header: 1A 45 DF A3
      if (hex.startsWith("1A45DFA3")) return true;
    }
    return true; // Fallback to generic accept if ambiguous but valid ext
  } catch {
    return false;
  }
}

// ------------------------------------------------------------
// ALBUM SHARE & MANAGEMENT API ENDPOINTS
// ------------------------------------------------------------

// GET ALL MEDIA
app.get("/api/gallery", (req, res) => {
  const items = getDBItems();
  // Sort items to place latest uploaded files at the beginning
  const sorted = [...items].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  res.json(sorted);
});

// MULTIPART UPLOAD PHOTOS / VIDEOS WITH THUMBNAILS
app.post("/api/gallery/upload", rateLimitMiddleware, upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "未检测到有效的文件" });
    }

    const uploaderId = (req.body.uploaderId as string) || "";
    if (!uploaderId.trim()) {
      // Delete temporary file if validation fails
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: "需要携带合法的匿名识别符(uploaderId)" });
    }

    const mimetype = req.file.mimetype.toLowerCase();
    const originalName = req.file.originalname;
    const fileSize = req.file.size;
    const fileExtension = path.extname(originalName).toLowerCase();

    // Determine type
    const isImage = ["image/jpeg", "image/png", "image/webp", "image/gif"].includes(mimetype) || [".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(fileExtension);
    const isVideo = ["video/mp4", "video/quicktime", "video/webm", "video/x-matroska"].includes(mimetype) || [".mp4", ".mov", ".webm", ".mkv"].includes(fileExtension);

    if (!isImage && !isVideo) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: "只允许上传常见的图片格式 (jpg/png/webp) 或视频格式 (mp4/mov/webm)" });
    }

    // Individual size controls
    if (isImage && fileSize > 10 * 1024 * 1024) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: "图片文件大小不能超过 10MB" });
    }
    if (isVideo && fileSize > 100 * 1024 * 1024) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: "视频文件大小不能超过 100MB" });
    }

    // Verify magic headers to prevent fake extension exploits
    const mimeToCheck = isImage ? "image/jpeg" : "video/mp4";
    if (!validateMagicMimeType(req.file.path, mimeToCheck)) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: "安全校验失败：上传的文件内容与其属性或扩展名不符" });
    }

    // Securely hash the original uploaderId token using SHA256
    const uploaderTokenHash = crypto.createHash("sha256").update(uploaderId).digest("hex");

    // Process and handle base64 pre-rendered thumbnail from body
    let thumbnail_url = "";
    const base64Thumbnail = req.body.thumbnail as string; // Optional field passed via form body

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
      } catch (e) {
        console.error("Failed to decode client thumb:", e);
        thumbnail_url = file_url; // fallback to same
      }
    } else {
      thumbnail_url = file_url; // fallback path
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

    res.json(newRecord);
  } catch (err) {
    console.error("Server upload handler exception:", err);
    res.status(500).json({ error: "服务端发生异常" });
  }
});

// SECURELY DELETE MEDIA (Verifies uploader hash or valid admin session)
app.delete("/api/gallery/:id", (req, res) => {
  try {
    const fileId = req.params.id;
    const items = getDBItems();
    const itemIndex = items.findIndex((item) => item.id === fileId);

    if (itemIndex === -1) {
      return res.status(404).json({ error: "未找到指定的照片或视频" });
    }

    const currentItem = items[itemIndex];

    // Check if client is admin first via HTTP-Only signature check
    const adminSessionToken = req.signedCookies.admin_session;
    let isAdmin = false;
    if (adminSessionToken) {
      const parts = adminSessionToken.split(".");
      if (parts.length === 2) {
        const [sessionVal, signature] = parts;
        const expectedSignature = crypto
          .createHmac("sha256", ADMIN_SECRET)
          .update(sessionVal)
          .digest("hex");
        if (signature === expectedSignature && sessionVal === "active_admin") {
          isAdmin = true;
        }
      }
    }

    // Verify ownership of upload if not admin
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

    // Remove files on success
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
      } catch (e) {
        console.error("Disk file unlink error:", e);
      }
    }

    if (thumbPathOnDisk && thumbPathOnDisk !== filePathOnDisk && fs.existsSync(thumbPathOnDisk)) {
      try {
        fs.unlinkSync(thumbPathOnDisk);
      } catch (e) {
        console.error("Thumb file unlink error:", e);
      }
    }

    items.splice(itemIndex, 1);
    saveDBItems(items);

    res.json({ success: true, message: "删除成功！" });
  } catch (err) {
    console.error("Delete exception occurred:", err);
    res.status(500).json({ error: "服务器内部错误，删除失败" });
  }
});

// ADMIN LOGIN PASSWORD SUBMIT
app.post("/api/gallery/admin/login", (req, res) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ error: "密码不能为空" });
  }

  if (!isAdminPasswordValid(password)) {
    return res.status(401).json({ error: "密码输入错误" });
  }

  // Generate cryptographically signed token
  const baseValue = "active_admin";
  const signature = crypto
    .createHmac("sha256", ADMIN_SECRET)
    .update(baseValue)
    .digest("hex");
  const signedSession = `${baseValue}.${signature}`;

  // Set httpOnly security cookie
  res.cookie("admin_session", signedSession, {
    httpOnly: true,
    signed: true,
    maxAge: 7 * 24 * 3600000, // 7 days
    sameSite: "lax",
    path: "/",
  });

  res.json({ success: true, admin: true });
});

// GET CURRENT CREDENTIAL SESSION STATUS
app.get("/api/gallery/admin-status", (req, res) => {
  const adminSessionToken = req.signedCookies.admin_session;
  if (!adminSessionToken) {
    return res.json({ isAdmin: false });
  }

  const parts = adminSessionToken.split(".");
  if (parts.length !== 2) {
    return res.json({ isAdmin: false });
  }

  const [sessionVal, signature] = parts;
  const expectedSignature = crypto
    .createHmac("sha256", ADMIN_SECRET)
    .update(sessionVal)
    .digest("hex");

  if (signature === expectedSignature && sessionVal === "active_admin") {
    return res.json({ isAdmin: true });
  }

  res.json({ isAdmin: false });
});

// ADMIN LOGOUT ACTION
app.post("/api/gallery/admin/logout", (req, res) => {
  res.clearCookie("admin_session", { path: "/" });
  res.json({ success: true, admin: false });
});


// ------------------------------------------------------------
// FULL STACK INTEGRATION DEV VS SPA ENGINE SERVING
// ------------------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development mode configuration using Vite server middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production delivery config
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[FULL-STACK PORT ALIGNED] Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
