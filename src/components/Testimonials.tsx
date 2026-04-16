'use client'

import { motion } from 'framer-motion'
import { TestimonialCard } from './TestimonialCard'
import TechCanvas from './TechCanvas'

export interface CMSTestimonial {
  id: string
  authorName: string
  authorRole: string
  content: string
  rating: number
  avatarUrl?: string | null
}

export interface SectionTestimonialsConfig {
  tagline: string
  title1: string
  titleHighlight: string
  description: string
}

const staticTestimonials = [
  {
    quote:
      'A agência transformou completamente a nossa presença digital. Em 6 meses triplicamos o tráfego orgânico e duplicamos as conversões. Um trabalho impecável.',
    name: 'Rafael Mendes',
    role: 'CEO, Mendes Investimentos',
    stars: 5,
    color: '#4F46E5',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&h=200',
  },
  {
    quote:
      'Profissionalismo acima de qualquer expectativa. O branding desenvolvido por eles nos posicionou como líderes do setor. Nosso website novo converteu 40% mais já no primeiro mês.',
    name: 'Fernanda Costa',
    role: 'Diretora de Marketing, TechFlow',
    stars: 5,
    color: '#0EA5E9',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200',
  },
  {
    quote:
      'Escolher vocês foi a melhor decisão estratégica que tomei. As campanhas de tráfego pago geraram um ROI de 380% em 90 dias. Resultado real, não promessa vazia.',
    name: 'Marcos Oliveira',
    role: 'Fundador, MO Consultoria',
    stars: 5,
    color: '#D4AF37',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const COLORS = ['#4F46E5', '#0EA5E9', '#D4AF37', '#E11D48', '#10B981', '#8B5CF6']

interface TestimonialsProps {
  cmsTestimonials?: CMSTestimonial[]
  sectionConfig?: SectionTestimonialsConfig | null
}

export default function Testimonials({ cmsTestimonials, sectionConfig }: TestimonialsProps) {
  const hasCmsData = cmsTestimonials && cmsTestimonials.length > 0
  
  const itemsToRender = hasCmsData 
    ? cmsTestimonials.map((t, index) => ({
        quote: t.content,
        name: t.authorName,
        role: t.authorRole,
        stars: t.rating,
        color: COLORS[index % COLORS.length],
        avatarUrl: t.avatarUrl
      }))
    : staticTestimonials

  const config = sectionConfig || {
    tagline: "DEPOIMENTOS",
    title1: "O que nossos clientes ",
    titleHighlight: "dizem sobre nós",
    description: "Resultados reais de marcas que escolheram a autoridade digital."
  }

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      {/* Tech canvas background */}
      <TechCanvas mode="subtle" />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 50% at 30% 60%, rgba(79,70,229,0.06) 0%, transparent 60%)',
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
          <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-orange mb-4">
            {config.tagline || "DEPOIMENTOS"}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6 leading-tight">
            {config.title1 || "O que nossos clientes "}{' '}
            <span className="text-orange-gradient">{config.titleHighlight || "dizem sobre nós"}</span>
          </h2>
          <p className="text-foreground-muted text-lg max-w-xl mx-auto whitespace-pre-wrap">
            {config.description || "Resultados reais de marcas que escolheram a autoridade digital."}
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {itemsToRender.map((t, idx) => (
            <TestimonialCard key={idx} {...t} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
