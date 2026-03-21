import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Agência Digital Premium | Autoridade Digital',
  description: 'Transformamos marcas em autoridades digitais. Branding, desenvolvimento web, SEO, tráfego pago e muito mais.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
