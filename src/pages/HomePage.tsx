import { Link } from 'react-router-dom';
import { WaitlistForm } from '../components/WaitlistForm';

const whyBad = [
  'Shared lead auctions — 6 other firms got the same number',
  'Vague enquiries — no budget, no location, no urgency',
  'Evenings lost quoting people who were never serious',
  'Cowboys undercutting before you can even reply',
];

const whyGood = [
  'Private signals scored before they reach your phone',
  'Gold leads sent to WhatsApp within minutes',
  'Buyer, value, urgency, and proof in one place',
  'You chase fewer jobs and protect the work that pays',
];

const supportTools = [
  ['Vantage', 'Submit your job. Get a winning bid pack back in 6 hours.', '/vantage'],
  ['Vicinity', 'Send your photos. Get posts, ads, and portfolio assets back same day.', '/vicinity'],
  ['Codex', 'Submit your technical work. Get client-ready sales content that closes.', '/codex'],
];

const products = [
  {
    label: 'Core product',
    name: 'Intake Engine™',
    price: '£49/mo',
    desc: 'Postcode + trade → GOLD/SILVER/BIN scoring → WhatsApp ping. Only real jobs get through.',
    to: '/find-jobs',
    cta: 'Scan Your Area →',
    dark: true,
  },
  {
    label: 'Included — win bigger jobs',
    name: 'Vantage™',
    price: null,
    desc: 'Turn job details into bid decks with 3D renders and infographics. Small firms winning £1M jobs.',
    to: '/vantage',
    cta: 'Learn about Vantage →',
    dark: false,
  },
  {
    label: 'Included — turn past work into new enquiries',
    name: 'Vicinity™',
    price: null,
    desc: 'Camera roll → WhatsApp content and website proof. Stop letting your best work rot.',
    to: '/vicinity',
    cta: 'Learn about Vicinity →',
    dark: false,
  },
  {
    label: 'Included — close more work',
    name: 'Codex™',
    price: null,
    desc: 'Technical quotes and manuals → clear client-ready copy. Stop losing jobs to clearer quotes.',
    to: '/codex',
    cta: 'Learn about Codex →',
    dark: false,
  },
];

const steps = [
  {
    n: '01',
    title: 'Set your filter',
    body: 'Tell JobFilter your trade and the postcodes worth driving to. Takes two minutes.',
  },
  {
    n: '02',
    title: 'It finds and scores',
    body: 'Private work triggers scored GOLD, SILVER, or BIN before they reach you.',
  },
  {
    n: '03',
    title: 'You get the WhatsApp',
    body: 'Trade, area, value, urgency, and proof. You decide in seconds whether to chase it.',
  },
];

const freeTools = [
  { name: 'Quote Calculator', desc: 'Rough job cost in 30 seconds.', to: '/free-tools' },
  { name: 'Diesel Calculator', desc: 'Real site visit fuel cost.', to: '/free-tools' },
  { name: 'Area Scan', desc: 'See what work is active near you.', to: '/free-tools' },
];


