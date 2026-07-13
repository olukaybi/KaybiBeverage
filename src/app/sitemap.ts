import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.kayorawater.com';
  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/products`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/products/30cl`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/products/50cl`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/products/75cl`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/products/18-9l`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/products/18-9l-refill`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/our-water`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/quality-and-certifications`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/distribution`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/delivery-areas`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/tools/hydration`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/tools/event-water`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/legal`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/authentic`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.4 },
    { url: `${base}/distributor-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];
}
