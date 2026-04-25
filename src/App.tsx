import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';

type Lead = {
  id: string;
  title: string;
  location: string;
  estimatedValue: string;
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
  { id: 'fallback-1', title: 'Boiler replacement', location: 'Birmingham B14', estimatedValue: '£3k–£4k', source: 'Local fallback' },
  { id: 'fallback-2', title: 'Full rewire', location: 'Solihull B91', estimatedValue: '£5k–£8k', source: 'Local fallback' },
  { id: 'fallback-3', title: 'Bathroom refit', location: 'Coventry CV1', estimatedValue: '£4k–£6k', source: 'Local fallback' },
];

const PROCESS = [
  ['Fetch', 'Pull planning, tender, and internal signals.'],
  ['Normalise', 'Turn noisy records into one lead format.'],
  ['Filter', 'Drop weak jobs and bad-fit work.'],
  ['Score', 'Push urgency, value, and location to the top.'],
  ['Deliver', 'Show the best jobs first in a simple feed.'],
];

function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-slate-950">
      <header className="sticky top-0 z-20 border-b-2 border-slate-950 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link to="/" className="font-black uppercase tracking-tight text-lg">
            JobFilter
          </Link>
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
    <Link
      to={to}
      className="inline-flex items-center justify-center border-2 border-slate-950 bg-[#f5d000] px-5 py-3 text-xs font-black uppercase tracking-widest"
    >
      {label}
    </Link>
  );
}

function Panel({ title, body }: { title: string; body: string }) {
  return (
    <article className="border-2 border-slate-950 bg-white p-4">
      <h3 className="text-sm font-black uppercase tracking-widest">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-700">{body}</p>
    </article>
  );
}

function ProductPage({ title, summary, sections }: { title: string; summary: string; sections: Array<{ title: string; body: string }> }) {
  return (
    <Shell>
      <main className="px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-black uppercase tracking-widest text-slate-500">Built for trades</p>
          <h1 className="mt-3 text-4xl font-black uppercase tracking-tight">{title}</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700">{summary}</p>
          <div className="mt-8">
            <CTA />
          </div>
        </div>
      </main>
      <section className="border-t border-b border-slate-200 px-4 py-10">
        <div className="mx-auto grid max-w-6xl gap-3 md:grid-cols-2">
          {sections.map((section) => (
            <div key={section.title}>
              <Panel title={section.title} body={section.body} />
            </div>
          ))}
        </div>
      </section>
      <section className="px-4 py-12">
        <div className="mx-auto max-w-4xl flex flex-wrap gap-3">
          <CTA />
          <Link to="/pricing" className="inline-flex items-center justify-center border-2 border-slate-950 px-5 py-3 text-xs font-black uppercase tracking-widest">
            View pricing
          </Link>
        </div>
      </section>
    </Shell>
  );
}

