"use client";
import Link from 'next/link';

import { AlertTriangle, ArrowUpRight, ArrowDownRight, Users, Clock, Lock, FileText, Megaphone, BookOpen, Calculator } from 'lucide-react';
import { WaitlistForm } from '../components/WaitlistForm';
import { SampleLeadCard } from '../components/SampleLeadCard';

const proofPoints = [
  '3–5 days before Checkatrade or Bark sees the same job',
  'Verified signals — not recycled from job boards',
  'One trade per postcode — no five-way blast',
  'No shared auction. No credit card. Cancel anytime.',
];

const signalRows = [
  { source: 'Planning', signal: 'Rear extension approved — 4-bed detached, no contractor yet', trade: 'Builder', value: '£18k–£34k', score: 94, trend: 'up' as const, location: 'B12' },
  { source: 'Energy', signal: 'Low-rated rental block — 6 units, retrofit trigger', trade: 'Insulation', value: '£8k–£14k', score: 87, trend: 'up' as const, location: 'LS8' },
  { source: 'Contracts', signal: 'School electrical maintenance — 12-month contract', trade: 'Electrical', value: '£22k–£38k', score: 91, trend: 'up' as const, location: 'M20' },
  { source: 'Property', signal: 'Auction sale cleared — full refurb likely', trade: 'Groundworks', value: '£6k–£12k', score: 82, trend: 'down' as const, location: 'SE15' },
];

