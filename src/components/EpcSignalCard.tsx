type EpcSignalCardProps = {
  address: string;
  rating: 'F' | 'G' | 'E';
  potentialRating: string;
  trade: string;
  signal: string;
  score: number;
  urgency: 'high' | 'medium' | 'low';
};

const RING_COLORS: Record<string, string> = {
  A: 'bg-[#22C55E]',
  B: 'bg-[#22C55E]',
  C: 'bg-[#84CC16]',
  D: 'bg-[#EAB308]',
  E: 'bg-[#F97316]',
  F: 'bg-[#EF4444]',
  G: 'bg-[#DC2626]',
};

export function EpcSignalCard({ address, rating, potentialRating, trade, signal, score, urgency }: EpcSignalCardProps) {
  const scoreColor = score >= 80 ? 'bg-[#C9A227]' : score >= 50 ? 'bg-[var(--yellow)]' : 'bg-[#D7D9D4]';
  const urgencyLabel = urgency === 'high' ? 'GOLD' : urgency === 'medium' ? 'SILVER' : 'BIN';
  const urgencyColor = urgency === 'high' ? 'bg-[var(--yellow)] text-[var(--ink)]' : urgency === 'medium' ? 'bg-white text-[var(--ink)]' : 'bg-[#D7D9D4] text-[var(--muted)]';

  return (
    <article className="border-2 border-white/20 bg-white/5 p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="micro-label text-white/50">{urgencyLabel} SIGNAL</p>
          <h3 className="mt-1 text-lg font-black text-white">{address}</h3>
        </div>
        <div className={`grid h-14 w-14 place-items-center border-2 border-white/20 ${scoreColor} text-[var(--ink)]`}>
          <span className="headline text-2xl leading-none">{score}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className={`inline-block h-6 w-6 rounded-sm ${RING_COLORS[rating]}`} />
          <span className="text-sm font-black text-white/70">Current: {rating}</span>
        </div>
        <span className="text-white/30">→</span>
        <div className="flex items-center gap-2">
          <span className={`inline-block h-6 w-6 rounded-sm ${RING_COLORS[potentialRating] ?? 'bg-[#84CC16]'}`} />
          <span className="text-sm font-black text-white/70">Potential: {potentialRating}</span>
        </div>
      </div>

      <div className="mt-4 border-t border-white/10 pt-3">
        <p className="text-sm font-black text-[var(--yellow)]">{trade}</p>
        <p className="mt-1 text-sm font-black text-white/60">{signal}</p>
      </div>

      <div className="mt-3">
        <span className={`inline-block rounded-none border-2 px-2 py-1 text-[10px] font-black uppercase tracking-wide ${urgencyColor}`}>
          {urgency === 'high' ? 'LEGAL UPGRADE REQUIRED' : urgency === 'medium' ? 'UPGRADE RECOMMENDED' : 'MONITOR'}
        </span>
      </div>
    </article>
  );
}
