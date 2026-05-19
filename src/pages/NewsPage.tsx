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

const articleNumbers = ['01', '02', '03', '04', '05', '06'];

export function NewsPage() {
  return (
    <main className="pb-24">

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="bg-[var(--yellow)] border-b-4 border-[var(--ink)]">
        <div className="page-shell py-14 sm:py-20">
          <p className="micro-label text-[var(--ink)]">FREE DAILY TRADE BRIEFING</p>
          <h1 className="headline mt-3 text-5xl leading-none sm:text-7xl max-w-3xl">
            CONSTRUCTION NEWS TRADES CAN ACTUALLY USE.
          </h1>
          <p className="mt-5 max-w-xl font-bold text-[var(--ink)] text-lg leading-snug">
            Planning signals. Retrofit pressure. Tenders. Commercial fit-out clues.
            Lead-quality lessons. Updated daily. Free.
          </p>

          {/* Signal category tags inside hero */}
          <div className="mt-6 flex flex-wrap gap-2">
            {['PLANNING', 'EPC / RETROFIT', 'PUBLIC TENDERS', 'NEW COMPANIES', 'LEAD QUALITY', 'SEASONAL'].map((s) => (
              <span
                key={s}
                className="border-2 border-[var(--ink)] bg-white px-3 py-1 text-xs font-black uppercase tracking-wider text-[var(--ink)]"
              >
                {s}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
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

      {/* ── SECTION LABEL ───────────────────────────── */}
      <div className="page-shell pt-10 pb-4">
        <p className="micro-label text-[var(--orange)]">TODAY'S BRIEFING</p>
        <h2 className="headline mt-1 text-3xl leading-none sm:text-4xl">
          6 SIGNALS. USE THEM OR POST THEM.
        </h2>
      </div>

      {/* ── ARTICLE FEED ────────────────────────────── */}
      <div className="page-shell">
        <div className="flex flex-col gap-8">
          {dailyNews.map((item, i) => (
            <article
              key={item.headline}
              className="border-2 border-[var(--ink)] bg-white"
            >
              {/* ── Article top bar: number + category tag ── */}
              <div className="flex items-center gap-3 border-b-2 border-[var(--ink)] px-6 py-3">
                <span className="font-mono text-xs font-black text-[var(--rule)]">
                  {articleNumbers[i]}
                </span>
                <span
                  className={`px-3 py-1 text-xs font-black uppercase tracking-wider ${tagColours[item.tag] ?? 'bg-[var(--ink)] text-white'}`}
                >
                  {item.tag}
                </span>
              </div>

              {/* ── Headline ── */}
              <div className="px-6 pt-6 pb-4">
                <h3 className="headline text-2xl leading-tight sm:text-3xl">
                  {item.headline}
                </h3>

                {/* Trade chips */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.trades.map((t) => (
                    <span
                      key={t}
                      className="border border-[var(--rule)] bg-[var(--offwhite)] px-2 py-1 text-xs font-black uppercase text-[var(--muted)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* ── Divider ── */}
              <hr className="border-0 border-t border-[var(--rule)] mx-6" />

              {/* ── Insight ── */}
              <div className="px-6 pt-5 pb-4">
                <p className="micro-label text-[10px] text-[var(--muted)] mb-2">THE INSIGHT</p>
                <p className="text-base font-bold leading-relaxed text-[var(--ink)]">
                  {item.insight}
                </p>
              </div>

              {/* ── Trade takeaway: blockquote style ── */}
              <div className="mx-6 mb-5 border-l-4 border-[var(--yellow)] pl-4 py-1">
                <p className="micro-label text-[10px] text-[var(--muted)] mb-2">TRADE TAKEAWAY</p>
                <p className="text-sm font-bold leading-relaxed text-[var(--ink)]">
                  {item.takeaway}
                </p>
              </div>

              {/* ── POST THIS callout ── */}
              <div className="border-t-2 border-[var(--ink)] bg-[var(--yellow)] px-6 py-5">
                <p className="micro-label text-[10px] text-[var(--ink)] mb-2">POST THIS →</p>
                <p className="text-sm font-black italic text-[var(--ink)] leading-snug">
                  {item.postAngle}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* ── BOTTOM CTA ──────────────────────────────── */}
      <section className="mt-16 bg-[var(--ink)] border-t-4 border-[var(--yellow)]">
        <div className="page-shell py-14">
          <p className="micro-label text-[var(--yellow)]">NEXT STEP</p>
          <h2 className="headline mt-2 text-4xl leading-none text-white sm:text-5xl">
            SEE WHAT'S LIVE IN YOUR PATCH.
          </h2>
          <p className="mt-4 max-w-lg font-bold text-white/70 leading-relaxed">
            If a signal points to real work near you, run the postcode scan and see what JobFilter finds before anyone else calls.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
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
