"use client";

import { useEffect } from 'react';
import { ToastContainer, useToast, registerApiToastHandler } from './Toast';

export function ToastWrapper() {
  const { toasts, dismiss } = useToast();
  useEffect(() => {
    registerApiToastHandler();
  }, []);
  return <ToastContainer toasts={toasts} dismiss={dismiss} />;
}
