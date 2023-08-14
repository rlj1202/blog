import { Article } from 'contentlayer/generated';

import Articles from '@/components/theme/Articles';
import Paginator from '@/components/theme/Paginator';
import Heading from '@/components/theme/Heading';

import Config from '@/config';

import { getArticles } from '@/utils';
import { Metadata } from 'next';

interface CategoryTree {
  title: string;
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

function getPaths(
  categories: string[],
  node: CategoryTree
): { category: string; page: string }[] {
  const total = node.articles.length;
  const pages = Math.ceil(total / Config.articles.perPage);

  const paths: { category: string; page: string }[] = [];

  if (categories.length) {
    paths.push(
      ...[...Array.from(new Array(pages + 1).keys()).slice(1)].map((page) => ({
        category: categories.join('-'),
        page: `${page}`,
      }))
    );
  }

  Object.keys(node.children).forEach((child) => {
    paths.push(...getPaths([...categories, child], node.children[child]));
  });

  return paths;
}

export async function generateStaticParams() {
  const categoryTree: CategoryTree = {
    title: 'Categories',
    articles: [],
    children: {},
  };

  getArticles().forEach((article) =>
    add(categoryTree, article, article.categories)
  );

  const paths = getPaths([], categoryTree);

  return paths;
}

export async function generateMetadata({
  params,
}: {
  params: { category: string; page: string };
}): Promise<Metadata> {
  const categories = params.category.split('-');

  return {
    title: `${categories.join('/')} - ${Config.title}`,
  };
}

export default function Page({
  params,
}: {
  params: { category: string; page: string };
}) {
  const categories = params.category.split('-');
  const page = parseInt(params.page);

  const articles = getArticles().filter((article) => {
    if (article.categories.length !== categories.length) {
      return false;
    }
    return article.categories.every(
      (value, index) => categories[index] == value
    );
  });

  return (
    <>
      <div className="mb-16">
        <Heading>{categories.join('/')}</Heading>
      </div>

      <div className="mb-16">
        <Articles
          articles={articles.slice(
            Config.articles.perPage * (page - 1),
            Config.articles.perPage * page
          )}
        />
      </div>

      <Paginator
        curPage={page}
        pages={Math.ceil(articles.length / Config.articles.perPage)}
        pageUrl={(page) => `/categories/${categories.join('/')}/pages/${page}`}
      />
    </>
  );
}
