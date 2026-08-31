import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const BASE_URL = 'https://russianmonumentsofia.com';
const MAPS_URL = 'https://maps.app.goo.gl/ttYioBqpBgQfTTFy8';
const HERO_IMAGE = `${BASE_URL}/gallery/russian-monument-sofia-1.jpg`;

const ATTRACTION = {
  name: 'The Russian Monument in Sofia',
  shortName: 'Russian Monument',
  squareName: 'Russian Monument Square',
  localName: 'Руски паметник',
  city: 'Sofia',
  province: 'Sofia',
  country: 'Bulgaria',
  countryCode: 'BG',
  postalCode: '1606',
  streetAddress: 'blvd. "Makedonia" 51',
  latitude: 42.6922532,
  longitude: 23.3104319,
};

const HTML_LANG: Record<string, string> = {
  bg: 'bg-BG',
  en: 'en-US',
  zh: 'zh-CN',
};

const OG_LOCALE: Record<string, string> = {
  bg: 'bg_BG',
  en: 'en_US',
  zh: 'zh_CN',
};

const KEYWORDS = [
  'Russian Monument Sofia',
  'Russian Monument Square',
  'Руски паметник',
  'Sofia monuments',
  'Sofia travel guide',
  'Ploshtad Ruski Pametnik',
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;
  const url = `${BASE_URL}/${locale}`;

  return {
    metadataBase: new URL(BASE_URL),
    title: messages.meta.title,
    description: messages.meta.description,
    keywords: KEYWORDS,
    alternates: {
      canonical: url,
      languages: {
        bg: `${BASE_URL}/bg`,
        en: `${BASE_URL}/en`,
        zh: `${BASE_URL}/zh`,
        'x-default': `${BASE_URL}/bg`,
      },
    },
    openGraph: {
      title: messages.meta.title,
      description: messages.meta.description,
      url,
      siteName: ATTRACTION.name,
      locale: OG_LOCALE[locale] || 'en_US',
      type: 'website',
      images: [
        {
          url: HERO_IMAGE,
          width: 1200,
          height: 630,
          alt: `${ATTRACTION.name} - Main view in ${ATTRACTION.city}, ${ATTRACTION.country}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: messages.meta.title,
      description: messages.meta.description,
      images: [HERO_IMAGE],
    },
    icons: {
      icon: '/icons/icon.svg',
      apple: [{ url: '/gallery/russian-monument-sofia-1.jpg', sizes: 'any', type: 'image/jpeg' }],
    },
    manifest: '/manifest.webmanifest',
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = (await getMessages()) as any;
  const htmlLang = HTML_LANG[locale] || locale;
  const url = `${BASE_URL}/${locale}`;
  const faqItems: Array<{ question: string; answer: string }> = messages?.faq?.items || [];

  // ─── JSON-LD: Organization ───
  const organizationLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization`,
    name: `${ATTRACTION.name} – Independent Visitor Guide`,
    url: `${BASE_URL}/`,
    logo: `${BASE_URL}/icons/icon.svg`,
  };

  // ─── JSON-LD: WebSite ───
  const websiteLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    url: `${BASE_URL}/`,
    name: messages.meta.title,
    description: messages.meta.description,
    publisher: { '@id': `${BASE_URL}/#organization` },
    inLanguage: htmlLang,
  };

  // ─── JSON-LD: WebPage ───
  const webpageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}/#webpage`,
    url: `${url}/`,
    name: messages.meta.title,
    description: messages.meta.description,
    datePublished: '2026-08-31',
    dateModified: '2026-08-31',
    inLanguage: htmlLang,
    isPartOf: { '@id': `${BASE_URL}/#website` },
    primaryImageOfPage: { '@type': 'ImageObject', url: HERO_IMAGE },
  };

  // ─── JSON-LD: TouristAttraction ───
  const attractionLd = {
    '@context': 'https://schema.org',
    '@type': ['TouristAttraction', 'LandmarksOrHistoricalBuildings'],
    '@id': `${BASE_URL}/#attraction`,
    name: ATTRACTION.name,
    alternateName: [ATTRACTION.shortName, ATTRACTION.squareName, ATTRACTION.localName],
    description: `Historic monument in ${ATTRACTION.city}, ${ATTRACTION.country}, commemorating the Russo-Turkish War (1877-1878).`,
    url: `${BASE_URL}/`,
    image: [HERO_IMAGE],
    isAccessibleForFree: true,
    address: {
      '@type': 'PostalAddress',
      streetAddress: ATTRACTION.streetAddress,
      addressLocality: ATTRACTION.city,
      addressRegion: ATTRACTION.province,
      postalCode: ATTRACTION.postalCode,
      addressCountry: ATTRACTION.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: ATTRACTION.latitude,
      longitude: ATTRACTION.longitude,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
    hasMap: MAPS_URL,
    sameAs: [MAPS_URL, 'https://www.sofia.bg/', 'http://visitsofia.bg/'],
  };

  // ─── JSON-LD: BreadcrumbList ───
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: ATTRACTION.name, item: `${BASE_URL}/` },
      { '@type': 'ListItem', position: 2, name: ATTRACTION.city, item: `${BASE_URL}/${locale}/#map` },
      { '@type': 'ListItem', position: 3, name: ATTRACTION.country },
    ],
  };

  // ─── JSON-LD: FAQPage (from visible FAQ content) ───
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <html lang={htmlLang} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#234830" />
        <link rel="apple-touch-icon" href="/gallery/russian-monument-sofia-1.jpg" />

        {/* GA4 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-HXM22WWPKP" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-HXM22WWPKP');`,
          }}
        />

        {/* Theme init */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />

        {/* JSON-LD structured data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(attractionLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
        {faqItems.length > 0 && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
        )}

        {/* PWA service worker */}
        <script
          dangerouslySetInnerHTML={{
            __html: `if('serviceWorker' in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('/sw.js').catch(function(e){console.warn('Service worker registration failed:',e);});});}`,
          }}
        />
      </head>
      <body className="min-h-screen">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
