import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/find-jobs', label: 'Find Jobs' },
  { to: '/free-tools', label: 'Free Tools' },
  { to: '/smart-quote', label: 'Smart Quote' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/free-tools', label: 'Free Tools' },
  { to: '/news', label: 'Trade Signals' },
  { to: '/epc', label: 'EPC Leads' },
];

export function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false);

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

      {/* Sticky nav */}
      <header className="sticky top-0 z-40 border-b-2 border-[var(--navy)] bg-[var(--paper)]">
        <div className="page-shell flex items-center justify-between" style={{ height: 70, gap: 24 }}>

          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-[10px]">
            <img
              src="/union-flag.svg"
              alt=""
              className="flex-shrink-0 border-2 border-[var(--navy)]"
              style={{ width: 40, height: 40, background: 'var(--navy)', boxShadow: '3px 3px 0 var(--navy)' }}
            />
            <span
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontSize: 22,
                letterSpacing: '0.06em',
                color: 'var(--navy)',
              }}
            >
              JOBFILTER™
            </span>
          </NavLink>

          {/* Desktop links */}
          <nav className="hidden items-center gap-1 xl:flex">
            {links.map((link) =>
              link.anchor ? (
                <a key={link.to} href={link.to} className="nav-link">
                  {link.label}
                </a>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `nav-link${isActive ? ' bg-[var(--offwhite)]' : ''}`
                  }
                >
                  {link.label}
                </NavLink>
              )
            )}
          </nav>

          {/* Desktop CTA */}
          <NavLink
            to="/find-jobs"
            className="jf-button hidden bg-[var(--yellow)] text-[var(--navy)] xl:inline-flex"
          >
            Scan Your Area →
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
