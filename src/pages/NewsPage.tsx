"use client";
import Link from 'next/link';

import { Clock, ArrowRight, AlertTriangle, TrendingUp } from 'lucide-react';

type Category = 'PLANNING' | 'RETROFIT' | 'TENDERS' | 'COMPLIANCE' | 'FUNDING' | 'COMMERCIAL';

type Article = {
  slug: string;
  date: string; // ISO yyyy-mm-dd
  category: Category;
  title: string;
  dek: string;
  readMin: number;
  body: string[];
  takeaway: string;
  forTrades: string[];
  trend?: { label: string; direction: 'up' | 'down' };
  sources: string[];
};

const ARTICLES: Article[] = [
  {
    slug: 'mees-2027-deadline-rentals',
    date: '2026-05-20',
    category: 'COMPLIANCE',
    title: 'F & G-rated rentals: landlords are quoting now for the 2027 deadline.',
    dek: 'New MEES guidance brings 1.2m UK rentals into scope. Heating, insulation, glazing and electrical re-wires are the biggest spends.',
    readMin: 3,
    trend: { label: 'Energy upgrade quote requests +21% wk/wk', direction: 'up' },
    body: [
      'The Minimum Energy Efficiency Standard (MEES) tightening for rented homes is no longer a debate — landlords with F or G-rated stock are getting compliance letters and starting to gather quotes. The legal pressure has moved from "by 2030" planning conversation to "next budget cycle" action.',
      'For tradesmen, that means the next 9–12 months will see a steady stream of single-trade and multi-trade jobs aimed at moving a property from band F or G up to D or better. The work is rarely one trade only — boiler swaps, loft and cavity insulation, double glazing replacement, ventilation upgrades, and electrical re-wires usually appear in clusters on the same address.',
      'The cleanest signal is a recently filed energy certificate showing band F or G on a property classed as rented. JobFilter\'s Intake Engine reads verified energy signals daily and matches them to your trade — so a heating engineer sees the boilers and a glazier sees the windows, both on the same property if applicable.',
    ],
    takeaway:
      'If your trade does any retrofit work, build a saved search for F and G rentals in your postcode area. The landlords already know they have a problem — they want a quote, not a sales pitch.',
    forTrades: ['Heating engineers', 'Insulation firms', 'Glaziers', 'Electricians', 'Builders'],
    sources: ['Verified energy efficiency signals', 'Gov.uk MEES guidance update'],
  },
  {
    slug: 'building-safety-act-fire-doors',
    date: '2026-05-19',
    category: 'COMPLIANCE',
    title: 'Building Safety Act: fire-door remedials are creating steady block work.',
    dek: 'Blocks over 11m must show inspected, compliant fire doors. Most can\'t — and the responsible person now carries personal liability.',
    readMin: 3,
    body: [
      'The Building Safety Act\'s fire-door rules apply to all residential buildings over 11 metres. Managing agents and block freeholders have a legal duty to inspect communal fire doors annually and flat front doors every five years, and to remediate anything that fails.',
      'Most older blocks have door hardware, intumescent seals, frames or hinges that fail current standards. The result: a slow but steady stream of remedial jobs — fire-door replacement, ironmongery upgrades, intumescent strip retrofits, smoke seal fitting, and follow-on electrical work where door closers and magnetic holds need power.',
      'Joiners with FDIS certification, glaziers comfortable with fire-rated glass, and electricians with experience around access control will see the most enquiries. The buyers are property managers and freeholder firms — they pay 30-day terms but the work is recurring, scoped, and rarely shared with five competitors at once.',
    ],
    takeaway:
      'Quote a portfolio of blocks, not a single door. A managing agent with 12 buildings usually wants one trusted contractor across the lot — that\'s 12 months of work from one contact.',
    forTrades: ['Joiners', 'Glaziers', 'Electricians', 'Fire-door specialists'],
    sources: ['Building Safety Act 2022 Section 156', 'Fire Door Inspection Scheme guidance'],
  },
  {
    slug: 'eco4-gbis-funding-installer-list',
    date: '2026-05-18',
    category: 'FUNDING',
    title: 'ECO4 + GBIS funding is flowing. PAS 2030 installers are the bottleneck.',
    dek: 'Energy suppliers must spend the money. There aren\'t enough certified installers. If you\'re PAS 2030 you can name your price right now.',
    readMin: 4,
    trend: { label: 'PAS 2030 installer demand +34% wk/wk', direction: 'up' },
    body: [
      'The Energy Company Obligation (ECO4) and the Great British Insulation Scheme (GBIS) require the big energy suppliers to fund energy-efficiency upgrades in lower-income and lower-EPC-band homes. The pot is real and live. The bottleneck is delivery — there simply aren\'t enough PAS 2030 / MCS certified installers to spend it.',
      'For installers who hold the certifications, this is the easiest demand market in UK construction right now. Loft insulation, cavity wall insulation, air-source heat pumps, solar PV, and external wall insulation all qualify. The funding pays the customer, the customer pays you, and the paperwork is usually handled by a managing agent — not you.',
      'If you\'re not certified yet, the route is straightforward: PAS 2030:2023 covers most insulation measures, MCS is required for renewables. Certification takes 4–8 weeks and costs around £1,500–£3,000 — recoverable inside the first job. JobFilter\'s Intake Engine flags funded scheme leads in your area with the qualifying measure already identified.',
    ],
    takeaway:
      'If you do insulation or renewables, get PAS 2030 / MCS certified now. The customer demand is funded, the supplier pressure is real, and the installer shortage is your moat for at least the next 12 months.',
    forTrades: ['Insulation firms', 'Heat pump installers', 'Solar PV installers', 'Heating engineers'],
    sources: ['Ofgem ECO4 stats Q1 2026', 'BEIS Great British Insulation Scheme delivery report'],
  },
];

