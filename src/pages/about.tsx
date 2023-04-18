import type { NextPage } from 'next';
import Head from 'next/head';

import DefaultLayout from '@/components/theme/DefaultLayout';
import Heading from '@/components/theme/Heading';

import Config from '@/config';

const About: NextPage = () => {
  return (
    <DefaultLayout>
      <Head>
        <title>{`About - ${Config.title}`}</title>
      </Head>

      <div className="mb-16">
        <Heading>About</Heading>
      </div>

      <div className="prose dark:prose-invert">
        <p>me</p>
      </div>
    </DefaultLayout>
  );
};

export default About;
