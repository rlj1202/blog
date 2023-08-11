import { FC } from 'react';

import { Article } from 'contentlayer/generated';

import ArticleCard from './ArticleCard';

const Articles: FC<{ articles: Article[] }> = ({ articles }) => {
  return (
    <div className="relative mr-2">
      <div className="absolute translate-x-1/2 w-[2px] h-full top-0 right-0 bg-gray-500 dark:bg-gray-400 rounded-full"></div>

      {articles.map((article) => (
        <ArticleCard key={article._id} article={article} />
      ))}
    </div>
  );
};

export default Articles;
