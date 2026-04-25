import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';

type Lead = {
  id: string;
  title: string;
  location: string;
  estimatedValue: string;
  urgency?: 'low' | 'medium' | 'high' | string;
  source: string;
  sourceConfidence?: number;
  score?: number;
};

type ScanPayload = {
  leads?: Array<{
    id: string;
    title: string;
    location: string;
    estimatedValue: string;
    urgency?: 'low' | 'medium' | 'high' | string;
    source: string;
    sourceConfidence?: number;
    score?: number;
  }>;
  total?: number;
  region?: string;
  outward?: string;
  lockedCount?: number;
  errors?: string[];
  error?: string;
};

const NAV_ITEMS = [
  { to: '/', label: 'HOME' },
  { to: '/demo', label: 'DEMO' },
  { to: '/codex', label: 'CODEX' },
  { to: '/vantage', label: 'VANTAGE' },
  { to: '/vicinity', label: 'VICINITY' },
  { to: '/pricing', label: 'PRICING' },
] as const;

const FALLBACK_LEADS: Lead[] = [
  { id: 'fallback-1', title: 'Boiler replacement', location: 'Birmingham B14', estimatedValue: '£3k–£4k', urgency: 'high', source: 'Fallback Feed' },
  { id: 'fallback-2', title: 'Full rewire', location: 'Solihull B91', estimatedValue: '£5k–£8k', urgency: 'medium', source: 'Fallback Feed' },
  { id: 'fallback-3', title: 'Bathroom refit', location: 'Coventry CV1', estimatedValue: '£4k–£6k', urgency: 'high', source: 'Fallback Feed' },
];

function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#e5e5e5] text-black">
      <header className="sticky top-0 z-20 border-b-4 border-[#facc15] bg-black">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <Link to="/" className="flex items-center gap-2 text-2xl font-black uppercase leading-none tracking-tight text-white">
            <span className="inline-flex h-11 w-14 items-center justify-center border-4 border-[#facc15] bg-[#facc15] text-[10px] font-black text-black">UK</span>
            JOBFILTER
          </Link>
          <nav className="flex flex-wrap items-center gap-4 text-[12px] font-black uppercase tracking-tight">
            {NAV_ITEMS.map((item) => (
              <Link key={item.to} to={item.to} className="text-white hover:text-[#facc15] transition-colors">
                {item.label}
              </Link>
            ))}
            <Link to="/demo" className="border-4 border-[#facc15] bg-[#facc15] px-6 py-2 text-lg leading-none text-black">
              GET STARTED
            </Link>
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
}

function CTA({ to = '/demo', label = 'ENTER THE INTAKE' }: { to?: string; label?: string }) {
  return (
    <Link to={to} className="inline-flex items-center justify-center border-4 border-black bg-black px-5 py-3 text-xs font-black uppercase tracking-widest text-[#facc15]">
      {label}
    </Link>
  );
}

function Panel({ title, body }: { title: string; body: string }) {
  return (
    <article className="border-4 border-black bg-white p-4">
      <h3 className="text-base font-black uppercase leading-none tracking-tight">{title}</h3>
      <p className="mt-2 text-sm font-semibold leading-5">{body}</p>
    </article>
  );
}

function ProductPage({ title, summary, sections }: { title: string; summary: string; sections: Array<{ title: string; body: string }> }) {
  return (
    <Shell>
      <main className="px-4 py-8">
        <div className="mx-auto max-w-5xl border-4 border-black bg-white p-6">
          <p className="text-xs font-black uppercase tracking-widest">BUILT FOR TRADES</p>
          <h1 className="mt-2 text-5xl font-black uppercase leading-none tracking-tight">{title}</h1>
          <p className="mt-3 max-w-3xl text-sm font-semibold leading-5">{summary}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <CTA />
            <Link to="/pricing" className="inline-flex items-center justify-center border-4 border-black bg-[#facc15] px-5 py-3 text-xs font-black uppercase tracking-widest">
              NO CONTRACTS
            </Link>
          </div>
        </div>

        <section className="mx-auto mt-4 grid max-w-5xl gap-3 md:grid-cols-2">
          {sections.map((section) => (
            <div key={section.title}>
              <Panel title={section.title} body={section.body} />
            </div>
          ))}
        </section>
      </main>
    </Shell>
  );
}

