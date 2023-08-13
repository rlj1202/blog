import { Metadata } from 'next';

import GoUp from '@/components/theme/GoUp';

import Config from '@/config';

import { getArticles } from '@/utils';

import Comments from './comments';
import Content from './content';

export async function generateStaticParams() {
  return getArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = getArticles().find((article) => article.slug === params.slug);

  if (!article) {
    throw new Error(`Article "${params.slug}" not found`);
  }

  return {
    title: `${article.title} - ${Config.title}`,
    description: Config.description,
    openGraph: {
      title: article.title,
      description: Config.description,
      locale: 'ko_KR',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
    },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const article = getArticles().find((article) => article.slug === slug);

  // const suggestedArticles = getArticles().slice(0, 2);

  if (!article) {
    throw new Error(`Article "${slug}" not found`);
  }

  return (
    <>
      <article className="mb-16">
        <Content article={article} />
      </article>

      <div className="mb-16">
        <Comments />
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
    </>
  );
}
