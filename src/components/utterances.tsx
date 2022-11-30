import Config from '@/config';

/**
 * ```
 * <script
 *   src="https://utteranc.es/client.js"
 *   repo="rlj1202/blog"
 *   issue-term="pathname"
 *   theme="github-light"
 *   crossorigin="anonymous"
 *   async>
 * </script>
 * ```
 *
 * # References
 * - https://utteranc.es/
 * - https://cheese10yun.github.io/utterances/
 */
const Utterances: React.FC = () => {
  return (
    <section
      ref={(element) => {
        if (!element) {
          return;
        }

        const scriptElem = document.createElement('script');
        scriptElem.src = 'https://utteranc.es/client.js';
        scriptElem.async = true;
        scriptElem.crossOrigin = 'anonymous';
        scriptElem.setAttribute('repo', Config.utterances.repo);
        scriptElem.setAttribute('issue-term', Config.utterances.issueTerm);
        scriptElem.setAttribute('theme', Config.utterances.theme);
        scriptElem.setAttribute('label', Config.utterances.label);
        element.replaceChildren(scriptElem);
      }}
    ></section>
  );
};

export default Utterances;
