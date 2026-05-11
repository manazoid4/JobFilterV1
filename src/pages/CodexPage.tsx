import { Link } from 'react-router-dom';
import {
  FileText,
  MessageSquare,
  Zap,
  Copy,
  CheckCircle,
  ShieldCheck,
  FileCheck,
  Send,
} from 'lucide-react';

/* ── DATA ─────────────────────────────────────────────── */

const problemExamples = [
  {
    raw: 'Megaflow 210L unvented cylinder. G3 compliant. Max working pressure 3 bar. Requires tundish and PRV discharge pipework to BS 6700.',
    label: 'Plumbing spec',
  },
  {
    raw: 'Part P compliance notice: all fixed wiring installations must be verified and certified under BS 7671:2018 Amendment 2 prior to handover.',
    label: 'Electrical compliance',
  },
  {
    raw: 'Underfloor heating spec: 16mm multilayer composite pipe, 200mm centres, 6kW output at ΔT 10°C, manifold balanced to ±5% flow tolerance.',
    label: 'Heating spec',
  },
];

const solutionExamples = [
  {
    plain: "We've fitted a high-pressure hot water cylinder that gives you proper showers everywhere in the house — no weak flow, no cold spots. Fully certified and pressure-tested before we left.",
    label: 'Plumbing spec → Plain English',
  },
  {
    plain: 'Your electrics are fully certified and safe. All wiring has been tested against the latest safety standards and signed off before handover.',
    label: 'Electrical compliance → Plain English',
  },
  {
    plain: 'Warm floors throughout — no cold spots. The underfloor heating is balanced room by room so every area heats evenly.',
    label: 'Heating spec → Plain English',
  },
];

const howItWorksSteps = [
  {
    num: '01',
    title: 'Paste technical text',
    body: 'Drop in spec sheets, compliance notices, manuals, or any jargon-heavy copy.',
    Icon: FileText,
  },
  {
    num: '02',
    title: 'Pick your tone',
    body: 'Plain English, Professional, Sales-Focused, or WhatsApp-Ready.',
    Icon: MessageSquare,
  },
  {
    num: '03',
    title: 'Codex simplifies',
    body: 'Jargon stripped. Meaning kept. Client-ready in seconds.',
    Icon: Zap,
  },
  {
    num: '04',
    title: 'Copy and send',
    body: 'One click to clipboard. Paste straight into WhatsApp, email, or your quote.',
    Icon: Copy,
  },
];

const useCases = [
  {
    title: 'Compliance Reports',
    body: 'Turn building regulation notices into client-friendly updates they actually read.',
    Icon: ShieldCheck,
  },
  {
    title: 'Job Quotes',
    body: 'Explain scope and materials without losing them in jargon.',
    Icon: FileCheck,
  },
  {
    title: 'WhatsApp Updates',
    body: 'Daily progress reports your clients understand and appreciate.',
    Icon: Send,
  },
];

const features = [
  { title: 'Reads spec sheets and manuals', Icon: FileText },
  { title: 'Strips jargon, keeps meaning', Icon: Zap },
  { title: 'Matches tone to platform', subtitle: 'Email, WhatsApp, formal letter', Icon: MessageSquare },
  { title: 'Explains compliance in plain English', Icon: ShieldCheck },
  { title: 'Generates client-ready summaries', Icon: FileCheck },
  { title: 'Copies instantly to clipboard', Icon: Copy },
];

/* ── SVG COMPONENTS ───────────────────────────────────── */

