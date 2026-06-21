import { 
  HomeStatus, 
  ItineraryDay, 
  WeatherForecastResponse, 
  TideInfo, 
  GalleryMedia, 
  CheckinSpot,
  CreateCheckinSpotInput,
  TripProgress
} from '../types/api';

import { ITINERARY } from '../data/itinerary';
import { MOCK_WEATHER_KRABI, MOCK_WEATHER_LANTA } from '../data/weather';
import { MOCK_TIDE_KRABI, MOCK_TIDE_LANTA } from '../data/tides';
import { DEFAULT_CHECKIN_SPOTS } from '../data/checkinSpots';
import { getUploaderId, getGalleryItems, uploadGalleryFile, deleteGalleryItem } from '../api/galleryApi';

// ==========================================
// 🏠 1. HOME STATUS API
// ==========================================
export async function getHomeStatus(): Promise<HomeStatus> {
  const progress = getThailandTripProgress();

  // Helper to parse representative minutes of day for an activity
  function getActivityMinutes(time: string): number {
    const match = time.match(/(\d{1,2}):(\d{2})/);
    if (match) {
      return Number(match[1]) * 60 + Number(match[2]);
    }
    if (time.includes('上午') || time.includes('晨')) {
      return 8 * 60; // 08:00
    }
    if (time.includes('下午') || time.includes('午后') || time.includes('中午')) {
      return 13 * 60; // 13:00
    }
    if (time.includes('傍晚')) {
      return 17 * 60 + 30; // 17:30
    }
    if (time.includes('晚上') || time.includes('夜米')) {
      return 19 * 60 + 30; // 19:30
    }
    if (time.includes('全天')) {
      return 9 * 60; // 09:00
    }
    return 0;
  }

  if (progress.status === 'before') {
    // Early fallback to the very first event of Day 1
    const firstDay = ITINERARY[0];
    const firstAct = firstDay.activities[0];

    return {
      dayNumber: 1,
      totalDays: ITINERARY.length,
      currentDayTitle: '全员集结，准备启程',
      tripStatus: 'before',
      message: '行前准备中，2026-06-28 启程！',
      nextActivity: {
        id: firstAct.id,
        time: firstAct.time,
        title: firstAct.title,
        location: firstAct.location,
        description: firstAct.description,
        type: firstAct.type as any
      }
    };
  }

  if (progress.status === 'after') {
    // Late fallback to the last event of the final day
    const lastDay = ITINERARY[ITINERARY.length - 1];
    const lastAct = lastDay.activities[lastDay.activities.length - 1];

    return {
      dayNumber: ITINERARY.length,
      totalDays: ITINERARY.length,
      currentDayTitle: '行程已圆满结束',
      tripStatus: 'after',
      message: '全部行程精彩收官，感谢同行！',
      nextActivity: {
        id: lastAct.id,
        time: lastAct.time,
        title: lastAct.title,
        location: lastAct.location,
        description: lastAct.description,
        type: lastAct.type as any
      }
    };
  }

  // Under 'during' status
  const todayDay = progress.currentDay || 1;
  const todayItinerary = ITINERARY.find(d => d.day === todayDay) || ITINERARY[0];
  
  // Calculate current Bangkok hour and minute
  let bkkHour = 9;
  let bkkMinute = 0;
  try {
    const now = new Date();
    const formatOptions = { timeZone: 'Asia/Bangkok', hour: '2-digit', minute: '2-digit', hour12: false } as const;
    const bkkFormatter = new Intl.DateTimeFormat('en-US', formatOptions);
    const timeStr = bkkFormatter.format(now);
    const parts = timeStr.split(':');
    if (parts.length === 2) {
      bkkHour = Number(parts[0]);
      bkkMinute = Number(parts[1]);
    }
  } catch (err) {
    // safe fallback if timezone translation fails
  }
  const currentMinutes = bkkHour * 60 + bkkMinute;

  let nextAct: any = null;
  const todayActsSorted = [...todayItinerary.activities].sort(
    (a, b) => getActivityMinutes(a.time) - getActivityMinutes(b.time)
  );

  nextAct = todayActsSorted.find(act => getActivityMinutes(act.time) >= currentMinutes);

  if (!nextAct) {
    // All of today's events completed, look at tomorrow's first event
    const tomorrowDay = todayDay + 1;
    const tomorrowItinerary = ITINERARY.find(d => d.day === tomorrowDay);
    if (tomorrowItinerary && tomorrowItinerary.activities.length > 0) {
      const tomorrowAct = tomorrowItinerary.activities[0];
      nextAct = {
        id: tomorrowAct.id,
        time: tomorrowAct.time,
        title: `(明日) ${tomorrowAct.title}`,
        location: tomorrowAct.location,
        description: tomorrowAct.description,
        type: tomorrowAct.type
      };
    } else {
      // It's the end of last day
      nextAct = {
        id: 'completed',
        time: '当前',
        title: '2026 团建游玩行程圆满完成',
        location: '甲米国际机场',
        description: '所有的活动日程已顺利结束。祝各位伙伴高飞平安！',
        type: 'itinerary'
      };
    }
  }

  return {
    dayNumber: todayDay,
    totalDays: ITINERARY.length,
    currentDayTitle: todayItinerary.title,
    tripStatus: 'during',
    message: `第 ${todayDay} 天火热畅游中`,
    nextActivity: {
      id: nextAct.id,
      time: nextAct.time,
      title: nextAct.title,
      location: nextAct.location,
      description: nextAct.description,
      type: nextAct.type as any
    }
  };
}

