'use client'

import Head from 'next/head'
import { useState } from 'react'
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
  { href: '#brand', label: 'Brand' },
]

/* ─────────────────────────────────────────────
   Brand Sub-Components
───────────────────────────────────────────── */

function BrandSwatch({ name, hex, fg = '#ffffff' }: { name: string; hex: string; fg?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(hex).catch(() => {})
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      onClick={handleCopy}
      className="flex flex-col items-center gap-2 group w-full"
      title={`Copiar ${hex}`}
    >
      <div
        className="w-full aspect-square rounded-2xl transition-all duration-200 group-hover:scale-105 group-hover:shadow-lg flex items-center justify-center"
        style={{ background: hex, boxShadow: copied ? `0 0 0 3px ${hex}40` : undefined }}
      >
        {copied && (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={fg} strokeWidth={2.5}>
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>
      <div className="text-center">
        <p className="text-[11px] font-semibold text-foreground leading-tight">{name}</p>
        <p className="text-[10px] font-mono text-foreground-subtle">{copied ? 'Copiado!' : hex}</p>
      </div>
    </button>
  )
}

const WIREFRAME_TABS = [
  { id: 'home', label: 'Home' },
  { id: 'listing', label: 'Listagem' },
  { id: 'detail', label: 'Detalhe' },
  { id: 'contact', label: 'Contato' },
  { id: 'admin', label: 'Admin' },
]

function BrandWireframes() {
  const [activeWf, setActiveWf] = useState('home')

  const wireframeContent: Record<string, React.ReactNode> = {
    home: (
      <div className="space-y-3">
        {/* Navbar placeholder */}
        <div className="flex items-center justify-between px-4 py-2.5 rounded-xl" style={{ background: 'rgba(85,51,152,0.12)', border: '1px solid rgba(85,51,152,0.2)' }}>
          <div className="w-20 h-4 rounded" style={{ background: 'rgba(85,51,152,0.3)' }} />
          <div className="flex gap-2">
            {[1,2,3].map(i => <div key={i} className="w-12 h-3 rounded" style={{ background: 'rgba(255,255,255,0.1)' }} />)}
            <div className="w-20 h-6 rounded-full" style={{ background: 'linear-gradient(135deg,#dd5289,#553398)' }} />
          </div>
        </div>
        {/* Hero */}
        <div className="rounded-xl p-6 min-h-[120px] flex flex-col gap-3 justify-center" style={{ background: 'linear-gradient(135deg, rgba(85,51,152,0.15), rgba(221,82,137,0.08))' }}>
          <div className="w-3/4 h-6 rounded" style={{ background: 'rgba(255,255,255,0.12)' }} />
          <div className="w-1/2 h-4 rounded" style={{ background: 'rgba(255,255,255,0.08)' }} />
          {/* Search bar */}
          <div className="mt-2 flex gap-2">
            <div className="flex-1 h-9 rounded-xl" style={{ background: 'rgba(85,51,152,0.2)', border: '1px solid rgba(85,51,152,0.3)' }} />
            <div className="w-20 h-9 rounded-xl" style={{ background: 'linear-gradient(135deg,#dd5289,#553398)' }} />
          </div>
        </div>
        {/* Featured cards */}
        <div className="grid grid-cols-3 gap-2">
          {[1,2,3].map(i => (
            <div key={i} className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(85,51,152,0.15)' }}>
              <div className="h-20" style={{ background: `linear-gradient(135deg, rgba(${85+i*30},51,152,0.2), rgba(221,82,137,0.1))` }} />
              <div className="p-2 space-y-1">
                <div className="h-2.5 w-3/4 rounded" style={{ background: 'rgba(255,255,255,0.1)' }} />
                <div className="h-2 w-1/2 rounded" style={{ background: 'rgba(255,255,255,0.06)' }} />
                <div className="h-3 w-1/3 rounded" style={{ background: 'linear-gradient(90deg,#e9a86b,#dd5289)' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    listing: (
      <div className="space-y-2">
        {/* Filter bar */}
        <div className="flex gap-2 flex-wrap">
          {['Tipo','Quartos','Preço','Bairro','Área'].map(f => (
            <div key={f} className="px-3 py-1.5 rounded-full text-[10px] font-semibold" style={{ background: 'rgba(85,51,152,0.12)', border: '1px solid rgba(85,51,152,0.2)', color: '#a07fcc' }}>{f}</div>
          ))}
        </div>
        {/* List items */}
        {[1,2,3,4].map(i => (
          <div key={i} className="flex gap-3 rounded-xl p-3" style={{ background: 'rgba(85,51,152,0.06)', border: '1px solid rgba(85,51,152,0.12)' }}>
            <div className="w-24 h-16 rounded-lg shrink-0" style={{ background: `linear-gradient(135deg, rgba(85,51,152,0.3), rgba(221,82,137,0.2))` }} />
            <div className="flex-1 space-y-1.5 py-1">
              <div className="h-3 w-3/4 rounded" style={{ background: 'rgba(255,255,255,0.1)' }} />
              <div className="h-2 w-1/2 rounded" style={{ background: 'rgba(255,255,255,0.06)' }} />
              <div className="h-3 w-1/4 rounded" style={{ background: 'linear-gradient(90deg,#e9a86b,#dd5289)' }} />
            </div>
          </div>
        ))}
      </div>
    ),
    detail: (
      <div className="space-y-3">
        {/* Image gallery */}
        <div className="grid grid-cols-3 gap-1.5 h-32">
          <div className="col-span-2 rounded-xl" style={{ background: 'linear-gradient(135deg,rgba(85,51,152,0.3),rgba(221,82,137,0.2))' }} />
          <div className="flex flex-col gap-1.5">
            {[1,2].map(i => <div key={i} className="flex-1 rounded-xl" style={{ background: `rgba(85,51,152,${0.1+i*0.1})` }} />)}
          </div>
        </div>
        {/* Info */}
        <div className="space-y-2">
          <div className="h-5 w-3/4 rounded" style={{ background: 'rgba(255,255,255,0.12)' }} />
          <div className="h-3 w-1/2 rounded" style={{ background: 'rgba(255,255,255,0.07)' }} />
          <div className="flex gap-2 flex-wrap mt-2">
            {['3 Quartos','2 Vagas','115m²','Novo'].map(t => (
              <span key={t} className="px-2 py-0.5 rounded-full text-[9px]" style={{ background:'rgba(85,51,152,0.15)', border:'1px solid rgba(85,51,152,0.25)', color:'#a07fcc' }}>{t}</span>
            ))}
          </div>
        </div>
        {/* CTA */}
        <div className="flex gap-2 pt-2">
          <div className="flex-1 h-9 rounded-full" style={{ background: 'linear-gradient(135deg,#dd5289,#553398)' }} />
          <div className="w-32 h-9 rounded-full" style={{ background:'rgba(85,51,152,0.15)', border:'1px solid rgba(85,51,152,0.3)' }} />
        </div>
      </div>
    ),
    contact: (
      <div className="space-y-3">
        <div className="h-4 w-1/2 rounded" style={{ background: 'rgba(255,255,255,0.1)' }} />
        {['Nome Completo','E-mail','WhatsApp','Mensagem'].map((f, i) => (
          <div key={f} className={`rounded-xl ${i === 3 ? 'h-20' : 'h-10'}`}
            style={{ background: 'rgba(85,51,152,0.08)', border: '1.5px solid rgba(85,51,152,0.2)' }}
          />
        ))}
        <div className="h-10 rounded-full" style={{ background: 'linear-gradient(135deg,#dd5289,#553398)' }} />
      </div>
    ),
    admin: (
      <div className="space-y-2">
        {/* Sidebar + content */}
        <div className="flex gap-2 min-h-[200px]">
          <div className="w-16 flex flex-col gap-1.5 shrink-0">
            {[1,2,3,4,5].map(i => <div key={i} className="h-8 rounded-lg" style={{ background: i===1 ? 'rgba(85,51,152,0.35)' : 'rgba(255,255,255,0.05)' }} />)}
          </div>
          <div className="flex-1 space-y-2">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-1.5">
              {[1,2,3].map(i => <div key={i} className="h-12 rounded-xl" style={{ background: 'rgba(85,51,152,0.1)', border: '1px solid rgba(85,51,152,0.15)' }} />)}
            </div>
            {/* Table rows */}
            {[1,2,3].map(i => (
              <div key={i} className="flex items-center gap-2 h-10 rounded-xl px-3" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="w-7 h-7 rounded-lg" style={{ background: 'linear-gradient(135deg,rgba(85,51,152,0.4),rgba(221,82,137,0.3))' }} />
                <div className="flex-1 h-2.5 rounded" style={{ background: 'rgba(255,255,255,0.08)' }} />
                <div className="w-12 h-2 rounded" style={{ background: 'rgba(255,255,255,0.05)' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={staggerContainer}
      className="mb-8"
    >
      <motion.h3 variants={fadeInUp} className="text-xs font-bold uppercase tracking-[0.2em] text-foreground-subtle mb-6 flex items-center gap-3">
        <span className="w-6 h-px" style={{ background: 'linear-gradient(90deg,#e9a86b,#553398)' }} />
        06 — Wireframes
      </motion.h3>

      <motion.div variants={fadeInUp} className="glass-panel p-6 md:p-8">
        <p className="text-xs text-foreground-subtle mb-5">
          Representação estrutural das principais telas — foco em layout, hierarquia de informação e fluxo do usuário.
        </p>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b border-border-subtle pb-px overflow-x-auto">
          {WIREFRAME_TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveWf(tab.id)}
              className="px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-all relative"
              style={{ color: activeWf === tab.id ? '#a07fcc' : 'rgba(255,255,255,0.35)' }}
            >
              {tab.label}
              {activeWf === tab.id && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t-full"
                  style={{ background: 'linear-gradient(90deg,#dd5289,#553398)' }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Wireframe content */}
        <div className="rounded-2xl p-5" style={{ background: 'rgba(85,51,152,0.04)', border: '1px solid rgba(85,51,152,0.12)' }}>
          {wireframeContent[activeWf]}
        </div>
        <p className="text-foreground-subtle text-[10px] mt-3 text-center">
          Wireframe estrutural — {WIREFRAME_TABS.find(t => t.id === activeWf)?.label}
        </p>
      </motion.div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Page Component
───────────────────────────────────────────── */
import { GetServerSideProps } from 'next'

export default function CmImoveisCase({ mockupHeroUrl, brandData }: {
  mockupHeroUrl: string | null
  brandData: {
    brandGuidelinesUrl: string
    logoUrl: string
    logoDownloadUrl: string
    brandColors: string
    brandFontHeading: string
    brandFontBody: string
  } | null
}) {
  const colors: Array<{name: string; hex: string; fg?: string}> = (() => {
    try { return brandData?.brandColors ? JSON.parse(brandData.brandColors) : [] }
    catch { return [] }
  })()

  const logoUrl = brandData?.logoUrl || null
  const logoDownloadUrl = brandData?.logoDownloadUrl || 'https://www.cmimoveisbsb.com.br/logo-cm.svg'
  const fontHeading = brandData?.brandFontHeading || 'Playfair Display'
  const fontBody = brandData?.brandFontBody || 'Montserrat'

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
            BRAND GUIDELINES
        ═══════════════════════════════════════════ */}
        <section id="brand" className="py-24 relative overflow-hidden">
          {/* Background accent */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(85,51,152,0.08) 0%, transparent 65%)',
            }}
          />
          {/* Decorative grid */}
          <div
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            {/* Section Header */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={fadeInUp}
              className="mb-16 text-center"
            >
              <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: '#dd5289' }}>
                Identidade Visual
              </p>
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
                Brand{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #e9a86b 0%, #dd5289 50%, #553398 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>Guidelines</span>
              </h2>
              <p className="text-foreground-muted text-sm max-w-lg mx-auto leading-relaxed">
                Sistema visual completo desenvolvido para a CM Imóveis &mdash; logo,
                paleta, tipografia, tokens e componentes.
              </p>
            </motion.div>

            {/* ────────────────────── 1. LOGO & IDENTIDADE */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={staggerContainer}
              className="mb-14"
            >
              <motion.h3 variants={fadeInUp} className="text-xs font-bold uppercase tracking-[0.2em] text-foreground-subtle mb-6 flex items-center gap-3">
                <span className="w-6 h-px" style={{ background: 'linear-gradient(90deg,#e9a86b,#553398)' }} />
                01 &mdash; Logo &amp; Identidade
              </motion.h3>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Logo showcase */}
                <motion.div variants={fadeInUp} className="lg:col-span-2 glass-panel p-8 md:p-10 flex flex-col gap-6">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Colorida (fundo claro) */}
                    <div className="rounded-2xl bg-white p-8 flex items-center justify-center min-h-[120px] relative overflow-hidden">
                      <div className="absolute inset-0 opacity-[0.03]"
                        style={{
                          backgroundImage: 'radial-gradient(circle, #553398 1px, transparent 1px)',
                          backgroundSize: '20px 20px',
                        }}
                      />
                      {logoUrl ? (
                        <img src={logoUrl} alt="CM Imóveis Logo" className="max-h-16 w-auto object-contain relative z-10" />
                      ) : (
                        <img src="https://www.cmimoveisbsb.com.br/logo-cm.svg" alt="CM Imóveis Logo" className="max-h-16 w-auto object-contain relative z-10"
                          onError={(e) => { (e.target as HTMLImageElement).style.display='none' }} />
                      )}
                      <span className="absolute bottom-2 left-3 text-[9px] font-bold uppercase tracking-widest" style={{ color:'#553398', opacity:0.5 }}>Colorida / Fundo Claro</span>
                    </div>
                    {/* Reversa (fundo escuro) */}
                    <div className="rounded-2xl p-8 flex items-center justify-center min-h-[120px] relative overflow-hidden"
                      style={{ background: 'linear-gradient(135deg, #1a1036 0%, #0e0b1a 100%)' }}>
                      <div className="absolute inset-0 opacity-[0.05]"
                        style={{
                          backgroundImage: 'radial-gradient(circle, #e9a86b 1px, transparent 1px)',
                          backgroundSize: '20px 20px',
                        }}
                      />
                      {logoUrl ? (
                        <img src={logoUrl} alt="CM Imóveis Logo Reverso" className="max-h-16 w-auto object-contain relative z-10 invert brightness-200" />
                      ) : (
                        <img src="https://www.cmimoveisbsb.com.br/logo-cm.svg" alt="CM Imóveis Logo Reverso" className="max-h-16 w-auto object-contain relative z-10 brightness-0 invert"
                          onError={(e) => { (e.target as HTMLImageElement).style.display='none' }} />
                      )}
                      <span className="absolute bottom-2 left-3 text-[9px] font-bold uppercase tracking-widest text-white/40">Reversa / Fundo Escuro</span>
                    </div>
                    {/* Gradiente */}
                    <div className="rounded-2xl p-8 flex items-center justify-center min-h-[120px] relative overflow-hidden"
                      style={{ background: 'linear-gradient(135deg, #e9a86b, #dd5289, #553398)' }}>
                      {logoUrl ? (
                        <img src={logoUrl} alt="Logo Gradiente" className="max-h-16 w-auto object-contain brightness-0 invert" />
                      ) : (
                        <img src="https://www.cmimoveisbsb.com.br/logo-cm.svg" alt="Logo Gradiente" className="max-h-16 w-auto object-contain brightness-0 invert"
                          onError={(e) => { (e.target as HTMLImageElement).style.display='none' }} />
                      )}
                      <span className="absolute bottom-2 left-3 text-[9px] font-bold uppercase tracking-widest text-white/60">Sobre Gradiente</span>
                    </div>
                    {/* Monocromático */}
                    <div className="rounded-2xl p-8 flex items-center justify-center min-h-[120px] relative overflow-hidden glass-panel">
                      {logoUrl ? (
                        <img src={logoUrl} alt="Logo Mono" className="max-h-16 w-auto object-contain opacity-60 grayscale" />
                      ) : (
                        <img src="https://www.cmimoveisbsb.com.br/logo-cm.svg" alt="Logo Mono" className="max-h-16 w-auto object-contain opacity-40 grayscale"
                          onError={(e) => { (e.target as HTMLImageElement).style.display='none' }} />
                      )}
                      <span className="absolute bottom-2 left-3 text-[9px] font-bold uppercase tracking-widest text-foreground-subtle opacity-50">Monocromático</span>
                    </div>
                  </div>
                </motion.div>

                {/* Regras de uso */}
                <motion.div variants={fadeInUp} className="glass-panel p-7 flex flex-col gap-5">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background:'rgba(34,197,94,0.15)', color:'#86efac', border:'1px solid rgba(34,197,94,0.25)' }}>✓</span>
                      <p className="text-sm font-bold text-foreground">Correto</p>
                    </div>
                    <ul className="space-y-2">
                      {[
                        'Use a versão colorida sobre fundos brancos e claros',
                        'Use a versão branca sobre fundos escuros e fotos',
                        'Mantenha o espaço de proteção ao redor da logo',
                        'Use o gradiente apenas nos elementos definidos',
                        'Respeite o tamanho mínimo de 24px de altura',
                        'Use Playfair Display para títulos e Montserrat para UI',
                      ].map((rule, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-foreground-muted">
                          <span className="mt-0.5 shrink-0 text-emerald-400">✓</span>
                          {rule}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="border-t border-border-subtle pt-5">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background:'rgba(239,68,68,0.15)', color:'#fca5a5', border:'1px solid rgba(239,68,68,0.25)' }}>✕</span>
                      <p className="text-sm font-bold text-foreground">Incorreto</p>
                    </div>
                    <ul className="space-y-2">
                      {[
                        'Não altere as cores originais da logo',
                        'Não distorça, rotacione ou aplique efeitos',
                        'Não use sobre fundos com baixo contraste',
                        'Não use a versão colorida sobre fundos coloridos',
                        'Não adicione sombras ou bordas à logo',
                      ].map((rule, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-foreground-muted">
                          <span className="mt-0.5 shrink-0 text-red-400">✕</span>
                          {rule}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* ────────────────────── 2. PALETA DE CORES */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={staggerContainer}
              className="mb-14"
            >
              <motion.h3 variants={fadeInUp} className="text-xs font-bold uppercase tracking-[0.2em] text-foreground-subtle mb-6 flex items-center gap-3">
                <span className="w-6 h-px" style={{ background: 'linear-gradient(90deg,#e9a86b,#553398)' }} />
                02 &mdash; Paleta de Cores
              </motion.h3>

              {/* Gradient hero */}
              <motion.div
                variants={fadeInUp}
                className="relative rounded-3xl h-36 mb-5 overflow-hidden group"
                style={{ background: 'linear-gradient(135deg, #e9a86b 0%, #dd5289 50%, #553398 100%)' }}
              >
                <div className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.15) 0px, transparent 1px, transparent 60px, rgba(255,255,255,0.15) 61px)',
                  }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                  <p className="text-white font-black text-2xl tracking-tight" style={{ letterSpacing: '-0.02em' }}>Gradiente da Marca</p>
                  <p className="text-white/70 text-xs font-mono">#e9a86b &rarr; #dd5289 &rarr; #553398</p>
                </div>
              </motion.div>

              {/* Color swatches grid */}
              <motion.div variants={staggerContainer} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
                {(colors.length > 0 ? colors : [
                  { name: 'Amber', hex: '#e9a86b', fg: '#000000' },
                  { name: 'Blush', hex: '#e8985c', fg: '#000000' },
                  { name: 'Rose', hex: '#dd5289', fg: '#ffffff' },
                  { name: 'Violet', hex: '#8b5ac8', fg: '#ffffff' },
                  { name: 'Primary', hex: '#553398', fg: '#ffffff' },
                  { name: 'Dark Navy', hex: '#363e51', fg: '#ffffff' },
                  { name: 'Off White', hex: '#f5f2f0', fg: '#000000' },
                ]).map((color, i) => (
                  <motion.div key={i} variants={fadeInUp}>
                    <BrandSwatch name={color.name} hex={color.hex} fg={color.fg} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* ────────────────────── 3. TIPOGRAFIA */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={staggerContainer}
              className="mb-14"
            >
              <motion.h3 variants={fadeInUp} className="text-xs font-bold uppercase tracking-[0.2em] text-foreground-subtle mb-6 flex items-center gap-3">
                <span className="w-6 h-px" style={{ background: 'linear-gradient(90deg,#e9a86b,#553398)' }} />
                03 &mdash; Tipografia
              </motion.h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Playfair Display */}
                <motion.div variants={fadeInUp} className="glass-panel p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.04] pointer-events-none"
                    style={{ background: 'radial-gradient(circle, #dd5289 0%, transparent 60%)' }} />
                  <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#dd5289' }}>Headings &amp; Display</p>
                  <p className="text-5xl font-black mb-6 leading-tight" style={{ fontFamily: `"${fontHeading}", serif`, color: 'var(--color-foreground)' }}>
                    {fontHeading.split(' ')[0]}<br />
                    <span style={{
                      fontStyle: 'italic',
                      background: 'linear-gradient(135deg, #e9a86b, #dd5289)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}>{fontHeading.split(' ').slice(1).join(' ') || fontHeading}</span>
                  </p>
                  <div className="space-y-2 border-t border-border-subtle pt-5">
                    {[
                      { size: '48px', weight: '900', label: 'Display' },
                      { size: '32px', weight: '700', label: 'H1' },
                      { size: '24px', weight: '600', label: 'H2' },
                      { size: '18px', weight: '400', label: 'H3 Italic', italic: true },
                    ].map((s) => (
                      <div key={s.label} className="flex items-baseline justify-between">
                        <span style={{ fontFamily:`"${fontHeading}", serif`, fontSize: s.size, fontWeight: s.weight, fontStyle: s.italic ? 'italic' : 'normal', color: 'var(--color-foreground)', lineHeight: 1.2 }}>
                          Imóveis
                        </span>
                        <span className="text-[10px] font-mono text-foreground-subtle ml-4 shrink-0">{s.label} / {s.size} / {s.weight}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Montserrat */}
                <motion.div variants={fadeInUp} className="glass-panel p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.04] pointer-events-none"
                    style={{ background: 'radial-gradient(circle, #553398 0%, transparent 60%)' }} />
                  <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#8b5ac8' }}>UI &amp; Body Copy</p>
                  <p className="text-5xl font-black mb-6 leading-tight" style={{ fontFamily: `${fontBody}, sans-serif`, color: 'var(--color-foreground)' }}>
                    {fontBody.slice(0, Math.ceil(fontBody.length/2))}<span style={{
                      background: 'linear-gradient(135deg, #8b5ac8, #553398)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}>{fontBody.slice(Math.ceil(fontBody.length/2))}</span>
                  </p>
                  <div className="space-y-3 border-t border-border-subtle pt-5">
                    {[
                      { size: '14px', weight: '800', label: 'Label/CTA', sample: 'VER IMÓVEIS' },
                      { size: '14px', weight: '600', label: 'Body Bold', sample: 'Apartamento 3 quartos' },
                      { size: '13px', weight: '500', label: 'Body Regular', sample: 'Asa Norte, Brasília - DF' },
                      { size: '11px', weight: '400', label: 'Caption', sample: 'Cód. 00123 · Publicado hoje' },
                    ].map((s) => (
                      <div key={s.label} className="flex items-center justify-between gap-4">
                        <span style={{ fontFamily:`${fontBody}, sans-serif`, fontSize: s.size, fontWeight: s.weight, color: 'var(--color-foreground-muted)', lineHeight: 1.4 }}>
                          {s.sample}
                        </span>
                        <span className="text-[10px] font-mono text-foreground-subtle shrink-0">{s.label} / {s.size}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* ────────────────────── 4. DESIGN TOKENS */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={staggerContainer}
              className="mb-14"
            >
              <motion.h3 variants={fadeInUp} className="text-xs font-bold uppercase tracking-[0.2em] text-foreground-subtle mb-6 flex items-center gap-3">
                <span className="w-6 h-px" style={{ background: 'linear-gradient(90deg,#e9a86b,#553398)' }} />
                04 &mdash; Design Tokens
              </motion.h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Border Radius */}
                <motion.div variants={fadeInUp} className="glass-panel p-6">
                  <p className="text-xs font-bold uppercase tracking-widest mb-5 text-foreground-subtle">Border Radius</p>
                  <div className="space-y-3">
                    {[
                      { label: 'sm', value: '4px', size: 4 },
                      { label: 'md', value: '8px', size: 8 },
                      { label: 'lg', value: '12px', size: 12 },
                      { label: 'xl', value: '16px', size: 16 },
                      { label: '2xl', value: '24px', size: 24 },
                      { label: 'full', value: '9999px', size: 9999 },
                    ].map(r => (
                      <div key={r.label} className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 shrink-0 border-2"
                          style={{ borderRadius: r.value, borderColor: '#553398', background: 'rgba(85,51,152,0.08)' }}
                        />
                        <div>
                          <p className="text-xs font-semibold text-foreground">{r.label}</p>
                          <p className="text-[10px] font-mono text-foreground-subtle">{r.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Sombras */}
                <motion.div variants={fadeInUp} className="glass-panel p-6">
                  <p className="text-xs font-bold uppercase tracking-widest mb-5 text-foreground-subtle">Sombras</p>
                  <div className="space-y-4 bg-white/5 rounded-xl p-4">
                    {[
                      { label: 'sm', css: '0 1px 3px rgba(85,51,152,0.15)' },
                      { label: 'md', css: '0 4px 12px rgba(85,51,152,0.20)' },
                      { label: 'lg', css: '0 8px 32px rgba(85,51,152,0.25)' },
                      { label: 'xl', css: '0 16px 48px rgba(85,51,152,0.30)' },
                      { label: 'glow', css: '0 0 24px rgba(221,82,137,0.35)' },
                    ].map(s => (
                      <div key={s.label} className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl shrink-0 bg-white"
                          style={{ boxShadow: s.css }}
                        />
                        <div>
                          <p className="text-xs font-semibold text-foreground">{s.label}</p>
                          <p className="text-[10px] font-mono text-foreground-subtle leading-tight">{s.css.substring(0, 28)}…</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Espaçamento */}
                <motion.div variants={fadeInUp} className="glass-panel p-6">
                  <p className="text-xs font-bold uppercase tracking-widest mb-5 text-foreground-subtle">Espaçamento</p>
                  <div className="space-y-3">
                    {[
                      { label: 'xs', value: '4px', w: '4px' },
                      { label: 'sm', value: '8px', w: '8px' },
                      { label: 'md', value: '16px', w: '16px' },
                      { label: 'lg', value: '24px', w: '24px' },
                      { label: 'xl', value: '32px', w: '32px' },
                      { label: '2xl', value: '48px', w: '48px' },
                      { label: '3xl', value: '64px', w: '64px' },
                    ].map(s => (
                      <div key={s.label} className="flex items-center gap-3">
                        <div
                          className="h-5 rounded-sm shrink-0"
                          style={{ width: s.w, background: 'linear-gradient(90deg, #e9a86b, #553398)', minWidth: s.w }}
                        />
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-semibold text-foreground">{s.label}</p>
                          <p className="text-[10px] font-mono text-foreground-subtle">{s.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* ────────────────────── 5. COMPONENTES */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={staggerContainer}
              className="mb-14"
            >
              <motion.h3 variants={fadeInUp} className="text-xs font-bold uppercase tracking-[0.2em] text-foreground-subtle mb-6 flex items-center gap-3">
                <span className="w-6 h-px" style={{ background: 'linear-gradient(90deg,#e9a86b,#553398)' }} />
                05 &mdash; Componentes
              </motion.h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Botões */}
                <motion.div variants={fadeInUp} className="glass-panel p-7">
                  <p className="text-xs font-bold uppercase tracking-widest mb-5 text-foreground-subtle">Botões</p>
                  <div className="flex flex-wrap gap-3">
                    <button
                      className="px-5 py-2.5 rounded-full text-sm font-bold text-white transition-all hover:-translate-y-0.5"
                      style={{ background: 'linear-gradient(135deg, #dd5289, #553398)', fontFamily: 'Montserrat, sans-serif' }}
                    >
                      Ver Imóveis
                    </button>
                    <button
                      className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:-translate-y-0.5"
                      style={{ border: '1.5px solid #553398', color: '#8b5ac8', fontFamily: 'Montserrat, sans-serif', background: 'transparent' }}
                    >
                      Saiba Mais
                    </button>
                    <button
                      className="px-5 py-2.5 rounded-full text-sm font-bold text-white transition-all hover:-translate-y-0.5"
                      style={{ background: '#e9a86b', color: '#1a0e00', fontFamily: 'Montserrat, sans-serif' }}
                    >
                      Contato
                    </button>
                    <button
                      className="px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
                      style={{ background: 'rgba(85,51,152,0.15)', border: '1px solid rgba(85,51,152,0.3)', fontFamily: 'Montserrat, sans-serif' }}
                    >
                      Ghost
                    </button>
                  </div>
                </motion.div>

                {/* Badges / Tags */}
                <motion.div variants={fadeInUp} className="glass-panel p-7">
                  <p className="text-xs font-bold uppercase tracking-widest mb-5 text-foreground-subtle">Badges / Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: 'Apartamento', bg: 'rgba(85,51,152,0.15)', color: '#a07fcc', border: 'rgba(85,51,152,0.3)' },
                      { label: 'Casa', bg: 'rgba(233,168,107,0.15)', color: '#e9a86b', border: 'rgba(233,168,107,0.3)' },
                      { label: 'Comercial', bg: 'rgba(221,82,137,0.12)', color: '#dd5289', border: 'rgba(221,82,137,0.25)' },
                      { label: '3 Quartos', bg: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.6)', border: 'rgba(255,255,255,0.12)' },
                      { label: 'Novo', bg: 'rgba(34,197,94,0.12)', color: '#86efac', border: 'rgba(34,197,94,0.25)' },
                      { label: 'Asa Norte', bg: 'rgba(85,51,152,0.10)', color: '#8b5ac8', border: 'rgba(85,51,152,0.20)' },
                      { label: 'R$ 650.000', bg: 'rgba(233,168,107,0.12)', color: '#e9a86b', border: 'rgba(233,168,107,0.25)' },
                    ].map(b => (
                      <span
                        key={b.label}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
                        style={{ background: b.bg, color: b.color, border: `1px solid ${b.border}`, fontFamily: 'Montserrat, sans-serif' }}
                      >
                        {b.label}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Inputs */}
                <motion.div variants={fadeInUp} className="glass-panel p-7">
                  <p className="text-xs font-bold uppercase tracking-widest mb-5 text-foreground-subtle">Inputs</p>
                  <div className="space-y-3">
                    <div className="relative">
                      <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#8b5ac8" strokeWidth={2}>
                        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
                      </svg>
                      <input
                        readOnly
                        defaultValue=""
                        placeholder="Buscar por bairro ou cidade…"
                        className="w-full rounded-xl py-3 pl-10 pr-4 text-sm outline-none text-white placeholder-white/40"
                        style={{
                          background: 'rgba(85,51,152,0.08)',
                          border: '1.5px solid rgba(85,51,152,0.3)',
                          fontFamily: 'Montserrat, sans-serif',
                        }}
                        onFocus={e => (e.target.style.borderColor = '#8b5ac8')}
                        onBlur={e => (e.target.style.borderColor = 'rgba(85,51,152,0.3)')}
                      />
                    </div>
                    <div className="flex gap-2">
                      {['Tipo', 'Quartos', 'Preço', 'Bairro'].map(f => (
                        <button key={f}
                          className="flex-1 py-2 rounded-xl text-xs font-semibold transition-all"
                          style={{ background: 'rgba(85,51,152,0.08)', border: '1px solid rgba(85,51,152,0.2)', color: '#a07fcc', fontFamily: 'Montserrat, sans-serif' }}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Card de Imóvel */}
                <motion.div variants={fadeInUp} className="glass-panel p-7">
                  <p className="text-xs font-bold uppercase tracking-widest mb-5 text-foreground-subtle">Cartão de Imóvel</p>
                  <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(85,51,152,0.2)', background: 'rgba(85,51,152,0.04)' }}>
                    {/* Image placeholder */}
                    <div className="h-36 relative" style={{ background: 'linear-gradient(135deg, rgba(85,51,152,0.25), rgba(221,82,137,0.15))' }}>
                      <div className="absolute inset-0 opacity-10"
                        style={{ backgroundImage: 'radial-gradient(circle, #e9a86b 1px, transparent 1px)', backgroundSize: '24px 24px' }}
                      />
                      <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full text-white"
                        style={{ background: 'linear-gradient(135deg,#dd5289,#553398)', fontFamily: 'Montserrat, sans-serif' }}>
                        NOVO
                      </span>
                      <span className="absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-full"
                        style={{ background: 'rgba(0,0,0,0.5)', color: '#e9a86b', fontFamily: 'Montserrat, sans-serif' }}>
                        Asa Norte
                      </span>
                    </div>
                    <div className="p-4">
                      <p className="font-black text-sm mb-0.5" style={{ fontFamily: '"Playfair Display", serif', color: 'var(--color-foreground)' }}>Apartamento Premium 3Q</p>
                      <p className="text-xs mb-3" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Montserrat, sans-serif' }}>SHIN QI 05, Asa Norte · 115m²</p>
                      <div className="flex items-center justify-between">
                        <p className="font-black text-lg" style={{ background: 'linear-gradient(135deg,#e9a86b,#dd5289)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', fontFamily: 'Montserrat, sans-serif' }}>R$ 850.000</p>
                        <button className="text-xs font-bold px-4 py-2 rounded-full text-white"
                          style={{ background: 'linear-gradient(135deg, #dd5289, #553398)', fontFamily: 'Montserrat, sans-serif' }}>
                          Ver
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* ────────────────────── 6. WIREFRAMES */}
            <BrandWireframes />

          </div>
        </section>

        {/* ═══════════════════════════════════════════
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
      select: {
        mockupHeroUrl: true,
        brandGuidelinesUrl: true,
        logoUrl: true,
        logoDownloadUrl: true,
        brandColors: true,
        brandFontHeading: true,
        brandFontBody: true,
      }
    })
    return {
      props: {
        mockupHeroUrl: project?.mockupHeroUrl || null,
        brandData: project ? {
          brandGuidelinesUrl: project.brandGuidelinesUrl || '',
          logoUrl: project.logoUrl || '',
          logoDownloadUrl: project.logoDownloadUrl || 'https://www.cmimoveisbsb.com.br/logo-cm.svg',
          brandColors: project.brandColors || '',
          brandFontHeading: project.brandFontHeading || 'Playfair Display',
          brandFontBody: project.brandFontBody || 'Montserrat',
        } : null
      }
    }
  } catch {
    return { props: { mockupHeroUrl: null, brandData: null } }
  }
}
