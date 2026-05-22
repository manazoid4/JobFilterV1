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
    source: 'SIGNAL 3 · ENERGY',
    name: 'LEGALLY FORCED TO UPGRADE. THEY NEED YOU.',
    description: 'F and G rated rental properties cannot be legally let without energy improvements. JobFilter identifies them before the landlord posts anywhere. First trade to call wins.',
    trades: ['Electrical', 'Plumbing', 'HVAC', 'Building', 'Roofing'],
    signalType: 'LEGAL TRIGGER',
  },
  {
    source: 'SIGNAL 4 · PROPERTY SALES',
    name: 'JUST BOUGHT IT. HASN\'T CALLED ANYONE.',
    description: 'Property sold in your area in the last 30 days. New owner, likely renovation. No other tradesman knows yet — the sale only just cleared.',
    trades: ['Building', 'Electrical', 'Plumbing', 'HVAC', 'Roofing', 'Carpentry', 'Landscaping', 'Painting'],
    signalType: 'FRESH PURCHASE',
  },
  {
    source: 'SIGNAL 5 · NEW BUSINESS',
    name: 'NEW COMPANY. NEEDS A FIT-OUT.',
    description: 'New company registered near you in a sector that needs premises work — restaurant, clinic, gym, office, retail. Before they\'ve searched for a tradesman.',
    trades: ['Building', 'Electrical', 'Plumbing', 'Carpentry'],
    signalType: 'NEW BUSINESS',
  },
  {
    source: 'SIGNAL 6 · HMO LICENSING',
    name: 'LANDLORD HAS TO BRING THE PROPERTY UP TO STANDARD.',
    description: 'HMO licence activity points to fire doors, alarms, electrics, plumbing, ventilation, repairs and compliance work before the landlord starts ringing round.',
    trades: ['Electrical', 'Plumbing', 'Building', 'Carpentry', 'Painting'],
    signalType: 'COMPLIANCE WORK',
  },
  {
    source: 'SIGNAL 7 · BUILDING CONTROL',
    name: 'WORK HAS MOVED FROM IDEA TO SITE.',
    description: 'Building control notices show projects that are past planning talk and closer to actual work: extensions, structural work, conversions, roof changes and inspections.',
    trades: ['Building', 'Roofing', 'Electrical', 'Plumbing', 'Carpentry'],
    signalType: 'SITE MOVEMENT',
  },
  {
    source: 'SIGNAL 8 · AUCTION PROPERTY',
    name: 'NEW OWNER NEEDS A FAST TURNAROUND.',
    description: 'Auction wins often mean refurb, clearance, roof, damp, electrics, heating and resale/rental deadlines. Good trades get in before the new owner starts searching.',
    trades: ['Building', 'Electrical', 'Plumbing', 'Roofing', 'Painting', 'Carpentry'],
    signalType: 'FAST TURNAROUND',
  },
  {
    source: 'SIGNAL 9 · INSOLVENCY / VOID WORKS',
    name: 'SITES AND PREMISES NEED SOMEONE TO STEP IN.',
    description: 'Business distress, empty premises and interrupted projects can create urgent make-safe, refit, repair and takeover work for local trades.',
    trades: ['Building', 'Electrical', 'Plumbing', 'Security', 'Carpentry'],
    signalType: 'URGENT TAKEOVER',
  },
  {
    source: 'SIGNAL 10 · RETROFIT GRANTS',
    name: 'FUNDING CREATES THE DEADLINE.',
    description: 'Grant windows, local retrofit schemes and funded upgrade programmes create timed demand for insulation, heating, solar, ventilation and electrical work.',
    trades: ['Insulation', 'HVAC', 'Electrical', 'Roofing', 'Building'],
    signalType: 'FUNDED UPGRADE',
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
  'FRESH PURCHASE': 'bg-blue-600 text-white',
  'NEW BUSINESS': 'bg-[var(--steel)] text-white',
  'COMPLIANCE WORK': 'bg-[var(--orange)] text-white',
  'SITE MOVEMENT': 'bg-[var(--ink)] text-white',
  'FAST TURNAROUND': 'bg-[var(--yellow)] text-[var(--ink)]',
  'URGENT TAKEOVER': 'bg-red-700 text-white',
  'FUNDED UPGRADE': 'bg-[var(--steel-2)] text-white',
};

