import { FC } from 'react';

const GoUp: FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="border border-black dark:border-gray-50 rounded px-8 py-2 text-sm font-bold text-black dark:text-gray-50">
      <span className="align-middle">
        <button onClick={scrollToTop}>
          Go up <span className="animate-bounce inline-block">↑</span>
        </button>
      </span>
    </div>
  );
};

export default GoUp;
