'use client';

import { useTranslations, useMessages } from 'next-intl';
import type { ReactNode } from 'react';

export default function FacilitiesSection() {
  const t = useTranslations('facilities');
  const messages = useMessages() as any;
  const items = (messages?.facilities?.items || []) as Array<{
    name: string;
    description: string;
    hint: string;
  }>;

  const icons: ReactNode[] = [
    // Public restrooms
    <svg key="wc" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="7" r="3"/>
      <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
    </svg>,
    // Parking
    <svg key="parking" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="3" width="16" height="18" rx="2"/>
      <path d="M10 17V7h4a2.5 2.5 0 0 1 0 5h-4"/>
    </svg>,
    // Dining
    <svg key="dining" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 3v18"/>
      <path d="M5 10h4a2 2 0 0 0 0-4H5"/>
      <path d="M17 3c-2 2-2 6 0 8"/>
      <path d="M17 21V11c0-1-1-2-1-2"/>
    </svg>,
    // Lodging
    <svg key="lodging" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 21V9l10-5 10 5v12"/>
      <path d="M6 21v-6h12v6"/>
      <path d="M2 21h20"/>
    </svg>,
    // Shops
    <svg key="shops" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 7h16l-1 13H5L4 7z"/>
      <path d="M8 7a4 4 0 0 1 8 0"/>
    </svg>,
    // Fuel & charging
    <svg key="fuel" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 21V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v16"/>
      <path d="M6 10h8"/>
      <path d="M14 8h2a2 2 0 0 1 2 2v6a2 2 0 0 0 4 0V9l-3-4"/>
      <path d="M5 21h10"/>
    </svg>,
  ];

  return (
    <section className="section-padding" style={{ background: 'var(--bg-tertiary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        <p className="text-lg leading-relaxed mb-10" style={{ color: 'var(--text-secondary)' }}>
          {t('subtitle')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, i) => (
            <div
              key={i}
              className="rounded-xl p-5 flex flex-col"
              style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}
            >
              <div
                className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center mb-4"
                style={{ background: 'var(--accent)', color: 'white' }}
              >
                {icons[i] || <span className="font-bold">{i + 1}</span>}
              </div>
              <h3 className="font-display text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                {item.name}
              </h3>
              <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--text-secondary)' }}>
                {item.description}
              </p>
              <div
                className="mt-4 text-xs font-medium px-3 py-1.5 rounded-full self-start"
                style={{ background: 'var(--tag-bg)', color: 'var(--tag-text)' }}
              >
                {item.hint}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
