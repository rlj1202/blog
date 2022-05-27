import { Article } from '.'

import {
    ListBlockChildrenResponse,
    QueryDatabaseResponse,
    QueryDatabaseFilter,
    QueryDatabaseSort,

    getNotionDatabaseQuery,
    getNotionBlockChildren,

    RichTextItem,
} from '../notion'

// TODO:
const articlesDatabaseId: string | undefined = process.env.NOTION_DATABASE_ID

interface ArticleContentNotion {
  type: 'notion'
  blockChildrenResp: ListBlockChildrenResponse
}

async function getArticlesList(): Promise<QueryDatabaseResponse> {
    if (!articlesDatabaseId) {
        throw new Error('No database id provided via environment variable')
    }

    let filter: QueryDatabaseFilter = {
        or: [
            {
                property: 'Published',
                checkbox: {
                    equals: true,
                },
            },
        ],
    }

    let sorts: QueryDatabaseSort = [
        {
            property: 'CreatedAt',
            direction: 'ascending',
        },
    ]

    return getNotionDatabaseQuery(articlesDatabaseId, filter, sorts)
}

function getPlainText(richText: RichTextItem[]): string {
    return richText.map(richTextItem => richTextItem.plain_text).join(' ')
}

async function getArticles(): Promise<Array<Article>> {
    let articlesList = await getArticlesList()

    let articles = (await Promise.all(articlesList.results.map(async (article) => {
        if (!('properties' in article)) {
            return undefined
        }

        let blockChildrenResp = await getNotionBlockChildren(article.id)

        let articleNotion: Article = {
            content: {
                type: 'notion',
                blockChildrenResp,
            },
        }

        if (article.properties['Title'].type == 'title') {
            articleNotion.title = getPlainText(article.properties['Title'].title)
        }
        if (article.properties['Subtitle'].type == 'rich_text') {
            articleNotion.subtitle = getPlainText(article.properties['Subtitle'].rich_text)
        }
        // TODO: categories
        if (article.properties['Tags'].type == 'multi_select') {
            articleNotion.tags = article.properties['Tags'].multi_select.map(prop => prop.name)
        }
        if (article.properties['Slug'].type == 'rich_text') {
            articleNotion.slug = getPlainText(article.properties['Slug'].rich_text)
        }
        if (article.properties['Published'].type == 'checkbox') {
            articleNotion.published = article.properties['Published'].checkbox
        }
        if (article.properties['CreatedAt'].type == 'date' &&
            article.properties['CreatedAt'].date?.start) {
            articleNotion.createdAt = new Date(article.properties['CreatedAt'].date?.start)
        }
        if (article.properties['UpdatedAt'].type == 'date' &&
            article.properties['UpdatedAt'].date?.start) {
            articleNotion.createdAt = new Date(article.properties['UpdatedAt'].date?.start)
        }

        return articleNotion
    }))).filter(<T>(article: T | undefined | null): article is T => article !== null && article !== undefined)

    return articles
}

export { articlesDatabaseId }
export type { ArticleContentNotion }

export default { getArticles }
