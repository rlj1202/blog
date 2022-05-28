import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'

import ArticleLink from '@/components/articlelink'

import { Article, articles } from '@/lib/article'

import Config from '@/config'

interface Props {
  articles: Article[]
  categories: string[][]
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  // let categories = await getCategoryPaths()
  // TODO:

  return {
    props: {
      articles,
      categories: [],
    }
  }
}

const Categories: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ articles, categories }) => {
  return (
    <>
      <Head>
        <title>{`Categories - ${Config.title}`}</title>
      </Head>

      <div>
        <h1>Categories</h1>

        {categories.map(category => (
          <>
            <h2>{category.join('/')}</h2>

            {articles.filter(article => article.categories?.join('/') == category.join('/')).map(article => (
              <div className="post" key={article.slug}>
                <ArticleLink article={article}>
                  <a>{article.title || article.slug}</a>
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

export default Categories
