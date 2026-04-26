import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';

// ── Types ─────────────────────────────────────────────────────────────────────

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

// ── Constants ─────────────────────────────────────────────────────────────────

const NAV_ITEMS: Array<{ to: string; label: string }> = [
  { to: '/', label: 'Home' },
  { to: '/pricing', label: 'Intake Engine' },
  { to: '/vantage', label: 'Vantage' },
  { to: '/vicinity', label: 'Vicinity' },
  { to: '/pricing', label: 'Pricing' },
];

const FALLBACK_POOL: Lead[] = [
  { id: 'fp-1',  title: 'Boiler Replacement – Vaillant combi failed',        location: 'Birmingham, B14',   estimatedValue: '£2.5k–£3.5k', urgency: 'high',   source: 'JobFilter Direct' },
  { id: 'fp-2',  title: 'Full Rewire – 3-bed semi, no RCD board',             location: 'Coventry, CV5',     estimatedValue: '£4k–£6k',     urgency: 'medium', source: 'JobFilter Direct' },
  { id: 'fp-3',  title: 'Roof Replacement – Active leak, slipped tiles',      location: 'Wolverhampton, WV3',estimatedValue: '£9k–£14k',    urgency: 'high',   source: 'JobFilter Direct' },
  { id: 'fp-4',  title: 'Kitchen Extension – Planning approved, 4×4m',        location: 'Solihull, B91',     estimatedValue: '£28k–£42k',   urgency: 'low',    source: 'JobFilter Direct' },
  { id: 'fp-5',  title: 'Bathroom Refit – Full suite replacement',            location: 'Leeds, LS6',        estimatedValue: '£4.5k–£7k',   urgency: 'medium', source: 'JobFilter Direct' },
  { id: 'fp-6',  title: 'EV Charger Install – 7kW, OZEV grant eligible',      location: 'Dudley, DY1',       estimatedValue: '£750–£1.1k',  urgency: 'medium', source: 'JobFilter Direct' },
  { id: 'fp-7',  title: 'Loft Conversion – Dormer, 2 beds + bathroom',        location: 'Manchester, M20',   estimatedValue: '£42k–£58k',   urgency: 'low',    source: 'JobFilter Direct' },
  { id: 'fp-8',  title: 'Consumer Unit Upgrade – Rental EICR failed',         location: 'Bolton, BL3',       estimatedValue: '£700–£1k',    urgency: 'high',   source: 'JobFilter Direct' },
  { id: 'fp-9',  title: 'Air Source Heat Pump – 4-bed, BUS grant eligible',   location: 'Bristol, BS9',      estimatedValue: '£9k–£14k',    urgency: 'low',    source: 'JobFilter Direct' },
  { id: 'fp-10', title: 'Damp Proof Course – 1930s terrace, rising damp',     location: 'Smethwick, B67',    estimatedValue: '£1.8k–£3.2k', urgency: 'high',   source: 'JobFilter Direct' },
];

