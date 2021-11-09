// @refresh reset

import { NextPage } from 'next'

const MathJax: NextPage = () => {
  return (
    <section ref={element => {
      if (!element) {
        return
      }

      const scriptElem = document.createElement('script')
      scriptElem.id = 'MathJax-script'
      scriptElem.async = true
      scriptElem.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js'
      scriptElem.setAttribute('', '')
      element.appendChild(scriptElem)
    }}>
    </section>
  )
}

export default MathJax
