import crypto from "crypto";
import { getDb } from "../db/client";
import { hashOwnerToken, timingSafeEqualHex } from "./ownerTokenService";

type CheckinCategory = "餐厅" | "摄影位" | "酒吧" | "咖啡馆" | "其他";

interface CheckinSpotRow {
  id: string;
  name: string;
  category: CheckinCategory;
  description: string;
  address: string | null;
  google_maps_url: string | null;
  image_url: string;
  latitude: number;
  longitude: number;
  user_name: string;
  owner_token_hash: string | null;
  status: string;
  is_seed: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface CreateCheckinSpotBody {
  name?: unknown;
  category?: unknown;
  description?: unknown;
  lat?: unknown;
  lng?: unknown;
  latitude?: unknown;
  longitude?: unknown;
  user?: unknown;
  user_name?: unknown;
  image_url?: unknown;
  image?: unknown;
  address?: unknown;
  google_maps_url?: unknown;
}

const categories: CheckinCategory[] = ["餐厅", "摄影位", "酒吧", "咖啡馆", "其他"];

const categoryImageFallbacks: Record<CheckinCategory, string> = {
  "餐厅": "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=600&q=80",
  "摄影位": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
  "酒吧": "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80",
  "咖啡馆": "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80",
  "其他": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80",
};

const seedSpots = [
  {
    id: "default-1",
    name: "普吉岛悬崖落日",
    category: "摄影位" as CheckinCategory,
    description: "绝佳的落日拍摄点，可以俯瞰整个卡隆海滩，建议下午5:30到达。",
    image_url: categoryImageFallbacks["摄影位"],
    latitude: 7.8204,
    longitude: 98.2985,
    user_name: "Lenakids 领队",
    created_at: "2026-06-25T17:30:00.000Z",
    address: "Karon View Point, Karon, Phuket",
    google_maps_url: "https://www.google.com/maps/search/?api=1&query=7.8204,98.2985",
  },
  {
    id: "default-2",
    name: "蓝象餐厅 Blue Elephant",
    category: "餐厅" as CheckinCategory,
    description: "藏在古老建筑中的米其林美食，泰式酸辣汤是这里的招牌必点。",
    image_url: categoryImageFallbacks["餐厅"],
    latitude: 7.8841,
    longitude: 98.3892,
    user_name: "Xiao Min",
    created_at: "2026-06-25T12:00:00.000Z",
    address: "96 Krabi Road, Talad Neua, Phuket Town",
    google_maps_url: "https://www.google.com/maps/search/?api=1&query=7.8841,98.3892",
  },
  {
    id: "default-3",
    name: "兰塔海滩落日酒吧",
    category: "酒吧" as CheckinCategory,
    description: "兰塔岛上氛围绝佳的沙滩酒吧，伴着温柔的波涛 and 动听的音乐，来一杯鸡尾酒。",
    image_url: categoryImageFallbacks["酒吧"],
    latitude: 7.6253,
    longitude: 99.0342,
    user_name: "Xiao Fang",
    created_at: "2026-06-26T20:00:00.000Z",
    address: "Long Beach, Koh Lanta, Krabi",
    google_maps_url: "https://www.google.com/maps/search/?api=1&query=7.6253,99.0342",
  },
];

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value.trim() : fallback;
}

function asNumber(value: unknown): number | null {
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function asCategory(value: unknown): CheckinCategory {
  return categories.includes(value as CheckinCategory) ? (value as CheckinCategory) : "其他";
}

function toPublicSpot(row: CheckinSpotRow) {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    description: row.description,
    image: row.image_url,
    image_url: row.image_url,
    lat: row.latitude,
    lng: row.longitude,
    user: row.user_name,
    createdAt: row.created_at,
    address: row.address || undefined,
    google_maps_url: row.google_maps_url || undefined,
    status: row.status,
    is_seed: Boolean(row.is_seed),
  };
}

