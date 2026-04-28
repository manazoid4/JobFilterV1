import { Link } from 'react-router-dom';
import { LeadCard } from '../components/LeadCard';
import { getStoredLeads } from '../lib/leadStore';

export function LeadListPage() {
  const leads = getStoredLeads().filter((lead) => lead.status !== 'ignored');
  const needsAction = leads.filter((lead) => lead.status === 'new');

  return (
    <main className="page-shell grid gap-5 py-8 pb-24 md:pb-8">
      <section>
        <p className="micro-label text-[var(--orange)]">NEW LEADS</p>
        <h1 className="headline mt-2 text-5xl leading-none">NEEDS ACTION</h1>
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
            />
          ))}
        </div>
      )}
    </main>
  );
}
