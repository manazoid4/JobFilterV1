import { Fragment, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

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
  { to: '/demo', label: 'Find Jobs' },
  { to: '/vantage', label: 'Vantage' },
  { to: '/vicinity', label: 'Vicinity' },
  { to: '/codex', label: 'Codex' },
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
      window.location.href = '/activation-pending';
    }
  } catch {
    window.location.href = '/activation-pending';
  }
}

// ── Shell ─────────────────────────────────────────────────────────────────────

function Shell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    }
    if (menuOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen]);

  return (
    <div className="min-h-screen max-w-full overflow-x-hidden bg-gray-50 text-black">
      <header className="sticky top-0 z-20 border-b border-[#2d3b4f] bg-[#0a0f1e]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3" ref={menuRef}>
          <Link to="/" className="flex items-center gap-2 text-lg font-bold leading-none tracking-tight text-white sm:text-xl">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[#facc15] text-xl">🇬🇧</span>
            JobFilter
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-4 text-sm font-semibold md:flex">
            {NAV_ITEMS.map((item) => (
              <Link key={item.label} to={item.to} className="text-[#94a3b8] transition-colors hover:text-white">
                {item.label}
              </Link>
            ))}
            <Link to="/demo" className="rounded-md bg-[#2563eb] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1d4ed8]">
              Find Jobs
            </Link>
          </nav>

          {/* Mobile: Find Jobs + hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <Link to="/demo" className="rounded-md bg-[#facc15] px-3 py-2 text-sm font-bold text-black">
              Find Jobs
            </Link>
            <button
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((o) => !o)}
              className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-md border border-[#2d3b4f] text-white"
            >
              <span className={`block h-0.5 w-5 bg-white transition-transform duration-200 ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
              <span className={`block h-0.5 w-5 bg-white transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-5 bg-white transition-transform duration-200 ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile nav drawer */}
        {menuOpen && (
          <nav className="border-t border-[#2d3b4f] bg-[#0a0f1e] px-4 pb-4 md:hidden">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="block py-3 text-base font-semibold text-[#94a3b8] transition-colors hover:text-white border-b border-[#1e2a3a] last:border-0"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      {children}

      <footer className="border-t border-[#2d3b4f] bg-[#0a0f1e] px-4 py-8">
        <div className="mx-auto max-w-6xl space-y-4 text-center md:flex md:items-center md:justify-between md:space-y-0 md:text-left">
          <p className="text-sm font-medium text-[#64748b]">© 2026 JobFilter. Built for UK trades.</p>
          <div className="flex flex-wrap justify-center gap-6 md:justify-end">
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
      <div className="mx-auto flex max-w-6xl items-center justify-start gap-6 overflow-x-auto md:justify-center md:gap-10">
        <p className="flex-shrink-0 text-sm font-semibold text-[#facc15]">247 jobs found today</p>
        <p className="flex-shrink-0 text-sm font-semibold text-white">Updated live</p>
        <p className="flex-shrink-0 text-sm font-semibold text-[#94a3b8]">3,200+ tradespeople</p>
        <p className="flex-shrink-0 text-sm font-semibold text-[#94a3b8]">📱 Delivered to WhatsApp</p>
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
      <div className={`w-1.5 flex-shrink-0 ${style.bar}`} />
      <div className="flex-1 p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h2 className="text-sm font-bold leading-snug text-gray-900 sm:text-base">{lead.title}</h2>
            <p className="mt-0.5 font-mono text-xs text-gray-500">{lead.location}</p>
          </div>
          <span className={`flex-shrink-0 rounded px-2 py-0.5 text-[11px] font-semibold capitalize ${style.badge}`}>
            {urg}
          </span>
        </div>
        <div className="mt-3 border-t border-gray-100 pt-3">
          <span className="text-base font-bold text-gray-900 sm:text-lg">{lead.estimatedValue}</span>
          <div className="mt-2 flex flex-wrap gap-1.5">
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
      className="inline-flex w-full cursor-pointer items-center justify-center rounded-md bg-[#2563eb] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#1d4ed8] disabled:opacity-60 sm:w-auto"
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
          <h1 className="mt-2 text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl">{title}</h1>
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
        <section className="border-b-2 border-[#2d3b4f] bg-[#0a0f1e] px-4 py-12 md:py-20">
          <div className="mx-auto max-w-6xl text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#06b6d4] sm:text-sm">Built for UK tradespeople</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
              The jobs worth quoting<br className="hidden sm:block" /> land in your WhatsApp.
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-base font-medium leading-7 text-[#94a3b8] sm:text-lg sm:leading-8">
              JobFilter scans planning applications, contract notices, and local signals across the UK —
              then sends only the verified, high-value work directly to you. Every morning.
            </p>
            <p className="mt-3 text-sm font-medium text-[#64748b]">📱 Jobs delivered to WhatsApp. No apps. No dashboards. Just leads.</p>
            <p className="mt-3 text-xs font-bold uppercase tracking-widest text-[#facc15]">Real Leads · No Chasing · No Competing · Stay In Control</p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
              <Link to="/demo" className="w-full rounded-md bg-[#facc15] px-8 py-4 text-base font-bold text-black transition-colors hover:bg-yellow-300 sm:w-auto">
                Enter The Intake →
              </Link>
              <Link to="/pricing" className="w-full rounded-md border border-[#2d3b4f] px-8 py-4 text-base font-semibold text-[#94a3b8] transition-colors hover:border-white hover:text-white sm:w-auto">
                View pricing
              </Link>
            </div>
            <p className="mt-6 text-sm font-medium text-[#64748b]">
              Used by 1,400+ UK tradesmen · Average 11 qualified leads per week
            </p>
          </div>
        </section>

        <TrustStrip />

        {/* BODYGUARD */}
        <section className="border-b-2 border-gray-200 bg-white px-4 py-12">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#2563eb]">WhatsApp Bodyguard</p>
                <h2 className="mt-2 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
                  Time-wasters don't get through.<br />Your phone stays yours.
                </h2>
                <p className="mt-4 text-base font-medium leading-7 text-gray-600">
                  Checkatrade sells your number to five blokes who'll all undercut each other for the same job. JobFilter works the opposite way — it blocks the rubbish before it reaches you. Only jobs worth quoting get through.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    'Tyre-kickers filtered out before they reach your phone',
                    'No more driving 40 minutes for a £300 budget job',
                    'No more quoting against four cowboys on the same lead',
                    'Jobs delivered to WhatsApp. You decide which ones to call.',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm font-medium text-gray-700">
                      <span className="mt-0.5 flex-shrink-0 text-[#2563eb]">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Link to="/demo" className="inline-flex rounded-md bg-[#0a0f1e] px-6 py-3 text-base font-semibold text-white hover:bg-[#1e2a3a]">See it in action →</Link>
                </div>
              </div>
              <div className="rounded-xl border-2 border-[#2d3b4f] bg-[#0a0f1e] p-6 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-[#facc15]">Your morning WhatsApp</p>
                <div className="mt-4 space-y-3">
                  {[
                    { job: 'Boiler swap · B14 · £2.8k', badge: 'HIGH', color: 'bg-red-500' },
                    { job: 'Full rewire · CV5 · £5.2k', badge: 'HIGH', color: 'bg-red-500' },
                    { job: 'Roof repair · WV3 · £3.1k', badge: 'MED', color: 'bg-[#facc15]' },
                    { job: 'Bathroom refit · LS6 · £6.5k', badge: 'MED', color: 'bg-[#facc15]' },
                  ].map((item) => (
                    <div key={item.job} className="flex items-center justify-between rounded-lg border border-[#2d3b4f] bg-[#1e2a3a] px-4 py-3">
                      <span className="text-sm font-semibold text-white">{item.job}</span>
                      <span className={`rounded px-2 py-0.5 text-[10px] font-bold text-black ${item.color}`}>{item.badge}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-center text-xs font-medium text-[#64748b]">Tyre-kickers already removed. These are real.</p>
              </div>
            </div>
          </div>
        </section>

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
                <article key={title} className={`p-6 text-center sm:p-8 ${idx > 0 ? 'border-t-2 border-[#2d3b4f] md:border-l-2 md:border-t-0' : ''}`}>
                  <p className="text-5xl font-bold text-[#facc15]">{num}</p>
                  <h3 className="mt-2 text-2xl font-bold text-white sm:text-3xl">{title}</h3>
                  <p className="mt-4 text-sm font-medium leading-7 text-[#94a3b8] sm:text-base">{body}</p>
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

  const freeLeads   = useMemo(() => leads, [leads]); // TEST MODE — revert to slice(0,2)
  const lockedLeads = useMemo(() => [] as Lead[],   []);  // TEST MODE — revert to slice(2)

  return (
    <Shell>
      <main className="px-4 py-8">
        <div className="mx-auto max-w-4xl">

          {/* Header */}
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#2563eb]">Live lead scan</p>
            <h1 className="mt-1 text-3xl font-bold leading-tight text-gray-900">Find jobs near you</h1>
            <p className="mt-1 text-sm font-medium text-gray-500">Enter your postcode. See real jobs in your area now.</p>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap sm:items-end">
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-gray-700">Postcode</span>
                <input
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                  className="w-full rounded-md border border-gray-300 px-3 py-3 text-base font-medium focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 sm:w-40 sm:py-2 sm:text-sm"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-gray-700">Trade</span>
                <select value={trade} onChange={(e) => setTrade(e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-3 text-base font-medium focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 sm:w-44 sm:py-2 sm:text-sm">
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
                className="w-full rounded-md bg-[#facc15] px-5 py-3 text-base font-bold text-black transition-colors hover:bg-yellow-300 disabled:opacity-50 sm:w-auto sm:py-2.5 sm:text-sm sm:font-semibold"
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
              {freeLeads.map((lead) => (
                <Fragment key={lead.id}>
                  <LeadCard lead={lead} />
                </Fragment>
              ))}
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
              <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl">The cost of losing bad leads</h1>
              <p className="mt-3 text-base font-medium text-gray-600 sm:text-lg">Adjust the sliders. See what bad leads cost you per year.</p>
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
            <h2 className="text-3xl font-bold text-[#facc15] sm:text-4xl md:text-5xl">One price. Fair System. No games.</h2>
            <p className="mt-2 text-base font-medium text-[#94a3b8] sm:text-xl">No per-lead fees. No bidding wars. No race to the bottom.</p>
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
          <h2 className="mt-2 text-3xl font-bold leading-tight text-black sm:text-4xl">📱 Get jobs on WhatsApp</h2>
          <p className="mx-auto mt-4 max-w-3xl text-base font-medium text-black/70 sm:text-lg">
            Real jobs sent to your phone every day. No app. No dashboard. Just leads.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <CheckoutButton label="Get Intake Engine — £49/mo →" />
            <Link to="/demo" className="w-full rounded-md border-2 border-black bg-white px-6 py-3 text-base font-bold text-black transition-colors hover:bg-gray-50 sm:w-auto">See sample jobs first</Link>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-[#f8fafc] px-4 py-14 text-center">
          <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl">Ready to find real leads?</h2>
          <p className="mx-auto mt-5 max-w-3xl text-base font-medium text-gray-600 sm:text-xl">
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
    <Shell>
      <main>
        {/* Hero */}
        <section className="border-b-2 border-[#2d3b4f] bg-[#0a0f1e] px-4 py-14">
          <div className="mx-auto max-w-5xl">
            <p className="text-xs font-bold uppercase tracking-widest text-[#06b6d4]">Codex · Technical Sales</p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              Complex specs lose jobs<br className="hidden sm:block" /> to simpler quotes.
            </h1>
            <p className="mt-4 max-w-2xl text-base font-medium leading-7 text-[#94a3b8] sm:text-lg">
              Your technical knowledge should win jobs, not lose them. Clients don't read 40-page manuals. Codex turns your specs, schematics, and manuals into content clients actually buy from.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link to="/pricing" className="inline-flex items-center justify-center rounded-md bg-[#facc15] px-6 py-3 text-base font-bold text-black hover:bg-yellow-300">Get Codex →</Link>
              <Link to="/demo" className="inline-flex items-center justify-center rounded-md border border-[#2d3b4f] px-6 py-3 text-base font-semibold text-[#94a3b8] hover:border-white hover:text-white">See Intake Engine first</Link>
            </div>
          </div>
        </section>

        {/* What you get */}
        <section className="border-b-2 border-gray-200 bg-white px-4 py-12">
          <div className="mx-auto max-w-5xl">
            <p className="text-xs font-bold uppercase tracking-widest text-[#64748b]">Three outputs</p>
            <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">Upload the spec. Get sales assets back.</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {[
                { icon: '🎬', title: 'How-It-Works Videos', body: 'Upload a schematic or installation manual. Get a 60-second animated explainer. Clients watch it, understand it, trust you. Kills the "it\'s too complicated" objection.' },
                { icon: '📱', title: 'Sales Carousels', body: 'Turn instruction manuals into swipeable social content. LinkedIn and Instagram posts that show your technical authority without you having to explain it yourself.' },
                { icon: '⚔️', title: 'Competitor Battle Cards', body: '"Why us vs. them" — one page that turns your spec sheet into a side-by-side comparison you win every time. Hand it over at the end of every survey.' },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border border-gray-200 p-6 shadow-sm">
                  <p className="text-4xl">{item.icon}</p>
                  <h3 className="mt-3 text-lg font-bold text-gray-900">{item.title}</h3>
                  <p className="mt-2 text-sm font-medium leading-6 text-gray-600">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who it's for */}
        <section className="border-b-2 border-[#2d3b4f] bg-[#0a0f1e] px-4 py-12">
          <div className="mx-auto max-w-5xl">
            <p className="text-xs font-bold uppercase tracking-widest text-[#facc15]">Who uses Codex</p>
            <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">Built for technical trades and manufacturers.</h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {['HVAC & MEP engineers', 'Solar & EV charger installers', 'Fire & security firms', 'Heat pump specialists', 'Manufacturers selling to installers', 'Building services contractors'].map((t) => (
                <div key={t} className="flex items-center gap-3 rounded-lg border border-[#2d3b4f] bg-[#1e2a3a] px-4 py-3">
                  <span className="text-[#facc15]">✓</span>
                  <span className="text-sm font-semibold text-white">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Examples */}
        <section className="border-b-2 border-gray-200 bg-[#f8fafc] px-4 py-12">
          <div className="mx-auto max-w-5xl">
            <p className="text-xs font-bold uppercase tracking-widest text-[#64748b]">Real examples</p>
            <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">Specs in. Sales assets out.</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { input: 'ASHP technical datasheet', output: '3-slide visual sales page', result: 'Closes retrofit enquiries without a site visit. Homeowner books before they\'ve spoken to a competitor.' },
                { input: 'MVHR schematic', output: '"How this works in your home" video', result: 'Kills the "it sounds complicated" objection. Conversion rate from enquiry to survey up 40%.' },
                { input: 'Sprinkler system spec', output: 'Battle card vs. competitor', result: 'Shows code compliance + cost advantage side by side. FM Global approved. Signed on spec.' },
                { input: 'EV charger installation manual', output: 'Instagram carousel', result: '6 posts from one manual. Positions installer as the authority. Three inbound enquiries from one post.' },
                { input: 'Boiler flue regulations doc', output: 'Client FAQ one-pager', result: 'Handed out at every quote. Stops objections before they start. "Are you sure it\'s compliant?" — gone.' },
                { input: 'Solar PV sizing guide', output: 'ROI calculator explainer video', result: 'Used in proposals. Client sees their payback period visually. Closes 60% faster than quote-only.' },
              ].map((ex) => (
                <div key={ex.input} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#64748b]">Input</p>
                  <p className="mt-1 text-sm font-bold text-gray-900">{ex.input}</p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-[#2563eb]">Output</p>
                  <p className="mt-1 text-sm font-bold text-gray-900">{ex.output}</p>
                  <p className="mt-3 text-xs font-medium leading-5 text-gray-500">{ex.result}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#f8fafc] px-4 py-14 text-center">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Codex is £99/month standalone.<br className="hidden sm:block" /> Included with Intake Engine at £49/month.</h2>
          <p className="mx-auto mt-3 max-w-xl text-base font-medium text-gray-600">Find better jobs. Win them on technical authority. One system.</p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <CheckoutButton label="Get Intake Engine + Codex →" />
            <Link to="/pricing" className="w-full rounded-md border border-gray-300 px-6 py-3 text-base font-semibold text-gray-700 hover:bg-gray-100 sm:w-auto">View all plans</Link>
          </div>
        </section>
      </main>
    </Shell>
  );
}

export function VantagePage() {
  return (
    <Shell>
      <main>
        {/* Hero */}
        <section className="border-b-2 border-[#2d3b4f] bg-[#0a0f1e] px-4 py-14">
          <div className="mx-auto max-w-5xl">
            <p className="text-xs font-bold uppercase tracking-widest text-[#06b6d4]">Vantage · Bid Intelligence</p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              Stop losing £1M bids<br className="hidden sm:block" /> to prettier firms.
            </h1>
            <p className="mt-4 max-w-2xl text-base font-medium leading-7 text-[#94a3b8] sm:text-lg">
              You do better work. You charge a fair price. You still lose — because their PDF looks like it came from a £5M contractor and yours looks like it came from Word 2009. Vantage fixes that.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link to="/pricing" className="inline-flex items-center justify-center rounded-md bg-[#facc15] px-6 py-3 text-base font-bold text-black hover:bg-yellow-300">Get Vantage with Intake Engine →</Link>
              <Link to="/demo" className="inline-flex items-center justify-center rounded-md border border-[#2d3b4f] px-6 py-3 text-base font-semibold text-[#94a3b8] hover:border-white hover:text-white">See a sample bid deck</Link>
            </div>
          </div>
        </section>

        {/* Before / After */}
        <section className="border-b-2 border-gray-200 bg-white px-4 py-12">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">The same job. Two very different outcomes.</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border-2 border-red-200 bg-red-50 p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-red-500">Before Vantage</p>
                <h3 className="mt-2 text-lg font-bold text-gray-900">Word doc. 3 pages. No photos.</h3>
                <ul className="mt-4 space-y-2 text-sm font-medium text-gray-700">
                  <li>✕ Calibri font, size 11</li>
                  <li>✕ No visuals, no renders, no proof</li>
                  <li>✕ Looks like every other cowboy's quote</li>
                  <li>✕ Client picks the slicker firm — even if they charge more</li>
                  <li>✕ You lose a £80k job on presentation</li>
                </ul>
              </div>
              <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50 p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">After Vantage</p>
                <h3 className="mt-2 text-lg font-bold text-gray-900">24-page visual bid deck. Looks like Wates built it.</h3>
                <ul className="mt-4 space-y-2 text-sm font-medium text-gray-700">
                  <li>✓ Branded cover + executive summary</li>
                  <li>✓ 3D renders showing the finished result</li>
                  <li>✓ Photo evidence from past jobs</li>
                  <li>✓ Timeline, cost breakdown, credentials</li>
                  <li>✓ Client signs off same week</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* What you get */}
        <section className="border-b-2 border-[#2d3b4f] bg-[#0a0f1e] px-4 py-12">
          <div className="mx-auto max-w-5xl">
            <p className="text-xs font-bold uppercase tracking-widest text-[#06b6d4]">What Vantage produces</p>
            <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">Three outputs. All from your existing docs.</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { title: 'Visual Bid Deck', body: 'Multi-page proposal: cover, scope, timeline, cost breakdown, team credentials, past work photos. Clients see a serious contractor.' },
                { title: '3D Renders', body: 'Show the client exactly what the finished job looks like before you start. Kills objections. Closes faster. No architect needed.' },
                { title: 'Infographics', body: 'Turn your method statement or spec sheet into something a client actually reads. One page. High impact. Scored higher on quality criteria.' },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border border-[#2d3b4f] bg-[#1e2a3a] p-6">
                  <h3 className="text-lg font-bold text-[#facc15]">{item.title}</h3>
                  <p className="mt-3 text-sm font-medium leading-6 text-[#94a3b8]">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Real examples */}
        <section className="border-b-2 border-gray-200 bg-[#f8fafc] px-4 py-12">
          <div className="mx-auto max-w-5xl">
            <p className="text-xs font-bold uppercase tracking-widest text-[#64748b]">Real-world examples</p>
            <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">Jobs won with a Vantage deck.</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { value: '£800k', label: 'Social housing refurb', detail: 'Council estate rewire + heating upgrade. Vantage deck beat 6 larger firms. Scored highest on quality criteria.' },
                { value: '£150k', label: 'Commercial extension', detail: '3D render of finished extension closed the deal in one meeting. Client dropped the architect they\'d been using for 3 years.' },
                { value: '£2.1M', label: 'Tier 1 framework bid', detail: 'NHS framework application. Method statement infographic scored 92/100. First time the firm made it onto a Tier 1 framework.' },
                { value: '£45k', label: 'High-end landscaping', detail: 'Bespoke garden design. Vantage 3D render against a blank Word doc from the competitor. Client: "Yours looked like a proper company."' },
                { value: '£320k', label: 'School roofing contract', detail: 'LA-tendered school roof. Visual timeline showing zero disruption to term time was the deciding factor. Won on quality, not price.' },
                { value: '£90k', label: 'Luxury bathroom fit-out', detail: 'Developer site, 6 units. Render showing finished spec vs. builder\'s spec. Signed before rivals had even submitted.' },
              ].map((ex) => (
                <div key={ex.label} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                  <p className="text-3xl font-bold text-[#2563eb]">{ex.value}</p>
                  <p className="mt-1 text-sm font-bold text-gray-900">{ex.label}</p>
                  <p className="mt-2 text-xs font-medium leading-5 text-gray-500">{ex.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tier 1 */}
        <section className="border-b-2 border-[#2d3b4f] bg-[#0a0f1e] px-4 py-12">
          <div className="mx-auto max-w-5xl">
            <p className="text-xs font-bold uppercase tracking-widest text-[#facc15]">Tier 1 work</p>
            <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">Get on the frameworks the big firms dominate.</h2>
            <p className="mt-4 max-w-2xl text-base font-medium text-[#94a3b8]">Council contracts. NHS frameworks. Housing association programmes. They don't go to the cheapest firm — they go to the firm that looks like it can handle the job. Vantage gets you there.</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {['NHS & public sector frameworks', 'Local authority housing programmes', 'Pre-qualification questionnaires (PQQ)', 'Design & Build tenders', 'JCT / NEC contract submissions', 'Housing association batch contracts'].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-lg border border-[#2d3b4f] bg-[#1e2a3a] px-4 py-3">
                  <span className="text-[#facc15]">✓</span>
                  <span className="text-sm font-semibold text-white">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#f8fafc] px-4 py-14 text-center">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Vantage is included with Intake Engine.</h2>
          <p className="mx-auto mt-3 max-w-xl text-base font-medium text-gray-600">One subscription. Find the jobs. Win the jobs. £49/month.</p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <CheckoutButton label="Get Intake Engine + Vantage →" />
            <Link to="/demo" className="w-full rounded-md border border-gray-300 px-6 py-3 text-base font-semibold text-gray-700 hover:bg-gray-100 sm:w-auto">See jobs first</Link>
          </div>
        </section>
      </main>
    </Shell>
  );
}

export function VicinityPage() {
  return (
    <Shell>
      <main>
        {/* Hero */}
        <section className="border-b-2 border-[#2d3b4f] bg-[#0a0f1e] px-4 py-14">
          <div className="mx-auto max-w-5xl">
            <p className="text-xs font-bold uppercase tracking-widest text-[#06b6d4]">Vicinity · Local Marketing</p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              Your best work is rotting<br className="hidden sm:block" /> in your camera roll.
            </h1>
            <p className="mt-4 max-w-2xl text-base font-medium leading-7 text-[#94a3b8] sm:text-lg">
              You've done thousands of jobs. 99% of the proof is buried on your iPhone. Vicinity turns finished jobs into local sales assets that keep winning new work — automatically, without you doing social media.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link to="/pricing" className="inline-flex items-center justify-center rounded-md bg-[#facc15] px-6 py-3 text-base font-bold text-black hover:bg-yellow-300">Get Vicinity with Intake Engine →</Link>
              <Link to="/demo" className="inline-flex items-center justify-center rounded-md border border-[#2d3b4f] px-6 py-3 text-base font-semibold text-[#94a3b8] hover:border-white hover:text-white">See Intake Engine first</Link>
            </div>
          </div>
        </section>

        {/* Before / After */}
        <section className="border-b-2 border-gray-200 bg-white px-4 py-12">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Before vs. after. Same job. Different result.</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border-2 border-red-200 bg-red-50 p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-red-500">What most tradesmen post</p>
                <p className="mt-3 text-base font-semibold text-gray-800 italic">"Busy week, nice bathroom job in Leeds 📸"</p>
                <ul className="mt-4 space-y-2 text-sm font-medium text-gray-700">
                  <li>✕ Blurry, uncropped photo</li>
                  <li>✕ No location signal, no value signal</li>
                  <li>✕ Looks like every other post on Facebook</li>
                  <li>✕ Gets 3 likes from family</li>
                  <li>✕ Dead by Thursday</li>
                </ul>
              </div>
              <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50 p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">What Vicinity produces</p>
                <p className="mt-3 text-base font-semibold text-gray-800 italic">"Just finished this full bathroom refit in LS6 — full suite, tiled floor to ceiling, heated rail. Ready in 4 days. DM for availability."</p>
                <ul className="mt-4 space-y-2 text-sm font-medium text-gray-700">
                  <li>✓ Professional before/after format</li>
                  <li>✓ Location tagged to attract local enquiries</li>
                  <li>✓ Value signal built in</li>
                  <li>✓ WhatsApp-ready in one tap</li>
                  <li>✓ 3 inbound enquiries by Sunday</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* What you get */}
        <section className="border-b-2 border-[#2d3b4f] bg-[#0a0f1e] px-4 py-12">
          <div className="mx-auto max-w-5xl">
            <p className="text-xs font-bold uppercase tracking-widest text-[#06b6d4]">Three outputs</p>
            <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">One job. Three assets. All from your phone.</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { icon: '📱', title: 'WhatsApp-Ready Posts', body: 'Before/after formatted, captioned, location-tagged. One tap to send to your local contacts, WhatsApp groups, or customer follow-up list.' },
                { icon: '🌐', title: 'Website Gallery Updates', body: 'Upload a photo. It\'s auto-formatted, captioned by trade and location, and added to your site. Your portfolio stays live without you touching it.' },
                { icon: '📍', title: 'Local Area Drops', body: '"Just finished this in [their road]." Targeted posts based on your recent job postcodes. The most powerful local marketing there is — proof on their doorstep.' },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border border-[#2d3b4f] bg-[#1e2a3a] p-6">
                  <p className="text-4xl">{item.icon}</p>
                  <h3 className="mt-3 text-lg font-bold text-[#facc15]">{item.title}</h3>
                  <p className="mt-2 text-sm font-medium leading-6 text-[#94a3b8]">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Real examples */}
        <section className="border-b-2 border-gray-200 bg-[#f8fafc] px-4 py-12">
          <div className="mx-auto max-w-5xl">
            <p className="text-xs font-bold uppercase tracking-widest text-[#64748b]">How tradesmen use it</p>
            <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">Finished a job Friday. Three enquiries by Monday.</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { trade: 'Bathroom fitter · Leeds', result: '3 enquiries in 48 hours from a single Vicinity post. All within 1 mile of the original job.' },
                { trade: 'Electrician · Birmingham', result: 'WhatsApp group drop of a rewire job. Two of the neighbours in the same street booked surveys.' },
                { trade: 'Roofer · Manchester', result: 'Before/after of a storm-damaged roof. Shared by homeowner. 6 inbound calls the same week.' },
                { trade: 'Landscaper · Bristol', result: 'Gallery update automated. Client found them via website photos, not word of mouth. £14k job.' },
                { trade: 'Plasterer · Coventry', result: 'Local area drop in CV4. "Just done this on your road" message. Booked 4 jobs in the same street in one month.' },
                { trade: 'Builder · Solihull', result: 'WhatsApp-ready extension photos sent to 3 WhatsApp groups. First extension referral came in the same day.' },
              ].map((ex) => (
                <div key={ex.trade} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                  <p className="text-sm font-bold text-[#2563eb]">{ex.trade}</p>
                  <p className="mt-2 text-sm font-medium leading-5 text-gray-600">{ex.result}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#f8fafc] px-4 py-14 text-center">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Vicinity is included with Intake Engine.</h2>
          <p className="mx-auto mt-3 max-w-xl text-base font-medium text-gray-600">Find the jobs. Win them. Then turn every completed job into the next one. £49/month.</p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <CheckoutButton label="Get Intake Engine + Vicinity →" />
            <Link to="/demo" className="w-full rounded-md border border-gray-300 px-6 py-3 text-base font-semibold text-gray-700 hover:bg-gray-100 sm:w-auto">See jobs first</Link>
          </div>
        </section>
      </main>
    </Shell>
  );
}

export function DashboardPage() {
  return <ProductPage title="Dashboard" summary="Your intake control room." sections={[{ title: 'Focus', body: 'Watch lead quality and move quick.' }, { title: 'Speed', body: 'See what matters first.' }, { title: 'Control', body: 'Run jobs like a system.' }, { title: 'Result', body: 'Less chaos. More paid work.' }]} />;
}

export function ActivationPendingPage() {
  return (
    <Shell>
      <main className="flex min-h-[70vh] items-center justify-center px-4 py-16">
        <div className="mx-auto max-w-lg text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#facc15] text-3xl">✓</div>
          <h1 className="mt-6 text-3xl font-bold text-gray-900">You're registered.</h1>
          <p className="mt-3 text-base font-medium text-gray-600">Your account is being set up. We'll message you on WhatsApp once your Intake Engine is live — usually within a few hours.</p>
          <div className="mt-8 rounded-xl border border-gray-200 bg-[#f8fafc] p-6 text-left">
            <p className="text-sm font-bold text-gray-900">What happens next:</p>
            <ul className="mt-4 space-y-3 text-sm font-medium text-gray-600">
              <li className="flex items-start gap-2"><span className="text-[#2563eb]">1.</span> We confirm your trade and postcode area</li>
              <li className="flex items-start gap-2"><span className="text-[#2563eb]">2.</span> Your Intake Engine goes live — scanning for jobs in your area</li>
              <li className="flex items-start gap-2"><span className="text-[#2563eb]">3.</span> First job drop arrives on WhatsApp tomorrow morning</li>
            </ul>
          </div>
          <div className="mt-6">
            <Link to="/demo" className="inline-flex rounded-md bg-[#0a0f1e] px-6 py-3 text-base font-semibold text-white hover:bg-[#1e2a3a]">See sample jobs while you wait →</Link>
          </div>
        </div>
      </main>
    </Shell>
  );
}

export function PrivacyPage() {
  return <ProductPage title="Privacy" summary="We keep only what is needed to run the system." sections={[{ title: 'Keep', body: 'Only routing and scoring data.' }, { title: 'No traps', body: 'No pointless data grab.' }, { title: 'Control', body: 'Simple and direct.' }, { title: 'Result', body: 'Clear rules. No noise.' }]} />;
}

export function TermsPage() {
  return <ProductPage title="Terms" summary="JobFilter filters leads. You control pricing and delivery." sections={[{ title: 'Role', body: 'We filter intake and surface jobs.' }, { title: 'Boundary', body: 'Your trade agreement stays yours.' }, { title: 'Control', body: 'Clear split. No confusion.' }, { title: 'Result', body: 'Fair and simple.' }]} />;
}
