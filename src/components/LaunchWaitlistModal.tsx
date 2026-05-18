import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import { WaitlistForm } from './WaitlistForm';

const STORAGE_KEY = 'jobfilter.waitlistModalSeen';

export function LaunchWaitlistModal() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (location.pathname !== '/') return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    const timer = window.setTimeout(() => setOpen(true), 18000);
    return () => window.clearTimeout(timer);
  }, [location.pathname]);

  function close() {
    sessionStorage.setItem(STORAGE_KEY, '1');
    setOpen(false);
  }

  function markSeen() {
    sessionStorage.setItem(STORAGE_KEY, '1');
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-black/80 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-lg">
        <div className="jf-box bg-[var(--paper)] p-6 text-[var(--ink)] shadow-[8px_8px_0_var(--yellow)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="micro-label text-[var(--orange)]">EARLY ACCESS</p>
              <h2 className="headline mt-2 text-4xl leading-none">FOUNDER PRICE: £39/MO.</h2>
              <p className="mt-3 font-black text-[var(--muted)]">Lock your territory. Scored leads sent to your WhatsApp. One trade partner per postcode. No shared leads. No ghosts.</p>
            </div>
            <button
              type="button"
              className="grid h-9 w-9 shrink-0 place-items-center text-[var(--muted)] hover:bg-[var(--ink)]/5 hover:text-[var(--ink)] transition-colors rounded-sm"
              onClick={close}
              aria-label="Close waitlist"
            >
              <X size={20} strokeWidth={2.5} />
            </button>
          </div>
          <div className="mt-5">
            <WaitlistForm source="launch-popup" compact onDone={markSeen} />
          </div>
          <button className="mt-4 w-full text-center text-sm font-black uppercase text-[var(--muted)] hover:text-[var(--ink)]" onClick={close}>
            Not right now
          </button>
        </div>
      </div>
    </div>
  );
}
