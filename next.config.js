const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
  PHASE_EXPORT,
  PHASE_PRODUCTION_SERVER,
} = require('next/constants');
const withImages = require('next-images');
const { withContentlayer } = require('next-contentlayer');

module.exports = (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    reactStrictMode: true,
    basePath: '',
    // can be accessed with 'process.env.customKey'
    env: {
      test: 'testtest',
    },
    images: {
      domains: ['blog.golang.org', 'cfile3.uf.tistory.com', 'i1.daumcdn.net'],
      // path: '',
      // loader: 'akamai',
    },
    async redirects() {
      return [];
    },

    webpack(config, options) {
      config.experiments = { topLevelAwait: true };
      return config;
    },
  };

  if (phase == PHASE_EXPORT) {
    // nextConfig.basePath = '/blog'
  }

  return withContentlayer(withImages(nextConfig));
};
