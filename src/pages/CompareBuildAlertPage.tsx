import { useState } from 'react';
import { Link } from 'react-router-dom';

const comparison = [
  { feature: 'Planning applications', buildalert: 'Yes', jobfilter: 'Yes — scored & filtered', jf: true },
  { feature: 'EPC retrofit signals', buildalert: 'No', jobfilter: 'Yes — F/G rated properties', jf: true },
  { feature: 'Council contracts', buildalert: 'No', jobfilter: 'Yes — buyer named, value shown', jf: true },
  { feature: 'Property sales data', buildalert: 'No', jobfilter: 'Yes — Land Registry signals', jf: true },
  { feature: 'New business registrations', buildalert: 'No', jobfilter: 'Yes — Companies House data', jf: true },
  { feature: 'GOLD / SILVER / BIN scoring', buildalert: 'No', jobfilter: 'Yes — chase only what pays', jf: true },
  { feature: 'WhatsApp alerts', buildalert: 'No', jobfilter: 'Yes — within minutes', jf: true },
  { feature: 'Letter delivery', buildalert: 'Yes — £2 per letter', jobfilter: 'No — instant digital delivery', jf: false },
  { feature: 'Exclusive leads', buildalert: 'Yes — planning access', jobfilter: 'Yes — no one sees your scan', jf: true },
  { feature: 'Delivery speed', buildalert: 'Days — mail cycle + browse', jobfilter: 'Minutes — pushed to your phone', jf: true },
  { feature: 'Signals per scan', buildalert: '1 — planning only', jobfilter: '5 — planning, EPC, contracts, sales, businesses', jf: true },
  { feature: 'Pricing model', buildalert: '£2 per letter — pay per action', jobfilter: '£39/mo — unlimited everything', jf: true },
  { feature: 'Per-action cost', buildalert: 'Yes — every letter costs', jobfilter: 'No — scan as much as you want', jf: true },
  { feature: 'Subscription lock-in', buildalert: 'No — pay as you go', jobfilter: 'No — cancel anytime', jf: false },
  { feature: 'Council coverage', buildalert: '400+ planning authorities', jobfilter: 'All UK councils — all 5 signals', jf: true },
  { feature: 'Data freshness', buildalert: 'Mail cycle delay', jobfilter: 'Real-time scanning', jf: true },
  { feature: 'Free tier', buildalert: 'No', jobfilter: 'Yes — preview leads, no card', jf: true },
];

const signals = [
  ['Planning data', 'Approved applications before they hit any directory. BuildAlert does this too.'],
  ['EPC signals', 'F/G rated properties legally need retrofit work. BuildAlert does not cover this.'],
  ['Council contracts', 'Public tenders with buyer names and values. Not in BuildAlert.'],
  ['Property sales', 'Land Registry data showing who just bought and needs work. BuildAlert misses this.'],
  ['New businesses', 'Companies House registrations needing fit-out. Another signal BuildAlert does not have.'],
];

const quotes = [
  {
    quote: "I was spending £40 a month on BuildAlert letters. JobFilter gives me unlimited for £29. The maths is simple.",
    role: "Builder, West Midlands",
  },
  {
    quote: "BuildAlert makes me log in and browse through applications. JobFilter WhatsApps me before I even know to look.",
    role: "Electrician, Manchester",
  },
  {
    quote: "The scoring is what sold me. BuildAlert throws everything at me and I have to sort it myself. JobFilter tells me which ones are worth my time.",
    role: "Plumber, Bristol",
  },
  {
    quote: "By the time a BuildAlert letter lands, someone with WhatsApp has already quoted. Speed wins. Every time.",
    role: "Roofer, Leeds",
  },
];

