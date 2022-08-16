import notionArticleProvider, { ArticleContentNotion } from './notion'
import markdownArticleProvider, { ArticleContentLocalMarkdown } from './markdown'

import Config from '@/config'

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
  /** Slug of category */
  category?: string
  tags?: Array<string>
  published?: boolean
  slug?: string
  createdAt?: Date
  updatedAt?: Date

  coverImg?: string
  /** @deprecated */
  excerpt?: string
}

export interface Category {
  /** Human readable name. */
  name?: string
  /** Unique id of category. */
  slug?: string
}

class ArticleProviderImpl implements ArticleProvider {
  articleCache: Record<string, Article> = {}
  contentCache: Record<string, ArticleContent> = {}
  categoryCache: Record<string, Category> = {}
  categoryChildrenCache: Record<string, Category[]> = {}

  articlesCache: Article[] | null = null
  tagsCache: string[] | null = null

  constructor() {
  }

  async getArticle(slug: string): Promise<Article | null> {
    if (Config.articles.caching && this.articleCache[slug]) {
      return this.articleCache[slug]
    }

    let article =
      await markdownArticleProvider.getArticle(slug) ||
      await notionArticleProvider.getArticle(slug)

    if (Config.articles.caching && article) {
      this.articleCache[slug] = article
    }

    return article
  }

  async getArticles(): Promise<Article[]> {
    if (Config.articles.caching && this.articlesCache) {
      return this.articlesCache
    }

    let notionArticles = await notionArticleProvider.getArticles()
    let markdownArticles = await markdownArticleProvider.getArticles()

    let results = [...notionArticles, ...markdownArticles]

    results = results
      .sort((a, b) => (a.createdAt?.getTime() || 0) - (b.createdAt?.getTime() || 0))
      .reverse()
    
    if (process.env.NODE_ENV === 'production') {
      results = results.filter(article => article.published)
    }

    if (Config.articles.caching) {
      this.articlesCache = results
    }
 
    return results
  }

  async getArticleContent(slug: string): Promise<ArticleContent | null> {
    if (Config.articles.caching && this.contentCache[slug]) {
      return this.contentCache[slug]
    }

    let content =
      await markdownArticleProvider.getArticleContent(slug) ||
      await notionArticleProvider.getArticleContent(slug)
    
    if (Config.articles.caching && content) {
      this.contentCache[slug] = content
    }

    return content
  }

  async getCategory(slug: string): Promise<Category | null> {
    if (Config.articles.caching && this.categoryCache[slug]) {
      return this.categoryCache[slug]
    }

    let category =
      await markdownArticleProvider.getCategory(slug) ||
      await notionArticleProvider.getCategory(slug)
    
    if (Config.articles.caching && category) {
      this.categoryCache[slug] = category
    }

    return category
  }

  async getCategories(parentSlug: string | null = null): Promise<Category[]> {
    if (Config.articles.caching && this.categoryChildrenCache[parentSlug || ""]) {
      return this.categoryChildrenCache[parentSlug || ""]
    }

    let markdownCategories = await markdownArticleProvider.getCategories(parentSlug)
    let notionCategories = await notionArticleProvider.getCategories(parentSlug)
 
    let results: Category[] = [
      ...markdownCategories,
      ...notionCategories,
    ]

    if (Config.articles.caching) {
      this.categoryChildrenCache[parentSlug || ""] = results
    }
 
    return results
  }

  async getTags(): Promise<string[]> {
    if (Config.articles.caching && this.tagsCache) {
      return this.tagsCache
    }

    let markdownTags = await markdownArticleProvider.getTags()
    let notionTags = await notionArticleProvider.getTags()

    let results = Array.from(new Set([ ...markdownTags, ...notionTags ]))

    if (Config.articles.caching) {
      this.tagsCache = results
    }

    return results
  }
}

export default new ArticleProviderImpl()
