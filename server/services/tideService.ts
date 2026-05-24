import type { TideInfo, TidePoint } from "../../src/types/api";
import { MOCK_TIDE_KRABI, MOCK_TIDE_LANTA } from "../../src/data/tides";

export type TideCity = "krabi" | "lanta";

type Location = {
  key: TideCity;
  label: string;
  lat: number;
  lon: number;
};

type CacheEntry = {
  expiresAt: number;
  payload: TideInfo;
};

type WorldTidesHeight = {
  dt?: number;
  date?: string;
  height?: number;
};

type WorldTidesExtreme = {
  dt?: number;
  date?: string;
  height?: number;
  type?: string;
};

type WorldTidesResponse = {
  heights?: WorldTidesHeight[];
  extremes?: WorldTidesExtreme[];
  error?: string;
};

type TideHeightPoint = {
  time: number;
  height: number;
};

const LOCATIONS: Record<TideCity, Location> = {
  krabi: { key: "krabi", label: "Krabi Pier", lat: 8.0863, lon: 98.9063 },
  lanta: { key: "lanta", label: "Saladan Pier, Lanta", lat: 7.6244, lon: 99.0793 },
};

const cache = new Map<TideCity, CacheEntry>();

export function isTideCity(value: unknown): value is TideCity {
  return value === "krabi" || value === "lanta";
}

export async function getTides(city: TideCity): Promise<TideInfo> {
  const cached = cache.get(city);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.payload;
  }

  if (!process.env.WORLD_TIDES_API_KEY) {
    return getMockTide(city);
  }

  try {
    const location = LOCATIONS[city];
    const data = await fetchWorldTides(location);
    const payload = mapWorldTides(city, data);
    cache.set(city, {
      payload,
      expiresAt: Date.now() + readNumber(process.env.TIDE_CACHE_TTL_MINUTES, 360) * 60 * 1000,
    });
    return payload;
  } catch (error) {
    console.warn(`[tides] Falling back to mock data for ${city}:`, error);
    return getMockTide(city);
  }
}

function getMockTide(city: TideCity): TideInfo {
  const base = city === "krabi" ? MOCK_TIDE_KRABI : MOCK_TIDE_LANTA;
  return {
    ...base,
    lastUpdated: getThailandTimeString(),
    source: "mock",
  };
}

async function fetchWorldTides(location: Location): Promise<WorldTidesResponse> {
  const query = [
    "heights",
    "extremes",
    "date=today",
    "days=1",
    "localtime",
    `lat=${encodeURIComponent(String(location.lat))}`,
    `lon=${encodeURIComponent(String(location.lon))}`,
    `key=${encodeURIComponent(process.env.WORLD_TIDES_API_KEY || "")}`,
  ].join("&");

  const data = await fetchJson<WorldTidesResponse>(`https://www.worldtides.info/api/v3?${query}`);
  if (data.error) {
    throw new Error(data.error);
  }
  return data;
}

async function fetchJson<T>(url: string): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), readNumber(process.env.API_TIMEOUT_MS, 8000));

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return (await response.json()) as T;
  } finally {
    clearTimeout(timer);
  }
}

function mapWorldTides(city: TideCity, data: WorldTidesResponse): TideInfo {
  const heights = normalizeHeights(data.heights || []);
  if (heights.length < 2) {
    throw new Error("WorldTides response did not include enough height points");
  }

  const chart = buildChart(heights);
  const currentPoint = findClosestPoint(heights, Date.now());
  const extremePoints = buildExtremePoints(data.extremes || [], currentPoint.time);

  return {
    location: LOCATIONS[city].label,
    current: `${currentPoint.height.toFixed(1)}m`,
    currentLeft: `${chart.currentLeft}%`,
    path: chart.path,
    cx: String(chart.cx),
    cy: String(chart.cy),
    points: extremePoints.length > 0 ? extremePoints : buildFallbackPoints(heights),
    tip: "潮汐数据来自 WorldTides，实际海况请以当地码头和船公司通知为准。",
    lastUpdated: getThailandTimeString(),
    source: "api",
  };
}

