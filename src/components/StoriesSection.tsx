'use client';

import { useTranslations, useMessages } from 'next-intl';

export default function StoriesSection() {
  const t = useTranslations('stories');
  const messages = useMessages() as any;
  const items = (messages?.stories?.items || []) as Array<{
    title: string;
    content: string;
    tag: string;
  }>;

  return (
    <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-4xl mx-auto">
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

        <div className="space-y-6">
          {items.map((item, i) => (
            <div
              key={i}
              className="rounded-xl p-6"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <div className="flex items-center gap-4 mb-3">
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ background: 'var(--accent)', color: 'white' }}
                >
                  {i + 1}
                </div>
                <h3 className="font-display text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {item.title}
                </h3>
              </div>
              <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                {item.content}
              </p>
              <span
                className="inline-block text-xs font-medium px-3 py-1 rounded-full"
                style={{ background: 'var(--tag-bg)', color: 'var(--tag-text)' }}
              >
                {item.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
