"use client";
import Link from 'next/link';

import { useState } from 'react';
import { CheckCircle2, Database, FlaskConical, LockOpen, Route, Wrench } from 'lucide-react';

const DEV_UNLOCK_KEY = 'jf-unlimited-tester';
const SCAN_COUNT_KEY = 'jf-weekly-scans-used';
const SCAN_WEEK_KEY = 'jf-weekly-scans-week';

const routes = [
  ['/find-jobs', 'Full lead scanner'],
  ['/free-tools', 'All free tools unlocked'],
  ['/dashboard', 'Pipeline dashboard'],
  ['/territories', 'Territory register'],
  ['/signals', 'Signal taxonomy'],
  ['/blueprint', 'Blueprint page'],
  ['/post-job', 'Homeowner intake'],
  ['/pricing', 'Pricing and Stripe test surface'],
];

const systems = [
  ['Frontend gates', 'Local unlimited tester unlocks scanner limits and paid UI actions.'],
  ['API lead search', 'Full backend lead data still requires FULL_ACCESS_TEST_MODE=true on the server.'],
  ['Product access', 'Use this portal to test scanner, WhatsApp actions, tools, territories, and dashboard flows.'],
  ['Research memory', 'The UK growth playbook and earliest buying-signal pack are stored in the Obsidian vault.'],
];

const testMatrix = [
  ['Unlock UI', 'Click UNLOCK EVERYTHING, then open /find-jobs. Scan limits and paid action buttons should be open in this browser.'],
  ['Full lead payload', 'Run the server with FULL_ACCESS_TEST_MODE=true. Without it, the frontend unlock is local only and API data stays preview-safe.'],
  ['Lead scanner', 'Use B14 7QH + electrical, then check Signal Intelligence, trust badges, Patch Pulse, and WhatsApp send.'],
  ['Territory API', 'Call /api/territories/summary?postcode=B14&trade=electrical and expect a pending-scan fallback if Supabase has no metric row.'],
  ['Payments surface', 'Open /pricing and test checkout creation with Stripe test keys configured.'],
  ['Regression gate', 'Before deploy: npm run lint, npm run build, then deploy through Vercel.'],
];

const checkCards = [
  { icon: FlaskConical, title: 'Regression', body: 'Run npm run lint and npm run build before deploying.' },
  { icon: Database, title: 'Data Priority', body: 'Lead quality and official-source reliability stay above UI decoration.' },
  { icon: Wrench, title: 'Next Build', body: 'UPRN graph, earliest signals, and richer official connectors are the next engineering focus.' },
];

export function DevPortalPage() {
  const [unlocked, setUnlocked] = useState(() => (typeof window !== "undefined" ? localStorage : {getItem:()=>null}).getItem(DEV_UNLOCK_KEY) === 'true');

  function enableUnlock() {
    (typeof window !== "undefined" ? localStorage : {setItem:()=>{}}).setItem(DEV_UNLOCK_KEY, 'true');
    (typeof window !== "undefined" ? localStorage : {setItem:()=>{}}).setItem(SCAN_COUNT_KEY, '0');
    (typeof window !== "undefined" ? localStorage : {setItem:()=>{}}).setItem(SCAN_WEEK_KEY, '');
    setUnlocked(true);
  }

  function disableUnlock() {
    (typeof window !== "undefined" ? localStorage : {removeItem:()=>{}}).removeItem(DEV_UNLOCK_KEY);
    setUnlocked(false);
  }

  return (
    <main className="page-shell py-10">
      <section className="ops-panel bg-[var(--ink)] p-8 text-white">
        <p className="micro-label text-[var(--yellow)]">DEV PORTAL</p>
        <h1 className="headline mt-3 text-5xl leading-none text-white md:text-7xl">FULL ACCESS TEST MODE.</h1>
        <p className="mt-4 max-w-3xl text-xl font-black text-white/90">
          Use this page while building. Enable the local unlimited tester to remove frontend scan limits and open paid actions without changing production entitlement logic.
        </p>
        <div className="mt-5 inline-flex border-2 border-[var(--yellow)] bg-[var(--yellow)] px-3 py-1 font-mono text-xs font-black uppercase text-[var(--ink)]">
          Deployed build: signal-graph-api-9800c16
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_420px]">
        <div className="ops-panel bg-white p-5">
          <div className="flex items-center gap-3">
            <LockOpen className="text-[var(--green)]" size={28} strokeWidth={3} />
            <h2 className="headline text-3xl">Access State</h2>
          </div>
          <div className="mt-5 grid gap-3">
            <div className="border-2 border-[var(--ink)] bg-[var(--yellow)] p-4">
              <p className="micro-label text-[var(--ink)]">UNLIMITED TESTER</p>
              <h3 className="headline mt-2 text-3xl">{unlocked ? 'UNLOCKED' : 'LOCKED'}</h3>
              <p className="mt-2 text-sm font-black text-[var(--ink)]/75">
                This sets a local browser tester flag and resets weekly scan counts. Remove this page before launch.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button type="button" onClick={enableUnlock} className="jf-button bg-[var(--ink)] text-white">
                  UNLOCK EVERYTHING
                </button>
                <button type="button" onClick={disableUnlock} className="jf-button bg-white text-[var(--ink)]">
                  CLEAR TESTER
                </button>
              </div>
            </div>
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
              <Link key={to} href={to} className="flex items-center justify-between border-2 border-[var(--line)] bg-white px-3 py-2 font-black text-[var(--ink)]">
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

      <section className="mt-6 ops-panel bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="micro-label text-[var(--orange)]">FULL TESTING GUIDE</p>
            <h2 className="headline mt-2 text-3xl">Dev Hub Checklist</h2>
          </div>
          <span className={`border-2 px-3 py-1 text-xs font-black uppercase ${unlocked ? 'border-[var(--green)] bg-[var(--green)]/10 text-[var(--green)]' : 'border-[var(--orange)] bg-[var(--orange)]/10 text-[var(--orange)]'}`}>
            {unlocked ? 'Local tester active' : 'Local tester off'}
          </span>
        </div>
        <div className="mt-5 grid gap-3">
          {testMatrix.map(([title, body]) => (
            <div key={title} className="grid gap-2 border-2 border-[var(--line)] bg-[var(--paper)] p-3 md:grid-cols-[180px_1fr]">
              <p className="font-black uppercase text-[var(--ink)]">{title}</p>
              <p className="text-sm font-bold text-[var(--muted)]">{body}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 border-2 border-[var(--navy)] bg-[var(--navy)] p-4 text-white">
          <p className="micro-label text-[var(--yellow)]">ENV FLAGS</p>
          <p className="mt-2 font-mono text-sm font-black">VITE_OPEN_ACCESS=true</p>
          <p className="font-mono text-sm font-black">FULL_ACCESS_TEST_MODE=true</p>
          <p className="mt-2 text-xs font-bold text-white/70">
            Local tester unlocks the browser. These env flags unlock open-access UI at build time and full backend lead payloads at runtime.
          </p>
        </div>
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
