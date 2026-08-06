"use client";

import Link from 'next/link';
import { type ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import { Check } from 'lucide-react';
import { CheckoutButton } from '../components/CheckoutButton';

const planBullets = [
  'BID, WATCH, SUBCONTRACT or SKIP — before you spend a day pricing',
  'Buyer name, published value, deadline and official submission route in one view',
  'Evidence shown upfront: what fits, what is missing, what to do next',
  'Filtered by your trade, postcode and contract range — not a five-trade blast',
  'Win tracking so your qualification gets sharper over time',
];

const objections = [
  ['How is this different from Checkatrade or Bark?', 'Checkatrade and Bark sell your contact to 4 other trades simultaneously. JobFilter reads the public tender and planning feed — you qualify first, then decide whether to bid. No auction, no shared blast.'],
  ['How is this different from BuildAlert or Planning Pipe?', 'BuildAlert and Planning Pipe surface notices but do not filter by trade fit, value range or submission route. JobFilter gives you a BID/WATCH/SKIP decision with the reasoning shown.'],
  ['Are opportunities exclusive?', 'No. Official tenders are public — other contractors can find and bid for them. You pay for qualification speed and fit-scoring, never for exclusive access to a public notice.'],
  ['Can I check coverage before paying?', 'Yes. Run a free scan with your postcode and trade. Coverage varies by area and timing — an empty result is an honest answer, not a glitch.'],
];

export function PricingPage() {
  const checkoutCancelled = useSearchParams()?.get('cancelled') === '1';

  return (
    <main className="page-shell grid gap-6 py-8 pb-16 text-[var(--ink)]">
      {checkoutCancelled && (
        <section role="status" className="border-4 border-[var(--line)] bg-white p-5 shadow-[4px_4px_0_var(--line)]">
          <p className="micro-label text-[var(--orange)]">CHECKOUT CANCELLED</p>
          <p className="mt-2 font-black text-[var(--ink)]">
            No payment was taken. Your account and saved firm profile are unchanged — you can restart checkout whenever you're ready.
          </p>
          <Link href="/account" className="mt-3 inline-block font-black underline underline-offset-4">
            RETURN TO ACCOUNT →
          </Link>
        </section>
      )}
      <section className="ops-panel bg-[var(--ink)] p-7 text-white">
        <p className="micro-label text-[var(--yellow)]">FOUNDER-ASSISTED PILOT</p>
        <h1 className="headline mt-3 max-w-4xl text-5xl leading-none text-white md:text-7xl">
          STOP PRICING JOBS ALREADY WON BY SOMEONE ELSE.
        </h1>
        <p className="mt-5 max-w-2xl text-xl font-bold text-white/85">
          Checkatrade and Bark blast your contact to 4 other trades. BuildAlert and Planning Pipe don&apos;t filter by trade fit. JobFilter reads the live tender and signals feed — and gives you BID, WATCH, SUBCONTRACT or SKIP before you spend a day pricing.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <CheckoutButton tier="founding" billing="monthly" label="START £39/MO →" className="bg-[var(--yellow)] text-[var(--ink)]" />
          <Link className="jf-button bg-white text-[var(--ink)]" href="/find-jobs">SCAN FREE — NO CARD NEEDED →</Link>
        </div>
        <p className="mt-4 text-sm font-black text-[var(--yellow)]/80">No credit card required for the free scan. Coverage varies by trade and area — check yours before paying.</p>
        <p className="mt-1 text-sm font-black text-white/60">Official tenders are public. You pay for qualification speed, not exclusive access.</p>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <PlanCard
          title="Free Scan"
          price="£0"
          body="Check current public notices before you commit. The official source remains visible and accessible; JobFilter does not sell access to public inventory."
          items={['Current Find a Tender results', 'Basic fit summary', 'Official source links', 'Empty results shown honestly']}
          cta={<Link className="jf-button mt-5 inline-block bg-[var(--ink)] text-white" href="/find-jobs">SCAN FREE — NO CARD NEEDED →</Link>}
          order="order-last lg:order-none"
        />
        <PlanCard
          title="Pilot"
          price="£39/mo"
          priceNote="Paid activation follows coverage and delivery checks."
          body="Firm-aware qualification for public opportunities. Pilot access follows a coverage and fit check; delivery features activate only when the relevant account and provider setup is ready."
          items={planBullets}
          featured
          cta={<CheckoutButton tier="founding" billing="monthly" label="START £39/MO →" className="mt-5 bg-[var(--yellow)] text-[var(--ink)]" />}
          order="order-first lg:order-none"
        />
      </section>

      <section className="jf-box border-4 border-[var(--green)] bg-[var(--green)]/5 p-7">
        <p className="micro-label text-[var(--green)]">COVERAGE BEFORE COMMITMENT</p>
        <h2 className="headline mt-3 text-3xl leading-none text-[var(--green)] sm:text-4xl">CHECK YOUR TRADE AND POSTCODE BEFORE PAYING A PENNY.</h2>
        <p className="mt-3 max-w-2xl text-lg font-bold text-[var(--muted)]">
          Results vary by trade, region and timing. An empty scan is an honest answer. Run the free check — if it shows real matches for your patch, the £39/mo pays for itself on the first job you price accurately.
        </p>
      </section>

      <section className="ops-panel bg-white p-7">
        <p className="micro-label text-[var(--orange)]">HOW ACTIVATION WORKS</p>
        <h2 className="headline mt-3 text-3xl leading-none">SET THE FIRM PROFILE. CHECK THE EVIDENCE. MAKE THE DECISION.</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {[
            ['01', 'Profile', 'Set services, delivery region, contract range and whether you can bid directly or via a subcontract route.'],
            ['02', 'Qualify', 'Compare each public notice with evidence, requirements and the official response route.'],
            ['03', 'Decide', 'Record BID, WATCH, SUBCONTRACT or SKIP. JobFilter does not promise volume or awards.'],
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
        <p className="micro-label text-[var(--orange)]">ILLUSTRATIVE PUBLIC-TENDER FORMATS</p>
        <h2 className="headline mt-3 text-3xl leading-none">SEE WHAT THE QUALIFICATION LAYER EXTRACTS.</h2>
        <p className="mt-3 font-bold text-[var(--muted)] max-w-2xl">
          These are examples of notice formats, not live inventory, awards, or expected returns. Always open the official source before acting.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            { signal: 'Building tender', detail: 'Refurbishment works — stage, buyer and deadline extracted', band: 'Published range', trade: 'Builder' },
            { signal: 'Roofing tender', detail: 'Responsive repairs — delivery area and CPV matched', band: 'Published value', trade: 'Roofer' },
            { signal: 'Electrical tender', detail: 'Estate maintenance — bid or subcontract route reviewed', band: 'Check notice', trade: 'Electrician' },
          ].map(({ signal, detail, band, trade }) => (
            <div key={signal} className="border-2 border-[var(--line)] bg-white p-4">
              <p className="text-[10px] font-black uppercase tracking-wider text-[var(--orange)]">{trade}</p>
              <p className="mt-1 text-base font-black text-[var(--ink)]">{signal}</p>
              <p className="mt-1 text-xs font-black text-[var(--muted)]">{detail}</p>
              <p className="mt-3 font-mono text-xl font-black text-[var(--ink)]">{band}</p>
              <p className="text-[10px] font-black uppercase tracking-wider text-[var(--muted)]">illustrative value field</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs font-black text-[var(--muted)]">Illustrative formats only. Results vary by trade, area and timing; an empty scan is a valid outcome.</p>
      </section>

      <section className="ops-panel bg-white p-7">
        <p className="micro-label text-[var(--orange)]">STRAIGHT ANSWERS</p>
        <h2 className="headline mt-3 text-4xl leading-none md:text-5xl">CLEAR SOURCE. CLEAR FIT. CLEAR NEXT ACTION.</h2>
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
        <p className="micro-label text-[var(--ink)]">READY TO STOP GUESSING?</p>
        <h2 className="headline mt-3 text-4xl leading-none md:text-6xl">SCAN YOUR PATCH. SEE WHAT FITS. THEN PAY.</h2>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <CheckoutButton tier="founding" billing="monthly" label="START £39/MO →" className="bg-[var(--ink)] text-white" />
          <Link className="jf-button bg-white text-[var(--ink)]" href="/find-jobs">SCAN FREE — NO CARD NEEDED →</Link>
        </div>
        <p className="mt-4 text-sm font-black text-[var(--ink)]/70">No credit card required to scan. Official tenders are public — you pay for qualification and fit-scoring, not access.</p>
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
      <p className="micro-label text-[var(--orange)]">{featured ? 'PILOT SUBSCRIPTION' : title}</p>
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
