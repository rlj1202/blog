import Head from 'next/head'
import Script from 'next/script'

import Config from '../config'
import Topbar from '../components/topbar'
import Footer from './footer'

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Script src="https://kit.fontawesome.com/1dddf9384f.js" crossOrigin="anonymous" />
      <Head>
        <title>{Config.title}</title>

        {/* SEO */}
        <meta name="description" content={Config.description} />
        <meta name="keywords" content={Config.keywords} />

        <link rel="icon" href={Config.favicon} />
        {/* <link rel="icon" sizes="192x192" href="/favicon.png" /> */}
        {/* Safari browser */}
        <link rel="mask-icon" href={Config.favicon} color="#000000" />
        {/* iOS */}
        {/* <link rel="apple-touch-icon" href={Config.favicon} /> */}

        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Chrome, Firefox and Opera */}
        {/* will not be used in android device when the dark mode is enabled. */}
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#FF4F4F" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#FF4F4F" />
        {/* Windows Phone */}
        <meta name="msapplication-navbutton-color" content="#FF4F4F" />
        {/* iOS Safari */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#black-translucent" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap" rel="stylesheet" />
      </Head>

      <Topbar />

      <div className="main">
        {children}

        <hr />
      </div>

      <Footer />

      <style jsx>{`
        .main {
          margin: 40px auto;
          max-width: 800px;
          padding: 0 40px;
          box-sizing: content-box;
        }
        hr {
          margin: 40px 0;
        }
      `}</style>
    </div>
  )
}

export default Layout
