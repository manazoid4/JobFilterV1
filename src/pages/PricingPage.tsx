import { Link } from 'react-router-dom';
import { FormEvent, useState, type ReactNode } from 'react';
import { Radio, Camera, Mail, MapPinned, Check, X, Zap, LayoutGrid, BarChart3, Calendar, ClipboardCheck, Radar, Calculator, MessageSquare } from 'lucide-react';
import { CheckoutButton } from '../components/CheckoutButton';
import { joinWaitlist } from '../lib/waitlist';

const included = [
  'Gold leads sent to WhatsApp before competitors see them',
  'Score, urgency, value & next action on every lead',
  'Territory lock — one trade per postcode cluster',
  'Pipeline tracking — every lead from first call to won',
  'Win breakdown — see which trade & area actually pays',
  'CSV export & calendar reminders — sync to any CRM',
  'Keyword search across planning, energy & council signals',
  'Company-branded letters for selected Gold leads',
  'Buyer Action Pack — call opener, checks, quote floor',
  'Patch Pulse — source mix, Gold/Silver split, best source',
  'Follow-up cadence — the next 3 touches for every lead',
  'Vicinity & Vantage included for proof and bid support',
  'Weekly opportunity digest for your patch',
];

const addOns = [
  ['Hotlist', 'Only urgent, high-value jobs wake you up.', '£9/mo'],
  ['Buyer Pack Plus', 'Extra printed approach packs for bigger jobs.', '£5/lead'],
  ['Vantage Fast Pack', 'Bid angle, proof points and scope pack within 6 hours.', '£49 each'],
  ['Neighbour Signal', 'Turn one won job into door-drop demand on the same street.', 'from £99'],
];

const workflowTools = [
  {
    icon: Calculator,
    title: 'Quote floor',
    body: 'See the minimum sensible quote before you spend a site visit. Margin first.',
  },
  {
    icon: Radar,
    title: 'Patch pulse',
    body: 'Read the live mix in your patch: Gold, Silver, locked, and which source is carrying it.',
  },
  {
    icon: Calendar,
    title: 'Follow-up cadence',
    body: 'Every lead gets a next three touches sequence so jobs do not go cold.',
  },
  {
    icon: BarChart3,
    title: 'Win breakdown',
    body: 'See which trade, source and postcode actually pay. Stop guessing where your money comes from.',
  },
];

const featureCategories = [
  {
    icon: MessageSquare,
    title: 'First Strike',
    points: ['Auto-selects right template for lead age', 'Pre-filled with trade + postcode', 'Copies to WhatsApp in one tap', 'Auto-tracks lead on send'],
    featured: true,
  },
  {
    icon: Radio,
    title: 'Leads & Alerts',
    points: ['WhatsApp alerts', 'Gold scoring', 'Territory priority'],
    featured: false,
  },
  {
    icon: Calculator,
    title: 'Value Control',
    points: ['Quote floor', 'Call opener', 'Follow-up cadence'],
    featured: false,
  },
  {
    icon: ClipboardCheck,
    title: 'Buyer Action Pack',
    points: ['Verification questions', 'Quote floor', 'Next action'],
    featured: false,
  },
  {
    icon: Radar,
    title: 'Patch Watch',
    points: ['Daily signal watch', 'Patch pulse', 'Territory priority'],
    featured: false,
  },
  {
    icon: Mail,
    title: 'Letters',
    points: ['Company-branded approach letters', 'PDF follow-up packs'],
    featured: false,
  },
  {
    icon: MapPinned,
    title: 'Territory',
    points: ['Postcode exclusivity', 'Priority routing'],
    featured: false,
  },
];

const comparisonRows = [
  { feature: 'WhatsApp Gold leads', free: 'Preview', founder: 'Full', standard: 'Full' },
  { feature: 'First Strike — message templates', free: false, founder: 'Included', standard: 'Included' },
  { feature: 'Territory lock', free: false, founder: true, standard: true },
  { feature: 'Pipeline & Win breakdown', free: false, founder: true, standard: true },
  { feature: 'CSV export & calendar sync', free: false, founder: true, standard: true },
  { feature: 'Keyword signal search', free: 'Limited', founder: 'Unlimited', standard: 'Unlimited' },
  { feature: 'Buyer Action Pack', free: false, founder: 'Included', standard: 'Included' },
  { feature: 'Quote floor', free: false, founder: 'Included', standard: 'Included' },
  { feature: 'Follow-up cadence', free: false, founder: 'Included', standard: 'Included' },
  { feature: 'Patch Pulse', free: 'Preview', founder: 'Included', standard: 'Included' },
  { feature: 'Company-branded letters', free: false, founder: true, standard: true },
  { feature: 'Vicinity photo-to-post', free: '3 posts', founder: 'Unlimited', standard: 'Unlimited' },
  { feature: 'Vantage bid decks', free: '1 deck', founder: 'Unlimited', standard: 'Unlimited' },
  { feature: 'Founder price lock', free: false, founder: true, standard: false },
];

