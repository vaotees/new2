'use client'

import Head from 'next/head'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  Building2,
  Layers,
  Server,
  ShieldCheck,
  Cloud,
  MessageSquare,
} from 'lucide-react'
import Navbar from '@/components/Navbar'

/* ─────────────────────────────────────────────
   Animation Variants
───────────────────────────────────────────── */
const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7 } },
}
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

/* ─────────────────────────────────────────────
   Data – Cases
───────────────────────────────────────────── */
const cases = [
  {
    id: 'cm-imoveis',
    href: '/cases/cm-imoveis',
    liveUrl: 'https://cm-imoveis.vercel.app/',
    category: 'Plataforma Imobiliária',
    name: 'CM Imóveis',
    tagline: 'Full-Stack & CRM',
    description:
      'Portal imobiliário completo com busca inteligente, painel CMS/CRM privado, SEO dinâmico via Open Graph e suporte nativo a Dark Mode — tudo serverless e proprietário.',
    role: 'Senior Design Engineer (UI/UX, Front-end & Back-end)',
    status: 'Em Produção',
    year: '2024',
    gradient: 'from-orange/20 via-orange/5 to-transparent',
    accentColor: 'text-orange',
    borderColor: 'border-orange/20',
    tags: ['Next.js 14', 'Neon Postgres', 'Google Auth', 'Framer Motion', 'Vercel'],
    stack: [
      { icon: <Layers size={14} />, label: 'Next.js 14 App Router' },
      { icon: <Server size={14} />, label: 'Neon Serverless Postgres' },
      { icon: <ShieldCheck size={14} />, label: 'NextAuth Google OAuth' },
      { icon: <Cloud size={14} />, label: 'Google Cloud Storage' },
    ],
    highlights: [
      'Autocomplete dinâmico interconectado ao banco de dados',
      'Painel CMS/CRM protegido por autenticação Google',
      'Open Graph Tags automáticas para WhatsApp',
      'Glassmorphism + Dark Mode nativo',
    ],
    // Placeholder enquanto não há mockup real
    mockup: null,
    index: 1,
  },
]

