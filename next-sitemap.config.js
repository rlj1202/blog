/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.HOST || 'https://localhosts:3000',
  generatedRobotsTxt: true,
  // sitemapSize: 7000,
};
