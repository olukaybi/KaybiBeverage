import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/shop',
          '/cart',
          '/checkout',
          '/admin',
          '/terms',
          '/privacy',
          '/api/',
        ],
      },
      // Opt out of AI training crawlers
      { userAgent: 'GPTBot', disallow: '/' },
      { userAgent: 'Google-Extended', disallow: '/' },
      { userAgent: 'CCBot', disallow: '/' },
      { userAgent: 'anthropic-ai', disallow: '/' },
      { userAgent: 'ChatGPT-User', disallow: '/' },
      { userAgent: 'Omgilibot', disallow: '/' },
      { userAgent: 'FacebookBot', disallow: '/' },
    ],
    sitemap: 'https://www.kayorawater.com/sitemap.xml',
    host: 'https://www.kayorawater.com',
  };
}
