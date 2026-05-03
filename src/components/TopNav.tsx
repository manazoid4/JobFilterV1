import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/#why', label: 'Why JobFilter', anchor: true },
  { to: '/#what', label: 'What We Do', anchor: true },
  { to: '/free-tools', label: 'Free Tools' },
  { to: '/#trades', label: 'For Your Trade', anchor: true },
  { to: '/news', label: 'News' },
  { to: '/pricing', label: 'Pricing' },
];

export function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Founding 30 banner */}
      <div
        className="border-b-2 border-[var(--navy)] bg-[var(--yellow)] px-4 py-[9px] text-center text-[13px] font-medium text-[var(--navy)]"
        style={{ lineHeight: 1.4 }}
      >
        <strong className="font-extrabold">Founding 30:</strong>
        {' '}first 30 tradesmen lock £22/mo forever.
        <span
          className="mx-[9px] inline-block align-middle rounded-full bg-[var(--navy)]"
          style={{ width: 5, height: 5 }}
        />
        <a href="/pricing" className="font-bold underline underline-offset-2">
          Claim your spot →
        </a>
      </div>

      {/* Sticky nav */}
      <header className="sticky top-0 z-40 border-b-2 border-[var(--navy)] bg-[var(--paper)]">
        <div className="page-shell flex items-center justify-between" style={{ height: 70, gap: 24 }}>

          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-[10px]">
            <span
              className="inline-block flex-shrink-0 rounded-[3px] bg-[var(--navy)]"
              style={{ width: 24, height: 24 }}
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
              JOBFILTER
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
            to="/intake-test"
            className="jf-button hidden bg-[var(--yellow)] text-[var(--navy)] xl:inline-flex"
          >
            Join the Waitlist →
          </NavLink>

          {/* Hamburger */}
          <button
            className="flex items-center justify-center rounded-[3px] border-2 border-[var(--navy)] xl:hidden"
            style={{ width: 38, height: 38 }}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <svg width="16" height="14" fill="none" viewBox="0 0 16 14">
              <rect y="0" width="16" height="2" rx="1" fill="var(--navy)" />
              <rect y="6" width="16" height="2" rx="1" fill="var(--navy)" />
              <rect y="12" width="16" height="2" rx="1" fill="var(--navy)" />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="border-t-2 border-[var(--navy)] bg-[var(--paper)] px-5 pb-4 pt-3 xl:hidden">
            {links.map((link) =>
              link.anchor ? (
                <a
                  key={link.to}
                  href={link.to}
                  className="block border-b border-[var(--rule)] py-3 text-[15px] font-medium text-[var(--navy)]"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className="block border-b border-[var(--rule)] py-3 text-[15px] font-medium text-[var(--navy)]"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              )
            )}
            <NavLink
              to="/intake-test"
              className="jf-button mt-4 bg-[var(--yellow)] text-[var(--navy)]"
              onClick={() => setMenuOpen(false)}
            >
              Join the Waitlist →
            </NavLink>
          </div>
        )}
      </header>
    </>
  );
}
