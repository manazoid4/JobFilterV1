"use client";
import { FormEvent, ReactNode, useCallback, useMemo, useState } from 'react';
import Link from 'next/link';


const DEV_MODE = false;

type ToolId = 'quote-floor' | 'profit-check' | 'tyre-kicker' | 'travel-cost' | 'time-waster' | 'smart-quote' | 'material-price';

interface ToolDef {
  id: ToolId;
  title: string;
  tag: string;
  desc: string;
  cta: string;
  pain: string;
  to?: string;
}

const TOOLS: ToolDef[] = [
  { id: 'quote-floor', title: 'Quote Floor', tag: 'CALCULATOR', desc: 'Minimum sensible quote in 10 seconds. Labour + materials + margin — no guesswork.', cta: 'CALCULATE FLOOR', pain: 'Underpricing eats profit. Overpricing loses jobs.' },
  { id: 'profit-check', title: 'Profit Check', tag: 'CALCULATOR', desc: 'Shows the real money left after labour and materials. If it is weak, walk away.', cta: 'CHECK PROFIT', pain: 'Revenue means nothing. Profit pays bills.' },
  { id: 'tyre-kicker', title: 'Tyre-Kicker Check', tag: 'SCORER', desc: 'Score a lead before you waste a visit. Budget, distance, urgency, photos — all weighted.', cta: 'SCORE THE LEAD', pain: 'Half your site visits are to people who will never buy.' },
  { id: 'travel-cost', title: 'Travel Cost', tag: 'CALCULATOR', desc: 'Know the exact fuel cost before you quote. Miles, MPG, diesel price — done.', cta: 'WORK IT OUT', pain: 'Travel you do not price is profit you give away.' },
  { id: 'material-price', title: 'Material Price Engine', tag: 'REAL SUPPLIER DATA', desc: 'Compare traceable UK supplier prices before you quote. Source URL, checked time, confidence.', cta: 'COMPARE MATERIALS', pain: 'Material jumps quietly kill your margin.', to: '/material-price-engine' },
  { id: 'time-waster', title: 'Time-Waster Cost', tag: 'CALCULATOR', desc: 'See what weak enquiries cost you per year. Hours, miles, bad visits — annualised.', cta: 'SEE THE DAMAGE', pain: 'You think it is just one bad visit. It is not.' },
  { id: 'smart-quote', title: 'Smart Quote Starter', tag: 'GENERATOR', desc: 'Pick your trade and job type. Get a professional opening paragraph ready to paste.', cta: 'GET STARTER', pain: 'Writing the same quote intro every time is wasted minutes.' },
];

const TOOL_RECS: Record<ToolId, { label: string; to: string }> = {
  'quote-floor': { label: 'Profit Check', to: '#profit-check' },
  'profit-check': { label: 'Tyre-Kicker Check', to: '#tyre-kicker' },
  'tyre-kicker': { label: 'Quote Floor', to: '#quote-floor' },
  'travel-cost': { label: 'Time-Waster Cost', to: '#time-waster' },
  'material-price': { label: 'Quote Floor', to: '#quote-floor' },
  'time-waster': { label: 'Travel Cost', to: '#travel-cost' },
  'smart-quote': { label: 'Quote Floor', to: '#quote-floor' },
};

