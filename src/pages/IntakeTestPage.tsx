import { useState } from 'react';
import type { LeadDecision } from '../lib/types';

type Scenario = {
  name: string;
  verdict: string;
  payload: {
    jobType: string;
    urgency: LeadDecision['urgency'];
    budget: string;
    postcode: string;
    phone: string;
    details: string;
    hasPhotos: boolean;
  };
};

const scenarios: Scenario[] = [
  {
    name: 'One strong lead per week',
    verdict: 'Pay-worthy if it is local, urgent, clear, and above £2k.',
    payload: {
      jobType: 'Electrical',
      urgency: 'Emergency',
      budget: '£2,000–£5,000',
      postcode: 'B15 1AA',
      phone: '07123456789',
      details: 'Rental EICR failed. Consumer unit needs replacing this week before tenant move-in. Photos ready.',
      hasPhotos: true,
    },
  },
  {
    name: 'Tyre-kicker filter',
    verdict: 'Should drop into BIN. Cheap, vague, no detail.',
    payload: {
      jobType: 'Building',
      urgency: 'Later',
      budget: 'Under £500',
      postcode: 'B10',
      phone: '07000000000',
      details: 'Need cheap work done.',
      hasPhotos: false,
    },
  },
  {
    name: 'Worth checking',
    verdict: 'Should sit around SILVER. Real lead, but not urgent enough.',
    payload: {
      jobType: 'Plumbing',
      urgency: 'This week',
      budget: '£500–£2,000',
      postcode: 'SW17 0AA',
      phone: '07111111111',
      details: 'Boiler losing pressure. Wants a repair quote this week and can send photos.',
      hasPhotos: true,
    },
  },
];

export function IntakeTestPage() {
  const [selected, setSelected] = useState(scenarios[0]);
  const [lead, setLead] = useState<LeadDecision | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function runScenario(scenario = selected) {
    setSelected(scenario);
    setLoading(true);
    setError('');
    setLead(null);

    try {
      const response = await fetch('/api/intake/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...scenario.payload, username: 'live-scoring' }),
      });
      const payload = await response.json() as { ok: boolean; lead?: LeadDecision; errors?: string[] };
      if (!response.ok || !payload.ok || !payload.lead) {
        throw new Error(payload.errors?.[0] ?? 'intake scoring failed');
      }
      setLead(payload.lead);
    } catch (err) {
      setError(String(err instanceof Error ? err.message : err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-shell grid gap-5 py-8 pb-24 md:pb-8">
      <section className="jf-box bg-white p-6">
        <p className="micro-label text-[var(--orange)]">INTAKE ENGINE — LIVE SCORING</p>
        <h1 className="headline mt-3 text-5xl leading-none md:text-7xl">SCORE ANY JOB. INSTANTLY.</h1>
        <p className="mt-3 max-w-2xl text-lg font-black text-[var(--muted)]">
          Select a job type and see how the engine scores it. Live scoring. Real criteria.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="grid gap-4">
          {scenarios.map((scenario) => (
            <button
              key={scenario.name}
              className={`jf-box bg-white p-5 text-left ${selected.name === scenario.name ? 'outline outline-4 outline-[var(--yellow)]' : ''}`}
              onClick={() => void runScenario(scenario)}
            >
              <p className="micro-label text-[var(--orange)]">SCORE THIS</p>
              <h2 className="headline mt-2 text-3xl">{scenario.name}</h2>
              <p className="mt-2 text-base font-black text-[var(--muted)]">{scenario.verdict}</p>
            </button>
          ))}
        </div>

        <section className="jf-box bg-white p-6">
          <p className="micro-label text-[var(--orange)]">CURRENT RESULT</p>
          <h2 className="headline mt-2 text-3xl sm:text-4xl">STAY IN CONTROL</h2>
          <div className="mt-5 grid gap-3 text-base font-black">
            <ResultRow label="Scenario" value={selected.name} />
            <ResultRow label="Job" value={`${selected.payload.jobType} / ${selected.payload.urgency}`} />
            <ResultRow label="Budget" value={selected.payload.budget} />
            <ResultRow label="Postcode" value={selected.payload.postcode} />
            {loading && <p className="rounded-sm bg-[var(--yellow)] p-3">SCORING...</p>}
            {error && <p className="rounded-sm bg-red-100 p-3 text-red-800">{error}</p>}
            {lead && (
              <>
                <ResultRow label="Tier" value={lead.tier ?? 'UNKNOWN'} />
                <ResultRow label="Score" value={`${lead.score}/100`} />
                <ResultRow label="Flags" value={lead.flags.join(', ') || 'None'} />
                <p className="rounded-sm border-2 border-[var(--line)] bg-[var(--bg-main)] p-3">
                  {lead.tier === 'GOLD'
                    ? 'CONTROL THE JOBS: send this straight to WhatsApp.'
                    : lead.tier === 'SILVER'
                      ? 'Worth checking, but do not let it jump the queue.'
                      : 'BIN IT. NO COMPETING for weak work.'}
                </p>
              </>
            )}
            {!lead && !loading && !error && (
              <button className="jf-button bg-[var(--yellow)] text-[var(--ink)]" onClick={() => void runScenario()}>
                SCORE THIS
              </button>
            )}
          </div>
        </section>
      </section>
    </main>
  );
}

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b-2 border-[var(--line)] pb-2">
      <span className="text-[var(--muted)]">{label}</span>
      <span className="max-w-[65%] text-right">{value}</span>
    </div>
  );
}
