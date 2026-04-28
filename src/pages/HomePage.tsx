import { Link } from 'react-router-dom';
import { SectionLabel } from '../components/SectionLabel';

export function HomePage() {
  return (
    <main>
      <section className="soft-grid border-b-2 border-[var(--line)] bg-[var(--bg-main)]">
        <div className="page-shell grid gap-8 py-10 md:py-14 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch">
          <div className="jf-box bg-white p-6 md:p-10">
            <SectionLabel>FIG. 01 · INTAKE SYSTEM</SectionLabel>
            <h1 className="headline mt-6 max-w-4xl text-[clamp(3rem,8.5vw,7.4rem)] leading-[0.88]">
              <span className="block">REAL</span>
              <span className="inline-block bg-[var(--yellow)] px-3 text-[var(--ink)]">LEADS</span>
              <span className="block">NO</span>
              <span className="block">CHASING.</span>
            </h1>
            <p className="copy mt-6">
              JobFilter gives UK tradesmen control over incoming work. Find real notices, filter weak matches, and act before the job goes cold.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link className="jf-button bg-[var(--navy)] text-white" to="/find-jobs">ENTER THE INTAKE</Link>
              <Link className="jf-button bg-[var(--yellow)] text-[var(--ink)]" to="/pricing">NO CONTRACTS</Link>
            </div>
            <div className="value-row mt-8 grid gap-3 sm:grid-cols-3">
              <MiniValue title="REAL LEADS" body="Live public-source data." />
              <MiniValue title="NO COMPETING" body="Work from one control room." />
              <MiniValue title="FREE TOOLS FOREVER" body="Useful checks stay free." />
            </div>
          </div>
          <div className="grid gap-4 content-stretch">
            {['CONTROL THE JOBS', 'NO COMPETING', 'STAY IN CONTROL', 'BUILT FOR TRADES'].map((text, index) => (
              <div key={text} className="jf-box flex min-h-28 items-center justify-between gap-5 bg-[var(--navy)] p-5 text-white md:p-6">
                <span className="micro-label text-[var(--yellow)]">REF. 0{index + 1}</span>
                <span className="headline text-right text-[clamp(2rem,4vw,3rem)] leading-none">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b-2 border-[var(--line)] bg-[var(--yellow)]">
        <div className="page-shell grid gap-3 py-4 text-sm font-black uppercase md:grid-cols-4">
          <p>Contracts Finder live source</p>
          <p>UK public procurement notices</p>
          <p>FREE TOOLS FOREVER</p>
          <p>Built for trades</p>
        </div>
      </section>

      <section className="page-shell section-pad">
        <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <SectionLabel>FIG. 02 · HOW IT WORKS</SectionLabel>
            <h2 className="headline mt-4 text-[clamp(2.8rem,6vw,5.4rem)] leading-none">FIND. FILTER. CONTROL.</h2>
          </div>
          <p className="copy lg:justify-self-end">
            The system stays simple: scan the market, cut weak matches, then put the best work in front of you.
          </p>
        </div>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          <Step n="01" title="Find" body="Scan live UK public procurement notices by trade and postcode." />
          <Step n="02" title="Filter" body="Score by relevance, freshness, value signal, and location fit." />
          <Step n="03" title="Control" body="Use the scanner, keep free tools, and upgrade only when intake matters." />
        </div>
      </section>

      <section className="border-y-2 border-[var(--line)] bg-white">
        <div className="page-shell section-pad">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <SectionLabel>REF. 03 · VALUE STACK</SectionLabel>
              <h2 className="headline mt-4 text-[clamp(2.6rem,6vw,5rem)] leading-none">FREE TOOLS FOREVER. PAID INTAKE WHEN READY.</h2>
            </div>
            <div className="jf-box bg-[var(--yellow)] p-6">
              <h3 className="headline text-4xl">FAIR SYSTEM.</h3>
              <p className="mt-3 text-lg font-black leading-relaxed">
                You can keep using the basic tools. Paid plans unlock deeper control, stronger matching, and faster decision-making.
              </p>
              <Link className="jf-button mt-5 bg-[var(--navy)] text-white" to="/pricing">SEE PRICING</Link>
            </div>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            <Module title="Intake Engine" body="The control room for incoming work." />
            <Module title="Vantage" body="See high-value public tenders before you waste time elsewhere." />
            <Module title="Vicinity" body="Keep searches grounded around real postcode areas." />
            <Module title="Codex" body="Turn job requirements into clear delivery packs." />
          </div>
        </div>
      </section>

      <section className="bg-[var(--navy)] text-white">
        <div className="page-shell py-14 text-center md:py-20">
          <SectionLabel>REF. 04 · CONTROL</SectionLabel>
          <h2 className="headline mx-auto mt-4 max-w-5xl text-[clamp(3rem,8vw,7rem)] leading-none">
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
    <article className="jf-box bg-white p-6 md:p-7">
      <p className="micro-label text-[var(--orange)]">STEP {n}</p>
      <h3 className="headline mt-4 text-[clamp(2.5rem,5vw,4rem)] leading-none">{title}</h3>
      <p className="mt-4 text-base font-bold leading-relaxed text-[var(--muted)]">{body}</p>
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

function MiniValue({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <p className="micro-label text-[var(--orange)]">{title}</p>
      <p className="mt-1 text-sm font-black leading-snug text-[var(--ink)]">{body}</p>
    </div>
  );
}
