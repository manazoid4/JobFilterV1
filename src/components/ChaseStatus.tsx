import { useEffect, useState } from 'react';

export function ChaseStatus({ leadId }: { leadId: string }) {
  const [status, setStatus] = useState<string>('sent');
  const [nudged, setNudged] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem(`chase-${leadId}`);
    if (stored) {
      const data = JSON.parse(stored);
      setStatus(data.status || 'sent');
      setNudged(data.nudged || false);
    }
  }, [leadId]);

  async function updateStatus(newStatus: string) {
    setStatus(newStatus);
    sessionStorage.setItem(`chase-${leadId}`, JSON.stringify({ status: newStatus, nudged }));
    await fetch('/api/chase/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ leadId, status: newStatus }),
    }).catch(() => {});
  }

  return (
    <div className="flex flex-wrap items-center gap-2 text-xs font-black">
      <span className="text-[var(--muted)]">STATUS:</span>
      {['sent', 'contacted', 'quoted', 'won', 'lost'].map((s) => (
        <button
          key={s}
          onClick={() => updateStatus(s)}
          className={`px-2 py-1 uppercase border-2 ${status === s ? 'bg-[var(--yellow)] border-[var(--ink)]' : 'bg-white border-[var(--line)]'}`}
        >
          {s}
        </button>
      ))}
      {nudged && <span className="text-[var(--green)]">Nudged ✓</span>}
    </div>
  );
}
