import Link from 'next/link';
import { useRef, useState, type MouseEvent, type FormEvent } from 'react';

import { Clock } from 'lucide-react';
import type { DecisionFlag } from '../lib/types';
import { useAuth } from './AuthProvider';
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
  const { user } = useAuth();
  const storageKey = `lead_status_${id ?? ''}`;
  const [status, setStatus] = useState<LeadStatus | null>(() => {
    if (!id || typeof window === 'undefined') return null;
    return (localStorage.getItem(storageKey) as LeadStatus | null);
  });
  const [whatsappSending, setWhatsappSending] = useState(false);
  const [whatsappDone, setWhatsappDone] = useState(false);
  const [whatsappOpen, setWhatsappOpen] = useState(false);
  const [whatsappPhone, setWhatsappPhone] = useState('');
  const [whatsappError, setWhatsappError] = useState('');
  const phoneInputRef = useRef<HTMLInputElement>(null);

  function handleWhatsAppButtonClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    setWhatsappOpen(true);
    setTimeout(() => phoneInputRef.current?.focus(), 50);
  }

  async function handleSendWhatsApp(event: FormEvent) {
    event.preventDefault();
    const phone = whatsappPhone.trim();
    if (!phone) return;
    setWhatsappSending(true);
    setWhatsappError('');
    try {
      const res = await fetch('/api/leads/whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lead: leadData ?? { id, title, score }, phone_number: phone }),
      });
      const data = await res.json();
      if (data.ok) {
        setWhatsappDone(true);
        setWhatsappOpen(false);
      } else {
        setWhatsappError(data.error ?? 'WhatsApp delivery failed');
      }
    } catch {
      setWhatsappError('WhatsApp delivery failed — check your number and try again');
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
        body: JSON.stringify({ leadId: id, status: next, title, userId: user?.id }),
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
        <div className="mt-3 inline-flex items-center gap-1 border border-[var(--green)] bg-[var(--green)]/10 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-[var(--green)]">
          NO SHARED AUCTION
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="jf-button bg-[var(--navy)] text-white">{cta}</span>
          {showWhatsApp && !whatsappOpen && (
            <button
              type="button"
              onClick={handleWhatsAppButtonClick}
              disabled={whatsappDone}
              className="border-2 border-[var(--green)] bg-[var(--green)]/10 px-3 py-1.5 text-xs font-black uppercase text-[var(--green)] min-h-[44px] hover:bg-[var(--green)]/20 disabled:opacity-50"
            >
              {whatsappDone ? 'SENT ✓' : 'SEND TO WHATSAPP'}
            </button>
          )}
          {showWhatsApp && whatsappOpen && (
            <form
              onSubmit={handleSendWhatsApp}
              onClick={(e) => e.stopPropagation()}
              className="mt-1 flex w-full flex-col gap-2"
            >
              <input
                ref={phoneInputRef}
                type="tel"
                value={whatsappPhone}
                onChange={(e) => setWhatsappPhone(e.target.value)}
                placeholder="+447700900000"
                className="border-2 border-[var(--line)] px-3 py-2 text-sm font-black text-[var(--ink)] focus:border-[var(--green)] focus:outline-none w-full"
              />
              {whatsappError && <p className="text-xs font-black text-[var(--orange)]">{whatsappError}</p>}
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={whatsappSending}
                  className="border-2 border-[var(--green)] bg-[var(--green)] px-3 py-1.5 text-xs font-black uppercase text-white disabled:opacity-50"
                >
                  {whatsappSending ? 'SENDING…' : 'SEND →'}
                </button>
                <button
                  type="button"
                  onClick={() => { setWhatsappOpen(false); setWhatsappError(''); }}
                  className="border-2 border-[var(--line)] px-3 py-1.5 text-xs font-black uppercase text-[var(--muted)]"
                >
                  CANCEL
                </button>
              </div>
            </form>
          )}
        </div>
        {showStatus && id && (
          <div className="mt-3 flex flex-wrap gap-1" onClick={(e) => e.stopPropagation()}>
            {STATUS_PILLS.map(({ label, value }) => (
              <button
                key={value}
                onClick={(e) => handleStatusClick(e, value)}
                className={`min-h-[44px] border-2 px-2 py-1 text-xs font-black uppercase tracking-wide ${
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
