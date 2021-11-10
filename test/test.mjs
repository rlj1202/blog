import assert from 'assert'

import util from 'util'

import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeHighlight from 'rehype-highlight'
import { visit } from 'unist-util-visit'

describe('unified', () => {
    var markdown = `
# test
            
<center><img src="test.png" /></center>
    `

    var mdast = unified()
        .use(remarkParse)
        .use(remarkGfm)
        .parse(markdown)
    
    var hast = unified()
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeRaw)
        .use(rehypeHighlight)
        .runSync(mdast)

    visit(hast, { type: 'element', tagName: 'img' }, (node) => {
        console.log(node)
    })

    assert.equal(1, 1)
})
