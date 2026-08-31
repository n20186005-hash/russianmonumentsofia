import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'The Russian Monument in Sofia – Visitor Guide',
    short_name: 'Russian Monument Sofia',
    description: 'Visitor guide to The Russian Monument in Sofia (Руски паметник), Sofia, Bulgaria.',
    start_url: '/bg',
    display: 'standalone',
    background_color: '#faf8f4',
    theme_color: '#234830',
    lang: 'bg-BG',
    icons: [
      { src: '/icons/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      {
        src: '/icons/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
    ],
  };
}
