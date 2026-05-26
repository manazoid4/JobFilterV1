type TrustBadgesProps = {
  badges: string[];
  max?: number;
};

const BADGE_LABELS: Record<string, string> = {
  'Planning Verified': 'Verified Signal',
  'Tender Live': 'Live Work',
  'Fresh': 'Fresh',
  'Company Verified': 'Co. Verified',
  'New Owner': 'New Owner',
  'Budget Band': 'Budget Confirmed',
  'Exclusive': 'Priority Routed',
  'Retrofit Trigger': 'Retrofit',
  'Multi-Source': 'Verified Stack',
  fresh: 'Fresh',
  'planning-verified': 'Verified Signal',
  'tender-live': 'Live Work',
  exclusive: 'Priority Routed',
  'budget-band': 'Budget Confirmed',
  'multi-source': 'Verified Stack',
  'retrofit-trigger': 'Retrofit Trigger',
};

export function TrustBadges({ badges, max }: TrustBadgesProps) {
  const visibleBadges = badges
    .map((badge) => normaliseBadge(badge))
    .filter(Boolean)
    .slice(0, max);

  if (visibleBadges.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5">
      {visibleBadges.map((badge) => (
        <span
          key={badge}
          className="border border-[var(--navy)] bg-[var(--yellow)] px-2 py-0.5 text-[10px] font-black uppercase text-[var(--ink)]"
        >
          {BADGE_LABELS[badge] ?? titleCaseBadge(badge)}
        </span>
      ))}
    </div>
  );
}

function normaliseBadge(badge: string): string {
  return String(badge ?? '')
    .trim()
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

function titleCaseBadge(badge: string): string {
  return badge
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}
