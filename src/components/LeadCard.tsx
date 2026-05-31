import Link from 'next/link';
import { useState, type MouseEvent } from 'react';

import { Clock } from 'lucide-react';
import type { DecisionFlag } from '../lib/types';
import { ScoreBadge } from './ScoreBadge';
import { Tag } from './Tag';
import { LeadReadinessBadge } from './LeadReadinessBadge';
import { ScoreBadgeCompact } from './SeriousBuyerScore';

// Mirrors leadEngine/types.ts LeadStatus and server/routes/outcomeReport.ts OUTCOME_STATUSES
type LeadStatus = 'contacted' | 'quoted' | 'won' | 'lost' | 'no_answer' | 'ignored';

const STATUS_PILLS: { label: string; value: LeadStatus }[] = [
  { label: 'CONTACTED', value: 'contacted' },
  { label: 'QUOTED', value: 'quoted' },
  { label: 'WON', value: 'won' },
  { label: 'LOST', value: 'lost' },
  { label: 'NO ANSWER', value: 'no_answer' },
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
  leadReadiness?: 'READY' | 'MAYBE' | 'WASTE';
  buyerScore?: number;
  freshness?: string;
  /** Paid users only: show Send to WhatsApp button */
  showWhatsApp?: boolean;
  /** Full lead object for WhatsApp delivery */
  leadData?: Record<string, unknown>;
};

export function LeadCard({ id, title, score, tags, cta = 'OPEN', to, href, meta, showStatus = false, leadReadiness, buyerScore, freshness, showWhatsApp = false, leadData }: LeadCardProps) {
  const storageKey = `lead_status_${id ?? ''}`;
  const [status, setStatus] = useState<LeadStatus | null>(() => {
    if (!id || typeof window === 'undefined') return null;
    return (localStorage.getItem(storageKey) as LeadStatus | null);
  });
  const [whatsappSending, setWhatsappSending] = useState(false);
  const [whatsappDone, setWhatsappDone] = useState(false);

  async function handleSendWhatsApp(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    const phone = prompt('Enter your WhatsApp number (e.g. +447700900000):');
    if (!phone) return;
    setWhatsappSending(true);
    try {
      const res = await fetch('/api/leads/whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lead: leadData ?? { id, title, score }, phone_number: phone }),
      });
      const data = await res.json();
      if (data.ok) {
        setWhatsappDone(true);
      } else {
        alert(data.error ?? 'WhatsApp delivery failed');
      }
    } catch {
      alert('WhatsApp delivery failed');
    } finally {
      setWhatsappSending(false);
    }
  }

  function handleStatusClick(event: MouseEvent, value: LeadStatus) {
    event.preventDefault();
    event.stopPropagation();
    const next = status === value ? null : value;
    // Local-first: update localStorage immediately for offline resilience
    if (next) {
      localStorage.setItem(storageKey, next);
    } else {
      localStorage.removeItem(storageKey);
    }
    setStatus(next);
    // Backend sync: fire-and-forget, non-blocking
    if (id && next) {
      fetch('/api/leads/outcome', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId: id, status: next, title }),
      }).catch(() => {
        // Swallow silently — local state is always the source of truth
      });
    }
  }

  const content = (
    <article className="jf-box mobile-stack grid grid-cols-[auto_1fr] gap-4 bg-[var(--paper)] p-4 sm:grid-cols-[auto_1fr]">
      <ScoreBadge score={score} />
      <div className="min-w-0">
        <p className="micro-label text-[var(--muted)]">{meta ?? 'Decision'}</p>
        <h3 className="mt-2 text-xl font-black leading-tight">{title}</h3>
        <div className="mt-3 flex flex-wrap gap-1">
          {tags.slice(0, 4).map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
          {meta && <Tag label="verified_signal" />}
          {freshness && (
            <span className="inline-flex items-center gap-1 border-2 border-[var(--green)] bg-[var(--green)]/10 px-2 py-0.5 text-[10px] font-black uppercase text-[var(--green)]">
              <Clock size={10} strokeWidth={3} />
              {freshness}
            </span>
          )}
        </div>
        {(leadReadiness || buyerScore !== undefined) && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {leadReadiness && <LeadReadinessBadge level={leadReadiness} size="sm" />}
            {buyerScore !== undefined && <ScoreBadgeCompact score={buyerScore} />}
          </div>
        )}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="jf-button bg-[var(--navy)] text-white">{cta}</span>
          {showWhatsApp && (
            <button
              type="button"
              onClick={handleSendWhatsApp}
              disabled={whatsappSending || whatsappDone}
              className="border-2 border-[var(--green)] bg-[var(--green)]/10 px-3 py-1.5 text-[10px] font-black uppercase text-[var(--green)] min-h-[44px] hover:bg-[var(--green)]/20 disabled:opacity-50"
            >
              {whatsappDone ? 'SENT ✓' : whatsappSending ? 'SENDING…' : 'SEND TO WHATSAPP'}
            </button>
          )}
        </div>
        {showStatus && id && (
          <div className="mt-3 flex flex-wrap gap-1" onClick={(e) => e.stopPropagation()}>
            {STATUS_PILLS.map(({ label, value }) => (
              <button
                key={value}
                onClick={(e) => handleStatusClick(e, value)}
                className={`min-h-[44px] border-2 px-2 py-1 text-[10px] font-black uppercase tracking-wide ${
                  status === value
                    ? 'bg-[var(--yellow)] border-[var(--ink)] text-[var(--ink)]'
                : 'bg-[var(--paper)] border-[var(--line)] text-[var(--ink)]'
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

  return <Link href={to ?? `/leads/${id ?? ''}`}>{content}</Link>;
}
