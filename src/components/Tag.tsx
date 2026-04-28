import type { DecisionFlag } from '../lib/types';

export function Tag({ label }: { key?: string; label: DecisionFlag | string }) {
  return (
    <span className="inline-flex border-2 border-[var(--line)] bg-white px-2 py-1 text-xs font-black uppercase">
      {label}
    </span>
  );
}
