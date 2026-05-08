import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t-2 border-[var(--line)] bg-[var(--navy)] text-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="micro-label text-[var(--yellow)]">JOBFILTER</p>
          <p className="headline mt-2 text-3xl sm:text-4xl">PROTECT YOUR TIME.</p>
          <p className="mt-3 text-sm font-black uppercase text-white/70">© 2026 JobFilter. Built in Birmingham.</p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm font-black uppercase">
          <Link to="/find-jobs">Free Scan</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/free-tools">Free Tools</Link>
          <Link to="/epc">EPC Leads</Link>
          <Link to="/for-your-trade">For Your Trade</Link>
          <Link to="/vantage">Vantage</Link>
          <Link to="/vicinity">Vicinity</Link>
          <Link to="/codex">Codex</Link>
          <Link to="/tradiestack">TradieStack</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