const FUNDAMENTALS = [
  {
    tag: 'PLANNING',
    headline: 'Planning approvals are the earliest clean signal for domestic work.',
    body: 'Extensions, lofts, and major refurbs hit planning before they hit any directory. The first 48 hours after approval is the highest-margin window — the buyer has not yet started ringing round.',
  },
  {
    tag: 'TENDERS',
    headline: 'Public tenders only matter when deadline, buyer, and scope all fit.',
    body: 'A tender is only worth chasing when admin, insurance, capacity and price band line up. Otherwise it burns half a day on a job you were never going to win.',
  },
  {
    tag: 'COMMERCIAL',
    headline: 'New company formations point to fit-out work before the site is visible.',
    body: 'A new restaurant, gym, salon or office leasing premises usually needs electrical, plumbing, HVAC, joinery and decorating before opening. Business registration signals and energy filings together flag this earlier than walk-bys.',
  },
  {
    tag: 'LEAD QUALITY',
    headline: 'Most wasted visits fail the same four checks.',
    body: 'No timing, no budget, no buyer, no scope. Before you quote, confirm who decides, when work starts, what the budget band is, and whether scope is fixed. Missing any of these = a weak lead.',
  },
];

const CATEGORY_COLOURS: Record<Category, string> = {
  PLANNING: 'bg-[var(--yellow)] text-[var(--ink)]',
  RETROFIT: 'bg-[var(--green)] text-white',
  TENDERS: 'bg-[var(--ink)] text-white',
  COMPLIANCE: 'bg-[var(--orange)] text-white',
  FUNDING: 'bg-[var(--green)] text-white',
  COMMERCIAL: 'bg-[var(--muted)] text-white',
};

