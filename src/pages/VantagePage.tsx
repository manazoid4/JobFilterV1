"use client";
import Link from 'next/link';

import { WaitlistForm } from '../components/WaitlistForm';

const recentBids = [
  { age: '2 hours ago', title: 'Hackney High St — Retrofit', score: 88 },
  { age: 'Yesterday', title: 'Battersea Phase 4 — Electrical', score: 92 },
  { age: '3 days ago', title: 'Greenwich Loft — Carpentry', score: 74 },
];

const steps = [
  {
    n: '01',
    title: 'Ingest',
    body: 'Parses complex PDFs, extracting key requirements and hidden risks usually buried in fine print.',
  },
  {
    n: '02',
    title: 'Optimise',
    body: 'Cross-references current material market rates so your bid is competitive and profitable.',
  },
  {
    n: '03',
    title: 'Deploy',
    body: 'Fully formatted, professional bid deck ready to send to the main contractor.',
  },
];

export function VantagePage() {
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
              Vantage™ Engine
            </span>
            <h1
              className="headline"
              style={{ fontSize: 'clamp(36px, 6vw, 72px)', lineHeight: 1.0, color: 'var(--navy)' }}
            >
              Tenders to{' '}
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
                Bid Decks
              </span>
            </h1>
            <p className="max-w-md text-[17px] font-medium leading-[1.55] text-[var(--muted)]">
              Drop your tender documents. Get a properly structured bid deck in under a minute — no copy-paste, no blank-page terror.
            </p>
          </div>

          {/* Upload card — DEMO PREVIEW */}
          <div
            className="relative p-8"
            style={{
              background: 'var(--paper)',
              border: '2px solid var(--navy)',
              boxShadow: '8px 8px 0 var(--yellow)',
            }}
          >
            <div className="absolute top-3 right-3 px-2 py-1 text-[10px] font-black uppercase tracking-wider" style={{ background: 'var(--navy)', color: 'var(--yellow)' }}>
              DEMO PREVIEW
            </div>
            <div
              className="flex cursor-pointer flex-col items-center justify-center gap-4 p-12 text-center transition-colors hover:bg-white"
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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </div>
              <div>
                <h3 className="headline mb-1 text-[18px] uppercase text-[var(--navy)]">
                  Upload Tender Docs
                </h3>
                <p className="text-[14px] text-[var(--muted)]">Drop PDF, DOCX or scan photos of the job spec</p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-4 md:flex-row">
              <button
                className="flex w-full cursor-pointer items-center justify-center gap-3 px-8 py-4 transition-all active:translate-x-[2px] active:translate-y-[2px]"
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
                ⚡ Generate Bid Deck
              </button>
              <button
                className="flex w-full cursor-pointer items-center justify-center gap-3 px-8 py-4 transition-all active:translate-x-[2px] active:translate-y-[2px]"
                style={{
                  background: 'var(--paper)',
                  color: 'var(--navy)',
                  border: '2px solid var(--navy)',
                  boxShadow: '4px 4px 0 var(--navy)',
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: 16,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                📷 Scan Document
              </button>
            </div>
          </div>
        </section>

        {/* ── Bento grid ────────────────────────────── */}
        <div className="mb-10 grid gap-6 md:grid-cols-3">
          {/* Live generation */}
          <div
            className="p-6 md:col-span-2"
            style={{
              background: 'var(--paper)',
              border: '2px solid var(--navy)',
              boxShadow: '8px 8px 0 var(--yellow)',
            }}
          >
            <div className="mb-6 flex items-center justify-between">
              <h3 className="headline text-[18px] uppercase text-[var(--navy)]">Live Generation</h3>
              <span
                className="px-2 py-1 text-[11px] font-bold uppercase tracking-[0.1em]"
                style={{ background: 'var(--navy)', color: 'var(--yellow)' }}
              >
                ↻ Processing
              </span>
            </div>
            <div
              className="relative flex h-48 w-full flex-col justify-end gap-3 p-4"
              style={{ background: 'var(--offwhite)', border: '2px solid var(--navy)' }}
            >
              <div className="w-full">
                <div className="h-4 w-full" style={{ background: 'var(--paper)', border: '2px solid var(--navy)' }}>
                  <div className="h-full" style={{ width: '75%', background: 'var(--yellow)', borderRight: '2px solid var(--navy)' }} />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--navy)]">
                  Document: LND-CENTRAL-PLUMB-42.pdf
                </p>
                <p className="text-[10px] uppercase text-[var(--muted)]">
                  Extracting material costs, labour estimates, and compliance clauses...
                </p>
              </div>
            </div>
          </div>

          {/* Recent bids */}
          <div
            className="flex flex-col p-6"
            style={{
              background: 'var(--navy)',
              border: '2px solid var(--navy)',
              boxShadow: '8px 8px 0 var(--yellow)',
            }}
          >
            <h3 className="headline mb-6 text-[18px] uppercase text-[var(--yellow)]">Recent Bids</h3>
            <div className="flex flex-col gap-4">
              {recentBids.map((bid) => (
                <div
                  key={bid.title}
                  className="cursor-pointer pb-4"
                  style={{ borderBottom: '2px solid rgba(255,255,255,0.15)' }}
                >
                  <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--yellow)]">
                    {bid.age}
                  </p>
                  <h4 className="text-[13px] font-bold uppercase leading-tight text-white">
                    {bid.title}
                  </h4>
                  <p className="text-[10px] uppercase text-white/90">Success Score: {bid.score}%</p>
                </div>
              ))}
            </div>
            <button
              className="mt-auto flex items-center gap-2 pt-6 text-[var(--yellow)]"
              style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              View Archive →
            </button>
          </div>
        </div>

        {/* ── How It Works ──────────────────────────── */}
        <section className="mb-10">
          <h3
            className="headline mb-8 pl-4 text-[clamp(22px,3vw,32px)] uppercase text-[var(--navy)]"
            style={{ borderLeft: '8px solid var(--yellow)' }}
          >
            The Vantage™ Workflow
          </h3>
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="flex gap-4">
                <span
                  className="headline flex-shrink-0 leading-none"
                  style={{ fontSize: 56, color: 'var(--rule)', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800 }}
                >
                  {s.n}
                </span>
                <div>
                  <h4 className="headline mb-2 text-[17px] uppercase text-[var(--navy)]">{s.title}</h4>
                  <p className="text-[14px] leading-relaxed text-[var(--muted)]">{s.body}</p>
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
              Stop losing £1M bids to prettier firms. That's the Vantage™ fix.
            </h2>
            <p className="mt-3 text-[16px] leading-relaxed text-[var(--muted)]">
              Good tradesmen lose work when buyers can't see the value. Vantage closes the presentation gap without turning you into a marketing agency.
            </p>
            <Link href="/find-jobs" className="jf-button mt-6 inline-flex bg-[var(--yellow)] text-[var(--navy)]">
              Scan Jobs Free →
            </Link>
          </div>
          <WaitlistForm source="vantage" />
        </section>

        {/* ── Conversion CTA: Intake Engine ─────────── */}
        <section className="mt-10 jf-box bg-[var(--navy)] p-6 text-white">
          <p className="micro-label text-[var(--yellow)]">WANT LEADS TO BID ON?</p>
          <h2 className="headline mt-2 text-3xl leading-none text-[var(--yellow)]">TRY THE INTAKE ENGINE FREE.</h2>
          <p className="mt-3 max-w-xl font-black text-white/90">
            Vantage writes the bid. Intake finds the jobs worth bidding on. Real leads. Scored. Sent to your phone. No chasing. No competing.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link className="jf-button bg-[var(--yellow)] text-[var(--ink)]" href="/find-jobs">ENTER THE INTAKE →</Link>
            <Link className="jf-button bg-white text-[var(--ink)]" href="/pricing">SEE PRICING</Link>
          </div>
        </section>

        {/* ── Cross-Tool Navigation ─────────────────── */}
        <section className="mt-6 jf-box bg-white p-5">
          <p className="micro-label text-[var(--muted)]">TRY ANOTHER FREE TOOL</p>
          <div className="mt-3 flex flex-wrap gap-3">
            <Link className="jf-button text-sm !bg-transparent border-2 border-[var(--ink)] !text-[var(--ink)] hover:!bg-[var(--ink)] hover:!text-white transition-colors" href="/free-tools">
              ALL FREE TOOLS
            </Link>
            <Link className="jf-button text-sm !bg-transparent border-2 border-[var(--ink)] !text-[var(--ink)] hover:!bg-[var(--ink)] hover:!text-white transition-colors" href="/vicinity">
              VICINITY — PROOF GENERATOR
            </Link>
            <Link className="jf-button text-sm !bg-transparent border-2 border-[var(--ink)] !text-[var(--ink)] hover:!bg-[var(--ink)] hover:!text-white transition-colors" href="/smart-quote">
              SMART QUOTE STARTER
            </Link>
          </div>
        </section>
      </div>

    </main>
  );
}
