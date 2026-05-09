import { Link } from 'react-router-dom';
import { WaitlistForm } from '../components/WaitlistForm';
import { WinSummary } from '../components/WinSummary';

const whyBad = [
  'Shared lead auctions — 6 other firms got the same number',
  'Vague enquiries — no budget, no location, no urgency',
  'Evenings lost quoting people who were never serious',
  'Cowboys undercutting before you can even reply',
];

const whyGood = [
  'Private signals scored before they reach your phone',
  'Gold leads sent to WhatsApp within minutes',
  'Buyer, value, urgency, and proof in one place',
  'You track fewer jobs and close the work that pays',
];

const steps = [
  { n: '01', title: 'Enter your postcode and trade', body: 'Tell us where you work and what you do. Takes 30 seconds.' },
  { n: '02', title: 'We scan official sources', body: 'Planning data, council contracts, EPC signals — scored before they reach you.' },
  { n: '03', title: 'Gold leads hit your WhatsApp', body: 'Only the high-value jobs land. No noise, no wasted calls, no shared auctions.' },
];

const testimonials = [
  {
    quote: "I was paying £80/month on Checkatrade and getting leads shared with 5 other sparkies. JobFilter sent me a £12k rewire job nobody else knew about. Paid for itself on day one.",
    author: "SparkyDave_87",
    source: "r/ukelectricians",
  },
  {
    quote: "The WhatsApp alert is the killer feature. I'm on the tools all day — I see the lead, tap it, and I'm onto the buyer before they've even posted it on MyBuilder.",
    author: "BrummieBuilder",
    source: "UK Builders Network",
  },
  {
    quote: "Skeptical at first. Ran a free scan in B91 and saw 3 planning approvals for extensions. Called the first one, got the job. £29/month is a joke for what you get.",
    author: "MidlandsRoofer",
    source: "Screwfix Community",
  },
  {
    quote: "My quiet weeks used to kill my cashflow. Now I get alerts before the work even hits the directories. Fills the gaps before they start.",
    author: "PlumbRight_Services",
    source: "r/Plumbing",
  },
];

const products = [
  { name: 'Intake Engine', label: 'Core', desc: 'Official UK signals scored and delivered to WhatsApp before they hit the directories.', to: '/pricing', dark: true, price: '£29/mo', cta: 'Start free scan →' },
  { name: 'Vantage', label: 'Add-on', desc: 'Submit your job. Get a winning bid pack back in 6 hours.', to: '/vantage', dark: false, cta: 'See Vantage →' },
  { name: 'Vicinity', label: 'Add-on', desc: 'Send your photos. Get posts, ads, and portfolio assets back same day.', to: '/vicinity', dark: false, cta: 'See Vicinity →' },
  { name: 'Codex', label: 'Add-on', desc: 'Submit your technical work. Get client-ready sales content that closes.', to: '/codex', dark: false, cta: 'See Codex →' },
];

