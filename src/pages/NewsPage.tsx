import { Link } from 'react-router-dom';

type NewsItem = {
  headline: string;
  trades: string;
  whyItMatters: string;
  siteTakeaway: string;
  socialAngle: string;
};

const dailyNews: NewsItem[] = [
  {
    headline: 'Planning approvals remain the earliest useful signal for domestic extensions.',
    trades: 'Builders, roofers, electricians, plumbers, carpenters, decorators.',
    whyItMatters: 'Approved extensions, loft conversions, garage conversions, and change-of-use applications usually create several trade packages before the job appears on public marketplaces.',
    siteTakeaway: 'Watch the approval date, scope, applicant type, and location. The best time to approach is after approval but before the homeowner starts ringing every local trade.',
    socialAngle: 'Post angle: "Most trades chase jobs after the customer has already asked five firms. Planning approvals show demand earlier."',
  },
  {
    headline: 'EPC pressure keeps creating retrofit work for heat, insulation, glazing, and ventilation trades.',
    trades: 'HVAC, insulation, glazing, electrical, plumbing, general builders.',
    whyItMatters: 'Low-rated properties can trigger upgrade conversations, especially when landlords, commercial owners, or buyers need a clearer route to compliance and lower running costs.',
    siteTakeaway: 'Do not pitch generic energy saving. Tie the work to a clear property problem: heat loss, poor rating, outdated heating, ventilation, or landlord pressure.',
    socialAngle: 'Post angle: "Retrofit leads are not just heat pumps. They are insulation, ventilation, electrics, glazing, and builder work."',
  },
  {
    headline: 'Public tenders are useful, but only when the deadline, value, and trade fit are clear.',
    trades: 'Electrical, roofing, HVAC, plumbing, maintenance, building contractors.',
    whyItMatters: 'Council and public-sector jobs can be high value, but a weak match burns admin time. The tender must fit your trade, capacity, documents, and location.',
    siteTakeaway: 'Score tenders by deadline, buyer, value, CPV/category match, and whether your firm can realistically deliver the admin requirements.',
    socialAngle: 'Post angle: "A tender is not a lead until it fits your trade, your capacity, and your paperwork."',
  },
  {
    headline: 'New businesses can signal commercial fit-out before they advertise for contractors.',
    trades: 'Electricians, plumbers, HVAC, decorators, shopfitters, builders.',
    whyItMatters: 'Restaurants, salons, offices, clinics, gyms, and small retail units often need power, plumbing, extraction, partitions, flooring, signage, and decoration before opening.',
    siteTakeaway: 'Look for company type, premises clues, opening pressure, licence activity, and whether the work needs several trades at once.',
    socialAngle: 'Post angle: "A new restaurant company is not just paperwork. It can mean kitchen fit-out, extraction, plumbing, electrics, flooring, and signage."',
  },
  {
    headline: 'Bad enquiries usually fail the same checks: no budget, no timing, no buyer, no scope.',
    trades: 'All trades.',
    whyItMatters: 'A full diary is not useful if it is full of people who cannot make a decision. Good trades protect time before agreeing to quote.',
    siteTakeaway: 'Before visiting, ask who decides, when they want the work, what budget band they expect, and whether the scope is real or just an idea.',
    socialAngle: 'Post angle: "The quickest way to improve your week is to stop visiting jobs that have no buyer, no timing, and no scope."',
  },
  {
    headline: 'Local weather and seasonality change which trade signals become urgent.',
    trades: 'Roofers, landscapers, heating engineers, decorators, builders.',
    whyItMatters: 'Storm damage, cold weather, wet ground, summer exterior work, and winter heating demand all change what buyers care about now.',
    siteTakeaway: 'Match the lead to the season. Roof leaks, drainage, heating failures, exterior paint windows, and garden works all have timing pressure.',
    socialAngle: 'Post angle: "A lead gets better when timing pressure appears. Seasonality is part of the score."',
  },
];

const dailyChecks = [
  ['Planning', 'Approvals, extensions, loft conversions, change-of-use, commercial alterations.'],
  ['Energy', 'Low EPC ratings, retrofit pressure, heating and insulation demand.'],
  ['Contracts', 'Public tenders with trade fit, value, deadline, and buyer detail.'],
  ['Companies', 'New businesses that may need fit-out, maintenance, or premises work.'],
  ['Trade forums', 'Real complaints from trades: bad leads, pricing pressure, no-shows, late payment.'],
] as const;

const reusableFormats = [
  ['Instagram carousel', '5 slides: problem, signal, example, trade takeaway, scan CTA.'],
  ['TikTok / Reel', '30 seconds: one trade problem, one data signal, one rule, one CTA.'],
  ['Reddit / Facebook', 'Question-led post with useful advice first. No hard pitch.'],
  ['LinkedIn', 'Serious business angle: lead quality, margin, territory, quoting discipline.'],
  ['Quora / Medium', 'Longer explanation for search: how trades find better construction leads.'],
] as const;

