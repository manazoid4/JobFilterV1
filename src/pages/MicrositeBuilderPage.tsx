'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

import { encodeProfile, micrositeLink, slugify, type MicrositeProfile } from '../lib/microsite';

type Result = { link: string; slug: string; clean: boolean };

// Builder: a firm fills a few fields and reserves a page.
// Primary path persists to the DB and returns a clean root URL
// (jobfilter.uk/{slug}); if the DB isn't configured it falls back to a
// self-contained URL-param link at /pro/{slug}.
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
  const [result, setResult] = useState<Result | null>(null);
  const [status, setStatus] = useState<'idle' | 'working' | 'error'>('idle');
  const [copied, setCopied] = useState(false);

  const slug = useMemo(() => slugify(form.name), [form.name]);
  const origin = typeof window === 'undefined' ? 'https://jobfilter.uk' : window.location.origin;

  function update(field: keyof MicrositeProfile, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setResult(null);
    setCopied(false);
  }

  function fallbackResult(): Result {
    return { link: micrositeLink(origin, slug, form), slug, clean: false };
  }

  async function createPage() {
    if (!slug) return;
    setStatus('working');
    setCopied(false);
    try {
      const res = await fetch('/api/microsites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (data?.ok && data?.slug) {
        setResult({ link: `${origin}/${data.slug}`, slug: data.slug, clean: true });
      } else if (res.status === 409 && data?.error && data.error !== 'not_configured') {
        setStatus('error');
        return;
      } else {
        // Not configured or unexpected — hand back a self-contained link.
        setResult(fallbackResult());
      }
      setStatus('idle');
    } catch {
      setResult(fallbackResult());
      setStatus('idle');
    }
  }

  async function copyLink() {
    if (!result) return;
    await navigator.clipboard.writeText(result.link);
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

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            className="jf-button bg-[var(--yellow)] text-[var(--ink)] disabled:opacity-50"
            onClick={() => void createPage()}
            disabled={!slug || status === 'working'}
          >
            {status === 'working' ? 'CREATING…' : 'CREATE MY PAGE →'}
          </button>
          {!slug ? <span className="text-sm font-bold text-[var(--muted)]">Enter your firm name to start.</span> : null}
          {status === 'error' ? (
            <span className="text-sm font-black text-[var(--orange)]">That name is taken or reserved — try a more specific firm name.</span>
          ) : null}
        </div>
      </section>

      {result ? (
        <section className="jf-box bg-[var(--navy)] p-6 text-white">
          <p className="micro-label text-[var(--yellow)]">YOUR SHAREABLE LINK</p>
          <div className="mt-4 break-all border-2 border-white/30 bg-white/10 p-4 text-base font-black sm:text-lg">
            {result.link}
          </div>
          {!result.clean ? (
            <p className="mt-2 text-xs font-bold text-white/70">
              Tip: this is a self-contained link. Your firm details travel inside it.
            </p>
          ) : null}
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <button className="jf-button bg-[var(--yellow)] text-[var(--ink)]" onClick={() => void copyLink()}>
              {copied ? 'COPIED' : 'COPY LINK'}
            </button>
            <a className="jf-button bg-white text-[var(--ink)]" href={`https://wa.me/?text=${encodeURIComponent(result.link)}`} target="_blank" rel="noreferrer">
              SHARE ON WHATSAPP →
            </a>
            <Link className="jf-button bg-[var(--ink)] text-white" href={result.clean ? `/${result.slug}` : `/pro/${result.slug}${encodeProfile(form)}`}>
              PREVIEW PAGE →
            </Link>
          </div>
        </section>
      ) : null}
    </main>
  );
}
