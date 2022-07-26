import { Fragment } from 'react'
import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'

import ArticleLink from '@/components/articlelink'

import articleProvider, { Article } from '@/lib/article'

import Config from '@/config'

interface Props {
  articles: Article[]
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  let articles = await articleProvider.getArticles()

  return {
    props: {
      articles
    }
  }
}

const Archives: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ articles }) => {
  const years = Array.from(new Set(articles.map(article => article.createdAt?.getFullYear())))

  return (
    <>
      <Head>
        <title>{`Archives - ${Config.title}`}</title>
      </Head>

      <div>
        <h1>Archives</h1>

        { years.map(year => (
          <Fragment key={year}>
            <h2>{year}</h2>

            { articles.filter(article => article.createdAt?.getFullYear() == year).map(article => (
              <div className="post" key={article.slug}>
                <ArticleLink article={article}>
                  <a>{article.title}</a>
                </ArticleLink>
              </div>
            )) }
          </Fragment>
        )) }
      </div>

      <style jsx>{`
        .post {
          margin: 20px 0;
        }
      `}</style>
    </>
  )
}

export default Archives