import { Fragment } from 'react';
import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';

import ArticleLink from '@/components/ArticleLink';

import { Article } from 'contentlayer/generated';
import { getArticles } from '@/utils';

import Config from '@/config';

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
    <>
      <Head>
        <title>{`Archives - ${Config.title}`}</title>
      </Head>

      <div>
        <h1 className="title">Archives</h1>

        {years.map((year) => (
          <Fragment key={year}>
            <h2>{year}</h2>

            {articles
              .filter((article) => new Date(article.date).getFullYear() == year)
              .map((article) => (
                <div className="post" key={article.slug}>
                  <ArticleLink article={article}>
                    <a>{article.title}</a>
                  </ArticleLink>
                </div>
              ))}
          </Fragment>
        ))}
      </div>

      <style jsx>{`
        .title {
          margin-top: 2rem;
          margin-bottom: 2rem;
        }
        .post {
          margin: 20px 0;
        }
      `}</style>
    </>
  );
};

export default Archives;
