import { FC, useState } from 'react';
import Container from '../Container';

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

        <div className="flex flex-row justify-center items-center lg:hidden border border-black dark:border-gray-50 rounded h-8 w-8 bg-gray-200 dark:bg-gray-700 text-black dark:text-gray-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
            className="w-4 h-4"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </div>
      </button>

      <div
        className={`${
          !searchShow ? '-translate-x-full' : 'translate-x-0'
        } z-10 fixed left-0 top-0 w-full h-full backdrop-blur-md bg-gray-200/70 dark:bg-gray-800/70 ease-in-out duration-200 transform`}
        onClick={toggleSearchModal}
      >
        <Container>
          <div className="py-12">Not Implemented :D</div>
        </Container>
      </div>
    </div>
  );
};

export default Search;
