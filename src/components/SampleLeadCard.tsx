import { ArrowRight, MapPin, Clock, TrendingUp, ShieldCheck, AlertTriangle, CheckCircle } from 'lucide-react';

const sampleLead = {
  id: 'sample-001',
  title: 'Rear extension approved',
  location: 'B17 Harborne, Birmingham',
  propertyType: '4-bed detached',
  score: 94,
  scoreLabel: 'GOLD',
  ghostRisk: 'LOW',
  ghostLabel: 'READY',
  budgetMin: 38000,
  budgetMax: 55000,
  detectedAt: '3 hours ago',
  planningApproved: '3 days ago',
  landRegistrySale: '12 days ago',
  primaryTrade: 'Builder',
  secondaryTrades: ['Electrical', 'Plumbing', 'Roofing'],
  badges: ['Planning Verified', 'Recent Sale', 'Affluent Postcode'],
  recommendedAction: 'Call within 24 hours. First-mover advantage.',
  evidence: [
    { label: 'Planning approved', value: '3 days ago', positive: true },
    { label: 'Detached property', value: '4-bed', positive: true },
    { label: 'Affluent postcode', value: 'B17', positive: true },
    { label: 'Recent sale', value: '12 days ago', positive: true },
    { label: 'Building control', value: 'Not yet filed', positive: false },
  ],
};

export function SampleLeadCard() {
  return (
    <div className="jf-box bg-white p-6 md:p-8 shadow-[6px_6px_0_var(--yellow)]">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="inline-flex items-center gap-1.5 border-2 border-[var(--green)] bg-[var(--green)]/10 px-3 py-1 text-xs font-black uppercase text-[var(--green)]">
          <ShieldCheck size={14} strokeWidth={3} />
          Planning Verified
        </span>
        <span className="inline-flex items-center gap-1.5 border-2 border-[var(--yellow)] bg-[var(--yellow)]/10 px-3 py-1 text-xs font-black uppercase text-[var(--ink)]">
          <Clock size={14} strokeWidth={3} />
          Detected 3 hours ago
        </span>
      </div>

      {/* Title */}
      <h3 className="headline text-2xl md:text-3xl">{sampleLead.title}</h3>
      <div className="mt-2 flex items-center gap-2 text-sm font-black text-[var(--muted)]">
        <MapPin size={16} strokeWidth={2.5} />
        {sampleLead.propertyType}, {sampleLead.location}
      </div>

      {/* Score Grid */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {/* Serious Buyer Score */}
        <div className="jf-box bg-[var(--green)]/5 border-2 border-[var(--green)] p-4 text-center">
          <p className="micro-label text-[var(--green)]">Serious Buyer</p>
          <p className="headline mt-1 text-4xl text-[var(--green)]">{sampleLead.score}</p>
          <p className="mt-1 text-xs font-black uppercase text-[var(--green)]">{sampleLead.scoreLabel}</p>
          <div className="mt-2 h-2 w-full bg-[var(--green)]/20">
            <div className="h-full bg-[var(--green)]" style={{ width: `${sampleLead.score}%` }} />
          </div>
        </div>

        {/* Ghost Risk */}
        <div className="jf-box bg-[var(--green)]/5 border-2 border-[var(--green)] p-4 text-center">
          <p className="micro-label text-[var(--green)]">Ghost Risk</p>
          <p className="headline mt-1 text-3xl text-[var(--green)]">{sampleLead.ghostRisk}</p>
          <p className="mt-1 text-xs font-black uppercase text-[var(--green)]">({sampleLead.ghostLabel})</p>
          <CheckCircle size={20} strokeWidth={3} className="mx-auto mt-2 text-[var(--green)]" />
        </div>

        {/* Budget */}
        <div className="jf-box bg-[var(--yellow)]/10 border-2 border-[var(--yellow)] p-4 text-center">
          <p className="micro-label text-[var(--ink)]">Budget Band</p>
          <p className="headline mt-1 text-2xl text-[var(--ink)]">
            £{sampleLead.budgetMin / 1000}k—£{sampleLead.budgetMax / 1000}k
          </p>
          <p className="mt-1 text-xs font-black text-[var(--muted)]">Estimated project value</p>
          <TrendingUp size={20} strokeWidth={3} className="mx-auto mt-2 text-[var(--yellow)]" />
        </div>
      </div>

      {/* Recommended Action */}
      <div className="mt-5 p-4 border-2 border-[var(--yellow)] bg-[var(--yellow)]/5">
        <p className="micro-label text-[var(--ink)]">RECOMMENDED ACTION</p>
        <p className="mt-1 font-black text-[var(--ink)]">{sampleLead.recommendedAction}</p>
      </div>

      {/* Evidence Stack */}
      <div className="mt-5">
        <p className="micro-label text-[var(--muted)]">WHY THIS SCORES HIGH</p>
        <div className="mt-3 grid gap-2">
          {sampleLead.evidence.map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              {item.positive ? (
                <CheckCircle size={16} strokeWidth={3} className="text-[var(--green)] shrink-0" />
              ) : (
                <AlertTriangle size={16} strokeWidth={3} className="text-[var(--orange)] shrink-0" />
              )}
              <span className="font-black text-[var(--ink)]">{item.label}</span>
              <span className="text-[var(--muted)]">— {item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Timing */}
      <div className="mt-5 flex flex-wrap gap-4 text-xs font-black text-[var(--muted)]">
        <span>Planning approved: {sampleLead.planningApproved}</span>
        <span>Signal detected: {sampleLead.detectedAt}</span>
        <span className="text-[var(--orange)]">Recommended: Call today</span>
      </div>

      {/* Trade Fit */}
      <div className="mt-5 flex flex-wrap gap-2">
        <span className="micro-label text-[var(--muted)] mr-2">TRADE FIT:</span>
        <span className="border-2 border-[var(--ink)] bg-[var(--yellow)] px-2 py-1 text-xs font-black">{sampleLead.primaryTrade}</span>
        {sampleLead.secondaryTrades.map((t) => (
          <span key={t} className="border border-[var(--line)] px-2 py-1 text-xs font-black text-[var(--muted)]">{t}</span>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-6 flex flex-wrap gap-3">
        <span className="jf-button bg-[var(--navy)] text-white cursor-default">
          THIS IS WHAT YOU GET
        </span>
        <span className="text-sm font-black text-[var(--muted)] self-center">
          £39/month. One territory. All the leads.
        </span>
      </div>
    </div>
  );
}
