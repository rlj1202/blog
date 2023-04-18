import Link from 'next/link';
import { FC } from 'react';

import Config from '@/config';

import TopbarMenu from './TopbarMenu';
import MenuToggle from './MenuToggle';
import ThemeToggle from './ThemeToggle';

const Topbar: FC = () => {
  return (
    <div className="flex flex-row justify-between py-10 items-center">
      <div className="font-bold text-2xl">
        <span className="w-4 h-4 rounded-full bg-red-500 inline-block align-middle mr-2"></span>
        <span className="align-middle text-black dark:text-gray-50">
          <Link href="/">rlj1202</Link>
        </span>
      </div>
      <div className="hidden lg:flex flex-row gap-x-2 items-center">
        {Config.menus.map((menu) => (
          <TopbarMenu key={menu.label}>
            <Link href={menu.path}>{menu.label}</Link>
          </TopbarMenu>
        ))}
      </div>
      <div className="flex flex-row gap-x-2 items-center">
        <div className="hidden lg:flex border border-black dark:border-gray-50 rounded h-8 px-2 text-sm bg-gray-200 dark:bg-gray-700 flex-row items-center text-black dark:text-gray-50">
          <span className="pr-24 text-gray-500 dark:text-gray-400">
            Search...
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
            className="w-4 h-4"
          >
            <path d="M3.5 2A1.5 1.5 0 0 1 5 3.5V5H3.5a1.5 1.5 0 1 1 0-3zM6 5V3.5A2.5 2.5 0 1 0 3.5 6H5v4H3.5A2.5 2.5 0 1 0 6 12.5V11h4v1.5a2.5 2.5 0 1 0 2.5-2.5H11V6h1.5A2.5 2.5 0 1 0 10 3.5V5H6zm4 1v4H6V6h4zm1-1V3.5A1.5 1.5 0 1 1 12.5 5H11zm0 6h1.5a1.5 1.5 0 1 1-1.5 1.5V11zm-6 0v1.5A1.5 1.5 0 1 1 3.5 11H5z" />
          </svg>
        </div>
        <MenuToggle />
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Topbar;
