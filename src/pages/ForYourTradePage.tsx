"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Lock } from 'lucide-react';

import { WaitlistForm } from '../components/WaitlistForm';

const trades = [
  { id: 'electrical', label: 'Electrical', fearHook: 'On Checkatrade, a rewire tender goes to 4 electricians at once. The first to call wins it. JobFilter surfaces public electrical procurement contracts — commercial rewires, landlord compliance frameworks, EV charging tenders — before any directory lists the same job.', signals: 'Rewires, EV charger installs, consumer unit upgrades, landlord EICR compliance — scored before Checkatrade or Bark list them', value: '£800 - £50k', example: { title: 'Consumer unit + rewire - rental compliance', area: 'B14 / West Midlands', value: '£4,500', urgency: 'Tenant move-in deadline', source: 'Verified official signals' } },
  { id: 'plumbing', label: 'Plumbing', fearHook: 'Bark sends a boiler replacement lead to 5 plumbers the moment it lands. The customer picks whoever calls first. By the time you see it, two have already quoted.', signals: 'Boiler replacements, full bathroom refits, commercial maintenance tenders — verified before MyBuilder or Bark see them', value: '£500 - £15k', example: { title: 'Full bathroom refit - budget confirmed', area: 'SW17 / London', value: '£6,200', urgency: 'Start within 2 weeks', source: 'Verified tender record' } },
  { id: 'roofing', label: 'Roofing', fearHook: 'On Checkatrade, a commercial re-roof tender goes to every roofer who logged in that week. Public procurement tenders for flat roof replacements, commercial re-roofs, and social housing roofing contracts close fast — the first firm to respond wins. JobFilter surfaces these tenders before any directory lists the same job.', signals: 'Planning-approved extensions, flat roof replacements, commercial re-roofs from public tenders — no Checkatrade auctions', value: '£2k - £80k', example: { title: 'Commercial flat roof replacement', area: 'M4 / Manchester', value: '£22,000', urgency: 'Pre-winter deadline', source: 'Official public tender' } },
  { id: 'building', label: 'Building', fearHook: 'BuildAlert and Bark list extensions after the homeowner has already had 3 quotes. You are the fourth call. JobFilter surfaces public procurement contracts — commercial refurbs, council maintenance works, social housing extensions — before any directory lists them.', signals: 'Extensions, loft conversions, commercial refurbs — approved planning signals 24–48 hours before they reach Bark or BuildAlert', value: '£15k - £500k', example: { title: 'Double extension - planning approved', area: 'LS6 / Leeds', value: '£45,000', urgency: 'Planning approval expires', source: 'Verified planning approval' } },
  { id: 'hvac', label: 'HVAC', fearHook: 'Heat pump installs and HVAC tenders go to the first firm that proves competence. Checkatrade and MyBuilder both see the job late. You need to be in front before the tender closes.', signals: 'Heat pump installs for low-rated properties, commercial HVAC contracts, air con tenders — flagged before Checkatrade or MyBuilder lists them', value: '£3k - £100k', example: { title: 'Heat pump install - low-rated property', area: 'BS5 / Bristol', value: '£11,500', urgency: 'Landlord compliance deadline', source: 'Verified official signals' } },
  { id: 'landscaping', label: 'Landscaping', fearHook: 'Council grounds contracts and commercial landscaping tenders close fast. Bark credits buy you a shared queue. JobFilter shows you public tenders before the closing date — no credits burned.', signals: 'New build planning approvals, commercial grounds contracts, council tenders — no shared bidding, no Bark credits burned', value: '£1k - £20k', example: { title: 'Commercial grounds contract - council', area: 'OX1 / Oxford', value: '£8,400/year', urgency: 'Contract renewal window', source: 'Official public tender' } },
  { id: 'gas', label: 'Gas Engineer', fearHook: 'CP12 renewals and boiler replacements land on MyBuilder and Bark simultaneously — 5 firms get the same lead. The landlord picks the cheapest first caller. You need the job before it goes to a directory.', signals: 'Boiler replacements, landlord CP12 renewals, social housing maintenance tenders — detected before MyBuilder or Bark list the same job', value: '£800 - £12k', example: { title: 'Boiler replacement - rental compliance', area: 'B12 / West Midlands', value: '£2,400', urgency: 'CP12 expiry — landlord deadline', source: 'Verified official signals' } },
  { id: 'solar', label: 'Solar PV', fearHook: 'Detached homes with high energy demand are the best solar leads. Bark lists them after the homeowner has already Googled 3 installers. JobFilter flags verified planning and public signals before any directory lists the same job.', signals: 'Detached homes with high energy demand, new-build solar obligations, low-carbon retrofit signals — tracked 3–5 days before Bark or MyBuilder lists them', value: '£6k - £25k', example: { title: '4kW solar array — detached home', area: 'SE19 / London', value: '£9,800', urgency: 'Spring install window open', source: 'Verified energy signals' } },
  { id: 'ev-charger', label: 'EV Charger', fearHook: 'Commercial fleet charger tenders and public EV infrastructure contracts go fast. Checkatrade and BuildAlert see them late. JobFilter surfaces public EV charging procurement contracts — fleet chargers, commercial pods, workplace installations — before any directory lists the same job.', signals: 'Garage planning permits with EV conditions, commercial fleet charger tenders, residential pod installs — flagged before Checkatrade or BuildAlert see them', value: '£800 - £15k', example: { title: 'Commercial EV charger pod — 4 bays', area: 'SE1 / London', value: '£4,200', urgency: 'Fleet rollout deadline', source: 'Verified planning condition' } },
  { id: 'heat-pumps', label: 'Heat Pumps', fearHook: 'F/G-rated properties face upgrade deadlines. Bark and Checkatrade list them after the homeowner has three quotes. JobFilter flags verified public signals — boiler upgrade schemes, social housing tenders — before any directory lists them.', signals: 'F/G-rated properties, Boiler Upgrade Scheme signals, social housing decarbonisation tenders — detected before Bark or Checkatrade lists them', value: '£8k - £18k', example: { title: 'Air source heat pump — F-rated terrace', area: 'NG1 / Nottingham', value: '£12,500', urgency: 'BUS grant window open', source: 'Verified energy signals' } },
  { id: 'decorating', label: 'Decorating', fearHook: 'Tenancy turnarounds and commercial redecoration contracts go to whoever responds first. Bark floods the same lead to 5 decorators. JobFilter surfaces public procurement painting and decorating contracts — commercial premises, social housing, tenancy turnaround frameworks — before any directory lists them.', signals: 'Planning-approved renovations, tenancy turnaround contracts, commercial premises redecoration tenders — sourced before Bark or MyBuilder lists them', value: '£500 - £20k', example: { title: 'Commercial premises redecoration', area: 'M1 / Manchester', value: '£8,500', urgency: 'Pre-opening deadline', source: 'Official tender record' } },
  { id: 'scaffolding', label: 'Scaffolding', fearHook: 'Every large project needs scaffold, and the main contractor calls whoever contacted them first. Public procurement tenders for commercial scaffolding and large refurb contracts close fast. JobFilter surfaces these before any directory lists the same job.', signals: 'Planning-approved extensions, street occupation permits, large commercial refurb contracts — leads land days before scaffold hire companies get the call', value: '£500 - £25k', example: { title: 'Extension scaffold — planning approved', area: 'E5 / London', value: '£3,200', urgency: 'Build start confirmed', source: 'Verified planning approval' } },
  { id: 'fire-safety', label: 'Fire Safety', fearHook: 'Commercial fire alarm tenders close in days. Checkatrade and directories see them late or not at all. JobFilter tracks public building regs and compliance tenders — you quote before the tender closes.', signals: 'Fire alarm upgrades, suppression system tenders, fire door surveys, commercial building compliance contracts — flagged before Checkatrade or any directory lists the same job', value: '£1k - £80k', example: { title: 'Fire alarm system upgrade — commercial premises', area: 'E1 / London', value: '£12,000', urgency: 'Building regulations compliance deadline', source: 'Official tender record' } },
  { id: 'data-cabling', label: 'Data Cabling', fearHook: 'Office fit-outs and school cabling contracts are awarded before any directory hears about them. You need to be talking to the main contractor before tender closes. JobFilter surfaces these contracts before any directory lists them.', signals: 'Commercial office fit-out tenders, school and NHS structured cabling contracts, business park signups — flagged before Checkatrade or MyBuilder sees them', value: '£2k - £30k', example: { title: 'Cat6A structured cabling — office fit-out', area: 'EC2 / London', value: '£18,500', urgency: 'Tenant move-in date', source: 'Verified tender record' } },
  { id: 'cctv', label: 'CCTV / Security', fearHook: 'Security system tenders for retail and schools go to whoever is first to spec the job. Bark and MyBuilder see these late. JobFilter tracks planning conditions and commercial tenancies — you call before the site is even occupied.', signals: 'Planning approvals with security conditions, commercial tenancy fit-outs, school and hospital surveillance tenders — detected before any install firm on Bark or MyBuilder gets a call', value: '£1.5k - £40k', example: { title: '24-camera CCTV system — retail park', area: 'B1 / West Midlands', value: '£22,000', urgency: 'Pre-opening deadline', source: 'Official planning condition' } },
  { id: 'groundworkers', label: 'Groundworks', fearHook: 'New plots and commercial sites need groundwork before any other trade. The main contractor calls their usual sub or whoever contacts them first. JobFilter surfaces public groundwork contracts — new residential plots, commercial sites, highway frameworks — before any directory lists them.', signals: 'Planning-approved new builds, commercial groundworks tenders, highway contractor frameworks — often worth 5x a domestic job, sourced before any firm on Bark sees them', value: '£5k - £200k', example: { title: 'Drainage and groundworks — new residential plot', area: 'LS1 / Leeds', value: '£38,000', urgency: 'Build programme start date', source: 'Verified planning approval' } },
  { id: 'structural', label: 'Structural Engineer', fearHook: 'The architect calls whoever they know. Public sector structural engineering tenders and building regs commissions are awarded before most firms even hear about them. JobFilter surfaces these contracts before any directory lists the same job.', signals: 'Planning-approved extensions and conversions needing structural calcs, commercial building regs tenders, BS7913 survey commissions — flagged before any structural firm gets a cold call', value: '£800 - £25k', example: { title: 'Structural calcs — double extension + loft conversion', area: 'BS4 / Bristol', value: '£4,200', urgency: 'Building regs application deadline', source: 'Verified planning application' } },
  { id: 'quantity-surveyors', label: 'Quantity Surveyor', fearHook: 'Commercial procurement tenders close fast. Public sector frameworks are awarded before most QS firms even know they exist. JobFilter tracks procurement notices — you engage before the close date, not after.', signals: 'Large residential planning approvals, commercial procurement tenders, public sector framework contracts — scored by commission value and how early in the procurement cycle you engage', value: '£3k - £150k', example: { title: 'Cost plan + tender docs — commercial fit-out', area: 'NG7 / Nottingham', value: '£14,500', urgency: 'Tender close date', source: 'Verified tender record' } },
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
          <div className="mt-4 border-l-4 border-[var(--yellow)] pl-4">
            <p className="text-sm font-black uppercase text-[var(--yellow)] opacity-80">THE PROBLEM</p>
            <p className="mt-1 text-base font-bold text-white/90">{selected.fearHook}</p>
          </div>
          <p className="mt-5 text-xl font-bold text-white/85">{selected.signals}</p>
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
            ['Gold lands. Noise stays out.', 'Gold leads go straight to your WhatsApp. Bronze signals stay off your phone until your diary has space for them.'],
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
