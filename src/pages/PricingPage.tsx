import { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { WaitlistForm } from '../components/WaitlistForm';
import { CheckoutButton } from '../components/CheckoutButton';

const rows = [
  ['Area scans', 'Preview scans', 'Unlimited', 'Unlimited'],
  ['Score band', 'Preview only', 'Full score + reasons', 'Full score + reasons'],
  ['Official source link + buyer', 'Locked', 'Unlocked', 'Unlocked'],
  ['Contact signal', 'Locked', 'Unlocked', 'Unlocked'],
  ['WhatsApp alerts', 'Locked', 'GOLD alerts', 'GOLD alerts'],
  ['Saved leads', 'Locked', 'Unlimited', 'Unlimited'],
  ['Vantage / Vicinity / Codex', 'Locked', 'Included', 'Included'],
  ['Letterhead Pack', 'Locked', 'Included', 'Included'],
  ['Cost per job (win 1/month)', '—', '£29', '£49'],
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
  const [jobValue, setJobValue] = useState(2500);
  const [jobsPerMonth, setJobsPerMonth] = useState(2);

  const annualCost = useMemo(() => Math.round((hours * 35 + miles * 0.45) * 52), [hours, miles]);

  const foundingMonthly = 29;
  const foundingAnnual = 240;
  const foundingAnnualMonthly = 20;
  const proMonthly = 49;
  const proAnnual = 408;
  const proAnnualMonthly = 34;

  const foundingWeekly = billing === 'annual' ? '4.61' : '6.71';
  const proWeekly = billing === 'annual' ? '7.85' : '11.29';

  const foundingSaving = foundingMonthly * 12 - foundingAnnual;
  const proSaving = proMonthly * 12 - proAnnual;

  const foundingPrice = billing === 'annual' ? `£${foundingAnnualMonthly}/mo` : `£${foundingMonthly}/mo`;
  const proPrice = billing === 'annual' ? `£${proAnnualMonthly}/mo` : `£${proMonthly}/mo`;

  const remaining = foundingSlots?.remaining ?? null;
  const taken = remaining !== null ? 30 - remaining : null;

  useEffect(() => {
    fetch('/api/waitlist/count')
      .then((r) => r.json())
      .then((data) => setFoundingSlots({ remaining: data.remaining ?? 30 }))
      .catch(() => setFoundingSlots({ remaining: 30 }));
  }, []);

  const roiMonthlyCost = billing === 'annual' ? foundingAnnualMonthly : foundingMonthly;
  const roiMonthlyReturn = jobsPerMonth * jobValue;
  const roiRatio = roiMonthlyCost > 0 ? (roiMonthlyReturn / roiMonthlyCost).toFixed(1) : '0';
  const checkatradeCost = jobsPerMonth * 100;
  const agencyCost = jobsPerMonth * 347;

  return (
    <main className="page-shell grid gap-6 py-8 pb-24 md:pb-8">
      {/* ── HERO ──────────────────────────────────────── */}
      <section className="jf-box bg-[var(--navy)] p-8 text-center text-white">
        <p className="micro-label text-[var(--yellow)]">PRICING</p>
        <h1 className="headline mx-auto mt-3 max-w-4xl text-4xl leading-none sm:text-6xl text-[var(--yellow)] md:text-8xl">
          ONE PRICE. NO GAMES.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-xl font-black text-white/80">
          No lead fees. No bidding wars. No race to the bottom. Free shows the signal. Paid unlocks the money detail.
        </p>

        {/* Weekly price — PRIMARY */}
        <div className="mx-auto mt-6 inline-flex items-baseline gap-2 border-4 border-[var(--yellow)] bg-[var(--yellow)]/10 px-6 py-4">
          <span className="text-5xl font-black text-[var(--yellow)] md:text-6xl">£{foundingWeekly}</span>
          <span className="text-lg font-black text-[var(--yellow)]/80">/week</span>
          <span className="ml-2 text-sm font-black text-white/50">({foundingPrice} billed {billing === 'annual' ? 'yearly' : 'monthly'})</span>
        </div>

        {/* 30-day guarantee */}
        <div className="mx-auto mt-5 inline-flex items-center gap-2 border-2 border-[var(--green)] bg-[var(--green)]/10 px-5 py-3 text-sm font-black uppercase text-[var(--green)]">
          30-DAY MONEY-BACK GUARANTEE — NO QUIBBLES, NO HOOPS
        </div>

        <div className="mx-auto mt-4 inline-flex border-4 border-[var(--line)] bg-[var(--yellow)] px-6 py-4 text-center text-sm font-black uppercase text-[var(--ink)]">
          One avoided wasted evening covers the week.
        </div>

        {/* Founding 30 urgency bar */}
        {taken !== null && taken <= 30 && (
          <div className="mx-auto mt-5 max-w-md">
            <div className="flex items-center justify-between text-xs font-black uppercase text-[var(--orange)]">
              <span>{taken}/30 slots taken</span>
              <span>{30 - taken} left at £{foundingWeekly}/wk</span>
            </div>
            <div className="mt-1 h-3 w-full overflow-hidden border-2 border-[var(--orange)] bg-[var(--orange)]/10">
              <div
                className="h-full bg-[var(--orange)] transition-all duration-500"
                style={{ width: `${(taken / 30) * 100}%` }}
              />
            </div>
            <p className="mt-1 text-xs font-black text-[var(--orange)]/80">
              After 30, price rises to £11.29/week (£49/mo). Lock it now.
            </p>
          </div>
        )}

        {/* Competitor FOMO */}
        <div className="mx-auto mt-5 max-w-lg border-2 border-[var(--yellow)]/40 bg-[var(--yellow)]/5 px-5 py-4">
          <p className="text-sm font-black text-[var(--yellow)]">
            SOMEONE IN YOUR POSTCODE AREA IS ALREADY SEEING THESE JOBS BEFORE THEY HIT CHECKATRADE.
          </p>
          <p className="mt-2 text-sm font-black text-white/70">
            Every week JobFilter picks up planning approvals, EPC retrofits, and council contracts that never reach the directories. The trades using it are quoting first. The ones who aren't are wondering where the good jobs went.
          </p>
          <p className="mt-2 text-sm font-black text-[var(--green)]">
            It could be you. Or it could be the bloke who undercuts you on price.
          </p>
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
        {billing === 'annual' && (
          <div className="mt-3">
            <p className="text-2xl font-black text-[var(--green)]">
              Save £{foundingSaving}/year
            </p>
            <p className="mt-1 text-sm font-black text-[var(--yellow)]">
              Lock the founding price before it rises. £{foundingAnnual}/year = £{foundingWeekly}/week. Cheaper than a site visit fuel cost.
            </p>
          </div>
        )}

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <a className="jf-button bg-[var(--yellow)] text-[var(--ink)]" href="#waitlist">GET WHATSAPP ALERTS</a>
          <Link className="jf-button bg-white text-[var(--ink)]" to="/find-jobs">SCAN FIRST</Link>
        </div>
      </section>

      {/* ── PRICING CARDS ────────────────────────────── */}
      <section className="grid gap-4 lg:grid-cols-3">
        <Plan
          name="Free"
          price="£0"
          body="Check your area. See if there are REAL LEADS before you pay."
          items={['Preview scans', 'Score band only', 'Source name', 'Free tools', 'Paid detail locked']}
          cta="SCAN MY AREA"
          to="/find-jobs"
        />

        {/* FOUNDING 30 — MOST POPULAR */}
        <div className="relative">
          <div className="absolute -top-3 left-0 right-0 flex justify-center">
            <span className="bg-[var(--green)] text-white text-xs font-black uppercase px-4 py-1.5 border-2 border-[var(--navy)] shadow-[3px_3px_0_var(--navy)]">
              MOST POPULAR — {remaining !== null && remaining <= 30 ? `${remaining} SLOTS LEFT` : 'FOUNDING PRICE'}
            </span>
          </div>
          <Plan
            name="Founding 30"
            price={`£${foundingWeekly}/wk`}
            priceSecondary={foundingPrice}
            priceNote={billing === 'annual' ? `Billed £${foundingAnnual}/year — locked forever` : 'Billed monthly — locked forever'}
            body={`First 30 users only. Hard cap.${remaining !== null && remaining <= 30 ? ` ${remaining} slots left.` : ''} Once full, this price is gone forever.`}
            items={['Unlimited scans', 'Full lead score + reasons', 'Official source link + buyer', 'Contact signal', 'GOLD WhatsApp alerts', 'Saved leads', 'Vantage + Vicinity + Codex', 'Letterhead Pack']}
            tier="founding"
            billing={billing}
            yellow
            paid
          />
        </div>

        <Plan
          name="Pro"
          price={`£${proWeekly}/wk`}
          priceSecondary={proPrice}
          priceNote={billing === 'annual' ? `Billed £${proAnnual}/year` : 'Billed monthly'}
          body="Full paid access. Same features as Founding 30 — just at the standard rate."
          items={['Unlimited scans', 'Full lead score + reasons', 'Official source link + buyer', 'Contact signal', 'GOLD WhatsApp alerts', 'Saved leads', 'Vantage + Vicinity + Codex', 'Letterhead Pack']}
          tier="pro"
          billing={billing}
          dark
          paid
        />
      </section>

      {/* ── COMPARISON TABLE ─────────────────────────── */}
      <section className="jf-box overflow-hidden bg-white">
        <div className="grid grid-cols-4 border-b-2 border-[var(--line)] bg-[var(--yellow)] text-sm font-black uppercase">
          <p className="p-4">Feature</p>
          <p className="p-4">Free</p>
          <p className="p-4">Founding 30</p>
          <p className="p-4">Pro</p>
        </div>
        {rows.map(([feature, free, founding, pro]) => (
          <div key={feature} className="grid grid-cols-4 border-b-2 border-[var(--line)] last:border-b-0">
            <p className="p-4 font-black">{feature}</p>
            <p className="p-4 font-black text-[var(--muted)]">{free}</p>
            <p className="p-4 font-black text-[var(--green)]">{founding}</p>
            <p className="p-4 font-black">{pro}</p>
          </div>
        ))}
      </section>

      {/* ── COST PER JOB ─────────────────────────────── */}
      <section className="jf-box bg-[var(--navy)] p-6 text-center text-white">
        <p className="micro-label text-[var(--yellow)]">REAL NUMBERS</p>
        <h2 className="headline mt-3 text-4xl leading-none md:text-5xl text-[var(--yellow)]">COST PER JOB IF YOU WIN 1/MONTH</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="border-2 border-[var(--green)] bg-[var(--green)]/10 p-5">
            <p className="text-sm font-black text-[var(--green)]">JOBFILTER FOUNDING</p>
            <p className="headline mt-2 text-5xl text-[var(--green)]">£{roiMonthlyCost}</p>
            <p className="mt-1 text-sm font-black text-white/60">One job. Covers the month.</p>
          </div>
          <div className="border-2 border-white/20 bg-white/5 p-5">
            <p className="text-sm font-black text-white/60">CHECKATRADE / MYBUILDER</p>
            <p className="headline mt-2 text-5xl text-[var(--orange)]">£50-£150</p>
            <p className="mt-1 text-sm font-black text-white/60">Shared with 4-8 other trades.</p>
          </div>
          <div className="border-2 border-white/20 bg-white/5 p-5">
            <p className="text-sm font-black text-white/60">TRADE AGENCY</p>
            <p className="headline mt-2 text-5xl text-[var(--orange)]">£197-£497</p>
            <p className="mt-1 text-sm font-black text-white/60">Monthly retainer. No guarantees.</p>
          </div>
        </div>
      </section>

      {/* ── ROI CALCULATOR ───────────────────────────── */}
      <section className="jf-box bg-[var(--yellow)] p-6">
        <p className="micro-label text-[var(--ink)]">ROI CALCULATOR</p>
        <h2 className="headline mt-3 text-3xl leading-none sm:text-5xl text-[var(--ink)]">IF YOU WIN JOBS, JOBFILTER PAYS FOR ITSELF.</h2>
        <p className="mt-2 max-w-2xl text-lg font-black text-[var(--ink)]/75">
          Drag the sliders. See what it costs vs what you'd pay on Checkatrade or an agency.
        </p>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="grid gap-4">
            <Slider label="Average job value £" value={jobValue} min={200} max={15000} step={100} onChange={setJobValue} />
            <Slider label="Jobs won per month" value={jobsPerMonth} min={1} max={10} step={1} onChange={setJobsPerMonth} />
          </div>

          <div className="grid gap-3">
            <div className="border-2 border-[var(--green)] bg-white p-4">
              <p className="text-xs font-black uppercase text-[var(--green)]">JOBFILTER FOUNDING — {billing === 'annual' ? `£${foundingWeekly}/wk` : `£${foundingMonthly}/mo`}</p>
              <p className="headline mt-1 text-3xl text-[var(--green)]">£{roiMonthlyCost}/mo</p>
              <p className="text-sm font-black text-[var(--muted)]">ROI: {roiRatio}x your money back</p>
            </div>
            <div className="border-2 border-[var(--line)] bg-white p-4 opacity-60">
              <p className="text-xs font-black uppercase text-[var(--muted)]">CHECKATRADE — shared leads</p>
              <p className="headline mt-1 text-3xl text-[var(--orange)]">~£{checkatradeCost}/mo</p>
              <p className="text-sm font-black text-[var(--muted)]">Leads shared with 4-8 others</p>
            </div>
            <div className="border-2 border-[var(--line)] bg-white p-4 opacity-60">
              <p className="text-xs font-black uppercase text-[var(--muted)]">TRADE AGENCY — retainer</p>
              <p className="headline mt-1 text-3xl text-[var(--orange)]">~£{agencyCost}/mo</p>
              <p className="text-sm font-black text-[var(--muted)]">No guarantees. Monthly contract.</p>
            </div>
          </div>
        </div>

        <div className="mt-6 border-2 border-[var(--ink)] bg-white p-4 text-center">
          <p className="text-sm font-black text-[var(--ink)]">
            If you win {jobsPerMonth} job{jobsPerMonth > 1 ? 's' : ''}/month at £{jobValue.toLocaleString()} each = <span className="text-[var(--green)]">£{roiMonthlyReturn.toLocaleString()}/mo</span> in revenue.
          </p>
          <p className="mt-1 text-sm font-black text-[var(--ink)]/70">
            JobFilter costs £{roiMonthlyCost}/mo. You keep <span className="text-[var(--green)]">£{(roiMonthlyReturn - roiMonthlyCost).toLocaleString()}</span>.
          </p>
          <p className="mt-1 text-xs font-black text-[var(--muted)]">
            On Checkatrade you'd pay ~£{checkatradeCost}/mo. With an agency ~£{agencyCost}/mo.
          </p>
        </div>
      </section>

      {/* ── LETTERHEAD PACK ──────────────────────────── */}
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
            <li>Company letterhead with trade, area, phone, email, and proof points.</li>
            <li>Job-specific blueprint instructions written for the exact job.</li>
            <li>Printed copy posted to the buyer where a proper paper touch helps.</li>
            <li>WhatsApp-ready PDF for NO CHASING.</li>
          </ul>
        </article>
      </section>

      {/* ── ROI CHECK ────────────────────────────────── */}
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

      {/* ── WHY NOT ANOTHER TOOL ─────────────────────── */}
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

      {/* ── WAITLIST / SIGNUP ────────────────────────── */}
      <section id="waitlist" className="grid gap-5 lg:grid-cols-[1fr_420px]">
        <div className="jf-box bg-[var(--yellow)] p-6">
          <p className="micro-label text-[var(--ink)]">LOCK YOUR PRICE</p>
          <h2 className="headline mt-3 text-5xl leading-none">Founding 30 slots filling fast.</h2>
          <p className="mt-4 max-w-xl text-lg font-black text-[var(--ink)]/75">
            Lock £{billing === 'annual' ? `${foundingWeekly}/wk (£${foundingAnnual}/yr)` : `${foundingWeekly}/wk (£${foundingMonthly}/mo)`} forever or join Pro at £{billing === 'annual' ? `${proWeekly}/wk` : `${proMonthly}/mo`}.
          </p>

          {/* Founding 30 progress bar */}
          {taken !== null && taken <= 30 && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs font-black uppercase text-[var(--ink)]/70">
                <span>{taken}/30 slots taken</span>
                <span>{30 - taken} left</span>
              </div>
              <div className="mt-1 h-4 w-full overflow-hidden border-2 border-[var(--ink)] bg-white">
                <div
                  className="h-full bg-[var(--orange)] transition-all duration-500"
                  style={{ width: `${(taken / 30) * 100}%` }}
                />
              </div>
              <p className="mt-1 text-sm font-black text-[var(--ink)]/80">
                {30 - taken} trades left at £{foundingWeekly}/wk forever. After that, £{proWeekly}/wk.
              </p>
            </div>
          )}

          <div className="mt-4 border-2 border-[var(--green)] bg-[var(--green)]/10 px-4 py-3 text-sm font-black text-[var(--green)]">
            30-day money-back guarantee. If you don't see at least one job worth chasing, we refund every penny.
          </div>
          {billing === 'annual' && (
            <div className="mt-2 border-2 border-[var(--green)] bg-[var(--green)]/10 px-4 py-3 text-sm font-black text-[var(--green)]">
              Annual locks the founding price forever. Save £{foundingSaving}/year. That's £{foundingSaving} back in your pocket.
            </div>
          )}
        </div>
        <WaitlistForm source="pricing-whatsapp-alerts" />
      </section>

      {/* ── TRADIESTACK ──────────────────────────────── */}
      <section className="jf-box bg-white p-8 text-center border-4 border-[var(--green)]">
        <p className="micro-label text-[var(--green)]">ONE-OFF PURCHASE</p>
        <h2 className="headline mt-3 text-4xl leading-none">TRADIESTACK — £450 ONCE. OWN IT.</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg font-black text-[var(--muted)]">
          Trade website. CRM. Auto follow-ups. Review engine. Quotes. Invoices. WhatsApp inbox. Everything agencies charge £1,000-£5,500/month for. One payment. No fees ever.
        </p>
        <Link className="jf-button mt-6 bg-[var(--navy)] text-white" to="/tradiestack">SEE TRADIESTACK</Link>
      </section>
    </main>
  );
}

function Plan({ name, price, priceSecondary, priceNote, body, items, cta, to, tier, billing, dark = false, yellow = false, paid = false }: {
  name: string;
  price: string;
  priceSecondary?: string;
  priceNote?: string;
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
      {priceSecondary && <p className={`mt-1 text-sm font-black uppercase ${dark ? 'text-[var(--yellow)]/70' : yellow ? 'text-[var(--ink)]/60' : 'text-[var(--muted)]'}`}>({priceSecondary})</p>}
      {priceNote && <p className={`mt-1 text-xs font-black uppercase ${dark ? 'text-[var(--yellow)]/70' : yellow ? 'text-[var(--ink)]/60' : 'text-[var(--muted)]'}`}>{priceNote}</p>}
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
  const displayValue = value >= 1000 ? `£${value.toLocaleString()}` : String(value);
  return (
    <label className="field-label">
      {label}
      <input className="w-full accent-[var(--yellow)]" type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} />
      <span className="font-black">{displayValue}</span>
    </label>
  );
}
