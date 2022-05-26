export interface Article {
  title?: string
  subtitle?: string
  categories?: Array<string>
  tags?: Array<string>
  published?: boolean
  slug?: string
  createdAt?: Date
  updatedAt?: Date
}

export type { ArticleNotion } from './notion'
export type { ArticleLocalMarkdown } from './markdown'

import NotionArticles, { ArticleNotion } from './notion'
import MarkdownArticles, { ArticleLocalMarkdown } from './markdown'

async function getArticles(): Promise<Array<ArticleNotion | ArticleLocalMarkdown>> {
  let notionArticles = await NotionArticles.getArticles()
  let markdownArticles = await MarkdownArticles.getArticles()
  
  return [...notionArticles, ...markdownArticles]
}

const articles = await getArticles()

const articlesTable: Record<string, ArticleNotion | ArticleLocalMarkdown> = {}

for (let article of articles) {
  if (!article.slug) continue

  articlesTable[article.slug] = article
}

const tags = Array.from(new Set(articles.flatMap(article => article.tags)))
  .filter(<T>(tag: T | null | undefined): tag is T => tag !== null && tag !== undefined)

// TODO: getCategories

export {
  articles,
  articlesTable,
  tags,
}
