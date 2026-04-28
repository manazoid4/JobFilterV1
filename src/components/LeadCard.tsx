import type { Lead } from '../lib/types';

function formatDate(value: string) {
  if (!value) return 'Not listed';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Not listed';
  return new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(date);
}

export function LeadCard({ lead }: { lead: Lead }) {
  return (
    <article className="jf-box bg-white p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-3xl">
          <div className="flex flex-wrap gap-2">
            <span className="badge bg-[var(--navy)] text-white">{lead.source}</span>
            <span className="badge bg-[var(--yellow)] text-[var(--ink)]">{lead.score}/100 MATCH</span>
            <span className="badge border border-[var(--line)] bg-white">{lead.sourceConfidence}% CONFIDENCE</span>
          </div>
          <h2 className="mt-4 text-2xl font-black leading-tight">{lead.title}</h2>
          <p className="mt-2 text-sm font-bold uppercase text-[var(--muted)]">{lead.buyer || 'Buyer not listed'}</p>
        </div>
        <a className="jf-button bg-[var(--orange)] text-white" href={lead.url} target="_blank" rel="noreferrer">
          View Notice
        </a>
      </div>
      <dl className="mt-5 grid gap-3 border-t-2 border-[var(--line)] pt-4 sm:grid-cols-2 lg:grid-cols-5">
        <Info label="Location" value={lead.location || 'UK'} />
        <Info label="Outward" value={lead.postcodeOutward || 'N/A'} />
        <Info label="Value" value={lead.estimatedValue || 'Not listed'} />
        <Info label="Published" value={formatDate(lead.publishedAt)} />
        <Info label="Deadline" value={formatDate(lead.deadlineAt)} />
      </dl>
    </article>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="micro-label text-[10px] text-[var(--muted)]">{label}</dt>
      <dd className="mt-1 font-black">{value}</dd>
    </div>
  );
}