function normalizeHeights(items: WorldTidesHeight[]): TideHeightPoint[] {
  return items
    .map((item) => ({
      time: item.dt ? item.dt * 1000 : item.date ? Date.parse(item.date) : Number.NaN,
      height: typeof item.height === "number" ? item.height : Number.NaN,
    }))
    .filter((item) => Number.isFinite(item.time) && Number.isFinite(item.height))
    .sort((a, b) => a.time - b.time);
}

function buildChart(heights: TideHeightPoint[]) {
  const sampled = samplePoints(heights, 24);
  const minHeight = Math.min(...sampled.map((item) => item.height));
  const maxHeight = Math.max(...sampled.map((item) => item.height));
  const range = maxHeight - minHeight || 1;
  const points = sampled.map((item, index) => {
    const x = sampled.length === 1 ? 0 : (index / (sampled.length - 1)) * 400;
    const y = 90 - ((item.height - minHeight) / range) * 70;
    return { x: Math.round(x), y: Math.round(y), time: item.time };
  });

  const currentIndex = findClosestIndex(sampled, Date.now());
  const currentPoint = points[currentIndex] || points[0];

  return {
    path: points.map((point, index) => `${index === 0 ? "M" : "L"}${point.x},${point.y}`).join(" "),
    cx: currentPoint.x,
    cy: currentPoint.y,
    currentLeft: Math.round((currentPoint.x / 400) * 100),
  };
}

function samplePoints(points: TideHeightPoint[], maxCount: number): TideHeightPoint[] {
  if (points.length <= maxCount) {
    return points;
  }

  const result: TideHeightPoint[] = [];
  for (let index = 0; index < maxCount; index += 1) {
    const sourceIndex = Math.round((index / (maxCount - 1)) * (points.length - 1));
    result.push(points[sourceIndex]);
  }
  return result;
}

function buildExtremePoints(extremes: WorldTidesExtreme[], currentTime: number): TidePoint[] {
  const normalized = extremes
    .map((item) => ({
      time: item.dt ? item.dt * 1000 : item.date ? Date.parse(item.date) : Number.NaN,
      height: typeof item.height === "number" ? item.height : Number.NaN,
      type: item.type,
    }))
    .filter((item) => Number.isFinite(item.time) && Number.isFinite(item.height))
    .sort((a, b) => a.time - b.time)
    .slice(0, 4);

  if (normalized.length === 0) {
    return [];
  }

  const activeIndex = findClosestIndex(
    normalized.map((item) => ({ time: item.time, height: item.height })),
    currentTime
  );

  return normalized.map((item, index) => ({
    type: String(item.type || "").toLowerCase().includes("high") ? "高潮" : "低潮",
    time: formatTime(item.time),
    val: `${item.height.toFixed(1)}m`,
    active: index === activeIndex,
  }));
}

function buildFallbackPoints(heights: TideHeightPoint[]): TidePoint[] {
  return samplePoints(heights, 4).map((item, index) => ({
    type: "潮位",
    time: formatTime(item.time),
    val: `${item.height.toFixed(1)}m`,
    active: index === 1,
  }));
}

function findClosestPoint(points: TideHeightPoint[], targetTime: number): TideHeightPoint {
  return points[findClosestIndex(points, targetTime)] || points[0];
}

function findClosestIndex(points: TideHeightPoint[], targetTime: number): number {
  let bestIndex = 0;
  let bestDistance = Number.POSITIVE_INFINITY;
  points.forEach((point, index) => {
    const distance = Math.abs(point.time - targetTime);
    if (distance < bestDistance) {
      bestDistance = distance;
      bestIndex = index;
    }
  });
  return bestIndex;
}

function formatTime(time: number): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Bangkok",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(time));
}

function getThailandTimeString(): string {
  try {
    return new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Bangkok",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
      .format(new Date())
      .replace(",", "");
  } catch {
    return new Date().toISOString().slice(0, 16).replace("T", " ");
  }
}

function readNumber(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}
