import { Link } from 'react-router-dom';
import { AlertTriangle, Radio, ShieldCheck, Target, MapPin, ArrowUpRight, ArrowDownRight, ChevronRight, Users, Clock, TrendingUp, CheckCircle, Lock } from 'lucide-react';
import { WaitlistForm } from '../components/WaitlistForm';
import { SampleLeadCard } from '../components/SampleLeadCard';

const proofPoints = [
  'Real planning signals',
  'Real construction opportunities',
  'Postcode exclusivity',
  'One dominant partner per area',
];

const signalRows = [
  { source: 'Planning', signal: 'Rear extension approved', trade: 'Builder', value: 'GBP 42k', score: 94, trend: 'up' as const, location: 'B12' },
  { source: 'EPC', signal: 'F-rated rental cluster', trade: 'Insulation', value: 'GBP 18k', score: 87, trend: 'up' as const, location: 'M14' },
  { source: 'Contracts', signal: 'School maintenance tender', trade: 'Electrical', value: 'GBP 65k', score: 91, trend: 'up' as const, location: 'LS1' },
  { source: 'Land', signal: 'Brownfield site live', trade: 'Groundworks', value: 'GBP 120k', score: 82, trend: 'down' as const, location: 'G41' },
];

const operatingSteps = [
  {
    icon: Radio,
    title: 'Signals come in',
    body: 'Verified job signals are cleaned, matched, and scored before a tradesman sees anything.',
    svgId: 'tower' as const,
  },
  {
    icon: Target,
    title: 'Money Filter ranks the job',
    body: 'Urgency, value, distance, confidence, and detail decide if it reaches your WhatsApp.',
    svgId: 'funnel' as const,
  },
  {
    icon: ShieldCheck,
    title: 'Only money leads move',
    body: 'Gold leads route to the right trade and territory. Weak signals stay out of your WhatsApp.',
    svgId: 'shield' as const,
  },
];

const territoryCards = [
  ['B12 Roofing', 'FOUNDING SLOT OPEN', '91'],
  ['Birmingham Extensions', 'AVAILABLE', '88'],
  ['Coventry Solar', 'RESERVED', '84'],
  ['Manchester Bathrooms', 'COMING SOON', '79'],
] as const;

const trustedCities = ['Birmingham', 'London', 'Manchester', 'Bristol', 'Leeds', 'Glasgow', 'Liverpool', 'Sheffield', 'Newcastle', 'Nottingham', 'Cardiff', 'Edinburgh', 'Leicester', 'Coventry', 'Bradford'];

function ScoreBadge({ score, trend }: { score: number; trend: 'up' | 'down' }) {
  const bg = score >= 90 ? 'bg-[var(--yellow)] text-[var(--ink)]' : score >= 80 ? 'bg-white text-[var(--ink)]' : 'bg-[var(--muted)]/15 text-[var(--muted)]';
  const TrendIcon = trend === 'up' ? ArrowUpRight : ArrowDownRight;
  const trendColor = trend === 'up' ? 'text-[var(--yellow)]' : 'text-[var(--orange)]';
  return (
    <span className={`inline-flex items-center gap-1 border-2 border-[var(--line)] px-2 py-1 font-mono text-xs font-black ${bg}`}>
      {score}
      <TrendIcon size={12} strokeWidth={3} className={trendColor} />
    </span>
  );
}

function SignalStrengthBars({ level }: { level: number }) {
  return (
    <div className="flex items-end gap-[3px]" aria-label={`Signal strength: ${level} of 4`}>
      {[1, 2, 3, 4].map((bar) => (
        <div
          key={bar}
          className={`w-[5px] rounded-[1px] transition-all ${bar <= level ? 'bg-[var(--yellow)]' : 'bg-[var(--line)]/20'}`}
          style={{ height: `${6 + bar * 4}px` }}
        />
      ))}
    </div>
  );
}

