import { Link } from 'react-router-dom';
import { LeadCard } from '../components/LeadCard';
import { getStoredLeads } from '../lib/leadStore';

export function LeadListPage() {
  const stored = getStoredLeads();
  const leads = stored.filter((lead) => lead.status !== 'ignored');
  const needsAction = leads.filter((lead) => lead.status === 'new');
  const outcomes = {
    won: stored.filter((lead) => lead.status === 'won').length,
    lost: stored.filter((lead) => lead.status === 'lost').length,
    no_answer: stored.filter((lead) => lead.status === 'no_answer').length,
  };

  return (
    <main className="page-shell grid gap-5 py-8 pb-24 md:pb-8">
      <section>
        <p className="micro-label text-[var(--orange)]">NEW LEADS</p>
        <h1 className="headline mt-2 text-5xl leading-none">NEEDS ACTION</h1>
      </section>

      <section className="jf-box grid gap-3 bg-white p-4 sm:grid-cols-3">
        <OutcomeStat label="WON" value={outcomes.won} />
        <OutcomeStat label="LOST" value={outcomes.lost} />
        <OutcomeStat label="NO ANSWER" value={outcomes.no_answer} />
        <span className="sr-only">OUTCOMES</span>
      </section>

      {needsAction.length === 0 ? (
        <section className="jf-box bg-white p-6">
          <h2 className="headline text-3xl">NO NEW LEADS</h2>
          <p className="mt-2 font-black text-[var(--muted)]">Share your filter link.</p>
          <Link className="jf-button mt-4 bg-[var(--yellow)] text-[var(--ink)]" to="/my-link">GET LINK</Link>
        </section>
      ) : (
        <div className="grid gap-4">
          {needsAction.map((lead) => (
            <LeadCard
              key={lead.id}
              id={lead.id}
              title={`${lead.jobType} - ${lead.area}`}
              score={lead.score}
              tags={lead.flags}
              meta={lead.urgency}
              cta="DECIDE"
              showStatus
            />
          ))}
        </div>
      )}
    </main>
  );
}

function OutcomeStat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <p className="micro-label text-[10px] text-[var(--muted)]">{label}</p>
      <p className="headline mt-1 text-4xl">{value}</p>
    </div>
  );
}
