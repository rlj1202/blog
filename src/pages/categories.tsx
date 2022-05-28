import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'

import PostLink from '@/components/postlink'

import { Post, getPosts, getCategoryPaths } from '@/utils/postUtils'

import Config from '../config'

interface Props {
  posts: Post[]
  categories: string[][]
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  let { posts } = await getPosts()
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
    <>
      <Head>
        <title>{`Categories - ${Config.title}`}</title>
      </Head>

      <div>
        <h1>Categories</h1>

        {categories.map(category => (
          <>
            <h2>{category.join('/')}</h2>

            {posts.filter(post => post.postPath.slice(0, -1).join('/') == category.join('/')).map(post => (
              <div className="post" key={post.postPath.join('/')}>
                <PostLink post={post}>
                  <a>{post.metadata.title || post.postPath[post.postPath.length - 1]}</a>
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
    </>
  )
}

export default Categories
