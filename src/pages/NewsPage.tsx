import { Link } from 'react-router-dom';

type NewsItem = {
  headline: string;
  trades: string[];
  insight: string;
  takeaway: string;
  postAngle: string;
  tag: string;
};

const dailyNews: NewsItem[] = [
  {
    tag: 'PLANNING',
    headline: 'Planning approvals are the earliest signal for domestic extension work.',
    trades: ['Builders', 'Roofers', 'Electricians', 'Plumbers', 'Carpenters'],
    insight:
      'Approved extensions, loft conversions, and change-of-use applications create several trade packages before the job appears on any marketplace. The homeowner has budget committed and a timeline that is now real.',
    takeaway:
      'Approach after approval but before they start ringing every local trade. Watch approval date, scope, applicant type, and location. That window is usually two to six weeks.',
    postAngle:
      '"Most trades chase jobs after the customer has already asked five firms. Planning approvals show demand earlier."',
  },
  {
    tag: 'RETROFIT',
    headline: 'EPC pressure keeps creating heat, insulation, glazing, and ventilation work.',
    trades: ['HVAC', 'Insulation', 'Glazing', 'Electricians', 'Plumbers'],
    insight:
      'Low-rated properties trigger upgrade conversations — especially when landlords, commercial owners, or buyers need a clearer route to compliance. The work is real but the buyer often does not know which trade to call first.',
    takeaway:
      'Do not pitch generic energy saving. Tie the work to a specific property problem: heat loss, poor rating, outdated heating, ventilation issues, or direct landlord pressure. Buyers respond to specific diagnosis.',
    postAngle:
      '"Retrofit leads are not just heat pumps. They are insulation, ventilation, electrics, glazing, and builder work."',
  },
  {
    tag: 'TENDERS',
    headline: 'Public tenders only earn quoting time when deadline, value, and trade fit are clear.',
    trades: ['Electricians', 'Roofers', 'HVAC', 'Plumbers', 'Building contractors'],
    insight:
      'Council and public-sector jobs can be high value, but a weak match burns admin time fast. Most firms overbid on tenders that do not fit their trade, capacity, or document requirements.',
    takeaway:
      'Score tenders by: deadline realistic? buyer named? value in your range? CPV code fits your trade? Can you produce the admin required? If any answer is no, skip it.',
    postAngle:
      '"A tender is not a lead until it fits your trade, your capacity, and your paperwork."',
  },
  {
    tag: 'COMMERCIAL',
    headline: 'New business registrations signal commercial fit-out before anyone advertises.',
    trades: ['Electricians', 'Plumbers', 'HVAC', 'Decorators', 'Shopfitters'],
    insight:
      'Restaurants, salons, offices, clinics, gyms, and retail units need power, plumbing, extraction, partitions, flooring, and signage before opening. The company registration often appears weeks before any contractor is called.',
    takeaway:
      'Look for company type, premises clues, opening pressure, licence activity, and whether the scope needs several trades at once. That is a warm commercial conversation, not a cold call.',
    postAngle:
      '"A new restaurant company is not just paperwork. It can mean kitchen fit-out, extraction, plumbing, electrics, flooring, and signage."',
  },
  {
    tag: 'LEAD QUALITY',
    headline: 'Bad enquiries fail the same four checks every time.',
    trades: ['All trades'],
    insight:
      'No budget, no timing, no named buyer, no real scope. A full diary is not useful if it is full of people who cannot make a decision. Most wasted site visits could be avoided with two minutes on the phone.',
    takeaway:
      'Before visiting: who decides? When do they want the work? What budget band? Is the scope confirmed or still an idea? If you cannot answer all four, the visit is a gamble, not a quote.',
    postAngle:
      '"The fastest way to improve your week is to stop visiting jobs with no buyer, no timing, and no scope."',
  },
  {
    tag: 'SEASONAL',
    headline: 'Seasonality changes which signals become urgent — and which trades benefit first.',
    trades: ['Roofers', 'Heating engineers', 'Landscapers', 'Decorators'],
    insight:
      'Storm damage, cold weather, wet ground, summer exterior windows, and winter heating demand all shift what buyers care about now. The same lead scores differently depending on the season.',
    takeaway:
      'Match the lead to the season. Roof leaks, drainage issues, heating failures, exterior paint windows, and garden works all carry timing pressure that changes the quality score.',
    postAngle:
      '"A lead gets better when timing pressure appears. Seasonality is part of the score."',
  },
];

const tagColours: Record<string, string> = {
  PLANNING: 'bg-[var(--yellow)] text-[var(--ink)]',
  RETROFIT: 'bg-[var(--green)] text-white',
  TENDERS: 'bg-[var(--ink)] text-white',
  COMMERCIAL: 'bg-[var(--orange)] text-white',
  'LEAD QUALITY': 'bg-[var(--muted)] text-white',
  SEASONAL: 'bg-[var(--yellow-2)] text-[var(--ink)]',
};

