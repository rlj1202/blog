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
    env: {},
    images: {},
    async redirects() {
      return [];
    },

    webpack(config, options) {
      return config;
    },
  };

  if (phase == PHASE_EXPORT) {
    // nextConfig.basePath = '/blog'
  }

  return withContentlayer(withImages(nextConfig));
};
