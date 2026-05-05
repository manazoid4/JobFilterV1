import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t-2 border-[var(--line)] bg-[var(--navy)] text-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="micro-label text-[var(--yellow)]">INTAKE FOREMAN</p>
          <p className="headline mt-2 text-4xl">PROTECT YOUR TIME.</p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm font-black uppercase">
          <Link to="/find-jobs">Free Scan</Link>
          <Link to="/smart-quote">Smart Quote</Link>
          <Link to="/free-tools">Free Tools</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/vantage">Vantage</Link>
          <Link to="/vicinity">Vicinity</Link>
          <Link to="/codex">Codex</Link>
          <Link to="/tips">Tips</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
