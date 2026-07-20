"use client";

import Link from 'next/link';
import { useEffect, useState, type ReactNode } from 'react';
import { Check } from 'lucide-react';
import { CheckoutButton } from '../components/CheckoutButton';

const planBullets = [
  'Gold-ranked opportunities — strongest verified evidence first',
  'Buyer details and best contact route before you call — no shared auction, no five-trade blast',
  'Job value band before you quote — know if it\'s worth your time',
  'Patch-first setup — your trade and postcode define which leads you see',
  'Win tracker — log wins, track ROI, see what\'s converting in your area',
];

const objections = [
  ['Is this another job board?', 'No. JobFilter scans official UK planning applications, contracts, and energy data for your trade and patch. You do not buy credits to bid against a queue of trades the way Checkatrade and Bark do.'],
  ['Are leads shared?', 'No. Checkatrade, MyBuilder, and Bark sell the same enquiry to five trades. JobFilter does not — we check signal coverage and trade conflicts before activating your patch.'],
  ['What happens after I pay?', 'Create your account, confirm your email, enter your trade and postcode. We check your area has live signal coverage — then your patch activates. Takes minutes, not days.'],
  ['Can I scan before paying?', 'Yes — 3 free scans every week, no card required. You see real scored leads in your area. Upgrade unlocks buyer details, best contact route, job value band, and WhatsApp delivery.'],
];

