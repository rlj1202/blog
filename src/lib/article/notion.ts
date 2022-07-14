import { Article, Category } from '.'

import {
    ListBlockChildrenResponse,
    QueryDatabaseResponse,

    QueryDatabaseFilter,
    QueryDatabaseSort,

    getNotionPage,
    getNotionDatabaseQuery,
    getNotionBlockChildren,

    Page,

    getRichTextPlainText,
} from '@/lib/notion'

const articlesDatabaseId: string | undefined = process.env.NOTION_DATABASE_ARTICLES_ID
const categoriesDatabaseId: string | undefined = process.env.NOTION_DATABASE_CATEGORIES_ID

interface ArticleContentNotion {
  type: 'notion'
  blockChildrenResp: ListBlockChildrenResponse
}

async function getCategoriesList(): Promise<QueryDatabaseResponse> {
    if (!categoriesDatabaseId) {
        throw new Error('No categories database id provided via environment variable')
    }

    return getNotionDatabaseQuery(categoriesDatabaseId)
}

async function getArticlesList(
    filter: QueryDatabaseFilter = {
        or: [
            // {
            //     property: 'Published',
            //     checkbox: {
            //         equals: true,
            //     },
            // }
        ]
    },
    sorts: QueryDatabaseSort = [
        {
            property: 'CreatedAt',
            direction: 'ascending',
        }
    ]
): Promise<QueryDatabaseResponse> {
    if (!articlesDatabaseId) {
        throw new Error('No database id provided via environment variable')
    }

    return getNotionDatabaseQuery(articlesDatabaseId, filter, sorts)
}

async function getCategories(): Promise<Array<Category>> {
    let categoriesList = await getCategoriesList()

    let categoriesIdMap: Record<string, Category> = {}

    categoriesList.results.forEach((category) => {
        if (!('properties' in category)) {
            return undefined
        }

        let cat: Category = {}

        if (category.properties['Name'].type == 'title') {
            let name = getRichTextPlainText(category.properties['Name'].title)
            cat.name = name
        }
        if (category.properties['Slug'].type == 'rich_text') {
            let slug = getRichTextPlainText(category.properties['Slug'].rich_text)
            cat.slug = slug
        }

        categoriesIdMap[category.id] = cat
    })

    let result: Array<Category> = categoriesList.results.map((category) => {
        if (!('properties' in category)) {
            return undefined
        }

        let cur: Category = categoriesIdMap[category.id]

        if (category.properties['Parent'].type == 'relation') {
            let ids = category.properties['Parent'].relation.map(rel => rel.id)

            if (ids.length) {
                let parent = categoriesIdMap[ids[0]]
                cur.parent = parent.slug
            }
        }

        return cur
    }).filter(<T>(cat: T | undefined | null): cat is T => cat !== undefined && cat !== null)

    return result
}

async function getArticleById(id: string): Promise<Article | null> {
    const article = await getNotionPage(id)

    if ('properties' in article) {
        return getArticleFromPage(article)
    }

    return null
}

async function getArticleFromPage(article: Page): Promise<Article | null> {
    if (!('properties' in article)) {
        return null
    }

    let blockChildrenResp = await getNotionBlockChildren(article.id)

    let articleNotion: Article = {
        content: {
            type: 'notion',
            blockChildrenResp,
        },
    }

    if (article.properties['Title'].type == 'title') {
        articleNotion.title = getRichTextPlainText(article.properties['Title'].title)
    }
    if (article.properties['Subtitle'].type == 'rich_text') {
        articleNotion.subtitle = getRichTextPlainText(article.properties['Subtitle'].rich_text)
    }
    if (article.properties['Category'].type == 'relation') {
        let ids = article.properties['Category'].relation.map(rel => rel.id)
        if (ids.length) {
            let page = await getNotionPage(ids[0])
            if ('properties' in page) {
                if (page.properties['Slug'].type == 'rich_text') {
                    articleNotion.category = getRichTextPlainText(page.properties['Slug'].rich_text)
                }
            }
        }
    }
    if (article.properties['Tags'].type == 'multi_select') {
        articleNotion.tags = article.properties['Tags'].multi_select.map(prop => prop.name)
    }
    if (article.properties['Slug'].type == 'rich_text') {
        articleNotion.slug = getRichTextPlainText(article.properties['Slug'].rich_text)
    }
    if (article.properties['Published'].type == 'checkbox') {
        articleNotion.published = article.properties['Published'].checkbox
    }
    if (article.properties['CreatedAt'].type == 'created_time') {
        articleNotion.createdAt = new Date(article.properties['CreatedAt'].created_time)
    }
    if (article.properties['UpdatedAt'].type == 'last_edited_time') {
        articleNotion.updatedAt = new Date(article.properties['UpdatedAt'].last_edited_time)
    }
    
    // TODO:
    articleNotion.coverImg = undefined
    articleNotion.excerpt = undefined

    return articleNotion
}

async function getArticle(slug: string): Promise<Article | null> {
    let articles = await getArticlesList({ or: [ { property: 'Slug', rich_text: { equals: slug } } ] })

    if (articles.results.length == 0) return null

    let article = await getArticleFromPage(articles.results[0] as Page)

    return article
}

async function getArticles(): Promise<Array<Article>> {
    let articlesList = await getArticlesList()

    let articles = await Promise.all(articlesList.results.map(article => getArticleFromPage(article as Page)))
    
    return articles.filter(<T>(article: T | undefined | null): article is T => article !== null && article !== undefined)
}

export type { ArticleContentNotion }

const NotionArticles = {
    getArticleById,
    getArticleFromPage,
    getArticle,
    getArticles,
    getCategories,
}

export default NotionArticles
