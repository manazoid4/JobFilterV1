import type { Lead } from '../lib/types';

function formatDate(value?: string) {
  if (!value) return 'Not listed';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return 'Not listed';
  return new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(d);
}

export function LeadCard({ lead }: { lead: Lead }) {
  return (
    <article className="rounded-xl border border-white/10 bg-white/5 p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-3xl">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-[var(--yellow)] px-2 py-0.5 text-xs font-black text-[var(--ink)]">{lead.source}</span>
            {lead.score !== undefined && (
              <span className="rounded-full border border-white/20 px-2 py-0.5 text-xs font-bold text-white/70">{lead.score}/100 match</span>
            )}
            <span className="rounded-full border border-white/20 px-2 py-0.5 text-xs font-bold text-white/70">{lead.sourceConfidence}% confidence</span>
            {lead.urgency && (
              <span className={`rounded-full px-2 py-0.5 text-xs font-black ${lead.urgency === 'high' ? 'bg-red-500/80 text-white' : lead.urgency === 'medium' ? 'bg-orange-400/80 text-white' : 'bg-white/10 text-white/60'}`}>
                {lead.urgency}
              </span>
            )}
          </div>
          <h2 className="mt-3 text-xl font-black leading-tight text-white">{lead.title}</h2>
          <p className="mt-1 text-sm font-semibold text-white/50">{lead.buyerName || 'Buyer not listed'}</p>
        </div>
        {lead.sourceUrl && (
          <a className="shrink-0 rounded-lg bg-[var(--yellow)] px-4 py-2 text-sm font-black text-[var(--ink)] hover:opacity-90" href={lead.sourceUrl} target="_blank" rel="noreferrer">
            View Notice →
          </a>
        )}
      </div>
      <dl className="mt-4 grid gap-3 border-t border-white/10 pt-4 sm:grid-cols-2 lg:grid-cols-4">
        <Info label="Location" value={lead.location || 'UK'} />
        <Info label="Outward" value={lead.postcodeOutward || 'N/A'} />
        <Info label="Value" value={lead.estimatedValue || 'Not listed'} />
        <Info label="Deadline" value={formatDate(lead.deadlineAt)} />
      </dl>
    </article>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] font-black uppercase tracking-wider text-white/40">{label}</dt>
      <dd className="mt-1 font-black text-white">{value}</dd>
    </div>
  );
}
