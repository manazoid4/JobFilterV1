import { NavLink } from 'react-router-dom';

const links = [
  { to: '/pricing', label: 'Pricing' },
  { to: '/free-tools', label: 'Free Tools' },
  { to: '/tips', label: 'Tips' },
  { to: '/vantage', label: 'Vantage' },
  { to: '/vicinity', label: 'Vicinity' },
  { to: '/codex', label: 'Codex' },
];

export function TopNav() {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-[var(--line)] bg-[var(--navy)] text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <NavLink to="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center border-2 border-[var(--line)] bg-[var(--yellow)] font-black">JF</span>
          <span className="headline text-2xl tracking-normal">JOBFILTER</span>
        </NavLink>
        <nav className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'bg-[var(--yellow)] text-[var(--ink)]' : 'text-white hover:bg-white/10'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <NavLink to="/my-link" className="jf-button top-scan hidden bg-[var(--yellow)] text-[var(--ink)] md:inline-flex">
          GET MY FILTER LINK
        </NavLink>
      </div>
      <nav className="mobile-nav border-t-2 border-[var(--line)] md:hidden">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `border-r border-white/20 px-2 py-2 text-center text-[11px] font-black uppercase ${isActive ? 'bg-[var(--yellow)] text-[var(--ink)]' : 'bg-[var(--navy)] text-white'}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
