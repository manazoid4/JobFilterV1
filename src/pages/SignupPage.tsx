"use client";

import { FormEvent, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { createBrowserSupabaseClient } from '../lib/supabase/client';

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

export function SignupPage() {
  const searchParams = useSearchParams();
  const tier = searchParams?.get('tier') || 'founding';
  const billing = searchParams?.get('billing') || 'monthly';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [trade, setTrade] = useState('electrical');
  const [postcodeOutward, setPostcodeOutward] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');

  const planLabel = useMemo(() => {
    if (tier === 'pro') return billing === 'annual' ? 'Standard annual' : 'Standard monthly';
    if (tier === 'epc') return 'Retrofit & Energy Plan';
    return billing === 'annual' ? 'Founder annual' : 'Founder monthly';
  }, [tier, billing]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setStatus('loading');
    setError('');

    const origin = window.location.origin;
    const next = `/activation-pending?tier=${encodeURIComponent(tier)}&billing=${encodeURIComponent(billing)}`;

    try {
      const supabase = createBrowserSupabaseClient();
      const { error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent(next)}`,
          data: {
            company_name: companyName.trim(),
            phone: phone.trim(),
            trade,
            postcode_outward: postcodeOutward.trim().toUpperCase(),
            intended_plan: tier,
            intended_billing: billing,
          },
        },
      });

      if (signUpError) throw signUpError;
      setStatus('sent');
    } catch (err: any) {
      setStatus('error');
      setError(String(err?.message ?? 'Signup failed.'));
    }
  }

  if (status === 'sent') {
    return (
      <main className="page-shell py-10">
        <section role="status" aria-live="polite" className="ops-panel bg-[var(--yellow)] p-8">
          <p className="micro-label text-[var(--ink)]">CHECK YOUR EMAIL</p>
          <h1 className="headline mt-3 text-5xl leading-none md:text-7xl">CONFIRM YOUR ACCOUNT.</h1>
          <p className="mt-4 max-w-2xl text-xl font-bold text-[var(--ink)]">
            We sent the confirmation link to {email}. Click it to confirm your account and activate your patch.
          </p>
          <p className="mt-3 max-w-2xl text-sm font-bold text-[var(--ink)]/70">
            Check your spam folder if you don&apos;t see it within 2 minutes.
          </p>
          <Link href="/find-jobs" className="jf-button mt-6 inline-block bg-[var(--ink)] text-white">BROWSE LIVE LEADS →</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell grid gap-6 py-10">
      <section className="ops-panel bg-[var(--ink)] p-8 text-white">
        <p className="micro-label text-[var(--yellow)]">NO PER-LEAD FEES. NO CHECKATRADE CREDITS. NO BARK AUCTIONS.</p>
        <h1 className="headline mt-3 text-5xl leading-none text-white md:text-7xl">GET PUBLIC CONTRACTS FOR YOUR TRADE.</h1>
        <p className="mt-4 max-w-2xl text-xl font-bold text-white/80">
          {planLabel}. Enter your trade and patch below. We qualify current public notices against your area so you only see jobs worth pricing — not every notice posted.
        </p>
      </section>

      <form onSubmit={submit} className="jf-box grid gap-4 bg-white p-7" aria-busy={status === 'loading'}>
        <label htmlFor="signup-email" className="field-label">
          Email
          <input id="signup-email" name="email" autoComplete="email" className="field-input" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </label>
        <label htmlFor="signup-password" className="field-label">
          Password
          <input id="signup-password" name="password" autoComplete="new-password" aria-describedby="signup-password-hint" className="field-input" type="password" minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} required />
          <span id="signup-password-hint" className="text-xs font-bold normal-case tracking-normal text-[var(--muted)]">Use at least 8 characters.</span>
        </label>
        <label htmlFor="signup-company" className="field-label">
          Company name
          <input id="signup-company" name="organization" autoComplete="organization" className="field-input" value={companyName} onChange={(event) => setCompanyName(event.target.value)} required />
        </label>
        <label htmlFor="signup-phone" className="field-label">
          WhatsApp number
          <input id="signup-phone" name="tel" autoComplete="tel" inputMode="tel" className="field-input" type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="+44 7700 900000" required />
        </label>
        <label htmlFor="signup-trade" className="field-label">
          Trade
          <select id="signup-trade" name="trade" className="field-input" value={trade} onChange={(event) => setTrade(event.target.value)} required>
            {TRADES.map((item) => <option key={item.label} value={item.value}>{item.label}</option>)}
          </select>
        </label>
        <label htmlFor="signup-postcode" className="field-label">
          Your area (e.g. B14, SW1, M20)
          <input id="signup-postcode" name="postal-code" autoComplete="postal-code" className="field-input" value={postcodeOutward} onChange={(event) => setPostcodeOutward(event.target.value.toUpperCase())} placeholder="B14" required />
        </label>
        {status === 'error' && <p id="signup-error" role="alert" aria-live="assertive" className="font-black text-[var(--orange)]">{error}</p>}
        <button type="submit" className="jf-button bg-[var(--yellow)] text-[var(--ink)]" disabled={status === 'loading'}>
          {status === 'loading' ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT →'}
        </button>
        <p className="text-xs font-black text-[var(--muted)]">No card required to create your account — payment comes after you confirm your email.</p>
        <div className="flex flex-wrap gap-3 border-t-2 border-[var(--line)] pt-4">
          <span className="border-2 border-[var(--line)] px-3 py-1 text-xs font-black uppercase text-[var(--muted)]">30-DAY MONEY-BACK</span>
          <span className="border-2 border-[var(--line)] px-3 py-1 text-xs font-black uppercase text-[var(--muted)]">CANCEL ANYTIME</span>
          <span className="border-2 border-[var(--line)] px-3 py-1 text-xs font-black uppercase text-[var(--muted)]">NO CONTRACT</span>
        </div>
      </form>
    </main>
  );
}
