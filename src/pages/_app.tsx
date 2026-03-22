import type { AppProps } from 'next/app'
import { SessionProvider, SessionProviderProps } from 'next-auth/react'
import '../styles/globals.css'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps<{ session: any }>) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
