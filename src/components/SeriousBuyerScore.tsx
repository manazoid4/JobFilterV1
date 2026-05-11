import { Target } from 'lucide-react';

interface SeriousBuyerScoreProps {
  score: number;
  showBar?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

function getScoreLabel(score: number): string {
  if (score >= 90) return 'GOLD';
  if (score >= 75) return 'SILVER';
  if (score >= 60) return 'BRONZE';
  return 'CHECK';
}

function getScoreColor(score: number): string {
  if (score >= 90) return 'text-[var(--green)] border-[var(--green)] bg-[var(--green)]/5';
  if (score >= 75) return 'text-[var(--yellow)] border-[var(--yellow)] bg-[var(--yellow)]/5';
  if (score >= 60) return 'text-[var(--orange)] border-[var(--orange)] bg-[var(--orange)]/5';
  return 'text-[var(--muted)] border-[var(--muted)] bg-[var(--muted)]/5';
}

function getBarColor(score: number): string {
  if (score >= 90) return 'bg-[var(--green)]';
  if (score >= 75) return 'bg-[var(--yellow)]';
  if (score >= 60) return 'bg-[var(--orange)]';
  return 'bg-[var(--muted)]';
}

export function SeriousBuyerScore({ score, showBar = true, size = 'md' }: SeriousBuyerScoreProps) {
  const label = getScoreLabel(score);
  const colorClass = getScoreColor(score);
  const barColor = getBarColor(score);

  const sizeClasses = {
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-6',
  };

  const numSize = {
    sm: 'text-3xl',
    md: 'text-5xl',
    lg: 'text-6xl',
  };

  return (
    <div className={`jf-box border-2 ${colorClass} ${sizeClasses[size]} text-center`}>
      <div className="flex items-center justify-center gap-2 mb-2">
        <Target size={size === 'sm' ? 14 : size === 'md' ? 18 : 22} strokeWidth={3} />
        <p className="micro-label">Serious Buyer Score</p>
      </div>
      <p className={`headline ${numSize[size]}`}>{score}</p>
      <p className="mt-1 text-xs font-black uppercase">{label}</p>
      {showBar && (
        <div className="mt-3 h-2 w-full bg-black/10">
          <div className={`h-full ${barColor} transition-all`} style={{ width: `${score}%` }} />
        </div>
      )}
    </div>
  );
}

export function ScoreBadgeCompact({ score }: { score: number }) {
  const label = getScoreLabel(score);
  const colorClass = getScoreColor(score);

  return (
    <span className={`inline-flex items-center gap-1.5 border-2 px-2 py-1 text-xs font-black uppercase ${colorClass}`}>
      <Target size={12} strokeWidth={3} />
      {score} {label}
    </span>
  );
}
