import { Fragment } from 'react';
import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';

import ArticleLink from '@/components/articlelink';
import CategoryLink from '@/components/categorylink';

import { allArticles, Article } from 'contentlayer/generated';

import Config from '@/config';

interface Props {
  categoryTree: CategoryTree;
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

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const categoryTree: CategoryTree = {
    title: 'Categories',
    articles: [],
    children: {},
  };

  allArticles.forEach((article) => {
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
      <CustomTag className="title">{treeNode.title}</CustomTag>
      <ul>
        {treeNode.articles.map((article) => {
          return (
            <ArticleLink key={article._id} article={article}>
              <a>
                <li key={article._id}>{article.title || article.slug}</li>
              </a>
            </ArticleLink>
          );
        })}
      </ul>
      {Object.values(treeNode.children).map((child) => {
        return (
          <CategoryList key={child.title} level={level + 1} treeNode={child} />
        );
      })}

      <style jsx>{`
        .title {
          ${level === 1
            ? `
          margin-top: 2rem;
          margin-bottom: 2rem;
          `
            : ''}
        }
      `}</style>
    </div>
  );
};

const Categories: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  categoryTree,
}) => {
  return (
    <>
      <Head>
        <title>{`Categories - ${Config.title}`}</title>
      </Head>

      <CategoryList level={1} treeNode={categoryTree} />

      <style jsx>{``}</style>
    </>
  );
};

export default Categories;
