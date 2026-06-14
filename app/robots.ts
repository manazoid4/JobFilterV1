import type { MetadataRoute } from 'next';

const BASE_URL = 'https://jobfilter.uk';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/dashboard', '/account', '/leads', '/tradie-zone'],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
