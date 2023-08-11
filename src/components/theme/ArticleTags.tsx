import { FC } from 'react';

import Tag from './Tag';
import TagIcon from '../icons/TagIcon';

const ArticleTags: FC<{ tags: string[] }> = ({ tags }) => {
  return (
    <div className="flex flex-row flex-wrap gap-1 items-center text-xs text-gray-500 dark:text-gray-400">
      <TagIcon className="w-4" />
      {tags.map((tag) => (
        <Tag key={tag} tag={tag} />
      ))}
    </div>
  );
};

export default ArticleTags;
