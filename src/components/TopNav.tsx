"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from './AuthProvider';

const publicLinks = [
  { to: '/find-jobs', label: 'Find Jobs' },
  { to: '/free-tools', label: 'Free Tools' },
  { to: '/signals', label: 'Signals' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/for-your-trade', label: 'Trades' },
  { to: '/news', label: 'News' },
  { to: '/faq', label: 'FAQ' },
];

const memberLinks = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/leads', label: 'My Leads' },
  { to: '/find-jobs', label: 'Find Jobs' },
  { to: '/free-tools', label: 'Free Tools' },
  { to: '/material-price-engine', label: 'Materials' },
];

export function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [foundingSlots, setFoundingSlots] = useState<number | null>(null);
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const isLoggedIn = !!user;
  const links = isLoggedIn ? memberLinks : publicLinks;
  const mobileLinks = isLoggedIn
    ? [...memberLinks, { to: '/tradie-zone', label: 'Member Hub' }]
    : [
        ...publicLinks,
        { to: '/features', label: 'How It Works' },
        { to: '/construction-leads/london', label: 'Cities' },
      ];

  useEffect(() => {
    fetch('/api/waitlist/count')
      .then((r) => r.json())
      .then((data) => setFoundingSlots(data.remaining ?? null))
      .catch(() => {});
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b-4 border-[var(--line)] bg-[var(--paper)] text-[var(--ink)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex shrink-0 items-center gap-2" onClick={() => setMenuOpen(false)}>
          <img
            className="h-8 w-8 border-2 border-[var(--line)] bg-[var(--ink)] shadow-[3px_3px_0_var(--line)] sm:h-9 sm:w-9"
            src="/union-flag.svg"
            alt="JobFilter logo"
          />
          <span className="headline text-2xl tracking-normal sm:text-3xl">JOBFILTER</span>
          <span className="hidden border-l-2 border-[var(--line)] pl-2 text-[10px] font-black uppercase tracking-[0.08em] text-[var(--muted)] 2xl:block">
            Construction Intelligence
          </span>
        </Link>

        <nav className="hidden min-w-0 items-center gap-0.5 lg:flex">
          {/* First 4 links shown always; 5th collapses into More dropdown */}
          {(isLoggedIn ? memberLinks.slice(0, 4) : publicLinks.slice(0, 4)).map((link) => {
            const isActive = pathname === link.to;
            return (
              <Link
                key={link.to}
                href={link.to}
                className={`nav-link relative ${isActive ? 'bg-[var(--yellow)] font-bold' : 'text-[var(--ink)] hover:bg-[var(--yellow)]'}`}
              >
                {link.label}
              </Link>
            );
          })}
          {/* More dropdown: covers overflow links for both member and public nav */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setMoreOpen(!moreOpen)}
              onBlur={() => setTimeout(() => setMoreOpen(false), 150)}
              className={`nav-link flex items-center gap-1 ${moreOpen ? 'bg-[var(--yellow)] font-bold' : 'text-[var(--ink)] hover:bg-[var(--yellow)]'}`}
            >
              More ▾
            </button>
            {moreOpen && (
              <div className="absolute left-0 top-full z-50 min-w-[140px] border-2 border-[var(--line)] bg-[var(--paper)] shadow-[4px_4px_0_var(--line)]">
                {(isLoggedIn ? memberLinks.slice(4) : publicLinks.slice(4)).map((link) => {
                  const isActive = pathname === link.to;
                  return (
                    <Link
                      key={link.to}
                      href={link.to}
                      onClick={() => setMoreOpen(false)}
                      className={`block px-4 py-2 text-sm font-black uppercase hover:bg-[var(--yellow)] ${isActive ? 'bg-[var(--yellow)]' : ''}`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          {!isLoggedIn && foundingSlots !== null && foundingSlots <= 30 && (
            <div className="hidden items-center gap-2 xl:flex">
              <span className="border-2 border-[var(--line)] bg-[var(--yellow)] px-2 py-1 text-xs font-black uppercase text-[var(--ink)]">
                {foundingSlots} left
              </span>
              <span className="text-xs font-black text-[var(--yellow)] bg-[var(--navy)] px-2 py-1">
                Founder £39/mo
              </span>
            </div>
          )}
          {isLoggedIn ? (
            <>
              <Link href="/tradie-zone" className="text-sm font-black text-[var(--muted)] hover:text-[var(--ink)] underline">
                Member Hub
              </Link>
              <button onClick={() => signOut()} className="jf-button bg-[var(--yellow)] px-4 text-sm text-[var(--ink)]">
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-black text-[var(--muted)] hover:text-[var(--ink)] underline">
                Sign in
              </Link>
              <Link href="/pricing" className="jf-button bg-[var(--yellow)] px-4 text-sm text-[var(--ink)]">
                START £39/MO
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="lg:hidden border-2 border-[var(--line)] bg-[var(--yellow)] px-3 py-2 font-black text-sm min-h-[44px] min-w-[44px]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? 'CLOSE' : 'MENU'}
        </button>
      </div>

      {menuOpen && (
        <div id="mobile-menu" className="lg:hidden flex max-h-[calc(100svh-72px)] flex-col overflow-hidden border-t-2 border-[var(--line)] bg-white">
          <div className="grid grid-cols-2 border-b border-[var(--line)] bg-[var(--bg-main)]">
            <Link href="/find-jobs" onClick={() => setMenuOpen(false)} className="border-r border-[var(--line)] px-3 py-3 text-center">
              <p className="text-[10px] font-black text-[var(--muted)]">FREE</p>
              <p className="text-base font-black text-[var(--ink)]">SCAN</p>
            </Link>
            {isLoggedIn ? (
              <Link href="/tradie-zone" onClick={() => setMenuOpen(false)} className="px-3 py-3 text-center">
                <p className="text-[10px] font-black text-[var(--muted)]">MEMBER</p>
                <p className="text-base font-black text-[var(--ink)]">HUB</p>
              </Link>
            ) : (
              <Link href="/pricing" onClick={() => setMenuOpen(false)} className="px-3 py-3 text-center">
                <p className="text-[10px] font-black text-[var(--muted)]">PAID</p>
                <p className="text-base font-black text-[var(--ink)]">START £39/MO</p>
              </Link>
            )}
          </div>
          {!isLoggedIn && foundingSlots !== null && foundingSlots <= 30 && (
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
            {mobileLinks.map((link) => {
              const isActive = pathname === link.to;
              return (
              <Link
                key={link.to}
                href={link.to}
                onClick={() => setMenuOpen(false)}
                className={`border-b border-[var(--line)] px-4 py-3 text-sm font-black uppercase min-h-[44px] flex items-center ${
                  isActive ? 'bg-[var(--yellow)] text-[var(--ink)]' : 'text-[var(--ink)]'
                }`}
              >
                {link.label}
              </Link>
              );
            })}
          </div>
          {isLoggedIn ? (
            <button
              onClick={() => { signOut(); setMenuOpen(false); }}
              className="bg-[var(--navy)] px-4 py-4 text-sm font-black uppercase text-white text-center min-h-[44px] flex items-center justify-center"
            >
              SIGN OUT
            </button>
          ) : (
            <div className="flex border-t-2 border-[var(--line)]">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="flex-1 bg-[var(--paper)] px-4 py-4 text-sm font-black uppercase text-[var(--ink)] text-center min-h-[44px] flex items-center justify-center border-r-2 border-[var(--line)]"
              >
                SIGN IN
              </Link>
              <Link
                href="/pricing"
                onClick={() => setMenuOpen(false)}
                className="flex-[2] bg-[var(--yellow)] px-4 py-4 text-sm font-black uppercase text-[var(--ink)] text-center min-h-[44px] flex items-center justify-center"
              >
                START £39/MO
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
