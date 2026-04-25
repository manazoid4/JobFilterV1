import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';

type Lead = {
  id: string;
  title: string;
  location: string;
  estimatedValue: string;
  source: string;
};

type ScanPayload = {
  leads?: Array<{
    id: string;
    title: string;
    location: string;
    estimatedValue: string;
    source: string;
  }>;
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
  { id: 'fallback-1', title: 'Boiler replacement', location: 'Birmingham B14', estimatedValue: '£3k–£4k', source: 'Local fallback' },
  { id: 'fallback-2', title: 'Full rewire', location: 'Solihull B91', estimatedValue: '£5k–£8k', source: 'Local fallback' },
  { id: 'fallback-3', title: 'Bathroom refit', location: 'Coventry CV1', estimatedValue: '£4k–£6k', source: 'Local fallback' },
];

function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-slate-950">
      <header className="border-b-2 border-slate-950 sticky top-0 z-20 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link to="/" className="font-black uppercase tracking-tight text-lg">JobFilter</Link>
          <nav className="flex flex-wrap items-center gap-3 text-[11px] font-black uppercase tracking-widest">
            {NAV_ITEMS.map((item) => (
              <Link key={item.to} to={item.to} className="hover:underline">
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

function Section({ title, body }: { title: string; body: string }) {
  return (
    <section className="border-b border-slate-200 px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-2xl font-black uppercase tracking-tight">{title}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-700">{body}</p>
      </div>
    </section>
  );
}

function CTA({ to = '/demo', label = 'Run Live Demo' }: { to?: string; label?: string }) {
  return (
    <Link to={to} className="inline-flex items-center justify-center border-2 border-slate-950 bg-[#f5d000] px-5 py-3 text-xs font-black uppercase tracking-widest">
      {label}
    </Link>
  );
}

export function HomePage() {
  return (
    <Shell>
      <main>
        <section className="border-b-2 border-slate-950 px-4 py-16">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-black uppercase tracking-widest text-slate-500">Built for trades</p>
            <h1 className="mt-3 max-w-3xl text-5xl font-black uppercase tracking-tight leading-none">
              Intake Engine for real jobs.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700">
              Real leads. No chasing. No competing. JobFilter filters planning and construction signals, scores the good ones, and keeps the noise out.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CTA />
              <Link to="/pricing" className="inline-flex items-center justify-center border-2 border-slate-950 px-5 py-3 text-xs font-black uppercase tracking-widest">
                See pricing
              </Link>
            </div>
            <p className="mt-4 text-xs font-bold uppercase tracking-widest text-slate-500">API live at /api/leads/scan</p>
          </div>
        </section>
        <Section title="Trust" body="Planning data, official tender signals, and structured fallback leads only. No fake pages. No dead ends." />
        <Section title="How it works" body="Fetch. Normalise. Filter. Score. Store. Deliver. The demo shows the live scan end to end." />
        <section className="px-4 py-12">
          <div className="mx-auto max-w-4xl flex flex-wrap gap-3">
            <CTA />
            <Link to="/demo" className="inline-flex items-center justify-center border-2 border-slate-950 px-5 py-3 text-xs font-black uppercase tracking-widest">
              Open demo
            </Link>
          </div>
        </section>
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

  const runScan = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/leads/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postcode, trade, tier: 'free' }),
      });
      const payload: ScanPayload = await response.json();
      const mapped = Array.isArray(payload.leads)
        ? payload.leads.slice(0, 10).map((lead) => ({
            id: lead.id,
            title: lead.title,
            location: lead.location,
            estimatedValue: lead.estimatedValue,
            source: lead.source,
          }))
        : [];
      setLeads(mapped.length ? mapped : FALLBACK_LEADS);
      if (!mapped.length && payload.error) setError(payload.error);
    } catch (err) {
      setLeads(FALLBACK_LEADS);
      setError(err instanceof Error ? err.message : 'Live scan failed');
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
      <main className="px-4 py-10">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end gap-3">
            <label className="block">
              <span className="mb-1 block text-[10px] font-black uppercase tracking-widest text-slate-500">Postcode</span>
              <input value={postcode} onChange={(e) => setPostcode(e.target.value.toUpperCase())} className="w-40 border-2 border-slate-950 px-3 py-2 text-sm font-bold" />
            </label>
            <label className="block">
              <span className="mb-1 block text-[10px] font-black uppercase tracking-widest text-slate-500">Trade</span>
              <select value={trade} onChange={(e) => setTrade(e.target.value)} className="w-40 border-2 border-slate-950 px-3 py-2 text-sm font-bold">
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
            <button onClick={runScan} disabled={loading} className="border-2 border-slate-950 bg-[#f5d000] px-5 py-3 text-xs font-black uppercase tracking-widest disabled:opacity-50">
              {loading ? 'Scanning...' : 'Run Live Scan'}
            </button>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">API: /api/leads/scan</p>
          </div>
          {error && <p className="mt-4 text-sm font-bold text-red-600">{error}</p>}
          <div className="mt-8 grid gap-3">
            {visibleLeads.map((lead) => (
              <article key={lead.id} className="border-2 border-slate-950 bg-white p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-black uppercase tracking-tight">{lead.title}</h2>
                    <p className="mt-1 text-sm font-bold text-slate-600">{lead.location}</p>
                  </div>
                  <p className="text-sm font-black uppercase tracking-widest text-slate-500">{lead.source}</p>
                </div>
                <p className="mt-3 text-xl font-black">{lead.estimatedValue}</p>
              </article>
            ))}
          </div>
        </div>
      </main>
    </Shell>
  );
}

