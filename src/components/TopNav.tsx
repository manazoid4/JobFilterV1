import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home' },
  { to: '/my-link', label: 'My Link' },
  { to: '/leads', label: 'Leads' },
  { to: '/find-jobs', label: 'Live Scan' },
];

export function TopNav() {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-[var(--line)] bg-[var(--bg-main)]/95 backdrop-blur">
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
                `nav-link ${isActive ? 'bg-[var(--navy)] text-white' : 'text-[var(--ink)] hover:bg-white'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <NavLink to="/my-link" className="jf-button top-scan hidden bg-[var(--yellow)] text-[var(--ink)] md:inline-flex">
          GET LINK
        </NavLink>
      </div>
      <nav className="mobile-nav border-t-2 border-[var(--line)] md:hidden">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `border-r border-[var(--line)] px-2 py-2 text-center text-[11px] font-black uppercase ${isActive ? 'bg-[var(--navy)] text-white' : 'bg-[var(--bg-main)]'}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
