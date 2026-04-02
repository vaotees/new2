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
}

interface HomeProps {
  features: Feature[]
}

export default function Home({ features }: HomeProps) {
  return (
    <>
      <Head>
        <title>EM Soluções Digitais | Agência Digital Premium</title>
      </Head>
      <main className="bg-background-dark min-h-screen">
        <Navbar />
        <HeroSection />
        <FeaturesGrid cmsFeatures={features} />
        <Testimonials />
        <Footer />
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async ({ req }) => {
  try {
    // Use internal API call — works reliably with Next.js 12 SSR
    const proto = req.headers['x-forwarded-proto'] || 'http'
    const host = req.headers.host || 'localhost:3000'
    const res = await fetch(`${proto}://${host}/api/features`)
    if (!res.ok) return { props: { features: [] } }
    const features: Feature[] = await res.json()
    return { props: { features: Array.isArray(features) ? features : [] } }
  } catch {
    return { props: { features: [] } }
  }
}
