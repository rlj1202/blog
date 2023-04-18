import { FC } from 'react';
import Link from 'next/link';

import TopbarMenu from './TopbarMenu';
import MenuToggle from './MenuToggle';
import ThemeToggle from './ThemeToggle';
import Search from './Search';

import Config from '@/config';

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
        <MenuToggle />
        <Search />
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Topbar;
