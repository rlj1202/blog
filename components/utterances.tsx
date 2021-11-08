// @refresh reset

import { NextPage } from 'next'

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

const Utterances: NextPage = () => {
  console.log(`Utterances called ${Date.now().toString()}`)

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
      scriptElem.setAttribute('repo', 'rlj1202/blog')
      scriptElem.setAttribute('issue-term', 'pathname')
      scriptElem.setAttribute('theme', 'github-light')
      // scriptElem.setAttribute('label', '')
      scriptElem.crossOrigin = 'anonymous'
      element.appendChild(scriptElem)
    }}>
      
    </section>
  )
}

export default Utterances
