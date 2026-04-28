import { SectionLabel } from '../components/SectionLabel';

export function CodexPage() {
  return (
    <main>
      <section className="soft-grid border-b-2 border-[var(--line)]">
        <div className="page-shell grid gap-6 py-10 md:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="jf-box bg-white p-6 md:p-10">
            <SectionLabel>FIG. 01 · CODEX</SectionLabel>
            <h1 className="headline mt-6 text-[clamp(3rem,8vw,6.8rem)] leading-[0.9]">
              TURN COMPLEX TECHNICAL CONTENT INTO SALES ASSETS.
            </h1>
            <p className="copy mt-6">
              Codex turns manuals, specs, and technical docs into clear, high-conversion assets for installers and manufacturers.
            </p>
            <a className="jf-button mt-8 bg-[var(--navy)] text-white" href="#codex-pack">CUT THE CONFUSION</a>
          </div>

          <div className="grid gap-4">
            <Proof label="BUILT FOR TRADES" value="Simple outputs that sell" />
            <Proof label="NO FLUFF" value="Scope, steps, proof" />
            <Proof label="STAY IN CONTROL" value="One system, one next action" />
          </div>
        </div>
      </section>

      <section id="codex-pack" className="page-shell section-pad">
        <SectionLabel>REF. 02 · WHAT IT DOES</SectionLabel>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <Card title="Input" body="Manuals, schematics, specs, notes." />
          <Card title="Process" body="Structure, trim, and simplify." />
          <Card title="Output" body="Videos, carousels, battle cards." />
        </div>
      </section>

      <section className="border-y-2 border-[var(--line)] bg-white">
        <div className="page-shell grid gap-6 py-10 md:py-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <SectionLabel>REF. 03 · AUDIENCE</SectionLabel>
            <h2 className="headline mt-4 text-[clamp(2.6rem,6vw,5rem)] leading-none">INSTALLERS AND MANUFACTURERS.</h2>
          </div>
          <p className="copy">
            Codex keeps the page simple: show the job, show the value, and make the next move obvious.
          </p>
        </div>
      </section>

      <section className="bg-[var(--navy)] text-white">
        <div className="page-shell py-14 md:py-18">
          <SectionLabel>REF. 04 · CONTROL</SectionLabel>
          <h2 className="headline mt-4 text-[clamp(3rem,7vw,6rem)] leading-none">CUT CONFUSION BEFORE IT COSTS YOU THE JOB.</h2>
          <a className="jf-button mt-8 bg-[var(--yellow)] text-[var(--ink)]" href="/find-jobs">ENTER THE INTAKE</a>
        </div>
      </section>
    </main>
  );
}

function Proof({ label, value }: { label: string; value: string }) {
  return (
    <div className="jf-box bg-[var(--navy)] p-5 text-white">
      <p className="micro-label text-[var(--yellow)]">{label}</p>
      <p className="headline mt-3 text-[clamp(2rem,4vw,3rem)] leading-none">{value}</p>
    </div>
  );
}

function Card({ title, body }: { title: string; body: string }) {
  return (
    <article className="jf-box bg-[var(--bg-main)] p-6 md:p-7">
      <p className="micro-label text-[var(--orange)]">{title}</p>
      <p className="mt-4 text-base font-bold leading-relaxed text-[var(--muted)]">{body}</p>
    </article>
  );
}
