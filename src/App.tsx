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
      <header className="sticky top-0 z-20 border-b border-[#2D3B4F] bg-[#0A0F1E]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold leading-none tracking-tight text-white">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded bg-[#facc15] text-xl">🇬🇧</span>
            JobFilter
          </Link>
          <nav className="flex flex-wrap items-center gap-5 text-sm font-semibold">
            {NAV_ITEMS.map((item) => (
              <Link key={item.label} to={item.to} className="text-gray-300 transition-colors hover:text-white">{item.label}</Link>
            ))}
            <Link to="/demo" className="border border-[#facc15] bg-[#facc15] px-4 py-1.5 text-sm font-bold leading-none text-black hover:bg-amber-400">
              Find Jobs
            </Link>
          </nav>
        </div>
      </header>
      {children}
      <footer className="border-t border-[#2D3B4F] bg-[#0A0F1E] px-4 py-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-gray-500">© 2026 JobFilter. Built for UK trades.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-xs text-gray-500 hover:text-white">Privacy</Link>
            <Link to="/terms" className="text-xs text-gray-500 hover:text-white">Terms</Link>
            <Link to="/codex" className="text-xs font-semibold text-[#facc15] hover:text-white">For manufacturers →</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ── Shared components ──────────────────────────────────────────────────────────

function TrustStrip() {
  return (
    <div className="border-y border-[#2D3B4F] bg-[#0A0F1E] px-4 py-3">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-6 md:gap-10">
        <p className="text-xs font-semibold text-[#facc15]">247 jobs found today</p>
        <p className="text-xs font-semibold text-white">Updated live</p>
        <p className="text-xs font-semibold text-[#facc15]">3,200+ tradespeople</p>
        <p className="text-xs font-semibold text-white">📱 Delivered to WhatsApp</p>
      </div>
    </div>
  );
}

function Testimonial() {
  return (
    <section className="border-b-2 border-black bg-white px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs font-semibold tracking-widest text-[#8da0bd]">What tradespeople say</p>
        <blockquote className="mt-4 border-l-4 border-[#facc15] pl-6">
          <p className="text-xl font-semibold leading-8">
            "I was spending Sunday evenings looking through Facebook groups and Checkatrade hoping something useful would come up.
            JobFilter replaced all of that. I get a message every morning — usually six or seven jobs within 20 miles.
            Signed two loft conversions in my first month."
          </p>
          <footer className="mt-4">
            <p className="text-base font-bold">Dean Farrow</p>
            <p className="text-sm text-[#8da0bd]">Roofer · Leeds · Member since 2024</p>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}

const URGENCY_STYLE: Record<string, string> = {
  high:   'bg-red-50 text-red-600 border border-red-200',
  medium: 'bg-amber-50 text-amber-600 border border-amber-200',
  low:    'bg-emerald-50 text-emerald-600 border border-emerald-200',
};

const URGENCY_ACCENT: Record<string, string> = {
  high:   'border-l-red-500',
  medium: 'border-l-amber-400',
  low:    'border-l-emerald-500',
};

function LeadCard({ lead }: { lead: Lead }) {
  const urg = (lead.urgency ?? 'medium').toLowerCase();
  const daysAgo = stableDaysAgo(lead.id);
  const accent = URGENCY_ACCENT[urg] ?? URGENCY_ACCENT.medium;
  return (
    <article className={`border border-gray-200 border-l-4 ${accent} bg-white p-4 shadow-sm`}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="flex-1">
          <h2 className="text-base font-bold leading-tight tracking-tight">{lead.title}</h2>
          <p className="mt-1 text-sm text-gray-500">{lead.location}</p>
        </div>
        <span className={`rounded px-2 py-0.5 text-[11px] font-semibold capitalize ${URGENCY_STYLE[urg] ?? URGENCY_STYLE.medium}`}>
          {urg}
        </span>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-3 border-t border-gray-100 pt-3">
        <p className="text-lg font-bold">{lead.estimatedValue}</p>
        <div className="ml-auto flex gap-2">
          <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-500">Confidence: {lead.sourceConfidence ?? 80}%</span>
          <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-500">{daysAgo}d ago</span>
          <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-500">{lead.source}</span>
        </div>
      </div>
    </article>
  );
}

function Panel({ title, body }: { title: string; body: string }) {
  return (
    <article className="border border-gray-200 bg-white p-4">
      <h3 className="text-sm font-bold text-gray-800">{title}</h3>
      <p className="mt-1 text-sm text-gray-600">{body}</p>
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
    <Link to={to} className="inline-flex items-center justify-center border-2 border-black bg-black px-5 py-2.5 text-sm font-bold text-[#facc15] hover:bg-[#0A0F1E]">
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
      className="inline-flex cursor-pointer items-center justify-center border-2 border-black bg-[#0A0F1E] px-6 py-3 text-base font-bold text-[#facc15] disabled:opacity-60 hover:bg-black"
    >
      {loading ? 'Redirecting...' : label}
    </button>
  );
}

function ProductPage({ title, summary, sections }: { title: string; summary: string; sections: Array<{ title: string; body: string }> }) {
  return (
    <Shell>
      <main className="px-4 py-8">
        <div className="mx-auto max-w-5xl border-2 border-black bg-white p-6">
          <p className="text-xs font-semibold tracking-widest text-gray-400">Built for trades</p>
          <h1 className="mt-2 text-4xl font-bold leading-none tracking-tight">{title}</h1>
          <p className="mt-3 max-w-3xl text-sm font-semibold leading-5">{summary}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <CTA label="Get Leads" />
            <Link to="/pricing" className="inline-flex items-center justify-center border-2 border-black bg-[#facc15] px-5 py-2.5 text-sm font-bold">
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
    { name: 'Vantage',  pain: 'Your price is right. Their PDF looks better.',       body: 'Vantage turns your tenders into premium visual bid decks that win on presentation.',              to: '/vantage' },
    { name: 'Vicinity', pain: 'Your best work is buried in your camera roll.',       body: 'Vicinity turns finished jobs into local sales assets that keep winning you premium work.',        to: '/vicinity' },
    { name: 'Codex',    pain: 'Complex specs lose jobs to simpler quotes.',          body: 'Codex converts technical complexity into clear sales copy that closes jobs.',                      to: '/codex' },
  ];
  return (
    <section className="border-y-2 border-black bg-[#facc15] px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-5xl font-bold leading-none tracking-tight">Then win the job.</h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-xl font-semibold">Getting in front of the job is step one. These three make sure you walk out with it.</p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <article key={card.name} className="flex flex-col border-2 border-black bg-[#e9e9e9] p-7 shadow-[4px_4px_0_#000]">
              <h3 className="w-fit bg-black px-4 py-2 text-3xl font-bold text-[#facc15]">{card.name}</h3>
              <p className="mt-6 text-lg font-bold text-[#e11d1d]">{card.pain}</p>
              <p className="mt-4 text-base font-semibold leading-7 text-[#4f6786]">{card.body}</p>
              <Link to={card.to} className="mt-8 inline-flex w-fit items-center justify-center border-2 border-black bg-[#facc15] px-5 py-2.5 text-base font-bold text-black hover:bg-amber-400">
                Yours with Intake Engine
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
        <section className="border-b-2 border-black bg-[#e5e5e5] px-4 py-12">
          <div className="mx-auto max-w-6xl text-center">
            <h1 className="text-6xl font-bold leading-tight tracking-tight">
              The jobs worth quoting<br />land in your WhatsApp.
            </h1>
            <div className="mx-auto mt-4 w-fit border-2 border-black bg-[#facc15] px-6 py-2 shadow-[4px_4px_0_#111]">
              <h2 className="text-5xl font-bold leading-tight tracking-tight">The rest don't.</h2>
            </div>
            <p className="mx-auto mt-6 max-w-3xl text-lg font-semibold leading-8 text-gray-700">
              JobFilter scans planning data, contract notices, and local signals across the UK.
              It filters time-wasters and delivers only real, vetted jobs — straight to your phone.
            </p>
            <p className="mt-3 text-base font-semibold text-[#4f6786]">
              📱 Delivered to your WhatsApp daily. No apps. No dashboards. Just leads.
            </p>
            <Link to="/demo" className="mx-auto mt-8 inline-flex border-2 border-black bg-[#facc15] px-10 py-4 text-2xl font-bold shadow-[4px_4px_0_#111] hover:bg-amber-400">
              See jobs near you →
            </Link>
            <p className="mt-4 text-sm text-gray-500">Used by 1,400+ UK tradesmen. Average of 11 qualified leads delivered per week.</p>
          </div>
        </section>

        <TrustStrip />

        {/* 2. INTAKE ENGINE */}
        <section className="border-b-2 border-black bg-[#0A0F1E] px-4 py-12">
          <div className="mx-auto max-w-6xl">
            <p className="text-center text-xs font-semibold tracking-widest text-[#facc15]">The core product</p>
            <h2 className="mt-2 text-center text-5xl font-bold text-white">Intake Engine</h2>
            <p className="mx-auto mt-4 max-w-3xl text-center text-lg font-semibold text-[#d5deed]">
              One subscription. Real jobs before they hit job boards. No time-wasters.
              Delivered straight to your WhatsApp every morning.
            </p>
            <div className="mt-8 grid gap-0 border-2 border-[#facc15] md:grid-cols-3">
              {[
                ['01', 'Find',    'Scans planning data, contract notices, and local signals constantly. Before anyone else sees them.'],
                ['02', 'Filter',  'Removes low-budget enquiries, duplicate postings, and jobs not worth your drive — before they reach you.'],
                ['03', 'Deliver', 'Sends only vetted, high-value jobs to your WhatsApp. Ready to quote. Ready to win.'],
              ].map(([num, title, body], idx) => (
                <article key={title} className={`p-8 text-center ${idx > 0 ? 'border-l-2 border-[#facc15]' : ''}`}>
                  <p className="text-6xl font-bold text-[#facc15]">{num}</p>
                  <h3 className="mt-2 text-4xl font-bold text-white">{title}</h3>
                  <p className="mt-4 text-base font-semibold leading-7 text-[#d5deed]">{body}</p>
                </article>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link to="/demo" className="inline-flex border-2 border-[#facc15] bg-[#facc15] px-10 py-4 text-2xl font-bold text-black hover:bg-amber-400">
                See jobs in your area →
              </Link>
            </div>
          </div>
        </section>

        {/* 3. DEMO PROOF */}
        <section className="border-b-2 border-black bg-[#e5e5e5] px-4 py-10">
          <div className="mx-auto max-w-6xl text-center">
            <p className="text-xs font-semibold tracking-widest text-[#8da0bd]">Live system</p>
            <h2 className="mt-2 text-4xl font-bold leading-none">See real jobs in your area.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base font-semibold text-[#4f6786]">Enter your postcode. We'll show you what JobFilter has found in your area this week.</p>
            <Link to="/demo" className="mt-6 inline-flex border-2 border-black bg-black px-10 py-4 text-2xl font-bold text-[#facc15] hover:bg-[#0A0F1E]">
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
          <div className="border-2 border-black bg-white p-5">
            <p className="text-xs font-semibold tracking-widest text-[#8da0bd]">Live lead scan</p>
            <h1 className="mt-1 text-3xl font-bold leading-none tracking-tight">Find jobs near you</h1>
            <p className="mt-1 text-sm text-gray-500">Enter your postcode. See real jobs in your area now.</p>

            <div className="mt-4 flex flex-wrap items-end gap-3">
              <label className="block">
                <span className="mb-1 block text-[10px] font-semibold tracking-widest text-gray-600">Postcode</span>
                <input
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                  className="w-44 border-2 border-black px-3 py-2 text-sm font-bold"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-[10px] font-semibold tracking-widest text-gray-600">Trade</span>
                <select value={trade} onChange={(e) => setTrade(e.target.value)} className="w-44 border-2 border-black px-3 py-2 text-sm font-bold">
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
                className="border-2 border-black bg-[#facc15] px-6 py-2.5 text-sm font-bold disabled:opacity-50 hover:bg-amber-400"
              >
                {loading ? 'Scanning...' : 'Scan now'}
              </button>
            </div>

            {/* Filter pills (visual trust signal) */}
            <div className="mt-4 flex flex-wrap gap-2">
              {['All urgency', 'Within 10mi', 'Budget £500+', 'Verified only'].map((f) => (
                <span key={f} className="rounded-full border border-gray-300 bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">{f}</span>
              ))}
            </div>
          </div>

          {scanError && <p className="mt-2 text-xs text-gray-500">{scanError}</p>}

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
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 p-4 text-center">
                      <p className="text-base font-bold">Unlock all {lockedLeads.length} leads in {summary.outward || postcode.split(' ')[0]}</p>
                      <p className="mt-1 text-xs text-gray-500">No sales calls. No follow-up sequence. Just the leads.</p>
                      <div className="mt-3 flex flex-wrap justify-center gap-2">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && void submitEmail()}
                          placeholder="your@email.com"
                          className="min-w-[200px] border-2 border-black px-3 py-2 text-sm font-bold"
                        />
                        <button
                          onClick={() => void submitEmail()}
                          disabled={emailSubmitting}
                          className="border-2 border-black bg-[#facc15] px-4 py-2 text-sm font-bold disabled:opacity-50 hover:bg-amber-400"
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
            <div className="mt-4 border-2 border-black bg-[#0A0F1E] p-5 text-center">
              <p className="text-lg font-bold text-[#facc15]">Leads unlocked. Subscribe for new jobs daily.</p>
              <p className="mt-1 text-sm text-gray-400">These leads are live — get them delivered every morning.</p>
              <div className="mt-3">
                <CheckoutButton label="Get Intake Engine — £49/mo →" email={email} />
              </div>
            </div>
          )}

          {/* WhatsApp CTA (pre-unlock) */}
          {!emailUnlocked && (
            <div className="mt-6 border-t border-gray-200 pt-6 text-center">
              <p className="text-base font-bold">📱 Get new jobs on WhatsApp daily</p>
              <p className="mt-1 text-sm text-gray-500">
                Subscribe to Intake Engine. Jobs delivered to your phone — no apps, no dashboards required.
              </p>
              <div className="mt-3">
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
        <section className="border-b-2 border-black bg-[#e5e5e5] px-4 py-12">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <h1 className="text-5xl font-bold leading-none">The cost of losing time to bad leads</h1>
              <p className="mt-3 text-lg font-semibold text-[#8da0bd]">Adjust the sliders. See what you're leaving on the table every year.</p>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="border-2 border-black bg-white p-8 shadow-[4px_4px_0_#111]">
                <div className="mb-8">
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-bold">Hours lost per week</p>
                    <span className="border-2 border-black bg-[#facc15] px-4 py-1 text-4xl font-bold">{hours}</span>
                  </div>
                  <input type="range" min="1" max="20" value={hours}
                    onChange={(e) => setHours(Number(e.target.value))}
                    className="mt-4 w-full cursor-pointer accent-black" />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-bold">Wasted miles per week</p>
                    <span className="border-2 border-black bg-[#facc15] px-4 py-1 text-4xl font-bold">{miles}</span>
                  </div>
                  <input type="range" min="10" max="200" step="10" value={miles}
                    onChange={(e) => setMiles(Number(e.target.value))}
                    className="mt-4 w-full cursor-pointer accent-black" />
                </div>
              </div>
              <div className="border-2 border-black bg-[#0A0F1E] p-8 text-center text-white shadow-[4px_4px_0_#111]">
                <p className="text-3xl font-bold tracking-wide">You lose every year</p>
                <p className="mt-3 text-[64px] font-bold leading-none text-[#facc15]">£{annualLoss.toLocaleString()}</p>
                <p className="mt-3 text-xl font-bold">That could be another vehicle paid for.</p>
                <p className="mt-2 text-base font-semibold text-[#8da0bd]">Intake Engine: £49/month. £1.60/day.</p>
                <Link to="/demo" className="mt-6 inline-flex border-2 border-[#facc15] bg-[#facc15] px-10 py-3 text-xl font-bold text-black hover:bg-amber-400">Fix this now →</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Plans */}
        <section className="border-b-2 border-black bg-[#0A0F1E] px-4 py-12">
          <div className="mx-auto max-w-6xl text-center">
            <h2 className="text-5xl font-bold text-[#facc15]">One price. No games.</h2>
            <p className="mt-2 text-xl font-semibold text-white">No per-lead fees. No bidding wars. No race to the bottom.</p>
            <p className="mt-3 text-base font-semibold text-[#facc15]">📱 Jobs delivered straight to your WhatsApp. No dashboard required.</p>
            <p className="mx-auto mt-5 w-fit border-2 border-[#facc15] bg-[#facc15] px-6 py-2 text-base font-bold">
              If this wins one £20k job, it pays for itself for years.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <article className="border-2 border-black bg-[#e5e5e5] p-6 text-left">
                <h3 className="text-3xl font-bold">Free Tools</h3>
                <p className="mt-1 text-6xl font-bold">£0</p>
                <ul className="mt-3 space-y-2 text-base font-semibold">
                  <li>✓ Lead scanner (2 free)</li>
                  <li>✓ Quote estimator</li>
                  <li>✓ Market checker</li>
                  <li className="text-[#8a9bb6]">✕ Job delivery</li>
                  <li className="text-[#8a9bb6]">✕ WhatsApp alerts</li>
                </ul>
                <Link to="/demo" className="mt-8 inline-flex border-2 border-black px-5 py-2.5 text-base font-bold">Use for free</Link>
              </article>

              <article className="border-2 border-black bg-[#facc15] p-6 text-left shadow-[4px_4px_0_#000]">
                <p className="text-xs font-bold tracking-widest">MOST POPULAR · FOR TRADESMEN</p>
                <h3 className="mt-1 text-3xl font-bold">Intake Engine</h3>
                <p className="mt-1 text-6xl font-bold">£49 <span className="text-xl font-semibold">/month</span></p>
                <p className="mt-1 text-sm font-semibold">£1.60/day. Cancel anytime.</p>
                <ul className="mt-3 space-y-2 text-base font-semibold">
                  <li>✓ Jobs found before job boards</li>
                  <li>✓ Time-wasters filtered out</li>
                  <li>✓ 📱 Delivered to WhatsApp daily</li>
                  <li>✓ Vantage + Vicinity + Codex included</li>
                </ul>
                <input
                  type="email"
                  placeholder="your@email.com (optional)"
                  value={checkoutEmail}
                  onChange={(e) => setCheckoutEmail(e.target.value)}
                  className="mt-4 w-full border-2 border-black px-3 py-2 text-sm font-bold"
                />
                <div className="mt-3">
                  <CheckoutButton label="Get started →" email={checkoutEmail} />
                </div>
              </article>

              <article className="border-2 border-black bg-[#e5e5e5] p-6 text-left">
                <h3 className="text-3xl font-bold">Codex</h3>
                <p className="text-xs font-semibold text-gray-500">For engineering firms</p>
                <p className="mt-1 text-6xl font-bold">£99 <span className="text-xl font-semibold">/month</span></p>
                <ul className="mt-3 space-y-2 text-base font-semibold">
                  <li>✓ Specs → sales proposals</li>
                  <li>✓ Better tender presentation</li>
                  <li>✓ For engineering firms</li>
                </ul>
                <Link to="/codex" className="mt-8 inline-flex border-2 border-black bg-black px-5 py-2.5 text-base font-bold text-white hover:bg-[#0A0F1E]">View Codex →</Link>
              </article>
            </div>
          </div>
        </section>

        <Testimonial />

        {/* WhatsApp CTA */}
        <section className="border-b-2 border-black bg-[#facc15] px-4 py-12 text-center">
          <p className="text-xs font-semibold tracking-widest">No app required</p>
          <h2 className="mt-2 text-4xl font-bold leading-none">📱 Get jobs on WhatsApp.</h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg font-semibold">
            Real jobs sent to your phone every day. No app. No dashboard. Just leads.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <CheckoutButton label="Get Intake Engine — £49/mo →" />
            <Link to="/demo" className="border-2 border-black bg-white px-8 py-3 text-base font-bold hover:bg-gray-100">See sample jobs first</Link>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-[#e5e5e5] px-4 py-14 text-center">
          <h2 className="text-5xl font-bold leading-none">Ready to find real leads?</h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg font-semibold text-[#8da0bd]">
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
      summary="Convert technical specs into sales copy that closes jobs. For engineering and manufacturing firms."
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
        { title: 'Pain',    body: 'Best work buried in your camera roll.' },
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
  return <ProductPage title="Activation Pending" summary="Setup is queued. Demo is live now." sections={[{ title: 'Now', body: 'Run the demo and check job flow.' }, { title: 'Next', body: 'We finish setup and unlock full access.' }, { title: 'Control', body: 'You keep momentum while waiting.' }, { title: 'Result', body: 'No dead end.' }]} />;
}

export function PrivacyPage() {
  return <ProductPage title="Privacy" summary="We keep only what is needed to run the system." sections={[{ title: 'Keep', body: 'Only routing and scoring data.' }, { title: 'No traps', body: 'No pointless data grab.' }, { title: 'Control', body: 'Simple and direct.' }, { title: 'Result', body: 'Clear rules. No noise.' }]} />;
}

export function TermsPage() {
  return <ProductPage title="Terms" summary="JobFilter filters leads. You control pricing and delivery." sections={[{ title: 'Role', body: 'We filter intake and surface jobs.' }, { title: 'Boundary', body: 'Your trade agreement stays yours.' }, { title: 'Control', body: 'Clear split. No confusion.' }, { title: 'Result', body: 'Fair and simple.' }]} />;
}
