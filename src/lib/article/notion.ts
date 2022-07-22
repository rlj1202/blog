import fs from 'fs'
import path from 'path'

import { Article, Category, ArticleProvider } from '.'

import {
    QueryDatabaseFilter,
    QueryDatabaseSort,

    getNotionPage,
    getNotionDatabaseQuery,
    getNotionBlockChildren,

    Block,
    Page,

    getRichTextPlainText,

    walkBlock,
} from '@/lib/notion'

import { downloadImage } from '@/lib/utils'

const articlesDatabaseId: string | undefined = process.env.NOTION_DATABASE_ARTICLES_ID
const categoriesDatabaseId: string | undefined = process.env.NOTION_DATABASE_CATEGORIES_ID

interface ArticleContentNotion {
  type: 'notion'
  blocks: Block[]
}

async function getCategoriesList(): Promise<Page[]> {
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
): Promise<Page[]> {
    if (!articlesDatabaseId) {
        throw new Error('No database id provided via environment variable')
    }

    return getNotionDatabaseQuery(articlesDatabaseId, filter, sorts)
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

    let blocks = await getNotionBlockChildren(article.id)

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

        const dirRelPath = path.join('articles', article.id)
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

    let articleNotion: Article = {
        content: {
            type: 'notion',
            blocks,
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

const notionArticleProvider: ArticleProvider = {
    async getArticle(slug: string): Promise<Article | null> {
        let articles = await getArticlesList({ or: [ { property: 'Slug', rich_text: { equals: slug } } ] })

        if (articles.length == 0) return null

        let article = await getArticleFromPage(articles[0] as Page)

        return article
    },

    async getCategories(): Promise<Category[]> {
        let categoriesList = await getCategoriesList()
 
        let categoriesIdMap: Record<string, Category> = {}
 
        categoriesList.forEach((category) => {
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
 
        let result: Array<Category> = categoriesList.map((category) => {
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
    },

    async getArticleList(): Promise<Article[]> {
        if (!articlesDatabaseId) {
            throw new Error('No database id provided via environment variable')
        }

        let filter: QueryDatabaseFilter = {
            or: [
                // {
                //     property: 'Published',
                //     checkbox: {
                //         equals: true,
                //     },
                // }
            ]
        }
        let sorts: QueryDatabaseSort = [
            {
                property: 'CreatedAt',
                direction: 'ascending',
            }
        ]

        let resp = await getNotionDatabaseQuery(articlesDatabaseId, filter, sorts)

        let results = (await Promise.all(resp.map(async (page) => {
            if (!('properties' in page)) return null

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
        }))).filter(<T>(article: T | undefined | null): article is T => article !== undefined && article !== null)

        return results
    },

    async getArticles(): Promise<Article[]> {
        let articlesList = await getArticlesList()
        let articles = await Promise.all(articlesList.map(article => getArticleFromPage(article as Page)))
    
        return articles.filter(<T>(article: T | undefined | null): article is T => article !== null && article !== undefined)
    },

    async getTags(): Promise<string[]> {
        return []
    },
}

export type { ArticleContentNotion }
export default notionArticleProvider
