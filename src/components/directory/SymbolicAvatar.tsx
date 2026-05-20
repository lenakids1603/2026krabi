import React from 'react';

interface SymbolicAvatarProps {
  gender?: '男' | '女';
  group: string;
  name: string;
  className?: string;
}

export function SymbolicAvatar({ gender, group, name, className = "w-20 h-20" }: SymbolicAvatarProps): React.JSX.Element {
  // Select gradient colors based on department for a vibrant organization view
  const getGradientColors = (dept: string) => {
    switch (dept) {
      case 'BOSS':
        return {
          start: '#1A237E', // Royal Trust Indigo
          end: '#3F51B5',
          accent: '#FFD700', // Gold Accent
          label: 'BOSS'
        };
      case '直播组':
        return {
          start: '#FF416C', // Energetic Coral Pink
          end: '#FF4B2B',
          accent: '#FFF',
          label: 'LIVE'
        };
      case '运营':
        return {
          start: '#2A9D8F', // Ocean Teal
          end: '#264653',
          accent: '#E9C46A',
          label: 'OPER'
        };
      case '客服':
        return {
          start: '#00B4DB', // Bright Tech Blue
          end: '#0083B0',
          accent: '#A8DADC',
          label: 'SUPPORT'
        };
      case '开发':
        return {
          start: '#6A11CB', // Violet Tech
          end: '#2575FC',
          accent: '#FFF',
          label: 'TECH'
        };
      case '财务':
        return {
          start: '#D4AF37', // Gold Standard
          end: '#AA7C11',
          accent: '#FFF',
          label: 'FIN'
        };
      case '行政':
        return {
          start: '#FF8C00', // Warm Orange Admin
          end: '#FFD700',
          accent: '#D62828',
          label: 'ADMIN'
        };
      case '采购':
        return {
          start: '#11998E', // Fresh Procurement Green
          end: '#38EF7D',
          accent: '#FFF',
          label: 'PROCUR'
        };
      case '亲友团':
      default:
        return {
          start: '#EC4899', // Sweet Rose/Guest
          end: '#8B5CF6',
          accent: '#4CC9F0',
          label: 'GUEST'
        };
    }
  };

  const isFemale = gender === '女';
  const colors = getGradientColors(group);

  // Generate unique ID for linearGradient
  const gradientId = `avatar-grad-${encodeURIComponent(name.replace(/\s+/g, ''))}-${encodeURIComponent(group.replace(/\s+/g, ''))}`;

  return (
    <svg 
      viewBox="0 0 100 100" 
      className={`${className} select-none overflow-hidden transition-transform duration-300`}
      aria-label={`${name} (${gender || '未知'})`}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors.start} />
          <stop offset="100%" stopColor={colors.end} />
        </linearGradient>
      </defs>

      {/* Background Sphere with rich gradient */}
      <circle cx="50" cy="50" r="48" fill={`url(#${gradientId})`} />
      
      {/* Decorative Outer Ring */}
      <circle cx="50" cy="50" r="44" fill="none" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.15" />

      {isFemale ? (
        // FEMALE AVATAR - Minimalist, modern, highly polished vector silhouette
        <g>
          {/* Subtle drop shadow behind woman portrait */}
          <ellipse cx="50" cy="88" rx="20" ry="6" fill="#000000" opacity="0.1" />

          {/* Shoulders / Upper Torso */}
          <path 
            d="M 28 86 C 28 72, 36 67, 50 67 C 64 67, 72 72, 72 86 Z" 
            fill="#FFFFFF" 
            opacity="0.9" 
          />
          {/* Collar Line / Necklace detail */}
          <path 
            d="M 44 67 C 47 72, 53 72, 56 67" 
            fill="none" 
            stroke={colors.accent === '#FFF' ? '#FFFFFF' : colors.accent} 
            strokeWidth="3" 
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* Neck */}
          <rect x="46" y="55" width="8" height="14" rx="2" fill="#FFFFFF" />

          {/* Head */}
          <circle cx="50" cy="44" r="15" fill="#FFFFFF" />

          {/* Chic Hairbob / Bun Outline */}
          <path 
            d="M 33 44 C 33 28, 67 28, 67 44 C 67 36, 61 32, 50 32 C 39 32, 33 36, 33 44 Z" 
            fill="#FFFFFF" 
            opacity="0.95"
          />
          {/* Cute Side Hair Bob Buns */}
          <circle cx="50" cy="25" r="5" fill="#FFFFFF" />
          <circle cx="34" cy="42" r="4" fill="#FFFFFF" />
          <circle cx="66" cy="42" r="4" fill="#FFFFFF" />
        </g>
      ) : (
        // MALE AVATAR - Minimalist, modern, highly polished vector silhouette
        <g>
          {/* Subtle shadow */}
          <ellipse cx="50" cy="88" rx="22" ry="6" fill="#000000" opacity="0.1" />

          {/* Shoulders / Upper Torso with modern athletic cut */}
          <path 
            d="M 26 86 C 26 70, 34 65, 50 65 C 66 65, 74 70, 74 86 Z" 
            fill="#FFFFFF" 
            opacity="0.9" 
          />
          
          {/* Crew Neck or Collar styling */}
          <path 
            d="M 45 65 L 50 72 L 55 65 Z" 
            fill={colors.start} 
            opacity="0.8"
          />

          {/* Neck */}
          <rect x="45" y="54" width="10" height="14" rx="1.5" fill="#FFFFFF" />

          {/* Head */}
          <circle cx="50" cy="43" r="15" fill="#FFFFFF" />

          {/* Sharp Modern Hairstyling Outline */}
          <path 
            d="M 33 39 C 33 24, 46 22, 60 25 C 65 27, 67 32, 67 39 C 63 36, 57 34, 50 34 C 43 34, 37 36, 33 39 Z" 
            fill="#FFFFFF" 
            opacity="0.95"
          />
          {/* Sideburn and sharp front lock details */}
          <path d="M 33 38 L 35 43 L 37 38 Z" fill="#FFFFFF" />
          <path d="M 67 38 L 65 43 L 63 38 Z" fill="#FFFFFF" />
        </g>
      )}

      {/* Clean Minimal Text Overlay Stamp at the bottom of the mask */}
      <rect x="30" y="3" width="40" height="9" rx="4.5" fill="#FFFFFF" opacity="0.2" />
      <text 
        x="50" 
        y="9.5" 
        textAnchor="middle" 
        fill="#FFFFFF" 
        fontSize="5" 
        fontWeight="900" 
        fontFamily="system-ui, sans-serif"
        letterSpacing="0.8"
      >
        {colors.label}
      </text>
    </svg>
  );
}