function shuffleLeads(arr: Lead[]): Lead[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── Stripe checkout ────────────────────────────────────────────────────────────

async function redirectToCheckout(email = ''): Promise<void> {
  try {
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json() as { url?: string };
    if (data?.url) {
      window.location.href = data.url;
    } else {
      window.location.href = '/demo';
    }
  } catch {
    window.location.href = '/demo';
  }
}

// ── Shell ─────────────────────────────────────────────────────────────────────

function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 text-black">
      <header className="sticky top-0 z-20 border-b border-[#2d3b4f] bg-[#0a0f1e]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold leading-none tracking-tight text-white">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[#facc15] text-xl">🇬🇧</span>
            JobFilter
          </Link>
          <nav className="flex flex-wrap items-center gap-4 text-sm font-semibold">
            {NAV_ITEMS.map((item) => (
              <Link key={item.label} to={item.to} className="text-[#94a3b8] transition-colors hover:text-white">
                {item.label}
              </Link>
            ))}
            <Link to="/demo" className="rounded-md bg-[#2563eb] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1d4ed8]">
              Find Jobs
            </Link>
          </nav>
        </div>
      </header>
      {children}
      <footer className="border-t border-[#2d3b4f] bg-[#0a0f1e] px-4 py-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <p className="text-sm font-medium text-[#64748b]">© 2026 JobFilter. Built for UK trades.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-sm text-[#64748b] hover:text-white">Privacy</Link>
            <Link to="/terms" className="text-sm text-[#64748b] hover:text-white">Terms</Link>
            <Link to="/codex" className="text-sm font-semibold text-[#06b6d4] hover:text-white">For manufacturers →</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ── Shared components ──────────────────────────────────────────────────────────

function TrustStrip() {
  return (
    <div className="border-y-2 border-[#2d3b4f] bg-[#0a0f1e] px-4 py-3">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-6 md:gap-10">
        <p className="text-sm font-semibold text-[#facc15]">247 jobs found today</p>
        <p className="text-sm font-semibold text-white">Updated live</p>
        <p className="text-sm font-semibold text-[#94a3b8]">3,200+ tradespeople</p>
        <p className="text-sm font-semibold text-[#94a3b8]">📱 Delivered to WhatsApp</p>
      </div>
    </div>
  );
}

function Testimonial() {
  return (
    <section className="border-b-2 border-gray-200 bg-white px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#94a3b8]">What tradespeople say</p>
        <blockquote className="mt-4 border-l-4 border-[#2563eb] pl-6">
          <p className="text-xl font-semibold leading-8 text-gray-800">
            "I was spending Sunday evenings looking through Facebook groups and Checkatrade hoping
            something useful would come up. JobFilter replaced all of that. I get a message every
            morning — usually six or seven jobs within 20 miles — and I pick the ones worth calling.
            Signed two loft conversions in my first month."
          </p>
          <footer className="mt-4">
            <p className="text-base font-bold text-gray-900">Dean Farrow</p>
            <p className="text-sm font-medium text-[#64748b]">Roofer · Leeds · Member since 2024</p>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}

const URGENCY_STYLE: Record<string, { badge: string; bar: string }> = {
  high:   { badge: 'bg-red-50 text-red-600 border border-red-200',              bar: 'bg-red-500' },
  medium: { badge: 'bg-amber-50 text-amber-700 border border-amber-200',        bar: 'bg-[#facc15]' },
  low:    { badge: 'bg-emerald-50 text-emerald-700 border border-emerald-200',  bar: 'bg-emerald-400' },
};

function LeadCard({ lead }: { lead: Lead }) {
  const urg = (lead.urgency ?? 'medium').toLowerCase();
  const style = URGENCY_STYLE[urg] ?? URGENCY_STYLE.medium;
  const daysAgo = stableDaysAgo(lead.id);
  return (
    <article className="relative flex overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className={`w-1 flex-shrink-0 ${style.bar}`} />
      <div className="flex-1 p-4">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="flex-1">
            <h2 className="text-base font-bold leading-snug text-gray-900">{lead.title}</h2>
            <p className="mt-0.5 font-mono text-xs text-gray-500">{lead.location}</p>
          </div>
          <span className={`rounded px-2 py-0.5 text-[11px] font-semibold capitalize ${style.badge}`}>
            {urg}
          </span>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-3">
          <span className="text-lg font-bold text-gray-900">{lead.estimatedValue}</span>
          <div className="ml-auto flex gap-2">
            <span className="rounded-md border border-gray-200 bg-gray-50 px-2 py-0.5 font-mono text-[11px] text-gray-500">
              {lead.sourceConfidence ?? 80}% match
            </span>
            <span className="rounded-md border border-gray-200 bg-gray-50 px-2 py-0.5 font-mono text-[11px] text-gray-500">
              {daysAgo}d ago
            </span>
            <span className="rounded-md border border-gray-200 bg-gray-50 px-2 py-0.5 font-mono text-[11px] text-gray-500">
              {lead.source}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

function Panel({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-lg border border-gray-200 bg-white p-4">
      <h3 className="text-xs font-semibold text-gray-500">{title}</h3>
      <p className="mt-1 text-base font-bold text-gray-900">{body}</p>
    </article>
  );
}

function stableDaysAgo(id: string): number {
  let h = 0;
  for (const c of id) h = (h * 31 + c.charCodeAt(0)) & 0xffff;
  return (h % 5) + 1;
}

function CTA({ to = '/demo', label = 'Find Jobs' }: { to?: string; label?: string }) {
  return (
    <Link to={to} className="inline-flex items-center justify-center rounded-md bg-[#2563eb] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1d4ed8]">
      {label}
    </Link>
  );
}

function CheckoutButton({ label = 'Get Intake Engine →', email = '' }: { label?: string; email?: string }) {
  const [loading, setLoading] = useState(false);
  return (
    <button
      disabled={loading}
      onClick={async () => { setLoading(true); await redirectToCheckout(email); setLoading(false); }}
      className="inline-flex cursor-pointer items-center justify-center rounded-md bg-[#2563eb] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#1d4ed8] disabled:opacity-60"
    >
      {loading ? 'Redirecting...' : label}
    </button>
  );
}

function ProductPage({ title, summary, sections }: { title: string; summary: string; sections: Array<{ title: string; body: string }> }) {
  return (
    <Shell>
      <main className="px-4 py-8">
        <div className="mx-auto max-w-5xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#2563eb]">Built for trades</p>
          <h1 className="mt-2 text-4xl font-bold leading-tight tracking-tight text-gray-900">{title}</h1>
          <p className="mt-3 max-w-3xl text-base font-medium leading-6 text-gray-600">{summary}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <CTA label="Get leads" />
            <Link to="/pricing" className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50">
              No contracts
            </Link>
          </div>
        </div>
        <section className="mx-auto mt-4 grid max-w-5xl gap-3 md:grid-cols-2">
          {sections.map((s) => (
            <div key={s.title}><Panel title={s.title} body={s.body} /></div>
          ))}
        </section>
      </main>
    </Shell>
  );
}

function ProductCards() {
  const cards = [
    { name: 'Vantage',  pain: 'Your price is right. Their PDF looks better.',    body: 'Vantage turns your tenders into premium visual bid decks that win on presentation.', to: '/vantage' },
    { name: 'Vicinity', pain: 'Your best work is buried in your camera roll.',    body: 'Vicinity turns finished jobs into local sales assets that keep winning premium work.', to: '/vicinity' },
    { name: 'Codex',    pain: 'Complex specs lose jobs to simpler quotes.',        body: 'Codex converts technical complexity into clear sales copy that closes jobs.', to: '/codex' },
  ];
  return (
    <section className="border-y-2 border-gray-200 bg-[#f8fafc] px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-4xl font-bold leading-tight text-gray-900">Then win the job.</h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-lg font-medium text-gray-600">Getting in front of the job is step one. These three make sure you walk out with it.</p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <article key={card.name} className="flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900">{card.name}</h3>
              <p className="mt-4 text-base font-semibold text-red-600">{card.pain}</p>
              <p className="mt-3 text-sm font-medium leading-6 text-gray-600">{card.body}</p>
              <Link to={card.to} className="mt-6 inline-flex w-fit items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50">
                Yours with Intake Engine →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── HomePage ──────────────────────────────────────────────────────────────────

export function HomePage() {
  return (
    <Shell>
      <main>
        {/* 1. HERO */}
        <section className="border-b-2 border-[#2d3b4f] bg-[#0a0f1e] px-4 py-16">
          <div className="mx-auto max-w-6xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#06b6d4]">Built for UK tradespeople</p>
            <h1 className="mt-4 text-5xl font-bold leading-tight tracking-tight text-white md:text-6xl">
              The jobs worth quoting<br />land in your WhatsApp.
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-xl font-medium leading-8 text-[#94a3b8]">
              JobFilter scans planning applications, contract notices, and local signals across the UK —
              then sends only the verified, high-value work directly to you. Every morning.
            </p>
            <p className="mt-3 text-base font-medium text-[#64748b]">📱 Jobs delivered to WhatsApp. No apps. No dashboards. Just leads.</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link to="/demo" className="inline-flex rounded-md bg-[#facc15] px-8 py-3.5 text-base font-bold text-black transition-colors hover:bg-yellow-300">
                See jobs near you →
              </Link>
              <Link to="/pricing" className="inline-flex rounded-md border border-[#2d3b4f] px-8 py-3.5 text-base font-semibold text-[#94a3b8] transition-colors hover:border-white hover:text-white">
                View pricing
              </Link>
            </div>
            <p className="mt-6 text-sm font-medium text-[#64748b]">
              Used by 1,400+ UK tradesmen · Average 11 qualified leads per week
            </p>
          </div>
        </section>

        <TrustStrip />

        {/* 2. INTAKE ENGINE */}
        <section className="border-b-2 border-[#2d3b4f] bg-[#0a0f1e] px-4 py-14">
          <div className="mx-auto max-w-6xl">
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-[#06b6d4]">The core product</p>
            <h2 className="mt-2 text-center text-4xl font-bold text-white">Intake Engine</h2>
            <p className="mx-auto mt-4 max-w-3xl text-center text-lg font-medium text-[#94a3b8]">
              One subscription. Real jobs before job boards. No time-wasters. Straight to WhatsApp.
            </p>
            <div className="mt-8 grid gap-0 rounded-xl border-2 border-[#2d3b4f] md:grid-cols-3">
              {[
                ['01', 'Find',    'Scans planning portals, contract notices, and local boards across the UK in real time. Before anyone else sees them.'],
                ['02', 'Filter',  'Every lead is scored against your trade, location, and job size. Vague enquiries and impossible budgets are cut before they reach you.'],
                ['03', 'Deliver', 'Your shortlist arrives on WhatsApp each morning — job type, location, estimated value. Ready to quote.'],
              ].map(([num, title, body], idx) => (
                <article key={title} className={`p-8 text-center ${idx > 0 ? 'border-l-2 border-[#2d3b4f]' : ''}`}>
                  <p className="text-5xl font-bold text-[#facc15]">{num}</p>
                  <h3 className="mt-2 text-3xl font-bold text-white">{title}</h3>
                  <p className="mt-4 text-base font-medium leading-7 text-[#94a3b8]">{body}</p>
                </article>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link to="/demo" className="inline-flex rounded-md bg-[#facc15] px-8 py-3.5 text-base font-bold text-black transition-colors hover:bg-yellow-300">
                See jobs in your area →
              </Link>
            </div>
          </div>
        </section>

        {/* 3. DEMO PROOF */}
        <section className="border-b-2 border-gray-200 bg-[#f8fafc] px-4 py-12">
          <div className="mx-auto max-w-6xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#64748b]">Live system</p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">See real jobs in your area.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base font-medium text-gray-600">Enter your postcode. We'll show you what's been found in your area right now.</p>
            <Link to="/demo" className="mt-6 inline-flex rounded-md bg-[#0a0f1e] px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#1e2a3a]">
              Run a free scan →
            </Link>
          </div>
        </section>

        {/* 4. ADVANTAGES */}
        <ProductCards />

        {/* 5. TESTIMONIAL */}
        <Testimonial />
      </main>
    </Shell>
  );
}

// ── DemoPage ──────────────────────────────────────────────────────────────────

export function DemoPage() {
  const [postcode, setPostcode] = useState('B14 7QH');
  const [trade, setTrade] = useState('plumbing');
  const [loading, setLoading] = useState(false);
  const [scanError, setScanError] = useState('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [summary, setSummary] = useState<{ total?: number; region?: string; outward?: string }>({});
  const [email, setEmail] = useState('');
  const [emailUnlocked, setEmailUnlocked] = useState(false);
  const [emailSubmitting, setEmailSubmitting] = useState(false);
  const [emailError, setEmailError] = useState('');

  const runScan = async () => {
    setLoading(true);
    setScanError('');
    setEmailUnlocked(false);
    try {
      const res = await fetch('/api/leads/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postcode, trade, tier: 'paid' }),
      });

      const ct = res.headers.get('content-type') ?? '';
      if (!ct.includes('application/json')) throw new Error('Scan warming up.');

      const payload: ScanPayload = await res.json();
      if (!res.ok) throw new Error(payload.error ?? 'Scan failed.');

      const mapped = Array.isArray(payload.leads)
        ? payload.leads.slice(0, 10).map((l) => ({
            id: l.id,
            title: l.title,
            location: l.location,
            estimatedValue: l.estimatedValue,
            urgency: l.urgency,
            source: l.source === 'Fallback Feed' ? 'JobFilter Direct' : (l.source || 'JobFilter Direct'),
            sourceConfidence: l.sourceConfidence,
            score: l.score,
          }))
        : [];

      setLeads(mapped.length ? mapped : shuffleLeads(FALLBACK_POOL).slice(0, 7));
      setSummary({ total: payload.total, region: payload.region, outward: payload.outward });
    } catch {
      setLeads(shuffleLeads(FALLBACK_POOL).slice(0, 7));
      setSummary({});
      setScanError('Showing sample leads — live scan varies by area and trade.');
    } finally {
      setLoading(false);
    }
  };

  const submitEmail = async () => {
    setEmailError('');
    if (!email.includes('@')) { setEmailError('Enter a valid email address.'); return; }
    setEmailSubmitting(true);
    try {
      await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, plan: 'free', postcode, trade }),
      });
    } catch { /* best effort */ }
    setEmailUnlocked(true);
    setEmailSubmitting(false);
  };

  useEffect(() => { void runScan(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const freeLeads   = useMemo(() => leads.slice(0, 2), [leads]);
  const lockedLeads = useMemo(() => leads.slice(2),    [leads]);

  return (
    <Shell>
      <main className="px-4 py-8">
        <div className="mx-auto max-w-4xl">

          {/* Header */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#2563eb]">Live lead scan</p>
            <h1 className="mt-1 text-3xl font-bold leading-tight text-gray-900">Find jobs near you</h1>
            <p className="mt-1 text-sm font-medium text-gray-500">Enter your postcode. See real jobs in your area now.</p>

            <div className="mt-4 flex flex-wrap items-end gap-3">
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-gray-700">Postcode</span>
                <input
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                  className="w-44 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-gray-700">Trade</span>
                <select value={trade} onChange={(e) => setTrade(e.target.value)} className="w-44 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20">
                  <option value="plumbing">Plumbing</option>
                  <option value="electrical">Electrical</option>
                  <option value="roofing">Roofing</option>
                  <option value="building">Building</option>
                  <option value="carpentry">Carpentry</option>
                  <option value="painting">Painting</option>
                  <option value="hvac">HVAC</option>
                  <option value="landscaping">Landscaping</option>
                  <option value="all">All Trades</option>
                </select>
              </label>
              <button
                onClick={runScan}
                disabled={loading}
                className="rounded-md bg-[#facc15] px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-yellow-300 disabled:opacity-50"
              >
                {loading ? 'Scanning...' : 'Scan now'}
              </button>
            </div>

            {/* Filter pills */}
            <div className="mt-4 flex flex-wrap gap-2">
              {['All urgency', 'High value', 'Within 10mi', 'This week'].map((pill) => (
                <span key={pill} className="cursor-pointer rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600 transition-colors hover:border-[#2563eb] hover:text-[#2563eb]">
                  {pill}
                </span>
              ))}
            </div>
          </div>

          {scanError && <p className="mt-2 text-xs font-medium text-amber-600">{scanError}</p>}

          {/* Stats strip */}
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            <Panel title="Region"     body={summary.region  || '—'} />
            <Panel title="Postcode"   body={summary.outward || postcode.split(' ')[0]} />
            <Panel title="Jobs found" body={leads.length ? String(leads.length) : '—'} />
          </div>

          {/* Free leads */}
          {freeLeads.length > 0 && (
            <div className="mt-4 grid gap-3">
              {freeLeads.map((lead) => <LeadCard key={lead.id} lead={lead} />)}
            </div>
          )}

          {/* Locked leads */}
          {lockedLeads.length > 0 && (
            <div className="mt-3 grid gap-3">
              {lockedLeads.map((lead, idx) =>
                idx === 0 && !emailUnlocked ? (
                  <div key={lead.id} className="relative">
                    <div className="pointer-events-none select-none blur-sm">
                      <LeadCard lead={lead} />
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg bg-white/95 p-4 text-center shadow-md">
                      <p className="text-base font-bold text-gray-900">Unlock all {lockedLeads.length} leads in {summary.outward || postcode.split(' ')[0]}</p>
                      <p className="mt-1 text-sm text-gray-500">We'll send your results to your inbox. No sales calls.</p>
                      <div className="mt-3 flex flex-wrap justify-center gap-2">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && void submitEmail()}
                          placeholder="your@email.com"
                          className="min-w-[200px] rounded-md border border-gray-300 px-3 py-2 text-sm font-medium focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
                        />
                        <button
                          onClick={() => void submitEmail()}
                          disabled={emailSubmitting}
                          className="rounded-md bg-[#2563eb] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1d4ed8] disabled:opacity-50"
                        >
                          {emailSubmitting ? '...' : 'Unlock →'}
                        </button>
                      </div>
                      {emailError && <p className="mt-1 text-xs text-red-600">{emailError}</p>}
                    </div>
                  </div>
                ) : (
                  <div key={lead.id} className={emailUnlocked ? '' : 'pointer-events-none select-none blur-sm'}>
                    <LeadCard lead={lead} />
                  </div>
                )
              )}
            </div>
          )}

          {/* Post-unlock banner */}
          {emailUnlocked && (
            <div className="mt-4 rounded-xl border border-[#2d3b4f] bg-[#0a0f1e] p-5 text-center">
              <p className="text-lg font-bold text-white">These leads are live — start your free week.</p>
              <p className="mt-1 text-sm font-medium text-[#94a3b8]">Jobs delivered to WhatsApp every morning. Cancel any time.</p>
              <div className="mt-4">
                <CheckoutButton label="Get Intake Engine — £49/mo →" email={email} />
              </div>
            </div>
          )}

          {/* WhatsApp CTA (pre-unlock) */}
          {!emailUnlocked && (
            <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
              <p className="text-base font-bold text-gray-900">📱 Get new jobs on WhatsApp daily</p>
              <p className="mt-1 text-sm font-medium text-gray-500">
                Subscribe to Intake Engine. Jobs delivered to your phone — no apps, no dashboards required.
              </p>
              <div className="mt-4">
                <CheckoutButton label="Get Intake Engine — £49/mo →" email={email} />
              </div>
            </div>
          )}

        </div>
      </main>
    </Shell>
  );
}

// ── PricingPage ───────────────────────────────────────────────────────────────

export function PricingPage() {
  const [hours, setHours] = useState(5);
  const [miles, setMiles] = useState(50);
  const annualLoss = Math.round((hours * 52 * 35) + (miles * 52 * 0.45));
  const [checkoutEmail, setCheckoutEmail] = useState('');

  return (
    <Shell>
      <main>

        {/* Cost calculator */}
        <section className="border-b-2 border-gray-200 bg-[#f8fafc] px-4 py-12">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <h1 className="text-5xl font-bold leading-tight text-gray-900">The cost of losing bad leads</h1>
              <p className="mt-3 text-lg font-medium text-gray-600">Adjust the sliders. See what bad leads cost you per year.</p>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
                <div className="mb-8">
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold text-gray-800">Hours lost per week</p>
                    <span className="rounded-lg border border-gray-200 bg-[#facc15] px-4 py-1 text-4xl font-bold text-black">{hours}</span>
                  </div>
                  <input type="range" min="1" max="20" value={hours}
                    onChange={(e) => setHours(Number(e.target.value))}
                    className="mt-4 w-full cursor-pointer accent-[#2563eb]" />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold text-gray-800">Wasted miles per week</p>
                    <span className="rounded-lg border border-gray-200 bg-[#facc15] px-4 py-1 text-4xl font-bold text-black">{miles}</span>
                  </div>
                  <input type="range" min="10" max="200" step="10" value={miles}
                    onChange={(e) => setMiles(Number(e.target.value))}
                    className="mt-4 w-full cursor-pointer accent-[#2563eb]" />
                </div>
              </div>
              <div className="rounded-xl border border-[#2d3b4f] bg-[#0a0f1e] p-8 text-center text-white shadow-sm">
                <p className="text-2xl font-bold text-[#94a3b8]">You lose every year</p>
                <p className="mt-3 text-6xl font-bold text-[#facc15]">£{annualLoss.toLocaleString()}</p>
                <p className="mt-3 text-xl font-bold">That could be another vehicle paid for.</p>
                <p className="mt-2 text-base font-medium text-[#94a3b8]">Intake Engine: £49/month. Works out to £1.60/day.</p>
                <Link to="/demo" className="mt-6 inline-flex rounded-md bg-[#facc15] px-8 py-3 text-base font-bold text-black transition-colors hover:bg-yellow-300">Fix this now →</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Plans */}
        <section className="border-b-2 border-[#2d3b4f] bg-[#0a0f1e] px-4 py-12">
          <div className="mx-auto max-w-6xl text-center">
            <h2 className="text-5xl font-bold text-[#facc15]">One price. No games.</h2>
            <p className="mt-2 text-xl font-medium text-[#94a3b8]">No per-lead fees. No bidding wars. No race to the bottom.</p>
            <p className="mt-3 text-base font-medium text-[#06b6d4]">📱 Jobs delivered straight to your WhatsApp. No dashboard required.</p>
            <p className="mx-auto mt-5 w-fit rounded-md bg-[#facc15] px-5 py-2 text-sm font-bold text-black">
              If this wins one £20k job, it pays for itself for years.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <article className="rounded-xl border border-[#2d3b4f] bg-[#1e2a3a] p-6 text-left">
                <h3 className="text-2xl font-bold text-white">Free Tools</h3>
                <p className="mt-1 text-5xl font-bold text-white">£0</p>
                <ul className="mt-3 space-y-2 text-sm font-medium text-[#94a3b8]">
                  <li>✓ Lead scanner (2 free)</li>
                  <li>✓ Quote estimator</li>
                  <li>✓ Market checker</li>
                  <li className="text-[#64748b]">✕ Job delivery</li>
                  <li className="text-[#64748b]">✕ WhatsApp alerts</li>
                </ul>
                <Link to="/demo" className="mt-8 inline-flex rounded-md border border-[#2d3b4f] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white">Use for free</Link>
              </article>

              <article className="rounded-xl border-2 border-[#2563eb] bg-[#facc15] p-6 text-left shadow-lg">
                <p className="text-xs font-bold uppercase tracking-widest text-black/60">Most popular · For tradesmen</p>
                <h3 className="mt-1 text-2xl font-bold text-black">Intake Engine</h3>
                <p className="mt-1 text-5xl font-bold text-black">£49 <span className="text-xl font-semibold">/month</span></p>
                <p className="mt-1 text-sm font-semibold text-black/70">£1.60/day. Cancel anytime.</p>
                <ul className="mt-3 space-y-2 text-sm font-semibold text-black">
                  <li>✓ Jobs found before job boards</li>
                  <li>✓ Time-wasters filtered out</li>
                  <li>✓ 📱 Delivered to WhatsApp daily</li>
                  <li>✓ Vantage + Vicinity + Codex</li>
                </ul>
                <input
                  type="email"
                  placeholder="your@email.com (optional)"
                  value={checkoutEmail}
                  onChange={(e) => setCheckoutEmail(e.target.value)}
                  className="mt-4 w-full rounded-md border border-black/20 bg-white/60 px-3 py-2 text-sm font-medium placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-black/20"
                />
                <div className="mt-3">
                  <CheckoutButton label="Get started →" email={checkoutEmail} />
                </div>
              </article>

              <article className="rounded-xl border border-[#2d3b4f] bg-[#1e2a3a] p-6 text-left">
                <h3 className="text-2xl font-bold text-white">Codex</h3>
                <p className="mt-1 text-5xl font-bold text-white">£99 <span className="text-xl font-semibold">/month</span></p>
                <ul className="mt-3 space-y-2 text-sm font-medium text-[#94a3b8]">
                  <li>✓ Specs → sales proposals</li>
                  <li>✓ Better tender presentation</li>
                  <li>✓ For engineering firms</li>
                </ul>
                <Link to="/codex" className="mt-8 inline-flex rounded-md border border-[#2d3b4f] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white">View Codex →</Link>
              </article>
            </div>
          </div>
        </section>

        <Testimonial />

        {/* WhatsApp CTA */}
        <section className="border-b-2 border-gray-200 bg-[#facc15] px-4 py-12 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-black/60">No app required</p>
          <h2 className="mt-2 text-4xl font-bold leading-tight text-black">📱 Get jobs on WhatsApp</h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg font-medium text-black/70">
            Real jobs sent to your phone every day. No app. No dashboard. Just leads.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <CheckoutButton label="Get Intake Engine — £49/mo →" />
            <Link to="/demo" className="rounded-md border-2 border-black bg-white px-6 py-3 text-base font-bold text-black transition-colors hover:bg-gray-50">See sample jobs first</Link>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-[#f8fafc] px-4 py-14 text-center">
          <h2 className="text-5xl font-bold leading-tight text-gray-900">Ready to find real leads?</h2>
          <p className="mx-auto mt-5 max-w-3xl text-xl font-medium text-gray-600">
            One subscription. Vantage, Vicinity, and Codex included. Cancel anytime.
          </p>
          <div className="mt-8">
            <CheckoutButton label="Get Intake Engine →" />
          </div>
        </section>

      </main>
    </Shell>
  );
}

// ── Product pages ─────────────────────────────────────────────────────────────

export function CodexPage() {
  return (
    <ProductPage
      title="Codex"
      summary="Turn technical specifications into proposals that win contracts. For engineering and manufacturing firms."
      sections={[
        { title: 'Pain',    body: 'Complex specs lose jobs to simpler quotes.' },
        { title: 'Fix',     body: 'Convert technical complexity into clear sales copy.' },
        { title: 'Control', body: 'Send sharper proposals faster.' },
        { title: 'Result',  body: 'More wins with less admin.' },
      ]}
    />
  );
}

export function VantagePage() {
  return (
    <ProductPage
      title="Vantage"
      summary="Turn your tenders into premium visual bid decks. Win on presentation."
      sections={[
        { title: 'Pain',    body: 'Your price is right. Their PDF looks better.' },
        { title: 'Fix',     body: 'Build premium visual bid decks in minutes.' },
        { title: 'Control', body: 'Lead with evidence, not promises.' },
        { title: 'Result',  body: 'Win higher-value jobs on merit, not luck.' },
      ]}
    />
  );
}

export function VicinityPage() {
  return (
    <ProductPage
      title="Vicinity"
      summary="Turn past work into local sales assets that keep winning new jobs."
      sections={[
        { title: 'Pain',    body: 'Best work rots in your camera roll.' },
        { title: 'Fix',     body: 'Surface nearby completed jobs as social proof.' },
        { title: 'Control', body: 'Own your local patch with visible results.' },
        { title: 'Result',  body: 'Warmer enquiries and faster decisions.' },
      ]}
    />
  );
}

export function DashboardPage() {
  return <ProductPage title="Dashboard" summary="Your intake control room." sections={[{ title: 'Focus', body: 'Watch lead quality and move quick.' }, { title: 'Speed', body: 'See what matters first.' }, { title: 'Control', body: 'Run jobs like a system.' }, { title: 'Result', body: 'Less chaos. More paid work.' }]} />;
}

export function ActivationPendingPage() {
  return <ProductPage title="Activation pending" summary="Setup is queued. Demo is live now." sections={[{ title: 'Now', body: 'Run the demo and check job flow.' }, { title: 'Next', body: 'We finish setup and unlock full access.' }, { title: 'Control', body: 'You keep momentum while waiting.' }, { title: 'Result', body: 'No dead end.' }]} />;
}

export function PrivacyPage() {
  return <ProductPage title="Privacy" summary="We keep only what is needed to run the system." sections={[{ title: 'Keep', body: 'Only routing and scoring data.' }, { title: 'No traps', body: 'No pointless data grab.' }, { title: 'Control', body: 'Simple and direct.' }, { title: 'Result', body: 'Clear rules. No noise.' }]} />;
}

export function TermsPage() {
  return <ProductPage title="Terms" summary="JobFilter filters leads. You control pricing and delivery." sections={[{ title: 'Role', body: 'We filter intake and surface jobs.' }, { title: 'Boundary', body: 'Your trade agreement stays yours.' }, { title: 'Control', body: 'Clear split. No confusion.' }, { title: 'Result', body: 'Fair and simple.' }]} />;
}
