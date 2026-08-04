'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { decodeProfile, titleFromSlug, type MicrositeProfile } from '../lib/microsite';

// Public, shareable, DeWalt-branded firm page: jobfilter.uk/pro/{slug}
// Every page carries a "Powered by JobFilter" mark linking back with ?ref={slug}
// — the growth loop. Firm details ride in the shareable link (no login needed for
// this MVP); a dashboard-backed version with clean URLs is the next step.
export function MicrositePage() {
  const params = useParams();
  const slug = (params?.slug as string) || 'your-firm';
  const [profile, setProfile] = useState<MicrositeProfile | null>(null);

  useEffect(() => {
    setProfile(decodeProfile(window.location.search, slug));
  }, [slug]);

  const firm = profile ?? { name: titleFromSlug(slug), trade: '', areas: '', phone: '', whatsapp: '', years: '', blurb: '' };
  const telHref = firm.phone ? `tel:${firm.phone.replace(/[^\d+]/g, '')}` : '';
  const waHref = firm.whatsapp ? `https://wa.me/${firm.whatsapp.replace(/[^\d]/g, '')}` : '';

  return (
    <main className="page-shell grid gap-5 py-8 pb-24 md:pb-8">
      <section className="jf-box bg-[var(--navy)] p-7 text-white">
        <p className="micro-label text-[var(--yellow)]">{firm.trade ? firm.trade.toUpperCase() : 'TRADE PROFESSIONAL'}</p>
        <h1 className="headline mt-3 text-4xl leading-none sm:text-5xl md:text-6xl">{firm.name.toUpperCase()}</h1>
        {firm.areas ? (
          <p className="mt-4 text-lg font-black text-white/90">Covering {firm.areas}</p>
        ) : null}
        {firm.years ? (
          <p className="mt-1 text-sm font-bold uppercase tracking-wide text-white/70">{firm.years} years on the tools</p>
        ) : null}
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {telHref ? (
            <a className="jf-button bg-[var(--yellow)] text-[var(--ink)]" href={telHref}>
              CALL NOW →
            </a>
          ) : null}
          {waHref ? (
            <a className="jf-button bg-white text-[var(--ink)]" href={waHref} target="_blank" rel="noreferrer">
              WHATSAPP →
            </a>
          ) : null}
        </div>
      </section>

      {firm.blurb ? (
        <section className="jf-box bg-white p-6">
          <h2 className="headline text-2xl sm:text-3xl">WHAT WE DO</h2>
          <p className="mt-3 text-base font-bold leading-relaxed text-[var(--muted)]">{firm.blurb}</p>
        </section>
      ) : null}

      <section className="jf-box bg-white p-6">
        <h2 className="headline text-2xl sm:text-3xl">WHY TRUST THIS FIRM</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="border-2 border-[var(--line)] bg-[var(--bg-main)] p-4">
            <p className="text-sm font-black uppercase text-[var(--ink)]">Real trade</p>
            <p className="mt-1 text-sm font-bold text-[var(--muted)]">{firm.trade || 'Specialist trade'} work, done properly. No middlemen, no auction sites.</p>
          </div>
          <div className="border-2 border-[var(--line)] bg-[var(--bg-main)] p-4">
            <p className="text-sm font-black uppercase text-[var(--ink)]">Local</p>
            <p className="mt-1 text-sm font-bold text-[var(--muted)]">{firm.areas ? `Working across ${firm.areas}.` : 'Working in your area.'} Direct contact, quick response.</p>
          </div>
          <div className="border-2 border-[var(--line)] bg-[var(--bg-main)] p-4">
            <p className="text-sm font-black uppercase text-[var(--ink)]">Actively bidding public work</p>
            <p className="mt-1 text-sm font-bold text-[var(--muted)]">Qualifies real public and private opportunities with JobFilter — organised, not chaotic.</p>
          </div>
        </div>
      </section>

      {/* Powered-by mark = the growth loop. Links back with ?ref={slug}. */}
      <section className="jf-box bg-[var(--yellow)] p-6">
        <p className="micro-label text-[var(--ink)]">POWERED BY JOBFILTER</p>
        <p className="mt-2 text-base font-black leading-snug text-[var(--ink)] sm:text-lg">
          This page runs on JobFilter — the tool UK trades use to find and qualify real public work.
        </p>
        <Link className="jf-button mt-4 bg-[var(--ink)] text-white" href={`/?ref=${encodeURIComponent(slug)}`}>
          GET YOUR OWN FREE PAGE →
        </Link>
      </section>
    </main>
  );
}