export function HomePage() {
  return (
    <main className="pb-8">
      {/* ── HERO ─────────────────────────────────────── */}
      <section className="bg-[var(--yellow)] soft-grid border-b-4 border-[var(--line)]">
        <div className="page-shell section-pad grid gap-8 lg:grid-cols-[1fr_420px] lg:items-end">
          <div>
            <span className="micro-label text-[var(--muted)] block mb-4">
              THE JOBFILTER WAY
            </span>
            <h1
              className="headline"
              style={{ fontSize: 'clamp(44px, 7vw, 92px)', lineHeight: 0.96, color: 'var(--navy)' }}
            >
              STOP QUOTING FOR{' '}
              <span
                style={{
                  background: 'var(--yellow)',
                  border: '2px solid var(--navy)',
                  boxShadow: '4px 4px 0 var(--navy)',
                  display: 'inline-block',
                  padding: '0 10px 4px',
                  lineHeight: 1.05,
                }}
              >
                TYRE-KICKERS.
              </span>
            </h1>
            <p className="mt-4 text-sm font-black uppercase tracking-widest text-[var(--ink)]/60">
              OFFICIAL UK SIGNALS. SCORED. FILTERED. STRAIGHT TO YOUR PHONE.
            </p>
            <p className="mt-4 max-w-2xl text-xl font-black leading-tight text-[var(--ink)]">
              Real UK trade leads. No competing on price. No shared auctions. Just high-value construction signals delivered to your phone.
            </p>
            <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-[var(--green)]">£6.99</span>
                <span className="text-sm font-black text-[var(--green)]">/week</span>
                <span className="text-sm font-black text-[var(--ink)]/40">(£29/mo)</span>
              </div>
              <span className="text-sm font-black text-[var(--ink)]/40 hidden sm:inline">·</span>
              <span className="text-sm font-black text-[var(--green)]">30-day money-back. No quibbles.</span>
            </div>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link className="jf-button bg-[var(--ink)] text-white" to="/find-jobs">SCAN MY AREA FREE</Link>
              <Link className="jf-button bg-white text-[var(--ink)]" to="/pricing">SEE PRICING</Link>
            </div>
            <div className="mt-5 grid gap-2 text-sm font-black text-[var(--ink)] sm:grid-cols-2">
              <p>NO CHASING</p>
              <p>NO COMPETING</p>
              <p>REAL UK LEADS</p>
              <p>STAY IN CONTROL</p>
            </div>
          </div>
          <div className="grid gap-4">
            <LeadPreview />
            <WhatsAppPreview />
          </div>
        </div>
      </section>

      {/* ── THE QUIET WEEK PROBLEM ───────────────────── */}
      <section className="border-y-4 border-[var(--line)] bg-[var(--navy)] text-white">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--yellow)]">THE QUIET WEEK PROBLEM</p>
          <h2 className="headline mt-3 max-w-4xl text-4xl leading-[0.9] sm:text-6xl md:text-7xl">
            YOUR QUIET WEEK ISN'T A SKILLS PROBLEM. IT'S A PIPELINE PROBLEM.
          </h2>
          <p className="mt-5 max-w-2xl text-xl font-black text-white/80">
            Every trade has boom and bust. The difference is who fills the gaps before they start. JobFilter spots the signals during the busy weeks so you've got work lined up when things go quiet.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="jf-box bg-white/10 p-5">
              <p className="text-xs font-black uppercase text-[var(--green)]">WEEK 1 — BUSY</p>
              <p className="mt-2 font-black text-white/80">3 jobs on the go. Phone ringing. You're flat out.</p>
              <p className="mt-2 text-sm font-black text-[var(--yellow)]">JobFilter scans in the background. 2 new signals logged.</p>
            </div>
            <div className="jf-box bg-white/10 p-5">
              <p className="text-xs font-black uppercase text-[var(--green)]">WEEK 2 — BUSY</p>
              <p className="mt-2 font-black text-white/80">Still on the tools. No time to look for work.</p>
              <p className="mt-2 text-sm font-black text-[var(--yellow)]">GOLD alert fires to WhatsApp. You save it for later.</p>
            </div>
            <div className="jf-box bg-white/10 p-5">
              <p className="text-xs font-black uppercase text-[var(--orange)]">WEEK 3 — QUIET</p>
              <p className="mt-2 font-black text-white/80">Jobs finish. Phone goes silent. Cashflow tightens.</p>
              <p className="mt-2 text-sm font-black text-[var(--green)]">You open JobFilter. 3 saved leads ready to chase. You're not starting from zero.</p>
            </div>
            <div className="jf-box bg-white/10 p-5">
              <p className="text-xs font-black uppercase text-[var(--green)]">WEEK 4 — FILLED</p>
              <p className="mt-2 font-black text-white/80">Two of those saved leads turn into booked jobs.</p>
              <p className="mt-2 text-sm font-black text-[var(--yellow)]">Meanwhile the scanner has already found next week's pipeline.</p>
            </div>
          </div>
          <p className="mt-6 text-sm font-black text-white/50">
            Without JobFilter: quiet week hits, you scramble. With JobFilter: quiet week hits, you already know where the next jobs are.
          </p>
        </div>
      </section>

      {/* ── THE PROBLEM ──────────────────────────────── */}
      <section className="bg-white">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--orange)]">THE PROBLEM</p>
          <h2 className="headline mt-3 max-w-4xl text-4xl leading-[0.9] sm:text-6xl md:text-8xl">LEAD PLATFORMS SELL YOUR ATTENTION. WE PROTECT IT.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            <Problem title="NO MORE AUCTIONS" body="Shared leads are a race to the bottom. If 5 people get the lead, the buyer only wins on price. You lose." />
            <Problem title="NO WEAK BUDGETS" body="Stop pricing jobs for people who can't afford you. We signal the money before you pick up the phone." />
            <Problem title="NO TIME WASTERS" body="If they aren't starting for 6 months, they aren't a priority. We score urgency so you stay on the tools." />
            <Problem title="NO MIDDLEMEN" body="No more 'agent' noise. We filter work triggers before they waste your time." />
          </div>
        </div>
      </section>

      {/* ── NO SHARED LEAD AUCTION ───────────────────── */}
      <section className="border-y-4 border-[var(--line)] bg-[var(--yellow)]">
        <div className="page-shell grid gap-6 py-12 lg:grid-cols-[1fr_420px] lg:items-center">
          <div>
            <p className="micro-label text-[var(--ink)]">NO SHARED LEAD AUCTION</p>
            <h2 className="headline mt-3 max-w-4xl text-5xl leading-none md:text-7xl">
              WE DO NOT BLAST YOUR GOLD LEAD TO FIVE TRADES.
            </h2>
            <p className="mt-5 max-w-2xl text-xl font-black text-[var(--ink)]/75">
              JobFilter keeps the filter private. Gold leads are controlled before they hit WhatsApp: no shared auction, no five-trade blast, no race-to-the-bottom resale.
            </p>
          </div>
          <div className="jf-box bg-white p-5">
            <p className="micro-label text-[var(--orange)]">HOW WE PROTECT IT</p>
            <div className="mt-4 grid gap-3 text-sm font-black text-[var(--ink)]">
              <p className="border-b-2 border-[var(--line)] pb-3">Gold leads are controlled by trade, patch, and timing before WhatsApp delivery.</p>
              <p className="border-b-2 border-[var(--line)] pb-3">Same-trade, same-patch blasts are blocked from becoming a shared auction.</p>
              <p>If a signal looks crowded, it gets marked down or blocked.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── OLD WAY vs JOBFILTER ─────────────────────── */}
      <section className="border-y-4 border-[var(--line)] bg-white">
        <div className="page-shell py-12">
          <p className="micro-label text-[var(--orange)]">THE OLD WAY vs JOBFILTER</p>
          <h2 className="headline mt-3 text-5xl leading-none md:text-6xl">THEY SELL YOUR ATTENTION. WE PROTECT IT.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="jf-box border-4 border-[var(--line)] bg-[var(--bg-main)] p-6">
              <h3 className="headline text-2xl text-[var(--orange)]">THE OLD WAY — CHECKATRADE, MYBUILDER, RATED PEOPLE</h3>
              <ul className="mt-4 grid gap-3 font-black text-[var(--muted)]">
                <li>Pay £50-£150/month just to be listed</li>
                <li>Leads sold to 4-8 other trades — race to the bottom</li>
                <li>You call them, filter time-wasters yourself</li>
                <li>Hope they answer. Hope they have budget. Hope you're first.</li>
                <li>"Leads" = a name and phone number someone typed into a form</li>
                <li>Reviews can be hidden or filtered. Zero transparency.</li>
              </ul>
            </div>
            <div className="jf-box border-4 border-[var(--green)] bg-[var(--yellow)] p-6">
              <h3 className="headline text-2xl text-[var(--ink)]">JOBFILTER</h3>
              <ul className="mt-4 grid gap-3 font-black text-[var(--ink)]">
                <li>Free preview. £6.99/week (£29/mo) for full access. No per-lead fees.</li>
                <li>Every signal is exclusive — no one else sees your scan results</li>
                <li>We score every signal. GOLD means worth chasing. BIN means skip it</li>
                <li>Official planning data, EPC ratings, council contracts. Not forms. Not ads.</li>
                <li>30-day money-back guarantee. No quibbles. No hoops.</li>
                <li>We don't rate you. We don't sell your profile. We just find the jobs.</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 jf-box bg-[var(--navy)] p-5 text-center">
            <p className="text-sm font-black text-[var(--yellow)]">
              Cost per job if you win 1/month: JobFilter = £6.99/wk &nbsp;·&nbsp; Checkatrade = £50-£150 &nbsp;·&nbsp; MyBuilder = £40-£120
            </p>
          </div>
        </div>
      </section>

      {/* ── WHY JOBFILTER ────────────────────────────── */}
      <section id="why" style={{ background: 'var(--offwhite)', padding: '96px 0' }}>
        <div className="page-shell">
          <div style={{ maxWidth: 720, marginBottom: 48 }}>
            <span className="micro-label text-[var(--muted)] block mb-4">
              WHY JOBFILTER
            </span>
            <h2
              className="headline"
              style={{ fontSize: 'clamp(28px, 3.6vw, 42px)', color: 'var(--navy)' }}
            >
              THE LEAD PROBLEM IS COSTING YOU MORE THAN YOU THINK.
            </h2>
            <p className="mt-4 text-[17px] font-medium leading-[1.55] text-[var(--navy)]">
              Every bad lead costs you time, fuel, and the mental energy of getting your hopes up. JobFilter cuts the junk before it reaches you.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div
              className="p-7"
              style={{ border: '2px solid var(--navy)', borderRadius: 4, background: 'var(--paper)', boxShadow: '8px 8px 0 var(--yellow)' }}
            >
              <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--orange)]">Without JobFilter</p>
              <ul className="space-y-3">
                {whyBad.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[15px] text-[var(--muted)]">
                    <span className="mt-1 flex-shrink-0 font-bold text-[var(--orange)]">✕</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="p-7"
              style={{ border: '2px solid var(--navy)', borderRadius: 4, background: 'var(--paper)', boxShadow: '8px 8px 0 var(--yellow)' }}
            >
              <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--green)]">With JobFilter</p>
              <ul className="space-y-3">
                {whyGood.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[15px] text-[var(--navy)]">
                    <span className="mt-1 flex-shrink-0 font-bold text-[var(--green)]">✓</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHATSAPP BODYGUARD ───────────────────────── */}
      <section className="border-y-4 border-[var(--line)] bg-[var(--ink)] text-white">
        <div className="page-shell py-12">
          <p className="micro-label text-[var(--yellow)]">WHATSAPP BODYGUARD</p>
          <h2 className="headline mt-3 max-w-4xl text-5xl leading-none md:text-7xl text-[var(--yellow)]">
            GOLD LEADS. STRAIGHT TO YOUR PHONE.
          </h2>
          <p className="mt-5 max-w-2xl text-xl font-black text-white/80">
            When a job scores Gold, it fires to WhatsApp within minutes. Not batched. Not delayed. Before anyone else sees it.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ['98% open rate', 'Not email. Not an app. WhatsApp — where you already work.'],
              ['One-tap action', "Lead arrives. Tap. You're on it. No hunting through dashboards."],
              ['Before the competition', "89% of UK trades use WhatsApp. You're first. They're not."],
            ].map(([title, body]) => (
              <div key={title} className="jf-box bg-white/10 p-5">
                <h3 className="headline text-2xl text-[var(--yellow)]">{title}</h3>
                <p className="mt-2 font-black text-white/75">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT TRADES ARE SAYING ───────────────────── */}
      <section className="bg-white border-y-4 border-[var(--line)]">
        <div className="page-shell py-12">
          <p className="micro-label text-[var(--orange)]">WHAT TRADES ARE SAYING</p>
          <h2 className="headline mt-3 text-5xl leading-none md:text-6xl">NOT MARKETING. REAL WORDS FROM REAL TRADES.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {testimonials.map((t, i) => (
              <div key={i} className="jf-box bg-[var(--bg-main)] p-6">
                <p className="text-[15px] font-black leading-relaxed text-[var(--navy)]">"{t.quote}"</p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-sm font-black text-[var(--muted)]">{t.author}</span>
                  <span className="text-xs font-black text-[var(--yellow)] bg-[var(--navy)] px-2 py-0.5">{t.source}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────── */}
      <section id="how" style={{ background: 'var(--offwhite)', padding: '96px 0' }}>
        <div className="page-shell">
          <div style={{ maxWidth: 720, marginBottom: 48 }}>
            <span className="micro-label text-[var(--muted)] block mb-4">
              THE JOBFILTER WAY
            </span>
            <h2
              className="headline"
              style={{ fontSize: 'clamp(28px, 3.6vw, 42px)', color: 'var(--navy)' }}
            >
              THREE STEPS. TWO MINUTES TO SET UP.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <div
                key={s.n}
                className="p-7"
                style={{ border: '2px solid var(--navy)', borderRadius: 4, background: 'var(--paper)', boxShadow: '8px 8px 0 var(--yellow)' }}
              >
                <span
                  className="headline block"
                  style={{ fontSize: 42, color: 'var(--navy)' }}
                >
                  {s.n}
                </span>
                <h3 className="mt-3 text-[18px] font-semibold text-[var(--navy)]">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[var(--muted)]">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT WE DO ───────────────────────────────── */}
      <section className="bg-[var(--bg-main)] py-16">
        <div className="page-shell">
          <div style={{ maxWidth: 720, marginBottom: 48 }}>
            <span className="micro-label text-[var(--muted)] block mb-4">
              WHAT WE DO
            </span>
            <h2
              className="headline"
              style={{ fontSize: 'clamp(28px, 3.6vw, 42px)', color: 'var(--navy)' }}
            >
              ONE SUBSCRIPTION. FOUR TOOLS. BETTER JOBS.
            </h2>
            <p className="mt-4 text-[17px] font-medium leading-[1.55] text-[var(--navy)]">
              The Intake Engine is the core. Vantage, Vicinity, and Codex come with it — because finding the job is only half the problem.
            </p>
          </div>
          <div className="grid gap-6">
            {products.map((p) => (
              <Link
                key={p.name}
                to={p.to}
                className="block p-7"
                style={{
                  border: '2px solid var(--navy)',
                  borderRadius: 4,
                  background: p.dark ? 'var(--navy)' : 'var(--paper)',
                  boxShadow: '8px 8px 0 var(--yellow)',
                  textDecoration: 'none',
                }}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <span
                      className="inline-block px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em]"
                      style={{
                        background: p.dark ? 'var(--yellow)' : 'var(--offwhite)',
                        color: 'var(--navy)',
                        border: '2px solid var(--navy)',
                        borderRadius: 3,
                      }}
                    >
                      {p.label}
                    </span>
                    <h3
                      className="headline mt-4"
                      style={{
                        fontSize: 'clamp(24px, 3vw, 34px)',
                        color: p.dark ? 'var(--yellow)' : 'var(--navy)',
                      }}
                    >
                      {p.name}
                    </h3>
                    <p
                      className="mt-2 max-w-2xl text-[16px] leading-relaxed"
                      style={{ color: p.dark ? 'rgba(230,235,241,0.85)' : 'var(--muted)' }}
                    >
                      {p.desc}
                    </p>
                  </div>
                  {p.price && (
                    <span
                      className="headline flex-shrink-0"
                      style={{ fontSize: 'clamp(22px, 3vw, 30px)', color: 'var(--yellow)' }}
                    >
                      {p.price}
                    </span>
                  )}
                </div>
                <p
                  className="mt-5 text-[14px] font-semibold"
                  style={{ color: p.dark ? 'var(--yellow)' : 'var(--navy)' }}
                >
                  {p.cta}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────── */}
      <section className="bg-[var(--ink)] text-white border-y-4 border-[var(--line)]">
        <div className="page-shell py-12">
          <p className="micro-label text-[var(--yellow)]">HOW IT WORKS</p>
          <h2 className="headline mt-3 text-5xl leading-none md:text-6xl">SCAN. TRACK. CLOSE.</h2>
          <p className="mt-5 max-w-2xl text-xl font-black text-white/75">
            One flow. Three steps. Find the jobs before anyone else. Track them in your pipeline. Close the work and prove the value.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Link to="/find-jobs" className="jf-box bg-white/10 p-6 block hover:bg-white/15 transition">
              <p className="micro-label text-[var(--yellow)]">STEP 01</p>
              <h3 className="headline mt-2 text-3xl text-[var(--yellow)]">SCAN</h3>
              <p className="mt-2 font-black text-white/70">Scan official sources. Score every signal. Gold leads hit your WhatsApp.</p>
            </Link>
            <div className="jf-box bg-white/10 p-6 block">
              <p className="micro-label text-[var(--yellow)]">STEP 02</p>
              <h3 className="headline mt-2 text-3xl text-[var(--yellow)]">TRACK</h3>
              <p className="mt-2 font-black text-white/70">Auto-nudge cold leads. Three-touch follow-up. Pre-written in tradesman language.</p>
            </div>
            <div className="jf-box bg-white/10 p-6 block">
              <p className="micro-label text-[var(--yellow)]">STEP 03</p>
              <h3 className="headline mt-2 text-3xl text-[var(--yellow)]">CLOSE</h3>
              <p className="mt-2 font-black text-white/70">Track every win. See your ROI. Turn happy customers into reviews.</p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/dashboard" className="jf-button bg-[var(--yellow)] text-[var(--ink)]">VIEW YOUR PIPELINE →</Link>
            <Link to="/find-jobs" className="jf-button bg-white text-[var(--ink)]">SCAN FREE NOW</Link>
          </div>
        </div>
      </section>

      {/* ── PAID PLAN CTA ────────────────────────────── */}
      <section className="bg-[var(--navy)] text-white">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--yellow)]">PAID PLAN</p>
          <div className="grid gap-6 lg:grid-cols-[1fr_420px] lg:items-center">
            <div>
              <h2 className="headline mt-3 text-5xl leading-none text-white md:text-6xl">From £6.99/week. One job covers it.</h2>
              <p className="mt-4 max-w-2xl text-xl font-black text-white/70">
                Free shows the signal. Founding 30 (£6.99/wk, 30 slots) or Pro (£11.29/wk) unlocks full source links, WhatsApp alerts, buyer name, deadline, and the Letterhead Pack.
              </p>
            </div>
            <Link className="jf-button bg-[var(--yellow)] text-[var(--ink)]" to="/pricing">SEE PRICING</Link>
          </div>
        </div>
      </section>

      {/* ── EPC ENERGY UPGRADES ──────────────────────── */}
      <section className="bg-[var(--navy)] border-y-4 border-[var(--line)] text-white">
        <div className="page-shell py-12">
          <p className="micro-label text-[var(--yellow)]">EPC ENERGY UPGRADES</p>
          <h2 className="headline mt-3 text-5xl leading-none text-[var(--yellow)] md:text-6xl">F AND G RATED PROPERTIES CAN'T BE RENTED WITHOUT YOUR WORK.</h2>
          <p className="mt-5 max-w-2xl text-xl font-black text-white/75">
            Properties with low EPC ratings need urgent retrofit before they're legally lettable. JobFilter flags these addresses before any job board sees them.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm font-black">
            {['Heat pump installs', 'Insulation upgrades', 'Boiler replacements', 'Solar installs', 'EV chargers'].map(t => (
              <span key={t} className="border-2 border-white/40 bg-white/10 px-3 py-2 text-white">{t}</span>
            ))}
          </div>
          <Link className="jf-button mt-6 bg-[var(--yellow)] text-[var(--ink)]" to="/epc">SEE EPC LEADS →</Link>
        </div>
      </section>

      {/* ── INTELLIGENCE ENGINE ──────────────────────── */}
      <section className="bg-[var(--yellow)] border-y-4 border-[var(--line)]">
        <div className="page-shell py-12">
          <p className="micro-label text-[var(--ink)]">INTELLIGENCE ENGINE</p>
          <h2 className="headline mt-3 text-5xl leading-none md:text-6xl">FIVE SIGNALS. ONE SCAN. BEFORE ANYONE ELSE KNOWS.</h2>
          <p className="mt-5 max-w-2xl text-xl font-black text-[var(--ink)]/75">
            JobFilter reads official data that tells you work is coming — planning approvals, council contracts, EPC ratings, property sales, and new business registrations. All before it hits the directories.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm font-black">
            {['Planning', 'Public Contracts', 'EPC Retrofit', 'Property Sales', 'New Businesses'].map(t => (
              <span key={t} className="border-2 border-[var(--ink)] bg-white px-3 py-2">{t}</span>
            ))}
          </div>
          <Link className="jf-button mt-6 bg-[var(--ink)] text-white" to="/signals">SEE THE SIGNALS →</Link>
        </div>
      </section>

      {/* ── TRADIESTACK ──────────────────────────────── */}
      <section className="bg-[var(--yellow)] border-y-4 border-[var(--line)]">
        <div className="page-shell py-12">
          <p className="micro-label text-[var(--ink)]">TRADIESTACK — NEW</p>
          <h2 className="headline mt-3 text-5xl leading-none md:text-6xl">WEBSITE. CRM. FOLLOW-UPS. REVIEWS. £450 ONCE.</h2>
          <p className="mt-5 max-w-2xl text-xl font-black text-[var(--ink)]/75">
            Everything the agencies charge you £1,000+/month for — trade website, CRM, auto follow-ups, review engine, quotes, invoices, WhatsApp inbox. One payment. No monthly fees. Own it.
          </p>
          <Link className="jf-button mt-6 bg-[var(--ink)] text-white" to="/tradiestack">SEE TRADIESTACK →</Link>
        </div>
      </section>

      {/* ── BUILT IN BIRMINGHAM ──────────────────────── */}
      <section className="border-y-4 border-[var(--line)] bg-[var(--bg-main)]">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--orange)]">BUILT IN BIRMINGHAM, NOT LONDON</p>
          <h2 className="headline mt-3 max-w-4xl text-4xl leading-[0.9] sm:text-6xl md:text-7xl">
            WE KNOW HOW TRADES WORK. BECAUSE WE'RE BUILT AMONG THEM.
          </h2>
          <p className="mt-5 max-w-2xl text-xl font-black text-[var(--muted)]">
            JobFilter wasn't designed in a London co-working space by people who've never held a spirit level. It was built in Birmingham by people who know the difference between a first fix and a snag list.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="jf-box bg-white p-5">
              <h3 className="headline text-xl text-[var(--navy)]">LOCAL KNOWLEDGE</h3>
              <p className="mt-2 font-black text-[var(--muted)]">
                We know the Midlands planning portals. We know which councils move fast and which ones sit on applications for months. That knowledge is baked into the scoring.
              </p>
            </div>
            <div className="jf-box bg-white p-5">
              <h3 className="headline text-xl text-[var(--navy)]">REAL TRADES, NOT TECH BROS</h3>
              <p className="mt-2 font-black text-[var(--muted)]">
                Every feature is built from what trades actually need — not what a product manager thinks they should want. WhatsApp alerts because that's where you work. No dashboards to log into.
              </p>
            </div>
            <div className="jf-box bg-white p-5">
              <h3 className="headline text-xl text-[var(--navy)]">HONEST PRICING</h3>
              <p className="mt-2 font-black text-[var(--muted)]">
                £6.99/week because that's what a fair price looks like. No hidden fees, no per-lead charges, no "enterprise" tier. If you're on the tools, you shouldn't need a CFO to buy software.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────── */}
      <section className="bg-white">
        <div className="page-shell grid gap-8 py-16 lg:grid-cols-[1fr_420px] lg:items-center">
          <div>
            <WinSummary />
            <span className="micro-label text-[var(--muted)] block mb-4">
              START FILTERING
            </span>
            <h2
              className="headline"
              style={{ fontSize: 'clamp(28px, 3.6vw, 42px)', color: 'var(--navy)' }}
            >
              START FILTERING TODAY.
            </h2>
            <p className="mt-4 max-w-lg text-[17px] font-medium leading-[1.55] text-[var(--muted)]">
              Scan your area free. Unlock full leads, WhatsApp alerts, and the action layer from £6.99/week. No contract. 30-day money-back guarantee.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/pricing" className="jf-button bg-[var(--yellow)] text-[var(--navy)]">
                Get Founding 30 — £6.99/wk →
              </Link>
              <Link to="/find-jobs" className="jf-button bg-[var(--paper)] text-[var(--navy)]">
                Scan your area free →
              </Link>
            </div>
          </div>
          <WaitlistForm source="home-v3" />
        </div>
      </section>
    </main>
  );
}

