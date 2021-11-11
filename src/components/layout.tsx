import type { NextPage } from 'next'
import Head from 'next/head'
import Script from 'next/script'

import Config from '../config'
import Topbar from '../components/topbar'

const Layout: NextPage = ({ children }) => {
  return (
    <div>
      <Script src="https://kit.fontawesome.com/1dddf9384f.js" crossOrigin="anonymous" />
      <Head>
        <title>{Config.title}</title>

        {/* SEO */}
        <meta name="description" content={Config.description} />
        <meta name="keywords" content={Config.keywords} />

        <link rel="icon" href="/favicon.ico" />
        {/* <link rel="icon" sizes="192x192" href="/favicon.png" /> */}

        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Chrome, Firefox and Opera */}
        {/* will not be used in android device when the dark mode is enabled. */}
        <meta name="theme-color" content="#FF4F4F" />
        {/* Windows Phone */}
        <meta name="msapplication-navbutton-color" content="#FF4F4F" />
        {/* iOS Safari */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#black-translucent" />
      </Head>

      <Topbar />

      <main>
        {children}
      </main>

      <footer className="footer">
        <div className="rss">
          <i className="fas fa-rss"></i>
          <a href={Config.rss.rss2Path}>RSS 2.0</a>
          <a href={Config.rss.atom1Path}>ATOM 1.0</a>
          <a href={Config.rss.json1Path}>JSON 1.0</a>
        </div>
        <div>
          {Config.copyright}
        </div>
      </footer>

      <style jsx>{`
        .rss {
          margin-bottom: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          column-gap: 10px;
        }
        .footer {
          font-family: 'Consolas', 'Ubuntu Mono', monospace;
          margin: 40px;
          text-align: center;
          color: #999999;
          font-size: 0.9em;
        }
      `}</style>
    </div>
  )
}

export default Layout
