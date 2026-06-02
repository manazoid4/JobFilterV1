"use client";
import Link from 'next/link';

const comparison = [
  { feature: 'Lead type', trustatrader: 'Homeowners searching your review profile', jobfilter: 'Planning applications, council contracts, ownership signals & EPC data', jf: true },
  { feature: 'How work finds you', trustatrader: 'Homeowners come to you — passive, review-driven', jobfilter: 'You scan proactively — find jobs before anyone else is called', jf: true },
  { feature: 'Lead exclusivity', trustatrader: 'Shared — your profile sits next to competitors', jobfilter: 'Private scan — no other trade sees your results', jf: true },
  { feature: 'Pricing model', trustatrader: 'Annual membership fee (varies by trade)', jobfilter: '£39/mo flat — no annual lock-in', jf: true },
  { feature: 'Lead scoring', trustatrader: 'None — visibility driven by review count', jobfilter: 'GOLD/SILVER/SKIP based on data signals and intent', jf: true },
  { feature: 'Planning data', trustatrader: 'No', jobfilter: 'Yes — approved applications before homeowners call anyone', jf: true },
  { feature: 'Council tender alerts', trustatrader: 'No', jobfilter: 'Yes — public contracts with buyer names and estimated values', jf: true },
  { feature: 'Budget visibility', trustatrader: 'Not disclosed — quote blind', jobfilter: 'Estimated value shown for tender and contract leads', jf: true },
  { feature: 'Review dependency', trustatrader: 'Yes — rank depends heavily on review volume', jobfilter: 'None — leads are data signals, not review rank', jf: true },
  { feature: 'Free trial', trustatrader: 'No free trial (membership required)', jobfilter: 'Yes — see real leads, no card required', jf: true },
];

const quotes = [
  {
    quote: "TrustATrader is a waiting game. You build reviews, you wait. JobFilter finds jobs from planning data — I'm calling before anyone else knows the work is there.",
    role: "Roofer, Leeds",
  },
  {
    quote: "My review platform membership renewed automatically and the leads dried up. JobFilter is £39/month, cancel any time. The leads are proactive, not passive.",
    role: "Electrician, Bristol",
  },
  {
    quote: "Review platforms rank me against 40 other local trades. JobFilter results are private — no one sees what I see. That's the difference.",
    role: "Plumber, Manchester",
  },
];

export function CompareTrustATraderPage() {
  return (
    <main className="pb-8">
      <section className="bg-[var(--yellow)] soft-grid border-b-4 border-[var(--line)]">
        <div className="page-shell section-pad">
          <span className="micro-label text-[var(--muted)]">JOBFILTER vs TRUSTATRADER</span>
          <h1
            className="headline mt-3"
            style={{ fontSize: 'clamp(36px, 6vw, 80px)', lineHeight: 0.96, color: 'var(--navy)' }}
          >
            TrustATrader waits for{' '}
            <span style={{ background: 'var(--navy)', color: 'var(--yellow)', display: 'inline-block', padding: '0 10px 4px' }}>
              reviews.
            </span>
            {' '}JobFilter scans for{' '}
            <span style={{ background: 'var(--navy)', color: 'var(--yellow)', display: 'inline-block', padding: '0 10px 4px' }}>
              signals.
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-xl font-black leading-tight text-[var(--ink)]">
            TrustATrader is a review profile directory — homeowners find you based on your rating. JobFilter is proactive lead intelligence — you find jobs from planning data, council contracts, and ownership signals before any review profile is relevant.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link className="jf-button bg-[var(--ink)] text-white" href="/find-jobs">
              TRY JOBFILTER FREE — SEE LEADS TRUSTATRADER MISSES
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
            Review profile vs lead intelligence — a different game entirely.
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="jf-box bg-white p-5">
              <p className="micro-label text-[var(--orange)]">TRUSTATRADER MODEL</p>
              <ul className="mt-3 space-y-2 font-black text-sm text-[var(--ink)]">
                <li>• Homeowner searches for a trade — your profile competes with others</li>
                <li>• Visibility determined by review count and recency</li>
                <li>• Annual membership — no leads guaranteed</li>
                <li>• You wait for enquiries — reactive, not proactive</li>
                <li>• No planning data, no contract alerts, no budget visibility</li>
              </ul>
            </div>
            <div className="jf-box bg-[var(--navy)] p-5 text-white">
              <p className="micro-label text-[var(--yellow)]">JOBFILTER MODEL</p>
              <ul className="mt-3 space-y-2 font-black text-sm text-white">
                <li>• We scan planning portals, council contracts, and land registry</li>
                <li>• Your scan is private — no competing trade sees the same results</li>
                <li>• GOLD/SILVER/SKIP scoring — spend time only on real opportunities</li>
                <li>• Estimated value from published data — no more quoting blind</li>
                <li>• £39/month — no annual lock-in, no review grinding</li>
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
                  <th className="p-3 text-center">TrustATrader</th>
                  <th className="p-3 text-center bg-[var(--yellow)] text-[var(--ink)]">JobFilter</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? 'bg-white' : 'bg-[var(--bg-main)]'}>
                    <td className="p-3 font-black text-[var(--ink)]">{row.feature}</td>
                    <td className="p-3 text-center text-[var(--muted)]">{row.trustatrader}</td>
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
            Stop waiting for reviews. Start scanning for jobs.
          </h2>
          <p className="mt-4 font-black text-white/80 text-lg max-w-xl mx-auto">
            Find leads no review profile can surface — scored by planning signals, contract value, and contact strength.
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
