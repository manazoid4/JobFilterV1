import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/find-jobs', label: 'Find Jobs' },
  { to: '/signals', label: 'Signals' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/free-tools', label: 'Free Tools' },
  { to: '/news', label: 'Trade Signals' },
  { to: '/epc', label: 'EPC Leads' },
  { to: '/tradiestack', label: 'TradieStack' },
];

export function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b-4 border-[var(--line)] bg-white text-[var(--ink)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
        <NavLink to="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
          <img
            className="h-10 w-10 border-2 border-[var(--line)] bg-[var(--ink)] shadow-[5px_5px_0_var(--line)]"
            src="/union-flag.svg"
            alt=""
          />
          <span className="headline text-3xl tracking-normal">JOBFILTER</span>
        </NavLink>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'text-[var(--muted)]' : 'text-[var(--ink)] hover:bg-[var(--yellow)]'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <button
          type="button"
          className="flex h-12 w-12 items-center justify-center border-2 border-[var(--line)] bg-[var(--yellow)] text-[var(--ink)] lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        <NavLink to="/find-jobs" className="jf-button top-scan hidden bg-[var(--yellow)] text-[var(--ink)] md:inline-flex">
          SCAN FREE
        </NavLink>
      </div>

      {menuOpen && (
        <nav className="grid gap-0 border-t-2 border-[var(--line)] bg-white lg:hidden">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `border-b border-[var(--line)] px-4 py-3 text-sm font-black uppercase ${
                  isActive ? 'bg-[var(--yellow)] text-[var(--ink)]' : 'text-[var(--ink)]'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink
            to="/find-jobs"
            onClick={() => setMenuOpen(false)}
            className="bg-[var(--yellow)] px-4 py-3 text-sm font-black uppercase text-[var(--ink)]"
          >
            SCAN FREE
          </NavLink>
        </nav>
      )}
    </header>
  );
}