/* ─────────────────────────────────────────────
   Case Card Component
───────────────────────────────────────────── */
function CaseCard({ c, idx }: { c: typeof cases[0]; idx: number }) {
  const isEven = idx % 2 === 0

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={stagger}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-border glass-panel group hover:border-orange/30 transition-all duration-500 ${
        isEven ? '' : 'lg:[direction:rtl]'
      }`}
    >
      {/* ── Visual Panel ───────────────────────── */}
      <motion.div
        variants={fadeIn}
        className={`relative overflow-hidden min-h-[280px] lg:min-h-[420px] flex items-center justify-center bg-gradient-to-br ${c.gradient} ${
          isEven ? '' : 'lg:[direction:ltr]'
        }`}
      >
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(241,90,36,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(241,90,36,0.9) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        {/* Glow rings */}
        <div className="absolute w-48 h-48 rounded-full border border-orange/15 animate-pulse-slow pointer-events-none" />
        <div
          className="absolute w-72 h-72 rounded-full border border-orange/08 animate-pulse-slow pointer-events-none"
          style={{ animationDelay: '1.2s' }}
        />

        {/* Case number watermark */}
        <span className="absolute top-6 left-7 text-[80px] font-black text-white/[0.03] leading-none select-none pointer-events-none">
          {String(c.index).padStart(2, '0')}
        </span>

        {/* Mockup placeholder / real mockup */}
        <div className="relative z-10 flex flex-col items-center gap-4 p-10">
          <div className="w-16 h-16 rounded-2xl glass-panel border border-orange/25 flex items-center justify-center mb-2">
            <Building2 size={28} className="text-orange" />
          </div>
          <span className="text-xs font-semibold text-orange uppercase tracking-[0.2em]">
            {c.category}
          </span>
          <p className="text-foreground-subtle text-xs text-center max-w-[180px]">
            Insira o mockup do projeto aqui
          </p>
        </div>

        {/* Live badge */}
        <div className="absolute bottom-5 right-5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-orange/15 border border-orange/30 text-orange">
            <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse-slow" />
            {c.status}
          </span>
        </div>
      </motion.div>

      {/* ── Content Panel ──────────────────────── */}
      <motion.div
        variants={stagger}
        className={`p-8 md:p-12 flex flex-col justify-between gap-8 ${isEven ? '' : 'lg:[direction:ltr]'}`}
      >
        {/* Header */}
        <div>
          <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-5">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-foreground-subtle">
              {c.year}
            </span>
            <span className="w-1 h-1 rounded-full bg-foreground-subtle" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-foreground-subtle">
              {c.role.split('(')[0].trim()}
            </span>
          </motion.div>

          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-black text-foreground leading-tight mb-1">
            {c.name}
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg font-semibold text-orange-gradient mb-5">
            {c.tagline}
          </motion.p>

          <motion.p variants={fadeInUp} className="text-foreground-muted leading-relaxed text-sm md:text-base">
            {c.description}
          </motion.p>
        </div>

        {/* Highlights */}
        <motion.ul variants={stagger} className="space-y-2.5">
          {c.highlights.map((h) => (
            <motion.li
              key={h}
              variants={fadeInUp}
              className="flex items-start gap-2.5 text-sm text-foreground-muted"
            >
              <span className="w-4 h-4 rounded-full bg-orange/15 border border-orange/25 flex items-center justify-center shrink-0 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-orange" />
              </span>
              {h}
            </motion.li>
          ))}
        </motion.ul>

        {/* Stack tags */}
        <motion.div variants={fadeInUp} className="flex flex-wrap gap-2">
          {c.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold bg-surface-raised border border-border text-foreground-muted"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3">
          <motion.a
            href={c.href}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="btn-orange px-6 py-3 text-sm font-bold inline-flex items-center justify-center gap-2 rounded-full"
          >
            Ver Case Completo
            <ArrowRight size={14} />
          </motion.a>
          <motion.a
            href={c.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold rounded-full border border-border text-foreground-muted hover:text-foreground hover:border-orange/40 transition-all duration-200"
          >
            Ver ao Vivo
            <ExternalLink size={13} />
          </motion.a>
        </motion.div>
      </motion.div>
    </motion.article>
  )
}

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default function CasosPage() {
  return (
    <>
      <Head>
        <title>Casos de Sucesso | EM Soluções Digitais</title>
        <meta
          name="description"
          content="Portfólio de projetos da EM Soluções Digitais. Plataformas full-stack, portais imobiliários, CRM e muito mais — construídos com as tecnologias mais modernas do mercado."
        />
        <meta property="og:title" content="Casos de Sucesso | EM Soluções Digitais" />
        <meta
          property="og:description"
          content="Veja os projetos que construímos para nossos clientes. Performance, design premium e tecnologia de ponta."
        />
      </Head>

      <div className="bg-surface min-h-screen">
        <Navbar />

        {/* ── BACK LINK ───────────────────────── */}
        <div className="max-w-7xl mx-auto px-6 pt-28 pb-0">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors duration-200 group"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            Voltar ao Início
          </a>
        </div>

        {/* ═══════════════════════════════════════
            HERO HEADER
        ═══════════════════════════════════════ */}
        <section className="relative overflow-hidden py-20 md:py-28">
          {/* Ambient glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(241,90,36,0.10) 0%, transparent 65%)',
            }}
          />
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.025] pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="max-w-3xl"
            >
              {/* Eyebrow */}
              <motion.p
                variants={fadeInUp}
                className="text-xs font-bold uppercase tracking-[0.28em] text-orange mb-5 inline-flex items-center gap-2"
              >
                <span className="w-4 h-px bg-orange" />
                Portfólio de Clientes
              </motion.p>

              {/* H1 */}
              <motion.h1
                variants={fadeInUp}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-foreground leading-[1.05] tracking-tight mb-6"
              >
                Projetos que{' '}
                <span className="text-orange-gradient">geram resultados reais</span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-foreground-muted text-lg md:text-xl leading-relaxed max-w-2xl"
              >
                Cada projeto é uma história de transformação digital. Veja como construímos plataformas
                sob medida que aumentam a autoridade, geram leads e escalam negócios.
              </motion.p>

              {/* Stats row */}
              <motion.div
                variants={stagger}
                className="flex flex-wrap gap-8 mt-10 pt-10 border-t border-border-subtle"
              >
                {[
                  { value: '+127', label: 'Clientes Ativos' },
                  { value: '4.9', label: 'Avaliação Média' },
                  { value: 'R$12M+', label: 'em Resultados Gerados' },
                ].map((stat) => (
                  <motion.div key={stat.label} variants={fadeInUp}>
                    <p className="text-2xl md:text-3xl font-black text-foreground">{stat.value}</p>
                    <p className="text-xs text-foreground-subtle mt-0.5">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            CASES LIST
        ═══════════════════════════════════════ */}
        <section className="py-12 pb-32">
          <div className="max-w-7xl mx-auto px-6 flex flex-col gap-10">
            {cases.map((c, idx) => (
              <CaseCard key={c.id} c={c} idx={idx} />
            ))}

            {/* ── Coming Soon placeholder ─── */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={fadeInUp}
              className="rounded-3xl border border-dashed border-border glass-panel p-12 md:p-16 flex flex-col items-center justify-center text-center gap-5 min-h-[240px]"
            >
              <div className="w-12 h-12 rounded-2xl glass-panel border border-border flex items-center justify-center">
                <Building2 size={20} className="text-foreground-subtle" />
              </div>
              <div>
                <p className="text-foreground font-semibold mb-1">Novos cases em breve</p>
                <p className="text-foreground-subtle text-sm max-w-sm">
                  Estamos documentando mais projetos. Enquanto isso, entre em contato para
                  conhecer nosso portfólio completo.
                </p>
              </div>
              <motion.a
                href="/#contact"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-border text-foreground-muted hover:text-foreground hover:border-orange/40 text-sm font-semibold transition-all duration-200"
              >
                <MessageSquare size={14} />
                Falar com um Especialista
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            CTA BOTTOM
        ═══════════════════════════════════════ */}
        <section className="relative py-24 overflow-hidden border-t border-border-subtle">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 70% 80% at 50% 100%, rgba(241,90,36,0.08) 0%, transparent 65%)',
            }}
          />
          <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.p
                variants={fadeInUp}
                className="text-xs font-bold uppercase tracking-[0.25em] text-orange mb-4"
              >
                Próximo Passo
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-6 leading-tight"
              >
                Quer seu projeto{' '}
                <span className="text-orange-gradient">aqui nesta lista?</span>
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="text-foreground-muted mb-10 max-w-xl mx-auto"
              >
                Fale com a gente e veja como podemos transformar sua ideia em uma plataforma de
                alto desempenho, design premium e resultados mensuráveis.
              </motion.p>
              <motion.div
                variants={stagger}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <motion.a
                  variants={fadeInUp}
                  href="/#contact"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-orange px-8 py-4 text-sm font-bold inline-flex items-center gap-2.5 rounded-full"
                >
                  Iniciar meu Projeto
                  <ArrowRight size={15} />
                </motion.a>
                <motion.a
                  variants={fadeInUp}
                  href="/"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold rounded-full border border-border text-foreground-muted hover:text-foreground hover:border-orange/40 transition-all duration-200"
                >
                  <ArrowLeft size={14} />
                  Voltar ao Início
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}
