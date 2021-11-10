import fs from 'fs'
import path from 'path'
import glob from 'glob'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeHighlight from 'rehype-highlight'
import rehypeStringify from 'rehype-stringify'
import matter from 'gray-matter'
import { visit } from 'unist-util-visit'

const postsPath = path.join(process.cwd(), 'posts')

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
}

export interface Post {
    postPath: string[]
    content: string
    metadata: PostMetadata
}

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

export async function getPost(postPath: string[]): Promise<Post> {
    return fs.promises
        .readFile(`./posts/${postPath.join('/')}.md`, { encoding: 'utf-8' })
        .then((raw) => {
            let { content, data } = matter(raw)

            if (typeof (data as PostMetadata).date == 'string') {
                (data as PostMetadata).date = new Date(Date.parse(data.date as string))
            }
            if (typeof (data as PostMetadata).tags == 'string') {
                (data as PostMetadata).tags = [data.tags]
            }

            var mdast = unified()
                .use(remarkParse)
                .use(remarkGfm) // NOTE: tables are not standard. WOW
                .parse(content)

            var hast = unified()
                .use(remarkRehype, { allowDangerousHtml: true })
                .use(rehypeRaw)
                .use(rehypeHighlight)
                .runSync(mdast)

            var imgs: string[] = []
            visit(hast, { type: 'element', tagName: 'img' }, (node) => {
                if (node.properties) {
                    imgs.push(node.properties.src as string)
                }
            })
            data.imgs = imgs
            data.excerpt = content.slice(0, 1000)

            var result = unified()
                .use(rehypeStringify, { allowDangerousHtml: true })
                .stringify(hast)

            return {
                postPath,
                content: String(result),
                metadata: data as PostMetadata
            }
        })
}

export async function getPosts(): Promise<Post[]> {
    return getPostPaths()
        .then(postPaths => {
            return Promise.all(postPaths.map(postPath => getPost(postPath)))
        })
}

export async function getCategoryPaths(): Promise<string[][]> {
    return getPostPaths()
        .then(postPaths => Array
            .from(new Set(postPaths.map(postPath => postPath.slice(0, -1).join('/'))))
            .map(str => str.split('/'))
        )
}

export async function getTags(): Promise<string[]> {
    return getPosts().then(posts => {
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

export async function getPage(page: number, perPage: number): Promise<Post[]> {
    return getPosts()
        .then(posts => {
            var start = page * perPage
            
            return posts.slice(start, start + perPage)
        })
}
