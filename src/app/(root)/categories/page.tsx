import { Metadata } from 'next';
import Link from 'next/link';

import { Article } from 'contentlayer/generated';
import { getArticles } from '@/utils';

import Heading from '@/components/theme/Heading';

import Config from '@/config';

interface CategoryTree {
  title?: string;
  articles: Article[];
  children: Record<string, CategoryTree>;
}

function add(node: CategoryTree, article: Article, categories: string[]) {
  if (categories.length === 0) {
    node.articles.push(article);
    return;
  }

  if (!node.children[categories[0]]) {
    node.children[categories[0]] = {
      title: categories[0],
      articles: [],
      children: {},
    };
  }

  add(node.children[categories[0]], article, categories.slice(1));
}

const CategoryList: React.FC<{
  level: number;
  treeNode: CategoryTree;
}> = ({ level, treeNode }) => {
  const CustomTag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <div>
      {treeNode.title && <CustomTag>{treeNode.title}</CustomTag>}
      <ul>
        {treeNode.articles.map((article) => {
          return (
            <li key={article._id}>
              <Link href={article.url}>{article.title || article.slug}</Link>
            </li>
          );
        })}
      </ul>
      {Object.values(treeNode.children).map((child) => {
        return (
          <CategoryList key={child.title} level={level + 1} treeNode={child} />
        );
      })}
    </div>
  );
};

export const metadata: Metadata = {
  title: `Categories - ${Config.title}`,
};

export default function Page() {
  const categoryTree: CategoryTree = {
    // title: 'Categories',
    articles: [],
    children: {},
  };

  getArticles().forEach((article) => {
    add(categoryTree, article, article.categories);
  });

  return (
    <>
      <div className="mb-16">
        <Heading>Categories</Heading>
      </div>

      <div className="prose dark:prose-invert">
        <CategoryList level={1} treeNode={categoryTree} />
      </div>
    </>
  );
}
