'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

import { encodeProfile, micrositeLink, slugify, type MicrositeProfile } from '../lib/microsite';

// Builder: a firm fills a few fields and gets a shareable /pro/{slug} link.
// No login for this MVP — the details ride in the link. Share it anywhere;
// every view carries the "Powered by JobFilter" mark and drives referrals back.
export function MicrositeBuilderPage() {
  const [form, setForm] = useState<MicrositeProfile>({
    name: '',
    trade: '',
    areas: '',
    phone: '',
    whatsapp: '',
    years: '',
    blurb: '',
  });
  const [copied, setCopied] = useState(false);

  const slug = useMemo(() => slugify(form.name), [form.name]);
  const origin = typeof window === 'undefined' ? 'https://jobfilter.uk' : window.location.origin;
  const link = slug ? micrositeLink(origin, slug, form) : '';

  function update(field: keyof MicrositeProfile, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setCopied(false);
  }

  async function copyLink() {
    if (!link) return;
    await navigator.clipboard.writeText(link);
    setCopied(true);
  }

  const fields: Array<{ key: keyof MicrositeProfile; label: string; placeholder: string; wide?: boolean }> = [
    { key: 'name', label: 'Firm name', placeholder: 'e.g. The Tradesmans' },
    { key: 'trade', label: 'Trade', placeholder: 'e.g. Electrician' },
    { key: 'areas', label: 'Areas covered', placeholder: 'e.g. Birmingham & West Midlands' },
    { key: 'phone', label: 'Phone', placeholder: 'e.g. 07123 456789' },
    { key: 'whatsapp', label: 'WhatsApp (if different)', placeholder: 'e.g. 447123456789' },
    { key: 'years', label: 'Years on the tools', placeholder: 'e.g. 12' },
    { key: 'blurb', label: 'One line about the firm', placeholder: 'e.g. Rewires, EV chargers, EICRs — done properly.', wide: true },
  ];

  return (
    <main className="page-shell grid gap-5 py-8 pb-24 md:pb-8">
      <section className="jf-box bg-white p-7">
        <p className="micro-label text-[var(--orange)]">YOUR FREE PAGE</p>
        <h1 className="headline mt-4 text-4xl leading-none sm:text-5xl md:text-6xl">BUILD YOUR TRADE PAGE.</h1>
        <p className="mt-4 max-w-2xl text-base font-bold leading-snug text-[var(--muted)] sm:text-lg">
          Fill this in and get a clean, shareable page for your firm. Put it on quotes, WhatsApp, your van QR
          and socials. It looks the part — and it&apos;s free.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {fields.map((f) => (
            <label key={f.key} className={f.wide ? 'sm:col-span-2 grid gap-1' : 'grid gap-1'}>
              <span className="text-sm font-black uppercase text-[var(--ink)]">{f.label}</span>
              <input
                className="border-2 border-[var(--line)] bg-[var(--bg-main)] p-3 text-base font-bold text-[var(--ink)] focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[var(--orange)]"
                value={form[f.key]}
                placeholder={f.placeholder}
                onChange={(e) => update(f.key, e.target.value)}
              />
            </label>
          ))}
        </div>
      </section>

      <section className="jf-box bg-[var(--navy)] p-6 text-white">
        <p className="micro-label text-[var(--yellow)]">YOUR SHAREABLE LINK</p>
        {link ? (
          <>
            <div className="mt-4 break-all border-2 border-white/30 bg-white/10 p-4 text-base font-black sm:text-lg">
              {link}
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <button className="jf-button bg-[var(--yellow)] text-[var(--ink)]" onClick={() => void copyLink()}>
                {copied ? 'COPIED' : 'COPY LINK'}
              </button>
              <a className="jf-button bg-white text-[var(--ink)]" href={`https://wa.me/?text=${encodeURIComponent(link)}`} target="_blank" rel="noreferrer">
                SHARE ON WHATSAPP →
              </a>
              <Link className="jf-button bg-[var(--ink)] text-white" href={`/pro/${slug}${encodeProfile(form)}`}>
                PREVIEW PAGE →
              </Link>
            </div>
          </>
        ) : (
          <p className="mt-4 text-base font-bold text-white/80">Enter your firm name to generate your link.</p>
        )}
      </section>
    </main>
  );
}
