import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { Article } from 'contentlayer/generated';
import { getArticles } from '@/utils';

import DefaultLayout from '@/components/theme/DefaultLayout';
import Heading from '@/components/theme/Heading';

import Config from '@/config';

interface Props {
  categoryTree: CategoryTree;
}

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

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const categoryTree: CategoryTree = {
    // title: 'Categories',
    articles: [],
    children: {},
  };

  getArticles().forEach((article) => {
    add(categoryTree, article, article.categories);
  });

  return {
    props: {
      categoryTree,
    },
  };
};

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
            <Link href={article.url} key={article._id}>
              <li key={article._id}>{article.title || article.slug}</li>
            </Link>
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

const Categories: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  categoryTree,
}) => {
  return (
    <DefaultLayout>
      <Head>
        <title>{`Categories - ${Config.title}`}</title>
      </Head>

      <div className="mb-16">
        <Heading>Categories</Heading>
      </div>

      <div className="prose dark:prose-invert">
        <CategoryList level={1} treeNode={categoryTree} />
      </div>
    </DefaultLayout>
  );
};

export default Categories;
