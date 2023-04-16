import Link from 'next/link';

import { Article } from 'contentlayer/generated';

const ArticleLink: React.FC<{ article: Article }> = ({ article, children }) => {
  return (
    <Link href={article.url} passHref legacyBehavior>
      {children}
    </Link>
  );
};

export default ArticleLink;