export function FreeToolsPage() {
  const [activeTool, setActiveTool] = useState<ToolId | null>(null);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [emailDone, setEmailDone] = useState(false);
  const [email, setEmail] = useState('');
  const [emailTrade, setEmailTrade] = useState('Electrician');
  const [emailName, setEmailName] = useState('');
  const [optInSignals, setOptInSignals] = useState(true);

  const isPaywalled = false;

  const handleToolUse = useCallback(() => {}, []);

  const handleEmailSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !emailName) return;
    try {
      await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: emailName, trade: emailTrade, contact: email, source: 'free-tools-email-capture', optIn: optInSignals }),
      });
    } catch { /* proceed even on network error */ }
    setEmailDone(true);
    setShowEmailCapture(false);
  };

  return (
    <main className="page-shell grid gap-6 py-6 pb-24 md:pb-8">
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="jf-box bg-[var(--navy)] p-7 text-white">
        <p className="micro-label text-[var(--yellow)]">FREE TOOLS — NO LOGIN</p>
        <h1 className="headline mt-4 text-4xl leading-none sm:text-5xl md:text-7xl">USEFUL BEFORE YOU PAY.</h1>
        <p className="mt-4 max-w-2xl text-lg font-black text-white/90">
          Price cleaner. Spot time-wasters. Protect your week. Checkatrade, Bark, and MyBuilder charge for these — we give them away. Leads are the paid part.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 border-2 border-[var(--yellow)] px-4 py-2 text-sm font-black text-[var(--yellow)]">
            <span className="h-2 w-2 rounded-full bg-[var(--yellow)]" />
            Unlimited — no signup required
          </div>
          <div className="inline-flex items-center gap-2 border border-white/20 px-3 py-1.5 text-xs font-black text-white/85">
            <span className="h-2 w-2 rounded-full bg-[var(--green)]" />
            Free to use — no account needed
          </div>
        </div>
      </section>

      {/* ── Quick Start CTA ──────────────────────────────────────────── */}
      <section className="jf-box bg-[var(--yellow)] p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="headline text-2xl leading-none text-[var(--ink)]">START WITH A FREE SCAN.</h2>
            <p className="mt-1 text-sm font-black text-[var(--ink)]/70">See real leads in your area. No email needed.</p>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-1">
            <Link className="jf-button bg-[var(--navy)] text-white whitespace-nowrap" href="/find-jobs">
              SCAN MY AREA →
            </Link>
            <span className="text-[10px] font-black text-[var(--ink)]/50 uppercase">No credit card required</span>
          </div>
        </div>
      </section>

      {/* ── Paywall (when limit hit + not captured) ── */}
      {!DEV_MODE && isPaywalled && (
        <section className="jf-box border-4 border-[var(--orange)] bg-[var(--orange)]/10 p-6">
          <p className="micro-label text-[var(--orange)]">FREE LIMIT REACHED</p>
          <h2 className="headline mt-2 text-3xl leading-none sm:text-4xl">YOU HAVE USED YOUR 3 FREE SCANS.</h2>
          <p className="mt-3 max-w-xl text-lg font-black text-[var(--muted)]">
            Choose your path — both are fair.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <button className="jf-button bg-[var(--yellow)] text-[var(--ink)] text-left h-auto py-4" onClick={() => setShowEmailCapture(true)}>
              <div>
                <span className="block text-sm">UNLOCK 3 MORE FREE</span>
                <span className="block text-xs font-black text-[var(--ink)] mt-0.5">Enter email. Get 3 more scans + weekly trade signals.</span>
              </div>
            </button>
            <Link className="jf-button bg-[var(--navy)] text-white text-left h-auto py-4" href="/pricing">
              <div>
                <span className="block text-sm">UNLIMITED — FROM £39/MO</span>
                <span className="block text-xs font-black text-white/90 mt-0.5">Founding price. No contracts. Cancel anytime.</span>
              </div>
            </Link>
          </div>
          <div className="mt-4 border-2 border-[var(--green)] bg-[var(--green)]/10 px-4 py-3 text-center text-sm font-black text-[var(--green)]">
            30-DAY MONEY-BACK GUARANTEE — Use JobFilter for 30 days. Set up your territory and WhatsApp alerts. View at least 10 scored leads. If you genuinely don't see one job worth chasing, we refund every penny. No hoops.
          </div>
        </section>
      )}

      {/* ── Email capture modal ──────────────────────────────────────────── */}
      {!DEV_MODE && showEmailCapture && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md">
            <div className="jf-box bg-white p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="micro-label text-[var(--navy)]">UNLOCK MORE FREE SCANS</p>
                  <h3 className="headline mt-2 text-2xl">3 MORE SCANS + WEEKLY SIGNALS.</h3>
                </div>
                <button className="ml-4 text-2xl font-black text-[var(--muted)]" onClick={() => setShowEmailCapture(false)}>×</button>
              </div>
              <p className="mt-3 font-black text-[var(--muted)]">Get 3 more free scans. Plus weekly trade signals — real jobs in your area, sent to your inbox. No spam. Unsubscribe anytime.</p>
              <form onSubmit={handleEmailSubmit} className="mt-4 grid gap-3">
                <label className="field-label">
                  Name
                  <input className="field-input" value={emailName} onChange={(e) => setEmailName(e.target.value)} placeholder="Your name" required />
                </label>
                <label className="field-label">
                  Trade
                  <select className="field-input" value={emailTrade} onChange={(e) => setEmailTrade(e.target.value)}>
                    {['Electrician', 'Plumber', 'Roofer', 'Builder', 'Landscaper', 'Joiner', 'HVAC', 'Other'].map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </label>
                <label className="field-label">
                  Email
                  <input className="field-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" required />
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={optInSignals} onChange={(e) => setOptInSignals(e.target.checked)} className="mt-1 h-5 w-5 accent-[var(--yellow)]" />
                  <span className="text-sm font-black text-[var(--muted)]">Send me weekly trade signals — real jobs in my area. Free.</span>
                </label>
                <button className="jf-button mt-2 bg-[var(--navy)] text-white" type="submit">
                  UNLOCK 3 MORE SCANS
                </button>
                <p className="text-center text-xs font-black text-[var(--muted)]">
                  Or go <Link className="text-[var(--navy)] underline font-black" href="/pricing">straight to Founding 30</Link> for unlimited.
                </p>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ── Email captured welcome banner ──────────────────────────────────────────── */}
      {!DEV_MODE && emailDone && (
        <section className="jf-box bg-[var(--green)]/10 border-2 border-[var(--green)] p-6">
          <p className="micro-label text-[var(--green)]">WELCOME — YOU'RE IN.</p>
          <p className="headline mt-1 text-2xl">3 MORE SCANS ADDED.</p>
          <p className="mt-2 font-black text-[var(--muted)]">Here is what to do next:</p>
          <ol className="mt-3 grid gap-2 text-sm font-black text-[var(--muted)]">
            <li className="flex items-start gap-2"><span className="text-[var(--green)]">1.</span> Try another free tool below</li>
            <li className="flex items-start gap-2"><span className="text-[var(--green)]">2.</span> Scan your area for real leads → <Link className="text-[var(--navy)] underline" href="/find-jobs">/find-jobs</Link></li>
            <li className="flex items-start gap-2"><span className="text-[var(--green)]">3.</span> Check your email for weekly trade signals</li>
          </ol>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link className="jf-button bg-[var(--yellow)] text-[var(--ink)]" href="/find-jobs">SCAN MY AREA →</Link>
            <Link className="jf-button bg-[var(--navy)] text-white" href="/pricing">SEE FOUNDING 30</Link>
          </div>
        </section>
      )}

      {/* ── Tool cards grid ──────────────────────────────────────────── */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TOOLS.map((tool) => (
          <ToolCard
            key={tool.id}
            tool={tool}
            isActive={activeTool === tool.id}
            isPaywalled={isPaywalled}
            onActivate={() => {
              if (!isPaywalled) setActiveTool(activeTool === tool.id ? null : tool.id);
            }}
            onUse={handleToolUse}
          />
        ))}
      </section>

      {/* ── Active tool workspace ──────────────────────────────────────────── */}
      {activeTool && (
        <ToolWorkspace toolId={activeTool} onUse={handleToolUse} isPaywalled={isPaywalled} />
      )}

      {/* ── Smart Quote teaser (always visible) ─── */}
      <section className="jf-box bg-[var(--navy)] p-6 text-white">
        <p className="micro-label text-[var(--yellow)]">FREE TOOL — SMART QUOTING</p>
        <h2 className="headline mt-3 text-3xl leading-none text-[var(--yellow)]">QUOTE STARTER IN 10 SECONDS.</h2>
        <p className="mt-3 max-w-2xl font-black text-white/90">
          Pick your trade and job type. Get a professional opening paragraph ready to paste into your quote. Covers 6 trades and 30+ job types. Free. No login.
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-sm font-black text-white/90">
          {['Electrical', 'Plumbing', 'Roofing', 'Building', 'HVAC', 'Carpentry'].map((t) => (
            <span key={t} className="border border-white/20 px-2 py-1">{t}</span>
          ))}
        </div>
        <Link className="jf-button mt-5 bg-[var(--yellow)] text-[var(--ink)]" href="/smart-quote">OPEN SMART QUOTE →</Link>
      </section>

      {/* ── Free vs Paid Comparison ──────────────────────────────────────────── */}
      <section className="jf-box bg-white p-6">
        <p className="micro-label text-[var(--orange)]">WHAT IS FREE. WHAT IS NOT.</p>
        <h2 className="headline mt-2 text-3xl leading-none">FREE VS PAID.</h2>
        <p className="mt-2 font-black text-[var(--muted)]">Tools are free. Leads are not. Here is the split.</p>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-sm font-black">
            <thead>
              <tr className="border-b-2 border-[var(--navy)]">
                <th className="pb-3 text-left text-[var(--muted)]"></th>
                <th className="pb-3 text-left text-[var(--green)]">FREE</th>
                <th className="pb-3 text-left text-[var(--navy)]">FOUNDING 30</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Quote Floor calculator', '✓', '✓'],
                ['Profit Check', '✓', '✓'],
                ['Tyre-Kicker lead scorer', '✓', '✓'],
                ['Travel Cost calculator', '✓', '✓'],
                ['Time-Waster cost', '✓', '✓'],
                ['Smart Quote starter', 'Preview', 'Full version'],
                ['Live lead scanner', '3 free/wk', '✓'],
                ['WhatsApp lead alerts', '', '✓'],
                ['Saved leads', '', '✓'],
                ['Full lead details (buyer, deadline, score)', '', '✓'],
                ['Vantage bid decks', '', '✓'],
                ['Vicinity proof generator', '', '✓'],
              ].map(([feature, free, paid], i) => (
                <tr key={i} className="border-b border-[var(--line)]/30">
                  <td className="py-2.5 text-[var(--ink)]">{feature}</td>
                  <td className="py-2.5 text-[var(--green)]">{free || '—'}</td>
                  <td className="py-2.5 text-[var(--navy)]">{paid || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
          <div className="mt-5 flex flex-wrap gap-3 items-center">
            <div className="flex flex-col items-start gap-0.5">
              <Link className="jf-button bg-[var(--yellow)] text-[var(--ink)]" href="/find-jobs">SCAN MY AREA FREE →</Link>
              <span className="text-[10px] font-black text-[var(--muted)] uppercase">No credit card required</span>
            </div>
            <Link className="jf-button bg-[var(--navy)] text-white" href="/pricing">GET FOUNDING 30 — £39/mo</Link>
          </div>
      </section>

      {/* ── Risk Reversal ──────────────────────────────────────────── */}
      <section className="jf-box border-4 border-[var(--green)] bg-[var(--green)]/5 p-6 text-center">
        <p className="micro-label text-[var(--green)]">30-DAY MONEY-BACK GUARANTEE</p>
        <h2 className="headline mt-3 text-3xl leading-none sm:text-4xl text-[var(--green)]">TRY IT RISK-FREE.</h2>
        <p className="mt-3 max-w-xl text-lg font-black text-[var(--muted)]">
          Use JobFilter for 30 days. Set up your territory and WhatsApp alerts. View at least 10 scored leads. If you genuinely don't see one job worth chasing, we refund every penny. No hoops — we just ask that you actually use the system.
        </p>
        <p className="mt-2 text-sm font-black text-[var(--ink)]">
          Built in Birmingham. We stand behind it.
        </p>
      </section>
    </main>
  );
}

/* ── Tool Card ──────────────────────────────────────────────────────── */
function ToolCard({ tool, isActive, isPaywalled, onActivate, onUse }: {
  tool: ToolDef;
  isActive: boolean;
  isPaywalled: boolean;
  onActivate: () => void;
  onUse: () => void;
  key?: string;
}) {
  const card = (
    <article
      id={tool.id}
      className={`jf-box cursor-pointer p-5 transition-all ${
        isActive ? 'border-[var(--yellow)] bg-[var(--yellow)]' : isPaywalled ? 'opacity-50' : 'bg-white hover:border-[var(--yellow)]'
      }`}
      onClick={() => { if (!isPaywalled && !tool.to) { onActivate(); onUse(); } }}
    >
      <p className={`micro-label ${isActive ? 'text-[var(--ink)]' : 'text-[var(--orange)]'}`}>{tool.tag}</p>
      <h3 className={`headline mt-2 text-2xl sm:text-3xl ${isActive ? 'text-[var(--ink)]' : ''}`}>{tool.title}</h3>
      <p className={`mt-2 text-sm font-black ${isActive ? 'text-[var(--ink)]/70' : 'text-[var(--muted)]'}`}>{tool.desc}</p>
      <p className={`mt-3 text-xs font-black ${isActive ? 'text-[var(--ink)]/50' : 'text-[var(--orange)]'}`}>{tool.pain}</p>
      <span className={`mt-4 inline-block text-sm font-black uppercase ${isActive ? 'text-[var(--ink)]' : 'text-[var(--navy)]'}`}>
        {isActive ? '▼ OPEN' : tool.cta} →
      </span>
    </article>
  );

  if (tool.to && !isPaywalled) {
    return <Link href={tool.to}>{card}</Link>;
  }

  return card;
}

/* ── Tool Workspace (inline calculator) ──────────────────────────────────── */
function ToolWorkspace({ toolId, onUse, isPaywalled }: { toolId: ToolId; onUse: () => void; isPaywalled: boolean }) {
  if (isPaywalled) return null;

  const rec = TOOL_RECS[toolId];

  return (
    <div>
      {(() => {
        switch (toolId) {
          case 'quote-floor': return <QuoteFloorTool />;
          case 'profit-check': return <ProfitCheckTool />;
          case 'tyre-kicker': return <TyreKickerTool />;
          case 'travel-cost': return <TravelCostTool />;
          case 'time-waster': return <TimeWasterTool />;
          case 'smart-quote': return <SmartQuoteTeaser />;
          default: return null;
        }
      })()}
      {rec && (
        <div className="mt-4 jf-box bg-[var(--navy)] p-4 text-white">
          <p className="text-xs font-black text-white/85 uppercase tracking-wider">IF YOU LIKED THIS, TRY</p>
          <a href={rec.to} className="mt-1 inline-block text-sm font-black text-[var(--yellow)] hover:underline">
            → {rec.label}
          </a>
        </div>
      )}
    </div>
  );
}

/* ── Quote Floor ──────────────────────────────────────────────────────── */
function QuoteFloorTool() {
  const [labourHours, setLabourHours] = useState(14);
  const [hourRate, setHourRate] = useState(45);
  const [materials, setMaterials] = useState(650);
  const [margin, setMargin] = useState(22);

  const quoteFloor = useMemo(() => {
    const labour = labourHours * hourRate;
    const subtotal = labour + materials;
    return Math.round(subtotal * (1 + margin / 100));
  }, [hourRate, labourHours, materials, margin]);

  return (
    <section className="jf-box bg-white p-6">
      <p className="micro-label text-[var(--orange)]">QUOTE FLOOR</p>
      <p className="headline mt-2 text-5xl sm:text-6xl">£{quoteFloor.toLocaleString()}</p>
      <p className="mt-1 font-black text-[var(--muted)]">Your minimum sensible quote.</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <NumberField label="Labour hours" value={labourHours} onChange={setLabourHours} />
        <NumberField label="Hourly rate £" value={hourRate} onChange={setHourRate} />
        <NumberField label="Materials £" value={materials} onChange={setMaterials} />
        <NumberField label="Margin %" value={margin} onChange={setMargin} />
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link className="jf-button bg-[var(--yellow)] text-[var(--ink)]" href="/smart-quote">BUILD FULL QUOTE →</Link>
        <Link className="jf-button bg-[var(--navy)] text-white" href="/pricing">UNLOCK FULL TOOLS</Link>
      </div>
    </section>
  );
}

/* ── Profit Check ──────────────────────────────────────────────────────── */
function ProfitCheckTool() {
  const [labourHours, setLabourHours] = useState(14);
  const [hourRate, setHourRate] = useState(45);
  const [materials, setMaterials] = useState(650);
  const [margin, setMargin] = useState(22);

  const profit = useMemo(() => {
    const labour = labourHours * hourRate;
    const subtotal = labour + materials;
    const quote = Math.round(subtotal * (1 + margin / 100));
    return Math.max(0, quote - materials - labour);
  }, [hourRate, labourHours, materials, margin]);

  return (
    <section className="jf-box bg-white p-6">
      <p className="micro-label text-[var(--orange)]">PROFIT CHECK</p>
      <p className={`headline mt-2 text-5xl sm:text-6xl ${profit < 300 ? 'text-[var(--orange)]' : 'text-[var(--green)]'}`}>
        £{profit.toLocaleString()}
      </p>
      <p className="mt-1 font-black text-[var(--muted)]">Money left after labour and materials. {profit < 300 ? 'Weak — reconsider.' : 'Solid margin.'}</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <NumberField label="Labour hours" value={labourHours} onChange={setLabourHours} />
        <NumberField label="Hourly rate £" value={hourRate} onChange={setHourRate} />
        <NumberField label="Materials £" value={materials} onChange={setMaterials} />
        <NumberField label="Margin %" value={margin} onChange={setMargin} />
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link className="jf-button bg-[var(--navy)] text-white" href="/pricing">UNLOCK FULL TOOLS</Link>
      </div>
    </section>
  );
}

/* ── Tyre-Kicker Check ──────────────────────────────────────────────────────── */
function TyreKickerTool() {
  const [jobValue, setJobValue] = useState(4500);
  const [jobDistance, setJobDistance] = useState(18);
  const [daysToStart, setDaysToStart] = useState(10);
  const [hasBudget, setHasBudget] = useState(1);
  const [hasPhotos, setHasPhotos] = useState(1);

  const leadScore = useMemo(() => {
    let score = 0;
    if (jobValue >= 2000) score += 35;
    if (jobValue >= 7500) score += 15;
    if (jobDistance <= 15) score += 20;
    else if (jobDistance <= 35) score += 10;
    if (daysToStart <= 14) score += 15;
    if (hasBudget) score += 8;
    if (hasPhotos) score += 7;
    return Math.min(100, score);
  }, [daysToStart, hasBudget, hasPhotos, jobDistance, jobValue]);

  const verdict = leadScore >= 75 ? 'PRICE IT' : leadScore >= 50 ? 'CHECK FIRST' : 'BIN IT';
  const verdictColor = leadScore >= 75 ? 'text-[var(--green)]' : leadScore >= 50 ? 'text-[var(--navy)]' : 'text-[var(--orange)]';

  return (
    <section className="jf-box bg-white p-6">
      <p className="micro-label text-[var(--orange)]">TYRE-KICKER CHECK</p>
      <p className={`headline mt-2 text-5xl sm:text-6xl ${verdictColor}`}>{verdict}</p>
      <p className="mt-1 font-black text-[var(--muted)]">Score: {leadScore}/100. Quick gut check before wasting a visit.</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <NumberField label="Job value £" value={jobValue} onChange={setJobValue} />
        <NumberField label="Miles away" value={jobDistance} onChange={setJobDistance} />
        <NumberField label="Days until start" value={daysToStart} onChange={setDaysToStart} />
        <NumberField label="Budget confirmed (0/1)" value={hasBudget} max={1} onChange={setHasBudget} />
        <NumberField label="Photos sent (0/1)" value={hasPhotos} max={1} onChange={setHasPhotos} />
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link className="jf-button bg-[var(--yellow)] text-[var(--ink)]" href="/find-jobs">SCAN FOR REAL LEADS →</Link>
        <Link className="jf-button bg-[var(--navy)] text-white" href="/pricing">GET FOUNDING 30</Link>
      </div>
    </section>
  );
}

/* ── Travel Cost ──────────────────────────────────────────────────────── */
function TravelCostTool() {
  const [fuelMiles, setFuelMiles] = useState(85);
  const [mpg, setMpg] = useState(32);
  const [dieselPrice, setDieselPrice] = useState(1.55);

  const dieselCost = useMemo(() => {
    const litres = mpg > 0 ? (fuelMiles / mpg) * 4.54609 : 0;
    return Math.round(litres * dieselPrice);
  }, [dieselPrice, fuelMiles, mpg]);

  return (
    <section className="jf-box bg-white p-6">
      <p className="micro-label text-[var(--orange)]">TRAVEL COST</p>
      <p className="headline mt-2 text-5xl sm:text-6xl">£{dieselCost.toLocaleString()}</p>
      <p className="mt-1 font-black text-[var(--muted)]">Fuel cost for {fuelMiles} miles.</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <NumberField label="Miles" value={fuelMiles} onChange={setFuelMiles} />
        <NumberField label="MPG" value={mpg} onChange={setMpg} />
        <NumberField label="Diesel £/litre" value={dieselPrice} step={0.01} onChange={setDieselPrice} />
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link className="jf-button bg-[var(--navy)] text-white" href="/pricing">UNLOCK FULL TOOLS</Link>
      </div>
    </section>
  );
}

/* ── Time-Waster Cost ──────────────────────────────────────────────────────── */
function TimeWasterTool() {
  const [wastedHours, setWastedHours] = useState(5);
  const [wastedMiles, setWastedMiles] = useState(40);
  const [badVisits, setBadVisits] = useState(2);

  const wastedCost = useMemo(() => Math.round((wastedHours * 35 + wastedMiles * 0.45 + badVisits * 40) * 52), [badVisits, wastedHours, wastedMiles]);

  return (
    <section className="jf-box bg-white p-6">
      <p className="micro-label text-[var(--orange)]">TIME-WASTER COST</p>
      <p className="headline mt-2 text-5xl sm:text-6xl text-[var(--orange)]">£{wastedCost.toLocaleString()}/year</p>
      <p className="mt-1 font-black text-[var(--muted)]">What weak enquiries cost you annually. One avoided wasted evening covers JobFilter for the month.</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <NumberField label="Hours wasted/week" value={wastedHours} onChange={setWastedHours} />
        <NumberField label="Miles wasted/week" value={wastedMiles} onChange={setWastedMiles} />
        <NumberField label="Bad visits/week" value={badVisits} onChange={setBadVisits} />
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link className="jf-button bg-[var(--yellow)] text-[var(--ink)]" href="/pricing">STOP THE BLEED — FROM £39/MO →</Link>
      </div>
    </section>
  );
}

/* ── Smart Quote Teaser ──────────────────────────────────────────────────────── */
function SmartQuoteTeaser() {
  return (
    <section className="jf-box bg-white p-6">
      <p className="micro-label text-[var(--orange)]">SMART QUOTE STARTER</p>
      <p className="headline mt-2 text-2xl">6 TRADES. 30+ JOB TYPES. FREE.</p>
      <p className="mt-2 font-black text-[var(--muted)]">Professional quote opening paragraphs — ready to paste. Full version behind Founding 30.</p>
      <Link className="jf-button mt-4 bg-[var(--yellow)] text-[var(--ink)]" href="/smart-quote">OPEN SMART QUOTE →</Link>
    </section>
  );
}

/* ── NumberField ──────────────────────────────────────────────────────── */
function NumberField({ label, value, step = 1, max, onChange }: { label: string; value: number; step?: number; max?: number; onChange: (value: number) => void }) {
  return (
    <label className="field-label">
      {label}
      <input className="field-input" type="number" value={value} min={0} max={max} step={step} onChange={(event) => onChange(Number(event.target.value))} />
    </label>
  );
}
