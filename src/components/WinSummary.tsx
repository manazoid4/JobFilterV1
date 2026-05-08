import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export function WinSummary() {
  const [summary, setSummary] = useState<string | null>(null);
  const [wonCount, setWonCount] = useState(0);
  const [totalValue, setTotalValue] = useState('');

  useEffect(() => {
    fetch('/api/leads/summary')
      .then((r) => r.json())
      .then((data) => {
        if (data.ok) {
          setWonCount(data.wonCount || 0);
          setTotalValue(data.totalValue || '');
          setSummary(data.summary || '');
        }
      })
      .catch(() => {});
  }, []);

  if (!summary) return null;

  return (
    <section className="jf-box bg-[var(--yellow)] p-5 text-[var(--ink)]">
      <p className="micro-label text-[var(--ink)]">MONTHLY WIN SUMMARY</p>
      <h2 className="headline mt-2 text-3xl leading-none">YOU'RE EARNING.</h2>
      <p className="mt-2 text-xl font-black">{summary}</p>
      <Link className="jf-button mt-4 inline-block bg-[var(--ink)] text-white" to="/leads">VIEW LEADS</Link>
    </section>
  );
}
