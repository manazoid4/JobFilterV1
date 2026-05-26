import { CalendarClock, Calculator, CircleCheckBig, Radar } from 'lucide-react';
import { getLeadValueKit } from '../lib/leadValue';

type LeadValueSource = {
  score: number;
  urgency: 'high' | 'medium' | 'low' | 'Emergency' | 'This week' | 'Later';
  sourceConfidence?: number;
  recommendedAction?: string;
  quoteFloor?: string;
  followUpCadence?: string[];
  estimatedValue?: string;
  budget?: string;
};

export function LeadValueKit({ lead, unlocked = true, title = 'BUYER ACTION PACK' }: { lead: LeadValueSource; unlocked?: boolean; title?: string }) {
  const kit = getLeadValueKit(lead);
  const quoteFloor = lead.quoteFloor ?? kit.quoteFloorLabel;
  const cadence = lead.followUpCadence ?? kit.followUpCadence;
  const nextAction = lead.recommendedAction ?? kit.nextAction;

  if (!unlocked) {
    return (
      <div className="mt-4 border-2 border-[var(--orange)]/40 bg-[var(--orange)]/5 p-3">
        <p className="micro-label text-[10px] text-[var(--orange)]">{title}</p>
        <p className="mt-1 text-sm font-black text-[var(--ink)]">Unlock the quote floor, follow-up cadence, and next action beside each lead.</p>
      </div>
    );
  }

  return (
    <div className="mt-4 border-2 border-[var(--navy)] bg-[var(--navy)]/5 p-4">
      <div className="flex items-center gap-2">
        <CircleCheckBig className="h-5 w-5 text-[var(--navy)]" strokeWidth={3} />
        <p className="micro-label text-[10px] text-[var(--navy)]">{title}</p>
      </div>
      <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_1fr]">
        <div className="border-2 border-[var(--line)] bg-white p-3">
          <div className="flex items-center gap-2">
            <Calculator className="h-4 w-4 text-[var(--orange)]" strokeWidth={3} />
            <p className="text-[10px] font-black uppercase text-[var(--muted)]">Quote floor</p>
          </div>
          <p className="mt-1 text-lg font-black text-[var(--ink)]">{quoteFloor}</p>
          <p className="mt-1 text-xs font-black text-[var(--muted)]">{kit.quoteFloorNote}</p>
        </div>
        <div className="border-2 border-[var(--line)] bg-white p-3">
          <div className="flex items-center gap-2">
            <CalendarClock className="h-4 w-4 text-[var(--orange)]" strokeWidth={3} />
            <p className="text-[10px] font-black uppercase text-[var(--muted)]">Next action</p>
          </div>
          <p className="mt-1 text-lg font-black text-[var(--ink)]">{nextAction}</p>
          <p className="mt-1 text-xs font-black text-[var(--muted)]">Use the call, quote, and chase sequence together.</p>
        </div>
      </div>
      <div className="mt-3 border-2 border-[var(--line)] bg-white p-3">
        <div className="flex items-center gap-2">
          <Radar className="h-4 w-4 text-[var(--navy)]" strokeWidth={3} />
          <p className="text-[10px] font-black uppercase text-[var(--muted)]">Follow-up cadence</p>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {cadence.map((step) => (
            <span key={step} className="border-2 border-[var(--navy)] bg-[var(--yellow)] px-2 py-1 text-[10px] font-black uppercase text-[var(--ink)]">
              {step}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
