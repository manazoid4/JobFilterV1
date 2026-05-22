import { Link } from 'react-router-dom';

const COMPARISON = [
  { jobfilter: 'Deadlines in one dashboard', manual: 'Dates buried in notes' },
  { jobfilter: 'Calendar export (.ics)', manual: 'January panic every year' },
  { jobfilter: 'CIS-aware checklist', manual: 'Missed CIS deductions' },
  { jobfilter: 'Accountant handoff pack', manual: 'Chasing accountant late' },
  { jobfilter: 'Admin readiness score', manual: 'No idea where you stand' },
  { jobfilter: 'Connected to your lead pipeline', manual: 'No link to jobs or follow-ups' },
  { jobfilter: 'Making Tax Digital check', manual: 'First you hear about MTD is from HMRC' },
  { jobfilter: 'Monthly trade admin checklist', manual: 'Receipts in a carrier bag' },
];

const FEATURES = [
  {
    title: 'Self Assessment Deadlines',
    desc: 'Registration, paper return, online return and payment dates — all in one card.',
  },
  {
    title: 'Making Tax Digital Check',
    desc: 'See if MTD for Income Tax applies to you and when. No jargon. Just the date and what to do.',
  },
  {
    title: 'CIS Checklist',
    desc: 'If you work as a CIS subcontractor, your checklist automatically includes CIS statement items.',
  },
  {
    title: 'Monthly Admin Checklist',
    desc: 'Invoices. Receipts. Bank statements. Lead follow-ups. Tick them off each month — adapted to your setup.',
  },
  {
    title: 'Accountant Handoff Pack',
    desc: 'One-tap copy of everything your accountant will ask for. Stop the back-and-forth.',
  },
  {
    title: 'Calendar Export',
    desc: 'Download your HMRC deadlines as an .ics file. Works with Google Calendar, Apple Calendar and Outlook.',
  },
];

const LOCKED_COMING = [
  'Insurance Renewal Guard',
  'Van MOT Guard',
  'Gas Safe / NICEIC Renewal Tracker',
  'Invoice Chase Guard',
  'Quote Expiry Tracker',
  'VAT Return Reminder',
];

