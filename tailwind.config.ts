import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          dark: '#0A1128',
          navy: '#0F172A',
        },
        orange: {
          DEFAULT: '#F97316',
          light: '#FB923C',
          dark: '#C2410C',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'orange-gradient': 'linear-gradient(135deg, #FB923C 0%, #F97316 50%, #C2410C 100%)',
        'hero-glow': 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(249,115,22,0.15) 0%, transparent 70%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      boxShadow: {
        'orange': '0 0 24px rgba(249,115,22,0.35)',
        'orange-lg': '0 0 48px rgba(249,115,22,0.45)',
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        '.glass-panel': {
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.10)',
          borderRadius: '1rem',
        },
        '.glass-panel-sm': {
          background: 'rgba(255, 255, 255, 0.04)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '0.75rem',
        },
        '.text-orange-gradient': {
          background: 'linear-gradient(135deg, #FB923C 0%, #F97316 50%, #C2410C 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        },
        '.btn-orange': {
          background: 'linear-gradient(135deg, #FB923C 0%, #F97316 50%, #C2410C 100%)',
          color: '#0A1128',
          fontWeight: '700',
          borderRadius: '9999px',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s ease',
          boxShadow: '0 0 24px rgba(249,115,22,0.35)',
          '&:hover': {
            boxShadow: '0 0 48px rgba(249,115,22,0.55)',
          },
        },
      })
    }),
  ],
}

export default config
