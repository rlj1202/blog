import React from 'react'
import type { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'

import { Client } from '@notionhq/client'
import { ListBlockChildrenResponse, GetPageResponse, GetBlockResponse, GetPagePropertyResponse } from '@notionhq/client/build/src/api-endpoints'

// import notion from '../lib/notion'

import MathJax3 from '../components/mathjax3'

type RichTextItem = Extract<GetPagePropertyResponse, { type: 'rich_text' }>['rich_text']
type RichTextItemType = RichTextItem['type']
type ExtractRichTextItemType<R, T extends RichTextItemType> = R extends { type: T } ? R : never
type RichTextText = ExtractRichTextItemType<RichTextItem, 'text'>
type RichTextMention = ExtractRichTextItemType<RichTextItem, 'mention'>
type RichTextEquation = ExtractRichTextItemType<RichTextItem, 'equation'>

type Block = Extract<GetBlockResponse, { type: string }>
type BlockType = Block['type']
type ExtractBlockType<B, T extends BlockType> = B extends { type: T } ? B : never
type Heading1 = ExtractBlockType<Block, 'heading_1'>
type Heading2 = ExtractBlockType<Block, 'heading_2'>
type Heading3 = ExtractBlockType<Block, 'heading_3'>
type Paragraph = ExtractBlockType<Block, 'paragraph'>
type BulletedListItem = ExtractBlockType<Block, 'bulleted_list_item'>
type NumberedListItem = ExtractBlockType<Block, 'numbered_list_item'>
type Quote = ExtractBlockType<Block, 'quote'>
type Todo = ExtractBlockType<Block, 'to_do'>
type Toggle = ExtractBlockType<Block, 'toggle'>
type Template = ExtractBlockType<Block, 'template'>
type SyncedBlock = ExtractBlockType<Block, 'synced_block'>
type ChildPage = ExtractBlockType<Block, 'child_page'>
type ChildDatabase = ExtractBlockType<Block, 'child_database'>
type Equation = ExtractBlockType<Block, 'equation'>
type Code = ExtractBlockType<Block, 'code'>
type Callout = ExtractBlockType<Block, 'callout'>
type Divider = ExtractBlockType<Block, 'divider'>
type BreadCrumb = ExtractBlockType<Block, 'breadcrumb'>
type TableOfContents = ExtractBlockType<Block, 'table_of_contents'>
type ColumnList = ExtractBlockType<Block, 'column_list'>
type Column = ExtractBlockType<Block, 'column'>
type LinkToPage = ExtractBlockType<Block, 'link_to_page'>
type Table = ExtractBlockType<Block, 'table'>
type TableRow = ExtractBlockType<Block, 'table_row'>
type Embed = ExtractBlockType<Block, 'embed'>
type Bookmark = ExtractBlockType<Block, 'bookmark'>
type Image = ExtractBlockType<Block, 'image'>
type Video = ExtractBlockType<Block, 'video'>
type Pdf = ExtractBlockType<Block, 'pdf'>
type File = ExtractBlockType<Block, 'file'>
type Audio = ExtractBlockType<Block, 'audio'>
type LinkPreview = ExtractBlockType<Block, 'link_preview'>
type Unsupported = ExtractBlockType<Block, 'unsupported'>

const notion = new Client({ auth: process.env.NOTION_KEY })

const databaseId: string | undefined = process.env.NOTION_DATABASE_ID

async function getNotionPage(pageId: string): Promise<GetPageResponse> {
  let page = await notion.pages.retrieve({
    page_id: pageId
  })

  return page
}

async function getNotionBlockChildren(blockId: string): Promise<ListBlockChildrenResponse> {
  let blockChildrenResp = await notion.blocks.children.list({
    block_id: blockId
  })

  while (blockChildrenResp.has_more && blockChildrenResp.next_cursor) {
    let more_blocks = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: blockChildrenResp.next_cursor
    })

    blockChildrenResp.has_more = more_blocks.has_more
    blockChildrenResp.next_cursor = more_blocks.next_cursor

    blockChildrenResp.results.push(...more_blocks.results)
  }

  return blockChildrenResp
}

export const getStaticProps: GetStaticProps<{ blockChildrenResp?: ListBlockChildrenResponse }> = async (context) => {
  if (!databaseId) {
    console.log('no database id')
  } else {
    let pages = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          {
            property: 'Published',
            checkbox: {
              equals: true,
            },
          },
        ],
      },
      sorts: [
        {
          property: 'CreatedAt',
          direction: 'ascending',
        },
      ],
    })

    let children = await getNotionBlockChildren('9c64f54f43aa41f192419a78e8ba830c')

    return {
      props: {
        blockChildrenResp: children
      }
    }
  }

  return {
    props: {
    }
  }
}

const Callout: React.FC = ({ children }) => {
  return (
    <div className="callout">
      { children }

      <style jsx>{`
        .callout {
          padding: 1em;
          background-color: #eeeeee;
        }
      `}</style>
    </div>
  )
}

function convertRichTextItemToReact(richTextItem: RichTextItem) {
  if (richTextItem.type == 'text') {
    return <>{
      richTextItem.annotations.bold
        ? <b>{richTextItem.text.content}</b>
        : richTextItem.text.content
    }</>
  } else if (richTextItem.type == 'mention') {
    return richTextItem.plain_text
  } else if (richTextItem.type == 'equation') {
    return richTextItem.plain_text
  } else {
    return <></>
  }
}

function convertRichTextToReact(richText: RichTextItem[]) {
  return (
    <>{richText.map(item => convertRichTextItemToReact(item))}</>
  )
}

function convertToReact(block: Block) {
  if (block.type == 'paragraph') {
    return <p key={block.id}>{convertRichTextToReact(block.paragraph.rich_text)}</p>
  } else if (block.type == 'heading_1') {
    return <h1 key={block.id}>{convertRichTextToReact(block.heading_1.rich_text)}</h1>
  } else if (block.type == 'heading_2') {
    return <h2 key={block.id}>{convertRichTextToReact(block.heading_2.rich_text)}</h2>
  } else if (block.type == 'heading_3') {
    return <h3 key={block.id}>{convertRichTextToReact(block.heading_3.rich_text)}</h3>
  } else if (block.type == 'divider') {
    return <hr key={block.id} />
  } else if (block.type == 'callout') {
    return <Callout key={block.id}>{convertRichTextToReact(block.callout.rich_text)}</Callout>
  } else if (block.type == 'code') {
    return <code>{convertRichTextToReact(block.code.rich_text)}</code>
  } else if (block.type == 'equation') {
    return <div>{`$$${block.equation.expression}$$`}</div>
  } else if (block.type == 'quote') {
    return <blockquote>{convertRichTextToReact(block.quote.rich_text)}</blockquote>
  } else {
    return <div key={block.id}>{block.type}</div>
  }
}

const Test: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ blockChildrenResp }) => {
  return (
    <>
      <MathJax3 />
      <Head>
        <title>Test page</title>
      </Head>

      <div>
        {
          blockChildrenResp?.results.map(block =>
            'type' in block ? convertToReact(block) : undefined)
        }
      </div>
    </>
  )
}

export default Test
