import { Client } from '@notionhq/client'
import {
    QueryDatabaseResponse,
    QueryDatabaseParameters,
    GetBlockResponse,
    GetPagePropertyResponse,
    ListBlockChildrenResponse,
    GetPageResponse,
} from '@notionhq/client/build/src/api-endpoints'

export type {
    QueryDatabaseResponse,
    QueryDatabaseParameters,
    GetBlockResponse,
    GetPagePropertyResponse,
    ListBlockChildrenResponse,
    GetPageResponse,
}

export const notion = new Client({ auth: process.env.NOTION_KEY })

export type QueryDatabaseFilter = QueryDatabaseParameters['filter']
export type QueryDatabaseSort = QueryDatabaseParameters['sorts']

export type Block = Extract<GetBlockResponse, { type: string }> & { children?: Block[] }
export type BlockType = Block['type']
export type ExtractBlockType<B, T extends BlockType> = B extends { type: T } ? B : never

export type RichTextItem = Extract<GetPagePropertyResponse, { type: 'rich_text' }>['rich_text']
export type RichTextItemType = RichTextItem['type']
export type ExtractRichTextItemType<R, T extends RichTextItemType> = R extends { type: T } ? R : never
export type RichTextText = ExtractRichTextItemType<RichTextItem, 'text'>
export type RichTextMention = ExtractRichTextItemType<RichTextItem, 'mention'>
export type RichTextEquation = ExtractRichTextItemType<RichTextItem, 'equation'>

export type Heading1Block = ExtractBlockType<Block, 'heading_1'>
export type Heading2Block = ExtractBlockType<Block, 'heading_2'>
export type Heading3Block = ExtractBlockType<Block, 'heading_3'>
export type ParagraphBlock = ExtractBlockType<Block, 'paragraph'>
export type BulletedListItemBlock = ExtractBlockType<Block, 'bulleted_list_item'>
export type NumberedListItemBlock = ExtractBlockType<Block, 'numbered_list_item'>
export type QuoteBlock = ExtractBlockType<Block, 'quote'>
export type TodoBlock = ExtractBlockType<Block, 'to_do'>
export type ToggleBlock = ExtractBlockType<Block, 'toggle'>
export type TemplateBlock = ExtractBlockType<Block, 'template'>
export type SyncedBlockBlock = ExtractBlockType<Block, 'synced_block'>
export type ChildPageBlock = ExtractBlockType<Block, 'child_page'>
export type ChildDatabaseBlock = ExtractBlockType<Block, 'child_database'>
export type EquationBlock = ExtractBlockType<Block, 'equation'>
export type CodeBlock = ExtractBlockType<Block, 'code'>
export type CalloutBlock = ExtractBlockType<Block, 'callout'>
export type DividerBlock = ExtractBlockType<Block, 'divider'>
export type BreadCrumbBlock = ExtractBlockType<Block, 'breadcrumb'>
export type TableOfContentsBlock = ExtractBlockType<Block, 'table_of_contents'>
export type ColumnListBlock = ExtractBlockType<Block, 'column_list'>
export type ColumnBlock = ExtractBlockType<Block, 'column'>
export type LinkToPageBlock = ExtractBlockType<Block, 'link_to_page'>
export type TableBlock = ExtractBlockType<Block, 'table'>
export type TableRowBlock = ExtractBlockType<Block, 'table_row'>
export type EmbedBlock = ExtractBlockType<Block, 'embed'>
export type BookmarkBlock = ExtractBlockType<Block, 'bookmark'>
export type ImageBlock = ExtractBlockType<Block, 'image'>
export type VideoBlock = ExtractBlockType<Block, 'video'>
export type PdfBlock = ExtractBlockType<Block, 'pdf'>
export type FileBlock = ExtractBlockType<Block, 'file'>
export type AudioBlock = ExtractBlockType<Block, 'audio'>
export type LinkPreviewBlock = ExtractBlockType<Block, 'link_preview'>
export type UnsupportedBlock = ExtractBlockType<Block, 'unsupported'>

/**
 * 
 * @param pageId 
 * @returns 
 */
export async function getNotionPage(pageId: string): Promise<GetPageResponse> {
  let page = await notion.pages.retrieve({
    page_id: pageId
  })

  return page
}

/**
 * 
 * @param blockId 
 * @returns 
 */
export async function getNotionBlockChildren(blockId: string): Promise<ListBlockChildrenResponse> {
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

/**
 * 
 * @param databaseId 
 * @param filter 
 * @param sorts 
 * @returns 
 */
export async function getNotionDatabaseQuery(databaseId: string, filter?: QueryDatabaseFilter, sorts?: QueryDatabaseSort): Promise<QueryDatabaseResponse> {
    let resp = await notion.databases.query({
        database_id: databaseId,
        filter, sorts,
    })

    while (resp.has_more && resp.next_cursor) {
        let more_posts = await notion.databases.query({
            database_id: databaseId,
            filter, sorts,
            start_cursor: resp.next_cursor
        })

        resp.has_more = more_posts.has_more
        resp.next_cursor = more_posts.next_cursor

        resp.results.push(...more_posts.results)
    }

    return resp
}
