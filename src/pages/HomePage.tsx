import { Link } from 'react-router-dom';
import { WaitlistForm } from '../components/WaitlistForm';

const whyBad = [
  'Shared lead auctions — 6 other firms got the same number',
  'Vague enquiries — no budget, no location, no urgency',
  'Evenings lost quoting people who were never serious',
  'Cowboys undercutting before you can even reply',
];

const whyGood = [
  'Leads filtered before they reach your phone',
  'GOLD / SILVER / BIN scored automatically',
  'WhatsApp alert with trade, area, value, and next action',
  'You price. You decide. No auction.',
];

const products = [
  {
    label: 'Core product',
    name: 'Intake Engine™',
    price: '£49/mo',
    desc: 'Postcode + trade → GOLD/SILVER/BIN scoring → WhatsApp ping. Only real jobs get through.',
    to: '/intake-test',
    cta: 'See the Intake Engine →',
    dark: true,
  },
  {
    label: 'Included — win bigger jobs',
    name: 'Vantage™',
    price: null,
    desc: 'Turn tender docs into bid decks with 3D renders and infographics. Small firms winning £1M jobs.',
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
    body: 'Tenders, planning signals, and local work triggers — scored GOLD, SILVER, or BIN before they reach you.',
  },
  {
    n: '03',
    title: 'You get the WhatsApp',
    body: 'Trade, area, value, urgency, source proof. You decide in seconds whether to chase it.',
  },
];

const freeTools = [
  { name: 'Quote Calculator', desc: 'Rough job cost in 30 seconds.', to: '/free-tools' },
  { name: 'Diesel Calculator', desc: 'Real site visit fuel cost.', to: '/free-tools' },
  { name: 'Area Scan', desc: 'See what work is active near you.', to: '/free-tools' },
];

const proofRows = [
  ['Trade', 'Electrical'],
  ['Area', 'B14 / West Midlands'],
  ['Value', 'Strong-value job'],
  ['Urgency', 'Deadline locked'],
  ['Source', 'Official source proof'],
  ['Action', 'Unlock on Pro'],
];

export function HomePage() {
  return (
    <main>
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="border-b-2 border-[var(--navy)] bg-[var(--paper)]" style={{ padding: '96px 0' }}>
        <div className="page-shell grid gap-12 lg:grid-cols-[1fr_420px] lg:items-center">
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
            <p className="mt-6 max-w-xl text-[17px] font-medium leading-[1.55] text-[var(--navy)]">
              JobFilter finds real jobs, scores them automatically, and puts work worth pricing in front of you — before you waste another evening quoting someone who was never serious.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/intake-test" className="jf-button bg-[var(--yellow)] text-[var(--navy)]">
                See the Intake Engine →
              </Link>
              <Link to="/free-tools" className="jf-button bg-[var(--paper)] text-[var(--navy)]">
                Or try the free tools →
              </Link>
            </div>
          </div>
          <LeadProofCard />
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

      {/* ── What We Do ───────────────────────────────── */}
      <section id="what" style={{ background: 'var(--paper)', padding: '96px 0' }}>
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
          <div className="mt-8">
            <Link to="/intake-test" className="jf-button bg-[var(--yellow)] text-[var(--navy)]">
              See the Intake Engine →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Free Tools ───────────────────────────────── */}
      <section id="tools" style={{ background: 'var(--paper)', padding: '96px 0' }}>
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
              Free Tools
            </span>
            <h2
              className="headline"
              style={{ fontSize: 'clamp(28px, 3.6vw, 42px)', color: 'var(--navy)' }}
            >
              Useful without paying a penny.
            </h2>
            <p className="mt-4 text-[17px] font-medium leading-[1.55] text-[var(--navy)]">
              No login. No card. Just tools that save you time on the tools.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {freeTools.map((t) => (
              <Link
                key={t.name}
                to={t.to}
                className="block p-6"
                style={{
                  border: '2px solid var(--navy)',
                  borderRadius: 4,
                  background: 'var(--offwhite)',
                  boxShadow: '4px 4px 0 var(--navy)',
                  textDecoration: 'none',
                }}
              >
                <h3 className="text-[17px] font-semibold text-[var(--navy)]">{t.name}</h3>
                <p className="mt-2 text-[14px] text-[var(--muted)]">{t.desc}</p>
                <p className="mt-4 text-[13px] font-semibold text-[var(--navy)]">Try it free →</p>
              </Link>
            ))}
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
              to="/intake-test"
              className="jf-button text-[var(--paper)]"
              style={{ borderColor: 'rgba(255,255,255,0.5)', boxShadow: '4px 4px 0 rgba(255,255,255,0.2)' }}
            >
              Try the Intake Engine →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Waitlist CTA ─────────────────────────────── */}
      <section style={{ background: 'var(--paper)', padding: '96px 0' }}>
        <div className="page-shell grid gap-10 lg:grid-cols-[1fr_420px] lg:items-center">
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
              Built in Birmingham. The JobFilter™ Way.
            </h2>
            <p className="mt-4 max-w-lg text-[17px] font-medium leading-[1.55] text-[var(--muted)]">
              Join the launch list. No contract. No card needed. Get the filter link when the next release opens.
            </p>
          </div>
          <WaitlistForm source="home-v3" />
        </div>
      </section>
    </main>
  );
}

function LeadProofCard() {
  return (
    <article
      className="p-6 text-left"
      style={{
        border: '2px solid var(--navy)',
        borderRadius: 4,
        background: 'var(--paper)',
        boxShadow: '8px 8px 0 var(--yellow)',
      }}
    >
      <span
        className="inline-block px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em]"
        style={{
          background: 'var(--offwhite)',
          color: 'var(--muted)',
          border: '1px solid var(--rule)',
          borderRadius: 3,
        }}
      >
        Official Source Proof
      </span>
      <h2 className="mt-4 text-[20px] font-semibold leading-tight text-[var(--navy)]">
        Electrical maintenance tender
      </h2>
      <div className="mt-5 grid gap-3">
        {proofRows.map(([label, value]) => (
          <div
            key={label}
            className="flex items-start justify-between gap-4 pb-2"
            style={{ borderBottom: '1px solid var(--rule)' }}
          >
            <span className="text-[14px] text-[var(--muted)]">{label}</span>
            <span className="text-right text-[14px] font-semibold text-[var(--navy)]">{value}</span>
          </div>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {['Official source', 'High signal', 'Free preview'].map((tag) => (
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
