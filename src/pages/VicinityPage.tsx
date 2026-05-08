import { useState } from 'react';
import { Link } from 'react-router-dom';
import { WaitlistForm } from '../components/WaitlistForm';

const templates = [
  { id: 'whatsapp', label: 'WhatsApp Status', icon: '💬' },
  { id: 'instagram', label: 'Instagram Post', icon: '📷' },
  { id: 'review', label: 'Website Review', icon: '⭐' },
];

const recentProofs = [
  {
    id: 1,
    title: 'Dulwich Kitchen Fit',
    area: 'SE21',
    template: 'WhatsApp Status',
    img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80',
    age: '2 hours ago',
  },
  {
    id: 2,
    title: 'Brixton Bathroom Tile',
    area: 'SW9',
    template: 'Instagram Post',
    img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&q=80',
    age: 'Yesterday',
  },
  {
    id: 3,
    title: 'Peckham Full Rewire',
    area: 'SE15',
    template: 'Website Review',
    img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&q=80',
    age: '3 days ago',
  },
  {
    id: 4,
    title: 'Hackney Boiler Swap',
    area: 'E8',
    template: 'WhatsApp Status',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    age: '5 days ago',
  },
];

export function VicinityPage() {
  const [selectedTemplate, setSelectedTemplate] = useState('whatsapp');

  return (
    <main style={{ background: 'var(--offwhite)', minHeight: '100vh' }} className="pb-24 md:pb-0">
      <div className="page-shell py-10">

        {/* ── Hero ──────────────────────────────────── */}
        <section className="mb-10">
          <div className="mb-6 flex flex-col gap-2">
            <span
              className="inline-block w-fit px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em]"
              style={{ background: 'var(--navy)', color: 'var(--yellow)' }}
            >
              Vicinity™ Proof Generator
            </span>
            <h1
              className="headline"
              style={{ fontSize: 'clamp(36px, 6vw, 72px)', lineHeight: 1.0, color: 'var(--navy)' }}
            >
              Finished jobs into{' '}
              <span
                style={{
                  background: 'var(--yellow)',
                  border: '2px solid var(--navy)',
                  boxShadow: '4px 4px 0 var(--navy)',
                  display: 'inline-block',
                  padding: '0 8px 2px',
                  lineHeight: 1.05,
                }}
              >
                Local Proof
              </span>
            </h1>
            <p className="max-w-md text-[17px] font-medium leading-[1.55] text-[var(--muted)]">
              Turn photos from your camera roll into WhatsApp, social, and website assets that bring in better local work.
            </p>
          </div>

          {/* Upload + form card */}
          <div
            className="p-8"
            style={{
              background: 'var(--paper)',
              border: '2px solid var(--navy)',
              boxShadow: '8px 8px 0 var(--yellow)',
            }}
          >
            {/* Photo upload zone */}
            <div
              className="flex cursor-pointer flex-col items-center justify-center gap-4 p-10 text-center transition-colors hover:bg-white"
              style={{ border: '2px dashed var(--navy)', background: 'var(--offwhite)' }}
            >
              <div
                className="flex h-16 w-16 items-center justify-center"
                style={{
                  background: 'var(--yellow)',
                  border: '2px solid var(--navy)',
                  boxShadow: '4px 4px 0 var(--navy)',
                }}
              >
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="var(--navy)" strokeWidth={2}>
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 15l-5-5L5 21" />
                </svg>
              </div>
              <div>
                <h3 className="headline mb-1 text-[18px] uppercase text-[var(--navy)]">Upload Job Photos</h3>
                <p className="text-[14px] text-[var(--muted)]">Before & after shots, finished work, on-site photos</p>
              </div>
            </div>

            {/* Job summary */}
            <div className="mt-6">
              <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--navy)]">
                Job Summary
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Full kitchen refit in SE21. New units, worktops, and splashback. 4-day job."
                className="w-full resize-none px-4 py-3 text-[15px] text-[var(--navy)] outline-none"
                style={{
                  border: '2px solid var(--navy)',
                  background: 'var(--offwhite)',
                  fontFamily: 'Barlow, sans-serif',
                }}
              />
            </div>

            {/* Tag buttons */}
            <div className="mt-4 flex flex-wrap gap-3">
              {['📍 Add Location', '🏷️ Tag Services'].map((label) => (
                <button
                  key={label}
                  className="flex items-center gap-2 px-4 py-2 text-[13px] font-bold uppercase transition-all active:translate-y-[1px]"
                  style={{
                    border: '2px solid var(--navy)',
                    background: 'var(--paper)',
                    color: 'var(--navy)',
                    fontFamily: "'Barlow Condensed', sans-serif",
                    letterSpacing: '0.04em',
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Template selector */}
            <div className="mt-6">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--navy)]">
                Output Template
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                {templates.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTemplate(t.id)}
                    className="flex items-center gap-3 p-4 text-left transition-all"
                    style={{
                      border: '2px solid var(--navy)',
                      background: selectedTemplate === t.id ? 'var(--navy)' : 'var(--paper)',
                      color: selectedTemplate === t.id ? 'var(--yellow)' : 'var(--navy)',
                      boxShadow: selectedTemplate === t.id ? '4px 4px 0 var(--yellow)' : '4px 4px 0 var(--navy)',
                    }}
                  >
                    <span style={{ fontSize: 20 }}>{t.icon}</span>
                    <span
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 700,
                        fontSize: 14,
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {t.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Generate CTA */}
            <button
              className="mt-6 flex w-full cursor-pointer items-center justify-center gap-3 px-8 py-4 transition-all active:translate-x-[2px] active:translate-y-[2px]"
              style={{
                background: 'var(--navy)',
                color: 'var(--paper)',
                border: '2px solid var(--navy)',
                boxShadow: '4px 4px 0 var(--yellow)',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: 16,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              📲 Generate Proof
            </button>
          </div>
        </section>

        {/* ── Recent Proofs grid ─────────────────── */}
        <section className="mb-10">
          <h3
            className="headline mb-8 pl-4 text-[clamp(22px,3vw,32px)] uppercase text-[var(--navy)]"
            style={{ borderLeft: '8px solid var(--yellow)' }}
          >
            Recent Proofs
          </h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {recentProofs.map((proof) => (
              <div
                key={proof.id}
                className="cursor-pointer overflow-hidden transition-transform hover:-translate-y-1"
                style={{
                  border: '2px solid var(--navy)',
                  boxShadow: '6px 6px 0 var(--yellow)',
                  background: 'var(--paper)',
                }}
              >
                <img
                  src={proof.img}
                  alt={proof.title}
                  className="w-full object-cover"
                  style={{ height: 180, borderBottom: '2px solid var(--navy)' }}
                />
                <div className="p-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--muted)]">
                    {proof.age}
                  </p>
                  <h4 className="headline mt-1 text-[15px] uppercase text-[var(--navy)]">{proof.title}</h4>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span
                      className="px-2 py-[2px] text-[10px] font-bold uppercase"
                      style={{ background: 'var(--offwhite)', border: '1px solid var(--navy)', color: 'var(--navy)' }}
                    >
                      {proof.area}
                    </span>
                    <span
                      className="px-2 py-[2px] text-[10px] font-bold uppercase"
                      style={{ background: 'var(--yellow)', border: '1px solid var(--navy)', color: 'var(--navy)' }}
                    >
                      {proof.template}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────── */}
        <section className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
          <div
            className="p-7"
            style={{
              background: 'var(--paper)',
              border: '2px solid var(--navy)',
              boxShadow: '8px 8px 0 var(--yellow)',
            }}
          >
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
              Coming soon
            </p>
            <h2 className="headline text-[clamp(24px,3vw,36px)] uppercase text-[var(--navy)]">
              Stop letting good work die in your camera roll.
            </h2>
            <p className="mt-3 text-[16px] leading-relaxed text-[var(--muted)]">
              Every finished job is a sales asset. Vicinity™ turns your phone photos into professional local proof that brings in the next one.
            </p>
            <Link to="/intake-test" className="jf-button mt-6 inline-flex bg-[var(--yellow)] text-[var(--navy)]">
              Join waitlist for early access →
            </Link>
          </div>
          <WaitlistForm source="vicinity" />
        </section>
      </div>

    </main>
  );
}
