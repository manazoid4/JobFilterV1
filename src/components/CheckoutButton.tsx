"use client";

import { useState } from 'react';

interface CheckoutButtonProps {
  tier: 'founding' | 'pro' | 'epc';
  billing: 'monthly' | 'annual';
  email?: string;
  userId?: string;
  label?: string;
  className?: string;
}

export function CheckoutButton({ tier, billing, email, userId, label, className = '' }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleClick = async () => {
    if (!email && !userId) {
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
        body: JSON.stringify({ tier, billing, email, userId }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong');
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      }
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
        disabled={loading}
      >
        {loading ? 'Redirecting...' : label || 'GET STARTED'}
      </button>
      {error && (
        <p className="mt-2 text-sm font-bold text-red-600">{error}</p>
      )}
    </div>
  );
}
