import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'

import ArticleLink from '@/components/articlelink'

import { Article, articles } from '@/lib/article'

import Config from '@/config'

interface Props {
  articles: Article[]
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  return {
    props: {
      articles
    }
  }
}

const Archives: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ articles }) => {
  return (
    <>
      <Head>
        <title>{`Archives - ${Config.title}`}</title>
      </Head>

      <div>
        <h1>Archives</h1>

        {Array.from(new Set(articles.map(article => article.createdAt?.getFullYear()))).map(year => (
          <>
            <h2 key={year}>{year}</h2>

            {articles.filter(article => article.createdAt?.getFullYear() == year).map(article => (
              <div className="post" key={article.slug}>
                <ArticleLink article={article}>
                  <a>{article.title}</a>
                </ArticleLink>
              </div>
            ))}
          </>
        ))}
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