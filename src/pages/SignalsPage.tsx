"use client";
import Link from 'next/link';

const opportunityTypes = [
  {
    num: '01',
    label: 'MAINTENANCE FRAMEWORK',
    tag: 'RECURRING WORK',
    what: 'A buyer sets up a panel of contractors for recurring site maintenance over 2–4 years. Call-offs are issued as work arises — some direct award, some via mini-competition among panel members.',
    suits: 'Firms with local presence and the capacity to respond at short notice. Low bid risk once on the panel, though some call-offs still require competitive pricing.',
    decision: 'BID',
    detail: 'Panel entry is competitive. Check the framework terms — call-off mechanism varies between direct award and mini-competition.',
  },
  {
    num: '02',
    label: 'ONE-OFF WORKS CONTRACT',
    tag: 'SINGLE PROJECT',
    what: 'A defined project with a fixed scope and a published contract value. One tender, one award. Delivered and closed.',
    suits: 'Any contractor with the relevant trade, insurance and references. Most common notice type on Find a Tender.',
    decision: 'BID',
    detail: 'Read the scope carefully — scope creep on public works is limited by contract, which protects you.',
  },
  {
    num: '03',
    label: 'PRE-QUALIFICATION QUESTIONNAIRE',
    tag: 'FIRST STAGE',
    what: 'A screening round before the tender documents are issued. No cost to enter. Buyers shortlist a fixed number of firms before releasing the full ITT.',
    suits: 'Smaller firms with limited bid resources — PQQ effort is lower than a full tender submission.',
    decision: 'BID',
    detail: 'A failed PQQ costs little. A passed PQQ gives you a closed shortlist — fewer competitors than an open tender.',
  },
  {
    num: '04',
    label: 'DYNAMIC PURCHASING SYSTEM',
    tag: 'OPEN ENTRY',
    what: 'An online catalogue of pre-approved suppliers. Any compliant firm can apply to join at any point. Each call-off is awarded via a mini-competition among admitted suppliers in the relevant category.',
    suits: 'Firms that want a steady pipeline of smaller contracts. Entry is relatively light, but you still need bid capacity for individual call-off competitions.',
    decision: 'WATCH',
    detail: 'Admission does not guarantee work — each call-off requires a competitive response. Confirm the likely call-off value and competition frequency before committing.',
  },
  {
    num: '05',
    label: 'FRAMEWORK AGREEMENT',
    tag: 'MULTI-SUPPLIER',
    what: 'A buyer or group of buyers establishes a roster of approved contractors. Individual call-off contracts are placed from the framework over its lifetime, often 4 years.',
    suits: 'Contractors with capacity across a region. Competition for entry is stiffer than a DPS, but framework volumes can be substantial.',
    decision: 'BID',
    detail: 'Check whether call-offs require a mini-competition — some frameworks still require competitive pricing per order.',
  },
  {
    num: '06',
    label: 'CAPITAL BUILD PROJECT',
    tag: 'LARGER WORKS',
    what: 'A new-build or major extension for a public body. Typically procured under JCT or NEC conditions. Values usually exceed £500k.',
    suits: 'Firms with a strong QS function, recognised quality management systems, relevant professional body memberships and a track record on comparable-value projects. Unsuitable for most 5–10 person firms bidding as prime contractor.',
    decision: 'SUBCONTRACT',
    detail: 'Flag these for subcontract targeting — the main contractor will tender specialist packages separately.',
  },
  {
    num: '07',
    label: 'RESPONSIVE REPAIRS CONTRACT',
    tag: 'REACTIVE VOLUME',
    what: 'A housing association or council appoints a contractor to handle day-to-day repairs across a housing stock. Volume is steady but unpredictable on any given day.',
    suits: 'Firms with local operatives, a mobile workforce and robust job-management systems. Not suitable for firms that price each job individually.',
    decision: 'WATCH',
    detail: 'Margin per job is lower than project work. Assess the KPI regime — penalties for missed response times erode margin fast.',
  },
  {
    num: '08',
    label: 'DESIGN AND BUILD',
    tag: 'WITH DESIGN LIABILITY',
    what: 'The contractor takes on both the design and construction. Single-point responsibility for the client. Requires professional indemnity insurance for design.',
    suits: 'Firms with in-house design capability or a reliable architect/engineer sub-consultant. Most small contractors should avoid prime responsibility here.',
    decision: 'SKIP',
    detail: 'Subcontract route still viable — the main D&B contractor will package trade works separately.',
  },
  {
    num: '09',
    label: 'MINOR WORKS ORDER',
    tag: 'SMALL-SCALE DIRECT',
    what: 'Low-value contract issued under a simplified procedure. Often awarded directly from an approved list or via a light-touch quote process. Below the Find a Tender threshold.',
    suits: 'Any firm on a council or housing body approved-supplier list. Fast to award, fast to mobilise.',
    decision: 'BID',
    detail: 'These rarely appear as full FTS notices — below the Find a Tender threshold, often awarded via approved-supplier list rather than a published notice.',
  },
  {
    num: '10',
    label: 'UTILITIES AND STREETWORKS',
    tag: 'SPECIALIST ROUTE',
    what: 'Contracts involving public highways, telecoms infrastructure, water mains or energy network works. Procurement routes differ from standard public-works tenders.',
    suits: 'Firms with NRSWA licences, street-opening permits and relevant utility-sector accreditations. Not appropriate without specialist compliance.',
    decision: 'SKIP',
    detail: 'Skip unless you hold the required licences. Flag as a subcontract target if you have a compatible trade.',
  },
] as const;



