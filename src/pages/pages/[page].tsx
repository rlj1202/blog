import {
  NextPage,
  GetStaticProps,
  GetStaticPaths,
  InferGetStaticPropsType,
} from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';

import Config from '@/config';

import ArticleList from '@/components/ArticleList';

import { Article } from 'contentlayer/generated';
import { getArticles } from '@/utils';

interface Props extends ParsedUrlQuery {
  page: string;
}

export const getStaticProps: GetStaticProps<
  { page: number; articles: Article[] },
  Props
> = async (context) => {
  const page = parseInt(context.params?.page || '1');

  return {
    props: {
      page,
      articles: getArticles(),
    },
  };
};

export const getStaticPaths: GetStaticPaths<Props> = async (context) => {
  const total = getArticles().length;
  const pages = Math.ceil(total / Config.articles.perPage);

  return {
    paths: [...Array.from(new Array(pages + 1).keys()).slice(1)].map((i) => ({
      params: { page: `${i}` },
    })),
    fallback: false,
  };
};

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  page,
  articles,
}) => {
  return (
    <>
      <Head>
        <title>{`Page ${page} - ${Config.title}`}</title>
      </Head>

      <ArticleList
        title={`Page ${page}`}
        curPage={page}
        articles={articles}
        pageUrl={(page) => `/pages/${page}`}
      />

      <style jsx>{``}</style>
    </>
  );
};

export default Page;
