import { SectionLabel } from '../components/SectionLabel';

export function CodexPage() {
  return (
    <main>
      <section className="page-shell py-12">
        <div className="jf-box bg-white p-8">
          <SectionLabel>FIG. 01 · CODEX</SectionLabel>
          <h1 className="headline mt-5 text-6xl leading-none md:text-8xl">
            YOUR TECHNICAL PACKS ARE COSTING YOU WORK.
          </h1>
          <p className="mt-4 max-w-3xl text-xl font-black text-[var(--muted)]">
            Codex turns messy installation, product, and tender material into clear packs that buyers and installers can act on.
          </p>
        </div>
      </section>

      <section className="page-shell pb-12">
        <div className="jf-box grid gap-0 overflow-hidden bg-white md:grid-cols-3">
          <Flow title="Input" body="Specs, drawings, install notes, site constraints." />
          <Flow title="Process" body="Structure, remove noise, surface decisions." />
          <Flow title="Output" body="Delivery pack, scope, checklist, buyer-ready detail." />
        </div>
      </section>

      <section className="border-y-2 border-[var(--line)] bg-white">
        <div className="page-shell py-12">
          <SectionLabel>REF. 02 · DELIVERABLES</SectionLabel>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <Card title="Installer Packs" body="Clear job-ready instructions for site teams." />
            <Card title="Manufacturer Packs" body="Technical product logic without sales fog." />
            <Card title="Tender Packs" body="Scope, evidence, and response structure." />
          </div>
        </div>
      </section>

      <section className="page-shell py-12">
        <SectionLabel>REF. 03 · SPEC TABLE</SectionLabel>
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
        <div className="page-shell py-14">
          <SectionLabel>REF. 04 · CONTROL</SectionLabel>
          <h2 className="headline mt-4 max-w-4xl text-6xl leading-none">CUT CONFUSION BEFORE IT COSTS YOU THE JOB.</h2>
        </div>
      </section>
    </main>
  );
}

function Flow({ title, body }: { title: string; body: string }) {
  return (
    <div className="border-b-2 border-[var(--line)] p-6 md:border-b-0 md:border-r-2 md:last:border-r-0">
      <h2 className="headline text-5xl">{title}</h2>
      <p className="mt-3 font-bold text-[var(--muted)]">{body}</p>
    </div>
  );
}

function Card({ title, body }: { title: string; body: string }) {
  return (
    <article className="jf-box bg-[var(--bg-main)] p-6">
      <h3 className="headline text-4xl">{title}</h3>
      <p className="mt-3 font-bold text-[var(--muted)]">{body}</p>
    </article>
  );
}
