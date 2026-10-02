import { useTranslations, useMessages } from 'next-intl';

export default function DistrictSection() {
  const t = useTranslations('krasnoSelo');
  const messages = useMessages() as any;
  const block = messages?.krasnoSelo as
    | { title?: string; content?: string; linkText?: string; linkUrl?: string }
    | undefined;

  if (!block?.title) return null;

  return (
    <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {block.title}
        </h2>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <p
          className="text-lg leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          {block.content}
        </p>

        {block.linkText && block.linkUrl && (
          <a
            href={block.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 text-sm font-medium transition-colors"
            style={{ color: 'var(--accent)' }}
          >
            {block.linkText}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        )}
      </div>
    </section>
  );
}
