"use client";
import { useState } from 'react';
import Link from 'next/link';


const signals = [
  {
    source: 'SIGNAL 1 · PLANNING',
    name: 'PLANNING APPROVED. BUILDER NOT PICKED.',
    description: 'A 4-bed extension approved this morning in your postcode. The homeowner hasn\'t called anyone yet. You get the alert. They don\'t.',
    trades: ['Building', 'Electrical', 'Plumbing', 'HVAC', 'Roofing', 'Carpentry', 'Landscaping', 'Painting'],
    signalType: 'BEFORE THE CALL',
    live: false,
  },
  {
    source: 'SIGNAL 2 · CONTRACTS',
    name: 'COUNCIL WORK. NO BIDDING WAR.',
    description: 'Council and government contracts for your trade, in your area, before the closing date. No directory. No middleman. Official notice, straight to your scan.',
    trades: ['Building', 'Electrical', 'Plumbing', 'HVAC', 'Landscaping', 'Roofing', 'Carpentry', 'Painting'],
    signalType: 'LIVE TENDER',
    live: true,
  },
  {
    source: 'SIGNAL 3 · ENERGY',
    name: 'LEGALLY FORCED TO UPGRADE. THEY NEED YOU.',
    description: 'Low-rated rental properties legally required to upgrade before they can be let. Landlords must act — JobFilter identifies them before they post anywhere. First trade to call wins.',
    trades: ['Electrical', 'Plumbing', 'HVAC', 'Building', 'Roofing'],
    signalType: 'LEGAL TRIGGER',
    live: false,
  },
  {
    source: 'SIGNAL 4 · PROPERTY SALES',
    name: 'JUST BOUGHT IT. HASN\'T CALLED ANYONE.',
    description: 'Property sold in your area in the last 30 days. New owner, likely renovation. No other tradesman knows yet — the sale only just cleared.',
    trades: ['Building', 'Electrical', 'Plumbing', 'HVAC', 'Roofing', 'Carpentry', 'Landscaping', 'Painting'],
    signalType: 'FRESH PURCHASE',
    live: false,
  },
  {
    source: 'SIGNAL 5 · NEW BUSINESS',
    name: 'NEW COMPANY. NEEDS A FIT-OUT.',
    description: 'New company registered in your postcode in a sector that needs premises work — restaurant, clinic, gym, office, retail. Before they\'ve searched for a tradesman.',
    trades: ['Building', 'Electrical', 'Plumbing', 'Carpentry'],
    signalType: 'NEW BUSINESS',
    live: false,
  },
  {
    source: 'SIGNAL 6 · HMO LICENSING',
    name: 'LANDLORD HAS TO BRING THE PROPERTY UP TO STANDARD.',
    description: 'HMO licence activity points to fire doors, alarms, electrics, plumbing, ventilation, repairs and compliance work before the landlord starts ringing round.',
    trades: ['Electrical', 'Plumbing', 'Building', 'Carpentry', 'Painting'],
    signalType: 'COMPLIANCE WORK',
    live: false,
  },
  {
    source: 'SIGNAL 7 · BUILDING CONTROL',
    name: 'WORK HAS MOVED FROM IDEA TO SITE.',
    description: 'Building control notices show projects that are past planning talk and closer to actual work: extensions, structural work, conversions, roof changes and inspections.',
    trades: ['Building', 'Roofing', 'Electrical', 'Plumbing', 'Carpentry'],
    signalType: 'SITE MOVEMENT',
    live: false,
  },
  {
    source: 'SIGNAL 8 · AUCTION PROPERTY',
    name: 'NEW OWNER NEEDS A FAST TURNAROUND.',
    description: 'Auction wins often mean refurb, clearance, roof, damp, electrics, heating and resale/rental deadlines. Good trades get in before the new owner starts searching.',
    trades: ['Building', 'Electrical', 'Plumbing', 'Roofing', 'Painting', 'Carpentry'],
    signalType: 'FAST TURNAROUND',
    live: false,
  },
  {
    source: 'SIGNAL 9 · INSOLVENCY / VOID WORKS',
    name: 'SITES AND PREMISES NEED SOMEONE TO STEP IN.',
    description: 'Business distress, empty premises and interrupted projects can create urgent make-safe, refit, repair and takeover work for local trades.',
    trades: ['Building', 'Electrical', 'Plumbing', 'Security', 'Carpentry'],
    signalType: 'URGENT TAKEOVER',
    live: false,
  },
  {
    source: 'SIGNAL 10 · RETROFIT GRANTS',
    name: 'FUNDING CREATES THE DEADLINE.',
    description: 'Grant windows, local retrofit schemes and funded upgrade programmes create timed demand for insulation, heating, solar, ventilation and electrical work.',
    trades: ['Insulation', 'HVAC', 'Electrical', 'Roofing', 'Building'],
    signalType: 'FUNDED UPGRADE',
    live: false,
  },
] as const;

