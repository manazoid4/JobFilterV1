import { Link } from 'react-router-dom';
import { SectionLabel } from '../components/SectionLabel';

export function HomePage() {
  return (
    <main>
      <section className="border-b-2 border-[var(--line)] bg-[var(--bg-main)]">
        <div className="page-shell grid gap-8 py-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
          <div className="jf-box bg-white p-6 md:p-10">
            <SectionLabel>FIG. 01 · INTAKE SYSTEM</SectionLabel>
            <h1 className="headline mt-6 text-6xl leading-[0.9] md:text-8xl">
              REAL <span className="inline-block bg-[var(--yellow)] px-3 text-[var(--ink)]">LEADS</span>. NO CHASING.
            </h1>
            <p className="mt-6 max-w-2xl text-xl font-black leading-snug">
              JobFilter gives UK tradesmen control over incoming work. Find public notices, filter weak matches, and act before the job goes cold.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="jf-button bg-[var(--navy)] text-white" to="/find-jobs">ENTER THE INTAKE</Link>
              <Link className="jf-button bg-[var(--yellow)] text-[var(--ink)]" to="/pricing">NO CONTRACTS</Link>
            </div>
          </div>
          <div className="grid gap-4">
            {['CONTROL THE JOBS', 'NO COMPETING', 'STAY IN CONTROL', 'FAIR SYSTEM'].map((text, index) => (
              <div key={text} className="jf-box flex items-center justify-between bg-[var(--navy)] p-6 text-white">
                <span className="micro-label text-[var(--yellow)]">REF. 0{index + 1}</span>
                <span className="headline text-4xl">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b-2 border-[var(--line)] bg-[var(--yellow)]">
        <div className="page-shell grid gap-3 py-4 text-sm font-black uppercase md:grid-cols-4">
          <p>Contracts Finder live source</p>
          <p>UK public procurement notices</p>
          <p>No fabricated cards</p>
          <p>Built for trades</p>
        </div>
      </section>

      <section className="page-shell py-12">
        <SectionLabel>FIG. 02 · HOW IT WORKS</SectionLabel>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <Step n="01" title="Find" body="Scan live UK public procurement notices by trade and postcode." />
          <Step n="02" title="Filter" body="Rank by keyword relevance, freshness, value signal, and location fit." />
          <Step n="03" title="Deliver" body="Keep only usable work in front of you. WhatsApp delivery is the next channel." />
        </div>
      </section>

      <section className="border-y-2 border-[var(--line)] bg-white">
        <div className="page-shell py-12">
          <SectionLabel>REF. 03 · PRODUCT MODULES</SectionLabel>
          <div className="mt-5 grid gap-4 md:grid-cols-4">
            <Module title="Intake Engine" body="The control room for incoming work." />
            <Module title="Vantage" body="See high-value public tenders before you waste time elsewhere." />
            <Module title="Vicinity" body="Keep searches grounded around real postcode areas." />
            <Module title="Codex" body="Turn job requirements into clear delivery packs." />
          </div>
        </div>
      </section>

      <section className="bg-[var(--navy)] text-white">
        <div className="page-shell py-14 text-center">
          <SectionLabel>REF. 04 · CONTROL</SectionLabel>
          <h2 className="headline mx-auto mt-4 max-w-5xl text-6xl leading-none md:text-8xl">
            ENTER THE INTAKE. CONTROL THE JOBS.
          </h2>
          <Link className="jf-button mt-8 bg-[var(--yellow)] text-[var(--ink)]" to="/find-jobs">SCAN NOW →</Link>
        </div>
      </section>
    </main>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <article className="jf-box bg-white p-6">
      <p className="micro-label text-[var(--orange)]">STEP {n}</p>
      <h3 className="headline mt-4 text-5xl">{title}</h3>
      <p className="mt-3 font-semibold text-[var(--muted)]">{body}</p>
    </article>
  );
}

function Module({ title, body }: { title: string; body: string }) {
  return (
    <article className="jf-box min-h-48 bg-[var(--bg-main)] p-5">
      <h3 className="headline text-3xl">{title}</h3>
      <p className="mt-4 font-bold text-[var(--muted)]">{body}</p>
    </article>
  );
}