// ==========================================
// 📅 2. ITINERARY API
// ==========================================
/**
 * 获取泰国曼谷时间 (Asia/Bangkok) 的当前进度
 */
export function getThailandTripProgress(): TripProgress {
  try {
    const options = { timeZone: 'Asia/Bangkok', year: 'numeric', month: '2-digit', day: '2-digit' } as const;
    const formatter = new Intl.DateTimeFormat('en-CA', options);
    const dateStr = formatter.format(new Date()); // Format: YYYY-MM-DD
    
    const startDate = "2026-06-28";
    const endDate = "2026-07-06";

    const parts = dateStr.split('-');
    const todayMMDD = parts.length === 3 ? `${parts[1]}.${parts[2]}` : ""; // "06.28"

    if (dateStr < startDate) {
      return { status: 'before', todayDate: todayMMDD, formattedDate: dateStr };
    } else if (dateStr > endDate) {
      return { status: 'after', todayDate: todayMMDD, formattedDate: dateStr };
    } else {
      // Calculate currentDay by standard milliseconds timezone-agnostic date calculation
      const startMs = new Date(startDate).getTime();
      const currentMs = new Date(dateStr).getTime();
      const diffDays = Math.round((currentMs - startMs) / (1000 * 60 * 60 * 24)) + 1;
      return {
        status: 'during',
        currentDay: diffDays,
        todayDate: todayMMDD,
        formattedDate: dateStr
      };
    }
  } catch (err) {
    // Return a safe default if rendering environment has internationalization boundary issues
    return { status: 'before', todayDate: '06.28', formattedDate: '2026-06-28' };
  }
}

export async function getItinerary(): Promise<ItineraryDay[]> {
  // Safely cast local itinerary matching the consolidated ItineraryDay format
  return ITINERARY as unknown as ItineraryDay[];
}

// ==========================================
// ☀️ 3. WEATHER & TIDE API
// ==========================================
function getThailandTimeString(): string {
  try {
    const now = new Date();
    const options = { 
      timeZone: 'Asia/Bangkok', 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: false 
    } as const;
    const bkkFormatter = new Intl.DateTimeFormat('en-CA', options);
    // en-CA format: YYYY-MM-DD, hh:mm or YYYY-MM-DD hh:mm or YYYY-MM-DD, HH:MM
    const raw = bkkFormatter.format(now);
    return raw.replace(',', '');
  } catch (err) {
    return "2026-05-21 09:00";
  }
}

