import Head from 'next/head'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import FeaturesGrid from '@/components/FeaturesGrid'
import Testimonials from '@/components/Testimonials'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>Agência Digital Premium | Autoridade Digital</title>
      </Head>
      <main className="bg-background-dark min-h-screen">
        <Navbar />
        <HeroSection />
        <FeaturesGrid />
        <Testimonials />
        <Footer />
      </main>
    </>
  )
}
