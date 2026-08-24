'use client';

import { useState } from 'react';
import {
  REVENUE_RESCUE_DEMO,
  formatDemoMoney,
  nextDemoStage,
} from '../lib/revenueRescueDemo';

export function RevenueRescueDemoPage() {
  const [stageIndex, setStageIndex] = useState(0);
  const current = REVENUE_RESCUE_DEMO.stages[stageIndex];
  const isComplete = stageIndex === REVENUE_RESCUE_DEMO.stages.length - 1;

  return (
    <main className="pb-20">
      <section className="border-b-2 border-[var(--line)] bg-[var(--ink)] py-12 text-white sm:py-16">
        <div className="page-shell">
          <p className="micro-label text-[var(--yellow)]">Revenue Rescue · Interactive walkthrough</p>
          <h1 className="headline mt-3 max-w-4xl text-5xl text-white sm:text-7xl">
            See one missed enquiry become a quote.
          </h1>
          <p className="mt-5 max-w-2xl text-lg font-semibold text-white/80">
            Step through a synthetic roofing enquiry. Nothing here contacts a customer, charges a card or writes to production.
          </p>
          <p className="mt-6 inline-flex border-2 border-[var(--yellow)] px-3 py-2 font-mono text-xs font-bold uppercase tracking-wide text-[var(--yellow)]">
            Simulation only · No calls · No texts · No payments
          </p>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="page-shell grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.42fr)]">
          <div>
            <div className="mb-6 flex items-end justify-between gap-4 border-b-2 border-[var(--line)] pb-4">
              <div>
                <p className="micro-label text-[var(--muted)]">Current state</p>
                <h2 className="headline mt-1 text-4xl sm:text-5xl">{current.label}</h2>
              </div>
              <p className="shrink-0 font-mono text-sm font-bold">
                {stageIndex + 1}/{REVENUE_RESCUE_DEMO.stages.length}
              </p>
            </div>

            <ol aria-label="Revenue Rescue workflow" className="mb-8 grid grid-cols-5 border-2 border-[var(--line)] bg-white">
              {REVENUE_RESCUE_DEMO.stages.map((stage, index) => {
                const reached = index <= stageIndex;
                return (
                  <li
                    key={stage.id}
                    aria-current={index === stageIndex ? 'step' : undefined}
                    className={`min-w-0 border-r-2 border-[var(--line)] p-2 last:border-r-0 sm:p-3 ${
                      reached ? 'bg-[var(--yellow)]' : 'bg-white text-[var(--muted)]'
                    }`}
                  >
                    <span className="block font-mono text-xs font-bold">0{index + 1}</span>
                    <span className="mt-1 hidden text-xs font-black uppercase leading-tight sm:block">{stage.label}</span>
                  </li>
                );
              })}
            </ol>

            <div aria-live="polite" className="jf-box bg-white p-5 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-mono text-sm font-bold text-[var(--muted)]">{current.time}</p>
                <p className="micro-label text-[var(--orange)]">Synthetic record</p>
              </div>
              <h3 className="headline mt-4 text-3xl sm:text-4xl">{current.title}</h3>
              <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-[var(--muted)] sm:text-lg">
                {current.summary}
              </p>
              <div className="mt-6 border-l-4 border-[var(--yellow)] bg-[var(--bg-main)] px-4 py-3 font-mono text-sm font-bold">
                {current.evidence}
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                {!isComplete ? (
                  <button
                    type="button"
                    className="jf-button bg-[var(--yellow)] text-[var(--ink)]"
                    onClick={() => setStageIndex((index) => nextDemoStage(index))}
                  >
                    Run next step →
                  </button>
                ) : (
                  <a
                    className="jf-button bg-[var(--yellow)] text-[var(--ink)]"
                    href="mailto:hello@jobfilter.uk?subject=Revenue%20Rescue%20pilot"
                  >
                    Ask about the pilot →
                  </a>
                )}
                {stageIndex > 0 && (
                  <button
                    type="button"
                    className="min-h-12 px-4 text-left text-sm font-black uppercase underline underline-offset-4 sm:text-center"
                    onClick={() => setStageIndex(0)}
                  >
                    Restart demo
                  </button>
                )}
              </div>
            </div>
          </div>

          <aside aria-label="Synthetic enquiry summary" className="border-t-2 border-[var(--line)] pt-6 lg:border-l-2 lg:border-t-0 lg:pl-7 lg:pt-0">
            <p className="micro-label text-[var(--muted)]">Enquiry record</p>
            <dl className="mt-4 divide-y-2 divide-[var(--line)] border-y-2 border-[var(--line)]">
              <SummaryRow term="Customer" value={REVENUE_RESCUE_DEMO.customer} />
              <SummaryRow term="Firm" value={REVENUE_RESCUE_DEMO.firm} />
              <SummaryRow term="Job" value={REVENUE_RESCUE_DEMO.job} />
              <SummaryRow term="Area" value={REVENUE_RESCUE_DEMO.postcode} />
              <SummaryRow term="Quote" value={formatDemoMoney(REVENUE_RESCUE_DEMO.quoteMinorUnits)} />
              <SummaryRow term="Deposit" value={formatDemoMoney(REVENUE_RESCUE_DEMO.depositMinorUnits)} />
            </dl>

            <div className={`mt-7 border-2 border-[var(--line)] p-5 ${isComplete ? 'bg-[var(--green)]' : 'bg-white'}`}>
              <p className="micro-label">Attribution</p>
              <p className="headline mt-2 text-3xl">
                {isComplete ? formatDemoMoney(REVENUE_RESCUE_DEMO.quoteMinorUnits) : 'Pending'}
              </p>
              <p className="mt-2 text-sm font-bold">
                {isComplete
                  ? 'Progressed from the original missed enquiry.'
                  : 'A value receipt appears only after a verifiable outcome.'}
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function SummaryRow({ term, value }: { term: string; value: string }) {
  return (
    <div className="grid grid-cols-[5rem_minmax(0,1fr)] gap-3 py-3">
      <dt className="font-mono text-xs font-bold uppercase text-[var(--muted)]">{term}</dt>
      <dd className="text-sm font-black">{value}</dd>
    </div>
  );
}
