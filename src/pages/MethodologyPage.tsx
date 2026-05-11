import { Link } from 'react-router-dom';
import { Radar, Database, Layers, Target, HardHat, Send, CheckCircle, ArrowRight } from 'lucide-react';

const pipelineSteps = [
  {
    num: '01',
    label: 'FETCH',
    icon: Radar,
    body: 'Scan official sources — planning applications, government contracts, energy ratings, land registry, company filings, council notices, and streetworks permits.',
    detail: 'We check 10+ official registers every day. Planning approvals. EPC ratings. Property sales. New businesses. Council tenders.',
  },
  {
    num: '02',
    label: 'NORMALISE',
    icon: Database,
    body: 'Join every signal to a persistent property key — postcode, UPRN, and company number. No orphan records. No guesswork.',
    detail: 'Every signal gets matched to a specific property or business. No duplicates. No confusion.',
  },
  {
    num: '03',
    label: 'ENRICH',
    icon: Layers,
    body: 'Add property type, floor area, price-paid history, trade-fit classification, and local demand indicators. Context turns a signal into a lead.',
    detail: 'A planning approval is good. A planning approval for a detached house in an affluent postcode is a lead.',
  },
  {
    num: '04',
    label: 'SCORE',
    icon: Target,
    body: 'Rank by value, urgency, rarity, distance, win probability, and contactability. Not volume. A hundred weak leads are worth less than five strong ones.',
    detail: 'Score: 0-100. GOLD (90+). SILVER (75-89). BRONZE (60-74). CHECK (below 60).',
  },
  {
    num: '05',
    label: 'STORE',
    icon: HardHat,
    body: 'Build a persistent property graph. Every scan improves coverage, confidence, and scoring accuracy. The system gets sharper the longer it runs.',
    detail: 'Historical data improves predictions. We learn which signals actually convert.',
  },
  {
    num: '06',
    label: 'DELIVER',
    icon: Send,
    body: 'Gold signals route to WhatsApp, direct letters, territory locks, and follow-up tracking. The right trade gets the right lead at the right time.',
    detail: 'WhatsApp first. Dashboard second. One trade partner per postcode cluster.',
  },
];

const scoreFactors = [
  { factor: 'Planning exists', weight: '20 pts', why: 'Homeowner has invested time and money' },
  { factor: 'Planning approved', weight: '+15 pts', why: 'Recent approval = high intent' },
  { factor: 'Property sold', weight: '+15 pts', why: 'New owner likely to renovate' },
  { factor: 'EPC F/G rating', weight: '+10 pts', why: 'Legal obligation to upgrade' },
  { factor: 'Council contract', weight: '+15 pts', why: 'Public sector = defined budget' },
  { factor: 'Affluent postcode', weight: '+10 pts', why: 'Budget availability higher' },
  { factor: 'Fresh signal', weight: '+5 pts', why: 'Less shopped = better chance' },
];

const ghostFactors = [
  { signal: 'Planning approved + recent sale', risk: 'LOW', meaning: 'Homeowner invested. Ready to proceed.' },
  { signal: 'Planning submitted only', risk: 'MEDIUM', meaning: 'Interest confirmed. Verify timeline.' },
  { signal: 'No official data', risk: 'HIGH', meaning: 'No verification. High ghost probability.' },
  { signal: 'Old signal (>14 days)', risk: 'HIGH', meaning: 'Likely shopped or cancelled.' },
];