function formatDate(iso: string) {
  const d = new Date(iso + 'T00:00:00Z');
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function NewsPage() {
  const [lead, ...rest] = ARTICLES;

  return (
    <main className="pb-24">
      {/* ── HERO ── */}
      <section className="bg-[var(--yellow)] border-b-4 border-[var(--ink)]">
        <div className="page-shell py-12 sm:py-16">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-[var(--orange)]" />
            <p className="micro-label text-[var(--ink)]">DAILY BRIEFING — PUBLISHED EVERY WEEKDAY</p>
          </div>
          <h1 className="headline mt-3 text-4xl leading-none sm:text-6xl max-w-3xl">
            UK CONSTRUCTION SIGNALS.<br />FILTERED FOR TRADES.
          </h1>
          <p className="mt-4 max-w-2xl font-bold text-[var(--ink)] text-base sm:text-lg leading-snug">
            Planning approvals. Energy compliance. Tender deadlines. Funded schemes. Written for builders, plumbers, electricians, roofers and fit-out firms — not for marketing teams. Free to read.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link className="jf-button bg-[var(--ink)] text-white" href="/find-jobs">
              SCAN MY POSTCODE →
            </Link>
            <Link className="jf-button bg-white text-[var(--ink)]" href="/signals">
              SEE LIVE SIGNALS
            </Link>
          </div>
        </div>
      </section>

      {/* ── LEAD ARTICLE ── */}
      <section className="page-shell pt-10">
        <p className="micro-label text-[var(--orange)]">TODAY — {formatDate(lead.date)}</p>
        <article className="mt-3 border-2 border-[var(--ink)] bg-white">
          <header className="border-b-2 border-[var(--ink)] px-6 py-4 flex flex-wrap items-center gap-3">
            <span className={`px-3 py-1 text-xs font-black uppercase tracking-wider ${CATEGORY_COLOURS[lead.category]}`}>
              {lead.category}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-black uppercase text-[var(--muted)]">
              <Clock size={12} strokeWidth={3} /> {lead.readMin} min read
            </span>
            {lead.trend && (
              <span className="inline-flex items-center gap-1 border-2 border-[var(--green)] bg-[var(--green)]/10 px-2 py-1 text-xs font-black uppercase text-[var(--green)]">
                <TrendingUp size={12} strokeWidth={3} />
                {lead.trend.label}
              </span>
            )}
          </header>

          <div className="px-6 py-6 sm:px-8 sm:py-8">
            <h2 className="headline text-3xl leading-tight sm:text-5xl text-[var(--ink)]">
              {lead.title}
            </h2>
            <p className="mt-3 max-w-3xl text-lg font-bold leading-snug text-[var(--muted)]">{lead.dek}</p>

            <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_320px]">
              <div className="space-y-4">
                {lead.body.map((para, i) => (
                  <p key={i} className="text-base font-bold leading-relaxed text-[var(--ink)]">
                    {para}
                  </p>
                ))}
              </div>
              <aside className="grid gap-3">
                <div className="border-l-4 border-[var(--yellow)] bg-[var(--offwhite)] px-4 py-4">
                  <p className="micro-label text-[var(--orange)] text-[10px]">TRADE TAKEAWAY</p>
                  <p className="mt-2 text-sm font-black italic text-[var(--ink)] leading-snug">
                    {lead.takeaway}
                  </p>
                </div>
                <div className="border-2 border-[var(--line)] bg-white px-4 py-4">
                  <p className="micro-label text-[var(--muted)] text-[10px]">FOR THESE TRADES</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {lead.forTrades.map((t) => (
                      <span key={t} className="border border-[var(--rule)] bg-[var(--offwhite)] px-2 py-1 text-[11px] font-black uppercase text-[var(--ink)]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="border-2 border-[var(--line)] bg-white px-4 py-4">
                  <p className="micro-label text-[var(--muted)] text-[10px]">DATA SOURCES</p>
                  <ul className="mt-2 grid gap-1 text-[11px] font-black uppercase text-[var(--muted)]">
                    {lead.sources.map((s) => (
                      <li key={s}>· {s}</li>
                    ))}
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </article>
      </section>

      {/* ── RECENT BRIEFINGS ── */}
      <section className="page-shell pt-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="micro-label text-[var(--orange)]">EARLIER THIS WEEK</p>
            <h2 className="headline mt-1 text-2xl leading-none sm:text-3xl">RECENT BRIEFINGS.</h2>
          </div>
          <Link href="/signals" className="text-sm font-black uppercase text-[var(--ink)] hover:text-[var(--orange)]">
            All signals →
          </Link>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {rest.map((a) => (
            <article key={a.slug} className="border-2 border-[var(--ink)] bg-white p-5 flex flex-col">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-2 py-1 text-[10px] font-black uppercase tracking-wider ${CATEGORY_COLOURS[a.category]}`}>
                  {a.category}
                </span>
                <span className="text-[10px] font-black uppercase text-[var(--muted)]">
                  {formatDate(a.date)} · {a.readMin} min
                </span>
              </div>
              <h3 className="headline mt-3 text-xl leading-tight sm:text-2xl">{a.title}</h3>
              <p className="mt-2 text-sm font-bold leading-snug text-[var(--muted)]">{a.dek}</p>
              <div className="mt-3 border-l-4 border-[var(--yellow)] bg-[var(--offwhite)] px-3 py-2">
                <p className="text-[11px] font-black uppercase tracking-wider text-[var(--muted)]">Takeaway</p>
                <p className="mt-1 text-xs font-black italic text-[var(--ink)] leading-snug">{a.takeaway}</p>
              </div>
              <div className="mt-3 flex flex-wrap gap-1">
                {a.forTrades.slice(0, 3).map((t) => (
                  <span key={t} className="border border-[var(--rule)] bg-[var(--offwhite)] px-2 py-0.5 text-[10px] font-black uppercase text-[var(--muted)]">
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── FUNDAMENTALS ── */}
      <section className="page-shell pt-12">
        <p className="micro-label text-[var(--orange)]">FUNDAMENTALS — TRUE EVERY WEEK</p>
        <h2 className="headline mt-1 text-2xl leading-none sm:text-3xl">THE RULES THAT DO NOT CHANGE.</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {FUNDAMENTALS.map((f) => (
            <div key={f.tag} className="border-2 border-[var(--line)] bg-white p-4">
              <span className="border-2 border-[var(--ink)] bg-[var(--paper)] px-2 py-1 text-[10px] font-black uppercase tracking-wider text-[var(--ink)]">
                {f.tag}
              </span>
              <p className="headline mt-3 text-lg leading-tight">{f.headline}</p>
              <p className="mt-2 text-sm font-bold leading-snug text-[var(--muted)]">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CITY INTEL TEASER ── */}
      <section className="mt-14 bg-[var(--paper)] border-t-4 border-b-4 border-[var(--ink)]">
        <div className="page-shell py-10">
          <p className="micro-label text-[var(--orange)]">PATCH-SPECIFIC INTELLIGENCE</p>
          <h2 className="headline mt-2 text-3xl leading-none sm:text-4xl max-w-2xl">
            DAILY BRIEFING IS NATIONAL. CITY INTEL IS YOUR PATCH.
          </h2>
          <p className="mt-3 max-w-2xl font-bold text-[var(--muted)] leading-snug">
            Territory score, signal count, hot lead spotlight, ranked action list, weekly tool tip — for your city only. Updated every week.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {[
              { city: 'Birmingham', slug: 'birmingham' },
              { city: 'London', slug: 'london' },
              { city: 'Manchester', slug: 'manchester' },
              { city: 'Bristol', slug: 'bristol' },
              { city: 'Leeds', slug: 'leeds' },
              { city: 'Glasgow', slug: 'glasgow' },
            ].map(({ city, slug }) => (
              <Link
                key={slug}
                href={`/intelligence/${slug}`}
                className="inline-flex items-center gap-1 border-2 border-[var(--ink)] bg-white px-3 py-2 text-xs font-black uppercase tracking-wider text-[var(--ink)] hover:bg-[var(--yellow)] transition-colors"
              >
                {city} <ArrowRight size={12} strokeWidth={3} />
              </Link>
            ))}
          </div>
          <div className="mt-6">
            <Link className="jf-button bg-[var(--ink)] text-white" href="/pricing">
              UNLOCK FULL CITY INTEL — £39/MO
            </Link>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="mt-12 bg-[var(--ink)] border-t-4 border-[var(--yellow)]">
        <div className="page-shell py-12">
          <div className="flex items-center gap-2 text-[var(--yellow)]">
            <AlertTriangle size={16} strokeWidth={3} />
            <p className="micro-label">FROM BRIEFING TO REAL LEAD</p>
          </div>
          <h2 className="headline mt-2 text-3xl leading-none text-white sm:text-5xl">
            STOP READING ABOUT THE WORK. SEE IT IN YOUR POSTCODE.
          </h2>
          <p className="mt-4 max-w-2xl font-bold text-white/70 leading-snug">
            The Intake Engine reads the same data this briefing is built from — and filters it to your trade, postcode, and value band. Free to scan, no card needed.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link className="jf-button bg-[var(--yellow)] text-[var(--ink)]" href="/find-jobs">
              SCAN MY POSTCODE FREE →
            </Link>
            <Link className="jf-button bg-white text-[var(--ink)]" href="/pricing">
              SEE PAID PLANS
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default NewsPage;
