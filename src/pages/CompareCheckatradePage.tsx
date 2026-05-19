import { Link } from 'react-router-dom';

const comparison = [
  { feature: 'Lead model', checkatrade: 'Shared — sold to 4-8 trades', jobfilter: 'Exclusive — no one else sees your scan' },
  { feature: 'Monthly fee', checkatrade: '£50-£90/mo per category', jobfilter: '£39/mo — all trades, all signals' },
  { feature: 'Per-lead cost', checkatrade: 'Yes — pay-per-lead on top', jobfilter: 'No — unlimited scans, one price' },
  { feature: 'Lead quality', checkatrade: 'Name + phone number from a form', jobfilter: 'Official signals with buyer, value, urgency' },
  { feature: 'Budget visibility', checkatrade: 'None — you find out on the call', jobfilter: 'Estimated value shown before you chase' },
  { feature: 'Urgency scoring', checkatrade: 'None — all leads look the same', jobfilter: 'GOLD / SILVER / BIN — chase what pays' },
  { feature: 'Planning data', checkatrade: 'No', jobfilter: 'Yes — approved applications' },
  { feature: 'Energy signals', checkatrade: 'No', jobfilter: 'Yes — retrofit properties flagged' },
  { feature: 'Council contracts', checkatrade: 'No', jobfilter: 'Yes — buyer named, value shown' },
  { feature: 'WhatsApp alerts', checkatrade: 'No', jobfilter: 'Yes — within minutes, not batched' },
  { feature: 'Contract lock-in', checkatrade: '12-month memberships reported', jobfilter: 'No contracts. Cancel anytime.' },
  { feature: 'Money-back guarantee', checkatrade: 'No', jobfilter: '30 days. No quibbles.' },
];

const painPoints = [
  ['Shared leads', 'You pay for a lead that 4-8 other trades also receive. The homeowner picks the cheapest quote. You lose.'],
  ['Price wars', 'When everyone gets the same lead, the only way to win is to undercut. That race has no bottom.'],
  ['Monthly fees just to be listed', '£50-£90/month per category before you see a single lead. And you still pay per-lead on top.'],
  ['No visibility into what you\'re buying', 'A name and phone number. No budget check. No timeline. No job scope. You drive to the quote and hope.'],
  ['Contracts lock you in', '12-month memberships with no cancellation clause. You pay during quiet months whether it works or not.'],
];

const signals = [
  ['Planning data', 'Approved applications before they hit any directory.'],
  ['Energy signals', 'Low-rated properties legally need retrofit work.'],
  ['Council contracts', 'Public tenders with buyer names and values.'],
  ['Property activity', 'Recent sales show where owners are ready to invest.'],
  ['Business starts', 'New commercial premises needing fit-out work.'],
];

