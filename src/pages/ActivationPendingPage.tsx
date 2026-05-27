"use client";
import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { createBrowserSupabaseClient } from '../lib/supabase/client';

const TRADES = ['Electrical', 'Plumbing', 'Roofing', 'Building', 'HVAC', 'Carpentry', 'Landscaping', 'Painting', 'Heat Pumps'];

export function ActivationPendingPage() {
  const searchParams = useSearchParams();
  const tier = searchParams?.get('tier') || 'founding';
  const billing = searchParams?.get('billing') || 'monthly';
  const paid = searchParams?.get('paid') === '1';
  const [whatsapp, setWhatsapp] = useState('');
  const [trade, setTrade] = useState('');
  const [postcode, setPostcode] = useState('');
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

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
          <p className="micro-label text-[var(--ink)]">SETUP RECEIVED</p>
          <h1 className="headline mt-3 text-5xl leading-none md:text-7xl">YOU'RE IN THE SYSTEM.</h1>
          <p className="mt-4 max-w-2xl text-xl font-black text-[var(--ink)]">
            Your territory details are confirmed. We'll have your patch active and WhatsApp alerts running within 2 hours. While you wait — run your first free scan.
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
      <section className="ops-panel bg-[var(--yellow)] p-8">
          <p className="micro-label text-[var(--ink)]">{paid ? 'PAYMENT RECEIVED' : 'ACCOUNT CONFIRMED'}</p>
          <h1 className="headline mt-3 text-5xl leading-none md:text-7xl">{paid ? 'TERRITORY ACTIVATION PENDING.' : 'CONFIRM YOUR PATCH.'}</h1>
          <p className="mt-4 max-w-2xl text-xl font-black text-[var(--ink)]">
          {paid
            ? 'One step left. Confirm your details below so we can activate your patch and start routing Gold leads to your WhatsApp.'
            : 'Set your trade and area below. Then we\'ll take you straight to payment — takes under 2 minutes.'}
        </p>
      </section>

      <section className="jf-box bg-white p-7">
          <p className="micro-label text-[var(--orange)]">CONFIRM YOUR SETUP</p>
        <h2 className="headline mt-2 text-3xl leading-none">{paid ? 'Your leads go live in 2 hours.' : 'Set your patch — then straight to payment.'}</h2>
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
              {TRADES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </label>
          <label className="field-label">
            Postcode cluster (e.g. B14, SW1, M20)
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
          <p className="text-sm font-black text-[var(--muted)]">We'll have your patch active within 2 hours. Questions? <a href="mailto:support@jobfilter.uk" className="underline">support@jobfilter.uk</a></p>
        </form>
      </section>
    </main>
  );
}
