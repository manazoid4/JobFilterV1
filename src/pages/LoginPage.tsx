"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createBrowserSupabaseClient } from '../lib/supabase/client';

export function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const supabase = createBrowserSupabaseClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) { setError(signInError.message); return; }
      router.push('/dashboard');
    } catch (err: any) {
      setError(String(err?.message ?? 'Sign in failed'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-shell py-16">
      <section className="jf-box max-w-md mx-auto bg-white p-8">
        <p className="micro-label text-[var(--yellow)]">JOBFILTER</p>
        <h1 className="headline text-3xl mt-2 mb-6">Sign in</h1>
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
          <div>
            <label className="block text-sm font-black uppercase mb-1">Password</label>
            <input
              type="password" required value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border-2 border-[var(--line)] bg-[var(--paper)] px-3 py-2 font-mono text-sm focus:border-[var(--ink)] focus:outline-none"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-sm font-bold text-red-600">{error}</p>}
          <button type="submit" disabled={loading} className="jf-button w-full">
            {loading ? 'Signing in...' : 'SIGN IN'}
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          <Link href="/forgot-password" className="font-black underline hover:text-[var(--yellow)]">
            Forgot password?
          </Link>
        </p>
        <p className="mt-2 text-sm text-center">
          No account?{' '}
          <Link href="/signup" className="font-black underline hover:text-[var(--yellow)]">
            Create one →
          </Link>
        </p>
      </section>
    </main>
  );
}
