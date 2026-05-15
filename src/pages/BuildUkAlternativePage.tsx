import { Link } from 'react-router-dom';

const comparison = [
  { feature: 'Planning applications', old: 'Yes — raw data', new: 'Yes — scored & filtered' },
  { feature: 'Energy upgrade signals', old: 'No', new: 'Yes — energy demand mapped to your patch' },
  { feature: 'Council contracts', old: 'No', new: 'Yes — buyer named, value shown' },
  { feature: 'Ownership change signals', old: 'No', new: 'Yes — who just bought and needs work' },
  { feature: 'New business signals', old: 'No', new: 'Yes — new businesses needing premises work' },
  { feature: 'GOLD / SILVER / BIN scoring', old: 'No', new: 'Yes — chase only what pays' },
  { feature: 'WhatsApp alerts', old: 'No', new: 'Yes — within minutes, not batched' },
  { feature: 'Exclusive leads', old: 'Browse only', new: 'No one else sees your scan' },
  { feature: 'Delivery', old: 'Manual browsing', new: 'Pushed to your phone' },
  { feature: 'Price', old: '£30+/mo — for less', new: '£39/mo founding — forever' },
];

const signals = [
  ['Planning data', 'Approved applications before they hit any directory.'],
  ['Energy upgrade signals', 'Properties legally required to upgrade — retrofit work confirmed.'],
  ['Council contracts', 'Public tenders with buyer names and values.'],
  ['Ownership changes', 'New owners renovate. We catch the signal before the job goes up anywhere.'],
  ['New businesses', 'Newly registered businesses needing premises work done.'],
];

