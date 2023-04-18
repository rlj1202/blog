import Link from 'next/link';
import { FC } from 'react';

const Tag: FC<{ tag: string }> = ({ tag }) => {
  return (
    <div
      key={tag}
      className="border rounded px-1 py-0.5 break-all border-gray-500 dark:border-gray-400 text-xs text-gray-500 dark:text-gray-400"
    >
      <Link href={`/tags/${tag}/pages/1`}>#{tag}</Link>
    </div>
  );
};

export default Tag;
