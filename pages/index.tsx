import type { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Layout from '../components/layout'
import PostCard from '../components/postcard'
import Paginator from '../components/paginator'

import { Post, getPosts } from '../utils/postUtils'

interface Props {
  posts: Post[]
}


export const getStaticProps: GetStaticProps<Props> = async (context) => {
  let posts = await getPosts()

  posts.sort((a, b) => {
    return -((a.metadata.date?.getTime() || 0) - (b.metadata.date?.getTime() || 0))
  })

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
      </Head>

      <div className="main">
        <div className="postcards">
          {posts.map(post => (
            <PostCard key={post.postPath.join('/')} post={post} />
          ))}
        </div>

        <Paginator curPage={2} pageUrl={(page) => { return '/' }} />

        <hr />
      </div>

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
      `}</style>
    </Layout>
  )
}

export default Home
