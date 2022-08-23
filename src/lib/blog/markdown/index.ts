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

import Config from '@/config'

import { Article, Category, BlogProvider } from '../types'

const articlesPath = path.join(process.cwd(), Config.articles.directory)

interface ArticleFrontmatter {
    title?: string
    subtitle?: string
    author?: string
    date?: Date
    /** @deprecated */
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

async function getArticleFromPath(postPath: string): Promise<Article | null> {
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
                categorySlug: metadata.category,
                tags: metadata.tags,
                published: metadata.published,
                slug: postPath.split('/').reverse()[0],
                createdAt: metadata.date,
                updatedAt: metadata.date,

                coverImgUrl: imgs && imgs.length ? imgs[0] : undefined,

                htmlContent
            }

            return article
        }).catch(err => {
            return null
        })
}

class MarkdownBlogProvider implements BlogProvider {
    async getArticle(slug: string): Promise<Article | null> {
        const path = await findPath(slug)

        if (!path) {
            return null
        }

        const article = await getArticleFromPath(path)

        if (!article) {
            return null
        }

        return article
    }

    async getCategory(slug: string): Promise<Category | null> {
        // TODO:
        return null
    }

    async getArticles(): Promise<Article[]> {
        const articles = await getArticlesPaths()
            .then(paths => Promise.all(paths.map(path => getArticleFromPath(path))))
            .then(articles =>
                articles.filter(<T>(article: T | undefined | null): article is T =>
                    article !== null && article !== undefined)
            )
        return articles
    }

    async getCategories(parentSlug: string | null = null): Promise<Category[]> {
        // TODO:
        return []
    }
}

export default new MarkdownBlogProvider()
