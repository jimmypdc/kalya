import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';

/** Generates /robots.txt. */
export default function robots(): MetadataRoute.Robots {
  const base = siteConfig.url.replace(/\/$/, '');
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Keep transactional pages out of the index.
      disallow: ['/api/', '/donate/success', '/donate/cancel'],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
