import { NavLink } from 'react-router-dom';

const links = [
  { to: '/find-jobs', label: 'Find Jobs' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/free-tools', label: 'Free Tools' },
  { to: '/news', label: 'Trade Signals' },
  { to: '/epc', label: 'EPC Leads' },
  { to: '/tradiestack', label: 'TradieStack' },
];

export function TopNav() {
  return (
    <header className="sticky top-0 z-40 border-b-4 border-[var(--line)] bg-white text-[var(--ink)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <NavLink to="/" className="flex items-center gap-3">
          <img className="h-10 w-10 border-2 border-[var(--line)] bg-[var(--ink)] shadow-[5px_5px_0_var(--line)]" src="/union-flag.svg" alt="" />
          <span className="headline text-3xl tracking-normal">JOBFILTER</span>
        </NavLink>
        <nav className="hidden items-center gap-1 md:flex">
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
        <NavLink to="/find-jobs" className="jf-button top-scan hidden bg-[var(--yellow)] text-[var(--ink)] md:inline-flex">
          SCAN FREE
        </NavLink>
      </div>
      <nav className="mobile-nav border-t-2 border-[var(--line)] md:hidden">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `border-r border-[var(--line)] px-2 py-2 text-center text-[11px] font-black uppercase ${isActive ? 'bg-[var(--yellow)] text-[var(--ink)]' : 'bg-white text-[var(--ink)]'}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
