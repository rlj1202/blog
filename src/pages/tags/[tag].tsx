import { NextPage, GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import { ParsedUrlQuery } from 'querystring'

import Layout from '../../components/layout'
import PostLink from '../../components/postlink'
import PostCard from '../../components/postcard'

import { Post, getPosts, getTags } from '../../utils/postUtils'

interface Props extends ParsedUrlQuery {
  tag: string
}

export const getStaticProps: GetStaticProps<{ tag: string, posts: Post[] }, Props> = async (context) => {
  var tag = context.params?.tag

  if (!tag) {
    return {
      notFound: true
    }
  }

  var { posts } = await getPosts({ tag })

  return {
    props: {
      tag,
      posts
    }
  }
}

export const getStaticPaths: GetStaticPaths<Props> = async (context) => {
  var tags = await getTags()

  return {
    paths: tags.map(tag => ({ params: { tag } })),
    fallback: false
  }
}

const Tag: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ tag, posts }) => {
  return (
    <Layout>
      <Head>
        <title>{`Tags - ${tag}`}</title>
      </Head>

      <main className="main">
        <h1>{tag}</h1>

        <div className="posts">
          {posts.map(post => (
            <PostCard post={post} key={post.postPath.join('/')} />
          ))}
        </div>

        <hr />
      </main>

      <style jsx>{`
        .main {
          max-width: 800px;
          margin: 40px auto;
        }
        .posts {
          display: flex;
          flex-wrap: wrap;
          column-gap: 40px;
          row-gap: 40px;
          margin: 40px 0;
        }
        hr {
          margin: 40px 0;
        }
      `}</style>
    </Layout>
  )
}

export default Tag
