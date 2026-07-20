import type { Metadata } from 'next';
import Link from 'next/link';

import { formatReleaseDate, latestRelease, releases } from '../../src/lib/releases';

const PAGE_URL = 'https://jobfilter.uk/whats-new';

export const metadata: Metadata = {
  title: "What's New | JobFilter",
  description: 'See the latest live JobFilter improvements for finding, checking and acting on better construction leads.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "What's New at JobFilter",
    description: 'Real product improvements, explained for trades. No waffle.',
    type: 'website',
    url: PAGE_URL,
  },
};

export default function WhatsNewPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: "What's New at JobFilter",
    url: PAGE_URL,
    dateModified: latestRelease.publishedAt,
    hasPart: releases.map((release) => ({
      '@type': 'Article',
      headline: release.title,
      datePublished: release.publishedAt,
      url: `${PAGE_URL}#${release.id}`,
      description: release.summary,
    })),
  };

  return (
    <main className="pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
      />

      <section className="border-b-4 border-[var(--ink)] bg-[var(--yellow)]">
        <div className="page-shell py-12 sm:py-16">
          <p className="micro-label text-[var(--ink)]">PRODUCT UPDATES</p>
          <h1 className="headline mt-3 max-w-4xl text-5xl leading-none sm:text-7xl">WHAT&apos;S NEW.</h1>
          <p className="mt-4 max-w-2xl text-lg font-bold leading-snug text-[var(--ink)] sm:text-xl">
            Real improvements. No waffle. Every update below is live and backed by shipped work.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a className="jf-button bg-[var(--ink)] text-white" href={`#${latestRelease.id}`}>
              LATEST UPDATE →
            </a>
            <Link className="jf-button bg-white text-[var(--ink)]" href="/find-jobs">
              SCAN MY AREA FREE →
            </Link>
          </div>
        </div>
      </section>

      <div className="page-shell grid gap-8 py-10 lg:grid-cols-[250px_minmax(0,1fr)] lg:items-start">
        <nav aria-label="Release history" className="lg:sticky lg:top-32">
          <p className="micro-label text-[var(--muted)]">JUMP TO AN UPDATE</p>
          <ol className="mt-3 flex gap-2 overflow-x-auto pb-2 lg:grid lg:overflow-visible">
            {releases.map((release, index) => (
              <li key={release.id} className="shrink-0 lg:shrink">
                <a
                  href={`#${release.id}`}
                  className="flex min-h-11 min-w-48 items-center gap-3 border-2 border-[var(--line)] bg-white px-3 py-2 text-sm font-black uppercase text-[var(--ink)] shadow-[3px_3px_0_var(--line)] hover:bg-[var(--yellow)] focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[var(--orange)] lg:min-w-0"
                >
                  <span className="text-[var(--orange)]">{String(index + 1).padStart(2, '0')}</span>
                  <span>{formatReleaseDate(release.publishedAt)}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="grid min-w-0 gap-8">
          {releases.map((release, index) => (
            <article
              key={release.id}
              id={release.id}
              aria-labelledby={`${release.id}-title`}
              className="scroll-mt-36 border-2 border-[var(--line)] bg-white shadow-[6px_6px_0_var(--line)]"
            >
              <header className="border-b-2 border-[var(--line)] p-5 sm:p-7">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="border-2 border-[var(--line)] bg-[var(--yellow)] px-2 py-1 text-xs font-black uppercase text-[var(--ink)]">
                    {index === 0 ? 'LATEST' : 'UPDATE'}
                  </span>
                  <span className="border-2 border-[var(--green)] bg-[var(--green)]/10 px-2 py-1 text-xs font-black uppercase text-[var(--ink)]">
                    LIVE NOW
                  </span>
                  <time className="text-xs font-black uppercase text-[var(--muted)]" dateTime={release.publishedAt}>
                    {formatReleaseDate(release.publishedAt)}
                  </time>
                </div>
                <h2 id={`${release.id}-title`} className="headline mt-4 text-3xl leading-none sm:text-5xl">
                  {release.title}
                </h2>
                <p className="mt-3 max-w-3xl text-base font-bold leading-relaxed text-[var(--muted)] sm:text-lg">
                  {release.summary}
                </p>
              </header>

              <div className="grid gap-6 p-5 sm:p-7">
                {release.sections.map((section) => (
                  <section key={section.label} aria-labelledby={`${release.id}-${section.label.toLowerCase()}`}>
                    <h3 id={`${release.id}-${section.label.toLowerCase()}`} className="micro-label text-[var(--orange)]">
                      {section.label}
                    </h3>
                    <ul className="mt-3 grid gap-3">
                      {section.items.map((item) => (
                        <li key={item} className="flex gap-3 text-sm font-bold leading-relaxed text-[var(--ink)] sm:text-base">
                          <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 bg-[var(--yellow)] outline outline-2 outline-[var(--line)]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}

                <footer className="grid gap-3 border-t-2 border-[var(--rule)] pt-4 sm:grid-cols-2">
                  <div>
                    <p className="micro-label text-[var(--muted)]">AVAILABLE</p>
                    <p className="mt-1 text-sm font-black text-[var(--ink)]">{release.availability}</p>
                  </div>
                  <div>
                    <p className="micro-label text-[var(--muted)]">FOR</p>
                    <p className="mt-1 text-sm font-black text-[var(--ink)]">{release.audiences.join(' · ')}</p>
                  </div>
                </footer>
              </div>
            </article>
          ))}
        </div>
      </div>

      <section className="border-y-4 border-[var(--ink)] bg-[var(--navy)]">
        <div className="page-shell py-12 text-white">
          <p className="micro-label text-[var(--yellow)]">TRY THE LIVE PRODUCT</p>
          <h2 className="headline mt-2 max-w-3xl text-4xl leading-none sm:text-5xl">SEE WHAT CHANGED IN YOUR OWN POSTCODE.</h2>
          <p className="mt-3 max-w-2xl font-bold text-white/90">Run a free scan. No card needed.</p>
          <Link className="jf-button mt-6 bg-[var(--yellow)] text-[var(--ink)]" href="/find-jobs">
            SCAN MY AREA FREE →
          </Link>
        </div>
      </section>
    </main>
  );
}
