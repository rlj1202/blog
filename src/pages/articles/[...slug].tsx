import type { NextPage, GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { ParsedUrlQuery } from 'querystring'

import dateFormat from 'dateformat'

import Config from '../../config'

import PostLink from '../../components/postlink'
import PostCard from '../../components/postcard'
import Utterances from '../../components/utterances'
import MathJax3 from '../../components/mathjax3'
import Tag from '../../components/tag'

import styles from '../../styles/Post.module.css'

import { Post, getPostPaths, getPost, getPosts } from '../../utils/postUtils'

interface Props {
  post: Post
  postPath: string[]
  suggestedPosts: Post[]
}

interface Routes extends ParsedUrlQuery {
  slug: string[]
}

export const getStaticProps: GetStaticProps<Props, Routes> = async (context) => {
  let postPath = context.params?.slug

  if (!postPath) {
    return {
      notFound: true
    }
  }

  let post = await getPost(postPath)
  let { posts } = await getPosts({ offset: 0, limit: 2 })

  return {
    props: {
      post,
      postPath,
      suggestedPosts: posts
    }
  }
}

export const getStaticPaths: GetStaticPaths<ParsedUrlQuery> = async (context) => {
  let postPaths = await getPostPaths()

  return {
    paths: postPaths.map(postPath => ({ params: { slug: postPath } })),
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

const Article: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ post, postPath, suggestedPosts }) => {
  let { content, metadata } = post

  return (
    <>
      <MathJax3 />
      <Head>
        <title>{`${metadata.title} - ${Config.title}`}</title>

        {/* opengraph */}
        <meta property="og:title" content={metadata.title} />
        <meta property="og:locale" content="ko_KR" />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={Config.description} />
        <meta property="og:url" content="" />
        <meta property="og:image" content="" />
      </Head>

      <article>
        <header className="post-header">
          <span className="post-category">{postPath.slice(0, -1).join('/')}</span>
          <h1 className="post-title">
            <PostLink post={post}><a>{metadata.title}</a></PostLink>
          </h1>
          <h2 className="post-subtitle">{metadata.subtitle}</h2>
          <h2 className="post-date">
            {dateFormat(metadata.date, 'yyyy-mm-dd hh:MM:ss')}
          </h2>
          <div className="post-tags">
            {(metadata.tags as string[])?.map?.(tag => (
              <Tag key={tag} tag={tag}>{tag}</Tag>
            ))}
          </div>
        </header>
        <div
          className={styles.post}
          dangerouslySetInnerHTML={{ __html: content }} />
        <hr />
        <Utterances />
        <hr />
        <h1>Latest</h1>
        <div className="post-suggestions">
          {suggestedPosts.map(post => (
            <PostCard post={post} key={post.postPath.join('/')} />
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
        }
        .post-subtitle {
          font-size: 1.3em;
          margin: 10px 0;
          font-weight: normal;
        }
        .post-date {
          font-weight: normal;
          font-size: 1em;
        }
        .post-date {
          margin: 10px 0;
          color: #666666;
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

export default Article
