"use client";
import Link from 'next/link';

const comparison = [
  { feature: 'Lead exclusivity', bark: 'Sold to 3-5 trades simultaneously', jobfilter: 'Your scan — private, unseen by competitors', jf: true },
  { feature: 'Lead source', bark: 'Homeowner fills a Bark form', jobfilter: 'Planning approvals, tender data, ownership signals, retrofit intelligence', jf: true },
  { feature: 'Pay per lead', bark: 'Yes — credits per response', jobfilter: 'No — flat £39/mo unlimited scanning', jf: true },
  { feature: 'Lead quality scoring', bark: 'Basic category match only', jobfilter: 'GOLD/SILVER/SKIP scoring with intent signals', jf: true },
  { feature: 'Contact detail included', bark: 'Only after spending credits', jobfilter: 'Contact path shown — buyer named where available', jf: true },
  { feature: 'WhatsApp delivery', bark: 'No', jobfilter: 'Yes — Gold leads direct to your phone', jf: true },
  { feature: 'Planning application signals', bark: 'No', jobfilter: 'Yes — approved applications in your patch', jf: true },
  { feature: 'Public contract alerts', bark: 'No', jobfilter: 'Yes — council and NHS tenders with budgets', jf: true },
  { feature: 'Energy retrofit signals', bark: 'No', jobfilter: 'Yes — verified retrofit demand signals', jf: true },
  { feature: 'Free tier', bark: 'No free preview', jobfilter: 'Yes — see leads before paying', jf: true },
  { feature: 'Monthly cost ceiling', bark: 'Uncapped — more leads = more spend', jobfilter: '£39/mo fixed', jf: true },
  { feature: 'Review profile required', bark: 'Yes — rankings depend on reviews', jobfilter: 'No — leads based on data, not reviews', jf: true },
];

const quotes = [
  {
    quote: "Bark kept selling the same lead to five trades. JobFilter shows me jobs no one else is scanning for.",
    role: "Electrician, Birmingham",
  },
  {
    quote: "I spent £120 on Bark in one month chasing leads that went cold. JobFilter is £39 flat and the signals are real.",
    role: "Plumber, Manchester",
  },
  {
    quote: "The GOLD scoring is what Bark is missing. I don't want ten leads — I want three that are worth my time.",
    role: "Roofer, Leeds",
  },
];

export function CompareBarkPage() {
  return (
    <main className="pb-8">
      <section className="bg-[var(--yellow)] soft-grid border-b-4 border-[var(--line)]">
        <div className="page-shell section-pad">
          <span className="micro-label text-[var(--muted)]">JOBFILTER vs BARK</span>
          <h1
            className="headline mt-3"
            style={{ fontSize: 'clamp(36px, 6vw, 80px)', lineHeight: 0.96, color: 'var(--navy)' }}
          >
            Bark sells the same lead{' '}
            <span style={{ background: 'var(--navy)', color: 'var(--yellow)', display: 'inline-block', padding: '0 10px 4px' }}>
              to five trades.
            </span>
            {' '}JobFilter finds leads{' '}
            <span style={{ background: 'var(--navy)', color: 'var(--yellow)', display: 'inline-block', padding: '0 10px 4px' }}>
              nobody else sees.
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-xl font-black leading-tight text-[var(--ink)]">
            Bark charges you credits for shared leads from form-fillers. JobFilter scans planning data, council contracts, and ownership signals — and delivers scored, exclusive intelligence direct to your phone.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link className="jf-button bg-[var(--ink)] text-white" href="/find-jobs">
              TRY JOBFILTER FREE — NO CARD NEEDED
            </Link>
            <Link className="jf-button bg-white text-[var(--ink)]" href="#comparison">
              SEE THE FULL COMPARISON
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg-main)] border-b-4 border-[var(--line)]">
        <div className="page-shell section-pad">
          <h2 className="headline" style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: 'var(--navy)' }}>
            The fundamental problem with Bark
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="jf-box bg-white p-5">
              <p className="micro-label text-[var(--orange)]">HOW BARK WORKS</p>
              <ul className="mt-3 space-y-2 font-black text-sm text-[var(--ink)]">
                <li>• Homeowner fills a form on Bark's site</li>
                <li>• Bark sells that lead to 3–5 competing trades simultaneously</li>
                <li>• You pay credits just to see the contact details</li>
                <li>• You're already behind — others got the same lead moments ago</li>
                <li>• Form-fillers often don't convert — no budget data provided</li>
              </ul>
            </div>
            <div className="jf-box bg-[var(--navy)] p-5 text-white">
              <p className="micro-label text-[var(--yellow)]">HOW JOBFILTER WORKS</p>
              <ul className="mt-3 space-y-2 font-black text-sm text-white">
                <li>• We scan planning approvals, contracts, retrofit signals, and ownership data</li>
                <li>• Your scan is private — no other trade sees your results</li>
                <li>• GOLD/SILVER/SKIP scoring so you only chase what pays</li>
                <li>• Contact path shown — decision maker identified where possible</li>
                <li>• £39/month flat — no credits, no per-lead charges ever</li>
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
                  <th className="p-3 text-center">Bark</th>
                  <th className="p-3 text-center bg-[var(--yellow)] text-[var(--ink)]">JobFilter</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? 'bg-white' : 'bg-[var(--bg-main)]'}>
                    <td className="p-3 font-black text-[var(--ink)]">{row.feature}</td>
                    <td className="p-3 text-center text-[var(--muted)]">{row.bark}</td>
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
            Trades who switched from Bark
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
            Stop paying per lead. Start scanning smarter.
          </h2>
          <p className="mt-4 font-black text-white/80 text-lg max-w-xl mx-auto">
            See real UK construction leads scored by intent — not shared form-fillers competing with four other trades.
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
