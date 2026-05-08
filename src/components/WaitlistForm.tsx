import { FormEvent, useEffect, useState } from 'react';
import { getWaitlistCount, joinWaitlist } from '../lib/waitlist';

const trades = ['Electrician', 'Plumber', 'Roofer', 'Builder', 'Landscaper', 'Joiner', 'Other'];

export function WaitlistForm({ source = 'site', compact = false, onDone }: { source?: string; compact?: boolean; onDone?: () => void }) {
  const [name, setName] = useState('');
  const [trade, setTrade] = useState('Electrician');
  const [contact, setContact] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    getWaitlistCount().then((data) => setRemaining(data.remaining)).catch(() => {});
  }, []);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Name is required.');
      return;
    }
    if (!contact.trim()) {
      setError('Email or phone is required.');
      return;
    }

    const isEmail = contact.includes('@');
    if (isEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!isEmail && !/^[\d\s+()-]{7,}$/.test(contact)) {
      setError('Please enter a valid phone number.');
      return;
    }

    setStatus('loading');
    try {
      await joinWaitlist({ name, trade, contact, source });
      setStatus('done');
      setName('');
      setContact('');
      getWaitlistCount().then((data) => setRemaining(data.remaining)).catch(() => {});
      onDone?.();
    } catch (err: any) {
      setStatus('error');
      setError(String(err?.message ?? 'Could not join waitlist.'));
    }
  }

  if (status === 'done') {
    return (
      <div className="jf-box bg-[var(--yellow)] p-5 text-[var(--ink)]">
        <p className="headline text-2xl sm:text-3xl">YOU'RE ON THE LIST.</p>
        <p className="mt-2 font-black">We'll let you know when it's live.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={`jf-box grid gap-3 bg-white ${compact ? 'p-4' : 'p-5'}`}>
      <p className="micro-label text-[var(--orange)]">JOIN WAITLIST</p>
      {remaining !== null && remaining <= 30 && (
        <p className="text-sm font-black text-[var(--green)]">{remaining} of 30 Founding slots remaining</p>
      )}
      <label className="field-label">
        Name
        <input className="field-input" value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" required />
      </label>
      <label className="field-label">
        Trade
        <select className="field-input" value={trade} onChange={(event) => setTrade(event.target.value)}>
          {trades.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
      </label>
      <label className="field-label">
        Email or phone
        <input className="field-input" value={contact} onChange={(event) => setContact(event.target.value)} placeholder="So we can contact you" required />
      </label>
      {status === 'error' && <p className="font-black text-[var(--orange)]">{error}</p>}
      {remaining !== null && (
        <p className="border-2 border-[var(--yellow)] bg-[var(--yellow)]/10 px-3 py-2 text-sm font-black text-[var(--ink)]">
          🔒 <strong>{remaining} of 30 Founding slots remaining</strong> — price locks at £29/month
        </p>
      )}
      <button className="jf-button bg-[var(--navy)] text-white" disabled={status === 'loading'}>
        {status === 'loading' ? 'JOINING' : 'JOIN WAITLIST'}
      </button>
    </form>
  );
}
