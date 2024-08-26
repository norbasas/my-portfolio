module.exports = {
    siteUrl: process.env.SITE_URL || 'https://norbasas.vercel.app',
    generateRobotsTxt: true,
    robotsTxtOptions: {
      policies: [
        { userAgent: '*', disallow: '/' },
        { userAgent: '*', allow: '/$' },
        { userAgent: '*', allow: '/sitemap.xml' },
      ],
    },
  }
  