function HeroIllustration() {
  return (
    <svg viewBox="0 0 480 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-md mx-auto mt-6">
      {/* Document with technical symbols */}
      <rect x="20" y="20" width="140" height="180" rx="4" stroke="var(--ink)" strokeWidth="2.5" fill="var(--paper)" />
      <line x1="40" y1="50" x2="140" y2="50" stroke="var(--ink)" strokeWidth="2" />
      <line x1="40" y1="70" x2="130" y2="70" stroke="var(--muted)" strokeWidth="1.5" strokeDasharray="4 3" />
      <line x1="40" y1="85" x2="120" y2="85" stroke="var(--muted)" strokeWidth="1.5" strokeDasharray="4 3" />
      <text x="40" y="48" fill="var(--ink)" fontSize="10" fontWeight="800" fontFamily="Barlow Condensed, sans-serif">BS 6700</text>
      <text x="40" y="110" fill="var(--orange)" fontSize="9" fontWeight="800" fontFamily="Barlow Condensed, sans-serif">G3 COMPLIANT</text>
      <text x="40" y="128" fill="var(--muted)" fontSize="8" fontWeight="700" fontFamily="Barlow Condensed, sans-serif">3 BAR MAX</text>
      <text x="40" y="146" fill="var(--muted)" fontSize="8" fontWeight="700" fontFamily="Barlow Condensed, sans-serif">PRV DISCHARGE</text>
      <rect x="40" y="158" width="60" height="14" rx="2" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="1.5" />
      <text x="48" y="169" fill="var(--ink)" fontSize="7" fontWeight="800" fontFamily="Barlow Condensed, sans-serif">SPEC</text>

      {/* Arrow */}
      <line x1="175" y1="110" x2="225" y2="110" stroke="var(--yellow)" strokeWidth="3" />
      <polygon points="225,102 245,110 225,118" fill="var(--yellow)" />
      <text x="185" y="100" fill="var(--yellow)" fontSize="9" fontWeight="800" fontFamily="Barlow Condensed, sans-serif">CODEX</text>

      {/* Simple text bubble */}
      <rect x="260" y="30" width="200" height="160" rx="4" stroke="var(--ink)" strokeWidth="2.5" fill="var(--paper)" />
      <text x="280" y="60" fill="var(--ink)" fontSize="11" fontWeight="800" fontFamily="Barlow Condensed, sans-serif">PLAIN ENGLISH</text>
      <line x1="280" y1="72" x2="440" y2="72" stroke="var(--yellow)" strokeWidth="2" />
      <text x="280" y="92" fill="var(--ink)" fontSize="9" fontWeight="600" fontFamily="Barlow, sans-serif">"We've fitted a high-</text>
      <text x="280" y="106" fill="var(--ink)" fontSize="9" fontWeight="600" fontFamily="Barlow, sans-serif">pressure hot water cylinder</text>
      <text x="280" y="120" fill="var(--ink)" fontSize="9" fontWeight="600" fontFamily="Barlow, sans-serif">that gives you proper</text>
      <text x="280" y="134" fill="var(--ink)" fontSize="9" fontWeight="600" fontFamily="Barlow, sans-serif">showers everywhere."</text>
      <rect x="280" y="150" width="80" height="18" rx="2" fill="var(--green)" stroke="var(--ink)" strokeWidth="1.5" />
      <text x="290" y="163" fill="var(--ink)" fontSize="8" fontWeight="800" fontFamily="Barlow Condensed, sans-serif">CLIENT-READY</text>
    </svg>
  );
}

function ConfusedClientSVG() {
  return (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[200px] mx-auto">
      {/* Speech bubble */}
      <rect x="30" y="10" width="140" height="80" rx="6" stroke="var(--ink)" strokeWidth="2.5" fill="var(--paper)" />
      <polygon points="70,90 85,110 95,90" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2.5" />
      <text x="55" y="40" fill="var(--orange)" fontSize="28" fontWeight="900" fontFamily="Barlow Condensed, sans-serif">???</text>
      <text x="50" y="65" fill="var(--muted)" fontSize="9" fontWeight="700" fontFamily="Barlow Condensed, sans-serif">WHAT DOES</text>
      <text x="50" y="78" fill="var(--muted)" fontSize="9" fontWeight="700" fontFamily="Barlow Condensed, sans-serif">THIS MEAN?</text>
      {/* Person silhouette */}
      <circle cx="100" cy="130" r="14" stroke="var(--ink)" strokeWidth="2.5" fill="var(--paper)" />
      <line x1="100" y1="144" x2="100" y2="155" stroke="var(--ink)" strokeWidth="2.5" />
    </svg>
  );
}

