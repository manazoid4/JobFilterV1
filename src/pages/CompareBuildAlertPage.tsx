import { Link } from 'react-router-dom';

const comparison = [
  { feature: 'Planning applications', buildalert: 'Yes — planning data only', jobfilter: 'Yes — scored & filtered' },
  { feature: 'EPC retrofit signals', buildalert: 'No', jobfilter: 'Yes — F/G rated properties flagged' },
  { feature: 'Council contracts', buildalert: 'No', jobfilter: 'Yes — buyer named, value shown' },
  { feature: 'Property sales data', buildalert: 'No', jobfilter: 'Yes — Land Registry signals' },
  { feature: 'New business registrations', buildalert: 'No', jobfilter: 'Yes — Companies House data' },
  { feature: 'GOLD / SILVER / BIN scoring', buildalert: 'No', jobfilter: 'Yes — chase only what pays' },
  { feature: 'WhatsApp alerts', buildalert: 'No', jobfilter: 'Yes — within minutes, not batched' },
  { feature: 'Letter delivery', buildalert: 'Yes — physical mail at £2/letter', jobfilter: 'Digital — instant, no per-letter cost' },
  { feature: 'Exclusive leads', buildalert: 'Yes — planning data access', jobfilter: 'Yes — no one else sees your scan' },
  { feature: 'Delivery speed', buildalert: 'Mail cycle + manual browse', jobfilter: 'Pushed to your phone in minutes' },
  { feature: 'Signals per scan', buildalert: '1 — planning only', jobfilter: '5 — planning, EPC, contracts, sales, businesses' },
  { feature: 'Price (entry)', buildalert: '£2/letter + time', jobfilter: '£29/mo founding — unlimited scans' },
];

const signals = [
  ['Planning data', 'Approved applications before they hit any directory. BuildAlert does this too.'],
  ['EPC signals', 'F/G rated properties legally need retrofit work. BuildAlert does not cover this.'],
  ['Council contracts', 'Public tenders with buyer names and values. Not in BuildAlert.'],
  ['Property sales', 'Land Registry data showing who just bought and needs work. BuildAlert misses this.'],
  ['New businesses', 'Companies House registrations needing fit-out. Another signal BuildAlert does not have.'],
];

export function CompareBuildAlertPage() {
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
            BuildAlert gets you{' '}
            <span
              style={{
                background: 'var(--navy)',
                color: 'var(--yellow)',
                display: 'inline-block',
                padding: '0 12px 4px',
                lineHeight: 1.05,
              }}
            >
              planning data.
            </span>{' '}
            We get you jobs.
          </h1>
          <p className="mt-4 max-w-2xl text-xl font-black leading-tight text-[var(--ink)]/80">
            BuildAlert is good at what it does — planning alerts by post. But planning is only one signal. JobFilter scans five, scores them, and fires Gold leads to your WhatsApp before the letter even lands.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link className="jf-button bg-[var(--ink)] text-white" to="/find-jobs">TRY JOBFILTER FREE — SEE WHAT BUILDALERT DOESN'T SHOW YOU</Link>
            <Link className="jf-button bg-white text-[var(--ink)]" to="#comparison">SEE THE FULL COMPARISON</Link>
          </div>
          <div className="mt-7 grid gap-2 text-sm font-black text-[var(--ink)] sm:grid-cols-2">
            <p>NO CHASING</p>
            <p>NO COMPETING</p>
            <p>REAL UK LEADS</p>
            <p>STAY IN CONTROL</p>
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
                <li>Planning application alerts to your door</li>
                <li>Simple model — £2 per letter sent</li>
                <li>Covers UK planning authorities</li>
                <li>No subscription lock-in</li>
              </ul>
              <p className="mt-4 font-black text-[var(--muted)] leading-relaxed">
                If you only want planning applications mailed to you, BuildAlert does that fine.
              </p>
            </div>
            <div className="jf-box bg-[var(--yellow)] p-6">
              <h3 className="headline text-xl text-[var(--ink)]">WHAT BUILDALERT DOESN'T DO</h3>
              <ul className="mt-3 grid gap-3 font-black text-[var(--ink)]/85">
                <li>No EPC signals — misses F/G retrofit demand</li>
                <li>No council contracts — buyer names and values hidden</li>
                <li>No scoring — every application looks the same</li>
                <li>No WhatsApp — letters take days, jobs move in hours</li>
                <li>No property sales or business registration data</li>
                <li>£2/letter adds up fast if you're scanning multiple areas</li>
              </ul>
              <p className="mt-4 font-black text-[var(--ink)] leading-relaxed">
                Planning is one piece of the puzzle. The trades winning jobs see the whole picture.
              </p>
            </div>
          </div>
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
                    <td className="border-b-2 border-[var(--line)] px-4 py-3 text-[var(--navy)]">{row.jobfilter}</td>
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
          <h2 className="headline mt-3 max-w-4xl text-4xl leading-[0.9] sm:text-6xl md:text-7xl">£29/MO UNLIMITED. VS £2 PER LETTER.</h2>
          <p className="mt-5 max-w-2xl text-xl font-black text-[var(--ink)]/75">
            BuildAlert charges £2 per letter. Scan 20 areas? That's £40. JobFilter is £29/month for unlimited scans across all five signals. One job covers it.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="jf-box bg-white p-6">
              <h3 className="headline text-xl text-[var(--navy)]">FREE</h3>
              <p className="mt-2 font-black text-[var(--muted)]">See the signals. Know what's out there. No card needed.</p>
              <p className="mt-3 text-sm font-black text-[var(--muted)]">Preview leads only</p>
            </div>
            <div className="jf-box bg-[var(--navy)] p-6 text-white">
              <p className="micro-label text-[var(--yellow)]">FOUNDING 30</p>
              <h3 className="headline mt-2 text-3xl text-[var(--yellow)]">£29/MO</h3>
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
              <h3 className="headline text-xl text-[var(--navy)]">PRO — £49/MO</h3>
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
            <Link className="jf-button bg-white text-[var(--ink)]" to="/pricing">GET FOUNDING 30 — £29/MO</Link>
          </div>
          <p className="mt-6 text-sm font-black text-white/50">
            BUILT FOR TRADES. NO CONTRACTS. FAIR SYSTEM.
          </p>
        </div>
      </section>
    </main>
  );
}
