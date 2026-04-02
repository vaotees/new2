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
    ctaSecondaryText: "Ver nossos casos",
    ctaSecondaryUrl: "#services",
    socialClients: "+127 clientes",
    socialRating: "4.9 / 5.0",
    socialRevenue: "R$12M+ em resultados gerados",
  }

  const services = config.rotatingWords.split(',').map(s => s.trim()).filter(Boolean)

  const [currentService, setCurrentService] = useState(0)

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
            'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(249,115,22,0.12) 0%, rgba(15,23,42,0.05) 40%, transparent 70%)',
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
        style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)' }}
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
          className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.05] tracking-tight mb-6"
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
          className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
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
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-slate-500"
        >
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {['#4F46E5', '#0EA5E9', '#D4AF37', '#EC4899'].map((color, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-background-dark"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <span>{config.socialClients}</span>
          </div>
          <div className="w-px h-4 bg-white/10 hidden sm:block" />
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
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background-dark to-transparent pointer-events-none" />
    </section>
  )
}

