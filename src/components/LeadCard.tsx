import { Link } from 'react-router-dom';
import type { DecisionFlag } from '../lib/types';
import { ScoreBadge } from './ScoreBadge';
import { Tag } from './Tag';

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
};

export function LeadCard({ id, title, score, tags, cta = 'OPEN', to, href, meta }: LeadCardProps) {
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
      </div>
    </article>
  );

  if (href) {
    return <a href={href} target="_blank" rel="noreferrer">{content}</a>;
  }

  return <Link to={to ?? `/leads/${id ?? ''}`}>{content}</Link>;
}
