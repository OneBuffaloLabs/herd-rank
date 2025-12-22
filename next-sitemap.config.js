/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://replace-with-your-site-url.com',
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
