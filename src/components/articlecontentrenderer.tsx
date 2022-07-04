import React from 'react'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import a11yDark from 'react-syntax-highlighter/dist/cjs/styles/prism/a11y-dark'

import { ArticleContent } from '@/lib/article'

import {
  Block,
  CalloutBlock,
  RichTextItem,

  getRichTextPlainText,
} from '@/lib/notion'

import Config from '@/config'

const Callout: React.FC<{ block: CalloutBlock }> = ({ block }) => {
  return (
    <div className="callout">
      <div className="">
        { block.callout.icon?.type == 'emoji' && block.callout.icon.emoji }
      </div>
      <div>
        { <NotionRichText richText={block.callout.rich_text} /> }
        { block.children && block.children.map(child => {
          if ('type' in child) {
            return <NotionBlocks key={child.id} blocks={[child]} />
          } else {
            return <></>
          }
        }) }
      </div>

      <style jsx>{`
        .callout {
          display: flex;
          flex-direction: row;
          gap: 0.5em;
        }
      `}</style>
    </div>
  )
}

const NotionRichTextItem: React.FC<{ richTextItem: RichTextItem }> = ({ richTextItem }) => {
  if (richTextItem.type == 'text') {
    let { bold, italic, underline, strikethrough, code, color } = richTextItem.annotations

    let text = <>{richTextItem.text.content}</>

    if (bold || italic || underline || strikethrough || color != 'default') {
      text = <span style={{
        ...(color != 'default' && { color: color, textDecorationColor: color }),
        ...((underline || strikethrough) && {
          textDecoration: `${underline ? 'underline' : ''} ${strikethrough ? 'line-through' : ''}`,
        }),
        ...(italic && { fontStyle: 'italic' }),
        ...(bold && { fontWeight: 'bold' }),
      }}>{text}</span>
    }

    if (code) {
      text = <code>{text}</code>
    }

    return text
  } else if (richTextItem.type == 'mention') {
    // TODO:
    if (richTextItem.mention.type === 'date') {
    }
    return <span>{richTextItem.plain_text}</span>
  } else if (richTextItem.type == 'equation') {
    return <span>{richTextItem.equation.expression}</span>
  } else {
    return <></>
  }
}

const NotionRichText: React.FC<{ richText: RichTextItem[] }> = ({ richText }) => {
  return (
    <>{richText.map((item, i) => <NotionRichTextItem key={i} richTextItem={item} />)}</>
  )
}

