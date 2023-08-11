import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';

import Config from '@/config';
import Head from 'next/head';

import { Article } from 'contentlayer/generated';
import { getArticles } from '@/utils';

import Articles from '@/components/theme/Articles';
import SeeMore from '@/components/theme/SeeMore';
import DefaultLayout from '@/components/theme/DefaultLayout';
import Heading from '@/components/theme/Heading';

import generateRssFeed from '@/rssgen';

export const getStaticProps: GetStaticProps<{
  articles: Article[];
}> = async (context) => {
  generateRssFeed(getArticles());

  const articles = getArticles().slice(0, 10);

  return {
    props: {
      articles,
    },
  };
};

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  articles,
}) => {
  return (
    <DefaultLayout>
      <Head>
        <title>{`Home - ${Config.title}`}</title>
      </Head>

      <div className="mb-16">
        <Heading>Latest</Heading>
      </div>

      <div className="mb-16">
        <Articles articles={articles} />
      </div>

      <div className="flex flex-row justify-end">
        <SeeMore />
      </div>
    </DefaultLayout>
  );
};

export default Page;
