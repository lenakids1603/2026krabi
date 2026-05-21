PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS checkin_spots (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('餐厅', '摄影位', '酒吧', '咖啡馆', '其他')),
  description TEXT NOT NULL,
  address TEXT,
  google_maps_url TEXT,
  image_url TEXT NOT NULL,
  latitude REAL NOT NULL,
  longitude REAL NOT NULL,
  user_name TEXT NOT NULL DEFAULT '旅行同伴',
  owner_token_hash TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'deleted')),
  is_seed INTEGER NOT NULL DEFAULT 0 CHECK (is_seed IN (0, 1)),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  deleted_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_checkin_spots_visible
  ON checkin_spots(status, deleted_at, created_at);

CREATE TABLE IF NOT EXISTS gallery_media (
  id TEXT PRIMARY KEY,
  file_url TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL,
  file_path TEXT,
  thumbnail_path TEXT,
  media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video')),
  mime_type TEXT,
  original_name TEXT NOT NULL,
  stored_name TEXT,
  file_size INTEGER NOT NULL,
  uploader_token_hash TEXT NOT NULL,
  likes INTEGER NOT NULL DEFAULT 0,
  comments INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  deleted_at TEXT
);

CREATE TABLE IF NOT EXISTS weather_cache (
  city TEXT PRIMARY KEY,
  payload_json TEXT NOT NULL,
  provider TEXT NOT NULL,
  source TEXT NOT NULL,
  fetched_at TEXT NOT NULL,
  expires_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS tide_cache (
  city TEXT PRIMARY KEY,
  payload_json TEXT NOT NULL,
  provider TEXT NOT NULL,
  source TEXT NOT NULL,
  fetched_at TEXT NOT NULL,
  expires_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS admin_sessions (
  id TEXT PRIMARY KEY,
  session_token_hash TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at TEXT NOT NULL,
  revoked_at TEXT
);
