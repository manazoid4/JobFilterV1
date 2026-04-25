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

const NAV_ITEMS = [
  { to: '/', label: 'HOME' },
  { to: '/pricing', label: 'INTAKE ENGINE' },
  { to: '/demo', label: 'DEMO' },
  { to: '/codex', label: 'CODEX' },
  { to: '/vantage', label: 'VANTAGE' },
  { to: '/vicinity', label: 'VICINITY' },
] as const;

// 10-lead pool — shuffled per scan so no repeated identical order
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
    <div className="min-h-screen bg-[#e5e5e5] text-black">
      <header className="sticky top-0 z-20 border-b-4 border-[#facc15] bg-black">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <Link to="/" className="flex items-center gap-2 text-2xl font-black uppercase leading-none tracking-tight text-white">
            <span className="inline-flex h-11 w-14 items-center justify-center border-4 border-[#facc15] bg-[#facc15] text-[10px] font-black text-black">UK</span>
            JOBFILTER
          </Link>
          <nav className="flex flex-wrap items-center gap-4 text-[12px] font-black uppercase tracking-tight">
            {NAV_ITEMS.map((item) => (
              <Link key={`${item.to}-${item.label}`} to={item.to} className="text-white transition-colors hover:text-[#facc15]">
                {item.label}
              </Link>
            ))}
            <Link to="/demo" className="border-4 border-[#facc15] bg-[#facc15] px-6 py-2 text-lg leading-none text-black">
              FIND JOBS
            </Link>
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
}

// ── Shared components ──────────────────────────────────────────────────────────

function TrustStrip() {
  return (
    <div className="border-y-4 border-black bg-black px-4 py-3">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-6 md:gap-10">
        <p className="text-sm font-black uppercase text-[#facc15]">247 JOBS FOUND TODAY</p>
        <p className="text-sm font-black uppercase text-white">UPDATED LIVE</p>
        <p className="text-sm font-black uppercase text-[#facc15]">3,200+ TRADESPEOPLE</p>
        <p className="text-sm font-black uppercase text-white">📱 DELIVERED TO WHATSAPP</p>
      </div>
    </div>
  );
}

