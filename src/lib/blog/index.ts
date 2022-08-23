import {
    Article,
    Category,
    CategoryTree,

    BlogProvider,
    BlogService,
} from './types'

import markdownBlogProvider from './markdown'
import notionBlogProvider from './notion'

export type { Article, Category, CategoryTree, BlogService }

class BlogProviderImpl implements BlogProvider {
    async getArticle(slug: string): Promise<Article | null> {
        const article =
            await markdownBlogProvider.getArticle(slug) ||
            await notionBlogProvider.getArticle(slug)
        return article
    }

    async getCategory(slug: string): Promise<Category | null> {
        const category =
            await markdownBlogProvider.getCategory(slug) ||
            await notionBlogProvider.getCategory(slug)
        return category
    }

    async getArticles(): Promise<Article[]> {
        const articles = [
            ...await markdownBlogProvider.getArticles(),
            ...await notionBlogProvider.getArticles(),
        ]

        return articles
    }

    async getCategories(parentSlug: string | null = null): Promise<Category[]> {
        const categories = [
            ...await markdownBlogProvider.getCategories(parentSlug),
            ...await notionBlogProvider.getCategories(parentSlug),
        ]
        return categories
    }
}

const blogProvider = new BlogProviderImpl()

class BlogServiceImpl implements BlogService {
    async getArticle(slug: string): Promise<Article | null> {
        const article = await blogProvider.getArticle(slug)
        if (!article) return null

        if (article.categorySlug) {
            const category = await blogProvider.getCategory(article.categorySlug)

            if (category) {
                article.category = category
            }
        }

        return article
    }

    async getCategory(slug: string): Promise<Category | null> {
        const category = await blogProvider.getCategory(slug)
        if (!category) return null;

        category.articles = []

        return category
    }

    async getArticles(): Promise<Article[]> {
        let articles = await blogProvider.getArticles()

        await Promise.all(articles.map(async article => {
            if (article.categorySlug) {
                const category = await blogProvider.getCategory(article.categorySlug)

                if (category) {
                    article.category = category
                }
            }
        }))

        articles.sort((a, b) => {
            const aDate = a.createdAt || new Date()
            const bDate = b.createdAt || new Date()
            return bDate.getTime() - aDate.getTime()
        })

        if (process.env.NODE_ENV !== 'development') {
            articles = articles.filter(article => article.published)
        }

        return articles
    }

    async getCategories(parentSlug: string | null = null): Promise<Category[]> {
        return await blogProvider.getCategories(parentSlug)
    }

    async getCategoryTree(parentSlug: string | null = null): Promise<CategoryTree[]> {
        const categories = await blogProvider.getCategories(parentSlug)

        const trees: CategoryTree[] = await Promise.all(
            categories.map(async (category) => ({
                category,
                children: await this.getCategoryTree(category.slug)
            }))
        )

        return trees
    }

    async getTags(): Promise<string[]> {
        const articles = await blogProvider.getArticles()

        let tags = articles.flatMap(article => article.tags || [])
        tags = Array.from(new Set(tags))

        return tags
    }
}

const blogService = new BlogServiceImpl()

export default blogService