const tradeSignals: Array<{ trade: string; active: string[] }> = [
  { trade: 'Electrician', active: ['Planning', 'Contracts', 'Energy', 'Property Sales', 'New Business', 'HMO', 'Building Control', 'Retrofit Grants'] },
  { trade: 'Plumber',     active: ['Planning', 'Contracts', 'Energy', 'Property Sales', 'New Business', 'HMO', 'Building Control', 'Auction'] },
  { trade: 'Builder',     active: ['Planning', 'Contracts', 'Energy', 'Property Sales', 'New Business', 'HMO', 'Building Control', 'Auction', 'Insolvency', 'Retrofit Grants'] },
  { trade: 'Roofer',      active: ['Planning', 'Energy', 'Property Sales', 'Building Control', 'Auction', 'Retrofit Grants'] },
  { trade: 'HVAC',        active: ['Planning', 'Contracts', 'Energy', 'Property Sales', 'HMO', 'Retrofit Grants'] },
  { trade: 'Landscaper',  active: ['Planning', 'Contracts', 'Property Sales', 'Auction'] },
  { trade: 'Carpenter',   active: ['Planning', 'Property Sales', 'New Business', 'HMO', 'Building Control', 'Auction'] },
  { trade: 'Painter',     active: ['Planning', 'Property Sales', 'HMO', 'Auction', 'Insolvency'] },
];

const allSignalLabels = ['Planning', 'Contracts', 'Energy', 'Property Sales', 'New Business', 'HMO', 'Building Control', 'Auction', 'Insolvency', 'Retrofit Grants'];

