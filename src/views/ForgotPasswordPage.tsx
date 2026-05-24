import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (!supabase) { setError('Auth not available'); setLoading(false); return; }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) { setError(error.message); return; }
    setDone(true);
  }

  if (done) {
    return (
      <main className="page-shell py-16">
        <section className="jf-box max-w-md mx-auto bg-white p-8 text-center">
          <p className="text-4xl mb-4">📧</p>
          <h1 className="headline text-2xl mb-3">Check your email</h1>
          <p className="text-sm text-[var(--muted)]">
            If <strong>{email}</strong> has an account, we sent a password reset link. Check your inbox and spam.
          </p>
          <Link to="/login" className="mt-6 inline-block jf-button">BACK TO SIGN IN</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell py-16">
      <section className="jf-box max-w-md mx-auto bg-white p-8">
        <p className="micro-label text-[var(--yellow)]">JOBFILTER</p>
        <h1 className="headline text-3xl mt-2 mb-2">Reset password</h1>
        <p className="text-sm text-[var(--muted)] mb-6">Enter your email and we'll send a reset link.</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-black uppercase mb-1">Email</label>
            <input
              type="email" required value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border-2 border-[var(--line)] bg-[var(--paper)] px-3 py-2 font-mono text-sm focus:border-[var(--ink)] focus:outline-none"
              placeholder="you@example.com"
            />
          </div>
          {error && <p className="text-sm font-bold text-red-600">{error}</p>}
          <button type="submit" disabled={loading} className="jf-button w-full">
            {loading ? 'Sending...' : 'SEND RESET LINK'}
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          <Link to="/login" className="font-black underline hover:text-[var(--yellow)]">
            ← Back to sign in
          </Link>
        </p>
      </section>
    </main>
  );
}
