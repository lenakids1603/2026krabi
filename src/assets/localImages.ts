// High-quality, modern, lightweight local SVG assets encoded in 100% stable Data-URIs.
// Hex codes are safely escaped (using %23 instead of #) so they parse perfectly in all standard browsers.

export const AVATAR_MING = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="%236366f1"/>
      <stop offset="100%" stop-color="%234f46e5"/>
    </linearGradient>
  </defs>
  <circle cx="60" cy="60" r="58" fill="url(%23g1)" />
  <circle cx="60" cy="50" r="22" fill="%23ffffff" opacity="0.9" />
  <path d="M25 95 C 25 75, 95 75, 95 95 Z" fill="%23ffffff" opacity="0.8" />
  <circle cx="60" cy="50" r="6" fill="%234f46e5" />
  <rect x="52" y="80" width="16" height="12" rx="2" fill="%23312e81" />
</svg>`;

export const AVATAR_XIAOFANG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="%23ec4899"/>
      <stop offset="100%" stop-color="%23f43f5e"/>
    </linearGradient>
  </defs>
  <circle cx="60" cy="60" r="58" fill="url(%23g2)" />
  <circle cx="60" cy="48" r="20" fill="%23ffffff" opacity="0.9" />
  <path d="M25 95 C 25 78, 95 78, 95 95 Z" fill="%23ffffff" opacity="0.85" />
  <path d="M40 38 Q 60 22, 80 38" fill="none" stroke="%23ffe4e6" stroke-width="4" stroke-linecap="round" />
  <circle cx="60" cy="48" r="5" fill="%23be185d" />
</svg>`;

export const AVATAR_JIANGUO = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <linearGradient id="g3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="%2314b8a6"/>
      <stop offset="100%" stop-color="%230f766e"/>
    </linearGradient>
  </defs>
  <circle cx="60" cy="60" r="58" fill="url(%23g3)" />
  <circle cx="60" cy="50" r="22" fill="%23ffffff" opacity="0.91" />
  <path d="M25 95 C 25 75, 95 75, 95 95 Z" fill="%23ffffff" opacity="0.8" />
  <!-- Tech Glasses & Headphones -->
  <rect x="42" y="44" width="14" height="8" rx="2" fill="none" stroke="%23115e59" stroke-width="3" />
  <rect x="64" y="44" width="14" height="8" rx="2" fill="none" stroke="%23115e59" stroke-width="3" />
  <line x1="56" y1="48" x2="64" y2="48" stroke="%23115e59" stroke-width="3" />
  <path d="M34 50 Q 60 26, 86 50" fill="none" stroke="%23115e59" stroke-width="4" />
</svg>`;

export const WEATHER_HEADER_BG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 300">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="%2300b4d8"/>
      <stop offset="50%" stop-color="%230077b6"/>
      <stop offset="100%" stop-color="%2303045e"/>
    </linearGradient>
  </defs>
  <rect width="800" height="300" fill="url(%23bg)" />
  <!-- Radiant Sun -->
  <circle cx="700" cy="80" r="45" fill="%23f77f00" opacity="0.8" />
  <circle cx="700" cy="80" r="35" fill="%23fcbf49" />
  <!-- Clouds -->
  <path d="M30 200 C50 180, 90 180, 110 200 C130 190, 170 190, 180 210 C200 200, 240 215, 240 240 L30 240 Z" fill="%23ffffff" opacity="0.25" />
  <path d="M480 120 C500 100, 540 100, 560 120 C580 110, 620 110, 630 130 C650 120, 690 135, 690 160 L480 160 Z" fill="%23ffffff" opacity="0.15" />
  <!-- Sea Waves -->
  <path d="M0 240 Q 200 220, 400 240 T 800 240 L 800 300 L 0 300 Z" fill="%230096c7" opacity="0.4" />
  <path d="M0 260 Q 200 245, 400 260 T 800 260 L 800 300 L 0 300 Z" fill="%230077b6" opacity="0.6" />
</svg>`;

export const NOTES_HEADER_BG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 300">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="%23ff9f1c"/>
      <stop offset="100%" stop-color="%23ff6b6b"/>
    </linearGradient>
  </defs>
  <rect width="800" height="300" fill="url(%23bg)" />
  <!-- Palm Silhouette -->
  <path d="M0 300 Q 150 200, 100 0 L 120 0 Q 180 200, 0 320 Z" fill="%232d3142" opacity="0.15" />
  <!-- Travel Stamps -->
  <circle cx="650" cy="150" r="60" fill="none" stroke="%23ffffff" stroke-width="4" stroke-dasharray="8 6" opacity="0.3" />
  <text x="650" y="155" font-family="'Inter', sans-serif" font-weight="bold" font-size="20" fill="%23ffffff" opacity="0.4" text-anchor="middle">PASSPORT</text>
  <!-- Sunglasses Icon -->
  <path d="M250 120 Q 300 120, 310 140 Q 310 170, 280 170 Q 250 170, 250 140 Z" fill="%232d3142" opacity="0.2" />
  <path d="M370 120 Q 420 120, 430 140 Q 430 170, 400 170 Q 370 170, 370 140 Z" fill="%232d3142" opacity="0.2" />
  <path d="M310 135 L 370 135" stroke="%232d3142" stroke-width="6" opacity="0.2" />
