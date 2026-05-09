import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
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
    <div className="fixed inset-0 z-[100] grid place-items-center bg-black/70 px-4 py-6">
      <div className="w-full max-w-lg">
        <div className="jf-box bg-[var(--navy)] p-5 text-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="micro-label text-[var(--yellow)]">PATCHLOCK EARLY ACCESS</p>
              <h2 className="headline mt-2 text-4xl leading-none">LOCK YOUR PATCH.</h2>
              <p className="mt-3 font-black text-white/70">Founder price: £39/month. About a tenner a week. Includes WhatsApp alerts and company-branded letters to selected leads.</p>
            </div>
            <button className="min-h-[44px] min-w-[44px] border-2 border-white px-3 py-1 font-black" onClick={close} aria-label="Close waitlist">
              X
            </button>
          </div>
          <div className="mt-4">
            <WaitlistForm source="launch-popup" compact onDone={markSeen} />
          </div>
          <button className="mt-4 w-full text-center text-sm font-black uppercase text-white/60" onClick={close}>
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}
