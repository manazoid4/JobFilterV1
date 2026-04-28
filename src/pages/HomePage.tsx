import { Link } from 'react-router-dom';
import { SectionLabel } from '../components/SectionLabel';

export function HomePage() {
  return (
    <main>

      {/* Hero */}
      <section className="soft-grid border-b-2 border-[var(--line)]">
        <div className="page-shell grid gap-6 py-10 md:py-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="jf-box bg-white p-6 md:p-10">
            <SectionLabel>FIG. 01 · INTAKE ENGINE</SectionLabel>
            <h1 className="headline mt-5 text-[clamp(3.2rem,8vw,7rem)] leading-[0.88]">
              REAL LEADS.
              <span className="block">NO CHASING.</span>
              <span className="block text-[var(--orange)]">NO COMPETING.</span>
            </h1>
            <p className="copy mt-5">
              JobFilter finds and filters real UK trade jobs before they hit the boards. Stay in control. Skip the race to the bottom.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link className="jf-button bg-[var(--navy)] text-white" to="/find-jobs">ENTER THE INTAKE</Link>
              <Link className="jf-button bg-[var(--yellow)] text-[var(--ink)]" to="/pricing">FREE TOOLS FOREVER →</Link>
            </div>
          </div>

          <div className="grid gap-3">
            <Note title="CONTROL THE JOBS" body="One system. Less noise. Better fit work." />
            <Note title="STAY IN CONTROL" body="Free tools always. Paid intake only when you're ready." />
            <Note title="BUILT FOR TRADES" body="Made for people on the tools, not corporate teams." />
            <Note title="NO CONTRACTS" body="Cancel anytime. No lock-in. Fair system." />
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="border-b-2 border-[var(--line)] bg-[var(--yellow)]">
        <div className="page-shell grid gap-2 py-4 text-sm font-black uppercase sm:grid-cols-4">
          <p>FREE TOOLS FOREVER</p>
          <p>Real leads only</p>
          <p>No contracts</p>
          <p>Fair system</p>
        </div>
      </section>

      {/* Free vs Paid */}
      <section className="page-shell section-pad">
        <SectionLabel>REF. 02 · WHAT YOU GET</SectionLabel>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="jf-box bg-white p-6 md:p-8">
            <p className="micro-label text-[var(--muted)]">Free — Always</p>
            <h2 className="headline mt-3 text-[clamp(1.8rem,4vw,3rem)] leading-none">FREE TOOLS FOREVER</h2>
            <ul className="mt-5 space-y-2 text-sm font-bold text-[var(--muted)]">
              <li className="flex gap-2"><span className="text-[var(--orange)]">→</span> Lead scanner (2 free per day)</li>
              <li className="flex gap-2"><span className="text-[var(--orange)]">→</span> Quote estimator</li>
              <li className="flex gap-2"><span className="text-[var(--orange)]">→</span> Market checker</li>
            </ul>
            <Link className="jf-button mt-6 bg-[var(--bg-main)] text-[var(--ink)]" to="/find-jobs">SCAN FOR FREE →</Link>
          </div>
          <div className="jf-box bg-[var(--navy)] p-6 text-white md:p-8">
            <p className="micro-label text-[var(--yellow)]">Intake Engine — £49/month</p>
            <h2 className="headline mt-3 text-[clamp(1.8rem,4vw,3rem)] leading-none text-white">JOBS BEFORE THE BOARDS SEE THEM</h2>
            <ul className="mt-5 space-y-2 text-sm font-bold text-white/80">
              <li className="flex gap-2"><span className="text-[var(--yellow)]">✓</span> Time-wasters filtered out</li>
              <li className="flex gap-2"><span className="text-[var(--yellow)]">✓</span> Delivered to WhatsApp daily</li>
              <li className="flex gap-2"><span className="text-[var(--yellow)]">✓</span> No per-lead fees. No bidding wars.</li>
            </ul>
            <Link className="jf-button mt-6 bg-[var(--yellow)] text-[var(--ink)]" to="/pricing">GET INTAKE ENGINE →</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--navy)] text-white">
        <div className="page-shell py-14 text-center md:py-16">
          <SectionLabel>REF. 03 · CONTROL</SectionLabel>
          <h2 className="headline mx-auto mt-4 max-w-4xl text-[clamp(3rem,8vw,6.5rem)] leading-none">
            ENTER THE INTAKE.
            <span className="block">CONTROL THE JOBS.</span>
          </h2>
          <p className="copy mx-auto mt-4 text-white/60">This is clear. This is fair. Built for UK trades.</p>
          <Link className="jf-button mt-7 bg-[var(--yellow)] text-[var(--ink)]" to="/find-jobs">SCAN NOW →</Link>
        </div>
      </section>

    </main>
  );
}

function Note({ title, body }: { title: string; body: string }) {
  return (
    <div className="jf-box bg-[var(--navy)] p-5 text-white">
      <p className="micro-label text-[var(--yellow)]">{title}</p>
      <p className="mt-2 text-sm font-bold leading-relaxed text-white/80">{body}</p>
    </div>
  );
}
