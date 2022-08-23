import fs from 'fs'
import path from 'path'

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

import { Article, Category, BlogProvider } from '../types'
import { renderNotionBlocks } from './utils'

const articlesDatabaseId: string = process.env.NOTION_DATABASE_ARTICLES_ID || ''
const categoriesDatabaseId: string = process.env.NOTION_DATABASE_CATEGORIES_ID || ''

/**
 * 
 */
async function downloadImageAsset(url: URL, dirName: string, fileName: string): Promise<string> {
    const publicDirPath = path.join(process.cwd(), 'public')

    const dirRelPath = path.join('articles', dirName)
    const fileRelPath = path.join(dirRelPath, `${fileName}${path.extname(url.pathname)}`)

    const dirPath = path.join(publicDirPath, dirRelPath)
    fs.mkdirSync(dirPath, { recursive: true })

    const filePath = path.join(publicDirPath, fileRelPath)

    const relPath = '/' + fileRelPath.split(path.sep).join('/')

    if (fs.existsSync(filePath)) return relPath

    await downloadImage(url, filePath)

    return relPath
}

async function getArticleContentNotion(id: string): Promise<Block[]> {
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

        try {
            let assetPath = await downloadImageAsset(imageUrl, id, block.id)
     
            if (image.type === 'external') {
                image.external.url = assetPath
            } else if (image.type === 'file') {
                image.file.url = assetPath
            }
        } catch (err) {
            console.log(err)
        }
    })

    return blocks
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
                    article.categorySlug = getRichTextPlainText(page.properties['Slug'].rich_text)
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

    let coverUrl: string | null = null
    if (page.cover) {
        if (page.cover.type === 'external') {
            coverUrl = page.cover.external.url
        } else if (page.cover.type === 'file') {
            coverUrl = page.cover.file.url
        }
    }

    if (coverUrl) {
        try {
            let assetPath = await downloadImageAsset(new URL(coverUrl), page.id, "cover")

            article.coverImgUrl = assetPath
        } catch (err) {
            console.log(err)
        }
    }

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
    if (slug.trim() == "") return null

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

class NotionBlogProvider implements BlogProvider {
    async getArticle(slug: string): Promise<Article | null> {
        const page = await getArticlePage(slug)
        if (!page) return null

        const article = await pageToArticle(page)
        if (!article) return null

        const blocks = await getArticleContentNotion(page.id)
        const htmlContent = renderNotionBlocks(blocks)

        article.htmlContent = htmlContent

        return article
    }

    async getCategory(slug: string): Promise<Category | null> {
        const page = await getCategoryPage(slug)
        if (!page) return null

        const category = pageToCategory(page)

        return category
    }

    async getArticles(): Promise<Article[]> {
        const articleList = await getNotionDatabaseQuery(articlesDatabaseId)

        const articles = (
            await Promise.all(articleList.map(async page => {
                const article = await pageToArticle(page)
                if (!article) return null

                const blocks = await getArticleContentNotion(page.id)
                const htmlContent = renderNotionBlocks(blocks)

                article.htmlContent = htmlContent

                return article
            }))
        )
        .filter(<T>(article: T | undefined | null): article is T => article !== null && article !== undefined)

        return articles
    }

    async getCategories(parentSlug: string | null = null): Promise<Category[]> {
        let filter: QueryDatabaseFilter

        const parentPage = parentSlug ? await getCategoryPage(parentSlug) : null
        const parentPageId: string | undefined = parentPage?.id

        if (parentPageId) {
            filter = {
                and: [
                    {
                        property: 'Parent',
                        relation: {
                            contains: parentPageId,
                        },
                    },
                    {
                        property: 'Slug',
                        rich_text: {
                            is_not_empty: true,
                        }
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
                    },
                    {
                        property: 'Slug',
                        rich_text: {
                            is_not_empty: true,
                        }
                    }
                ]
            }
        }

        const pages = await getNotionDatabaseQuery(categoriesDatabaseId, filter)
        const categories = pages.map((page) => pageToCategory(page))
 
        return categories
    }
}

export default new NotionBlogProvider()
