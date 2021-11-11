import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import Config from '../config'

import Layout from '../components/layout'
import PostCard from '../components/postcard'

import { Post, getPosts } from '../utils/postUtils'

export const getStaticProps: GetStaticProps<{ posts: Post[] }> = async (context) => {
  var { posts } = await getPosts({ limit: 10 })

  return {
    props: {
      posts
    }
  }
}

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ posts }) => {
  return (
    <Layout>
      <Head>
        <title>{`Home - ${Config.title}`}</title>
      </Head>

      <main className="main">
        <div className="postcards">
          {posts.map(post => (
            <PostCard key={post.postPath.join('/')} post={post} />
          ))}
        </div>

        <div className="bottom">
          <div className="readmore">
            <Link href='/pages/1'>
              <a>
                All posts
                <i className="fas fa-chevron-right arrow"></i>
              </a>
            </Link>
          </div>
        </div>

        <hr />
      </main>

      <style jsx>{`
        .main {
          max-width: 1500px;
          margin: 0 auto;
          box-sizing: content-box;
          padding: 0 40px;
        }
        .postcards {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          row-gap: 40px;
          column-gap: 40px;
          margin: 40px 0;
        }
        .bottom {
          display: flex;
          margin: 40px 0;
          justify-content: right;
        }
        .arrow {
          margin-left: 10px;
        }
        .readmore {
          box-shadow: rgba(0, 0, 0, 0.15) 0 0 4px;
          padding: 10px;
          background-color: #FF4F4F;
          color: white;
        }
      `}</style>
    </Layout>
  )
}

export default Home
