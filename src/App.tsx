import { Navigate, Route, Routes } from 'react-router-dom';
import { Footer } from './components/Footer';
import { LaunchWaitlistModal } from './components/LaunchWaitlistModal';
import { TopNav } from './components/TopNav';
import { FindJobsPage } from './pages/FindJobsPage';
import { FreeToolsPage } from './pages/FreeToolsPage';
import { HomePage } from './pages/HomePage';
import { IntakePage } from './pages/IntakePage';
import { LeadDetailPage } from './pages/LeadDetailPage';
import { LeadListPage } from './pages/LeadListPage';
import { LegalPage } from './pages/LegalPage';
import { MyLinkPage } from './pages/MyLinkPage';
import { PricingPage } from './pages/PricingPage';
import { ProductAdvantagePage } from './pages/ProductAdvantagePage';
import { TipsPage } from './pages/TipsPage';

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--ink)]">
      <TopNav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/my-link" element={<MyLinkPage />} />
        <Route path="/intake/:username" element={<IntakePage />} />
        <Route path="/leads" element={<LeadListPage />} />
        <Route path="/leads/:id" element={<LeadDetailPage />} />
        <Route path="/find-jobs" element={<FindJobsPage />} />
        <Route path="/free-tools" element={<FreeToolsPage />} />
        <Route path="/tips" element={<TipsPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/vantage" element={<ProductAdvantagePage type="vantage" />} />
        <Route path="/vicinity" element={<ProductAdvantagePage type="vicinity" />} />
        <Route path="/codex" element={<ProductAdvantagePage type="codex" />} />
        <Route path="/privacy" element={<LegalPage type="privacy" />} />
        <Route path="/terms" element={<LegalPage type="terms" />} />
        <Route path="/health" element={<HealthPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
      <LaunchWaitlistModal />
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
