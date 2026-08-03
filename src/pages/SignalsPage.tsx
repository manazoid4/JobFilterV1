"use client";
import { useState } from 'react';
import Link from 'next/link';


const signals = [
  {
    source: 'SIGNAL 1 · PUBLIC CONTRACTS',
    name: 'COUNCIL AND GOVERNMENT WORK. OFFICIAL NOTICE.',
    description: 'Current Find a Tender notices for your trade and region. Official source, published value, deadline and buyer — before the closing date. Qualification check included.',
    trades: ['Building', 'Electrical', 'Plumbing', 'HVAC', 'Landscaping'],
    signalType: 'LIVE NOW',
    live: true,
  },
  {
    source: 'SIGNAL 2 · PLANNING',
    name: 'PLANNING APPROVED. BUILDER NOT PICKED.',
    description: 'Planning approval in your area. Project is past the idea stage — work is coming. Planned for a future release; not yet active.',
    trades: ['Building', 'Electrical', 'Plumbing', 'HVAC', 'Roofing', 'Carpentry', 'Landscaping', 'Painting'],
    signalType: 'PLANNED',
    live: false,
  },
  {
    source: 'SIGNAL 3 · ENERGY / EPC',
    name: 'LEGALLY FORCED TO UPGRADE.',
    description: 'Low-rated rental properties required to upgrade before re-letting. Retrofit demand from regulation deadlines. Planned for a future release.',
    trades: ['Electrical', 'Plumbing', 'HVAC', 'Building', 'Roofing'],
    signalType: 'PLANNED',
    live: false,
  },
  {
    source: 'SIGNAL 4 · PROPERTY SALES',
    name: 'JUST BOUGHT IT.',
    description: 'Recent property sales that may trigger renovation. Planned for a future release; not yet active.',
    trades: ['Building', 'Electrical', 'Plumbing', 'HVAC', 'Roofing', 'Carpentry', 'Landscaping', 'Painting'],
    signalType: 'PLANNED',
    live: false,
  },
  {
    source: 'SIGNAL 5 · NEW BUSINESS',
    name: 'NEW COMPANY. NEEDS A FIT-OUT.',
    description: 'New company registered in a sector that needs premises work. Planned for a future release.',
    trades: ['Building', 'Electrical', 'Plumbing', 'Carpentry'],
    signalType: 'PLANNED',
    live: false,
  },
  {
    source: 'SIGNAL 6 · HMO LICENSING',
    name: 'COMPLIANCE WORK INCOMING.',
    description: 'HMO licence activity pointing to fire safety, electrics, plumbing and compliance work. Planned for a future release.',
    trades: ['Electrical', 'Plumbing', 'Building', 'Carpentry', 'Painting'],
    signalType: 'PLANNED',
    live: false,
  },
  {
    source: 'SIGNAL 7 · BUILDING CONTROL',
    name: 'WORK HAS MOVED FROM IDEA TO SITE.',
    description: 'Building control notices for extensions, structural work and conversions. Planned for a future release.',
    trades: ['Building', 'Roofing', 'Electrical', 'Plumbing', 'Carpentry'],
    signalType: 'PLANNED',
    live: false,
  },
  {
    source: 'SIGNAL 8 · AUCTION PROPERTY',
    name: 'NEW OWNER NEEDS A FAST TURNAROUND.',
    description: 'Auction wins that signal refurb work. Planned for a future release.',
    trades: ['Building', 'Electrical', 'Plumbing', 'Roofing', 'Painting', 'Carpentry'],
    signalType: 'PLANNED',
    live: false,
  },
  {
    source: 'SIGNAL 9 · INSOLVENCY / VOID WORKS',
    name: 'SITES AND PREMISES NEED SOMEONE TO STEP IN.',
    description: 'Business distress and empty premises creating urgent work. Planned for a future release.',
    trades: ['Building', 'Electrical', 'Plumbing', 'Carpentry'],
    signalType: 'PLANNED',
    live: false,
  },
  {
    source: 'SIGNAL 10 · RETROFIT GRANTS',
    name: 'FUNDING CREATES THE DEADLINE.',
    description: 'Grant windows and funded upgrade programmes creating timed demand. Planned for a future release.',
    trades: ['HVAC', 'Electrical', 'Roofing', 'Building'],
    signalType: 'PLANNED',
    live: false,
  },
] as const;

