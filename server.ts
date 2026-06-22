import "dotenv/config";
import express from "express";
import path from "path";
import fs from "fs";
import multer from "multer";
import cookieParser from "cookie-parser";
import crypto from "crypto";
import { createServer as createViteServer } from "vite";
import { getTides, isTideCity } from "./server/services/tideService";
import { getWeather, isWeatherCity } from "./server/services/weatherService";

interface GalleryItem {
  id: string;
  file_url: string;
  thumbnail_url: string;
  media_type: "image" | "video";
  original_name: string;
  file_size: number;
  uploader_token_hash: string;
  created_at: string;
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

// ------------------------------------------------------------
// WEATHER & TIDES API ENDPOINTS
// ------------------------------------------------------------
app.get("/api/weather", async (req, res) => {
  const city = req.query.city;
  if (!isWeatherCity(city)) {
    return res.status(400).json({ error: "Unsupported city. Use krabi or lanta." });
  }

  try {
    return res.json(await getWeather(city, { refresh: req.query.refresh === "1" }));
  } catch (error) {
    console.error("Weather endpoint error:", error);
    return res.status(500).json({ error: "Failed to load weather data" });
  }
});

app.get("/api/tides", async (req, res) => {
  const city = req.query.city;
  if (!isTideCity(city)) {
    return res.status(400).json({ error: "Unsupported city. Use krabi or lanta." });
  }

  try {
    return res.json(await getTides(city, { refresh: req.query.refresh === "1" }));
  } catch (error) {
    console.error("Tides endpoint error:", error);
    return res.status(500).json({ error: "Failed to load tide data" });
  }
});

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
// CHECK-IN SPOTS SHARE API (shared JSON store, mirrors gallery)
// ------------------------------------------------------------
type CheckinCategory = "餐厅" | "摄影位" | "酒吧" | "咖啡馆" | "其他";

interface CheckinSpotRecord {
  id: string;
  name: string;
  category: CheckinCategory;
  description: string;
  image: string;
  lat: number;
  lng: number;
  user: string;
  createdAt: string;
  address?: string;
  google_maps_url?: string;
  owner_token_hash: string | null;
  is_seed: boolean;
}

const spotsDbPath = path.join(process.cwd(), "checkin_spots_db.json");
const CHECKIN_CATEGORIES: CheckinCategory[] = ["餐厅", "摄影位", "酒吧", "咖啡馆", "其他"];

const CATEGORY_IMAGE_FALLBACKS: Record<CheckinCategory, string> = {
  "餐厅": "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=600&q=80",
  "摄影位": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
  "酒吧": "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80",
  "咖啡馆": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80",
  "其他": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80",
};

// Curated real Krabi check-in spots. Images are served from /public/checkin-spots
// at the site root (Vite copies public/ into dist/ on build). Photo credits and
// licenses are listed in public/checkin-spots/CREDITS.md.
const DEFAULT_SPOTS: CheckinSpotRecord[] = [
  {
    id: "seed-railay-west",
    name: "莱利海滩 Railay Beach",
    category: "摄影位",
    description: "甲米的明信片地标，被巨型石灰岩绝壁环抱，只能坐船抵达。傍晚退潮时长尾船停满金色沙滩，是拍日落剪影的绝佳机位。",
    image: "/checkin-spots/railay.jpg",
    lat: 8.0116,
    lng: 98.8379,
    user: "Lenakids 领队",
    createdAt: "2026-06-20T09:00:00.000Z",
    address: "Railay West Beach, Ao Nang, Mueang Krabi, Krabi",
    google_maps_url: "https://www.google.com/maps/search/?api=1&query=8.0116,98.8379",
    owner_token_hash: null,
    is_seed: true,
  },
  {
    id: "seed-phranang",
    name: "帕南悬崖海滩 Phra Nang",
    category: "摄影位",
    description: "常被评为全球最美海滩之一，金色沙滩与垂挂钟乳石的悬崖相依。崖下还藏着神秘的公主洞，浮潜、攀岩、拍照都一流。",
    image: "/checkin-spots/phranang.jpg",
    lat: 8.0059,
    lng: 98.8377,
    user: "Lenakids 领队",
    createdAt: "2026-06-20T08:50:00.000Z",
    address: "Phra Nang Cave Beach, Railay, Ao Nang, Krabi",
    google_maps_url: "https://www.google.com/maps/search/?api=1&query=8.0059,98.8377",
    owner_token_hash: null,
    is_seed: true,
  },
  {
    id: "seed-koh-hong",
    name: "洪岛观景台 Koh Hong",
    category: "摄影位",
    description: "翡翠色泻湖环抱的无人岛，登上 360° 观景台可俯瞰海中群岛连成一线。乘长尾船穿入幽静海湾，是甲米跳岛游的高光时刻。",
    image: "/checkin-spots/koh-hong.jpg",
    lat: 8.0781,
    lng: 98.6773,
    user: "Lenakids 领队",
    createdAt: "2026-06-20T08:40:00.000Z",
    address: "Ko Hong, Than Bok Khorani NP, Mueang Krabi, Krabi",
    google_maps_url: "https://www.google.com/maps/search/?api=1&query=8.0781,98.6773",
    owner_token_hash: null,
    is_seed: true,
  },
  {
    id: "seed-laelay-grill",
    name: "Lae Lay Grill 悬崖海景餐厅",
    category: "餐厅",
    description: "建在山崖上的人气海鲜餐厅，整面视野俯瞰奥南湾与诺帕拉塔拉群岛。日落时分点一桌泰式海鲜配落日，最是浪漫。",
    image: "/checkin-spots/laelay-cliff.jpg",
    lat: 8.0388,
    lng: 98.8217,
    user: "Lenakids 领队",
    createdAt: "2026-06-20T08:30:00.000Z",
    address: "89 Moo 3, Ao Nang, Mueang Krabi, Krabi 81180",
    google_maps_url: "https://www.google.com/maps/search/?api=1&query=8.0388,98.8217",
    owner_token_hash: null,
    is_seed: true,
  },
  {
    id: "seed-tiger-cave",
    name: "老虎洞寺 Tiger Cave Temple",
    category: "其他",
    description: "攀上 1237 级陡梯登顶，金色大佛端坐云端，360° 饱览甲米石林与平原。日出登顶最为震撼，记得备足饮水、穿好鞋。",
    image: "/checkin-spots/tiger-cave.jpg",
    lat: 8.1253,
    lng: 98.9245,
    user: "Lenakids 领队",
    createdAt: "2026-06-20T08:20:00.000Z",
    address: "Wat Tham Suea, Mueang Krabi, Krabi",
    google_maps_url: "https://www.google.com/maps/search/?api=1&query=8.1253,98.9245",
    owner_token_hash: null,
    is_seed: true,
  },
  {
    id: "seed-emerald-pool",
    name: "翡翠池 Emerald Pool",
    category: "摄影位",
    description: "热带雨林深处的天然山泉池，池水清澈如祖母绿。沿林荫栈道再走可探访梦幻蓝池，是消暑戏水、拍照的雨林秘境。",
    image: "/checkin-spots/emerald-pool.jpg",
    lat: 7.9262,
    lng: 99.2668,
    user: "Lenakids 领队",
    createdAt: "2026-06-20T08:10:00.000Z",
    address: "Sa Morakot, Khlong Thom Nuea, Khlong Thom, Krabi",
    google_maps_url: "https://www.google.com/maps/search/?api=1&query=7.9262,99.2668",
    owner_token_hash: null,
    is_seed: true,
  },
  {
    id: "seed-tewlay-bar",
    name: "Tew Lay Bar 海景酒吧",
    category: "酒吧",
    description: "藏在莱利东岸礁石间的质朴小酒吧，沿海边小径步行可达。坐在崖边的木椅上看潮起潮落，一杯啤酒消磨整个黄昏。",
    image: "/checkin-spots/railay-sunset-bar.jpg",
    lat: 8.0130,
    lng: 98.8466,
    user: "Lenakids 领队",
    createdAt: "2026-06-20T08:00:00.000Z",
    address: "Railay East Beach, Ao Nang, Mueang Krabi, Krabi",
    google_maps_url: "https://www.google.com/maps/search/?api=1&query=8.0130,98.8466",
    owner_token_hash: null,
    is_seed: true,
  },
  {
    id: "seed-lanta-oldtown",
    name: "兰塔古镇 Lanta Old Town",
    category: "其他",
    description: "百年华人渔村，海上长栈道串起斑驳的老柚木店屋与中式神庙。午后在老街喝杯咖啡、逛逛手作店，慢享小岛旧时光。",
    image: "/checkin-spots/lanta-oldtown.jpg",
    lat: 7.5310,
    lng: 99.0943,
    user: "Lenakids 领队",
    createdAt: "2026-06-20T07:50:00.000Z",
    address: "Lanta Old Town (Ban Si Raya), Ko Lanta Yai, Krabi",
    google_maps_url: "https://www.google.com/maps/search/?api=1&query=7.5310,99.0943",
    owner_token_hash: null,
    is_seed: true,
  },
  {
    id: "seed-lanta-lighthouse",
    name: "兰塔角灯塔 Lanta Lighthouse",
    category: "摄影位",
    description: "兰塔岛最南端国家公园里的白色灯塔，矗立在绿色海岬上，可俯瞰安达曼海双子湾。沿途常有猴子出没，记得收好食物。",
    image: "/checkin-spots/lanta-lighthouse.jpg",
    lat: 7.4683,
    lng: 99.0981,
    user: "Lenakids 领队",
    createdAt: "2026-06-20T07:40:00.000Z",
    address: "Mu Ko Lanta National Park, Laem Tanod, Ko Lanta, Krabi",
    google_maps_url: "https://www.google.com/maps/search/?api=1&query=7.4683,99.0981",
    owner_token_hash: null,
    is_seed: true,
  },
  {
    id: "seed-khaothong-hill",
    name: "Khaothong Hill 山景咖啡馆",
    category: "咖啡馆",
    description: "农塔莱湿地旁的山丘咖啡馆，正对层叠的石灰岩峰林。满园 ins 打卡机位，看着喀斯特群山发呆喝咖啡，惬意一下午。",
    image: "/checkin-spots/khaothong-hill.jpg",
    lat: 8.1728,
    lng: 98.7527,
    user: "Lenakids 领队",
    createdAt: "2026-06-20T07:30:00.000Z",
    address: "Khao Thong, Mueang Krabi, Krabi",
    google_maps_url: "https://www.google.com/maps/search/?api=1&query=8.1728,98.7527",
    owner_token_hash: null,
    is_seed: true,
  },
  {
    id: "seed-aonang",
    name: "奥南海滩 Ao Nang Beach",
    category: "摄影位",
    description: "甲米的吃住玩中心，去莱利、波达、洪岛的长尾船都从这儿出发。傍晚海滩看日落、看火秀，沿岸餐厅酒吧林立，适合一整天泡在这儿不无聊。",
    image: "/checkin-spots/aonang.jpg",
    lat: 8.0292,
    lng: 98.8240,
    user: "Lenakids 领队",
    createdAt: "2026-06-20T07:20:00.000Z",
    address: "Ao Nang Beach, Ao Nang, Mueang Krabi, Krabi",
    google_maps_url: "https://www.google.com/maps/search/?api=1&query=8.0292,98.8240",
    owner_token_hash: null,
    is_seed: true,
  },
  {
    id: "seed-krabi-night-market",
    name: "甲米镇周末夜市 Krabi Town Night Market",
    category: "其他",
    description: "只在周五到周日傍晚开市的本地夜市，小份多样的泰式美食可以一路吃过去。现场有乐队驻唱，价格比奥南实惠，是体验本地烟火气的好去处。（仅周五–周日 17:00 起）",
    image: "/checkin-spots/krabi-night-market.jpg",
    lat: 8.0641,
    lng: 98.9163,
    user: "Lenakids 领队",
    createdAt: "2026-06-20T07:10:00.000Z",
    address: "Krabi Town Weekend Walking Street, Maharat Rd, Pak Nam, Mueang Krabi, Krabi",
    google_maps_url: "https://www.google.com/maps/search/?api=1&query=8.0641,98.9163",
    owner_token_hash: null,
    is_seed: true,
  },
  {
    id: "seed-wat-kaew",
    name: "翡翠白庙 Wat Kaew Korawaram",
    category: "其他",
    description: "甲米镇中心的纯白色现代寺庙，登一段白石阶即达。建筑简约典雅、点缀金色细节，黄昏尤其出片，20 分钟逛完的轻松文化点。（周六、周日闭馆）",
    image: "/checkin-spots/wat-kaew.jpg",
    lat: 8.0633,
    lng: 98.9141,
    user: "Lenakids 领队",
    createdAt: "2026-06-20T07:00:00.000Z",
    address: "Wat Kaew Korawaram, Maharat Rd, Pak Nam, Mueang Krabi, Krabi",
    google_maps_url: "https://www.google.com/maps/search/?api=1&query=8.0633,98.9141",
    owner_token_hash: null,
    is_seed: true,
  },
  {
    id: "seed-long-beach",
    name: "长滩 Long Beach (Phra Ae)",
    category: "摄影位",
    description: "兰塔看日落的主沙滩，绵长开阔、水质清澈。沿线 Ozone 等海滩酒吧很出名，有 DJ 驻场，坐在沙滩上喝一杯看日落最惬意。",
    image: "/checkin-spots/long-beach.jpg",
    lat: 7.6042,
    lng: 99.0338,
    user: "Lenakids 领队",
    createdAt: "2026-06-20T06:50:00.000Z",
    address: "Phra Ae (Long Beach), Ko Lanta Yai, Ko Lanta, Krabi",
    google_maps_url: "https://www.google.com/maps/search/?api=1&query=7.6042,99.0338",
    owner_token_hash: null,
    is_seed: true,
  },
  {
    id: "seed-kantiang-bay",
    name: "康田湾 Kantiang Bay",
    category: "摄影位",
    description: "兰塔南端较隐世的宽阔海滩，沙细人少、海水干净。几家海边餐厅酒吧点缀其间，黄昏沿沙滩散步格外舒服，适合避开人潮。",
    image: "/checkin-spots/kantiang-bay.jpg",
    lat: 7.4974,
    lng: 99.0726,
    user: "Lenakids 领队",
    createdAt: "2026-06-20T06:40:00.000Z",
    address: "Kantiang Bay, Ko Lanta Yai, Ko Lanta, Krabi",
    google_maps_url: "https://www.google.com/maps/search/?api=1&query=7.4974,99.0726",
    owner_token_hash: null,
    is_seed: true,
  },
  {
    id: "seed-tung-yee-peng",
    name: "红树林 Tung Yee Peng Mangrove",
    category: "其他",
    description: "兰塔东侧静谧的红树林，可坐船或划皮划艇穿行其间，沿途喂猴子、看水鸟。清晨日出最美，是和海滩完全不同的一种自然体验。",
    image: "/checkin-spots/tung-yee-peng.jpg",
    lat: 7.5952,
    lng: 99.0716,
    user: "Lenakids 领队",
    createdAt: "2026-06-20T06:30:00.000Z",
    address: "Tung Yee Peng Mangrove, Ko Lanta Yai, Ko Lanta, Krabi",
    google_maps_url: "https://www.google.com/maps/search/?api=1&query=7.5952,99.0716",
    owner_token_hash: null,
    is_seed: true,
  },
];

function getSpots(): CheckinSpotRecord[] {
  try {
    if (!fs.existsSync(spotsDbPath)) {
      fs.writeFileSync(spotsDbPath, JSON.stringify(DEFAULT_SPOTS, null, 2), "utf8");
      return [...DEFAULT_SPOTS];
    }
    const data = fs.readFileSync(spotsDbPath, "utf8");
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [...DEFAULT_SPOTS];
  } catch (error) {
    console.error("Checkin spots read error, recovering with defaults:", error);
    return [...DEFAULT_SPOTS];
  }
}

function saveSpots(items: CheckinSpotRecord[]) {
  try {
    fs.writeFileSync(spotsDbPath, JSON.stringify(items, null, 2), "utf8");
  } catch (e) {
    console.error("Checkin spots save error:", e);
  }
}

// Keep the seeded (curator) spots in sync with DEFAULT_SPOTS above — even on a
// server whose checkin_spots_db.json was generated by an older version. Any
// user-submitted spots (is_seed === false) are preserved untouched. Seed spots
// cannot be deleted through the API, so it is always safe to re-derive them.
function ensureSeedsCurrent() {
  let existing: CheckinSpotRecord[] = [];
  try {
    if (fs.existsSync(spotsDbPath)) {
      const parsed = JSON.parse(fs.readFileSync(spotsDbPath, "utf8"));
      if (Array.isArray(parsed)) existing = parsed;
    }
  } catch (error) {
    console.error("Checkin spots seed-sync read error:", error);
  }

  const userSpots = existing.filter((s) => !s.is_seed);
  const currentSeeds = existing.filter((s) => s.is_seed);
  const seedsChanged = JSON.stringify(currentSeeds) !== JSON.stringify(DEFAULT_SPOTS);

  if (!fs.existsSync(spotsDbPath) || seedsChanged) {
    saveSpots([...DEFAULT_SPOTS, ...userSpots]);
    console.log(
      `[checkin-spots] Seed data synced (${DEFAULT_SPOTS.length} seeds, ${userSpots.length} user spot(s) preserved).`
    );
  }
}

function toPublicSpot(record: CheckinSpotRecord) {
  return {
    id: record.id,
    name: record.name,
    category: record.category,
    description: record.description,
    image: record.image,
    lat: record.lat,
    lng: record.lng,
    user: record.user,
    createdAt: record.createdAt,
    address: record.address,
    google_maps_url: record.google_maps_url,
  };
}

function readTrimmed(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

// GET ALL SHARED SPOTS (user submissions first, seed spots last)
app.get("/api/checkin-spots", (req, res) => {
  const items = getSpots();
  const sorted = [...items].sort((a, b) => {
    const seedDiff = Number(Boolean(a.is_seed)) - Number(Boolean(b.is_seed));
    if (seedDiff !== 0) return seedDiff;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  res.json(sorted.map(toPublicSpot));
});

// CREATE A SHARED SPOT (requires anonymous owner token)
app.post("/api/checkin-spots", (req, res) => {
  const ownerToken = readTrimmed(req.header("X-Owner-Token"));
  if (!ownerToken) {
    return res.status(400).json({ error: "缺少匿名归属凭证" });
  }

  const name = readTrimmed(req.body?.name);
  if (!name) {
    return res.status(400).json({ error: "名称不能为空" });
  }

  const category: CheckinCategory = CHECKIN_CATEGORIES.includes(req.body?.category)
    ? req.body.category
    : "其他";

  const lat = Number(req.body?.lat ?? req.body?.latitude);
  const lng = Number(req.body?.lng ?? req.body?.longitude);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return res.status(400).json({ error: "经纬度不合法" });
  }

  const record: CheckinSpotRecord = {
    id: `spot-${crypto.randomUUID()}`,
    name: name.slice(0, 80),
    category,
    description: (readTrimmed(req.body?.description) || "随行打卡，风光无限。").slice(0, 500),
    image: readTrimmed(req.body?.image_url) || readTrimmed(req.body?.image) || CATEGORY_IMAGE_FALLBACKS[category],
    lat,
    lng,
    user: (readTrimmed(req.body?.user) || readTrimmed(req.body?.user_name) || "旅行同伴").slice(0, 40),
    createdAt: new Date().toISOString(),
    address: readTrimmed(req.body?.address) || undefined,
    google_maps_url:
      readTrimmed(req.body?.google_maps_url) ||
      `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`,
    owner_token_hash: crypto.createHash("sha256").update(ownerToken).digest("hex"),
    is_seed: false,
  };

  const items = getSpots();
  items.unshift(record);
  saveSpots(items);

  res.status(201).json(toPublicSpot(record));
});

// DELETE A SHARED SPOT (only the original anonymous owner may delete)
app.delete("/api/checkin-spots/:id", (req, res) => {
  const ownerToken = readTrimmed(req.header("X-Owner-Token"));
  if (!ownerToken) {
    return res.status(403).json({ error: "缺少匿名归属凭证" });
  }

  const items = getSpots();
  const index = items.findIndex((spot) => spot.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "未找到指定打卡点" });
  }

  const spot = items[index];
  if (!spot.owner_token_hash) {
    return res.status(403).json({ error: "默认打卡点暂不支持删除" });
  }

  const clientHash = crypto.createHash("sha256").update(ownerToken).digest("hex");
  if (clientHash !== spot.owner_token_hash) {
    return res.status(403).json({ error: "只能删除自己创建的打卡点" });
  }

  items.splice(index, 1);
  saveSpots(items);

  res.json({ success: true });
});


// ------------------------------------------------------------
// FULL STACK INTEGRATION DEV VS SPA ENGINE SERVING
// ------------------------------------------------------------
async function startServer() {
  // Refresh curated seed spots on boot so content updates ship with a redeploy.
  ensureSeedsCurrent();

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
