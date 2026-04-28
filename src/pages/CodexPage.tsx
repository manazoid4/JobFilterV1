import { SectionLabel } from '../components/SectionLabel';

export function CodexPage() {
  return (
    <main>
      <section className="soft-grid border-b-2 border-[var(--line)]">
        <div className="page-shell grid gap-6 py-10 md:py-14 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="jf-box bg-white p-6 md:p-9">
            <SectionLabel>FIG. 01 · CODEX</SectionLabel>
            <h1 className="headline mt-5 text-[clamp(3rem,8vw,6.8rem)] leading-[0.9]">
              <span className="block">YOUR</span>
              <span className="block">TECHNICAL</span>
              <span className="block">PACKS ARE</span>
              <span className="block">COSTING</span>
              <span className="block">YOU WORK.</span>
            </h1>
            <p className="copy mt-5">
              Codex turns messy installation, product, and tender material into clear packs that buyers and installers can act on.
            </p>
            <a className="jf-button mt-7 bg-[var(--navy)] text-white" href="#codex-flow">CUT THE CONFUSION</a>
          </div>
          <div className="grid gap-4">
            <Proof label="BUILT FOR TRADES" value="Installer-ready outputs" />
            <Proof label="NO FLUFF" value="Scope, checks, decisions" />
            <Proof label="STAY IN CONTROL" value="Clear next action" />
          </div>
        </div>
      </section>

      <section id="codex-flow" className="page-shell section-pad">
        <div className="mb-6 grid gap-4 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
          <div>
            <SectionLabel>REF. 02 · PROCESS</SectionLabel>
            <h2 className="headline mt-4 text-[clamp(2.8rem,6vw,5rem)] leading-none">INPUT TO OUTPUT.</h2>
          </div>
          <p className="copy lg:justify-self-end">One clear flow. No mystery. No bloated reports.</p>
        </div>
        <div className="jf-box grid gap-0 overflow-hidden bg-white md:grid-cols-3">
          <Flow title="Input" body="Specs, drawings, install notes, site constraints." />
          <Flow title="Process" body="Structure, remove noise, surface decisions." />
          <Flow title="Output" body="Delivery pack, scope, checklist, buyer-ready detail." />
        </div>
      </section>

      <section className="border-y-2 border-[var(--line)] bg-white">
        <div className="page-shell section-pad">
          <SectionLabel>REF. 03 · DELIVERABLES</SectionLabel>
          <h2 className="headline mt-4 max-w-4xl text-[clamp(2.8rem,6vw,5rem)] leading-none">WHAT YOU GET BACK.</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Card title="Installer Packs" body="Clear job-ready instructions for site teams." />
            <Card title="Manufacturer Packs" body="Technical product logic without sales fog." />
            <Card title="Tender Packs" body="Scope, evidence, and response structure." />
          </div>
        </div>
      </section>

      <section className="page-shell section-pad">
        <SectionLabel>REF. 04 · SPEC TABLE</SectionLabel>
        <div className="jf-box mt-5 overflow-hidden bg-white">
          {[
            ['Audience', 'Installers / manufacturers'],
            ['Output', 'Structured pack, checklist, scope'],
            ['Use', 'Reduce confusion before quote or delivery'],
            ['Position', 'Technical editorial, not corporate fluff'],
          ].map(([k, v]) => (
            <div key={k} className="grid border-b border-[var(--line)] last:border-b-0 md:grid-cols-[240px_1fr]">
              <p className="bg-[var(--bg-main)] p-4 font-black uppercase">{k}</p>
              <p className="p-4 font-bold text-[var(--muted)]">{v}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[var(--navy)] text-white">
        <div className="page-shell py-14 md:py-20">
          <SectionLabel>REF. 05 · CONTROL</SectionLabel>
          <h2 className="headline mt-4 max-w-4xl text-[clamp(3rem,7vw,6rem)] leading-none">CUT CONFUSION BEFORE IT COSTS YOU THE JOB.</h2>
          <a className="jf-button mt-7 bg-[var(--yellow)] text-[var(--ink)]" href="/find-jobs">ENTER THE INTAKE</a>
        </div>
      </section>
    </main>
  );
}

function Proof({ label, value }: { label: string; value: string }) {
  return (
    <div className="jf-box bg-[var(--navy)] p-5 text-white">
      <p className="micro-label text-[var(--yellow)]">{label}</p>
      <p className="headline mt-3 text-[clamp(2rem,4vw,3.3rem)] leading-none">{value}</p>
    </div>
  );
}

function Flow({ title, body }: { title: string; body: string }) {
  return (
    <div className="border-b-2 border-[var(--line)] p-6 md:border-b-0 md:border-r-2 md:p-8 md:last:border-r-0">
      <h2 className="headline text-[clamp(2.7rem,5vw,4.4rem)] leading-none">{title}</h2>
      <p className="mt-4 text-base font-bold leading-relaxed text-[var(--muted)]">{body}</p>
    </div>
  );
}

function Card({ title, body }: { title: string; body: string }) {
  return (
    <article className="jf-box bg-[var(--bg-main)] p-6 md:p-7">
      <h3 className="headline text-[clamp(2rem,4vw,3rem)] leading-none">{title}</h3>
      <p className="mt-4 text-base font-bold leading-relaxed text-[var(--muted)]">{body}</p>
    </article>
  );
}
