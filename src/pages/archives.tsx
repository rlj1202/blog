import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'

import PostLink from '../components/postlink'
import Layout from '../components/layout'

import { Post, getPosts } from '../utils/postUtils'

import Config from '../config'

interface Props {
  posts: Post[]
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  let { posts } = await getPosts()

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
        <title>{`Archives - ${Config.title}`}</title>
      </Head>

      <div>
        <h1>Archives</h1>

        {Array.from(new Set(posts.map(post => post.metadata.date?.getFullYear()))).map(year => (
          <>
            <h2 key={year}>{year}</h2>

            {posts.filter(post => post.metadata.date?.getFullYear() == year).map(post => (
              <div className="post" key={post.postPath.join('/')}>
                <PostLink post={post}>
                  <a>{post.metadata.title}</a>
                </PostLink>
              </div>
            ))}
          </>
        ))}
      </div>

      <style jsx>{`
        .post {
          margin: 20px 0;
        }
      `}</style>
    </Layout>
  )
}

export default Archives