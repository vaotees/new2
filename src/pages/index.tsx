import Head from 'next/head'
import { GetServerSideProps } from 'next'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import FeaturesGrid from '@/components/FeaturesGrid'
import Testimonials from '@/components/Testimonials'
import Footer from '@/components/Footer'

interface Feature {
  id: string
  title: string
  description: string
  icon: string
  highlight?: boolean
}

interface SectionConfig {
  tagline: string
  title1: string
  titleHighlight: string
  description: string
}

interface CMSTestimonial {
  id: string
  authorName: string
  authorRole: string
  content: string
  rating: number
  avatarUrl?: string | null
}

interface SectionTestimonialsConfig {
  tagline: string
  title1: string
  titleHighlight: string
  description: string
}

interface SectionHeroConfig {
  badge: string
  titlePrefix: string
  rotatingWords: string
  description: string
  ctaPrimaryText: string
  ctaPrimaryUrl: string
  ctaSecondaryText: string
  ctaSecondaryUrl: string
  socialClients: string
  socialRating: string
  socialRevenue: string
}

interface HomeProps {
  features: Feature[]
  sectionConfig: SectionConfig | null
  testimonials: CMSTestimonial[]
  testiConfig: SectionTestimonialsConfig | null
  heroConfig: SectionHeroConfig | null
}

export default function Home({ features, sectionConfig, testimonials, testiConfig, heroConfig }: HomeProps) {
  return (
    <>
      <Head>
        <title>EM Soluções Digitais | Agência Digital Premium</title>
      </Head>
      <main className="bg-surface min-h-screen">
        <Navbar />
        <HeroSection sectionConfig={heroConfig} />
        <FeaturesGrid cmsFeatures={features} sectionConfig={sectionConfig} />
        <Testimonials cmsTestimonials={testimonials} sectionConfig={testiConfig} />
        <Footer />
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  try {
    const { prisma } = await import('../lib/prisma')

    const [features, sectionConfig, testimonials, testiConfig, heroConfig] = await Promise.all([
      prisma.feature.findMany({
        orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
      }),
      prisma.sectionFeaturesConfig.findUnique({ where: { id: 'singleton' } }),
      prisma.testimonial.findMany({
        orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
      }),
      prisma.sectionTestimonialsConfig.findUnique({ where: { id: 'singleton' } }),
      prisma.sectionHeroConfig.findUnique({ where: { id: 'singleton' } }),
    ])

    return {
      props: {
        features: JSON.parse(JSON.stringify(features)),
        sectionConfig: sectionConfig ? JSON.parse(JSON.stringify(sectionConfig)) : null,
        testimonials: JSON.parse(JSON.stringify(testimonials)),
        testiConfig: testiConfig ? JSON.parse(JSON.stringify(testiConfig)) : null,
        heroConfig: heroConfig ? JSON.parse(JSON.stringify(heroConfig)) : null,
      }
    }
  } catch {
    return { props: { features: [], sectionConfig: null, testimonials: [], testiConfig: null, heroConfig: null } }
  }
}
