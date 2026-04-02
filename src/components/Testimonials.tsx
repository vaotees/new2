'use client'

import { motion } from 'framer-motion'
import { TestimonialCard } from './TestimonialCard'

const testimonials = [
  {
    quote:
      'A AURÁ transformou completamente a presença digital da nossa empresa. Em 6 meses triplicamos o tráfego orgânico e duplicamos as conversões. Um trabalho impecável.',
    name: 'Rafael Mendes',
    role: 'CEO, Mendes Investimentos',
    stars: 5,
    color: '#4F46E5',
    initials: 'RM',
  },
  {
    quote:
      'Profissionalismo acima de qualquer expectativa. O branding desenvolvido por eles nos posicionou como líderes do setor. Nosso website novo converteu 40% mais já no primeiro mês.',
    name: 'Fernanda Costa',
    role: 'Diretora de Marketing, TechFlow',
    stars: 5,
    color: '#0EA5E9',
    initials: 'FC',
  },
  {
    quote:
      'Escolher a AURÁ foi a melhor decisão estratégica que tomei. As campanhas de tráfego pago geraram um ROI de 380% em 90 dias. Resultado real, não promessa vazia.',
    name: 'Marcos Oliveira',
    role: 'Fundador, MO Consultoria',
    stars: 5,
    color: '#D4AF37',
    initials: 'MO',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 relative">
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
            Depoimentos
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
            O que nossos clientes{' '}
            <span className="text-orange-gradient">dizem sobre nós</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Resultados reais de marcas que escolheram a autoridade digital.
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
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
