import { useState } from 'react';
import { Link } from 'react-router-dom';
import { WaitlistForm } from '../components/WaitlistForm';

const toneOptions = ['Plain English', 'Professional', 'Sales-Focused', 'WhatsApp-Ready'];

const historyItems = [
  { title: 'Megaflow 210L Unvented System', tone: 'Plain English', age: '1 hour ago' },
  { title: 'Part P Compliance Notice', tone: 'Professional', age: 'Yesterday' },
  { title: 'Underfloor Heating Spec', tone: 'Sales-Focused', age: '3 days ago' },
];

const capabilities = [
  'Reads spec sheets, compliance docs, manuals',
  'Strips jargon — keeps meaning',
  'Outputs copy your clients actually read',
  'Match tone to job type or platform',
];

export function CodexPage() {
  const [tone, setTone] = useState('Plain English');
  const [hasOutput, setHasOutput] = useState(false);

  return (
    <main className="page-shell grid gap-6 py-8 pb-8">

      {/* ── Hero ────────────────────────────────────── */}
      <section className="jf-box bg-[var(--navy)] p-7 md:p-9 text-white">
        <p className="micro-label text-[var(--yellow)]">CODEX ENGINE</p>
        <h1 className="headline mt-3 max-w-5xl text-5xl leading-none md:text-7xl text-[var(--yellow)]">
          TECHNICAL WORK. CLIENT-READY COPY.
        </h1>
        <p className="mt-5 max-w-2xl text-xl font-black text-white/80">
          Paste your spec sheets, compliance docs, or technical notes. Codex strips the jargon and writes plain English your clients understand and trust.
        </p>
      </section>

      {/* ── Input + Output ──────────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">

        {/* Left: Input + Output */}
        <div className="flex flex-col gap-6">

          {/* Technical input */}
          <div className="jf-box bg-white p-6">
            <h3 className="headline text-xl text-[var(--navy)]">TECHNICAL INPUT</h3>
            <p className="mt-2 text-[15px] text-[var(--muted)]">
              Paste spec sheets, manuals, compliance docs, or any technical text.
            </p>
            <textarea
              rows={6}
              placeholder={`e.g. "Megaflow 210L unvented cylinder. G3 compliant. Max working pressure 3 bar. Requires tundish and PRV discharge pipework to BS 6700..."`}
              className="field-input mt-4 w-full resize-none"
            />

            {/* Tone control */}
            <div className="mt-5">
              <p className="micro-label text-[var(--muted)] mb-3">OUTPUT TONE</p>
              <div className="flex flex-wrap gap-2">
                {toneOptions.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`px-4 py-2 text-sm font-black uppercase border-2 border-[var(--navy)] transition ${
                      tone === t
                        ? 'bg-[var(--navy)] text-[var(--yellow)]'
                        : 'bg-white text-[var(--navy)] hover:bg-[var(--yellow)]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setHasOutput(true)}
              className="jf-button mt-6 w-full bg-[var(--navy)] text-white"
            >
              SIMPLIFY COPY
            </button>
          </div>

          {/* Client-Ready Preview */}
          {hasOutput && (
            <div className="jf-box bg-white p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="headline text-xl text-[var(--navy)]">CLIENT-READY PREVIEW</h3>
                <span className="badge bg-[var(--yellow)] text-[var(--navy)]">
                  {tone}
                </span>
              </div>

              <div className="mb-4 p-4 border-2 border-[var(--navy)] bg-[var(--bg-main)]">
                <p className="micro-label text-[var(--muted)] mb-2">Summary</p>
                <p className="text-[15px] leading-relaxed text-[var(--navy)]">
                  We've fitted a Megaflow 210L hot water cylinder — it stores mains-pressure hot water so you get a proper shower anywhere in the house, no cold spots. It's fully G3 certified and pressure-tested before we left.
                </p>
              </div>

              <div className="mb-5 p-4 border-2 border-[var(--navy)] bg-[var(--bg-main)]">
                <p className="micro-label text-[var(--muted)] mb-2">What the Client Needs to Know</p>
                <ul className="flex flex-col gap-2">
                  {[
                    'Annual service recommended to keep warranty valid',
                    'Expansion vessel checked — set to 3 bar',
                    'Pressure relief valve discharges safely to outside',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[14px] font-black text-[var(--navy)]">
                      <span className="mt-0.5 text-[var(--green)]">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button className="jf-button w-full bg-[var(--navy)] text-white">
                  COPY TEXT
                </button>
                <button className="jf-button w-full bg-[var(--green)] text-white">
                  SEND TO WHATSAPP
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right: History + callout */}
        <div className="flex flex-col gap-6">
          <div className="jf-box bg-[var(--navy)] p-5 text-white">
            <h3 className="headline text-lg text-[var(--yellow)]">RECENT OUTPUTS</h3>
            <div className="mt-4 flex flex-col gap-4">
              {historyItems.map((item) => (
                <div
                  key={item.title}
                  className="cursor-pointer pb-4 border-b-2 border-white/15 last:border-b-0 last:pb-0"
                >
                  <p className="micro-label text-[var(--yellow)]">
                    {item.age}
                  </p>
                  <h4 className="mt-1 text-[14px] font-black uppercase leading-tight text-white">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-xs font-black text-white/90">Tone: {item.tone}</p>
                </div>
              ))}
            </div>
            <button className="mt-5 text-sm font-black text-[var(--yellow)] uppercase tracking-wider">
              View All →
            </button>
          </div>

          <div className="jf-box bg-white p-5">
            <p className="micro-label text-[var(--muted)] mb-3">
              WHAT CODEX DOES
            </p>
            {capabilities.map((item) => (
              <div key={item} className="mb-2 flex items-start gap-3">
                <span className="mt-1 h-2.5 w-2.5 flex-shrink-0 bg-[var(--yellow)] border border-[var(--navy)]" />
                <p className="text-[14px] font-black leading-snug text-[var(--navy)]">{item}</p>
              </div>
            ))}
          </div>

          <div className="jf-box border-4 border-[var(--yellow)] bg-white p-5">
            <p className="micro-label text-[var(--orange)]">FULL ACCESS TEST MODE</p>
            <p className="mt-2 text-lg font-black text-[var(--ink)]">Codex is unlocked for testing.</p>
            <p className="mt-1 font-black text-[var(--muted)]">Paste text, generate an output, and test WhatsApp-ready copy without a paywall.</p>
            <Link to="/dev-portal" className="mt-3 inline-block text-sm font-black uppercase text-[var(--navy)] underline underline-offset-2">Open dev portal →</Link>
          </div>
        </div>
      </div>

      {/* ── CTA ───────────────────────────────────── */}
      <section className="grid gap-6 lg:grid-cols-[1fr_420px] lg:items-start">
        <div className="jf-box bg-[var(--yellow)] p-7">
          <p className="micro-label text-[var(--ink)]">TEST NOW</p>
          <h2 className="headline mt-3 text-4xl leading-none md:text-5xl text-[var(--ink)]">
            TURN TECHNICAL WORK INTO SALES ASSETS.
          </h2>
          <p className="mt-4 max-w-2xl text-lg font-black text-[var(--ink)]">
            Codex takes the stuff only you understand and turns it into plain English that closes jobs. No copywriter. No waffle.
          </p>
          <Link to="/dev-portal" className="jf-button mt-6 bg-[var(--navy)] text-white">
            OPEN FULL ACCESS DEV PORTAL →
          </Link>
        </div>
        <WaitlistForm source="codex" />
      </section>
    </main>
  );
}


