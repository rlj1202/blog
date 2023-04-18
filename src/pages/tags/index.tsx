import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';

import { Article } from 'contentlayer/generated';
import { getArticles } from '@/utils';

import DefaultLayout from '@/components/theme/DefaultLayout';

import Config from '@/config';
import Tag from '@/components/theme/Tag';

interface Props {
  articles: Article[];
  tags: string[];
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const tags = Array.from(
    new Set(
      getArticles()
        .map((article) => article.tags)
        .flat()
        .filter((tag): tag is string => tag !== undefined)
    )
  );

  return {
    props: {
      articles: getArticles(),
      tags,
    },
  };
};

const Tags: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  articles,
  tags,
}) => {
  return (
    <DefaultLayout>
      <Head>
        <title>{`Tags - ${Config.title}`}</title>
      </Head>

      <h1 className="text-6xl font-extrabold mb-16 text-gray-900 dark:text-gray-50">
        <span className="relative after:absolute after:left-0 after:bottom-0 after:-z-10 after:w-full after:content-[''] after:h-7 after:bg-red-500/60 after:dark:bg-red-500/80">
          Tags
        </span>
      </h1>
      <div className="flex flex-row flex-wrap gap-1">
        {tags.map((tag) => (
          <Tag key={tag} tag={tag}>
            {`#${tag} · ${
              articles.filter((article) => article.tags?.includes(tag)).length
            }`}
          </Tag>
        ))}
      </div>
    </DefaultLayout>
  );
};

export default Tags;
