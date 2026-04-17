'use client'

import Head from 'next/head'
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ShieldCheck,
  Zap,
  Layers,
  ExternalLink,
  MessageSquare,
  ArrowLeft,
  CheckCircle2,
  Globe,
  Smartphone,
  BookOpen,
  Star,
} from 'lucide-react'
import Navbar from '@/components/Navbar'

/* ─────────────────────────────────────────────
   Brand Colors (Fino Trato)
   Primary:  #1565C0 (Azul Royal)
   Accent:   #7B1FA2 (Roxo)
   Light:    #4FACF0 (Azul Claro)
   Amber:    #FFC107 (Âmbar / Rating)
   Dark:     #1A0A2E
───────────────────────────────────────────── */

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
    icon: <Layers size={20} style={{ color: '#4FACF0' }} />,
    label: 'Front-end & UI',
    value: 'HTML5 Semântico, CSS3 Moderno (Custom Properties), JavaScript Vanilla ES6+.',
  },
  {
    id: 'design',
    icon: <BookOpen size={20} style={{ color: '#4FACF0' }} />,
    label: 'Design System',
    value: 'CSS Design Tokens, Glassmorphism Puro, Variáveis de Tema (Cores, Tipografia, Espaçamento).',
  },
  {
    id: 'perf',
    icon: <Zap size={20} style={{ color: '#4FACF0' }} />,
    label: 'Performance & SEO',
    value: 'HTML Semântico, Meta Tags Open Graph, SEO Local (Brasília), Intersection Observer API.',
  },
  {
    id: 'ux',
    icon: <Smartphone size={20} style={{ color: '#4FACF0' }} />,
    label: 'UX & Conversão',
    value: 'Slider Before/After personalizado, CTA direto ao WhatsApp, Design responsivo Mobile-first.',
  },
  {
    id: 'infra',
    icon: <ShieldCheck size={20} style={{ color: '#4FACF0' }} />,
    label: 'Deploy & Infra',
    value: 'Vercel (CI/CD automático via Git), domínio customizado, HTTPS nativo.',
  },
]

