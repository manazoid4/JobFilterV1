import { ReactNode, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

export function PricingPage() {
  const [hours, setHours] = useState(5);
  const [miles, setMiles] = useState(50);
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const annualCost = useMemo(() => (hours * 35 + miles * 0.45) * 52, [hours, miles]);

  async function startIntake() {
    setSubmitting(true);
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() || undefined }),
      });
      const data = await res.json() as { url?: string; error?: string };
      if (data.url) window.location.href = data.url;
    } catch {
      // silent — button re-enables
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[var(--navy)] text-white">

      {/* Cost calculator */}
      <section className="border-b border-white/10 px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-center text-3xl font-black md:text-5xl">The cost of losing bad leads</h1>
          <p className="mt-3 text-center text-base text-white/50">Adjust the sliders. See what bad leads cost you per year.</p>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <Slider label="Hours lost per week" value={hours} min={0} max={20} onChange={setHours} />
              <Slider label="Wasted miles per week" value={miles} min={0} max={300} step={5} onChange={setMiles} className="mt-6" />
            </div>
            <div className="flex flex-col justify-between rounded-2xl bg-[#0d1426] p-6">
              <div>
                <p className="text-sm font-bold text-white/50">You lose every year</p>
                <p className="mt-1 text-6xl font-black text-[var(--yellow)]">£{Math.round(annualCost).toLocaleString()}</p>
                <p className="mt-3 font-bold text-white/70">That could be another vehicle paid for.</p>
                <p className="mt-1 text-sm text-white/40">Intake Engine: £49/month. Works out to £1.60/day.</p>
              </div>
              <Link to="/find-jobs" className="mt-6 inline-block rounded-lg border border-[var(--yellow)] px-5 py-3 text-center font-black text-[var(--yellow)] hover:bg-[var(--yellow)] hover:text-[var(--ink)] transition-colors">
                Fix this now →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-black md:text-5xl">One price. Fair System. No games.</h2>
          <p className="mt-3 text-center text-white/50">No per-lead fees. No bidding wars. No race to the bottom.</p>
          <p className="mt-2 text-center text-sm font-bold text-[var(--yellow)]">Jobs delivered straight to your WhatsApp. No dashboard required.</p>
          <div className="mt-3 text-center">
            <span className="inline-block rounded-full bg-[var(--yellow)]/15 px-4 py-1.5 text-xs font-black text-[var(--yellow)]">
              If this wins one £20k job, it pays for itself for years.
            </span>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-black text-white/50">Free Tools</p>
              <p className="mt-2 text-5xl font-black">£0</p>
              <ul className="mt-5 space-y-2 text-sm">
                <Li check>Lead scanner (2 free)</Li>
                <Li check>Quote estimator</Li>
                <Li check>Market checker</Li>
                <Li>Job delivery</Li>
                <Li>WhatsApp alerts</Li>
              </ul>
              <Link to="/find-jobs" className="mt-6 block rounded-lg border border-white/20 px-4 py-2.5 text-center text-sm font-black hover:bg-white/10">
                Use for free
              </Link>
            </div>

            <div className="rounded-2xl bg-[var(--yellow)] p-6 text-[var(--ink)]">
              <p className="text-xs font-black uppercase tracking-widest opacity-60">Most popular · For tradesmen</p>
              <p className="mt-1 text-lg font-black">Intake Engine</p>
              <div className="mt-2 flex items-end gap-1">
                <span className="text-5xl font-black">£49</span>
                <span className="mb-1 font-bold opacity-60">/month</span>
              </div>
              <p className="mt-1 text-xs font-bold opacity-50">£1.60/day. Cancel anytime.</p>
              <ul className="mt-5 space-y-2 text-sm">
                <Li check ink>Jobs found before job boards</Li>
                <Li check ink>Time-wasters filtered out</Li>
                <Li check ink>Delivered to WhatsApp daily</Li>
                <Li check ink>Vantage + Vicinity + Codex</Li>
              </ul>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com (optional)"
                className="mt-5 w-full rounded-lg border border-black/20 bg-white/60 px-3 py-2 text-sm text-[var(--ink)] placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-black/30"
              />
              <button
                onClick={startIntake}
                disabled={submitting}
                className="mt-3 w-full rounded-lg bg-[var(--ink)] px-4 py-3 font-black text-white hover:opacity-90 disabled:opacity-50"
              >
                {submitting ? 'Loading...' : 'Get started →'}
              </button>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-black text-white/50">Codex</p>
              <div className="mt-2 flex items-end gap-1">
                <span className="text-5xl font-black">£99</span>
                <span className="mb-1 font-bold text-white/40">/month</span>
              </div>
              <ul className="mt-5 space-y-2 text-sm">
                <Li check>Specs → sales proposals</Li>
                <Li check>Better tender presentation</Li>
                <Li check>For engineering firms</Li>
              </ul>
              <Link to="/codex" className="mt-6 block rounded-lg border border-white/20 px-4 py-2.5 text-center text-sm font-black hover:bg-white/10">
                View Codex →
              </Link>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}

function Slider({ label, value, min, max, step = 1, onChange, className = '' }: {
  label: string; value: number; min: number; max: number; step?: number; onChange: (v: number) => void; className?: string;
}) {
  return (
    <div className={className}>
      <div className="flex items-center justify-between">
        <label className="text-sm font-bold text-white/70">{label}</label>
        <span className="rounded-lg bg-[var(--yellow)] px-2 py-0.5 text-sm font-black text-[var(--ink)]">{value}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full accent-[var(--yellow)]" />
    </div>
  );
}

function Li({ check = false, ink = false, children }: { check?: boolean; ink?: boolean; children: ReactNode }) {
  return (
    <li className={`flex items-center gap-2 ${ink ? 'text-[var(--ink)]' : check ? 'text-white' : 'text-white/30'}`}>
      <span className="text-xs">{check ? '✓' : '✕'}</span>
      {children}
    </li>
  );
}
