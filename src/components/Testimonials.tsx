'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

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

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
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
          <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-gold mb-4">
            Depoimentos
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
            O que nossos clientes{' '}
            <span className="text-gold-gradient">dizem sobre nós</span>
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
            <motion.div
              key={t.name}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="glass-panel p-8 flex flex-col gap-6"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} size={14} className="text-gold fill-gold" />
                ))}
              </div>

              {/* Quote mark */}
              <div
                className="text-7xl font-black leading-none -mt-2 -mb-4 select-none"
                style={{ color: '#D4AF37', opacity: 0.6 }}
              >
                &ldquo;
              </div>

              {/* Quote */}
              <p className="text-slate-300 text-sm leading-relaxed font-medium flex-1">
                {t.quote}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ background: `${t.color}33`, border: `1.5px solid ${t.color}55` }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-slate-500 text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
