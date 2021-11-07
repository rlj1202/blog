import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'

import PostLink from '../components/postlink'
import Layout from '../components/layout'

import { Post, getPosts, getCategoryPaths } from '../utils/postUtils'

interface Props {
  posts: Post[]
  categories: string[][]
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  let posts = await getPosts()
  let categories = await getCategoryPaths()

  return {
    props: {
      posts,
      categories
    }
  }
}

const Categories: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ posts, categories }) => {
  return (
    <Layout>
      <Head>
        <title>Categories</title>
      </Head>

      <div className="main">
        <h1>카테고리</h1>

        {categories.map(category => (
          <>
            <h2>{category.join('/')}</h2>

            {posts.filter(post => post.postPath.slice(0, -1).join('/') == category.join('/')).map(post => (
              <div className="post" key={post.postPath.join('/')}>
                <PostLink postPath={post.postPath}>
                  <a>{post.metadata.title || post.postPath[post.postPath.length - 1]}</a>
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

export default Categories
