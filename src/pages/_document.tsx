import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Google Web Fonts */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <Script src="/mathjax.js" strategy="beforeInteractive" defer />
          {/* Polyfill is already included in nextjs.
          <Script src="https://polyfill.io/v3/polyfill.min.js?features=es6" strategy="beforeInteractive" defer />
          */}
          <Script
            id="MathJax-script"
            src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
            strategy="beforeInteractive"
            defer
          />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