export function NewsPage() {
  return (
    <main className="grid pb-24 md:pb-8">
      <section className="border-b-4 border-[var(--line)] bg-[var(--yellow)] py-16">
        <div className="page-shell text-center">
          <p className="micro-label text-[var(--ink)]">FREE DAILY TRADE NEWS</p>
          <h1 className="headline mx-auto mt-4 max-w-5xl text-4xl leading-none sm:text-6xl md:text-8xl">
            CONSTRUCTION NEWS TRADES CAN ACTUALLY USE.
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-xl font-black text-[var(--ink)]">
            A free daily briefing for UK tradesmen: planning signals, retrofit pressure, tenders, commercial fit-out clues, and lead-quality lessons checked by people close to the industry.
          </p>
          <p className="mx-auto mt-3 max-w-2xl border-2 border-[var(--ink)] bg-white px-4 py-3 text-sm font-black uppercase text-[var(--ink)]">
            Free to read. Updated daily. Built to help trades spot better work and avoid weak enquiries.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link className="jf-button bg-[var(--ink)] text-white" to="/find-jobs">
              SCAN MY POSTCODE
            </Link>
            <a className="jf-button bg-[var(--ink)] text-white" href="https://www.instagram.com/jobfilter.uk/" target="_blank" rel="noopener noreferrer">
              FOLLOW INSTAGRAM
            </a>
            <a className="jf-button bg-white text-[var(--ink)]" href="#daily-briefing">
              READ TODAY'S BRIEFING
            </a>
          </div>
        </div>
      </section>

      <section className="border-b-4 border-[var(--line)] bg-white">
        <div className="page-shell grid gap-6 py-10 lg:grid-cols-[1fr_420px] lg:items-start">
          <div>
            <p className="micro-label text-[var(--orange)]">WHAT WE CHECK</p>
            <h2 className="headline mt-3 text-4xl leading-none md:text-5xl">DAILY SIGNALS, WRITTEN FOR TRADESMEN.</h2>
            <p className="mt-4 max-w-2xl font-black text-[var(--muted)]">
              The point is not industry gossip. The point is useful trade information: what creates work, which trades are affected, and what to do before wasting quoting time.
            </p>
          </div>
          <div className="grid gap-2">
            {dailyChecks.map(([label, body]) => (
              <div key={label} className="border-2 border-[var(--line)] bg-[var(--paper)] p-3">
                <p className="micro-label text-[var(--orange)]">{label}</p>
                <p className="mt-1 text-sm font-black text-[var(--ink)]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="daily-briefing" className="page-shell grid gap-6 py-12">
        <div>
          <p className="micro-label text-[var(--orange)]">TODAY'S TRADE BRIEFING</p>
          <h2 className="headline mt-3 text-4xl leading-none md:text-6xl">POST THESE IDEAS. USE THEM ON SITE. TURN THEM INTO SCANS.</h2>
        </div>
        {dailyNews.map((item, index) => (
          <article key={item.headline} className={`jf-box overflow-hidden ${index % 2 === 0 ? 'bg-white' : 'bg-[var(--navy)] text-white'}`}>
            <div className="p-6">
              <p className="micro-label text-[var(--orange)]">CONSTRUCTION TRADE NEWS</p>
              <h3 className="headline mt-3 text-4xl leading-none md:text-5xl">{item.headline}</h3>
            </div>
            <div className={`grid gap-0 border-t-4 border-[var(--line)] md:grid-cols-2 xl:grid-cols-4 ${index % 2 === 0 ? 'bg-[var(--bg-main)]' : 'bg-white text-[var(--ink)]'}`}>
              <NewsBlock label="Trades affected" value={item.trades} />
              <NewsBlock label="Why it matters" value={item.whyItMatters} />
              <NewsBlock label="Trade takeaway" value={item.siteTakeaway} />
              <NewsBlock label="Social post angle" value={item.socialAngle} />
            </div>
          </article>
        ))}
      </section>

      <section className="border-t-4 border-[var(--line)] bg-white">
        <div className="page-shell grid gap-6 py-10 lg:grid-cols-[1fr_420px] lg:items-start">
          <div>
            <p className="micro-label text-[var(--orange)]">PROMOTION FORMATS</p>
            <h2 className="headline mt-3 text-4xl leading-none md:text-5xl">ONE NEWS ITEM CAN BECOME FIVE POSTS.</h2>
            <p className="mt-4 max-w-2xl font-black text-[var(--muted)]">
              Use each daily briefing item as source material for social posts that pull tradesmen back to JobFilter, the free scan, and the postcode patch offer.
            </p>
          </div>
          <div className="grid gap-2">
            {reusableFormats.map(([label, body]) => (
              <div key={label} className="border-2 border-[var(--line)] bg-[var(--paper)] p-3">
                <p className="micro-label text-[var(--orange)]">{label}</p>
                <p className="mt-1 text-sm font-black text-[var(--ink)]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t-4 border-[var(--line)] bg-[var(--yellow)]">
        <div className="page-shell py-10">
          <p className="micro-label text-[var(--ink)]">NEXT STEP</p>
          <h2 className="headline mt-3 text-4xl leading-none md:text-5xl">READ THE NEWS. POST THE ANGLE. SCAN THE PATCH.</h2>
          <p className="mt-4 max-w-xl font-black text-[var(--ink)]">
            If a signal points to real work, run the postcode scan and see what JobFilter can find near you.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link className="jf-button bg-[var(--ink)] text-white" to="/find-jobs">START FREE SCAN</Link>
            <Link className="jf-button bg-white text-[var(--ink)]" to="/pricing">CLAIM A PATCH</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function NewsBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b-4 border-[var(--line)] p-5 last:border-b-0 md:border-b-0 md:border-r-4 md:last:border-r-0">
      <p className="micro-label text-[var(--orange)]">{label}</p>
      <p className="mt-3 text-base font-black leading-snug">{value}</p>
    </div>
  );
}