const territoryCards = [
  ['B12 Roofing', 'FOUNDER RATE', '91'],
  ['Birmingham Extensions', 'FOUNDER RATE', '88'],
  ['Coventry Solar', 'FOUNDER RATE', '84'],
  ['Manchester Bathrooms', 'FOUNDER RATE', '82'],
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


        <div className="page-shell relative grid gap-8 py-10 md:py-14 lg:grid-cols-[1fr_420px] lg:items-end">
          <div>
            <p className="micro-label text-[var(--yellow)]">QUIT CHASING GHOST JOBS</p>
            <h1 className="headline mt-4 max-w-5xl text-[clamp(3rem,9vw,106px)] leading-[0.88] text-white break-words">
              UK CONSTRUCTION LEADS.{' '}
              <span style={{ color: 'var(--yellow)', display: 'inline' }}>SCORED.</span>
              {' '}YOURS BEFORE CHECKATRADE.
            </h1>
            <p className="mt-5 max-w-2xl text-xl font-bold leading-snug text-white/85 md:text-2xl">
              JobFilter scans planning approvals, energy data and council contracts to find serious construction work in your postcode — scored by quality, filtered by patch, delivered to WhatsApp.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link className="jf-button bg-[var(--yellow)] text-[var(--ink)] text-lg px-8 py-4" href="/find-jobs">
                SCAN FREE — NO CARD NEEDED →
              </Link>
              <Link className="text-sm font-black text-white/80 underline underline-offset-2 hover:text-[var(--yellow)]" href="/methodology">
                How it works →
              </Link>
            </div>
            <p className="mt-3 text-sm font-bold text-white/55">
              <Lock size={12} strokeWidth={3} className="inline mr-1" />
              £39/mo founder price · locks in while your plan stays active · 30-day money-back guarantee
            </p>
            <div className="mt-5 flex flex-col gap-1.5">
              {proofPoints.map((point) => (
                <div key={point} className="flex items-center gap-2 text-sm font-bold text-white/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--yellow)] shrink-0" />
                  {point}
                </div>
              ))}
            </div>
          </div>

          <aside className="ops-panel bg-[var(--steel)] p-4 text-white">
            <div className="flex items-center justify-between border-b-2 border-[var(--yellow)] pb-3">
              <p className="micro-label text-[var(--yellow)]">RECENT UK SIGNALS</p>
              <p className="text-[10px] font-black uppercase tracking-wider text-white/55">Sample data</p>
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
          <span>Planning approvals, council tenders, and energy signals — not job boards</span>
          <span>Scored 0–100 by job value, trade fit, and how close you are</span>
          <span>GOLD leads to WhatsApp — 3–5 days before the job goes public</span>
        </div>
      </section>

      {/* ── SOCIAL PROOF + URGENCY ────────────────────── */}
      <section className="border-b-4 border-[var(--line)] bg-[var(--yellow)]">
        <div className="page-shell py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Users size={20} strokeWidth={3} className="text-[var(--ink)] shrink-0" />
              <p className="text-sm font-black text-[var(--ink)]">
                &ldquo;First planning alert I got covered a loft conversion — paid for four months in one job.&rdquo;
                <span className="ml-2 font-black text-[var(--ink)]/60">— Builder, Birmingham</span>
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
            <Link className="jf-button bg-[var(--ink)] text-white shrink-0" href="/free-tools">
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
              <Link key={name} href="/free-tools" className="border-2 border-[var(--line)] bg-[var(--paper)] p-3 hover:bg-[var(--yellow)]/15 transition-colors">
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
            Job type, postcode, budget band, score, and urgency — in one message. This is exactly what lands in your WhatsApp when a GOLD lead fires. No noise. No recycled Checkatrade listings. Just the job.
          </p>
          <div className="mt-8 max-w-3xl">
            <SampleLeadCard />
          </div>
          <div className="mt-6 max-w-3xl grid grid-cols-1 sm:grid-cols-3 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-[var(--line)] border-2 border-[var(--line)]">
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
                <p className="mt-1 text-sm font-bold text-white/60">Signals are scored 0–100 for budget confidence, buyer readiness, and timing pressure. 80+ scores GOLD and hit your WhatsApp. Low-value noise stays out.</p>
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

      {/* ── TERRITORY CARDS ───────────────────────────── */}
      <section className="border-y-4 border-[var(--line)] bg-[var(--yellow)]">
        <div className="page-shell grid gap-8 py-12 lg:grid-cols-[1fr_460px] lg:items-center">
          <div>
            <p className="micro-label text-[var(--ink)]">TERRITORY OWNERSHIP</p>
            <h2 className="headline mt-3 text-5xl leading-none md:text-7xl">
              SECURE YOUR PATCH BEFORE ANOTHER TRADE DOES.
            </h2>
            <p className="mt-5 max-w-2xl text-xl font-bold text-[var(--ink)]/70">
              Territory lock gives you first look at every signal in your postcode cluster. Tradesmen who lock in now keep £39/mo for life — the rate goes up when founder slots fill.
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <Link className="jf-button bg-[var(--ink)] text-white" href="/territories">
                CHECK MY PATCH →
              </Link>
              <Link className="jf-button bg-white text-[var(--ink)]" href="/find-jobs">
                SCAN FREE — NO CARD NEEDED →
              </Link>
            </div>
          </div>
          <div className="grid gap-3">
            <p className="micro-label text-[var(--ink)]">SAMPLE PATCHES — SCORES SHOWN FOR ILLUSTRATION</p>
            {territoryCards.map(([name, status, score]) => {
              const signalLevel = Number(score) >= 90 ? 4 : Number(score) >= 85 ? 3 : Number(score) >= 80 ? 2 : 1;
              return (
                <Link
                  key={name}
                  href="/territories"
                  className="group border-2 border-[var(--yellow)] bg-white p-4 text-[var(--ink)] shadow-[4px_4px_0_var(--yellow)] transition-colors hover:bg-[var(--yellow)]/10"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <MapPinIcon />
                        <h3 className="headline text-2xl">{name}</h3>
                      </div>
                      <div className="mt-1 flex items-center gap-3">
                        <p className="text-xs font-black uppercase tracking-[0.1em] text-[var(--orange)]">{status}</p>
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

      {/* ── WHAT YOU GET ─────────────────────────────── */}
      <section className="border-y-4 border-[var(--line)] bg-[var(--bg-main)]">
        <div className="page-shell py-14">
          <p className="micro-label text-[var(--orange)]">WHY IT WORKS</p>
          <h2 className="headline mt-3 text-4xl leading-none sm:text-5xl">
            FOUR THINGS THAT MATTER.
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {([
              { num: '01', title: 'Your phone before anyone else', body: 'Gold-scored leads hit your WhatsApp within minutes of a planning approval, energy signal, or council tender going live. Before they reach any job board.' },
              { num: '02', title: 'One trade. One patch. No sharing.', body: 'No shared auction. No five-trade race to the bottom. Your trade gets priority routing in your postcode cluster — not blasted to four other firms.' },
              { num: '03', title: 'Scored before you see it', body: 'Every signal scored 0–100 for buyer readiness, timing pressure, and trade fit. Bronze noise stays out. GOLD hits your phone. You only act on what\'s worth your time.' },
              { num: '04', title: 'One job covers it.', body: 'Average UK trade job: £800–£3,000. One qualified win at founder price pays for 3 months. 30-day money-back if you don\'t see one job worth chasing.' },
            ] as { num: string; title: string; body: string }[]).map(({ num, title, body }) => (
              <div key={num} className="jf-box bg-white p-6">
                <p className="font-mono text-4xl font-black text-[var(--yellow)] leading-none">{num}</p>
                <p className="headline mt-3 text-xl leading-tight text-[var(--ink)]">{title}</p>
                <p className="mt-2 text-sm font-black text-[var(--muted)] leading-snug">{body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-center">
            <Link className="jf-button bg-[var(--ink)] text-white" href="/pricing">
              CLAIM YOUR PATCH — £39/MO →
            </Link>
            <span className="text-sm font-black text-[var(--muted)]">30-day money-back · No auction · Cancel anytime</span>
          </div>
        </div>
      </section>

      {/* ── ADD-ON SERVICES ───────────────────────────── */}
      <section className="bg-white border-t-2 border-[var(--line)]">
        <div className="page-shell py-14">
          <p className="micro-label text-[var(--orange)]">ADD-ON SERVICES — OPTIONAL, BOOK AS NEEDED</p>
          <h2 className="headline mt-3 text-4xl leading-none md:text-5xl">
            WIN THE JOBS JOBFILTER FINDS.
          </h2>
          <p className="mt-4 max-w-2xl copy">
            JobFilter puts serious jobs in front of you. These services help you close them — human-staffed teams, submit a job, get a deliverable back. Not subscription bloat. All three are open now.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Link href="/vantage" className="jf-box bg-[var(--bg-main)] p-6 block hover:bg-white transition-colors">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <FileText size={24} strokeWidth={3} className="text-[var(--orange)]" />
                  <p className="micro-label text-[var(--orange)]">VANTAGE</p>
                </div>
                <span className="border border-[var(--green)] px-1.5 py-0.5 text-[10px] font-black uppercase text-[var(--green)]">Open now</span>
              </div>
              <h3 className="headline mt-3 text-2xl">Tender → bid deck in 6h</h3>
              <p className="mt-2 text-sm font-bold text-[var(--muted)]">PQQs, ITTs and big-quote paperwork turned into a deck that makes you look like the £5M firm. Forward-looking.</p>
              <span className="mt-4 inline-block text-sm font-black uppercase text-[var(--ink)]">Open Vantage →</span>
            </Link>
            <Link href="/vicinity" className="jf-box bg-[var(--bg-main)] p-6 block hover:bg-white transition-colors">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Megaphone size={24} strokeWidth={3} className="text-[var(--orange)]" />
                  <p className="micro-label text-[var(--orange)]">VICINITY</p>
                </div>
                <span className="border border-[var(--green)] px-1.5 py-0.5 text-[10px] font-black uppercase text-[var(--green)]">Open now</span>
              </div>
              <h3 className="headline mt-3 text-2xl">Job photos → local ads</h3>
              <p className="mt-2 text-sm font-bold text-[var(--muted)]">Finished jobs turned into WhatsApp posts, leaflets, and door-drops aimed only at houses with live signals.</p>
              <span className="mt-4 inline-block text-sm font-black uppercase text-[var(--ink)]">Open Vicinity →</span>
            </Link>
            <Link href="/codex" className="jf-box bg-[var(--bg-main)] p-6 block hover:bg-white transition-colors">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <BookOpen size={24} strokeWidth={3} className="text-[var(--orange)]" />
                  <p className="micro-label text-[var(--orange)]">CODEX</p>
                </div>
                <span className="border border-[var(--green)] px-1.5 py-0.5 text-[10px] font-black uppercase text-[var(--green)]">Open now</span>
              </div>
              <h3 className="headline mt-3 text-2xl">Manuals → sales sheets</h3>
              <p className="mt-2 text-sm font-bold text-[var(--muted)]">Send dense product specs or schematics. Get back a plain-English one-pager a homeowner or procurement team will actually read.</p>
              <span className="mt-4 inline-block text-sm font-black uppercase text-[var(--ink)]">Open Codex →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ──────────────────────────────── */}
      <section className="border-b-2 border-[var(--line)] bg-[var(--paper)]">
        <div className="page-shell py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src="/union-flag.svg" alt="" className="h-6 w-6 border border-[var(--line)]" aria-hidden="true" />
              <p className="text-sm font-black uppercase text-[var(--ink)]">Built in Birmingham — not a London startup guessing how trades work</p>
            </div>
            <div className="flex flex-wrap gap-4 text-xs font-black uppercase text-[var(--muted)]">
              <span>✓ WhatsApp-first</span>
              <span>✓ No shared leads</span>
              <span>✓ 30-day money-back</span>
            </div>
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
              ONE TRADE.<br />ONE PATCH.<br />NO SHARING.
            </h2>
            <p className="mt-3 text-lg font-bold text-white/70 max-w-lg">Not a directory. Not an auction. Gold leads scored by trade, patch, and timing — sent to you, not four other trades bidding on the same job.</p>
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
            <p className="mt-4 text-base font-bold text-[var(--muted)]">
              No shared auction. No five-trade blast. Scored leads hit your WhatsApp before the job goes public.
            </p>
            <Link href="/territories" className="jf-button mt-5 block text-center bg-[var(--yellow)] text-[var(--ink)]">
              CHECK MY PATCH →
            </Link>
            <div className="mt-4 border-2 border-[var(--green)]/50 bg-[var(--green)]/10 px-4 py-3 text-sm font-black text-[var(--green)] text-center">
              ✓ 30-DAY MONEY-BACK GUARANTEE — No job worth chasing? Full refund.
            </div>
            <p className="mt-3 text-center text-xs font-black uppercase tracking-wider text-[var(--muted)]">
              Not ready yet? Drop your email below.
            </p>
            <WaitlistForm source="home-tactical-2026-05-09" />
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
