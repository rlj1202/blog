'use client';

import Giscus from '@giscus/react';

import { useTheme } from 'next-themes';

export default function Comments() {
  const { theme } = useTheme();

  return (
    <Giscus
      id="comments"
      repo="rlj1202/blog"
      repoId="MDEwOlJlcG9zaXRvcnkyMjg3OTc4MTY="
      category="Announcements"
      categoryId="DIC_kwDODaMteM4CS6FK"
      mapping="pathname"
      // strict="0"
      term="Welcome to @giscus/react component!"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="bottom"
      theme={theme === 'system' ? 'preferred_color_scheme' : theme}
      lang="ko"
      loading="lazy"
    />
  );
}