export function ensureSeedCheckinSpots() {
  const db = getDb();
  const insert = db.prepare(`
    INSERT OR IGNORE INTO checkin_spots (
      id, name, category, description, address, google_maps_url, image_url,
      latitude, longitude, user_name, owner_token_hash, status, is_seed,
      created_at, updated_at
    ) VALUES (
      @id, @name, @category, @description, @address, @google_maps_url, @image_url,
      @latitude, @longitude, @user_name, NULL, 'active', 1, @created_at, @created_at
    )
  `);

  const transaction = db.transaction(() => {
    for (const spot of seedSpots) {
      insert.run(spot);
    }
  });
  transaction();
}

export function listCheckinSpots() {
  const rows = getDb()
    .prepare(
      `
      SELECT * FROM checkin_spots
      WHERE status = 'active' AND deleted_at IS NULL
      ORDER BY is_seed ASC, datetime(created_at) DESC
    `
    )
    .all() as CheckinSpotRow[];

  return rows.map(toPublicSpot);
}

export function createCheckinSpot(input: CreateCheckinSpotBody, ownerToken: string) {
  if (!ownerToken) {
    return { status: 400, error: "缺少匿名归属凭证" } as const;
  }

  const name = asString(input.name);
  if (!name) {
    return { status: 400, error: "名称不能为空" } as const;
  }

  const category = asCategory(input.category);
  const latitude = asNumber(input.latitude ?? input.lat);
  const longitude = asNumber(input.longitude ?? input.lng);
  if (latitude === null || longitude === null) {
    return { status: 400, error: "经纬度不合法" } as const;
  }

  const now = new Date().toISOString();
  const imageUrl = asString(input.image_url ?? input.image, categoryImageFallbacks[category]);
  const googleMapsUrl =
    asString(input.google_maps_url) || `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  const row = {
    id: `spot-${crypto.randomUUID()}`,
    name: name.slice(0, 80),
    category,
    description: (asString(input.description) || "随行打卡，风光无限。").slice(0, 500),
    address: asString(input.address) || null,
    google_maps_url: googleMapsUrl,
    image_url: imageUrl,
    latitude,
    longitude,
    user_name: (asString(input.user_name ?? input.user) || "旅行同伴").slice(0, 40),
    owner_token_hash: hashOwnerToken(ownerToken),
    created_at: now,
    updated_at: now,
  };

  getDb()
    .prepare(
      `
      INSERT INTO checkin_spots (
        id, name, category, description, address, google_maps_url, image_url,
        latitude, longitude, user_name, owner_token_hash, status, is_seed,
        created_at, updated_at
      ) VALUES (
        @id, @name, @category, @description, @address, @google_maps_url, @image_url,
        @latitude, @longitude, @user_name, @owner_token_hash, 'active', 0,
        @created_at, @updated_at
      )
    `
    )
    .run(row);

  return { status: 201, spot: toPublicSpot({ ...row, status: "active", is_seed: 0, deleted_at: null }) } as const;
}

export function deleteCheckinSpot(id: string, ownerToken: string) {
  if (!ownerToken) {
    return { status: 403, error: "缺少匿名归属凭证" } as const;
  }

  const row = getDb()
    .prepare(
      `
      SELECT * FROM checkin_spots
      WHERE id = ? AND status = 'active' AND deleted_at IS NULL
    `
    )
    .get(id) as CheckinSpotRow | undefined;

  if (!row) {
    return { status: 404, error: "未找到指定打卡点" } as const;
  }

  if (!row.owner_token_hash) {
    return { status: 403, error: "默认打卡点暂不支持匿名删除" } as const;
  }

  const clientHash = hashOwnerToken(ownerToken);
  if (!timingSafeEqualHex(clientHash, row.owner_token_hash)) {
    return { status: 403, error: "只能删除自己创建的打卡点" } as const;
  }

  const now = new Date().toISOString();
  getDb()
    .prepare(
      `
      UPDATE checkin_spots
      SET status = 'deleted', deleted_at = ?, updated_at = ?
      WHERE id = ?
    `
    )
    .run(now, now, id);

  return { status: 200, success: true } as const;
}
