import { MetadataRoute } from 'next';
import { getAllCases } from '@/lib/cases';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.artfcl.com';

  // Static core routes
  const routes = [
    '',
    '/works',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic Case Study routes
  const cases = getAllCases();
  const caseRoutes = cases.map((caseItem) => ({
    url: `${baseUrl}/works/${caseItem.slug}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }));

  return [...routes, ...caseRoutes];
}