type SignalType =
  | 'BEFORE THE CALL'
  | 'LIVE TENDER'
  | 'LEGAL TRIGGER'
  | 'FRESH PURCHASE'
  | 'NEW BUSINESS'
  | 'COMPLIANCE WORK'
  | 'SITE MOVEMENT'
  | 'FAST TURNAROUND'
  | 'URGENT TAKEOVER'
  | 'FUNDED UPGRADE';

const signalTypeStyle: Record<SignalType, string> = {
  'BEFORE THE CALL': 'bg-[var(--yellow)] text-[var(--ink)]',
  'LIVE TENDER': 'bg-[var(--yellow)] text-[var(--ink)]',
  'LEGAL TRIGGER': 'bg-[var(--orange)] text-white',
  'FRESH PURCHASE': 'bg-[var(--navy)] text-white',
  'NEW BUSINESS': 'bg-[var(--steel)] text-white',
  'COMPLIANCE WORK': 'bg-[var(--orange)] text-white',
  'SITE MOVEMENT': 'bg-[var(--ink)] text-white',
  'FAST TURNAROUND': 'bg-[var(--yellow)] text-[var(--ink)]',
  'URGENT TAKEOVER': 'bg-[var(--orange)] text-white',
  'FUNDED UPGRADE': 'bg-[var(--steel-2)] text-white',
};

