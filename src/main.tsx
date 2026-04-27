import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import {
  ActivationPendingPage,
  CodexPage,
  DashboardPage,
  DemoPage,
  FreeToolsPage,
  HomePage,
  PrivacyPage,
  PricingPage,
  TermsPage,
  VicinityPage,
  VantagePage,
} from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/demo" element={<DemoPage />} />
        <Route path="/codex" element={<CodexPage />} />
        <Route path="/vantage" element={<VantagePage />} />
        <Route path="/vicinity" element={<VicinityPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/tools" element={<FreeToolsPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/activation-pending" element={<ActivationPendingPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/app" element={<Navigate to="/demo" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
