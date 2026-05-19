import { Link } from 'react-router-dom';

type NewsItem = {
  tag: string;
  headline: string;
  trades: string[];
  summary: string;
  whyItMatters: string;
  tradeTakeaway: string;
  postAngle: string;
  bestFor: string[];
};

const dailyBriefing: NewsItem[] = [
  {
    tag: 'PLANNING',
    headline: 'Planning approvals are still the earliest clean signal for domestic work.',
    trades: ['Builders', 'Roofers', 'Carpenters', 'Plumbers', 'Electricians'],
    summary:
      'Extensions, loft conversions, and major refurbishments usually show up in planning before they become public competition. By the time they hit a marketplace, a lot of the value has already been squeezed out.',
    whyItMatters:
      'The approval tells you the buyer has already moved beyond ideas. That matters because timing, budget, and scope are all moving from speculation to action.',
    tradeTakeaway:
      'Watch for approval date, address density, applicant type, and the size of the scope. The best work usually sits in the short window after approval and before the homeowner starts calling round.',
    postAngle:
      'Most trades chase work after the customer has already spoken to half the town. Planning approvals show the work earlier, when it still has margin.',
    bestFor: ['Instagram carousel', 'LinkedIn post', 'Reddit comment'],
  },
  {
    tag: 'RETROFIT',
    headline: 'EPC pressure keeps creating insulation, heating, ventilation, and glazing jobs.',
    trades: ['Heating engineers', 'Insulation firms', 'Glaziers', 'Electricians', 'Builders'],
    summary:
      'Poor EPC ratings, landlord pressure, and buyer surveys keep forcing upgrade conversations. The work is rarely one trade only. It usually spreads across heating, insulation, windows, ventilation, and follow-on builder work.',
    whyItMatters:
      'Retrofit demand is not abstract policy. It turns into real quoteable jobs when a property fails a rating target, a landlord needs to act, or a buyer wants the issue solved before completion.',
    tradeTakeaway:
      'Do not sell generic energy savings. Sell the actual fix: heat loss, condensation, outdated heating, poor ventilation, or a property that needs to be made compliant.',
    postAngle:
      'EPC pressure is not just about heat pumps. It opens work for any trade that helps a property meet the next standard.',
    bestFor: ['Instagram reel', 'LinkedIn note', 'Medium explainer'],
  },
  {
    tag: 'TENDERS',
    headline: 'Public tenders only matter when the deadline, buyer, and scope fit your trade.',
    trades: ['Electricians', 'Roofers', 'Plumbers', 'Fit-out firms', 'Main contractors'],
    summary:
      'Council work, school maintenance, social housing upgrades, and public framework jobs can be solid opportunities, but they also burn time quickly if you are not a close fit.',
    whyItMatters:
      'A tender is only worth chasing if the admin, insurance, capacity, and price band make sense. Plenty of firms waste half a day on jobs they were never really suited to win.',
    tradeTakeaway:
      'Check whether the buyer is named, whether the deadline is realistic, whether the scope matches your trade, and whether the paperwork is worth the effort. If not, skip it.',
    postAngle:
      'A tender is not a lead until it fits your trade, your paperwork, and your capacity.',
    bestFor: ['LinkedIn post', 'Quora answer', 'Facebook group post'],
  },
  {
    tag: 'COMMERCIAL',
    headline: 'New company formations and fit-out clues can point to work before the fit-out starts.',
    trades: ['Electricians', 'Plumbers', 'HVAC', 'Joiners', 'Decorators'],
    summary:
      'Restaurants, salons, gyms, clinics, offices, and retail spaces usually need multiple trades before opening. The paperwork often appears before the site becomes visible on the street.',
    whyItMatters:
      'A new company, lease, or premises change can be the first clue that power, plumbing, partitions, flooring, extraction, signage, or compliance work is coming next.',
    tradeTakeaway:
      'Look for opening pressure, fit-out scope, and whether several trades are needed together. That is warmer than a generic cold call because the buyer already has a real premises problem.',
    postAngle:
      'A new business registration can be the start of a real commercial fit-out chain, not just admin noise.',
    bestFor: ['Instagram carousel', 'LinkedIn post', 'Medium article'],
  },
  {
    tag: 'LOCAL SIGNALS',
    headline: 'Council maintenance, landlord pressure, and public upgrades can move before the wider market notices.',
    trades: ['Builders', 'Roofers', 'Heating engineers', 'Electrical firms', 'Fit-out teams'],
    summary:
      'Local authority repair cycles, school upgrades, housing stock improvements, and landlord compliance work all create recurring trade demand. These jobs are easy to miss if you only watch the big boards.',
    whyItMatters:
      'The smaller the market, the more important early signal becomes. Local work often depends on timing, relationships, and whether you spot the issue before everyone else does.',
    tradeTakeaway:
      'If you work a patch, watch the patch. A council budget, housing programme, or landlord upgrade wave can support several months of real work.',
    postAngle:
      'The best local jobs often show up as a maintenance issue, a compliance issue, or a budget that is already approved.',
    bestFor: ['Facebook group post', 'Reddit discussion', 'LinkedIn update'],
  },
  {
    tag: 'LEAD QUALITY',
    headline: 'Most wasted visits fail the same checks: no timing, no budget, no buyer, no scope.',
    trades: ['All trades'],
    summary:
      'A busy diary is not useful if half the appointments are people who are only browsing. Real jobs are the ones where a buyer, a timeline, and a real scope are already present.',
    whyItMatters:
      'The fastest way to improve conversion is usually not more leads. It is fewer bad visits, fewer vague enquiries, and fewer quotes written for people who never meant to hire anyone.',
    tradeTakeaway:
      'Before you quote, ask who decides, when the work starts, what the budget band is, and whether the scope is fixed or still just an idea. If those answers are missing, the lead is weak.',
    postAngle:
      'The week gets better when you stop visiting jobs that were never going to turn into paid work.',
    bestFor: ['Instagram story', 'LinkedIn post', 'Quora answer'],
  },
];

