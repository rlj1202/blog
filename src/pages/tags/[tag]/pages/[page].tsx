import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';

import { Article } from 'contentlayer/generated';
import { getArticles } from '@/utils';

import DefaultLayout from '@/components/theme/DefaultLayout';

import Config from '@/config';
import Articles from '@/components/theme/Articles';
import Paginator from '@/components/theme/Paginator';

interface Props extends ParsedUrlQuery {
  tag: string;
  page: string;
}

export const getStaticProps: GetStaticProps<
  {
    tag: string;
    curPage: number;
    articles: Article[];
  },
  Props
> = async (context) => {
  if (!context.params?.tag || !context.params?.page) {
    return { notFound: true };
  }

  const tag = context.params.tag;
  const curPage = parseInt(context.params.page);
  const filteredArticles = getArticles().filter((article) =>
    article.tags?.includes(tag)
  );

  return {
    props: {
      tag,
      curPage,
      articles: filteredArticles,
    },
  };
};

export const getStaticPaths: GetStaticPaths<Props> = async () => {
  const tags = Array.from(
    new Set(
      getArticles()
        .map((article) => article.tags)
        .flat()
        .filter((tag): tag is string => tag !== undefined)
    )
  );

  const paths = await Promise.all(
    tags.map(async (tag) => {
      let total = getArticles().filter((article) =>
        article.tags?.includes(tag)
      ).length;
      let pages = Math.ceil(total / Config.articles.perPage);

      return [...Array.from(new Array(pages + 1).keys()).slice(1)].map(
        (page) => ({
          params: {
            tag,
            page: `${page}`,
          },
        })
      );
    })
  );

  return {
    paths: paths.flat(),
    fallback: false,
  };
};

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  tag,
  curPage,
  articles,
}) => {
  return (
    <DefaultLayout>
      <Head>
        <title>{`${tag} - ${Config.title}`}</title>
      </Head>

      <h1 className="text-6xl font-extrabold mb-16 text-gray-900 dark:text-gray-50">
        <span className="relative after:absolute after:left-0 after:bottom-0 after:-z-10 after:w-full after:content-[''] after:h-7 after:bg-red-500/60 after:dark:bg-red-500/80">
          {tag}
        </span>
      </h1>

      <div className="mb-16">
        <Articles
          articles={articles.slice(
            Config.articles.perPage * (curPage - 1),
            Config.articles.perPage * curPage
          )}
        />
      </div>

      <Paginator
        curPage={curPage}
        pages={Math.ceil(articles.length / Config.articles.perPage)}
        pageUrl={(page) => `/tags/${tag}/pages/${page}`}
      />
    </DefaultLayout>
  );
};

export default Page;
