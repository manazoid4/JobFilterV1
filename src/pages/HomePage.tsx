import { Link } from 'react-router-dom';
import { SectionLabel } from '../components/SectionLabel';

export function HomePage() {
  return (
    <main>
      <section className="soft-grid border-b-2 border-[var(--line)] bg-[var(--bg-main)]">
        <div className="page-shell grid gap-8 py-10 md:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="jf-box bg-white p-6 md:p-10">
            <SectionLabel>FIG. 01 · INTAKE ENGINE</SectionLabel>
            <h1 className="headline mt-6 max-w-4xl text-[clamp(3rem,8vw,7rem)] leading-[0.9]">
              REAL LEADS.
              <span className="block">NO CHASING.</span>
            </h1>
            <p className="copy mt-6">
              JobFilter helps UK tradesmen get better jobs and stay in control. It filters weak work, shows only useful opportunities, and keeps the good tools free forever.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link className="jf-button bg-[var(--navy)] text-white" to="/find-jobs">ENTER THE INTAKE</Link>
              <Link className="jf-button bg-[var(--yellow)] text-[var(--ink)]" to="/pricing">FREE TOOLS FOREVER</Link>
            </div>
          </div>

          <div className="grid gap-4">
            <Note title="CONTROL THE JOBS" body="One system. Less noise. Better fit." />
            <Note title="NO COMPETING" body="Find work without getting dragged into a race to the bottom." />
            <Note title="STAY IN CONTROL" body="Use the intake engine, keep the free tools, upgrade only when ready." />
            <Note title="BUILT FOR TRADES" body="Made for people on the tools, not corporate teams." />
          </div>
        </div>
      </section>

      <section className="border-b-2 border-[var(--line)] bg-[var(--yellow)]">
        <div className="page-shell grid gap-3 py-4 text-sm font-black uppercase md:grid-cols-4">
          <p>FREE TOOLS FOREVER</p>
          <p>Real leads only</p>
          <p>No contracts</p>
          <p>Fair system</p>
        </div>
      </section>

      <section className="page-shell section-pad">
        <SectionLabel>REF. 02 · PRODUCT CONTEXT</SectionLabel>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Product title="Intake Engine" body="The subscription product. Finds, filters, and scores jobs." />
          <Product title="Vantage" body="Turns big tenders into better-looking bids and decks." />
          <Product title="Vicinity" body="Turns finished work into new work and marketing assets." />
          <Product title="Codex" body="Turns technical content into clean sales assets." />
        </div>
      </section>

      <section className="border-y-2 border-[var(--line)] bg-white">
        <div className="page-shell grid gap-6 py-10 md:py-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionLabel>REF. 03 · VALUE</SectionLabel>
            <h2 className="headline mt-4 text-[clamp(2.6rem,6vw,5rem)] leading-none">FREE TOOLS. PAID INTAKE WHEN YOU NEED IT.</h2>
          </div>
          <p className="copy">
            Use the free tools forever. When you want a proper intake system that finds real leads and cuts out the tyre-kickers, move to Intake Engine.
          </p>
        </div>
      </section>

      <section className="bg-[var(--navy)] text-white">
        <div className="page-shell py-14 text-center md:py-18">
          <SectionLabel>REF. 04 · CONTROL</SectionLabel>
          <h2 className="headline mx-auto mt-4 max-w-5xl text-[clamp(3rem,8vw,7rem)] leading-none">
            ENTER THE INTAKE.
            <span className="block">CONTROL THE JOBS.</span>
          </h2>
          <Link className="jf-button mt-8 bg-[var(--yellow)] text-[var(--ink)]" to="/find-jobs">SCAN NOW →</Link>
        </div>
      </section>
    </main>
  );
}

function Note({ title, body }: { title: string; body: string }) {
  return (
    <div className="jf-box bg-[var(--navy)] p-5 text-white">
      <p className="micro-label text-[var(--yellow)]">{title}</p>
      <p className="mt-3 text-base font-bold leading-relaxed text-white/85">{body}</p>
    </div>
  );
}

function Product({ title, body }: { title: string; body: string }) {
  return (
    <article className="jf-box bg-white p-5">
      <p className="micro-label text-[var(--orange)]">{title}</p>
      <p className="mt-3 text-base font-bold leading-relaxed text-[var(--muted)]">{body}</p>
    </article>
  );
}
