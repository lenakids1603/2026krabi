import type { WeatherForecastResponse } from "../../src/types/api";
import { MOCK_WEATHER_KRABI, MOCK_WEATHER_LANTA } from "../../src/data/weather";

export type WeatherCity = "krabi" | "lanta";

type Location = {
  key: WeatherCity;
  name: string;
  lat: number;
  lon: number;
};

type CacheEntry = {
  expiresAt: number;
  payload: WeatherForecastResponse;
};

type OpenMeteoResponse = {
  current?: {
    time?: string;
    temperature_2m?: number;
    apparent_temperature?: number;
    weather_code?: number;
    relative_humidity_2m?: number;
    precipitation?: number;
    wind_speed_10m?: number;
  };
  daily?: {
    time?: string[];
    weather_code?: number[];
    temperature_2m_max?: number[];
    temperature_2m_min?: number[];
    precipitation_probability_max?: number[];
  };
};

const LOCATIONS: Record<WeatherCity, Location> = {
  krabi: { key: "krabi", name: "Krabi", lat: 8.0863, lon: 98.9063 },
  lanta: { key: "lanta", name: "Koh Lanta", lat: 7.6244, lon: 99.0793 },
};

const cache = new Map<WeatherCity, CacheEntry>();

export function isWeatherCity(value: unknown): value is WeatherCity {
  return value === "krabi" || value === "lanta";
}

export async function getWeather(city: WeatherCity, options: { refresh?: boolean } = {}): Promise<WeatherForecastResponse> {
  const cached = cache.get(city);
  if (!options.refresh && cached && cached.expiresAt > Date.now()) {
    return {
      ...cached.payload,
      cacheHit: true,
      cacheExpiresAt: formatThailandTime(cached.expiresAt),
    };
  }

  if (cached && cached.expiresAt <= Date.now()) {
    cache.delete(city);
  }

  try {
    const location = LOCATIONS[city];
    const data = await fetchOpenMeteo(location);
    const expiresAt = Date.now() + getWeatherCacheTtlMs();
    const payload = {
      ...mapOpenMeteo(city, data),
      cacheHit: false,
      cacheExpiresAt: formatThailandTime(expiresAt),
    };
    cache.set(city, {
      payload,
      expiresAt,
    });
    return payload;
  } catch (error) {
    console.warn(`[weather] Falling back to mock data for ${city}:`, error);
    return getMockWeather(city);
  }
}

function getMockWeather(city: WeatherCity): WeatherForecastResponse {
  const base = city === "krabi" ? MOCK_WEATHER_KRABI : MOCK_WEATHER_LANTA;
  return {
    ...base,
    lastUpdated: getThailandTimeString(),
    source: "fallback",
    cacheHit: false,
    cacheExpiresAt: null,
  };
}

async function fetchOpenMeteo(location: Location): Promise<OpenMeteoResponse> {
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", String(location.lat));
  url.searchParams.set("longitude", String(location.lon));
  url.searchParams.set("timezone", "Asia/Bangkok");
  url.searchParams.set("forecast_days", "5");
  url.searchParams.set(
    "current",
    [
      "temperature_2m",
      "apparent_temperature",
      "weather_code",
      "relative_humidity_2m",
      "precipitation",
      "wind_speed_10m",
    ].join(",")
  );
  url.searchParams.set(
    "daily",
    [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "precipitation_probability_max",
    ].join(",")
  );

  return fetchJson<OpenMeteoResponse>(url);
}

