import { Link } from 'react-router-dom';
import { WaitlistForm } from '../components/WaitlistForm';

const tools = [
  ['Find', 'Scans official tenders, planning signals, and local work triggers before they become obvious.'],
  ['Filter', 'Tyre-kickers, vague jobs, no-budget noise, and weak matches get pushed down.'],
  ['Deliver', 'The best jobs are shaped for WhatsApp: trade, area, value, urgency, and next action.'],
];

const supportTools = [
  ['Vantage', 'Submit your job. Get a winning bid pack back in 6 hours.', '/vantage'],
  ['Vicinity', 'Send your photos. Get posts, ads, and portfolio assets back same day.', '/vicinity'],
  ['Codex', 'Submit your technical work. Get client-ready sales content that closes.', '/codex'],
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
    <main className="pb-8">
      <section className="bg-[var(--yellow)] soft-grid border-b-4 border-[var(--line)]">
        <div className="page-shell section-pad grid gap-8 lg:grid-cols-[1fr_420px] lg:items-end">
          <div className="order-2 lg:order-1">
            <p className="micro-label text-[var(--ink)]">STOP CHASING TYRE-KICKERS</p>
            <h1 className="headline mt-4 max-w-5xl text-[clamp(3rem,12vw,12rem)] leading-[0.85] text-[var(--ink)]">
              CONTROL THE JOBS.
            </h1>
            <p className="mt-3 text-sm font-black uppercase tracking-widest text-[var(--ink)]/60">
              Official UK signals. Scored. Filtered. Straight to your phone.
            </p>
            <p className="mt-2 text-sm font-black uppercase text-[var(--ink)]">30-DAY MONEY-BACK GUARANTEE. NO QUIBBLES.</p>
            <p className="mt-4 max-w-2xl text-2xl font-black leading-tight text-[var(--ink)]">
              Real UK trade leads. No competing on price. No shared auctions. Just high-value construction signals delivered to your phone.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link className="jf-button bg-[var(--ink)] text-white" to="/find-jobs">SCAN MY AREA FREE</Link>
              <Link className="jf-button bg-white text-[var(--ink)]" to="/pricing">SEE PRICING</Link>
            </div>
            <div className="mt-7 grid gap-2 text-sm font-black text-[var(--ink)] sm:grid-cols-2">
              <p>⚡️ NO CHASING</p>
              <p>⚡️ NO COMPETING</p>
              <p>⚡️ REAL UK LEADS</p>
              <p>⚡️ STAY IN CONTROL</p>
            </div>
          </div>
          <div className="order-1 grid gap-4 lg:order-2">
            <LeadPreview />
            <WhatsAppPreview />
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--orange)]">THE PROBLEM</p>
          <h2 className="headline mt-3 max-w-4xl text-4xl leading-[0.9] sm:text-6xl md:text-8xl">LEAD PLATFORMS SELL YOUR ATTENTION. WE PROTECT IT.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            <Problem title="NO MORE AUCTIONS" body="Shared leads are a race to the bottom. If 5 people get the lead, the buyer only wins on price. You lose." />
            <Problem title="NO WEAK BUDGETS" body="Stop pricing jobs for people who can't afford you. We signal the money before you pick up the phone." />
            <Problem title="NO TIME WASTERS" body="If they aren't starting for 6 months, they aren't a priority. We score urgency so you stay on the tools." />
            <Problem title="NO MIDDLEMEN" body="No more 'agent' noise. We connect you to official government and commercial signals directly." />
          </div>
        </div>
      </section>

      <section className="border-y-4 border-[var(--line)] bg-white">
        <div className="page-shell py-12">
          <p className="micro-label text-[var(--orange)]">THE OLD WAY vs JOBFILTER</p>
          <h2 className="headline mt-3 text-3xl leading-none sm:text-5xl md:text-6xl">THEY SELL YOUR ATTENTION. WE PROTECT IT.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="jf-box border-4 border-[var(--line)] bg-[var(--bg-main)] p-6">
              <h3 className="headline text-2xl text-[var(--orange)]">THE OLD WAY — CHECKATRADE, MYBUILDER, RATED PEOPLE</h3>
              <ul className="mt-4 grid gap-3 font-black text-[var(--muted)]">
                <li>✗ Pay £50-£150/month just to be listed</li>
                <li>✗ Leads sold to 4-8 other trades — race to the bottom</li>
                <li>✗ You call them, filter time-wasters yourself</li>
                <li>✗ Hope they answer. Hope they have budget. Hope you're first.</li>
                <li>✗ No guarantee. "Leads" = a name and phone number someone typed into a form.</li>
                <li>✗ Reviews can be hidden or filtered. Zero transparency.</li>
              </ul>
            </div>
            <div className="jf-box border-4 border-[var(--green)] bg-[var(--yellow)] p-6">
              <h3 className="headline text-2xl text-[var(--ink)]">JOBFILTER</h3>
              <ul className="mt-4 grid gap-3 font-black text-[var(--ink)]">
                <li>✓ Free preview. £29/month for full access. No per-lead fees. No contracts.</li>
                <li>✓ Every signal is exclusive — no one else sees your scan results.</li>
                <li>✓ We score every signal. GOLD means worth chasing. BIN means skip it.</li>
                <li>✓ Official planning data, EPC ratings, council contracts. Not forms. Not ads.</li>
                <li>✓ 30-day money-back guarantee. No quibbles. No hoops.</li>
                <li>✓ We don't rate you. We don't sell your profile. We just find the jobs.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y-4 border-[var(--line)] bg-[var(--ink)] text-white">
        <div className="page-shell py-12">
          <h2 className="headline max-w-5xl text-3xl leading-[0.9] sm:text-5xl md:text-7xl text-[var(--yellow)]">
            THEY SERVE THE BUYER. JOBFILTER SERVES THE TRADESMAN.
          </h2>
          <p className="mt-6 max-w-3xl text-2xl font-black leading-tight text-white/80">
            The product is not "more leads". It is fewer bad decisions and faster action on the jobs that actually pay your mortgage.
          </p>
        </div>
      </section>

      <section className="border-y-4 border-[var(--line)] bg-[var(--ink)] text-white">
        <div className="page-shell py-12">
          <p className="micro-label text-[var(--yellow)]">WHATSAPP BODYGUARD</p>
          <h2 className="headline mt-3 max-w-4xl text-3xl leading-none sm:text-5xl md:text-7xl text-[var(--yellow)]">
            GOLD LEADS. STRAIGHT TO YOUR PHONE.
          </h2>
          <p className="mt-5 max-w-2xl text-xl font-black text-white/80">
            When a job scores Gold, it fires to WhatsApp within minutes. Not batched. Not delayed. Before anyone else sees it.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ['98% open rate', 'Not email. Not an app. WhatsApp - where you already work.'],
              ['One-tap action', "Lead arrives. Tap. You're on it. No hunting through dashboards."],
              ['Before the competition', "89% of UK trades use WhatsApp. You're first. They're not."],
            ].map(([title, body]) => (
              <div key={title} className="jf-box bg-white/10 p-5">
                <h3 className="headline text-xl sm:text-2xl text-[var(--yellow)]">{title}</h3>
                <p className="mt-2 font-black text-white/75">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg-main)] py-16">
        <div className="page-shell">
          <div className="grid gap-6">
            {supportTools.map(([title, body, to], index) => (
              <Link key={title} to={to} className="jf-box block bg-[var(--yellow)] p-6 text-[var(--ink)]">
                <span className="inline-flex bg-[var(--ink)] px-4 py-2 text-sm font-black uppercase text-[var(--yellow)]">
                  {index === 0 ? 'INCLUDED - WIN BIGGER JOBS' : index === 1 ? 'INCLUDED - TURN PAST JOBS INTO FUTURE WORK' : 'INCLUDED - CLOSE MORE WORK'}
                </span>
                <h2 className="headline mt-4 text-3xl sm:text-5xl">{title}</h2>
                <p className="mt-2 max-w-2xl text-xl font-black">{body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="border-y-4 border-[var(--line)] bg-white">
        <div className="page-shell grid gap-8 py-16 lg:grid-cols-[1fr_430px] lg:items-center">
          <div className="jf-box bg-[var(--ink)] p-8 text-white">
            <p className="micro-label text-[var(--yellow)]">LIVE INTAKE ENGINE</p>
            <h2 className="headline mt-5 text-4xl leading-none sm:text-6xl md:text-7xl">SCAN YOUR AREA NOW</h2>
            <p className="mt-6 max-w-xl text-xl font-black text-white/85">
              Enter your postcode and trade. The engine checks planning data, tenders, and company signals — then scores every result before it reaches you.
            </p>
            <Link className="jf-button mt-8 bg-[var(--yellow)] text-[var(--ink)]" to="/find-jobs">START SCANNING FREE</Link>
          </div>
          <div className="jf-box bg-[var(--bg-main)] p-6">
            <Example label="WORTH CHASING" text="Need a boiler replacement in B14 this week. Photos ready. Budget around £2,500. WhatsApp me." />
            <Example label="FILTER CATCHES THIS" text="Need some work done, not sure what yet, just looking around." />
          </div>
        </div>
      </section>

      <section className="bg-[var(--navy)] text-white">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--yellow)]">PAID PLAN</p>
          <div className="grid gap-6 lg:grid-cols-[1fr_420px] lg:items-center">
            <div>
              <h2 className="headline mt-3 text-3xl leading-none sm:text-5xl text-white md:text-6xl">£49/month. Unlock the action layer.</h2>
              <p className="mt-4 max-w-2xl text-xl font-black text-white/70">
                Free shows the signal. Founding 30 and Pro unlock full source links, contact signal, WhatsApp alerts, saved leads, priority-ranked jobs, and the Letterhead Pack.
              </p>
            </div>
            <Link className="jf-button bg-[var(--yellow)] text-[var(--ink)]" to="/pricing">SEE PRO DETAILS</Link>
          </div>
        </div>
      </section>

      <section className="bg-[var(--ink)] text-white">
        <div className="page-shell py-16 text-center">
          <h2 className="headline text-4xl leading-none sm:text-6xl text-[var(--yellow)] md:text-8xl">ONE JOB CAN PAY FOR THIS.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-2xl font-black">
            Win one £800 job and the month is covered. Win one £4k job and £49 stops looking like a subscription.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link className="jf-button bg-[var(--yellow)] text-[var(--ink)]" to="/pricing">SEE £49 PLAN</Link>
            <Link className="jf-button bg-white text-[var(--ink)]" to="/find-jobs">Start free →</Link>
          </div>
        </div>
      </section>

      <section className="border-b-4 border-[var(--line)] bg-[var(--bg-main)]">
        <div className="page-shell grid gap-6 py-16 lg:grid-cols-[1fr_420px]">
          <article className="jf-box bg-white p-7">
            <p className="micro-label text-[var(--orange)]">PAID GATE</p>
            <h2 className="headline mt-3 text-3xl leading-none sm:text-5xl">Free shows the signal. Pro unlocks the job.</h2>
            <p className="mt-4 text-xl font-black text-[var(--muted)]">
              Free proves there is work in the area. £49 unlocks buyer detail, contact signal, WhatsApp delivery, saved leads, and the next action.
            </p>
            <p className="mt-5 font-black uppercase text-[var(--green)]">NO CONTRACTS. FAIR SYSTEM. STAY IN CONTROL.</p>
          </article>
          <article className="jf-box bg-[var(--yellow)] p-7">
            <p className="micro-label text-[var(--ink)]">PAID PLANS INCLUDE</p>
            <h2 className="headline mt-3 text-3xl leading-none sm:text-5xl">Letterhead Pack</h2>
            <p className="mt-4 text-lg font-black">
              Founding 30 and Pro include professional letterhead, blueprint instructions, printing and postage, plus the PDF copy to send before the other firm looks organised.
            </p>
          </article>
        </div>
      </section>

      <section className="bg-[var(--yellow)] border-y-4 border-[var(--line)]">
        <div className="page-shell py-12">
          <p className="micro-label text-[var(--ink)]">TRADIESTACK — NEW</p>
          <h2 className="headline mt-3 text-3xl leading-none sm:text-5xl md:text-6xl">WEBSITE. CRM. FOLLOW-UPS. REVIEWS. £450 ONCE.</h2>
          <p className="mt-5 max-w-2xl text-xl font-black text-[var(--ink)]/75">
            Everything the agencies charge you £1,000+/month for — trade website, CRM, auto follow-ups, review engine, quotes, invoices, WhatsApp inbox. One payment. No monthly fees. Own it.
          </p>
          <Link className="jf-button mt-6 bg-[var(--ink)] text-white" to="/tradiestack">SEE TRADIESTACK →</Link>
        </div>
      </section>

      <section className="bg-[var(--yellow)] border-y-4 border-[var(--line)]">
        <div className="page-shell py-12">
          <p className="micro-label text-[var(--ink)]">INTELLIGENCE ENGINE</p>
          <h2 className="headline mt-3 text-3xl leading-none sm:text-5xl md:text-6xl">FIVE SIGNALS. ONE SCAN. BEFORE ANYONE ELSE KNOWS.</h2>
          <p className="mt-5 max-w-2xl text-xl font-black text-[var(--ink)]/75">
            JobFilter reads official data that tells you work is coming — planning approvals, council contracts, EPC ratings, property sales, and new business registrations. All before it hits the directories.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm font-black">
            {['Planning', 'Public Contracts', 'EPC Retrofit', 'Property Sales', 'New Businesses'].map(t => (
              <span key={t} className="border-2 border-[var(--ink)] bg-white px-3 py-2">{t}</span>
            ))}
          </div>
          <Link className="jf-button mt-6 bg-[var(--ink)] text-white" to="/signals">SEE THE SIGNALS →</Link>
        </div>
      </section>

      <section className="bg-[var(--yellow)] border-y-4 border-[var(--line)]">
        <div className="page-shell py-12">
          <p className="micro-label text-[var(--ink)]">EPC ENERGY UPGRADES</p>
          <h2 className="headline mt-3 text-3xl leading-none sm:text-5xl md:text-6xl">F AND G RATED PROPERTIES CAN'T BE RENTED WITHOUT YOUR WORK.</h2>
          <p className="mt-5 max-w-2xl text-xl font-black text-[var(--ink)]/75">
            Properties with low EPC ratings need urgent retrofit before they're legally lettable. JobFilter flags these addresses before any job board sees them.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm font-black">
            {['Heat pump installs', 'Insulation upgrades', 'Boiler replacements', 'Solar installs', 'EV chargers'].map(t => (
              <span key={t} className="border-2 border-[var(--ink)] bg-white px-3 py-2">{t}</span>
            ))}
          </div>
          <Link className="jf-button mt-6 bg-[var(--ink)] text-white" to="/epc">SEE EPC LEADS -&gt;</Link>
        </div>
      </section>

      <section className="bg-white">
        <div className="page-shell grid gap-8 py-16 lg:grid-cols-[1fr_420px] lg:items-center">
          <div>
            <p className="micro-label text-[var(--orange)]">START FILTERING</p>
            <h2 className="headline mt-3 text-4xl leading-none sm:text-6xl">BUILT IN BIRMINGHAM FOR THE UK TRADE.</h2>
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

function LeadPreview() {
  return (
    <article className="jf-box bg-white p-5 text-[var(--ink)]">
      <p className="micro-label text-[var(--orange)]">GOLD LEAD</p>
      <h2 className="mt-3 text-xl sm:text-2xl font-black leading-tight">Electrical maintenance tender</h2>
      <div className="mt-4 grid gap-3 text-sm">
        <Row label="Trade" value="Electrical" />
        <Row label="Area" value="B14 / West Midlands" />
        <Row label="Value" value="£25k+" />
        <Row label="Urgency" value="Deadline soon" />
        <Row label="✓ Official Source" value="Contracts Finder — 91% confidence" />
        <Row label="Contact signal" value="Buyer named" />
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        <span className="badge bg-[var(--yellow)] text-[var(--ink)]">Official source</span>
        <span className="badge bg-[var(--bg-main)] text-[var(--ink)]">High signal</span>
        <span className="badge bg-[var(--bg-main)] text-[var(--ink)]">Free preview</span>
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
      <h3 className="headline text-xl sm:text-2xl">{title}</h3>
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

function Example({ label, text }: { label: string; text: string }) {
  return (
    <div className="border-4 border-[var(--line)] bg-white p-5 [&+&]:mt-5">
      <p className="font-black uppercase">{label}</p>
      <p className="mt-3 font-black leading-relaxed text-[var(--muted)]">"{text}"</p>
    </div>
  );
}
