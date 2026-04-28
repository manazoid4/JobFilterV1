import { Link } from 'react-router-dom';
import { LeadCard } from '../components/LeadCard';

export function HomePage() {
  return (
    <main className="pb-20 md:pb-0">
      <section className="border-b-2 border-[var(--line)] bg-white">
        <div className="page-shell grid min-h-[calc(100svh-126px)] content-center gap-6 py-8 md:min-h-[calc(100vh-72px)] md:py-12">
          <p className="micro-label text-[var(--orange)]">JOBFILTER = DECISION ENGINE</p>
          <h1 className="headline max-w-4xl text-[clamp(3.4rem,10vw,8rem)] leading-[0.88]">
            STOP WASTING TIME ON BAD JOBS
          </h1>
          <p className="max-w-xl text-xl font-black leading-snug text-[var(--muted)]">
            Every enquiry filtered before you even see it.
          </p>
          <div>
            <Link className="jf-button bg-[var(--yellow)] text-[var(--ink)]" to="/my-link">
              GET MY FILTER LINK
            </Link>
          </div>
        </div>
      </section>

      <section className="page-shell section-pad">
        <div className="grid gap-4 md:grid-cols-2">
          <LeadCard
            title="Kitchen rewire, B14, this week"
            score={88}
            tags={['Local', 'Urgent', 'Clear', 'Photos']}
            cta="TAKE"
            to="/my-link"
            meta="GOOD"
          />
          <LeadCard
            title="Maybe a small job, no area"
            score={28}
            tags={['Risk', 'Budget']}
            cta="IGNORE"
            to="/my-link"
            meta="BAD"
          />
        </div>
      </section>

      <section className="border-y-2 border-[var(--line)] bg-[var(--navy)] text-white">
        <div className="page-shell grid gap-3 py-8 md:grid-cols-3">
          <Step n="1" title="Share link" />
          <Step n="2" title="We filter" />
          <Step n="3" title="You get the good ones" />
        </div>
      </section>

      <section className="page-shell py-8">
        <div className="jf-box bg-[var(--yellow)] p-6">
          <p className="headline text-4xl leading-none md:text-6xl">9 JOBS FILTERED TODAY NEAR YOU</p>
        </div>
      </section>

      <section className="page-shell pb-16">
        <Link className="jf-button w-full bg-[var(--navy)] text-white md:w-auto" to="/my-link">
          GET MY FILTER LINK
        </Link>
      </section>
    </main>
  );
}

function Step({ n, title }: { n: string; title: string }) {
  return (
    <div className="border-2 border-white/30 p-5">
      <p className="micro-label text-[var(--yellow)]">Step {n}</p>
      <h2 className="headline mt-2 text-3xl">{title}</h2>
    </div>
  );
}
