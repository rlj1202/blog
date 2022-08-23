import { Url } from "url"

export interface Article {
    slug?: string
    title?: string
    subtitle?: string
    tags?: string[]
    categorySlug?: string
    createdAt?: Date
    updatedAt?: Date
    published?: boolean
    coverImgUrl?: string | Url

    htmlContent?: string

    category?: Category
}

export interface Category {
    slug?: string
    name?: string
    description?: string

    articles?: Article[]
}

export interface CategoryTree {
  category: Category
  children?: CategoryTree[]
}

export interface Tag {
    name?: string

    articles?: Article[]
}

export interface BlogProvider {
    getArticle(slug: string): Promise<Article | null>

    getCategory(slug: string): Promise<Category | null>
    
    getArticles(): Promise<Article[]>

    getCategories(parentSlug: string | null): Promise<Category[]>
}

export interface BlogService {
    getArticle(slug: string): Promise<Article | null>
    getCategory(slug: string): Promise<Category | null>
    getArticles(): Promise<Article[]>
    getCategories(parentSlug: string | null): Promise<Category[]>
    getCategoryTree(parentSlug: string | null): Promise<CategoryTree[]>
    getTags(): Promise<string[]>
}
