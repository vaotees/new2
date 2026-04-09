'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Play, Star } from 'lucide-react'
import { Button } from './Button'

export interface SectionHeroConfig {
  badge: string
  titlePrefix: string
  rotatingWords: string
  description: string
  ctaPrimaryText: string
  ctaPrimaryUrl: string
  ctaSecondaryText: string
  ctaSecondaryUrl: string
  socialClients: string
  socialRating: string
  socialRevenue: string
  socialAvatar1?: string | null
  socialAvatar2?: string | null
  socialAvatar3?: string | null
  socialAvatar4?: string | null
}

interface HeroSectionProps {
  sectionConfig?: SectionHeroConfig | null
}

export default function HeroSection({ sectionConfig }: HeroSectionProps) {
  const config = sectionConfig || {
    badge: "EM Soluções Digitais",
    titlePrefix: "Especialistas em",
    rotatingWords: "Autoridade Digital,Websites Premium,Design & Branding,Automação com IA,Tráfego Pago,Landing Pages,Redes Sociais",
    description: "Estratégia, design e tecnologia de ponta para posicionar seu negócio como referência no mercado digital. Resultados mensuráveis, estética impecável.",
    ctaPrimaryText: "Quero minha Autoridade Digital",
    ctaPrimaryUrl: "#contact",
    ctaSecondaryText: "Ver nossos cases",
    ctaSecondaryUrl: "#testimonials",
    socialClients: "+127 clientes",
    socialRating: "4.9 / 5.0",
    socialRevenue: "R$12M+ em resultados gerados",
  }

  const services = config.rotatingWords.split(',').map(s => s.trim()).filter(Boolean)

  const [currentService, setCurrentService] = useState(0)
  const [avatarsHovered, setAvatarsHovered] = useState(false)

  useEffect(() => {
    if (services.length <= 1) return
    const timer = setInterval(() => {
      setCurrentService((prev) => (prev + 1) % services.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [services.length])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(241,90,36,0.12) 0%, rgba(15,23,42,0.05) 40%, transparent 70%)',
        }}
      />

      {/* Subtle animated grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating orbs */}
      <motion.div
        animate={{ y: [0, -30, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(241,90,36,0.08) 0%, transparent 70%)' }}
      />
      <motion.div
        animate={{ y: [0, 25, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(15,23,42,0.08) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center pt-24">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 glass-panel-sm px-4 py-2 mb-8"
        >
          <Star size={12} className="text-orange fill-orange" />
          <span className="text-xs font-semibold text-orange uppercase tracking-widest">
            {config.badge}
          </span>
          <Star size={12} className="text-orange fill-orange" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black text-foreground leading-[1.05] tracking-tight mb-6"
        >
          {config.titlePrefix}{' '}
          <span className="relative inline-block align-bottom min-w-[280px] h-[1.2em]">
            <AnimatePresence exitBeforeEnter>
              <motion.span
                key={currentService}
                initial={{ y: '20%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '-20%', opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="absolute inset-x-0 bottom-0 flex items-center justify-center text-orange-gradient whitespace-nowrap"
              >
                {services[currentService]}
              </motion.span>
            </AnimatePresence>
            {/* Invisible placeholder for height */}
            <span className="invisible opacity-0 select-none pointer-events-none px-4">
              {services[0]}
            </span>
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-foreground-muted text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {config.description}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            href={config.ctaPrimaryUrl}
            variant="primary"
            icon={ArrowRight}
            size="md"
          >
            {config.ctaPrimaryText}
          </Button>

          <Button
            href={config.ctaSecondaryUrl}
            variant="outline"
            icon={Play}
            size="md"
          >
            {config.ctaSecondaryText}
          </Button>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-foreground-subtle"
        >
          <div
            className="flex items-center gap-2 group/avatars cursor-pointer"
            onMouseEnter={() => setAvatarsHovered(true)}
            onMouseLeave={() => setAvatarsHovered(false)}
          >
            <div className="flex items-center">
              {[
                config.socialAvatar1 || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=80&h=80',
                config.socialAvatar2 || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=80&h=80',
                config.socialAvatar3 || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=80&h=80',
                config.socialAvatar4 || 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=80&h=80',
              ].map((src, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: avatarsHovered ? -8 : 0,
                    x: avatarsHovered ? i * 4 : 0,
                    scale: avatarsHovered ? 1.15 : 1,
                    zIndex: avatarsHovered ? 10 + i : 10 - i,
                    marginRight: avatarsHovered ? '-4px' : '-12px',
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 20,
                    delay: i * 0.04,
                  }}
                  style={{ position: 'relative', zIndex: 10 - i, marginRight: '-12px' }}
                  className="w-9 h-9 rounded-full border-2 border-surface overflow-hidden flex-shrink-0 shadow-md"
                >
                  <img
                    src={src}
                    alt={`Cliente ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
            <motion.span
              animate={{ x: avatarsHovered ? 8 : 0, opacity: avatarsHovered ? 1 : 0.8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.1 }}
              className="ml-4"
            >
              {config.socialClients}
            </motion.span>
          </div>
          <div className="w-px h-4 bg-foreground/10 hidden sm:block" />
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={14} className="text-orange fill-orange" />
            ))}
            <span className="ml-1">{config.socialRating}</span>
          </div>
          <div className="w-px h-4 bg-white/10 hidden sm:block" />
          <span>{config.socialRevenue}</span>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface to-transparent pointer-events-none" />
    </section>
  )
}