type RealtimeRequestOptions = {
  refresh?: boolean;
};

function buildRealtimeUrl(path: '/api/weather' | '/api/tides', city: 'krabi' | 'lanta', options?: RealtimeRequestOptions): string {
  const params = new URLSearchParams({ city });
  if (options?.refresh) {
    params.set('refresh', '1');
  }
  return `${path}?${params.toString()}`;
}

export async function getWeather(city: 'krabi' | 'lanta', options?: RealtimeRequestOptions): Promise<WeatherForecastResponse> {
  try {
    const response = await fetch(buildRealtimeUrl('/api/weather', city, options), { cache: 'no-store' });
    if (!response.ok) {
      throw new Error('Failed to load weather');
    }
    return await response.json() as WeatherForecastResponse;
  } catch {
    const base = city === 'krabi' ? MOCK_WEATHER_KRABI : MOCK_WEATHER_LANTA;
    return {
      ...base,
      lastUpdated: getThailandTimeString(),
      source: 'fallback'
    };
  }
}

export async function getTides(city: 'krabi' | 'lanta', options?: RealtimeRequestOptions): Promise<TideInfo> {
  try {
    const response = await fetch(buildRealtimeUrl('/api/tides', city, options), { cache: 'no-store' });
    if (!response.ok) {
      throw new Error('Failed to load tides');
    }
    return await response.json() as TideInfo;
  } catch {
    const base = city === 'krabi' ? MOCK_TIDE_KRABI : MOCK_TIDE_LANTA;
    return {
      ...base,
      lastUpdated: getThailandTimeString(),
      source: 'fallback'
    };
  }
}

// ==========================================
// 📸 4. SHARED TEAM GALLERY API
// ==========================================
export async function getGalleryMedia(): Promise<GalleryMedia[]> {
  const items = await getGalleryItems();
  return items as unknown as GalleryMedia[];
}

export async function uploadGalleryMedia(
  file: File, 
  thumbnailBase64: string,
  onProgress?: (percent: number) => void
): Promise<GalleryMedia> {
  const uploaded = await uploadGalleryFile(file, thumbnailBase64, onProgress);
  return uploaded as unknown as GalleryMedia;
}

export async function deleteGalleryMedia(id: string): Promise<boolean> {
  return deleteGalleryItem(id);
}

// ==========================================
// 📍 5. CHECK-IN SPOTS (SHARED BACKEND API + FALLBACK)
// ==========================================
const CHECKIN_SPOTS_API = '/api/checkin-spots';

export async function getCheckinSpots(): Promise<CheckinSpot[]> {
  try {
    const res = await fetch(CHECKIN_SPOTS_API, {
      headers: { 'X-Owner-Token': getUploaderId() },
      cache: 'no-store'
    });
    if (!res.ok) {
      throw new Error('Failed to load checkin spots');
    }
    return await res.json() as CheckinSpot[];
  } catch (err) {
    // Network/server failure: fall back to bundled defaults so the page still renders.
    console.error('Failed to load checkin spots from server, using defaults:', err);
    return DEFAULT_CHECKIN_SPOTS;
  }
}

export async function createCheckinSpot(input: CreateCheckinSpotInput): Promise<CheckinSpot> {
  const res = await fetch(CHECKIN_SPOTS_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Owner-Token': getUploaderId()
    },
    body: JSON.stringify(input)
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || '创建打卡点失败，请稍后重试');
  }
  return await res.json() as CheckinSpot;
}

export async function deleteCheckinSpot(id: string): Promise<boolean> {
  const res = await fetch(`${CHECKIN_SPOTS_API}/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: { 'X-Owner-Token': getUploaderId() }
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || '删除失败，您可能无权删除此打卡点');
  }
  return true;
}
