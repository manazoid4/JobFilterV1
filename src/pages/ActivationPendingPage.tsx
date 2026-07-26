"use client";
import { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { useAuth } from '../components/AuthProvider';

const TRADES = [
  { value: 'building', label: 'Builder / general contractor' },
  { value: 'carpentry', label: 'Carpenter / joiner' },
  { value: 'electrical', label: 'CCTV / security installer' },
  { value: 'electrical', label: 'Data cabling engineer' },
  { value: 'painting', label: 'Decorator / painter' },
  { value: 'electrical', label: 'Electrician' },
  { value: 'electrical', label: 'EV charger installer' },
  { value: 'electrical', label: 'Fire safety engineer' },
  { value: 'plumbing', label: 'Gas engineer' },
  { value: 'landscaping', label: 'Groundworker' },
  { value: 'hvac', label: 'Heat pump installer' },
  { value: 'hvac', label: 'HVAC engineer' },
  { value: 'landscaping', label: 'Landscaper' },
  { value: 'plumbing', label: 'Plumber' },
  { value: 'building', label: 'Quantity surveyor' },
  { value: 'roofing', label: 'Roofer' },
  { value: 'building', label: 'Scaffolder' },
  { value: 'electrical', label: 'Solar PV installer' },
  { value: 'building', label: 'Structural engineer' },
];

export function ActivationPendingPage() {
  const searchParams = useSearchParams();
  const tier = searchParams?.get('tier') || 'founding';
  const billing = searchParams?.get('billing') || 'monthly';
  const paid = searchParams?.get('paid') === '1';
  const { user } = useAuth();
  const [whatsapp, setWhatsapp] = useState('');
  const [whatsappOptIn, setWhatsappOptIn] = useState(false);
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
        body: JSON.stringify({ whatsapp: whatsappOptIn ? whatsapp : '', trade, postcode, company }),
      });
      const payload = await response.json() as { ok: boolean; error?: string };
      if (!response.ok || !payload.ok) throw new Error(payload.error ?? 'Activation failed.');

      if (whatsappOptIn) {
        const preference = await fetch('/api/account/notifications', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ whatsappEnabled: true, phone: whatsapp }),
        });
        if (!preference.ok) throw new Error('Could not save WhatsApp consent.');
      }

      if (paid) {
        setStatus('done');
        return;
      }

      const checkout = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier,
          billing,
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
        <section role="status" aria-live="polite" className="ops-panel bg-[var(--yellow)] p-8">
          <p className="micro-label text-[var(--ink)]">PROFILE CONFIRMED</p>
          <h1 className="headline mt-3 text-5xl leading-none md:text-7xl">YOU'RE IN THE SYSTEM.</h1>
          <p className="mt-4 max-w-2xl text-xl font-bold text-[var(--ink)]">
            Profile set. Run your first scan now — every current public tender in your trade and area, scored and ranked. No Bark credits. No Checkatrade auction. Just real jobs.
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
          {paid ? 'SET YOUR QUALIFICATION PROFILE.' : 'ONE STEP FROM YOUR FIRST SCAN.'}
        </h1>
        <p className={`mt-4 max-w-2xl text-xl font-bold ${paid ? 'text-[var(--ink)]' : 'text-white/80'}`}>
          {paid
            ? 'Payment confirmed by Stripe. Tell us your trade and area so JobFilter can qualify relevant public-work opportunities.'
            : 'Tell us your trade, company and working area so JobFilter can qualify relevant public-work opportunities before checkout.'}
        </p>
      </section>

      <section className="jf-box bg-white p-7">
        <p className="micro-label text-[var(--orange)]">CONFIRM YOUR SETUP</p>
        <h2 className="headline mt-2 text-3xl leading-none">{paid ? '4 details — then you\'re live.' : 'Set up below. Pay in under 2 minutes.'}</h2>
        <form onSubmit={submit} className="mt-6 grid gap-4" aria-busy={status === 'loading'}>
          <label htmlFor="activation-whatsapp" className="field-label">
            WhatsApp number (optional)
            <input
              id="activation-whatsapp"
              name="tel"
              autoComplete="tel"
              inputMode="tel"
              className="field-input"
              type="tel"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="+44 7700 900000"
              required={whatsappOptIn}
              disabled={!whatsappOptIn}
            />
          </label>
          <label htmlFor="activation-whatsapp-opt-in" className="flex items-start gap-3 border-2 border-[var(--line)] bg-[var(--bg-main)] p-3 text-sm font-bold text-[var(--ink)]">
            <input id="activation-whatsapp-opt-in" name="whatsapp-opt-in" type="checkbox" checked={whatsappOptIn} onChange={(e) => setWhatsappOptIn(e.target.checked)} className="mt-1 h-4 w-4" />
            <span id="activation-whatsapp-consent">I explicitly opt in to proactive JobFilter WhatsApp alerts sent through approved Meta templates. I can opt out at any time.</span>
          </label>
          <label htmlFor="activation-trade" className="field-label">
            Your trade
            <select id="activation-trade" name="trade" className="field-input" value={trade} onChange={(e) => setTrade(e.target.value)} required>
              <option value="">Select trade…</option>
              {TRADES.map((t) => <option key={t.label} value={t.value}>{t.label}</option>)}
            </select>
          </label>
          <label htmlFor="activation-postcode" className="field-label">
            Your area (e.g. B14, SW1, M20)
            <input
              id="activation-postcode"
              name="postal-code"
              autoComplete="postal-code"
              className="field-input"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value.toUpperCase())}
              placeholder="B14"
              required
            />
          </label>
          <label htmlFor="activation-company" className="field-label">
            Company name
            <input
              id="activation-company"
              name="organization"
              autoComplete="organization"
              className="field-input"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Your company name"
            />
          </label>
          {status === 'error' && (
            <p id="activation-error" role="alert" aria-live="assertive" className="font-black text-[var(--orange)]">Something went wrong — email us at support@jobfilter.uk and we'll get you sorted.</p>
          )}
          <button type="submit" disabled={status === 'loading'} className="jf-button bg-[var(--ink)] text-white">
            {status === 'loading' ? 'SENDING...' : paid ? 'CONFIRM MY SETUP →' : 'SAVE PATCH AND CHECKOUT →'}
          </button>
          <p className="text-sm font-bold text-[var(--muted)]">Your profile is used to qualify opportunities; it does not guarantee volume or contract awards. Questions? <a href="mailto:support@jobfilter.uk" className="underline">support@jobfilter.uk</a></p>
        </form>
      </section>
    </main>
  );
}
