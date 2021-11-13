import '../styles/globals.css'
import '../styles/hljs.css'
import '../styles/utterances.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />
  )
}

export default MyApp
