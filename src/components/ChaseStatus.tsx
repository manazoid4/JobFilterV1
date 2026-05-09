import { useState } from 'react';
import type { ChaseStage } from '../lib/types';
import { updateChaseStage } from '../lib/chaseStore';

const STAGES: { key: ChaseStage; label: string; color: string }[] = [
  { key: 'not_contacted', label: 'NOT CONTACTED', color: 'bg-[var(--orange)] text-white' },
  { key: 'contacted', label: 'CONTACTED', color: 'bg-[var(--yellow)] text-[var(--ink)]' },
  { key: 'following_up', label: 'FOLLOWING UP', color: 'bg-[var(--ink)] text-white' },
  { key: 'won', label: 'WON', color: 'bg-green-600 text-white' },
  { key: 'lost', label: 'LOST', color: 'bg-gray-400 text-[var(--ink)]' },
];

export function ChaseStatus({ leadId, currentStage, onStageChange }: { leadId: string; currentStage: ChaseStage; onStageChange?: (stage: ChaseStage) => void }) {
  const [stage, setStage] = useState<ChaseStage>(currentStage);

  function changeStage(newStage: ChaseStage) {
    setStage(newStage);
    updateChaseStage(leadId, newStage);
    onStageChange?.(newStage);
  }

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="micro-label text-[var(--muted)] mr-1">STATUS:</span>
      {STAGES.map((s) => (
        <button
          key={s.key}
          onClick={() => changeStage(s.key)}
          className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-wider border-2 border-[var(--ink)] ${
            stage === s.key ? s.color : 'bg-[var(--paper)] text-[var(--ink)]'
          }`}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}
