import React from 'react'
import type { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'

import { getNotionBlockChildren, } from '@/lib/notion'

import {
  Article, ArticleContent, Category, CategoryTree,
  articles, categories, categoryTree, tags,
} from '@/lib/article'

import ArticleContentRenderer from '@/components/articlecontentrenderer'
import ArticleCard from '@/components/articlecard'

import MathJax3 from '@/components/mathjax3'

import styles from '@/styles/Post.module.css'

export const getStaticProps: GetStaticProps<{
  articleContent: ArticleContent,
  articles: Article[],
  tags: string[],
  categories: Category[],
  categoryTree: Array<CategoryTree>,
}> = async (context) => {
  let children = await getNotionBlockChildren('9c64f54f43aa41f192419a78e8ba830c')

  return {
    props: {
      articleContent: { type: 'notion', blockChildrenResp: children },
      articles,
      tags,
      categories,
      categoryTree,
    }
  }
}

const Test: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ articleContent, articles, categories, categoryTree, tags }) => {
  return (
    <>
      <MathJax3 />
      <Head>
        <title>Test page</title>
      </Head>

      <div>
        <ul>
          {categoryTree.map(node => (
            <li key={node.category.slug}>
              {node.category.name}
              <ul>
                {node.children?.map(child => (
                  <li key={child.category.slug}>
                    {child.category.name}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      <div className="articles">
        {articles.map(article => {
          return (
            <ArticleCard key={article.slug} article={article} />
          )
        })}
      </div>

      <div className={styles.post}>
        <ArticleContentRenderer content={articleContent} />
      </div>

      <div>
        {tags.map(tag => <p key={tag}>{tag}</p>)}
      </div>

      <div>
        {articles.map(article => {
          return (
            <div key={article.slug}>
              <div>
                { 'title: ' + article.title }
              </div>
              <div>
                { 'type: ' + article.content.type }
              </div>
              <div>
                { 'slug: ' + article.slug }
              </div>
              <div>
                { 'createdAt: ' + article.createdAt?.getTime() }
              </div>
              <hr />
            </div>
          )
        })}
      </div>

      <style jsx>{`
        .articles {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          row-gap: 40px;
          column-gap: 40px;
          margin: 40px 0;
        }
      `}</style>
    </>
  )
}

export default Test
