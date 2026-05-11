import { useState } from 'react';
import { Link } from 'react-router-dom';
import { WaitlistForm } from '../components/WaitlistForm';

const trades = [
  { id: 'electrical', label: 'Electrical', signals: 'EPC F/G retrofit, rewires, EV charger installs from planning approvals, EICR compliance jobs', value: '£800 - £50k', example: { title: 'Consumer unit + rewire - rental compliance', area: 'B14 / West Midlands', value: '£4,500', urgency: 'Tenant move-in deadline', source: 'EPC Register + Council Planning' } },
  { id: 'plumbing', label: 'Plumbing', signals: 'Boiler replacements, bathroom fits, commercial maintenance tenders, heat pump installs', value: '£500 - £15k', example: { title: 'Full bathroom refit - budget confirmed', area: 'SW17 / London', value: '£6,200', urgency: 'Start within 2 weeks', source: 'Contracts Finder' } },
  { id: 'roofing', label: 'Roofing', signals: 'Planning-approved extensions needing roof work, flat roof replacements, commercial re-roofs from Contracts Finder', value: '£2k - £80k', example: { title: 'Commercial flat roof replacement', area: 'M4 / Manchester', value: '£22,000', urgency: 'Pre-winter deadline', source: 'Contracts Finder - Official tender' } },
  { id: 'building', label: 'Building', signals: 'Extensions, loft conversions, commercial refurbs from planning data, Contracts Finder public tenders', value: '£15k - £500k', example: { title: 'Double extension - planning approved', area: 'LS6 / Leeds', value: '£45,000', urgency: 'Planning approval expires', source: 'Planning Data - Verified approval' } },
  { id: 'hvac', label: 'HVAC', signals: 'Heat pump installs for EPC F/G properties, commercial HVAC maintenance contracts, air con tenders', value: '£3k - £100k', example: { title: 'Heat pump install - EPC G rated property', area: 'BS5 / Bristol', value: '£11,500', urgency: 'Landlord compliance deadline', source: 'EPC Register' } },
  { id: 'landscaping', label: 'Landscaping', signals: 'Planning approvals for new builds, commercial grounds maintenance contracts, council tenders', value: '£1k - £20k', example: { title: 'Commercial grounds contract - council', area: 'OX1 / Oxford', value: '£8,400/year', urgency: 'Contract renewal window', source: 'Contracts Finder' } },
];

type Trade = typeof trades[number];

export function ForYourTradePage() {
  const [selected, setSelected] = useState<Trade>(trades[0]);

  return (
    <main className="page-shell grid gap-6 py-8 pb-8">
      <section className="jf-box bg-[var(--yellow)] p-7">
        <p className="micro-label text-[var(--ink)]">FOR YOUR TRADE</p>
        <h1 className="headline mt-4 max-w-5xl text-5xl leading-none md:text-7xl">
          JOBS FOR YOUR TRADE. BEFORE ANYONE ELSE SEES THEM.
        </h1>
        <p className="mt-5 max-w-2xl text-xl font-black text-[var(--ink)]">
          Pick your trade. See the signals JobFilter ranks before it sends anything to WhatsApp.
        </p>
      </section>

      <section className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {trades.map((trade) => (
          <button
            key={trade.id}
            type="button"
            onClick={() => setSelected(trade)}
            className={`border-4 border-[var(--navy)] p-4 text-left font-black uppercase shadow-[4px_4px_0_var(--line)] ${
              selected.id === trade.id ? 'bg-[var(--yellow)] text-[var(--ink)]' : 'bg-white text-[var(--ink)]'
            }`}
          >
            {trade.label}
          </button>
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_420px]">
        <article className="jf-box bg-[var(--navy)] p-6 text-white">
          <p className="micro-label text-[var(--yellow)]">{selected.label} SIGNALS</p>
          <h2 className="headline mt-3 text-5xl leading-none text-[var(--yellow)]">WHAT GETS FLAGGED.</h2>
          <p className="mt-4 text-xl font-black text-white/80">{selected.signals}</p>
          <div className="mt-6 border-4 border-[var(--yellow)] p-4">
            <p className="micro-label text-[var(--yellow)]">VALUE RANGE</p>
            <p className="headline mt-2 text-4xl text-white">{selected.value}</p>
          </div>
        </article>

        <article className="jf-box bg-white p-5">
          <p className="micro-label text-[var(--orange)]">EXAMPLE LEAD</p>
          <h2 className="mt-3 text-3xl font-black leading-tight">{selected.example.title}</h2>
          <div className="mt-4 grid gap-3 text-sm">
            <LeadRow label="Area" value={selected.example.area} />
            <LeadRow label="Value" value={selected.example.value} />
            <LeadRow label="Urgency" value={selected.example.urgency} />
            <LeadRow label="Source" value={selected.example.source} />
          </div>
        </article>
      </section>

      <section className="jf-box bg-white p-6">
        <p className="micro-label text-[var(--orange)]">WHY {selected.label.toUpperCase()} TRADESMEN USE JOBFILTER</p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {[
            ['Better timing', 'You see deadline-led work before it turns into a shared lead.'],
            ['Better proof', 'Official source, area, urgency, and value beat vague form fills.'],
            ['Better control', 'Gold jobs go to WhatsApp. Weak noise stays out.'],
          ].map(([title, body]) => (
            <article key={title} className="border-2 border-[var(--line)] bg-[var(--bg-main)] p-4">
              <h3 className="headline text-2xl">{title}</h3>
              <p className="mt-2 font-black text-[var(--muted)]">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_420px] lg:items-center">
        <div className="jf-box bg-[var(--yellow)] p-6">
          <p className="micro-label text-[var(--ink)]">SCAN YOUR PATCH</p>
          <h2 className="headline mt-3 text-5xl leading-none">NO FAKE LEADS. NO CHASING.</h2>
          <Link className="jf-button mt-6 bg-[var(--ink)] text-white" to="/find-jobs">
            SCAN {selected.label.toUpperCase()} JOBS NOW
          </Link>
        </div>
        <WaitlistForm source="for-your-trade" />
      </section>
    </main>
  );
}

function LeadRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b-2 border-[var(--line)] pb-2 last:border-b-0">
      <span className="font-black text-[var(--muted)]">{label}</span>
      <span className="text-right font-black">{value}</span>
    </div>
  );
}
