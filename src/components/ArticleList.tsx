import Paginator from '@/components/Paginator';
import ArticleCard from '@/components/ArticleCard';

import { Article } from 'contentlayer/generated';

import Config from '@/config';

const ArticleList: React.FC<{
  title?: string;
  curPage?: number;
  perPage?: number;
  pageUrl: (page: number) => string;
  articles: Article[];
}> = ({
  title,
  curPage = 1,
  perPage = Config.articles.perPage,
  pageUrl,
  articles,
}) => {
  var start = (curPage - 1) * perPage;

  return (
    <div className="main">
      <h1 className="title">{title}</h1>

      <div className="articles">
        {articles.slice(start, start + perPage).map((article) => (
          <ArticleCard key={article._id} article={article} />
        ))}
      </div>

      <Paginator
        curPage={curPage}
        total={articles.length}
        perPage={perPage}
        pageUrl={pageUrl}
      />

      <style jsx>{`
        .title {
          margin-top: 2rem;
          margin-bottom: 2rem;
        }
        .articles {
          display: flex;
          flex-wrap: wrap;
          row-gap: 40px;
          column-gap: 40px;
          margin: 40px 0;
        }
      `}</style>
    </div>
  );
};

export default ArticleList;