function StepSVG({ id }: { id: 'tower' | 'funnel' | 'shield' }) {
  if (id === 'tower') {
    return (
      <svg viewBox="0 0 64 64" fill="none" className="h-16 w-16" aria-hidden="true">
        <rect x="28" y="20" width="8" height="34" fill="var(--ink)" />
        <rect x="24" y="50" width="16" height="6" rx="1" fill="var(--ink)" />
        <path d="M32 6 L32 18" stroke="var(--yellow)" strokeWidth="3" strokeLinecap="round" />
        <path d="M20 18 Q32 4 44 18" stroke="var(--yellow)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M14 12 Q32 -2 50 12" stroke="var(--yellow)" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
        <circle cx="32" cy="6" r="3" fill="var(--yellow)" />
      </svg>
    );
  }
  if (id === 'funnel') {
    return (
      <svg viewBox="0 0 64 64" fill="none" className="h-16 w-16" aria-hidden="true">
        <path d="M8 8 L56 8 L40 30 L40 56 L24 56 L24 30 Z" stroke="var(--ink)" strokeWidth="3" fill="var(--yellow)" fillOpacity="0.15" />
        <path d="M8 8 L56 8 L40 30 L24 30 Z" fill="var(--yellow)" fillOpacity="0.4" />
        <circle cx="22" cy="18" r="3" fill="var(--ink)" />
        <circle cx="32" cy="14" r="2.5" fill="var(--ink)" />
        <circle cx="42" cy="18" r="3" fill="var(--ink)" />
        <circle cx="32" cy="44" r="4" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="2" />
      </svg>
    );
  }
  // shield
  return (
    <svg viewBox="0 0 64 64" fill="none" className="h-16 w-16" aria-hidden="true">
      <path d="M32 4 L56 14 L56 34 Q56 52 32 60 Q8 52 8 34 L8 14 Z" stroke="var(--ink)" strokeWidth="3" fill="var(--yellow)" fillOpacity="0.2" />
      <path d="M32 4 L56 14 L56 34 Q56 52 32 60 Q8 52 8 34 L8 14 Z" stroke="var(--ink)" strokeWidth="3" fill="none" />
      <path d="M22 32 L29 39 L42 24" stroke="var(--yellow)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 shrink-0" aria-hidden="true">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="2" />
      <circle cx="12" cy="9" r="2.5" fill="var(--ink)" />
    </svg>
  );
}

