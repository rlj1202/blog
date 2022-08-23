import type { NextPage, GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { ParsedUrlQuery } from 'querystring'

import dateFormat from 'dateformat'

import Config from '@/config'

import ArticleLink from '@/components/articlelink'
import ArticleCard from '@/components/articlecard'

import Utterances from '@/components/utterances'
import Tag from '@/components/tag'

import blogService, { Article } from '@/lib/blog'

interface Props {
  article: Article
  suggestedArticles: Article[]
}

interface Routes extends ParsedUrlQuery {
  slug: string
}

export const getStaticProps: GetStaticProps<Props, Routes> = async (context) => {
  let slug = context.params?.slug
  let article = slug !== undefined && await blogService.getArticle(slug)

  if (!slug || !article) {
    return {
      notFound: true
    }
  }

  let suggestedArticles = (await blogService.getArticles()).slice(0, 2)

  return {
    props: {
      article,
      suggestedArticles,
    }
  }
}

export const getStaticPaths: GetStaticPaths<ParsedUrlQuery> = async (context) => {
  let articles = await blogService.getArticles()
  let slugs = articles.map(article => article.slug)

  return {
    paths: slugs.map(slug => ({ params: { slug } })),
    fallback: false
  }
}

const Comment: NextPage<{ name: string, date: Date }> = ({ name, date, children }) => {
  return (
    <div className="comment">
      <header className="comment-header">
        <div className="comment-name">{name}</div>
        <div className="comment-date">{dateFormat(date, 'yyyy-mm-dd hh:MM:ss')}</div>
      </header>
      <div className="comment-content">
        {children}
      </div>

      <style jsx>{`
        .comment {
          margin: 40px 0;
        }
        .comment-header {

        }
        .comment-content {
          margin: 20px 0;
        }
        .comment-name {
          margin: 10px 0;
        }
        .comment-date {
          margin: 10px 0;
          color: #999999;
          font-size: 0.9em;
        }
      `}</style>
    </div>
  )
}

const ArticlePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  article,
  suggestedArticles
}) => {
  return (
    <>
      <Head>
        <title>{`${article.title} - ${Config.title}`}</title>

        {/* opengraph */}
        <meta property="og:title" content={article.title} />
        <meta property="og:locale" content="ko_KR" />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={Config.description} />
        <meta property="og:url" content="" />
        <meta property="og:image" content="" />
      </Head>

      <article>
        <header className="post-header">
          {/* <span className="post-category">{postPath.slice(0, -1).join('/')}</span> */}
          <h1 className="post-title">
            <ArticleLink article={article}><a>{article.title}</a></ArticleLink>
          </h1>
          <h2 className="post-subtitle">{article.subtitle}</h2>
          <h2 className="post-date">
            {dateFormat(article.createdAt, 'yyyy-mm-dd hh:MM:ss')}
          </h2>
          <div className="post-tags">
            {article.tags?.map?.(tag => (
              <Tag key={tag} tag={tag}>{tag}</Tag>
            ))}
          </div>
        </header>
        <div className="article">
          <div dangerouslySetInnerHTML={{ __html: article.htmlContent || '' }} />
        </div>
        <hr />
        <Utterances />
        <hr />
        <h1>Latest</h1>
        <div className="post-suggestions">
          {suggestedArticles.map(article => (
            <ArticleCard article={article} key={article.slug} />
          ))}
        </div>
      </article>

      <style jsx>{`
        .post-header, .post-content, .post-comments {
          margin: 6rem 0;
        }
        .post-category {
          color: #666666;
        }
        .post-title {
          font-size: 3em;
          margin: 0.3em 0;
          font-weight: bold;
          color: var(--color-text-primary);
        }
        .post-subtitle {
          font-size: 1.3em;
          margin: 10px 0;
          font-weight: normal;
          color: var(--color-text-secondary);
        }
        .post-date {
          font-weight: normal;
          font-size: 1em;
          margin: 10px 0;
          color: var(--color-text-secondary);
        }
        .post-tags {
          margin: 10px 0;
          display: flex;
          flex-wrap: wrap;
          row-gap: 6px;
          column-gap: 6px;
        }
        .post-suggestions {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          row-gap: 40px;
          column-gap: 40px;
          margin: 40px 0;
        }
        hr {
          margin: 40px 0;
        }
      `}</style>
    </>
  )
}

export default ArticlePage
