'use client'

import Head from 'next/head'
import { motion } from 'framer-motion'
import {
  Search,
  ShieldCheck,
  Zap,
  Layers,
  ExternalLink,
  MessageSquare,
  ArrowLeft,
  CheckCircle2,
  Server,
  Cloud,
  Package
} from 'lucide-react'
import Navbar from '@/components/Navbar'

/* ─────────────────────────────────────────────
   Animation Helpers
───────────────────────────────────────────── */
const fadeInUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const techStack = [
  {
    id: 'frontend',
    icon: <Layers size={20} className="text-orange" />,
    label: 'Front-end & UI',
    value: 'Next.js 14+ (App Router), React, Tailwind CSS v4, Shadcn UI, Framer Motion (Animações).',
  },
  {
    id: 'backend',
    icon: <Server size={20} className="text-orange" />,
    label: 'Back-end & Banco de Dados',
    value: 'Neon (Serverless Postgres), Server Actions.',
  },
  {
    id: 'infra',
    icon: <ShieldCheck size={20} className="text-orange" />,
    label: 'Infraestrutura & Segurança',
    value: 'Vercel (CI/CD), NextAuth (Google OAuth 2.0).',
  },
  {
    id: 'storage',
    icon: <Cloud size={20} className="text-orange" />,
    label: 'Armazenamento & Automação',
    value: 'Google Cloud Storage (Upload de imagens), Resend (E-mails transacionais).',
  },
]

const highlights = [
  {
    id: 'busca',
    icon: <Search size={24} className="text-orange" />,
    title: 'Engenharia de Busca Inteligente',
    description:
      'Implementação de um Autocomplete dinâmico e interconectado ao banco de dados, garantindo que os usuários filtrem apenas por localizações com estoque real, reduzindo a taxa de rejeição.',
    colSpan: 'md:col-span-2',
    large: true,
  },
  {
    id: 'admin',
    icon: <ShieldCheck size={24} className="text-orange" />,
    title: 'Painel Administrativo Privado',
    description:
      'Criação de um CMS sob medida protegido por autenticação do Google, permitindo o cadastro de imóveis, upload de fotos (via Google Cloud) e gestão de contatos (CRM) em tempo real.',
    colSpan: 'md:col-span-2',
    large: false,
  },
  {
    id: 'seo',
    icon: <Zap size={24} className="text-orange" />,
    title: 'Performance & SEO Dinâmico',
    description:
      'Geração automática de Open Graph Tags (meta tags) baseadas nos dados do servidor. Cada imóvel compartilhado no WhatsApp gera um card visual imersivo e instantâneo.',
    colSpan: 'md:col-span-2',
    large: false,
  },
  {
    id: 'uiux',
    icon: <Package size={24} className="text-orange" />,
    title: 'UI/UX Premium',
    description:
      'Suporte nativo a Dark Mode (Next-Themes) com transições fluidas e utilização de Glassmorphism para destacar formulários sem ocultar as imagens de alto padrão das propriedades.',
    colSpan: 'md:col-span-2',
    large: true,
  },
]

const caseNavLinks = [
  { href: '/', label: 'Início' },
  { href: '#desafio', label: 'Desafio' },
  { href: '#stack', label: 'Stack' },
  { href: '#destaques', label: 'Destaques' },
]

/* ─────────────────────────────────────────────
   Page Component
───────────────────────────────────────────── */
import { GetServerSideProps } from 'next'

