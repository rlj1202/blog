import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import Config from '../config'
import { generateRssFeed } from '../rssgen'
import { generateSitemap } from '../sitemapgen'

import PostCard from '../components/postcard'

import { Post, getPosts } from '../utils/postUtils'

export const getStaticProps: GetStaticProps<{ posts: Post[] }> = async (context) => {
  var { posts } = await getPosts({ limit: 10 })

  generateRssFeed()
  generateSitemap()

  return {
    props: {
      posts
    }
  }
}

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>{`Home - ${Config.title}`}</title>
      </Head>

      <main>
        <h1>Latest</h1>

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
      </main>

      <style jsx>{`
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
          margin-left: 0.5em;
        }
        .readmore {
          box-shadow: rgba(0, 0, 0, 0.05) 0 0 20px 5px;
          padding: 1em;
          background-color: var(--color-brand);
          color: white;
          font-size: 0.9em;
        }
      `}</style>
    </>
  )
}

export default Home
