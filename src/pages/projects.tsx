import { NextPage } from 'next';
import Head from 'next/head';

import DefaultLayout from '@/components/theme/DefaultLayout';
import Heading from '@/components/theme/Heading';

import Config from '@/config';

const ProjectsPage: NextPage = () => {
  return (
    <DefaultLayout>
      <Head>
        <title>{`Projects - ${Config.title}`}</title>
      </Head>

      <div className="mb-16">
        <Heading>Projects</Heading>
      </div>

      <div className="">언젠간 여기에 내용을 채워 넣을 수 있을꺼야...</div>
    </DefaultLayout>
  );
};

export default ProjectsPage;
