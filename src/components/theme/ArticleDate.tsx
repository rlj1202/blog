import { FC } from 'react';
import ClockIcon from '../icons/ClockIcon';

const ArticleDate: FC<{ date: Date }> = ({ date }) => {
  return (
    <div className="flex flex-row items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
      <ClockIcon className="w-4" />
      {new Intl.DateTimeFormat('ko-KR').format(date)}
    </div>
  );
};

export default ArticleDate;
