'use client';

import { FC } from 'react';
import { useTheme } from 'next-themes';

import MoonIcon from '@/components/icons/MoonIcon';
import SunIcon from '@/components/icons/SunIcon';

const ThemeToggle: FC = () => {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    if (resolvedTheme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <button onClick={toggleTheme}>
      <div className="border border-black dark:border-gray-50 rounded w-8 h-8 bg-gray-200 dark:bg-gray-700 text-black dark:text-gray-50">
        <div className="w-full h-full flex flex-row justify-center items-center">
          {resolvedTheme === 'light' ? (
            <MoonIcon className="w-4 h-4" />
          ) : (
            <SunIcon className="w-4 h-4" />
          )}
        </div>
      </div>
    </button>
  );
};

export default ThemeToggle;
