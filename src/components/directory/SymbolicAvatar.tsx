import React from 'react';

interface SymbolicAvatarProps {
  gender?: '男' | '女';
  group: string;
  name: string;
  className?: string;
}

// Deterministic value helper
const getDeterministicValue = (str: string, index: number, max: number): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash + index) % max;
};

export function SymbolicAvatar({ gender, group, name, className = "w-20 h-20" }: SymbolicAvatarProps): React.JSX.Element {
  // 1. Department Gradient Configurations (Vibrant Comic / Anime style gradient background backdrops)
  const getGradientColors = (dept: string) => {
    switch (dept) {
      case 'BOSS':
        return { start: '#111827', end: '#374151', text: '#FBBF24', label: 'BOSS' };
      case '直播组':
        return { start: '#EF4444', end: '#F97316', text: '#FFFFFF', label: 'LIVE' };
      case '运营':
        return { start: '#0D9488', end: '#111827', text: '#38BDF8', label: 'OPER' };
      case '客服':
        return { start: '#0284C7', end: '#1E3A8A', text: '#7DD3FC', label: 'CS' };
      case '开发':
        return { start: '#4F46E5', end: '#1E1B4B', text: '#818CF8', label: 'DEV' };
      case '财务':
        return { start: '#D97706', end: '#78350F', text: '#FDE047', label: 'FIN' };
      case '行政':
        return { start: '#DB2777', end: '#4D062E', text: '#FBCFE8', label: 'ADMIN' };
      case '采购':
        return { start: '#059669', end: '#064E3B', text: '#6EE7B7', label: 'BUY' };
      case '亲友团':
      default:
        return { start: '#7C3AED', end: '#4338CA', text: '#F472B6', label: 'GUEST' };
    }
  };

  const colors = getGradientColors(group);
  const isFemale = gender === '女';

  // Hashing to build custom identities
  const safeNameHash = name.split('').map(c => c.charCodeAt(0).toString(36)).join('').substring(0, 10);
  const safeGroupHash = group.split('').map(c => c.charCodeAt(0).toString(36)).join('').substring(0, 6);
  const gradientId = `anime-grad-${safeNameHash}-${safeGroupHash}`;

  // Deterministic styling choices for Anime character
  const skinColors = ['#FFEFEB', '#FFE3DB', '#FFF5F0', '#FFF1EC'];
  const hairColors = [
    { base: '#3D2F2F', shadow: '#221919', highlights: '#5C4A4A' }, // Rich Dark Chocolate
    { base: '#2B2B36', shadow: '#16161D', highlights: '#444458' }, // Cool Graphite charcoal
    { base: '#3D2D54', shadow: '#1F1430', highlights: '#614B80' }, // Mysterious Deep Indigo
    { base: '#8F351B', shadow: '#591E0E', highlights: '#B8492A' }, // Striking Auburn Red
    { base: '#A36F1A', shadow: '#6B470D', highlights: '#CCA243' }, // Sunset Amber Ochre
    { base: '#AB3264', shadow: '#6B1B3C', highlights: '#D1588D' }, // Comic Raspberry Pink
    { base: '#15616D', shadow: '#0B343A', highlights: '#2B939E' }, // Deep Sea Teal
  ];

  const eyeColors = ['#8A2BE2', '#1E90FF', '#3CB371', '#FF4500', '#FF8C00', '#FF1493'];

  // Indices
  const skinIndex = getDeterministicValue(name, 1, skinColors.length);
  const hairColorObj = hairColors[getDeterministicValue(name, 2, hairColors.length)];
  const eyeColor = eyeColors[getDeterministicValue(name, 3, eyeColors.length)];
  const hairStyle = getDeterministicValue(name, 4, 3); // 3 styles per gender
  const expression = getDeterministicValue(name, 5, 3); // 3 facial expressions
  const hasGlasses = getDeterministicValue(name, 6, 10) > 7; // 20% anime glasses style
  const hasHeadphones = getDeterministicValue(name, 7, 10) > 8; // 10% cute music headphones style

  const skin = skinColors[skinIndex];
  const hairColor = hairColorObj.base;
  const hairShadow = hairColorObj.shadow;
  const hairHighlight = hairColorObj.highlights;

  // Outfit choice
  const outfitIndex = getDeterministicValue(name, 8, 3);
  const outfitColors = ['#1D2026', '#211E2E', '#9E1B1B', '#0E5C42', '#3B3B7A', '#1C5B8A'];
  const outfitColor = outfitColors[getDeterministicValue(name, 9, outfitColors.length)];

  // High-Contrast Anime Manga Lineart Stroke Attributes
  const outlineProps = {
    stroke: '#101216',
    strokeWidth: '1.4',
    strokeLinejoin: 'round' as const,
    strokeLinecap: 'round' as const
  };

  return (
    <svg 
      viewBox="0 0 100 100" 
      className={`${className} select-none overflow-hidden hover:scale-105 transition-all duration-300 shadow-xl rounded-full`}
      aria-label={`${name}的二次元动漫头像`}
    >
      <defs>
        {/* Dynamic backdrop sky-burst gradient */}
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors.start} />
          <stop offset="100%" stopColor={colors.end} />
        </linearGradient>

        <clipPath id="eye-clip-left">
          <rect x="34.5" y="37" width="10" height="13" rx="4.5" />
        </clipPath>
        <clipPath id="eye-clip-right">
          <rect x="55.5" y="37" width="10" height="13" rx="4.5" />
        </clipPath>

        {/* Dynamic character silhouette drop glow to separate perfectly from any dark, warm, or colorful backgrounds */}
        <filter id="character-pop" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#FFFFFF" floodOpacity="0.45" />
        </filter>
      </defs>

      {/* 1. Backdrop circular vector grid & sky-burst gradient */}
      <circle cx="50" cy="50" r="49" fill={`url(#${gradientId})`} />
      
      {/* Light glow ring */}
      <circle cx="50" cy="50" r="46" fill="none" stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.18" />

      {/* Subtle diagonal speed/comic lines for Anime vibe */}
      <g stroke="#FFFFFF" strokeOpacity="0.08" strokeWidth="0.6">
        <line x1="10" y1="0" x2="100" y2="90" />
        <line x1="0" y1="20" x2="80" y2="100" />
        <line x1="30" y1="0" x2="100" y2="70" />
        <line x1="0" y1="50" x2="50" y2="100" />
      </g>

      {/* 2. Character Render Group - With pop outline filter to handle background visibility perfectly */}
      <g filter="url(#character-pop)">
        {/* Shadow cast under character torso */}
        <ellipse cx="50" cy="94" rx="22" ry="6" fill="#000000" opacity="0.3" />

        {/* 3. Neck & Shading */}
        {/* Neck base with outline */}
        <rect x="44" y="52" width="12" height="15" fill={skin} {...outlineProps} />
        {/* Shadow on neck under chin */}
        <path d="M 44 52 L 50 62 L 56 52 Z" fill="#D3A08E" opacity="0.6" />

        {/* 4. Shoulder & Anime Outfits (Crisp high-contrast anime collar shapes) */}
        {outfitIndex === 0 && (
          // Style 0: Cool High-Collar Zip Track Jacket (Gojo / Jujutsu High style)
          <g>
            <path d="M 18 88 C 18 72, 28 64, 50 64 C 72 64, 82 72, 82 88 Z" fill={outfitColor} {...outlineProps} />
            <path d="M 36 60 L 36 71 L 50 76 L 64 71 L 64 60 Z" fill={outfitColor} {...outlineProps} />
            {/* Lining and golden center copper-zipper */}
            <line x1="50" y1="64" x2="50" y2="88" stroke="#FBBF24" strokeWidth="1.5" strokeDasharray="3 1" />
            <path d="M 48 60 H 52" stroke="#FBBF24" strokeWidth="2.5" />
          </g>
        )}

        {outfitIndex === 1 && (
          // Style 1: Cozy Hoodie with Contrast Collar & White Drawstrings (Modern casual)
          <g>
            <path d="M 18 88 C 18 72, 28 66, 50 66 C 72 66, 82 72, 82 88 Z" fill={outfitColor} {...outlineProps} />
            {/* Bulky hood curves */}
            <path d="M 32 64 C 32 64, 42 63, 50 72 C 58 63, 68 64, 68 64 L 72 73 C 62 82, 38 82, 28 73 Z" fill={outfitColor} opacity="0.9" {...outlineProps} />
            <path d="M 44 66 L 50 74 L 56 66 Z" fill="#FFFFFF" {...outlineProps} />
            {/* Drawstrings dangling */}
            <path d="M 42 70 Q 40 78 41 83" fill="none" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="41" cy="83" r="1.2" fill="#FBBF24" />
            <path d="M 58 70 Q 60 78 59 83" fill="none" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="59" cy="83" r="1.2" fill="#FBBF24" />
          </g>
        )}

        {outfitIndex === 2 && (
          // Style 2: Elegant High V-neck Sweater Vest with inner White shirt (Academic Anime aesthetic)
          <g>
            {/* White base shirt */}
            <path d="M 18 88 C 18 72, 28 66, 50 66 C 72 66, 82 72, 82 88 Z" fill="#FFFFFF" {...outlineProps} />
            {/* Colored Vest */}
            <path d="M 22 88 C 22 74, 30 70, 50 70 C 70 70, 78 74, 78 88 Z" fill={outfitColor} {...outlineProps} />
            {/* Sharp V cut-out */}
            <path d="M 40 70 L 50 82 L 60 70 Z" fill="#FFFFFF" {...outlineProps} />
            {/* Dark tie */}
            <path d="M 49 71 L 51 71 L 53 85 L 50 88 L 47 85 Z" fill="#111827" />
            <ellipse cx="50" cy="72" rx="2.5" ry="1.5" fill="#EF4444" />
          </g>
        )}

        {/* 5. Face Outline Structure (Sharp Anime Jawline) with crisp hand-drawn outline */}
        <path 
          d="M 32 38 C 32 50, 42 59, 50 63 C 58 59, 68 50, 68 38 C 68 30, 32 30, 32 38 Z" 
          fill={skin} 
          {...outlineProps}
        />

        {/* Thin ear coordinates */}
        <ellipse cx="31" cy="42" rx="2" ry="4" fill={skin} {...outlineProps} />
        <ellipse cx="69" cy="42" rx="2" ry="4" fill={skin} {...outlineProps} />

        {/* Soft shadow cast on head upper band */}
        <path d="M 32 38 C 36 33, 64 33, 68 38 C 68 40, 32 40, 32 38 Z" fill="#000000" opacity="0.08" />

        {/* 6. Sharp Cheek Blush lines (Diagonal Anime speedlines) */}
        <g stroke="#F43F5E" strokeWidth="0.8" strokeLinecap="round" opacity="0.75">
          {/* Left cheek */}
          <line x1="37.5" y1="47.5" x2="39" y2="50.5" />
          <line x1="39.5" y1="47.5" x2="41" y2="50.5" />
          {/* Right cheek */}
          <line x1="59" y1="47.5" x2="60.5" y2="50.5" />
          <line x1="61" y1="47.5" x2="62.5" y2="50.5" />
        </g>

        {/* 7. Eyes (Huge sparkly Anime-Girl / Boy glossy vector eyes) */}
        <g>
          {/* Left Eye */}
          {/* Upper thick eyelash shadow mascara shape */}
          <path d="M 31 38 C 34 33, 43 33, 47 38 L 47.8 36.5 C 43 31, 33 32, 29.8 36.5 Z" fill="#111216" />
          {/* Left Iris */}
          <g clipPath="url(#eye-clip-left)">
            <rect x="34.5" y="37" width="10" height="13" rx="4.5" fill={eyeColor} />
            {/* Bottom crescent highlight */}
            <path d="M 35.5 44 C 37 48, 42 48, 43.5 44" fill="none" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.6" />
            {/* Dark pupil center */}
            <ellipse cx="39.5" cy="43.5" rx="2.2" ry="3.5" fill="#111827" />
          </g>
          {/* Gloss spark highlights */}
          <circle cx="37.5" cy="40" r="1.8" fill="#FFFFFF" />
          <circle cx="42" cy="44.5" r="0.9" fill="#FFFFFF" />

          {/* Right Eye */}
          {/* Upper thick eyelash shadow mascara shape */}
          <path d="M 53 38 C 57 33, 66 33, 69 38 L 70.2 36.5 C 67 31, 57 32, 52.2 36.5 Z" fill="#111216" />
          {/* Right Iris */}
          <g clipPath="url(#eye-clip-right)">
            <rect x="55.5" y="37" width="10" height="13" rx="4.5" fill={eyeColor} />
            {/* Bottom crescent highlight */}
            <path d="M 56.5 44 C 58 48, 63 48, 64.5 44" fill="none" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.6" />
            {/* Dark pupil center */}
            <ellipse cx="60.5" cy="43.5" rx="2.2" ry="3.5" fill="#111827" />
          </g>
          {/* Gloss spark highlights */}
          <circle cx="58.5" cy="40" r="1.8" fill="#FFFFFF" />
          <circle cx="63" cy="44.5" r="0.9" fill="#FFFFFF" />

          {/* Minimal under-eyelash ticks */}
          <path d="M 34.5 47.5 Q 39.5 48.5 44.5 47.5" fill="none" stroke="#111216" strokeWidth="0.8" />
          <path d="M 55.5 47.5 Q 60.5 48.5 65.5 47.5" fill="none" stroke="#111216" strokeWidth="0.8" />

          {/* Stylish slender eyebrows */}
          <path d="M 30 31.5 Q 38.5 28 44.5 32" fill="none" stroke="#111216" strokeWidth="1" strokeLinecap="round" />
          <path d="M 55.5 32 Q 61.5 28 70 31.5" fill="none" stroke="#111216" strokeWidth="1" strokeLinecap="round" />
        </g>

        {/* 8. Nose & Mouth Details */}
        {/* Fine-tip anime nose shadow */}
        <path d="M 49.5 48.5 L 50.5 50.5 L 49.5 51" fill="none" stroke="#C3856E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />

        {/* Smart expressions */}
        {expression === 0 && (
          // Cute dynamic smirk (Classic manga protagonist)
          <path d="M 45 54.5 Q 51.5 57 55 52.5" fill="none" stroke="#111216" strokeWidth="1.5" strokeLinecap="round" />
        )}
        {expression === 1 && (
          // Sweet anime open-mouth gasp/smile
          <path d="M 46 54 Q 50 58.5 54 54 Z" fill="#FF7E9B" stroke="#111216" strokeWidth="1.2" strokeLinejoin="round" />
        )}
        {expression === 2 && (
          // Calm smart neutral curve
          <path d="M 45.5 54 C 47.5 55, 52.5 55, 54.5 54" fill="none" stroke="#111216" strokeWidth="1.5" strokeLinecap="round" />
        )}

        {/* 9. Optional Cyberpunk Glasses Accessory */}
        {hasGlasses && (
          <g>
            <circle cx="39.5" cy="42.5" r="7" fill="none" stroke="#F59E0B" strokeWidth="1.5" />
            <circle cx="60.5" cy="42.5" r="7" fill="none" stroke="#F59E0B" strokeWidth="1.5" />
            <path d="M 46.5 42 Q 50 40.5 53.5 42" fill="none" stroke="#F59E0B" strokeWidth="1.5" />
            {/* Chic lens glare reflection lines */}
            <line x1="36.5" y1="39.5" x2="39" y2="42" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.8" />
            <line x1="57.5" y1="39.5" x2="60" y2="42" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.8" />
          </g>
        )}

        {/* 10. Ultimate Layer: Anime Hair (Deep, thick vector hair with highlights and shadow layers) */}
        {!isFemale ? (
          // ================= MALE ANIME HAIR GROUP =================
          hairStyle === 0 ? (
            // Male M1: Messy & Spiky Tousled Cut (Matches User's Reference!)
            <g>
              {/* Back Hair Underlay */}
              <path d="M 28 40 L 22 46 L 27 48 L 21 54 L 30 52 Z" fill={hairShadow} {...outlineProps} />
              <path d="M 72 40 L 78 46 L 73 48 L 79 54 L 70 52 Z" fill={hairShadow} {...outlineProps} />
              <path d="M 30 25 C 24 18, 30 14, 40 10 C 44 6, 56 6, 60 10 C 70 14, 76 18, 70 25 Z" fill={hairShadow} {...outlineProps} />

              {/* Front Spiky Canopy Base */}
              <path d="M 28 35 Q 23 26 31 18 Q 33 10 44 12 Q 52 7 60 14 Q 69 11 73 20 Q 77 28 72 36 L 68 28 C 65 20, 35 20, 32 28 Z" fill={hairColor} {...outlineProps} />

              {/* Dynamic spiky locks overlay */}
              <path d="M 33 13 L 28 6 L 37 10" fill={hairColor} {...outlineProps} />
              <path d="M 41 11 L 39 3 L 47 7" fill={hairColor} {...outlineProps} />
              <path d="M 51 9 L 55 2 L 58 8" fill={hairColor} {...outlineProps} />
              <path d="M 61 11 L 67 4 L 66 12" fill={hairColor} {...outlineProps} />

              {/* Front Bangs overlapping the forehead and eyes beautifully */}
              <path d="M 32 24 Q 35 34 38 43 Q 39 32 43 24" fill={hairColor} {...outlineProps} />
              <path d="M 40 24 Q 45 39 45 46 Q 47 34 50 24" fill={hairColor} {...outlineProps} />
              <path d="M 48 24 Q 51 36 53 44 Q 53 32 56 24" fill={hairColor} {...outlineProps} />
              <path d="M 54 24 Q 58 40 59 47 Q 59 31 62 24" fill={hairColor} {...outlineProps} />
              <path d="M 60 24 Q 63 33 65 41 Q 65 30 68 24" fill={hairColor} {...outlineProps} />

              {/* Hair Gloss shine lines */}
              <path d="M 34 19 Q 50 14 66 19 Q 62 21 50 17 Q 38 21 34 19" fill={hairHighlight} opacity="0.55" />
            </g>
          ) : hairStyle === 1 ? (
            // Male M2: Sweeping Emo Side-Part (Chic, covers one eye corner)
            <g>
              <path d="M 30 38 Q 23 26 34 14 Q 42 6 54 10 Q 64 6 71 16 Q 77 26 70 38 L 68 32 C 65 24, 35 24, 32 32 Z" fill={hairColor} {...outlineProps} />
              {/* Back curls */}
              <path d="M 28 42 Q 22 48 27 58 Q 30 48 31 42 Z" fill={hairShadow} {...outlineProps} />
              <path d="M 72 42 Q 78 48 73 58 Q 70 48 69 42 Z" fill={hairShadow} {...outlineProps} />

              {/* Long sweeping front cover lock */}
              <path d="M 32 22 Q 41 38 49 48 Q 44 30 45 22" fill={hairColor} {...outlineProps} />
              <path d="M 41 22 Q 52 36 58 46 Q 51 32 50 22" fill={hairColor} {...outlineProps} />
              {/* Other side fringe */}
              <path d="M 57 22 Q 65 33 71 36 Q 63 28 65 22" fill={hairColor} {...outlineProps} />

              {/* Shiny crescent bloom */}
              <path d="M 36 17 Q 50 11 64 17 Q 50 14 36 17" fill={hairHighlight} opacity="0.45" />
            </g>
          ) : (
            // Male M3: Active Spiky Punk (Sharp warrior spikes)
            <g>
              {/* Spikes framing top silhouette */}
              <polygon points="32,22 23,10 36,15" fill={hairColor} {...outlineProps} />
              <polygon points="36,15 30,3 44,11" fill={hairColor} {...outlineProps} />
              <polygon points="44,11 48,2 52,11" fill={hairColor} {...outlineProps} />
              <polygon points="52,11 60,3 58,15" fill={hairColor} {...outlineProps} />
              <polygon points="58,15 68,10 63,22" fill={hairColor} {...outlineProps} />

              {/* Front hair canopy */}
              <path d="M 32 25 H 68 L 65 38 Q 50 34 35 38 Z" fill={hairColor} {...outlineProps} />
              {/* Jagged bangs */}
              <polygon points="33,25 37,38 41,25" fill={hairColor} {...outlineProps} />
              <polygon points="41,25 45,41 49,25" fill={hairColor} {...outlineProps} />
              <polygon points="51,25 55,41 59,25" fill={hairColor} {...outlineProps} />
              <polygon points="59,25 63,38 67,25" fill={hairColor} {...outlineProps} />

              {/* Back side burns */}
              <path d="M 29 38 L 22 45 L 30 43 Z" fill={hairShadow} {...outlineProps} />
              <path d="M 71 38 L 78 45 L 70 43 Z" fill={hairShadow} {...outlineProps} />
            </g>
          )
        ) : (
          // ================= FEMALE ANIME HAIR GROUP =================
          hairStyle === 0 ? (
            // Female F1: Double Playful Odango Buns with hair strings
            <g>
              {/* Left & Right fluffy thick circular buns */}
              <circle cx="26" cy="18" r="8.5" fill={hairColor} {...outlineProps} />
              <circle cx="26" cy="18" r="6" fill={hairShadow} {...outlineProps} />
              <circle cx="74" cy="18" r="8.5" fill={hairColor} {...outlineProps} />
              <circle cx="74" cy="18" r="6" fill={hairShadow} {...outlineProps} />

              {/* Bun bounds cords */}
              <path d="M 22 22 Q 26 25 30 22" fill="none" stroke="#EF4444" strokeWidth="1.2" />
              <path d="M 70 22 Q 74 25 78 22" fill="none" stroke="#EF4444" strokeWidth="1.2" />

              {/* Long framing strand hooks next to cheeks */}
              <path d="M 30 24 Q 24 45 27 56 Q 31 43 32 24" fill={hairColor} {...outlineProps} />
              <path d="M 70 24 Q 76 45 73 56 Q 69 43 68 24" fill={hairColor} {...outlineProps} />

              {/* Slick forehead center swoop bang */}
              <path d="M 34 24 Q 41 33 45 39 Q 41 29 44 24" fill={hairColor} {...outlineProps} />
              <path d="M 43 24 Q 50 33 57 39 Q 50 29 51 24" fill={hairColor} {...outlineProps} />

              {/* Gloss halo effect */}
              <circle cx="50" cy="22" r="1.5" fill="#FFFFFF" opacity="0.6" />
            </g>
          ) : hairStyle === 1 ? (
            // Female F2: Sweet Twin Ponytails with ribbon clips
            <g>
              {/* Fluffy long twin extensions */}
              <path d="M 24 24 Q 10 26 13 54 Q 20 48 24 32" fill={hairColor} {...outlineProps} />
              <path d="M 23 25 Q 12 30 16 48" fill={hairShadow} {...outlineProps} />

              <path d="M 76 24 Q 90 26 87 54 Q 80 48 76 32" fill={hairColor} {...outlineProps} />
              <path d="M 77 25 Q 88 30 84 48" fill={hairShadow} {...outlineProps} />

              {/* Red ribbons */}
              <circle cx="24" cy="24" r="2.5" fill="#EF4444" />
              <circle cx="76" cy="24" r="2.5" fill="#EF4444" />

              {/* Framing side locks and flat bangs (Cute Sailor style) */}
              <path d="M 28 24 Q 22 40 25 50" fill="none" stroke={hairColor} strokeWidth="2.5" strokeLinecap="round" {...outlineProps} />
              <path d="M 72 24 Q 78 40 75 50" fill="none" stroke={hairColor} strokeWidth="2.5" strokeLinecap="round" {...outlineProps} />

              {/* Horizontal clean frame across forehead */}
              <path d="M 30 24 C 30 24, 38 33, 50 33 C 62 33, 70 24, 70 24 L 69 34 C 62 34, 50 34, 31 34 Z" fill={hairColor} {...outlineProps} />

              {/* Gloss line */}
              <path d="M 33 16 Q 50 11 67 16 Q 50 14 33 16" fill={hairHighlight} opacity="0.5" />
            </g>
          ) : (
            // Female F3: Aesthetic Long Princess "Hime" Cut
            <g>
              {/* Long back sheets draping over the shoulders */}
              <path d="M 21 42 C 18 54, 19 72, 24 85 L 31 85 C 27 70, 28 55, 30 42 Z" fill={hairShadow} {...outlineProps} />
              <path d="M 79 42 C 82 54, 81 72, 76 85 L 69 85 C 73 70, 72 55, 70 42 Z" fill={hairShadow} {...outlineProps} />

              {/* Perfect horizontal straight anime bangs */}
              <path d="M 29 23 H 71 L 69 35 C 60 35, 50 36, 31 35 Z" fill={hairColor} {...outlineProps} />

              {/* Side strands cut bluntly at cheeks */}
              <rect x="28" y="32" width="3.5" height="20" rx="1" fill={hairColor} {...outlineProps} />
              <rect x="68.5" y="32" width="3.5" height="20" rx="1" fill={hairColor} {...outlineProps} />

              {/* Gloss halo */}
              <path d="M 34 16 Q 50 10 66 16 Q 50 13 34 16" fill={hairHighlight} opacity="0.65" />
            </g>
          )
        )}

        {/* 11. Optional Wireless Gaming / Music Headphones (Aesthetic detail) */}
        {hasHeadphones && (
          <g>
            {/* Arch wire band over the top of head */}
            <path d="M 28 20 Q 50 12 72 20" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.8" />
            {/* Ear cups */}
            <rect x="25" y="34" width="6" height="14" rx="2.5" fill="#EF4444" transform="rotate(-5, 28, 41)" />
            <rect x="69" y="34" width="6" height="14" rx="2.5" fill="#EF4444" transform="rotate(5, 72, 41)" />
            {/* Highlight glow dots */}
            <circle cx="28" cy="41" r="1.5" fill="#FFFFFF" opacity="0.6" />
            <circle cx="72" cy="41" r="1.5" fill="#FFFFFF" opacity="0.6" />
          </g>
        )}
      </g>

      {/* 12. Classy minimal anime-frame overlay department stamp */}
      <rect x="34" y="5" width="32" height="9" rx="4.5" fill="#111827" fillOpacity="0.75" />
      <text 
        x="50" 
        y="11.2" 
        textAnchor="middle" 
        fill={colors.text} 
        fontSize="5" 
        fontWeight="black" 
        fontFamily="system-ui, -apple-system, sans-serif"
        letterSpacing="0.8"
      >
        {colors.label}
      </text>
    </svg>
  );
}
