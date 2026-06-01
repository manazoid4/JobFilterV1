"use client";
import Link from 'next/link';

const comparison = [
  { feature: 'Lead type', mybuilder: 'Homeowner quote requests', jobfilter: 'Planning approvals, contracts, ownership signals, retrofit intelligence', jf: true },
  { feature: 'Lead exclusivity', mybuilder: 'Shared — multiple trades quote', jobfilter: 'Private scan — no competitor sees your results', jf: true },
  { feature: 'Pricing model', mybuilder: 'Free listing; paid leads optional', jobfilter: '£39/mo flat — unlimited scanning', jf: true },
  { feature: 'Lead scoring', mybuilder: 'None — all leads treated equally', jobfilter: 'GOLD/SILVER/SKIP based on intent and value signals', jf: true },
  { feature: 'Budget visibility', mybuilder: 'Rarely disclosed upfront', jobfilter: 'Estimated value shown for tender and contract leads', jf: true },
  { feature: 'Planning signals', mybuilder: 'No', jobfilter: 'Yes — approved applications before anyone else is called', jf: true },
  { feature: 'Council tender alerts', mybuilder: 'No', jobfilter: 'Yes — public contracts with buyer names and values', jf: true },
  { feature: 'WhatsApp delivery', mybuilder: 'No', jobfilter: 'Yes — top leads pushed direct to your phone', jf: true },
  { feature: 'Review dependency', mybuilder: 'Yes — visibility driven by review count', jobfilter: 'No — leads based on data signals, not reviews', jf: true },
  { feature: 'Free trial', mybuilder: 'Free listing (limited reach)', jobfilter: 'Yes — see real leads, no card required', jf: true },
];

const quotes = [
  {
    quote: "MyBuilder sent me the same job as ten other tradesmen. By the time I called, they'd already booked someone. JobFilter's leads are mine alone.",
    role: "Builder, West Midlands",
  },
  {
    quote: "The review grind on MyBuilder just to stay visible wasn't worth it. JobFilter finds jobs from the data — not from review count.",
    role: "Plumber, Bristol",
  },
  {
    quote: "MyBuilder budgets are guesses. JobFilter shows me tender values from published council data. That's a different level.",
    role: "Electrician, Sheffield",
  },
];

export function CompareMyBuilderPage() {
  return (
    <main className="pb-8">
      <section className="bg-[var(--yellow)] soft-grid border-b-4 border-[var(--line)]">
        <div className="page-shell section-pad">
          <span className="micro-label text-[var(--muted)]">JOBFILTER vs MYBUILDER</span>
          <h1
            className="headline mt-3"
            style={{ fontSize: 'clamp(36px, 6vw, 80px)', lineHeight: 0.96, color: 'var(--navy)' }}
          >
            MyBuilder sends{' '}
            <span style={{ background: 'var(--navy)', color: 'var(--yellow)', display: 'inline-block', padding: '0 10px 4px' }}>
              ten trades.
            </span>
            {' '}JobFilter sends{' '}
            <span style={{ background: 'var(--navy)', color: 'var(--yellow)', display: 'inline-block', padding: '0 10px 4px' }}>
              one — you.
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-xl font-black leading-tight text-[var(--ink)]">
            MyBuilder sends every quote request to a queue of competing tradesmen. JobFilter scans planning data, councils, and ownership signals — and the results are private to you alone.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link className="jf-button bg-[var(--ink)] text-white" href="/find-jobs">
              TRY JOBFILTER FREE — SEE LEADS MYBUILDER MISSES
            </Link>
            <Link className="jf-button bg-white text-[var(--ink)]" href="#comparison">
              FULL COMPARISON
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg-main)] border-b-4 border-[var(--line)]">
        <div className="page-shell section-pad">
          <h2 className="headline" style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: 'var(--navy)' }}>
            Different source. Different advantage.
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="jf-box bg-white p-5">
              <p className="micro-label text-[var(--orange)]">MYBUILDER MODEL</p>
              <ul className="mt-3 space-y-2 font-black text-sm text-[var(--ink)]">
                <li>• Homeowner posts a job — all trades in area get notified</li>
                <li>• You compete on reviews, speed, and price simultaneously</li>
                <li>• Budget is usually "not sure yet"</li>
                <li>• Visibility depends on review count, not your skills</li>
                <li>• Winning requires undercutting or out-reviewing competitors</li>
              </ul>
            </div>
            <div className="jf-box bg-[var(--navy)] p-5 text-white">
              <p className="micro-label text-[var(--yellow)]">JOBFILTER MODEL</p>
              <ul className="mt-3 space-y-2 font-black text-sm text-white">
                <li>• We scan planning approvals, council tenders, ownership signals, and retrofit data</li>
                <li>• Your scan is private — no other trade gets the same results</li>
                <li>• GOLD/SILVER/SKIP scoring — call only what's worth your time</li>
                <li>• Estimated value from published tender data, not guesswork</li>
                <li>• £39/month flat — no review profile, no credit system</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="comparison" className="border-b-4 border-[var(--line)]">
        <div className="page-shell section-pad">
          <h2 className="headline" style={{ fontSize: 'clamp(24px, 3vw, 40px)', color: 'var(--navy)' }}>
            Feature comparison
          </h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-4 border-[var(--line)] text-sm font-black">
              <thead>
                <tr className="bg-[var(--ink)] text-white">
                  <th className="p-3 text-left">Feature</th>
                  <th className="p-3 text-center">MyBuilder</th>
                  <th className="p-3 text-center bg-[var(--yellow)] text-[var(--ink)]">JobFilter</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? 'bg-white' : 'bg-[var(--bg-main)]'}>
                    <td className="p-3 font-black text-[var(--ink)]">{row.feature}</td>
                    <td className="p-3 text-center text-[var(--muted)]">{row.mybuilder}</td>
                    <td className={`p-3 text-center font-black ${row.jf ? 'text-[var(--green)]' : 'text-[var(--ink)]'}`}>
                      {row.jobfilter}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-[var(--yellow)] border-b-4 border-[var(--line)]">
        <div className="page-shell section-pad">
          <h2 className="headline" style={{ fontSize: 'clamp(24px, 3vw, 40px)', color: 'var(--navy)' }}>
            What trades say after switching
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {quotes.map((q) => (
              <div key={q.role} className="jf-box bg-white p-5">
                <p className="font-black text-[var(--ink)] leading-snug">"{q.quote}"</p>
                <p className="mt-3 micro-label text-[var(--muted)]">{q.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--navy)]">
        <div className="page-shell section-pad text-center">
          <h2 className="headline text-white" style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}>
            MyBuilder sends the job to ten trades. Get there before the queue forms.
          </h2>
          <p className="mt-4 font-black text-white/80 text-lg max-w-xl mx-auto">
            Scan your area for jobs nobody is chasing yet — before they hit MyBuilder, Bark, or Checkatrade.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row justify-center">
            <Link className="jf-button bg-[var(--yellow)] text-[var(--ink)]" href="/find-jobs">
              SCAN MY AREA FREE — NO CARD
            </Link>
            <Link className="jf-button bg-white/10 text-white" href="/pricing">
              VIEW PRICING
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
