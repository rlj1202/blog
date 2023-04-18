import {
  NextPage,
  GetStaticProps,
  GetStaticPaths,
  InferGetStaticPropsType,
} from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';

import { Article } from 'contentlayer/generated';
import { getArticles } from '@/utils';

import DefaultLayout from '@/components/theme/DefaultLayout';
import Articles from '@/components/theme/Articles';
import Paginator from '@/components/theme/Paginator';
import Heading from '@/components/theme/Heading';

import Config from '@/config';

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
    <DefaultLayout>
      <Head>
        <title>{`Page ${page} - ${Config.title}`}</title>
      </Head>

      <div className="mb-16">
        <Heading>{`Page ${page}`}</Heading>
      </div>

      <div className="mb-16">
        <Articles
          articles={articles.slice(
            Config.articles.perPage * (page - 1),
            Config.articles.perPage * page
          )}
        />
      </div>

      <Paginator
        curPage={page}
        pages={Math.ceil(articles.length / Config.articles.perPage)}
        pageUrl={(page) => `/pages/${page}`}
      />
    </DefaultLayout>
  );
};

export default Page;
