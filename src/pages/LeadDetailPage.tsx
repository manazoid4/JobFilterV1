import { Link, useParams } from 'react-router-dom';
import { ActionBar } from '../components/ActionBar';
import { ScoreBadge } from '../components/ScoreBadge';
import { getStoredLeads, updateStoredLead } from '../lib/leadStore';

export function LeadDetailPage() {
  const { id = '' } = useParams();
  const lead = getStoredLeads().find((item) => item.id === id);

  if (!lead) {
    return (
      <main className="page-shell py-8">
        <section className="jf-box bg-white p-6">
          <h1 className="headline text-4xl">LEAD NOT FOUND</h1>
          <Link className="jf-button mt-4 bg-[var(--yellow)] text-[var(--ink)]" to="/leads">BACK</Link>
        </section>
      </main>
    );
  }

  function setStatus(status: 'saved' | 'ignored') {
    updateStoredLead(lead!.id, { status });
    window.location.href = '/leads';
  }

  return (
    <main className="page-shell grid gap-5 py-8 pb-28 md:pb-8">
      <section className="jf-box grid gap-5 bg-white p-6 sm:grid-cols-[auto_1fr]">
        <ScoreBadge score={lead.score} large />
        <div>
          <p className="micro-label text-[var(--orange)]">{lead.urgency}</p>
          <h1 className="headline mt-2 text-5xl leading-none">{lead.jobType}</h1>
          <p className="mt-3 text-xl font-black text-[var(--muted)]">{lead.area}</p>
        </div>
      </section>

      <section className="jf-box bg-white p-6">
        <h2 className="headline text-3xl">REASONS</h2>
        <div className="mt-4 grid gap-2 text-xl font-black">
          {lead.flags.includes('Local') && <p>YES Local</p>}
          {lead.flags.includes('Urgent') && <p>YES Urgent</p>}
          {lead.flags.includes('Photos') && <p>YES Photos</p>}
          {lead.flags.includes('Clear') ? <p>YES Clear</p> : <p>NO Low detail</p>}
          {lead.flags.includes('Budget') && <p>NO Low budget</p>}
        </div>
      </section>

      {lead.details && (
        <section className="jf-box bg-white p-6">
          <h2 className="headline text-3xl">DETAILS</h2>
          <p className="mt-3 font-bold text-[var(--muted)]">{lead.details}</p>
        </section>
      )}

      <ActionBar>
        <a className="jf-button bg-[var(--yellow)] text-[var(--ink)]" href="tel:">CALL</a>
        <button className="jf-button bg-[var(--bg-main)] text-[var(--ink)]" onClick={() => setStatus('ignored')}>IGNORE</button>
        <button className="jf-button bg-[var(--navy)] text-white" onClick={() => setStatus('saved')}>SAVE</button>
      </ActionBar>
    </main>
  );
}
