import { Link } from 'react-router-dom';

const signals = [
  {
    source: 'SIGNAL 1 · PLANNING',
    name: 'PLANNING APPROVED. BUILDER NOT PICKED.',
    description: 'A 4-bed extension approved this morning in your postcode. The homeowner hasn\'t called anyone yet. You get the alert. They don\'t.',
    trades: ['Building', 'Electrical', 'Plumbing', 'HVAC', 'Roofing', 'Carpentry', 'Landscaping', 'Painting'],
    signalType: 'BEFORE THE CALL',
  },
  {
    source: 'SIGNAL 2 · CONTRACTS',
    name: 'COUNCIL WORK. NO BIDDING WAR.',
    description: 'Council and government contracts for your trade, near you, before the closing date. No directory. No middleman. Official notice, straight to your scan.',
    trades: ['Building', 'Electrical', 'Plumbing', 'HVAC', 'Landscaping'],
    signalType: 'LIVE TENDER',
  },
  {
    source: 'SIGNAL 3 · EPC',
    name: 'LEGALLY FORCED TO UPGRADE. THEY NEED YOU.',
    description: 'F and G rated rental properties cannot be legally let without energy improvements. JobFilter identifies them before the landlord posts anywhere. First trade to call wins.',
    trades: ['Electrical', 'Plumbing', 'HVAC', 'Building', 'Roofing'],
    signalType: 'LEGAL TRIGGER',
  },
  {
    source: 'SIGNAL 4 · LAND REGISTRY',
    name: 'JUST BOUGHT IT. HASN\'T CALLED ANYONE.',
    description: 'Property sold in your area in the last 30 days. New owner, likely renovation. No other tradesman knows yet — the sale only just appeared on Land Registry.',
    trades: ['Building', 'Electrical', 'Plumbing', 'HVAC', 'Roofing', 'Carpentry', 'Landscaping', 'Painting'],
    signalType: 'FRESH PURCHASE',
  },
  {
    source: 'SIGNAL 5 · COMPANIES HOUSE',
    name: 'NEW BUSINESS. NEEDS A FIT-OUT.',
    description: 'New company registered near you in a sector that needs premises work — restaurant, clinic, gym, office, retail. Before they\'ve searched for a tradesman.',
    trades: ['Building', 'Electrical', 'Plumbing', 'Carpentry'],
    signalType: 'NEW BUSINESS',
  },
] as const;

type SignalType = 'BEFORE THE CALL' | 'LIVE TENDER' | 'LEGAL TRIGGER' | 'FRESH PURCHASE' | 'NEW BUSINESS';

const signalTypeStyle: Record<SignalType, string> = {
  'BEFORE THE CALL': 'bg-[var(--yellow)] text-[var(--ink)]',
  'LIVE TENDER': 'bg-[var(--yellow)] text-[var(--ink)]',
  'LEGAL TRIGGER': 'bg-[var(--orange)] text-white',
  'FRESH PURCHASE': 'bg-blue-600 text-white',
  'NEW BUSINESS': 'bg-[var(--green)] text-white',
};

const tradeSignals: Array<{ trade: string; active: string[] }> = [
  { trade: 'Electrician', active: ['Planning', 'Contracts', 'EPC', 'Land Registry', 'Companies House'] },
  { trade: 'Plumber',     active: ['Planning', 'Contracts', 'EPC', 'Land Registry', 'Companies House'] },
  { trade: 'Builder',     active: ['Planning', 'Contracts', 'EPC', 'Land Registry', 'Companies House'] },
  { trade: 'Roofer',      active: ['Planning', 'EPC', 'Land Registry'] },
  { trade: 'HVAC',        active: ['Planning', 'Contracts', 'EPC', 'Land Registry'] },
  { trade: 'Landscaper',  active: ['Planning', 'Contracts', 'Land Registry'] },
  { trade: 'Carpenter',   active: ['Planning', 'Land Registry', 'Companies House'] },
  { trade: 'Painter',     active: ['Planning', 'Land Registry'] },
];

const allSignalLabels = ['Planning', 'Contracts', 'EPC', 'Land Registry', 'Companies House'];

