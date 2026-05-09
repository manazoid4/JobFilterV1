import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { CheckoutButton } from '../components/CheckoutButton';
import { WaitlistForm } from '../components/WaitlistForm';
import { FeedbackPrompt } from '../components/FeedbackPrompt';

const plans = {
  founderMonthly: 39,
  founderAnnual: 390,
  standardMonthly: 79,
  standardAnnual: 790,
};

const included = [
  'Gold lead alerts sent to WhatsApp',
  'Lead score, urgency, value, trade fit and next action',
  'PatchLock priority for your trade and postcode cluster',
  'Company-branded letters written for selected leads',
  'PDF approach pack for WhatsApp follow-up',
  'Saved pipeline and weekly opportunity digest',
];

const addOns = [
  ['Hotlist', 'Only urgent, high-value jobs wake you up.', '£9/mo'],
  ['Buyer Pack Plus', 'Extra printed approach packs for bigger jobs.', '£5/lead'],
  ['Vantage Fast Pack', 'Bid angle, proof points and scope pack within 6 hours.', '£49 each'],
  ['Neighbour Signal', 'Turn one job into nearby door-drop demand.', 'from £99'],
];

export function PricingPage() {
  return (
    <main className="page-shell grid gap-6 py-8 pb-16 text-[var(--ink)]">
      <section className="ops-panel bg-[var(--ink)] p-7 text-white">
        <p className="micro-label text-[var(--yellow)]">PRICING</p>
        <h1 className="headline mt-3 max-w-4xl text-5xl leading-none text-white md:text-8xl">
          STANDARD PRICE IS £79/MO. FOUNDERS PAY £39/MO.
        </h1>
        <p className="mt-5 max-w-3xl text-xl font-black text-white/78">
          We find the opportunity, score it, send it to WhatsApp, and write a company-branded letter for the best leads. You are not buying software. You are buying first contact with better jobs.
        </p>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <PriceStat label="Founder monthly" value="£39/mo" note="about a tenner a week" hot />
          <PriceStat label="Standard monthly" value="£79/mo" note="after founder slots" />
          <PriceStat label="Founder annual" value="£390/yr" note="two months free" hot />
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <CheckoutButton tier="founding" billing="monthly" label="LOCK FOUNDER £39/MO" className="bg-[var(--yellow)] text-[var(--ink)]" />
          <CheckoutButton tier="founding" billing="annual" label="SAVE MORE — £390/YR" className="bg-white text-[var(--ink)]" />
          <Link className="jf-button bg-[var(--steel-2)] text-white" to="/find-jobs">SCAN FIRST</Link>
        </div>
      </section>

      <FeedbackPrompt />

      <section className="grid gap-4 lg:grid-cols-3">
        <PlanCard
          title="Free Scan"
          price="£0"
          body="Check if your patch has work signals before you pay."
          items={['Preview signals', 'Score band only', 'Limited detail', 'No WhatsApp alerts', 'No letters']}
          cta={<Link className="jf-button mt-5 bg-[var(--ink)] text-white" to="/find-jobs">SCAN MY AREA</Link>}
        />
        <PlanCard
          title="Founder"
          price="£39/mo"
          body="Cheaper founder price. Same working system. Locked while you stay active."
          items={included}
          highlight="BEST VALUE"
          cta={<CheckoutButton tier="founding" billing="monthly" label="LOCK £39/MO" className="mt-5 bg-[var(--ink)] text-white" />}
        />
        <PlanCard
          title="Standard"
          price="£79/mo"
          body="The normal price after founder slots are gone."
          items={included}
          dark
          cta={<CheckoutButton tier="pro" billing="monthly" label="JOIN STANDARD" className="mt-5 bg-white text-[var(--ink)]" />}
        />
      </section>

      <section className="ops-panel bg-[var(--paper)] p-7">
        <p className="micro-label text-[var(--orange)]">THE LETTER ADVANTAGE</p>
        <h2 className="headline mt-3 text-4xl leading-none md:text-6xl">WE DO NOT JUST SEND YOU A LEAD. WE HELP YOU APPROACH IT PROPERLY.</h2>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {[
            ['Written for the job', 'We turn the signal into a plain-English approach letter with the likely work, timing and reason to speak now.'],
            ['Branded as your firm', 'Your company name, trade, patch, phone and proof points go on the letter, not JobFilter branding.'],
            ['Included monthly', 'Selected Gold leads get letter copy and a WhatsApp-ready PDF included in the monthly price. Extra print/post packs are paid add-ons.'],
          ].map(([title, body]) => (
            <article key={title} className="border-2 border-[var(--line)] bg-[var(--paper)] p-5 shadow-[4px_4px_0_var(--line)]">
              <h3 className="headline text-2xl">{title}</h3>
              <p className="mt-2 font-black text-[var(--muted)]">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="ops-panel bg-[var(--paper)] p-7">
        <p className="micro-label text-[var(--orange)]">ANNUAL DISCOUNTS</p>
        <h2 className="headline mt-3 text-4xl leading-none md:text-5xl">PAY YEARLY IF YOU WANT THE CHEAPEST PATCH.</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="border-2 border-[var(--line)] bg-white p-5">
            <h3 className="headline text-3xl">Founder Annual</h3>
            <p className="headline mt-2 text-5xl text-[var(--ink)]">£390/yr</p>
            <p className="mt-2 font-black text-[var(--muted)]">Saves £78/year vs founder monthly. Effective £32.50/month.</p>
          </div>
          <div className="border-2 border-[var(--line)] bg-white p-5">
            <h3 className="headline text-3xl">Standard Annual</h3>
            <p className="headline mt-2 text-5xl text-[var(--ink)]">£790/yr</p>
            <p className="mt-2 font-black text-[var(--muted)]">Saves £158/year vs standard monthly. Effective £65.83/month.</p>
          </div>
        </div>
      </section>

      <section className="ops-panel bg-[var(--ink)] p-7 text-white">
        <p className="micro-label text-[var(--yellow)]">EXTRA REVENUE TOOLS</p>
        <h2 className="headline mt-3 text-4xl leading-none text-[var(--yellow)] md:text-5xl">UPSELLS THAT ACTUALLY HELP TRADES WIN WORK.</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {addOns.map(([name, body, price]) => (
            <article key={name} className="border-2 border-white/20 bg-white/8 p-5">
              <h3 className="headline text-2xl text-[var(--yellow)]">{name}</h3>
              <p className="mt-2 font-black text-white/72">{body}</p>
              <p className="mt-4 border-2 border-[var(--yellow)] px-3 py-2 text-center font-black text-[var(--yellow)]">{price}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_420px]">
        <div className="ops-panel bg-[var(--steel)] p-6 text-white">
          <p className="micro-label text-[var(--yellow)]">PATCHLOCK</p>
          <h2 className="headline mt-3 text-5xl leading-none">Claim first look in your trade area.</h2>
          <p className="mt-4 text-lg font-black text-white/72">
            PatchLock is not an advert slot. It is priority routing for scored jobs in one trade and postcode cluster. If your patch is valuable, do not leave it open.
          </p>
        </div>
        <WaitlistForm source="pricing-patchlock" />
      </section>
    </main>
  );
}

function PriceStat({ label, value, note, hot = false }: { label: string; value: string; note: string; hot?: boolean }) {
  return (
    <div className={`border-2 p-4 ${hot ? 'border-[var(--yellow)] bg-[var(--paper)] text-[var(--ink)]' : 'border-white/25 bg-white/8 text-white'}`}>
      <p className="text-xs font-black uppercase tracking-[0.08em]">{label}</p>
      <p className="headline mt-1 text-4xl">{value}</p>
      <p className="text-sm font-black opacity-75">{note}</p>
    </div>
  );
}

function PlanCard({ title, price, body, items, cta, highlight, dark = false }: {
  title: string;
  price: string;
  body: string;
  items: string[];
  cta: ReactNode;
  highlight?: string;
  dark?: boolean;
}) {
  return (
    <section className={`ops-panel relative p-6 ${dark ? 'bg-[var(--ink)] text-white' : 'bg-[var(--paper)] text-[var(--ink)]'}`}>
      {highlight && <span className="absolute -top-3 left-5 border-2 border-[var(--line)] bg-[var(--yellow)] px-3 py-1 text-xs font-black text-[var(--ink)]">{highlight}</span>}
      <p className={`micro-label ${dark ? 'text-[var(--yellow)]' : 'text-[var(--orange)]'}`}>{title}</p>
      <h2 className={`headline mt-3 text-5xl ${dark ? 'text-white' : ''}`}>{price}</h2>
      <p className={`mt-3 font-black ${dark ? 'text-white/90' : 'text-[var(--muted)]'}`}>{body}</p>
      <ul className="mt-5 grid gap-2">
        {items.map((item) => <li key={item} className={`font-black ${dark ? 'text-white' : 'text-[var(--ink)]'}`}>✓ {item}</li>)}
      </ul>
      {cta}
    </section>
  );
}
