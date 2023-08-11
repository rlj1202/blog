import { FC, useState } from 'react';

import Container from '../Container';
import CommandIcon from '@/components/icons/CommandIcon';
import SearchIcon from '@/components/icons/SearchIcon';

const Search: FC = () => {
  const [searchShow, setSearchShow] = useState(false);

  const toggleSearchModal = () => {
    setSearchShow((value) => !value);
  };

  return (
    <div>
      <button onClick={toggleSearchModal}>
        <div className="hidden lg:flex border border-black dark:border-gray-50 rounded h-8 px-2 text-sm bg-gray-200 dark:bg-gray-700 flex-row items-center text-black dark:text-gray-50">
          <span className="pr-24 text-gray-500 dark:text-gray-400">
            Search...
          </span>
          <CommandIcon className="w-4 h-4" />
        </div>

        <div className="flex flex-row justify-center items-center lg:hidden border border-black dark:border-gray-50 rounded h-8 w-8 bg-gray-200 dark:bg-gray-700 text-black dark:text-gray-50">
          <SearchIcon className="w-4 h-4" />
        </div>
      </button>

      <div
        className={`${
          !searchShow ? '-translate-x-full' : 'translate-x-0'
        } z-10 fixed left-0 top-0 w-full h-full backdrop-blur-md bg-gray-200/70 dark:bg-gray-800/70 ease-in-out duration-200 transform`}
        onClick={toggleSearchModal}
      >
        <Container>
          <div className="py-12 space-y-4">
            <input
              className="w-full rounded p-2 border border-black"
              onClick={(e) => e.stopPropagation()}
            />
            <div>Not Implemented :D</div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Search;