export function CompareCheckatradePage() {
  return (
    <main className="pb-8">
      {/* ── HERO ───────────────────────────────────────────── */}
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
            JOBFILTER vs CHECKATRADE
          </span>
          <h1
            className="headline"
            style={{ fontSize: 'clamp(40px, 7vw, 88px)', lineHeight: 0.96, color: 'var(--navy)' }}
          >
            Checkatrade sells your{' '}
            <span
              style={{
                background: 'var(--navy)',
                color: 'var(--yellow)',
                display: 'inline-block',
                padding: '0 12px 4px',
                lineHeight: 1.05,
              }}
            >
              leads to your competition.
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-xl font-black leading-tight text-[var(--ink)]">
            Checkatrade is the biggest name in trade lead gen. And the most complained about. Shared leads, price wars, monthly fees just to be listed. JobFilter does the opposite — exclusive signals, no shared auctions, one flat price.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link className="jf-button bg-[var(--ink)] text-white" to="/find-jobs">STOP COMPETING. START FILTERING.</Link>
            <Link className="jf-button bg-white text-[var(--ink)]" to="#comparison">SEE THE DIFFERENCE</Link>
          </div>
          <p className="mt-4 text-sm font-black text-[var(--ink)]">£39/mo. No contract. 30-day money-back guarantee.</p>
          <div className="mt-7 grid gap-2 text-sm font-black text-[var(--ink)] sm:grid-cols-2">
            <p>NO CHASING</p>
            <p>NO COMPETING</p>
            <p>REAL UK LEADS</p>
            <p>STAY IN CONTROL</p>
          </div>
        </div>
      </section>

      {/* ── THE PAIN ────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--orange)]">THE PROBLEM YOU ALREADY KNOW</p>
          <h2 className="headline mt-3 max-w-4xl text-4xl leading-[0.9] sm:text-6xl md:text-7xl">YOU'RE PAYING TO COMPETE WITH YOURSELF.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {painPoints.map(([title, body]) => (
              <div key={title} className="jf-box bg-[var(--bg-main)] p-5">
                <h3 className="headline text-xl text-[var(--orange)]">{title.toUpperCase()}</h3>
                <p className="mt-3 font-black text-[var(--muted)] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-lg font-black text-[var(--muted)]">
            This isn't opinion. It's what trades say on Reddit, forums, and review sites. The system is broken. JobFilter was built to fix it.
          </p>
        </div>
      </section>

      {/* ── THE LEAD AUCTION VISUAL ────────────────────────────── */}
      <section className="border-y-4 border-[var(--line)] bg-[var(--yellow)]">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--ink)]">THE LEAD AUCTION</p>
          <h2 className="headline mt-3 max-w-4xl text-4xl leading-[0.9] sm:text-6xl md:text-7xl">
            EVERY LEAD YOU BUY GOES TO 4 OTHER BLOKES.
          </h2>
          <p className="mt-5 max-w-2xl text-xl font-black text-[var(--ink)]">
            You pay £15 for a lead. So do four other trades. One of you wins. The other four just funded their own competition. That's not lead generation. That's a tax on hope.
          </p>
          <div className="mt-8 jf-box bg-white p-6">
            <div className="grid gap-4 md:grid-cols-6">
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-4 border-[var(--navy)] bg-[var(--navy)]">
                  <span className="text-lg font-black text-[var(--yellow)]">1</span>
                </div>
                <p className="mt-2 text-sm font-black text-[var(--navy)]">LEAD</p>
                <p className="text-xs font-black text-[var(--muted)]">Homeowner posts a job</p>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-3xl font-black text-[var(--orange)]">→</span>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-4 border-[var(--orange)]">
                  <span className="text-lg font-black text-[var(--orange)]">5</span>
                </div>
                <p className="mt-2 text-sm font-black text-[var(--navy)]">TRADES PAY</p>
                <p className="text-xs font-black text-[var(--muted)]">All get the same lead</p>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-3xl font-black text-[var(--orange)]">→</span>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-4 border-[var(--green)] bg-[var(--green)]">
                  <span className="text-lg font-black text-white">1</span>
                </div>
                <p className="mt-2 text-sm font-black text-[var(--green)]">WINS</p>
                <p className="text-xs font-black text-[var(--muted)]">First to quote</p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-4 border-[var(--orange)] bg-[var(--orange)]/20">
                  <span className="text-lg font-black text-[var(--orange)]">4</span>
                </div>
                <p className="mt-2 text-sm font-black text-[var(--orange)]">LOSE</p>
                <p className="text-xs font-black text-[var(--muted)]">Paid for nothing</p>
              </div>
            </div>
            <div className="mt-6 border-2 border-[var(--ink)] bg-[var(--bg-main)] p-4 text-center">
              <p className="text-sm font-black text-[var(--navy)]">
                You paid £15. Four other trades paid £15. One person got a job. Four people paid to compete with themselves.
              </p>
              <p className="mt-1 text-sm font-black text-[var(--green)]">
                JobFilter: one signal, one trade, no auction. You see it or you don't. No one else gets your scan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FIRST MOVER ADVANTAGE ───────────────────────────────── */}
      <section className="border-y-4 border-[var(--line)] bg-[var(--navy)] text-white">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--yellow)]">FIRST MOVER ADVANTAGE</p>
          <h2 className="headline mt-3 max-w-4xl text-4xl leading-[0.9] sm:text-6xl md:text-7xl text-[var(--yellow)]">
            THE BUILDER WHO TURNS UP FIRST GETS THE JOB.
          </h2>
          <p className="mt-5 max-w-2xl text-xl font-black text-white/80">
            Industry data shows 70% of jobs go to the first person to quote. Not the cheapest. Not the best reviewed. The first. JobFilter tells you where to turn up before anyone else knows the job exists.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="jf-box bg-white/10 p-6">
              <p className="text-xs font-black uppercase text-[var(--green)]">WITH JOBFILTER</p>
              <div className="mt-4 grid gap-3 font-black text-white/85">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 font-bold text-[var(--green)]">08:14</span>
                  <span>Planning approved — JobFilter detects the signal</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 font-bold text-[var(--green)]">08:16</span>
                  <span>GOLD alert fires to your WhatsApp</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 font-bold text-[var(--green)]">08:20</span>
                  <span>You tap the link, see buyer details, make the call</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 font-bold text-[var(--green)]">09:00</span>
                  <span>You're first to quote. You set the price. You win the job.</span>
                </div>
              </div>
            </div>
            <div className="jf-box bg-white/10 p-6">
              <p className="text-xs font-black uppercase text-[var(--orange)]">ON CHECKATRADE</p>
              <div className="mt-4 grid gap-3 font-black text-white/85">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 font-bold text-[var(--orange)]">Day 1</span>
                  <span>Homeowner posts job on Checkatrade</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 font-bold text-[var(--orange)]">Day 1</span>
                  <span>Lead sold to 5-8 trades. All get the same notification.</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 font-bold text-[var(--orange)]">Day 2-3</span>
                  <span>Everyone quotes. Price war starts. Margins destroyed.</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 font-bold text-[var(--orange)]">Day 5</span>
                  <span>Homeowner picks cheapest. You paid for the lead and lost.</span>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-6 text-sm font-black text-white/85">
            70% of jobs go to the first quote. JobFilter gets you there first. Checkatrade puts you in a queue.
          </p>
        </div>
      </section>

      {/* ── THE FIX ────────────────────────────────────────────── */}
      <section className="border-y-4 border-[var(--line)] bg-[var(--yellow)]">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--ink)]">THE JOBFILTER WAY</p>
          <h2 className="headline mt-3 max-w-4xl text-4xl leading-[0.9] sm:text-6xl md:text-7xl">NO SHARED LEADS. NO PRICE WARS. NO GUESSWORK.</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="jf-box bg-white p-6">
              <h3 className="headline text-xl text-[var(--orange)]">CHECKATRADE</h3>
              <ul className="mt-4 grid gap-3 font-black text-[var(--muted)]">
                <li>Pay £50-£90/month just to be listed</li>
                <li>Leads sold to 4-8 other trades</li>
                <li>You call them, filter time-wasters yourself</li>
                <li>Hope they have budget. Hope you're first.</li>
                <li>"Leads" = a name and phone number from a form</li>
                <li>12-month contracts reported</li>
              </ul>
            </div>
            <div className="jf-box bg-[var(--navy)] p-6 text-white">
              <h3 className="headline text-xl text-[var(--yellow)]">JOBFILTER</h3>
              <ul className="mt-4 grid gap-3 font-black text-white/85">
                <li>£39/mo — all trades, all signals</li>
                <li>Every signal is exclusive — no one else sees it</li>
                <li>We score every signal. GOLD means worth chasing</li>
                <li>Verified signals — planning, energy, contracts. Not forms</li>
                <li>Buyer name, value, urgency shown before you act</li>
                <li>No contracts. Cancel anytime. 30-day guarantee</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ───────────────────────────────────── */}
      <section id="comparison" className="border-y-4 border-[var(--line)] bg-[var(--bg-main)]">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--orange)]">CHECKATRADE vs JOBFILTER</p>
          <h2 className="headline mt-3 max-w-4xl text-4xl leading-[0.9] sm:text-6xl">THEY SELL ATTENTION. WE PROTECT IT.</h2>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse text-sm font-black">
              <thead>
                <tr className="bg-[var(--navy)] text-white">
                  <th className="px-4 py-3 text-left">Feature</th>
                  <th className="px-4 py-3 text-left text-white/90">Checkatrade</th>
                  <th className="px-4 py-3 text-left text-[var(--yellow)]">JobFilter</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? 'bg-white' : 'bg-[var(--bg-main)]'}>
                    <td className="border-b-2 border-[var(--line)] px-4 py-3 text-[var(--navy)]">{row.feature}</td>
                    <td className="border-b-2 border-[var(--line)] px-4 py-3 text-[var(--muted)]">{row.checkatrade}</td>
                    <td className="border-b-2 border-[var(--line)] px-4 py-3 text-[var(--navy)]">{row.jobfilter}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link className="jf-button bg-[var(--ink)] text-white" to="/find-jobs">SCAN FREE — NO CARD NEEDED</Link>
            <Link className="jf-button bg-[var(--yellow)] text-[var(--ink)]" to="/pricing">SEE PRICING</Link>
          </div>
        </div>
      </section>

      {/* ── FIVE SIGNALS ──────────────────────────────────────────── */}
      <section className="bg-[var(--yellow)] border-y-4 border-[var(--line)]">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--ink)]">INTELLIGENCE ENGINE</p>
          <h2 className="headline mt-3 max-w-4xl text-4xl leading-[0.9] sm:text-6xl md:text-7xl">FIVE SIGNALS. ONE SCAN. BEFORE ANYONE ELSE KNOWS.</h2>
          <p className="mt-5 max-w-2xl text-xl font-black text-[var(--ink)]">
            Checkatrade waits for homeowners to fill out a form. JobFilter reads official data that tells you work is coming — before the homeowner even thinks about posting a job.
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

      {/* ── SCORING ────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--orange)]">THE DIFFERENCE</p>
          <h2 className="headline mt-3 max-w-4xl text-4xl leading-[0.9] sm:text-6xl">CHECKATRADE GIVES YOU LEADS. WE GIVE YOU FILTERS.</h2>
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
            Checkatrade sends every lead and hopes you sort the good from the bad. We do the sorting so you stay on the tools.
          </p>
        </div>
      </section>

      {/* ── WHATSAPP DELIVERY ──────────────────────────────────────── */}
      <section className="border-y-4 border-[var(--line)] bg-[var(--ink)] text-white">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--yellow)]">WHATSAPP BODYGUARD</p>
          <h2 className="headline mt-3 max-w-4xl text-4xl leading-[0.9] sm:text-6xl md:text-7xl text-[var(--yellow)]">
            NO MORE WAITING FOR LEADS. THEY COME TO YOU.
          </h2>
          <p className="mt-5 max-w-2xl text-xl font-black text-white/80">
            Checkatrade makes you log in, browse, and bid. JobFilter scores the signal and fires Gold leads to your WhatsApp within minutes. Before the homeowner even posts the job publicly.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ['98% open rate', 'Not email. Not an app. WhatsApp — where you already work.'],
              ['Within minutes', 'Gold leads fire instantly. Not batched. Not delayed.'],
              ['Before the competition', 'Official signals fire before the job hits any directory.'],
            ].map(([title, body]) => (
              <div key={title} className="jf-box bg-white/10 p-5">
                <h3 className="headline text-2xl text-[var(--yellow)]">{title}</h3>
                <p className="mt-2 font-black text-white/90">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ────────────────────────────────────────────── */}
      <section className="bg-[var(--yellow)] border-y-4 border-[var(--line)]">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--ink)]">FOUNDING 30</p>
          <h2 className="headline mt-3 max-w-4xl text-4xl leading-[0.9] sm:text-6xl md:text-7xl">£39/mo ALL-IN. VS £50-£90/MO + PER-LEAD FEES.</h2>
          <p className="mt-5 max-w-2xl text-xl font-black text-[var(--ink)]">
            Checkatrade charges £50-£90/month per category, then charges per-lead on top. Trades report £200+/month before any work arrives. JobFilter is £39/month flat. Unlimited scans. No per-lead fees. No category restrictions.
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
            </div>
          </div>
          <p className="mt-6 font-black text-[var(--ink)]/90">
            30-DAY MONEY-BACK GUARANTEE. NO QUIBBLES. NO HOOPS.
          </p>
        </div>
      </section>

      {/* ── WHAT YOU GET ────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--orange)]">WHAT YOU GET</p>
          <h2 className="headline mt-3 max-w-4xl text-4xl leading-[0.9] sm:text-6xl">ONE JOB PAYS FOR THE MONTH. EVERYTHING AFTER IS PROFIT.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              ['Exclusive scans', 'No one else sees your results. Not shared. Not resold. Not blasted to five other trades.'],
              ['Verified signals only', 'Planning approvals, public contracts, energy efficiency data. Not forms. Not ads. Not guesses.'],
              ['No per-action cost', 'Scan as much as you want. One price. No credit packs. No per-lead fees. No category charges.'],
              ['Built for trades', 'Made in Birmingham. For people who work with their hands. Not for corporate sales teams.'],
              ['Cancel anytime', 'No contracts. No lock-in. No 12-month memberships. Leave if it doesn\'t work for you.'],
              ['30-day guarantee', 'Try it. If it doesn\'t pay for itself, we refund. No questions. No hoops.'],
            ].map(([title, body]) => (
              <div key={title} className="jf-box bg-[var(--bg-main)] p-5">
                <h3 className="headline text-xl text-[var(--navy)]">{title}</h3>
                <p className="mt-2 font-black text-[var(--muted)]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────── */}
      <section className="bg-[var(--navy)] text-white">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--yellow)]">ENTER THE INTAKE</p>
          <h2 className="headline mt-3 max-w-4xl text-4xl leading-[0.9] sm:text-6xl md:text-7xl text-white">
            STOP COMPETING.{' '}
            <span style={{ color: 'var(--yellow)' }}>START FILTERING.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-xl font-black text-white/90">
            Scan your area free. See what work is active near you — before it hits Checkatrade. No card needed. No signup wall. Just results.
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
