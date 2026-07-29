"use client";
import Link from 'next/link';

import { Radar, Database, Layers, Target, HardHat, Send, CheckCircle } from 'lucide-react';

const pipelineSteps = [
  {
    num: '01',
    label: 'FETCH',
    icon: Radar,
    body: 'Pull current notices from Find a Tender — the official UK public contract register. Every notice is a published buyer requirement, not a scraped listing.',
    detail: 'Find a Tender is the primary current procurement source. It publishes contract notices from UK public bodies: councils, NHS trusts, housing associations, utilities and central government. Additional sources may appear in results where enabled.',
  },
  {
    num: '02',
    label: 'PARSE',
    icon: Database,
    body: 'Extract buyer identity, scope description, CPV trade codes, value band, published deadline and a source link to the official notice.',
    detail: 'Raw notices contain everything needed to qualify. JobFilter pulls the structured data so you can assess fit without reading 40-page procurement documents.',
  },
  {
    num: '03',
    label: 'MATCH',
    icon: Layers,
    body: 'Filter results by trade type and delivery postcode. The active feed is scoped to notices relevant to your trade category in your area.',
    detail: 'A roofer in Leeds sees different results to a plumber in Bristol. Contract-level qualification — ceilings, accreditation gaps, bid-route fit — is assessed at the decision stage against each specific notice.',
  },
  {
    num: '04',
    label: 'QUALIFY',
    icon: Target,
    body: 'Score the fit across trade, location, deadline, evidence and route to work. Paid qualification produces a decision for each notice: BID, WATCH, SUBCONTRACT or SKIP.',
    detail: 'GOLD 80+, SILVER 50–79, BRONZE 30–49, SKIP below 30. The free scan shows a preview score. The number backs the decision — it does not replace your judgement or promise an award.',
  },
  {
    num: '05',
    label: 'EXPOSE GAPS',
    icon: HardHat,
    body: 'Show what the notice proves and what your firm still needs to verify before committing bid time. Missing accreditations, value ceilings, regional limits.',
    detail: 'Knowing a gap before you start saves wasted bid hours. Some gaps are easy to close. Others mean this opportunity is not yours yet.',
  },
  {
    num: '06',
    label: 'DELIVER',
    icon: Send,
    body: 'Paid results stay tied to the official Find a Tender source link. You see the public notice, extracted evidence and decision — in one view. The free scan shows a preview without the source URL.',
    detail: 'Empty results are shown honestly. If nothing matches your firm today, that is a valid outcome — not a failure. Coverage varies by trade, region and timing.',
  },
];

const scoreFactors = [
  { factor: 'Trade and CPV code match', weight: 'HIGH', why: 'Wrong trade code = no fit. CPV codes are set by the buyer.' },
  { factor: 'Delivery region overlap', weight: 'HIGH', why: 'Contract outside your area wastes bid cost and time.' },
  { factor: 'Notice stage and deadline', weight: 'HIGH', why: 'Expired or pre-market notices have no response window.' },
  { factor: 'Contract value band', weight: 'MED', why: 'Large contracts flag as more competitive — value band assessed against the notice, not a firm profile.' },
  { factor: 'Direct bid or subcontract route', weight: 'MED', why: 'Not every notice is directly biddable for a 5–25-person firm.' },
  { factor: 'Notice requirements', weight: 'MED', why: 'Published accreditation, ISO or turnover requirements shown — your firm verifies fit before committing.' },
];

const decisionTiers = [
  { signal: 'GOLD score (80+) with a usable contact path identified', readiness: 'BID', meaning: 'Evidence and contact route support a direct bid. Verify requirements before committing time.' },
  { signal: 'Score 30–79, or GOLD but no contact path yet confirmed', readiness: 'WATCH', meaning: 'Notice matched but missing evidence or contact route. Verify before committing bid time.' },
  { signal: 'Large public contract or awarded framework notice', readiness: 'SUBCONTRACT', meaning: 'Too large or already awarded for a direct bid — route in via the principal contractor.' },
  { signal: 'Aggregate score below 30', readiness: 'SKIP', meaning: 'Insufficient evidence for this opportunity. Move on — empty results save bid time.' },
];

