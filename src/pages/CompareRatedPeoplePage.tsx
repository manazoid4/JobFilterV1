"use client";
import Link from 'next/link';

const comparison = [
  { feature: 'Lead source', ratedpeople: 'Homeowner job posts', jobfilter: 'Planning data, public contracts, EPC, land registry', jf: true },
  { feature: 'Lead exclusivity', ratedpeople: 'Up to 3 trades per job', jobfilter: 'Private — only you see your scan results', jf: true },
  { feature: 'Pricing', ratedpeople: 'Credits to apply for jobs', jobfilter: '£39/mo flat — no credits, no limits', jf: true },
  { feature: 'Lead scoring', ratedpeople: 'None — all jobs shown equally', jobfilter: 'GOLD/SILVER/SKIP intent scoring', jf: true },
  { feature: 'Budget data', ratedpeople: 'Customer estimate — often low', jobfilter: 'Published tender value for contract leads', jf: true },
  { feature: 'Planning signals', ratedpeople: 'No', jobfilter: 'Yes — approved planning applications in your area', jf: true },
  { feature: 'Council tenders', ratedpeople: 'No', jobfilter: 'Yes — NHS, council, and public authority contracts', jf: true },
  { feature: 'Energy upgrade signals', ratedpeople: 'No', jobfilter: 'Yes — retrofit demand mapped from EPC data', jf: true },
  { feature: 'WhatsApp alerts', ratedpeople: 'No', jobfilter: 'Yes — Gold leads direct to your phone', jf: true },
  { feature: 'Review requirement', ratedpeople: 'Yes — rank depends on reviews', jobfilter: 'No — leads sourced from data, not review count', jf: true },
  { feature: 'Free preview', ratedpeople: 'No', jobfilter: 'Yes — see live leads before paying', jf: true },
];

const quotes = [
  {
    quote: "Rated People sold the same job to me and two others. JobFilter's leads are from planning data — no one else even knows about them yet.",
    role: "Roofer, Glasgow",
  },
  {
    quote: "Credits on Rated People add up fast. £39 flat for JobFilter and I get five times the signal types. The comparison isn't close.",
    role: "Plumber, London",
  },
  {
    quote: "I got a council contract lead from JobFilter worth £18k. That type of lead doesn't exist on Rated People — they only do homeowner jobs.",
    role: "Electrician, Leeds",
  },
];

export function CompareRatedPeoplePage() {
  return (
    <main className="pb-8">
      <section className="bg-[var(--yellow)] soft-grid border-b-4 border-[var(--line)]">
        <div className="page-shell section-pad">
          <span className="micro-label text-[var(--muted)]">JOBFILTER vs RATED PEOPLE</span>
          <h1
            className="headline mt-3"
            style={{ fontSize: 'clamp(36px, 6vw, 80px)', lineHeight: 0.96, color: 'var(--navy)' }}
          >
            Rated People shows you{' '}
            <span style={{ background: 'var(--navy)', color: 'var(--yellow)', display: 'inline-block', padding: '0 10px 4px' }}>
              what everyone sees.
            </span>
            {' '}JobFilter shows you{' '}
            <span style={{ background: 'var(--navy)', color: 'var(--yellow)', display: 'inline-block', padding: '0 10px 4px' }}>
              what nobody is looking at.
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-xl font-black leading-tight text-[var(--ink)]">
            Rated People connects homeowner requests to multiple competing trades. JobFilter scans planning data, council contracts, and EPC signals — and your results are private to you alone.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link className="jf-button bg-[var(--ink)] text-white" href="/find-jobs">
              TRY JOBFILTER FREE — NO CARD NEEDED
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
            Why the source of the lead changes everything
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="jf-box bg-white p-5">
              <p className="micro-label text-[var(--orange)]">RATED PEOPLE SOURCE</p>
              <ul className="mt-3 space-y-2 font-black text-sm text-[var(--ink)]">
                <li>• Homeowner posts job — up to 3 trades notified simultaneously</li>
                <li>• You spend credits to apply before knowing if you'll win</li>
                <li>• Homeowner budget is often an underestimate</li>
                <li>• Ranking and visibility tied to review count</li>
                <li>• No planning, no tenders, no energy signal coverage</li>
              </ul>
            </div>
            <div className="jf-box bg-[var(--navy)] p-5 text-white">
              <p className="micro-label text-[var(--yellow)]">JOBFILTER SOURCE</p>
              <ul className="mt-3 space-y-2 font-black text-sm text-white">
                <li>• Government planning, council tenders, land registry, EPC data</li>
                <li>• Scan is private — only you see your area's results</li>
                <li>• GOLD/SILVER/SKIP scoring — only call what's worth your time</li>
                <li>• Published budget data on contract leads where available</li>
                <li>• £39/month — no credits, no per-application cost</li>
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
                  <th className="p-3 text-center">Rated People</th>
                  <th className="p-3 text-center bg-[var(--yellow)] text-[var(--ink)]">JobFilter</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? 'bg-white' : 'bg-[var(--bg-main)]'}>
                    <td className="p-3 font-black text-[var(--ink)]">{row.feature}</td>
                    <td className="p-3 text-center text-[var(--muted)]">{row.ratedpeople}</td>
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
            Trades who switched from Rated People
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
            Stop competing on reviews. Start scanning data.
          </h2>
          <p className="mt-4 font-black text-white/80 text-lg max-w-xl mx-auto">
            Find UK construction leads no other trade is chasing — scored by planning intent, contract value, and contact strength.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row justify-center">
            <Link className="jf-button bg-[var(--yellow)] text-[var(--ink)]" href="/find-jobs">
              START FREE — NO CARD
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
