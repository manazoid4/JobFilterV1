"use client";

import { FormEvent, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { createBrowserSupabaseClient } from '../lib/supabase/client';

const TRADES = ['electrical', 'plumbing', 'roofing', 'building', 'carpentry', 'painting', 'hvac', 'landscaping'];

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
    if (tier === 'epc') return 'EPC Signal Engine';
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
        <section className="ops-panel bg-[var(--yellow)] p-8">
          <p className="micro-label text-[var(--ink)]">CHECK YOUR EMAIL</p>
          <h1 className="headline mt-3 text-5xl leading-none md:text-7xl">CONFIRM YOUR ACCOUNT.</h1>
          <p className="mt-4 max-w-2xl text-xl font-black text-[var(--ink)]">
            We sent the confirmation link to {email}. It will bring you back to JobFilter, not localhost.
          </p>
          <Link href="/pricing" className="jf-button mt-6 inline-block bg-[var(--ink)] text-white">BACK TO PRICING</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell grid gap-6 py-10">
      <section className="ops-panel bg-[var(--ink)] p-8 text-white">
        <p className="micro-label text-[var(--yellow)]">CREATE YOUR JOBFILTER ACCOUNT</p>
        <h1 className="headline mt-3 text-5xl leading-none text-white md:text-7xl">LOCK THE ACCOUNT FIRST.</h1>
        <p className="mt-4 max-w-2xl text-xl font-black text-white/80">
          {planLabel}. Confirm your account, then activate your patch and WhatsApp lead routing.
        </p>
      </section>

      <form onSubmit={submit} className="jf-box grid gap-4 bg-white p-7">
        <label className="field-label">
          Work email
          <input className="field-input" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </label>
        <label className="field-label">
          Password
          <input className="field-input" type="password" minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} required />
        </label>
        <label className="field-label">
          Company name
          <input className="field-input" value={companyName} onChange={(event) => setCompanyName(event.target.value)} required />
        </label>
        <label className="field-label">
          WhatsApp number
          <input className="field-input" type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="+44 7700 900000" required />
        </label>
        <label className="field-label">
          Trade
          <select className="field-input" value={trade} onChange={(event) => setTrade(event.target.value)} required>
            {TRADES.map((item) => <option key={item} value={item}>{item.toUpperCase()}</option>)}
          </select>
        </label>
        <label className="field-label">
          Postcode cluster
          <input className="field-input" value={postcodeOutward} onChange={(event) => setPostcodeOutward(event.target.value.toUpperCase())} placeholder="B14" required />
        </label>
        {status === 'error' && <p className="font-black text-[var(--orange)]">{error}</p>}
        <button className="jf-button bg-[var(--yellow)] text-[var(--ink)]" disabled={status === 'loading'}>
          {status === 'loading' ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
        </button>
      </form>
    </main>
  );
}
