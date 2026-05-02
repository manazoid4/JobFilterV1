import { Link } from 'react-router-dom';
import { WaitlistForm } from '../components/WaitlistForm';

const tools = [
  ['Find', 'Scans official tenders, planning signals, and local work triggers before they become obvious.'],
  ['Filter', 'Tyre-kickers, vague jobs, no-budget noise, and weak matches get pushed down.'],
  ['Deliver', 'The best jobs are shaped for WhatsApp: trade, area, value, urgency, and next action.'],
];

const supportTools = [
  ['Vantage', 'Win bigger jobs by looking like the serious firm.', '/vantage'],
  ['Vicinity', 'Turn past work into new proof and new enquiries.', '/vicinity'],
  ['Codex', 'Turn technical quotes into clear client-ready copy.', '/codex'],
];

const proofRows = [
  ['Trade', 'Electrical'],
  ['Area', 'B14 / West Midlands'],
  ['Value', 'Strong-value job'],
  ['Urgency', 'Deadline locked'],
  ['Source', 'Official source proof'],
  ['Action', 'Unlock on Pro'],
];

export function HomePage() {
  return (
    <main className="pb-20 md:pb-0">
      <section className="border-b-4 border-[var(--line)] bg-white">
        <div className="page-shell grid min-h-[calc(100vh-76px)] gap-10 py-14 lg:grid-cols-[1fr_420px] lg:items-center">
          <div className="text-center lg:text-left">
            <div className="mx-auto inline-flex items-center gap-3 bg-[var(--ink)] px-5 py-3 text-white lg:mx-0">
              <span className="h-3 w-3 rounded-full bg-[#32d36b]" />
              <span className="micro-label text-white">INTAKE ENGINE: ACTIVE</span>
            </div>
            <h1 aria-label="STOP FUNDING TYRE-KICKERS" className="headline mx-auto mt-10 max-w-4xl text-[clamp(4rem,11vw,9rem)] leading-[0.82] text-[var(--ink)] lg:mx-0">
              STOP FUNDING
              <span className="mt-2 block border-4 border-[var(--line)] bg-[var(--yellow)] px-4 py-2 shadow-[8px_8px_0_var(--line)]">
                TYRE-KICKERS.
              </span>
            </h1>
            <p className="mx-auto mt-8 max-w-3xl text-2xl font-black leading-tight lg:mx-0">
              JobFilter finds real jobs, kills the rubbish, and puts work worth pricing in front of you before the cowboys reach your phone.
            </p>
            <p className="mx-auto mt-5 max-w-2xl text-lg font-black text-[var(--muted)] lg:mx-0">
              No shared lead auction. No race to the bottom. No evenings wasted on people who were never serious.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <Link className="jf-button jf-button-lg bg-[var(--yellow)] text-[var(--ink)]" to="/find-jobs">
                CHECK WHAT YOUR AREA IS HIDING
              </Link>
              <Link className="jf-button jf-button-lg bg-white text-[var(--ink)]" to="/intake-test">
                OPEN TEST STAGE
              </Link>
            </div>
          </div>
          <LeadProofCard />
        </div>
      </section>

      <section id="what-you-get" className="border-b-4 border-[var(--line)] bg-[var(--yellow)]">
        <div className="page-shell py-16 text-center">
          <h2 className="headline text-6xl leading-none md:text-8xl">WHAT YOU GET</h2>
          <p className="mx-auto mt-5 max-w-2xl text-2xl font-black leading-tight">
            One subscription. Four tools. Better jobs. Your evenings back.
          </p>
        </div>
      </section>

      <section className="bg-[var(--bg-main)] py-16">
        <div className="page-shell">
          <article className="jf-box bg-[var(--ink)] p-6 text-white md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="inline-flex bg-[var(--yellow)] px-4 py-2 text-sm font-black uppercase text-[var(--ink)]">CORE PRODUCT</span>
                <h2 className="headline mt-5 text-5xl text-[var(--yellow)] md:text-6xl">INTAKE ENGINE</h2>
                <p className="mt-2 max-w-3xl text-xl font-black text-white/85">
                  Finds real jobs. Kills the rubbish. Sends you what is worth winning.
                </p>
              </div>
              <p className="headline text-4xl text-[var(--yellow)]">£49/month</p>
            </div>
            <div className="mt-8 grid gap-5 bg-white p-5 text-[var(--ink)] md:grid-cols-3">
              {tools.map(([title, body]) => (
                <article key={title} className="border-4 border-[var(--line)] bg-white p-5">
                  <h3 className="headline text-3xl">{title}</h3>
                  <p className="mt-4 font-black leading-relaxed text-[var(--muted)]">{body}</p>
                  <p className="mt-5 font-black uppercase text-[#009b3a]">
                    {title === 'Find' ? "You don't chase. It finds." : title === 'Filter' ? 'Only real jobs get through.' : 'Your evenings stay yours.'}
                  </p>
                </article>
              ))}
            </div>
          </article>

          <div className="mt-8 grid gap-6">
            {supportTools.map(([title, body, to], index) => (
              <Link key={title} to={to} className="jf-box block bg-[var(--yellow)] p-6 text-[var(--ink)]">
                <span className="inline-flex bg-[var(--ink)] px-4 py-2 text-sm font-black uppercase text-[var(--yellow)]">
                  {index === 0 ? 'INCLUDED - WIN BIGGER JOBS' : index === 1 ? 'INCLUDED - TURN PAST JOBS INTO FUTURE WORK' : 'INCLUDED - CLOSE MORE WORK'}
                </span>
                <h2 className="headline mt-4 text-5xl">{title}</h2>
                <p className="mt-2 max-w-2xl text-xl font-black">{body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="testing-stage" className="border-y-4 border-[var(--line)] bg-white">
        <div className="page-shell grid gap-8 py-16 lg:grid-cols-[1fr_430px] lg:items-center">
          <div className="jf-box bg-[var(--ink)] p-8 text-white">
            <p className="micro-label text-[var(--yellow)]">TESTING STAGE</p>
            <h2 className="headline mt-5 text-6xl leading-none md:text-7xl">PUSH A LEAD THROUGH THE FILTER</h2>
            <p className="mt-6 max-w-xl text-xl font-black text-white/85">
              Paste a real enquiry. The stage scores it fast and tells you if it looks worth chasing.
            </p>
            <Link className="jf-button mt-8 bg-[var(--yellow)] text-[var(--ink)]" to="/intake-test">OPEN TEST STAGE</Link>
          </div>
          <div className="jf-box bg-[var(--bg-main)] p-6">
            <Example label="GOOD EXAMPLE" text="Need a boiler replacement in B14 this week. Photos ready. Budget around £2,500. WhatsApp me." />
            <Example label="BAD EXAMPLE" text="Need some work done, not sure what yet, just looking around." />
          </div>
        </div>
      </section>

      <section id="blueprint" className="bg-[var(--yellow)]">
        <div className="page-shell py-16 text-center">
          <h2 className="headline text-6xl leading-none md:text-8xl">THEN WIN THEM.</h2>
          <p className="mx-auto mt-5 max-w-3xl text-2xl font-black leading-tight">
            Getting in front of the job is step one. These three make sure you walk out with it.
          </p>
          <div className="mt-12 grid gap-6 text-left md:grid-cols-3">
            {supportTools.map(([title, body, to]) => (
              <Link key={title} to={to} className="jf-box bg-white p-7 text-[var(--ink)]">
                <span className="inline-flex bg-[var(--ink)] px-4 py-2 text-2xl font-black uppercase text-[var(--yellow)]">{title}</span>
                <p className="mt-5 font-black uppercase text-[var(--muted)]">{body}</p>
                <p className="mt-8 text-3xl font-black uppercase text-[var(--red)]">
                  {title === 'Vantage' ? 'Stop losing £50k bids to firms who look better than you.' : title === 'Vicinity' ? 'Stop letting your best work rot in your camera roll.' : 'Stop losing jobs to clearer quotes.'}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--ink)] text-white">
        <div className="page-shell py-16 text-center">
          <h2 className="headline text-6xl leading-none text-[var(--yellow)] md:text-8xl">ONE JOB CAN PAY FOR THIS.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-2xl font-black">
            Win one £800 job and the month is covered. Win one £4k job and £49 stops looking like a subscription.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link className="jf-button bg-[var(--yellow)] text-[var(--ink)]" to="/pricing">SEE £49 PLAN</Link>
            <Link className="jf-button bg-white text-[var(--ink)]" to="/news">READ TRADE SIGNALS</Link>
          </div>
        </div>
      </section>

      <section className="border-b-4 border-[var(--line)] bg-[var(--bg-main)]">
        <div className="page-shell grid gap-6 py-16 lg:grid-cols-[1fr_420px]">
          <article className="jf-box bg-white p-7">
            <p className="micro-label text-[var(--orange)]">PAID GATE</p>
            <h2 className="headline mt-3 text-5xl leading-none">Free shows the signal. Pro unlocks the job.</h2>
            <p className="mt-4 text-xl font-black text-[var(--muted)]">
              Free proves there is work in the area. £49 unlocks buyer detail, contact signal, WhatsApp delivery, saved leads, and the next action.
            </p>
            <p className="mt-5 font-black uppercase text-[var(--green)]">NO CONTRACTS. FAIR SYSTEM. STAY IN CONTROL.</p>
          </article>
          <article className="jf-box bg-[var(--yellow)] p-7">
            <p className="micro-label text-[var(--ink)]">HIGHEST ADDS</p>
            <h2 className="headline mt-3 text-5xl leading-none">Letterhead Pack</h2>
            <p className="mt-4 text-lg font-black">
              Highest adds professional letterhead, blueprint instructions, printing and postage, plus the PDF copy to send before the other firm looks organised.
            </p>
          </article>
        </div>
      </section>

      <section className="bg-white">
        <div className="page-shell grid gap-8 py-16 lg:grid-cols-[1fr_420px] lg:items-center">
          <div>
            <p className="micro-label text-[var(--orange)]">START FILTERING</p>
            <h2 className="headline mt-3 text-6xl leading-none">BUILT IN BIRMINGHAM FOR THE UK TRADE.</h2>
            <p className="mt-5 max-w-2xl text-xl font-black text-[var(--muted)]">
              Join the launch list. No contract. No card needed. Get the filter link when the next release opens.
            </p>
          </div>
          <WaitlistForm source="home-launch-polish" />
        </div>
      </section>
    </main>
  );
}

function LeadProofCard() {
  return (
    <article className="jf-box bg-white p-6 text-left">
      <p className="micro-label text-[var(--orange)]">OFFICIAL SOURCE PROOF</p>
      <h2 className="mt-4 text-3xl font-black leading-tight">Electrical maintenance tender</h2>
      <div className="mt-5 grid gap-3 text-base">
        {proofRows.map(([label, value]) => (
          <div key={label}>
            <Row label={label} value={value} />
          </div>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        <span className="badge bg-[var(--yellow)] text-[var(--ink)]">Official source</span>
        <span className="badge bg-[var(--bg-main)] text-[var(--ink)]">High signal</span>
        <span className="badge bg-[var(--bg-main)] text-[var(--ink)]">Free preview</span>
      </div>
    </article>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b-2 border-[var(--line)] pb-2 last:border-b-0">
      <span className="font-black text-[var(--muted)]">{label}</span>
      <span className="text-right font-black">{value}</span>
    </div>
  );
}

function Example({ label, text }: { label: string; text: string }) {
  return (
    <div className="border-4 border-[var(--line)] bg-white p-5 [&+&]:mt-5">
      <p className="font-black uppercase">{label}</p>
      <p className="mt-3 font-black leading-relaxed text-[var(--muted)]">"{text}"</p>
    </div>
  );
}
