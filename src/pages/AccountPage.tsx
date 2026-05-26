"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../components/AuthProvider';
import { useSubscription } from '../lib/useSubscription';

const TIER_LABELS: Record<string, string> = {
  founding: 'Founding 30',
  pro: 'Pro',
  business: 'Business',
  free: 'Free',
};

const TIER_PRICES: Record<string, string> = {
  founding: '£39/mo',
  pro: '£79/mo',
  business: '£149/mo',
  free: '—',
};

export function AccountPage() {
  const { user, signOut, loading: authLoading } = useAuth();
  const sub = useSubscription();
  const router = useRouter();
  const [portalLoading, setPortalLoading] = useState(false);
  const [portalError, setPortalError] = useState('');

  if (authLoading) return null;
  if (!user) { router.replace('/login'); return null; }

  async function openBillingPortal() {
    setPortalLoading(true);
    setPortalError('');
    try {
      const res = await fetch('/api/customer-portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user!.email }),
      });
      const data = await res.json();
      if (data.url) { window.location.href = data.url; return; }
      setPortalError(data.error || 'Could not open billing portal');
    } catch {
      setPortalError('Failed to connect to billing portal');
    } finally {
      setPortalLoading(false);
    }
  }

  const isActive = sub.active;
  const tier = sub.tier;

  return (
    <main className="page-shell py-8 grid gap-6">
      <section className="jf-box bg-[var(--ink)] p-6 text-white">
        <p className="micro-label text-[var(--yellow)]">ACCOUNT</p>
        <h1 className="headline mt-2 text-4xl leading-none">YOUR ACCOUNT</h1>
        <p className="mt-2 font-mono text-sm text-white/70">{user.email}</p>
      </section>

      {/* Subscription status */}
      <section className="jf-box bg-white p-6">
        <p className="micro-label">SUBSCRIPTION</p>
        <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="headline text-2xl">{TIER_LABELS[tier] ?? tier}</p>
            <p className="mt-1 text-sm font-black text-[var(--muted)]">
              {TIER_PRICES[tier] ?? '—'}
              {isActive && (
                <span className="ml-2 border border-green-600 bg-green-50 px-2 py-0.5 text-xs text-green-700">
                  ACTIVE
                </span>
              )}
              {!isActive && tier !== 'free' && (
                <span className="ml-2 border border-orange-500 bg-orange-50 px-2 py-0.5 text-xs text-orange-700">
                  {sub.status.toUpperCase()}
                </span>
              )}
            </p>
          </div>
          {isActive ? (
            <button
              type="button"
              onClick={openBillingPortal}
              disabled={portalLoading}
              className="jf-button bg-[var(--ink)] text-white text-sm"
            >
              {portalLoading ? 'Opening...' : 'MANAGE BILLING →'}
            </button>
          ) : (
            <a href="/pricing" className="jf-button bg-[var(--yellow)] text-[var(--ink)] text-sm">
              UPGRADE PLAN →
            </a>
          )}
        </div>
        {portalError && <p className="mt-3 text-sm font-bold text-red-600">{portalError}</p>}

        {!isActive && (
          <div className="mt-6 border-t-2 border-[var(--line)] pt-4">
            <p className="font-black text-[var(--muted)] text-sm">
              You're on the free tier. Upgrade to unlock Gold leads, territory lock, and WhatsApp alerts.
            </p>
          </div>
        )}
      </section>

      {/* Account details */}
      <section className="jf-box bg-white p-6">
        <p className="micro-label">ACCOUNT DETAILS</p>
        <div className="mt-4 grid gap-3">
          <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
            <span className="text-sm font-black uppercase text-[var(--muted)]">Email</span>
            <span className="font-mono text-sm">{user.email}</span>
          </div>
          <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
            <span className="text-sm font-black uppercase text-[var(--muted)]">Member since</span>
            <span className="font-mono text-sm">
              {user.created_at ? new Date(user.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '—'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-black uppercase text-[var(--muted)]">Password</span>
            <Link href="/forgot-password" className="text-sm font-black underline hover:text-[var(--yellow)]">
              Reset password →
            </Link>
          </div>
        </div>
      </section>

      {/* Sign out */}
      <section className="jf-box bg-white p-6">
        <button
          type="button"
          onClick={signOut}
          className="border-2 border-[var(--line)] px-4 py-2 text-sm font-black uppercase hover:bg-[var(--yellow)]"
        >
          SIGN OUT
        </button>
      </section>
    </main>
  );
}