export default function CmImoveisCase({ mockupHeroUrl }: { mockupHeroUrl: string | null }) {
  return (
    <>
      <Head>
        <title>Case: CM Imóveis – Plataforma Full-Stack | EM Soluções Digitais</title>
        <meta
          name="description"
          content="Como desenvolvemos uma plataforma imobiliária full-stack com CRM, SEO dinâmico e painel administrativo personalizado para a corretora Cassia Marques."
        />
        <meta property="og:title" content="Case: CM Imóveis – Plataforma Imobiliária Full-Stack & CRM" />
        <meta
          property="og:description"
          content="Portal imobiliário completo com Next.js 14, Neon Postgres, Google Auth e Framer Motion."
        />
      </Head>

      <div className="bg-surface min-h-screen">
        <Navbar links={caseNavLinks} ctaText="Iniciar Projeto" />

        {/* ── BACK LINK ────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-6 pt-28 pb-0">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors duration-200 group"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            Voltar ao Portfólio
          </a>
        </div>

        {/* ═══════════════════════════════════════════
            HERO SECTION
        ═══════════════════════════════════════════ */}
        <section className="relative overflow-hidden pb-24 pt-12">
          {/* Ambient glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(241,90,36,0.12) 0%, transparent 70%)',
            }}
          />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            {/* Badges */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="flex flex-wrap gap-3 mb-8"
            >
              {[
                { label: 'Meu Papel: Senior Design Engineer (UI/UX, Front-end & Back-end)' },
                { label: 'Status: Em Produção', highlight: true },
              ].map((badge) => (
                <motion.span
                  key={badge.label}
                  variants={fadeIn}
                  className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border transition-all ${
                    badge.highlight
                      ? 'bg-orange/10 border-orange/30 text-orange'
                      : 'bg-surface-raised border-border text-foreground-muted'
                  }`}
                >
                  {badge.highlight && (
                    <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse-slow inline-block" />
                  )}
                  {badge.label}
                </motion.span>
              ))}
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-foreground leading-[1.05] tracking-tight mb-10 max-w-5xl"
            >
              CM Imóveis –{' '}
              <span className="text-orange-gradient">
                Plataforma Imobiliária Full-Stack & CRM
              </span>
            </motion.h1>

            {/* Hero Visual Placeholder or Image */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="relative w-full aspect-video rounded-2xl overflow-hidden border border-border glass-panel flex items-center justify-center group cursor-pointer"
              style={{
                background:
                  'linear-gradient(135deg, var(--color-surface-raised) 0%, var(--color-glass) 100%)',
              }}
            >
              {mockupHeroUrl ? (
                <img src={mockupHeroUrl} alt="Mockup Hero CM Imóveis" className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <>
                  {/* Decorative grid */}
                  <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(241,90,36,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(241,90,36,0.8) 1px, transparent 1px)',
                      backgroundSize: '48px 48px',
                    }}
                  />
                  {/* Glow rings */}
                  <div className="absolute w-64 h-64 rounded-full border border-orange/10 animate-pulse-slow" />
                  <div className="absolute w-96 h-96 rounded-full border border-orange/5 animate-pulse-slow" style={{ animationDelay: '1s' }} />

                  <div className="relative z-10 text-center px-8">
                    <div className="w-16 h-16 rounded-2xl glass-panel flex items-center justify-center mx-auto mb-4 border border-orange/20">
                      <Layers size={28} className="text-orange" />
                    </div>
                    <p className="text-foreground-muted text-sm font-medium">
                      Insira aqui o mockup do projeto
                    </p>
                    <p className="text-foreground-subtle text-xs mt-1">
                      Notebook / Mobile – aspect-video 16:9
                    </p>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            DESAFIO & SOLUÇÃO
        ═══════════════════════════════════════════ */}
        <section id="desafio" className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={staggerContainer}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {/* Desafio */}
              <motion.div
                variants={fadeInUp}
                className="glass-panel p-8 md:p-10 relative overflow-hidden group hover:border-orange/20 transition-all duration-300"
                style={{ borderColor: 'var(--color-glass-border)' }}
              >
                <div
                  className="absolute top-0 right-0 w-48 h-48 opacity-5 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, #F15A24 0%, transparent 60%)',
                  }}
                />
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">🎯</span>
                  <h2 className="text-lg font-bold text-foreground">O Desafio</h2>
                </div>
                <p className="text-foreground-muted leading-relaxed text-base">
                  A corretora Cassia Marques precisava de mais do que uma vitrine virtual; ela precisava de uma{' '}
                  <strong className="text-foreground font-semibold">máquina de vendas autônoma</strong>. O desafio
                  era criar uma experiência de alto padrão para o cliente final (focada em performance e SEO),
                  enquanto construíamos um sistema robusto e seguro de gestão (CMS/CRM) para a corretora
                  administrar seus imóveis e leads sem depender de terceiros ou mensalidades de plataformas
                  genéricas.
                </p>
              </motion.div>

              {/* Solução */}
              <motion.div
                variants={fadeInUp}
                className="glass-panel p-8 md:p-10 relative overflow-hidden group hover:border-orange/20 transition-all duration-300"
                style={{ borderColor: 'var(--color-glass-border)' }}
              >
                <div
                  className="absolute top-0 right-0 w-48 h-48 opacity-5 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, #F7941D 0%, transparent 60%)',
                  }}
                />
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">💡</span>
                  <h2 className="text-lg font-bold text-foreground">A Solução</h2>
                </div>
                <p className="text-foreground-muted leading-relaxed text-base">
                  Desenvolvi um portal imobiliário completo utilizando as tecnologias mais modernas do mercado. A
                  interface foi projetada com foco em{' '}
                  <strong className="text-foreground font-semibold">conversão e acessibilidade</strong>, enquanto o
                  back-end foi estruturado em uma arquitetura{' '}
                  <strong className="text-foreground font-semibold">Serverless</strong> para garantir velocidade
                  extrema e segurança de dados.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            STACK TECNOLÓGICA
        ═══════════════════════════════════════════ */}
        <section id="stack" className="py-24 relative overflow-hidden">
          {/* Background accent */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(241,90,36,0.06) 0%, transparent 70%)',
            }}
          />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            {/* Section Header */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeInUp}
              className="mb-14 text-center"
            >
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange mb-3">
                Tecnologia
              </p>
              <h2 className="text-3xl md:text-4xl font-black text-foreground">
                A Stack{' '}
                <span className="text-orange-gradient">Tecnológica</span>
              </h2>
              <p className="text-foreground-muted mt-4 max-w-xl mx-auto text-sm leading-relaxed">
                Cada camada foi escolhida por desempenho, escalabilidade e developer experience.
              </p>
            </motion.div>

            {/* Tech Cards Grid */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              {techStack.map((item) => (
                <motion.div
                  key={item.id}
                  variants={fadeInUp}
                  className="glass-panel p-6 flex flex-col gap-4 hover:border-orange/25 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-orange/10 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-orange uppercase tracking-wider mb-2">
                      {item.label}
                    </p>
                    <p className="text-foreground-muted text-sm leading-relaxed">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            DESTAQUES TÉCNICOS — BENTO GRID
        ═══════════════════════════════════════════ */}
        <section id="destaques" className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            {/* Section Header */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeInUp}
              className="mb-14 text-center"
            >
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange mb-3">
                Engenharia
              </p>
              <h2 className="text-3xl md:text-4xl font-black text-foreground">
                Destaques{' '}
                <span className="text-orange-gradient">Técnicos</span>
              </h2>
            </motion.div>

            {/* Bento Grid */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-4 gap-5"
            >
              {highlights.map((item, idx) => (
                <motion.div
                  key={item.id}
                  variants={fadeInUp}
                  className={`glass-panel relative overflow-hidden hover:border-orange/25 hover:-translate-y-1 transition-all duration-300 group ${item.colSpan} ${
                    item.large ? 'p-8 md:p-10' : 'p-7'
                  }`}
                >
                  {/* Decorative background glow per card */}
                  <div
                    className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle, #F15A24 0%, transparent 70%)`,
                    }}
                  />

                  {/* Card number indicator */}
                  <span className="absolute top-5 right-6 text-xs font-bold text-foreground-subtle opacity-30 font-mono">
                    {String(idx + 1).padStart(2, '0')}
                  </span>

                  <div className="w-12 h-12 rounded-2xl bg-orange/10 border border-orange/20 flex items-center justify-center mb-5">
                    {item.icon}
                  </div>
                  <h3
                    className={`font-bold text-foreground mb-3 leading-snug ${
                      item.large ? 'text-lg md:text-xl' : 'text-base'
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p className="text-foreground-muted text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            IMPACTO & CTA
        ═══════════════════════════════════════════ */}
        <section className="py-24 relative overflow-hidden">
          {/* Full-bleed glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 90% 70% at 50% 50%, rgba(241,90,36,0.08) 0%, transparent 70%)',
            }}
          />
          <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={staggerContainer}
            >
              {/* Impact badge */}
              <motion.div variants={fadeIn} className="flex justify-center mb-8">
                <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest bg-orange/10 border border-orange/25 text-orange">
                  <span className="text-base">📈</span> O Impacto
                </span>
              </motion.div>

              {/* Impact Text */}
              <motion.p
                variants={fadeInUp}
                className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground leading-snug mb-14 max-w-3xl mx-auto"
              >
                A CM Imóveis agora possui uma plataforma{' '}
                <span className="text-orange-gradient font-bold">proprietária, escalável</span> e otimizada para
                o Google, proporcionando total autonomia operacional à corretora e uma experiência imersiva aos
                seus clientes.
              </motion.p>

              {/* Divider with decorative dots */}
              <motion.div
                variants={fadeIn}
                className="flex items-center justify-center gap-3 mb-14"
              >
                <div className="h-px w-16 bg-border" />
                <div className="flex gap-2">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-orange/40"
                      style={{ opacity: 1 - i * 0.25 }}
                    />
                  ))}
                </div>
                <div className="h-px w-16 bg-border" />
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                variants={staggerContainer}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <motion.a
                  variants={fadeInUp}
                  href="https://cm-imoveis.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-orange px-8 py-4 text-sm font-bold inline-flex items-center gap-2.5 min-w-[200px] justify-center"
                >
                  Ver Projeto Ao Vivo
                  <ExternalLink size={15} />
                </motion.a>

                <motion.a
                  variants={fadeInUp}
                  href="#contact"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2.5 px-8 py-4 text-sm font-bold rounded-full border border-orange/40 text-orange hover:bg-orange/8 hover:border-orange/70 transition-all duration-200 min-w-[200px] justify-center"
                >
                  <MessageSquare size={15} />
                  Iniciar um Projeto Semelhante
                </motion.a>
              </motion.div>

              {/* Trust badges */}
              <motion.div
                variants={fadeIn}
                className="flex flex-wrap items-center justify-center gap-6 mt-12 pt-10 border-t border-border-subtle"
              >
                {[
                  { icon: <CheckCircle2 size={14} />, label: 'Em Produção' },
                  { icon: <Zap size={14} />, label: 'Performance A+' },
                  { icon: <ShieldCheck size={14} />, label: 'Google Auth' },
                  { icon: <Search size={14} />, label: 'SEO Otimizado' },
                ].map((badge) => (
                  <span
                    key={badge.label}
                    className="flex items-center gap-2 text-xs text-foreground-muted"
                  >
                    <span className="text-orange">{badge.icon}</span>
                    {badge.label}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── BACK LINK BOTTOM ─────────────────────── */}
        <div className="max-w-7xl mx-auto px-6 py-12 border-t border-border-subtle">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground transition-colors duration-200 group"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            Ver outros cases
          </a>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { prisma } = await import('../../lib/prisma')
    const project = await prisma.clientProject.findUnique({
      where: { slug: 'cm-imoveis' },
      select: { mockupHeroUrl: true }
    })
    return {
      props: {
        mockupHeroUrl: project?.mockupHeroUrl || null
      }
    }
  } catch {
    return { props: { mockupHeroUrl: null } }
  }
}

