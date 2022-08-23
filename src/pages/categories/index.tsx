import { Fragment } from 'react'
import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'

import ArticleLink from '@/components/articlelink'
import CategoryLink from '@/components/categorylink'

import blogService, { Article, Category, CategoryTree } from '@/lib/blog'

import Config from '@/config'

interface Props {
  articles: Article[]
  categoryTree: Array<CategoryTree>
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  let articles = await blogService.getArticles()
  let categoryTree = await blogService.getCategoryTree()

  return {
    props: {
      articles,
      categoryTree,
    }
  }
}

const CategoryList: React.FC<{
  level: number,
  treeNodes: CategoryTree[],
  articles: Article[],
}> = ({ level, treeNodes, articles }) => {
  const CustomTag = `h${level}` as keyof JSX.IntrinsicElements

  return (
    <>
      {
        treeNodes.map(node => {
          return (
            <Fragment key={node.category.slug}>
              <CustomTag><CategoryLink category={node.category}><a>{ node.category.name }</a></CategoryLink></CustomTag>
              { articles.filter(article => article.categorySlug === node.category.slug).map(article => {
                return (
                  <ArticleLink article={article} key={article.slug}>
                    <a>{ article.title || article.slug }</a>
                  </ArticleLink>
                )
              }) }
              { node.children &&
                <CategoryList level={level + 1} treeNodes={node.children} articles={articles} />
              }
            </Fragment>
          )
        })
      }
    </>
  )
}

const Categories: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ articles, categoryTree }) => {
  return (
    <>
      <Head>
        <title>{`Categories - ${Config.title}`}</title>
      </Head>

      <div>
        <h1>Categories</h1>
        <CategoryList level={2} treeNodes={categoryTree} articles={articles} />
      </div>

      <style jsx>{`
      `}</style>
    </>
  )
}

export default Categories
