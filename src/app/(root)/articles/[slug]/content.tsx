'use client';

import { useRef } from 'react';
import Link from 'next/link';

import { Article } from 'contentlayer/generated';

import Heading from '@/components/theme/Heading';
import ArticleDate from '@/components/theme/ArticleDate';
import ArticleCategory from '@/components/theme/ArticleCategory';
import ArticleTags from '@/components/theme/ArticleTags';
import Toc from '@/components/theme/Toc';

export default function Content({ article }: { article: Article }) {
  const contentRef = useRef<HTMLElement>(null);

  const getHeadings = (): Element[] => {
    if (!contentRef.current) return [];

    const queryResult = contentRef.current.querySelectorAll('h2, h3');

    return Array.from(queryResult);
  };

  return (
    <>
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
      <div className="flex flex-row gap-5">
        <main
          ref={contentRef}
          className="prose dark:prose-invert max-w-full basis-0 grow break-words text-justify"
          dangerouslySetInnerHTML={{ __html: article.body.html || '' }}
        />
        <div className="hidden xl:block basis-1/5">
          <div className="sticky top-10">
            <Toc getHeadings={getHeadings} />
          </div>
        </div>
      </div>
    </>
  );
}
