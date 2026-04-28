export function ScoreBadge({ score, large = false }: { score: number; large?: boolean }) {
  const tone = score >= 80
    ? 'bg-[#C9A227] text-[var(--ink)]'
    : score >= 50
      ? 'bg-[var(--yellow)] text-[var(--ink)]'
      : 'bg-[#D7D9D4] text-[var(--ink)]';

  return (
    <div className={`grid place-items-center border-2 border-[var(--line)] ${tone} ${large ? 'h-28 w-28' : 'h-20 w-20'}`}>
      <span className={`headline leading-none ${large ? 'text-5xl' : 'text-3xl'}`}>{score}</span>
      <span className="text-[10px] font-black uppercase">Score</span>
    </div>
  );
}
