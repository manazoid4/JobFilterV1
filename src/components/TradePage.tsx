import { Link } from 'react-router-dom';

export interface TradePageData {
  slug: string;
  trade: string;
  tradePlural: string;
  headline: string;
  highlightedPhrase: string;
  sub: string;
  painPoints: [string, string][];
  signals: [string, string][];
  stats: [string, string][];
  howItWorks: [string, string, string][];
  tradeLeadExample: {
    title: string;
    rows: [string, string][];
    tags: string[];
  };
  whatsappMessage: string;
  comparisonOld: string[];
  comparisonNew: string[];
  ctaPostcode: string;
  metaTitle: string;
  metaDescription: string;
}

const ALL_TRADES = [
  { slug: 'plumbers', label: 'Plumbers' },
  { slug: 'electricians', label: 'Electricians' },
  { slug: 'builders', label: 'Builders' },
  { slug: 'heat-pump-installers', label: 'Heat Pump Installers' },
  { slug: 'roofers', label: 'Roofers' },
];

export function TradePage({ data }: { data: TradePageData }) {
  return (
    <main className="pb-8">
      {/* SEO meta */}
      <title>{data.metaTitle}</title>
      <meta name="description" content={data.metaDescription} />

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="bg-[var(--yellow)] soft-grid border-b-4 border-[var(--line)]">
        <div className="page-shell section-pad">
          <span className="micro-label" style={{ display: 'block', marginBottom: 14, color: 'var(--muted)' }}>
            JOBFILTER FOR {data.tradePlural.toUpperCase()}
          </span>
          <h1 className="headline" style={{ fontSize: 'clamp(36px, 7vw, 88px)', lineHeight: 0.96, color: 'var(--navy)' }}>
            {data.headline.split(data.highlightedPhrase).map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && (
                  <span style={{ background: 'var(--navy)', color: 'var(--yellow)', display: 'inline-block', padding: '0 12px 4px', lineHeight: 1.05 }}>
                    {data.highlightedPhrase}
                  </span>
                )}
              </span>
            ))}
          </h1>
          <p className="mt-4 max-w-2xl text-xl font-black leading-tight text-[var(--ink)]/80">
            {data.sub}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link className="jf-button bg-[var(--ink)] text-white" to={`/find-jobs?trade=${data.slug}&postcode=${data.ctaPostcode}`}>SCAN {data.trade.toUpperCase()} JOBS FREE</Link>
            <Link className="jf-button bg-white text-[var(--ink)]" to="#how-it-works">SEE HOW IT WORKS</Link>
          </div>
          <div className="mt-7 grid gap-2 text-sm font-black text-[var(--ink)] sm:grid-cols-2">
            <p>NO CHASING</p>
            <p>NO COMPETING</p>
            <p>REAL UK LEADS</p>
            <p>STAY IN CONTROL</p>
          </div>
        </div>
      </section>

      {/* ── THE PROBLEM ──────────────────────────────── */}
      <section className="bg-white">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--orange)]">THE PROBLEM {data.tradePlural.toUpperCase()} FACE</p>
          <h2 className="headline mt-3 max-w-4xl text-4xl leading-[0.9] sm:text-6xl md:text-7xl">YOU'RE WAITING FOR WORK INSTEAD OF FINDING IT.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {data.painPoints.map(([title, body]) => (
              <div key={title} className="jf-box bg-[var(--bg-main)] p-5">
                <h3 className="headline text-xl text-[var(--orange)]">{title.toUpperCase()}</h3>
                <p className="mt-3 font-black text-[var(--muted)] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRADE STATS ──────────────────────────────── */}
      <section className="border-y-4 border-[var(--line)] bg-[var(--navy)] text-white">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--yellow)]">THE NUMBERS DON'T LIE</p>
          <h2 className="headline mt-3 max-w-4xl text-4xl leading-[0.9] sm:text-6xl text-[var(--yellow)]">THE MARKET IS MOVING. MOST {data.tradePlural.toUpperCase()} AREN'T.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {data.stats.map(([num, label]) => (
              <div key={label} className="jf-box bg-white/10 p-5 text-center">
                <p className="headline text-4xl text-[var(--yellow)]">{num}</p>
                <p className="mt-2 font-black text-white/70 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────── */}
      <section id="how-it-works" className="bg-white">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--orange)]">HOW IT WORKS FOR {data.tradePlural.toUpperCase()}</p>
          <h2 className="headline mt-3 max-w-4xl text-4xl leading-[0.9] sm:text-6xl">THREE STEPS. REAL JOBS. NO BULLSHIT.</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {data.howItWorks.map(([step, title, body]) => (
              <div key={step} className="jf-box bg-[var(--bg-main)] p-6">
                <span className="headline block text-5xl text-[var(--navy)]">{step}</span>
                <h3 className="mt-3 headline text-xl text-[var(--navy)]">{title}</h3>
                <p className="mt-2 font-black text-[var(--muted)] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEAD PREVIEW ─────────────────────────────── */}
      <section className="border-y-4 border-[var(--line)] bg-[var(--yellow)]">
        <div className="page-shell section-pad grid gap-8 lg:grid-cols-[1fr_420px] lg:items-center">
          <div>
            <p className="micro-label text-[var(--ink)]">WHAT A {data.trade.toUpperCase()} LEAD LOOKS LIKE</p>
            <h2 className="headline mt-3 max-w-4xl text-4xl leading-[0.9] sm:text-6xl">THIS IS WHAT HITS YOUR SCREEN BEFORE ANYONE ELSE SEES IT.</h2>
            <p className="mt-5 max-w-2xl text-xl font-black text-[var(--ink)]/75">
              Not a form submission. Not a shared lead. An official signal — scored, filtered, and sent to you because it matches your trade.
            </p>
          </div>
          <div className="jf-box bg-white p-5">
            <p className="micro-label text-[var(--green)]">GOLD LEAD</p>
            <h3 className="mt-3 text-xl font-black leading-tight">{data.tradeLeadExample.title}</h3>
            <div className="mt-4 grid gap-3 text-sm">
              {data.tradeLeadExample.rows.map(([label, value]) => (
                <div key={label} className="flex items-start justify-between gap-4 border-b-2 border-[var(--line)] pb-2 last:border-b-0">
                  <span className="font-black text-[var(--muted)]">{label}</span>
                  <span className="text-right font-black">{value}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {data.tradeLeadExample.tags.map((tag) => (
                <span key={tag} className="px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.06em]" style={{ background: 'var(--offwhite)', color: 'var(--navy)', border: '1px solid var(--rule)', borderRadius: 3 }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SIGNALS ──────────────────────────────────── */}
      <section className="bg-white">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--orange)]">WHERE THE JOBS COME FROM</p>
          <h2 className="headline mt-3 max-w-4xl text-4xl leading-[0.9] sm:text-6xl">THREE SOURCES. {data.tradePlural.toUpperCase()}-SPECIFIC SIGNALS.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {data.signals.map(([title, body]) => (
              <div key={title} className="jf-box bg-[var(--bg-main)] p-5">
                <h3 className="headline text-2xl text-[var(--navy)]">{title}</h3>
                <p className="mt-3 font-black text-[var(--muted)] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHATSAPP PREVIEW ─────────────────────────── */}
      <section className="border-y-4 border-[var(--line)] bg-[var(--ink)] text-white">
        <div className="page-shell section-pad grid gap-8 lg:grid-cols-[1fr_420px] lg:items-center">
          <div>
            <p className="micro-label text-[var(--yellow)]">WHATSAPP BODYGUARD</p>
            <h2 className="headline mt-3 max-w-4xl text-4xl leading-[0.9] sm:text-6xl text-[var(--yellow)]">GOLD LEADS HIT YOUR PHONE. NOT YOUR INBOX. NOT A DASHBOARD.</h2>
            <p className="mt-5 max-w-2xl text-xl font-black text-white/80">
              When a job scores Gold for your trade, it fires to WhatsApp within minutes. You're on the tools — you don't need another app to check.
            </p>
            <div className="mt-6 grid gap-3 text-sm font-black text-white/70 sm:grid-cols-3">
              <p>98% OPEN RATE</p>
              <p>WITHIN MINUTES</p>
              <p>BEFORE THE COMPETITION</p>
            </div>
          </div>
          <div className="jf-box bg-white/10 p-5">
            <p className="micro-label text-[var(--yellow)]">WHATSAPP ALERT — AS IT ARRIVES</p>
            <div className="mt-4 rounded-lg bg-[#0B141A] p-4 font-mono text-sm leading-relaxed">
              <div className="mb-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[var(--green)]"></span>
                <span className="text-xs font-black text-[var(--green)]">JobFilter</span>
                <span className="text-xs text-white/40">14:32</span>
              </div>
              <pre className="whitespace-pre-wrap text-white/90">{data.whatsappMessage}</pre>
            </div>
            <p className="mt-3 text-xs font-black text-white/50">This is what hits your phone. One tap. You're on the job.</p>
          </div>
        </div>
      </section>

      {/* ── OLD WAY vs JOBFILTER ─────────────────────── */}
      <section className="border-y-4 border-[var(--line)] bg-[var(--bg-main)]">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--orange)]">THE OLD WAY vs JOBFILTER</p>
          <h2 className="headline mt-3 max-w-4xl text-4xl leading-[0.9] sm:text-6xl">THEY SELL YOUR ATTENTION. WE PROTECT IT.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="jf-box border-4 border-[var(--line)] bg-white p-6">
              <h3 className="headline text-2xl text-[var(--orange)]">THE OLD WAY — CHECKATRADE, MYBUILDER, BARK</h3>
              <ul className="mt-4 grid gap-3 font-black text-[var(--muted)]">
                {data.comparisonOld.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="jf-box border-4 border-[var(--green)] bg-[var(--yellow)] p-6">
              <h3 className="headline text-2xl text-[var(--ink)]">JOBFILTER</h3>
              <ul className="mt-4 grid gap-3 font-black text-[var(--ink)]">
                {data.comparisonNew.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── OTHER TRADES ─────────────────────────────── */}
      <section className="bg-white border-y-4 border-[var(--line)]">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--orange)]">BUILT FOR EVERY TRADE</p>
          <h2 className="headline mt-3 max-w-4xl text-4xl leading-[0.9] sm:text-6xl">NOT JUST {data.tradePlural.toUpperCase()}. EVERY TRADE.</h2>
          <p className="mt-4 max-w-2xl text-lg font-black text-[var(--muted)]">
            JobFilter scans planning data, EPC signals, and council contracts — then filters by your trade. Whatever you do, there's work waiting.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {ALL_TRADES.filter((t) => t.slug !== data.slug).map((t) => (
              <Link key={t.slug} to={`/trade/${t.slug}`} className="jf-box bg-[var(--bg-main)] p-4 block hover:bg-[var(--yellow)] transition-colors">
                <h3 className="headline text-xl text-[var(--navy)]">{t.label}</h3>
                <p className="mt-1 text-sm font-black text-[var(--muted)]">See how {t.label.toLowerCase()} find work early →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────── */}
      <section className="bg-[var(--yellow)] border-y-4 border-[var(--line)]">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--ink)]">FOUNDING 30</p>
          <h2 className="headline mt-3 max-w-4xl text-4xl leading-[0.9] sm:text-6xl md:text-7xl">£39/mo ALL-IN. ONE {data.trade.toUpperCase()} JOB COVERS IT.</h2>
          <p className="mt-5 max-w-2xl text-xl font-black text-[var(--ink)]/75">
            Free shows you the signals. Founding 30 unlocks full details, WhatsApp alerts, source proof, and buyer names. 30-day money-back. No quibbles.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="jf-box bg-white p-6">
              <h3 className="headline text-xl text-[var(--navy)]">FREE</h3>
              <p className="mt-2 font-black text-[var(--muted)]">See the signals. Know what's out there. No card needed.</p>
              <p className="mt-3 text-sm font-black text-[var(--muted)]">Preview leads only</p>
            </div>
            <div className="jf-box bg-[var(--navy)] p-6 text-white">
              <p className="micro-label text-[var(--yellow)]">FOUNDING 30</p>
              <h3 className="headline mt-2 text-3xl text-[var(--yellow)]">£39/mo</h3>
              <p className="mt-1 text-sm font-black text-[var(--yellow)]/70">(founder price, locked while active)</p>
              <p className="mt-2 font-black text-white/80">Full access. WhatsApp alerts. Source links. Locked price forever.</p>
              <ul className="mt-4 grid gap-2 text-sm font-black text-white/70">
                <li>Full lead details unlocked</li>
                <li>WhatsApp gold alerts</li>
                <li>Official source proof links</li>
                <li>Buyer names & deadlines</li>
                <li>Price locked — never rises</li>
              </ul>
              <Link className="jf-button mt-5 bg-[var(--yellow)] text-[var(--ink)]" to="/pricing">GET FOUNDING 30</Link>
            </div>
            <div className="jf-box bg-white p-6">
              <h3 className="headline text-xl text-[var(--navy)]">PRO — £79/mo</h3>
              <p className="mt-2 font-black text-[var(--muted)]">Everything in Founding 30 plus Letterhead Pack and multi-trade scanning.</p>
              <p className="mt-3 text-sm font-black text-[var(--muted)]">For growing businesses</p>
            </div>
          </div>
          <p className="mt-6 font-black text-[var(--ink)]/60">30-DAY MONEY-BACK GUARANTEE. NO QUIBBLES. NO HOOPS.</p>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────── */}
      <section className="bg-[var(--navy)] text-white">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--yellow)]">ENTER THE INTAKE</p>
          <h2 className="headline mt-3 max-w-4xl text-4xl leading-[0.9] sm:text-6xl md:text-7xl text-white">
            STOP WAITING.{' '}
            <span style={{ color: 'var(--yellow)' }}>START FILTERING.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-xl font-black text-white/70">
            Scan your area free. See what {data.trade} work is active near you — before it hits the directories. No card needed. No signup wall. Just results.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link className="jf-button bg-[var(--yellow)] text-[var(--ink)]" to={`/find-jobs?trade=${data.slug}&postcode=${data.ctaPostcode}`}>SCAN {data.trade.toUpperCase()} JOBS FREE</Link>
            <Link className="jf-button bg-white text-[var(--ink)]" to="/pricing">GET FOUNDING 30 — £39/mo</Link>
          </div>
          <p className="mt-6 text-sm font-black text-white/50">BUILT FOR TRADES. NO CONTRACTS. FAIR SYSTEM.</p>
        </div>
      </section>
    </main>
  );
}



