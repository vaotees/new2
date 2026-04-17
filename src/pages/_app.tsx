import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import Script from 'next/script'
import { useEffect, useState } from 'react'
import BackToTop from '../components/BackToTop'
import '../styles/globals.css'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps<{ session: any }>) {
  const [gaId, setGaId] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/seo/public')
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.googleAnalyticsId && /^G-[A-Z0-9]{6,}$/.test(data.googleAnalyticsId)) {
          setGaId(data.googleAnalyticsId)
        }
      })
      .catch(() => {})
  }, [])

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <SessionProvider session={session}>
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', { page_path: window.location.pathname });
              `}
            </Script>
          </>
        )}
        <Component {...pageProps} />
        <BackToTop />
      </SessionProvider>
    </ThemeProvider>
  )
}