const NotionBlocks: React.FC<{ blocks: Block[] }> = ({ blocks }) => {
  let elements: JSX.Element[] = []

  // Make table of contents
  type Heading = { text: string, children: Heading[], element?: JSX.Element }
  let headings: Heading[][] = [[], [], [], []]
  headings[0].push({ text: 'root', children: [] })

  for (let block of blocks) {
    let text: string
    let level: number

    if (block.type === 'heading_1') {
      text = getRichTextPlainText(block.heading_1.rich_text)
      level = 1
    } else if (block.type === 'heading_2') {
      text = getRichTextPlainText(block.heading_2.rich_text)
      level = 2
    } else if (block.type === 'heading_3') {
      text = getRichTextPlainText(block.heading_3.rich_text)
      level = 3
    } else {
      continue
    }

    let upperLevel = headings[level - 1]
    let last = upperLevel.length ? upperLevel[upperLevel.length - 1] : null

    let cur: Heading = { text, children: [] }
    last?.children.push(cur)
    headings[level].push(cur)
  }

  for (let level = 3; level >= 1; level--) {
    for (let heading of headings[level]) {
      heading.element = (
        <li key={heading.text}>
          <a>{heading.text}</a>
          {heading.children.length > 0 && <ul>{heading.children.map(child => child.element)}</ul>}
        </li>
      )
    }
  }

  //
  blocks = blocks.slice()

  let curBlock: Block | undefined
  while ((curBlock = blocks.shift()) !== undefined) {
    if (curBlock.type === 'numbered_list_item') {
      let listBlocks = [curBlock]

      while (blocks.length) {
        let nextBlock = blocks[0]
        if (nextBlock.type !== curBlock.type) break

        listBlocks.push(nextBlock)
        blocks.shift()
      }

      elements.push((
        <ol key={curBlock.id}>
          {listBlocks.map(listBlock => (
            <li key={listBlock.id}>
              <NotionRichText richText={listBlock.numbered_list_item.rich_text}/>
              {listBlock.children && <NotionBlocks blocks={listBlock.children} />}
            </li>
          ))}
        </ol>
      ))
    } else if (curBlock.type === 'bulleted_list_item') {
      let listBlocks = [curBlock]

      while (blocks.length) {
        let nextBlock = blocks[0]
        if (nextBlock.type !== curBlock.type) break

        listBlocks.push(nextBlock)
        blocks.shift()
      }

      elements.push((
        <ul key={curBlock.id}>
          {listBlocks.map(listBlock => <li key={listBlock.id}><NotionRichText richText={listBlock.bulleted_list_item.rich_text}/></li>)}
        </ul>
      ))
    } else if (curBlock.type === 'paragraph') {
      elements.push((
        <p key={curBlock.id}><NotionRichText richText={curBlock.paragraph.rich_text} /></p>
      ))
    } else if (curBlock.type === 'heading_1') {
      elements.push((
        <h1 key={curBlock.id}><NotionRichText richText={curBlock.heading_1.rich_text} /></h1>
      ))
    } else if (curBlock.type === 'heading_2') {
      elements.push((
        <h2 key={curBlock.id}><NotionRichText richText={curBlock.heading_2.rich_text} /></h2>
      ))
    } else if (curBlock.type === 'heading_3') {
      elements.push((
        <h3 key={curBlock.id}><NotionRichText richText={curBlock.heading_3.rich_text} /></h3>
      ))
    } else if (curBlock.type === 'divider') {
      elements.push((
        <hr key={curBlock.id}></hr>
      ))
    } else if (curBlock.type === 'callout') {
      elements.push((
        <Callout key={curBlock.id} block={curBlock} />
      ))
    } else if (curBlock.type === 'code') {
      elements.push((
        <SyntaxHighlighter key={curBlock.id} language='cpp' style={a11yDark}>
          {curBlock.code.rich_text.map(item => item.plain_text).join(' ')}
        </SyntaxHighlighter>
      ))
    } else if (curBlock.type === 'equation') {
      elements.push((
        <div key={curBlock.id} className="equation">{`$$${curBlock.equation.expression}$$`}</div>
      ))
    } else if (curBlock.type === 'quote') {
      elements.push((
        <blockquote key={curBlock.id}>
          <NotionRichText richText={curBlock.quote.rich_text} />
          {curBlock.children && <NotionBlocks blocks={curBlock.children}/>}
        </blockquote>
      ))
    } else if (curBlock.type === 'table_of_contents') {
      elements.push((
        <>
          <h1>{Config.tableOfContents.label}</h1>
          <ul>
            {headings[0][0].children.map(child => child.element)}
          </ul>
          <hr />
        </>
      ))
    } else {
      elements.push((
        <div key={curBlock.id}>{curBlock.type}</div>
      ))
    }
  }

  return (
    <>
      {elements}
    </>
  )
}

const ArticleContentRenderer: React.FC<{ content: ArticleContent }> = ({ content }) => {
  if (content.type == 'notion') {
    let blocks = content.blockChildrenResp.results.filter((block): block is Block => 'type' in block)

    return (
      <NotionBlocks blocks={blocks} />
    )
  } else if (content.type == 'local_markdown') {
    return (
      <div dangerouslySetInnerHTML={{ __html: content.htmlContent }} />
    )
  }

  return <></>
}

export default ArticleContentRenderer
