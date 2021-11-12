import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import Layout from '../../components/layout'
import Tag from '../../components/tag'

import { Post, getPosts, getTags } from '../../utils/postUtils'

interface Props {
  posts: Post[]
  tags: string[]
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  let { posts } = await getPosts()
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
        <h1>Tags</h1>

        <div className="tags">
          {tags.map(tag => (
            <div key={tag}>
              <Link href={`/tags/${tag}`}>
                <a><Tag>{`${tag} · ${posts.filter(post => post.metadata.tags?.includes(tag)).length}`}</Tag></a>
              </Link>
            </div>
          ))}
        </div>

        <hr />
      </div>

      <style jsx>{`
        .main {
          margin: 40px auto;
          max-width: 800px;
          box-sizing: content-box;
          padding: 0 40px;
        }
        .tags {
          display: flex;
          flex-wrap: wrap;
          row-gap: 6px;
          margin: 40px 0;
        }
        hr {
          margin: 40px 0;
        }
      `}</style>
    </Layout>
  )
}

export default Tags
