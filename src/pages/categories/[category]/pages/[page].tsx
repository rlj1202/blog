import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';

import { Article } from 'contentlayer/generated';
import { getArticles } from '@/utils';

import DefaultLayout from '@/components/theme/DefaultLayout';
import Articles from '@/components/theme/Articles';
import Paginator from '@/components/theme/Paginator';

import Config from '@/config';

interface Props extends ParsedUrlQuery {
  category: string;
  page: string;
}

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
): { params: Props }[] {
  const total = node.articles.length;
  const pages = Math.ceil(total / Config.articles.perPage);

  const paths: { params: Props }[] = [];

  if (categories.length) {
    paths.push(
      ...[...Array.from(new Array(pages + 1).keys()).slice(1)].map((page) => ({
        params: {
          category: categories.join('-'),
          page: `${page}`,
        },
      }))
    );
  }

  Object.keys(node.children).forEach((child) => {
    paths.push(...getPaths([...categories, child], node.children[child]));
  });

  return paths;
}

export const getStaticProps: GetStaticProps<
  {
    categories: string[];
    page: number;
    articles: Article[];
  },
  Props
> = async (context) => {
  const { category, page } = context.params || {};

  if (!category || !page) {
    return {
      notFound: true,
    };
  }

  const categories = category.split('-');

  const articles = getArticles().filter((article) => {
    if (article.categories.length !== categories.length) {
      return false;
    }
    return article.categories.every(
      (value, index) => categories[index] == value
    );
  });

  return {
    props: {
      categories,
      page: parseInt(page),
      articles: articles,
    },
  };
};

export const getStaticPaths: GetStaticPaths<Props> = async () => {
  const categoryTree: CategoryTree = {
    title: 'Categories',
    articles: [],
    children: {},
  };

  getArticles().forEach((article) =>
    add(categoryTree, article, article.categories)
  );

  const paths = getPaths([], categoryTree);

  return {
    paths,
    fallback: false,
  };
};

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  categories,
  page,
  articles,
}) => {
  return (
    <DefaultLayout>
      <Head>
        <title>{`${categories.join('/')} - ${Config.title}`}</title>
      </Head>

      <h1 className="text-6xl font-extrabold mb-16 text-gray-900 dark:text-gray-50">
        <span className="relative after:absolute after:left-0 after:bottom-0 after:-z-10 after:w-full after:content-[''] after:h-7 after:bg-red-500/60 after:dark:bg-red-500/80">
          {categories.join('/')}
        </span>
      </h1>

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
    </DefaultLayout>
  );
};

export default Page;
