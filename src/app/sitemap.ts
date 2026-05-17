import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.kayorawater.com';
  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/our-water`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/shop`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/tools/hydration`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/tools/event-water`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/distribution`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ];
}