export function AdminGuardTeaserPage() {
  return (
    <main className="page-shell grid gap-0 py-0 pb-24">
      {/* Hero */}
      <section className="jf-box bg-[var(--ink)] p-8 sm:p-12 text-white mt-8">
        <p className="micro-label text-[var(--yellow)]">TRADE COMMAND CENTRE — PAID FEATURE</p>
        <h1 className="headline mt-2 text-5xl sm:text-7xl leading-none">ADMIN GUARD</h1>
        <p className="mt-4 max-w-2xl font-black text-white/90 text-lg sm:text-xl">
          HMRC dates, trade admin checklists and reminder exports — built into your JobFilter dashboard.
        </p>
        <p className="mt-2 text-sm font-bold text-white/75">
          No NI number. No UTR. No tax bill details. Just reminders and organisation.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link to="/pricing" className="jf-button jf-button-lg bg-[var(--yellow)] text-[var(--ink)]">
            GET ADMIN GUARD →
          </Link>
          <Link to="/dashboard/admin-guard" className="jf-button jf-button-lg bg-white/10 text-white border-white/20 shadow-none">
            OPEN DASHBOARD →
          </Link>
        </div>
      </section>

      {/* Problem bar */}
      <section className="ops-strip my-0 p-5">
        <p className="headline text-[var(--ink)] text-xl text-center">
          Tradesmen miss HMRC deadlines not because they're careless — they're on tools all day. Admin Guard tracks the dates you'd otherwise miss.
        </p>
      </section>

      {/* Features */}
      <section className="jf-box bg-white p-6 sm:p-8">
        <p className="micro-label text-[var(--muted)]">WHAT'S INCLUDED</p>
        <h2 className="headline mt-1 text-3xl sm:text-4xl leading-none">WHAT ADMIN GUARD DOES</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="border-2 border-[var(--line)] bg-[var(--bg-main)] p-4 shadow-[3px_3px_0_var(--yellow)]">
              <p className="headline text-lg leading-none">{f.title}</p>
              <p className="mt-2 text-sm font-bold text-[var(--muted)]">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison table */}
      <section className="jf-box bg-[var(--steel)] p-6 sm:p-8 text-white">
        <p className="micro-label text-[var(--yellow)]">WHY ADMIN GUARD</p>
        <h2 className="headline mt-1 text-3xl sm:text-4xl leading-none">ADMIN GUARD VS DOING IT MANUALLY</h2>
        <div className="mt-6 border-2 border-white/20 overflow-hidden">
          <div className="grid grid-cols-2 bg-white/10">
            <div className="p-3 border-r-2 border-white/20">
              <p className="micro-label text-[var(--yellow)]">JOBFILTER ADMIN GUARD</p>
            </div>
            <div className="p-3">
              <p className="micro-label text-white/75">DOING IT MANUALLY</p>
            </div>
          </div>
          {COMPARISON.map((row, i) => (
            <div key={i} className="grid grid-cols-2 border-t-2 border-white/10">
              <div className="p-3 border-r-2 border-white/10 flex items-start gap-2">
                <span className="text-[var(--yellow)] font-black mt-0.5 shrink-0">✓</span>
                <p className="text-sm font-black">{row.jobfilter}</p>
              </div>
              <div className="p-3 flex items-start gap-2">
                <span className="text-white/30 font-black mt-0.5 shrink-0">✗</span>
                <p className="text-sm font-black text-white/75">{row.manual}</p>
              </div>
            </div>
          ))}
        </div>
        <Link to="/pricing" className="jf-button mt-6 bg-[var(--yellow)] text-[var(--ink)] inline-block">
          GET ACCESS →
        </Link>
      </section>

      {/* Copy section */}
      <section className="jf-box bg-[var(--yellow)] p-6 sm:p-10">
        <p className="micro-label text-[var(--ink)]">THE BIGGER PICTURE</p>
        <h2 className="headline mt-1 text-3xl sm:text-5xl leading-none text-[var(--ink)]">
          YOU BUILD. JOBFILTER FILTERS, SCORES AND REMINDS.
        </h2>
        <p className="mt-4 max-w-2xl font-black text-[var(--ink)]/80 text-base sm:text-lg">
          Admin Guard is the first module inside the Trade Command Centre — a dashboard built for UK tradespeople who want better local work, cleaner follow-ups, and admin dates they cannot afford to miss.
        </p>
        <p className="mt-3 max-w-2xl font-black text-[var(--ink)]/70">
          Not another bloated trade app. Just better jobs, cleaner follow-ups and admin dates you cannot afford to miss.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Link to="/pricing" className="jf-button jf-button-lg bg-[var(--ink)] text-white">
            SEE PRICING →
          </Link>
          <Link to="/dashboard" className="jf-button jf-button-lg bg-white text-[var(--ink)]">
            YOUR DASHBOARD →
          </Link>
        </div>
      </section>

      {/* Coming soon modules */}
      <section className="jf-box bg-white p-6 sm:p-8">
        <p className="micro-label text-[var(--muted)]">TRADE COMMAND CENTRE</p>
        <h2 className="headline mt-1 text-3xl leading-none">MORE MODULES COMING</h2>
        <p className="mt-2 text-sm font-bold text-[var(--muted)]">
          Admin Guard is the first module. More are being built for paid members.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {LOCKED_COMING.map((mod) => (
            <div key={mod} className="flex items-center gap-3 border-2 border-[var(--line)] bg-[var(--bg-main)] p-3 opacity-70">
              <span className="text-[var(--muted)] text-lg">🔒</span>
              <p className="text-sm font-black text-[var(--muted)]">{mod}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs font-bold text-[var(--muted)]">
          Paid members get access to all modules as they launch. No extra charge.
        </p>
      </section>

      {/* CTA */}
      <section className="jf-box bg-[var(--ink)] p-8 text-white text-center">
        <p className="micro-label text-[var(--yellow)]">SET THE REMINDERS ONCE</p>
        <h2 className="headline mt-1 text-4xl sm:text-5xl leading-none">GET BACK TO PRICING REAL JOBS.</h2>
        <p className="mt-4 max-w-lg mx-auto font-black text-white/70">
          Admin sorted. Pipeline moving.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/pricing" className="jf-button jf-button-lg bg-[var(--yellow)] text-[var(--ink)]">
            START WITH ADMIN GUARD →
          </Link>
        </div>
        <p className="mt-4 text-xs font-bold text-white/75">
          This is a reminder and organisation tool only. Not tax or legal advice. Always check GOV.UK or speak to an accountant.
        </p>
      </section>
    </main>
  );
}
