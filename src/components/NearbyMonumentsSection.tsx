'use client';

import { useTranslations, useMessages } from 'next-intl';

export default function NearbyMonumentsSection() {
  const t = useTranslations('nearbyMonuments');
  const messages = useMessages() as any;
  const items = (messages?.nearbyMonuments?.items || []) as Array<{
    name: string;
    distance: string;
    note: string;
  }>;

  return (
    <section className="section-padding" style={{ background: 'var(--bg-tertiary)' }}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        <p className="text-lg leading-relaxed mb-10" style={{ color: 'var(--text-secondary)' }}>
          {t('description')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {items.map((item, i) => (
            <div
              key={i}
              className="rounded-xl p-5 flex flex-col"
              style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mb-4"
                style={{ background: 'var(--accent)', color: 'white' }}
              >
                {i + 1}
              </div>
              <h3 className="font-display text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                {item.name}
              </h3>
              <div className="text-xs font-medium mb-3" style={{ color: 'var(--accent)' }}>
                {item.distance}
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {item.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