const tagColours: Record<string, string> = {
  PLANNING: 'bg-[var(--yellow)] text-[var(--ink)]',
  RETROFIT: 'bg-[var(--green)] text-white',
  TENDERS: 'bg-[var(--ink)] text-white',
  COMMERCIAL: 'bg-[var(--orange)] text-white',
  'LOCAL SIGNALS': 'bg-[var(--muted)] text-white',
  'LEAD QUALITY': 'bg-[var(--yellow-2)] text-[var(--ink)]',
};

const articleNumbers = ['01', '02', '03', '04', '05', '06'];

export function NewsPage() {
  return (
    <main className="pb-24">
      <section className="bg-[var(--yellow)] border-b-4 border-[var(--ink)]">
        <div className="page-shell py-14 sm:py-20">
          <p className="micro-label text-[var(--ink)]">FREE DAILY BRIEFING</p>
          <h1 className="headline mt-3 text-5xl leading-none sm:text-7xl max-w-3xl">
            CONSTRUCTION NEWS TRADES CAN USE TODAY.
          </h1>
          <p className="mt-5 max-w-2xl font-bold text-[var(--ink)] text-lg leading-snug">
            Free to read. Updated daily. Reviewed by people close to the industry. Built for
            tradesmen, small contractors, and existing customers who want the signal, not the noise.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {['PLANNING', 'EPC / RETROFIT', 'PUBLIC TENDERS', 'COMMERCIAL FIT-OUT', 'LOCAL SIGNALS', 'TRADE TAKEAWAYS'].map((s) => (
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
              RUN A POSTCODE SCAN
            </Link>
            <a
              className="jf-button bg-white text-[var(--ink)]"
              href="https://www.instagram.com/jobfilter.uk/"
              target="_blank"
              rel="noopener noreferrer"
            >
              FOLLOW THE DAILY BRIEF
            </a>
          </div>
        </div>
      </section>

      <div className="page-shell pt-10 pb-4">
        <p className="micro-label text-[var(--orange)]">TODAY'S BRIEFING</p>
        <h2 className="headline mt-1 text-3xl leading-none sm:text-4xl">
          6 ITEMS. EACH ONE CAN BECOME A POST.
        </h2>
        <p className="mt-3 max-w-2xl text-sm font-bold leading-relaxed text-[var(--muted)]">
          Each item is written to stand alone as a briefing note, then be reused on Instagram,
          Reddit, Quora, Facebook groups, LinkedIn, TikTok, or Medium without changing the core point.
        </p>
      </div>

      <div className="page-shell">
        <div className="flex flex-col gap-8">
          {dailyBriefing.map((item, i) => (
            <article key={item.headline} className="border-2 border-[var(--ink)] bg-white">
              <div className="flex items-center gap-3 border-b-2 border-[var(--ink)] px-6 py-3">
                <span className="font-mono text-xs font-black text-[var(--rule)]">{articleNumbers[i]}</span>
                <span
                  className={`px-3 py-1 text-xs font-black uppercase tracking-wider ${
                    tagColours[item.tag] ?? 'bg-[var(--ink)] text-white'
                  }`}
                >
                  {item.tag}
                </span>
              </div>

              <div className="px-6 pt-6 pb-4">
                <h3 className="headline text-2xl leading-tight sm:text-3xl">{item.headline}</h3>

                <div className="mt-4 flex flex-wrap gap-2">
                  {item.trades.map((trade) => (
                    <span
                      key={trade}
                      className="border border-[var(--rule)] bg-[var(--offwhite)] px-2 py-1 text-xs font-black uppercase text-[var(--muted)]"
                    >
                      {trade}
                    </span>
                  ))}
                </div>
              </div>

              <hr className="mx-6 border-0 border-t border-[var(--rule)]" />

              <div className="grid gap-4 px-6 py-5 md:grid-cols-3">
                <div>
                  <p className="micro-label text-[10px] text-[var(--muted)] mb-2">WHAT IT SAYS</p>
                  <p className="text-base font-bold leading-relaxed text-[var(--ink)]">{item.summary}</p>
                </div>
                <div>
                  <p className="micro-label text-[10px] text-[var(--muted)] mb-2">WHY IT MATTERS</p>
                  <p className="text-base font-bold leading-relaxed text-[var(--ink)]">{item.whyItMatters}</p>
                </div>
                <div>
                  <p className="micro-label text-[10px] text-[var(--muted)] mb-2">TRADE TAKEAWAY</p>
                  <p className="text-base font-bold leading-relaxed text-[var(--ink)]">{item.tradeTakeaway}</p>
                </div>
              </div>

              <div className="mx-6 mb-5 border-l-4 border-[var(--yellow)] bg-[var(--offwhite)] px-4 py-4">
                <p className="micro-label text-[10px] text-[var(--muted)] mb-2">POST ANGLE</p>
                <p className="text-sm font-black italic text-[var(--ink)] leading-snug">{item.postAngle}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.bestFor.map((platform) => (
                    <span
                      key={platform}
                      className="border-2 border-[var(--ink)] bg-white px-2 py-1 text-[10px] font-black uppercase tracking-wider text-[var(--ink)]"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <section className="mt-16 bg-[var(--ink)] border-t-4 border-[var(--yellow)]">
        <div className="page-shell py-14">
          <p className="micro-label text-[var(--yellow)]">HOW TO USE THIS PAGE</p>
          <h2 className="headline mt-2 text-4xl leading-none text-white sm:text-5xl">
            READ IT FOR SIGNALS. REPOST IT FOR REACH.
          </h2>
          <p className="mt-4 max-w-2xl font-bold text-white/70 leading-relaxed">
            This page is the public briefing. Use it to spot jobs earlier, explain the market to
            customers, and turn one strong local signal into a social post on whichever channel
            you use that day.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="jf-button bg-[var(--yellow)] text-[var(--ink)]" to="/find-jobs">
              RUN FREE SCAN
            </Link>
            <Link className="jf-button bg-white text-[var(--ink)]" to="/pricing">
              SEE PAID LEAD DEPTH
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
