import Link from 'next/link';
import { FC, PropsWithChildren } from 'react';

import ChevronLeftIcon from '../icons/ChevronLeftIcon';
import ChevronRightIcon from '../icons/ChevronRightIcon';

const Button: FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div className="border border-black dark:border-gray-50 rounded px-4 h-8 text-black dark:text-gray-50 flex flex-row items-center justify-center">
      {children}
    </div>
  );
};

const Paginator: FC<{
  curPage: number;
  pages: number;
  pageUrl: (page: number) => string;
}> = ({ curPage, pages, pageUrl }) => {
  return (
    <div className="flex flex-row justify-center gap-2">
      <Button>
        <Link href={pageUrl(Math.max(curPage - 1, 1))}>
          <ChevronLeftIcon />
        </Link>
      </Button>
      {[...Array.from(Array(pages + 1).keys()).slice(1)].map((i) => (
        <Button key={i}>
          <Link href={pageUrl(i)}>{i}</Link>
        </Button>
      ))}
      <Button>
        <Link href={pageUrl(Math.min(curPage + 1, pages))}>
          <ChevronRightIcon />
        </Link>
      </Button>
    </div>
  );
};

export default Paginator;