export function HomePage() {
  return (
    <main className="pb-8">
      <section className="bg-[var(--yellow)] soft-grid border-b-4 border-[var(--line)]">
        <div className="page-shell section-pad grid gap-8 lg:grid-cols-[1fr_420px] lg:items-end">
          <div>
            <span
              style={{
                display: 'block',
                marginBottom: 14,
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
              }}
            >
              The JobFilter™ Way
            </span>
            <h1
              className="headline"
              style={{ fontSize: 'clamp(44px, 7vw, 92px)', lineHeight: 0.96, color: 'var(--navy)' }}
            >
              Stop quoting for{' '}
              <span
                style={{
                  background: 'var(--yellow)',
                  border: '2px solid var(--navy)',
                  boxShadow: '4px 4px 0 var(--navy)',
                  display: 'inline-block',
                  padding: '0 10px 4px',
                  lineHeight: 1.05,
                }}
              >
                tyre-kickers.
              </span>
            </h1>
            <p className="mt-3 text-sm font-black uppercase tracking-widest text-[var(--ink)]/60">
              Private filter. Scored. Controlled. Straight to your phone.
            </p>
            <p className="mt-4 max-w-2xl text-2xl font-black leading-tight text-[var(--ink)]">
              Real UK trade leads. No competing on price. No shared auctions. Just high-value work signals delivered to your phone.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link className="jf-button bg-[var(--ink)] text-white" to="/find-jobs">SCAN MY AREA FREE</Link>
              <Link className="jf-button bg-white text-[var(--ink)]" to="/pricing">SEE PRICING</Link>
            </div>
            <div className="mt-7 grid gap-2 text-sm font-black text-[var(--ink)] sm:grid-cols-2">
              <p>⚡️ NO CHASING</p>
              <p>⚡️ NO COMPETING</p>
              <p>⚡️ REAL UK LEADS</p>
              <p>⚡️ STAY IN CONTROL</p>
            </div>
          </div>
          <div className="grid gap-4">
            <LeadProofCard />
            <WhatsAppPreview />
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--orange)]">THE PROBLEM</p>
          <h2 className="headline mt-3 max-w-4xl text-6xl leading-[0.9] md:text-8xl">LEAD PLATFORMS SELL YOUR ATTENTION. WE PROTECT IT.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            <Problem title="NO MORE AUCTIONS" body="Shared leads are a race to the bottom. If 5 people get the lead, the buyer only wins on price. You lose." />
            <Problem title="NO WEAK BUDGETS" body="Stop pricing jobs for people who can't afford you. We signal the money before you pick up the phone." />
            <Problem title="NO TIME WASTERS" body="If they aren't starting for 6 months, they aren't a priority. We score urgency so you stay on the tools." />
            <Problem title="NO MIDDLEMEN" body="No more 'agent' noise. We filter work triggers before they waste your time." />
          </div>
        </div>
      </section>

      <section className="border-y-4 border-[var(--line)] bg-[var(--yellow)]">
        <div className="page-shell grid gap-6 py-12 lg:grid-cols-[1fr_420px] lg:items-center">
          <div>
            <p className="micro-label text-[var(--ink)]">NO SHARED LEAD AUCTION</p>
            <h2 className="headline mt-3 max-w-4xl text-5xl leading-none md:text-7xl">
              WE DO NOT BLAST YOUR GOLD LEAD TO FIVE TRADES.
            </h2>
            <p className="mt-5 max-w-2xl text-xl font-black text-[var(--ink)]/75">
              JobFilter keeps the filter private. Gold leads are controlled before they hit WhatsApp: no shared auction, no five-trade blast, no race-to-the-bottom resale.
            </p>
          </div>
          <div className="jf-box bg-white p-5">
            <p className="micro-label text-[var(--orange)]">HOW WE PROTECT IT</p>
            <div className="mt-4 grid gap-3 text-sm font-black text-[var(--ink)]">
              <p className="border-b-2 border-[var(--line)] pb-3">✓ Gold leads are controlled by trade, patch, and timing before WhatsApp delivery.</p>
              <p className="border-b-2 border-[var(--line)] pb-3">✓ Same-trade, same-patch blasts are blocked from becoming a shared auction.</p>
              <p>✓ If a signal looks crowded, it gets marked down or blocked.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why JobFilter ─────────────────────────────── */}
      <section id="why" style={{ background: 'var(--offwhite)', padding: '96px 0' }}>
        <div className="page-shell">
          <div style={{ maxWidth: 720, marginBottom: 48 }}>
            <span
              style={{
                display: 'block',
                marginBottom: 14,
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
              }}
            >
              Why JobFilter™
            </span>
            <h2
              className="headline"
              style={{ fontSize: 'clamp(28px, 3.6vw, 42px)', color: 'var(--navy)' }}
            >
              The lead problem is costing you more than you think.
            </h2>
            <p className="mt-4 text-[17px] font-medium leading-[1.55] text-[var(--navy)]">
              Every bad lead costs you time, fuel, and the mental energy of getting your hopes up. JobFilter cuts the junk before it reaches you.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div
              className="p-7"
              style={{ border: '2px solid var(--navy)', borderRadius: 4, background: 'var(--paper)', boxShadow: '8px 8px 0 var(--yellow)' }}
            >
              <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--red)]">Without JobFilter</p>
              <ul className="space-y-3">
                {whyBad.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[15px] text-[var(--muted)]">
                    <span className="mt-1 flex-shrink-0 font-bold text-[var(--red)]">✕</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="p-7"
              style={{ border: '2px solid var(--navy)', borderRadius: 4, background: 'var(--paper)', boxShadow: '8px 8px 0 var(--yellow)' }}
            >
              <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--green)]">With JobFilter</p>
              <ul className="space-y-3">
                {whyGood.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[15px] text-[var(--navy)]">
                    <span className="mt-1 flex-shrink-0 font-bold text-[var(--green)]">✓</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y-4 border-[var(--line)] bg-[var(--ink)] text-white">
        <div className="page-shell py-12">
          <p className="micro-label text-[var(--yellow)]">WHATSAPP BODYGUARD</p>
          <h2 className="headline mt-3 max-w-4xl text-5xl leading-none md:text-7xl text-[var(--yellow)]">
            GOLD LEADS. STRAIGHT TO YOUR PHONE.
          </h2>
          <p className="mt-5 max-w-2xl text-xl font-black text-white/80">
            When a job scores Gold, it fires to WhatsApp within minutes. Not batched. Not delayed. Before anyone else sees it.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ['98% open rate', 'Not email. Not an app. WhatsApp - where you already work.'],
              ['One-tap action', "Lead arrives. Tap. You're on it. No hunting through dashboards."],
              ['Before the competition', "89% of UK trades use WhatsApp. You're first. They're not."],
            ].map(([title, body]) => (
              <div key={title} className="jf-box bg-white/10 p-5">
                <h3 className="headline text-2xl text-[var(--yellow)]">{title}</h3>
                <p className="mt-2 font-black text-white/75">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg-main)] py-16">
        <div className="page-shell">
          <div style={{ maxWidth: 720, marginBottom: 48 }}>
            <span
              style={{
                display: 'block',
                marginBottom: 14,
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
              }}
            >
              What We Do
            </span>
            <h2
              className="headline"
              style={{ fontSize: 'clamp(28px, 3.6vw, 42px)', color: 'var(--navy)' }}
            >
              One subscription. Four tools. Better jobs.
            </h2>
            <p className="mt-4 text-[17px] font-medium leading-[1.55] text-[var(--navy)]">
              The Intake Engine is the core. Vantage, Vicinity, and Codex come with it — because finding the job is only half the problem.
            </p>
          </div>
          <div className="grid gap-6">
            {products.map((p) => (
              <Link
                key={p.name}
                to={p.to}
                className="block p-7"
                style={{
                  border: '2px solid var(--navy)',
                  borderRadius: 4,
                  background: p.dark ? 'var(--navy)' : 'var(--paper)',
                  boxShadow: '8px 8px 0 var(--yellow)',
                  textDecoration: 'none',
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span
                      className="inline-block px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em]"
                      style={{
                        background: p.dark ? 'var(--yellow)' : 'var(--offwhite)',
                        color: 'var(--navy)',
                        border: '2px solid var(--navy)',
                        borderRadius: 3,
                      }}
                    >
                      {p.label}
                    </span>
                    <h3
                      className="headline mt-4"
                      style={{
                        fontSize: 'clamp(24px, 3vw, 34px)',
                        color: p.dark ? 'var(--yellow)' : 'var(--navy)',
                      }}
                    >
                      {p.name}
                    </h3>
                    <p
                      className="mt-2 max-w-2xl text-[16px] leading-relaxed"
                      style={{ color: p.dark ? 'rgba(230,235,241,0.85)' : 'var(--muted)' }}
                    >
                      {p.desc}
                    </p>
                  </div>
                  {p.price && (
                    <span
                      className="headline flex-shrink-0"
                      style={{ fontSize: 'clamp(22px, 3vw, 30px)', color: 'var(--yellow)' }}
                    >
                      {p.price}
                    </span>
                  )}
                </div>
                <p
                  className="mt-5 text-[14px] font-semibold"
                  style={{ color: p.dark ? 'var(--yellow)' : 'var(--navy)' }}
                >
                  {p.cta}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────── */}
      <section id="how" style={{ background: 'var(--offwhite)', padding: '96px 0' }}>
        <div className="page-shell">
          <div style={{ maxWidth: 720, marginBottom: 48 }}>
            <span
              style={{
                display: 'block',
                marginBottom: 14,
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
              }}
            >
              The JobFilter™ Way
            </span>
            <h2
              className="headline"
              style={{ fontSize: 'clamp(28px, 3.6vw, 42px)', color: 'var(--navy)' }}
            >
              Three steps. Two minutes to set up.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <div
                key={s.n}
                className="p-7"
                style={{ border: '2px solid var(--navy)', borderRadius: 4, background: 'var(--paper)', boxShadow: '8px 8px 0 var(--yellow)' }}
              >
                <span
                  className="headline block"
                  style={{ fontSize: 42, color: 'var(--yellow)' }}
                >
                  {s.n}
                </span>
                <h3 className="mt-3 text-[18px] font-semibold text-[var(--navy)]">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[var(--muted)]">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--navy)] text-white">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--yellow)]">PAID PLAN</p>
          <div className="grid gap-6 lg:grid-cols-[1fr_420px] lg:items-center">
            <div>
              <h2 className="headline mt-3 text-5xl leading-none text-white md:text-6xl">£49/month. Unlock the action layer.</h2>
              <p className="mt-4 max-w-2xl text-xl font-black text-white/70">
                Free shows the signal. Founding 30 and Pro unlock full lead depth, contact signal, WhatsApp alerts, saved leads, priority-ranked jobs, and the Letterhead Pack.
              </p>
            </div>
            <Link className="jf-button bg-[var(--yellow)] text-[var(--ink)]" to="/pricing">SEE PRO DETAILS</Link>
          </div>
        </div>
      </section>

      {/* ── Pricing callout ──────────────────────────── */}
      <section style={{ background: 'var(--navy)', padding: '96px 0' }}>
        <div className="page-shell text-center">
          <span
            style={{
              display: 'block',
              marginBottom: 14,
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--yellow)',
            }}
          >
            Pricing
          </span>
          <h2
            className="headline"
            style={{ fontSize: 'clamp(28px, 3.6vw, 42px)', color: 'var(--paper)' }}
          >
            One good job pays for the month.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[17px] font-medium leading-[1.55]" style={{ color: '#C5CDD6' }}>
            Win one £800 job and the month is covered. Win one £4k job and £49 stops looking like a subscription.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/pricing" className="jf-button bg-[var(--yellow)] text-[var(--navy)]">
              See £49 plan →
            </Link>
            <Link
              to="/find-jobs"
              className="jf-button text-[var(--paper)]"
              style={{ borderColor: 'rgba(255,255,255,0.5)', boxShadow: '4px 4px 0 rgba(255,255,255,0.2)' }}
            >
              Scan Your Area →
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b-4 border-[var(--line)] bg-[var(--bg-main)]">
        <div className="page-shell grid gap-6 py-16 lg:grid-cols-[1fr_420px]">
          <article className="jf-box bg-white p-7">
            <p className="micro-label text-[var(--orange)]">PAID GATE</p>
            <h2 className="headline mt-3 text-5xl leading-none">Free shows the signal. Pro unlocks the job.</h2>
            <p className="mt-4 text-xl font-black text-[var(--muted)]">
              Free proves there is work in the area. £49 unlocks buyer detail, contact signal, WhatsApp delivery, saved leads, and the next action.
            </p>
            <p className="mt-5 font-black uppercase text-[var(--green)]">NO CONTRACTS. FAIR SYSTEM. STAY IN CONTROL.</p>
          </article>
          <article className="jf-box bg-[var(--yellow)] p-7">
            <p className="micro-label text-[var(--ink)]">PAID PLANS INCLUDE</p>
            <h2 className="headline mt-3 text-5xl leading-none">Letterhead Pack</h2>
            <p className="mt-4 text-lg font-black">
              Founding 30 and Pro include professional letterhead, blueprint instructions, printing and postage, plus the PDF copy to send before the other firm looks organised.
            </p>
          </article>
        </div>
      </section>

      <section className="bg-[var(--yellow)] border-y-4 border-[var(--line)]">
        <div className="page-shell py-12">
          <p className="micro-label text-[var(--ink)]">ENERGY UPGRADE LEADS</p>
          <h2 className="headline mt-3 text-5xl leading-none md:text-6xl">LOW-RATED PROPERTIES NEED YOUR WORK.</h2>
          <p className="mt-5 max-w-2xl text-xl font-black text-[var(--ink)]/75">
            Some properties need urgent retrofit before they can move forward. JobFilter flags the work trigger before any job board sees it.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm font-black">
            {['Heat pump installs', 'Insulation upgrades', 'Boiler replacements', 'Solar installs', 'EV chargers'].map(t => (
              <span key={t} className="border-2 border-[var(--ink)] bg-white px-3 py-2">{t}</span>
            ))}
          </div>
          <Link className="jf-button mt-6 bg-[var(--ink)] text-white" to="/epc">SEE ENERGY LEADS -&gt;</Link>
        </div>
      </section>

      <section className="bg-white">
        <div className="page-shell grid gap-8 py-16 lg:grid-cols-[1fr_420px] lg:items-center">
          <div>
            <span
              style={{
                display: 'block',
                marginBottom: 14,
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
              }}
            >
              Start Filtering
            </span>
            <h2
              className="headline"
              style={{ fontSize: 'clamp(28px, 3.6vw, 42px)', color: 'var(--navy)' }}
            >
              Start filtering today.
            </h2>
            <p className="mt-4 max-w-lg text-[17px] font-medium leading-[1.55] text-[var(--muted)]">
              Scan your area free. Unlock full leads, WhatsApp alerts, and the action layer for £49/month. No contract. Cancel any time.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/pricing" className="jf-button bg-[var(--yellow)] text-[var(--navy)]">
                Get the £49 plan →
              </Link>
              <Link to="/find-jobs" className="jf-button bg-[var(--paper)] text-[var(--navy)]">
                Scan your area free →
              </Link>
            </div>
          </div>
          <WaitlistForm source="home-v3" />
        </div>
      </section>
    </main>
  );
}

