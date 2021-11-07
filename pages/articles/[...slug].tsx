import type { NextPage, GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { ParsedUrlQuery } from 'querystring'

import dateFormat from 'dateformat'

import PostLink from '../../components/postlink'
import PostCard from '../../components/postcard'
import Tag from '../../components/tag'
import Layout from '../../components/layout'

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
  let posts = await getPosts()

  return {
    props: {
      post,
      postPath,
      suggestedPosts: posts.slice(0, 2)
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
        <span className="comment-name">{name}</span>
        <span className="comment-date">{date.toString()}</span>
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
      `}</style>
    </div>
  )
}

const Article: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ post, postPath, suggestedPosts }) => {
  let { content, metadata } = post

  return (
    <Layout>
      <Head>
        <title>{metadata.title}</title>
      </Head>

      <article className="post">
        <header className="post-header">
          <span className="post-category">{postPath.slice(0, -1).join('/')}</span>
          <h1 className="post-title">
            <PostLink postPath={postPath}><a>{metadata.title}</a></PostLink>
          </h1>
          <h2 className="post-subtitle">{metadata.subtitle}</h2>
          <div className="post-info">
            <div className="post-date">
              {dateFormat(metadata.date, 'yyyy-mm-dd hh:MM:ss')}
            </div>
            <div className="post-tags">
              {(metadata.tags as string[])?.map?.(tag => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </div>
        </header>
        <div className="post-content" dangerouslySetInnerHTML={{ __html: content }}>
        </div>
        <hr />
        <div className="post-comments">
          <Comment name={"Jisu Sim"} date={new Date()}>댓글 내용</Comment>
          <Comment name={"Hong Gil Dong"} date={new Date()}>댓글 내용</Comment>
        </div>
        <hr />
        <div className="post-suggestions">
          {suggestedPosts.map(post => (
            <PostCard post={post} key={post.postPath.join('/')} />
          ))}
        </div>
        <hr />
      </article>

      <style jsx>{`
        .post {
          margin: 40px auto;
          max-width: 800px;
          padding: 0 40px;
          box-sizing: content-box;
        }
        .post-header {
          font-family: 'Roboto';
        }
        .post-header, .post-content, .post-comments {
          margin: 40px 0;
        }
        .post-category {
          color: #999999;
        }
        .post-title {
          font-size: 3em;
          margin: 10px 0;
          font-weight: normal;
        }
        .post-subtitle {
          font-size: 1.3em;
          margin: 10px 0;
          color: #999999;
          font-weight: normal;
        }
        .post-info {
          margin: 10px 0;
          font-size: 0.9em;
        }
        .post-date {
          margin: 10px 0;
          color: #999999;
        }
        .post-tags {
          margin: 10px 0;
        }
        .post-suggestions {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          row-gap: 40px;
          column-gap: 40px;
          margin: 40px 0;
        }
      `}</style>
      <style jsx global>{`
        .post-content img, .post-content iframe {
          max-width: 100%;
        }
        .post-content a {
          color: #6464ff;
        }
        hr, .post-content hr {
          border: none;
          border-top: solid 1px #dddddd;
        }
        .post-content blockquote {
          border-left: solid 2px #dddddd;
          padding-left: 20px;
        }
        .post-content code {
          background-color: #3D3D3D;
          color: white;
          padding: 2px 6px;
          font-family: 'Consolas';
        }
        code.hljs {
          display: inline-block;
          width: 100%;
          padding: 20px;
          overflow-x: auto;
        }
        .hljs-keyword {
          font-weight: bold;
          color: #93a6ff;
        }
        .hljs-title {

        }
        .hljs-function {
          color: #ffe0a7;
        }
        .hljs-variable {
          color: #aeff9a;
        }
        .hljs-number {
          color: #fcff41;
        }
        .hljs-string {
          color: #ffb16f;
        }
        .hljs-attribute {
          color: #ff9292;
        }
        .hljs-selector-class {
          color: #a8a8d7;
        }
      `}</style>
    </Layout>
  )
}

export default Article