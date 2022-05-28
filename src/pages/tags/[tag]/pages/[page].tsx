import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import { ParsedUrlQuery } from 'querystring'

import ArticleList from '@/components/articlelist'
import Config from '@/config'

import { Article, articles, tags } from '@/lib/article'

interface Props extends ParsedUrlQuery {
  tag: string
  page: string
}

export const getStaticProps: GetStaticProps<{ tag: string, curPage: number, articles: Article[] }, Props> = async (context) => {
  if (!context.params?.tag || !context.params?.page) {
    return { notFound: true }
  }

  let tag = context.params.tag
  let curPage = parseInt(context.params.page)
  let filteredArticles = articles.filter(article => article.tags?.includes(tag))

  return {
    props: {
      tag,
      curPage,
      articles: filteredArticles,
    }
  }
}

export const getStaticPaths: GetStaticPaths<Props> = async () => {
  let paths = await Promise.all(tags.map(async tag => {
    let total = articles.filter(article => article.tags?.includes(tag)).length
    let pages = Math.ceil(total / Config.postsPerPage)

    return (
      [...Array.from(new Array(pages + 1).keys()).slice(1)].map(page => (
        {
          params: {
            tag,
            page: `${page}`,
          }
        }
      ))
    )
  }))

  return {
    paths: paths.flat(),
    fallback: false,
  }
}

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ tag, curPage, articles }) => {
  return (
    <>
      <Head>
        <title>{`${tag} - ${Config.title}`}</title>
      </Head>
      
      <ArticleList
        title={tag}
        curPage={curPage}
        pageUrl={page => `/tags/${tag}/pages/${page}`}
        articles={articles} />

      <style jsx>{`
      `}</style>
    </>
  )
}

export default Page