export function NewsPage() {
  return (
    <main className="pb-24 md:pb-8">

      {/* Hero */}
      <section className="bg-[var(--yellow)] border-b-4 border-[var(--ink)]">
        <div className="page-shell py-12">
          <p className="micro-label text-[var(--ink)]">FREE DAILY TRADE BRIEFING</p>
          <h1 className="headline mt-3 max-w-4xl text-5xl leading-none sm:text-7xl">
            CONSTRUCTION NEWS TRADES CAN ACTUALLY USE.
          </h1>
          <p className="mt-4 max-w-2xl font-black text-[var(--ink)] text-lg leading-snug">
            Planning signals. Retrofit pressure. Tenders. Commercial fit-out clues.
            Lead-quality lessons. Updated daily. Free.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link className="jf-button bg-[var(--ink)] text-white" to="/find-jobs">
              SCAN MY POSTCODE
            </Link>
            <a
              className="jf-button bg-white text-[var(--ink)]"
              href="https://www.instagram.com/jobfilter.uk/"
              target="_blank"
              rel="noopener noreferrer"
            >
              FOLLOW @JOBFILTER.UK
            </a>
          </div>
        </div>
      </section>

      {/* Signal strip */}
      <section className="bg-[var(--ink)] border-b-4 border-[var(--yellow)]">
        <div className="page-shell py-3">
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            {(['Planning', 'EPC / Retrofit', 'Public Tenders', 'New Companies', 'Trade Forums'] as const).map((s) => (
              <span key={s} className="text-xs font-black uppercase tracking-widest text-[var(--yellow)]">
                ▸ {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* News feed */}
      <section className="page-shell py-10">
        <div className="mb-8">
          <p className="micro-label text-[var(--orange)]">TODAY'S BRIEFING</p>
          <h2 className="headline mt-2 text-3xl leading-none md:text-4xl">
            6 SIGNALS. USE THEM OR POST THEM.
          </h2>
        </div>

        <div className="grid gap-0 border-2 border-[var(--ink)]">
          {dailyNews.map((item, i) => (
            <article
              key={item.headline}
              className={`border-b-2 border-[var(--ink)] last:border-b-0 ${i % 2 === 0 ? 'bg-white' : 'bg-[var(--paper)]'}`}
            >
              {/* Article header */}
              <div className="flex items-start gap-4 p-5 pb-4 border-b border-[var(--rule)]">
                <span className={`shrink-0 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${tagColours[item.tag] ?? 'bg-[var(--ink)] text-white'}`}>
                  {item.tag}
                </span>
                <h3 className="headline text-xl leading-tight md:text-2xl">{item.headline}</h3>
              </div>

              {/* Article body */}
              <div className="grid gap-0 md:grid-cols-[1fr_1fr]">
                {/* Left col */}
                <div className="border-b-2 border-[var(--rule)] p-5 md:border-b-0 md:border-r-2">
                  <p className="micro-label text-[10px] text-[var(--muted)] mb-2">WHY IT MATTERS</p>
                  <p className="text-sm font-black leading-relaxed text-[var(--ink)]">{item.insight}</p>
                  {/* Trades */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {item.trades.map((t) => (
                      <span key={t} className="border border-[var(--rule)] bg-[var(--offwhite)] px-2 py-0.5 text-[10px] font-black uppercase text-[var(--muted)]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right col */}
                <div className="p-5">
                  <p className="micro-label text-[10px] text-[var(--muted)] mb-2">TRADE TAKEAWAY</p>
                  <p className="text-sm font-black leading-relaxed text-[var(--ink)]">{item.takeaway}</p>

                  {/* Post angle callout */}
                  <div className="mt-4 border-l-4 border-[var(--yellow)] bg-[var(--yellow)]/10 pl-3 py-2 pr-2">
                    <p className="text-[10px] font-black uppercase tracking-wider text-[var(--muted)] mb-1">POST THIS</p>
                    <p className="text-xs font-black italic text-[var(--ink)]">{item.postAngle}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[var(--ink)] border-t-4 border-[var(--yellow)]">
        <div className="page-shell py-10">
          <p className="micro-label text-[var(--yellow)]">NEXT STEP</p>
          <h2 className="headline mt-2 text-4xl leading-none text-white md:text-5xl">
            SEE WHAT'S LIVE IN YOUR PATCH.
          </h2>
          <p className="mt-3 max-w-lg font-black text-white/70">
            If a signal points to real work near you, run the postcode scan and see what JobFilter finds before anyone else calls.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link className="jf-button bg-[var(--yellow)] text-[var(--ink)]" to="/find-jobs">
              START FREE SCAN
            </Link>
            <Link className="jf-button bg-white text-[var(--ink)]" to="/pricing">
              CLAIM A PATCH
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
