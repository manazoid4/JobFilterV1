"use client";

import Link from 'next/link';
import type { ReactNode } from 'react';
import { Check } from 'lucide-react';
import { CheckoutButton } from '../components/CheckoutButton';

const planBullets = [
  'WhatsApp Gold leads',
  'Buyer/contact signals',
  'Quote floor + next action',
  'Territory priority',
  'Win tracking',
];

const objections = [
  ['Is this another job board?', 'No. JobFilter watches planning, tender, EPC and company signals, then filters out noise before it reaches you.'],
  ['Are leads shared?', 'Paid users get priority routing by trade and patch. No auction, no five-trade race.'],
  ['What happens after I pay?', 'Create your account, confirm your email, enter WhatsApp/trade/postcode, then your patch is activated.'],
  ['Can I scan before paying?', 'Yes. Free scans show signal quality. Paid unlocks full buyer context and WhatsApp delivery.'],
];

export function PricingPage() {
  return (
    <main className="page-shell grid gap-6 py-8 pb-16 text-[var(--ink)]">
      <section className="ops-panel bg-[var(--ink)] p-7 text-white">
        <p className="micro-label text-[var(--yellow)]">FOUNDER PRICING</p>
        <h1 className="headline mt-3 max-w-4xl text-5xl leading-none text-white md:text-7xl">
          GET SCORED CONSTRUCTION LEADS IN YOUR PATCH FOR £39/MO.
        </h1>
        <p className="mt-5 max-w-2xl text-xl font-black text-white/80">
          Real lead signals. Filtered by urgency, value, source confidence and postcode fit. Sent to WhatsApp when they are worth chasing.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <CheckoutButton tier="founding" billing="monthly" label="START £39/MO" className="bg-[var(--yellow)] text-[var(--ink)]" />
          <Link className="jf-button bg-white text-[var(--ink)]" href="/find-jobs">SCAN FREE FIRST</Link>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <PlanCard
          title="Free Scan"
          price="£0"
          body="Check whether your patch has live signals before you pay."
          items={['Preview scored leads', 'Limited lead detail', 'No WhatsApp routing', 'No territory priority']}
          cta={<Link className="jf-button mt-5 inline-block bg-[var(--ink)] text-white" href="/find-jobs">SCAN MY POSTCODE</Link>}
        />
        <PlanCard
          title="Founder"
          price="£39/mo"
          body="Best launch plan. Built for trades who want first look at serious work without chasing weak enquiries."
          items={planBullets}
          featured
          cta={<CheckoutButton tier="founding" billing="monthly" label="LOCK FOUNDER PRICE" className="mt-5 bg-[var(--ink)] text-white" />}
        />
        <PlanCard
          title="Standard"
          price="£79/mo"
          body="Full paid access after the founder window closes."
          items={planBullets}
          dark
          cta={<CheckoutButton tier="pro" billing="monthly" label="START STANDARD" className="mt-5 bg-white text-[var(--ink)]" />}
        />
      </section>

      <section className="jf-box border-4 border-[var(--green)] bg-[var(--green)]/5 p-7">
        <p className="micro-label text-[var(--green)]">30-DAY MONEY-BACK GUARANTEE</p>
        <h2 className="headline mt-3 text-3xl leading-none text-[var(--green)] sm:text-4xl">ONE USEFUL JOB SIGNAL OR YOUR MONEY BACK.</h2>
        <p className="mt-3 max-w-2xl text-lg font-black text-[var(--muted)]">
          Use JobFilter for 30 days. If you do not see one job worth chasing after setting up your patch, we refund you.
        </p>
      </section>

      <section className="ops-panel bg-white p-7">
        <p className="micro-label text-[var(--orange)]">STRAIGHT ANSWERS</p>
        <h2 className="headline mt-3 text-4xl leading-none md:text-5xl">NO AUCTION. NO CREDIT BURN. NO FLUFF.</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {objections.map(([q, a]) => (
            <article key={q} className="border-2 border-[var(--line)] bg-[var(--paper)] p-5">
              <h3 className="headline text-xl">{q}</h3>
              <p className="mt-2 font-black text-[var(--muted)]">{a}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="ops-panel bg-[var(--yellow)] p-7 text-[var(--ink)]">
        <p className="micro-label text-[var(--ink)]">READY</p>
        <h2 className="headline mt-3 text-4xl leading-none md:text-6xl">LOCK THE ACCOUNT. THEN CONTROL THE JOBS.</h2>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <CheckoutButton tier="founding" billing="monthly" label="START £39/MO" className="bg-[var(--ink)] text-white" />
          <Link className="jf-button bg-white text-[var(--ink)]" href="/find-jobs">SCAN FREE</Link>
        </div>
      </section>
    </main>
  );
}

function PlanCard({ title, price, body, items, cta, dark = false, featured = false }: {
  title: string;
  price: string;
  body: string;
  items: string[];
  cta: ReactNode;
  dark?: boolean;
  featured?: boolean;
}) {
  const wrapClass = dark
    ? 'bg-[var(--ink)] text-white'
    : featured
      ? 'bg-white text-[var(--ink)] border-4 border-[var(--ink)] shadow-[6px_6px_0_var(--yellow)]'
      : 'bg-[var(--paper)] text-[var(--ink)]';

  return (
    <section className={`ops-panel p-6 ${wrapClass}`}>
      {featured && <p className="micro-label text-[var(--orange)]">BEST VALUE</p>}
      <p className={`micro-label ${dark ? 'text-[var(--yellow)]' : 'text-[var(--orange)]'}`}>{title}</p>
      <h2 className={`headline mt-3 text-5xl ${dark ? 'text-white' : ''}`}>{price}</h2>
      <p className={`mt-3 font-black ${dark ? 'text-white/85' : 'text-[var(--muted)]'}`}>{body}</p>
      <ul className="mt-5 grid gap-2">
        {items.map((item) => (
          <li key={item} className={`flex gap-2 font-black ${dark ? 'text-white' : 'text-[var(--ink)]'}`}>
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--green)]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {cta}
    </section>
  );
}
