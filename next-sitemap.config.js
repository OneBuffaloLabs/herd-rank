/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://herdrank.onebuffalolabs.com',
  generateRobotsTxt: true,
  trailingSlash: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
  outDir: './out',
};
