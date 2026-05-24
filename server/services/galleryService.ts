import fs from "fs";
import path from "path";
import crypto from "crypto";
import { config } from "../config";
import { getDb } from "../db/client";
import { hashOwnerToken, timingSafeEqualHex } from "./ownerTokenService";
import { removeFileIfExists, type UploadedFileInfo } from "./uploadService";

type MediaType = "image" | "video";

interface GalleryMediaRow {
  id: string;
  file_url: string;
  thumbnail_url: string;
  file_path: string | null;
  thumbnail_path: string | null;
  media_type: MediaType;
  mime_type: string | null;
  original_name: string;
  stored_name: string | null;
  file_size: number;
  uploader_token_hash: string;
  likes: number;
  comments: number;
  created_at: string;
  deleted_at: string | null;
}

interface LegacyGalleryItem {
  id?: string;
  file_url?: string;
  url?: string;
  thumbnail_url?: string;
  media_type?: MediaType;
  original_name?: string;
  file_size?: number;
  uploader_token_hash?: string;
  created_at?: string;
  likes?: number;
  comments?: number;
}

const legacyGalleryPath = path.join(config.rootDir, "gallery_db.json");

const defaultItems: LegacyGalleryItem[] = [
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

function sha256(value: string): string {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function toLocalPathFromUrl(url: string | null | undefined) {
  if (!url || !url.startsWith("/uploads/")) {
    return null;
  }
  return path.join(config.uploadDir, path.basename(url));
}

function toRowInput(item: LegacyGalleryItem) {
  const fileUrl = item.file_url || item.url || "";
  if (!fileUrl) {
    return null;
  }

  const id = item.id || crypto.randomUUID();
  const mediaType: MediaType = item.media_type === "video" ? "video" : "image";
  const filePath = toLocalPathFromUrl(fileUrl);

  return {
    id,
    file_url: fileUrl,
    thumbnail_url: item.thumbnail_url || fileUrl,
    file_path: filePath,
    thumbnail_path: toLocalPathFromUrl(item.thumbnail_url),
    media_type: mediaType,
    mime_type: null,
    original_name: item.original_name || `${id}.${mediaType === "image" ? "jpg" : "mp4"}`,
    stored_name: filePath ? path.basename(filePath) : null,
    file_size: Number.isFinite(item.file_size) ? Number(item.file_size) : 0,
    uploader_token_hash: item.uploader_token_hash || `legacy_${id}`,
    likes: Number.isFinite(item.likes) ? Number(item.likes) : 0,
    comments: Number.isFinite(item.comments) ? Number(item.comments) : 0,
    created_at: item.created_at || new Date().toISOString(),
  };
}

function insertLegacyItem(item: LegacyGalleryItem) {
  const row = toRowInput(item);
  if (!row) {
    return;
  }

  getDb()
    .prepare(
      `
      INSERT OR IGNORE INTO gallery_media (
        id, file_url, thumbnail_url, file_path, thumbnail_path, media_type, mime_type,
        original_name, stored_name, file_size, uploader_token_hash, likes, comments, created_at
      ) VALUES (
        @id, @file_url, @thumbnail_url, @file_path, @thumbnail_path, @media_type, @mime_type,
        @original_name, @stored_name, @file_size, @uploader_token_hash, @likes, @comments, @created_at
      )
    `
    )
    .run(row);
}

export function migrateLegacyGalleryJson() {
  if (!fs.existsSync(legacyGalleryPath)) {
    return;
  }

  try {
    const raw = fs.readFileSync(legacyGalleryPath, "utf8");
    const items = JSON.parse(raw) as LegacyGalleryItem[];
    if (!Array.isArray(items)) {
      return;
    }

    const transaction = getDb().transaction(() => {
      for (const item of items) {
        insertLegacyItem(item);
      }
    });
    transaction();
    console.log(`[gallery] Migrated ${items.length} legacy gallery rows from gallery_db.json`);
  } catch (error) {
    console.error("[gallery] Failed to migrate gallery_db.json:", error);
  }
}

export function ensureDefaultGalleryMedia() {
  const count = getDb().prepare("SELECT COUNT(*) AS count FROM gallery_media").get() as { count: number };
  if (count.count > 0) {
    return;
  }

  const transaction = getDb().transaction(() => {
    for (const item of defaultItems) {
      insertLegacyItem(item);
    }
  });
  transaction();
}

function isOwnedByToken(row: GalleryMediaRow, ownerToken: string) {
  if (!ownerToken || !row.uploader_token_hash || row.uploader_token_hash.startsWith("seed_")) {
    return false;
  }

  const hmacHash = hashOwnerToken(ownerToken);
  if (timingSafeEqualHex(hmacHash, row.uploader_token_hash)) {
    return true;
  }

  // Backward compatibility for old JSON rows that stored plain SHA-256 of uploaderId.
  const legacyHash = sha256(ownerToken);
  return timingSafeEqualHex(legacyHash, row.uploader_token_hash);
}

function toPublicMedia(row: GalleryMediaRow, ownerToken = "") {
  const isOwner = isOwnedByToken(row, ownerToken);
  return {
    id: row.id,
    file_url: row.file_url,
    thumbnail_url: row.thumbnail_url || row.file_url,
    media_type: row.media_type || "image",
    original_name: row.original_name || "team-gallery-media",
    file_size: row.file_size || 0,
    uploader_token_hash: isOwner ? sha256(ownerToken) : row.uploader_token_hash,
    created_at: row.created_at,
    likes: row.likes || 0,
    comments: row.comments || 0,
    url: row.file_url,
    category: "all",
  };
}

export function listGalleryMedia(ownerToken = "") {
  const rows = getDb()
    .prepare(
      `
      SELECT * FROM gallery_media
      WHERE deleted_at IS NULL
      ORDER BY datetime(created_at) DESC
    `
    )
    .all() as GalleryMediaRow[];

  return rows.map((row) => toPublicMedia(row, ownerToken));
}

export function createGalleryMedia(file: UploadedFileInfo, ownerToken: string) {
  const now = new Date().toISOString();
  const row = {
    id: file.id,
    file_url: file.fileUrl,
    thumbnail_url: file.thumbnailUrl,
    file_path: file.filePath,
    thumbnail_path: file.thumbnailPath,
    media_type: file.mediaType,
    mime_type: file.mimeType,
    original_name: file.originalName,
    stored_name: file.storedName,
    file_size: file.fileSize,
    uploader_token_hash: hashOwnerToken(ownerToken),
    likes: 0,
    comments: 0,
    created_at: now,
  };

  getDb()
    .prepare(
      `
      INSERT INTO gallery_media (
        id, file_url, thumbnail_url, file_path, thumbnail_path, media_type, mime_type,
        original_name, stored_name, file_size, uploader_token_hash, likes, comments, created_at
      ) VALUES (
        @id, @file_url, @thumbnail_url, @file_path, @thumbnail_path, @media_type, @mime_type,
        @original_name, @stored_name, @file_size, @uploader_token_hash, @likes, @comments, @created_at
      )
    `
    )
    .run(row);

  return toPublicMedia({ ...row, deleted_at: null }, ownerToken);
}

function getGalleryMediaById(id: string) {
  return getDb()
    .prepare(
      `
      SELECT * FROM gallery_media
      WHERE id = ? AND deleted_at IS NULL
    `
    )
    .get(id) as GalleryMediaRow | undefined;
}

export function deleteGalleryMedia(id: string, options: { ownerToken?: string; isAdmin?: boolean }) {
  const row = getGalleryMediaById(id);
  if (!row) {
    return { status: 404, error: "未找到指定的照片或视频" } as const;
  }

  if (!options.isAdmin && !isOwnedByToken(row, options.ownerToken || "")) {
    return { status: 403, error: "你只能删除自己上传的内容" } as const;
  }

  try {
    removeFileIfExists(row.file_path);
    if (row.thumbnail_path && row.thumbnail_path !== row.file_path) {
      removeFileIfExists(row.thumbnail_path);
    }
  } catch (error) {
    console.error("[gallery] Failed to remove media file from disk:", error);
    return { status: 500, error: "文件删除失败，数据库记录未变更" } as const;
  }

  getDb()
    .prepare(
      `
      UPDATE gallery_media
      SET deleted_at = ?
      WHERE id = ? AND deleted_at IS NULL
    `
    )
    .run(new Date().toISOString(), id);

  return { status: 200, success: true } as const;
}
