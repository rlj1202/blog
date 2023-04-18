import { Fragment } from 'react';
import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { Article } from 'contentlayer/generated';
import { getArticles } from '@/utils';

import Config from '@/config';

import DefaultLayout from '@/components/theme/DefaultLayout';
import Heading from '@/components/theme/Heading';

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

      <div className="mb-16">
        <Heading>Archives</Heading>
      </div>

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