type Decision = 'BID' | 'WATCH' | 'SUBCONTRACT' | 'SKIP';

const decisionStyle: Record<Decision, string> = {
  BID: 'bg-[var(--yellow)] text-[var(--ink)]',
  WATCH: 'bg-[var(--navy)] text-white',
  SUBCONTRACT: 'bg-[var(--steel)] text-white',
  SKIP: 'bg-[var(--orange)] text-white',
};

export function SignalsPage() {
  return (
    <main className="pb-8">

      {/* 1. Hero */}
      <section className="bg-[var(--navy)] border-b-4 border-[var(--line)]">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--yellow)]">FIND A TENDER — PUBLIC-WORKS OPPORTUNITY TYPES</p>
          <h1 className="headline mt-5 max-w-4xl text-[clamp(2.25rem,8vw,6.5rem)] leading-[0.88] text-[var(--yellow)]">
            10 TYPES OF PUBLIC WORKS OPPORTUNITY.
          </h1>
          <p className="mt-6 max-w-2xl text-xl font-bold leading-snug text-white/85">
            Find a Tender publishes every kind of public contract — but not all of them fit a 5–25-person firm. This page maps the categories that appear, what each means for a small contractor, and whether the default signal is BID, WATCH, SUBCONTRACT or SKIP.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link className="jf-button bg-[var(--yellow)] text-[var(--ink)]" href="/find-jobs">SCAN FREE — SEE WHAT IS LIVE NOW →</Link>
            <Link className="jf-button bg-white text-[var(--ink)]" href="/pricing">GET FULL ACCESS — £39/MO →</Link>
          </div>
          <p className="mt-3 text-sm font-black text-white/60">3 free scans every week. No card needed. One job covers 12+ months at £39/mo.</p>
        </div>
      </section>

      {/* 2. Decision key strip */}
      <section className="bg-[var(--ink)] border-b-4 border-[var(--line)]">
        <div className="page-shell py-4">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <p className="micro-label text-white/60 shrink-0">DECISION KEY</p>
            {([
              ['BID', 'bg-[var(--yellow)] text-[var(--ink)]', 'Pursue this as prime contractor'],
              ['WATCH', 'bg-[var(--navy)] text-white border-2 border-white/30', 'Monitor — fits only under certain conditions'],
              ['SUBCONTRACT', 'bg-[var(--steel)] text-white', 'Target the main contractor for packages'],
              ['SKIP', 'bg-[var(--orange)] text-white', 'Out of scope for most small firms'],
            ] as const).map(([label, cls, tip]) => (
              <div key={label} className="flex items-center gap-2">
                <span className={`inline-block px-3 py-1 text-xs font-black uppercase tracking-wider ${cls}`}>{label}</span>
                <span className="text-xs font-bold text-white/60">{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Opportunity types grid */}
      <section className="bg-[var(--bg-main)] border-b-4 border-[var(--line)]">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--orange)]">TEN OPPORTUNITY TYPES</p>
          <h2 className="headline mt-3 text-4xl leading-none md:text-5xl">KNOW WHAT YOU ARE EVALUATING BEFORE YOU BID.</h2>
          <p className="mt-4 font-black text-[var(--muted)] max-w-3xl">
            Each type carries different risk, margin profile and entry requirements. Identifying the type in the first 60 seconds of reading a notice saves hours of wasted bid work.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {opportunityTypes.map((opp) => (
              <article key={opp.num} className="jf-box bg-white p-6 flex flex-col gap-4">
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-block bg-[var(--ink)] px-2 py-1 text-[0.65rem] font-black tracking-widest uppercase text-[var(--yellow)]">
                    {opp.num}
                  </span>
                  <span className="inline-block border border-[var(--line)] bg-[var(--bg-main)] px-2 py-0.5 text-[0.65rem] font-black uppercase tracking-wider text-[var(--muted)]">
                    {opp.tag}
                  </span>
                </div>
                <h3 className="headline text-2xl leading-none">{opp.label}</h3>
                <div className="space-y-3 flex-1">
                  <div>
                    <p className="micro-label text-[var(--muted)] mb-1">WHAT IT IS</p>
                    <p className="text-sm font-bold text-[var(--ink)] leading-snug">{opp.what}</p>
                  </div>
                  <div>
                    <p className="micro-label text-[var(--muted)] mb-1">WHO IT SUITS</p>
                    <p className="text-sm font-bold text-[var(--muted)] leading-snug">{opp.suits}</p>
                  </div>
                </div>
                <div className="pt-3 border-t-2 border-[var(--line)] space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="micro-label text-[var(--muted)]">DEFAULT SIGNAL</span>
                    <span className={`inline-block px-3 py-1 text-xs font-black uppercase tracking-wider ${decisionStyle[opp.decision as Decision]}`}>
                      {opp.decision}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-[var(--muted)] leading-snug">{opp.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Decision guide strip */}
      <section className="bg-[var(--yellow)] border-y-4 border-[var(--line)]">
        <div className="page-shell py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-base font-black text-[var(--ink)] max-w-2xl">
              The average FTS notice takes 4+ hours to evaluate manually. JobFilter reads the notice and returns a BID / WATCH / SUBCONTRACT / SKIP decision in under 60 seconds — with the evidence shown.
            </p>
            <Link className="jf-button bg-[var(--ink)] text-white shrink-0" href="/find-jobs">SCAN FREE — SEE WHAT IS LIVE →</Link>
          </div>
        </div>
      </section>

      {/* 5. How JobFilter reads a notice */}
      <section className="bg-white border-b-4 border-[var(--line)]">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--orange)]">HOW IT WORKS</p>
          <h2 className="headline mt-3 text-5xl leading-none md:text-6xl">WHAT JOBFILTER CHECKS ON EACH NOTICE.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              ['01', 'TRADE AND CPV FIT', 'Does the Common Procurement Vocabulary code match your trade category? Mismatched notices waste bid time.'],
              ['02', 'DELIVERY LOCATION', 'Is the project or maintenance area within your operational radius? Distance is the most common filter in public works.'],
              ['03', 'STAGE AND DEADLINE', 'Is this an active tender or a contract award? How much time is left on the response window? Early notices have the most value.'],
              ['04', 'BID OR SUB ROUTE', 'Is this a contract you can prime-bid, or a package you should pursue via the main contractor? Different actions, different timing.'],
            ].map(([num, title, body]) => (
              <div key={num} className="jf-box bg-[var(--bg-main)] p-5">
                <p className="micro-label text-[var(--orange)]">CHECK {num}</p>
                <h3 className="headline mt-3 text-2xl text-[var(--ink)]">{title}</h3>
                <p className="mt-3 text-sm font-bold text-[var(--muted)] leading-snug">{body}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <Link className="jf-button bg-[var(--yellow)] text-[var(--ink)]" href="/find-jobs">SEE IT ON A LIVE NOTICE — SCAN FREE →</Link>
          </div>
        </div>
      </section>

      {/* 6. CTA */}
      <section className="bg-[var(--ink)] border-t-4 border-[var(--line)]">
        <div className="page-shell section-pad text-center">
          <p className="micro-label text-[var(--yellow)]">GET STARTED</p>
          <h2 className="headline mt-4 text-[clamp(2.25rem,7vw,5.5rem)] leading-[0.88] text-white">
            £39/MO. ONE JOB COVERS 12 MONTHS.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-xl font-bold text-white/85">
            Scan the current Find a Tender feed. Get a BID / WATCH / SUBCONTRACT / SKIP decision on every relevant notice. Free scans available now — no card required.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link className="jf-button bg-[var(--yellow)] text-[var(--ink)]" href="/find-jobs">
              SCAN FREE — NO CARD NEEDED →
            </Link>
            <Link className="jf-button bg-white text-[var(--ink)]" href="/pricing">
              SEE FULL PRICING →
            </Link>
          </div>
          <p className="mt-4 text-sm font-black text-white/60 uppercase">
            3 free scans per week. Founder access: £39/month. One qualifying contract covers the subscription for a full year.
          </p>
        </div>
      </section>

    </main>
  );
}
