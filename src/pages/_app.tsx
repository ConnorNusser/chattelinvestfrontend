import NavbarComponent from '@/components/navbarcomponent'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
export default function App({ Component, pageProps: { session, ...pageProps }}: AppProps) {
  return <SessionProvider session={session}>
    <NavbarComponent /><Component {...pageProps} /></SessionProvider>
}
