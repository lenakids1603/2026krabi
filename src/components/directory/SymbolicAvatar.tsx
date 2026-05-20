import React from 'react';

interface SymbolicAvatarProps {
  gender?: '男' | '女';
  group: string;
  name: string;
  className?: string;
}

// Deterministic hash helper to get stable colors and styles per contact
const getDeterministicValue = (str: string, index: number, max: number): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash + index) % max;
};

export function SymbolicAvatar({ gender, group, name, className = "w-20 h-20" }: SymbolicAvatarProps): React.JSX.Element {
  // 1. Department background themes using adorable, soft color choices (high visual aesthetics)
  const getDeptBg = (dept: string) => {
    switch (dept) {
      case 'BOSS':
        return { start: '#1E293B', end: '#475569', label: 'BOSS', shirt: '#F1F5F9', collar: '#64748B' };
      case '直播组':
        return { start: '#FFE4E6', end: '#FB7185', label: 'LIVE', shirt: '#FFE4E6', collar: '#FDA4AF' };
      case '运营':
        return { start: '#CCFBF1', end: '#2DD4BF', label: 'OPER', shirt: '#F0FDFA', collar: '#99F6E4' };
      case '客服':
        return { start: '#E0F2FE', end: '#38BDF8', label: 'CS', shirt: '#F0F9FF', collar: '#BAE6FD' };
      case '开发':
        return { start: '#E0E7FF', end: '#6366F1', label: 'DEV', shirt: '#EEF2FF', collar: '#C7D2FE' };
      case '财务':
        return { start: '#FEF3C7', end: '#F59E0B', label: 'FIN', shirt: '#FFFDF5', collar: '#FDE68A' };
      case '行政':
        return { start: '#FCE7F3', end: '#F472B6', label: 'ADMIN', shirt: '#FDF2F8', collar: '#FBCFE8' };
      case '采购':
        return { start: '#DCFCE7', end: '#4ADE80', label: 'BUY', shirt: '#F0FDF4', collar: '#BBF7D0' };
      case '亲友团':
      default:
        return { start: '#F5F3FF', end: '#A78BFA', label: 'GUEST', shirt: '#FAF5FF', collar: '#DDD6FE' };
    }
  };

  const theme = getDeptBg(group);

  // Safe unique hashes for DOM id references
  const safeNameHash = name.split('').map(c => c.charCodeAt(0).toString(36)).join('').substring(0, 10);
  const safeGroupHash = group.split('').map(c => c.charCodeAt(0).toString(36)).join('').substring(0, 6);
  const gradId = `face-grad-${safeNameHash}-${safeGroupHash}`;

  // Deterministic styling choices based on name
  const skinIndex = getDeterministicValue(name, 1, 4);
  const hairStyleIndex = getDeterministicValue(name, 2, 4);
  const hairColorIndex = getDeterministicValue(name, 3, 5);
  const eyeStyleIndex = getDeterministicValue(name, 4, 3);
  const hasGlasses = getDeterministicValue(name, 5, 10) < 4; // 40% chance of wearing nerdy/cool round glasses
  const hasAccessory = getDeterministicValue(name, 6, 10) < 3; // 30% chance of hairpin/headband details

  // Skin tone choices (soft, warm, cute human tones)
  const skins = ['#FFD8BE', '#FFE5D9', '#FED1A3', '#FFCAD4'];
  const skinColor = skins[skinIndex];

  // Hair color choices (polished, highly matching modern colors)
  const hairColors = ['#2C3E50', '#1E293B', '#3E2723', '#4E342E', '#8E44AD'];
  const hairColor = hairColors[hairColorIndex];

  // Global sketch-style thin outlines to prevent any bleeding with background colors
  const outline = '#2D3748';
  const strokeWidth = '1.8';

  return (
    <svg 
      viewBox="0 0 100 100" 
      className={`${className} select-none overflow-hidden hover:scale-105 transition-all duration-300 shadow-md bg-white rounded-full`}
      aria-label={`${name}的生动卡通个人头像`}
    >
      <defs>
        {/* Soft, beautiful radial and linear gradients for backdrops */}
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={theme.start} />
          <stop offset="100%" stopColor={theme.end} />
        </linearGradient>
      </defs>

      {/* 1. Backdrop Circle with Gradient */}
      <circle cx="50" cy="50" r="49" fill={`url(#${gradId})`} />

      {/* 2. Soft Backdrop Glow / Ambient Light circles */}
      <circle cx="50" cy="50" r="44" stroke="#FFFFFF" strokeWidth="0.5" strokeOpacity="0.2" fill="none" />

      {/* 3. Back Hair Layers (Mainly for girls ponytail / space buns or long curls) */}
      {gender === '女' && (
        <g fill={hairColor} stroke={outline} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          {hairStyleIndex === 0 && (
            // Style 0: Cute double twin tails
            <>
              <path d="M 28 45 C 18 45, 12 60, 16 72 C 18 74, 21 72, 23 68 C 26 58, 28 52, 29 48 Z" />
              <path d="M 72 45 C 82 45, 88 60, 84 72 C 82 74, 79 72, 77 68 C 74 58, 72 52, 71 48 Z" />
            </>
          )}
          {hairStyleIndex === 1 && (
            // Style 1: Elegant high side ponytail
            <path d="M 68 34 C 74 30, 85 32, 82 52 C 81 55, 76 50, 72 44 Z" />
          )}
          {hairStyleIndex === 2 && (
            // Style 2: Flowing long wavy hair shoulder locks
            <>
              <path d="M 33 46 C 24 55, 22 75, 27 84 C 30 84, 32 78, 32 70 Z" />
              <path d="M 67 46 C 76 55, 78 75, 73 84 C 70 84, 68 78, 68 70 Z" />
            </>
          )}
          {hairStyleIndex === 3 && (
            // Style 3: Space buns on top
            <>
              <circle cx="32" cy="22" r="7" />
              <circle cx="68" cy="22" r="7" />
            </>
          )}
        </g>
      )}

      {/* 4. Neck Line */}
      <rect 
        x="45" 
        y="58" 
        width="10" 
        height="12" 
        rx="4" 
        fill={skinColor} 
        stroke={outline} 
        strokeWidth={strokeWidth} 
        strokeLinejoin="round" 
      />

      {/* 5. Clothes & Shoulder Area */}
      <g>
        {/* Shoulder template base */}
        <path 
          d="M 26 78 C 26 70, 74 70, 74 78 L 79 98 L 21 98 Z" 
          fill={theme.shirt} 
          stroke={outline} 
          strokeWidth={strokeWidth} 
          strokeLinejoin="round" 
        />
        {/* Adorable collar insert with matching group color accent */}
        <path 
          d="M 40 71 Q 50 78, 60 71" 
          fill="none" 
          stroke={outline} 
          strokeWidth={strokeWidth} 
          strokeLinecap="round" 
        />
        <path 
          d="M 40 71 Q 50 78, 60 71 L 50 96 Z" 
          fill={theme.collar} 
          fillOpacity="0.4" 
        />
        {/* Soft shirt details / pocket or button */}
        <circle cx="50" cy="85" r="1.5" fill={outline} />
        <circle cx="50" cy="91" r="1.5" fill={outline} />
      </g>

      {/* 6. Human Ears (Drawn before face cheeks for cleanliness) */}
      <g fill={skinColor} stroke={outline} strokeWidth={strokeWidth}>
        <circle cx="28.5" cy="50" r="4.5" />
        <circle cx="71.5" cy="50" r="4.5" />
      </g>

      {/* 7. Adorable Round Face Form */}
      {/* Dynamic curves guaranteeing cheeks look cute, sweet, and comforting */}
      <path 
        d="M 31 49 C 31 36, 69 36, 69 49 Q 69 64, 50 67 Q 31 64, 31 49 Z" 
        fill={skinColor} 
        stroke={outline} 
        strokeWidth={strokeWidth} 
        strokeLinejoin="round" 
      />

      {/* 8. Forehead Hair / Hair Bangs Layer (Drawn on top of face outline) */}
      <g fill={hairColor} stroke={outline} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        {gender === '女' ? (
          <>
            {hairStyleIndex === 0 && (
              // Style 0: Cute straight Hime cutoff bangs
              <path d="M 29.5 45 C 32 26, 68 26, 70.5 45 C 67 42, 60 41, 50 43 C 40 41, 33 42, 29.5 45 Z" />
            )}
            {hairStyleIndex === 1 && (
              // Style 1: Split side bangs with soft locks
              <path d="M 29.5 45 C 32 26, 68 26, 70.5 45 C 63 38, 54 36, 49 44 C 44 36, 37 38, 29.5 45 Z" />
            )}
            {hairStyleIndex === 2 && (
              // Style 2: Wavy wispy fringe curls
              <path d="M 29.5 45 C 32 25, 68 25, 70.5 45 C 67 43, 63 43, 60 40 Q 55 45, 50 40 Q 45 45, 40 40 Q 33 43, 29.5 45 Z" />
            )}
            {hairStyleIndex === 3 && (
              // Style 3: Clean sleek parting bangs wrapping the ears
              <path d="M 29.5 43 C 32 24, 68 24, 70.5 43 L 70.5 47 C 70.5 43, 62 41, 50 41 C 38 41, 29.5 43, 29.5 47 Z" />
            )}
          </>
        ) : (
          // Male Haircuts (Sleek, charming, absolutely non-creepy, cool design)
          <>
            {hairStyleIndex === 0 && (
              // Style 0: Classic gentle side-swept fringe
              <path d="M 29.5 44 C 32 25, 68 25, 70.5 44 C 62 34, 46 32, 34 39 Z" />
            )}
            {hairStyleIndex === 1 && (
              // Style 1: Trendy middle-parted curtain hair
              <path d="M 29.5 44 C 32 25, 68 25, 70.5 44 C 66 38, 56 35, 50 42 C 44 35, 34 38, 29.5 44 Z" />
            )}
            {hairStyleIndex === 2 && (
              // Style 2: Cool spiked crop (softly rounded spikes)
              <path d="M 29.5 44 C 27.5 38, 31 35, 34 38 C 37 32, 43 30, 46 35 C 50 28, 56 30, 58 35 C 63 32, 67.5 35, 70.5 44 C 64 38, 36 38, 29.5 44 Z" />
            )}
            {hairStyleIndex === 3 && (
              // Style 3: Textured curly flow top haircut
              <path d="M 29.5 44 C 29.5 31, 38 27, 50 27 C 62 27, 70.5 31, 70.5 44 C 63 41, 59 41, 57 37 Q 50 43, 43 37 Q 37 41, 29.5 44" />
            )}
          </>
        )}
      </g>

      {/* 9. Expressive Eyebrows (Beautiful, relaxed happy arcs in charcoal) */}
      <g stroke={outline} strokeWidth="1.6" strokeLinecap="round" fill="none">
        <path d="M 37 41.5 Q 40.5 39.5, 44 41.5" />
        <path d="M 56 41.5 Q 59.5 39.5, 63 41.5" />
      </g>

      {/* 10. Chibi / Anime Eye Sparkle Orbs - Guaranteed Adorable, Comforting (Not creepy!) */}
      <g>
        {eyeStyleIndex === 0 && (
          // Style 0: Sparkling circular eyes (Alive, energetic black spheres with bright white reflection iris)
          <>
            <circle cx="41.5" cy="48" r="3" fill={outline} />
            <circle cx="58.5" cy="48" r="3" fill={outline} />
            {/* Soft, charming white light reflections */}
            <circle cx="42.5" cy="46.8" r="0.9" fill="#FFFFFF" />
            <circle cx="59.5" cy="46.8" r="0.9" fill="#FFFFFF" />
          </>
        )}
        {eyeStyleIndex === 1 && (
          // Style 1: Warm laughing closed crescent arch eyes (^.^) - super polite and friendly!
          <g stroke={outline} strokeWidth="2.4" strokeLinecap="round" fill="none">
            <path d="M 38.5 48.5 Q 41.5 45.5, 44.5 48.5" />
            <path d="M 55.5 48.5 Q 58.5 45.5, 61.5 48.5" />
          </g>
        )}
        {eyeStyleIndex === 2 && (
          // Style 2: Energetic wink (One eye looking bright, one eye happy squinting/winking)
          <>
            {/* Left Eye: Open & shiny */}
            <circle cx="41.5" cy="48" r="3" fill={outline} />
            <circle cx="42.5" cy="46.8" r="0.9" fill="#FFFFFF" />
            {/* Right Eye: Clapped happy wink */}
            <path d="M 55.5 48.5 Q 58.5 45.5, 61.5 48.5" stroke={outline} strokeWidth="2.4" strokeLinecap="round" fill="none" />
          </>
        )}
      </g>

      {/* 11. Super Sweet Rosy Blush (Pure anime cuteness, instantly removes creepiness!) */}
      <g fill="#FF6B81" fillOpacity="0.32">
        <ellipse cx="36" cy="53" rx="4.5" ry="3.5" />
        <ellipse cx="64" cy="53" rx="4.5" ry="3.5" />
      </g>

      {/* 12. Gentle Central Nose Bridge (Notion vector style, subtle and aesthetic) */}
      <path 
        d="M 50 49 Q 48.5 52, 50 52.5" 
        fill="none" 
        stroke={outline} 
        strokeWidth="1.2" 
        strokeLinecap="round" 
        opacity="0.4"
      />

      {/* 13. Cheerful Laughing Smile or Soft Side Smirk */}
      <g>
        {eyeStyleIndex === 1 ? (
          // Style: Large open happy smile with red tongue details
          <>
            <path 
              d="M 45 56 Q 50 63, 55 56 Z" 
              fill="#E74C3C" 
              stroke={outline} 
              strokeWidth={strokeWidth} 
              strokeLinejoin="round" 
            />
            {/* Tongue detail */}
            <path 
              d="M 47 59.5 Q 50 58, 53 59.5 Q 50 62.5, 47 59.5" 
              fill="#FF8A80" 
              opacity="0.95" 
            />
          </>
        ) : (
          // Style: Cozy thin micro curved lip-line
          <path 
            d="M 45.5 57.5 Q 50 61, 54.5 57.5" 
            fill="none" 
            stroke={outline} 
            strokeWidth="2" 
            strokeLinecap="round" 
          />
        )}
      </g>

      {/* 14. Optional Cool Glasses (Ensuring beautiful smart look, no dark void eyes!) */}
      {hasGlasses && (
        <g stroke={outline} strokeWidth="1.8" fill="none">
          {/* Glass lens rims */}
          <circle cx="41.5" cy="48" r="6.5" stroke="#4A5568" strokeWidth="1.6" />
          <circle cx="58.5" cy="48" r="6.5" stroke="#4A5568" strokeWidth="1.6" />
          {/* Glasses bridge */}
          <line x1="48" y1="48" x2="52" y2="48" stroke="#4A5568" strokeWidth="1.8" />
          {/* Reflect glare line */}
          <path d="M 38 45.5 L 40.5 43" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.4" />
          <path d="M 55 45.5 L 57.5 43" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.4" />
        </g>
      )}

      {/* 15. Accessories layer (A tiny pink floral pin, a blue bead, or headphone bands) */}
      {hasAccessory && (
        <g>
          {gender === '女' ? (
            // A beautiful pink cherry flower accessory on the upper hair part
            <g transform="translate(32, 33)">
              <circle cx="0" cy="0" r="2.5" fill="#FF5252" />
              <circle cx="-2.5" cy="-1.5" r="1.8" fill="#FF8A80" />
              <circle cx="2.5" cy="-1.5" r="1.8" fill="#FF8A80" />
              <circle cx="1.8" cy="2" r="1.8" fill="#FF8A80" />
              <circle cx="-1.8" cy="2" r="1.8" fill="#FF8A80" />
              <circle cx="0" cy="0" r="0.8" fill="#FFF" />
            </g>
          ) : (
            // Stylish dynamic spark / cute ear studs / cool visor shade line
            <g transform="translate(68, 33)" stroke="#F59E0B" strokeWidth="1" fill="none">
              <path d="M 0,-2.5 L 0.6,-0.6 L 2.5,0 L 0.6,0.6 L 0,2.5 L -0.6,0.6 L -2.5,0 L -0.6,-0.6 Z" fill="#FBBF24" opacity="0.9" />
            </g>
          )}
        </g>
      )}

      {/* 16. Minimalist Sleek Department Overlaid Badge */}
      <rect 
        x="33" 
        y="5" 
        width="34" 
        height="9" 
        rx="4.5" 
        fill="#1E293B" 
        stroke="#FFFFFF" 
        strokeWidth="0.8" 
        strokeOpacity="0.25" 
      />
      <text 
        x="50" 
        y="11.2" 
        textAnchor="middle" 
        fill="#FFFFFF" 
        fontSize="4.8" 
        fontWeight="800" 
        letterSpacing="0.8"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
      >
        {theme.label}
      </text>
    </svg>
  );
}
