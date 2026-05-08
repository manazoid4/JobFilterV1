import { useState, type MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import type { DecisionFlag } from '../lib/types';
import { ScoreBadge } from './ScoreBadge';
import { Tag } from './Tag';

type LeadStatus = 'contacted' | 'quoted' | 'won' | 'lost' | 'ignored';

const STATUS_PILLS: { label: string; value: LeadStatus }[] = [
  { label: 'CONTACTED', value: 'contacted' },
  { label: 'QUOTED', value: 'quoted' },
  { label: 'WON', value: 'won' },
  { label: 'LOST', value: 'lost' },
  { label: 'IGNORE', value: 'ignored' },
];

type LeadCardProps = {
  key?: string;
  id?: string;
  title: string;
  score: number;
  tags: DecisionFlag[] | string[];
  cta?: string;
  to?: string;
  href?: string;
  meta?: string;
  showStatus?: boolean;
};

export function LeadCard({ id, title, score, tags, cta = 'OPEN', to, href, meta, showStatus = false }: LeadCardProps) {
  const storageKey = `lead_status_${id ?? ''}`;
  const [status, setStatus] = useState<LeadStatus | null>(() => {
    if (!id || typeof window === 'undefined') return null;
    return (localStorage.getItem(storageKey) as LeadStatus | null);
  });

  function handleStatusClick(event: MouseEvent, value: LeadStatus) {
    event.preventDefault();
    event.stopPropagation();
    const next = status === value ? null : value;
    if (next) {
      localStorage.setItem(storageKey, next);
    } else {
      localStorage.removeItem(storageKey);
    }
    setStatus(next);
  }

  const content = (
    <article className="jf-box grid grid-cols-[auto_1fr] gap-4 bg-white p-4">
      <ScoreBadge score={score} />
      <div className="min-w-0">
        <p className="micro-label text-[var(--muted)]">{meta ?? 'Decision'}</p>
        <h3 className="mt-2 text-xl font-black leading-tight">{title}</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.slice(0, 4).map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
          {meta === 'EPC' && <Tag label="epc_signal" />}
          {meta === 'PlanningData' && <Tag label="planning_portal" />}
        </div>
        <div className="mt-4">
          <span className="jf-button bg-[var(--navy)] text-white">{cta}</span>
        </div>
        {showStatus && id && (
          <div className="mt-3 flex flex-wrap gap-2" onClick={(e) => e.stopPropagation()}>
            {STATUS_PILLS.map(({ label, value }) => (
              <button
                key={value}
                onClick={(e) => handleStatusClick(e, value)}
                className={`min-h-[44px] border-2 px-2 py-1 text-[10px] font-black uppercase tracking-wide ${
                  status === value
                    ? 'bg-[var(--yellow)] border-[var(--ink)] text-[var(--ink)]'
                    : 'bg-white border-[var(--line)] text-[var(--muted)]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </article>
  );

  if (href) {
    return <a href={href} target="_blank" rel="noreferrer">{content}</a>;
  }

  return <Link to={to ?? `/leads/${id ?? ''}`}>{content}</Link>;
}
