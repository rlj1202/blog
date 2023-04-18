import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';

import Config from '@/config';
import Head from 'next/head';

import { Article } from 'contentlayer/generated';
import { getArticles } from '@/utils';

import Articles from '@/components/theme/Articles';
import SeeMore from '@/components/theme/SeeMore';
import DefaultLayout from '@/components/theme/DefaultLayout';

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

      <h1 className="text-6xl font-extrabold mb-16 text-gray-900 dark:text-gray-50">
        <span className="relative after:absolute after:left-0 after:bottom-0 after:-z-10 after:w-full after:content-[''] after:h-7 after:bg-red-500/60 after:dark:bg-red-500/80">
          Latest
        </span>
      </h1>

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
