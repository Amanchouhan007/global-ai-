import React from 'react';

/**
 * HealthOrbitLogo - Official Vector Emblem for Health Orbit Pro™
 * Represents continuous 360° health protection, clinical evidence,
 * and AI Co-Intelligence in harmonious dynamic orbit.
 */
export default function HealthOrbitLogo({
  className = "w-9 h-9 sm:w-10 sm:h-10",
  idPrefix = "hop-logo"
}) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <svg
        viewBox="0 0 48 48"
        className="w-full h-full drop-shadow-xs select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Emerald to Mint Primary Orbit Gradient */}
          <linearGradient id={`${idPrefix}-emerald-grad`} x1="4" y1="8" x2="44" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0D5C3A" />
            <stop offset="60%" stopColor="#059669" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>

          {/* Rose to Coral Accent Gradient */}
          <linearGradient id={`${idPrefix}-rose-grad`} x1="12" y1="12" x2="36" y2="36" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#D81B60" />
            <stop offset="100%" stopColor="#FB7185" />
          </linearGradient>

          {/* Deep Clinical Shield Shadow */}
          <radialGradient id={`${idPrefix}-core-glow`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E6F4EA" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#E6F4EA" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. Subtle Radial Aura */}
        <circle cx="24" cy="24" r="21" fill={`url(#${idPrefix}-core-glow)`} />

        {/* 2. Outer Dynamic Orbit Ring (Tilted -28°) */}
        <g transform="rotate(-28 24 24)">
          <ellipse
            cx="24"
            cy="24"
            rx="20"
            ry="8.5"
            stroke={`url(#${idPrefix}-emerald-grad)`}
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeDasharray="88 8"
          />
          {/* Luminous AI Satellite Node on Orbit */}
          <circle cx="44" cy="24" r="3.2" fill="#D81B60" />
          <circle cx="44" cy="24" r="1.6" fill="#FFFFFF" />
        </g>

        {/* 3. Secondary Interlocking Orbit Arc (Tilted +35°) */}
        <g transform="rotate(35 24 24)">
          <path
            d="M5 24C5 29.5 13.5 34 24 34C34.5 34 43 29.5 43 24"
            stroke="#0D9488"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeDasharray="2 3"
            opacity="0.85"
          />
        </g>

        {/* 4. Central Clinical Health Core: Rounded Cross (+) */}
        {/* Vertical Cross Bar */}
        <rect
          x="20.5"
          y="11"
          width="7"
          height="26"
          rx="3.5"
          fill="#0D5C3A"
          stroke="#FFFFFF"
          strokeWidth="1.2"
        />
        {/* Horizontal Cross Bar */}
        <rect
          x="11"
          y="20.5"
          width="26"
          height="7"
          rx="3.5"
          fill="#0D5C3A"
          stroke="#FFFFFF"
          strokeWidth="1.2"
        />

        {/* 5. Central Rose Heart / Vital Pulse Gem */}
        <circle cx="24" cy="24" r="4.2" fill={`url(#${idPrefix}-rose-grad)`} />
        <circle cx="24" cy="24" r="1.8" fill="#FFFFFF" opacity="0.95" />
      </svg>
    </div>
  );
}
