import type {
  NextPage,
  GetStaticProps,
  GetStaticPaths,
  InferGetStaticPropsType,
} from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { ParsedUrlQuery } from 'querystring';

import { NextSeo } from 'next-seo';

import { useTheme } from 'next-themes';

import { Article } from 'contentlayer/generated';
import { getArticles } from '@/utils';

import Giscus from '@giscus/react';

import DefaultLayout from '@/components/theme/DefaultLayout';
import Heading from '@/components/theme/Heading';
import ArticleDate from '@/components/theme/ArticleDate';
import ArticleCategory from '@/components/theme/ArticleCategory';
import ArticleTags from '@/components/theme/ArticleTags';
import GoUp from '@/components/theme/GoUp';

import Config from '@/config';

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
  const article = getArticles().find((article) => article.slug === slug);

  if (!slug || !article) {
    return {
      notFound: true,
    };
  }

  const suggestedArticles = getArticles().slice(0, 2);

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
  const paths = getArticles().map((article) => article.url);

  return {
    paths,
    fallback: false,
  };
};

const ArticlePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  article,
  suggestedArticles,
}) => {
  const { theme } = useTheme();

  return (
    <DefaultLayout>
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

      <article className="mb-16">
        <header className="mb-16 space-y-4">
          <Heading>
            <Link href={article.url}>{article.title}</Link>
          </Heading>
          <h2 className="text-xl text-gray-800 dark:text-gray-300">
            {article.subtitle}
          </h2>
          <div className="flex flex-row flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400">
            <ArticleDate date={new Date(article.date)} />
            {article.categories && article.categories.length > 0 && (
              <ArticleCategory categories={article.categories} />
            )}
            {article.tags && article.tags.length > 0 && (
              <ArticleTags tags={article.tags} />
            )}
          </div>
        </header>
        <main
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: article.body.html || '' }}
        />
      </article>

      <div className="mb-16">
        <Giscus
          id="comments"
          repo="rlj1202/blog"
          repoId="MDEwOlJlcG9zaXRvcnkyMjg3OTc4MTY="
          category="Announcements"
          categoryId="DIC_kwDODaMteM4CS6FK"
          mapping="pathname"
          // strict="0"
          term="Welcome to @giscus/react component!"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="bottom"
          theme={theme}
          lang="ko"
          loading="lazy"
        />
      </div>

      <div className="flex flex-row justify-end">
        <GoUp />
      </div>

      {/* <h1>Latest</h1> */}
      {/* <div className="post-suggestions">
        {suggestedArticles.map((article) => (
          <ArticleCard article={article} key={article._id} />
        ))}
      </div> */}
    </DefaultLayout>
  );
};

export default ArticlePage;
