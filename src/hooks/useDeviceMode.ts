import { useState, useEffect } from 'react';

export type DeviceMode = 'mobile' | 'desktop';

const BREAKPOINT = 768;

function detectMode(): DeviceMode {
  return window.innerWidth < BREAKPOINT ? 'mobile' : 'desktop';
}

export function useDeviceMode() {
  const [mode, setMode] = useState<DeviceMode>(detectMode);
  const [manualOverride, setManualOverride] = useState<DeviceMode | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (!manualOverride) {
        setMode(detectMode());
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [manualOverride]);

  const toggle = () => {
    const next = manualOverride === 'mobile' ? 'desktop' : manualOverride === 'desktop' ? 'mobile' : mode === 'mobile' ? 'desktop' : 'mobile';
    setManualOverride(next);
    setMode(next);
  };

  const reset = () => {
    setManualOverride(null);
    setMode(detectMode());
  };

  return {
    mode,
    isMobile: mode === 'mobile',
    isDesktop: mode === 'desktop',
    toggle,
    reset,
    hasOverride: manualOverride !== null,
  };
}