const toolIcons = [
  { name: 'WhatsApp Leads', icon: Zap, highlight: false },
  { name: 'First Strike', icon: MessageSquare, highlight: true },
  { name: 'Pipeline', icon: BarChart3, highlight: false },
  { name: 'Action Pack', icon: ClipboardCheck, highlight: false },
  { name: 'Patch Watch', icon: Radar, highlight: false },
  { name: 'Vicinity', icon: Camera, highlight: false },
  { name: 'Vantage', icon: LayoutGrid, highlight: false },
  { name: 'Territory', icon: MapPinned, highlight: false },
];

export function PricingPage() {
  return (
    <main className="page-shell grid gap-6 py-8 pb-16 text-[var(--ink)]">
      <section className="ops-panel bg-[var(--ink)] p-7 text-white">
        <p className="micro-label text-[var(--yellow)]">FOUNDER PRICING — LOCKS FOREVER</p>
        <h1 className="headline mt-3 max-w-4xl text-5xl leading-none text-white md:text-8xl">
          £39/MO. ONE JOB PAYS A YEAR.
        </h1>
        <p className="mt-5 max-w-3xl text-xl font-black text-[var(--yellow)]">
          One £2,000 win covers 51 months. Most founders chase their first lead inside 14 days.
        </p>
        <p className="mt-3 max-w-3xl text-lg font-black text-white/85">
          Gold leads on WhatsApp. One trade per postcode. Pipeline tracking, win breakdown, CSV export, keyword search — all in. No shared lead auction.
        </p>
        <p className="mt-3 max-w-3xl text-base font-black text-white/60">
          Checkatrade £200+/mo — same lead, five trades. Bark — pay-per-name, fight for it. JobFilter — your patch, your leads, your price locked.
        </p>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <PriceStat label="Founder monthly" value="£39/mo" note="locked while plan is active" hot />
          <PriceStat label="Founder annual" value="£390/yr" note="2 months free — £32.50/mo" hot />
          <PriceStat label="Standard later" value="£79/mo" note="after founder window closes" />
        </div>
        <div className="mt-6 grid gap-3">
          <div className="flex flex-col gap-3 sm:flex-row">
            <CheckoutButton tier="founding" billing="monthly" label="LOCK MY £39/MO PATCH" className="bg-[var(--yellow)] text-[var(--ink)]" />
            <CheckoutButton tier="founding" billing="annual" label="GO ANNUAL — SAVE £78" className="bg-white text-[var(--ink)]" />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 border-t-2 border-white/20" />
            <span className="text-xs font-black text-white/40 uppercase">or scan free first</span>
            <div className="flex-1 border-t-2 border-white/20" />
          </div>
          <div className="flex items-center gap-4">
            <Link className="jf-button bg-transparent border-2 border-white/40 text-white hover:border-white" to="/find-jobs">SEE LEADS IN MY POSTCODE →</Link>
            <span className="text-sm font-black text-white/60">No card. 30 seconds. Real signals from your patch.</span>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <PlanCard
          title="Free Scan"
          price="£0"
          body="See if your patch is worth paying for — before you pay."
          items={['Preview signals in your postcode', 'Score band only — no full detail', 'No WhatsApp alerts', 'No territory lock', 'No letters or workflow tools', 'Trade intelligence preview']}
          cta={<><Link className="jf-button mt-5 bg-[var(--ink)] text-white inline-block" to="/find-jobs">SCAN MY POSTCODE FREE</Link><p className="mt-2 text-xs font-black text-[var(--muted)]">No credit card required.</p></>}
        />
        <PlanCard
          title="Founder"
          price="£39/mo"
          body="£39/mo for life while your plan stays active. Cancel and rejoin later — you pay £79."
          items={included}
          highlight="BEST VALUE"
          featured
          cta={<CheckoutButton tier="founding" billing="monthly" label="LOCK MY PATCH — £39/MO" className="mt-5 bg-[var(--ink)] text-white" />}
        />
        <PlanCard
          title="Standard"
          price="£79/mo"
          body="Full access after the founder window closes. Still cheaper than one month on Checkatrade — and your leads aren't shared."
          items={included}
          dark
          cta={<CheckoutButton tier="pro" billing="monthly" label="START STANDARD — £79/MO" className="mt-5 bg-white text-[var(--ink)]" />}
        />
      </section>

      {/* ── BUILT-IN WORKFLOW TOOLS ──────────────────────── */}
      <section className="ops-panel bg-white p-7">
        <p className="micro-label text-[var(--orange)]">MONTHLY VALUE TOOLS</p>
        <h2 className="headline mt-3 text-4xl leading-none md:text-5xl">QUOTE FLOOR. PATCH PULSE. FOLLOW-UP CADENCE.</h2>
        <p className="mt-3 max-w-3xl font-black text-[var(--muted)]">
          Not just alerts. Know the floor before you price, keep the chase moving, and see which patch actually pays.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {workflowTools.map(({ icon: Icon, title, body }) => (
            <article key={title} className="border-2 border-[var(--line)] bg-[var(--paper)] p-5 shadow-[4px_4px_0_var(--line)]">
              <div className="flex h-10 w-10 items-center justify-center bg-[var(--yellow)] border-2 border-[var(--ink)]">
                <Icon className="h-5 w-5 text-[var(--ink)]" strokeWidth={2.5} />
              </div>
              <h3 className="headline mt-3 text-xl">{title}</h3>
              <p className="mt-2 text-sm font-black text-[var(--muted)]">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="ops-panel bg-[var(--yellow)] p-7 text-[var(--ink)]">
          <p className="micro-label text-[var(--ink)]">NEW PAID FEATURE</p>
          <h2 className="headline mt-3 text-4xl leading-none md:text-5xl">BUYER ACTION PACK.</h2>
          <p className="mt-3 text-lg font-black text-[var(--ink)]/80">
            Every serious lead needs a chase plan. Paid users get the call opener, verification checks, quote guardrail, and next action beside the lead.
          </p>
          <div className="mt-5 grid gap-2">
            {['What to say first', 'What to verify before visiting', 'What makes the lead worth quoting', 'When to walk away'].map((item) => (
              <p key={item} className="border-2 border-[var(--ink)] bg-white px-3 py-2 text-sm font-black uppercase">{item}</p>
            ))}
          </div>
        </article>

        <article className="ops-panel bg-[var(--ink)] p-7 text-white">
          <p className="micro-label text-[var(--yellow)]">NEW PAID FEATURE</p>
          <h2 className="headline mt-3 text-4xl leading-none text-[var(--yellow)] md:text-5xl">PATCH WATCH.</h2>
          <p className="mt-3 text-lg font-black text-white/80">
            You are not paying for one search. You are paying for your postcode cluster to be watched for new planning, energy upgrade, tender, and fit-out signals.
          </p>
          <div className="mt-5 grid gap-2">
            {['Daily signal watch', 'Weekly opportunity digest', 'Planning and energy upgrade alerts', 'Territory priority'].map((item) => (
              <p key={item} className="border-2 border-white/25 bg-white/8 px-3 py-2 text-sm font-black uppercase text-white">{item}</p>
            ))}
          </div>
        </article>
      </section>

      {/* ── ALL TOOLS, ONE PRICE BANNER ──────────────────── */}
      <section className="ops-strip flex flex-col items-center gap-6 px-6 py-10 text-center text-[var(--ink)]">
        <p className="micro-label">ALL TOOLS, ONE PRICE</p>
        <h2 className="headline max-w-3xl text-4xl leading-none md:text-6xl">
          Everything you need to find, win, and showcase work.
        </h2>
        <p className="max-w-2xl text-lg font-black text-[var(--muted)]">
          No separate subscriptions. No per-tool fees. One price, every feature.
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-6">
          {toolIcons.map(({ name, icon: Icon, highlight }) => (
            <div key={name} className="flex flex-col items-center gap-2">
              <div className={`relative flex h-14 w-14 items-center justify-center border-2 border-[var(--ink)] shadow-[4px_4px_0_var(--ink)] ${highlight ? 'bg-[var(--yellow)]' : 'bg-[var(--paper)]'}`}>
                <Icon className="h-6 w-6 text-[var(--ink)]" strokeWidth={2.5} />
                {highlight && (
                  <span className="absolute -top-2 -right-2 bg-[var(--orange)] text-white text-[8px] font-black uppercase px-1 py-0.5 leading-none">NEW</span>
                )}
              </div>
              <span className={`text-xs font-black uppercase tracking-wide ${highlight ? 'text-[var(--orange)]' : ''}`}>{name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHAT'S INCLUDED GRID ──────────────────────────── */}
      <section className="ops-panel bg-[var(--paper)] p-7">
        <p className="micro-label text-[var(--orange)]">WHAT'S INCLUDED</p>
        <h2 className="headline mt-3 text-4xl leading-none md:text-5xl">EVERY TOOL. ONE SUBSCRIPTION.</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featureCategories.map(({ icon: Icon, title, points, featured }) =>
            featured ? (
              <article key={title} className="sm:col-span-2 lg:col-span-3 border-2 border-[var(--ink)] bg-[var(--ink)] p-5 shadow-[4px_4px_0_var(--yellow)]">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[var(--yellow)] border-2 border-[var(--yellow)]">
                    <Icon className="h-5 w-5 text-[var(--ink)]" strokeWidth={2.5} />
                  </div>
                  <h3 className="headline text-2xl text-white">{title}</h3>
                  <span className="ml-auto text-[10px] font-black uppercase bg-[var(--orange)] text-white px-2 py-1 tracking-wider">NEW</span>
                </div>
                <p className="mt-2 text-sm font-bold text-white/60 max-w-xl">
                  A GOLD lead arrives. First Strike picks the right message for how old the lead is, fills in the trade and postcode, and puts it in your clipboard. One tap. Sent before your competitor has even opened the notification.
                </p>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                  {points.map((point) => (
                    <li key={point} className="border border-[var(--yellow)]/30 bg-white/5 px-3 py-2 text-xs font-black uppercase tracking-wider text-[var(--yellow)]">✓ {point}</li>
                  ))}
                </ul>
              </article>
            ) : (
              <article key={title} className="border-2 border-[var(--line)] bg-white p-5 shadow-[4px_4px_0_var(--line)]">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[var(--yellow)] border-2 border-[var(--ink)]">
                    <Icon className="h-5 w-5 text-[var(--ink)]" strokeWidth={2.5} />
                  </div>
                  <h3 className="headline text-2xl">{title}</h3>
                </div>
                <ul className="mt-3 grid gap-1">
                  {points.map((point) => (
                    <li key={point} className="font-black text-[var(--muted)]">✓ {point}</li>
                  ))}
                </ul>
              </article>
            )
          )}
        </div>
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

      {/* ── COMPARISON TABLE ────────────────────────────── */}
      <section className="ops-panel bg-[var(--paper)] p-7">
        <p className="micro-label text-[var(--orange)]">COMPARE PLANS</p>
        <h2 className="headline mt-3 text-4xl leading-none md:text-5xl">SEE EXACTLY WHAT YOU GET AT EACH TIER.</h2>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[480px] border-collapse text-left">
            <thead>
              <tr className="border-b-2 border-[var(--line)]">
                <th className="pb-3 pr-4 font-black uppercase tracking-wide text-[var(--muted)]" />
                <th className="pb-3 px-4 text-center font-black uppercase tracking-wide">Free Scan</th>
                <th className="pb-3 px-4 text-center font-black uppercase tracking-wide bg-[var(--yellow)]">Founder</th>
                <th className="pb-3 px-4 text-center font-black uppercase tracking-wide">Standard</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map(({ feature, free, founder, standard }) => (
                <tr key={feature} className="border-b border-[var(--line)]/30">
                  <td className="py-3 pr-4 font-black">{feature}</td>
                  <td className="py-3 px-4 text-center">
                    {typeof free === 'boolean' ? (
                      free ? <Check className="mx-auto h-5 w-5 text-[var(--green)]" /> : <X className="mx-auto h-5 w-5 text-[var(--muted)]/40" />
                    ) : (
                      <span className="font-black text-[var(--muted)]">{free}</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center bg-[var(--yellow)]/10">
                    {typeof founder === 'boolean' ? (
                      founder ? <Check className="mx-auto h-5 w-5 text-[var(--green)]" /> : <X className="mx-auto h-5 w-5 text-[var(--muted)]/40" />
                    ) : (
                      <span className="font-black">{founder}</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {typeof standard === 'boolean' ? (
                      standard ? <Check className="mx-auto h-5 w-5 text-[var(--green)]" /> : <X className="mx-auto h-5 w-5 text-[var(--muted)]/40" />
                    ) : (
                      <span className="font-black text-[var(--muted)]">{standard}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

      {/* ── WHY NOT CHECKATRADE/BARK? FAQ ────────────────── */}
      <section className="ops-panel bg-[var(--ink)] p-7 text-white">
        <p className="micro-label text-[var(--yellow)]">COMMON OBJECTIONS</p>
        <h2 className="headline mt-3 text-4xl leading-none text-[var(--yellow)] md:text-5xl">WHY NOT JUST USE CHECKATRADE OR BARK?</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {[
            {
              q: 'Checkatrade has thousands of homeowners — isn\'t that better coverage?',
              a: 'Checkatrade has homeowners. So do 4-8 other trades who buy the same lead. You\'re not getting access to homeowners — you\'re entering an auction against your competitors. And renewal prices are doubling year-on-year: tradespeople report going from £756/yr to £2,160/yr. JobFilter finds jobs before they ever reach a directory.',
            },
            {
              q: 'Bark is pay-per-lead, so I only pay when I need to — isn\'t that more flexible?',
              a: 'Bark credits cost £1.80 each and expire in 3 months (since Nov 2025). A single lead costs 5-20 credits. That\'s £9-£36 per lead, shared with 3-5 other trades. JobFilter is £39/month flat — unlimited scans, no per-lead fees, no expiry pressure, no auction.',
            },
            {
              q: 'MyBuilder lets me choose which jobs to bid on — isn\'t that better control?',
              a: 'You pay £25-£65 to express interest, before the homeowner picks you. Most tradespeople spend £150-£300 before winning a single job. And the homeowner shortlists 6+ trades anyway. JobFilter shows you exclusive, pre-scored signals — you act before there\'s any competition to bid against.',
            },
            {
              q: 'What makes JobFilter leads higher quality than those platforms?',
              a: 'Directory leads come from a form a homeowner filled in while shopping around. JobFilter signals come from planning approvals, energy efficiency records, and public procurement data — official sources that confirm real intent, real budget, and real urgency before you chase anything.',
            },
          ].map(({ q, a }) => (
            <div key={q} className="border-2 border-white/20 bg-white/8 p-5">
              <h3 className="headline text-lg text-[var(--yellow)]">{q}</h3>
              <p className="mt-3 font-black leading-relaxed text-white/80">{a}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link className="jf-button bg-[var(--yellow)] text-[var(--ink)]" to="/vs/checkatrade">FULL CHECKATRADE COMPARISON</Link>
          <Link className="jf-button bg-white text-[var(--ink)]" to="/find-jobs">SCAN FREE — NO CARD NEEDED</Link>
        </div>
      </section>

      {/* ── GUARANTEE + OBJECTIONS ───────────────────────── */}
      <section className="jf-box border-4 border-[var(--green)] bg-[var(--green)]/5 p-8">
        <p className="micro-label text-[var(--green)]">30-DAY MONEY-BACK GUARANTEE</p>
        <h2 className="headline mt-3 text-3xl leading-none sm:text-4xl text-[var(--green)]">TRY IT RISK-FREE.</h2>
        <p className="mt-3 max-w-xl text-lg font-black text-[var(--muted)]">
          Use JobFilter for 30 days. Set up your territory and WhatsApp alerts. View at least 10 scored leads. If you genuinely don't see one job worth chasing, we refund every penny. No hoops — we just ask that you actually use the system.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { q: 'What if my patch has no signals?', a: 'Every patch we list has verified live signals. If signals drop below viable levels for 60 days, we release the lock and refund that month.' },
            { q: 'Can I cancel anytime?', a: 'Yes — no contract. Cancel whenever you want. But founder price only locks while active. Cancel and rejoin later, you pay the new rate.' },
            { q: 'What if my competitor takes my patch?', a: 'First come, first served. Once you lock it, no one else gets priority routing for your trade in that postcode cluster.' },
            { q: 'Is £39/mo really worth it?', a: 'One £2,000 job covers 51 months of JobFilter. Most founders close their first lead within 14 days. The maths is simple.' },
          ].map(({ q, a }) => (
            <div key={q} className="jf-box bg-white p-4">
              <p className="headline text-sm">{q}</p>
              <p className="mt-2 text-xs font-black text-[var(--muted)]">{a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_420px]">
        <div className="ops-panel bg-[var(--steel)] p-6 text-white">
            <p className="micro-label text-[var(--yellow)]">TERRITORIES</p>
            <h2 className="headline mt-3 text-5xl leading-none md:text-7xl">LOCK YOUR AREA.</h2>
            <p className="mt-5 max-w-2xl text-xl font-black text-white/80">
              Territory lock is priority routing for scored jobs in one trade and postcode cluster. If your area is valuable, do not leave it open.
            </p>
            <p className="mt-4 max-w-2xl font-black text-[var(--yellow)]">
              For commercial firms, multi-trade crews, and agencies: send your details and our commercial team will email you.
            </p>
        </div>
        <CommercialContactForm />
      </section>
    </main>
  );
}

function CommercialContactForm() {
  const [company, setCompany] = useState('');
  const [name, setName] = useState('');
  const [trade, setTrade] = useState('');
  const [postcode, setPostcode] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError('');
    if (!company.trim() || !name.trim() || !email.trim()) {
      setError('Company, name, and email are required.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter a valid email address.');
      return;
    }

    setStatus('loading');
    try {
      await joinWaitlist({
        name: `${name.trim()} — ${company.trim()}${postcode.trim() ? ` — ${postcode.trim().toUpperCase()}` : ''}`,
        trade: trade.trim() || 'Commercial enquiry',
        contact: email.trim(),
        source: 'pricing-commercial-contact',
      });
      setStatus('done');
      setCompany('');
      setName('');
      setTrade('');
      setPostcode('');
      setEmail('');
    } catch (err: any) {
      setStatus('error');
      setError(String(err?.message ?? 'Could not send enquiry.'));
    }
  }

  if (status === 'done') {
    return (
      <div className="jf-box bg-[var(--yellow)] p-6 text-[var(--ink)]">
        <p className="micro-label text-[var(--ink)]">COMMERCIAL ENQUIRY SENT</p>
        <h3 className="headline mt-2 text-3xl leading-none">OUR COMMERCIAL TEAM WILL EMAIL YOU.</h3>
        <p className="mt-3 font-black text-[var(--ink)]/75">
          We have your details and will come back with the right patch, trade, and setup route.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="jf-box grid gap-4 border-4 border-[var(--line)] bg-[var(--yellow)] p-6 text-[var(--ink)] shadow-[6px_6px_0_var(--line)]">
      <p className="micro-label text-[var(--ink)]">COMMERCIAL CONTACT</p>
      <h3 className="headline text-3xl leading-none">Ask our team to email you.</h3>
      <label className="field-label">
        Company
        <input className="field-input" value={company} onChange={(event) => setCompany(event.target.value)} placeholder="Company name" required />
      </label>
      <label className="field-label">
        Name
        <input className="field-input" value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" required />
      </label>
      <label className="field-label">
        Trade or work type
        <input className="field-input" value={trade} onChange={(event) => setTrade(event.target.value)} placeholder="Electrical, roofing, multi-trade..." />
      </label>
      <label className="field-label">
        Patch / postcode
        <input className="field-input" value={postcode} onChange={(event) => setPostcode(event.target.value.toUpperCase())} placeholder="B14, SW1, Manchester..." />
      </label>
      <label className="field-label">
        Work email
        <input className="field-input" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@company.co.uk" required />
      </label>
      {(status === 'error' || error) && <p className="font-black text-[var(--orange)]">{error}</p>}
      <button className="jf-button bg-[var(--navy)] text-white" disabled={status === 'loading'}>
        {status === 'loading' ? 'SENDING' : 'CONTACT COMMERCIAL TEAM'}
      </button>
    </form>
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

function PlanCard({ title, price, body, items, cta, highlight, dark = false, featured = false }: {
  title: string;
  price: string;
  body: string;
  items: string[];
  cta: ReactNode;
  highlight?: string;
  dark?: boolean;
  featured?: boolean;
}) {
  const wrapClass = dark
    ? 'bg-[var(--ink)] text-white'
    : featured
      ? 'bg-white text-[var(--ink)] border-4 border-[var(--ink)] shadow-[6px_6px_0_var(--yellow)]'
      : 'bg-[var(--paper)] text-[var(--ink)]';
  return (
    <section className={`ops-panel relative p-6 ${wrapClass}`}>
      {highlight && <span className="absolute -top-3 left-5 border-2 border-[var(--ink)] bg-[var(--yellow)] px-3 py-1 text-xs font-black text-[var(--ink)]">{highlight}</span>}
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
