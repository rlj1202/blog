import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'

import ArticleLink from '@/components/articlelink'

import { Article, CategoryTree, articles, categoryTree } from '@/lib/article'

import Config from '@/config'

interface Props {
  articles: Article[]
  categoryTree: Array<CategoryTree>
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  return {
    props: {
      articles,
      categoryTree,
    }
  }
}

const Categories: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ articles, categoryTree }) => {
  return (
    <>
      <Head>
        <title>{`Categories - ${Config.title}`}</title>
      </Head>

      <div>
        <h1>Categories</h1>

        { categoryTree.map(node => (
          <>
            <h2>{node.category.name}</h2>

            { node.children?.map(child => {
              return (
                <>
                  <h3>{child.category.name}</h3>

                  { articles.filter(article => article.category == child.category.slug).map(article => (
                    <div className="post" key={article.slug}>
                      <ArticleLink article={article}>
                        <a>{article.title || article.slug}</a>
                      </ArticleLink>
                    </div>
                  )) }
                </>
              )
            }) }

            { articles.filter(article => article.category == node.category.slug).map(article => (
              <div className="post" key={article.slug}>
                <ArticleLink article={article}>
                  <a>{article.title || article.slug}</a>
                </ArticleLink>
              </div>
            )) }
          </>
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

export default Categories
