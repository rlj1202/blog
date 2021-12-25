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

import Config from '../config'

const postsPath = path.join(process.cwd(), Config.postsDir)

// frontmatter
export interface PostMetadata {
    title?: string
    subtitle?: string
    author?: string
    date?: Date
    categories?: string | string[]
    tags?: string[]
    imgs?: string[]
    excerpt?: string
    published?: boolean
}

export interface Post {
    postPath: string[]
    content: string
    metadata: PostMetadata
    url: string
}

/**
 * Get all post paths.
 * @returns 
 */
export async function getPostPaths(): Promise<string[][]> {
    return new Promise<string[]>((resolve, reject) => {
            glob("**/*.md", { cwd: postsPath }, (err, matches) => {
                if (err) reject(err)
                else resolve(matches)
            })
        })
        .then(paths => paths.map(path => path.replace(/\.md$/, '')))
        .then(paths => paths.map(path => path.split('/')))
}

/**
 * Get post url from post path.
 * @param postPath 
 * @returns 
 */
export function getPostUrl(postPath: string[]): string {
    return `/articles/${postPath.join('/')}`
}

/**
 * Get post from post path.
 * @param postPath 
 * @returns Post object contains metadata(a.k.a frontmatter) and actual html content.
 */
export async function getPost(postPath: string[]): Promise<Post> {
    var postFilePath = path.join(postsPath, `${postPath.join('/')}.md`)

    return fs.promises
        .readFile(postFilePath, { encoding: 'utf-8' })
        .then((raw) => {
            let { content, data } = matter(raw)

            var metadata: PostMetadata = data as PostMetadata

            if (typeof metadata.date == 'string') {
                metadata.date = new Date(Date.parse(data.date as string))
            }
            if (typeof metadata.tags == 'string') {
                metadata.tags = [data.tags]
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
            metadata.imgs = imgs

            metadata.excerpt = content.slice(0, 1000)
            metadata.published ??= true

            var result = unified()
                .use(rehypeStringify, { allowDangerousHtml: true })
                .stringify(hast)

            return {
                postPath,
                content: String(result),
                metadata,
                url: getPostUrl(postPath)
            }
        })
}

/**
 * 
 * @param options
 * @returns 
 */
export async function getPosts({
    sortFn = (a, b) => -((a.metadata.date?.getTime() || 0) - (b.metadata.date?.getTime() || 0)),
    offset = 0,
    limit,
    tag,
    onlyPublished = process.env.NODE_ENV == 'production' || false,
}: {
    /** Uses date to sort by default. */
    sortFn?: (a: Post, b: Post) => number,
    /** 0 is default value */
    offset?: number,
    /** Number of posts which will be returned. Returns remaining all posts if not specified. */
    limit?: number,
    tag?: string,
    onlyPublished?: boolean,
} = {}): Promise<{
    posts: Post[],
    /** Total number of posts. */
    total: number,
}> {
    return getPostPaths()
        .then(postPaths => Promise.all(postPaths.map(postPath => getPost(postPath))))
        .then(posts => posts.sort(sortFn))
        .then(posts => tag ? posts.filter(post => post.metadata.tags?.includes(tag)) : posts)
        .then(posts => onlyPublished ? posts.filter(post => post.metadata.published) : posts)
        .then(posts => {
            return {
                posts: limit ? posts.slice(offset, offset + limit) : posts,
                total: posts.length
            }
        })
}

/**
 * 
 * @returns 
 */
export async function getCategoryPaths(): Promise<string[][]> {
    return getPostPaths()
        .then(postPaths => Array
            .from(new Set(postPaths.map(postPath => postPath.slice(0, -1).join('/'))))
            .map(str => str.split('/'))
        )
}

/**
 * 
 * @returns 
 */
export async function getTags(): Promise<string[]> {
    return getPosts().then(({ posts }) => {
        let tags: string[] = []

        posts.forEach(post => {
            if (typeof post.metadata.tags == 'string') {
                tags.push(post.metadata.tags)
            } else if (typeof post.metadata.tags == 'object') {
                tags.push(...post.metadata.tags)
            }
        })

        return Array.from(new Set(tags))
    })
}