import { FC } from 'react';

const MenuToggle: FC = () => {
  const toggleMenu = () => {};

  return (
    <div className="block lg:hidden">
      <div className="border border-black dark:border-gray-50 rounded w-8 h-8 text-sm bg-gray-200 dark:bg-gray-700 text-black dark:text-gray-50">
        <div className="w-full h-full flex flex-row justify-center items-center">
          <button onClick={toggleMenu}>
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
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuToggle;
