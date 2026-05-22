import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider';

export function SignupPage() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (password !== confirm) { setError('Passwords do not match'); return; }
    if (password.length < 8) { setError('Password must be at least 8 characters'); return; }
    setLoading(true);
    const { error } = await signUp(email, password);
    setLoading(false);
    if (error) { setError(error); return; }
    setDone(true);
  }

  if (done) {
    return (
      <main className="page-shell py-16">
        <section className="jf-box max-w-md mx-auto bg-white p-8 text-center">
          <p className="text-4xl mb-4">✅</p>
          <h1 className="headline text-2xl mb-3">Check your email</h1>
          <p className="text-sm text-[var(--muted)]">
            We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account, then{' '}
            <Link to="/login" className="font-black underline">sign in here</Link>.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell py-16">
      <section className="jf-box max-w-md mx-auto bg-white p-8">
        <p className="micro-label text-[var(--yellow)]">JOBFILTER</p>
        <h1 className="headline text-3xl mt-2 mb-6">Create account</h1>
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
            {loading ? 'Creating account...' : 'CREATE ACCOUNT'}
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Already have an account?{' '}
          <Link to="/login" className="font-black underline hover:text-[var(--yellow)]">
            Sign in →
          </Link>
        </p>
      </section>
    </main>
  );
}