export function MethodologyPage() {
  return (
    <main className="page-shell grid gap-8 py-8 pb-24">
      {/* Hero */}
      <section className="jf-box bg-[var(--ink)] p-8 text-white">
        <p className="micro-label text-[var(--yellow)]">METHODOLOGY</p>
        <h1 className="headline mt-3 text-4xl leading-none sm:text-6xl">
          HOW WE TURN OFFICIAL DATA INTO SCORED LEADS.
        </h1>
        <p className="mt-6 max-w-2xl text-lg font-black text-white/80">
          No guesswork. No scraping. Every lead comes from a verified government or public register, scored for intent, and delivered before anyone else knows the job exists.
        </p>
      </section>

      {/* Pipeline */}
      <section className="jf-box bg-white p-8">
        <p className="micro-label text-[var(--orange)]">THE PIPELINE</p>
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
                  <p className="mt-2 font-black text-[var(--ink)]">{step.body}</p>
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
        <p className="micro-label text-[var(--ink)]">SERIOUS BUYER SCORE</p>
        <h2 className="headline mt-3 text-4xl leading-none">
          WHAT MAKES A LEAD WORTH CHASING?
        </h2>
        <p className="mt-4 max-w-2xl text-lg font-black text-[var(--ink)]/75">
          Every signal gets a score from 0 to 100. Here's what goes into it.
        </p>

        <div className="mt-8 grid gap-3">
          {scoreFactors.map((f) => (
            <div key={f.factor} className="jf-box bg-white p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex items-center gap-3">
                <CheckCircle size={18} strokeWidth={3} className="text-[var(--green)] shrink-0" />
                <span className="font-black text-[var(--ink)]">{f.factor}</span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="font-mono font-black text-[var(--yellow)]">{f.weight}</span>
                <span className="text-[var(--muted)] font-bold">{f.why}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 border-2 border-[var(--ink)] bg-white">
          <p className="text-sm font-black text-[var(--ink)]">
            <strong>Transparency:</strong> We show you every factor that contributed to the score. You see what we see.
          </p>
        </div>
      </section>

      {/* Ghost Risk */}
      <section className="jf-box bg-white p-8">
        <p className="micro-label text-[var(--orange)]">GHOST RISK</p>
        <h2 className="headline mt-3 text-4xl leading-none">
          HOW WE SPOT TIME-WASTERS BEFORE YOU DO.
        </h2>
        <p className="mt-4 max-w-2xl copy">
          Ghost leads cost tradesmen £2,000-5,000 a year. We built a system to flag them before you waste fuel.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {ghostFactors.map((g) => (
            <div key={g.signal} className={`jf-box p-5 border-2 ${
              g.risk === 'LOW' ? 'border-[var(--green)] bg-[var(--green)]/5' :
              g.risk === 'MEDIUM' ? 'border-[var(--yellow)] bg-[var(--yellow)]/5' :
              'border-[var(--orange)] bg-[var(--orange)]/5'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`micro-label ${
                  g.risk === 'LOW' ? 'text-[var(--green)]' :
                  g.risk === 'MEDIUM' ? 'text-[var(--yellow)]' :
                  'text-[var(--orange)]'
                }`}>{g.risk} RISK</span>
              </div>
              <p className="font-black text-[var(--ink)]">{g.signal}</p>
              <p className="mt-1 text-sm font-bold text-[var(--muted)]">{g.meaning}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Data Sources Detail */}
      <section className="jf-box bg-[var(--ink)] p-8 text-white">
        <p className="micro-label text-[var(--yellow)]">DATA SOURCES</p>
        <h2 className="headline mt-3 text-4xl leading-none">
          OFFICIAL REGISTERS. NOT GUESSES.
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            'Planning.data.gov.uk',
            'EPC Register',
            'Land Registry',
            'Companies House',
            'Contracts Finder',
            'Find a Tender',
            'Building Control',
            'HMO Licensing',
            'Auction Listings',
          ].map((source) => (
            <div key={source} className="flex items-center gap-3 border-2 border-white/20 p-4">
              <CheckCircle size={18} strokeWidth={3} className="text-[var(--yellow)] shrink-0" />
              <span className="font-black text-white">{source}</span>
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm font-black text-white/70">
          All data used under Open Government Licence v3.0. No private data. No scraping.
        </p>
      </section>

      {/* CTA */}
      <section className="jf-box bg-[var(--yellow)] p-8 text-center">
        <h2 className="headline text-3xl sm:text-5xl">
          SEE IT IN ACTION.
        </h2>
        <p className="mt-4 max-w-xl mx-auto text-lg font-black text-[var(--ink)]/75">
          Free scan. No signup. See real scored leads in your area right now.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/find-jobs" className="jf-button bg-[var(--navy)] text-white">
            SCAN MY AREA FREE →
          </Link>
          <Link to="/trust" className="jf-button bg-white text-[var(--ink)]">
            READ OUR PROMISE
          </Link>
        </div>
      </section>
    </main>
  );
}
