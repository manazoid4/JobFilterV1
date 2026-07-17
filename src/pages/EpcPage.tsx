"use client";
import Link from 'next/link';

import { WaitlistForm } from '../components/WaitlistForm';

const ratings = [
  ['A-C', 'Fine', 'Usually compliant. Lower urgency.'],
  ['D-E', 'Borderline', 'Improvement likely, but not always forced yet.'],
  ['F-G', 'Illegal to rent without exemption', 'Landlord must retrofit or lose the tenancy. High-probability work trigger.'],
];

const trades = [
  ['Electricians', 'EICR remedials, rewires, EV chargers, solar-ready upgrades.'],
  ['Plumbers', 'Boiler replacements, heating controls, cylinder upgrades.'],
  ['HVAC', 'Heat pumps, ventilation, commercial efficiency upgrades.'],
  ['Builders', 'Insulation, wall upgrades, retrofit enabling works.'],
  ['Roofers', 'Roof insulation, solar prep, weatherproofing tied to upgrades.'],
];

export function EpcPage() {
  return (
    <main className="page-shell grid gap-6 py-8 pb-8">
      <section className="jf-box bg-[var(--navy)] p-7 text-white">
        <p className="micro-label text-[var(--yellow)]">RETROFIT LEADS</p>
        <h1 className="headline mt-4 max-w-5xl text-5xl leading-none text-[var(--yellow)] md:text-7xl">
          ENERGY UPGRADES — FLAGGED BEFORE ANYONE KNOCKS.
        </h1>
        <p className="mt-5 max-w-2xl text-xl font-bold text-white/85">
          Properties rated F and G cannot be legally rented without retrofit work. Landlords must fix them — or stop renting. JobFilter identifies these addresses and alerts you before they post anywhere. No Checkatrade. No five-trade blast. Just you and the job.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {ratings.map(([grade, title, body]) => (
          <article key={grade} className="jf-box bg-white p-5">
            <p className="micro-label text-[var(--orange)]">{grade}</p>
            <h2 className="headline mt-3 text-4xl">{title}</h2>
            <p className="mt-3 font-bold text-[var(--muted)]">{body}</p>
          </article>
        ))}
      </section>

      <section className="jf-box bg-white p-6">
        <p className="micro-label text-[var(--orange)]">TRADES THAT BENEFIT</p>
        <div className="mt-5 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-5">
          {trades.map(([title, body]) => (
            <article key={title} className="border-2 border-[var(--line)] bg-[var(--bg-main)] p-4">
              <h2 className="headline text-2xl">{title}</h2>
              <p className="mt-2 font-bold text-[var(--muted)]">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="jf-box bg-[var(--yellow)] p-6">
        <p className="micro-label text-[var(--ink)]">LETTER TEMPLATE</p>
        <h2 className="headline mt-3 text-5xl leading-none">PRINT &amp; POST TEMPLATE.</h2>
        <p className="mt-5 max-w-3xl text-xl font-bold text-[var(--ink)]">
          Most trades only send WhatsApp. A physical letter to an F/G rated landlord stands out — and costs 85p. Use our ready-to-print template: fill in your details, print it, post it. You control the timing.
        </p>
        <div className="mt-6 grid gap-3 md:grid-cols-4">
          {['Ready to print — no design needed', 'Post it yourself — you control timing', 'Your trade, details, and credentials pre-filled', 'PDF version for digital follow-up'].map((feature) => (
            <div key={feature} className="border-2 border-[var(--ink)] bg-white p-3 font-black">
              {feature}
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Link className="jf-button bg-[var(--ink)] text-white" href="/pricing">GET MEMBERSHIP + LETTER TEMPLATE — £39/MO →</Link>
          <p className="mt-2 text-sm font-bold text-[var(--ink)]">Or <a className="underline" href="/find-jobs">scan your area free</a> to see retrofit leads first.</p>
        </div>
      </section>

      <section className="jf-box bg-white p-6">
        <p className="micro-label text-[var(--orange)]">TARGETED ADS</p>
        <h2 className="headline mt-3 text-5xl leading-none">VICINITY: HYPER-LOCAL RETROFIT ADS.</h2>
        <p className="mt-5 max-w-3xl text-xl font-bold text-[var(--muted)]">
          Run targeted ads to every F/G rated property owner in your postcode. Vicinity handles the design and placement - you take the calls.
        </p>
        <Link className="jf-button mt-6 bg-[var(--yellow)] text-[var(--ink)]" href="/vicinity">OPEN VICINITY →</Link>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_420px] lg:items-center">
        <div className="jf-box bg-[var(--navy)] p-6 text-white">
          <p className="micro-label text-[var(--yellow)]">GET RETROFIT ALERTS</p>
          <h2 className="headline mt-3 text-5xl leading-none text-[var(--yellow)]">FIND THE RETROFIT WORK FIRST.</h2>
          <p className="mt-4 max-w-xl text-lg font-bold text-white/90">
            Join the retrofit lead list. Gold retrofit signals go straight to WhatsApp — included with £39/mo membership.
          </p>
          <Link className="jf-button mt-6 inline-block bg-[var(--yellow)] text-[var(--ink)]" href="/find-jobs">SCAN MY AREA FREE →</Link>
          <p className="mt-2 text-sm font-black text-white/60">No credit card required — 3 free scans every week</p>
        </div>
        <WaitlistForm source="epc-leads" />
      </section>
    </main>
  );
}