async function fetchJson<T>(url: URL): Promise<T> {
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

function mapOpenMeteo(city: WeatherCity, data: OpenMeteoResponse): WeatherForecastResponse {
  const current = data.current || {};
  const daily = data.daily || {};
  const temp = round(current.temperature_2m, 30);
  const feelsLike = round(current.apparent_temperature, temp);
  const windSpeed = round(current.wind_speed_10m, 0);
  const humidity = round(current.relative_humidity_2m, 0);
  const rainProbability = round(daily.precipitation_probability_max?.[0], 0);
  const code = current.weather_code ?? daily.weather_code?.[0] ?? 0;
  const condition = describeWeatherCode(code);

  return {
    city,
    temp: `${temp}°`,
    condition,
    range: `最高 ${round(daily.temperature_2m_max?.[0], temp)}° / 最低 ${round(daily.temperature_2m_min?.[0], temp)}°`,
    status: buildStatus(code, rainProbability, windSpeed),
    stats: [
      {
        icon: "Sun",
        label: "体感温度",
        value: `${feelsLike}°`,
        sub: "Open-Meteo 实时",
        progress: clamp(Math.round((feelsLike / 40) * 100), 0, 100),
      },
      {
        icon: "CloudRain",
        label: "降雨概率",
        value: `${rainProbability}%`,
        sub: "今日最高概率",
        progress: clamp(rainProbability, 0, 100),
      },
      {
        icon: "Wind",
        label: "风速",
        value: `${windSpeed} km/h`,
        sub: "10 米高度",
      },
      {
        icon: "Droplets",
        label: "湿度",
        value: humidity ? `${humidity}%` : "--",
        sub: "当前相对湿度",
      },
    ],
    forecast: buildForecast(daily),
    safety: [
      {
        icon: rainProbability >= 60 ? "AlertTriangle" : "CheckCircle2",
        text: rainProbability >= 60 ? "今日有明显降雨概率，户外和海上活动请保留弹性。" : "天气整体可用，适合按计划安排户外活动。",
      },
      {
        icon: windSpeed >= 30 ? "AlertTriangle" : "Wind",
        text: windSpeed >= 30 ? "风速偏高，船只和浮潜活动需听从当地安排。" : "风速处于常规范围，仍建议关注现场海况。",
      },
      {
        icon: "Droplet",
        text: "泰南体感温度较高，请准备饮用水、防晒和轻便雨具。",
      },
    ],
    lastUpdated: getThailandTimeString(),
    source: "api",
  };
}

function buildForecast(daily: NonNullable<OpenMeteoResponse["daily"]>) {
  const times = daily.time || [];
  return times.slice(0, 5).map((day, index) => ({
    day: index === 0 ? "今天" : formatWeekday(day),
    icon: mapWeatherIcon(daily.weather_code?.[index] ?? 0),
    min: round(daily.temperature_2m_min?.[index], 25),
    max: round(daily.temperature_2m_max?.[index], 32),
  }));
}

function describeWeatherCode(code: number): string {
  if ([0].includes(code)) return "晴朗";
  if ([1, 2, 3].includes(code)) return "多云";
  if ([45, 48].includes(code)) return "有雾";
  if ([51, 53, 55, 56, 57].includes(code)) return "毛毛雨";
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "阵雨";
  if ([95, 96, 99].includes(code)) return "雷雨";
  return "实时天气";
}

function mapWeatherIcon(code: number): string {
  if ([95, 96, 99].includes(code)) return "CloudLightning";
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "CloudRain";
  if ([1, 2, 3, 45, 48].includes(code)) return "Cloud";
  return "Sun";
}

function buildStatus(code: number, rainProbability: number, windSpeed: number): string {
  if ([95, 96, 99].includes(code)) return "雷雨预警";
  if (rainProbability >= 70 || windSpeed >= 35) return "谨慎安排户外活动";
  if (rainProbability >= 40) return "可能有阵雨";
  return "适宜游玩";
}

function formatWeekday(date: string): string {
  try {
    return new Intl.DateTimeFormat("zh-CN", { weekday: "short", timeZone: "Asia/Bangkok" }).format(new Date(date));
  } catch {
    return date.slice(5);
  }
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

function getWeatherCacheTtlMs(): number {
  const minutes = Math.min(Math.max(readNumber(process.env.WEATHER_CACHE_TTL_MINUTES, 10), 1), 10);
  return minutes * 60 * 1000;
}

function formatThailandTime(timestamp: number): string {
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
      .format(new Date(timestamp))
      .replace(",", "");
  } catch {
    return new Date(timestamp).toISOString().slice(0, 16).replace("T", " ");
  }
}

function round(value: number | undefined, fallback: number): number {
  return Math.round(Number.isFinite(value) ? (value as number) : fallback);
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
