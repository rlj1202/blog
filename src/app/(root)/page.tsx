import { Metadata } from 'next';

import { getArticles } from '@/utils';

import Articles from '@/components/theme/Articles';
import SeeMore from '@/components/theme/SeeMore';
import Heading from '@/components/theme/Heading';

import Config from '@/config';

import generateRssFeed from '@/rssgen';

export const metadata: Metadata = {
  title: `Home - ${Config.title}`,
};

export default function Page() {
  const articles = getArticles().slice(0, 10);

  generateRssFeed(getArticles());

  return (
    <>
      <div className="mb-16">
        <Heading>Latest</Heading>
      </div>

      <div className="mb-16">
        <Articles articles={articles} />
      </div>

      <div className="flex flex-row justify-end">
        <SeeMore />
      </div>
    </>
  );
}
