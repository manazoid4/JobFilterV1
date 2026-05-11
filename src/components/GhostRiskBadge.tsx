import { ShieldCheck, AlertTriangle, XCircle } from 'lucide-react';

type GhostRiskLevel = 'READY' | 'MAYBE' | 'WASTE';

interface GhostRiskBadgeProps {
  level: GhostRiskLevel;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const config: Record<GhostRiskLevel, { color: string; bg: string; border: string; icon: typeof ShieldCheck; label: string; action: string }> = {
  READY: {
    color: 'text-[var(--green)]',
    bg: 'bg-[var(--green)]/5',
    border: 'border-[var(--green)]',
    icon: ShieldCheck,
    label: 'LOW GHOST RISK',
    action: 'Call within 24 hours',
  },
  MAYBE: {
    color: 'text-[var(--yellow)]',
    bg: 'bg-[var(--yellow)]/5',
    border: 'border-[var(--yellow)]',
    icon: AlertTriangle,
    label: 'MEDIUM GHOST RISK',
    action: 'Verify before site visit',
  },
  WASTE: {
    color: 'text-[var(--orange)]',
    bg: 'bg-[var(--orange)]/5',
    border: 'border-[var(--orange)]',
    icon: XCircle,
    label: 'HIGH GHOST RISK',
    action: 'Skip or rough estimate only',
  },
};

export function GhostRiskBadge({ level, showLabel = true, size = 'md' }: GhostRiskBadgeProps) {
  const c = config[level];
  const Icon = c.icon;

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const iconSizes = {
    sm: 14,
    md: 18,
    lg: 22,
  };

  return (
    <span className={`inline-flex items-center gap-2 border-2 ${c.border} ${c.bg} ${sizeClasses[size]} font-black uppercase`}>
      <Icon size={iconSizes[size]} strokeWidth={3} className={c.color} />
      {showLabel && (
        <span className={c.color}>{c.label}</span>
      )}
    </span>
  );
}

export function GhostRiskDetail({ level }: { level: GhostRiskLevel }) {
  const c = config[level];
  const Icon = c.icon;

  return (
    <div className={`jf-box ${c.bg} border-2 ${c.border} p-5`}>
      <div className="flex items-center gap-3">
        <Icon size={24} strokeWidth={3} className={c.color} />
        <div>
          <p className={`headline text-xl ${c.color}`}>{c.label}</p>
          <p className="mt-1 text-sm font-black text-[var(--muted)]">{c.action}</p>
        </div>
      </div>
    </div>
  );
}