type SignalType = 'LIVE NOW' | 'PLANNED';

const signalTypeStyle: Record<SignalType, string> = {
  'LIVE NOW': 'bg-[var(--yellow)] text-[var(--ink)]',
  'PLANNED': 'bg-[var(--muted)]/20 text-[var(--muted)]',
};

const tradeSignals: Array<{ trade: string; active: string[] }> = [
  { trade: 'Electrician', active: ['Planning', 'Contracts', 'Energy', 'Property Sales', 'New Business', 'HMO', 'Building Control', 'Retrofit Grants'] },
  { trade: 'Plumber',     active: ['Planning', 'Contracts', 'Energy', 'Property Sales', 'New Business', 'HMO', 'Building Control', 'Auction'] },
  { trade: 'Builder',     active: ['Planning', 'Contracts', 'Energy', 'Property Sales', 'New Business', 'HMO', 'Building Control', 'Auction', 'Insolvency', 'Retrofit Grants'] },
  { trade: 'Roofer',      active: ['Planning', 'Energy', 'Property Sales', 'Building Control', 'Auction', 'Retrofit Grants'] },
  { trade: 'HEATING',     active: ['Planning', 'Contracts', 'Energy', 'Property Sales', 'HMO', 'Retrofit Grants'] },
  { trade: 'Landscaper',  active: ['Planning', 'Contracts', 'Property Sales', 'Auction'] },
  { trade: 'Carpenter',   active: ['Planning', 'Property Sales', 'New Business', 'HMO', 'Building Control', 'Auction'] },
  { trade: 'Painter',     active: ['Planning', 'Property Sales', 'HMO', 'Auction', 'Insolvency'] },
];

const allSignalLabels = ['Planning', 'Contracts', 'Energy', 'Property Sales', 'New Business', 'HMO', 'Building Control', 'Auction', 'Insolvency', 'Retrofit Grants'];

const tradeToSignalLabel: Record<string, string> = {
  Electrician: 'Electrical',
  Plumber: 'Plumbing',
  Builder: 'Building',
  Roofer: 'Roofing',
  HEATING: 'HVAC',
  Landscaper: 'Landscaping',
  Carpenter: 'Carpentry',
  Painter: 'Painting',
};

