import ReactDOMServer from 'react-dom/server'

import { Block } from '@/lib/notion'

import NotionBlocks from './notionblocks'

export function renderNotionBlocks(blocks: Block[]): string {
    const htmlContent: string = ReactDOMServer.renderToStaticMarkup(
        <NotionBlocks blocks={blocks} />
    )

    return htmlContent
}
