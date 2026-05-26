"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserSupabaseClient } from '../lib/supabase/client';

export function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let subscription: { unsubscribe: () => void } | null = null;
    try {
      const supabase = createBrowserSupabaseClient();
      const { data } = supabase.auth.onAuthStateChange((event) => {
        if (event === 'PASSWORD_RECOVERY') setReady(true);
      });
      subscription = data.subscription;
    } catch { /* env vars not set */ }
    return () => subscription?.unsubscribe();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (password !== confirm) { setError('Passwords do not match'); return; }
    if (password.length < 8) { setError('Password must be at least 8 characters'); return; }
    setLoading(true);
    try {
      const supabase = createBrowserSupabaseClient();
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) { setError(updateError.message); return; }
      router.push('/dashboard');
    } catch {
      setError('Could not update password — try again');
    } finally {
      setLoading(false);
    }
  }

  if (!ready) {
    return (
      <main className="page-shell py-16">
        <section className="jf-box max-w-md mx-auto bg-white p-8 text-center">
          <p className="font-black text-[var(--muted)]">Verifying reset link...</p>
          <p className="mt-3 text-sm text-[var(--muted)]">
            If nothing happens, your link may have expired.{' '}
            <a href="/forgot-password" className="font-black underline">Request a new one →</a>
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell py-16">
      <section className="jf-box max-w-md mx-auto bg-white p-8">
        <p className="micro-label text-[var(--yellow)]">JOBFILTER</p>
        <h1 className="headline text-3xl mt-2 mb-6">Set new password</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-black uppercase mb-1">New password</label>
            <input
              type="password" required value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border-2 border-[var(--line)] bg-[var(--paper)] px-3 py-2 font-mono text-sm focus:border-[var(--ink)] focus:outline-none"
              placeholder="Min 8 characters"
            />
          </div>
          <div>
            <label className="block text-sm font-black uppercase mb-1">Confirm password</label>
            <input
              type="password" required value={confirm}
              onChange={e => setConfirm(e.target.value)}
              className="w-full border-2 border-[var(--line)] bg-[var(--paper)] px-3 py-2 font-mono text-sm focus:border-[var(--ink)] focus:outline-none"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-sm font-bold text-red-600">{error}</p>}
          <button type="submit" disabled={loading} className="jf-button w-full">
            {loading ? 'Saving...' : 'SET PASSWORD'}
          </button>
        </form>
      </section>
    </main>
  );
}
