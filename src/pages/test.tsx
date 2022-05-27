import React from 'react'
import type { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'

import { getNotionBlockChildren, } from '../lib/notion'

import {
  Article, ArticleContent,
  articles, tags,
} from '../lib/article'

import ArticleContentRenderer from '../components/articlecontentrenderer'

import MathJax3 from '../components/mathjax3'

import styles from '../styles/Post.module.css'

export const getStaticProps: GetStaticProps<{
  articleContent: ArticleContent,
  articles: Article[],
  tags: string[],
}> = async (context) => {
  let children = await getNotionBlockChildren('9c64f54f43aa41f192419a78e8ba830c')

  return {
    props: {
      articleContent: { type: 'notion', blockChildrenResp: children },
      articles,
      tags,
    }
  }
}

const Test: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ articleContent, articles, tags }) => {
  return (
    <>
      <MathJax3 />
      <Head>
        <title>Test page</title>
      </Head>

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
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Test
