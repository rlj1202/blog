import { NextPage, GetStaticProps, GetStaticPaths, InferGetStaticPropsType } from 'next'
import Head from 'next/head'

import Config from '../../config'

import PostList from '../../components/postlist'

import { Post, getPosts } from '../../utils/postUtils'
import { ParsedUrlQuery } from 'querystring'

interface Props extends ParsedUrlQuery {
  page: string
}

export const getStaticProps: GetStaticProps<{ page: number, posts: Post[] }, Props> = async (context) => {
  let page = parseInt(context.params?.page || '1')

  let { posts } = await getPosts()

  return {
    props: {
      page,
      posts
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

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ page, posts }) => {
  return (
    <>
      <Head>
        <title>{`Page ${page} - ${Config.title}`}</title>
      </Head>

      <PostList
        title={`Page ${page}`}
        curPage={page}
        posts={posts}
        pageUrl={page => `/pages/${page}`} />

      <style jsx>{`
      `}</style>
    </>
  )
}

export default Page
