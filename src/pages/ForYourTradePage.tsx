"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Lock } from 'lucide-react';

import { WaitlistForm } from '../components/WaitlistForm';

const trades = [
  { id: 'electrical', label: 'Electrical', signals: 'Rewires, EV charger installs, consumer unit upgrades, landlord EICR compliance — scored before Checkatrade or Bark list them', value: '£800 - £50k', example: { title: 'Consumer unit + rewire - rental compliance', area: 'B14 / West Midlands', value: '£4,500', urgency: 'Tenant move-in deadline', source: 'Verified official signals' } },
  { id: 'plumbing', label: 'Plumbing', signals: 'Boiler replacements, full bathroom refits, commercial maintenance tenders — verified before MyBuilder or Bark see them', value: '£500 - £15k', example: { title: 'Full bathroom refit - budget confirmed', area: 'SW17 / London', value: '£6,200', urgency: 'Start within 2 weeks', source: 'Verified tender record' } },
  { id: 'roofing', label: 'Roofing', signals: 'Planning-approved extensions, flat roof replacements, commercial re-roofs from public tenders — no Checkatrade auctions', value: '£2k - £80k', example: { title: 'Commercial flat roof replacement', area: 'M4 / Manchester', value: '£22,000', urgency: 'Pre-winter deadline', source: 'Official public tender' } },
  { id: 'building', label: 'Building', signals: 'Extensions, loft conversions, commercial refurbs — approved planning signals 24–48 hours before they reach Bark or BuildAlert', value: '£15k - £500k', example: { title: 'Double extension - planning approved', area: 'LS6 / Leeds', value: '£45,000', urgency: 'Planning approval expires', source: 'Verified planning approval' } },
  { id: 'hvac', label: 'HVAC', signals: 'Heat pump installs for low-rated properties, commercial HVAC contracts, air con tenders — flagged before Checkatrade or MyBuilder lists them', value: '£3k - £100k', example: { title: 'Heat pump install - low-rated property', area: 'BS5 / Bristol', value: '£11,500', urgency: 'Landlord compliance deadline', source: 'Verified official signals' } },
  { id: 'landscaping', label: 'Landscaping', signals: 'New build planning approvals, commercial grounds contracts, council tenders — no shared bidding, no Bark credits burned', value: '£1k - £20k', example: { title: 'Commercial grounds contract - council', area: 'OX1 / Oxford', value: '£8,400/year', urgency: 'Contract renewal window', source: 'Official public tender' } },
  { id: 'gas', label: 'Gas Engineer', signals: 'Boiler replacements, landlord CP12 renewals, social housing maintenance tenders — detected before MyBuilder or Bark list the same job', value: '£800 - £12k', example: { title: 'Boiler replacement - rental compliance', area: 'B12 / West Midlands', value: '£2,400', urgency: 'CP12 expiry — landlord deadline', source: 'Verified official signals' } },
  { id: 'solar', label: 'Solar PV', signals: 'Detached homes with high energy demand, new-build solar obligations, low-carbon retrofit signals — tracked 3–5 days before Bark or MyBuilder lists them', value: '£6k - £25k', example: { title: '4kW solar array — detached home', area: 'SE19 / London', value: '£9,800', urgency: 'Spring install window open', source: 'Verified energy signals' } },
  { id: 'ev-charger', label: 'EV Charger', signals: 'Garage planning permits with EV conditions, commercial fleet charger tenders, residential pod installs — flagged before Checkatrade or BuildAlert see them', value: '£800 - £15k', example: { title: 'Commercial EV charger pod — 4 bays', area: 'SE1 / London', value: '£4,200', urgency: 'Fleet rollout deadline', source: 'Verified planning condition' } },
  { id: 'heat-pumps', label: 'Heat Pumps', signals: 'F/G-rated properties, Boiler Upgrade Scheme signals, social housing decarbonisation tenders — detected before Bark or Checkatrade lists them', value: '£8k - £18k', example: { title: 'Air source heat pump — F-rated terrace', area: 'NG1 / Nottingham', value: '£12,500', urgency: 'BUS grant window open', source: 'Verified energy signals' } },
  { id: 'decorating', label: 'Decorating', signals: 'Planning-approved renovations, tenancy turnaround contracts, commercial premises redecoration tenders — sourced before Bark or MyBuilder lists them', value: '£500 - £20k', example: { title: 'Commercial premises redecoration', area: 'M1 / Manchester', value: '£8,500', urgency: 'Pre-opening deadline', source: 'Official tender record' } },
  { id: 'scaffolding', label: 'Scaffolding', signals: 'Planning-approved extensions, street occupation permits, large commercial refurb contracts — leads land days before scaffold hire companies get the call', value: '£500 - £25k', example: { title: 'Extension scaffold — planning approved', area: 'E5 / London', value: '£3,200', urgency: 'Build start confirmed', source: 'Verified planning approval' } },
  { id: 'fire-safety', label: 'Fire Safety', signals: 'Fire alarm upgrades, suppression system tenders, fire door surveys, commercial building compliance contracts — flagged before Checkatrade or any directory lists the same job', value: '£1k - £80k', example: { title: 'Fire alarm system upgrade — commercial premises', area: 'E1 / London', value: '£12,000', urgency: 'Building regulations compliance deadline', source: 'Official tender record' } },
  { id: 'data-cabling', label: 'Data Cabling', signals: 'Commercial office fit-out tenders, school and NHS structured cabling contracts, business park signups — scanned 3–5 days before Checkatrade or MyBuilder sees them', value: '£2k - £30k', example: { title: 'Cat6A structured cabling — office fit-out', area: 'EC2 / London', value: '£18,500', urgency: 'Tenant move-in date', source: 'Verified tender record' } },
  { id: 'cctv', label: 'CCTV / Security', signals: 'Planning approvals with security conditions, commercial tenancy fit-outs, school and hospital surveillance tenders — detected before any install firm on Bark or MyBuilder gets a call', value: '£1.5k - £40k', example: { title: '24-camera CCTV system — retail park', area: 'B1 / West Midlands', value: '£22,000', urgency: 'Pre-opening deadline', source: 'Official planning condition' } },
  { id: 'groundworkers', label: 'Groundworks', signals: 'Planning-approved new builds, commercial groundworks tenders, highway contractor frameworks — often worth 5x a domestic job, sourced before any firm on Bark sees them', value: '£5k - £200k', example: { title: 'Drainage and groundworks — new residential plot', area: 'LS1 / Leeds', value: '£38,000', urgency: 'Build programme start date', source: 'Verified planning approval' } },
  { id: 'structural', label: 'Structural Engineer', signals: 'Planning-approved extensions and conversions needing structural calcs, commercial building regs tenders, BS7913 survey commissions — flagged before any structural firm gets a cold call', value: '£800 - £25k', example: { title: 'Structural calcs — double extension + loft conversion', area: 'BS4 / Bristol', value: '£4,200', urgency: 'Building regs application deadline', source: 'Verified planning application' } },
  { id: 'quantity-surveyors', label: 'Quantity Surveyor', signals: 'Large residential planning approvals, commercial procurement tenders, public sector framework contracts — scored by commission value and how early in the procurement cycle you engage', value: '£3k - £150k', example: { title: 'Cost plan + tender docs — commercial fit-out', area: 'NG7 / Nottingham', value: '£14,500', urgency: 'Tender close date', source: 'Verified tender record' } },
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
        <p className="mt-5 max-w-2xl text-xl font-bold text-[var(--ink)]">
          Pick your trade. See what gets flagged — before Checkatrade, Bark, or MyBuilder list the same job.
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
          <p className="mt-4 text-xl font-bold text-white/85">{selected.signals}</p>
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
            <div className="flex items-start justify-between gap-4 border-b-2 border-[var(--line)] pb-2 last:border-b-0">
              <span className="font-black text-[var(--muted)]">Buyer</span>
              <div className="flex items-center gap-1 bg-[var(--ink)] px-2 py-0.5">
                <Lock size={11} strokeWidth={3} className="text-[var(--yellow)] shrink-0" />
                <span className="font-black text-[10px] text-[var(--yellow)]">FULL ACCESS</span>
              </div>
            </div>
          </div>
          <p className="mt-3 text-xs font-black text-[var(--muted)]">
            Buyer name + contact unlocked for paid subscribers ·{' '}
            <Link href="/pricing" className="text-[var(--navy)] underline underline-offset-1">see pricing →</Link>
          </p>
        </article>
      </section>

      <section className="jf-box bg-white p-6">
        <p className="micro-label text-[var(--orange)]">WHY {selected.label.toUpperCase()} TRADESMEN USE JOBFILTER</p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {[
            ['First in. Not fifth.', 'You see jobs 3–5 days before they appear on Checkatrade, Bark, or MyBuilder. The first call wins.'],
            ['Proof, not promises.', 'Every signal links to a verified source — planning ref, tender number, or official record. Not a form fill from someone price-shopping.'],
            ['Your patch. Your timing.', 'Gold leads hit your WhatsApp the moment they\'re confirmed. No five-trade blast, no shared auction. One trade per patch — and that\'s you.'],
          ].map(([title, body]) => (
            <article key={title} className="border-2 border-[var(--line)] bg-[var(--bg-main)] p-4">
              <h3 className="headline text-2xl">{title}</h3>
              <p className="mt-2 font-bold text-[var(--muted)]">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_420px] lg:items-center">
        <div className="jf-box bg-[var(--yellow)] p-6">
          <p className="micro-label text-[var(--ink)]">SCAN YOUR PATCH</p>
          <h2 className="headline mt-3 text-5xl leading-none">NO SHARED LEADS. NO FIVE-TRADE BLAST.</h2>
          <p className="mt-3 font-bold text-[var(--ink)]/70">Gold leads are controlled by trade, patch, and timing — no shared auction, no five-trade blast. One {selected.label.toLowerCase()} per patch. That&apos;s you.</p>
          <Link className="jf-button mt-5 bg-[var(--ink)] text-white" href="/find-jobs">
            SCAN {selected.label.toUpperCase()} JOBS NOW →
          </Link>
          <p className="mt-1.5 text-xs font-black text-[var(--ink)]/60 uppercase">No credit card required</p>
          <Link className="jf-button mt-3 bg-white text-[var(--ink)]" href="/pricing">
            LOCK YOUR PATCH — £39/MO →
          </Link>
          <p className="mt-2 text-sm font-black text-[var(--ink)]/80 uppercase">30-DAY MONEY-BACK GUARANTEE — No quibbles.</p>
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
