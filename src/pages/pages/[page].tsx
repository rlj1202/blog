import { NextPage, GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from 'next'
import Head from 'next/head'

import Config from '../../config'

import Layout from '../../components/layout'
import PostCard from '../../components/postcard'
import Paginator from '../../components/paginator'

import { Post, getPosts } from '../../utils/postUtils'
import { ParsedUrlQuery } from 'querystring'

interface Props extends ParsedUrlQuery {
  page: string
}

export const getStaticProps: GetStaticProps<{ page: number, posts: Post[], total: number }, Props> = async (context) => {
  let page = parseInt(context.params?.page || '1')

  let { posts, total } = await getPosts({ offset: (page - 1) * Config.postsPerPage, limit: Config.postsPerPage })

  posts.sort((a, b) => {
    return -((a.metadata.date?.getTime() || 0) - (b.metadata.date?.getTime() || 0))
  })

  return {
    props: {
      page,
      posts,
      total
    }
  }
}

export const getStaticPaths: GetStaticPaths<Props> = async (context) => {
  let { total } = await getPosts()
  let pages = Math.ceil(total / Config.postsPerPage)

  return {
    paths: [...Array.from(new Array(pages + 1).keys()).slice(1)].map(i => ({ params: { page: `${i}` } })),
    fallback: false
  }
}

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ page, posts, total }) => {
  return (
    <Layout>
      <Head>
        <title>{`Page ${page} - ${Config.title}`}</title>
      </Head>

      <main className="main">
        <div className="postcards">
          {posts.map(post => (
            <PostCard key={post.postPath.join('/')} post={post} />
          ))}
        </div>

        <Paginator
          curPage={page} perPage={Config.postsPerPage} total={total}
          pageUrl={(page) => { return `/pages/${page}` }} />

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
      `}</style>
    </Layout>
  )
}

export default Page
