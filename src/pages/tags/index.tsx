import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'

import Tag from '@/components/tag'

import Config from '@/config'

import blogService, { Article } from '@/lib/blog'

interface Props {
  articles: Article[]
  tags: string[]
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  let articles = await blogService.getArticles()
  let tags = await blogService.getTags()

  return {
    props: {
      articles,
      tags,
    }
  }
}

const Tags: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ articles, tags }) => {
  return (
    <>
      <Head>
        <title>{`Tags - ${Config.title}`}</title>
      </Head>

      <div>
        <h1>Tags</h1>

        <div className="tags">
          {tags.map(tag => (
            <Tag key={tag} tag={tag}>
              {`${tag} · ${articles.filter(article => article.tags?.includes(tag)).length}`}
            </Tag>
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
    </>
  )
}

export default Tags
