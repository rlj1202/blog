import notionArticleProvider, { ArticleContentNotion } from './notion'
import markdownArticleProvider, { ArticleContentLocalMarkdown } from './markdown'

export type ArticleContent = ArticleContentNotion | ArticleContentLocalMarkdown

export interface ArticleProvider {
  /**  */
  getArticle(slug: string): Promise<Article | null>
  /** Get article lists, without content. */
  getArticles(): Promise<Article[]>
  getArticleContent(slug: string): Promise<ArticleContent | null>

  getCategory(slug: string): Promise<Category | null>
  getCategories(parentSlug: string | null): Promise<Category[]>

  getTags(): Promise<string[]>
}

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
}

export interface Category {
  /** Human readable name. */
  name?: string
  /** Unique id of category. */
  slug?: string
}

const articleProvider: ArticleProvider = {
  async getArticle(slug: string): Promise<Article | null> {
    let article =
      await markdownArticleProvider.getArticle(slug) ||
      await notionArticleProvider.getArticle(slug)

    return article
  },

  async getArticles(): Promise<Article[]> {
    let notionArticles = await notionArticleProvider.getArticles()
    let markdownArticles = await markdownArticleProvider.getArticles()

    let results = [...notionArticles, ...markdownArticles]

    results = results
      .sort((a, b) => (a.createdAt?.getTime() || 0) - (b.createdAt?.getTime() || 0))
      .reverse()
    
    if (process.env.NODE_ENV === 'production') {
      results = results.filter(article => article.published)
    }
 
    return results
  },

  async getArticleContent(slug: string): Promise<ArticleContent | null> {
    let content =
      await markdownArticleProvider.getArticleContent(slug) ||
      await notionArticleProvider.getArticleContent(slug)

    return content
  },

  async getCategory(slug: string): Promise<Category | null> {
    let category =
      await markdownArticleProvider.getCategory(slug) ||
      await notionArticleProvider.getCategory(slug)

    return category
  },

  async getCategories(parentSlug: string | null = null): Promise<Category[]> {
    let markdownCategories = await markdownArticleProvider.getCategories(parentSlug)
    let notionCategories = await notionArticleProvider.getCategories(parentSlug)
 
    let results: Category[] = [
      ...markdownCategories,
      ...notionCategories,
    ]
 
    return results
  },

  async getTags(): Promise<string[]> {
    let markdownTags = await markdownArticleProvider.getTags()
    let notionTags = await notionArticleProvider.getTags()

    return Array.from(new Set([ ...markdownTags, ...notionTags ]))
  },
}

export default articleProvider