export function HomePage() {
  return (
    <main className="bg-[var(--paper)] pb-0">
      {/* ── HERO ──────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b-4 border-[var(--line)] bg-[var(--ink)] text-white">
        {/* Radial gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(227,183,42,0.12)_0%,transparent_60%),radial-gradient(ellipse_at_80%_80%,rgba(197,70,42,0.08)_0%,transparent_50%)]" />

        {/* Floating signal bubbles */}
        <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
          <div className="absolute left-[8%] top-[18%] animate-[float_6s_ease-in-out_infinite] rounded-full border-2 border-[var(--yellow)] bg-[var(--yellow)] px-3 py-1.5 font-mono text-[11px] font-black uppercase text-[var(--ink)] shadow-[3px_3px_0_var(--yellow)]">
            Planning: B12
          </div>
          <div className="absolute right-[12%] top-[12%] animate-[float_7s_ease-in-out_infinite_1s] rounded-full border-2 border-[var(--yellow)] bg-[var(--yellow)] px-3 py-1.5 font-mono text-[11px] font-black uppercase text-[var(--ink)] shadow-[3px_3px_0_var(--yellow)]">
            EPC: F/G
          </div>
          <div className="absolute left-[5%] bottom-[22%] animate-[float_5s_ease-in-out_infinite_0.5s] rounded-full border-2 border-white/40 bg-white/10 px-3 py-1.5 font-mono text-[11px] font-black uppercase text-white/70">
            Warrant: Approved
          </div>
          <div className="absolute right-[6%] bottom-[30%] animate-[float_8s_ease-in-out_infinite_2s] rounded-full border-2 border-[var(--orange)] bg-[var(--orange)]/15 px-3 py-1.5 font-mono text-[11px] font-black uppercase text-[var(--orange)]">
            Tender: Live
          </div>
        </div>

        <div className="page-shell relative grid gap-8 py-10 md:py-14 lg:grid-cols-[1fr_420px] lg:items-end">
          <div>
            <p className="micro-label text-[var(--yellow)]">TACTICAL CONSTRUCTION INTELLIGENCE</p>
            <h1 className="headline mt-4 max-w-5xl text-[clamp(46px,9vw,106px)] leading-[0.88] text-white">
              STOP QUOTING FOR GHOSTS.
            </h1>
            <p className="mt-5 max-w-2xl text-xl font-black leading-tight text-white/90 md:text-2xl">
              Real jobs. Scored. Sent to your WhatsApp before anyone else knows they exist.
            </p>
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {proofPoints.map((point) => (
                <div key={point} className="border-2 border-white/25 bg-white/8 px-3 py-2 text-sm font-black uppercase text-white transition-colors hover:border-[var(--yellow)] hover:bg-[var(--yellow)]/15 hover:text-[var(--yellow)]">
                  {point}
                </div>
              ))}
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link className="jf-button bg-[var(--yellow)] text-[var(--ink)]" to="/territories">
                LOCK YOUR PATCH — £39/mo
              </Link>
              <Link className="jf-button bg-white text-[var(--ink)]" to="/find-jobs">
                SCAN FREE FIRST
              </Link>
            </div>
            <p className="mt-3 text-sm font-black text-white/60">
              <Lock size={12} strokeWidth={3} className="inline mr-1" />
              Founder price locks forever while your plan stays active. 30-day money-back guarantee.
            </p>
          </div>

          <aside className="ops-panel bg-[var(--steel)] p-4 text-white">
            <div className="flex items-center justify-between border-b-2 border-[var(--yellow)] pb-3">
              <p className="micro-label text-[var(--yellow)]">RECENT UK SIGNALS</p>
              <span className="bg-[var(--yellow)] px-2 py-1 text-xs font-black text-[var(--ink)]">BETA</span>
            </div>
            <div className="mt-4 grid gap-3">
              {signalRows.map((row) => (
                <div key={row.signal} className="group border-2 border-white/15 bg-black/40 p-3 transition-colors hover:border-[var(--yellow)]/40 hover:bg-black/60">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-[0.1em] text-[var(--yellow)]">{row.source}</p>
                      <h2 className="mt-1 text-base font-black leading-tight text-white">{row.signal}</h2>
                    </div>
                    <ScoreBadge score={row.score} trend={row.trend} />
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-2 text-xs font-black uppercase text-white/70">
                    <span>{row.trade}</span>
                    <span className="text-center text-[var(--yellow)]">{row.location}</span>
                    <span className="text-right">{row.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {/* ── OPS STRIP ─────────────────────────────────── */}
      <section className="ops-strip">
        <div className="page-shell grid gap-3 py-4 text-sm font-black uppercase tracking-[0.08em] text-[var(--ink)] md:grid-cols-3">
          <span>FETCH - NORMALISE - FILTER</span>
              <span>MONEY FILTER - STORE - DELIVER</span>
          <span>WhatsApp first. Dashboard second.</span>
        </div>
      </section>

      {/* ── SOCIAL PROOF + URGENCY ────────────────────── */}
      <section className="border-b-4 border-[var(--line)] bg-[var(--yellow)]">
        <div className="page-shell py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Users size={20} strokeWidth={3} className="text-[var(--ink)]" />
              <p className="text-sm font-black text-[var(--ink)]">
                <span className="underline">247 tradesmen scanning today</span> — Founder slots filling fast
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} strokeWidth={3} className="text-[var(--orange)]" />
              <p className="text-sm font-black text-[var(--ink)]">£39/mo locks forever while active</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUSTED BY ────────────────────────────────── */}
      <section className="border-b-2 border-[var(--line)] bg-white">
        <div className="page-shell py-8 text-center">
          <p className="micro-label text-[var(--muted)]">COVERING POSTCODES ACROSS THE UK</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            {trustedCities.map((city) => (
              <span key={city} className="border-2 border-[var(--line)] bg-[var(--paper)] px-4 py-2 font-mono text-sm font-black uppercase text-[var(--ink)] shadow-[2px_2px_0_var(--yellow)]">
                {city}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm font-bold text-[var(--muted)]">And 200+ postcodes across the UK</p>
        </div>
      </section>

      {/* ── SAMPLE LEAD ───────────────────────────────── */}
      <section className="bg-[var(--bg-main)] border-b-2 border-[var(--line)]">
        <div className="page-shell py-14">
          <p className="micro-label text-[var(--orange)]">THIS IS WHAT A GOLD LEAD LOOKS LIKE</p>
          <h2 className="headline mt-3 text-4xl leading-none">
            SEE THE PRODUCT BEFORE YOU PAY.
          </h2>
          <p className="mt-4 max-w-2xl copy">
            Real planning signal. Real score. Real recommended action. This is exactly what lands in your WhatsApp.
          </p>
          <div className="mt-8 max-w-3xl">
            <SampleLeadCard />
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────── */}
      <section className="bg-[var(--paper)]">
        <div className="page-shell py-14">
          <p className="micro-label text-center text-[var(--orange)]">HOW IT WORKS</p>
          <h2 className="headline mt-3 text-center text-4xl leading-none md:text-5xl">
            THREE STEPS. ZERO WASTE.
          </h2>
          <div className="mt-10 flex flex-col items-center gap-4 md:flex-row md:gap-0">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="grid h-20 w-80 place-items-center border-2 border-[var(--line)] bg-[var(--yellow)] shadow-[4px_4px_0_var(--line)]">
                <div>
                  <p className="font-mono text-xs font-black uppercase text-[var(--ink)]">01</p>
                  <p className="headline text-lg text-[var(--ink)]">Scan your postcode</p>
                </div>
              </div>
            </div>
            {/* Arrow */}
            <div className="hidden md:block">
              <svg viewBox="0 0 60 24" className="h-6 w-16" fill="none" aria-hidden="true">
                <path d="M0 12 L48 12" stroke="var(--ink)" strokeWidth="3" />
                <path d="M44 4 L56 12 L44 20" stroke="var(--ink)" strokeWidth="3" fill="none" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="block md:hidden">
              <svg viewBox="0 0 24 60" className="h-16 w-6" fill="none" aria-hidden="true">
                <path d="M12 0 L12 48" stroke="var(--ink)" strokeWidth="3" />
                <path d="M4 44 L12 56 L20 44" stroke="var(--ink)" strokeWidth="3" fill="none" strokeLinejoin="round" />
              </svg>
            </div>
            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="grid h-20 w-80 place-items-center border-2 border-[var(--line)] bg-[var(--ink)] shadow-[4px_4px_0_var(--yellow)]">
                <div>
                  <p className="font-mono text-xs font-black uppercase text-[var(--yellow)]">02</p>
                  <p className="headline text-lg text-white">Get GOLD alerts</p>
                </div>
              </div>
            </div>
            {/* Arrow */}
            <div className="hidden md:block">
              <svg viewBox="0 0 60 24" className="h-6 w-16" fill="none" aria-hidden="true">
                <path d="M0 12 L48 12" stroke="var(--ink)" strokeWidth="3" />
                <path d="M44 4 L56 12 L44 20" stroke="var(--ink)" strokeWidth="3" fill="none" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="block md:hidden">
              <svg viewBox="0 0 24 60" className="h-16 w-6" fill="none" aria-hidden="true">
                <path d="M12 0 L12 48" stroke="var(--ink)" strokeWidth="3" />
                <path d="M4 44 L12 56 L20 44" stroke="var(--ink)" strokeWidth="3" fill="none" strokeLinejoin="round" />
              </svg>
            </div>
            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="relative grid h-20 w-80 place-items-center border-2 border-[var(--line)] bg-[var(--yellow)] shadow-[4px_4px_0_var(--line)]">
                <div>
                  <p className="font-mono text-xs font-black uppercase text-[var(--ink)]">03</p>
                  <p className="headline text-lg text-[var(--ink)]">Quote first. Win.</p>
                </div>
              </div>
            </div>
          </div>
          {/* Phone mockup */}
          <div className="mt-10 flex justify-center">
            <div className="relative w-[220px] border-[3px] border-[var(--line)] bg-[var(--ink)] pt-2 shadow-[6px_6px_0_var(--yellow)]" style={{ borderRadius: '16px' }}>
              <div className="mx-2 mb-2 flex items-center justify-between border-b border-white/10 px-2 pb-1">
                <span className="text-[10px] font-bold text-white/50">9:41</span>
                <div className="flex gap-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-white/40" />
                  <div className="h-1.5 w-1.5 rounded-full bg-white/40" />
                  <div className="h-1.5 w-1.5 rounded-full bg-white/40" />
                </div>
              </div>
              <div className="mx-2 mb-2 overflow-hidden rounded-lg border-2 border-[var(--yellow)] bg-[var(--steel)] p-3">
                <p className="text-[10px] font-black uppercase tracking-wider text-[var(--yellow)]">JobFilter GOLD</p>
                <p className="mt-1 text-xs font-bold text-white">B12 - Rear extension</p>
                <p className="text-[10px] text-white/60">Builder needed - GBP 42k</p>
                <div className="mt-2 flex items-center gap-1">
                  <span className="rounded-sm bg-[var(--yellow)] px-1.5 py-0.5 text-[9px] font-black text-[var(--ink)]">SCORE 94</span>
                  <span className="rounded-sm bg-[var(--green)] px-1.5 py-0.5 text-[9px] font-black text-white">NEW</span>
                </div>
              </div>
              <div className="mx-2 mb-3 rounded-lg border border-white/10 bg-white/5 p-2">
                <p className="text-[10px] font-bold text-white/40">WhatsApp</p>
                <p className="text-[10px] text-white/25">No new messages</p>
              </div>
              <div className="mx-auto mb-2 h-1 w-16 rounded-full bg-white/20" />
            </div>
          </div>
        </div>
      </section>

      {/* ── OPERATING STEPS ───────────────────────────── */}
      <section className="bg-[var(--paper)]">
        <div className="page-shell grid gap-8 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="micro-label text-[var(--orange)]">THIS IS NOT A JOB BOARD</p>
            <h2 className="headline mt-3 text-5xl leading-none md:text-7xl">
              A WAR ROOM FOR FINDING WORK BEFORE IT GOES PUBLIC.
            </h2>
            <p className="mt-5 max-w-xl text-lg font-bold text-[var(--muted)]">
              Shared lead sites wait until a homeowner fills a form in. JobFilter watches upstream signals: approvals, tenders, property condition, local activity, and timing.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
            {operatingSteps.map((step) => {
              const Icon = step.icon;
              return (
                <article key={step.title} className="ops-panel group p-5 transition-colors hover:bg-[var(--yellow)]/5">
                  <div className="flex items-start gap-4">
                    <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full border-2 border-[var(--line)] bg-[var(--yellow)] shadow-[3px_3px_0_var(--line)]">
                      <StepSVG id={step.svgId} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="headline text-2xl">{step.title}</h3>
                      <p className="mt-2 font-bold leading-snug text-[var(--muted)]">{step.body}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TERRITORY CARDS ───────────────────────────── */}
      <section className="border-y-4 border-[var(--line)] bg-[var(--yellow)]">
        <div className="page-shell grid gap-8 py-12 lg:grid-cols-[1fr_460px] lg:items-center">
          <div>
            <p className="micro-label text-[var(--ink)]">TERRITORY OWNERSHIP</p>
            <h2 className="headline mt-3 text-5xl leading-none md:text-7xl">
              SECURE YOUR PATCH BEFORE ANOTHER FIRM DOES.
            </h2>
            <p className="mt-5 max-w-2xl text-xl font-black text-[var(--ink)]/75">
              Territory lock gives one trade first look in one postcode cluster. Founder firms keep the cheaper price while their plan stays active.
            </p>
            <Link className="jf-button mt-6 bg-[var(--ink)] text-white" to="/territories">
              Open Territory Grid
            </Link>
          </div>
          <div className="grid gap-3">
            {territoryCards.map(([name, status, score]) => {
              const isFounding = status === 'FOUNDING SLOT OPEN';
              const signalLevel = Number(score) >= 90 ? 4 : Number(score) >= 85 ? 3 : Number(score) >= 80 ? 2 : 1;
              return (
                <Link
                  key={name}
                  to="/territories"
                  className={`group border-2 bg-white p-4 text-[var(--ink)] shadow-[4px_4px_0_var(--line)] transition-colors ${isFounding ? 'border-[var(--yellow)] shadow-[4px_4px_0_var(--yellow)]' : 'border-[var(--line)]'}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <MapPinIcon />
                        <h3 className="headline text-2xl">{name}</h3>
                      </div>
                      <div className="mt-1 flex items-center gap-3">
                        <p className={`text-xs font-black uppercase tracking-[0.1em] ${isFounding ? 'text-[var(--orange)]' : 'text-[var(--muted)]'}`}>{status}</p>
                        <SignalStrengthBars level={signalLevel} />
                      </div>
                    </div>
                    <span className="border-2 border-[var(--line)] bg-[var(--yellow)] px-3 py-2 font-mono text-xl font-black">{score}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── PUBLIC DEMAND ENGINE ──────────────────────── */}
      <section className="bg-white">
        <div className="page-shell grid gap-8 py-12 lg:grid-cols-[1fr_420px] lg:items-center">
          <div>
            <p className="micro-label text-[var(--orange)]">PUBLIC DEMAND ENGINE</p>
            <h2 className="headline mt-3 text-5xl leading-none md:text-7xl">
              WE ARE NOT ONLY FINDING SIGNALS. WE ARE PULLING JOBS IN.
            </h2>
            <p className="mt-5 max-w-2xl text-xl font-black text-[var(--muted)]">
              Homeowners and property owners can submit jobs directly. Territory-locked firms get routed opportunities, while first-month guerilla campaigns drive more local demand into the system.
            </p>
          </div>
          <div className="ops-panel bg-[var(--paper)] p-5">
            <p className="micro-label text-[var(--ink)]">FIRST MONTH CAMPAIGN ADD-ONS</p>
            <div className="mt-4 grid gap-3 font-black text-[var(--muted)]">
              <p>Sticker campaign around your patch</p>
              <p>Direct letters to selected local opportunities</p>
              <p>Neighbour Signal door-drop after won jobs</p>
              <p>Public "post a job" intake page for repeat demand</p>
            </div>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link className="jf-button bg-[var(--ink)] text-white" to="/post-job">See Public Intake</Link>
              <Link className="jf-button bg-[var(--yellow)] text-[var(--ink)]" to="/blueprint">Why This Is Different</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT YOU GET ─────────────────────────────── */}
      <section className="border-y-4 border-[var(--line)] bg-[var(--bg-main)]">
        <div className="page-shell py-14">
          <p className="micro-label text-[var(--green)]">WHAT YOU GET</p>
          <h2 className="headline mt-3 text-4xl leading-none sm:text-5xl">
            EVERYTHING INCLUDED. NO HIDDEN FEES.
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: ShieldCheck, title: 'One territory lock', body: 'Your trade + postcode cluster. No one else gets priority.' },
              { icon: Target, title: 'Unlimited WhatsApp alerts', body: 'Gold and Silver leads hit your phone within minutes.' },
              { icon: FileText, title: 'Unlimited direct letters', body: 'Written with your company details. 1st class postage included.' },
              { icon: Zap, title: 'Full lead scoring', body: 'Serious Buyer Score + Ghost Risk rating on every lead.' },
              { icon: TrendingUp, title: 'Pipeline tracking', body: 'Track every opportunity from first contact to won job.' },
              { icon: Radio, title: 'All free tools', body: 'Codex, Vicinity, Vantage — every tool, no extra charge.' },
              { icon: Clock, title: 'Founder price lock', body: '£39/mo stays £39/mo forever while your plan is active.' },
              { icon: CheckCircle, title: '30-day guarantee', body: 'Set up. Use it. If you do not see value, we refund.' },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="jf-box bg-white p-5">
                <Icon size={22} strokeWidth={3} className="text-[var(--green)]" />
                <p className="headline mt-3 text-lg">{title}</p>
                <p className="mt-1 text-sm font-black text-[var(--muted)]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ──────────────────────────────── */}
      <section className="relative overflow-hidden bg-[var(--ink)] text-white">
        {/* Diagonal stripe pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'repeating-linear-gradient(135deg, var(--yellow) 0px, var(--yellow) 2px, transparent 2px, transparent 14px)' }} aria-hidden="true" />
        {/* Yellow accent bar */}
        <div className="absolute left-0 top-0 h-full w-3 bg-[var(--yellow)]" aria-hidden="true" />

        <div className="page-shell relative grid gap-8 py-14 lg:grid-cols-[1fr_420px] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 border-2 border-[var(--orange)] bg-[var(--orange)]/15 px-3 py-1.5">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--orange)]" />
              <span className="font-mono text-xs font-black uppercase text-[var(--orange)]">Limited founding spots</span>
            </div>
            <h2 className="headline mt-5 text-5xl leading-none md:text-7xl">
              LESS CHASING. BETTER JOBS. CONTROL OF YOUR AREA.
            </h2>
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {[
                ['No shared auctions', 'Your best leads are not blasted to five firms.'],
                ['No fake leads', 'Every signal carries source, confidence, urgency, and value.'],
                ['No dashboard homework', 'WhatsApp gets the lead. The dashboard proves the money.'],
              ].map(([title, body]) => (
                <div key={title} className="border-2 border-white/20 bg-white/8 p-4 transition-colors hover:border-[var(--yellow)]/40 hover:bg-white/12">
                  <h3 className="headline text-2xl text-[var(--yellow)]">{title}</h3>
                  <p className="mt-2 font-bold text-white/72">{body}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="ops-panel bg-white p-5 text-[var(--ink)]">
            <div className="flex items-center gap-3 border-b-2 border-[var(--line)] pb-4">
              <AlertTriangle size={28} strokeWidth={3} />
              <div>
                <p className="micro-label text-[var(--orange)]">FOUNDER ACCESS</p>
                <h3 className="headline text-3xl">Claim early. Keep the rate.</h3>
              </div>
            </div>
            <p className="mt-4 text-lg font-black text-[var(--muted)]">
              Paid unlocks verification proof, WhatsApp alerts, priority routing, and company-branded letters written for selected Gold leads.
            </p>
            <WaitlistForm source="home-tactical-2026-05-09" />
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;