export function PricingPage() {
  const [foundingSlots, setFoundingSlots] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/waitlist/count')
      .then(r => r.json())
      .then(data => setFoundingSlots(data.remaining ?? null))
      .catch(() => {});
  }, []);

  return (
    <main className="page-shell grid gap-6 py-8 pb-16 text-[var(--ink)]">
      <section className="ops-panel bg-[var(--ink)] p-7 text-white">
        <p className="micro-label text-[var(--yellow)]">FOUNDER PRICING</p>
        {foundingSlots !== null && foundingSlots <= 30 && (
          <div className="mt-3 flex w-fit items-center gap-2 border-2 border-[var(--yellow)]/40 bg-[var(--yellow)]/10 px-3 py-1.5">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--yellow)]" />
            <span className="font-mono text-sm font-black text-[var(--yellow)]">{foundingSlots} founder slots left at £39/mo</span>
          </div>
        )}
        <h1 className="headline mt-3 max-w-4xl text-5xl leading-none text-white md:text-7xl">
          GET SCORED CONSTRUCTION LEADS IN YOUR PATCH FOR £39/MO.
        </h1>
        <p className="mt-5 max-w-2xl text-xl font-bold text-white/85">
          Official UK opportunities filtered by evidence, trade fit, location, freshness, and value confidence. Coverage varies by trade and patch, so we check it before paid activation.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <CheckoutButton tier="founding" billing="monthly" label="START £39/MO →" className="bg-[var(--yellow)] text-[var(--ink)]" />
          <Link className="jf-button bg-white text-[var(--ink)]" href="/find-jobs">SCAN FREE FIRST →</Link>
        </div>
        <p className="mt-4 text-sm font-black text-[var(--yellow)]/80">Average UK trade job: £800–£3,000. One job covers 12+ months at £39.</p>
        <p className="mt-1 text-sm font-black text-white/60">No credit card required to scan — 3 free scans every week.</p>
        <p className="mt-1 text-sm font-black text-[var(--yellow)]/80">30-day money-back guarantee — one job worth chasing or we refund every penny.</p>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <PlanCard
          title="Free Scan"
          price="£0"
          body="Scan your patch before you commit. Lead titles, source, and score are free — buyer name and contact route unlock with membership. No card needed. Resets every week."
          items={['Preview scored leads', 'Lead score visible — buyer context locked', 'No WhatsApp routing', 'No territory priority']}
          cta={<Link className="jf-button mt-5 inline-block bg-[var(--ink)] text-white" href="/find-jobs">SCAN FREE — NO CARD NEEDED →</Link>}
          order="order-last lg:order-none"
        />
        <PlanCard
          title="Founder"
          price="£39/mo"
          priceNote="Standard rate when window closes: £79/mo — you save £40/mo"
          body="Verified opportunities — not invented fallback jobs. Full context and delivery features activate only after account, patch, and provider checks pass."
          items={planBullets}
          featured
          cta={<CheckoutButton tier="founding" billing="monthly" label="LOCK FOUNDER PRICE →" className="mt-5 bg-[var(--yellow)] text-[var(--ink)]" />}
          order="order-first lg:order-none"
        />
      </section>

      <section className="jf-box border-4 border-[var(--green)] bg-[var(--green)]/5 p-7">
        <p className="micro-label text-[var(--green)]">30-DAY MONEY-BACK GUARANTEE</p>
        <h2 className="headline mt-3 text-3xl leading-none text-[var(--green)] sm:text-4xl">ONE JOB WORTH PRICING OR YOUR £39 BACK.</h2>
        <p className="mt-3 max-w-2xl text-lg font-bold text-[var(--muted)]">
          Set up your patch, run your scans, check at least 10 scored leads. If you don&apos;t see one job worth quoting in 30 days, we refund every penny. No forms — just email us.
        </p>
      </section>

      <section className="ops-panel bg-white p-7">
        <p className="micro-label text-[var(--orange)]">HOW ACTIVATION WORKS</p>
        <h2 className="headline mt-3 text-3xl leading-none">NO FAKE "AVAILABLE" BADGE. WE CHECK THE PATCH.</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {[
            ['01', 'Check', 'Send trade, postcode and WhatsApp. We check source coverage and obvious conflicts.'],
            ['02', 'Activate', 'Start founder billing only when your account and patch setup are ready.'],
            ['03', 'Deliver', 'Gold signals route to WhatsApp with score, value band and proof context.'],
          ].map(([step, title, body]) => (
            <article key={step} className="border-2 border-[var(--line)] bg-[var(--paper)] p-4">
              <p className="font-mono text-sm font-black text-[var(--orange)]">{step}</p>
              <h3 className="headline mt-2 text-xl">{title}</h3>
              <p className="mt-2 text-sm font-black text-[var(--muted)]">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="ops-panel bg-[var(--bg-main)] p-7 border-4 border-[var(--line)]">
        <p className="micro-label text-[var(--orange)]">WHAT ONE MONTH LOOKS LIKE</p>
        <h2 className="headline mt-3 text-3xl leading-none">ONE JOB COVERS IT. THAT&apos;S THE MATHS.</h2>
        <p className="mt-3 font-bold text-[var(--muted)] max-w-2xl">
          One qualified lead that converts pays for 2–8 months at founder price. These are the types of signals that land.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            { signal: 'Planning approved', detail: 'Rear extension, B12 postcode — roofing + groundworks', band: '£4,200–£6,800', trade: 'Builder' },
            { signal: 'Energy: Low-rated cluster', detail: 'Rental terrace block, 6 units — full insulation retrofit', band: '£8,000–£14,000', trade: 'Insulation' },
            { signal: 'Council tender live', detail: 'School electrical maintenance, 12-month contract', band: '£18,000–£28,000', trade: 'Electrician' },
          ].map(({ signal, detail, band, trade }) => (
            <div key={signal} className="border-2 border-[var(--line)] bg-white p-4">
              <p className="text-[10px] font-black uppercase tracking-wider text-[var(--orange)]">{trade}</p>
              <p className="mt-1 text-base font-black text-[var(--ink)]">{signal}</p>
              <p className="mt-1 text-xs font-black text-[var(--muted)]">{detail}</p>
              <p className="mt-3 font-mono text-xl font-black text-[var(--ink)]">{band}</p>
              <p className="text-[10px] font-black uppercase tracking-wider text-[var(--muted)]">estimated job value</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs font-black text-[var(--muted)]">Examples of signal types seen across UK patches. Results vary by trade, area, and timing — which is why we offer a 30-day money-back guarantee.</p>
      </section>

      <section className="ops-panel bg-white p-7">
        <p className="micro-label text-[var(--orange)]">STRAIGHT ANSWERS</p>
        <h2 className="headline mt-3 text-4xl leading-none md:text-5xl">NO AUCTION. NO CREDIT BURN. NO FLUFF.</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {objections.map(([q, a]) => (
            <article key={q} className="border-2 border-[var(--line)] bg-[var(--paper)] p-5">
              <h3 className="headline text-xl">{q}</h3>
              <p className="mt-2 font-bold text-[var(--muted)]">{a}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="ops-panel bg-[var(--yellow)] p-7 text-[var(--ink)]">
        <p className="micro-label text-[var(--ink)]">LOCK YOUR PATCH</p>
        <h2 className="headline mt-3 text-4xl leading-none md:text-6xl">CLAIM YOUR PATCH. OWN THE JOBS.</h2>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <CheckoutButton tier="founding" billing="monthly" label="START £39/MO →" className="bg-[var(--ink)] text-white" />
          <Link className="jf-button bg-white text-[var(--ink)]" href="/find-jobs">SCAN FREE FIRST →</Link>
        </div>
        <p className="mt-4 text-sm font-black text-[var(--ink)]/70">30-day money-back guarantee. No contract. Cancel anytime.</p>
        <p className="mt-1 text-sm font-black text-[var(--ink)]/60">No credit card required to scan — 3 free scans every week.</p>
      </section>
    </main>
  );
}

function PlanCard({ title, price, priceNote, body, items, cta, featured = false, order = '' }: {
  title: string;
  price: string;
  priceNote?: string;
  body: string;
  items: string[];
  cta: ReactNode;
  featured?: boolean;
  order?: string;
}) {
  const wrapClass = featured
    ? 'bg-white text-[var(--ink)] border-4 border-[var(--yellow)] lg:border-[var(--ink)] shadow-[6px_6px_0_var(--yellow)]'
    : 'bg-[var(--paper)] text-[var(--ink)]';

  return (
    <section className={`ops-panel p-6 ${wrapClass} ${order}`}>
      <p className="micro-label text-[var(--orange)]">{featured ? 'FOUNDER PRICE' : title}</p>
      <h2 className="headline mt-3 text-5xl">{price}</h2>
      {priceNote && <p className="mt-1 text-sm font-black text-[var(--green)]">{priceNote}</p>}
      <p className="mt-3 font-bold text-[var(--muted)]">{body}</p>
      <ul className="mt-5 grid gap-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 font-black text-[var(--ink)]">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--green)]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {cta}
    </section>
  );
}
