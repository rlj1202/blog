import { allArticles } from 'contentlayer/generated';

export const getArticles = () => {
  const articles = allArticles
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
    .filter(
      (article) => process.env.NODE_ENV === 'development' || article.published
    );

  return articles;
};
