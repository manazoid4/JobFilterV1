type TrustBadgesProps = {
  badges: string[];
  max?: number;
};

const badgeLabels: Record<string, string> = {
  fresh: 'Fresh',
  'planning-verified': 'Planning Verified',
  'tender-live': 'Tender Live',
  exclusive: 'Exclusive',
  'budget-band': 'Budget Confirmed',
  'multi-source': 'Multi-Source',
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
          className="border-2 border-[var(--navy)] bg-[var(--yellow)] px-2 py-0.5 text-[10px] font-black uppercase text-[var(--ink)]"
        >
          {badgeLabels[badge] ?? titleCaseBadge(badge)}
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
