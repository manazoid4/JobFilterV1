import { BuildUkAlternativePage } from './pages/BuildUkAlternativePage';
import { CityBirmingham } from './pages/CityBirmingham';
import { CityBristol } from './pages/CityBristol';
import { CityGlasgow } from './pages/CityGlasgow';
import { CityLeeds } from './pages/CityLeeds';
import { CityLondon } from './pages/CityLondon';
import { CityManchester } from './pages/CityManchester';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ChaseEnginePage } from './pages/ChaseEnginePage';
import { CompareBuildAlertPage } from './pages/CompareBuildAlertPage';
import { CompareCheckatradePage } from './pages/CompareCheckatradePage';
import { Footer } from './components/Footer';
import { LaunchWaitlistModal } from './components/LaunchWaitlistModal';
import { TopNav } from './components/TopNav';
import { FindJobsPage } from './pages/FindJobsPage';
import { ForYourTradePage } from './pages/ForYourTradePage';
import { FreeToolsPage } from './pages/FreeToolsPage';
import { HomePage } from './pages/HomePage';
import { EpcPage } from './pages/EpcPage';
import { IntakePage } from './pages/IntakePage';
import { IntakeTestPage } from './pages/IntakeTestPage';
import { LeadDetailPage } from './pages/LeadDetailPage';
import { LeadListPage } from './pages/LeadListPage';
import { LegalPage } from './pages/LegalPage';
import { MyLinkPage } from './pages/MyLinkPage';
import { NewsPage } from './pages/NewsPage';
import { PricingPage } from './pages/PricingPage';
import { ProductAdvantagePage } from './pages/ProductAdvantagePage';
import { SmartQuotePage } from './pages/SmartQuotePage';
import { SignalsPage } from './pages/SignalsPage';
import { TipsPage } from './pages/TipsPage';
import { TradieStackPage } from './pages/TradieStackPage';
import { WinEnginePage } from './pages/WinEnginePage';

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--ink)]">
      <TopNav />
      <Routes>
        <Route path="/2builduk-alternative" element={<BuildUkAlternativePage />} />
        <Route path="/vs/buildalert" element={<CompareBuildAlertPage />} />
        <Route path="/vs/checkatrade" element={<CompareCheckatradePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/my-link" element={<MyLinkPage />} />
        <Route path="/intake/:username" element={<IntakePage />} />
        <Route path="/intake-test" element={<IntakeTestPage />} />
        <Route path="/leads" element={<LeadListPage />} />
        <Route path="/leads/:id" element={<LeadDetailPage />} />
        <Route path="/find-jobs" element={<FindJobsPage />} />
        <Route path="/chase" element={<ChaseEnginePage />} />
        <Route path="/win" element={<WinEnginePage />} />
        <Route path="/for-your-trade" element={<ForYourTradePage />} />
        <Route path="/epc" element={<EpcPage />} />
        <Route path="/free-tools" element={<FreeToolsPage />} />
        <Route path="/tips" element={<TipsPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/smart-quote" element={<SmartQuotePage />} />
        <Route path="/vantage" element={<ProductAdvantagePage type="vantage" />} />
        <Route path="/vicinity" element={<ProductAdvantagePage type="vicinity" />} />
        <Route path="/codex" element={<ProductAdvantagePage type="codex" />} />
        <Route path="/signals" element={<SignalsPage />} />
        <Route path="/tradiestack" element={<TradieStackPage />} />
        <Route path="/construction-leads/birmingham" element={<CityBirmingham />} />
        <Route path="/construction-leads/london" element={<CityLondon />} />
        <Route path="/construction-leads/manchester" element={<CityManchester />} />
        <Route path="/construction-leads/bristol" element={<CityBristol />} />
        <Route path="/construction-leads/leeds" element={<CityLeeds />} />
        <Route path="/construction-leads/glasgow" element={<CityGlasgow />} />
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
