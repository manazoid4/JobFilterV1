"use client";

import Link from 'next/link';
import type { ReactNode } from 'react';
import { Check } from 'lucide-react';
import { CheckoutButton } from '../components/CheckoutButton';
import { content as addOnContent } from './ProductAdvantagePage';

const planBullets = [
  'Gold leads to your WhatsApp — scored and delivered within minutes of detection',
  'Buyer context before you call — job type, value band, and best contact route',
  'Job value band before you quote — know if it\'s worth your time',
  'One trade per postcode patch — no shared auction, no five-trade blast',
  'Win tracker — log wins, track ROI, see what\'s converting in your area',
];

const objections = [
  ['Is this another job board?', 'No. Checkatrade, MyBuilder, Bark, and BuildAlert sell the same lead to 5 trades at once. JobFilter reads planning approvals, council tenders, and energy data — then routes signals to you, not a field of bidders fighting on price.'],
  ['Are leads shared?', 'No. Paid members get priority routing by trade and patch. No auction, no five-trade race, no Bark-style credit burn. One trade per patch gets first call.'],
  ['What happens after I pay?', 'Create your account, confirm your email, enter your WhatsApp number, trade, and postcode. We check source coverage for your patch, then activate. Usually same day.'],
  ['Can I scan before paying?', 'Yes — 3 free scans, no card required. You will see real scored leads in your area. Upgrade unlocks full buyer context, job value band, contact route, and WhatsApp delivery.'],
];

export function PricingPage() {
  return (
    <main className="page-shell grid gap-6 py-8 pb-16 text-[var(--ink)]">
      <section className="ops-panel bg-[var(--ink)] p-7 text-white">
        <p className="micro-label text-[var(--yellow)]">FOUNDER PRICING</p>
        <h1 className="headline mt-3 max-w-4xl text-5xl leading-none text-white md:text-7xl">
          GET SCORED CONSTRUCTION LEADS IN YOUR PATCH FOR £39/MO.
        </h1>
        <p className="mt-5 max-w-2xl text-xl font-bold text-white/85">
          Planning approvals, council tenders, and energy signals — not recycled from Checkatrade or Bark. Scored by value, trade fit, and distance. Hits your WhatsApp before anyone else calls.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <CheckoutButton tier="founding" billing="monthly" label="START £39/MO →" className="bg-[var(--yellow)] text-[var(--ink)]" />
          <Link className="jf-button bg-white text-[var(--ink)]" href="/find-jobs">SCAN FREE FIRST →</Link>
        </div>
        <p className="mt-4 text-sm font-black text-[var(--yellow)]/80">Average UK trade job: £800–£3,000. One job covers 3 months at founder price.</p>
        <p className="mt-1 text-sm font-black text-white/60">No credit card required to scan — 3 free scans every week.</p>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <PlanCard
          title="Free Scan"
          price="£0"
          body="See real scored leads in your area before you pay. 3 free scans — no card, no catch."
          items={['Preview scored leads', 'Lead score visible — buyer context locked', 'No WhatsApp routing', 'No territory priority']}
          cta={<Link className="jf-button mt-5 inline-block bg-[var(--ink)] text-white" href="/find-jobs">SCAN FREE — NO CARD NEEDED →</Link>}
          order="order-last lg:order-none"
        />
        <PlanCard
          title="Founder"
          price="£39/mo"
          priceNote="Standard rate when window closes: £79/mo — you save £40/mo"
          body="Real jobs — not recycled from job boards. First look at work before it's advertised, with full buyer context and WhatsApp delivery."
          items={planBullets}
          featured
          cta={<CheckoutButton tier="founding" billing="monthly" label="LOCK FOUNDER PRICE →" className="mt-5 bg-[var(--yellow)] text-[var(--ink)]" />}
          order="order-first lg:order-none"
        />
      </section>

      <section className="jf-box border-4 border-[var(--line)] bg-[var(--paper)] p-7">
        <p className="micro-label text-[var(--orange)]">MEMBER RESULT</p>
        <blockquote className="mt-3 max-w-2xl text-xl font-black leading-snug text-[var(--ink)]">
          &ldquo;Scanned B14 on a Tuesday morning. Planning signal came through for a rear extension — 4-bed, no contractor listed. Called the owner Wednesday. She hadn&apos;t heard from anyone else. Quoted £5,800, won it Friday.&rdquo;
        </blockquote>
        <p className="mt-3 text-sm font-black text-[var(--muted)]">— Dave R., Builder · Birmingham B14 · 72 hours from signal to win</p>
      </section>

      <section className="jf-box border-4 border-[var(--green)] bg-[var(--green)]/5 p-7">
        <p className="micro-label text-[var(--green)]">30-DAY MONEY-BACK GUARANTEE</p>
        <h2 className="headline mt-3 text-3xl leading-none text-[var(--green)] sm:text-4xl">ONE JOB WORTH PRICING OR YOUR £39 BACK.</h2>
        <p className="mt-3 max-w-2xl text-lg font-black text-[var(--muted)]">
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
        <p className="mt-3 font-black text-[var(--muted)] max-w-2xl">
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
              <p className="mt-2 font-black text-[var(--muted)]">{a}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="ops-panel bg-white p-7">
        <p className="micro-label text-[var(--orange)]">ADD-ON SERVICES — QUOTED PER JOB</p>
        <h2 className="headline mt-3 text-3xl leading-none md:text-4xl">DONE-FOR-YOU PAPERWORK. NO FIXED SUBSCRIPTION.</h2>
        <p className="mt-3 max-w-2xl font-black text-[var(--muted)]">
          Bid packs, compliance documents, grant paperwork, and other done-for-you trade admin — each priced per job, not bundled into a subscription. Submit your job details and the team quotes you back within 6 hours, usually faster.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {Object.entries(addOnContent).map(([slug, service]) => (
            <Link
              key={slug}
              href={`/${slug}`}
              className="border-2 border-[var(--line)] bg-[var(--bg-main)] px-3 py-2 text-sm font-black text-[var(--ink)] hover:bg-[var(--yellow)]"
            >
              {service.title}
            </Link>
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
      <p className="micro-label text-[var(--orange)]">{featured ? 'FOUNDING PRICE' : title}</p>
      <h2 className="headline mt-3 text-5xl">{price}</h2>
      {priceNote && <p className="mt-1 text-sm font-black text-[var(--green)]">{priceNote}</p>}
      <p className="mt-3 font-black text-[var(--muted)]">{body}</p>
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
