import { FC } from 'react';
import Link from 'next/link';

import { Article } from 'contentlayer/generated';

import { convert } from 'html-to-text';

import ArticleDate from '../ArticleDate';
import ArticleCategory from '../ArticleCategory';
import ArticleTags from '../ArticleTags';

const ArticleCard: FC<{ article: Article }> = ({ article }) => {
  return (
    <div className="relative mb-20 last:mb-0">
      <div className="flex flex-col-reverse lg:flex-row gap-5 mr-5">
        <div className="basis-0 grow">
          <h2 className="text-3xl font-bold mb-2 text-gray-800 dark:text-gray-100">
            <Link href={article.url}>{article.title}</Link>
          </h2>
          <h3 className="text-lg mb-4 text-gray-700 dark:text-gray-200">
            {article.subtitle}
          </h3>
          <p className="text-justify break-all text-gray-700 dark:text-gray-300">
            {convert(article.body.html, {
              limits: { maxChildNodes: 10 },
              selectors: [
                { selector: 'img', format: 'skip' },
                { selector: 'a', options: { ignoreHref: true } },
                { selector: 'h1', options: { uppercase: false } },
                { selector: 'h2', options: { uppercase: false } },
                { selector: 'h3', options: { uppercase: false } },
                { selector: 'h4', options: { uppercase: false } },
                { selector: 'h5', options: { uppercase: false } },
                { selector: 'h6', options: { uppercase: false } },
                { selector: 'ul', options: { itemPrefix: ' - ' } },
              ],
            })}
          </p>
        </div>
        <div className="basis-1/5 flex flex-col gap-2">
          <div className="flex flex-row lg:flex-col gap-2 flex-wrap">
            {article.date && <ArticleDate date={new Date(article.date)} />}
            {article.categories && article.categories.length > 0 && (
              <ArticleCategory categories={article.categories} />
            )}
            {article.tags && article.tags.length > 0 && (
              <ArticleTags tags={article.tags} />
            )}
          </div>
          {/* <div className="rounded bg-gray-200 dark:bg-gray-300 h-28 p-2"></div> */}
        </div>
      </div>
      <div className="absolute w-4 h-4 rounded-full border-2 border-gray-500 dark:border-gray-400 bg-white dark:bg-gray-900 right-0 top-0 translate-x-1/2"></div>
    </div>
  );
};

export default ArticleCard;
