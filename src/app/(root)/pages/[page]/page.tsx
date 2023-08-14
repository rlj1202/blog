import { Metadata } from 'next';

import { getArticles } from '@/utils';

import Articles from '@/components/theme/Articles';
import Paginator from '@/components/theme/Paginator';
import Heading from '@/components/theme/Heading';

import Config from '@/config';

export async function generateStaticParams() {
  const total = getArticles().length;
  const pages = Math.ceil(total / Config.articles.perPage);

  return [...Array.from(new Array(pages + 1).keys()).slice(1)].map((i) => ({
    page: `${i}`,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { page: string };
}): Promise<Metadata> {
  const page = parseInt(params.page);

  return {
    title: `Page ${page} - ${Config.title}`,
  };
}

export default function Page({ params }: { params: { page: string } }) {
  const page = parseInt(params.page);

  const articles = getArticles();

  return (
    <>
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
    </>
  );
}
