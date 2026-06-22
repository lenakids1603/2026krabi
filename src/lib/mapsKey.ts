// Google Maps Platform key — single source of truth for every map on the site
// (the "新增打卡点" page and the "打卡指南" map view).
//
// The key is injected at BUILD time by vite.config.ts, which reads
// GOOGLE_MAPS_PLATFORM_KEY from the shell environment (see .env.example). It is
// never hard-coded here and must never be committed — only the variable name
// lives in git. The extra fallbacks let a Vite-style VITE_* var work too, in
// case the key is provided that way instead.
export const MAPS_API_KEY: string =
  process.env.GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_API_KEY ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  '';

// A blank or placeholder key means "no real map" — callers should degrade
// gracefully (show a notice / fall back to a list) instead of mounting a broken
// map that would throw or rack up errors.
export const hasValidMapsKey: boolean =
  Boolean(MAPS_API_KEY) && MAPS_API_KEY !== 'YOUR_API_KEY';
