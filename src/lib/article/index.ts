import NotionArticles, { ArticleContentNotion } from './notion'
import MarkdownArticles, { ArticleContentLocalMarkdown } from './markdown'

export type ArticleContent = ArticleContentNotion | ArticleContentLocalMarkdown

export interface Article {
  title?: string
  subtitle?: string
  category?: string
  tags?: Array<string>
  published?: boolean
  slug?: string
  createdAt?: Date
  updatedAt?: Date

  coverImg?: string
  excerpt?: string

  content: ArticleContent
}

export interface Category {
  name?: string
  slug?: string
  parent?: string
}

export interface CategoryTree {
  category: Category
  children?: Array<CategoryTree>
}

async function getArticle(slug: string): Promise<Article | null> {
  let article =
    await MarkdownArticles.getArticle(slug) ||
    await NotionArticles.getArticle(slug)

  return article
}

async function getCategories(): Promise<Array<Category>> {
  let notionCategories = await NotionArticles.getCategories()

  let results: Category[] = [ ...notionCategories ]

  return results
}

async function getArticles(): Promise<Array<Article>> {
  let notionArticles = await NotionArticles.getArticles()
  let markdownArticles = await MarkdownArticles.getArticles()

  let results = [...notionArticles, ...markdownArticles]

  results = results
    .sort((a, b) => (a.createdAt?.getTime() || 0) - (b.createdAt?.getTime() || 0))
    .reverse()
  
  if (process.env.NODE_ENV === 'production') {
    results = results.filter(article => article.published)
  }

  return results
}

const articles = await getArticles()
const categories = await getCategories()

const articlesTable: Record<string, Article> = {}
const categoriesTable: Record<string, Category> = {}

for (let article of articles) {
  if (!article.slug) continue

  articlesTable[article.slug] = article
}

for (let category of categories) {
  if (!category.slug) continue

  categoriesTable[category.slug] = category
}

const categoryTreeTable: Record<string, CategoryTree> = {}
const categoryTree: Array<CategoryTree> = []

for (let category of categories) {
  if (!category.slug) continue

  categoryTreeTable[category.slug] = { category, children: [] }
}
for (let category of categories) {
  if (!category.slug) continue;

  let cur = categoryTreeTable[category.slug]

  if (category.parent) {
    let parent = categoryTreeTable[category.parent]
    parent.children?.push(cur)
  } else {
    categoryTree.push(cur)
  }
}

const tags = Array.from(new Set(articles.flatMap(article => article.tags)))
  .filter(<T>(tag: T | null | undefined): tag is T => tag !== null && tag !== undefined)

export {
  articles,
  articlesTable,

  categories,
  categoriesTable,
  categoryTree,
  categoryTreeTable,

  tags,

  getArticle,
}
