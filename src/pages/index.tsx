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

interface HomeProps {
  features: Feature[]
  sectionConfig: SectionConfig | null
}

export default function Home({ features, sectionConfig }: HomeProps) {
  return (
    <>
      <Head>
        <title>EM Soluções Digitais | Agência Digital Premium</title>
      </Head>
      <main className="bg-background-dark min-h-screen">
        <Navbar />
        <FeaturesGrid cmsFeatures={features} sectionConfig={sectionConfig} />
        <Testimonials />
        <Footer />
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async ({ req }) => {
  try {
    const proto = req.headers['x-forwarded-proto'] || 'http'
    const host = req.headers.host || 'localhost:3000'
    const baseUrl = `${proto}://${host}`

    const [featuresRes, configRes] = await Promise.all([
      fetch(`${baseUrl}/api/features`),
      fetch(`${baseUrl}/api/features/config`)
    ])

    const features = featuresRes.ok ? await featuresRes.json() : []
    const sectionConfig = configRes.ok ? await configRes.json() : null

    return { 
      props: { 
        features: Array.isArray(features) ? features : [],
        sectionConfig: sectionConfig && !sectionConfig.error ? sectionConfig : null
      } 
    }
  } catch {
    return { props: { features: [], sectionConfig: null } }
  }
}
