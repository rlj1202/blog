import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'

import PostLink from '../components/postlink'
import Layout from '../components/layout'

import { Post, getPosts } from '../utils/postUtils'

interface Props {
  posts: Post[]
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  let posts = await getPosts()

  posts.sort((a, b) => {
    return -((a.metadata.date?.getTime?.() || 0) - (b.metadata.date?.getTime?.() || 0));
  })

  return {
    props: {
      posts
    }
  }
}

const Archives: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ posts }) => {
  return (
    <Layout>
      <Head>
        <title>Archives</title>
      </Head>

      <div className="main">
        <h1>아카이브</h1>

        {Array.from(new Set(posts.map(post => post.metadata.date?.getFullYear()))).map(year => (
          <>
            <h2 key={year}>{year}</h2>

            {posts.filter(post => post.metadata.date?.getFullYear() == year).map(post => (
              <div className="post" key={post.postPath.join('/')}>
                <PostLink postPath={post.postPath}>
                  <a>{post.metadata.title}</a>
                </PostLink>
              </div>
            ))}
          </>
        ))}

        <hr />
      </div>

      <style jsx>{`
        .main {
          max-width: 800px;
          margin: 40px auto;
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

export default Archives