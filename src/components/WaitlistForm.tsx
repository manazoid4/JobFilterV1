import { FormEvent, useState } from 'react';
import { joinWaitlist } from '../lib/waitlist';

const trades = ['Electrician', 'Plumber', 'Roofer', 'Builder', 'Landscaper', 'Joiner', 'Other'];

export function WaitlistForm({ source = 'site' }: { source?: string }) {
  const [name, setName] = useState('');
  const [trade, setTrade] = useState('Electrician');
  const [contact, setContact] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [error, setError] = useState('');

  async function submit(event: FormEvent) {
    event.preventDefault();
    setStatus('loading');
    setError('');
    try {
      await joinWaitlist({ name, trade, contact, source });
      setStatus('done');
      setName('');
      setContact('');
    } catch (err: any) {
      setStatus('error');
      setError(String(err?.message ?? 'Could not join waitlist.'));
    }
  }

  if (status === 'done') {
    return (
      <div className="jf-box bg-[var(--yellow)] p-5 text-[var(--ink)]">
        <p className="headline text-3xl">YOU'RE ON THE LIST.</p>
        <p className="mt-2 font-black">We'll let you know.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="jf-box grid gap-3 bg-white p-5">
      <p className="micro-label text-[var(--orange)]">JOIN WAITLIST</p>
      <input className="field-input" value={name} onChange={(event) => setName(event.target.value)} placeholder="Name" required />
      <select className="field-input" value={trade} onChange={(event) => setTrade(event.target.value)}>
        {trades.map((item) => <option key={item} value={item}>{item}</option>)}
      </select>
      <input className="field-input" value={contact} onChange={(event) => setContact(event.target.value)} placeholder="Email or phone" required />
      {status === 'error' && <p className="font-black text-[var(--orange)]">{error}</p>}
      <button className="jf-button bg-[var(--navy)] text-white" disabled={status === 'loading'}>
        {status === 'loading' ? 'JOINING' : 'JOIN WAITLIST'}
      </button>
    </form>
  );
}
