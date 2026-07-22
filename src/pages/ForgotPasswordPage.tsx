"use client";
import { useState } from 'react';
import Link from 'next/link';
import { createBrowserSupabaseClient } from '../lib/supabase/client';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const supabase = createBrowserSupabaseClient();
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (resetError) { setError(resetError.message); return; }
      setDone(true);
    } catch {
      setError('Could not send reset link — try again');
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <main className="page-shell py-16">
        <section role="status" aria-live="polite" className="jf-box max-w-md mx-auto bg-white p-8 text-center">
          <h1 className="headline text-2xl mb-3">CHECK YOUR EMAIL</h1>
          <p className="text-sm text-[var(--muted)]">
            If <strong>{email}</strong> has an account, we sent a password reset link. Check your inbox and spam.
          </p>
          <Link href="/login" className="mt-6 inline-block jf-button bg-[var(--navy)] text-white">BACK TO SIGN IN →</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell py-16">
      <section className="jf-box max-w-md mx-auto bg-white p-8">
        <p className="micro-label text-[var(--orange)]">JOBFILTER</p>
        <h1 className="headline text-3xl mt-2 mb-2">RESET PASSWORD</h1>
        <p className="text-sm text-[var(--muted)] mb-6">Enter your email and we'll send a reset link.</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4" aria-busy={loading}>
          <div>
            <label htmlFor="recovery-email" className="block text-sm font-black uppercase mb-1">Email</label>
            <input
              id="recovery-email" name="email" autoComplete="email"
              type="email" required value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border-2 border-[var(--line)] bg-[var(--paper)] px-3 py-2 font-mono text-sm focus:border-[var(--ink)] focus:outline-none"
              placeholder="you@example.com"
            />
          </div>
          {error && <p id="recovery-error" role="alert" aria-live="assertive" className="text-sm font-bold text-[var(--orange)]">{error}</p>}
          <button type="submit" disabled={loading} className="jf-button w-full bg-[var(--yellow)] text-[var(--ink)]">
            {loading ? 'Sending...' : 'SEND RESET LINK →'}
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          <Link href="/login" className="font-black underline hover:text-[var(--yellow)]">
            ← Back to sign in
          </Link>
        </p>
      </section>
    </main>
  );
}