export function MethodologyPage() {
  return (
    <main className="page-shell grid gap-8 py-8 pb-24">
      {/* Hero */}
      <section className="jf-box bg-[var(--ink)] p-8 text-white">
        <p className="micro-label text-[var(--yellow)]">METHODOLOGY</p>
        <h1 className="headline mt-3 text-4xl leading-none sm:text-6xl">
          HOW JOBFILTER QUALIFIES PUBLIC WORKS OPPORTUNITIES.
        </h1>
        <p className="mt-6 max-w-2xl text-lg font-bold text-white/85">
          No guesswork. Find a Tender is the primary current procurement source — official notices from UK public buyers, qualified for trade, region, value and deadline. The decision — BID, WATCH, SUBCONTRACT or SKIP — comes first. The evidence backs it up.
        </p>
      </section>

      {/* Pipeline */}
      <section className="jf-box bg-white p-8">
        <p className="micro-label text-[var(--orange)]">HOW IT WORKS</p>
        <h2 className="headline mt-3 text-4xl leading-none">
          SIX STEPS. ZERO WASTE.
        </h2>

        <div className="mt-10 grid gap-6">
          {pipelineSteps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.num} className="relative grid gap-4 md:grid-cols-[80px_1fr] md:items-start">
                <div className="flex h-16 w-16 items-center justify-center border-2 border-[var(--ink)] bg-[var(--yellow)] shadow-[4px_4px_0_var(--line)]">
                  <Icon size={28} strokeWidth={2.5} className="text-[var(--ink)]" />
                </div>
                <div className="jf-box bg-[var(--bg-main)] p-5">
                  <div className="flex items-center gap-3">
                    <span className="micro-label text-[var(--yellow)]">{step.num}</span>
                    <span className="headline text-xl">{step.label}</span>
                  </div>
                  <p className="mt-2 font-bold text-[var(--ink)]">{step.body}</p>
                  <p className="mt-2 text-sm font-bold text-[var(--muted)]">{step.detail}</p>
                </div>
                {i < pipelineSteps.length - 1 && (
                  <div className="hidden md:block absolute left-8 top-16 bottom-[-24px] w-0.5 bg-[var(--yellow)]" />
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Scoring */}
      <section className="jf-box bg-[var(--yellow)] p-8">
        <p className="micro-label text-[var(--ink)]">FIT SCORE — WHAT DRIVES IT</p>
        <h2 className="headline mt-3 text-4xl leading-none">
          WHAT MAKES A NOTICE WORTH YOUR BID TIME?
        </h2>
        <p className="mt-4 max-w-2xl text-lg font-bold text-[var(--ink)]/80">
          Every notice gets a 0–100 score backed by evidence. GOLD is 80+, SILVER 50–79, BRONZE 30–49. Anything below 30 is a SKIP. The score explains the decision — it never replaces it.
        </p>

        <div className="mt-8 grid gap-3">
          {scoreFactors.map((f) => (
            <div key={f.factor} className="jf-box bg-white p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex items-center gap-3">
                <CheckCircle size={18} strokeWidth={3} className="text-[var(--green)] shrink-0" />
                <span className="font-black text-[var(--ink)]">{f.factor}</span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className={`font-mono font-black px-2 py-0.5 border-2 border-[var(--line)] ${f.weight === 'HIGH' ? 'bg-[var(--ink)] text-[var(--yellow)]' : 'bg-white text-[var(--ink)]'}`}>{f.weight}</span>
                <span className="text-[var(--muted)] font-bold">{f.why}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 border-2 border-[var(--ink)] bg-white">
          <p className="text-sm font-black text-[var(--ink)]">
            Key factors that shaped the score are shown — trade match, urgency, value band, contact path. You see what drove the decision.
          </p>
        </div>
      </section>

      {/* Decision Tiers */}
      <section className="jf-box bg-white p-8">
        <p className="micro-label text-[var(--orange)]">DECISION TIERS</p>
        <h2 className="headline mt-3 text-4xl leading-none">
          BID. WATCH. SUBCONTRACT. SKIP.
        </h2>
        <p className="mt-4 max-w-2xl font-bold text-[var(--muted)]">
          Every qualified notice produces one of four decisions. The decision is qualification support — not a promise of work or an exclusive claim on the opportunity.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {decisionTiers.map((g) => (
            <div key={g.signal} className={`jf-box p-5 border-2 ${
              g.readiness === 'BID' ? 'border-[var(--green)] bg-[var(--green)]/5' :
              g.readiness === 'WATCH' ? 'border-[var(--yellow)] bg-[var(--yellow)]/5' :
              g.readiness === 'SUBCONTRACT' ? 'border-[var(--navy)] bg-[var(--navy)]/5' :
              'border-[var(--orange)] bg-[var(--orange)]/5'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`micro-label ${
                  g.readiness === 'BID' ? 'text-[var(--green)]' :
                  g.readiness === 'WATCH' ? 'text-[var(--ink)]' :
                  g.readiness === 'SUBCONTRACT' ? 'text-[var(--navy)]' :
                  'text-[var(--orange)]'
                }`}>{g.readiness}</span>
              </div>
              <p className="font-black text-[var(--ink)]">{g.signal}</p>
              <p className="mt-1 text-sm font-bold text-[var(--muted)]">{g.meaning}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Source */}
      <section className="jf-box bg-[var(--ink)] p-8 text-white">
        <p className="micro-label text-[var(--yellow)]">DATA SOURCE</p>
        <h2 className="headline mt-3 text-4xl leading-none">
          FIND A TENDER. OFFICIAL. FREE. PUBLIC.
        </h2>
        <p className="mt-4 max-w-2xl text-lg font-bold text-white/85">
          Find a Tender is the UK government's official public procurement register. JobFilter qualifies the notices — it does not control them, gate them, or sell access to them. Paid results include a direct link to the official notice; the free scan shows a preview without the source URL.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            'Find a Tender (FTS) — official source',
            'UK public buyers: councils, NHS, housing',
            'CPV codes — buyer-defined trade categories',
            'Published values and notice stages',
            'Published response deadlines and bid windows',
            'Open Government Licence v3.0 data',
          ].map((source) => (
            <div key={source} className="flex items-center gap-3 border-2 border-white/20 p-4">
              <CheckCircle size={18} strokeWidth={3} className="text-[var(--yellow)] shrink-0" />
              <span className="font-black text-white">{source}</span>
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm font-black text-white/60">
          Coverage varies by trade, region and what buyers publish. An empty scan is a valid and honest result.
        </p>
      </section>

      {/* CTA */}
      <section className="jf-box bg-[var(--yellow)] p-8 text-center">
        <h2 className="headline text-3xl sm:text-5xl">
          SEE IT IN ACTION.
        </h2>
        <p className="mt-4 max-w-xl mx-auto text-lg font-bold text-[var(--ink)]/80">
          Run a free scan against current Find a Tender notices. See which public works opportunities match your firm before committing bid time.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/find-jobs" className="jf-button bg-[var(--ink)] text-white">
            SCAN FREE — NO CARD NEEDED →
          </Link>
          <Link href="/pricing" className="jf-button bg-white text-[var(--ink)]">
            CHECK PRICING →
          </Link>
        </div>
        <p className="mt-3 text-sm font-black text-[var(--ink)]/60">No credit card required. Coverage varies by trade, region and timing.</p>
      </section>
    </main>
  );
}