export function HomePage() {
  return (
    <Shell>
      <main>
        <section className="border-b-2 border-slate-950 px-4 py-16">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
            <div>
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
            <div className="grid gap-3">
              <div className="border-2 border-slate-950 p-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">What it gives you</p>
                <p className="mt-2 text-2xl font-black uppercase leading-none">Real leads. Faster quotes. Less waste.</p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <Panel title="No chasing" body="Only jobs worth your time." />
                <Panel title="No competing" body="Better signal, less noise." />
                <Panel title="Stay in control" body="Choose the work you want." />
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 px-4 py-8">
          <div className="mx-auto grid max-w-6xl gap-3 md:grid-cols-3">
            <Panel title="Live scan" body="Routes straight to /api/leads/scan and shows the feed on screen." />
            <Panel title="Signal quality" body="Planning, tender, and internal signals mixed into one lead view." />
            <Panel title="Built for trades" body="Simple interface. Fast scan. No fake pages." />
          </div>
        </section>

        <Section title="Trust" body="Planning data, official tender signals, and structured fallback leads only. No fake pages. No dead ends." />
        <Section title="How it works" body="Fetch. Normalise. Filter. Score. Store. Deliver. The demo shows the live scan end to end." />

        <section className="border-b border-slate-200 px-4 py-10">
          <div className="mx-auto grid max-w-6xl gap-3 md:grid-cols-5">
            {PROCESS.map(([title, body]) => (
              <div key={title}>
                <Panel title={title} body={body} />
              </div>
            ))}
          </div>
        </section>

        <section className="px-4 py-12">
          <div className="mx-auto flex max-w-4xl flex-wrap gap-3">
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
      const payload: ScanPayload = await response.json();
      const mapped = Array.isArray(payload.leads)
        ? payload.leads.slice(0, 10).map((lead) => ({
            id: lead.id,
            title: lead.title,
            location: lead.location,
            estimatedValue: lead.estimatedValue,
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
      if (!mapped.length && payload.error) setError(payload.error);
    } catch (err) {
      setLeads(FALLBACK_LEADS);
      setSummary({});
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
              <input
                value={postcode}
                onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                className="w-40 border-2 border-slate-950 px-3 py-2 text-sm font-bold"
              />
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
            <button
              onClick={runScan}
              disabled={loading}
              className="border-2 border-slate-950 bg-[#f5d000] px-5 py-3 text-xs font-black uppercase tracking-widest disabled:opacity-50"
            >
              {loading ? 'Scanning...' : 'Run Live Scan'}
            </button>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">API: /api/leads/scan</p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <Panel title="Region" body={summary.region || 'Live lookup'} />
            <Panel title="Postcode" body={summary.outward || postcode} />
            <Panel title="Shown" body={String(visibleLeads.length)} />
            <Panel title="Locked" body={String(summary.lockedCount ?? 0)} />
          </div>

          {summary.errors?.length ? (
            <p className="mt-4 text-sm font-bold text-slate-600">API note: {summary.errors.join(' | ')}</p>
          ) : null}

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
                <div className="mt-3 flex flex-wrap items-center gap-4">
                  <p className="text-xl font-black">{lead.estimatedValue}</p>
                  {typeof lead.score === 'number' ? <p className="text-xs font-black uppercase tracking-widest text-slate-500">Score {lead.score}</p> : null}
                  {typeof lead.sourceConfidence === 'number' ? <p className="text-xs font-black uppercase tracking-widest text-slate-500">Confidence {lead.sourceConfidence}%</p> : null}
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
      title="Codex"
      summary="Turns job details, tender text, and site notes into clean quotes and reply copy fast."
      sections={[
        { title: 'What it does', body: 'Shapes rough job info into a clear quote draft, job reply, or follow-up message.' },
        { title: 'Why it matters', body: 'Cuts admin time and helps you answer faster without writing from scratch.' },
        { title: 'Best for', body: 'Quotes, tender replies, and quick sales copy for trades who want clean wording.' },
        { title: 'Output', body: 'Short, usable text. No waffle. Ready to send.' },
      ]}
    />
  );
}

export function VantagePage() {
  return (
    <ProductPage
      title="Vantage"
      summary="Shapes completed work into sharp proof that helps you win the next job."
      sections={[
        { title: 'What it does', body: 'Turns finished jobs, notes, and photos into proof that makes you look established.' },
        { title: 'Why it matters', body: 'Better proof wins better work. Simple as that.' },
        { title: 'Best for', body: 'Before-and-after posts, case studies, and trust content for new enquiries.' },
        { title: 'Output', body: 'Clear pages and sales-ready assets, not a mess of raw material.' },
      ]}
    />
  );
}

export function VicinityPage() {
  return (
    <ProductPage
      title="Vicinity"
      summary="Keeps your best finished jobs visible so the next enquiry sees real work, not fluff."
      sections={[
        { title: 'What it does', body: 'Shows nearby finished work and local proof so customers know you actually operate in their area.' },
        { title: 'Why it matters', body: 'Local proof builds trust fast and keeps enquiries warmer.' },
        { title: 'Best for', body: 'Trade pages, service areas, and local outreach.' },
        { title: 'Output', body: 'Simple proof blocks that make you look active, not empty.' },
      ]}
    />
  );
}

export function PricingPage() {
  return (
    <Shell>
      <main className="px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-black uppercase tracking-tight">Pricing</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700">
            Simple access. Start with the demo, then choose the tier that fits your volume.
          </p>
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
  return (
    <ProductPage
      title="Dashboard"
      summary="Your live intake control room. Use the demo to test the feed before you launch."
      sections={[
        { title: 'What it does', body: 'Shows your lead feed, payment state, and delivery status in one place.' },
        { title: 'Why it matters', body: 'Keeps the business side visible without adding clutter.' },
        { title: 'Best for', body: 'Checking lead quality, delivery speed, and upgrade state.' },
        { title: 'Output', body: 'The core control surface for live users.' },
      ]}
    />
  );
}

export function ActivationPendingPage() {
  return (
    <ProductPage
      title="Activation pending"
      summary="Your setup is queued. The demo is live now and shows the real scan path."
      sections={[
        { title: 'What it means', body: 'Your subscription or setup is not fully live yet, but the scan path is ready.' },
        { title: 'What to do now', body: 'Use the demo and review the lead feed before launch.' },
        { title: 'Best for', body: 'Waiting on billing or account activation.' },
        { title: 'Output', body: 'Clear status, no dead end.' },
      ]}
    />
  );
}

export function PrivacyPage() {
  return (
    <ProductPage
      title="Privacy"
      summary="JobFilter only processes the data needed to filter and deliver leads. No empty promises."
      sections={[
        { title: 'What we keep', body: 'Only the data needed to route, score, and deliver the feed.' },
        { title: 'What we do not do', body: 'No public selling, no pointless collection, no fake lead sharing.' },
        { title: 'Best for', body: 'Users who want the simple version, not legal noise.' },
        { title: 'Output', body: 'A direct privacy statement for the live product.' },
      ]}
    />
  );
}

export function TermsPage() {
  return (
    <ProductPage
      title="Terms"
      summary="You stay responsible for pricing and delivery. JobFilter is the filter, not the contract."
      sections={[
        { title: 'What it does', body: 'Filters and surfaces leads. It does not replace your trade agreement.' },
        { title: 'Why it matters', body: 'Keeps the rules clear and the product honest.' },
        { title: 'Best for', body: 'The minimum legal page every live SaaS needs.' },
        { title: 'Output', body: 'Short, usable terms copy.' },
      ]}
    />
  );
}
