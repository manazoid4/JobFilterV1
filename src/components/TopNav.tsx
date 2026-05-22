import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const links = [
  { to: '/find-jobs', label: 'Scan' },
  { to: '/signals', label: 'Signals' },
  { to: '/news', label: 'News' },
  { to: '/intelligence/birmingham', label: 'City Intel' },
  { to: '/free-tools', label: 'Tools' },
  { to: '/pricing', label: 'Pricing' },
];

const moreLinks = [
  { to: '/vantage', label: 'Vantage' },
  { to: '/vicinity', label: 'Vicinity' },
  { to: '/codex', label: 'Codex' },
  { to: '/methodology', label: 'How It Works' },
  { to: '/trust', label: 'Trust' },
  { to: '/faq', label: 'FAQ' },
];

const mobileLinks = [
  ...links,
  ...moreLinks,
].filter((l) => !['/find-jobs', '/territories'].includes(l.to));

export function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [foundingSlots, setFoundingSlots] = useState<number | null>(null);
  const { user, signOut } = useAuth();

  useEffect(() => {
    fetch('/api/waitlist/count')
      .then((r) => r.json())
      .then((data) => setFoundingSlots(data.remaining ?? null))
      .catch(() => {});
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b-4 border-[var(--line)] bg-[var(--paper)] text-[var(--ink)]">
      <div className="ops-strip hidden border-b-2 border-[var(--line)] px-4 py-1 text-center text-xs font-black uppercase tracking-[0.08em] text-[var(--ink)] sm:block">
        Founding patches now opening - one dominant trade partner per area
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
        <NavLink to="/" className="flex shrink-0 items-center gap-2" onClick={() => setMenuOpen(false)}>
          <img
            className="h-8 w-8 border-2 border-[var(--line)] bg-[var(--ink)] shadow-[3px_3px_0_var(--line)] sm:h-9 sm:w-9"
            src="/union-flag.svg"
            alt="JobFilter logo"
          />
          <span className="headline text-2xl tracking-normal sm:text-3xl">JOBFILTER</span>
          <span className="hidden border-l-2 border-[var(--line)] pl-2 text-[10px] font-black uppercase tracking-[0.08em] text-[var(--muted)] 2xl:block">
            Construction Intelligence
          </span>
        </NavLink>

        <nav className="hidden min-w-0 items-center gap-0.5 xl:flex">
          {links.map((link) => {
            return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `nav-link relative ${isActive ? 'bg-[var(--yellow)] font-bold' : 'text-[var(--ink)] hover:bg-[var(--yellow)]'}`
                  }
                >
                {link.label}
              </NavLink>
            );
          })}
          <div className="relative">
            <button
              type="button"
              onClick={() => setMoreOpen(!moreOpen)}
              onBlur={() => setTimeout(() => setMoreOpen(false), 150)}
              className={`nav-link relative ${moreOpen ? 'bg-[var(--yellow)] font-bold' : 'text-[var(--ink)] hover:bg-[var(--yellow)]'}`}
            >
              MORE
            </button>
            {moreOpen && (
              <div className="absolute right-0 top-full z-50 min-w-[180px] border-2 border-[var(--line)] bg-[var(--paper)] shadow-[4px_4px_0_var(--line)]">
                {moreLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setMoreOpen(false)}
                    className={({ isActive }) =>
                      `block border-b border-[var(--line)] px-4 py-2.5 text-sm font-black uppercase min-h-[44px] ${isActive ? 'bg-[var(--yellow)]' : 'hover:bg-[var(--yellow)]'}`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="hidden shrink-0 items-center gap-2 xl:flex">
          {foundingSlots !== null && foundingSlots <= 30 && (
            <div className="hidden items-center gap-2 2xl:flex">
              <span className="border-2 border-[var(--line)] bg-[var(--yellow)] px-2 py-1 text-xs font-black uppercase text-[var(--ink)]">
                {foundingSlots} left
              </span>
              <span className="text-xs font-black text-[var(--yellow)] bg-[var(--navy)] px-2 py-1">
                Founder £39/mo
              </span>
            </div>
          )}
          <NavLink to="/territories" className="jf-button bg-[var(--yellow)] px-4 text-sm text-[var(--ink)]">
            CLAIM PATCH
          </NavLink>
          {user ? (
            <div className="flex items-center gap-2">
              <NavLink to="/dashboard" className="nav-link text-xs font-black uppercase">
                Dashboard
              </NavLink>
              <button
                type="button"
                onClick={signOut}
                className="border-2 border-[var(--line)] px-3 py-1 text-xs font-black uppercase hover:bg-[var(--yellow)]"
              >
                Sign out
              </button>
            </div>
          ) : (
            <NavLink to="/login" className="border-2 border-[var(--line)] px-3 py-1 text-xs font-black uppercase hover:bg-[var(--yellow)]">
              SIGN IN
            </NavLink>
          )}
        </div>

        <button
          type="button"
          className="xl:hidden border-2 border-[var(--line)] bg-[var(--yellow)] px-3 py-2 font-black text-sm min-h-[44px] min-w-[44px]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? 'CLOSE' : 'MENU'}
        </button>
      </div>

      {menuOpen && (
        <div id="mobile-menu" className="xl:hidden flex max-h-[calc(100svh-72px)] flex-col overflow-hidden border-t-2 border-[var(--line)] bg-white">
          <div className="grid grid-cols-2 border-b border-[var(--line)] bg-[var(--bg-main)]">
            <NavLink to="/find-jobs" onClick={() => setMenuOpen(false)} className="border-r border-[var(--line)] px-3 py-3 text-center">
              <p className="text-[10px] font-black text-[var(--muted)]">FREE</p>
              <p className="text-base font-black text-[var(--ink)]">SCAN</p>
            </NavLink>
            <NavLink to="/territories" onClick={() => setMenuOpen(false)} className="px-3 py-3 text-center">
              <p className="text-[10px] font-black text-[var(--muted)]">YOUR AREA</p>
              <p className="text-base font-black text-[var(--ink)]">CLAIM PATCH</p>
            </NavLink>
          </div>
          {foundingSlots !== null && foundingSlots <= 30 && (
            <div className="border-b border-[var(--line)] bg-[var(--yellow)]/10 px-4 py-3">
              <span className="text-sm font-black text-[var(--ink)]">
                Early Access: {foundingSlots} founder slots left — £39/mo
              </span>
              <div className="mt-2 h-2 w-full overflow-hidden border border-[var(--orange)] bg-[var(--orange)]/10">
                <div
                  className="h-full bg-[var(--orange)] transition-all duration-500"
                  style={{ width: `${((30 - foundingSlots) / 30) * 100}%` }}
                />
              </div>
            </div>
          )}
          <div className="min-h-0 flex-1 overflow-y-auto">
            {mobileLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `border-b border-[var(--line)] px-4 py-3 text-sm font-black uppercase min-h-[44px] flex items-center ${
                    isActive ? 'bg-[var(--yellow)] text-[var(--ink)]' : 'text-[var(--ink)]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
          <NavLink
            to="/find-jobs"
            onClick={() => setMenuOpen(false)}
            className="bg-[var(--yellow)] px-4 py-4 text-sm font-black uppercase text-[var(--ink)] text-center min-h-[44px] flex items-center justify-center"
          >
            SCAN MY AREA FREE
          </NavLink>
        </div>
      )}
    </header>
  );
}
