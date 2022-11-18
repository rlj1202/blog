import type { NextPage } from 'next';
import Head from 'next/head';

import Config from '@/config';

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>{`About - ${Config.title}`}</title>
      </Head>

      <div>
        <h1>About</h1>

        <p>me</p>
      </div>

      <style jsx>{``}</style>
    </>
  );
};

export default About;
