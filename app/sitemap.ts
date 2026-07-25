import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';

/** Generates /sitemap.xml for search engines. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, '');
  const routes = [
    '',
    '/story',
    '/memorial',
    '/buckle-up',
    '/scholarships',
    '/impact',
    '/pledge',
    '/donate',
    '/get-involved',
    '/privacy',
  ];

  // Static date keeps builds deterministic; update on meaningful content changes.
  const lastModified = new Date('2025-01-01');

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));
}
