import { useState } from 'react';
import { useAuth } from './AuthProvider';

interface CheckoutButtonProps {
  tier: 'founding' | 'pro' | 'business';
  billing: 'monthly' | 'annual';
  label?: string;
  className?: string;
}

export function CheckoutButton({ tier, billing, label, className = '' }: CheckoutButtonProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleClick = async () => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier,
          billing,
          email: user?.email ?? '',
          userId: user?.id ?? '',
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
        disabled={loading}
      >
        {loading ? 'Redirecting...' : label || 'GET STARTED'}
      </button>
      {error && <p className="mt-2 text-sm font-bold text-red-600">{error}</p>}
    </div>
  );
}
