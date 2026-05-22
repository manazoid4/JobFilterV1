import { Link } from 'react-router-dom';
import { AlertTriangle, Radio, ShieldCheck, Target, ArrowUpRight, ArrowDownRight, Users, Clock, TrendingUp, CheckCircle, Lock, FileText, Zap, Megaphone, BookOpen, Calculator } from 'lucide-react';
import { WaitlistForm } from '../components/WaitlistForm';
import { SampleLeadCard } from '../components/SampleLeadCard';

const proofPoints = [
  'Jobs spotted before Checkatrade lists them',
  'Verified signals — not recycled from job boards',
  'One trade per postcode — no five-way blast',
  'No shared auction. Cancel anytime.',
];

const signalRows = [
  { source: 'Planning', signal: 'Rear extension approval', trade: 'Builder', value: 'Budget band', score: 94, trend: 'up' as const, location: 'Sample' },
  { source: 'Energy', signal: 'F-rated rental cluster', trade: 'Insulation', value: 'Retrofit band', score: 87, trend: 'up' as const, location: 'Sample' },
  { source: 'Contracts', signal: 'School maintenance tender', trade: 'Electrical', value: 'Tender band', score: 91, trend: 'up' as const, location: 'Sample' },
  { source: 'Property', signal: 'Brownfield site trigger', trade: 'Groundworks', value: 'High-value band', score: 82, trend: 'down' as const, location: 'Sample' },
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
            Energy: F/G
          </div>
          <div className="absolute left-[5%] bottom-[22%] animate-[float_5s_ease-in-out_infinite_0.5s] rounded-full border-2 border-white/40 bg-white/10 px-3 py-1.5 font-mono text-[11px] font-black uppercase text-white/70">
            Extension: Approved
          </div>
          <div className="absolute right-[6%] bottom-[30%] animate-[float_8s_ease-in-out_infinite_2s] rounded-full border-2 border-[var(--orange)] bg-[var(--orange)]/15 px-3 py-1.5 font-mono text-[11px] font-black uppercase text-[var(--orange)]">
            Tender: Live
          </div>
        </div>

        <div className="page-shell relative grid gap-8 py-10 md:py-14 lg:grid-cols-[1fr_420px] lg:items-end">
          <div>
            <p className="micro-label text-[var(--yellow)]">JOBFILTER INTAKE ENGINE — UK CONSTRUCTION LEADS, SCORED BEFORE THEY GO PUBLIC</p>
            <h1 className="headline mt-4 max-w-5xl text-[clamp(46px,9vw,106px)] leading-[0.88] text-white">
              QUIT WORKING{' '}
              <span style={{ color: 'var(--yellow)', display: 'inline' }}>FOR GHOSTS.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-xl font-black leading-tight text-white/90 md:text-2xl">
              The Intake Engine reads planning approvals, EPC data and council contracts before they hit any directory — kills tyre-kickers, scores what is left, sends only serious jobs to your WhatsApp.
            </p>
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {proofPoints.map((point) => (
                <div key={point} className="border-2 border-white/25 bg-white/8 px-3 py-2 text-sm font-black uppercase text-white transition-colors hover:border-[var(--yellow)] hover:bg-[var(--yellow)]/15 hover:text-[var(--yellow)]">
                  {point}
                </div>
              ))}
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link className="jf-button bg-[var(--yellow)] text-[var(--ink)] text-lg px-8 py-4" to="/find-jobs">
                SCAN FREE — NO CARD NEEDED
              </Link>
              <div className="flex flex-wrap gap-4">
                <Link className="text-sm font-black text-white/80 underline underline-offset-2 hover:text-[var(--yellow)]" to="/methodology">
                  How it works →
                </Link>
                <Link className="text-sm font-black text-white/80 underline underline-offset-2 hover:text-[var(--yellow)]" to="/news">
                  Trade news →
                </Link>
                <Link className="text-sm font-black text-white/80 underline underline-offset-2 hover:text-[var(--yellow)]" to="/territories">
                  Claim Territory →
                </Link>
                <a className="text-sm font-black text-white/80 underline underline-offset-2 hover:text-[var(--yellow)]" href="https://www.instagram.com/jobfilter.uk/" target="_blank" rel="noopener noreferrer">
                  Follow on Instagram →
                </a>
              </div>
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
          <span>Signals from planning approvals, energy upgrades, and public tenders</span>
          <span>Scored by value, trade fit, and urgency</span>
          <span>WhatsApp alert — before the job goes public</span>
        </div>
      </section>

      <section className="border-b-4 border-[var(--line)] bg-white">
        <div className="page-shell grid gap-5 py-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="micro-label text-[var(--orange)]">TRADE INTELLIGENCE</p>
            <h2 className="headline mt-2 text-3xl leading-none sm:text-5xl">WRITTEN BY PEOPLE WHO KNOW HOW CONSTRUCTION WORK IS WON.</h2>
            <p className="mt-3 max-w-2xl font-bold text-[var(--muted)]">
              Planning signals. Retrofit pressure. Tender timing. Commercial fit-out leads. Published every weekday — practical enough to act on, not just read.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Link className="jf-button bg-[var(--ink)] text-white" to="/news">READ NEWS</Link>
            <a className="jf-button bg-[var(--yellow)] text-[var(--ink)]" href="https://www.instagram.com/jobfilter.uk/" target="_blank" rel="noopener noreferrer">INSTAGRAM</a>
            <Link className="jf-button bg-white text-[var(--ink)]" to="/pricing">CLAIM PATCH</Link>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF + URGENCY ────────────────────── */}
      <section className="border-b-4 border-[var(--line)] bg-[var(--yellow)]">
        <div className="page-shell py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Users size={20} strokeWidth={3} className="text-[var(--ink)]" />
              <p className="text-sm font-black text-[var(--ink)]">
                Founding 30 — one dominant trade partner per postcode cluster
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

      {/* ── FREE TOOLS STRIP ──────────────────────────── */}
      <section className="bg-white border-b-2 border-[var(--line)]">
        <div className="page-shell py-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="micro-label text-[var(--orange)]">FREE FOR EVERYONE — NO SIGNUP</p>
              <h2 className="headline mt-2 text-3xl leading-none sm:text-4xl">USEFUL BEFORE YOU PAY.</h2>
              <p className="mt-3 max-w-2xl text-base font-bold text-[var(--muted)]">
                Quote-floor calculator. Tyre-kicker scorer. Profit check. Travel-cost and time-waster maths. Checkatrade and Bark charge for these. We give them away — leads are the paid part.
              </p>
            </div>
            <Link className="jf-button bg-[var(--ink)] text-white shrink-0" to="/free-tools">
              OPEN FREE TOOLS →
            </Link>
          </div>
          <div className="mt-6 grid gap-2 sm:grid-cols-3 lg:grid-cols-5">
            {[
              ['Quote Floor', 'Minimum sensible quote'],
              ['Tyre-Kicker Check', 'Score before you visit'],
              ['Profit Check', 'What is left after costs'],
              ['Travel Cost', 'Fuel maths in seconds'],
              ['Time-Waster Cost', 'Annual hit from bad leads'],
            ].map(([name, sub]) => (
              <Link key={name} to="/free-tools" className="border-2 border-[var(--line)] bg-[var(--paper)] p-3 hover:bg-[var(--yellow)]/15 transition-colors">
                <div className="flex items-center gap-2">
                  <Calculator size={14} strokeWidth={3} className="text-[var(--orange)] shrink-0" />
                  <p className="text-sm font-black uppercase tracking-tight text-[var(--ink)]">{name}</p>
                </div>
                <p className="mt-1 text-[11px] font-black uppercase tracking-wider text-[var(--muted)]">{sub}</p>
              </Link>
            ))}
          </div>
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
            Real planning signal. Real score. Real recommended action. This is exactly what lands in your WhatsApp — scored, filtered, and ready to act on.
          </p>
          <div className="mt-8 max-w-3xl">
            <SampleLeadCard />
          </div>
          <div className="mt-6 max-w-3xl grid grid-cols-3 divide-x-2 divide-[var(--line)] border-2 border-[var(--line)]">
            <div className="px-5 py-4">
              <p className="headline text-3xl text-[var(--ink)]">3–5 days</p>
              <p className="mt-1 text-xs font-black uppercase tracking-wider text-[var(--muted)]">before the job appears anywhere else</p>
            </div>
            <div className="px-5 py-4">
              <p className="headline text-3xl text-[var(--ink)]">GOLD only</p>
              <p className="mt-1 text-xs font-black uppercase tracking-wider text-[var(--muted)]">budget-confirmed leads to your WhatsApp</p>
            </div>
            <div className="px-5 py-4">
              <p className="headline text-3xl text-[var(--ink)]">1 trade</p>
              <p className="mt-1 text-xs font-black uppercase tracking-wider text-[var(--muted)]">per territory — no shared lists</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────── */}
      <section className="bg-[var(--paper)] border-b-2 border-[var(--line)]">
        <div className="page-shell py-14">
          <p className="micro-label text-[var(--orange)]">HOW IT WORKS</p>
          <h2 className="headline mt-3 text-4xl leading-none md:text-5xl">
            THREE STEPS. ZERO WASTE.
          </h2>
          <div className="mt-10 flex flex-col gap-0 divide-y-2 divide-[var(--line)] border-2 border-[var(--line)]">
            <div className="flex items-start gap-6 bg-[var(--yellow)] px-6 py-6">
              <span className="font-mono text-xs font-black text-[var(--ink)] pt-1">01</span>
              <div>
                <p className="headline text-xl text-[var(--ink)]">Enter your postcode and trade</p>
                <p className="mt-1 text-sm font-bold text-[var(--ink)]/70">JobFilter scans planning approvals, energy signals, council tenders, and new business registrations within your territory.</p>
              </div>
            </div>
            <div className="flex items-start gap-6 bg-[var(--ink)] px-6 py-6">
              <span className="font-mono text-xs font-black text-[var(--yellow)] pt-1">02</span>
              <div>
                <p className="headline text-xl text-white">Every signal is scored before you see it</p>
                <p className="mt-1 text-sm font-bold text-white/60">Budget confidence, buyer readiness, and timing pressure are all checked. GOLD leads go straight to your WhatsApp. Low-value noise stays out.</p>
              </div>
            </div>
            <div className="flex items-start gap-6 bg-white px-6 py-6">
              <span className="font-mono text-xs font-black text-[var(--ink)] pt-1">03</span>
              <div>
                <p className="headline text-xl text-[var(--ink)]">You call before anyone else does</p>
                <p className="mt-1 text-sm font-bold text-[var(--muted)]">Most leads on job boards are already four quotes deep. JobFilter finds the work before it gets posted anywhere.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEVER MISS A LEAD ─────────────────────────── */}
      <section className="bg-[var(--ink)] border-y-4 border-[var(--yellow)]">
        <div className="page-shell py-14">
          <p className="micro-label text-[var(--yellow)]">FIRST STRIKE — INCLUDED WITH PATCH PLAN</p>
          <h2 className="headline mt-3 text-4xl leading-none text-white sm:text-5xl">
            GOLD LEAD ARRIVES.<br />RIGHT MESSAGE. ONE TAP. SENT.
          </h2>
          <p className="mt-5 max-w-2xl font-bold text-white/70 leading-relaxed">
            First Strike picks the right message for how old the lead is, fills in the trade and postcode, and puts it in your clipboard. No thinking. No typing. You're calling while your competitors are still reading the notification.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="border-2 border-[var(--yellow)]/30 bg-white/5 p-5">
              <p className="headline text-3xl text-[var(--yellow)]">2h</p>
              <p className="mt-2 text-sm font-black uppercase tracking-wider text-white/60">first-touch window before buyer goes cold</p>
            </div>
            <div className="border-2 border-[var(--yellow)]/30 bg-white/5 p-5">
              <p className="headline text-3xl text-[var(--yellow)]">1 tap</p>
              <p className="mt-2 text-sm font-black uppercase tracking-wider text-white/60">to copy a ready-written message for any lead</p>
            </div>
            <div className="border-2 border-[var(--yellow)]/30 bg-white/5 p-5">
              <p className="headline text-3xl text-[var(--yellow)]">0</p>
              <p className="mt-2 text-sm font-black uppercase tracking-wider text-white/60">leads shared with other tradesmen in your territory</p>
            </div>
          </div>
          <div className="mt-8 border-2 border-[var(--yellow)]/40 bg-white/5 p-5 max-w-2xl">
            <p className="text-[10px] font-black uppercase tracking-wider text-[var(--yellow)] mb-3">EXAMPLE — COPY IN ONE TAP</p>
            <p className="text-sm font-bold text-white/80 leading-relaxed italic">
              "Hi, I saw your builder job in SW12 come up. I'm local and available this week. Happy to pop round and give you a proper quote — no obligation. Give me a shout if you want to arrange a time."
            </p>
            <p className="mt-3 text-[10px] font-black uppercase tracking-wider text-white/40">Pre-filled with trade + postcode from the lead</p>
          </div>
          <div className="mt-8">
            <Link className="jf-button bg-[var(--yellow)] text-[var(--ink)]" to="/find-jobs">
              SEE LIVE LEADS IN YOUR AREA
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2026 ROADMAP — 3 PAID FEATURES IN BUILD ───── */}
      <section className="bg-[var(--ink)] border-y-4 border-[var(--yellow)] text-white">
        <div className="page-shell py-14">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-[var(--yellow)]" />
            <p className="micro-label text-[var(--yellow)]">2026 ROADMAP — IN BUILD, FOUNDER FIRMS FIRST</p>
          </div>
          <h2 className="headline mt-3 text-4xl leading-none md:text-5xl">
            THREE THINGS NO OTHER LEAD TOOL DOES.
          </h2>
          <p className="mt-4 max-w-2xl text-base font-bold text-white/80 leading-snug">
            These three are in active build for 2026. Founder firms get first access as each one ships. Honest about what is and is not live yet — see the status badge on each card.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="border-2 border-[var(--yellow)] bg-white/5 p-5">
              <div className="flex items-center gap-2">
                <span className="border-2 border-[var(--orange)] bg-[var(--orange)]/20 px-2 py-0.5 text-[10px] font-black uppercase text-[var(--orange)]">IN BUILD</span>
                <p className="micro-label text-[var(--yellow)]">MEES DEADLINE WATCH</p>
              </div>
              <h3 className="headline mt-3 text-2xl text-white">Legally-forced rental work, before the landlord calls anyone.</h3>
              <p className="mt-2 text-sm font-bold text-white/70 leading-snug">
                Will watch every EPC band F or G filed on a UK rental, match it to your trade, and push the landlord and letting agent details into your WhatsApp. Compliance pressure does the selling.
              </p>
              <p className="mt-3 text-[11px] font-black uppercase text-[var(--yellow)]/80">Target: Q3 2026</p>
            </div>
            <div className="border-2 border-[var(--yellow)] bg-white/5 p-5">
              <div className="flex items-center gap-2">
                <span className="border-2 border-[var(--orange)] bg-[var(--orange)]/20 px-2 py-0.5 text-[10px] font-black uppercase text-[var(--orange)]">IN BUILD</span>
                <p className="micro-label text-[var(--yellow)]">CHASE NUDGE</p>
              </div>
              <h3 className="headline mt-3 text-2xl text-white">Auto-paced follow-ups so warm leads never go cold.</h3>
              <p className="mt-2 text-sm font-bold text-white/70 leading-snug">
                After a Gold lead lands, three timed nudges: 2-hour silent check, 24-hour soft poke, 48-hour "they're going cold" alert. Pre-written WhatsApp templates — tap to send or snooze.
              </p>
              <p className="mt-3 text-[11px] font-black uppercase text-[var(--yellow)]/80">Target: Q3 2026</p>
            </div>
            <div className="border-2 border-[var(--yellow)] bg-white/5 p-5">
              <div className="flex items-center gap-2">
                <span className="border-2 border-[var(--orange)] bg-[var(--orange)]/20 px-2 py-0.5 text-[10px] font-black uppercase text-[var(--orange)]">IN BUILD</span>
                <p className="micro-label text-[var(--yellow)]">PROFIT PROOF</p>
              </div>
              <h3 className="headline mt-3 text-2xl text-white">Monthly £-by-source receipt. Proof you can show your accountant.</h3>
              <p className="mt-2 text-sm font-bold text-white/70 leading-snug">
                Mark a lead Won, log the job value. We'll tally what each signal source earned you that month — planning vs EPC vs tender vs Companies House. One-page email, every month.
              </p>
              <p className="mt-3 text-[11px] font-black uppercase text-[var(--yellow)]/80">Target: Q3 2026</p>
            </div>
          </div>
          <p className="mt-6 text-xs font-black uppercase tracking-wider text-white/50">
            Founder firms get each one first as it ships. No charge to upgrade.
          </p>
        </div>
      </section>

      {/* ── ADD-ON SERVICES ───────────────────────────── */}
      <section className="bg-white border-t-2 border-[var(--line)]">
        <div className="page-shell py-14">
          <p className="micro-label text-[var(--orange)]">ADD-ON SERVICES — OPTIONAL, BOOK AS NEEDED</p>
          <h2 className="headline mt-3 text-4xl leading-none md:text-5xl">
            WIN THE JOBS THE INTAKE ENGINE FINDS.
          </h2>
          <p className="mt-4 max-w-2xl copy">
            The Intake Engine puts serious jobs in front of you. These three services help you close them. Each one is a human-staffed team — submit a job, get a deliverable back. Not subscription bloat.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Link to="/vantage" className="jf-box bg-[var(--bg-main)] p-6 block hover:bg-white transition-colors">
              <div className="flex items-center gap-3">
                <FileText size={24} strokeWidth={3} className="text-[var(--orange)]" />
                <p className="micro-label text-[var(--orange)]">VANTAGE</p>
              </div>
              <h3 className="headline mt-3 text-2xl">Tender → bid deck in 6h</h3>
              <p className="mt-2 text-sm font-black text-[var(--muted)]">PQQs, ITTs and big-quote paperwork turned into a deck that makes you look like the £5M firm. Forward-looking.</p>
              <span className="mt-4 inline-block text-sm font-black uppercase text-[var(--ink)]">Open Vantage →</span>
            </Link>
            <Link to="/vicinity" className="jf-box bg-[var(--bg-main)] p-6 block hover:bg-white transition-colors">
              <div className="flex items-center gap-3">
                <Megaphone size={24} strokeWidth={3} className="text-[var(--orange)]" />
                <p className="micro-label text-[var(--orange)]">VICINITY</p>
              </div>
              <h3 className="headline mt-3 text-2xl">Job photos → local ads</h3>
              <p className="mt-2 text-sm font-black text-[var(--muted)]">Finished jobs turned into WhatsApp posts, leaflets, and door-drops aimed only at houses with live signals.</p>
              <span className="mt-4 inline-block text-sm font-black uppercase text-[var(--ink)]">Open Vicinity →</span>
            </Link>
            <Link to="/codex" className="jf-box bg-[var(--bg-main)] p-6 block hover:bg-white transition-colors">
              <div className="flex items-center gap-3">
                <BookOpen size={24} strokeWidth={3} className="text-[var(--orange)]" />
                <p className="micro-label text-[var(--orange)]">CODEX</p>
              </div>
              <h3 className="headline mt-3 text-2xl">Manuals → sales sheets</h3>
              <p className="mt-2 text-sm font-black text-[var(--muted)]">Send dense product specs or schematics. Get back a plain-English one-pager a homeowner or procurement team will actually read.</p>
              <span className="mt-4 inline-block text-sm font-black uppercase text-[var(--ink)]">Open Codex →</span>
            </Link>
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
            <p className="micro-label text-[var(--orange)]">MORE THAN SIGNALS</p>
            <h2 className="headline mt-3 text-5xl leading-none md:text-7xl">
              WE ALSO PULL JOBS DIRECTLY INTO YOUR PATCH.
            </h2>
            <p className="mt-5 max-w-2xl text-xl font-black text-[var(--muted)]">
              Homeowners can post jobs straight into the system. Territory-locked firms get first look — no directory, no competition, no shared auction.
            </p>
          </div>
          <div className="ops-panel bg-[var(--paper)] p-5">
            <p className="micro-label text-[var(--ink)]">INCLUDED WITH YOUR TERRITORY</p>
            <div className="mt-4 grid gap-3 font-black text-[var(--muted)]">
              <p>✓ Homeowner jobs routed to your trade and postcode</p>
              <p>✓ Company-branded letters for high-value signals</p>
              <p>✓ Neighbour Signal — turn one job into local demand</p>
              <p>✓ Weekly digest of your area's best opportunities</p>
            </div>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link className="jf-button bg-[var(--yellow)] text-[var(--ink)]" to="/pricing">See What's Included</Link>
              <Link className="jf-button bg-[var(--ink)] text-white" to="/blueprint">How It Works</Link>
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
              { icon: Zap, title: 'Lead value kit', body: 'Quote floor, chase recommendation, and follow-up cadence on every lead.' },
              { icon: TrendingUp, title: 'Pipeline tracking', body: 'Track every opportunity from first contact to won job.' },
              { icon: Radio, title: 'Patch Watch', body: 'Planning, energy, tender, and business signals watched for your trade and postcode cluster. Patch Pulse shows the live mix.' },
              { icon: Clock, title: 'Founder price lock', body: '£39/mo stays £39/mo forever while your plan is active.' },
              { icon: CheckCircle, title: '30-day guarantee', body: 'If you don\'t see one job worth chasing in 30 days, we refund every penny.' },
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

      {/* ── CITY INTELLIGENCE TEASER ─────────────────── */}
      <section className="page-shell py-12">
        <div className="jf-box bg-[var(--yellow)] p-7">
          <p className="micro-label text-[var(--ink)]">WEEKLY TERRITORY BRIEFING</p>
          <h2 className="headline mt-3 text-4xl leading-none">CITY INTELLIGENCE</h2>
          <p className="mt-3 max-w-2xl font-black text-[var(--ink)]/80">
            Every week: territory score, hot lead spotlight, market note, and one actionable move for your patch.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link to="/intelligence/birmingham" className="jf-button bg-[var(--ink)] text-white text-sm">VIEW SAMPLE BRIEFING →</Link>
            <Link to="/pricing" className="jf-button bg-white text-[var(--ink)] border-2 border-[var(--ink)] text-sm">UNLOCK WITH PATCH PLAN — £39/MO</Link>
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
              QUIT WORKING FOR GHOSTS.
            </h2>
            <p className="mt-3 text-lg font-bold text-white/70 max-w-lg">Not a lead marketplace. A construction intelligence layer. Gold leads are controlled by trade, patch, and timing before they hit your WhatsApp.</p>
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {[
                ['No shared auction', 'No five-trade blast. No race-to-the-bottom resale. If a lead looks crowded, it gets marked down or blocked.'],
                ['No timewasters', 'Every signal is scored for buyer intent, timing pressure, and budget. WASTE-rated leads never reach you.'],
                ['WhatsApp first', 'The job hits your phone. Dashboard second. One dominant trade partner per area.'],
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
              Gold leads are controlled before they hit WhatsApp — no shared auction, no five-trade blast. If you don't see one job worth chasing in 30 days, we refund every penny.
            </p>
            <WaitlistForm source="home-tactical-2026-05-09" />
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