export function SignalsPage() {
  return (
    <main className="pb-8">

      {/* 1. Hero */}
      <section className="bg-[var(--navy)] border-b-4 border-[var(--line)]">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--yellow)]">WHAT LANDS IN YOUR WHATSAPP</p>
          <h1 className="headline mt-5 max-w-5xl text-[clamp(3rem,8vw,7rem)] leading-[0.88] text-[var(--yellow)]">
            TEN REASONS THE JOB IS YOURS BEFORE ANYONE ELSE QUOTES.
          </h1>
          <p className="mt-6 max-w-3xl text-xl font-black leading-tight text-white/80">
            Other tradesmen wait for homeowners to post on MyBuilder. You get a WhatsApp alert when the planning application gets approved, when the council contract goes live, when a landlord has compliance pressure, when a property changes hands, or when funded work starts moving. Before the job exists anywhere else.
          </p>
        </div>
      </section>

      {/* 2. Signals grid */}
      <section className="bg-[var(--bg-main)]">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--orange)]">THE TEN SIGNALS</p>
          <h2 className="headline mt-3 text-5xl leading-none md:text-6xl">TEN ALERTS. EVERY ONE BEFORE THE JOB GOES PUBLIC.</h2>
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

      {/* 2b. Pricing bridge */}
      <section className="ops-strip border-y-4 border-[var(--line)] bg-[var(--yellow)]">
        <div className="page-shell flex flex-col items-center justify-between gap-4 py-5 sm:flex-row">
          <p className="text-base font-black text-[var(--ink)]">
            All 10 signals included. Founder access from <span className="underline underline-offset-2">£39/month</span>. Free scan first — no card needed.
          </p>
          <div className="flex shrink-0 gap-3">
            <Link className="jf-button bg-[var(--ink)] px-4 py-2 text-sm text-white" to="/find-jobs">Scan Free →</Link>
            <Link className="jf-button bg-white px-4 py-2 text-sm text-[var(--ink)]" to="/pricing">See Pricing</Link>
          </div>
        </div>
      </section>

      {/* 2c. Works Starting Now */}
      <section className="border-b-4 border-[var(--line)] bg-white">
        <div className="page-shell section-pad">
          <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-stretch">
            <div>
              <p className="micro-label text-[var(--orange)]">START SIGNAL ENGINE</p>
              <h2 className="headline mt-3 text-5xl leading-none md:text-6xl">WORKS STARTING NOW.</h2>
              <p className="mt-4 max-w-3xl text-lg font-black leading-tight text-[var(--ink)]/80">
                Planning alone is often too early. Start Signal mode filters for jobs with stronger timing evidence: planning approval, building-control movement, EPC changes, property sales and business fit-out signals.
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
              <p className="mt-3 text-sm font-black text-white/85">
                Use it inside Find Jobs to surface READY/MAYBE leads first. Every result carries source evidence and a verify-before-contact warning.
              </p>
              <Link className="jf-button mt-4 inline-block bg-[var(--yellow)] text-[var(--ink)]" to="/find-jobs?mode=start_now">
                OPEN WORKS STARTING NOW →
              </Link>
            </div>
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
              ['STEP 1', 'SIGNAL DETECTED', 'One of ten signal classes flags activity near your postcode. Planning approval. Property sale. Legal retrofit trigger. Council contract. Compliance pressure.'],
              ['STEP 2', 'SCORED INSTANTLY', 'Every signal gets a score. GOLD means act now. SILVER means worth watching. BIN means skip it. You only see what\'s worth your time.'],
              ['STEP 3', 'STRAIGHT TO YOUR WHATSAPP', 'Gold leads hit your phone within minutes. Not an email. Not a dashboard you have to log into. Your WhatsApp. The job detail, the location, the source. Ready to act.'],
            ].map(([step, title, body]) => (
              <div key={step} className="jf-box bg-[var(--navy)] p-6 text-white">
                <p className="micro-label text-[var(--yellow)]">{step}</p>
                <h3 className="headline mt-3 text-3xl text-[var(--yellow)]">{title}</h3>
                <p className="mt-3 font-black text-white/90">{body}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-xl font-black text-[var(--muted)]">
            Every scan runs the active signal stack in parallel. Results are scored. GOLD hits your WhatsApp. You only act on what's worth your time.
          </p>
        </div>
      </section>

      {/* 4. Source status strip */}
      <section className="bg-[var(--ink)] border-b-4 border-[var(--line)]">
        <div className="page-shell py-5">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {['PLANNING', 'CONTRACTS', 'ENERGY', 'PROPERTY SALES', 'NEW BUSINESS', 'HMO', 'BUILDING CONTROL', 'AUCTION', 'INSOLVENCY', 'RETROFIT'].map((src) => (
              <span key={src} className="flex items-center gap-2 text-sm font-black uppercase text-white">
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--yellow)] shadow-[0_0_6px_var(--yellow)]" />
                {src}
              </span>
            ))}
          </div>
          <p className="mt-3 text-xs font-black uppercase tracking-widest text-white/90">
            CORE SIGNALS LIVE · NO SHARED LEADS · EXCLUSIVE TERRITORY PROTECTION
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
          <h2 className="headline mt-4 text-[clamp(3rem,8vw,6rem)] leading-[0.88] text-[var(--ink)]">
            SEE WHAT'S LIVE NEAR YOU RIGHT NOW.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-xl font-black text-[var(--ink)]">
            Enter your postcode. Pick your trade. Every active signal fires in under 10 seconds. Free — no card, no contract.
          </p>
          <div className="mt-8">
            <Link className="jf-button bg-[var(--ink)] text-white" to="/find-jobs">
              RUN MY FREE SCAN →
            </Link>
          </div>
          <p className="mt-4 text-sm font-black text-[var(--ink)]">
            3 free scans every week. Founder access: £39/month while founder slots remain.
          </p>
        </div>
      </section>

    </main>
  );
}
