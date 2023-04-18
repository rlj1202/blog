import Link from 'next/link';
import { FC, PropsWithChildren } from 'react';

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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
            />
          </svg>
        </Link>
      </Button>
      {[...Array.from(Array(pages + 1).keys()).slice(1)].map((i) => (
        <Button key={i}>
          <Link href={pageUrl(i)}>{i}</Link>
        </Button>
      ))}
      <Button>
        <Link href={pageUrl(Math.min(curPage + 1, pages))}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </Link>
      </Button>
    </div>
  );
};

export default Paginator;
