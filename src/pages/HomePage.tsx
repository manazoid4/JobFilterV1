import { Link } from 'react-router-dom';
import { WaitlistForm } from '../components/WaitlistForm';

const pipeline = [
  ['Fetch', 'Official UK construction signals first.'],
  ['Normalise', 'Every result becomes a structured JobFilter lead.'],
  ['Filter', 'Weak, vague, low-signal jobs are pushed down.'],
  ['Score', 'Urgency, value, proximity, source quality, completeness.'],
  ['Store', 'Worth-checking jobs stay in your lead list.'],
  ['Deliver', 'Gold leads are shaped for WhatsApp action.'],
];

const advantages = [
  ['Vantage', 'Win bigger jobs with better-looking bids.', '/vantage'],
  ['Vicinity', 'Turn past work into new enquiries.', '/vicinity'],
  ['Codex', 'Turn technical detail into sales material.', '/codex'],
];

export function HomePage() {
  return (
    <main className="pb-20 md:pb-0">
      <section className="bg-[var(--navy)] text-white">
        <div className="page-shell section-pad grid gap-8 lg:grid-cols-[1fr_420px] lg:items-end">
          <div>
            <p className="micro-label text-[var(--yellow)]">THE LEAD FILTER BEFORE THE QUOTE</p>
            <h1 className="headline mt-4 max-w-5xl text-[clamp(3.4rem,9vw,8rem)] leading-[0.9] text-white">
              Find The Jobs Worth Pricing.
            </h1>
            <p className="mt-5 max-w-2xl text-xl font-black leading-snug text-white/75">
              JobFilter scans official UK construction signals, filters out noise, and sends high-value opportunities to your phone.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link className="jf-button bg-[var(--yellow)] text-[var(--ink)]" to="/find-jobs">SCAN MY AREA</Link>
              <Link className="jf-button bg-white text-[var(--ink)]" to="/pricing">SEE £49 PLAN</Link>
            </div>
            <div className="mt-7 grid gap-2 text-sm font-black text-white/75 sm:grid-cols-2">
              <p>Official sources first</p>
              <p>Scored by value and urgency</p>
              <p>WhatsApp delivery path</p>
              <p>No shared lead auction</p>
            </div>
          </div>
          <LeadPreview />
        </div>
      </section>

      <section className="bg-white">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--orange)]">THE PROBLEM</p>
          <h2 className="headline mt-3 max-w-4xl text-5xl leading-none md:text-6xl">Lead platforms sell attention. JobFilter protects it.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            <Problem title="Shared leads" body="The same job becomes a race to the bottom." />
            <Problem title="Weak budgets" body="You only discover the money problem after the call." />
            <Problem title="No urgency" body="They want a price today for work they may never do." />
            <Problem title="Agency noise" body="More forms, more calls, no better filter." />
          </div>
        </div>
      </section>

      <section className="border-y-2 border-[var(--line)] bg-[var(--yellow)]">
        <div className="page-shell py-8">
          <h2 className="headline max-w-5xl text-4xl leading-none md:text-6xl">
            CHECKATRADE, BARK, AND MYBUILDER SERVE THE BUYER. JOBFILTER SERVES THE TRADESMAN.
          </h2>
          <p className="mt-4 max-w-2xl text-xl font-black leading-snug">
            The product is not more leads. It is fewer bad decisions and faster action on the jobs that can make money.
          </p>
        </div>
      </section>

      <section className="border-y-2 border-[var(--line)] bg-[var(--yellow)]">
        <div className="page-shell py-8">
          <h2 className="headline max-w-5xl text-4xl leading-none md:text-6xl">
            CHECKATRADE, BARK, AND MYBUILDER SERVE THE BUYER. JOBFILTER SERVES THE TRADESMAN.
          </h2>
          <p className="mt-4 max-w-2xl text-xl font-black leading-snug">
            The product is not more leads. It is fewer bad decisions and faster action on the jobs that can make money.
          </p>
        </div>
      </section>

      <section className="bg-[var(--bg-main)]">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--orange)]">INTAKE ENGINE</p>
          <h2 className="headline mt-3 text-5xl leading-none">FETCH - NORMALISE - FILTER - SCORE - STORE - DELIVER</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {pipeline.map(([title, body]) => (
              <article key={title} className="jf-box bg-white p-5">
                <h3 className="headline text-2xl">{title}</h3>
                <p className="mt-2 font-black text-[var(--muted)]">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="page-shell section-pad grid gap-6 lg:grid-cols-[1fr_420px]">
          <div>
            <p className="micro-label text-[var(--orange)]">LIVE SCANNER</p>
            <h2 className="headline mt-3 text-5xl leading-none">Try the first source now.</h2>
            <p className="mt-4 max-w-2xl text-lg font-black text-[var(--muted)]">
              The scanner starts with Contracts Finder and is built to expand toward planning.data.gov.uk and official planning APIs. No made-up leads.
            </p>
            <Link className="jf-button mt-6 bg-[var(--yellow)] text-[var(--ink)]" to="/find-jobs">SCAN MY AREA</Link>
          </div>
          <WhatsAppPreview />
        </div>
      </section>

      <section className="bg-[var(--navy)] text-white">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--yellow)]">PAID PLAN</p>
          <div className="grid gap-6 lg:grid-cols-[1fr_420px] lg:items-center">
            <div>
              <h2 className="headline mt-3 text-5xl leading-none text-white md:text-6xl">£49/month. Unlock the action layer.</h2>
              <p className="mt-4 max-w-2xl text-xl font-black text-white/70">
                Free shows the signal. Pro unlocks full source links, contact signal, WhatsApp alerts, saved leads, and priority-ranked jobs.
              </p>
            </div>
            <Link className="jf-button bg-[var(--yellow)] text-[var(--ink)]" to="/pricing">SEE PRO DETAILS</Link>
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg-main)]">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--orange)]">ADVANTAGES</p>
          <h2 className="headline mt-3 text-5xl leading-none">Win the job after the filter.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {advantages.map(([title, body, to]) => (
              <Link key={title} className="jf-box bg-white p-5 text-[var(--ink)]" to={to}>
                <h3 className="headline text-3xl">{title}</h3>
                <p className="mt-2 font-black text-[var(--muted)]">{body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--yellow)]">
        <div className="page-shell section-pad grid gap-6 lg:grid-cols-[1fr_420px] lg:items-center">
          <div>
            <p className="micro-label text-[var(--ink)]">START FILTERING</p>
            <h2 className="headline mt-3 text-5xl leading-none text-[var(--ink)]">Stop paying with your evenings.</h2>
            <p className="mt-4 max-w-xl text-xl font-black text-[var(--ink)]/75">
              Join the WhatsApp alert list and get the Intake Engine route when it opens.
            </p>
          </div>
          <WaitlistForm source="home-whatsapp-alerts" />
        </div>
      </section>
    </main>
  );
}

