import { GetStaticPaths, GetStaticProps, InferGetServerSidePropsType, InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import { ParsedUrlQuery } from 'querystring'

import articleProvider, { Article } from '@/lib/article'

import ArticleList from '@/components/articlelist'

import Config from '@/config'

interface Props extends ParsedUrlQuery {
  category: string
  page: string
}

export const getStaticProps: GetStaticProps<{
  category: string
  page: number
  articles: Article[]
}, Props> = async (context) => {
  let { category, page } = context.params || {}

  if (!category || !page) {
    return {
      notFound: true
    }
  }

  let allArticles = await articleProvider.getArticles()
  let articles = allArticles.filter(article => article.category === category)

  return {
    props: {
      category,
      page: parseInt(page),
      articles: articles
    },
  }
}

export const getStaticPaths: GetStaticPaths<Props> = async () => {
  let allArticles = await articleProvider.getArticles()
  let categories = await articleProvider.getCategories()

  let paths = categories.flatMap(category => {
    let articles = allArticles.filter(article => article.category === category.slug)
    let total = articles.length
    let pages = Math.ceil(total / Config.articles.perPage)

    return [...Array.from(new Array(pages + 1).keys()).slice(1)].map(page => ({
      params: {
        category: category.slug || '',
        page: `${page}`,
      }
    }))
  })

  return {
    paths: paths,
    fallback: false,
  }
}

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  category, page, articles
}) => {
  return (
    <>
      <Head>
        <title>{`${category} - ${Config.title}`}</title>
      </Head>

      <ArticleList
        title={category}
        curPage={page}
        pageUrl={page => `/categories/${category}/pages/${page}`}
        articles={articles} />
    </>
  )
}

export default Page
