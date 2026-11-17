import type { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/config';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/about',
    '/services',
    '/pricing',
    '/contact',
    '/terms-and-conditions',
  ];

  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${SITE_CONFIG.siteUrl}${route}`,
    lastModified,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));
}