export function SignalsPage() {
  return (
    <main className="pb-8">

      {/* 1. Hero */}
      <section className="bg-[var(--navy)] border-b-4 border-[var(--line)]">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--yellow)]">WHAT LANDS IN YOUR WHATSAPP</p>
          <h1 className="headline mt-5 max-w-5xl text-[clamp(3rem,8vw,7rem)] leading-[0.88] text-[var(--yellow)]">
            FIVE REASONS THE JOB IS YOURS BEFORE ANYONE ELSE QUOTES.
          </h1>
          <p className="mt-6 max-w-3xl text-xl font-black leading-tight text-white/80">
            Other tradesmen wait for homeowners to post on MyBuilder. You get a WhatsApp alert when the planning application gets approved, when the council contract goes live, when the landlord's legally forced to retrofit, when the house sells, when a new business opens. Before the job exists anywhere else.
          </p>
        </div>
      </section>

      {/* 2. Signals grid */}
      <section className="bg-[var(--bg-main)]">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--orange)]">THE FIVE SIGNALS</p>
          <h2 className="headline mt-3 text-5xl leading-none md:text-6xl">FIVE ALERTS. EVERY ONE BEFORE THE JOB GOES PUBLIC.</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {signals.map((s) => (
              <article key={s.name} className="jf-box bg-white p-6 flex flex-col gap-4">
                <div>
                  <span className="inline-block bg-[var(--navy)] px-2 py-1 text-[0.65rem] font-black tracking-widest uppercase text-white">
                    {s.source}
                  </span>
                </div>
                <h3 className="headline text-4xl leading-none">{s.name}</h3>
                <p className="font-black text-[var(--muted)] leading-snug">{s.description}</p>
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

      {/* 3. How it combines */}
      <section className="bg-[var(--bg-main)] border-y-4 border-[var(--line)]">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--orange)]">THE PIPELINE</p>
          <h2 className="headline mt-3 text-5xl leading-none md:text-6xl">YOU DON'T CHASE LEADS. THEY FIND YOU.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ['STEP 1', 'SIGNAL DETECTED', 'One of five official sources flags activity near your postcode. Planning approval. Property sale. Legal retrofit trigger. Council contract.'],
              ['STEP 2', 'SCORED INSTANTLY', 'Every signal gets a score. GOLD means act now. SILVER means worth watching. BIN means skip it. You only see what\'s worth your time.'],
              ['STEP 3', 'STRAIGHT TO YOUR WHATSAPP', 'Gold leads hit your phone within minutes. Not an email. Not a dashboard you have to log into. Your WhatsApp. The job detail, the location, the source. Ready to act.'],
            ].map(([step, title, body]) => (
              <div key={step} className="jf-box bg-[var(--navy)] p-6 text-white">
                <p className="micro-label text-[var(--yellow)]">{step}</p>
                <h3 className="headline mt-3 text-3xl text-[var(--yellow)]">{title}</h3>
                <p className="mt-3 font-black text-white/75">{body}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-xl font-black text-[var(--muted)]">
            Every scan runs all five sources in parallel. Results are scored. GOLD hits your WhatsApp. You only act on what's worth your time.
          </p>
        </div>
      </section>

      {/* 4. Source status strip */}
      <section className="bg-[var(--ink)] border-b-4 border-[var(--line)]">
        <div className="page-shell py-5">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {['PLANNING', 'CONTRACTS', 'EPC', 'LAND REGISTRY', 'COMPANIES HOUSE'].map((src) => (
              <span key={src} className="flex items-center gap-2 text-sm font-black uppercase text-white">
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--green)] shadow-[0_0_6px_var(--green)]" />
                {src}
              </span>
            ))}
          </div>
          <p className="mt-3 text-xs font-black uppercase tracking-widest text-white/50">
            YOUR SIGNALS ARE LIVE · SCANNING YOUR POSTCODE · OFFICIAL DATA ONLY · NO SHARED LEADS
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
                        className={`flex items-center gap-2 text-sm font-black ${on ? 'text-[var(--ink)]' : 'text-[var(--muted)] opacity-40'}`}
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
          <h2 className="headline mt-4 text-[clamp(3rem,8vw,6rem)] leading-[0.88] text-[var(--ink)]">
            SEE WHAT'S LIVE NEAR YOU RIGHT NOW.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-xl font-black text-[var(--ink)]/75">
            Enter your postcode. Pick your trade. Every active signal fires in under 10 seconds. Free — no card, no contract.
          </p>
          <div className="mt-8">
            <Link className="jf-button bg-[var(--ink)] text-white" to="/find-jobs">
              RUN MY FREE SCAN →
            </Link>
          </div>
          <p className="mt-4 text-sm font-black text-[var(--ink)]/60">
            3 free scans every week. Founding 30: £6.99/wk (£29/mo) forever.
          </p>
        </div>
      </section>

    </main>
  );
}
