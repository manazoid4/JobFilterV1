"use client";
import { useState } from 'react';
import Link from 'next/link';


const signals = [
  {
    source: 'SIGNAL 1 · PLANNING',
    name: 'PLANNING APPROVED. BUILDER NOT PICKED.',
    description: 'Planning approvals matched to your trade and postcode. Alerts when a decision lands near you. Source in development — not yet live.',
    trades: ['Building', 'Electrical', 'Plumbing', 'HVAC', 'Roofing', 'Carpentry', 'Landscaping', 'Painting'],
    signalType: 'BEFORE THE CALL',
    isLive: false,
  },
  {
    source: 'SIGNAL 2 · CONTRACTS',
    name: 'COUNCIL WORK. NO BIDDING WAR.',
    description: 'Council and government contracts for your trade, in your area, before the closing date. No directory. No middleman. Official notice, straight to your scan.',
    trades: ['Building', 'Electrical', 'Plumbing', 'HVAC', 'Roofing', 'Carpentry', 'Landscaping', 'Painting'],
    signalType: 'LIVE TENDER',
    isLive: true,
  },
  {
    source: 'SIGNAL 3 · ENERGY',
    name: 'LEGALLY FORCED TO UPGRADE. THEY NEED YOU.',
    description: 'Low-rated rental properties legally required to upgrade before they can be let. Landlords must act. Source in development — not yet live.',
    trades: ['Electrical', 'Plumbing', 'HVAC', 'Building', 'Roofing'],
    signalType: 'LEGAL TRIGGER',
    isLive: false,
  },
  {
    source: 'SIGNAL 4 · PROPERTY SALES',
    name: 'JUST BOUGHT IT. HASN\'T CALLED ANYONE.',
    description: 'Property sold in your area in the last 30 days. New owner, likely renovation. Source in development — not yet live.',
    trades: ['Building', 'Electrical', 'Plumbing', 'HVAC', 'Roofing', 'Carpentry', 'Landscaping', 'Painting'],
    signalType: 'FRESH PURCHASE',
    isLive: false,
  },
  {
    source: 'SIGNAL 5 · NEW BUSINESS',
    name: 'NEW COMPANY. NEEDS A FIT-OUT.',
    description: 'New companies registered in sectors that need premises work — restaurant, clinic, gym, office, retail. Source in development — not yet live.',
    trades: ['Building', 'Electrical', 'Plumbing', 'Carpentry'],
    signalType: 'NEW BUSINESS',
    isLive: false,
  },
  {
    source: 'SIGNAL 6 · HMO LICENSING',
    name: 'LANDLORD HAS TO BRING THE PROPERTY UP TO STANDARD.',
    description: 'HMO licence activity pointing to fire doors, alarms, electrics, plumbing and compliance work. Source in development — not yet live.',
    trades: ['Electrical', 'Plumbing', 'Building', 'Carpentry', 'Painting'],
    signalType: 'COMPLIANCE WORK',
    isLive: false,
  },
  {
    source: 'SIGNAL 7 · BUILDING CONTROL',
    name: 'WORK HAS MOVED FROM IDEA TO SITE.',
    description: 'Building control notices showing projects past planning talk and closer to actual work: extensions, structural work, conversions, roof changes. Source in development — not yet live.',
    trades: ['Building', 'Roofing', 'Electrical', 'Plumbing', 'Carpentry'],
    signalType: 'SITE MOVEMENT',
    isLive: false,
  },
  {
    source: 'SIGNAL 8 · AUCTION PROPERTY',
    name: 'NEW OWNER NEEDS A FAST TURNAROUND.',
    description: 'Auction wins often mean refurb, clearance, roof, damp, electrics, heating and resale/rental deadlines. Source in development — not yet live.',
    trades: ['Building', 'Electrical', 'Plumbing', 'Roofing', 'Painting', 'Carpentry'],
    signalType: 'FAST TURNAROUND',
    isLive: false,
  },
  {
    source: 'SIGNAL 9 · INSOLVENCY / VOID WORKS',
    name: 'SITES AND PREMISES NEED SOMEONE TO STEP IN.',
    description: 'Business distress, empty premises and interrupted projects creating urgent make-safe, refit, repair and takeover work. Source in development — not yet live.',
    trades: ['Building', 'Electrical', 'Plumbing', 'Security', 'Carpentry'],
    signalType: 'URGENT TAKEOVER',
    isLive: false,
  },
  {
    source: 'SIGNAL 10 · RETROFIT GRANTS',
    name: 'FUNDING CREATES THE DEADLINE.',
    description: 'Grant windows, local retrofit schemes and funded upgrade programmes creating timed demand for insulation, heating, solar, ventilation and electrical work. Source in development — not yet live.',
    trades: ['Insulation', 'HVAC', 'Electrical', 'Roofing', 'Building'],
    signalType: 'FUNDED UPGRADE',
    isLive: false,
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
          <p className="micro-label text-[var(--yellow)]">PUBLIC WORKS SIGNALS</p>
          <h1 className="headline mt-5 max-w-4xl text-[clamp(2.25rem,8vw,7rem)] leading-[0.88] text-[var(--yellow)]">
            FILTER THE WORK WORTH CHASING.
          </h1>
          <p className="mt-6 max-w-2xl text-xl font-bold leading-snug text-white/85">
            Public tender notices qualified for your trade and region. Current live source: Find a Tender. Additional signal types in development.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link className="jf-button bg-[var(--yellow)] text-[var(--ink)]" href="/find-jobs">SCAN FREE — NO CARD NEEDED →</Link>
            <Link className="jf-button bg-white text-[var(--ink)]" href="/pricing">START £39/MO →</Link>
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
              <article key={s.name} className={`jf-box p-6 flex flex-col gap-4 ${s.isLive ? 'bg-white' : 'bg-[var(--paper)]'}`}>
                <div className="flex items-start justify-between gap-2">
                  <span className={`inline-block px-2 py-1 text-[0.65rem] font-black tracking-widest uppercase text-white ${s.isLive ? 'bg-[var(--navy)]' : 'bg-[var(--muted)]'}`}>
                    {s.source}
                  </span>
                  {!s.isLive && (
                    <span className="shrink-0 bg-[var(--muted)] px-2 py-0.5 text-[0.6rem] font-black uppercase tracking-wider text-white">
                      COMING SOON
                    </span>
                  )}
                </div>
                <h3 className={`headline text-4xl leading-none ${s.isLive ? '' : 'text-[var(--muted)]'}`}>{s.name}</h3>
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
                  {s.isLive ? (
                    <span className={`inline-block px-3 py-1 text-xs font-black uppercase tracking-wider ${signalTypeStyle[s.signalType]}`}>
                      {s.signalType}
                    </span>
                  ) : (
                    <span className="inline-block px-3 py-1 text-xs font-black uppercase tracking-wider bg-[var(--bg-main)] text-[var(--muted)] border border-[var(--line)]">
                      IN DEVELOPMENT
                    </span>
                  )}
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
            FTS qualification included. One job worth chasing pays for 12+ months. Founder access from <span className="underline underline-offset-2">£39/month</span>. Additional signal types in development. Free scan first — no card needed.
          </p>
          <div className="flex shrink-0 gap-3">
            <Link className="jf-button bg-[var(--ink)] px-4 py-2 text-sm text-white" href="/find-jobs">SCAN FREE →</Link>
            <Link className="jf-button bg-white px-4 py-2 text-sm text-[var(--ink)]" href="/pricing">SEE PRICING →</Link>
          </div>
        </div>
      </section>

      {/* 3. How it combines */}
      <section className="bg-[var(--bg-main)] border-y-4 border-[var(--line)]">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--orange)]">HOW IT WORKS</p>
          <h2 className="headline mt-3 text-5xl leading-none md:text-6xl">KNOW WHICH JOBS FIT. SKIP THE REST.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ['STEP 1', 'NOTICE DETECTED', 'A current Find a Tender notice is matched to your trade and delivery region. Contract value, buyer, CPV codes and deadline are extracted.'],
              ['STEP 2', 'FIT CHECKED', 'The notice is checked against your trade and region. A fit summary is returned before you spend time on a bid.'],
              ['STEP 3', 'DECISION IN SECONDS', 'BID, WATCH, SUBCONTRACT or SKIP. Each qualified result shows your fit against the notice. Full qualification detail available on the paid plan. No noise — only what matches your trade and region.'],
            ].map(([step, title, body]) => (
              <div key={step} className="jf-box bg-[var(--navy)] p-6 text-white">
                <p className="micro-label text-[var(--yellow)]">{step}</p>
                <h3 className="headline mt-3 text-3xl text-[var(--yellow)]">{title}</h3>
                <p className="mt-3 font-bold text-white/90">{body}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-xl font-bold text-[var(--muted)]">
            Every scan checks current public notices against your trade and region. Results are scored. You only act on what fits.
          </p>
        </div>
      </section>

      {/* 4. Source status strip */}
      <section className="bg-[var(--ink)] border-b-4 border-[var(--line)]">
        <div className="page-shell py-5">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <span className="flex items-center gap-2 text-sm font-black uppercase text-white">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[var(--yellow)] shadow-[0_0_6px_var(--yellow)]" />
              CONTRACTS (FTS) <span className="ml-1 text-[10px] text-[var(--yellow)]">LIVE</span>
            </span>
            {['PLANNING', 'ENERGY', 'PROPERTY SALES', 'NEW BUSINESS', 'HMO', 'BUILDING CONTROL', 'AUCTION', 'INSOLVENCY', 'RETROFIT'].map((src) => (
              <span key={src} className="flex items-center gap-2 text-sm font-black uppercase text-white/40">
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                {src} <span className="ml-1 text-[10px] text-white/30">COMING</span>
              </span>
            ))}
          </div>
          <p className="mt-3 text-xs font-black uppercase tracking-widest text-white/60">
            LIVE: FIND A TENDER · FURTHER SOURCES IN DEVELOPMENT
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
            Enter your postcode. Pick your trade. Every active signal fires in under 10 seconds. Free — no card, no contract.
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
