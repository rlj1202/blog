import { FC, useState } from 'react';
import Link from 'next/link';

import Container from '../Container';

import Config from '@/config';

const MenuToggle: FC = () => {
  const [menuShow, setMenuShow] = useState(false);

  const toggleMenu = () => {
    setMenuShow((value) => {
      return !value;
    });
  };

  return (
    <div className="block lg:hidden">
      <button onClick={toggleMenu}>
        <div className="border border-black dark:border-gray-50 rounded w-8 h-8 text-sm bg-gray-200 dark:bg-gray-700 text-black dark:text-gray-50">
          <div className="w-full h-full flex flex-row justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>
          </div>
        </div>
      </button>

      <div
        className={`backdrop-blur-md z-10 fixed top-0 left-0 w-full h-full bg-gray-200/70 dark:bg-gray-800/70 ease-in-out duration-200 transform ${
          !menuShow ? '-translate-x-full' : 'translate-x-0'
        }`}
        onClick={toggleMenu}
      >
        <Container>
          <div className="py-10 space-y-5">
            {Config.menus.map((menu) => (
              <div key={menu.label}>
                <Link href={menu.path}>
                  <span className="font-bold text-3xl underline text-black dark:text-gray-50">
                    {menu.label}
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default MenuToggle;
