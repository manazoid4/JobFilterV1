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
  { to: '/', label: 'Home' },
  { to: '/demo', label: 'Demo' },
  { to: '/codex', label: 'Codex' },
  { to: '/vantage', label: 'Vantage' },
  { to: '/vicinity', label: 'Vicinity' },
  { to: '/pricing', label: 'Pricing' },
] as const;

const FALLBACK_LEADS: Lead[] = [
  { id: 'fallback-1', title: 'Boiler replacement', location: 'Birmingham B14', estimatedValue: '£3k–£4k', urgency: 'high', source: 'Fallback Feed' },
  { id: 'fallback-2', title: 'Full rewire', location: 'Solihull B91', estimatedValue: '£5k–£8k', urgency: 'medium', source: 'Fallback Feed' },
  { id: 'fallback-3', title: 'Bathroom refit', location: 'Coventry CV1', estimatedValue: '£4k–£6k', urgency: 'high', source: 'Fallback Feed' },
];

function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#facc15] text-black">
      <header className="sticky top-0 z-20 border-b-4 border-black bg-[#facc15]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2">
          <Link to="/" className="text-2xl font-black uppercase leading-none tracking-tight">
            JobFilter
          </Link>
          <nav className="flex flex-wrap items-center gap-2 text-[11px] font-black uppercase tracking-wider">
            {NAV_ITEMS.map((item) => (
              <Link key={item.to} to={item.to} className="border-2 border-black bg-white px-2 py-1 hover:bg-black hover:text-[#facc15]">
                {item.label}
              </Link>
            ))}
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
      pain: 'No proof means no trust.',
      body: 'Turn finished jobs into hard proof that wins the next job.',
      to: '/vantage',
    },
    {
      name: 'VICINITY',
      pain: 'If locals cannot see your work, they pick someone else.',
      body: 'Show local work fast so buyers stop hesitating.',
      to: '/vicinity',
    },
    {
      name: 'CODEX',
      pain: 'Slow replies kill deals.',
      body: 'Push sharp quote copy in minutes. NO CHASING.',
      to: '/codex',
    },
  ];

  return (
    <section className="border-y-4 border-black bg-[#facc15] px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-4xl font-black uppercase leading-none tracking-tight">THEN WIN THEM.</h2>
        <p className="mt-2 text-sm font-bold uppercase">CONTROL THE JOBS. STAY IN CONTROL.</p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {cards.map((card) => (
            <article key={card.name} className="flex flex-col border-4 border-black bg-white p-4">
              <h3 className="text-2xl font-black uppercase leading-none tracking-tight">{card.name}</h3>
              <p className="mt-2 text-sm font-black text-red-700 uppercase">{card.pain}</p>
              <p className="mt-2 text-sm font-semibold leading-5">{card.body}</p>
              <Link
                to={card.to}
                className="mt-4 inline-flex w-fit items-center justify-center border-4 border-black bg-black px-4 py-2 text-xs font-black uppercase tracking-widest text-[#facc15]"
              >
                ENTER THE INTAKE
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
        <section className="border-b-4 border-black bg-[#facc15] px-4 py-10">
          <div className="mx-auto max-w-6xl border-4 border-black bg-[#facc15] p-6">
            <h1 className="text-6xl font-black uppercase leading-none tracking-tight">REAL LEADS. NO CHASING. NO COMPETING.</h1>
            <p className="mt-3 max-w-3xl text-sm font-bold uppercase">
              ENTER THE INTAKE. CONTROL THE JOBS. BUILT FOR TRADES. FAIR SYSTEM. NO CONTRACTS.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <CTA />
              <Link to="/pricing" className="inline-flex items-center justify-center border-4 border-black bg-white px-5 py-3 text-xs font-black uppercase tracking-widest">
                FAIR SYSTEM
              </Link>
            </div>
          </div>
        </section>

        <section className="border-b-4 border-black bg-white px-4 py-6">
          <div className="mx-auto grid max-w-6xl gap-3 md:grid-cols-3">
            <Panel title="REAL LEADS" body="See serious jobs, not noise." />
            <Panel title="NO CHASING" body="Auto follow-up handles the lag." />
            <Panel title="STAY IN CONTROL" body="Pick work you actually want." />
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
      <main className="px-4 py-8">
        <div className="mx-auto max-w-5xl border-4 border-black bg-white p-6">
          <h1 className="text-5xl font-black uppercase leading-none tracking-tight">PRICING</h1>
          <p className="mt-3 text-sm font-semibold uppercase">NO CONTRACTS. FAIR SYSTEM. BUILT FOR TRADES.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {['Starter', 'Growth', 'Dominance'].map((tier) => (
              <article key={tier} className="border-4 border-black bg-[#facc15] p-4">
                <h2 className="text-2xl font-black uppercase">{tier}</h2>
                <p className="mt-2 text-sm font-black uppercase">REAL LEADS. NO CHASING. NO COMPETING.</p>
              </article>
            ))}
          </div>
          <div className="mt-5">
            <CTA />
          </div>
        </div>
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
