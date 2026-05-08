import { useState } from 'react';
import { Link } from 'react-router-dom';
import { WaitlistForm } from '../components/WaitlistForm';

const toneOptions = ['Plain English', 'Professional', 'Sales-Focused', 'WhatsApp-Ready'];

const historyItems = [
  { title: 'Megaflow 210L Unvented System', tone: 'Plain English', age: '1 hour ago' },
  { title: 'Part P Compliance Notice', tone: 'Professional', age: 'Yesterday' },
  { title: 'Underfloor Heating Spec', tone: 'Sales-Focused', age: '3 days ago' },
];

export function CodexPage() {
  const [tone, setTone] = useState('Plain English');
  const [hasOutput, setHasOutput] = useState(false);

  return (
    <main style={{ background: 'var(--offwhite)', minHeight: '100vh' }} className="pb-24 md:pb-0">

      {/* ── Hero image band ──────────────────────── */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: 260, borderBottom: '2px solid var(--navy)' }}
      >
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80"
          alt="Tradesman at work"
          className="h-full w-full object-cover"
          style={{ objectPosition: 'center 40%' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(14,26,43,0.85) 0%, rgba(14,26,43,0.4) 60%, transparent 100%)' }}
        />
        <div className="absolute inset-0 flex items-end p-8">
          <div>
            <span
              className="mb-3 inline-block px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em]"
              style={{ background: 'var(--yellow)', color: 'var(--navy)', border: '2px solid var(--navy)' }}
            >
              Codex™ Engine
            </span>
            <h1
              className="headline text-white"
              style={{ fontSize: 'clamp(32px, 5vw, 60px)', lineHeight: 1.0 }}
            >
              Built for the Tools.
              <br />
              <span style={{ color: 'var(--yellow)' }}>Written for the Client.</span>
            </h1>
          </div>
        </div>
      </div>

      <div className="page-shell py-10">

        {/* ── Bento grid ────────────────────────────── */}
        <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_360px]">

          {/* Left: Input + Output */}
          <div className="flex flex-col gap-6">

            {/* Technical input */}
            <div
              className="p-6"
              style={{
                background: 'var(--paper)',
                border: '2px solid var(--navy)',
                boxShadow: '8px 8px 0 var(--yellow)',
              }}
            >
              <h3 className="headline mb-1 text-[18px] uppercase text-[var(--navy)]">Technical Input</h3>
              <p className="mb-4 text-[13px] text-[var(--muted)]">
                Paste spec sheets, manuals, compliance docs, or any technical text.
              </p>
              <textarea
                rows={6}
                placeholder={`e.g. "Megaflow 210L unvented cylinder. G3 compliant. Max working pressure 3 bar. Requires tundish and PRV discharge pipework to BS 6700..."`}
                className="w-full resize-none px-4 py-3 text-[15px] text-[var(--navy)] outline-none"
                style={{
                  border: '2px solid var(--navy)',
                  background: 'var(--offwhite)',
                  fontFamily: 'Barlow, sans-serif',
                }}
              />

              {/* Tone control */}
              <div className="mt-4">
                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--navy)]">Tone</p>
                <div className="flex flex-wrap gap-2">
                  {toneOptions.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTone(t)}
                      className="px-3 py-1 text-[12px] font-bold uppercase transition-all"
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        letterSpacing: '0.04em',
                        border: '2px solid var(--navy)',
                        background: tone === t ? 'var(--navy)' : 'var(--paper)',
                        color: tone === t ? 'var(--yellow)' : 'var(--navy)',
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setHasOutput(true)}
                className="mt-5 flex w-full cursor-pointer items-center justify-center gap-3 px-8 py-4 transition-all active:translate-x-[2px] active:translate-y-[2px]"
                style={{
                  background: 'var(--navy)',
                  color: 'var(--paper)',
                  border: '2px solid var(--navy)',
                  boxShadow: '4px 4px 0 var(--yellow)',
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: 16,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                ⚡ Simplify Copy
              </button>
            </div>

            {/* Client-Ready Preview */}
            {hasOutput && (
              <div
                className="p-6"
                style={{
                  background: 'var(--paper)',
                  border: '2px solid var(--navy)',
                  boxShadow: '8px 8px 0 var(--yellow)',
                }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="headline text-[18px] uppercase text-[var(--navy)]">Client-Ready Preview</h3>
                  <span
                    className="px-2 py-1 text-[11px] font-bold uppercase tracking-[0.1em]"
                    style={{ background: 'var(--yellow)', border: '2px solid var(--navy)', color: 'var(--navy)' }}
                  >
                    {tone}
                  </span>
                </div>

                <div
                  className="mb-4 p-4"
                  style={{ background: 'var(--offwhite)', border: '2px solid var(--navy)' }}
                >
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--muted)]">Summary</p>
                  <p className="text-[15px] leading-relaxed text-[var(--navy)]">
                    We've fitted a Megaflow 210L hot water cylinder — it stores mains-pressure hot water so you get a proper shower anywhere in the house, no cold spots. It's fully G3 certified and pressure-tested before we left.
                  </p>
                </div>

                <div
                  className="mb-5 p-4"
                  style={{ background: 'var(--offwhite)', border: '2px solid var(--navy)' }}
                >
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--muted)]">What the Client Needs to Know</p>
                  <ul className="flex flex-col gap-1">
                    {[
                      'Annual service recommended to keep warranty valid',
                      'Expansion vessel checked — set to 3 bar',
                      'Pressure relief valve discharges safely to outside',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[14px] text-[var(--navy)]">
                        <span style={{ color: 'var(--navy)', fontWeight: 900, marginTop: 2 }}>▶</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    className="flex w-full cursor-pointer items-center justify-center gap-2 px-6 py-3 transition-all active:translate-y-[1px]"
                    style={{
                      background: 'var(--navy)',
                      color: 'var(--paper)',
                      border: '2px solid var(--navy)',
                      boxShadow: '4px 4px 0 var(--yellow)',
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700,
                      fontSize: 14,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                    }}
                  >
                    📋 Copy Text
                  </button>
                  <button
                    className="flex w-full cursor-pointer items-center justify-center gap-2 px-6 py-3 transition-all active:translate-y-[1px]"
                    style={{
                      background: '#25D366',
                      color: 'white',
                      border: '2px solid var(--navy)',
                      boxShadow: '4px 4px 0 var(--navy)',
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700,
                      fontSize: 14,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                    }}
                  >
                    💬 Send to Leads
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right: History + callout */}
          <div className="flex flex-col gap-6">
            <div
              className="p-6"
              style={{
                background: 'var(--navy)',
                border: '2px solid var(--navy)',
                boxShadow: '8px 8px 0 var(--yellow)',
              }}
            >
              <h3 className="headline mb-6 text-[18px] uppercase text-[var(--yellow)]">History</h3>
              <div className="flex flex-col gap-4">
                {historyItems.map((item) => (
                  <div
                    key={item.title}
                    className="cursor-pointer pb-4"
                    style={{ borderBottom: '2px solid rgba(255,255,255,0.15)' }}
                  >
                    <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--yellow)]">
                      {item.age}
                    </p>
                    <h4 className="text-[13px] font-bold uppercase leading-tight text-white">
                      {item.title}
                    </h4>
                    <p className="text-[10px] uppercase text-white/60">Tone: {item.tone}</p>
                  </div>
                ))}
              </div>
              <button
                className="mt-6 flex items-center gap-2 text-[var(--yellow)]"
                style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                View All →
              </button>
            </div>

            <div
              className="p-5"
              style={{
                background: 'var(--paper)',
                border: '2px solid var(--navy)',
                boxShadow: '6px 6px 0 var(--yellow)',
              }}
            >
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--muted)]">
                What Codex™ Does
              </p>
              {[
                'Reads spec sheets, compliance docs, manuals',
                'Strips jargon — keeps meaning',
                'Outputs copy your clients actually read',
                'Match tone to job type or platform',
              ].map((item) => (
                <div key={item} className="mb-2 flex items-start gap-2">
                  <span
                    className="mt-[3px] h-3 w-3 flex-shrink-0"
                    style={{ background: 'var(--yellow)', border: '2px solid var(--navy)' }}
                  />
                  <p className="text-[13px] leading-snug text-[var(--navy)]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── CTA ───────────────────────────────────── */}
        <section className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
          <div
            className="p-7"
            style={{
              background: 'var(--paper)',
              border: '2px solid var(--navy)',
              boxShadow: '8px 8px 0 var(--yellow)',
            }}
          >
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
              Coming soon
            </p>
            <h2 className="headline text-[clamp(24px,3vw,36px)] uppercase text-[var(--navy)]">
              Turn technical work into sales assets.
            </h2>
            <p className="mt-3 text-[16px] leading-relaxed text-[var(--muted)]">
              Codex™ takes the stuff only you understand and turns it into plain English that closes jobs. No copywriter. No waffle.
            </p>
            <Link to="/intake-test" className="jf-button mt-6 inline-flex bg-[var(--yellow)] text-[var(--navy)]">
              Join waitlist for early access →
            </Link>
          </div>
          <WaitlistForm source="codex" />
        </section>
      </div>

    </main>
  );
}
