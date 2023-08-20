import { FC } from 'react';
import Link from 'next/link';

import TopbarMenu from './TopbarMenu';
import MenuToggle from './MenuToggle';
import ThemeToggle from './ThemeToggle';
import Search from './Search';

import Config from '@/config';

const Topbar: FC = () => {
  return (
    <div className="flex flex-row gap-2 justify-between py-10 items-center">
      <div className="flex flex-row font-bold text-2xl gap-2 items-center">
        <span className="w-4 h-4 rounded-full bg-red-500 inline-block align-middle"></span>
        <span className="align-middle text-black dark:text-gray-50">
          <Link href="/">{Config.title}</Link>
        </span>
      </div>
      <div className="hidden lg:flex flex-row flex-wrap gap-2 items-center justify-center">
        {Config.menus.map((menu) => (
          <Link key={menu.label} href={menu.path}>
            <TopbarMenu>{menu.label}</TopbarMenu>
          </Link>
        ))}
      </div>
      <div className="flex flex-row gap-x-2 items-center">
        <MenuToggle />
        <Search />
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Topbar;
