"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from './AuthProvider';

const publicLinks = [
  { to: '/find-jobs', label: 'Find Opportunities' },
  { to: '/microsite', label: 'Free Trade Page' },
  { to: '/methodology', label: 'How It Works' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/trust', label: 'Trust' },
];

const memberLinks = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/find-jobs', label: 'Find Opportunities' },
  { to: '/microsite', label: 'Free Trade Page' },
  { to: '/leads', label: 'Decisions' },
  { to: '/account', label: 'Account' },
];

export function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const isLoggedIn = !!user;
  const links = isLoggedIn ? memberLinks : publicLinks;

  return (
    <header className="sticky top-0 z-40 border-b-4 border-[var(--line)] bg-[var(--paper)] text-[var(--ink)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex shrink-0 items-center gap-2" onClick={() => setMenuOpen(false)}>
          <img
            className="h-8 w-8 border-2 border-[var(--line)] bg-[var(--ink)] shadow-[4px_4px_0_var(--line)] sm:h-9 sm:w-9"
            src="/union-flag.svg"
            alt="JobFilter logo"
          />
          <span className="headline text-2xl tracking-normal sm:text-3xl">JOBFILTER</span>
          <span className="hidden border-l-2 border-[var(--line)] pl-2 text-[10px] font-black uppercase tracking-[0.08em] text-[var(--muted)] 2xl:block">
            Public Works Qualification
          </span>
        </Link>

        <nav className="hidden min-w-0 items-center gap-0.5 lg:flex">
          {links.map((link) => {
            const isActive = pathname === link.to;
            return (
              <Link
                key={link.to}
                href={link.to}
                aria-current={isActive ? 'page' : undefined}
                className={`nav-link relative ${isActive ? 'bg-[var(--yellow)] font-bold' : 'text-[var(--ink)] hover:bg-[var(--yellow)]'}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          {isLoggedIn ? (
            <button onClick={() => signOut()} className="jf-button bg-[var(--yellow)] px-4 text-sm text-[var(--ink)]">
              Sign Out
            </button>
          ) : (
            <>
              <Link href="/login" className="text-sm font-black text-[var(--muted)] hover:text-[var(--ink)] underline">
                Sign in
              </Link>
              <Link href="/find-jobs" className="jf-button bg-[var(--yellow)] px-4 text-sm text-[var(--ink)]">
                SCAN JOBS FREE →
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
              <p className="text-[10px] font-black text-[var(--muted)]">PUBLIC JOBS</p>
              <p className="text-base font-black text-[var(--ink)]">SCAN FREE</p>
            </Link>
            <Link href={isLoggedIn ? '/dashboard' : '/pricing'} onClick={() => setMenuOpen(false)} className="px-3 py-3 text-center">
              <p className="text-[10px] font-black text-[var(--muted)]">{isLoggedIn ? 'MEMBER' : 'PILOT'}</p>
              <p className="text-base font-black text-[var(--ink)]">{isLoggedIn ? 'DASHBOARD' : '£39/MO'}</p>
            </Link>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto">
            {links.map((link) => {
              const isActive = pathname === link.to;
              return (
                <Link
                  key={link.to}
                  href={link.to}
                  aria-current={isActive ? 'page' : undefined}
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
            <>
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="border-b border-[var(--line)] px-4 py-3 text-sm font-black uppercase min-h-[44px] flex items-center text-[var(--ink)]"
              >
                Sign In
              </Link>
              <Link
                href="/find-jobs"
                onClick={() => setMenuOpen(false)}
                className="bg-[var(--yellow)] px-4 py-4 text-sm font-black uppercase text-[var(--ink)] text-center min-h-[44px] flex items-center justify-center"
              >
                SCAN PUBLIC JOBS FREE →
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
