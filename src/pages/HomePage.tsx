import { Link } from 'react-router-dom';
import { WaitlistForm } from '../components/WaitlistForm';

const features = [
  ['Lead Scoring', 'Know if it is worth your time.'],
  ['Intake Link', 'Customers answer first. You chase less.'],
  ['SMS Alerts', 'Gold leads hit your phone fast.'],
  ['Filtering Logic', 'Tyre-kickers get blocked early.'],
];

export function HomePage() {
  return (
    <main className="pb-20 md:pb-0">
      <section className="border-b-2 border-[var(--line)] bg-[var(--navy)] text-white">
        <div className="page-shell grid gap-6 py-8 md:py-12 lg:grid-cols-[1fr_420px] lg:items-start">
          <div>
            <p className="micro-label text-[var(--yellow)]">JOBFILTER = INTAKE FOREMAN</p>
            <h1 className="headline mt-4 max-w-5xl text-[clamp(3.3rem,10vw,8rem)] leading-[0.88]">
              STOP WASTING TIME ON BAD JOBS
            </h1>
            <p className="mt-5 max-w-xl text-xl font-black leading-snug text-white/75">
              Every enquiry filtered before it wastes your time.
            </p>
            <div className="mt-5 jf-box border-white/30 bg-[#0B2A5B] p-5 text-white shadow-none">
              <p className="text-xl font-black leading-snug">
                You lose thousands a year chasing jobs that never convert.
              </p>
            </div>
            <div className="mt-6 grid gap-2 text-sm font-black text-white/75 sm:grid-cols-2">
              <p>Built for tradesmen. Not to sell you leads.</p>
              <p>We don't make money off your time. We protect it.</p>
              <p>If you save time, you make more money.</p>
              <p>Built in Birmingham.</p>
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link className="jf-button bg-[var(--yellow)] text-[var(--ink)]" to="/my-link">GET MY FILTER LINK</Link>
              <a className="jf-button bg-white text-[var(--ink)]" href="#waitlist">JOIN WAITLIST</a>
            </div>
          </div>
          <WaitlistForm source="home-hero" />
        </div>
      </section>

      <section className="page-shell section-pad">
        <div className="jf-box overflow-hidden bg-white">
          <div className="grid border-b-2 border-[var(--line)] md:grid-cols-2">
            <h2 className="headline border-b-2 border-[var(--line)] bg-[var(--orange)] p-5 text-3xl text-white md:border-b-0 md:border-r-2">
              Without JobFilter
            </h2>
            <h2 className="headline bg-[var(--yellow)] p-5 text-3xl">With JobFilter</h2>
          </div>
          <Compare bad="Chasing quotes" good="Only real jobs" />
          <Compare bad="Time wasted" good="Time saved" />
          <Compare bad="Guessing" good="Clear decisions" />
        </div>
      </section>

      <section className="border-y-2 border-[var(--line)] bg-[var(--yellow)]">
        <div className="page-shell py-8">
          <h2 className="headline max-w-4xl text-4xl leading-none md:text-6xl">
            MOST PLATFORMS SELL THE SAME JOB TO MULTIPLE TRADESMEN.
          </h2>
          <p className="mt-4 max-w-2xl text-xl font-black leading-snug">
            We don't. We filter the jobs you already get.
          </p>
        </div>
      </section>

      <section className="border-y-2 border-[var(--line)] bg-white">
        <div className="page-shell py-10">
          <p className="micro-label text-[var(--orange)]">WHAT IT DOES</p>
          <h2 className="headline mt-3 text-5xl leading-none">FILTER FIRST. ACT FAST.</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {features.map(([title, body]) => (
              <article key={title} className="jf-box bg-[var(--bg-main)] p-5">
                <h3 className="headline text-3xl">{title}</h3>
                <p className="mt-2 font-black text-[var(--muted)]">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell section-pad">
        <div className="grid gap-5 lg:grid-cols-[1fr_420px]">
          <div className="jf-box bg-white p-6">
            <p className="micro-label text-[var(--orange)]">FREE TOOLS</p>
            <h2 className="headline mt-3 text-5xl leading-none">USE OUR FREE TOOLS FOREVER.</h2>
            <div className="mt-5 grid gap-3 text-lg font-black text-[var(--muted)]">
              <p>FREE: 2 scans per week.</p>
              <p>FREE: quote calculator, job estimator, and diesel calculator.</p>
              <p>FREE: newsletter and tips access.</p>
            </div>
            <Link className="jf-button mt-6 bg-[var(--yellow)] text-[var(--ink)]" to="/free-tools">OPEN FREE TOOLS</Link>
          </div>
          <div id="waitlist">
            <WaitlistForm source="home-bottom" />
          </div>
        </div>
      </section>
    </main>
  );
}

function Compare({ bad, good }: { bad: string; good: string }) {
  return (
    <div className="grid border-b-2 border-[var(--line)] last:border-b-0 md:grid-cols-2">
      <p className="border-b-2 border-[var(--line)] p-5 text-xl font-black md:border-b-0 md:border-r-2">{bad}</p>
      <p className="bg-[var(--bg-main)] p-5 text-xl font-black">{good}</p>
    </div>
  );
}
