import { FC, PropsWithChildren } from 'react';

const Heading: FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <h1 className="text-6xl font-extrabold text-gray-900 dark:text-gray-50">
      <span className="bg-gradient-to-r bg-no-repeat bg-bottom bg-[length:100%_35%] from-red-500/60 to-red-500/60 dark:from-red-500/80 dark:to-red-500/80">
        {children}
      </span>
    </h1>
  );
};

export default Heading;
