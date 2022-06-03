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

import { Article } from '.'

import Config from '@/config'

const postsPath = path.join(process.cwd(), Config.postsDir)

interface ArticleContentLocalMarkdown {
  type: 'local_markdown'
  htmlContent: string
}

interface ArticleFrontmatter {
    title?: string
    subtitle?: string
    author?: string
    date?: Date
    categories?: string[]
    tags?: string[]
    published?: boolean
}

async function getArticlesPaths(): Promise<string[][]> {
    return new Promise<string[]>((resolve, reject) => {
            glob("**/*.md", { cwd: postsPath }, (err, matches) => {
                if (err) reject(err)
                else resolve(matches)
            })
        })
        .then(paths => paths.map(path => path.replace(/\.md$/, '')))
        .then(paths => paths.map(path => path.split('/')))
}

async function getArticle(postPath: string[]): Promise<Article> {
    var postFilePath = path.join(postsPath, `${postPath.join('/')}.md`)

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

            metadata.published ??= true

            var htmlContent = unified()
                .use(rehypeStringify, { allowDangerousHtml: true })
                .stringify(hast)

            // return {
                // postPath,
                // url: getPostUrl(postPath)
            // }

            let articleMarkdown: Article = {
                title: metadata.title,
                subtitle: metadata.subtitle,
                category: metadata.categories,
                tags: metadata.tags,
                published: metadata.published,
                slug: postPath[postPath.length - 1],
                createdAt: metadata.date,
                updatedAt: metadata.date,

                coverImg: imgs && imgs.length ? imgs[0] : undefined,
                excerpt: content.slice(0, 1000),

                content: {
                    type: 'local_markdown',
                    htmlContent,
                },
            }

            return articleMarkdown
        })
}

async function getArticles(): Promise<Array<Article>> {
    return getArticlesPaths()
        .then(paths => Promise.all(paths.map(path => getArticle(path))))
}

export type { ArticleContentLocalMarkdown }

const MarkdownArticles = {
    getArticles
}

export default MarkdownArticles
