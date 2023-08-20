import { Metadata } from 'next';

import { allProjects } from 'contentlayer/generated';

import Heading from '@/components/theme/Heading';

import Config from '@/config';
import ArticleTags from '@/components/theme/ArticleTags';
import Image from 'next/image';

export const metadata: Metadata = {
  title: `Projects - ${Config.title}`,
};

export default function Page() {
  return (
    <>
      <div className="mb-16">
        <Heading>Projects</Heading>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {allProjects.map((project) => {
          return (
            <div key={project._id} className="space-y-3">
              <div className="rounded bg-gray-200 dark:bg-gray-500 h-32 relative overflow-hidden border border-black dark:border-white">
                {project.image && (
                  <Image
                    src={project.image}
                    alt="Project cover image"
                    fill={true}
                    className="object-cover object-top"
                  />
                )}
              </div>
              {project.tags && project.tags.length > 0 && (
                <ArticleTags tags={project.tags} />
              )}
              <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                <a href={project.url} target="_blank">
                  {project.title}
                </a>
              </h3>
              <p></p>
              <div
                className="prose dark:prose-invert max-w-full"
                dangerouslySetInnerHTML={{ __html: project.body.html }}
              ></div>
            </div>
          );
        })}
      </div>
    </>
  );
}
