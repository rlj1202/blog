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

import ArticleList from '@/components/ArticleList';

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
    <>
      <Head>
        <title>{`${categories.join('/')} - ${Config.title}`}</title>
      </Head>

      <ArticleList
        title={categories.join('/')}
        curPage={page}
        pageUrl={(page) => `/categories/${categories.join('/')}/pages/${page}`}
        articles={articles}
      />
    </>
  );
};

export default Page;
