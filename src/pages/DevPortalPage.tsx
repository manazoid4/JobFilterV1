import { Link } from 'react-router-dom';
import { CheckCircle2, Database, FlaskConical, LockOpen, Route, Wrench } from 'lucide-react';

const routes = [
  ['/find-jobs', 'Full lead scanner'],
  ['/free-tools', 'All free tools unlocked'],
  ['/dashboard', 'Pipeline dashboard'],
  ['/territories', 'PatchLock register'],
  ['/signals', 'Signal taxonomy'],
  ['/blueprint', 'Blueprint page'],
  ['/post-job', 'Homeowner intake'],
  ['/pricing', 'Pricing and Stripe test surface'],
];

const systems = [
  ['Frontend gates', 'DEV_MODE and OPEN_ACCESS are enabled in scanner and tools.'],
  ['API lead search', 'Express and Firebase search endpoints return full paid-mode leads with lockedCount 0.'],
  ['Product access', 'No UI paywall should block testing of scanner, WhatsApp actions, tools, PatchLock, or dashboard flows.'],
  ['Research memory', 'The UK growth playbook and earliest buying-signal pack are stored in the Obsidian vault.'],
];

const checkCards = [
  { icon: FlaskConical, title: 'Regression', body: 'Run npm run lint and npm run build before deploying.' },
  { icon: Database, title: 'Data Priority', body: 'Lead quality and official-source reliability stay above UI decoration.' },
  { icon: Wrench, title: 'Next Build', body: 'UPRN graph, earliest signals, and richer official connectors are the next engineering focus.' },
];

export function DevPortalPage() {
  return (
    <main className="page-shell py-10">
      <section className="ops-panel bg-[var(--ink)] p-8 text-white">
        <p className="micro-label text-[var(--yellow)]">DEV PORTAL</p>
        <h1 className="headline mt-3 text-5xl leading-none text-white md:text-7xl">FULL ACCESS TEST MODE.</h1>
        <p className="mt-4 max-w-3xl text-xl font-black text-white/75">
          Use this page when continuing from another machine. Every key product surface is linked here, and the backend lead search is configured for full test access.
        </p>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_420px]">
        <div className="ops-panel bg-white p-5">
          <div className="flex items-center gap-3">
            <LockOpen className="text-[var(--green)]" size={28} strokeWidth={3} />
            <h2 className="headline text-3xl">Access State</h2>
          </div>
          <div className="mt-5 grid gap-3">
            {systems.map(([title, body]) => (
              <div key={title} className="border-2 border-[var(--line)] bg-[var(--paper)] p-3">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-[var(--green)]" size={18} strokeWidth={3} />
                  <div>
                    <p className="font-black">{title}</p>
                    <p className="mt-1 text-sm font-bold text-[var(--muted)]">{body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="ops-panel bg-[var(--yellow)] p-5">
          <p className="micro-label text-[var(--ink)]">QUICK TEST ROUTES</p>
          <div className="mt-4 grid gap-2">
            {routes.map(([to, label]) => (
              <Link key={to} to={to} className="flex items-center justify-between border-2 border-[var(--line)] bg-white px-3 py-2 font-black text-[var(--ink)]">
                <span>{label}</span>
                <span className="font-mono text-xs">{to}</span>
              </Link>
            ))}
          </div>
        </aside>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {checkCards.map(({ icon: RealIcon, title, body }) => {
          return (
            <article key={title} className="ops-panel bg-white p-5">
              <RealIcon size={26} strokeWidth={3} className="text-[var(--orange)]" />
              <h2 className="headline mt-3 text-3xl">{title}</h2>
              <p className="mt-2 font-black text-[var(--muted)]">{body}</p>
            </article>
          );
        })}
      </section>

      <section className="mt-6 ops-panel bg-[var(--navy)] p-5 text-white">
        <div className="flex items-center gap-3">
          <Route className="text-[var(--yellow)]" size={24} strokeWidth={3} />
          <p className="font-black">Continuation file: <code>SESSION_HANDOFF_2026-05-11.txt</code></p>
        </div>
      </section>
    </main>
  );
}
