import React from 'react';

export interface LogoProps {
  className?: string;
  primaryColor?: string;
  secondaryColor?: string;
  textLine1?: string;
  textLine2?: string;
}

export default function Logo({
  className = '',
  primaryColor = '#F97316',
  secondaryColor = '#64748B',
  textLine1 = 'SOLUÇÕES',
  textLine2 = 'DIGITAIS'
}: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 180"
      className={className}
      fill="none"
    >
      <defs>
        <linearGradient id="swooshGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FB923C" />
          <stop offset="50%" stopColor={primaryColor} />
          <stop offset="100%" stopColor="#C2410C" />
        </linearGradient>
      </defs>

      {/* --- GLOBE (Orange) --- */}
      <g stroke={primaryColor} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
        {/* Outer Circle */}
        <path d="M 120 40 A 50 50 0 1 0 120 140" fill="none" />
        
        {/* Vertical Ellipses (Longitudes) */}
        <path d="M 70 40 C 30 70, 30 110, 70 140" fill="none" />
        <path d="M 70 40 C 110 70, 110 110, 70 140" fill="none" />
        
        {/* Central Vertical Line */}
        <line x1="70" y1="40" x2="70" y2="140" />
        
        {/* Horizontal Lines (Latitudes) */}
        <line x1="25" y1="90" x2="115" y2="90" />
        <line x1="33" y1="65" x2="107" y2="65" />
        <line x1="33" y1="115" x2="107" y2="115" />
      </g>

      {/* --- LETTER E (Navy Base) --- */}
      <path
        d="M 100 45 L 170 45 L 170 65 L 125 65 L 125 80 L 160 80 L 160 100 L 125 100 L 125 120 L 175 120 L 175 140 L 100 140 Z"
        fill="#1E293B" // Tailwind Slate-800 or slightly brighter than background navy
      />

      {/* --- SWOOSH (Orange Gradient) --- */}
      <path
        d="M 140 40 C 100 40, 90 90, 80 145 C 110 145, 120 70, 150 40 Z"
        fill="url(#swooshGrad)"
      />

      {/* --- LETTER M (Orange stroke) --- */}
      <g fill="none" stroke={primaryColor} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
        {/* M outline */}
        <path d="M 175 135 L 195 45 L 225 110 L 255 45 L 275 135" />
      </g>
      
      {/* Circuit Nodes on M */}
      <circle cx="175" cy="40" r="8" fill="#0F172A" stroke={primaryColor} strokeWidth="5" />
      <circle cx="265" cy="120" r="8" fill="#0F172A" stroke={primaryColor} strokeWidth="5" />

      {/* --- TEXT --- */}
      <text
        x="65"
        y="170"
        fontFamily="Inter, sans-serif"
        fontSize="18"
        fontWeight="800"
        fontStyle="italic"
        letterSpacing="0.05em"
      >
        <tspan fill={secondaryColor}>{textLine1}</tspan> 
        <tspan fill={primaryColor} dx="5">{textLine2}</tspan>
      </text>
    </svg>
  );
}