function LeadPreview() {
  return (
    <article className="jf-box bg-white p-5 text-[var(--ink)]">
      <p className="micro-label text-[var(--orange)]">GOLD LEAD</p>
      <h2 className="mt-3 text-2xl font-black leading-tight">Electrical maintenance tender</h2>
      <div className="mt-4 grid gap-3 text-sm">
        <Row label="Trade" value="Electrical" />
        <Row label="Area" value="B14 / West Midlands" />
        <Row label="Value" value="£25k+" />
        <Row label="Urgency" value="Deadline soon" />
        <Row label="Source" value="Contracts Finder / 91%" />
        <Row label="Contact signal" value="Buyer named" />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="badge bg-[var(--yellow)] text-[var(--ink)]">Official source</span>
        <span className="badge bg-[var(--bg-main)] text-[var(--ink)]">High value</span>
      </div>
    </article>
  );
}

function WhatsAppPreview() {
  return (
    <article className="jf-box bg-[var(--navy)] p-5 text-white">
      <p className="micro-label text-[var(--yellow)]">WHATSAPP ALERT PREVIEW</p>
      <pre className="mt-4 whitespace-pre-wrap font-mono text-sm font-bold leading-relaxed text-white/85">
{`GOLD LEAD - Electrical
Area: B14 / West Midlands
Value: £25k+
Urgency: Deadline soon
Why it matters: Official tender, buyer named, strong trade match
Action: Open notice`}
      </pre>
    </article>
  );
}

function Problem({ title, body }: { title: string; body: string }) {
  return (
    <article className="jf-box bg-[var(--bg-main)] p-5">
      <h3 className="headline text-2xl">{title}</h3>
      <p className="mt-2 font-black text-[var(--muted)]">{body}</p>
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
