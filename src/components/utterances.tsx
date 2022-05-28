// @refresh reset

import { useEffect } from 'react'

import Config from '@/config'

/*
<script
  src="https://utteranc.es/client.js"
  repo="rlj1202/blog"
  issue-term="pathname"
  theme="github-light"
  crossorigin="anonymous"
  async>
</script>

# References
- https://utteranc.es/
- https://cheese10yun.github.io/utterances/
*/

const Utterances: React.FC = () => {
  return (
    <section ref={element => {
      if (!element) {
        return
      }
      
      var frames: HTMLCollectionOf<Element>
      if ((frames = document.getElementsByClassName('utterances')).length > 0) {
        console.log('utterances does already exist.')
        
        Array
          .from(frames)
          .forEach(frame => frame.parentElement?.removeChild(frame))
      }

      const scriptElem = document.createElement('script')
      scriptElem.src = 'https://utteranc.es/client.js'
      scriptElem.async = true
      scriptElem.setAttribute('repo', Config.utterances.repo)
      scriptElem.setAttribute('issue-term', Config.utterances.issueTerm)
      scriptElem.setAttribute('theme', Config.utterances.theme)
      // scriptElem.setAttribute('label', '')
      scriptElem.crossOrigin = 'anonymous'
      element.appendChild(scriptElem)
    }}>
      
    </section>
  )
}

export default Utterances
