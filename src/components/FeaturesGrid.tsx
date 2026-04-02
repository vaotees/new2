'use client'

import { motion } from 'framer-motion'
import {
  Palette, Code2, TrendingUp, Target, Share2, BarChart3,
  Check, Star, Zap, Globe, Shield, Rocket, Cpu, Users,
  BarChart2, Award, Lightbulb, Lock, Layers, LucideIcon
} from 'lucide-react'
import { FeatureCard } from './FeatureCard'

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
            Nossos Serviços
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
            Tudo que você precisa para se tornar{' '}
            <span className="text-orange-gradient">referência no digital</span>
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
          {staticServices.map((service) => {
            return (
              <FeatureCard
                key={service.title}
                title={service.title}
                description={service.description}
                icon={service.icon}
                highlight={service.highlight}
              />
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
