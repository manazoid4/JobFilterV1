import { useCallback, useEffect, useState } from 'react';
import { setToastHandler } from '../lib/api';

type ToastType = 'error' | 'success' | 'info';

interface ToastMessage {
  id: number;
  message: string;
  type: ToastType;
}

let nextId = 0;
const listeners = new Set<(msg: string, type: ToastType) => void>();

export function showToast(message: string, type: ToastType = 'error') {
  const id = ++nextId;
  listeners.forEach((fn) => fn(message, type));
  return id;
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((message: string, type: ToastType) => {
    const id = ++nextId;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  useEffect(() => {
    listeners.add(addToast);
    return () => {
      listeners.delete(addToast);
    };
  }, [addToast]);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, dismiss };
}

export function registerApiToastHandler() {
  setToastHandler((message, type) => {
    showToast(message, type);
  });
}

const colors: Record<ToastType, { bg: string }> = {
  error: { bg: 'bg-[var(--orange)]' },
  success: { bg: 'bg-[var(--green)]' },
  info: { bg: 'bg-[var(--navy)]' },
};

const icons: Record<ToastType, string> = {
  error: '⚠',
  success: '✓',
  info: 'ℹ',
};

export function ToastContainer({ toasts, dismiss }: { toasts: ToastMessage[]; dismiss: (id: number) => void }) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 grid gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((t) => {
        const c = colors[t.type];
        return (
          <div
            key={t.id}
            className={`pointer-events-auto jf-box ${c.bg} border-[var(--navy)] text-white p-4 flex items-start gap-3`}
          >
            <span className="text-lg leading-none mt-0.5">{icons[t.type]}</span>
            <p className="flex-1 font-black text-sm leading-snug">{t.message}</p>
            <button
              type="button"
              onClick={() => dismiss(t.id)}
              className="font-black text-sm opacity-70 hover:opacity-100 shrink-0"
              aria-label="Dismiss"
            >
              ✕
            </button>
          </div>
        );
      })}
    </div>
  );
}
