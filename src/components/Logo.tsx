import React from 'react';

export interface LogoProps {
  className?: string;
  primaryColor?: string;
  secondaryColor?: string;
}

/**
 * Pixel-perfect SVG recreation of the EM Soluções Digitais logo.
 * Expanded viewBox to prevent truncation and ensure brand fidelity.
 */
export default function Logo({
  className = ''
}: LogoProps) {
  // Exact brand colors from logo.jpg
  const brandNavy = '#0B315E';
  const brandOrange = '#F15A24';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1600 500"
      className={className}
      fill="none"
    >
      <defs>
        <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F98A1F" />
          <stop offset="100%" stopColor={brandOrange} />
        </linearGradient>
      </defs>

      {/* --- GLOBE GRAPHIC --- */}
      <g transform="translate(60, 60)">
        <circle cx="180" cy="180" r="175" stroke={brandOrange} strokeWidth="12" />
        <path d="M 10 180 L 350 180" stroke={brandOrange} strokeWidth="12" />
        <path d="M 40 100 Q 180 80 320 100" stroke={brandOrange} strokeWidth="12" />
        <path d="M 40 260 Q 180 280 320 260" stroke={brandOrange} strokeWidth="12" />
        <path d="M 180 10 L 180 350" stroke={brandOrange} strokeWidth="12" />
        <path d="M 180 10 Q 80 180 180 350" stroke={brandOrange} strokeWidth="12" fill="none" />
        <path d="M 180 10 Q 280 180 180 350" stroke={brandOrange} strokeWidth="12" fill="none" />
      </g>

      {/* --- LETTER E (NAVY) --- */}
      <path
        d="M 250 130 L 550 130 L 550 180 L 350 180 L 350 220 L 510 220 L 510 270 L 350 270 L 350 310 L 560 310 L 560 360 L 250 360 Z"
        fill={brandNavy}
      />

      {/* --- SWOOSH (ORANGE GRADIENT) --- */}
      <path
        d="M 400 110 C 330 110, 270 300, 220 460 C 320 460, 380 300, 450 110 Z"
        fill="url(#brandGrad)"
      />

      {/* --- LETTER M (ORANGE TECH) --- */}
      <g transform="translate(460, 70)">
        <path
          d="M 60 70 L 60 380 L 180 160 L 300 380 L 300 70"
          stroke={brandOrange}
          strokeWidth="35"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          fill="none"
        />
        <circle cx="60" cy="70" r="28" fill="white" stroke={brandOrange} strokeWidth="10" />
        <circle cx="300" cy="380" r="28" fill="white" stroke={brandOrange} strokeWidth="10" />
      </g>

      {/* --- TEXT: SOLUÇÕES DIGITAIS --- */}
      <g transform="translate(140, 400)">
        <text
          x="0"
          y="60"
          fontFamily="Inter, Roboto, sans-serif"
          fontSize="110"
          fontWeight="900"
          fontStyle="italic"
        >
          <tspan fill={brandNavy}>SOLUÇÕES</tspan> 
          <tspan fill={brandOrange} dx="40">DIGITAIS</tspan>
        </text>
      </g>
    </svg>
  );
}
