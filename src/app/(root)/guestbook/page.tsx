import { Metadata } from 'next';

import Heading from '@/components/theme/Heading';

import Config from '@/config';
import Comments from '@/components/theme/Comments';

export const metadata: Metadata = {
  title: `Guestbook - ${Config.title}`,
};

export default function Page() {
  return (
    <>
      <div className="mb-16">
        <Heading>Guestbook</Heading>
      </div>

      <div className="mb-16 prose dark:prose-invert max-w-full">
        <p>싸이월드 느낌이 나는군요</p>
      </div>

      <Comments />
    </>
  );
}
