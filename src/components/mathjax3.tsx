// @refresh reset

import { NextPage } from 'next'

import Script from 'next/script'
import { useEffect } from 'react'

interface MathJax3 {
  typeset?(): void
  typesetPromise?(): Promise<void>
}

function getMathJax3(): MathJax3 | undefined {
  return (window as any).MathJax as MathJax3
}

const MathJax3: NextPage = () => {
  useEffect(() => {
    getMathJax3()?.typesetPromise?.()
  })

  return (
    <>
      <Script src="/mathjax.js" strategy="beforeInteractive" defer />
      {/* Polyfill is already included in nextjs.
      <Script src="https://polyfill.io/v3/polyfill.min.js?features=es6" strategy="beforeInteractive" defer />
      */}
      <Script
        id="MathJax-script"
        src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
        strategy="beforeInteractive" defer />
    </>
  )
}

export default MathJax3
