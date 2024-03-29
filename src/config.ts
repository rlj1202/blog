const Config = {
  title: 'ryuollojy',
  description: 'rlj1202의 개발 블로그',
  keywords: '',
  copyright: `Copyright (c) ${new Date().getFullYear()}, Jisu Sim. All rights reserved.`,

  favicon: '/favicon.svg',

  tableOfContents: {
    label: 'Table of Contents',
  },

  rss: {
    rss2Path: '/rss/feed.xml',
    atom1Path: '/rss/atom.xml',
    json1Path: '/rss/feed.json',
  },

  sitemap: {
    path: '/sitemap.xml',
  },

  utterances: {
    repo: 'rlj1202/blog',
    issueTerm: 'pathname',
    theme: 'github-light',
    label: 'blog-comment',
  },

  menus: [
    {
      label: 'About',
      path: '/about',
    },
    {
      label: 'Tags',
      path: '/tags',
    },
    {
      label: 'Categories',
      path: '/categories',
    },
    {
      label: 'Archives',
      path: '/archives',
    },
    {
      label: 'Projects',
      path: '/projects',
    },
    {
      label: 'Guestbook',
      path: '/guestbook',
    },
  ],

  googleAnalyticsId: '',

  articles: {
    /** Used for pagination */
    perPage: 10,
  },

  author: {
    name: 'Jisu Sim',
    photo: './some_image.png',
    bio: 'developer',
    contacts: {
      email: 'rlj1202@gmail.com',
      github: 'https://github.com/rlj1202',
      twitter: 'https://twitter.com/jisoosim',
    },
    twitter: {
      handle: '@jisoosim',
    },
  },
};

export default Config;
