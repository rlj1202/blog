import { Metadata } from 'next';

import Tag from '@/components/theme/Tag';
import Heading from '@/components/theme/Heading';

import Config from '@/config';

import { getArticles } from '@/utils';

export const metadata: Metadata = {
  title: `Tags - ${Config.title}`,
};

export default function Page() {
  const articles = getArticles();
  const tags = Array.from(
    new Set(
      getArticles()
        .map((article) => article.tags)
        .flat()
        .filter((tag): tag is string => tag !== undefined)
    )
  );

  return (
    <>
      <div className="mb-16">
        <Heading>Tags</Heading>
      </div>

      <div className="flex flex-row flex-wrap gap-1">
        {tags.map((tag) => (
          <Tag key={tag} tag={tag} />
          // <Tag key={tag} tag={tag}>
          //   {`#${tag} · ${
          //     articles.filter((article) => article.tags?.includes(tag)).length
          //   }`}
          // </Tag>
        ))}
      </div>
    </>
  );
}
