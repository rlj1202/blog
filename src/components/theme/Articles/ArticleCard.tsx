import { FC } from 'react';
import Link from 'next/link';

import { Article } from 'contentlayer/generated';

import { convert } from 'html-to-text';
import Tag from '../Tag';

const ArticleCard: FC<{ article: Article }> = ({ article }) => {
  return (
    <div className="relative mb-20 last:mb-0">
      <div className="flex flex-col-reverse lg:flex-row gap-5 mr-5">
        <div className="basis-0 grow">
          <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            <Link href={article.url}>{article.title}</Link>
          </h2>
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
        <div className="basis-1/5 flex flex-col gap-2 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex flex-row lg:flex-col gap-2">
            <div className="flex flex-row items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
                className="w-4"
              >
                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
              </svg>
              {new Intl.DateTimeFormat().format(new Date(article.date))}
            </div>
            {article.categories && article.categories.length > 0 && (
              <div className="flex flex-row items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="w-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H14a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 2 7h5.5V6A1.5 1.5 0 0 1 6 4.5v-1zM8.5 5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1zM0 11.5A1.5 1.5 0 0 1 1.5 10h1A1.5 1.5 0 0 1 4 11.5v1A1.5 1.5 0 0 1 2.5 14h-1A1.5 1.5 0 0 1 0 12.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm4.5.5A1.5 1.5 0 0 1 7.5 10h1a1.5 1.5 0 0 1 1.5 1.5v1A1.5 1.5 0 0 1 8.5 14h-1A1.5 1.5 0 0 1 6 12.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm4.5.5a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z"
                  />
                </svg>
                <Link
                  href={`/categories/${article.categories.join('-')}/pages/1`}
                >
                  {article.categories.join('/')}
                </Link>
              </div>
            )}
            <div className="flex flex-row flex-wrap gap-1 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
                className="w-4"
              >
                <path d="M3 2v4.586l7 7L14.586 9l-7-7H3zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2z" />
                <path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1v5.086z" />
              </svg>
              {article.tags?.map((tag) => (
                <Tag key={tag} tag={tag} />
              ))}
            </div>
          </div>
          {/* <div className="rounded bg-gray-200 dark:bg-gray-300 h-28 p-2"></div> */}
        </div>
      </div>
      <div className="absolute w-4 h-4 rounded-full border-2 border-gray-500 dark:border-gray-400 bg-white dark:bg-gray-900 right-0 top-0 translate-x-1/2"></div>
    </div>
  );
};

export default ArticleCard;
