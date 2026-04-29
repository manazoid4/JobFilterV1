import { Link } from 'react-router-dom';
import { WaitlistForm } from '../components/WaitlistForm';

export function HomePage() {
  return (
    <main className="pb-20 md:pb-0">

      <section className="bg-[var(--navy)] text-white">
        <div className="page-shell section-pad flex flex-col gap-6">
          <p className="micro-label text-[var(--yellow)]">THE DIGITAL GATEKEEPER FOR TRADESMEN</p>
          <h1 className="headline text-[clamp(3.5rem,11vw,9rem)] leading-[0.88] text-white">
            Quit Working<br />For Ghosts
          </h1>
          <p className="max-w-xl text-xl font-black leading-snug text-white/75">
            Filter out tyre-kickers in 60 seconds. Only serious jobs hit your phone.
          </p>
          <div className="jf-box max-w-xl border-white/20 bg-[#0B2A5B] p-5 text-white shadow-none">
            <p className="text-lg font-black leading-snug">
              Tradesmen lose £6,200/year quoting jobs that never happen. JobFilter stops that.
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
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link className="jf-button bg-[var(--yellow)] text-[var(--ink)]" to="/my-link">GET MY FILTER LINK</Link>
            <Link className="jf-button bg-white text-[var(--ink)]" to="#how">SEE HOW IT WORKS</Link>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="page-shell section-pad">
          <p className="micro-label text-[var(--orange)]">THE PROBLEM</p>
          <h2 className="headline mt-3 text-5xl leading-none">YOU'RE CHASING GHOSTS</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <article className="jf-box bg-[var(--bg-main)] p-6">
              <h3 className="headline text-2xl">No budget confirmation</h3>
              <p className="mt-2 font-black text-[var(--muted)]">They say 'ballpark figure' but never commit</p>
            </article>
            <article className="jf-box bg-[var(--bg-main)] p-6">
              <h3 className="headline text-2xl">No photos upfront</h3>
              <p className="mt-2 font-black text-[var(--muted)]">You quote blind and waste hours on site visits</p>
            </article>
            <article className="jf-box bg-[var(--bg-main)] p-6">
              <h3 className="headline text-2xl">No urgency signal</h3>
              <p className="mt-2 font-black text-[var(--muted)]">They want it 'sometime next year' but called you today</p>
            </article>
          </div>
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

      <section className="bg-[var(--bg-main)]">
        <div className="page-shell section-pad">
          <h2 className="headline text-5xl leading-none">CHECKATRADE VS JOBFILTER</h2>
          <div className="jf-box mt-8 overflow-hidden bg-white">
            <div className="grid border-b-2 border-[var(--line)] md:grid-cols-2">
              <div className="border-b-2 border-[var(--line)] bg-[var(--orange)] p-4 font-black text-white md:border-b-0 md:border-r-2">Checkatrade</div>
              <div className="bg-[var(--yellow)] p-4 font-black text-[var(--ink)]">JobFilter</div>
            </div>
            <CompareRow bad="Shared leads" good="Exclusive to you" />
            <CompareRow bad="Vague enquiries" good="Budget confirmed upfront" />
            <CompareRow bad="No photos" good="Photos required" />
            <CompareRow bad="You filter the junk" good="We filter it for you" />
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
        </div>
      </section>

      <section className="bg-[var(--navy)]">
        <div className="page-shell section-pad">
          <h2 className="headline text-5xl leading-none text-white">WHAT A GOLD LEAD LOOKS LIKE</h2>
          <div className="mt-8 max-w-sm mx-auto rounded-xl bg-white p-5 shadow-lg">
            <pre className="font-mono text-sm leading-relaxed text-[var(--ink)] whitespace-pre-wrap">
{`🏆 NEW GOLD LEAD
Job: Electrical
Area: B12
Budget: £2,000–£5,000
Score: 91/100
Tap to call: 07700 900123`}
            </pre>
          </div>
        </div>
      </section>

      <section className="bg-[var(--yellow)]">
        <div className="page-shell section-pad flex flex-col items-center gap-6 text-center">
          <h2 className="headline text-5xl leading-none text-[var(--ink)]">£49/MONTH. NO CONTRACTS.</h2>
          <p className="max-w-md text-xl font-black text-[var(--ink)]/75">
            One link. Unlimited filter. Gold leads only.
          </p>
          <Link className="jf-button bg-[var(--navy)] text-white" to="/my-link">GET MY FILTER LINK NOW</Link>
          <div className="w-full max-w-md">
            <WaitlistForm source="home-bottom" />
          </div>
        </div>
      </section>

    </main>
  );
}

function CompareRow({ bad, good }: { bad: string; good: string }) {
  return (
    <div className="grid border-b-2 border-[var(--line)] last:border-b-0 md:grid-cols-2">
      <p className="border-b-2 border-[var(--line)] p-4 font-black text-[var(--muted)] line-through md:border-b-0 md:border-r-2">{bad}</p>
      <p className="bg-[var(--bg-main)] p-4 font-black text-[var(--ink)]">{good}</p>
    </div>
  );
}