function ProductPage({ title, body }: { title: string; body: string }) {
  return (
    <Shell>
      <main className="px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-black uppercase tracking-widest text-slate-500">Built for trades</p>
          <h1 className="mt-3 text-4xl font-black uppercase tracking-tight">{title}</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700">{body}</p>
          <div className="mt-8">
            <CTA />
          </div>
        </div>
      </main>
    </Shell>
  );
}

export function CodexPage() {
  return <ProductPage title="Codex" body="Turns job details, tender text, and site notes into clean quotes and reply copy fast." />;
}

export function VantagePage() {
  return <ProductPage title="Vantage" body="Shapes completed work into sharp proof that helps you win the next job." />;
}

export function VicinityPage() {
  return <ProductPage title="Vicinity" body="Keeps your best finished jobs visible so the next enquiry sees real work, not fluff." />;
}

export function PricingPage() {
  return (
    <Shell>
      <main className="px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-black uppercase tracking-tight">Pricing</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700">Simple access. Start with the demo, then choose the tier that fits your volume.</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {['Starter', 'Growth', 'Dominance'].map((tier) => (
              <article key={tier} className="border-2 border-slate-950 p-4">
                <h2 className="text-xl font-black uppercase">{tier}</h2>
                <p className="mt-2 text-sm text-slate-700">REAL LEADS. NO CHASING. NO COMPETING.</p>
              </article>
            ))}
          </div>
          <div className="mt-8">
            <CTA />
          </div>
        </div>
      </main>
    </Shell>
  );
}

export function DashboardPage() {
  return <ProductPage title="Dashboard" body="Your live intake control room. Use the demo to test the feed before you launch." />;
}

export function ActivationPendingPage() {
  return <ProductPage title="Activation pending" body="Your setup is queued. The demo is live now and shows the real scan path." />;
}

export function PrivacyPage() {
  return <ProductPage title="Privacy" body="JobFilter only processes the data needed to filter and deliver leads. No empty promises." />;
}

export function TermsPage() {
  return <ProductPage title="Terms" body="You stay responsible for pricing and delivery. JobFilter is the filter, not the contract." />;
}
