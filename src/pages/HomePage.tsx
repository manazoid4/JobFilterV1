"use client";
import Link from 'next/link';

import { AlertTriangle, Radio, ShieldCheck, Target, Users, Clock, TrendingUp, CheckCircle, Lock, FileText, Zap } from 'lucide-react';
import { WaitlistForm } from '../components/WaitlistForm';

const proofPoints = [
  'Official public tenders — free and public',
  'Firm-aware evidence and requirement checks',
  'BID, WATCH, SUBCONTRACT or SKIP',
  'No verified fit means an honest empty result',
];

const signalRows = [
  { source: 'FTS sample', signal: 'Electrical maintenance tender', trade: 'Electrical', value: 'Published value', decision: 'BID', location: 'Leeds' },
  { source: 'FTS sample', signal: 'Responsive roofing repairs', trade: 'Roofing', value: 'Published value', decision: 'WATCH', location: 'Portsmouth' },
  { source: 'FTS sample', signal: 'Building refurbishment works', trade: 'Building', value: 'Value range', decision: 'SUBCONTRACT', location: 'Birmingham' },
  { source: 'FTS sample', signal: 'Heating maintenance framework', trade: 'HVAC', value: 'Check notice', decision: 'SKIP', location: 'UK' },
];

const decisionChecks = [
  ['Trade and CPV fit', 'QUALIFICATION CHECK', '01'],
  ['Delivery location', 'QUALIFICATION CHECK', '02'],
  ['Deadline and stage', 'QUALIFICATION CHECK', '03'],
  ['Bid or subcontract route', 'NEXT ACTION', '04'],
] as const;

const trustedCities = ['Official source', 'Named buyer', 'CPV trade codes', 'Delivery evidence', 'Published deadline', 'Source link'];

function DecisionBadge({ decision }: { decision: string }) {
  return (
    <span className="inline-flex items-center border-2 border-[var(--line)] bg-[var(--yellow)] px-2 py-1 font-mono text-xs font-black text-[var(--ink)]">
      {decision}
    </span>
  );
}

