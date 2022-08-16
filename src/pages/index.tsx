import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import Config from '@/config'
import { generateRssFeed } from '@/rssgen'
import { generateSitemap } from '@/sitemapgen'

import ArticleCard from '@/components/articlecard'

import articleProvider, { Article, ArticleContent, Category } from '@/lib/article'

export const getStaticProps: GetStaticProps<{
  articles: Article[],
  categories: (Category | null)[],
}> = async (context) => {
  let allArticles = await articleProvider.getArticles()
  let articleAndContents = (await Promise.all(
    allArticles.map(async (article) => {
      if (!article.slug) return null

      let content = await articleProvider.getArticleContent(article.slug)
      if (!content) return null

      let result: [ Article, ArticleContent ] = [ article, content ]

      return result
    })
  )).filter(<T,>(element: T | null): element is T => element !== null)

  generateRssFeed(articleAndContents)
  generateSitemap(allArticles)

  let articles = allArticles.slice(0, 10)
  let categories = await Promise.all(articles.map(async article => article.category ? await articleProvider.getCategory(article.category) : null))

  return {
    props: {
      articles,
      categories,
    }
  }
}

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ articles, categories }) => {
  return (
    <>
      <Head>
        <title>{`Home - ${Config.title}`}</title>
      </Head>

      <main>
        <h1>Latest</h1>

        <div className="article-cards">
          {articles.map((article, index) => (
            <ArticleCard key={article.slug} article={article} category={categories[index] || undefined} />
          ))}
        </div>

        <div className="bottom">
          <div className="readmore">
            <Link href='/pages/1'>
              <a>
                All posts
                <i className="fas fa-chevron-right arrow"></i>
              </a>
            </Link>
          </div>
        </div>
      </main>

      <style jsx>{`
        .article-cards {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          row-gap: 40px;
          column-gap: 40px;
          margin: 40px 0;
        }
        .bottom {
          display: flex;
          margin: 40px 0;
          justify-content: right;
        }
        .arrow {
          margin-left: 0.5em;
        }
        .readmore {
          box-shadow: rgba(0, 0, 0, 0.05) 0 0 20px 5px;
          padding: 1em;
          background-color: var(--color-brand);
          color: white;
          font-size: 0.9em;
        }
      `}</style>
    </>
  )
}

export default Home