export function CompareBuildAlertPage() {
  const [jobsPerMonth, setJobsPerMonth] = useState(15);

  const buildAlertCost = jobsPerMonth * 2;
  const jobFilterCost = 39;
  const savings = buildAlertCost - jobFilterCost;
  const breakEven = 15;

  return (
    <main className="pb-8">
      {/* ── HERO ─────────────────────────────────────── */}
      <section className="bg-[var(--yellow)] soft-grid border-b-4 border-[var(--line)]">
        <div className="page-shell section-pad">
          <span
            style={{
              display: 'block',
              marginBottom: 14,
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
            }}
          >
            JOBFILTER vs BUILDALERT
          </span>
          <h1
            className="headline"
            style={{ fontSize: 'clamp(40px, 7vw, 88px)', lineHeight: 0.96, color: 'var(--navy)' }}
          >
            BuildAlert sends{' '}
            <span
              style={{
                background: 'var(--navy)',
                color: 'var(--yellow)',
                display: 'inline-block',
                padding: '0 12px 4px',
                lineHeight: 1.05,
              }}
            >
              letters.
            </span>{' '}
            JobFilter sends{' '}
            <span
              style={{
                background: 'var(--navy)',
                color: 'var(--yellow)',
                display: 'inline-block',
                padding: '0 12px 4px',
                lineHeight: 1.05,
              }}
            >
              jobs.
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-xl font-black leading-tight text-[var(--ink)]/80">
            BuildAlert mails you planning applications. JobFilter scans five data sources, scores them, and fires Gold leads to your WhatsApp before the letter even lands.
          </p>

          {/* Visual comparison: Letter vs WhatsApp */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="jf-box bg-white p-5">
              <p className="micro-label text-[var(--orange)]">BUILDALERT</p>
              <div className="mt-3 flex items-start gap-3">
                <span className="text-3xl">✉️</span>
                <div>
                  <p className="font-black text-[var(--navy)]">Physical letter through your door</p>
                  <p className="mt-1 font-black text-[var(--muted)] text-sm">2-3 days delivery. Then you browse the portal. Then you decide.</p>
                </div>
              </div>
              <div className="mt-4 jf-box bg-[var(--bg-main)] p-3">
                <p className="font-black text-[var(--navy)] text-sm">£2 per letter × 10 jobs = <span className="text-[var(--orange)]">£20</span></p>
                <p className="font-black text-[var(--muted)] text-xs mt-1">And that's before you've quoted a single job.</p>
              </div>
            </div>
            <div className="jf-box bg-[var(--navy)] p-5 text-white">
              <p className="micro-label text-[var(--yellow)]">JOBFILTER</p>
              <div className="mt-3 flex items-start gap-3">
                <span className="text-3xl">💬</span>
                <div>
                  <p className="font-black text-[var(--yellow)]">WhatsApp alert on your phone</p>
                  <p className="mt-1 font-black text-white/70 text-sm">Within minutes. Scored. Buyer named. Value shown. One tap to act.</p>
                </div>
              </div>
              <div className="mt-4 jf-box bg-white/10 p-3">
                <p className="font-black text-[var(--yellow)] text-sm">£39/month × unlimited jobs = <span className="text-[var(--green)]">£39</span></p>
                <p className="font-black text-white/50 text-xs mt-1">One price. Every signal. No per-action cost. Ever.</p>
              </div>
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link className="jf-button bg-[var(--ink)] text-white" to="/find-jobs">TRY JOBFILTER FREE — SEE WHAT BUILDALERT DOESN'T SHOW YOU</Link>
            <Link className="jf-button bg-white text-[var(--ink)]" to="#calculator">SEE THE COST COMPARISON</Link>
          </div>
          <div className="mt-7 grid gap-2 text-sm font-black text-[var(--ink)] sm:grid-cols-2">
            <p>NO CHASING</p>
            <p>NO COMPETING</p>
            <p>REAL UK LEADS</p>
            <p>STAY IN CONTROL</p>
          </div>
        </div>
      </section>

      {/* ── COST CALCULATOR ──────────────────────────── */}
      <section id="calculator" className="bg-white border-y-4 border-[var(--line)]">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--orange)]">DO THE MATHS</p>
          <h2 className="headline mt-3 max-w-4xl text-4xl leading-[0.9] sm:text-6xl">HOW MANY JOBS DO YOU CHASE PER MONTH?</h2>
          <p className="mt-5 max-w-2xl text-xl font-black text-[var(--muted)]">
            Move the slider. See what it actually costs to find work with each platform.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {/* Slider */}
            <div className="jf-box bg-[var(--bg-main)] p-6">
              <label className="micro-label text-[var(--navy)]" htmlFor="jobs-slider">
                Jobs you chase per month: <span className="text-2xl text-[var(--yellow)] bg-[var(--navy)] px-2 py-0.5">{jobsPerMonth}</span>
              </label>
              <input
                id="jobs-slider"
                type="range"
                min={1}
                max={50}
                value={jobsPerMonth}
                onChange={(e) => setJobsPerMonth(Number(e.target.value))}
                className="mt-4 w-full h-3 bg-[var(--navy)] rounded-full appearance-none cursor-pointer accent-[var(--yellow)]"
              />
              <div className="mt-2 flex justify-between text-xs font-black text-[var(--muted)]">
                <span>1</span>
                <span>25</span>
                <span>50</span>
              </div>

              <div className="mt-6 jf-box bg-[var(--yellow)] p-4">
                <p className="font-black text-[var(--navy)] text-sm">
                  BREAK-EVEN: {breakEven} jobs/month
                </p>
                <p className="mt-1 font-black text-[var(--navy)]/70 text-sm">
                  Chase {breakEven}+ jobs a month and JobFilter is cheaper. Most trades chase more.
                </p>
              </div>
            </div>

            {/* Cost comparison */}
            <div className="grid gap-4">
              <div className="jf-box bg-white p-6">
                <p className="micro-label text-[var(--muted)]">BUILDALERT COST</p>
                <p className="mt-2 headline text-5xl text-[var(--navy)]">£{buildAlertCost}<span className="text-2xl text-[var(--muted)]">/mo</span></p>
                <p className="mt-1 font-black text-[var(--muted)] text-sm">
                  {jobsPerMonth} jobs × £2 per letter
                </p>
                {jobsPerMonth > breakEven && (
                  <p className="mt-2 font-black text-[var(--orange)] text-sm">
                    You're paying £{savings} more than JobFilter for less.
                  </p>
                )}
                {jobsPerMonth <= breakEven && (
                  <p className="mt-2 font-black text-[var(--muted)] text-sm">
                    Cheaper at this volume — but you only get planning data.
                  </p>
                )}
              </div>
              <div className="jf-box bg-[var(--navy)] p-6 text-white">
                <p className="micro-label text-[var(--yellow)]">JOBFILTER COST</p>
                <p className="mt-2 headline text-5xl text-[var(--yellow)]">£{jobFilterCost}<span className="text-2xl text-[var(--yellow)]/60">/mo</span></p>
                <p className="mt-1 font-black text-white/70 text-sm">
                  Unlimited scans. All 5 signals. WhatsApp alerts.
                </p>
                {jobsPerMonth > breakEven && (
                  <p className="mt-2 font-black text-[var(--green)] text-sm">
                    You save £{savings}/mo vs BuildAlert. That's £{savings * 12}/yr back in your pocket.
                  </p>
                )}
                {jobsPerMonth <= breakEven && (
                  <p className="mt-2 font-black text-white/50 text-sm">
                    Slightly more at this volume — but you get 5 signals, scoring, and WhatsApp.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HONEST TAKE ──────────────────────────────── */}
      <section className="bg-white">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--orange)]">HONEST TAKE</p>
          <h2 className="headline mt-3 max-w-4xl text-4xl leading-[0.9] sm:text-6xl md:text-7xl">BUILDALERT ISN'T BAD. IT'S JUST NOT ENOUGH.</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="jf-box bg-[var(--bg-main)] p-6">
              <h3 className="headline text-xl text-[var(--navy)]">WHAT BUILDALERT DOES WELL</h3>
              <ul className="mt-3 grid gap-3 font-black text-[var(--muted)]">
                <li>Planning application alerts delivered to your door</li>
                <li>Simple model — £2 per letter, no subscription</li>
                <li>Covers 400+ UK planning authorities</li>
                <li>Physical letter is a clever direct mail play</li>
                <li>No lock-in — pay only when you want a letter</li>
              </ul>
              <p className="mt-4 font-black text-[var(--muted)] leading-relaxed">
                If you only want planning applications mailed to you, BuildAlert does that fine. The letter model is clever for direct mail.
              </p>
            </div>
            <div className="jf-box bg-[var(--yellow)] p-6">
              <h3 className="headline text-xl text-[var(--ink)]">THE PROBLEM</h3>
              <ul className="mt-3 grid gap-3 font-black text-[var(--ink)]/85">
                <li>A well-written letter sent a day late still loses to whoever turned up first</li>
                <li>No EPC signals — misses F/G retrofit demand</li>
                <li>No council contracts — buyer names and values hidden</li>
                <li>No scoring — every application looks the same</li>
                <li>No WhatsApp — letters take days, jobs move in hours</li>
                <li>No property sales or business registration data</li>
                <li>£2/letter adds up fast if you're scanning multiple areas</li>
              </ul>
              <p className="mt-4 font-black text-[var(--ink)] leading-relaxed">
                Speed beats copy. The builder who turns up first gets the job — not the one with the nicest letter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FIRST MOVER ADVANTAGE ────────────────────── */}
      <section className="border-y-4 border-[var(--line)] bg-[var(--navy)] text-white">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--yellow)]">FIRST MOVER ADVANTAGE</p>
          <h2 className="headline mt-3 max-w-4xl text-4xl leading-[0.9] sm:text-6xl md:text-7xl text-[var(--yellow)]">
            THE BUILDER WHO TURNS UP FIRST GETS THE JOB.
          </h2>
          <p className="mt-5 max-w-2xl text-xl font-black text-white/80">
            Industry data shows 70% of jobs go to the first person to quote. Not the cheapest. The first. BuildAlert mails you a letter. By the time it arrives, someone with WhatsApp already won the job.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="jf-box bg-white/10 p-6">
              <p className="text-xs font-black uppercase text-[var(--green)]">WITH JOBFILTER — MINUTES</p>
              <div className="mt-4 grid gap-3 font-black text-white/85">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 font-bold text-[var(--green)]">08:14</span>
                  <span>Signal detected — planning, EPC, or contract</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 font-bold text-[var(--green)]">08:16</span>
                  <span>GOLD alert fires to your WhatsApp</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 font-bold text-[var(--green)]">08:20</span>
                  <span>You see buyer, value, urgency. Make the call.</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 font-bold text-[var(--green)]">09:00</span>
                  <span>First to quote. You set the price. Job won.</span>
                </div>
              </div>
            </div>
            <div className="jf-box bg-white/10 p-6">
              <p className="text-xs font-black uppercase text-[var(--orange)]">WITH BUILDALERT — DAYS</p>
              <div className="mt-4 grid gap-3 font-black text-white/85">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 font-bold text-[var(--orange)]">Day 1</span>
                  <span>Planning application approved</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 font-bold text-[var(--orange)]">Day 2-3</span>
                  <span>BuildAlert processes and posts your letter</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 font-bold text-[var(--orange)]">Day 4-5</span>
                  <span>Letter arrives. You browse the planning portal.</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 font-bold text-[var(--orange)]">Day 6+</span>
                  <span>Someone with faster alerts already quoted and won.</span>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-6 text-sm font-black text-white/50">
            Speed wins. Letters don't win. WhatsApp does.
          </p>
        </div>
      </section>

      {/* ── COMPARISON TABLE ─────────────────────────── */}
      <section id="comparison" className="border-y-4 border-[var(--line)] bg-[var(--bg-main)]">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--orange)]">BUILDALERT vs JOBFILTER</p>
          <h2 className="headline mt-3 max-w-4xl text-4xl leading-[0.9] sm:text-6xl">SAME TRADE. MORE SIGNALS. SMARTER DELIVERY.</h2>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse text-sm font-black">
              <thead>
                <tr className="bg-[var(--navy)] text-white">
                  <th className="px-4 py-3 text-left">Feature</th>
                  <th className="px-4 py-3 text-left text-white/60">BuildAlert</th>
                  <th className="px-4 py-3 text-left text-[var(--yellow)]">JobFilter</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? 'bg-white' : 'bg-[var(--bg-main)]'}>
                    <td className="border-b-2 border-[var(--line)] px-4 py-3 text-[var(--navy)]">{row.feature}</td>
                    <td className="border-b-2 border-[var(--line)] px-4 py-3 text-[var(--muted)]">{row.buildalert}</td>
                    <td className={`border-b-2 border-[var(--line)] px-4 py-3 ${row.jf ? 'text-[var(--green)]' : 'text-[var(--muted)]'}`}>
                      {row.jf && <span className="mr-1">✓</span>}
                      {!row.jf && <span className="mr-1">—</span>}
                      {row.jobfilter}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link className="jf-button bg-[var(--ink)] text-white" to="/find-jobs">SCAN YOUR AREA FREE</Link>
            <Link className="jf-button bg-[var(--yellow)] text-[var(--ink)]" to="/pricing">SEE PRICING</Link>
          </div>
        </div>
      </section>

      {/* ── FIVE SIGNALS ─────────────────────────────── */}
      <section className="bg-[var(--yellow)] border-y-4 border-[var(--line)]">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--ink)]">INTELLIGENCE ENGINE</p>
          <h2 className="headline mt-3 max-w-4xl text-4xl leading-[0.9] sm:text-6xl md:text-7xl">FIVE SIGNALS. ONE SCAN. BEFORE ANYONE ELSE KNOWS.</h2>
          <p className="mt-5 max-w-2xl text-xl font-black text-[var(--ink)]/75">
            BuildAlert shows you planning applications. JobFilter shows you planning plus four more sources that tell you work is coming — and scores them so you know which ones to chase.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {signals.map(([title, body]) => (
              <div key={title} className="jf-box bg-white p-5">
                <h3 className="headline text-2xl text-[var(--navy)]">{title}</h3>
                <p className="mt-2 font-black text-[var(--muted)]">{body}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Link className="jf-button bg-[var(--ink)] text-white" to="/signals">SEE THE SIGNALS IN DETAIL</Link>
          </div>
        </div>
      </section>

      {/* ── SCORING ──────────────────────────────────── */}
      <section className="bg-white">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--orange)]">THE DIFFERENCE</p>
          <h2 className="headline mt-3 max-w-4xl text-4xl leading-[0.9] sm:text-6xl">BUILDALERT GIVES YOU DATA. WE GIVE YOU JUDGEMENT.</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="jf-box bg-[var(--yellow)] p-6">
              <p className="micro-label text-[var(--ink)]">GOLD</p>
              <h3 className="headline mt-2 text-3xl text-[var(--navy)]">WORTH CHASING</h3>
              <p className="mt-3 font-black text-[var(--ink)]/80">
                High value, real urgency, official source confirmed. Drop everything for this one.
              </p>
            </div>
            <div className="jf-box bg-white p-6">
              <p className="micro-label text-[var(--muted)]">SILVER</p>
              <h3 className="headline mt-2 text-3xl text-[var(--navy)]">WORTH WATCHING</h3>
              <p className="mt-3 font-black text-[var(--muted)]">
                Good signal but timing is unclear. Keep it on your radar.
              </p>
            </div>
            <div className="jf-box bg-[var(--bg-main)] p-6">
              <p className="micro-label text-[var(--orange)]">BIN</p>
              <h3 className="headline mt-2 text-3xl text-[var(--navy)]">SKIP IT</h3>
              <p className="mt-3 font-black text-[var(--muted)]">
                Low value, no urgency, or too much competition. Don't waste your fuel.
              </p>
            </div>
          </div>
          <p className="mt-6 font-black text-[var(--muted)]">
            BuildAlert mails you every planning application in your area and lets you figure out which matter. We score them so you know in seconds.
          </p>
        </div>
      </section>

      {/* ── REAL TRADES ──────────────────────────────── */}
      <section className="border-y-4 border-[var(--line)] bg-[var(--bg-main)]">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--orange)]">WHAT TRADES SAY</p>
          <h2 className="headline mt-3 max-w-4xl text-4xl leading-[0.9] sm:text-6xl">TRADES WHO'VE SEEN BOTH SIDES.</h2>
          <p className="mt-5 max-w-2xl text-xl font-black text-[var(--muted)]">
            We didn't pay for these. They're what trades tell us when they compare the two.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {quotes.map((q, i) => (
              <div key={i} className="jf-box bg-white p-6">
                <p className="font-black text-[var(--navy)] text-lg leading-snug">"{q.quote}"</p>
                <p className="mt-4 font-black text-[var(--muted)] text-sm">— {q.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHATSAPP DELIVERY ────────────────────────── */}
      <section className="border-y-4 border-[var(--line)] bg-[var(--ink)] text-white">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--yellow)]">WHATSAPP BODYGUARD</p>
          <h2 className="headline mt-3 max-w-4xl text-4xl leading-[0.9] sm:text-6xl md:text-7xl text-[var(--yellow)]">
            LETTERS TAKE DAYS. WHATSAPP TAKES SECONDS.
          </h2>
          <p className="mt-5 max-w-2xl text-xl font-black text-white/80">
            BuildAlert sends physical letters. By the time yours arrives, the job might already be gone. JobFilter scores the lead and fires it to your WhatsApp within minutes of detection.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ['98% open rate', 'Not email. Not an app. WhatsApp — where you already work.'],
              ['Within minutes', 'Gold leads fire instantly. Not batched. Not delayed.'],
              ['One-tap action', 'Lead arrives. Tap. You\'re on it. No dashboards to hunt through.'],
            ].map(([title, body]) => (
              <div key={title} className="jf-box bg-white/10 p-5">
                <h3 className="headline text-2xl text-[var(--yellow)]">{title}</h3>
                <p className="mt-2 font-black text-white/75">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────── */}
      <section className="bg-[var(--yellow)] border-y-4 border-[var(--line)]">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--ink)]">FOUNDING 30</p>
          <h2 className="headline mt-3 max-w-4xl text-4xl leading-[0.9] sm:text-6xl md:text-7xl">£39/mo UNLIMITED. VS £2 PER LETTER.</h2>
          <p className="mt-5 max-w-2xl text-xl font-black text-[var(--ink)]/75">
            BuildAlert charges £2 per letter. Scan 20 areas? That's £40. JobFilter is £39/month for unlimited scans across all five signals. One job covers it.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="jf-box bg-white p-6">
              <h3 className="headline text-xl text-[var(--navy)]">FREE</h3>
              <p className="mt-2 font-black text-[var(--muted)]">See the signals. Know what's out there. No card needed.</p>
              <p className="mt-3 text-sm font-black text-[var(--muted)]">Preview leads only</p>
            </div>
            <div className="jf-box bg-[var(--navy)] p-6 text-white">
              <p className="micro-label text-[var(--yellow)]">FOUNDING 30</p>
              <h3 className="headline mt-2 text-3xl text-[var(--yellow)]">£39/mo</h3>
              <p className="mt-1 text-sm font-black text-[var(--yellow)]/70">(£39/mo — locked forever)</p>
              <p className="mt-2 font-black text-white/80">Full access. WhatsApp alerts. Source links. Locked price forever.</p>
              <ul className="mt-4 grid gap-2 text-sm font-black text-white/70">
                <li>Full lead details unlocked</li>
                <li>WhatsApp gold alerts</li>
                <li>Official source proof links</li>
                <li>Buyer names & deadlines</li>
                <li>Price locked — never rises</li>
              </ul>
              <Link className="jf-button mt-5 bg-[var(--yellow)] text-[var(--ink)]" to="/pricing">GET FOUNDING 30</Link>
            </div>
            <div className="jf-box bg-white p-6">
              <h3 className="headline text-xl text-[var(--navy)]">PRO — £79/mo</h3>
              <p className="mt-2 font-black text-[var(--muted)]">Everything in Founding 30 plus Letterhead Pack and multi-trade scanning.</p>
              <p className="mt-3 text-sm font-black text-[var(--muted)]">For growing businesses</p>
            </div>
          </div>
          <p className="mt-6 font-black text-[var(--ink)]/60">
            30-DAY MONEY-BACK GUARANTEE. NO QUIBBLES. NO HOOPS.
          </p>
        </div>
      </section>

      {/* ── WHAT YOU GET ─────────────────────────────── */}
      <section className="bg-white">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--orange)]">WHAT YOU GET</p>
          <h2 className="headline mt-3 max-w-4xl text-4xl leading-[0.9] sm:text-6xl">ONE JOB PAYS FOR THE MONTH. EVERYTHING AFTER IS PROFIT.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              ['Exclusive scans', 'No one else sees your results. Not shared. Not resold.'],
              ['Official sources only', 'Planning portals, contracts finders, EPC registers. Not forms. Not ads.'],
              ['No per-action cost', 'Scan as much as you want. One price. No credit packs. No per-letter fees.'],
              ['Built for trades', 'Made in Birmingham. For people who work with their hands.'],
              ['Cancel anytime', 'No contracts. No lock-in. Leave if it doesn\'t work for you.'],
              ['30-day guarantee', 'Try it. If it doesn\'t pay for itself, we refund. No questions.'],
            ].map(([title, body]) => (
              <div key={title} className="jf-box bg-[var(--bg-main)] p-5">
                <h3 className="headline text-xl text-[var(--navy)]">{title}</h3>
                <p className="mt-2 font-black text-[var(--muted)]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────── */}
      <section className="bg-[var(--navy)] text-white">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--yellow)]">ENTER THE INTAKE</p>
          <h2 className="headline mt-3 max-w-4xl text-4xl leading-[0.9] sm:text-6xl md:text-7xl text-white">
            BUILDALERT SHOWS YOU{' '}
            <span style={{ color: 'var(--yellow)' }}>WHAT'S PLANNED.</span>{' '}
            WE SHOW YOU WHAT'S WORTH CHASING.
          </h2>
          <p className="mt-5 max-w-2xl text-xl font-black text-white/70">
            Scan your area free. See what work is active near you — including the signals BuildAlert doesn't cover. No card needed. No signup wall. Just results.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link className="jf-button bg-[var(--yellow)] text-[var(--ink)]" to="/find-jobs">SCAN MY AREA FREE</Link>
            <Link className="jf-button bg-white text-[var(--ink)]" to="/pricing">GET FOUNDING 30 — £39/mo</Link>
          </div>
          <p className="mt-6 text-sm font-black text-white/50">
            BUILT FOR TRADES. NO CONTRACTS. FAIR SYSTEM.
          </p>
        </div>
      </section>
    </main>
  );
}



