"use client";

import { useState } from 'react';
import { useAuth } from './AuthProvider';

interface CheckoutButtonProps {
  tier: 'founding' | 'pro' | 'business' | 'epc';
  billing: 'monthly' | 'annual';
  label?: string;
  className?: string;
}

export function CheckoutButton({ tier, billing, label, className = '' }: CheckoutButtonProps) {
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleClick = async () => {
    if (authLoading) return;
    if (!user) {
      const params = new URLSearchParams({ tier, billing });
      window.location.href = `/signup?${params.toString()}`;
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier,
          billing,
        }),
      });

      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Something went wrong'); return; }
      if (data.url) window.location.href = data.url;
    } catch (err: any) {
      setError(err.message || 'Failed to start checkout');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        className={`jf-button ${className}`}
        onClick={handleClick}
        disabled={loading || authLoading}
      >
        {loading || authLoading ? 'Redirecting...' : label || 'GET STARTED'}
      </button>
      {error && <p className="mt-2 text-sm font-black text-[var(--orange)]">{error}</p>}
    </div>
  );
}
