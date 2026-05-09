import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <main className="page-shell py-16">
      <section className="jf-box bg-[var(--yellow)] p-8 text-center">
        <p className="micro-label text-[var(--ink)]">PAGE NOT FOUND</p>
        <h1
          className="headline mt-4 text-8xl leading-none text-[var(--navy)]"
          style={{ fontSize: 'clamp(72px, 12vw, 140px)' }}
        >
          404
        </h1>
        <p className="mt-4 text-2xl font-black text-[var(--ink)]">
          This page doesn't exist.
        </p>
        <p className="mt-2 text-lg font-black text-[var(--ink)]/60">
          Here's where you can go instead:
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-left">
          <Link to="/" className="jf-box bg-white p-5 block hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0_var(--navy)] transition">
            <p className="micro-label text-[var(--green)]">HOME</p>
            <p className="mt-2 font-black text-[var(--navy)]">See what JobFilter does</p>
          </Link>
          <Link to="/find-jobs" className="jf-box bg-white p-5 block hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0_var(--navy)] transition">
            <p className="micro-label text-[var(--green)]">FIND JOBS</p>
            <p className="mt-2 font-black text-[var(--navy)]">Scan your area for live leads</p>
          </Link>
          <Link to="/pricing" className="jf-box bg-white p-5 block hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0_var(--navy)] transition">
            <p className="micro-label text-[var(--green)]">PRICING</p>
            <p className="mt-2 font-black text-[var(--navy)]">From £6.99/week. No contracts.</p>
          </Link>
          <Link to="/dashboard" className="jf-box bg-white p-5 block hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0_var(--navy)] transition">
            <p className="micro-label text-[var(--green)]">PIPELINE</p>
            <p className="mt-2 font-black text-[var(--navy)]">Track your leads and results</p>
          </Link>
          <Link to="/signals" className="jf-box bg-white p-5 block hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0_var(--navy)] transition">
            <p className="micro-label text-[var(--green)]">SIGNALS</p>
            <p className="mt-2 font-black text-[var(--navy)]">See the data sources we scan</p>
          </Link>
          <Link to="/free-tools" className="jf-box bg-white p-5 block hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0_var(--navy)] transition">
            <p className="micro-label text-[var(--green)]">FREE TOOLS</p>
            <p className="mt-2 font-black text-[var(--navy)]">Useful tools for trades</p>
          </Link>
        </div>

        <div className="mt-8">
          <Link to="/" className="jf-button bg-[var(--navy)] text-white text-lg px-8 py-4">
            BACK TO HOME →
          </Link>
        </div>
      </section>
    </main>
  );
}
