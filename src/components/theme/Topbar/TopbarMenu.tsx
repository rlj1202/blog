import { FC, PropsWithChildren } from 'react';

const TopbarMenu: FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div className="border border-black dark:border-gray-50 rounded h-8 px-5 text-sm flex flex-row items-center text-black dark:text-gray-50">
      {children}
    </div>
  );
};

export default TopbarMenu;