function LeadPreview() {
  return (
    <article className="jf-box bg-white p-5 text-[var(--ink)]">
      <p className="micro-label text-[var(--orange)]">GOLD LEAD</p>
      <h2 className="mt-3 text-2xl font-black leading-tight">Electrical maintenance package</h2>
      <div className="mt-4 grid gap-3 text-sm">
        <Row label="Trade" value="Electrical" />
        <Row label="Area" value="B14 / West Midlands" />
        <Row label="Value" value="£25k+" />
        <Row label="Urgency" value="Deadline soon" />
        <Row label="Official Source" value="Contracts Finder — 91% confidence" />
        <Row label="Contact signal" value="Buyer named" />
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {['Verified signal', 'High intent', 'Free preview'].map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.06em]"
            style={{
              background: 'var(--offwhite)',
              color: 'var(--navy)',
              border: '1px solid var(--rule)',
              borderRadius: 3,
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}

function WhatsAppPreview() {
  return (
    <article className="jf-box bg-[var(--navy)] p-5 text-white">
      <p className="micro-label text-[var(--yellow)]">WHATSAPP ALERT — AS IT ARRIVES</p>
      <div className="mt-4 rounded-lg bg-[#0B141A] p-4 font-mono text-sm leading-relaxed">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[var(--green)]"></span>
          <span className="text-xs font-black text-[var(--green)]">JobFilter</span>
          <span className="text-xs text-white/40">14:32</span>
        </div>
        <pre className="whitespace-pre-wrap break-words text-xs text-white/90 sm:text-sm">
{`GOLD LEAD — Electrical
Area: B14 / West Midlands
Value: £25k+
Urgency: Deadline soon
Why it matters: Buyer named, strong trade match, high intent
Action: Open notice → jobfilter.uk/lead/abc123`}
        </pre>
      </div>
      <p className="mt-3 text-xs font-black text-white/50">This is what hits your phone. One tap. You're on the job.</p>
    </article>
  );
}

function Problem({ title, body }: { title: string; body: string }) {
  return (
    <article className="jf-box bg-[var(--bg-main)] p-5">
      <h3 className="headline text-xl sm:text-2xl">{title}</h3>
      <p className="mt-2 font-black text-[var(--muted)]">{body}</p>
    </article>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b-2 border-[var(--line)] pb-2 last:border-b-0">
      <span className="font-black text-[var(--muted)]">{label}</span>
      <span className="text-right font-black">{value}</span>
    </div>
  );
}
