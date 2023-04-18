import { FC } from 'react';
import Link from 'next/link';

const SeeMore: FC = () => {
  return (
    <div className="border border-black dark:border-gray-50 rounded px-8 py-2 text-sm font-bold text-black dark:text-gray-50">
      <span className="align-middle">
        <Link href="/pages/1">See more...⇒</Link>
      </span>
    </div>
  );
};

export default SeeMore;
