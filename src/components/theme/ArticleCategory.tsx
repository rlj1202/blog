import { FC } from 'react';
import Link from 'next/link';

import CategoryIcon from '../icons/CategoryIcon';

const ArticleCategory: FC<{ categories: string[] }> = ({ categories }) => {
  return (
    <div className="flex flex-row items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
      <CategoryIcon className="w-4" />
      <Link href={`/categories/${categories.join('-')}/pages/1`}>
        {categories.join('/')}
      </Link>
    </div>
  );
};

export default ArticleCategory;