function TimelineConnector() {
  return (
    <svg viewBox="0 0 100 4" fill="none" xmlns="http://www.w3.org/2000/svg" className="hidden md:block w-full h-1">
      <line x1="0" y1="2" x2="100" y2="2" stroke="var(--yellow)" strokeWidth="3" strokeDasharray="8 4" />
    </svg>
  );
}

function WhatsAppChat() {
  return (
    <div className="flex flex-col gap-3 max-w-md mx-auto">
      {/* Trade message (left-aligned) */}
      <div className="self-start max-w-[85%]">
        <p className="micro-label text-[var(--muted)] mb-1">YOU (TRADE)</p>
        <div className="bg-white border-2 border-[var(--line)] p-3 rounded-sm shadow-[3px_3px_0_var(--yellow)]">
          <p className="text-sm font-bold text-[var(--ink)] leading-snug">
            Megaflow 210L unvented cylinder. G3 compliant. Max working pressure 3 bar. Requires tundish and PRV discharge pipework to BS 6700.
          </p>
        </div>
      </div>

      {/* Codex output (centered, yellow accent) */}
      <div className="self-center max-w-[90%]">
        <p className="micro-label text-[var(--yellow)] mb-1 text-center">CODEX OUTPUT</p>
        <div className="bg-[var(--yellow)] border-2 border-[var(--line)] p-3 rounded-sm shadow-[3px_3px_0_var(--ink)]">
          <p className="text-sm font-bold text-[var(--ink)] leading-snug">
            We've fitted a high-pressure hot water cylinder that gives you proper showers everywhere in the house — no weak flow, no cold spots. Fully certified and pressure-tested before we left.
          </p>
        </div>
      </div>

      {/* Client response (right-aligned) */}
      <div className="self-end max-w-[75%]">
        <p className="micro-label text-[var(--green)] mb-1 text-right">CLIENT</p>
        <div className="bg-[var(--green)] border-2 border-[var(--line)] p-3 rounded-sm shadow-[3px_3px_0_var(--ink)]">
          <p className="text-sm font-bold text-white leading-snug">
            Thanks, that makes sense! 👍
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── PAGE ──────────────────────────────────────────────── */

export function CodexPage() {
  return (
    <main className="page-shell grid gap-0 pb-16">

      {/* ═══ 1. HERO ═══════════════════════════════════════ */}
      <section className="bg-[var(--ink)] py-12 md:py-20 px-6 md:px-12">
        <div className="max-w-[1180px] mx-auto">
          <p className="micro-label text-[var(--yellow)]">CODEX ENGINE</p>
          <h1 className="headline mt-4 max-w-5xl text-5xl leading-none md:text-7xl text-[var(--yellow)]">
            TURN TECHNICAL JARGON INTO CLIENT TRUST.
          </h1>
          <p className="mt-6 max-w-2xl text-lg md:text-xl font-black text-white/80 leading-relaxed">
            Paste your spec sheets, compliance docs, or technical notes. Codex strips the jargon and writes plain English your clients understand — and actually read.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/pricing" className="jf-button jf-button-lg bg-[var(--yellow)] text-[var(--ink)]">
              GET CODEX — FROM £39/MO
            </Link>
            <Link to="/find-jobs" className="jf-button jf-button-lg bg-white text-[var(--ink)]">
              TRY FREE SCAN FIRST
            </Link>
          </div>
          <HeroIllustration />
        </div>
      </section>

      {/* ═══ 2. THE PROBLEM ═══════════════════════════════ */}
      <section className="bg-[var(--paper)] py-12 md:py-16 px-6 md:px-12">
        <div className="max-w-[1180px] mx-auto">
          <p className="micro-label text-[var(--orange)]">THE PROBLEM</p>
          <h2 className="headline mt-3 max-w-4xl text-4xl leading-none md:text-6xl text-[var(--ink)]">
            YOUR CLIENTS DON'T SPEAK BS 6700.
          </h2>
          <p className="mt-4 max-w-2xl copy">
            You know what every line means. Your client sees a wall of acronyms and walks away confused — or worse, walks away entirely.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-[1fr_auto]">
            <div className="flex flex-col gap-4">
              {problemExamples.map((ex) => (
                <div key={ex.label} className="jf-box bg-white p-5">
                  <p className="micro-label text-[var(--orange)] mb-2">{ex.label}</p>
                  <p className="text-sm md:text-[15px] font-bold text-[var(--muted)] leading-relaxed line-clamp-3">
                    {ex.raw}
                  </p>
                </div>
              ))}
            </div>
            <div className="hidden md:flex items-center justify-center">
              <ConfusedClientSVG />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 3. THE SOLUTION ═══════════════════════════════ */}
      <section className="bg-[var(--yellow)] py-12 md:py-16 px-6 md:px-12">
        <div className="max-w-[1180px] mx-auto">
          <p className="micro-label text-[var(--ink)]">THE SOLUTION</p>
          <h2 className="headline mt-3 max-w-4xl text-4xl leading-none md:text-6xl text-[var(--ink)]">
            SAME FACTS. PLAIN ENGLISH. MORE TRUST.
          </h2>
          <p className="mt-4 max-w-2xl text-lg font-black text-[var(--ink)]/75 leading-relaxed">
            Codex keeps every technical detail — but writes it so your client nods instead of glazes over.
          </p>

          <div className="mt-10 flex flex-col gap-4">
            {solutionExamples.map((ex) => (
              <div key={ex.label} className="ops-panel bg-white p-5">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 flex-shrink-0 text-[var(--green)] mt-0.5" strokeWidth={2.5} />
                  <div>
                    <p className="micro-label text-[var(--ink)] mb-1">{ex.label}</p>
                    <p className="text-sm md:text-[15px] font-bold text-[var(--ink)] leading-relaxed">
                      {ex.plain}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 4. HOW IT WORKS ══════════════════════════════ */}
      <section className="bg-[var(--paper)] py-12 md:py-16 px-6 md:px-12">
        <div className="max-w-[1180px] mx-auto">
          <p className="micro-label text-[var(--muted)]">HOW IT WORKS</p>
          <h2 className="headline mt-3 max-w-4xl text-4xl leading-none md:text-6xl text-[var(--ink)]">
            FOUR STEPS. ZERO JARGON.
          </h2>

          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {howItWorksSteps.map((step, i) => {
              const { Icon } = step;
              return (
                <div key={step.num} className="relative">
                  <div className="jf-box bg-white p-6 h-full flex flex-col">
                    <span className="micro-label text-[var(--yellow)]">{step.num}</span>
                    <div className="mt-3 flex h-10 w-10 items-center justify-center border-2 border-[var(--ink)] bg-[var(--yellow)]">
                      <Icon className="h-5 w-5 text-[var(--ink)]" strokeWidth={2.5} />
                    </div>
                    <h3 className="headline mt-4 text-lg text-[var(--ink)]">{step.title}</h3>
                    <p className="mt-2 text-sm font-bold text-[var(--muted)] leading-relaxed">{step.body}</p>
                  </div>
                  {/* Connecting line between cards */}
                  {i < howItWorksSteps.length - 1 && (
                    <div className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10">
                      <svg width="32" height="4" viewBox="0 0 32 4" fill="none">
                        <line x1="0" y1="2" x2="32" y2="2" stroke="var(--yellow)" strokeWidth="3" strokeDasharray="6 4" />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ 5. USE CASES ═════════════════════════════════ */}
      <section className="bg-[var(--ink)] py-12 md:py-16 px-6 md:px-12">
        <div className="max-w-[1180px] mx-auto">
          <p className="micro-label text-[var(--yellow)]">USE CASES</p>
          <h2 className="headline mt-3 max-w-4xl text-4xl leading-none md:text-6xl text-[var(--yellow)]">
            BUILT FOR THE WORK YOU ACTUALLY DO.
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {useCases.map((uc) => {
              const { Icon } = uc;
              return (
                <div key={uc.title} className="border-2 border-[var(--yellow)] bg-[var(--steel)] p-6 shadow-[4px_4px_0_var(--yellow)]">
                  <div className="flex h-12 w-12 items-center justify-center border-2 border-[var(--yellow)] bg-[var(--yellow)]">
                    <Icon className="h-6 w-6 text-[var(--ink)]" strokeWidth={2.5} />
                  </div>
                  <h3 className="headline mt-5 text-xl text-[var(--yellow)]">{uc.title}</h3>
                  <p className="mt-3 text-sm font-bold text-white/70 leading-relaxed">{uc.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ 6. TRUST / PROOF ══════════════════════════════ */}
      <section className="bg-[var(--paper)] py-12 md:py-16 px-6 md:px-12">
        <div className="max-w-[1180px] mx-auto">
          <p className="micro-label text-[var(--muted)]">SEE IT IN ACTION</p>
          <h2 className="headline mt-3 max-w-4xl text-4xl leading-none md:text-6xl text-[var(--ink)]">
            FROM JARGON TO "THAT MAKES SENSE" IN SECONDS.
          </h2>

          <div className="mt-10 jf-box bg-white p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-[var(--green)]" />
              <p className="micro-label text-[var(--muted)]">LIVE WHATSAPP CONVERSATION</p>
            </div>
            <WhatsAppChat />
          </div>
        </div>
      </section>

      {/* ═══ 7. FEATURES GRID ══════════════════════════════ */}
      <section className="bg-[var(--paper)] py-12 md:py-16 px-6 md:px-12">
        <div className="max-w-[1180px] mx-auto">
          <p className="micro-label text-[var(--muted)]">FEATURES</p>
          <h2 className="headline mt-3 max-w-4xl text-4xl leading-none md:text-6xl text-[var(--ink)]">
            EVERYTHING YOU NEED. NOTHING YOU DON'T.
          </h2>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {features.map((f) => {
              const { Icon } = f;
              return (
                <div key={f.title} className="jf-box bg-white p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center border-2 border-[var(--ink)] bg-[var(--yellow)]">
                      <Icon className="h-4 w-4 text-[var(--ink)]" strokeWidth={2.5} />
                    </div>
                    <div>
                      <h3 className="headline text-base text-[var(--ink)]">{f.title}</h3>
                      {'subtitle' in f && f.subtitle && (
                        <p className="mt-1 text-xs font-bold text-[var(--muted)]">{f.subtitle}</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ 8. CTA ════════════════════════════════════════ */}
      <section className="bg-[var(--ink)] py-12 md:py-20 px-6 md:px-12">
        <div className="max-w-[1180px] mx-auto text-center">
          <h2 className="headline max-w-4xl mx-auto text-4xl leading-none md:text-6xl text-[var(--yellow)]">
            STOP LOSING JOBS BECAUSE CLIENTS DON'T UNDERSTAND YOUR QUOTES.
          </h2>
          <p className="mt-6 mx-auto max-w-xl text-lg font-black text-white/70 leading-relaxed">
            Free for JobFilter subscribers. £9/month standalone.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/pricing" className="jf-button jf-button-lg bg-[var(--yellow)] text-[var(--ink)]">
              GET CODEX — FROM £39/MO
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}