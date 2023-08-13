import Heading from '@/components/theme/Heading';

import { allProjects } from 'contentlayer/generated';

export default function Page() {
  return (
    <>
      <div className="mb-16">
        <Heading>Projects</Heading>
      </div>
      <p>{allProjects.map((project) => project.title)}</p>
    </>
  );
}
