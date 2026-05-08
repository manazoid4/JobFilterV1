import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getChaseLeads } from '../lib/chaseStore';
import { getMonthlyStats } from '../lib/winStore';

const links = [
  { to: '/find-jobs', label: 'Find Jobs' },
  { to: '/chase', label: 'Chase' },
  { to: '/win', label: 'Win' },
  { to: '/dashboard', label: 'Pipeline' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/signals', label: 'Signals' },
  { to: '/free-tools', label: 'Free Tools' },
];

export function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [foundingSlots, setFoundingSlots] = useState<number | null>(null);
  const [activeChaseCount, setActiveChaseCount] = useState(0);
  const [monthlyWinCount, setMonthlyWinCount] = useState(0);

  useEffect(() => {
    fetch('/api/waitlist/count')
      .then((r) => r.json())
      .then((data) => setFoundingSlots(data.remaining ?? null))
      .catch(() => {});
    setActiveChaseCount(getChaseLeads().filter((l) => l.stage !== 'won' && l.stage !== 'lost').length);
    setMonthlyWinCount(getMonthlyStats().count);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b-4 border-[var(--line)] bg-white text-[var(--ink)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <NavLink to="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
          <img
            className="h-9 w-9 border-2 border-[var(--line)] bg-[var(--ink)] shadow-[4px_4px_0_var(--line)]"
            src="/union-flag.svg"
            alt="JobFilter logo"
          />
          <span className="headline text-2xl sm:text-3xl tracking-normal">JOBFILTER</span>
        </NavLink>

        <nav className="hidden xl:flex items-center gap-1">
          {links.map((link) => {
            const isChase = link.to === '/chase';
            const isWin = link.to === '/win';
            const badge = isChase && activeChaseCount > 0 ? activeChaseCount : isWin && monthlyWinCount > 0 ? monthlyWinCount : null;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `nav-link relative ${isActive ? 'text-[var(--muted)]' : 'text-[var(--ink)] hover:bg-[var(--yellow)]'}`
                }
              >
                {link.label}
                {badge !== null && (
                  <span className="absolute -top-1 -right-2 h-4 min-w-4 rounded-full bg-[var(--yellow)] text-[var(--ink)] text-[9px] font-black flex items-center justify-center px-1">
                    {badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="hidden xl:flex items-center gap-3">
          {foundingSlots !== null && foundingSlots <= 30 && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase text-[var(--green)]">
                {foundingSlots}/30 left
              </span>
              <span className="text-xs font-black text-[var(--yellow)] bg-[var(--navy)] px-2 py-0.5">
                £6.99/wk
              </span>
            </div>
          )}
          <NavLink to="/pricing" className="jf-button bg-[var(--yellow)] text-[var(--ink)] text-sm">
            GET STARTED
          </NavLink>
        </div>

        <button
          type="button"
          className="xl:hidden border-2 border-[var(--line)] bg-[var(--yellow)] px-3 py-2 font-black text-sm min-h-[44px] min-w-[44px]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? 'CLOSE' : 'MENU'}
        </button>
      </div>

      {menuOpen && (
        <div className="xl:hidden border-t-2 border-[var(--line)] bg-white">
          <div className="grid grid-cols-3 border-b border-[var(--line)] bg-[var(--bg-main)]">
            <NavLink to="/find-jobs" onClick={() => setMenuOpen(false)} className="border-r border-[var(--line)] px-3 py-3 text-center">
              <p className="text-[10px] font-black text-[var(--muted)]">FIND</p>
              <p className="text-base font-black text-[var(--ink)]">SCAN</p>
            </NavLink>
            <NavLink to="/chase" onClick={() => setMenuOpen(false)} className="border-r border-[var(--line)] px-3 py-3 text-center relative">
              <p className="text-[10px] font-black text-[var(--muted)]">CHASE</p>
              <p className="text-base font-black text-[var(--ink)]">{activeChaseCount}</p>
              {activeChaseCount > 0 && (
                <span className="absolute top-1 right-1 h-3 w-3 rounded-full bg-[var(--yellow)]" />
              )}
            </NavLink>
            <NavLink to="/win" onClick={() => setMenuOpen(false)} className="px-3 py-3 text-center">
              <p className="text-[10px] font-black text-[var(--muted)]">WIN</p>
              <p className="text-base font-black text-green-700">{monthlyWinCount}</p>
            </NavLink>
          </div>
          {foundingSlots !== null && foundingSlots <= 30 && (
            <div className="border-b border-[var(--line)] bg-[var(--yellow)]/10 px-4 py-3">
              <span className="text-sm font-black text-[var(--green)]">
                Founding 30: {foundingSlots} left — £6.99/wk
              </span>
              <div className="mt-2 h-2 w-full overflow-hidden border border-[var(--orange)] bg-[var(--orange)]/10">
                <div
                  className="h-full bg-[var(--orange)] transition-all duration-500"
                  style={{ width: `${((30 - foundingSlots) / 30) * 100}%` }}
                />
              </div>
            </div>
          )}
          <div className="max-h-[60vh] overflow-y-auto">
            {links.map((link) => (
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
            to="/pricing"
            onClick={() => setMenuOpen(false)}
            className="bg-[var(--yellow)] px-4 py-4 text-sm font-black uppercase text-[var(--ink)] text-center min-h-[44px] flex items-center justify-center"
          >
            GET STARTED — £6.99/WK
          </NavLink>
          <NavLink
            to="/find-jobs"
            onClick={() => setMenuOpen(false)}
            className="bg-[var(--navy)] px-4 py-4 text-sm font-black uppercase text-white text-center min-h-[44px] flex items-center justify-center"
          >
            SCAN MY AREA FREE
          </NavLink>
        </div>
      )}
    </header>
  );
}
