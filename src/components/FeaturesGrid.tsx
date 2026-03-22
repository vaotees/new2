'use client'

import { motion } from 'framer-motion'
import {
  Palette, Code2, TrendingUp, Target, Share2, BarChart3,
  Check, Star, Zap, Globe, Shield, Rocket, Cpu, Users,
  BarChart2, Award, Lightbulb, Lock, Layers, LucideIcon
} from 'lucide-react'

// Map from icon name string (stored in DB) → Lucide component
const ICON_MAP: Record<string, LucideIcon> = {
  Check, Star, Zap, Globe, Shield, Rocket, Code2, Cpu,
  Users, BarChart2, Award, Target, Lightbulb, Lock, Layers,
  Palette, TrendingUp, Share2, BarChart3,
  // aliases used by Bolt/Bol abbreviation in the icon picker
  Bolt: Zap,
}

interface CMSFeature {
  id: string
  title: string
  description: string
  icon: string
}

interface StaticService {
  icon: LucideIcon
  title: string
  description: string
  highlight?: boolean
}

const staticServices: StaticService[] = [
  {
    icon: Palette,
    title: 'Branding Estratégico',
    description: 'Identidade visual que comunica autoridade, gera reconhecimento imediato e cria conexão emocional com seu público.',
  },
  {
    icon: Code2,
    title: 'Desenvolvimento Web',
    description: 'Sites e aplicações de alta performance, com design impecável e experiência de usuário que converte visitantes em clientes.',
    highlight: true,
  },
  {
    icon: TrendingUp,
    title: 'SEO & Performance',
    description: 'Domine os resultados de busca organicamente. Estratégias técnicas e de conteúdo que aumentam visibilidade e autoridade.',
  },
  {
    icon: Target,
    title: 'Tráfego Pago',
    description: 'Campanhas de performance no Google, Meta e LinkedIn que maximizam ROI e entregam leads qualificados de forma previsível.',
  },
  {
    icon: Share2,
    title: 'Social Media',
    description: 'Gestão estratégica de redes sociais com conteúdo que posiciona sua marca e engaja a audiência certa.',
  },
  {
    icon: BarChart3,
    title: 'Analytics & BI',
    description: 'Dashboards em tempo real e relatórios que transformam dados em decisões inteligentes para seu negócio.',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

interface FeaturesGridProps {
  cmsFeatures?: CMSFeature[]
}

export default function FeaturesGrid({ cmsFeatures }: FeaturesGridProps) {
  const hasCmsData = cmsFeatures && cmsFeatures.length > 0

  return (
    <section id="services" className="py-24 relative">
      {/* Section glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(212,175,55,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-gold mb-4">
            Nossos Serviços
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
            Tudo que você precisa para se tornar{' '}
            <span className="text-gold-gradient">referência no digital</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Uma suite completa de serviços integrados, construída para marcas que não aceitam mediocridade.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {hasCmsData
            ? // --- CMS-driven cards ---
              cmsFeatures.map((feature) => {
                const Icon = ICON_MAP[feature.icon] ?? Check
                return (
                  <motion.div
                    key={feature.id}
                    variants={cardVariants}
                    whileHover={{ y: -6, transition: { duration: 0.25 } }}
                    className="glass-panel p-7 flex flex-col gap-5 group cursor-pointer relative overflow-hidden"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300">
                      <Icon size={22} className="text-gold" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                    <div className="w-0 h-px bg-gold group-hover:w-full transition-all duration-500 mt-auto" />
                  </motion.div>
                )
              })
            : // --- Static fallback cards ---
              staticServices.map((service) => {
                const Icon = service.icon
                return (
                  <motion.div
                    key={service.title}
                    variants={cardVariants}
                    whileHover={{ y: -6, transition: { duration: 0.25 } }}
                    className={`glass-panel p-7 flex flex-col gap-5 group cursor-pointer relative overflow-hidden ${
                      service.highlight ? 'border-gold/30 shadow-gold' : ''
                    }`}
                  >
                    {service.highlight && (
                      <div className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-widest bg-gold-gradient text-background-dark px-2 py-1 rounded-full">
                        Popular
                      </div>
                    )}
                    <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300">
                      <Icon size={22} className="text-gold" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg mb-2">{service.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{service.description}</p>
                    </div>
                    <div className="w-0 h-px bg-gold group-hover:w-full transition-all duration-500 mt-auto" />
                  </motion.div>
                )
              })}
        </motion.div>
      </div>
    </section>
  )
}
