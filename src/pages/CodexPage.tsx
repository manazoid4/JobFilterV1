import { Link } from 'react-router-dom';
import { SectionLabel } from '../components/SectionLabel';

export function CodexPage() {
  return (
    <main>

      {/* Hero */}
      <section className="soft-grid border-b-2 border-[var(--line)]">
        <div className="page-shell grid gap-6 py-10 md:py-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="jf-box bg-white p-6 md:p-10">
            <SectionLabel>FIG. 01 · CODEX</SectionLabel>
            <h1 className="headline mt-5 text-[clamp(3rem,8vw,6.5rem)] leading-[0.88]">
              SPECS INTO
              <span className="block">SALES ASSETS.</span>
            </h1>
            <p className="copy mt-5">
              Codex turns manuals, schematics, and technical docs into clear outputs that actually win work — for installers and manufacturers.
            </p>
            <Link className="jf-button mt-7 bg-[var(--navy)] text-white" to="/pricing">GET CODEX →</Link>
          </div>

          <div className="grid gap-3">
            <Proof label="BUILT FOR TRADES" value="Simple outputs that sell" />
            <Proof label="NO FLUFF" value="Scope, steps, proof" />
            <Proof label="STAY IN CONTROL" value="One next action, always" />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="codex-pack" className="page-shell section-pad">
        <SectionLabel>REF. 02 · HOW IT WORKS</SectionLabel>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <Card step="01" title="Input" body="Drop in manuals, schematics, specs, or site notes." />
          <Card step="02" title="Process" body="Codex strips the noise. Structures what matters." />
          <Card step="03" title="Output" body="Videos, carousels, battle cards — ready to share." />
        </div>
      </section>

      {/* Audience */}
      <section className="border-y-2 border-[var(--line)] bg-white">
        <div className="page-shell grid gap-6 py-10 md:py-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionLabel>REF. 03 · WHO IT'S FOR</SectionLabel>
            <h2 className="headline mt-4 text-[clamp(2.4rem,5vw,4.5rem)] leading-none">
              INSTALLERS.<br />MANUFACTURERS.
            </h2>
          </div>
          <p className="copy">
            If you're losing jobs because buyers don't understand what you do — Codex fixes that. Show the job. Show the value. Make the next move obvious.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--navy)] text-white">
        <div className="page-shell py-14 md:py-16">
          <SectionLabel>REF. 04 · GET STARTED</SectionLabel>
          <h2 className="headline mt-4 text-[clamp(2.8rem,7vw,5.5rem)] leading-none">
            CUT CONFUSION.<br />WIN THE JOB.
          </h2>
          <p className="copy mt-4 text-white/60">No fluff. No contracts. Built for UK trades.</p>
          <Link className="jf-button mt-7 bg-[var(--yellow)] text-[var(--ink)]" to="/pricing">GET CODEX — £99/MONTH →</Link>
        </div>
      </section>

    </main>
  );
}

function Proof({ label, value }: { label: string; value: string }) {
  return (
    <div className="jf-box bg-[var(--navy)] p-5 text-white">
      <p className="micro-label text-[var(--yellow)]">{label}</p>
      <p className="headline mt-3 text-[clamp(1.6rem,3.5vw,2.5rem)] leading-none">{value}</p>
    </div>
  );
}

function Card({ step, title, body }: { step: string; title: string; body: string }) {
  return (
    <article className="jf-box bg-[var(--bg-main)] p-6">
      <p className="micro-label text-[var(--orange)]">STEP {step} · {title}</p>
      <p className="mt-4 text-base font-bold leading-relaxed text-[var(--muted)]">{body}</p>
    </article>
  );
}