function Testimonial() {
  return (
    <section className="border-b-4 border-black bg-white px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs font-black uppercase tracking-widest text-[#8da0bd]">WHAT TRADESPEOPLE SAY</p>
        <blockquote className="mt-4 border-l-8 border-[#facc15] pl-6">
          <p className="text-2xl font-black leading-9">
            "JobFilter sent me a £14,000 boiler replacement job in Solihull on a Wednesday morning.
            It was in my WhatsApp before I'd finished my coffee. Quoted that afternoon, got the job.
            That's why I pay the £49."
          </p>
          <footer className="mt-4">
            <p className="text-lg font-black uppercase">Dave Thornton</p>
            <p className="text-sm font-bold text-[#8da0bd]">Gas Safe Engineer · West Midlands · Member since 2024</p>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}

const URGENCY_STYLE: Record<string, string> = {
  high:   'bg-red-600 text-white',
  medium: 'bg-[#facc15] text-black',
  low:    'bg-[#e5e5e5] text-black',
};

function LeadCard({ lead }: { lead: Lead }) {
  const urg = (lead.urgency ?? 'medium').toLowerCase();
  return (
    <article className="border-4 border-black bg-white p-4 shadow-[4px_4px_0_#000]">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="flex-1">
          <h2 className="text-xl font-black uppercase leading-tight tracking-tight">{lead.title}</h2>
          <p className="mt-1 text-sm font-bold uppercase text-[#4f6786]">{lead.location}</p>
        </div>
        <span className={`border-2 border-black px-2 py-1 text-[11px] font-black uppercase ${URGENCY_STYLE[urg] ?? URGENCY_STYLE.medium}`}>
          {urg}
        </span>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-4 border-t-2 border-black pt-3">
        <p className="text-xl font-black uppercase">{lead.estimatedValue}</p>
        <p className="ml-auto text-xs font-black uppercase text-[#8da0bd]">{lead.source}</p>
      </div>
    </article>
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

function CTA({ to = '/demo', label = 'Find Jobs' }: { to?: string; label?: string }) {
  return (
    <Link to={to} className="inline-flex items-center justify-center border-4 border-black bg-black px-5 py-3 text-xs font-black uppercase tracking-widest text-[#facc15]">
      {label}
    </Link>
  );
}

function CheckoutButton({ label = 'GET INTAKE ENGINE →', email = '' }: { label?: string; email?: string }) {
  const [loading, setLoading] = useState(false);
  return (
    <button
      disabled={loading}
      onClick={async () => { setLoading(true); await redirectToCheckout(email); setLoading(false); }}
      className="inline-flex cursor-pointer items-center justify-center border-4 border-black bg-black px-6 py-3 text-xl font-black uppercase text-[#facc15] disabled:opacity-60"
    >
      {loading ? 'REDIRECTING...' : label}
    </button>
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
            <CTA label="Get Leads" />
            <Link to="/pricing" className="inline-flex items-center justify-center border-4 border-black bg-[#facc15] px-5 py-3 text-xs font-black uppercase tracking-widest">
              NO CONTRACTS
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
    { name: 'VANTAGE', pain: 'STOP LOSING £50K BIDS TO FIRMS WHO LOOK BETTER THAN YOU.', body: 'Your price is right. Their PDF looks better. Vantage turns your tenders into premium visual bid decks.', to: '/vantage' },
    { name: 'VICINITY', pain: 'STOP LETTING YOUR BEST WORK ROT IN YOUR CAMERA ROLL.', body: 'Vicinity turns finished jobs into local sales assets that keep winning you premium work.', to: '/vicinity' },
    { name: 'CODEX', pain: 'STOP LOSING JOBS TO COWBOYS WHO WRITE SIMPLER QUOTES.', body: 'Codex converts technical complexity into clear sales copy that closes jobs.', to: '/codex' },
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
              <Link to={card.to} className="mt-8 inline-flex w-fit items-center justify-center border-4 border-black bg-[#facc15] px-6 py-3 text-lg font-black uppercase tracking-tight text-black">
                YOURS WITH INTAKE ENGINE
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
        {/* 1. PROBLEM */}
        <section className="border-b-4 border-black bg-[#e5e5e5] px-4 py-10">
          <div className="mx-auto max-w-6xl text-center">
            <h1 className="text-8xl font-black uppercase leading-[0.9] tracking-tight">STOP FUNDING</h1>
            <div className="mx-auto mt-3 w-fit border-4 border-black bg-[#facc15] px-6 py-2 shadow-[6px_6px_0_#111]">
              <h2 className="text-8xl font-black uppercase leading-[0.9] tracking-tight">TYRE-KICKERS.</h2>
            </div>
            <p className="mx-auto mt-6 max-w-4xl text-3xl font-black leading-10">
              JobFilter is a bodyguard for your time. It kills dead leads, filters out time-wasters,
              and puts only REAL LEADS in front of you.
            </p>
            <p className="mt-4 text-2xl font-bold text-[#4f6786]">
              📱 Jobs sent directly to your WhatsApp. No apps. No dashboards. Just leads.
            </p>
            <p className="mt-2 text-xl font-bold text-[#8da0bd]">No dead leads. No race to the bottom. No evenings ruined by time-wasters.</p>
            <Link to="/demo" className="mx-auto mt-8 inline-flex border-4 border-black bg-[#facc15] px-12 py-4 text-4xl font-black uppercase shadow-[6px_6px_0_#111]">
              FIND JOBS NEAR YOU →
            </Link>
          </div>
        </section>

        <TrustStrip />

        {/* 2. INTAKE ENGINE */}
        <section className="border-b-4 border-black bg-[#05070d] px-4 py-12">
          <div className="mx-auto max-w-6xl">
            <p className="text-center text-sm font-black uppercase tracking-widest text-[#facc15]">THE CORE PRODUCT</p>
            <h2 className="mt-2 text-center text-7xl font-black uppercase text-white">INTAKE ENGINE</h2>
            <p className="mx-auto mt-4 max-w-3xl text-center text-2xl font-bold text-[#d5deed]">
              One subscription. Finds jobs in your area before they hit the job sites. Filters the wasters.
              Delivers only the ones worth your time — straight to your WhatsApp.
            </p>
            <div className="mt-8 grid gap-0 border-4 border-[#facc15] md:grid-cols-3">
              {[
                ['01', 'FIND',    'Scans planning data, contract notices, and local signals constantly. Before anyone else sees them.'],
                ['02', 'FILTER',  'Kills tyre-kickers, low-budget time-wasters, and jobs not worth your drive — before they reach you.'],
                ['03', 'DELIVER', 'Sends only vetted, high-value jobs to your WhatsApp. Ready to quote. Ready to win.'],
              ].map(([num, title, body], idx) => (
                <article key={title} className={`p-8 text-center ${idx > 0 ? 'border-l-4 border-[#facc15]' : ''}`}>
                  <p className="text-7xl font-black text-[#facc15]">{num}</p>
                  <h3 className="mt-2 text-5xl font-black uppercase text-white">{title}</h3>
                  <p className="mt-4 text-xl font-bold leading-9 text-[#d5deed]">{body}</p>
                </article>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link to="/demo" className="inline-flex border-4 border-[#facc15] bg-[#facc15] px-10 py-4 text-3xl font-black uppercase text-black">
                SEE JOBS IN YOUR AREA →
              </Link>
            </div>
          </div>
        </section>

        {/* 3. DEMO PROOF */}
        <section className="border-b-4 border-black bg-[#e5e5e5] px-4 py-10">
          <div className="mx-auto max-w-6xl text-center">
            <p className="text-sm font-black uppercase tracking-widest text-[#8da0bd]">LIVE SYSTEM</p>
            <h2 className="mt-2 text-6xl font-black uppercase leading-none">SEE REAL JOBS.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-xl font-bold text-[#4f6786]">Enter your postcode. We'll show you what JobFilter has found in your area right now.</p>
            <Link to="/demo" className="mt-6 inline-flex border-4 border-black bg-black px-10 py-4 text-3xl font-black uppercase text-[#facc15]">
              RUN A FREE SCAN →
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
      await fetch('/api/email-gate/unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, postcode, trade }),
      });
    } catch { /* best effort — log on server */ }
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
          <div className="border-4 border-black bg-white p-5">
            <p className="text-xs font-black uppercase tracking-widest text-[#8da0bd]">LIVE LEAD SCAN</p>
            <h1 className="mt-1 text-4xl font-black uppercase leading-none tracking-tight">FIND JOBS NEAR YOU</h1>
            <p className="mt-1 text-sm font-bold text-[#4f6786]">Real jobs. Filtered. Delivered to your WhatsApp when you subscribe.</p>

            <div className="mt-4 flex flex-wrap items-end gap-3">
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
                <select value={trade} onChange={(e) => setTrade(e.target.value)} className="w-44 border-4 border-black px-3 py-2 text-sm font-bold">
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
                className="border-4 border-black bg-[#facc15] px-6 py-3 text-sm font-black uppercase tracking-widest disabled:opacity-50"
              >
                {loading ? 'SCANNING...' : 'RUN LIVE SCAN'}
              </button>
            </div>
          </div>

          {/* Stats strip */}
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            <Panel title="Region"   body={summary.region  || '—'} />
            <Panel title="Postcode" body={summary.outward || postcode.split(' ')[0]} />
            <Panel title="Jobs Found" body={leads.length ? String(leads.length) : '—'} />
          </div>

          {scanError && (
            <p className="mt-3 border-2 border-black bg-[#facc15] px-4 py-2 text-sm font-bold">{scanError}</p>
          )}

          {/* Free leads (always visible) */}
          {freeLeads.length > 0 && (
            <div className="mt-4 grid gap-3">
              {freeLeads.map((lead) => <LeadCard key={lead.id} lead={lead} />)}
            </div>
          )}

          {/* Email gate */}
          {lockedLeads.length > 0 && !emailUnlocked && (
            <div className="mt-4 border-4 border-black bg-[#facc15] p-6 shadow-[6px_6px_0_#000]">
              <p className="text-3xl font-black uppercase">🔒 {lockedLeads.length} MORE JOBS IN YOUR AREA</p>
              <p className="mt-2 text-lg font-bold">
                Enter your email to unlock — we'll also alert you when new jobs match your trade and postcode.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && void submitEmail()}
                  placeholder="your@email.com"
                  className="min-w-[220px] flex-1 border-4 border-black px-4 py-3 text-base font-bold"
                />
                <button
                  onClick={() => void submitEmail()}
                  disabled={emailSubmitting}
                  className="border-4 border-black bg-black px-6 py-3 text-base font-black uppercase text-[#facc15] disabled:opacity-50"
                >
                  {emailSubmitting ? 'UNLOCKING...' : 'UNLOCK JOBS →'}
                </button>
              </div>
              {emailError && <p className="mt-2 text-sm font-bold text-red-700">{emailError}</p>}
            </div>
          )}

          {/* Locked leads — blurred until email submitted */}
          {lockedLeads.length > 0 && (
            <div className={`mt-3 grid gap-3 transition-all duration-300 ${emailUnlocked ? '' : 'pointer-events-none select-none blur-sm'}`}>
              {lockedLeads.map((lead) => <LeadCard key={lead.id} lead={lead} />)}
            </div>
          )}

          {/* WhatsApp CTA */}
          <div className="mt-6 border-4 border-black bg-[#05070d] p-6 text-center">
            <p className="text-3xl font-black uppercase text-[#facc15]">📱 GET THESE ON YOUR WHATSAPP</p>
            <p className="mt-2 text-lg font-bold text-white">
              Subscribe to Intake Engine. New jobs delivered daily — no apps, no dashboards, no faff.
            </p>
            <div className="mt-4">
              <CheckoutButton label="GET INTAKE ENGINE — £49/mo →" email={email} />
            </div>
          </div>

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
        <section className="border-b-4 border-black bg-[#e5e5e5] px-4 py-12">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <h1 className="text-7xl font-black uppercase leading-none">THE COST OF DOING NOTHING</h1>
              <p className="mt-3 text-2xl font-bold text-[#8da0bd]">Adjust the sliders. See what you're leaving on the table every year.</p>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="border-4 border-black bg-white p-8 shadow-[6px_6px_0_#111]">
                <div className="mb-8">
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-black uppercase">Hours wasted per week</p>
                    <span className="border-4 border-black bg-[#facc15] px-4 py-1 text-5xl font-black">{hours}</span>
                  </div>
                  <input type="range" min="1" max="20" value={hours}
                    onChange={(e) => setHours(Number(e.target.value))}
                    className="mt-4 w-full cursor-pointer accent-black" />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-black uppercase">Miles driven for nothing</p>
                    <span className="border-4 border-black bg-[#facc15] px-4 py-1 text-5xl font-black">{miles}</span>
                  </div>
                  <input type="range" min="10" max="200" step="10" value={miles}
                    onChange={(e) => setMiles(Number(e.target.value))}
                    className="mt-4 w-full cursor-pointer accent-black" />
                </div>
              </div>
              <div className="border-4 border-black bg-[#05070d] p-8 text-center text-white shadow-[6px_6px_0_#111]">
                <p className="text-4xl font-black uppercase tracking-wider">YOU LOSE EVERY YEAR</p>
                <p className="mt-3 text-[72px] font-black leading-none text-[#facc15]">£{annualLoss.toLocaleString()}</p>
                <p className="mt-3 text-2xl font-black uppercase">THAT'S A SECOND VAN. PAID FOR.</p>
                <p className="mt-2 text-lg font-bold text-[#8da0bd]">Intake Engine: £49/month. Works out to £1.60/day.</p>
                <Link to="/demo" className="mt-6 inline-flex border-4 border-[#facc15] bg-[#facc15] px-10 py-3 text-2xl font-black uppercase text-black">FIX THIS NOW →</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Plans */}
        <section className="border-b-4 border-black bg-[#05070d] px-4 py-12">
          <div className="mx-auto max-w-6xl text-center">
            <h2 className="text-7xl font-black uppercase text-[#facc15]">ONE PRICE. NO GAMES.</h2>
            <p className="mt-2 text-2xl font-bold text-white">No lead fees. No bidding wars. No race to the bottom.</p>
            <p className="mt-3 text-xl font-bold text-[#facc15]">📱 Jobs delivered straight to your WhatsApp. No dashboard required.</p>
            <p className="mx-auto mt-5 w-fit border-4 border-[#facc15] bg-[#facc15] px-6 py-2 text-xl font-black uppercase">
              If this wins one £20k job, it pays for itself for years.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <article className="border-4 border-black bg-[#e5e5e5] p-6 text-left">
                <h3 className="text-4xl font-black uppercase">FREE TOOLS</h3>
                <p className="mt-1 text-7xl font-black">£0</p>
                <ul className="mt-3 space-y-2 text-lg font-bold">
                  <li>✓ Lead scanner (2 free)</li>
                  <li>✓ Quote estimator</li>
                  <li>✓ Market checker</li>
                  <li className="text-[#8a9bb6]">✕ Job delivery</li>
                  <li className="text-[#8a9bb6]">✕ WhatsApp alerts</li>
                </ul>
                <Link to="/demo" className="mt-8 inline-flex border-4 border-black px-5 py-3 text-xl font-black uppercase">USE FOR FREE</Link>
              </article>

              <article className="border-4 border-black bg-[#facc15] p-6 text-left shadow-[8px_8px_0_#000]">
                <p className="text-sm font-black uppercase">MOST POPULAR · FOR TRADESMEN</p>
                <h3 className="mt-1 text-4xl font-black uppercase">INTAKE ENGINE</h3>
                <p className="mt-1 text-7xl font-black">£49 <span className="text-2xl">/month</span></p>
                <p className="mt-1 text-sm font-bold">£1.60/day. Cancel anytime.</p>
                <ul className="mt-3 space-y-2 text-lg font-bold">
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
                  className="mt-4 w-full border-4 border-black px-3 py-2 text-sm font-bold"
                />
                <div className="mt-3">
                  <CheckoutButton label="GET STARTED →" email={checkoutEmail} />
                </div>
              </article>

              <article className="border-4 border-black bg-[#e5e5e5] p-6 text-left">
                <h3 className="text-4xl font-black uppercase">CODEX</h3>
                <p className="mt-1 text-7xl font-black">£99 <span className="text-2xl">/month</span></p>
                <ul className="mt-3 space-y-2 text-lg font-bold">
                  <li>✓ Specs → sales proposals</li>
                  <li>✓ Better tender presentation</li>
                  <li>✓ For engineering firms</li>
                </ul>
                <Link to="/codex" className="mt-8 inline-flex border-4 border-black bg-black px-5 py-3 text-xl font-black uppercase text-white">VIEW CODEX →</Link>
              </article>
            </div>
          </div>
        </section>

        <Testimonial />

        {/* WhatsApp CTA */}
        <section className="border-b-4 border-black bg-[#facc15] px-4 py-12 text-center">
          <p className="text-xs font-black uppercase tracking-widest">NO APP REQUIRED</p>
          <h2 className="mt-2 text-6xl font-black uppercase leading-none">📱 JOBS TO YOUR WHATSAPP.</h2>
          <p className="mx-auto mt-4 max-w-3xl text-2xl font-bold">
            Subscribe once. We monitor your area, filter the junk, and send only the real jobs — straight to your phone.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <CheckoutButton label="GET INTAKE ENGINE — £49/mo →" />
            <Link to="/demo" className="border-4 border-black bg-white px-8 py-3 text-xl font-black uppercase">SEE SAMPLE JOBS FIRST</Link>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-[#e5e5e5] px-4 py-14 text-center">
          <h2 className="text-7xl font-black uppercase leading-none">READY TO STOP GUESSING?</h2>
          <p className="mx-auto mt-5 max-w-3xl text-2xl font-bold text-[#8da0bd]">
            Subscribe to Intake Engine. Get Vantage, Vicinity, and Codex included. Cancel anytime.
          </p>
          <div className="mt-8">
            <CheckoutButton label="GET INTAKE ENGINE →" />
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
      title="CODEX"
      summary="Convert technical specs into sales copy that closes jobs. NO CHASING."
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
      title="VANTAGE"
      summary="Turn your tenders into premium visual bid decks. WIN ON PRESENTATION."
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
      title="VICINITY"
      summary="Turn past work into local sales assets that keep winning new jobs."
      sections={[
        { title: 'Pain',    body: 'Best work rots in your camera roll.' },
        { title: 'Fix',     body: 'Surface nearby completed jobs as social proof.' },
        { title: 'Control', body: 'Own your local patch with visible results.' },
        { title: 'Result',  body: 'Warmer enquiries and faster yes decisions.' },
      ]}
    />
  );
}

export function DashboardPage() {
  return <ProductPage title="DASHBOARD" summary="Your intake control room." sections={[{ title: 'Focus', body: 'Watch lead quality and move quick.' }, { title: 'Speed', body: 'See what matters first.' }, { title: 'Control', body: 'Run jobs like a system.' }, { title: 'Result', body: 'Less chaos. More paid work.' }]} />;
}

export function ActivationPendingPage() {
  return <ProductPage title="ACTIVATION PENDING" summary="Setup is queued. Demo is live now." sections={[{ title: 'Now', body: 'Run the demo and check job flow.' }, { title: 'Next', body: 'We finish setup and unlock full access.' }, { title: 'Control', body: 'You keep momentum while waiting.' }, { title: 'Result', body: 'No dead end.' }]} />;
}

export function PrivacyPage() {
  return <ProductPage title="PRIVACY" summary="We keep only what is needed to run the system." sections={[{ title: 'Keep', body: 'Only routing and scoring data.' }, { title: 'No traps', body: 'No pointless data grab.' }, { title: 'Control', body: 'Simple and direct.' }, { title: 'Result', body: 'Clear rules. No noise.' }]} />;
}

export function TermsPage() {
  return <ProductPage title="TERMS" summary="JobFilter filters leads. You control pricing and delivery." sections={[{ title: 'Role', body: 'We filter intake and surface jobs.' }, { title: 'Boundary', body: 'Your trade agreement stays yours.' }, { title: 'Control', body: 'Clear split. No confusion.' }, { title: 'Result', body: 'Fair and simple.' }]} />;
}