const highlights = [
  {
    id: 'brand-system',
    icon: <BookOpen size={24} style={{ color: '#4FACF0' }} />,
    title: 'Brand System do Zero',
    description:
      'Criação completa do design system: tokens de cor, tipografia, espaçamento e border-radius documentados como CSS Custom Properties. Entrega inclui Brand Guidelines interativo com Do\'s & Don\'ts.',
    colSpan: 'md:col-span-2',
    large: true,
  },
  {
    id: 'whatsapp',
    icon: <MessageSquare size={24} style={{ color: '#4FACF0' }} />,
    title: 'Conversão via WhatsApp',
    description:
      'CTA principal com link direto ao WhatsApp e mensagem pré-formatada. Formulário de agendamento com confirmação via WhatsApp reduz atrito e maximiza a taxa de conversão de visitantes em leads.',
    colSpan: 'md:col-span-2',
    large: false,
  },
  {
    id: 'seo',
    icon: <Globe size={24} style={{ color: '#4FACF0' }} />,
    title: 'SEO Local Estratégico',
    description:
      'Estrutura semântica e meta tags Open Graph otimizadas para "higienização de estofados Brasília" e variações locais. Captura orgânica de buscas em Brasília e Entorno sem investimento em mídia paga.',
    colSpan: 'md:col-span-2',
    large: false,
  },
  {
    id: 'guidelines',
    icon: <Star size={24} style={{ color: '#4FACF0' }} />,
    title: 'Entrega Além do Código',
    description:
      'Além do site, entregamos um documento de Brand Guidelines completo e interativo: paleta clicável com copy de HEX, espécimes tipográficos, wireframes das telas e biblioteca de componentes visuais.',
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

/* ─────────────────────────────────────────────
   Logo Fallback Component
───────────────────────────────────────────── */
function FinoTratoLogoFallback({ variant = 'color' }: { variant?: 'color' | 'reverse' | 'gradient' | 'mono' }) {
  const blue = '#1565C0'
  const purple = '#7B1FA2'

  const hexStyle: React.CSSProperties = {
    width: 44,
    height: 50,
    position: 'relative',
    flexShrink: 0,
  }

  const iconColor = variant === 'color' ? blue : '#ffffff'
  const textColor = variant === 'color' ? '#2d2d2d' : '#ffffff'
  const subtitleColor = variant === 'color' ? purple : 'rgba(255,255,255,0.7)'
  const opacity = variant === 'mono' ? 0.5 : 1

  return (
    <div className="flex items-center gap-3" style={{ opacity }}>
      {/* Hexagonal icon */}
      <svg width="48" height="54" viewBox="0 0 48 54" fill="none">
        <path
          d="M24 2L45 14v26L24 52 3 40V14L24 2z"
          fill={variant === 'gradient' ? 'rgba(255,255,255,0.15)' : variant === 'color' ? 'rgba(21,101,192,0.1)' : 'rgba(255,255,255,0.1)'}
          stroke={iconColor}
          strokeWidth="2"
        />
        {/* Sofa icon */}
        <rect x="13" y="26" width="22" height="10" rx="3" fill={iconColor} opacity="0.9" />
        <rect x="11" y="30" width="5" height="8" rx="2" fill={iconColor} />
        <rect x="32" y="30" width="5" height="8" rx="2" fill={iconColor} />
        {/* Water drop */}
        <path d="M24 14 C24 14 20 20 20 23 C20 25.2 21.8 27 24 27 C26.2 27 28 25.2 28 23 C28 20 24 14 24 14Z" fill="rgba(79,172,240,0.9)" />
      </svg>
      {/* Text */}
      <div>
        <div style={{ fontFamily: '"Playfair Display", serif', fontWeight: 800, fontSize: 15, letterSpacing: '0.08em', color: textColor, lineHeight: 1.1, textTransform: 'uppercase' }}>
          Fino Trato
        </div>
        <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 8, letterSpacing: '0.12em', color: subtitleColor, textTransform: 'uppercase', lineHeight: 1.3, marginTop: 2 }}>
          Higienização &amp;<br />Impermeabilização
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Voz & Tom da Marca
───────────────────────────────────────────── */
function BrandVoice() {
  const blue = '#1565C0'
  const purple = '#7B1FA2'
  const light = '#4FACF0'
  const gradientBrand = `linear-gradient(135deg, ${blue} 0%, ${purple} 100%)`

  const personalidade = ['Confiável', 'Profissional', 'Sofisticado', 'Cuidadoso', 'Acolhedor', 'Transparente']
  const tom = ['Direto e claro', 'Educativo', 'Próximo, não íntimo', 'Aspiracional', 'Sem jargões técnicos']

  const exemplos = [
    {
      icone: '🏠',
      canal: 'Para o Site',
      msg: '"Mais do que limpeza, saúde e bem-estar para o seu lar."',
      desc: 'Tagline principal — emocional, benefício real',
    },
    {
      icone: '📱',
      canal: 'Para o Instagram',
      msg: '"Seu sofá voltou a ser sofá ✨ Resultado real de uma higienização profissional — veja o antes e depois do cliente de hoje."',
      desc: 'Instagram — informal, resultado visual em evidência',
    },
    {
      icone: '💬',
      canal: 'Para o WhatsApp / CTA',
      msg: '"Oi, [nome]! Recebemos seu contato. Em até 2h te enviamos um orçamento personalizado. Qualquer dúvida, estou à disposição!"',
      desc: 'WhatsApp — ágil, pessoal, sem formalidade excessiva',
    },
  ]

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={staggerContainer}
      className="mb-14"
    >
      <motion.h3 variants={fadeInUp} className="text-xs font-bold uppercase tracking-[0.2em] text-foreground-subtle mb-6 flex items-center gap-3">
        <span className="w-6 h-px" style={{ background: 'linear-gradient(90deg,#4FACF0,#7B1FA2)' }} />
        06 &mdash; Voz &amp; Tom da Marca
      </motion.h3>

      <motion.div variants={fadeInUp} className="glass-panel p-6 md:p-8 space-y-6">
        <p className="text-sm text-foreground-muted max-w-xl">
          A Fino Trato comunica cuidado, competência e proximidade. A linguagem une profissionalismo com acolhimento — como um especialista de confiança da família.
        </p>

        {/* Personalidade + Tom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="rounded-2xl p-5" style={{ background: 'rgba(21,101,192,0.06)', border: '1px solid rgba(21,101,192,0.15)' }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: light }}>🎯 Personalidade da Marca</p>
            <div className="flex flex-wrap gap-2">
              {personalidade.map(p => (
                <span key={p} className="px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: 'rgba(21,101,192,0.12)', border: '1px solid rgba(21,101,192,0.25)', color: light }}>{p}</span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl p-5" style={{ background: 'rgba(123,31,162,0.06)', border: '1px solid rgba(123,31,162,0.15)' }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#CE93D8' }}>🗣️ Tom de Comunicação</p>
            <div className="flex flex-wrap gap-2">
              {tom.map(t => (
                <span key={t} className="px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: 'rgba(123,31,162,0.12)', border: '1px solid rgba(123,31,162,0.25)', color: '#CE93D8' }}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Exemplos de mensagens */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {exemplos.map(ex => (
            <div key={ex.canal} className="rounded-2xl p-5 space-y-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <p className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <span>{ex.icone}</span> {ex.canal}
              </p>
              <blockquote
                className="text-sm text-foreground-muted leading-relaxed italic border-l-2 pl-3"
                style={{ borderColor: blue }}
              >
                {ex.msg}
              </blockquote>
              <p className="text-[10px] text-foreground-subtle">{ex.desc}</p>
            </div>
          ))}
        </div>

        {/* Presença digital */}
        <div className="rounded-2xl p-5" style={{ background: 'rgba(21,101,192,0.05)', border: '1px solid rgba(21,101,192,0.12)' }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: light }}>📍 Informações de Presença Digital</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-[10px] text-foreground-subtle uppercase tracking-widest mb-1">Instagram</p>
              <p className="font-semibold" style={{ color: light }}>@finotrato.bsb</p>
            </div>
            <div>
              <p className="text-[10px] text-foreground-subtle uppercase tracking-widest mb-1">Facebook</p>
              <p className="font-semibold" style={{ color: light }}>finotratobsb</p>
            </div>
            <div>
              <p className="text-[10px] text-foreground-subtle uppercase tracking-widest mb-1">Localização</p>
              <p className="font-semibold text-foreground-muted">Brasília — DF</p>
            </div>
            <div>
              <p className="text-[10px] text-foreground-subtle uppercase tracking-widest mb-1">Hashtags</p>
              <p className="font-semibold text-xs leading-5" style={{ color: purple }}>#finotrato #higienizacaobrasilia #estofadoslimpos</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Wireframes
───────────────────────────────────────────── */
const WIREFRAME_TABS = [
  { id: 'home', label: 'Home' },
  { id: 'servicos', label: 'Serviços' },
  { id: 'depoimentos', label: 'Depoimentos' },
  { id: 'agendamento', label: 'Agendamento' },
  { id: 'guidelines', label: 'Brand Guide' },
]

function BrandWireframes() {
  const [activeWf, setActiveWf] = useState('home')
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop')

  const blue = '#1565C0'
  const purple = '#7B1FA2'
  const light = '#4FACF0'

  const wireframeContent: Record<string, React.ReactNode> = {
    home: (
      <div className="space-y-3">
        {/* Navbar */}
        <div className="flex items-center justify-between px-4 py-2.5 rounded-xl" style={{ background: `rgba(21,101,192,0.12)`, border: `1px solid rgba(21,101,192,0.2)` }}>
          <div className="w-24 h-4 rounded" style={{ background: `rgba(21,101,192,0.35)` }} />
          <div className="flex gap-2">
            {[1,2,3].map(i => <div key={i} className="w-14 h-3 rounded" style={{ background: 'rgba(255,255,255,0.1)' }} />)}
            <div className="w-24 h-6 rounded-full" style={{ background: `linear-gradient(135deg,${blue},${purple})` }} />
          </div>
        </div>
        {/* Hero */}
        <div className="rounded-xl p-6 min-h-[130px] flex flex-col gap-3 justify-center relative overflow-hidden" style={{ background: `linear-gradient(135deg, rgba(21,101,192,0.15), rgba(123,31,162,0.08))` }}>
          <div className="w-2/3 h-7 rounded" style={{ background: 'rgba(255,255,255,0.12)' }} />
          <div className="w-1/2 h-4 rounded" style={{ background: 'rgba(255,255,255,0.07)' }} />
          <div className="mt-3 relative h-24 rounded-xl overflow-hidden" style={{ border: `1px solid rgba(21,101,192,0.2)` }}>
            <div className="absolute inset-y-0 left-0 w-1/2" style={{ background: `rgba(21,101,192,0.08)` }} />
            <div className="absolute inset-y-0 right-0 w-1/2" style={{ background: `rgba(21,101,192,0.18)` }} />
            <div className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2" style={{ background: `linear-gradient(180deg,${light},${purple})` }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: `rgba(79,172,240,0.6)` }}>Slider Before/After</span>
            </div>
          </div>
          <div className="mt-2 flex gap-2">
            <div className="flex-1 h-9 rounded-full" style={{ background: `linear-gradient(135deg,${blue},${purple})` }} />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {['Estofados','Tapetes','Cortinas'].map((s, i) => (
            <div key={s} className="rounded-xl overflow-hidden" style={{ border: `1px solid rgba(21,101,192,0.15)` }}>
              <div className="h-14" style={{ background: `linear-gradient(135deg, rgba(${21+i*30},${101-i*10},192,0.2), rgba(123,31,162,0.1))` }} />
              <div className="p-2 space-y-1">
                <div className="h-2.5 w-3/4 rounded" style={{ background: 'rgba(255,255,255,0.1)' }} />
                <div className="h-2 w-full rounded" style={{ background: 'rgba(255,255,255,0.05)' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    servicos: (
      <div className="space-y-2">
        <div className="space-y-1.5 mb-4">
          <div className="w-1/4 h-2.5 rounded" style={{ background: `rgba(79,172,240,0.4)` }} />
          <div className="w-1/2 h-5 rounded" style={{ background: 'rgba(255,255,255,0.12)' }} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {['Higienização de Estofados','Impermeabilização','Higienização de Tapetes','Higienização de Cortinas','Couro: Hig. + Hidratação','100% Seguro Pets & Kids'].map((s, i) => (
            <div key={s} className="rounded-xl p-3 flex gap-2 items-start" style={{ background: `rgba(21,101,192,0.07)`, border: `1px solid rgba(21,101,192,0.15)` }}>
              <div className="w-7 h-7 rounded-lg shrink-0" style={{ background: i < 2 ? `linear-gradient(135deg,${blue},${purple})` : `rgba(21,101,192,0.2)` }} />
              <div className="flex-1 space-y-1 pt-0.5">
                <div className="w-full h-2 rounded" style={{ background: 'rgba(255,255,255,0.1)' }} />
                <div className="w-3/4 h-1.5 rounded" style={{ background: 'rgba(255,255,255,0.05)' }} />
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-xl p-3 flex gap-2 items-center mt-2" style={{ background: `rgba(79,172,240,0.08)`, border: `1px solid rgba(79,172,240,0.2)` }}>
          <div className="w-5 h-5 rounded-full shrink-0" style={{ background: `rgba(79,172,240,0.3)` }} />
          <div className="h-2 w-2/3 rounded" style={{ background: 'rgba(255,255,255,0.08)' }} />
        </div>
      </div>
    ),
    depoimentos: (
      <div className="space-y-3">
        <div className="space-y-1.5 mb-4 text-center">
          <div className="mx-auto w-1/4 h-2.5 rounded" style={{ background: `rgba(79,172,240,0.4)` }} />
          <div className="mx-auto w-1/2 h-5 rounded" style={{ background: 'rgba(255,255,255,0.12)' }} />
          <div className="mx-auto w-2/3 h-3 rounded" style={{ background: 'rgba(255,255,255,0.06)' }} />
        </div>
        {[1,2,3].map(i => (
          <div key={i} className="rounded-xl p-4 space-y-3" style={{ background: `rgba(21,101,192,0.07)`, border: `1px solid rgba(21,101,192,0.15)` }}>
            <div className="flex gap-1">
              {[1,2,3,4,5].map(s => <div key={s} className="w-3 h-3 rounded-sm" style={{ background: '#FFC107' }} />)}
            </div>
            <div className="space-y-1.5">
              <div className="h-2 w-full rounded" style={{ background: 'rgba(255,255,255,0.08)' }} />
              <div className="h-2 w-5/6 rounded" style={{ background: 'rgba(255,255,255,0.06)' }} />
              <div className="h-2 w-4/6 rounded" style={{ background: 'rgba(255,255,255,0.04)' }} />
            </div>
            <div className="flex items-center gap-2 pt-1 border-t" style={{ borderColor: `rgba(21,101,192,0.15)` }}>
              <div className="w-6 h-6 rounded-full" style={{ background: `linear-gradient(135deg,${blue},${purple})` }} />
              <div className="space-y-0.5 flex-1">
                <div className="h-2 w-1/3 rounded" style={{ background: 'rgba(255,255,255,0.12)' }} />
                <div className="h-1.5 w-1/4 rounded" style={{ background: 'rgba(255,255,255,0.06)' }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
    agendamento: (
      <div className="space-y-3">
        <div className="rounded-xl p-4" style={{ background: `rgba(21,101,192,0.07)`, border: `1px solid rgba(21,101,192,0.15)` }}>
          <div className="flex gap-2">
            {['①','②','③'].map((n) => (
              <div key={n} className="flex-1 flex flex-col gap-1 items-center">
                <div className="w-6 h-6 rounded-full text-[8px] font-bold flex items-center justify-center" style={{ background: `linear-gradient(135deg,${blue},${purple})`, color: '#fff' }}>{n}</div>
                <div className="h-1.5 w-full rounded" style={{ background: 'rgba(255,255,255,0.07)' }} />
              </div>
            ))}
          </div>
        </div>
        <div className="h-4 w-1/2 rounded" style={{ background: 'rgba(255,255,255,0.1)' }} />
        {['Nome Completo','WhatsApp','Bairro / Região','Tipo de Serviço'].map((f, i) => (
          <div key={f} className={`rounded-xl ${i === 3 ? 'h-16' : 'h-10'}`}
            style={{ background: `rgba(21,101,192,0.08)`, border: `1.5px solid rgba(21,101,192,0.2)` }}
          />
        ))}
        <div className="h-10 rounded-full" style={{ background: `linear-gradient(135deg,${blue},${purple})` }} />
        <div className="text-center">
          <div className="mx-auto h-2 w-3/4 rounded" style={{ background: 'rgba(255,255,255,0.05)' }} />
        </div>
      </div>
    ),
    guidelines: (
      <div className="space-y-3">
        <div className="flex gap-1 border-b pb-px" style={{ borderColor: `rgba(21,101,192,0.2)` }}>
          {['Logo','Cores','Tipografia','Tokens','Componentes'].map((t, i) => (
            <div key={t} className="px-2 py-1.5 text-[8px] font-bold rounded-t" style={{ background: i === 0 ? `rgba(21,101,192,0.2)` : 'transparent', color: i === 0 ? light : 'rgba(255,255,255,0.3)' }}>{t}</div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-xl h-20 flex items-center justify-center relative overflow-hidden" style={{ background: 'white' }}>
            <div className="w-12 h-5 rounded" style={{ background: `linear-gradient(135deg,${blue},${purple})` }} />
            <span className="absolute bottom-1 left-2 text-[7px] font-bold" style={{ color: `${blue}` }}>Principal</span>
          </div>
          <div className="rounded-xl h-20 flex items-center justify-center relative overflow-hidden" style={{ background: blue }}>
            <div className="w-12 h-5 rounded bg-white opacity-80" />
            <span className="absolute bottom-1 left-2 text-[7px] font-bold text-white/60">Reversa Azul</span>
          </div>
          <div className="rounded-xl h-20 flex items-center justify-center relative overflow-hidden" style={{ background: '#0D0D1A' }}>
            <div className="w-12 h-5 rounded bg-white opacity-40" />
            <span className="absolute bottom-1 left-2 text-[7px] font-bold text-white/40">Reversa Escuro</span>
          </div>
        </div>
        <div className="flex gap-1.5">
          {['#1565C0','#0D47A1','#7B1FA2','#4FACF0','#FFC107','#1A0A2E','#F5F5F5'].map(c => (
            <div key={c} className="flex-1 h-6 rounded-md" style={{ background: c }} />
          ))}
        </div>
        <div className="rounded-xl p-3" style={{ background: `rgba(21,101,192,0.05)`, border: `1px solid rgba(21,101,192,0.12)` }}>
          <div className="space-y-1">
            <div className="h-5 w-2/3 rounded" style={{ background: 'rgba(255,255,255,0.12)' }} />
            <div className="h-3 w-1/2 rounded" style={{ background: `rgba(79,172,240,0.3)` }} />
            <div className="h-2 w-3/4 rounded" style={{ background: 'rgba(255,255,255,0.06)' }} />
          </div>
        </div>
      </div>
    ),
  }

  // Mobile wireframes (compact, 390px-style)
  const wireframeMobile: Record<string, React.ReactNode> = {
    home: (
      <div className="max-w-[220px] mx-auto space-y-2">
        <div className="flex items-center justify-between px-3 py-2 rounded-xl" style={{ background: `rgba(21,101,192,0.12)`, border: `1px solid rgba(21,101,192,0.2)` }}>
          <div className="w-16 h-3 rounded" style={{ background: `rgba(21,101,192,0.35)` }} />
          <div className="flex flex-col gap-0.5 w-5">{[1,2,3].map(i => <div key={i} className="h-0.5 rounded" style={{ background: 'rgba(255,255,255,0.4)' }} />)}</div>
        </div>
        <div className="rounded-xl p-4 space-y-2" style={{ background: `linear-gradient(135deg, rgba(21,101,192,0.15), rgba(123,31,162,0.08))` }}>
          <div className="w-full h-5 rounded" style={{ background: 'rgba(255,255,255,0.12)' }} />
          <div className="w-3/4 h-3 rounded" style={{ background: 'rgba(255,255,255,0.07)' }} />
          <div className="relative h-16 rounded-xl overflow-hidden" style={{ border: `1px solid rgba(21,101,192,0.2)` }}>
            <div className="absolute inset-y-0 left-0 w-1/2" style={{ background: `rgba(21,101,192,0.08)` }} />
            <div className="absolute inset-y-0 right-0 w-1/2" style={{ background: `rgba(21,101,192,0.18)` }} />
            <div className="absolute inset-y-0 left-1/2 w-0.5" style={{ background: `linear-gradient(180deg,${light},${purple})` }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[7px] font-bold" style={{ color: 'rgba(79,172,240,0.6)' }}>Before / After</span>
            </div>
          </div>
          <div className="h-8 rounded-full" style={{ background: `linear-gradient(135deg,${blue},${purple})` }} />
        </div>
        <div className="space-y-1.5">
          {['Estofados','Tapetes','Cortinas'].map((s) => (
            <div key={s} className="rounded-xl p-2.5 flex gap-2 items-center" style={{ background: `rgba(21,101,192,0.07)`, border: `1px solid rgba(21,101,192,0.15)` }}>
              <div className="w-6 h-6 rounded-lg shrink-0" style={{ background: `rgba(21,101,192,0.3)` }} />
              <div className="flex-1 space-y-1">
                <div className="h-2 w-2/3 rounded" style={{ background: 'rgba(255,255,255,0.12)' }} />
                <div className="h-1.5 w-full rounded" style={{ background: 'rgba(255,255,255,0.06)' }} />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#25D366' }}>
            <div className="w-5 h-5 rounded-full" style={{ background: 'rgba(255,255,255,0.3)' }} />
          </div>
        </div>
      </div>
    ),
    servicos: (
      <div className="max-w-[220px] mx-auto space-y-2">
        <div className="w-3/4 h-4 rounded" style={{ background: 'rgba(255,255,255,0.12)' }} />
        {['Estofados','Impermeabilização','Tapetes','Cortinas','Couro'].map((s, i) => (
          <div key={s} className="rounded-xl p-3 flex gap-2 items-center" style={{ background: `rgba(21,101,192,0.07)`, border: `1px solid rgba(21,101,192,0.15)` }}>
            <div className="w-8 h-8 rounded-xl shrink-0" style={{ background: i === 0 ? `linear-gradient(135deg,${blue},${purple})` : `rgba(21,101,192,0.2)` }} />
            <div className="flex-1 space-y-1">
              <div className="h-2 w-3/4 rounded" style={{ background: 'rgba(255,255,255,0.12)' }} />
              <div className="h-1.5 w-full rounded" style={{ background: 'rgba(255,255,255,0.06)' }} />
              <div className="h-1.5 w-1/2 rounded" style={{ background: `rgba(79,172,240,0.2)` }} />
            </div>
          </div>
        ))}
      </div>
    ),
    depoimentos: (
      <div className="max-w-[220px] mx-auto space-y-2">
        <div className="text-center space-y-1 mb-2">
          <div className="mx-auto w-3/4 h-4 rounded" style={{ background: 'rgba(255,255,255,0.12)' }} />
          <div className="mx-auto w-1/2 h-2.5 rounded" style={{ background: 'rgba(255,255,255,0.06)' }} />
        </div>
        {[1,2].map(i => (
          <div key={i} className="rounded-xl p-3 space-y-2" style={{ background: `rgba(21,101,192,0.07)`, border: `1px solid rgba(21,101,192,0.15)` }}>
            <div className="flex gap-0.5">{[1,2,3,4,5].map(s => <div key={s} className="w-2.5 h-2.5 rounded-sm" style={{ background: '#FFC107' }} />)}</div>
            <div className="space-y-1">
              <div className="h-1.5 w-full rounded" style={{ background: 'rgba(255,255,255,0.08)' }} />
              <div className="h-1.5 w-5/6 rounded" style={{ background: 'rgba(255,255,255,0.05)' }} />
            </div>
            <div className="flex items-center gap-1.5 pt-1 border-t" style={{ borderColor: `rgba(21,101,192,0.15)` }}>
              <div className="w-5 h-5 rounded-full" style={{ background: `linear-gradient(135deg,${blue},${purple})` }} />
              <div className="h-1.5 w-1/3 rounded" style={{ background: 'rgba(255,255,255,0.1)' }} />
            </div>
          </div>
        ))}
      </div>
    ),
    agendamento: (
      <div className="max-w-[220px] mx-auto space-y-2">
        <div className="w-1/2 h-4 rounded" style={{ background: 'rgba(255,255,255,0.12)' }} />
        {['Nome','WhatsApp','Bairro','Serviço','Data'].map(f => (
          <div key={f} className="h-9 rounded-xl" style={{ background: `rgba(21,101,192,0.08)`, border: `1.5px solid rgba(21,101,192,0.2)` }} />
        ))}
        <div className="h-10 rounded-full" style={{ background: `linear-gradient(135deg,${blue},${purple})` }} />
        <div className="h-2 w-3/4 mx-auto rounded" style={{ background: 'rgba(255,255,255,0.05)' }} />
      </div>
    ),
    guidelines: (
      <div className="max-w-[220px] mx-auto space-y-2">
        <div className="rounded-xl h-16 flex items-center justify-center" style={{ background: 'white' }}>
          <div className="w-12 h-5 rounded" style={{ background: `linear-gradient(135deg,${blue},${purple})` }} />
        </div>
        <div className="flex gap-1">
          {['#1565C0','#7B1FA2','#4FACF0','#FFC107'].map(c => (
            <div key={c} className="flex-1 h-5 rounded" style={{ background: c }} />
          ))}
        </div>
        <div className="rounded-xl p-3 space-y-1.5" style={{ background: `rgba(21,101,192,0.05)`, border: `1px solid rgba(21,101,192,0.12)` }}>
          <div className="h-4 w-1/2 rounded" style={{ background: 'rgba(255,255,255,0.12)' }} />
          <div className="h-2.5 w-1/3 rounded" style={{ background: `rgba(79,172,240,0.3)` }} />
          <div className="h-2 w-2/3 rounded" style={{ background: 'rgba(255,255,255,0.06)' }} />
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
        <span className="w-6 h-px" style={{ background: 'linear-gradient(90deg,#4FACF0,#7B1FA2)' }} />
        07 &mdash; Wireframes
      </motion.h3>

      <motion.div variants={fadeInUp} className="glass-panel p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <p className="text-xs text-foreground-subtle">
            Protótipos estruturais em <strong className="text-foreground-muted">desktop (1440px)</strong> e <strong className="text-foreground-muted">mobile (390px)</strong> — layout, hierarquia e fluxo, sem cor ou imagem final.
          </p>
          <div className="flex items-center gap-1 p-1 rounded-full shrink-0" style={{ background: 'rgba(21,101,192,0.08)', border: '1px solid rgba(21,101,192,0.15)' }}>
            {(['desktop', 'mobile'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className="px-3 py-1.5 text-xs font-semibold rounded-full transition-all"
                style={{
                  background: viewMode === mode ? `linear-gradient(135deg,${blue},${purple})` : 'transparent',
                  color: viewMode === mode ? '#fff' : 'rgba(255,255,255,0.4)',
                }}
              >
                {mode === 'desktop' ? '🖥 Desktop' : '📱 Mobile'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-1 mb-6 border-b border-border-subtle pb-px overflow-x-auto">
          {WIREFRAME_TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveWf(tab.id)}
              className="px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-all relative"
              style={{ color: activeWf === tab.id ? '#4FACF0' : 'rgba(255,255,255,0.35)' }}
            >
              {tab.label}
              {activeWf === tab.id && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t-full"
                  style={{ background: 'linear-gradient(90deg,#1565C0,#7B1FA2)' }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Wireframe content */}
        <div
          className="rounded-2xl p-5 transition-all duration-300"
          style={{ background: 'rgba(21,101,192,0.04)', border: '1px solid rgba(21,101,192,0.12)' }}
        >
          {viewMode === 'desktop' ? wireframeContent[activeWf] : wireframeMobile[activeWf]}
        </div>
        <p className="text-foreground-subtle text-[10px] mt-3 text-center">
          {viewMode === 'desktop' ? '🖥 Desktop 1440px' : '📱 Mobile 390px'} — {WIREFRAME_TABS.find(t => t.id === activeWf)?.label}
        </p>
      </motion.div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Page Component
───────────────────────────────────────────── */
import { GetServerSideProps } from 'next'

export default function FinoTratoCase({ mockupHeroUrl, brandData }: {
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
  const logoDownloadUrl = brandData?.logoDownloadUrl || 'https://finotrato-higienizacao.vercel.app/'
  const fontHeading = brandData?.brandFontHeading || 'Playfair Display'
  const fontBody = brandData?.brandFontBody || 'Inter'

  const blue = '#1565C0'
  const purple = '#7B1FA2'
  const light = '#4FACF0'
  const gradientBrand = `linear-gradient(135deg, ${blue} 0%, ${purple} 100%)`
  const gradientText = { background: gradientBrand, WebkitBackgroundClip: 'text' as const, WebkitTextFillColor: 'transparent' as const, backgroundClip: 'text' as const }

  return (
    <>
      <Head>
        <title>Case: Fino Trato – Landing Page & Brand System | EM Soluções Digitais</title>
        <meta
          name="description"
          content="Como desenvolvemos a landing page de alta conversão e o brand system completo para a Fino Trato, empresa de higienização profissional de estofados em Brasília."
        />
        <meta property="og:title" content="Case: Fino Trato – Landing Page & Brand System Completo" />
        <meta
          property="og:description"
          content="Landing page de alta conversão, design system documentado e brand guidelines interativo para empresa de higienização em Brasília."
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
                `radial-gradient(ellipse 70% 50% at 50% 0%, rgba(21,101,192,0.14) 0%, transparent 70%)`,
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
                { label: 'Meu Papel: Design Engineer (UI/UX & Front-end)' },
                { label: 'Status: Em Produção', highlight: true },
              ].map((badge) => (
                <motion.span
                  key={badge.label}
                  variants={fadeIn}
                  className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border transition-all ${
                    badge.highlight
                      ? 'border-blue-500/30 text-sky-400'
                      : 'bg-surface-raised border-border text-foreground-muted'
                  }`}
                  style={badge.highlight ? { background: 'rgba(21,101,192,0.12)', color: light, borderColor: 'rgba(21,101,192,0.35)' } : {}}
                >
                  {badge.highlight && (
                    <span className="w-1.5 h-1.5 rounded-full inline-block animate-pulse-slow" style={{ background: light }} />
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
              Fino Trato –{' '}
              <span style={gradientText}>
                Landing Page & Brand System Completo
              </span>
            </motion.h1>

            {/* Hero Visual */}
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
                <img src={mockupHeroUrl} alt="Mockup Hero Fino Trato" className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <>
                  {/* Decorative grid */}
                  <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                      backgroundImage:
                        `linear-gradient(rgba(21,101,192,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(21,101,192,0.8) 1px, transparent 1px)`,
                      backgroundSize: '48px 48px',
                    }}
                  />
                  {/* Glow rings */}
                  <div className="absolute w-64 h-64 rounded-full border border-blue-500/10 animate-pulse-slow" />
                  <div className="absolute w-96 h-96 rounded-full border border-blue-500/5 animate-pulse-slow" style={{ animationDelay: '1s' }} />
                  {/* Gradient orbs */}
                  <div className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full opacity-10 pointer-events-none" style={{ background: `radial-gradient(circle, ${blue} 0%, transparent 70%)` }} />
                  <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full opacity-10 pointer-events-none" style={{ background: `radial-gradient(circle, ${purple} 0%, transparent 70%)` }} />

                  <div className="relative z-10 text-center px-8">
                    <div className="w-16 h-16 rounded-2xl glass-panel flex items-center justify-center mx-auto mb-4" style={{ border: `1px solid rgba(21,101,192,0.25)` }}>
                      <Layers size={28} style={{ color: light }} />
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
                className="glass-panel p-8 md:p-10 relative overflow-hidden group transition-all duration-300"
                style={{ borderColor: 'var(--color-glass-border)' }}
              >
                <div
                  className="absolute top-0 right-0 w-48 h-48 opacity-5 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, ${blue} 0%, transparent 60%)`,
                  }}
                />
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">🎯</span>
                  <h2 className="text-lg font-bold text-foreground">O Desafio</h2>
                </div>
                <p className="text-foreground-muted leading-relaxed text-base">
                  A Fino Trato precisava de uma presença digital que transmitisse{' '}
                  <strong className="text-foreground font-semibold">confiança, higiene e profissionalismo</strong>{' '}
                  para famílias em Brasília. O desafio era converter visitantes frios em leads qualificados via
                  WhatsApp, comunicar o diferencial de produtos biodegradáveis seguros para crianças e pets, e
                  entregar uma{' '}
                  <strong className="text-foreground font-semibold">identidade visual consistente</strong>{' '}
                  que pudesse ser aplicada em todos os canais — do site ao Instagram.
                </p>
              </motion.div>

              {/* Solução */}
              <motion.div
                variants={fadeInUp}
                className="glass-panel p-8 md:p-10 relative overflow-hidden group transition-all duration-300"
                style={{ borderColor: 'var(--color-glass-border)' }}
              >
                <div
                  className="absolute top-0 right-0 w-48 h-48 opacity-5 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, ${purple} 0%, transparent 60%)`,
                  }}
                />
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">💡</span>
                  <h2 className="text-lg font-bold text-foreground">A Solução</h2>
                </div>
                <p className="text-foreground-muted leading-relaxed text-base">
                  Desenvolvi uma landing page de{' '}
                  <strong className="text-foreground font-semibold">alta conversão</strong>{' '}
                  com foco em agendar serviços via WhatsApp, slider interativo de antes/depois para prova visual
                  de resultado, e um{' '}
                  <strong className="text-foreground font-semibold">brand system completo documentado</strong>{' '}
                  — tokens, tipografia, paleta e componentes — para garantir consistência em todos os canais de
                  comunicação da marca.
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
                `radial-gradient(ellipse 80% 60% at 50% 100%, rgba(21,101,192,0.07) 0%, transparent 70%)`,
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
              <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: light }}>
                Tecnologia
              </p>
              <h2 className="text-3xl md:text-4xl font-black text-foreground">
                A Stack{' '}
                <span style={gradientText}>Tecnológica</span>
              </h2>
              <p className="text-foreground-muted mt-4 max-w-xl mx-auto text-sm leading-relaxed">
                Cada ferramenta escolhida por performance, simplcidade de manutenção e autonomia total do cliente.
              </p>
            </motion.div>

            {/* Tech Cards Grid */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5"
            >
              {techStack.map((item) => (
                <motion.div
                  key={item.id}
                  variants={fadeInUp}
                  className="glass-panel p-6 flex flex-col gap-4 hover:-translate-y-1 transition-all duration-300"
                  style={{ ['--tw-border-opacity' as string]: '1' } as React.CSSProperties}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(21,101,192,0.35)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = '')}
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(21,101,192,0.12)' }}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: light }}>
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
              <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: light }}>
                Engenharia
              </p>
              <h2 className="text-3xl md:text-4xl font-black text-foreground">
                Destaques{' '}
                <span style={gradientText}>Técnicos</span>
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
                  className={`glass-panel relative overflow-hidden hover:-translate-y-1 transition-all duration-300 group ${item.colSpan} ${
                    item.large ? 'p-8 md:p-10' : 'p-7'
                  }`}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(21,101,192,0.35)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = '')}
                >
                  {/* Decorative glow */}
                  <div
                    className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle, ${blue} 0%, transparent 70%)`,
                    }}
                  />

                  {/* Card number */}
                  <span className="absolute top-5 right-6 text-xs font-bold text-foreground-subtle opacity-30 font-mono">
                    {String(idx + 1).padStart(2, '0')}
                  </span>

                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5" style={{ background: 'rgba(21,101,192,0.12)', border: `1px solid rgba(21,101,192,0.25)` }}>
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
                `radial-gradient(ellipse 80% 50% at 50% 0%, rgba(21,101,192,0.08) 0%, transparent 65%)`,
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
              <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: light }}>
                Identidade Visual
              </p>
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
                Brand{' '}
                <span style={gradientText}>Guidelines</span>
              </h2>
              <p className="text-foreground-muted text-sm max-w-lg mx-auto leading-relaxed">
                Sistema visual completo desenvolvido para a Fino Trato &mdash; logo,
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
                <span className="w-6 h-px" style={{ background: 'linear-gradient(90deg,#4FACF0,#7B1FA2)' }} />
                01 &mdash; Logo &amp; Identidade
              </motion.h3>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Logo showcase */}
                <motion.div variants={fadeInUp} className="lg:col-span-2 glass-panel p-8 md:p-10 flex flex-col gap-6">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Principal (fundo claro) */}
                    <div className="rounded-2xl bg-white p-6 flex items-center justify-center min-h-[140px] relative overflow-hidden">
                      <div className="absolute inset-0 opacity-[0.03]"
                        style={{
                          backgroundImage: `radial-gradient(circle, ${blue} 1px, transparent 1px)`,
                          backgroundSize: '20px 20px',
                        }}
                      />
                      <img
                        src="/logo-fino-trato.png"
                        alt="Fino Trato Logo — Versão Principal"
                        className="relative z-10 max-h-20 w-auto object-contain"
                      />
                      <span className="absolute bottom-2 left-3 text-[9px] font-bold uppercase tracking-widest" style={{ color: blue, opacity: 0.5 }}>Versão Principal — Fundo Claro</span>
                    </div>
                    {/* Reversa Azul */}
                    <div className="rounded-2xl p-6 flex items-center justify-center min-h-[140px] relative overflow-hidden"
                      style={{ background: blue }}>
                      <img
                        src="/logo-fino-trato.png"
                        alt="Fino Trato Logo — Reversa Azul"
                        className="relative z-10 max-h-20 w-auto object-contain brightness-0 invert"
                      />
                      <span className="absolute bottom-2 left-3 text-[9px] font-bold uppercase tracking-widest text-white/60">Versão Reversa — Fundo Azul</span>
                    </div>
                    {/* Reversa Escuro */}
                    <div className="rounded-2xl p-6 flex items-center justify-center min-h-[140px] relative overflow-hidden"
                      style={{ background: 'linear-gradient(135deg, #0a1a2e 0%, #0e0b1a 100%)' }}>
                      <div className="absolute inset-0 opacity-[0.05]"
                        style={{
                          backgroundImage: `radial-gradient(circle, ${light} 1px, transparent 1px)`,
                          backgroundSize: '20px 20px',
                        }}
                      />
                      <img
                        src="/logo-fino-trato.png"
                        alt="Fino Trato Logo — Reversa Escuro"
                        className="relative z-10 max-h-20 w-auto object-contain brightness-0 invert"
                      />
                      <span className="absolute bottom-2 left-3 text-[9px] font-bold uppercase tracking-widest text-white/40">Versão Reversa — Fundo Escuro</span>
                    </div>
                    {/* Monocromático */}
                    <div className="rounded-2xl p-6 flex items-center justify-center min-h-[140px] relative overflow-hidden glass-panel">
                      <img
                        src="/logo-fino-trato.png"
                        alt="Fino Trato Logo — Monocromático"
                        className="relative z-10 max-h-20 w-auto object-contain grayscale opacity-50"
                      />
                      <span className="absolute bottom-2 left-3 text-[9px] font-bold uppercase tracking-widest text-foreground-subtle opacity-50">Monocromático</span>
                    </div>
                  </div>


                  {/* Info cards below logo */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                    {[
                      { title: 'Espaço de proteção', body: 'Manter espaço mínimo ao redor da marca equivalente à altura da letra “F” do logotipo. Nenhum elemento gráfico deve invadir essa área.', tag: '1× altura “F”' },
                      { title: 'Tamanho mínimo', body: 'Abaixo do tamanho mínimo, o logotipo perde legibilidade e deve ser substituído pelo símbolo isolado ou pelo nome em texto.', tag: 'min. 120px / 32mm' },
                      { title: 'Versões aprovadas', body: 'Apenas as versões colorida, reversa branca e monocromática são aprovadas. Não aplicar efeitos, sombras ou distorções.', tag: '3 versões oficiais' },
                    ].map((card) => (
                      <div key={card.title} className="rounded-2xl p-4 space-y-2" style={{ background: 'rgba(21,101,192,0.05)', border: '1px solid rgba(21,101,192,0.12)' }}>
                        <p className="text-sm font-bold text-foreground">{card.title}</p>
                        <p className="text-xs leading-relaxed text-foreground-muted">{card.body}</p>
                        <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold" style={{ background: `rgba(21,101,192,0.15)`, color: light, border: '1px solid rgba(21,101,192,0.25)' }}>{card.tag}</span>
                      </div>
                    ))}
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
                        'Use o azul #1565C0 como cor de destaque em CTAs',
                        'Combine Playfair Display (títulos) com Inter (corpo)',
                        'Use o gradiente azul→roxo em banners e destaques',
                        'Mantenha espaço de proteção ao redor da logo',
                        'Respeite o tamanho mínimo de 120px / 32mm',
                        'Use fotos reais de serviços com antes/depois',
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
                        'Não distorça ou aplique efeitos não aprovados no logo',
                        'Não use sobre fundos com baixo contraste',
                        'Não misture outras fontes sem aprovação',
                        'Não use imagens genéricas de banco de dados',
                        'Não escreva em CAIXA ALTA excessiva',
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
                <span className="w-6 h-px" style={{ background: 'linear-gradient(90deg,#4FACF0,#7B1FA2)' }} />
                02 &mdash; Paleta de Cores
              </motion.h3>

              {/* Gradient hero */}
              <motion.div
                variants={fadeInUp}
                className="relative rounded-3xl h-36 mb-5 overflow-hidden group"
                style={{ background: gradientBrand }}
              >
                <div className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.15) 0px, transparent 1px, transparent 60px, rgba(255,255,255,0.15) 61px)',
                  }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                  <p className="text-white font-black text-2xl tracking-tight" style={{ letterSpacing: '-0.02em' }}>Gradiente da Marca</p>
                  <p className="text-white/70 text-xs font-mono">#1565C0 &rarr; #7B1FA2</p>
                </div>
              </motion.div>

              {/* Color swatches grid */}
              <motion.div variants={staggerContainer} className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                {(colors.length > 0 ? colors : [
                  { name: 'Azul Royal', hex: '#1565C0', fg: '#ffffff' },
                  { name: 'Azul Escuro', hex: '#0D47A1', fg: '#ffffff' },
                  { name: 'Roxo', hex: '#7B1FA2', fg: '#ffffff' },
                  { name: 'Azul Claro', hex: '#4FACF0', fg: '#000000' },
                  { name: 'Âmbar', hex: '#FFC107', fg: '#000000' },
                  { name: 'Dark Deep', hex: '#1A0A2E', fg: '#ffffff' },
                  { name: 'Off White', hex: '#F5F5F5', fg: '#000000' },
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
                <span className="w-6 h-px" style={{ background: 'linear-gradient(90deg,#4FACF0,#7B1FA2)' }} />
                03 &mdash; Tipografia
              </motion.h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Playfair Display */}
                <motion.div variants={fadeInUp} className="glass-panel p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.04] pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${blue} 0%, transparent 60%)` }} />
                  <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: light }}>Headings &amp; Display</p>
                  <p className="text-5xl font-black mb-6 leading-tight" style={{ fontFamily: `"${fontHeading}", serif`, color: 'var(--color-foreground)' }}>
                    Fino<br />
                    <span style={{
                      fontStyle: 'italic',
                      background: gradientBrand,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}>Trato</span>
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
                          Limpeza
                        </span>
                        <span className="text-[10px] font-mono text-foreground-subtle ml-4 shrink-0">{s.label} / {s.size} / {s.weight}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Inter */}
                <motion.div variants={fadeInUp} className="glass-panel p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-[0.04] pointer-events-none"
                    style={{ background: `radial-gradient(circle, ${purple} 0%, transparent 60%)` }} />
                  <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#9C56C2' }}>UI &amp; Body Copy</p>
                  <p className="text-5xl font-black mb-6 leading-tight" style={{ fontFamily: `${fontBody}, sans-serif`, color: 'var(--color-foreground)' }}>
                    In<span style={{
                      background: gradientBrand,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}>ter</span>
                  </p>
                  <div className="space-y-3 border-t border-border-subtle pt-5">
                    {[
                      { size: '14px', weight: '800', label: 'Label/CTA', sample: 'AGENDAR AGORA' },
                      { size: '14px', weight: '600', label: 'Body Bold', sample: 'Higienização de Estofados' },
                      { size: '13px', weight: '500', label: 'Body Regular', sample: 'Asa Sul, Brasília – DF' },
                      { size: '11px', weight: '400', label: 'Caption', sample: '+200 famílias atendidas em Brasília' },
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
                <span className="w-6 h-px" style={{ background: 'linear-gradient(90deg,#4FACF0,#7B1FA2)' }} />
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
                          style={{ borderRadius: r.value, borderColor: blue, background: 'rgba(21,101,192,0.08)' }}
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
                      { label: 'sm', css: `0 1px 3px rgba(21,101,192,0.15)` },
                      { label: 'md', css: `0 4px 12px rgba(21,101,192,0.20)` },
                      { label: 'lg', css: `0 8px 32px rgba(21,101,192,0.25)` },
                      { label: 'xl', css: `0 16px 48px rgba(21,101,192,0.30)` },
                      { label: 'glow', css: `0 0 24px rgba(79,172,240,0.35)` },
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
                          style={{ width: s.w, background: gradientBrand, minWidth: s.w }}
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
                <span className="w-6 h-px" style={{ background: 'linear-gradient(90deg,#4FACF0,#7B1FA2)' }} />
                05 &mdash; Componentes
              </motion.h3>

              {/* Botões */}
              <motion.div variants={fadeInUp} className="glass-panel p-7">
                <p className="text-xs font-bold uppercase tracking-widest mb-5 text-foreground-subtle">Botões</p>
                <div className="flex flex-wrap gap-3">
                  <button
                    className="px-5 py-2.5 rounded-full text-sm font-bold text-white transition-all hover:-translate-y-0.5"
                    style={{ background: gradientBrand, fontFamily: 'Inter, sans-serif' }}
                  >
                    Quero fazer um orçamento
                  </button>
                  <button
                    className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:-translate-y-0.5"
                    style={{ border: `1.5px solid ${blue}`, color: light, fontFamily: 'Inter, sans-serif', background: 'transparent' }}
                  >
                    Agendar online
                  </button>
                  <button
                    className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:-translate-y-0.5"
                    style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'Inter, sans-serif', background: 'transparent' }}
                  >
                    Saiba mais
                  </button>
                </div>
              </motion.div>

              {/* Badges & Tags */}
              <motion.div variants={fadeInUp} className="glass-panel p-7">
                <p className="text-xs font-bold uppercase tracking-widest mb-5 text-foreground-subtle">Badges &amp; Tags</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: '🌟 +200 clientes', bg: `rgba(21,101,192,0.15)`, color: light, border: 'rgba(21,101,192,0.3)' },
                    { label: '🏆 Top Brasília', bg: `rgba(123,31,162,0.12)`, color: '#CE93D8', border: 'rgba(123,31,162,0.25)' },
                    { label: '🌿 Biodegradável', bg: 'rgba(34,197,94,0.12)', color: '#86efac', border: 'rgba(34,197,94,0.25)' },
                    { label: '⚡ Secagem 2h', bg: 'rgba(255,193,7,0.12)', color: '#FFC107', border: 'rgba(255,193,7,0.25)' },
                    { label: '🛡️ 100% Seguro', bg: 'rgba(79,172,240,0.12)', color: '#4FACF0', border: 'rgba(79,172,240,0.25)' },
                  ].map(b => (
                    <span
                      key={b.label}
                      className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold"
                      style={{ background: b.bg, color: b.color, border: `1px solid ${b.border}`, fontFamily: 'Inter, sans-serif' }}
                    >
                      {b.label}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Campos de formulário */}
              <motion.div variants={fadeInUp} className="lg:col-span-2 glass-panel p-7">
                <p className="text-xs font-bold uppercase tracking-widest mb-5 text-foreground-subtle">Campos de Formulário</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-foreground-subtle uppercase tracking-widest">Nome completo</label>
                    <input readOnly placeholder="Ex: Maria Fernanda Silva"
                      className="w-full rounded-xl py-2.5 px-4 text-sm text-white/50 outline-none"
                      style={{ background: 'rgba(21,101,192,0.06)', border: '1.5px solid rgba(21,101,192,0.2)', fontFamily: 'Inter, sans-serif' }}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-foreground-subtle uppercase tracking-widest">Telefone / WhatsApp</label>
                    <input readOnly placeholder="(61) 9 0000-0000"
                      className="w-full rounded-xl py-2.5 px-4 text-sm text-white/50 outline-none"
                      style={{ background: 'rgba(21,101,192,0.06)', border: '1.5px solid rgba(21,101,192,0.2)', fontFamily: 'Inter, sans-serif' }}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-foreground-subtle uppercase tracking-widest">Serviço desejado</label>
                    <div className="w-full rounded-xl py-2.5 px-4 text-sm flex items-center justify-between"
                      style={{ background: 'rgba(21,101,192,0.06)', border: '1.5px solid rgba(21,101,192,0.2)', color: 'rgba(255,255,255,0.35)', fontFamily: 'Inter, sans-serif' }}>
                      <span>Selecione o serviço</span>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 4l4 4 4-4" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-foreground-subtle uppercase tracking-widest">Data preferida</label>
                    <input readOnly placeholder="dd/mm/aaaa"
                      className="w-full rounded-xl py-2.5 px-4 text-sm text-white/35 outline-none"
                      style={{ background: 'rgba(21,101,192,0.06)', border: '1.5px solid rgba(21,101,192,0.2)', fontFamily: 'Inter, sans-serif' }}
                    />
                  </div>
                </div>
                <button
                  className="mt-4 px-6 py-2.5 rounded-full text-sm font-bold text-white transition-all hover:-translate-y-0.5"
                  style={{ background: gradientBrand, fontFamily: 'Inter, sans-serif' }}
                >
                  Solicitar orçamento gratuito
                </button>
              </motion.div>

              {/* Cards de Serviços */}
              <motion.div variants={fadeInUp} className="lg:col-span-2 glass-panel p-7">
                <p className="text-xs font-bold uppercase tracking-widest mb-5 text-foreground-subtle">Cards de Serviços</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {[
                    { icon: '🛌', name: 'Higienização de Estofados', desc: 'Sofás, poltronas e cadeiras com extração profunda de ácaros e bactérias.', tag: '+ popular' },
                    { icon: '💧', name: 'Impermeabilização', desc: 'Barreira protetora contra líquidos e manchas. Durabilidade ampliada.', tag: 'proteção extra' },
                    { icon: '⬛', name: 'Higienização de Tapetes', desc: 'Todos os tipos e tamanhos. Técnica a seco para preservar as fibras.', tag: 'a seco' },
                    { icon: '😶', name: 'Higienização de Cortinas', desc: 'Tratamento no local, sem necessidade de remoção ou substituição.', tag: 'sem remoção' },
                    { icon: '🪑', name: 'Couro: Higienização e Hidratação', desc: 'Limpeza profunda e hidratação para prolongar a vida do couro.', tag: 'premium' },
                  ].map((card) => (
                    <div key={card.name} className="rounded-2xl p-4 flex flex-col gap-2" style={{ background: 'rgba(21,101,192,0.06)', border: '1px solid rgba(21,101,192,0.15)' }}>
                      <span className="text-2xl">{card.icon}</span>
                      <p className="text-xs font-bold text-foreground leading-tight">{card.name}</p>
                      <p className="text-[10px] leading-relaxed text-foreground-subtle">{card.desc}</p>
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full self-start" style={{ background: 'rgba(21,101,192,0.2)', color: light }}>{card.tag}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Trust Badges — Selos de Confiança */}
              <motion.div variants={fadeInUp} className="lg:col-span-2 glass-panel p-7">
                <p className="text-xs font-bold uppercase tracking-widest mb-5 text-foreground-subtle">Trust Badges — Selos de Confiança</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    '🐾 100% Seguro para Pets',
                    '🌿 Produtos Biodegradáveis',
                    '⏱ Secagem em até 2h',
                    '⭐ +200 Clientes Satisfeitos',
                    '🏙️ Atendemos Brasília e DF',
                    '⛔ Zero Resíduo Tóxico',
                  ].map(t => (
                    <span key={t} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.65)', fontFamily: 'Inter, sans-serif' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* ────────────────────── 6. VOZ & TOM */}
            <BrandVoice />

            <BrandWireframes />

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
                `radial-gradient(ellipse 90% 70% at 50% 50%, rgba(21,101,192,0.08) 0%, transparent 70%)`,
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
                <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest border" style={{ background: 'rgba(21,101,192,0.1)', borderColor: 'rgba(21,101,192,0.3)', color: light }}>
                  <span className="text-base">📈</span> O Impacto
                </span>
              </motion.div>

              {/* Impact Text */}
              <motion.p
                variants={fadeInUp}
                className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground leading-snug mb-14 max-w-3xl mx-auto"
              >
                A Fino Trato agora possui uma identidade digital{' '}
                <span className="font-bold" style={gradientText}>profissional e consistente</span>{' '}
                que comunica confiança, gera leads qualificados via WhatsApp e entrega um brand system
                completo para crescer em todos os canais.
              </motion.p>

              {/* Divider */}
              <motion.div
                variants={fadeIn}
                className="flex items-center justify-center gap-3 mb-14"
              >
                <div className="h-px w-16 bg-border" />
                <div className="flex gap-2">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: blue, opacity: 1 - i * 0.25 }}
                    />
                  ))}
                </div>
                <div className="h-px w-16 bg-border" />
              </motion.div>

              {/* Metrics */}
              <motion.div
                variants={staggerContainer}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14"
              >
                {[
                  { value: '+200', label: 'Famílias atendidas', emoji: '🏠' },
                  { value: '6', label: 'Serviços ofertados', emoji: '✨' },
                  { value: '100%', label: 'Conversão via WhatsApp', emoji: '📱' },
                ].map(metric => (
                  <motion.div key={metric.value} variants={fadeInUp} className="glass-panel p-6 text-center">
                    <div className="text-3xl mb-2">{metric.emoji}</div>
                    <div className="text-3xl font-black mb-1" style={gradientText}>{metric.value}</div>
                    <div className="text-xs text-foreground-muted">{metric.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                variants={staggerContainer}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <motion.a
                  variants={fadeInUp}
                  href="https://finotrato-higienizacao.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-4 text-sm font-bold inline-flex items-center gap-2.5 min-w-[200px] justify-center rounded-full text-white transition-all"
                  style={{ background: gradientBrand }}
                >
                  Ver Projeto Ao Vivo
                  <ExternalLink size={15} />
                </motion.a>

                <motion.a
                  variants={fadeInUp}
                  href="/"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2.5 px-8 py-4 text-sm font-bold rounded-full transition-all duration-200 min-w-[200px] justify-center"
                  style={{ border: `1px solid rgba(21,101,192,0.4)`, color: light }}
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
                  { icon: <Zap size={14} />, label: 'Landing de Alta Conversão' },
                  { icon: <BookOpen size={14} />, label: 'Brand System Completo' },
                  { icon: <Globe size={14} />, label: 'SEO Local Otimizado' },
                ].map((badge) => (
                  <span
                    key={badge.label}
                    className="flex items-center gap-2 text-xs text-foreground-muted"
                  >
                    <span style={{ color: light }}>{badge.icon}</span>
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
      where: { slug: 'fino-trato' },
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
          logoDownloadUrl: project.logoDownloadUrl || 'https://finotrato-higienizacao.vercel.app/',
          brandColors: project.brandColors || '',
          brandFontHeading: project.brandFontHeading || 'Playfair Display',
          brandFontBody: project.brandFontBody || 'Inter',
        } : null
      }
    }
  } catch {
    return { props: { mockupHeroUrl: null, brandData: null } }
  }
}
