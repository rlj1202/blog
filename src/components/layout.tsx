import Head from 'next/head';
import Script from 'next/script';

import { DefaultSeo } from 'next-seo';

import Config from '@/config';
import Topbar from '@/components/topbar';
import Footer from './footer';

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Script
        src="https://kit.fontawesome.com/1dddf9384f.js"
        crossOrigin="anonymous"
      />
      <Head>
        <title>{Config.title}</title>

        {/* Favicon */}
        <link rel="icon" href={Config.favicon} />
        {/* <link rel="icon" sizes="192x192" href="/favicon.png" /> */}
        {/* Safari browser */}
        <link rel="mask-icon" href={Config.favicon} color="#000000" />
        {/* iOS */}
        {/* <link rel="apple-touch-icon" href={Config.favicon} /> */}

        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Chrome, Firefox and Opera */}
        {/* will not be used in android device when the dark mode is enabled. */}
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="#FF4F4F"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="#272727"
        />
        {/* Windows Phone */}
        <meta name="msapplication-navbutton-color" content="#FF4F4F" />
        {/* iOS Safari */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="#black-translucent"
        />
      </Head>
      <DefaultSeo
        title={Config.title}
        description={Config.description}
        openGraph={{
          type: 'website',
          locale: 'ko_KR',
          siteName: Config.title,
        }}
        twitter={{
          handle: Config.author.twitter.handle,
          cardType: 'summary_large_image',
        }}
      />

      <div className="topbar">
        <Topbar />
      </div>

      <div className="main">
        {children}

        <hr />

        <Footer />
      </div>

      <style jsx>{`
        .main {
          margin-left: auto;
          margin-right: auto;
          max-width: 50rem;
          padding: 0 1.25rem;
        }
        hr {
          margin: 2rem 0;
        }
        .topbar {
          position: sticky;
          top: 0;
          z-index: 10;
        }
      `}</style>
    </div>
  );
};

export default Layout;
