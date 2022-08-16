import fs from 'fs'
import path from 'path'
import glob from 'glob'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'
import rehypeStringify from 'rehype-stringify'
import matter from 'gray-matter'
import { visit } from 'unist-util-visit'
import { Heading, Text, ThematicBreak } from 'mdast'
import { toc } from 'mdast-util-toc'

import { Article, ArticleContent, Category, ArticleProvider } from '.'

import Config from '@/config'

const articlesPath = path.join(process.cwd(), Config.articles.directory)

interface ArticleContentLocalMarkdown {
  type: 'local_markdown'
  htmlContent: string
}

interface ArticleFrontmatter {
    title?: string
    subtitle?: string
    author?: string
    date?: Date
    category?: string
    /** @deprecated */
    categories?: string[]
    tags?: string[]
    published?: boolean
}

async function findPath(slug: string): Promise<string | null> {
    let paths = await new Promise<string[]>((resolve, reject) => {
        glob(`**/${slug}.md`, { cwd: articlesPath }, (err, matches) => {
            if (err) reject(err)
            else resolve(matches)
        })
    })
 
    if (paths.length == 0) return null

    return paths[0].replace(/\.md$/, '')
}

async function getArticlesPaths(): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
            glob("**/*.md", { cwd: articlesPath }, (err, matches) => {
                if (err) reject(err)
                else resolve(matches)
            })
        })
        .then(paths => paths.map(path => path.replace(/\.md$/, '')))
}

async function getArticleFromPath(postPath: string): Promise<[Article, ArticleContent] | null> {
    var postFilePath = path.join(articlesPath, `${postPath}.md`)

    return fs.promises
        .readFile(postFilePath, { encoding: 'utf-8' })
        .then((raw) => {
            let { content, data } = matter(raw)

            var metadata: ArticleFrontmatter = data as ArticleFrontmatter

            if (typeof metadata.date === 'string') {
                metadata.date = new Date(Date.parse(data.date as string))
            }
            if (typeof metadata.tags === 'string') {
                metadata.tags = [data.tags]
            }
            if (typeof metadata.categories === 'string') {
                metadata.categories = [metadata.categories]
            }

            metadata.published ??= true

            var mdast = unified()
                .use(remarkParse)
                .use(remarkGfm) // NOTE: tables are not standard. WOW
                .parse(content)

            /* Table of contents */
            const tocResult = toc(mdast)
            if (tocResult && tocResult.map) {
                mdast.children.unshift(<ThematicBreak>{ type: 'thematicBreak' })
                mdast.children.unshift(tocResult.map)
                mdast.children.unshift(<Heading>{
                    type: 'heading',
                    depth: 1,
                    children: [
                        <Text>{
                            type: 'text',
                            value: Config.tableOfContents.label,
                        },
                    ],
                })
            }

            var hast = unified()
                .use(remarkRehype, { allowDangerousHtml: true })
                .use(rehypeRaw)
                .use(rehypeHighlight)
                .use(rehypeSlug)
                .use(rehypeAutolinkHeadings)
                .runSync(mdast)

            var imgs: string[] = []
            visit(hast, { type: 'element', tagName: 'img' }, (node) => {
                if (node.properties) {
                    imgs.push(node.properties.src as string)
                }
            })

            var htmlContent = unified()
                .use(rehypeStringify, { allowDangerousHtml: true })
                .stringify(hast)

            let article: Article = {
                title: metadata.title,
                subtitle: metadata.subtitle,
                category: metadata.category,
                tags: metadata.tags,
                published: metadata.published,
                slug: postPath.split('/').reverse()[0],
                createdAt: metadata.date,
                updatedAt: metadata.date,

                coverImg: imgs && imgs.length ? imgs[0] : undefined,
            }

            let articleContent: ArticleContent = {
                type: 'local_markdown',
                htmlContent,
            }

            let result: [Article, ArticleContent] = [ article, articleContent ]

            return result
        }).catch(err => {
            return null
        })
}

const markdownArticleProvider: ArticleProvider = {
    async getArticle(slug: string): Promise<Article | null> {
        let path = await findPath(slug)
        if (!path) return null
 
        let articleAndContent = await getArticleFromPath(path)

        if (articleAndContent) {
            let [article, content] = articleAndContent

            return article
        }
 
        return null
    },

    async getArticles(): Promise<Article[]> {
        return getArticlesPaths()
            .then(paths => Promise.all(paths.map(path => getArticleFromPath(path))))
            .then(articleAndContents => articleAndContents
                .filter(<T>(articleAndContent: T | undefined | null): articleAndContent is T => articleAndContent !== undefined && articleAndContent !== null))
            .then(articles => articles.map(([article, content]) => article))
    },

    async getArticleContent(slug: string): Promise<ArticleContent | null> {
        let path = await findPath(slug)
        if (!path) return null
 
        let articleAndContent = await getArticleFromPath(path)

        if (articleAndContent) {
            let [article, content] = articleAndContent

            return content
        }
 
        return null
    },

    async getCategory(slug: string): Promise<Category | null> {
        // TODO:
        return null
    },

    async getCategories(parentSlug: string | null): Promise<Category[]> {
        // TODO:
        return []
    },

    async getTags(): Promise<string[]> {
        let articles = await this.getArticles()
        return Array.from(new Set(articles.flatMap(article => article.tags || [])))
    },
}

export type { ArticleContentLocalMarkdown }
export default markdownArticleProvider
