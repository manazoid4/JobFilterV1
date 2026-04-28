import type { ReactNode } from 'react';

export function ActionBar({ children }: { children: ReactNode }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t-2 border-[var(--line)] bg-white p-3 md:sticky md:bottom-0 md:mt-6">
      <div className="mx-auto grid max-w-xl grid-cols-3 gap-2">
        {children}
      </div>
    </div>
  );
}
