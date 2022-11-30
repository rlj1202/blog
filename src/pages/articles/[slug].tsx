import type {
  NextPage,
  GetStaticProps,
  GetStaticPaths,
  InferGetStaticPropsType,
} from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';

import dateFormat from 'dateformat';

import { NextSeo } from 'next-seo';

import { allArticles, Article } from 'contentlayer/generated';

import Config from '@/config';

import ArticleLink from '@/components/articlelink';
import ArticleCard from '@/components/articlecard';

import Utterances from '@/components/utterances';
import Tag from '@/components/tag';

interface Props {
  article: Article;
  suggestedArticles: Article[];
}

interface Routes extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps<Props, Routes> = async (
  context
) => {
  let slug = context.params?.slug;
  const article = allArticles.find((article) => article.slug === slug);

  if (!slug || !article) {
    return {
      notFound: true,
    };
  }

  const suggestedArticles = allArticles.slice(0, 2);

  return {
    props: {
      article,
      suggestedArticles,
    },
  };
};

export const getStaticPaths: GetStaticPaths<ParsedUrlQuery> = async (
  context
) => {
  const paths = allArticles.map((article) => article.url);

  return {
    paths,
    fallback: false,
  };
};

const Comment: NextPage<{ name: string; date: Date }> = ({
  name,
  date,
  children,
}) => {
  return (
    <div className="comment">
      <header className="comment-header">
        <div className="comment-name">{name}</div>
        <div className="comment-date">
          {dateFormat(date, 'yyyy-mm-dd hh:MM:ss')}
        </div>
      </header>
      <div className="comment-content">{children}</div>

      <style jsx>{`
        .comment {
          margin: 40px 0;
        }
        .comment-header {
        }
        .comment-content {
          margin: 20px 0;
        }
        .comment-name {
          margin: 10px 0;
        }
        .comment-date {
          margin: 10px 0;
          color: #999999;
          font-size: 0.9em;
        }
      `}</style>
    </div>
  );
};

const ArticlePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  article,
  suggestedArticles,
}) => {
  return (
    <>
      <Head>
        <title>{`${article.title} - ${Config.title}`}</title>
      </Head>
      <NextSeo
        title={article.title}
        description={Config.description}
        openGraph={{
          title: article.title,
          description: Config.description,
          locale: 'ko_KR',
          type: 'website',
        }}
        twitter={{
          handle: `${Config.author.twitter.handle}`,
          cardType: 'summary_large_image',
        }}
      />

      <article>
        <header className="post-header">
          <span className="post-category">{article.categories.join('/')}</span>
          <h1 className="post-title">
            <ArticleLink article={article}>
              <a>{article.title}</a>
            </ArticleLink>
          </h1>
          <div className="post-subtitle">{article.subtitle}</div>
          <div className="post-date">
            {dateFormat(article.date, 'yyyy-mm-dd hh:MM:ss')}
          </div>
          <div className="post-tags">
            {article.tags?.map?.((tag) => (
              <Tag key={tag} tag={tag}>
                {`#${tag}`}
              </Tag>
            ))}
          </div>
        </header>
        <main className="article">
          <div dangerouslySetInnerHTML={{ __html: article.body.html || '' }} />
        </main>
      </article>

      <hr />

      <Utterances />

      <hr />

      <h1>Latest</h1>
      <div className="post-suggestions">
        {suggestedArticles.map((article) => (
          <ArticleCard article={article} key={article._id} />
        ))}
      </div>

      <style jsx>{`
        .post-header {
          margin: 2rem 0;
        }
        .post-category {
          color: #666666;
        }
        .post-title {
          font-size: 2rem;
          margin-bottom: 0.3rem;
          font-weight: 700;
          color: var(--color-text-primary);
        }
        .post-subtitle {
          font-size: 1.3rem;
          margin-bottom: 0.3rem;
          font-weight: normal;
          color: var(--color-text-secondary);
        }
        .post-date {
          font-weight: normal;
          font-size: 1rem;
          margin-bottom: 0.3rem;
          color: var(--color-text-secondary);
        }
        .post-tags {
          margin-top: 1rem;
          margin-bottom: 0.3rem;
          display: flex;
          flex-wrap: wrap;
          row-gap: 0.3rem;
          column-gap: 0.3rem;
        }
        .post-suggestions {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          row-gap: 1.25rem;
          column-gap: 1.25rem;
          margin-top: 2rem;
          margin-bottom: 2rem;
        }
        hr {
          margin-top: 2rem;
          margin-bottom: 2rem;
        }
      `}</style>
    </>
  );
};

export default ArticlePage;
