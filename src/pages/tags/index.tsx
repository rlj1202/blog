import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';

import Tag from '@/components/tag';

import Config from '@/config';

import { allArticles, Article } from 'contentlayer/generated';

interface Props {
  articles: Article[];
  tags: string[];
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const tags = Array.from(
    new Set(
      allArticles
        .map((article) => article.tags)
        .flat()
        .filter((tag): tag is string => tag !== undefined),
    ),
  );

  return {
    props: {
      articles: allArticles,
      tags,
    },
  };
};

const Tags: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  articles,
  tags,
}) => {
  return (
    <>
      <Head>
        <title>{`Tags - ${Config.title}`}</title>
      </Head>

      <div>
        <h1>Tags</h1>

        <div className="tags">
          {tags.map((tag) => (
            <Tag key={tag} tag={tag}>
              {`${tag} · ${
                articles.filter((article) => article.tags?.includes(tag)).length
              }`}
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
  );
};

export default Tags;