</svg>`;

export const DINING_COOKING_CLASS = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="%23fb8500"/>
      <stop offset="100%" stop-color="%23ffb703"/>
    </linearGradient>
  </defs>
  <rect width="600" height="400" fill="url(%23bg)" />
  <!-- Cooking pot and fork/spoon silhouette -->
  <circle cx="300" cy="200" r="100" fill="%23ffffff" opacity="0.15" />
  <!-- Chef hat outline -->
  <path d="M260 170 C240 170, 240 140, 260 140 C250 110, 290 100, 300 120 C310 100, 350 110, 340 140 C360 140, 360 170, 340 170 Z" fill="%23ffffff" opacity="0.8" />
  <rect x="270" y="165" width="60" height="20" rx="3" fill="%23ffffff" opacity="0.8" />
  <line x1="260" y1="210" x2="340" y2="210" stroke="%23ffffff" stroke-width="5" stroke-linecap="round" opacity="0.8" />
</svg>`;

export const ITINERARY_DAY1_BG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="%230b0c10"/>
      <stop offset="100%" stop-color="%231f2833"/>
    </linearGradient>
  </defs>
  <rect width="600" height="400" fill="url(%23bg)" />
  <!-- Stars -->
  <circle cx="100" cy="80" r="1.5" fill="%23ffffff" opacity="0.8"/>
  <circle cx="250" cy="50" r="1" fill="%23ffffff" opacity="0.5"/>
  <circle cx="450" cy="120" r="2" fill="%23ffffff" opacity="0.9"/>
  <circle cx="520" cy="60" r="1.5" fill="%23ffffff" opacity="0.6"/>
  <!-- Airplane Taking Off -->
  <path d="M120 280 L 400 160 L 415 163 L 425 150 L 390 155 L 250 215 L 200 190 Z" fill="%2366fcf1" opacity="0.8" />
  <path d="M400 160 Q 480 120, 520 100" stroke="%2366fcf1" stroke-width="2" stroke-dasharray="5 5" fill="none" opacity="0.6" />
</svg>`;

export const ITINERARY_DAY3_BG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="%234cc9f0"/>
      <stop offset="100%" stop-color="%234895ef"/>
    </linearGradient>
  </defs>
  <rect width="600" height="400" fill="url(%23bg)" />
  <!-- Limestone Island Silhouette -->
  <path d="M200 400 C 220 280, 200 150, 280 180 C 310 200, 270 300, 320 400 Z" fill="%231a1b2f" opacity="0.25" />
  <path d="M310 400 C 330 320, 340 220, 390 240 C 420 250, 380 340, 420 400 Z" fill="%231a1b2f" opacity="0.15" />
  <!-- Floating boat silhouette -->
  <path d="M100 320 L 160 320 L 170 310 L 95 310 Z" fill="%231a1b2f" opacity="0.3" />
  <line x1="130" y1="310" x2="130" y2="280" stroke="%231a1b2f" stroke-width="2" opacity="0.3" />
</svg>`;

// Gallery Specific Categorized Beautiful Vectors
export const GALLERY_ITINERARY = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="%23a0c4ff"/>
      <stop offset="100%" stop-color="%23caffbf"/>
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(%23g)" />
  <text x="200" y="160" font-family="'Montserrat', sans-serif" font-weight="900" font-size="64" fill="%23ffffff" opacity="0.6" text-anchor="middle">FLIGHT</text>
</svg>`;

export const GALLERY_PARTY = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="%23ff007f"/>
      <stop offset="100%" stop-color="%237f00ff"/>
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(%23g)" />
  <text x="200" y="160" font-family="'Montserrat', sans-serif" font-weight="900" font-size="64" fill="%23ffffff" opacity="0.5" text-anchor="middle">PARTY</text>
</svg>`;

export const GALLERY_HOTEL = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="%23ffd166"/>
      <stop offset="100%" stop-color="%2306d6a0"/>
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(%23g)" />
  <text x="200" y="160" font-family="'Montserrat', sans-serif" font-weight="900" font-size="64" fill="%23ffffff" opacity="0.5" text-anchor="middle">RESORT</text>
</svg>`;

export const GALLERY_BEACH = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="%23118ab2"/>
      <stop offset="100%" stop-color="%23ffd166"/>
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(%23g)" />
  <text x="200" y="160" font-family="'Montserrat', sans-serif" font-weight="900" font-size="64" fill="%23ffffff" opacity="0.5" text-anchor="middle">BEACH</text>
</svg>`;

export const GALLERY_NATURE = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="%23023e8a"/>
      <stop offset="100%" stop-color="%230096c7"/>
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(%23g)" />
  <text x="200" y="160" font-family="'Montserrat', sans-serif" font-weight="900" font-size="64" fill="%23ffffff" opacity="0.5" text-anchor="middle">NATURE</text>
</svg>`;
