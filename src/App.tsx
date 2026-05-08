import { lazy, Suspense, useEffect, type ComponentType, type ReactNode } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Footer } from './components/Footer';
import { LaunchWaitlistModal } from './components/LaunchWaitlistModal';
import { ToastContainer, useToast, registerApiToastHandler } from './components/Toast';
import { TopNav } from './components/TopNav';
import { HomePage } from './pages/HomePage';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function lazyPage(loader: () => Promise<Record<string, ComponentType<any>>>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return lazy(() => loader().then((m) => ({ default: Object.values(m)[0] as ComponentType<any> })));
}

const BuildUkAlternativePage = lazyPage(() => import('./pages/BuildUkAlternativePage'));
const ChaseEnginePage = lazyPage(() => import('./pages/ChaseEnginePage'));
const CityBirmingham = lazyPage(() => import('./pages/CityBirmingham'));
const CityBristol = lazyPage(() => import('./pages/CityBristol'));
const CityGlasgow = lazyPage(() => import('./pages/CityGlasgow'));
const CityLeeds = lazyPage(() => import('./pages/CityLeeds'));
const CityLondon = lazyPage(() => import('./pages/CityLondon'));
const CityManchester = lazyPage(() => import('./pages/CityManchester'));
const CompareBuildAlertPage = lazyPage(() => import('./pages/CompareBuildAlertPage'));
const CompareCheckatradePage = lazyPage(() => import('./pages/CompareCheckatradePage'));
const DashboardPage = lazyPage(() => import('./pages/DashboardPage'));
const EpcPage = lazyPage(() => import('./pages/EpcPage'));
const FindJobsPage = lazyPage(() => import('./pages/FindJobsPage'));
const ForYourTradePage = lazyPage(() => import('./pages/ForYourTradePage'));
const FreeToolsPage = lazyPage(() => import('./pages/FreeToolsPage'));
const IntakePage = lazyPage(() => import('./pages/IntakePage'));
const IntakeTestPage = lazyPage(() => import('./pages/IntakeTestPage'));
const LeadDetailPage = lazyPage(() => import('./pages/LeadDetailPage'));
const LeadListPage = lazyPage(() => import('./pages/LeadListPage'));
const LegalPage = lazyPage(() => import('./pages/LegalPage'));
const MyLinkPage = lazyPage(() => import('./pages/MyLinkPage'));
const NewsPage = lazyPage(() => import('./pages/NewsPage'));
const NotFoundPage = lazyPage(() => import('./pages/NotFoundPage'));
const PricingPage = lazyPage(() => import('./pages/PricingPage'));
const ProductAdvantagePage = lazyPage(() => import('./pages/ProductAdvantagePage'));
const SignalsPage = lazyPage(() => import('./pages/SignalsPage'));
const SmartQuotePage = lazyPage(() => import('./pages/SmartQuotePage'));
const TipsPage = lazyPage(() => import('./pages/TipsPage'));
const TradieStackPage = lazyPage(() => import('./pages/TradieStackPage'));
const TradeBuilders = lazyPage(() => import('./pages/TradeBuilders'));
const TradeElectricians = lazyPage(() => import('./pages/TradeElectricians'));
const TradeHeatPumps = lazyPage(() => import('./pages/TradeHeatPumps'));
const TradePlumbers = lazyPage(() => import('./pages/TradePlumbers'));
const TradeRoofers = lazyPage(() => import('./pages/TradeRoofers'));
const WinEnginePage = lazyPage(() => import('./pages/WinEnginePage'));

function PageLoader() {
  return (
    <main className="page-shell py-16">
      <section className="jf-box bg-white p-8 text-center">
        <div className="inline-flex items-center gap-3">
          <div className="w-6 h-6 border-3 border-[var(--navy)] border-t-[var(--yellow)] rounded-full animate-spin" />
          <p className="font-black text-[var(--navy)] text-lg">Loading...</p>
        </div>
      </section>
    </main>
  );
}

function LazyPage({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<PageLoader />}>
      {children}
    </Suspense>
  );
}

