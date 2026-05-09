import React from 'react';

type SkeletonProps = {
  className?: string;
  style?: React.CSSProperties;
};

export function Skeleton({ className = 'skeleton-line', style }: SkeletonProps) {
  return (
    <div className={`skeleton ${className}`} style={style} />
  );
}

export function SkeletonCard() {
  return (
    <article className="jf-box mobile-stack bg-white p-4 grid grid-cols-[auto_1fr] gap-4 sm:grid-cols-[auto_1fr]">
      <div className="skeleton skeleton-box w-14 h-14 rounded" />
      <div className="grid gap-3">
        <Skeleton className="skeleton-line-lg w-32" />
        <Skeleton className="skeleton-title w-3/4" />
        <div className="flex gap-2 mt-2">
          <Skeleton className="skeleton-line w-20" />
          <Skeleton className="skeleton-line w-24" />
          <Skeleton className="skeleton-line w-16" />
        </div>
        <Skeleton className="skeleton-line w-28 mt-2" />
      </div>
    </article>
  );
}

export function SkeletonCardList({ count = 3 }: { count?: number }) {
  return (
    <div className="grid gap-4">
      {Array.from({ length: count }, (_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonPricingCard() {
  return (
    <section className="jf-box bg-white p-6 grid gap-4">
      <Skeleton className="skeleton-line w-20" />
      <Skeleton className="skeleton-title w-32" />
      <Skeleton className="skeleton-line w-full" />
      <Skeleton className="skeleton-line w-5/6" />
      <div className="grid gap-2 mt-2">
        {Array.from({ length: 5 }, (_, i) => (
          <Skeleton key={i} className="skeleton-line w-full" />
        ))}
      </div>
      <Skeleton className="skeleton-line-lg w-full mt-2" />
    </section>
  );
}

export function SkeletonPage({ lines = 4 }: { lines?: number }) {
  return (
    <main className="page-shell grid gap-5 py-8">
      <section className="jf-box bg-white p-6 grid gap-4">
        <Skeleton className="skeleton-line w-24" />
        <Skeleton className="skeleton-title w-2/3" />
        {Array.from({ length: lines }, (_, i) => (
          <Skeleton key={i} className="skeleton-line w-full" />
        ))}
      </section>
    </main>
  );
}
