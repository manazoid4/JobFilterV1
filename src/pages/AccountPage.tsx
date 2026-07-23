"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createBrowserSupabaseClient } from '../lib/supabase/client';
import type { User } from '@supabase/supabase-js';

type SubStatus = {
  tier: 'free' | 'founding' | 'pro' | 'business';
  status: 'active' | 'trialing' | 'inactive' | 'past_due' | 'canceled' | 'cancelled' | 'unpaid' | 'incomplete' | 'incomplete_expired' | 'paused';
  active: boolean;
  loading: boolean;
  currentPeriodEnd?: string | null;
};

const DEFAULT_SUB: SubStatus = { tier: 'free', status: 'inactive', active: false, loading: true };

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
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [sub, setSub] = useState<SubStatus>(DEFAULT_SUB);
  const [portalLoading, setPortalLoading] = useState(false);
  const [portalError, setPortalError] = useState('');
  const [whatsappPhone, setWhatsappPhone] = useState('');
  const [whatsappEnabled, setWhatsappEnabled] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  useEffect(() => {
    try {
      const supabase = createBrowserSupabaseClient();
      supabase.auth.getUser().then(({ data }) => {
        setUser(data.user);
        setAuthLoading(false);
        if (data.user?.email) {
          fetch(`/api/subscription-status?user_id=${encodeURIComponent(data.user.id)}&email=${encodeURIComponent(data.user.email)}`)
            .then(r => r.json())
            .then(d => setSub({ ...d, loading: false }))
            .catch(() => setSub({ ...DEFAULT_SUB, loading: false }));
        } else {
          setSub({ ...DEFAULT_SUB, loading: false });
        }
      });
    } catch {
      setAuthLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!user) return;
    fetch('/api/account/notifications', { credentials: 'include' })
      .then((response) => response.ok ? response.json() : null)
      .then((data) => {
        if (!data) return;
        setWhatsappPhone(data.phone ?? '');
        setWhatsappEnabled(data.whatsappEnabled === true);
      })
      .catch(() => undefined);
  }, [user]);

  if (authLoading) return null;
  if (!user) { router.replace('/login'); return null; }

  async function signOut() {
    try {
      const supabase = createBrowserSupabaseClient();
      await supabase.auth.signOut();
    } catch { /* proceed if supabase unavailable */ }
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch { /* SSR cookie may already be cleared */ }
    router.replace('/login');
  }

  async function openBillingPortal() {
    setPortalLoading(true);
    setPortalError('');
    try {
      const res = await fetch('/api/customer-portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
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

  async function saveNotifications(event: React.FormEvent) {
    event.preventDefault();
    setNotificationStatus('saving');
    const response = await fetch('/api/account/notifications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ whatsappEnabled, phone: whatsappPhone }),
    }).catch(() => null);
    setNotificationStatus(response?.ok ? 'saved' : 'error');
  }

  const isActive = sub.active;
  const tier = sub.tier;
  const isPastDue = sub.status === 'past_due' || sub.status === 'unpaid' || sub.status === 'incomplete';
  const isCancelled = sub.status === 'canceled' || sub.status === 'cancelled' || sub.status === 'incomplete_expired';
  const hasBillingAccount = tier !== 'free' || isPastDue || isCancelled;

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
                <span className="ml-2 border-2 border-[var(--green)] px-2 py-0.5 text-xs font-black uppercase text-[var(--green)]">
                  ACTIVE
                </span>
              )}
              {!isActive && tier !== 'free' && (
                <span className="ml-2 border-2 border-[var(--orange)] px-2 py-0.5 text-xs font-black uppercase text-[var(--orange)]">
                  {subscriptionStatusLabel(sub.status)}
                </span>
              )}
            </p>
          </div>
          {isActive || isPastDue ? (
            <button
              type="button"
              onClick={openBillingPortal}
              disabled={portalLoading}
              className="jf-button bg-[var(--ink)] text-white text-sm"
            >
              {portalLoading ? 'Opening...' : isPastDue ? 'FIX PAYMENT DETAILS →' : 'MANAGE BILLING →'}
            </button>
          ) : isCancelled ? (
            <div className="grid gap-2 sm:grid-cols-2">
              <Link href="/pricing" className="jf-button bg-[var(--yellow)] text-[var(--ink)] text-sm">
                REACTIVATE — £39/MO →
              </Link>
              <button
                type="button"
                onClick={openBillingPortal}
                disabled={portalLoading}
                className="jf-button bg-white text-[var(--ink)] text-sm"
              >
                {portalLoading ? 'Opening...' : 'VIEW BILLING HISTORY →'}
              </button>
            </div>
          ) : (
            <div>
              <a href="/pricing" className="jf-button bg-[var(--yellow)] text-[var(--ink)] text-sm">
                UPGRADE TO FOUNDER — £39/MO →
              </a>
              <p className="mt-2 text-xs font-black text-[var(--muted)]">30-day money-back guarantee. Cancel any time.</p>
            </div>
          )}
        </div>
        {portalError && <p className="mt-3 text-sm font-black text-[var(--orange)]">{portalError}</p>}

        {isPastDue && (
          <div className="mt-6 border-2 border-[var(--orange)] bg-[var(--orange)]/10 p-4">
            <p className="font-black text-[var(--ink)]">PAYMENT NEEDS ATTENTION</p>
            <p className="mt-1 text-sm font-bold text-[var(--muted)]">
              Paid access and alerts are paused. Update your payment method in Stripe to restore them.
            </p>
          </div>
        )}

        {isCancelled && (
          <div className="mt-6 border-2 border-[var(--line)] bg-[var(--bg-main)] p-4">
            <p className="font-black text-[var(--ink)]">SUBSCRIPTION CANCELLED</p>
            <p className="mt-1 text-sm font-bold text-[var(--muted)]">
              Future billing has stopped. Reactivate from pricing whenever you want to restore paid access.
            </p>
          </div>
        )}

        {!isActive && !hasBillingAccount && (
          <div className="mt-6 border-t-2 border-[var(--line)] pt-4">
            <p className="font-bold text-[var(--muted)] text-sm">
              You&apos;re on free. You can run 3 qualification scans each week; paid access adds full public-notice evidence, workflow and company-aware decisions.
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

      <section className="jf-box bg-white p-6">
        <p className="micro-label">NOTIFICATION CONSENT</p>
        <h2 className="headline mt-2 text-2xl">WHATSAPP ALERTS</h2>
        <p className="mt-2 text-sm font-bold text-[var(--muted)]">
          Optional proactive alerts use an approved Meta template. They remain off until you explicitly enable them, and you can opt out here at any time.
        </p>
        <form onSubmit={saveNotifications} className="mt-4 grid max-w-xl gap-3">
          <label className="field-label">
            WhatsApp number
            <input type="tel" className="field-input" value={whatsappPhone} onChange={(event) => setWhatsappPhone(event.target.value)} disabled={!whatsappEnabled} required={whatsappEnabled} placeholder="+44 7700 900000" />
          </label>
          <label className="flex items-start gap-3 border-2 border-[var(--line)] bg-[var(--bg-main)] p-3 text-sm font-bold">
            <input type="checkbox" className="mt-1 h-4 w-4" checked={whatsappEnabled} onChange={(event) => setWhatsappEnabled(event.target.checked)} />
            <span>I opt in to proactive JobFilter WhatsApp alerts. Untick and save to opt out.</span>
          </label>
          <button type="submit" disabled={notificationStatus === 'saving'} className="jf-button w-fit bg-[var(--ink)] text-white disabled:opacity-50">
            {notificationStatus === 'saving' ? 'SAVING…' : 'SAVE NOTIFICATIONS'}
          </button>
          <p aria-live="polite" className={`text-sm font-black ${notificationStatus === 'error' ? 'text-[var(--orange)]' : 'text-[var(--green)]'}`}>
            {notificationStatus === 'saved' ? 'Notification preferences saved.' : notificationStatus === 'error' ? 'Could not save preferences.' : ''}
          </p>
        </form>
      </section>

      {/* Sign out */}
      <section className="jf-box bg-white p-6">
        <button
          type="button"
          onClick={signOut}
          className="border-2 border-[var(--line)] px-4 py-2 text-sm font-black uppercase hover:bg-[var(--yellow)]"
        >
          SIGN OUT →
        </button>
      </section>
    </main>
  );
}

function subscriptionStatusLabel(status: SubStatus['status']) {
  if (status === 'past_due' || status === 'unpaid' || status === 'incomplete') return 'PAYMENT DUE';
  if (status === 'canceled' || status === 'cancelled' || status === 'incomplete_expired') return 'CANCELLED';
  if (status === 'trialing') return 'TRIAL';
  return status.replace(/_/g, ' ').toUpperCase();
}
