import React from 'react'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import a11yDark from 'react-syntax-highlighter/dist/cjs/styles/prism/a11y-dark'

import { ArticleContent } from '../lib/article'

import {
  Block,
  CalloutBlock,
  RichTextItem,
} from '../lib/notion'

import styles from '../styles/Post.module.css'

const Callout: React.FC<{ block: CalloutBlock }> = ({ block }) => {
  return (
    <div className={`${styles.callout} callout`}>
      <div className="">
        { block.callout.icon?.type == 'emoji' && block.callout.icon.emoji }
      </div>
      <div>
        { <NotionRichText richText={block.callout.rich_text} /> }
        { block.has_children && block.children?.map(child => {
          if ('type' in child) {
            return <NotionBlock key={child.id} block={child} />
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
    return <>{
      richTextItem.annotations.bold
        ? <b>{richTextItem.text.content}</b>
        : richTextItem.text.content
    }</>
  } else if (richTextItem.type == 'mention') {
    return <>{richTextItem.plain_text}</>
  } else if (richTextItem.type == 'equation') {
    return <>{richTextItem.plain_text}</>
  } else {
    return <></>
  }
}

const NotionRichText: React.FC<{ richText: RichTextItem[] }> = ({ richText }) => {
  return (
    <>{richText.map((item, i) => <NotionRichTextItem key={i} richTextItem={item} />)}</>
  )
}

const NotionBlock: React.FC<{ block: Block }> = ({ block }) => {
  if (block.type == 'paragraph') {
    return <p><NotionRichText richText={block.paragraph.rich_text} /></p>
  } else if (block.type == 'heading_1') {
    return <h1><NotionRichText richText={block.heading_1.rich_text} /></h1>
  } else if (block.type == 'heading_2') {
    return <h2><NotionRichText richText={block.heading_2.rich_text} /></h2>
  } else if (block.type == 'heading_3') {
    return <h3><NotionRichText richText={block.heading_3.rich_text} /></h3>
  } else if (block.type == 'divider') {
    return <hr />
  } else if (block.type == 'callout') {
    return <Callout block={block} />
  } else if (block.type == 'code') {
    return (
      <SyntaxHighlighter language='cpp' style={a11yDark}>
        {block.code.rich_text.map(item => item.plain_text).join(' ')}
      </SyntaxHighlighter>
    )
  } else if (block.type == 'equation') {
    return <div className={styles.equation}>{`$$${block.equation.expression}$$`}</div>
  } else if (block.type == 'quote') {
    return <blockquote><NotionRichText richText={block.quote.rich_text} /></blockquote>
  } else if (block.type == 'numbered_list_item') {
    return <ol><li><NotionRichText richText={block.numbered_list_item.rich_text} /></li></ol>
  } else if (block.type == 'bulleted_list_item') {
    return <ul><li><NotionRichText richText={block.bulleted_list_item.rich_text} /></li></ul>
  } else {
    return <div>{block.type}</div>
  }
}

const ArticleContentRenderer: React.FC<{ content: ArticleContent }> = ({ content }) => {
  if (content.type == 'notion') {
    return (
      <>
        {
          content.blockChildrenResp.results.map(block => {
            if ('type' in block) {
              return <NotionBlock key={block.id} block={block} />
            } else {
              return <></>
            }
          })
        }
      </>
    )
  } else if (content.type == 'local_markdown') {
    return (
      <div dangerouslySetInnerHTML={{ __html: content.htmlContent }} />
    )
  } else {
    return (
      <></>
    )
  }
}

export default ArticleContentRenderer
