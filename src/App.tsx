import { Navigate, Route, Routes } from 'react-router-dom';
import { Footer } from './components/Footer';
import { TopNav } from './components/TopNav';
import { CodexPage } from './pages/CodexPage';
import { FindJobsPage } from './pages/FindJobsPage';
import { HomePage } from './pages/HomePage';
import { PricingPage } from './pages/PricingPage';

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--ink)]">
      <TopNav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/find-jobs" element={<FindJobsPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/codex" element={<CodexPage />} />
        <Route path="/health" element={<HealthPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </div>
  );
}

function HealthPage() {
  return (
    <main className="page-shell py-16">
      <section className="jf-box bg-white p-8">
        <p className="micro-label">REF. HEALTH</p>
        <h1 className="headline mt-4 text-5xl">SYSTEM ONLINE.</h1>
        <p className="mt-4 max-w-2xl text-lg font-semibold text-[var(--muted)]">
          Frontend is running. API status is available at <code>/api/health</code>.
        </p>
      </section>
    </main>
  );
}
