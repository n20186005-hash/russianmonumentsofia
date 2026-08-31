import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://russianmonumentsofia.com';
  // Fixed build date to avoid drift between builds
  const lastModified = new Date('2026-08-31');

  const pages = ['', '/privacy-policy', '/terms-of-service', '/cookie-settings'];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const page of pages) {
      const url = `${baseUrl}/${locale}${page}`;

      const languages: Record<string, string> = {
        bg: `${baseUrl}/bg${page}`,
        en: `${baseUrl}/en${page}`,
        zh: `${baseUrl}/zh${page}`,
        'x-default': `${baseUrl}/bg${page}`,
      };

      entries.push({
        url,
        lastModified,
        changeFrequency: page === '' ? 'monthly' : 'yearly',
        priority: page === '' ? 1 : 0.5,
        alternates: {
          languages,
        },
      });
    }
  }

  return entries;
}
