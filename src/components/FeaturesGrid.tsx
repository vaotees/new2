'use client'

import { motion } from 'framer-motion'
import {
  Palette, Code2, TrendingUp, Target, Share2, BarChart3,
  Check, Star, Zap, Globe, Shield, Rocket, Cpu, Users,
  BarChart2, Award, Lightbulb, Lock, Layers, LucideIcon,
  Megaphone, Bot, Camera, FileText, ShoppingCart, Heart,
  Settings, Database, Cloud, Smartphone, Mail, Search,
  ChartBar, PieChart, LineChart, DollarSign, Briefcase,
  Building, Map, Link, Video, Music, Image, Play,
} from 'lucide-react'
import { FeatureCard } from './FeatureCard'
import TechCanvas from './TechCanvas'

// Static icon map replaces `import * as LucideIcons` (which bundles all ~1000 icons)
const ICON_MAP: Record<string, LucideIcon> = {
  Palette, Code2, TrendingUp, Target, Share2, BarChart3,
  Check, Star, Zap, Globe, Shield, Rocket, Cpu, Users,
  BarChart2, Award, Lightbulb, Lock, Layers,
  Megaphone, Bot, Camera, FileText, ShoppingCart, Heart,
  Settings, Database, Cloud, Smartphone, Mail, Search,
  ChartBar: BarChart3, PieChart, LineChart, DollarSign, Briefcase,
  Building, Map, Link, Video, Music, Image, Play,
}

export interface CMSFeature {
  id: string
  title: string
  description: string
  icon: string
  highlight?: boolean
}

export interface SectionConfig {
  tagline: string
  title1: string
  titleHighlight: string
  description: string
}

interface StaticService {
  icon: LucideIcon
  title: string
  description: string
  highlight?: boolean
}

const staticServices: StaticService[] = [
  {
    icon: Globe,
    title: 'Websites de Alta Performance',
    description: 'O seu negócio merece mais do que um simples cartão de visita digital. Desenvolvemos websites com design premium, navegação intuitiva e arquitetura focada na conversão. Estruturas robustas, otimizadas para velocidade e desenhadas para transmitir autoridade imediata a quem acede ao seu ecrã. Transforme visitantes em clientes com uma presença digital de elite.',
  },
  {
    icon: Palette,
    title: 'Design Gráfico & Posicionamento',
    description: 'A primeira impressão dita o valor do seu serviço. Criamos materiais gráficos que comunicam confiança, sofisticação e profissionalismo. Desde criativos de alta conversão para as suas campanhas até à identidade visual que acompanha a sua marca, o nosso design é a engenharia invisível que eleva a perceção de valor da sua empresa no mercado.',
  },
  {
    icon: Zap,
    title: 'Automatização de Atendimento com IA (WhatsApp)',
    description: 'Não perca mais negócios por demorar a responder. Implementamos assistentes de Inteligência Artificial no seu telemóvel corporativo, capazes de atender, qualificar leads e conduzir negociações 24 horas por dia, 7 dias por semana. Um atendimento fluido, inteligente e focado em vendas, garantindo que o seu funil de captação nunca pare de funcionar.',
    highlight: true,
  },
  {
    icon: Target,
    title: 'Tráfego Pago (Google Ads & Redes Sociais)',
    description: 'O melhor design do mundo precisa de ser visto pelas pessoas certas. Gerimos as suas campanhas de anúncios no Google, Instagram e Facebook com precisão cirúrgica. Analisamos métricas e otimizamos o seu orçamento para colocar a sua oferta de alto valor diretamente à frente de quem já está pronto para fechar negócio.',
  },
  {
    icon: Code2,
    title: 'Landing Pages de Alta Conversão',
    description: 'Páginas de vendas desenhadas milimetricamente para um único objetivo: transformar o seu tráfego em lucro. Aplicamos engenharia de conversão, copywriting persuasivo e um design de interface (UI) premium para que a sua oferta seja percebida com o mais alto valor de mercado. Uma estrutura veloz e sofisticada, ideal para lançamentos, infoprodutos e captação de clientes que não hesitam em comprar.',
  },
  {
    icon: Share2,
    title: 'Gestão de Redes Sociais Premium',
    description: 'Transformamos o seu Instagram de uma vitrine passiva em uma máquina ativa de prospecção e autoridade. Unimos design gráfico de elite à estratégia de conteúdo intencional. Não fazemos apenas \'postagens\'; construímos uma narrativa visual e textual que retém a atenção, gera desejo e conduz o seu seguidor pelo caminho da confiança até a assinatura de um novo contrato.',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

interface FeaturesGridProps {
  cmsFeatures?: CMSFeature[]
  sectionConfig?: SectionConfig | null
}

export default function FeaturesGrid({ cmsFeatures, sectionConfig }: FeaturesGridProps) {
  const hasCmsData = cmsFeatures && cmsFeatures.length > 0
  const itemsToRender = hasCmsData ? cmsFeatures : staticServices

  const config = sectionConfig || {
    tagline: "NOSSOS SERVIÇOS",
    title1: "Tudo que você precisa para se tornar ",
    titleHighlight: "referência no digital",
    description: "Uma suite completa de serviços integrados, construída para marcas que não aceitam mediocridade."
  };

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Tech canvas background */}
      <TechCanvas mode="subtle" />

      {/* Section glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(249,115,22,0.04) 0%, transparent 70%)',
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
            {config.tagline || "NOSSOS SERVIÇOS"}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6 leading-tight">
            {config.title1 || "Tudo que você precisa para se tornar "}{' '}
            <span className="text-orange-gradient">{config.titleHighlight || "referência no digital"}</span>
          </h2>
          <p className="text-foreground-muted text-lg max-w-2xl mx-auto whitespace-pre-wrap">
            {config.description || "Uma suite completa de serviços integrados, construída para marcas que não aceitam mediocridade."}
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
          {itemsToRender.map((service: any) => {
            const IconComp = typeof service.icon === 'string'
              ? (ICON_MAP[service.icon] || Check)
              : (service.icon as LucideIcon)

            return (
              <FeatureCard
                key={service.title}
                title={service.title}
                description={service.description}
                icon={IconComp}
                highlight={service.highlight}
              />
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