export function BuildUkAlternativePage() {
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
            2BUILDUK IS DOWN
          </span>
          <h1
            className="headline"
            style={{ fontSize: 'clamp(40px, 7vw, 88px)', lineHeight: 0.96, color: 'var(--navy)' }}
          >
            2BuildUK is down.{' '}
            <span
              style={{
                background: 'var(--navy)',
                color: 'var(--yellow)',
                display: 'inline-block',
                padding: '0 12px 4px',
                lineHeight: 1.05,
              }}
            >
              JobFilter is up.
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-2xl font-black leading-tight text-[var(--ink)]">
            And we do more. Five signals. Scored leads. WhatsApp alerts. All for less than you were paying.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link className="jf-button bg-[var(--ink)] text-white" to="/find-jobs">SCAN YOUR AREA FREE — NO CARD NEEDED</Link>
            <Link className="jf-button bg-white text-[var(--ink)]" to="#comparison">SEE THE DIFFERENCE</Link>
          </div>
          <div className="mt-7 grid gap-2 text-sm font-black text-[var(--ink)] sm:grid-cols-2">
            <p>NO CHASING</p>
            <p>NO COMPETING</p>
            <p>REAL UK LEADS</p>
            <p>STAY IN CONTROL</p>
          </div>
        </div>
      </section>

      {/* ── WHAT HAPPENED ────────────────────────────── */}
      <section className="bg-white">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--orange)]">WHAT HAPPENED</p>
          <h2 className="headline mt-3 max-w-4xl text-4xl leading-[0.9] sm:text-6xl md:text-7xl">2BUILDUK WENT OFFLINE. YOUR LEADS DIDN'T STOP.</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="jf-box bg-[var(--bg-main)] p-6">
              <h3 className="headline text-xl text-[var(--muted)]">THE SITUATION</h3>
              <p className="mt-3 font-black text-[var(--muted)] leading-relaxed">
                2builduk.com returns a 404 error. The site is gone. If you were paying £30+/month for planning leads access, you're now getting nothing.
              </p>
              <p className="mt-3 font-black text-[var(--muted)] leading-relaxed">
                Planning applications don't stop just because a website went down. Work is still being approved. Contracts are still being awarded. You just can't see them anymore.
              </p>
            </div>
            <div className="jf-box bg-[var(--yellow)] p-6">
              <h3 className="headline text-xl text-[var(--ink)]">THE FIX</h3>
              <p className="mt-3 font-black text-[var(--ink)] leading-relaxed">
                JobFilter scans the same planning data 2BuildUK showed — plus energy upgrade demand, public contracts, ownership changes, and new business signals. Then we score every lead so you only chase the ones worth your time.
              </p>
              <p className="mt-3 font-black text-[var(--ink)] leading-relaxed">
                Gold leads hit your WhatsApp within minutes. No manual browsing. No downloading spreadsheets. Just jobs that pay, delivered to where you already work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ─────────────────────────── */}
      <section id="comparison" className="border-y-4 border-[var(--line)] bg-[var(--bg-main)]">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--orange)]">2BUILDUK vs JOBFILTER</p>
          <h2 className="headline mt-3 max-w-4xl text-4xl leading-[0.9] sm:text-6xl">SAME TRADE. MORE SIGNALS. LESS MONEY.</h2>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse text-sm font-black">
              <thead>
                <tr className="bg-[var(--navy)] text-white">
                  <th className="px-4 py-3 text-left">Feature</th>
                  <th className="px-4 py-3 text-left text-white/90">2BuildUK</th>
                  <th className="px-4 py-3 text-left text-[var(--yellow)]">JobFilter</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? 'bg-white' : 'bg-[var(--bg-main)]'}>
                    <td className="border-b-2 border-[var(--line)] px-4 py-3 text-[var(--navy)]">{row.feature}</td>
                    <td className="border-b-2 border-[var(--line)] px-4 py-3 text-[var(--muted)]">{row.old}</td>
                    <td className="border-b-2 border-[var(--line)] px-4 py-3 text-[var(--navy)]">{row.new}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link className="jf-button bg-[var(--ink)] text-white" to="/find-jobs">SCAN YOUR AREA FREE — NO CARD NEEDED</Link>
            <Link className="jf-button bg-[var(--yellow)] text-[var(--ink)]" to="/pricing">SEE PRICING</Link>
          </div>
        </div>
      </section>

      {/* ── FIVE SIGNALS ─────────────────────────────── */}
      <section className="bg-[var(--yellow)] border-y-4 border-[var(--line)]">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--ink)]">INTELLIGENCE ENGINE</p>
          <h2 className="headline mt-3 max-w-4xl text-4xl leading-[0.9] sm:text-6xl md:text-7xl">FIVE SIGNALS. ONE SCAN. BEFORE ANYONE ELSE KNOWS.</h2>
          <p className="mt-5 max-w-2xl text-xl font-black text-[var(--ink)]">
            2BuildUK gave you planning data. JobFilter gives you that plus four more sources that tell you work is coming.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {signals.map(([title, body]) => (
              <div key={title} className="jf-box bg-white p-5">
                <h3 className="headline text-2xl text-[var(--navy)]">{title}</h3>
                <p className="mt-2 font-black text-[var(--muted)]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCORING EXPLAINED ────────────────────────── */}
      <section className="bg-white">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--orange)]">THE DIFFERENCE</p>
          <h2 className="headline mt-3 max-w-4xl text-4xl leading-[0.9] sm:text-6xl">THEY GAVE YOU DATA. WE GIVE YOU JUDGEMENT.</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="jf-box bg-[var(--yellow)] p-6">
              <p className="micro-label text-[var(--ink)]">GOLD</p>
              <h3 className="headline mt-2 text-3xl text-[var(--navy)]">WORTH CHASING</h3>
              <p className="mt-3 font-black text-[var(--ink)]">
                High value, real urgency, official source confirmed. This is the job you drop everything for.
              </p>
            </div>
            <div className="jf-box bg-white p-6">
              <p className="micro-label text-[var(--muted)]">SILVER</p>
              <h3 className="headline mt-2 text-3xl text-[var(--navy)]">WORTH WATCHING</h3>
              <p className="mt-3 font-black text-[var(--muted)]">
                Good signal but timing is unclear. Keep it on your radar. Might be your next job.
              </p>
            </div>
            <div className="jf-box bg-[var(--bg-main)] p-6">
              <p className="micro-label text-[var(--orange)]">BIN</p>
              <h3 className="headline mt-2 text-3xl text-[var(--navy)]">SKIP IT</h3>
              <p className="mt-3 font-black text-[var(--muted)]">
                Low value, no urgency, or too much competition. Don't waste your fuel on this one.
              </p>
            </div>
          </div>
          <p className="mt-6 font-black text-[var(--muted)]">
            2BuildUK showed you every planning application and let you figure out which mattered. We score them so you know in seconds.
          </p>
        </div>
      </section>

      {/* ── WHATSAPP DELIVERY ────────────────────────── */}
      <section className="border-y-4 border-[var(--line)] bg-[var(--ink)] text-white">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--yellow)]">WHATSAPP BODYGUARD</p>
          <h2 className="headline mt-3 max-w-4xl text-4xl leading-[0.9] sm:text-6xl md:text-7xl text-[var(--yellow)]">
            NO MORE BROWSING. LEADS COME TO YOU.
          </h2>
          <p className="mt-5 max-w-2xl text-xl font-black text-white/80">
            2BuildUK made you log in, search, browse, and download. JobFilter scores the lead and fires it to your WhatsApp before you even open your laptop.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ['98% open rate', 'Not email. Not an app. WhatsApp — where you already work.'],
              ['Within minutes', 'Gold leads fire instantly. Not batched. Not delayed.'],
              ['One-tap action', 'Lead arrives. Tap. You\'re on it. No dashboards to hunt through.'],
            ].map(([title, body]) => (
              <div key={title} className="jf-box bg-white/10 p-5">
                <h3 className="headline text-2xl text-[var(--yellow)]">{title}</h3>
                <p className="mt-2 font-black text-white/90">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────── */}
      <section className="bg-[var(--yellow)] border-y-4 border-[var(--line)]">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--ink)]">FOUNDING 30</p>
          <h2 className="headline mt-3 max-w-4xl text-4xl leading-[0.9] sm:text-6xl md:text-7xl">£39/mo FOREVER. WAS £30+/MO FOR LESS.</h2>
          <p className="mt-5 max-w-2xl text-xl font-black text-[var(--ink)]">
            Founding 30 is locked at £39/month. No price rises while active. No per-lead fees. No contracts. One job covers it.
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
              <p className="mt-1 text-sm font-black text-[var(--yellow)]/70">(founder price, locked while active)</p>
              <p className="mt-2 font-black text-white/80">Full access. WhatsApp alerts. Source links. Price locked while your plan stays active.</p>
              <ul className="mt-4 grid gap-2 text-sm font-black text-white/90">
                <li>Full lead details unlocked</li>
                <li>WhatsApp gold alerts</li>
                <li>Official source proof links</li>
                <li>Buyer names & deadlines</li>
                <li>Price locked while active</li>
              </ul>
              <Link className="jf-button mt-5 bg-[var(--yellow)] text-[var(--ink)]" to="/pricing">GET FOUNDING 30</Link>
            </div>
            <div className="jf-box bg-white p-6">
              <h3 className="headline text-xl text-[var(--navy)]">STANDARD — £79/mo</h3>
              <p className="mt-2 font-black text-[var(--muted)]">Full access at standard price. Available after founder slots are gone.</p>
              <p className="mt-3 text-sm font-black text-[var(--muted)]">No lock-in. Cancel anytime.</p>
              <Link className="jf-button mt-5 bg-[var(--ink)] text-white block text-center" to="/pricing">SEE PRICING</Link>
            </div>
          </div>
          <p className="mt-6 font-black text-[var(--ink)]/90">
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
              ['No per-action cost', 'Scan as much as you want. One price. No credit packs. No top-ups.'],
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
            2BUILDUK IS GONE.{' '}
            <span style={{ color: 'var(--yellow)' }}>YOUR LEADS AREN'T.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-xl font-black text-white/90">
            Scan your area free. See what work is active near you. No card needed. No signup wall. Just results.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link className="jf-button bg-[var(--yellow)] text-[var(--ink)]" to="/find-jobs">SCAN MY AREA FREE</Link>
            <Link className="jf-button bg-white text-[var(--ink)]" to="/pricing">GET FOUNDING 30 — £39/mo</Link>
          </div>
          <p className="mt-6 text-sm font-black text-white/85">
            BUILT FOR TRADES. NO CONTRACTS. FAIR SYSTEM.
          </p>
        </div>
      </section>
    </main>
  );
}




