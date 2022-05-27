import NotionArticles, { ArticleContentNotion } from './notion'
import MarkdownArticles, { ArticleContentLocalMarkdown } from './markdown'

export type ArticleContent = ArticleContentNotion | ArticleContentLocalMarkdown

export interface Article {
  title?: string
  subtitle?: string
  categories?: Array<string>
  tags?: Array<string>
  published?: boolean
  slug?: string
  createdAt?: Date
  updatedAt?: Date

  content: ArticleContent
}

async function getArticles(): Promise<Array<Article>> {
  let notionArticles = await NotionArticles.getArticles()
  let markdownArticles = await MarkdownArticles.getArticles()
  
  return [...notionArticles, ...markdownArticles]
}

const articles = await getArticles()

const articlesTable: Record<string, Article> = {}

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
