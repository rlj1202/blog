import fs from 'fs'
import path from 'path'

import { Article, ArticleContent, Category, ArticleProvider } from '.'

import {
    getNotionPage,
    getNotionDatabase,
    getNotionDatabaseQuery,
    getNotionBlockChildren,

    Database,
    Block,
    Page,

    getRichTextPlainText,

    walkBlock,
    QueryDatabaseFilter,
} from '@/lib/notion'

import { downloadImage } from '@/lib/utils'

const articlesDatabaseId: string = process.env.NOTION_DATABASE_ARTICLES_ID || ''
const categoriesDatabaseId: string = process.env.NOTION_DATABASE_CATEGORIES_ID || ''

interface ArticleContentNotion {
  type: 'notion'
  blocks: Block[]
}

async function getArticleContentNotion(id: string): Promise<ArticleContentNotion> {
    let blocks = await getNotionBlockChildren(id)

    await walkBlock(blocks, async (block: Block) => {
        if (block.type !== 'image') return

        let image = block.image
        let imageUrl: URL

        if (image.type === 'external') {
            imageUrl = new URL(image.external.url)
        } else if (image.type === 'file') {
            imageUrl = new URL(image.file.url)
        } else {
            return
        }

        const publicDirPath = path.join(process.cwd(), 'public')

        const dirRelPath = path.join('articles', id)
        const fileRelPath = path.join(dirRelPath, `${block.id}${path.extname(imageUrl.pathname)}`)

        const dirPath = path.join(publicDirPath, dirRelPath)
        fs.mkdirSync(dirPath, { recursive: true })

        const filePath = path.join(publicDirPath, fileRelPath)

        if (image.type === 'external') {
            image.external.url = '/' + fileRelPath.split(path.sep).join('/')
        } else if (image.type === 'file') {
            image.file.url = '/' + fileRelPath.split(path.sep).join('/')
        }

        if (fs.existsSync(filePath)) return

        try {
            await downloadImage(imageUrl, filePath)
        } catch (err) {
            console.log(err)
        }
    })

    return {
        type: 'notion',
        blocks,
    }
}

async function pageToArticle(page: Page): Promise<Article | null> {
    let article: Article = {}

    if (page.properties['Title'].type == 'title') {
        article.title = getRichTextPlainText(page.properties['Title'].title)
    }
    if (page.properties['Subtitle'].type == 'rich_text') {
        article.subtitle = getRichTextPlainText(page.properties['Subtitle'].rich_text)
    }
    if (page.properties['Category'].type == 'relation') {
        let ids = page.properties['Category'].relation.map(rel => rel.id)
        if (ids.length) {
            let page = await getNotionPage(ids[0])
            if ('properties' in page) {
                if (page.properties['Slug'].type == 'rich_text') {
                    article.category = getRichTextPlainText(page.properties['Slug'].rich_text)
                }
            }
        }
    }
    if (page.properties['Tags'].type == 'multi_select') {
        article.tags = page.properties['Tags'].multi_select.map(prop => prop.name)
    }
    if (page.properties['Slug'].type == 'rich_text') {
        article.slug = getRichTextPlainText(page.properties['Slug'].rich_text)
    }
    if (page.properties['Published'].type == 'checkbox') {
        article.published = page.properties['Published'].checkbox
    }
    if (page.properties['CreatedAt'].type == 'created_time') {
        article.createdAt = new Date(page.properties['CreatedAt'].created_time)
    }
    if (page.properties['UpdatedAt'].type == 'last_edited_time') {
        article.updatedAt = new Date(page.properties['UpdatedAt'].last_edited_time)
    }
    
    // TODO:
    article.coverImg = undefined
    article.excerpt = undefined

    return article
}

async function getArticlePage(slug: string): Promise<Page | null> {
    let pages: Page[] = await getNotionDatabaseQuery(articlesDatabaseId, {
        or: [ { property: 'Slug', rich_text: { equals: slug } } ]
    })

    if (pages.length == 0) return null

    return pages[0]
}

async function getCategoryPage(slug: string): Promise<Page | null> {
    let pages: Page[] = await getNotionDatabaseQuery(categoriesDatabaseId, {
        or: [ { property: 'Slug', rich_text: { equals: slug } } ]
    })
    if (pages.length == 0) return null

    return pages[0]
}

function pageToCategory(page: Page): Category {
    let category: Category = {}

    if (page.properties['Name'].type === 'title') {
        category.name = getRichTextPlainText(page.properties['Name'].title)
    }
    if (page.properties['Slug'].type === 'rich_text') {
        category.slug = getRichTextPlainText(page.properties['Slug'].rich_text)
    }

    return category
}

const notionArticleProvider: ArticleProvider = {
    async getArticle(slug: string): Promise<Article | null> {
        let page = await getArticlePage(slug)
        if (!page) return null

        let article = await pageToArticle(page)
        return article
    },

    async getArticleContent(slug: string): Promise<ArticleContent | null> {
        let page = await getArticlePage(slug)
        if (!page) return null

        return await getArticleContentNotion(page.id)
    },

    async getArticles(): Promise<Article[]> {
        let articleList = await getNotionDatabaseQuery(articlesDatabaseId, undefined, [
            {
                property: 'CreatedAt',
                direction: 'ascending',
            }
        ])
        let articles = (await Promise.all(articleList.map(article => pageToArticle(article as Page))))
            .filter(<T>(article: T | undefined | null): article is T => article !== null && article !== undefined)
    
        return articles
    },

    async getCategory(slug: string): Promise<Category | null> {
        let page = await getCategoryPage(slug)
        if (!page) return null

        return pageToCategory(page)
    },

    async getCategories(parentSlug: string | null): Promise<Category[]> {
        let filter: QueryDatabaseFilter

        let parentPage = parentSlug ? await getCategoryPage(parentSlug) : null
        let parentPageId: string | undefined = parentPage?.id

        if (parentPageId) {
            filter = {
                and: [
                    {
                        property: 'Parent',
                        relation: {
                            contains: parentPageId,
                        },
                    }
                ]
            }
        } else {
            filter = {
                and: [
                    {
                        property: 'Parent',
                        relation: {
                            is_empty: true,
                        }
                    }
                ]
            }
        }

        let pages = await getNotionDatabaseQuery(categoriesDatabaseId, filter)
        let categories = pages.map((page) => pageToCategory(page))
 
        return categories
    },

    async getTags(): Promise<string[]> {
        let database: Database = await getNotionDatabase(articlesDatabaseId)

        if (database.properties['Tags'].type === 'multi_select') {
            return database.properties['Tags'].multi_select.options.map(option => option.name)
        }

        return []
    },
}

export type { ArticleContentNotion }
export default notionArticleProvider