export function SignalsPage() {
  const [trade, setTrade] = useState<string>('All Trades');
  const visibleSignals =
    trade === 'All Trades'
      ? signals
      : signals.filter((s) => (s.trades as readonly string[]).includes(tradeToSignalLabel[trade]));

  return (
    <main className="pb-8">

      {/* 1. Hero */}
      <section className="bg-[var(--navy)] border-b-4 border-[var(--line)]">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--yellow)]">INTELLIGENCE LAYER · CURRENT AND PLANNED SIGNALS</p>
          <h1 className="headline mt-5 max-w-4xl text-[clamp(2.25rem,8vw,7rem)] leading-[0.88] text-[var(--yellow)]">
            KNOW WHAT'S LIVE.<br />KNOW WHAT'S COMING.
          </h1>
          <p className="mt-6 max-w-2xl text-xl font-bold leading-snug text-white/85">
            Find a Tender public contract notices are live now — scanned, qualified, and returned with a BID, WATCH, SUBCONTRACT or SKIP recommendation. Nine further signal types are in development and will be released as they become reliable.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link className="jf-button bg-[var(--yellow)] text-[var(--ink)]" href="/find-jobs">SCAN FREE — NO CARD NEEDED →</Link>
            <Link className="jf-button bg-white text-[var(--ink)]" href="/pricing">SEE PILOT PRICING →</Link>
          </div>
          <p className="mt-3 text-sm font-black text-white/60">Free scan of current public notices. No card needed. Founder pilot £39/mo.</p>
        </div>
      </section>

      {/* 2. Signals grid */}
      <section className="bg-[var(--bg-main)]">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--orange)]">TEN SIGNAL TYPES</p>
          <h2 className="headline mt-3 text-4xl leading-none md:text-5xl">PICK YOUR TRADE. SEE WHAT APPLIES TO YOU.</h2>
          <p className="mt-4 font-black text-[var(--muted)]">Filter by trade below — only signals relevant to your work.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {['All Trades', ...Object.keys(tradeToSignalLabel)].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTrade(t)}
                className={`border-2 border-[var(--line)] px-3 py-1.5 text-sm font-black uppercase ${
                  trade === t ? 'bg-[var(--yellow)] text-[var(--ink)]' : 'bg-white text-[var(--ink)] hover:bg-[var(--bg-main)]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {visibleSignals.map((s) => (
              <article key={s.name} className={`jf-box p-6 flex flex-col gap-4 ${s.live ? 'bg-white' : 'bg-[var(--paper)] opacity-70'}`}>
                <div>
                  <span className={`inline-block px-2 py-1 text-[0.65rem] font-black tracking-widest uppercase ${s.live ? 'bg-[var(--navy)] text-white' : 'bg-[var(--line)] text-[var(--muted)]'}`}>
                    {s.source}
                  </span>
                </div>
                <h3 className="headline text-3xl leading-none">{s.name}</h3>
                <p className="font-bold text-[var(--muted)] leading-snug">{s.description}</p>
                {s.live && (
                  <div className="flex flex-wrap gap-2">
                    {s.trades.map((t) => (
                      <span
                        key={t}
                        className="border border-[var(--line)] bg-[var(--bg-main)] px-2 py-0.5 text-xs font-black uppercase"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-auto pt-3 border-t-2 border-[var(--line)]">
                  <span className={`inline-block px-3 py-1 text-xs font-black uppercase tracking-wider ${signalTypeStyle[s.signalType]}`}>
                    {s.signalType}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 2b. Pricing bridge */}
      <section className="ops-strip border-y-4 border-[var(--line)] bg-[var(--yellow)]">
        <div className="page-shell flex flex-col items-center justify-between gap-4 py-5 sm:flex-row">
          <p className="text-base font-black text-[var(--ink)]">
            Public contract scan is live now. Further signals in development. Founder pilot from <span className="underline underline-offset-2">£39/month</span>. Free scan first — no card needed.
          </p>
          <div className="flex shrink-0 gap-3">
            <Link className="jf-button bg-[var(--ink)] px-4 py-2 text-sm text-white" href="/find-jobs">SCAN FREE →</Link>
            <Link className="jf-button bg-white px-4 py-2 text-sm text-[var(--ink)]" href="/pricing">SEE PRICING →</Link>
          </div>
        </div>
      </section>

      {/* 2c. Qualification layer */}
      <section className="border-b-4 border-[var(--line)] bg-white">
        <div className="page-shell section-pad">
          <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-stretch">
            <div>
              <p className="micro-label text-[var(--orange)]">QUALIFICATION LAYER</p>
              <h2 className="headline mt-3 text-5xl leading-none md:text-6xl">SKIP THE WRONG NOTICES.</h2>
              <p className="mt-4 max-w-3xl text-lg font-bold leading-tight text-[var(--ink)]/80">
                Every public notice is cross-checked against your firm profile — trade fit, delivery region, contract value range and procurement stage. Results show evidence and gaps before you commit bid time.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {['BID = fits your firm', 'WATCH = partial fit', 'SUBCONTRACT = route exists', 'SKIP = not your match'].map((label) => (
                  <span key={label} className="border-2 border-[var(--line)] bg-[var(--bg-main)] px-3 py-1 text-xs font-black uppercase text-[var(--ink)]">
                    {label}
                  </span>
                ))}
              </div>
            </div>
            <div className="jf-box bg-[var(--ink)] p-5 text-white">
              <p className="micro-label text-[var(--yellow)]">FREE TO TRY</p>
              <h3 className="headline mt-2 text-3xl leading-none text-white">RUN YOUR FIRST SCAN FREE.</h3>
              <p className="mt-3 text-sm font-bold text-white/85">
                No card needed. Enter your trade and postcode — see current public notices with evidence, fit check, and the official source link.
              </p>
              <Link className="jf-button mt-4 inline-block bg-[var(--yellow)] text-[var(--ink)]" href="/find-jobs">
                SCAN FREE NOW →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. How it works */}
      <section className="bg-[var(--bg-main)] border-y-4 border-[var(--line)]">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--orange)]">HOW IT WORKS — PUBLIC CONTRACTS (LIVE)</p>
          <h2 className="headline mt-3 text-5xl leading-none md:text-6xl">SCAN. QUALIFY. DECIDE.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ['STEP 1', 'DESCRIBE YOUR FIRM', 'Set your trade, delivery region, contract range, and whether you can bid directly or need a subcontract route.'],
              ['STEP 2', 'CHECK THE EVIDENCE', 'JobFilter compares current Find a Tender notices with your firm profile — buyer, scope, value, deadline, requirements, and missing evidence.'],
              ['STEP 3', 'CHOOSE NEXT ACTION', 'Decide BID, WATCH, SUBCONTRACT or SKIP. The recommendation is qualification support — not a guarantee of an award.'],
            ].map(([step, title, body]) => (
              <div key={step} className="jf-box bg-[var(--navy)] p-6 text-white">
                <p className="micro-label text-[var(--yellow)]">{step}</p>
                <h3 className="headline mt-3 text-3xl text-[var(--yellow)]">{title}</h3>
                <p className="mt-3 font-bold text-white/90">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Source status strip */}
      <section className="bg-[var(--ink)] border-b-4 border-[var(--line)]">
        <div className="page-shell py-5">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <span className="flex items-center gap-2 text-sm font-black uppercase text-white">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--yellow)] shadow-[0_0_6px_var(--yellow)]" />
              PUBLIC CONTRACTS (FTS) — LIVE
            </span>
            {['PLANNING', 'ENERGY', 'PROPERTY SALES', 'NEW BUSINESS', 'HMO', 'BUILDING CONTROL', 'AUCTION', 'INSOLVENCY', 'RETROFIT'].map((src) => (
              <span key={src} className="flex items-center gap-2 text-sm font-black uppercase text-white/40">
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                {src} — PLANNED
              </span>
            ))}
          </div>
          <p className="mt-3 text-xs font-black uppercase tracking-widest text-white/60">
            FIND A TENDER PUBLIC NOTICES LIVE · FURTHER SIGNAL TYPES IN DEVELOPMENT
          </p>
        </div>
      </section>

      {/* 5. Trade targeting */}
      <section className="bg-white border-b-4 border-[var(--line)]">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--orange)]">TRADE TARGETING · LIVE NOW</p>
          <h2 className="headline mt-3 text-5xl leading-none md:text-6xl">YOUR TRADE. MATCHED NOTICES.</h2>
          <p className="mt-4 max-w-2xl font-bold text-[var(--muted)]">
            Current Find a Tender notices are matched by CPV trade code, delivery region and contract range. Set your firm profile and see only the public contracts that fit.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tradeSignals.map(({ trade }) => (
              <article key={trade} className="jf-box bg-[var(--bg-main)] p-5">
                <h3 className="headline text-2xl">{trade}</h3>
                <p className="mt-3 text-sm font-bold text-[var(--muted)]">
                  Public contract notices matched by CPV code, region and contract value.
                </p>
                <div className="mt-4">
                  <span className="inline-block bg-[var(--yellow)] px-2 py-1 text-xs font-black uppercase text-[var(--ink)]">LIVE</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA */}
      <section className="bg-[var(--yellow)] border-t-4 border-[var(--line)]">
        <div className="page-shell section-pad text-center">
          <p className="micro-label text-[var(--ink)]">SCAN CURRENT PUBLIC NOTICES</p>
          <h2 className="headline mt-4 text-[clamp(2.25rem,8vw,6rem)] leading-[0.88] text-[var(--ink)]">
            CHECK WHAT'S LIVE FOR YOUR TRADE.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-xl font-bold text-[var(--ink)]">
            Enter your postcode and trade. JobFilter checks current Find a Tender notices and returns BID, WATCH, SUBCONTRACT or SKIP with source evidence. Free — no card needed.
          </p>
          <div className="mt-8">
            <Link className="jf-button bg-[var(--ink)] text-white" href="/find-jobs">
              RUN MY FREE SCAN →
            </Link>
          </div>
          <p className="mt-4 text-sm font-black text-[var(--ink)]">
            Free check of current notices. Pilot subscription £39/month after you confirm coverage fits your firm.
          </p>
          <p className="mt-2 text-sm font-black text-[var(--ink)]/60">Find a Tender is public. You pay for qualification and workflow, not access to notices.</p>
        </div>
      </section>

    </main>
  );
}