function AppContent() {
  const { toasts, dismiss } = useToast();

  useEffect(() => {
    registerApiToastHandler();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--ink)]">
      <TopNav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/2builduk-alternative" element={<LazyPage><BuildUkAlternativePage /></LazyPage>} />
        <Route path="/vs/buildalert" element={<LazyPage><CompareBuildAlertPage /></LazyPage>} />
        <Route path="/vs/checkatrade" element={<LazyPage><CompareCheckatradePage /></LazyPage>} />
        <Route path="/my-link" element={<LazyPage><MyLinkPage /></LazyPage>} />
        <Route path="/intake/:username" element={<LazyPage><IntakePage /></LazyPage>} />
        <Route path="/intake-test" element={<LazyPage><IntakeTestPage /></LazyPage>} />
        <Route path="/leads" element={<LazyPage><LeadListPage /></LazyPage>} />
        <Route path="/leads/:id" element={<LazyPage><LeadDetailPage /></LazyPage>} />
        <Route path="/find-jobs" element={<LazyPage><FindJobsPage /></LazyPage>} />
        <Route path="/chase" element={<LazyPage><ChaseEnginePage /></LazyPage>} />
        <Route path="/win" element={<LazyPage><WinEnginePage /></LazyPage>} />
        <Route path="/dashboard" element={<LazyPage><DashboardPage /></LazyPage>} />
        <Route path="/for-your-trade" element={<LazyPage><ForYourTradePage /></LazyPage>} />
        <Route path="/epc" element={<LazyPage><EpcPage /></LazyPage>} />
        <Route path="/free-tools" element={<LazyPage><FreeToolsPage /></LazyPage>} />
        <Route path="/tips" element={<LazyPage><TipsPage /></LazyPage>} />
        <Route path="/news" element={<LazyPage><NewsPage /></LazyPage>} />
        <Route path="/pricing" element={<LazyPage><PricingPage /></LazyPage>} />
        <Route path="/smart-quote" element={<LazyPage><SmartQuotePage /></LazyPage>} />
        <Route path="/vantage" element={<LazyPage><ProductAdvantagePage type="vantage" /></LazyPage>} />
        <Route path="/vicinity" element={<LazyPage><ProductAdvantagePage type="vicinity" /></LazyPage>} />
        <Route path="/codex" element={<LazyPage><ProductAdvantagePage type="codex" /></LazyPage>} />
        <Route path="/signals" element={<LazyPage><SignalsPage /></LazyPage>} />
        <Route path="/tradiestack" element={<LazyPage><TradieStackPage /></LazyPage>} />
        <Route path="/construction-leads/birmingham" element={<LazyPage><CityBirmingham /></LazyPage>} />
        <Route path="/construction-leads/london" element={<LazyPage><CityLondon /></LazyPage>} />
        <Route path="/construction-leads/manchester" element={<LazyPage><CityManchester /></LazyPage>} />
        <Route path="/construction-leads/bristol" element={<LazyPage><CityBristol /></LazyPage>} />
        <Route path="/construction-leads/leeds" element={<LazyPage><CityLeeds /></LazyPage>} />
        <Route path="/construction-leads/glasgow" element={<LazyPage><CityGlasgow /></LazyPage>} />
        <Route path="/trade/plumbers" element={<LazyPage><TradePlumbers /></LazyPage>} />
        <Route path="/trade/electricians" element={<LazyPage><TradeElectricians /></LazyPage>} />
        <Route path="/trade/builders" element={<LazyPage><TradeBuilders /></LazyPage>} />
        <Route path="/trade/heat-pump-installers" element={<LazyPage><TradeHeatPumps /></LazyPage>} />
        <Route path="/trade/roofers" element={<LazyPage><TradeRoofers /></LazyPage>} />
        <Route path="/privacy" element={<LazyPage><LegalPage type="privacy" /></LazyPage>} />
        <Route path="/terms" element={<LazyPage><LegalPage type="terms" /></LazyPage>} />
        <Route path="/health" element={<HealthPage />} />
        <Route path="*" element={<LazyPage><NotFoundPage /></LazyPage>} />
      </Routes>
      <Footer />
      <LaunchWaitlistModal />
      <ToastContainer toasts={toasts} dismiss={dismiss} />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
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