function LeadProofCard() {
  return (
    <article className="jf-box bg-white p-5 text-[var(--ink)]">
      <p className="micro-label text-[var(--orange)]">GOLD LEAD</p>
      <h2 className="mt-3 text-2xl font-black leading-tight">Electrical maintenance package</h2>
      <div className="mt-4 grid gap-3 text-sm">
        <Row label="Trade" value="Electrical" />
        <Row label="Area" value="B14 / West Midlands" />
        <Row label="Value" value="£25k+" />
        <Row label="Urgency" value="Deadline soon" />
        <Row label="✓ Verified Signal" value="91% confidence" />
        <Row label="Contact signal" value="Buyer named" />
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {['Verified signal', 'High intent', 'Free preview'].map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.06em]"
            style={{
              background: 'var(--offwhite)',
              color: 'var(--navy)',
              border: '1px solid var(--rule)',
              borderRadius: 3,
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}

function WhatsAppPreview() {
  return (
    <article className="jf-box bg-[var(--navy)] p-5 text-white">
      <p className="micro-label text-[var(--yellow)]">WHATSAPP ALERT PREVIEW</p>
      <pre className="mt-4 whitespace-pre-wrap font-mono text-sm font-bold leading-relaxed text-white/85">      
{`GOLD LEAD - Electrical
Area: B14 / West Midlands
Value: £25k+
Urgency: Deadline soon
Why it matters: Buyer named, strong trade match, high intent
Action: Open notice`}
      </pre>
    </article>
  );
}

function Problem({ title, body }: { title: string; body: string }) {
  return (
    <article className="jf-box bg-[var(--bg-main)] p-5">
      <h3 className="headline text-2xl">{title}</h3>
      <p className="mt-2 font-black text-[var(--muted)]">{body}</p>
    </article>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b-2 border-[var(--line)] pb-2 last:border-b-0">
      <span className="font-black text-[var(--muted)]">{label}</span>
      <span className="text-right font-black">{value}</span>
    </div>
  );
}

function Example({ label, text }: { label: string; text: string }) {
  return (
    <div className="border-4 border-[var(--line)] bg-white p-5 [&+&]:mt-5">
      <p className="font-black uppercase">{label}</p>
      <p className="mt-3 font-black leading-relaxed text-[var(--muted)]">"{text}"</p>
    </div>
  );
}
