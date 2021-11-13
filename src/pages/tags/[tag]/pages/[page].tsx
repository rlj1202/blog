import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import { ParsedUrlQuery } from 'querystring'

import Layout from '../../../../components/layout'
import PostList from '../../../../components/postlist'
import Config from '../../../../config'

import { Post, getPosts, getTags } from '../../../../utils/postUtils'

interface Props extends ParsedUrlQuery {
  tag: string
  page: string
}

export const getStaticProps: GetStaticProps<{ tag: string, curPage: number, posts: Post[] }, Props> = async (context) => {
  if (!context.params?.tag || !context.params?.page) {
    return { notFound: true }
  }

  var tag = context.params.tag
  var curPage = parseInt(context.params.page)
  var { posts } = await getPosts({ tag: tag })

  return {
    props: {
      tag,
      curPage,
      posts,
    }
  }
}

export const getStaticPaths: GetStaticPaths<Props> = async () => {
  var tags = await getTags()
  
  var paths = await Promise.all(tags.map(async tag => {
    var { total } = await getPosts({ tag })
    var pages = Math.ceil(total / Config.postsPerPage)

    return (
      [...Array.from(new Array(pages + 1).keys()).slice(1)].map(page => (
        {
          params: {
            tag,
            page: `${page}`,
          }
        }
      ))
    )
  }))

  return {
    paths: paths.flat(),
    fallback: false,
  }
}

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ tag, curPage, posts }) => {
  return (
    <Layout>
      <Head>
        <title>{`${tag} - ${Config.title}`}</title>
      </Head>
      
      <PostList
        title={tag}
        curPage={curPage}
        pageUrl={page => `/tags/${tag}/pages/${page}`}
        posts={posts} />

      <style jsx>{`
      `}</style>
    </Layout>
  )
}

export default Page
