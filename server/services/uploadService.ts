import fs from "fs";
import path from "path";
import crypto from "crypto";
import type { Express } from "express";
import multer from "multer";
import { config } from "../config";

type MediaType = "image" | "video";

const allowedImageExts = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const allowedVideoExts = new Set([".mp4", ".mov", ".webm"]);
const allowedImageMimes = new Set(["image/jpeg", "image/png", "image/webp"]);
const allowedVideoMimes = new Set(["video/mp4", "video/quicktime", "video/webm"]);

export interface UploadedFileInfo {
  id: string;
  fileUrl: string;
  thumbnailUrl: string;
  filePath: string;
  thumbnailPath: string | null;
  mediaType: MediaType;
  mimeType: string;
  originalName: string;
  storedName: string;
  fileSize: number;
}

export function createGalleryUploader(uploadDir = config.uploadDir) {
  fs.mkdirSync(uploadDir, { recursive: true });

  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDir),
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      cb(null, `${crypto.randomUUID()}${ext}`);
    },
  });

  return multer({
    storage,
    limits: {
      fileSize: 100 * 1024 * 1024,
    },
    fileFilter: (_req, file, cb) => {
      const validation = validateExtensionAndMime(file.originalname, file.mimetype);
      if (!validation.ok) {
        return cb(new Error(validation.error));
      }
      return cb(null, true);
    },
  });
}

function validateExtensionAndMime(originalName: string, mimeType: string) {
  const ext = path.extname(originalName).toLowerCase();
  const normalizedMime = mimeType.toLowerCase();

  if (ext === ".svg" || normalizedMime === "image/svg+xml") {
    return { ok: false, error: "不允许上传 SVG 文件" } as const;
  }

  if (allowedImageExts.has(ext) && allowedImageMimes.has(normalizedMime)) {
    return { ok: true, mediaType: "image" as MediaType } as const;
  }

  if (allowedVideoExts.has(ext) && allowedVideoMimes.has(normalizedMime)) {
    return { ok: true, mediaType: "video" as MediaType } as const;
  }

  return { ok: false, error: "只允许上传 JPG/PNG/WebP 图片或 MP4/MOV/WebM 视频" } as const;
}

function validateMagicNumber(filePath: string, mediaType: MediaType, mimeType: string): boolean {
  try {
    const buffer = fs.readFileSync(filePath);
    const hex = buffer.subarray(0, 16).toString("hex").toUpperCase();

    if (mediaType === "image") {
      if (mimeType === "image/jpeg") return hex.startsWith("FFD8FF");
      if (mimeType === "image/png") return hex.startsWith("89504E470D0A1A0A");
      if (mimeType === "image/webp") {
        return buffer.subarray(0, 4).toString("ascii") === "RIFF" && buffer.subarray(8, 12).toString("ascii") === "WEBP";
      }
      return false;
    }

    if (mimeType === "video/webm") {
      return hex.startsWith("1A45DFA3");
    }

    if (mimeType === "video/mp4" || mimeType === "video/quicktime") {
      return buffer.subarray(4, 8).toString("ascii") === "ftyp";
    }

    return false;
  } catch {
    return false;
  }
}

function normalizeLocalUploadUrl(storedName: string) {
  return `/uploads/${storedName}`;
}

function parseThumbnail(thumbnailBase64: unknown) {
  if (typeof thumbnailBase64 !== "string" || !thumbnailBase64.startsWith("data:image/")) {
    return null;
  }

  const match = thumbnailBase64.match(/^data:image\/(jpeg|jpg|png|webp);base64,(.+)$/);
  if (!match) {
    return null;
  }

  const ext = match[1] === "jpeg" || match[1] === "jpg" ? ".jpg" : `.${match[1]}`;
  const buffer = Buffer.from(match[2], "base64");
  if (buffer.length > 3 * 1024 * 1024) {
    return null;
  }

  return { ext, buffer };
}

export function finalizeUploadedGalleryFile(
  file: Express.Multer.File,
  thumbnailBase64: unknown,
  uploadDir = config.uploadDir
): { ok: true; file: UploadedFileInfo } | { ok: false; error: string } {
  const validation = validateExtensionAndMime(file.originalname, file.mimetype);
  if (!validation.ok) {
    removeFileIfExists(file.path);
    return { ok: false, error: validation.error };
  }

  if (validation.mediaType === "image" && file.size > 10 * 1024 * 1024) {
    removeFileIfExists(file.path);
    return { ok: false, error: "图片文件大小不能超过 10MB" };
  }

  if (validation.mediaType === "video" && file.size > 100 * 1024 * 1024) {
    removeFileIfExists(file.path);
    return { ok: false, error: "视频文件大小不能超过 100MB" };
  }

  if (!validateMagicNumber(file.path, validation.mediaType, file.mimetype.toLowerCase())) {
    removeFileIfExists(file.path);
    return { ok: false, error: "安全校验失败：文件内容与扩展名或 MIME 类型不符" };
  }

  const id = path.basename(file.filename, path.extname(file.filename));
  const parsedThumbnail = parseThumbnail(thumbnailBase64);
  let thumbnailPath: string | null = null;
  let thumbnailUrl = normalizeLocalUploadUrl(file.filename);

  if (parsedThumbnail) {
    const thumbnailName = `thumb_${id}${parsedThumbnail.ext}`;
    thumbnailPath = path.join(uploadDir, thumbnailName);
    fs.writeFileSync(thumbnailPath, parsedThumbnail.buffer);
    thumbnailUrl = normalizeLocalUploadUrl(thumbnailName);
  }

  return {
    ok: true,
    file: {
      id,
      fileUrl: normalizeLocalUploadUrl(file.filename),
      thumbnailUrl,
      filePath: file.path,
      thumbnailPath,
      mediaType: validation.mediaType,
      mimeType: file.mimetype.toLowerCase(),
      originalName: file.originalname,
      storedName: file.filename,
      fileSize: file.size,
    },
  };
}

export function removeFileIfExists(filePath: string | null | undefined) {
  if (!filePath) {
    return;
  }

  const resolved = path.resolve(filePath);
  const uploadRoot = path.resolve(config.uploadDir);
  if (!resolved.startsWith(uploadRoot + path.sep)) {
    return;
  }

  if (fs.existsSync(resolved)) {
    fs.unlinkSync(resolved);
  }
}
