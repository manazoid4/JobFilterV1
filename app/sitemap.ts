import type { MetadataRoute } from 'next';

const BASE_URL = 'https://jobfilter.co.uk';

// Static pages
const staticRoutes: { url: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }[] = [
  { url: '/', changeFrequency: 'weekly', priority: 1.0 },
  { url: '/find-jobs', changeFrequency: 'weekly', priority: 0.9 },
  { url: '/pricing', changeFrequency: 'monthly', priority: 0.9 },
  { url: '/features', changeFrequency: 'monthly', priority: 0.8 },
  { url: '/signals', changeFrequency: 'weekly', priority: 0.8 },
  { url: '/free-tools', changeFrequency: 'monthly', priority: 0.7 },
  { url: '/for-your-trade', changeFrequency: 'monthly', priority: 0.7 },
  { url: '/news', changeFrequency: 'weekly', priority: 0.6 },
  { url: '/faq', changeFrequency: 'monthly', priority: 0.6 },
  { url: '/methodology', changeFrequency: 'monthly', priority: 0.5 },
  { url: '/trust', changeFrequency: 'monthly', priority: 0.5 },
  { url: '/territories', changeFrequency: 'monthly', priority: 0.5 },
  { url: '/login', changeFrequency: 'yearly', priority: 0.3 },
  { url: '/signup', changeFrequency: 'yearly', priority: 0.4 },
  { url: '/privacy', changeFrequency: 'yearly', priority: 0.2 },
  { url: '/terms', changeFrequency: 'yearly', priority: 0.2 },
];

// Comparison pages (/vs/*)
const vsRoutes = [
  '/vs/bark',
  '/vs/mybuilder',
  '/vs/checkatrade',
  '/vs/trustatrader',
  '/vs/rated-people',
  '/vs/buildalert',
];

// Trade vertical pages
const tradeRoutes = [
  '/trade/plumbers',
  '/trade/electricians',
  '/trade/roofers',
  '/trade/builders',
  '/trade/decorators',
  '/trade/groundworkers',
  '/trade/scaffolders',
  '/trade/gas-engineers',
  '/trade/heat-pump-installers',
  '/trade/ev-charger-installers',
  '/trade/hvac-engineers',
  '/trade/solar-pv-installers',
  '/trade/smart-home-installers',
  '/trade/fire-safety',
  '/trade/cctv-security',
  '/trade/asbestos-surveyors',
  '/trade/damp-proofers',
  '/trade/data-cabling',
  '/trade/fibre-installers',
  '/trade/quantity-surveyors',
  '/trade/structural-engineers',
];

// City construction lead pages
const cityRoutes = [
  '/construction-leads/london',
  '/construction-leads/manchester',
  '/construction-leads/birmingham',
  '/construction-leads/leeds',
  '/construction-leads/bristol',
  '/construction-leads/glasgow',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...staticRoutes.map(({ url, changeFrequency, priority }) => ({
      url: `${BASE_URL}${url}`,
      lastModified: now,
      changeFrequency,
      priority,
    })),
    ...vsRoutes.map((route) => ({
      url: `${BASE_URL}${route}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...tradeRoutes.map((route) => ({
      url: `${BASE_URL}${route}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...cityRoutes.map((route) => ({
      url: `${BASE_URL}${route}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.65,
    })),
  ];
}
