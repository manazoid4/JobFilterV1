"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const links = [
  { to: '/find-jobs', label: 'Find Jobs' },
  { to: '/free-tools', label: 'Free Tools' },
  { to: '/signals', label: 'Signals' },
  { to: '/pricing', label: 'Pricing' },
];

// Mobile: all nav links shown in the dropdown menu
const mobileLinks = [
  { to: '/find-jobs', label: 'Find Jobs' },
  { to: '/free-tools', label: 'Free Tools' },
  { to: '/signals', label: 'Signals' },
  { to: '/pricing', label: 'Pricing' },
];

export function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [foundingSlots, setFoundingSlots] = useState<number | null>(null);
  const pathname = usePathname();

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
          {links.map((link) => {
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
        </nav>

        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          {foundingSlots !== null && foundingSlots <= 30 && (
            <div className="hidden items-center gap-2 xl:flex">
              <span className="border-2 border-[var(--line)] bg-[var(--yellow)] px-2 py-1 text-xs font-black uppercase text-[var(--ink)]">
                {foundingSlots} left
              </span>
              <span className="text-xs font-black text-[var(--yellow)] bg-[var(--navy)] px-2 py-1">
                Founder £39/mo
              </span>
            </div>
          )}
          <Link href="/login" className="text-sm font-black text-[var(--muted)] hover:text-[var(--ink)] underline">
            Sign in
          </Link>
          <Link href="/pricing" className="jf-button bg-[var(--yellow)] px-4 text-sm text-[var(--ink)]">
            START £39/MO
          </Link>
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
            <Link href="/pricing" onClick={() => setMenuOpen(false)} className="px-3 py-3 text-center">
              <p className="text-[10px] font-black text-[var(--muted)]">PAID</p>
              <p className="text-base font-black text-[var(--ink)]">START £39/MO</p>
            </Link>
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
          <Link
            href="/pricing"
            onClick={() => setMenuOpen(false)}
            className="bg-[var(--yellow)] px-4 py-4 text-sm font-black uppercase text-[var(--ink)] text-center min-h-[44px] flex items-center justify-center"
          >
            START £39/MO — FOUNDING PRICE
          </Link>
        </div>
      )}
    </header>
  );
}
