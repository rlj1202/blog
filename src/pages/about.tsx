import type { NextPage } from 'next';
import Head from 'next/head';

import Config from '@/config';
import DefaultLayout from '@/components/theme/DefaultLayout';

const About: NextPage = () => {
  return (
    <DefaultLayout>
      <Head>
        <title>{`About - ${Config.title}`}</title>
      </Head>

      <h1 className="text-6xl font-extrabold mb-16 text-gray-900 dark:text-gray-50">
        <span className="relative after:absolute after:left-0 after:bottom-0 after:-z-10 after:w-full after:content-[''] after:h-7 after:bg-red-500/60 after:dark:bg-red-500/80">
          About
        </span>
      </h1>

      <div className="prose dark:prose-invert">
        <p>me</p>
      </div>
    </DefaultLayout>
  );
};

export default About;
