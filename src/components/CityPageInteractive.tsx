"use client";

import { useRouter } from 'next/navigation';

export function CityScanButton({ postcode, children }: { postcode: string; children: React.ReactNode }) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(`/find-jobs?postcode=${postcode}`)}
      className="jf-button bg-[var(--ink)] text-white"
    >
      {children}
    </button>
  );
}

export function CityCtaButton({ postcode, children, className }: { postcode: string; children: React.ReactNode; className?: string }) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(`/find-jobs?postcode=${postcode}`)}
      className={className || "jf-button bg-[var(--yellow)] text-[var(--ink)]"}
    >
      {children}
    </button>
  );
}