export function HomePage() {
  return (
    <main className="bg-[var(--paper)] pb-0">
      {/* ── HERO ──────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b-4 border-[var(--line)] bg-[var(--ink)] text-white">
        {/* Radial gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(227,183,42,0.12)_0%,transparent_60%),radial-gradient(ellipse_at_80%_80%,rgba(197,70,42,0.08)_0%,transparent_50%)]" />

        {/* Floating signal bubbles */}
        <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
          <div className="absolute left-[8%] top-[18%] animate-[float_6s_ease-in-out_infinite] rounded-full border-2 border-[var(--yellow)] bg-[var(--yellow)] px-3 py-1.5 font-mono text-[11px] font-black uppercase text-[var(--ink)] shadow-[3px_3px_0_var(--yellow)]">
            Source: FTS
          </div>
          <div className="absolute right-[12%] top-[12%] animate-[float_7s_ease-in-out_infinite_1s] rounded-full border-2 border-[var(--yellow)] bg-[var(--yellow)] px-3 py-1.5 font-mono text-[11px] font-black uppercase text-[var(--ink)] shadow-[3px_3px_0_var(--yellow)]">
            CPV: Matched
          </div>
          <div className="absolute left-[5%] bottom-[22%] animate-[float_5s_ease-in-out_infinite_0.5s] rounded-full border-2 border-white/40 bg-white/10 px-3 py-1.5 font-mono text-[11px] font-black uppercase text-white/70">
            Deadline: Published
          </div>
          <div className="absolute right-[6%] bottom-[30%] animate-[float_8s_ease-in-out_infinite_2s] rounded-full border-2 border-[var(--orange)] bg-[var(--orange)]/15 px-3 py-1.5 font-mono text-[11px] font-black uppercase text-[var(--orange)]">
            Tender: Live
          </div>
        </div>

        <div className="page-shell relative grid gap-8 py-10 md:py-14 lg:grid-cols-[1fr_420px] lg:items-end">
          <div>
            <p className="micro-label text-[var(--yellow)]">PUBLIC-WORKS QUALIFICATION FOR 5–25-PERSON CONTRACTORS</p>
            <h1 className="headline mt-4 max-w-5xl text-[clamp(3rem,9vw,106px)] leading-[0.88] text-white break-words">
              KNOW WHICH PUBLIC WORKS OPPORTUNITIES FIT YOUR FIRM —{' '}
              <span style={{ color: 'var(--yellow)', display: 'inline' }}>AND WHICH TO SKIP.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-xl font-black leading-tight text-white/90 md:text-2xl">
              JobFilter scans current official tender notices and shows the evidence, missing requirements and next action: BID, WATCH, pursue a SUBCONTRACT route, or SKIP. Public tenders are free. Every result remains a public opportunity that other suppliers may pursue — no shared auction, no five-trade blast.
            </p>
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {proofPoints.map((point) => (
                <div key={point} className="border-2 border-white/25 bg-white/8 px-3 py-2 text-sm font-black uppercase text-white transition-colors hover:border-[var(--yellow)] hover:bg-[var(--yellow)]/15 hover:text-[var(--yellow)]">
                  {point}
                </div>
              ))}
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link className="jf-button bg-[var(--yellow)] text-[var(--ink)] text-lg px-8 py-4" href="/find-jobs">
                SCAN FREE — NO CREDIT CARD REQUIRED
              </Link>
              <div className="flex flex-wrap gap-4">
                <Link className="text-sm font-black text-white/80 underline underline-offset-2 hover:text-[var(--yellow)]" href="/methodology">
                  How it works →
                </Link>
                <Link className="text-sm font-black text-white/80 underline underline-offset-2 hover:text-[var(--yellow)]" href="/pricing">
                  Coverage & pricing →
                </Link>
              </div>
            </div>
            <p className="mt-3 text-sm font-black text-white/80">
              <Lock size={12} strokeWidth={3} className="inline mr-1" />
              Scan the current feed before deciding whether the coverage fits your firm.
            </p>
          </div>

          <aside className="ops-panel bg-[var(--steel)] p-4 text-white">
            <div className="flex items-center justify-between border-b-2 border-[var(--yellow)] pb-3">
              <p className="micro-label text-[var(--yellow)]">ILLUSTRATIVE PUBLIC-TENDER FORMATS</p>
            </div>
            <div className="mt-4 grid gap-3">
              {signalRows.map((row) => (
                <div key={row.signal} className="group border-2 border-white/15 bg-black/40 p-3 transition-colors hover:border-[var(--yellow)]/40 hover:bg-black/60">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-[0.1em] text-[var(--yellow)]">{row.source}</p>
                      <h2 className="mt-1 text-base font-black leading-tight text-white">{row.signal}</h2>
                    </div>
                    <DecisionBadge decision={row.decision} />
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-2 text-xs font-black uppercase text-white/70">
                    <span>{row.trade}</span>
                    <span className="text-center text-[var(--yellow)]">{row.location}</span>
                    <span className="text-right">{row.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {/* ── OPS STRIP ─────────────────────────────────── */}
      <section className="ops-strip">
        <div className="page-shell grid gap-3 py-4 text-sm font-black uppercase tracking-[0.08em] text-[var(--ink)] md:grid-cols-3">
          <span>Live coverage starts with official public opportunities</span>
          <span>Qualified by evidence, firm fit, region, value, and timing</span>
          <span>Empty scan means no verified match — never a made-up job</span>
        </div>
      </section>

      {/* ── SOCIAL PROOF + URGENCY ────────────────────── */}
      <section className="border-b-4 border-[var(--line)] bg-[var(--yellow)]">
        <div className="page-shell py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Users size={20} strokeWidth={3} className="text-[var(--ink)]" />
              <p className="text-sm font-black text-[var(--ink)]">
                Built for 5–25-person construction and maintenance firms that can bid or subcontract
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} strokeWidth={3} className="text-[var(--orange)]" />
              <p className="text-sm font-black text-[var(--ink)]">Coverage checked before paid activation</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPETITOR CONTRAST STRIP ─────────────────── */}
      <section className="border-b-4 border-[var(--line)] bg-white">
        <div className="page-shell py-10">
          <p className="micro-label text-[var(--orange)]">WHY JOBFILTER — VS. THE ALTERNATIVES</p>
          <h2 className="headline mt-3 text-3xl leading-none sm:text-4xl">GOLD LEADS ARE CONTROLLED BY TRADE, PATCH, AND TIMING — NO SHARED AUCTION, NO FIVE-TRADE BLAST.</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {[
              { name: 'Checkatrade', pain: 'Directory subscription + shared homeowner leads.', href: '/vs/checkatrade' },
              { name: 'MyBuilder', pain: 'Buy credits to unlock jobs already shown to five other trades.', href: '/vs/mybuilder' },
              { name: 'Bark', pain: 'Pay-per-lead auctions that quote you before the customer replies.', href: '/vs/bark' },
            ].map(({ name, pain, href }) => (
              <Link
                key={name}
                href={href}
                className="jf-box block bg-[var(--paper)] p-4 transition-colors hover:border-[var(--yellow)]"
              >
                <p className="micro-label text-[var(--muted)]">VS.</p>
                <p className="headline mt-2 text-2xl leading-none text-[var(--ink)]">{name}</p>
                <p className="mt-2 text-sm font-black text-[var(--muted)]">{pain}</p>
                <p className="mt-3 text-xs font-black uppercase tracking-wider text-[var(--ink)]">SEE THE DIFFERENCE →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEW: FREE TRADE PAGE LAUNCH ───────────────── */}
      <section className="border-b-4 border-[var(--line)] bg-[var(--navy)] text-white">
        <div className="page-shell grid gap-5 py-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <span className="inline-block border-2 border-[var(--yellow)] bg-[var(--yellow)] px-2 py-1 text-xs font-black uppercase text-[var(--ink)]">
              NEW
            </span>
            <h2 className="headline mt-3 text-3xl leading-none sm:text-4xl">GET YOUR OWN FREE TRADE PAGE.</h2>
            <p className="mt-3 max-w-2xl text-base font-bold text-white/90">
              A clean, shareable page for your firm in under a minute. Put it on quotes, WhatsApp, your van QR
              and socials — no login, no cost.
            </p>
          </div>
          <Link href="/microsite" className="jf-button bg-[var(--yellow)] text-[var(--ink)]">
            BUILD MY PAGE FREE →
          </Link>
        </div>
      </section>

      {/* ── TRUSTED BY ────────────────────────────────── */}
      <section className="border-b-2 border-[var(--line)] bg-white">
        <div className="page-shell py-8 text-center">
          <p className="micro-label text-[var(--muted)]">WHAT A CURRENT RESULT CAN PROVE</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            {trustedCities.map((city) => (
              <span key={city} className="border-2 border-[var(--line)] bg-[var(--paper)] px-4 py-2 font-mono text-sm font-black uppercase text-[var(--ink)] shadow-[2px_2px_0_var(--yellow)]">
                {city}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm font-bold text-[var(--muted)]">UK-wide coverage depends on what buyers publish in the current official tender feed.</p>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────── */}
      <section className="bg-[var(--paper)] border-b-2 border-[var(--line)]">
        <div className="page-shell py-14">
          <p className="micro-label text-[var(--orange)]">HOW IT WORKS</p>
          <h2 className="headline mt-3 text-4xl leading-none md:text-5xl">
            THREE STEPS. ZERO WASTE.
          </h2>
          <div className="mt-10 flex flex-col gap-0 divide-y-2 divide-[var(--line)] border-2 border-[var(--line)]">
            <div className="flex items-start gap-6 bg-[var(--yellow)] px-6 py-6">
              <span className="font-mono text-xs font-black text-[var(--ink)] pt-1">01</span>
              <div>
                <p className="headline text-xl text-[var(--ink)]">Describe your firm</p>
                <p className="mt-1 text-sm font-bold text-[var(--ink)]/70">Set services, delivery region, contract range and whether you can bid directly or need a subcontract route.</p>
              </div>
            </div>
            <div className="flex items-start gap-6 bg-[var(--ink)] px-6 py-6">
              <span className="font-mono text-xs font-black text-[var(--yellow)] pt-1">02</span>
              <div>
                <p className="headline text-xl text-white">Check the evidence and gaps</p>
                <p className="mt-1 text-sm font-bold text-white/60">JobFilter compares the public notice with your profile and exposes buyer, scope, value, deadline, requirements and missing evidence.</p>
              </div>
            </div>
            <div className="flex items-start gap-6 bg-white px-6 py-6">
              <span className="font-mono text-xs font-black text-[var(--ink)] pt-1">03</span>
              <div>
                <p className="headline text-xl text-[var(--ink)]">Choose the next action</p>
                <p className="mt-1 text-sm font-bold text-[var(--muted)]">Decide BID, WATCH, SUBCONTRACT or SKIP. A recommendation is qualification support, not a promise of an award.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DECISION CHECKS ───────────────────────────── */}
      <section className="border-y-4 border-[var(--line)] bg-[var(--yellow)]">
        <div className="page-shell grid gap-8 py-12 lg:grid-cols-[1fr_460px] lg:items-center">
          <div>
            <p className="micro-label text-[var(--ink)]">OPPORTUNITY QUALIFICATION</p>
            <h2 className="headline mt-3 text-5xl leading-none md:text-7xl">
              SPEND BID TIME ON THE RIGHT OPPORTUNITIES.
            </h2>
            <p className="mt-5 max-w-2xl text-xl font-black text-[var(--ink)]/75">
              JobFilter checks trade, delivery location, deadline, stage, buyer evidence and the likely route to market. It does not promise an award or exclusive access.
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <Link className="jf-button bg-[var(--ink)] text-white" href="/methodology">
                SEE THE METHOD →
              </Link>
              <Link className="jf-button bg-white text-[var(--ink)]" href="/find-jobs">
                SCAN FREE — NO CREDIT CARD REQUIRED
              </Link>
            </div>
          </div>
          <div className="grid gap-3">
            {decisionChecks.map(([name, status, step]) => (
                <article
                  key={name}
                  className="border-2 border-[var(--yellow)] bg-white p-4 text-[var(--ink)] shadow-[4px_4px_0_var(--yellow)]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <CheckCircle size={20} strokeWidth={3} className="shrink-0 text-[var(--green)]" />
                        <h3 className="headline text-2xl">{name}</h3>
                      </div>
                      <p className="mt-1 text-xs font-black uppercase tracking-[0.1em] text-[var(--orange)]">{status}</p>
                    </div>
                    <span className="border-2 border-[var(--line)] bg-[var(--yellow)] px-3 py-2 font-mono text-xl font-black">{step}</span>
                  </div>
                </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT YOU GET ─────────────────────────────── */}
      <section className="border-y-4 border-[var(--line)] bg-[var(--bg-main)]">
        <div className="page-shell py-14">
          <p className="micro-label text-[var(--green)]">WHAT YOU GET</p>
          <h2 className="headline mt-3 text-4xl leading-none sm:text-5xl">
            EVERYTHING INCLUDED. NO HIDDEN FEES.
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: ShieldCheck, title: 'Firm-aware fit', body: 'Services, region, contract range and delivery model shape every qualification.' },
              { icon: Target, title: 'Decision first', body: 'Every reviewed opportunity leads to BID, WATCH, SUBCONTRACT or SKIP.' },
              { icon: FileText, title: 'Requirement gaps', body: 'See what the notice proves and what your team still needs to verify.' },
              { icon: Zap, title: 'Official evidence', body: 'Buyer, scope, value, deadline and response route stay tied to the public source.' },
              { icon: TrendingUp, title: 'Outcome tracking', body: 'Record decisions and outcomes so future qualification can improve.' },
              { icon: Radio, title: 'Source health', body: 'Live source results stay separate from sample data, with empty and partial coverage reported honestly.' },
              { icon: Clock, title: 'Deadline context', body: 'Published deadlines and stages make the available response time visible.' },
              { icon: CheckCircle, title: 'Subcontract route', body: 'Flag opportunities that fit better through a principal contractor than a direct bid.' },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="jf-box bg-white p-5">
                <Icon size={22} strokeWidth={3} className="text-[var(--green)]" />
                <p className="headline mt-3 text-lg">{title}</p>
                <p className="mt-1 text-sm font-black text-[var(--muted)]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ──────────────────────────────── */}
      <section className="border-b-2 border-[var(--line)] bg-[var(--paper)]">
        <div className="page-shell py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src="/union-flag.svg" alt="" className="h-6 w-6 border border-[var(--line)]" aria-hidden="true" />
              <p className="text-sm font-black uppercase text-[var(--ink)]">Built for small UK contractors evaluating public works</p>
            </div>
            <div className="flex flex-wrap gap-4 text-xs font-black uppercase text-[var(--muted)]">
              <span>✓ Buyer and deadline context</span>
              <span>✓ Official source links</span>
              <span>✓ Coverage checked first</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ──────────────────────────────── */}
      <section className="relative overflow-hidden bg-[var(--ink)] text-white">
        {/* Diagonal stripe pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'repeating-linear-gradient(135deg, var(--yellow) 0px, var(--yellow) 2px, transparent 2px, transparent 14px)' }} aria-hidden="true" />
        {/* Yellow accent bar */}
        <div className="absolute left-0 top-0 h-full w-3 bg-[var(--yellow)]" aria-hidden="true" />

        <div className="page-shell relative grid gap-8 py-14 lg:grid-cols-[1fr_420px] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 border-2 border-[var(--orange)] bg-[var(--orange)]/15 px-3 py-1.5">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--orange)]" />
              <span className="font-mono text-xs font-black uppercase text-[var(--orange)]">Coverage-first activation</span>
            </div>
            <h2 className="headline mt-5 text-5xl leading-none md:text-7xl">
              ONE FIRM PROFILE.<br />CLEAR EVIDENCE.<br />BETTER BID DECISIONS.
            </h2>
            <p className="mt-3 text-lg font-bold text-white/70 max-w-lg">Official public tenders are a free source. JobFilter compares current notices with your firm before you decide where bid time belongs.</p>
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {[
                ['Public source', 'Every opportunity stays visible through its own official route.'],
                ['No fake results', 'Internal samples are blocked from live scans. Weak evidence can produce an honest empty result.'],
                ['Decision first', 'Review fit, evidence and gaps before choosing BID, WATCH, SUBCONTRACT or SKIP.'],
              ].map(([title, body]) => (
                <div key={title} className="border-2 border-white/20 bg-white/8 p-4 transition-colors hover:border-[var(--yellow)]/40 hover:bg-white/12">
                  <h3 className="headline text-2xl text-[var(--yellow)]">{title}</h3>
                  <p className="mt-2 font-bold text-white/72">{body}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="ops-panel bg-white p-5 text-[var(--ink)]">
            <div className="flex items-center gap-3 border-b-2 border-[var(--line)] pb-4">
              <AlertTriangle size={28} strokeWidth={3} />
              <div>
                <p className="micro-label text-[var(--orange)]">FOUNDER-ASSISTED PILOT</p>
                <h3 className="headline text-3xl">Check fit before payment.</h3>
              </div>
            </div>
            <p className="mt-4 text-base font-black text-[var(--muted)]">
              No fabricated live jobs and no promised volume. Pilot activation follows a real source-coverage and firm-fit check.
            </p>
            <Link href="/pricing" className="jf-button mt-5 block text-center bg-[var(--yellow)] text-[var(--ink)]">
              CHECK PILOT FIT & PRICING →
            </Link>
            <div className="mt-4 border-2 border-[var(--green)]/50 bg-[var(--green)]/10 px-4 py-3 text-sm font-black text-[var(--green)] text-center">
              ✓ PUBLIC OPPORTUNITIES — ACCESS IS NOT EXCLUSIVE
            </div>
            <p className="mt-3 text-center text-xs font-black uppercase tracking-wider text-[var(--muted)]">
              Not ready yet? Drop your email below.
            </p>
            <WaitlistForm source="home-tactical-2026-05-09" />
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
