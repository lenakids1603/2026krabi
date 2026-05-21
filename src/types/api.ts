/**
 * Consolidated API Types for Front-end and Back-end separation.
 * Used across Mock Data, API services, and React Components.
 */

// --- Home Types ---
export interface HomeStatus {
  dayNumber: number;
  totalDays: number;
  currentDayTitle: string;
  nextActivity: ItineraryEvent;
  tripStatus: 'before' | 'during' | 'after';
  message?: string;
}

// --- Itinerary Types ---
export interface ItineraryEvent {
  id: string;
  time: string;
  title: string;
  location: string;
  description: string;
  type: 'itinerary' | 'hotel' | 'attraction' | 'dining';
}

export interface ItineraryDay {
  day: number;
  date: string;
  title: string;
  activities: ItineraryEvent[];
  tags?: string[];
  image?: string;
  icon?: string;
}

export interface TripProgress {
  status: 'before' | 'during' | 'after';
  currentDay?: number;
  todayDate: string;
  formattedDate: string;
}

// --- Weather & Tide Types ---
export interface WeatherCardStat {
  icon: string;
  label: string;
  value: string;
  sub: string;
  progress?: number;
}

export interface WeatherForecast {
  day: string;
  icon: string;
  min: number;
  max: number;
}

export interface WeatherAlertCard {
  icon: string;
  text: string;
}

export interface WeatherForecastResponse {
  city: 'krabi' | 'lanta';
  temp: string;
  condition: string;
  range: string;
  status: string;
  stats: WeatherCardStat[];
  forecast: WeatherForecast[];
  safety: WeatherAlertCard[];
}

export interface TidePoint {
  type: string;
  time: string;
  val: string;
  active?: boolean;
}

export interface TideInfo {
  location: string;
  current: string;
  currentLeft: string;
  path: string;
  cx: string;
  cy: string;
  points: TidePoint[];
  tip: string;
}

// --- Gallery Types ---
export interface GalleryMedia {
  id: string;
  file_url: string;
  thumbnail_url: string;
  media_type: 'image' | 'video';
  original_name: string;
  file_size: number;
  uploader_token_hash: string;
  created_at: string;
  likes: number;
  comments: number;
  // Backward compatibility fields
  url: string;
  category?: string;
}

// --- Checkin Spot Types ---
export interface CheckinSpot {
  id: string;
  name: string;
  category: '餐厅' | '摄影位' | '酒吧' | '咖啡馆' | '其他';
  description: string;
  image: string;
  lat: number;
  lng: number;
  user: string;
  createdAt: string;
  address?: string; // Prearranged for address fields
  google_maps_url?: string; // Prearranged for Google Maps URLs
}

export interface CreateCheckinSpotInput {
  name: string;
  category: '餐厅' | '摄影位' | '酒吧' | '咖啡馆' | '其他';
  description: string;
  lat: number;
  lng: number;
  user?: string;
  image_url?: string;
  address?: string;
  google_maps_url?: string;
}
