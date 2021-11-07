import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'

import PostLink from '../components/postlink'
import Layout from '../components/layout'

import { Post, getPosts, getTags } from '../utils/postUtils'

interface Props {
  posts: Post[]
  tags: string[]
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  let posts = await getPosts()
  let tags = await getTags()

  return {
    props: {
      posts,
      tags
    }
  }
}

const Tags: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ posts, tags }) => {
  return (
    <Layout>
      <Head>
        <title>Tags</title>
      </Head>

      <div className="main">
        <h1>태그</h1>

        {tags.map(tag => (
          <>
            <h2>{tag}</h2>

            {posts.filter(post => post.metadata.tags?.includes(tag)).map(post => (
              <div className="post">
                <PostLink postPath={post.postPath}>
                  <a>{post.metadata.title || post.postPath.at(-1)}</a>
                </PostLink>
              </div>
            ))}
          </>
        ))}

        <hr />
      </div>

      <style jsx>{`
        .main {
          margin: 40px auto;
          max-width: 800px;
          box-sizing: content-box;
          padding: 0 40px;
        }
        .post {
          margin: 20px 0;
        }
      `}</style>
    </Layout>
  )
}

export default Tags
