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

interface SeoConfig {
  siteTitle: string
  metaDescription: string
  ogImage: string
  keywords: string
  canonicalUrl: string
  robotsIndex: boolean
}

interface HomeProps {
  features: Feature[]
  sectionConfig: SectionConfig | null
  testimonials: CMSTestimonial[]
  testiConfig: SectionTestimonialsConfig | null
  heroConfig: SectionHeroConfig | null
  seoConfig: SeoConfig | null
}

export default function Home({ features, sectionConfig, testimonials, testiConfig, heroConfig, seoConfig }: HomeProps) {
  const seo = seoConfig ?? {
    siteTitle: 'EM Soluções Digitais | Agência Digital Premium',
    metaDescription: 'Estratégia, design e tecnologia de ponta para posicionar seu negócio como referência no mercado digital. Resultados mensuráveis, estética impecável.',
    ogImage: '',
    keywords: 'agência digital, websites, marketing digital, tráfego pago, automação',
    canonicalUrl: '',
    robotsIndex: true,
  }

  return (
    <>
      <Head>
        <title>{seo.siteTitle}</title>
        <meta name="description" content={seo.metaDescription} />
        {seo.keywords && <meta name="keywords" content={seo.keywords} />}
        {seo.canonicalUrl && <link rel="canonical" href={seo.canonicalUrl} />}
        <meta name="robots" content={seo.robotsIndex ? 'index,follow' : 'noindex,nofollow'} />
        {/* Open Graph */}
        <meta property="og:title" content={seo.siteTitle} />
        <meta property="og:description" content={seo.metaDescription} />
        <meta property="og:type" content="website" />
        {seo.canonicalUrl && <meta property="og:url" content={seo.canonicalUrl} />}
        {seo.ogImage && <meta property="og:image" content={seo.ogImage} />}
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.siteTitle} />
        <meta name="twitter:description" content={seo.metaDescription} />
        {seo.ogImage && <meta name="twitter:image" content={seo.ogImage} />}
      </Head>

      {/* Subtle tech canvas — fixed bg behind entire page (below hero which has its own) */}

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

    const [features, sectionConfig, testimonials, testiConfig, heroConfig, seoConfig] = await Promise.all([
      prisma.feature.findMany({
        orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
      }),
      prisma.sectionFeaturesConfig.findUnique({ where: { id: 'singleton' } }),
      prisma.testimonial.findMany({
        orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
      }),
      prisma.sectionTestimonialsConfig.findUnique({ where: { id: 'singleton' } }),
      prisma.sectionHeroConfig.findUnique({ where: { id: 'singleton' } }),
      prisma.seoConfig.findUnique({ where: { id: 'singleton' } }),
    ])

    return {
      props: {
        features: JSON.parse(JSON.stringify(features)),
        sectionConfig: sectionConfig ? JSON.parse(JSON.stringify(sectionConfig)) : null,
        testimonials: JSON.parse(JSON.stringify(testimonials)),
        testiConfig: testiConfig ? JSON.parse(JSON.stringify(testiConfig)) : null,
        heroConfig: heroConfig ? JSON.parse(JSON.stringify(heroConfig)) : null,
        seoConfig: seoConfig ? JSON.parse(JSON.stringify(seoConfig)) : null,
      }
    }
  } catch {
    return { props: { features: [], sectionConfig: null, testimonials: [], testiConfig: null, heroConfig: null, seoConfig: null } }
  }
}
