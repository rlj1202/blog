import { Metadata } from 'next';

import { getArticles } from '@/utils';

import Articles from '@/components/theme/Articles';
import Paginator from '@/components/theme/Paginator';
import Heading from '@/components/theme/Heading';

import Config from '@/config';

export async function generateStaticParams() {
  const tags = Array.from(
    new Set(
      getArticles()
        .map((article) => article.tags)
        .flat()
        .filter((tag): tag is string => tag !== undefined)
    )
  );

  const paths = (
    await Promise.all(
      tags.map(async (tag) => {
        let total = getArticles().filter((article) =>
          article.tags?.includes(tag)
        ).length;
        let pages = Math.ceil(total / Config.articles.perPage);

        return [...Array.from(new Array(pages + 1).keys()).slice(1)].map(
          (page) => ({
            tag,
            page: `${page}`,
          })
        );
      })
    )
  ).flat();

  return paths;
}

export async function generateMetadata({
  params,
}: {
  params: { tag: string; page: string };
}): Promise<Metadata> {
  const { tag } = params;

  return {
    title: `${tag} - ${Config.title}`,
  };
}

export default function Page({
  params,
}: {
  params: { tag: string; page: string };
}) {
  const { tag } = params;
  const curPage = parseInt(params.page);

  const articles = getArticles().filter((article) =>
    article.tags?.includes(tag)
  );

  return (
    <>
      <div className="mb-16">
        <Heading>{tag}</Heading>
      </div>

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
    </>
  );
}
