import { Fragment } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

import Heading from '@/components/theme/Heading';

import Config from '@/config';

import { getArticles } from '@/utils';

export const metadata: Metadata = {
  title: `Archives - ${Config.title}`,
};

export default function Page() {
  const articles = getArticles();

  const years = Array.from(
    new Set(articles.map((article) => new Date(article.date).getFullYear()))
  );

  return (
    <>
      <div className="mb-16">
        <Heading>Archives</Heading>
      </div>

      <div className="prose dark:prose-invert">
        {years.map((year) => (
          <Fragment key={year}>
            <h2>{year}</h2>

            <ul>
              {articles
                .filter(
                  (article) => new Date(article.date).getFullYear() == year
                )
                .map((article) => (
                  <li className="" key={article.slug}>
                    <Link href={article.url}>{article.title}</Link>
                  </li>
                ))}
            </ul>
          </Fragment>
        ))}
      </div>
    </>
  );
}
