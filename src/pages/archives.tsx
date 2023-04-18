import { Fragment } from 'react';
import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { Article } from 'contentlayer/generated';
import { getArticles } from '@/utils';

import Config from '@/config';

import DefaultLayout from '@/components/theme/DefaultLayout';

interface Props {
  articles: Article[];
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  return {
    props: {
      articles: getArticles(),
    },
  };
};

const Archives: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  articles,
}) => {
  const years = Array.from(
    new Set(articles.map((article) => new Date(article.date).getFullYear()))
  );

  return (
    <DefaultLayout>
      <Head>
        <title>{`Archives - ${Config.title}`}</title>
      </Head>

      <h1 className="text-6xl font-extrabold mb-16 text-gray-900 dark:text-gray-50">
        <span className="relative after:absolute after:left-0 after:bottom-0 after:-z-10 after:w-full after:content-[''] after:h-7 after:bg-red-500/60 after:dark:bg-red-500/80">
          Archives
        </span>
      </h1>

      <div className="prose dark:prose-invert">
        {years.map((year) => (
          <Fragment key={year}>
            <h2>{year}</h2>

            {articles
              .filter((article) => new Date(article.date).getFullYear() == year)
              .map((article) => (
                <div className="" key={article.slug}>
                  <Link href={article.url}>{article.title}</Link>
                </div>
              ))}
          </Fragment>
        ))}
      </div>
    </DefaultLayout>
  );
};

export default Archives;
