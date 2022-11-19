import { NextPage, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import Config from '@/config';
import { generateRssFeed } from '@/rssgen';
import { generateSitemap } from '@/sitemapgen';

import ArticleCard from '@/components/articlecard';

import { allArticles, Article } from 'contentlayer/generated';

export const getStaticProps: GetStaticProps<{
  articles: Article[];
}> = async (context) => {
  generateRssFeed(allArticles);
  generateSitemap(allArticles);

  const articles = allArticles
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
    .slice(0, 10);

  return {
    props: {
      articles,
    },
  };
};

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  articles,
}) => {
  return (
    <>
      <Head>
        <title>{`Home - ${Config.title}`}</title>
      </Head>

      <main>
        <h1>Latest</h1>

        <div className="article-cards">
          {articles.map((article, index) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>

        <div className="bottom">
          <div className="readmore">
            <Link href="/pages/1">
              <a>
                All posts
                <i className="fas fa-chevron-right arrow"></i>
              </a>
            </Link>
          </div>
        </div>
      </main>

      <style jsx>{`
        .article-cards {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          row-gap: 1.25rem;
          column-gap: 1.25rem;
          margin: 2rem 0;
        }
        .bottom {
          display: flex;
          margin: 2rem 0;
          justify-content: right;
        }
        .arrow {
          margin-left: 0.5em;
        }
        .readmore {
          box-shadow: rgba(0, 0, 0, 0.05) 0 0 20px 5px;
          padding: 1em;
          background-color: var(--color-brand);
          color: white;
          font-size: 0.9em;
        }
      `}</style>
    </>
  );
};

export default Home;