function ProductCards() {
  const cards = [
    {
      name: 'VANTAGE',
      pain: 'STOP LOSING £50K BIDS TO FIRMS WHO LOOK BETTER THAN YOU.',
      body: 'Your price is right. Their PDF looks better. Vantage turns your tenders into premium visual bid decks.',
      to: '/vantage',
    },
    {
      name: 'VICINITY',
      pain: 'STOP LETTING YOUR BEST WORK ROT IN YOUR CAMERA ROLL.',
      body: 'Vicinity turns finished jobs into local sales assets that keep winning you premium work.',
      to: '/vicinity',
    },
    {
      name: 'CODEX',
      pain: 'STOP LOSING JOBS TO COWBOYS WHO WRITE SIMPLER QUOTES.',
      body: 'Codex converts technical complexity into clear sales copy that closes jobs.',
      to: '/codex',
    },
  ];

  return (
    <section className="border-y-4 border-black bg-[#facc15] px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-6xl font-black uppercase leading-none tracking-tight">THEN WIN THEM.</h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-2xl font-bold">Getting in front of the job is step one. These three make sure you walk out with it.</p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <article key={card.name} className="flex flex-col border-4 border-black bg-[#e9e9e9] p-7 shadow-[8px_8px_0_#000]">
              <h3 className="w-fit bg-black px-5 py-3 text-4xl font-black uppercase leading-none tracking-tight text-[#facc15]">{card.name}</h3>
              <p className="mt-6 text-2xl font-black uppercase text-[#e11d1d]">{card.pain}</p>
              <p className="mt-4 text-[18px] font-bold leading-8 text-[#4f6786]">{card.body}</p>
              <Link
                to={card.to}
                className="mt-8 inline-flex w-fit items-center justify-center border-4 border-black bg-[#facc15] px-6 py-3 text-lg font-black uppercase tracking-tight text-black"
              >
                YOURS WITH INTAKE ENGINE
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <Shell>
      <main>
        <section className="border-b-4 border-black bg-[#e5e5e5] px-4 py-10">
          <div className="mx-auto max-w-6xl text-center">
            <h1 className="text-8xl font-black uppercase leading-[0.9] tracking-tight">STOP FUNDING</h1>
            <div className="mx-auto mt-3 w-fit border-4 border-black bg-[#facc15] px-6 py-2 shadow-[6px_6px_0_#111]">
              <h2 className="text-8xl font-black uppercase leading-[0.9] tracking-tight">TYRE-KICKERS.</h2>
            </div>
            <p className="mx-auto mt-6 max-w-4xl text-3xl font-black leading-10">
              JobFilter is a bodyguard for your time. It kills dead leads, filters out time-wasters, and puts only REAL LEADS in front of you.
            </p>
            <p className="mt-4 text-2xl font-bold text-[#8da0bd]">No dead leads. No race to the bottom. No evenings ruined by time-wasters.</p>
            <Link to="/demo" className="mx-auto mt-8 inline-flex border-4 border-black bg-[#facc15] px-12 py-4 text-4xl font-black uppercase shadow-[6px_6px_0_#111]">
              GET YOUR BODYGUARD →
            </Link>
          </div>
        </section>

        <section className="border-b-4 border-black bg-[#05070d] px-4 py-12">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center text-7xl font-black uppercase text-[#facc15]">HOW IT WORKS</h2>
            <div className="mt-8 grid gap-0 border-4 border-[#facc15] md:grid-cols-3">
              {[
                ['01', 'FIND', 'Scans job boards, local enquiries, and networks across your area — constantly.'],
                ['02', 'FILTER', 'Kills tyre-kickers, low-budget time-wasters, and jobs not worth your drive — before they reach you.'],
                ['03', 'DELIVER', 'Sends only vetted, high-value jobs to your phone. Ready to quote. Ready to win.'],
              ].map(([num, title, body], idx) => (
                <article key={title} className={`p-8 text-center ${idx > 0 ? 'border-l-4 border-[#facc15]' : ''}`}>
                  <p className="text-7xl font-black text-[#facc15]">{num}</p>
                  <h3 className="mt-2 text-5xl font-black uppercase text-white">{title}</h3>
                  <p className="mt-4 text-xl font-bold leading-9 text-[#d5deed]">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <ProductCards />
      </main>
    </Shell>
  );
}

export function DemoPage() {
  const [postcode, setPostcode] = useState('B14 7QH');
  const [trade, setTrade] = useState('plumbing');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [summary, setSummary] = useState<{ total?: number; region?: string; outward?: string; lockedCount?: number; errors?: string[] }>({});

  const runScan = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/leads/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postcode, trade, tier: 'paid' }),
      });

      const responseContentType = response.headers.get('content-type') || 'missing';
      console.log('[Demo scan]', { status: response.status, contentType: responseContentType });

      if (!responseContentType.includes('application/json')) {
        throw new Error('The live scan is warming up. Try again in a moment.');
      }

      const payload: ScanPayload = await response.json();
      console.log('[Demo payload]', payload);

      if (!response.ok) {
        throw new Error(payload.error || 'Live scan could not run right now.');
      }

      const mapped = Array.isArray(payload.leads)
        ? payload.leads.slice(0, 10).map((lead) => ({
            id: lead.id,
            title: lead.title,
            location: lead.location,
            estimatedValue: lead.estimatedValue,
            urgency: lead.urgency,
            source: lead.source,
            sourceConfidence: lead.sourceConfidence,
            score: lead.score,
          }))
        : [];

      setLeads(mapped.length ? mapped : FALLBACK_LEADS);
      setSummary({
        total: payload.total,
        region: payload.region,
        outward: payload.outward,
        lockedCount: payload.lockedCount,
        errors: payload.errors,
      });

      if (!mapped.length) {
        setError('No live leads right now. Showing fallback jobs so you can still test the flow.');
      }
    } catch (_err) {
      setLeads(FALLBACK_LEADS);
      setSummary({});
      setError('Live scan is unavailable right now. Showing sample leads instead.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void runScan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const visibleLeads = useMemo(() => leads.slice(0, 10), [leads]);

  return (
    <Shell>
      <main className="px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="border-4 border-black bg-white p-4">
            <h1 className="text-4xl font-black uppercase leading-none tracking-tight">DEMO: /api/leads/scan</h1>
            <p className="mt-2 text-xs font-black uppercase">REAL LEADS. FAIR SYSTEM. NO COMPETING.</p>

            <div className="mt-4 flex flex-wrap items-end gap-2">
              <label className="block">
                <span className="mb-1 block text-[10px] font-black uppercase tracking-widest">Postcode</span>
                <input
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                  className="w-40 border-4 border-black px-3 py-2 text-sm font-bold"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-[10px] font-black uppercase tracking-widest">Trade</span>
                <select value={trade} onChange={(e) => setTrade(e.target.value)} className="w-40 border-4 border-black px-3 py-2 text-sm font-bold">
                  <option value="plumbing">Plumbing</option>
                  <option value="electrical">Electrical</option>
                  <option value="roofing">Roofing</option>
                  <option value="building">Building</option>
                  <option value="carpentry">Carpentry</option>
                  <option value="painting">Painting</option>
                  <option value="hvac">HVAC</option>
                  <option value="landscaping">Landscaping</option>
                  <option value="all">All</option>
                </select>
              </label>
              <button onClick={runScan} disabled={loading} className="border-4 border-black bg-[#facc15] px-5 py-3 text-xs font-black uppercase tracking-widest disabled:opacity-50">
                {loading ? 'SCANNING...' : 'RUN LIVE SCAN'}
              </button>
            </div>
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <Panel title="Region" body={summary.region || 'Live lookup'} />
            <Panel title="Postcode" body={summary.outward || postcode} />
            <Panel title="Shown" body={String(visibleLeads.length)} />
            <Panel title="Locked" body={String(summary.lockedCount ?? 0)} />
          </div>

          {summary.errors?.length ? <p className="mt-3 text-sm font-black text-red-700">API note: {summary.errors.join(' | ')}</p> : null}
          {error ? <p className="mt-3 text-sm font-black text-red-700">{error}</p> : null}

          <div className="mt-4 grid gap-3">
            {visibleLeads.map((lead) => (
              <article key={lead.id} className="border-4 border-black bg-white p-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h2 className="text-xl font-black uppercase leading-none tracking-tight">{lead.title}</h2>
                    <p className="mt-1 text-sm font-bold uppercase">{lead.location}</p>
                  </div>
                  <p className="text-xs font-black uppercase">{lead.source}</p>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-4">
                  <p className="text-lg font-black uppercase">Value: {lead.estimatedValue}</p>
                  <p className="text-xs font-black uppercase">Urgency: {lead.urgency || 'medium'}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </Shell>
  );
}

export function CodexPage() {
  return (
    <ProductPage
      title="CODEX"
      summary="Write sharp replies and quotes fast. NO CHASING."
      sections={[
        { title: 'Pain', body: 'Slow replies lose jobs.' },
        { title: 'Fix', body: 'Build clean quote copy in minutes.' },
        { title: 'Control', body: 'You send faster and keep momentum.' },
        { title: 'Result', body: 'More wins with less admin drag.' },
      ]}
    />
  );
}

export function VantagePage() {
  return (
    <ProductPage
      title="VANTAGE"
      summary="Turn finished work into proof buyers trust. NO COMPETING."
      sections={[
        { title: 'Pain', body: 'No proof means weak trust.' },
        { title: 'Fix', body: 'Shape jobs into hard proof blocks.' },
        { title: 'Control', body: 'Lead with evidence, not promises.' },
        { title: 'Result', body: 'Higher-value jobs with less friction.' },
      ]}
    />
  );
}

export function VicinityPage() {
  return (
    <ProductPage
      title="VICINITY"
      summary="Show local proof so buyers stop shopping around. STAY IN CONTROL."
      sections={[
        { title: 'Pain', body: 'If locals cannot see your work, you lose trust.' },
        { title: 'Fix', body: 'Surface nearby completed jobs fast.' },
        { title: 'Control', body: 'Own your patch with visible results.' },
        { title: 'Result', body: 'Warmer enquiries and faster yes decisions.' },
      ]}
    />
  );
}

export function PricingPage() {
  return (
    <Shell>
      <main>
        <section className="border-b-4 border-black bg-[#e5e5e5] px-4 py-12">
          <div className="mx-auto max-w-6xl text-center">
            <h1 className="text-8xl font-black uppercase leading-none">THE COST OF DOING NOTHING</h1>
            <p className="mt-3 text-3xl font-bold text-[#8da0bd]">Adjust the sliders. See what you're leaving on the table every year.</p>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="border-4 border-black bg-[#e5e5e5] p-8 text-left shadow-[6px_6px_0_#111]">
                <div className="mb-8 flex items-center justify-between">
                  <p className="text-4xl font-black uppercase">HOURS WASTED WEEKLY</p>
                  <span className="border-4 border-black bg-[#facc15] px-4 py-1 text-6xl font-black">5</span>
                </div>
                <div className="h-3 border-4 border-black bg-white"><div className="h-full w-1/4 bg-[#facc15]" /></div>
                <div className="mb-8 mt-10 flex items-center justify-between">
                  <p className="text-4xl font-black uppercase">MILES DRIVEN FOR NOTHING</p>
                  <span className="border-4 border-black bg-[#facc15] px-4 py-1 text-6xl font-black">50</span>
                </div>
                <div className="h-3 border-4 border-black bg-white"><div className="h-full w-1/5 bg-[#facc15]" /></div>
              </div>
              <div className="border-4 border-black bg-[#05070d] p-8 text-center text-white shadow-[6px_6px_0_#111]">
                <p className="text-5xl font-black uppercase tracking-wider">YOU LOSE EVERY YEAR</p>
                <p className="mt-3 text-[86px] font-black leading-none text-[#facc15]">£12,870</p>
                <p className="mt-4 text-3xl font-black uppercase">THAT'S A SECOND VAN. PAID FOR FREE.</p>
                <Link to="/demo" className="mt-6 inline-flex border-4 border-[#facc15] bg-[#facc15] px-10 py-3 text-3xl font-black uppercase text-black">FIX THIS NOW →</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b-4 border-black bg-[#05070d] px-4 py-12">
          <div className="mx-auto max-w-6xl text-center">
            <h2 className="text-8xl font-black uppercase text-[#facc15]">ONE PRICE. NO GAMES.</h2>
            <p className="mt-2 text-3xl font-bold text-white">No lead fees. No bidding wars. No race to the bottom.</p>
            <p className="mx-auto mt-5 w-fit border-4 border-[#facc15] bg-[#facc15] px-6 py-2 text-2xl font-black uppercase">If this wins one £20k job, it pays for itself for years.</p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <article className="border-4 border-black bg-[#e5e5e5] p-6 text-left">
                <h3 className="text-5xl font-black uppercase">FREE TOOLS</h3>
                <p className="mt-1 text-8xl font-black">£0</p>
                <ul className="mt-3 space-y-2 text-xl font-bold">
                  <li>✓ Quote estimator</li><li>✓ Lead quality checker</li><li>✓ Market scanner</li><li className="text-[#8a9bb6]">✕ Job delivery</li>
                </ul>
                <Link to="/demo" className="mt-8 inline-flex border-4 border-black px-6 py-3 text-2xl font-black uppercase">USE FOR FREE</Link>
              </article>
              <article className="border-4 border-black bg-[#facc15] p-6 text-left">
                <p className="text-lg font-black uppercase">FOR TRADESMEN</p>
                <h3 className="text-5xl font-black uppercase">INTAKE ENGINE</h3>
                <p className="mt-1 text-8xl font-black">£49 <span className="text-3xl">/month</span></p>
                <ul className="mt-3 space-y-2 text-xl font-bold">
                  <li>✓ Better jobs delivered daily</li><li>✓ Tyre-kickers killed before they reach you</li><li>✓ Vantage + Vicinity + Codex</li>
                </ul>
                <Link to="/demo" className="mt-8 inline-flex border-4 border-black bg-black px-6 py-3 text-2xl font-black uppercase text-[#facc15]">GET STARTED →</Link>
              </article>
              <article className="border-4 border-black bg-[#e5e5e5] p-6 text-left">
                <h3 className="text-5xl font-black uppercase">CODEX</h3>
                <p className="mt-1 text-8xl font-black">£99 <span className="text-3xl">/month</span></p>
                <ul className="mt-3 space-y-2 text-xl font-bold">
                  <li>✓ Specs → sales proposals</li><li>✓ Better tender presentation</li><li>✓ For engineering firms and specialists</li>
                </ul>
                <Link to="/codex" className="mt-8 inline-flex border-4 border-black bg-black px-6 py-3 text-2xl font-black uppercase text-white">VIEW CODEX →</Link>
              </article>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 text-left">
              <div>
                <h3 className="text-6xl font-black uppercase text-[#facc15]">FREE TOOLS. NO CARD.</h3>
                <p className="mt-1 text-2xl font-bold text-white">Quote estimators, lead checkers, market scanners. Always free.</p>
              </div>
              <Link to="/demo" className="inline-flex border-4 border-white bg-white px-7 py-3 text-2xl font-black uppercase">SEE FREE TOOLS →</Link>
            </div>
          </div>
        </section>

        <section className="bg-[#e5e5e5] px-4 py-14 text-center">
          <h2 className="text-8xl font-black uppercase leading-none">READY TO STOP GUESSING?</h2>
          <p className="mx-auto mt-5 max-w-3xl text-3xl font-bold text-[#8da0bd]">Subscribe to Intake Engine. Get Vantage, Vicinity, and Codex included.</p>
          <Link to="/demo" className="mx-auto mt-8 inline-flex border-4 border-black bg-[#facc15] px-12 py-5 text-4xl font-black uppercase shadow-[6px_6px_0_#111]">GET INTAKE ENGINE →</Link>
        </section>
      </main>
    </Shell>
  );
}

export function DashboardPage() {
  return <ProductPage title="DASHBOARD" summary="Your intake control room." sections={[{ title: 'Focus', body: 'Watch lead quality and move quick.' }, { title: 'Speed', body: 'See what matters first.' }, { title: 'Control', body: 'Run jobs like a system.' }, { title: 'Result', body: 'Less chaos. More paid work.' }]} />;
}

export function ActivationPendingPage() {
  return <ProductPage title="ACTIVATION PENDING" summary="Setup is queued. Demo is live now." sections={[{ title: 'Now', body: 'Run the demo and check job flow.' }, { title: 'Next', body: 'We finish setup and unlock full access.' }, { title: 'Control', body: 'You keep momentum while waiting.' }, { title: 'Result', body: 'No dead end.' }]} />;
}

export function PrivacyPage() {
  return <ProductPage title="PRIVACY" summary="We keep only what is needed to run the FAIR SYSTEM." sections={[{ title: 'Keep', body: 'Only routing and scoring data.' }, { title: 'No traps', body: 'No pointless data grab.' }, { title: 'Control', body: 'Simple and direct.' }, { title: 'Result', body: 'Clear rules. No noise.' }]} />;
}

export function TermsPage() {
  return <ProductPage title="TERMS" summary="JobFilter filters leads. You control pricing and delivery." sections={[{ title: 'Role', body: 'We filter intake and surface jobs.' }, { title: 'Boundary', body: 'Your trade agreement stays yours.' }, { title: 'Control', body: 'Clear split. No confusion.' }, { title: 'Result', body: 'Fair and simple.' }]} />;
}
