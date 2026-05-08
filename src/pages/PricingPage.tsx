import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { WaitlistForm } from '../components/WaitlistForm';
import { CheckoutButton } from '../components/CheckoutButton';

const rows = [
  ['Area scans', 'Preview scans', 'Unlimited', 'Unlimited'],
  ['Score band', '✓', '✓', '✓'],
  ['Full lead score + reasons', '✗', '✓', '✓'],
  ['Source name', '✓', '✓', '✓'],
  ['Official source link + buyer', '✗', '✓', '✓'],
  ['Contact signal', '✗', '✓', '✓'],
  ['WhatsApp alerts', '✗', '✓', '✓'],
  ['Saved leads', '✗', '✓', '✓'],
  ['Free tools', '✓', '✓', '✓'],
  ['Vantage', '✗', '✓', '✓'],
  ['Vicinity', '✗', '✓', '✓'],
  ['Codex', '✗', '✓', '✓'],
  ['Letterhead Pack', '✗', '✓', '✓'],
];

const contrasts = [
  ['Quoting tools', 'PriceBuilder and BuildScope help price jobs after you already have them.'],
  ['Missed-call AI', 'Unmissed recovers calls, but does not decide if the job is worth chasing.'],
  ['Trade agencies', 'Time To Scale style packages cost more and can still send weak enquiries.'],
  ['Enterprise controls', 'Morta is powerful project data infrastructure, not a tradesman lead filter.'],
];

type BillingCycle = 'monthly' | 'annual';