const tradeSignals: Array<{ trade: string; active: string[] }> = [
  { trade: 'Electrician', active: ['Planning', 'Contracts', 'Energy', 'Property Sales', 'New Business', 'HMO', 'Building Control', 'Retrofit Grants'] },
  { trade: 'Plumber',     active: ['Planning', 'Contracts', 'Energy', 'Property Sales', 'New Business', 'HMO', 'Building Control', 'Auction'] },
  { trade: 'Builder',     active: ['Planning', 'Contracts', 'Energy', 'Property Sales', 'New Business', 'HMO', 'Building Control', 'Auction', 'Insolvency', 'Retrofit Grants'] },
  { trade: 'Roofer',      active: ['Planning', 'Contracts', 'Energy', 'Property Sales', 'Building Control', 'Auction', 'Retrofit Grants'] },
  { trade: 'HEATING',     active: ['Planning', 'Contracts', 'Energy', 'Property Sales', 'HMO', 'Retrofit Grants'] },
  { trade: 'Landscaper',  active: ['Planning', 'Contracts', 'Property Sales', 'Auction'] },
  { trade: 'Carpenter',   active: ['Planning', 'Contracts', 'Property Sales', 'New Business', 'HMO', 'Building Control', 'Auction'] },
  { trade: 'Painter',     active: ['Planning', 'Contracts', 'Property Sales', 'HMO', 'Auction', 'Insolvency'] },
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
          <p className="micro-label text-[var(--yellow)]">TENDER SIGNALS FOR UK CONTRACTORS</p>
          <h1 className="headline mt-5 max-w-4xl text-[clamp(2.25rem,8vw,7rem)] leading-[0.88] text-[var(--yellow)]">
            THE RIGHT TENDERS. NO TIME WASTED.
          </h1>
          <p className="mt-6 max-w-2xl text-xl font-bold leading-snug text-white/85">
            Current public works notices from Find a Tender, filtered by trade, region and firm fit. Know whether to BID, WATCH, SUBCONTRACT or SKIP — before you waste bid time.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link className="jf-button bg-[var(--yellow)] text-[var(--ink)]" href="/find-jobs">SCAN FREE — NO CARD NEEDED →</Link>
            <Link className="jf-button bg-white text-[var(--ink)]" href="/pricing">QUALIFY BIDS — £39/MO →</Link>
          </div>
          <p className="mt-3 text-sm font-black text-white/60">3 free scans every week. Founder price £39/mo. One job covers 12+ months.</p>
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
              <article key={s.name} className={`jf-box bg-white p-6 flex flex-col gap-4 ${!s.live ? 'opacity-75' : ''}`}>
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-block bg-[var(--navy)] px-2 py-1 text-[0.65rem] font-black tracking-widest uppercase text-white">
                    {s.source}
                  </span>
                  {s.live ? (
                    <span className="inline-block bg-[var(--green)] px-2 py-1 text-[0.65rem] font-black tracking-widest uppercase text-white">● LIVE</span>
                  ) : (
                    <span className="inline-block border border-[var(--line)] bg-[var(--bg-main)] px-2 py-1 text-[0.65rem] font-black tracking-widest uppercase text-[var(--muted)]">COMING SOON</span>
                  )}
                </div>
                <h3 className="headline text-4xl leading-none">{s.name}</h3>
                <p className="font-bold text-[var(--muted)] leading-snug">{s.description}</p>
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
            Government tender signals live now via Find a Tender. More signal types in development. One job worth chasing pays for 12+ months. Founder access from <span className="underline underline-offset-2">£39/month</span>. Free scan first.
          </p>
          <div className="flex shrink-0 gap-3">
            <Link className="jf-button bg-[var(--ink)] px-4 py-2 text-sm text-white" href="/find-jobs">SCAN FREE →</Link>
            <Link className="jf-button bg-white px-4 py-2 text-sm text-[var(--ink)]" href="/pricing">SEE PRICING →</Link>
          </div>
        </div>
      </section>

      {/* 2c. Works Starting Now */}
      <section className="border-b-4 border-[var(--line)] bg-white">
        <div className="page-shell section-pad">
          <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-stretch">
            <div>
              <p className="micro-label text-[var(--orange)]">START SIGNAL MODE</p>
              <h2 className="headline mt-3 text-5xl leading-none md:text-6xl">WORKS STARTING NOW.</h2>
              <p className="mt-4 max-w-3xl text-lg font-bold leading-tight text-[var(--ink)]/80">
                Planning alone is often too early. Start Signal mode filters for jobs with stronger timing evidence: planning approval, building-control movement, energy rating changes, property sales and business fit-out signals.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {['READY = act now', 'MAYBE = verify source', 'WASTE = skip'].map((label) => (
                  <span key={label} className="border-2 border-[var(--line)] bg-[var(--bg-main)] px-3 py-1 text-xs font-black uppercase text-[var(--ink)]">
                    {label}
                  </span>
                ))}
              </div>
            </div>
            <div className="jf-box bg-[var(--ink)] p-5 text-white">
              <p className="micro-label text-[var(--yellow)]">PAID MODE</p>
              <h3 className="headline mt-2 text-3xl leading-none text-white">STOP CHASING PLANNING NOISE.</h3>
              <p className="mt-3 text-sm font-bold text-white/85">
                Use it inside Find Jobs to surface READY/MAYBE leads first. Every result carries source evidence and a verify-before-contact warning.
              </p>
              <Link className="jf-button mt-4 inline-block bg-[var(--yellow)] text-[var(--ink)]" href="/find-jobs?mode=start_now">
                OPEN WORKS STARTING NOW →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. How it works */}
      <section className="bg-[var(--bg-main)] border-y-4 border-[var(--line)]">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--orange)]">HOW IT WORKS</p>
          <h2 className="headline mt-3 text-5xl leading-none md:text-6xl">QUALIFY FASTER. BID SMARTER.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ['STEP 1', 'TENDER DETECTED', 'A public works notice matching your trade and region appears on Find a Tender. Council contracts, public works frameworks, maintenance tenders.'],
              ['STEP 2', 'EVIDENCE EXTRACTED', 'JobFilter pulls buyer, scope, value, deadline, CPV codes and requirements from the official notice. You see what fits and what is missing.'],
              ['STEP 3', 'CLEAR NEXT ACTION', 'Decide BID, WATCH, SUBCONTRACT or SKIP based on real evidence — before you spend bid time on the wrong opportunity.'],
            ].map(([step, title, body]) => (
              <div key={step} className="jf-box bg-[var(--navy)] p-6 text-white">
                <p className="micro-label text-[var(--yellow)]">{step}</p>
                <h3 className="headline mt-3 text-3xl text-[var(--yellow)]">{title}</h3>
                <p className="mt-3 font-bold text-white/90">{body}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-xl font-bold text-[var(--muted)]">
            Live source: Find a Tender. Additional signal types — planning, energy, property — are in development and shown as Coming Soon above.
          </p>
        </div>
      </section>

      {/* 4. Source status strip */}
      <section className="bg-[var(--ink)] border-b-4 border-[var(--line)]">
        <div className="page-shell py-5">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <span className="flex items-center gap-2 text-sm font-black uppercase text-white">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--yellow)] shadow-[0_0_6px_var(--yellow)]" />
              CONTRACTS
            </span>
            {['PLANNING', 'ENERGY', 'PROPERTY SALES', 'NEW BUSINESS', 'HMO', 'BUILDING CONTROL', 'AUCTION', 'INSOLVENCY', 'RETROFIT'].map((src) => (
              <span key={src} className="flex items-center gap-2 text-sm font-black uppercase text-white/40">
                <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                {src}
              </span>
            ))}
          </div>
          <p className="mt-3 text-xs font-black uppercase tracking-widest text-white/60">
            1 LIVE SOURCE (FIND A TENDER) · 9 IN DEVELOPMENT · NO SHARED LEADS
          </p>
        </div>
      </section>

      {/* 5. Trade targeting */}
      <section className="bg-white border-b-4 border-[var(--line)]">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--orange)]">TRADE TARGETING</p>
          <h2 className="headline mt-3 text-5xl leading-none md:text-6xl">YOUR TRADE. YOUR SIGNALS.</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tradeSignals.map(({ trade, active }) => (
              <article key={trade} className="jf-box bg-[var(--bg-main)] p-5">
                <h3 className="headline text-2xl">{trade}</h3>
                <div className="mt-4 grid gap-2">
                  {allSignalLabels.map((label) => {
                    const on = active.includes(label);
                    return (
                      <div
                        key={label}
                        className={`flex items-center gap-2 text-sm font-black ${on ? 'text-[var(--ink)]' : 'text-[var(--muted)]'}`}
                      >
                        <span className={`text-base leading-none ${on ? 'text-[var(--green)]' : ''}`}>
                          {on ? '✓' : '✗'}
                        </span>
                        {label}
                      </div>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA */}
      <section className="bg-[var(--yellow)] border-t-4 border-[var(--line)]">
        <div className="page-shell section-pad text-center">
          <p className="micro-label text-[var(--ink)]">READY TO SCAN</p>
          <h2 className="headline mt-4 text-[clamp(2.25rem,8vw,6rem)] leading-[0.88] text-[var(--ink)]">
            SEE WHAT'S LIVE IN YOUR PATCH RIGHT NOW.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-xl font-bold text-[var(--ink)]">
            Enter your postcode. Pick your trade. Live Find a Tender notices — matched to your region in seconds. Free — no card, no contract.
          </p>
          <div className="mt-8">
            <Link className="jf-button bg-[var(--ink)] text-white" href="/find-jobs">
              RUN MY FREE SCAN →
            </Link>
          </div>
          <p className="mt-4 text-sm font-black text-[var(--ink)]">
            3 free scans every week — no credit card required. Founder access: £39/month. Checkatrade charges £180/month for shared leads. This is unshared and filtered.
          </p>
          <p className="mt-4 text-sm font-black text-[var(--ink)]/80 uppercase">30-DAY MONEY-BACK GUARANTEE — One job worth chasing or we refund every penny. No quibbles.</p>
        </div>
      </section>

    </main>
  );
}
