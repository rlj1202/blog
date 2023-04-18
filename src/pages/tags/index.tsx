import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';

import { Article } from 'contentlayer/generated';
import { getArticles } from '@/utils';

import DefaultLayout from '@/components/theme/DefaultLayout';
import Tag from '@/components/theme/Tag';
import Heading from '@/components/theme/Heading';

import Config from '@/config';

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

      <div className="mb-16">
        <Heading>Tags</Heading>
      </div>

      <div className="flex flex-row flex-wrap gap-1">
        {tags.map((tag) => (
          <Tag key={tag} tag={tag} />
          // <Tag key={tag} tag={tag}>
          //   {`#${tag} · ${
          //     articles.filter((article) => article.tags?.includes(tag)).length
          //   }`}
          // </Tag>
        ))}
      </div>
    </DefaultLayout>
  );
};

export default Tags;
