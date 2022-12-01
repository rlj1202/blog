import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';

import ArticleList from '@/components/articlelist';
import Config from '@/config';

import { Article } from 'contentlayer/generated';
import { getArticles } from '@/utils';

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
    <>
      <Head>
        <title>{`${tag} - ${Config.title}`}</title>
      </Head>

      <ArticleList
        title={tag}
        curPage={curPage}
        pageUrl={(page) => `/tags/${tag}/pages/${page}`}
        articles={articles}
      />

      <style jsx>{``}</style>
    </>
  );
};

export default Page;
