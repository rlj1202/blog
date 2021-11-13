import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'

import Layout from '../../components/layout'
import Tag from '../../components/tag'

import Config from '../../config'

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
        <title>{`Tags - ${Config.title}`}</title>
      </Head>

      <div>
        <h1>Tags</h1>

        <div className="tags">
          {tags.map(tag => (
            <Tag key={tag} tag={tag}>{`${tag} · ${posts.filter(post => post.metadata.tags?.includes(tag)).length}`}</Tag>
          ))}
        </div>
      </div>

      <style jsx>{`
        .tags {
          display: flex;
          flex-wrap: wrap;
          row-gap: 6px;
          column-gap: 6px;
          margin: 40px 0;
        }
      `}</style>
    </Layout>
  )
}

export default Tags
