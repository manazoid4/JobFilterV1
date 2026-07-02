"use client";
import { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { createBrowserSupabaseClient } from '../lib/supabase/client';
import { useAuth } from '../components/AuthProvider';

const TRADES = [
  { value: 'electrical', label: 'Electrician' },
  { value: 'electrical', label: 'EV charger installer' },
  { value: 'plumbing', label: 'Plumber' },
  { value: 'plumbing', label: 'Gas engineer' },
  { value: 'roofing', label: 'Roofer' },
  { value: 'building', label: 'Builder / general contractor' },
  { value: 'carpentry', label: 'Carpenter / joiner' },
  { value: 'painting', label: 'Decorator / painter' },
  { value: 'hvac', label: 'HVAC engineer' },
  { value: 'hvac', label: 'Heat pump installer' },
  { value: 'landscaping', label: 'Landscaper / groundworks' },
];

export function ActivationPendingPage() {
  const searchParams = useSearchParams();
  const tier = searchParams?.get('tier') || 'founding';
  const billing = searchParams?.get('billing') || 'monthly';
  const paid = searchParams?.get('paid') === '1';
  const { user } = useAuth();
  const [whatsapp, setWhatsapp] = useState('');
  const [trade, setTrade] = useState('');
  const [postcode, setPostcode] = useState('');
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  // Pre-fill from signup metadata so the tradesman doesn't re-enter the same data
  useEffect(() => {
    const meta = user?.user_metadata;
    if (!meta) return;
    if (!trade && meta.trade) setTrade(String(meta.trade));
    if (!postcode && meta.postcode_outward) setPostcode(String(meta.postcode_outward));
    if (!company && meta.company_name) setCompany(String(meta.company_name));
  }, [user]);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await fetch('/api/account/activation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ whatsapp, trade, postcode, company }),
      });
      const payload = await response.json() as { ok: boolean; error?: string };
      if (!response.ok || !payload.ok) throw new Error(payload.error ?? 'Activation failed.');

      if (paid) {
        setStatus('done');
        return;
      }

      const supabase = createBrowserSupabaseClient();
      const { data } = await supabase.auth.getUser();
      const checkout = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier,
          billing,
          email: data.user?.email,
          userId: data.user?.id,
          trade,
          postcodeOutward: postcode.trim().toUpperCase(),
        }),
      });
      const checkoutPayload = await checkout.json() as { ok?: boolean; url?: string; error?: string };
      if (!checkout.ok || !checkoutPayload.url) throw new Error(checkoutPayload.error ?? 'Checkout failed.');
      window.location.href = checkoutPayload.url;
    } catch (err: any) {
      console.error(err);
      setStatus('error');
    }
  }

  if (status === 'done') {
    return (
      <main className="page-shell py-10">
        <section className="ops-panel bg-[var(--yellow)] p-8">
          <p className="micro-label text-[var(--ink)]">PATCH CONFIRMED</p>
          <h1 className="headline mt-3 text-5xl leading-none md:text-7xl">YOU'RE IN THE SYSTEM.</h1>
          <p className="mt-4 max-w-2xl text-xl font-black text-[var(--ink)]">
            Patch confirmed. Gold leads will hit your WhatsApp within 2 hours. Run a scan now — full access is live.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link className="jf-button bg-[var(--ink)] text-white" href="/find-jobs">RUN FIRST SCAN →</Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell py-10 grid gap-6">
      <section className={`ops-panel p-8 ${paid ? 'bg-[var(--yellow)]' : 'bg-[var(--ink)]'}`}>
        <p className={`micro-label ${paid ? 'text-[var(--ink)]' : 'text-[var(--yellow)]'}`}>{paid ? 'PAYMENT CONFIRMED' : 'ACCOUNT CONFIRMED'}</p>
        <h1 className={`headline mt-3 text-5xl leading-none md:text-7xl ${paid ? 'text-[var(--ink)]' : 'text-white'}`}>
          {paid ? 'SET YOUR PATCH. LIVE IN 2 HOURS.' : 'ONE STEP FROM YOUR FIRST LEAD.'}
        </h1>
        <p className={`mt-4 max-w-2xl text-xl font-black ${paid ? 'text-[var(--ink)]' : 'text-white/80'}`}>
          {paid
            ? 'Payment confirmed by Stripe. Tell us your trade and area — Gold leads hit your WhatsApp within 2 hours.'
            : 'Set your trade and patch — then complete payment via Stripe. Takes under 2 minutes. 30-day money-back. Cancel anytime.'}
        </p>
      </section>

      <section className="jf-box bg-white p-7">
        <p className="micro-label text-[var(--orange)]">CONFIRM YOUR SETUP</p>
        <h2 className="headline mt-2 text-3xl leading-none">{paid ? '4 details — then you\'re live.' : 'Set up below. Pay in under 2 minutes.'}</h2>
        <form onSubmit={submit} className="mt-6 grid gap-4">
          <label className="field-label">
            WhatsApp number (required — this is where Gold leads are sent)
            <input
              className="field-input"
              type="tel"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="+44 7700 900000"
              required
            />
          </label>
          <label className="field-label">
            Your trade
            <select className="field-input" value={trade} onChange={(e) => setTrade(e.target.value)} required>
              <option value="">Select trade…</option>
              {TRADES.map((t) => <option key={t.label} value={t.value}>{t.label}</option>)}
            </select>
          </label>
          <label className="field-label">
            Your area (e.g. B14, SW1, M20)
            <input
              className="field-input"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value.toUpperCase())}
              placeholder="B14"
              required
            />
          </label>
          <label className="field-label">
            Company name
            <input
              className="field-input"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Your company name"
            />
          </label>
          {status === 'error' && (
            <p className="font-black text-[var(--orange)]">Something went wrong — email us at support@jobfilter.uk and we'll get you sorted.</p>
          )}
          <button type="submit" disabled={status === 'loading'} className="jf-button bg-[var(--ink)] text-white">
            {status === 'loading' ? 'SENDING...' : paid ? 'CONFIRM MY SETUP' : 'SAVE PATCH AND CHECKOUT'}
          </button>
          <p className="text-sm font-black text-[var(--muted)]">{paid ? 'We\'ll have your patch active within 2 hours.' : 'After checkout, your patch goes live within 2 hours.'} Questions? <a href="mailto:support@jobfilter.uk" className="underline">support@jobfilter.uk</a></p>
        </form>
      </section>
    </main>
  );
}