export function PricingPage() {
  const [hours, setHours] = useState(5);
  const [miles, setMiles] = useState(50);
  const [billing, setBilling] = useState<BillingCycle>('monthly');
  const [foundingSlots, setFoundingSlots] = useState<{ remaining: number } | null>(null);

  const annualCost = useMemo(() => Math.round((hours * 35 + miles * 0.45) * 52), [hours, miles]);

  const foundingMonthly = 29;
  const foundingAnnual = 20;
  const proMonthly = 49;
  const proAnnual = 34;

  const foundingPrice = billing === 'annual' ? `£${foundingAnnual}/mo` : `£${foundingMonthly}/mo`;
  const proPrice = billing === 'annual' ? `£${proAnnual}/mo` : `£${proMonthly}/mo`;
  const foundingTotal = billing === 'annual' ? '£240/yr' : `${foundingMonthly}/mo`;
  const proTotal = billing === 'annual' ? '£408/yr' : `${proMonthly}/mo`;

  return (
    <main className="page-shell grid gap-6 py-8 pb-24 md:pb-8">
      <section className="jf-box bg-[var(--navy)] p-8 text-center text-white">
        <p className="micro-label text-[var(--yellow)]">PRICING</p>
        <h1 className="headline mx-auto mt-3 max-w-4xl text-4xl leading-none sm:text-6xl text-[var(--yellow)] md:text-8xl">
          ONE PRICE. NO GAMES.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-xl font-black text-white/80">
          No lead fees. No bidding wars. No race to the bottom. Free shows the signal. Paid unlocks the money detail.
        </p>
        <div className="mx-auto mt-6 inline-flex border-4 border-[var(--line)] bg-[var(--yellow)] px-6 py-4 text-center text-sm font-black uppercase text-[var(--ink)]">
          One avoided wasted evening covers the month.
        </div>

        <div className="mt-6 inline-flex items-center gap-2 border-2 border-[var(--line)] p-1">
          <button
            type="button"
            className={`rounded px-5 py-2 text-sm font-black uppercase transition ${billing === 'monthly' ? 'bg-[var(--yellow)] text-[var(--ink)]' : 'text-white/60 hover:text-white'}`}
            onClick={() => setBilling('monthly')}
          >
            Monthly
          </button>
          <button
            type="button"
            className={`rounded px-5 py-2 text-sm font-black uppercase transition ${billing === 'annual' ? 'bg-[var(--yellow)] text-[var(--ink)]' : 'text-white/60 hover:text-white'}`}
            onClick={() => setBilling('annual')}
          >
            Annual — save 30%
          </button>
        </div>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a className="jf-button bg-[var(--yellow)] text-[var(--ink)]" href="#waitlist">GET WHATSAPP ALERTS</a>
          <Link className="jf-button bg-white text-[var(--ink)]" to="/find-jobs">SCAN FIRST</Link>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Plan
          name="Free"
          price="£0"
          body="Check your area. See if there is REAL LEADS signal before you pay."
          items={['Preview scans', 'Score band', 'Source name', 'Free tools only', 'Paid detail locked']}
          cta="SCAN MY AREA"
          to="/find-jobs"
        />
        <Plan
          name="Founding 30"
          price={foundingPrice}
          priceNote={billing === 'annual' ? 'Billed £240/year — locked forever' : 'Billed monthly — locked forever'}
          weekly={`£${billing === 'annual' ? foundingAnnual : foundingMonthly}/mo — that's £${billing === 'annual' ? '4.61' : '6.71'}/week`}
          body={`Hard cap: 30 users only.${foundingSlots && foundingSlots.remaining <= 30 ? ` ${foundingSlots.remaining} slots left.` : ''} Once full, gone forever.`}
          items={['Unlimited scans', 'Full lead score + reasons', 'Official source link + buyer', 'Contact signal', 'WhatsApp alerts', 'Saved leads', 'Vantage', 'Vicinity', 'Codex', 'Letterhead Pack']}
          tier="founding"
          billing={billing}
          yellow
          paid
        />
        <Plan
          name="Pro"
          price={proPrice}
          priceNote={billing === 'annual' ? 'Billed £408/year' : 'Billed monthly'}
          weekly={`£${billing === 'annual' ? proAnnual : proMonthly}/mo — that's £${billing === 'annual' ? '7.85' : '11.29'}/week`}
          body="Full paid access for trades who want the jobs worth checking sent straight to WhatsApp."
          items={['Unlimited scans', 'Full lead score + reasons', 'Official source link + buyer', 'Contact signal', 'WhatsApp alerts', 'Saved leads', 'Vantage', 'Vicinity', 'Codex', 'Letterhead Pack']}
          tier="pro"
          billing={billing}
          dark
          paid
        />
      </section>

      <section className="jf-box overflow-hidden bg-white">
        <div className="grid grid-cols-4 border-b-2 border-[var(--line)] bg-[var(--yellow)] text-sm font-black uppercase">
          <p className="p-4">Feature</p>
          <p className="p-4">Free</p>
          <p className="p-4">Founding 30 ({billing === 'annual' ? '£240/yr' : '£29/mo'})</p>
          <p className="p-4">Pro ({billing === 'annual' ? '£408/yr' : '£49/mo'})</p>
        </div>
        {rows.map(([feature, free, founding, pro]) => (
          <div key={feature} className="grid grid-cols-4 border-b-2 border-[var(--line)] last:border-b-0">
            <p className="p-4 font-black">{feature}</p>
            <p className="p-4 font-black text-[var(--muted)]">{free}</p>
            <p className="p-4 font-black">{founding}</p>
            <p className="p-4 font-black">{pro}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_420px]">
        <div className="jf-box bg-[var(--yellow)] p-6">
          <p className="micro-label text-[var(--ink)]">LETTERHEAD PACK</p>
          <h2 className="headline mt-3 text-5xl leading-none">Send the job pack like a firm that wins.</h2>
          <p className="mt-4 max-w-2xl text-lg font-black text-[var(--ink)]/75">
            Included with Founding 30 and Pro: company letterhead, job-specific blueprint instructions, WhatsApp-ready PDF, printing, and postage.
          </p>
        </div>
        <article className="jf-box bg-white p-5">
          <p className="micro-label text-[var(--orange)]">WHAT GOES OUT</p>
          <ul className="mt-4 grid gap-3 text-sm font-black">
            <li>✓ Company letterhead with trade, area, phone, email, and proof points.</li>
            <li>✓ Job-specific blueprint instructions written for the exact job.</li>
            <li>✓ Printed copy posted to the buyer where a proper paper touch helps.</li>
            <li>✓ WhatsApp-ready PDF for NO CHASING.</li>
          </ul>
        </article>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_420px]">
        <div className="jf-box bg-white p-6">
          <p className="micro-label text-[var(--orange)]">ROI CHECK</p>
          <h2 className="headline mt-3 text-3xl leading-none sm:text-5xl">£{annualCost.toLocaleString()}/YEAR</h2>
          <p className="mt-2 font-black text-[var(--muted)]">
            Estimated time and fuel lost to weak jobs. One avoided wasted evening covers the month.
          </p>
          <div className="mt-5 grid gap-4">
            <Slider label="Hours lost/week" value={hours} min={0} max={20} onChange={setHours} />
            <Slider label="Wasted miles/week" value={miles} min={0} max={300} step={5} onChange={setMiles} />
          </div>
        </div>
        <WhatsAppBox />
      </section>

      <section className="jf-box bg-white p-6">
        <p className="micro-label text-[var(--orange)]">WHY NOT ANOTHER TOOL?</p>
        <h2 className="headline mt-3 text-3xl leading-none sm:text-4xl">JobFilter sits before quoting, calls, and admin.</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {contrasts.map(([title, body]) => (
            <article key={title} className="border-2 border-[var(--line)] bg-[var(--bg-main)] p-4">
              <h3 className="font-black uppercase">{title}</h3>
              <p className="mt-2 font-bold text-[var(--muted)]">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="waitlist" className="grid gap-5 lg:grid-cols-[1fr_420px]">
        <div className="jf-box bg-[var(--yellow)] p-6">
          <p className="micro-label text-[var(--ink)]">PRO WAITLIST</p>
          <h2 className="headline mt-3 text-5xl leading-none">Founding 30 slots filling fast.</h2>
          <p className="mt-4 max-w-xl text-lg font-black text-[var(--ink)]/75">
            Lock £{billing === 'annual' ? '240/year' : '29/month'} forever or join Pro at £{billing === 'annual' ? '408/year' : '49/month'}.
          </p>
        </div>
        <WaitlistForm source="pricing-whatsapp-alerts" />
      </section>

      <section className="jf-box bg-white p-8 text-center border-4 border-[var(--green)]">
        <p className="micro-label text-[var(--green)]">NEW — ONE-OFF PURCHASE</p>
        <h2 className="headline mt-3 text-4xl leading-none">TRADIESTACK — £450 ONCE. OWN IT.</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg font-black text-[var(--muted)]">
          Trade website. CRM. Auto follow-ups. Review engine. Quotes. Invoices. WhatsApp inbox. Everything agencies charge £1,000-£5,500/month for. One payment. No fees ever.
        </p>
        <Link className="jf-button mt-6 bg-[var(--navy)] text-white" to="/tradiestack">SEE TRADIESTACK</Link>
      </section>
    </main>
  );
}

function Plan({ name, price, priceNote, weekly, body, items, cta, to, tier, billing, dark = false, yellow = false, paid = false }: {
  name: string;
  price: string;
  priceNote?: string;
  weekly?: string;
  body: string;
  items: string[];
  cta?: string;
  to?: string;
  tier?: 'founding' | 'pro' | 'epc';
  billing?: 'monthly' | 'annual';
  dark?: boolean;
  yellow?: boolean;
  paid?: boolean;
}) {
  const box = yellow ? 'bg-[var(--yellow)] text-[var(--ink)]' : dark ? 'bg-[var(--navy)] text-white' : 'bg-white';
  const button = yellow ? 'bg-[var(--navy)] text-white' : dark ? 'bg-[var(--yellow)] text-[var(--ink)]' : 'bg-[var(--navy)] text-white';

  const hasCheckout = tier && billing;
  const checkoutLabel = tier === 'founding'
    ? `LOCK £${billing === 'annual' ? '240/yr' : '29/mo'} FOREVER`
    : tier === 'epc'
    ? 'GET EPC SIGNALS'
    : `JOIN PRO — £${billing === 'annual' ? '408/yr' : '49/mo'}`;

  return (
    <section className={`jf-box p-6 ${box}`}>
      <p className="micro-label text-[var(--orange)]">{name}</p>
      <h2 className="headline mt-3 text-5xl">{price}</h2>
      {priceNote && <p className={`mt-1 text-xs font-black uppercase ${dark ? 'text-[var(--yellow)]' : yellow ? 'text-[var(--ink)]/70' : 'text-[var(--muted)]'}`}>{priceNote}</p>}
      {weekly && <p className={`mt-1 text-sm font-black uppercase ${dark ? 'text-[var(--yellow)]' : yellow ? 'text-[var(--ink)]/75' : 'text-[var(--ink)]'}`}>{weekly}</p>}
      <p className={`mt-2 font-black ${dark ? 'text-white/70' : yellow ? 'text-[var(--ink)]/75' : 'text-[var(--muted)]'}`}>{body}</p>
      {paid && (
        <div className={`mt-4 border-4 px-4 py-3 text-center text-sm font-black uppercase ${dark ? 'border-[var(--yellow)] text-white' : 'border-[var(--line)] text-[var(--ink)]'}`}>
          No contracts. Cancel anytime.
        </div>
      )}
      <ul className="mt-5 grid gap-2">
        {items.map((item) => <li key={item} className="font-black">✓ {item}</li>)}
      </ul>
      {hasCheckout ? (
        <CheckoutButton
          tier={tier!}
          billing={billing!}
          label={checkoutLabel}
          className={`jf-button mt-6 ${button}`}
        />
      ) : to ? (
        to.startsWith('#')
          ? <a className={`jf-button mt-6 ${button}`} href={to}>{cta}</a>
          : <Link className={`jf-button mt-6 ${button}`} to={to}>{cta}</Link>
      ) : null}
    </section>
  );
}

function WhatsAppBox() {
  return (
    <article className="jf-box bg-[var(--navy)] p-5 text-white">
      <p className="micro-label text-[var(--yellow)]">WHATSAPP ALERT PREVIEW</p>
      <p className="mt-3 font-black text-white">98% open rate. Fires within minutes of a Gold score.</p>
      <pre className="mt-4 whitespace-pre-wrap font-mono text-sm font-bold leading-relaxed text-white/85">
{`GOLD LEAD - Roofing
Area: B91 / West Midlands
Value: £50k+
Urgency: Deadline soon
Why it matters: Verified signal, decision-maker named, high value
Action: Open notice`}
      </pre>
    </article>
  );
}

function Slider({ label, value, min, max, step = 1, onChange }: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="field-label">
      {label}
      <input className="w-full accent-[var(--yellow)]" type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} />
      <span className="font-black">{value}</span>
    </label>
  );
}
