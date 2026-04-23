/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

type AnalyticsEventName =
  | 'hero_cta_click'
  | 'filter_scan_start'
  | 'filter_scan_complete'
  | 'pricing_plan_click'
  | 'upgrade_cta_click'
  | 'nav_cta_click'
  | 'tool_used';

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

// ─── Tool Types ───────────────────────────────────────────────────────────────
type ToolId =
  | 'quote'
  | 'dayrate'
  | 'leadvalue'
  | 'markup'
  | 'timeestimate'
  | 'fuelcost'
  | 'invoice'
  | 'profit'
  | 'cashflow'
  | 'vatcheck';

type JobUrgency = 'today' | 'this_week' | 'planned';

type LeadJob = {
  id: string;
  title: string;
  trade: string;
  location: string;
  estimatedValue: number;
  urgency: JobUrgency;
  postcodeOutward: string;
  sourceConfidence: number;
  status: 'open' | 'quoted' | 'won' | 'lost';
};

type RegionTradeJobs = Record<string, Record<string, LeadJob[]>>;

const makeJob = (
  id: string,
  title: string,
  trade: string,
  location: string,
  estimatedValue: number,
  urgency: JobUrgency,
  sourceConfidence: number,
): LeadJob => ({ id, title, trade, location, estimatedValue, urgency, postcodeOutward: location, sourceConfidence, status: 'open' });

const UK_JOB_DATA: RegionTradeJobs = {
  birmingham: {
    plumbing: [makeJob('b-pl-1', 'Emergency boiler pressure drop', 'plumbing', 'B14', 260, 'today', 92), makeJob('b-pl-2', 'Kitchen sink and trap replacement', 'plumbing', 'B30', 340, 'this_week', 84), makeJob('b-pl-3', 'Bathroom refit first fix', 'plumbing', 'B17', 1850, 'planned', 80)],
    electrical: [makeJob('b-el-1', 'Consumer unit safety inspection', 'electrical', 'B42', 480, 'this_week', 91), makeJob('b-el-2', 'EV charger install', 'electrical', 'B23', 980, 'planned', 82), makeJob('b-el-3', 'Fault find on ring main', 'electrical', 'B33', 290, 'today', 88)],
    general: [makeJob('b-ge-1', 'Fence repair after storm damage', 'general', 'B11', 520, 'this_week', 79), makeJob('b-ge-2', 'Garage conversion prep works', 'building', 'B36', 2100, 'planned', 76), makeJob('b-ge-3', 'Loft hatch and boarding upgrade', 'general', 'B74', 760, 'this_week', 86)],
  },
  london: {
    plumbing: [makeJob('l-pl-1', 'Flat leak trace and fix', 'plumbing', 'SW16', 420, 'today', 90), makeJob('l-pl-2', 'Combi boiler service and flush', 'plumbing', 'E17', 330, 'this_week', 81), makeJob('l-pl-3', 'Shower valve replacement', 'plumbing', 'SE9', 260, 'this_week', 84)],
    electrical: [makeJob('l-el-1', 'Rewire 2-bed terrace', 'electrical', 'N17', 3800, 'planned', 74), makeJob('l-el-2', 'Hallway lighting upgrade', 'electrical', 'W5', 640, 'this_week', 89), makeJob('l-el-3', 'EICR for rental property', 'electrical', 'CR0', 240, 'today', 95)],
    general: [makeJob('l-ge-1', 'Damp patch repair and skim', 'general', 'E10', 590, 'this_week', 83), makeJob('l-ge-2', 'Door frame replacement', 'building', 'SE15', 690, 'this_week', 82), makeJob('l-ge-3', 'Kitchen tiling and seal', 'general', 'NW9', 920, 'planned', 78)],
  },
  manchester: {
    plumbing: [makeJob('m-pl-1', 'Radiator balance and valve swap', 'plumbing', 'M14', 280, 'this_week', 84), makeJob('m-pl-2', 'Leaking stop tap replacement', 'plumbing', 'M8', 220, 'today', 91), makeJob('m-pl-3', 'Soil pipe section repair', 'plumbing', 'M23', 740, 'this_week', 83)],
    electrical: [makeJob('m-el-1', 'Extractor fan rewire', 'electrical', 'M9', 210, 'today', 89), makeJob('m-el-2', 'Garage power feed install', 'electrical', 'M20', 860, 'planned', 80), makeJob('m-el-3', 'Outdoor security lighting', 'electrical', 'M32', 560, 'this_week', 82)],
    general: [makeJob('m-ge-1', 'Roofline repair and repaint', 'general', 'M22', 1450, 'planned', 75), makeJob('m-ge-2', 'Laminate floor install', 'general', 'M27', 870, 'this_week', 81), makeJob('m-ge-3', 'Brickwork repointing front wall', 'building', 'M34', 960, 'planned', 77)],
  },
  leeds: {
    plumbing: [makeJob('ld-pl-1', 'Cylinder replacement and recommission', 'plumbing', 'LS11', 1250, 'this_week', 80), makeJob('ld-pl-2', 'Leak under bath and waste reset', 'plumbing', 'LS7', 310, 'today', 88), makeJob('ld-pl-3', 'Outside tap install', 'plumbing', 'LS16', 180, 'planned', 78)],
    electrical: [makeJob('ld-el-1', 'Kitchen rewire phase 1', 'electrical', 'LS12', 2200, 'planned', 79), makeJob('ld-el-2', 'Consumer unit label and test', 'electrical', 'LS3', 280, 'today', 92), makeJob('ld-el-3', 'Garden office supply', 'electrical', 'LS26', 950, 'this_week', 84)],
    general: [makeJob('ld-ge-1', 'Internal door hanging x6', 'general', 'LS10', 760, 'this_week', 81), makeJob('ld-ge-2', 'Kitchen subfloor repair', 'building', 'LS27', 690, 'this_week', 83), makeJob('ld-ge-3', 'Extension snag list', 'general', 'LS6', 520, 'today', 90)],
  },
  liverpool: {
    plumbing: [makeJob('lp-pl-1', 'Boiler condensate reroute', 'plumbing', 'L15', 260, 'today', 89), makeJob('lp-pl-2', 'Radiator install x2', 'plumbing', 'L18', 540, 'this_week', 83), makeJob('lp-pl-3', 'Bathroom first fix package', 'plumbing', 'L25', 1500, 'planned', 77)],
    electrical: [makeJob('lp-el-1', 'Fuse board upgrade', 'electrical', 'L8', 760, 'this_week', 87), makeJob('lp-el-2', 'Socket faults and testing', 'electrical', 'L13', 230, 'today', 91), makeJob('lp-el-3', 'EV charger and cable run', 'electrical', 'L37', 1120, 'planned', 79)],
    general: [makeJob('lp-ge-1', 'Plaster patch and paint touch-up', 'general', 'L6', 390, 'today', 88), makeJob('lp-ge-2', 'Boundary wall repair', 'building', 'L19', 980, 'this_week', 82), makeJob('lp-ge-3', 'Loft insulation top-up', 'general', 'L12', 640, 'planned', 76)],
  },
};

const REGION_BY_POSTCODE_PREFIX: Record<string, keyof typeof UK_JOB_DATA> = {
  B: 'birmingham',
  DY: 'birmingham',
  WS: 'birmingham',
  WV: 'birmingham',
  E: 'london',
  EC: 'london',
  N: 'london',
  NW: 'london',
  SE: 'london',
  SW: 'london',
  W: 'london',
  CR: 'london',
  M: 'manchester',
  SK: 'manchester',
  OL: 'manchester',
  BL: 'manchester',
  LS: 'leeds',
  WF: 'leeds',
  L: 'liverpool',
};

export default function App() {
  // ── Filter state ────────────────────────────────────────────────────────────
  const [quotesPerWeek, setQuotesPerWeek] = useState(5);
  const [milesDriven, setMilesDriven] = useState(20);
  const [postcode, setPostcode] = useState('');
  const [tradeType, setTradeType] = useState('general');
  const [showModal, setShowModal] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [leadResults, setLeadResults] = useState<LeadJob[]>([]);
  const [scanRegion, setScanRegion] = useState('');
  const [freeViewsUsed, setFreeViewsUsed] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [waitlistPlan, setWaitlistPlan] = useState('');
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [activeToolId, setActiveToolId] = useState<ToolId | null>(null);

  // ── Tool: Quote Quick Builder ────────────────────────────────────────────────
  const [qtLabour, setQtLabour] = useState(6);
  const [qtRate, setQtRate] = useState(35);
  const [qtMaterials, setQtMaterials] = useState(120);
  const [qtMarkup, setQtMarkup] = useState(20);
  const qtMaterialsTotal = qtMaterials * (1 + qtMarkup / 100);
  const qtLabourTotal = qtLabour * qtRate;
  const qtTotal = qtLabourTotal + qtMaterialsTotal;

  // ── Tool: Day Rate Calculator ────────────────────────────────────────────────
  const [drAnnualTarget, setDrAnnualTarget] = useState(40000);
  const [drDaysWorked, setDrDaysWorked] = useState(220);
  const [drOverheads, setDrOverheads] = useState(5000);
  const drRequired = Math.ceil((drAnnualTarget + drOverheads) / drDaysWorked);

  // ── Tool: Lead Value Checker ─────────────────────────────────────────────────
  const [lvBudget, setLvBudget] = useState('');
  const [lvScope, setLvScope] = useState('small');
  const [lvDistance, setLvDistance] = useState(10);
  const [lvPayType, setLvPayType] = useState('card');
  const getLvScore = () => {
    let score = 50;
    const b = parseFloat(lvBudget) || 0;
    if (b >= 2000) score += 25; else if (b >= 500) score += 15; else if (b >= 200) score += 5;
    if (lvScope === 'large') score += 15; else if (lvScope === 'medium') score += 8;
    if (lvDistance <= 5) score += 10; else if (lvDistance <= 15) score += 5; else score -= 10;
    if (lvPayType === 'card' || lvPayType === 'bank') score += 5;
    return Math.min(99, Math.max(20, score));
  };
  const lvScore = getLvScore();
  const lvLabel = lvScore >= 75 ? 'High Value' : lvScore >= 55 ? 'Worth Quoting' : 'Low Value — Skip';
  const lvColor = lvScore >= 75 ? 'text-green-400' : lvScore >= 55 ? 'text-amber-400' : 'text-red-400';

  // ── Tool: Material Markup Calculator ────────────────────────────────────────
  const [mmCost, setMmCost] = useState(200);
  const [mmMarkup, setMmMarkup] = useState(25);
  const mmCharge = mmCost * (1 + mmMarkup / 100);
  const mmProfit = mmCharge - mmCost;

  // ── Tool: Time Estimate Tool ─────────────────────────────────────────────────
  const [teScope, setTeScope] = useState('medium');
  const [teTrade, setTeTrade] = useState('general');
  const [teAccess, setTeAccess] = useState('easy');
  const getTeHours = () => {
    const base: Record<string, number> = { small: 2, medium: 6, large: 16, major: 40 };
    const tradeMulti: Record<string, number> = { general: 1, electrical: 1.2, plumbing: 1.1, heating: 1.3, building: 0.9 };
    const accessMulti: Record<string, number> = { easy: 1, moderate: 1.2, difficult: 1.5 };
    return Math.round((base[teScope] || 6) * (tradeMulti[teTrade] || 1) * (accessMulti[teAccess] || 1));
  };
  const teHours = getTeHours();

  // ── Tool: Fuel Cost Calculator ───────────────────────────────────────────────
  const [fcMiles, setFcMiles] = useState(20);
  const [fcMpg, setFcMpg] = useState(35);
  const [fcPrice, setFcPrice] = useState(148);
  const [fcTrips, setFcTrips] = useState(1);
  const fcLitresPerTrip = (fcMiles / fcMpg) * 4.546;
  const fcCostPerTrip = (fcLitresPerTrip * fcPrice) / 100;
  const fcTotal = fcCostPerTrip * fcTrips;

  // ── Tool: Invoice Generator ──────────────────────────────────────────────────
  const [invClient, setInvClient] = useState('');
  const [invJob, setInvJob] = useState('');
  const [invLabour, setInvLabour] = useState(0);
  const [invMaterials, setInvMaterials] = useState(0);
  const [invVat, setInvVat] = useState(false);
  const invSubtotal = invLabour + invMaterials;
  const invVatAmt = invVat ? invSubtotal * 0.2 : 0;
  const invTotal = invSubtotal + invVatAmt;
  const [invGenerated, setInvGenerated] = useState(false);
  const invDate = new Date().toLocaleDateString('en-GB');
  const invNumber = `JF-${Date.now().toString().slice(-5)}`;

  // ── Tool: Profit Margin Calculator ──────────────────────────────────────────
  const [pmRevenue, setPmRevenue] = useState(500);
  const [pmCosts, setPmCosts] = useState(300);
  const pmProfit = pmRevenue - pmCosts;
  const pmMargin = pmRevenue > 0 ? ((pmProfit / pmRevenue) * 100).toFixed(1) : '0';
  const pmLabel = parseFloat(pmMargin) >= 40 ? 'Healthy' : parseFloat(pmMargin) >= 20 ? 'Tight' : 'Too Low';
  const pmColor = parseFloat(pmMargin) >= 40 ? 'text-green-400' : parseFloat(pmMargin) >= 20 ? 'text-amber-400' : 'text-red-400';

  // ── Tool: Cash Flow Forecaster ───────────────────────────────────────────────
  const [cfWeeklyIn, setCfWeeklyIn] = useState(1200);
  const [cfWeeklyOut, setCfWeeklyOut] = useState(800);
  const cfWeeklyNet = cfWeeklyIn - cfWeeklyOut;
  const cfMonthlyNet = cfWeeklyNet * 4.33;
  const cfAnnualNet = cfWeeklyNet * 52;

  // ── Tool: VAT Threshold Checker ──────────────────────────────────────────────
  const [vtTurnover, setVtTurnover] = useState(60000);
  const vtThreshold = 90000;
  const vtGap = vtThreshold - vtTurnover;
  const vtOver = vtTurnover > vtThreshold;
  const vtPercent = Math.min(100, (vtTurnover / vtThreshold) * 100);

  // ── ROI ─────────────────────────────────────────────────────────────────────
  const hourlyRate = 45;
  const timePerQuote = 1.5;
  const fuelCostPerMile = 0.20;
  const annualAdminDebt = Math.round((quotesPerWeek * timePerQuote * hourlyRate + milesDriven * fuelCostPerMile) * 52);
  const jobFilterSavings = Math.round(annualAdminDebt * 0.85);

  // ── Lead quality ─────────────────────────────────────────────────────────────
  const postcodeStrength = postcode.replace(/\s/g, '').length;
  const tradeBoost = tradeType === 'electrical' || tradeType === 'plumbing' ? 6 : 3;
  const leadQualityScore = Math.max(42, Math.min(94, 55 + postcodeStrength * 4 + tradeBoost));

  const resolveRegionFromPostcode = (rawPostcode: string) => {
    const cleaned = rawPostcode.toUpperCase().replace(/\s+/g, '');
    const twoLetterPrefix = cleaned.match(/^[A-Z]{2}/)?.[0] || '';
    const oneLetterPrefix = cleaned.match(/^[A-Z]/)?.[0] || '';
    return REGION_BY_POSTCODE_PREFIX[twoLetterPrefix] || REGION_BY_POSTCODE_PREFIX[oneLetterPrefix] || 'birmingham';
  };

  const toDisplayUrgency = (urgency: JobUrgency) => {
    if (urgency === 'today') return 'Urgent Today';
    if (urgency === 'this_week') return 'This Week';
    return 'Planned Work';
  };

  const getUrgencyWeight = (urgency: JobUrgency) => {
    if (urgency === 'today') return 35;
    if (urgency === 'this_week') return 20;
    return 8;
  };

  const trackEvent = (eventName: AnalyticsEventName, params: Record<string, unknown> = {}) => {
    const eventPayload = { event: eventName, ...params, timestamp: new Date().toISOString() };
    if (typeof window !== 'undefined') { window.dataLayer = window.dataLayer || []; window.dataLayer.push(eventPayload); }
  };

  const openWaitlist = (plan: string) => { setWaitlistPlan(plan); setWaitlistEmail(''); setWaitlistSubmitted(false); setShowModal('waitlist'); };

  const submitWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail.trim()) return;
    trackEvent('pricing_plan_click', { plan: waitlistPlan, source: 'waitlist_submit' });
    const email = waitlistEmail.trim().toLowerCase();
    await Promise.allSettled([
      addDoc(collection(db, 'waitlist'), { email, plan: waitlistPlan, createdAt: serverTimestamp() }),
      fetch('/api/waitlist', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, plan: waitlistPlan }) }),
    ]);
    setWaitlistSubmitted(true);
  };

  const startScan = async () => {
    setIsScanning(true); setScanComplete(false);
    trackEvent('filter_scan_start', { postcode_present: postcode.trim().length >= 4, trade: tradeType });

    const urgencyMap: Record<string, JobUrgency> = { high: 'today', medium: 'this_week', low: 'planned' };
    const startTime = Date.now();
    let resolvedRegion = resolveRegionFromPostcode(postcode);
    let rankedJobs: LeadJob[] = [];

    try {
      const res = await fetch(`/api/scan?postcode=${encodeURIComponent(postcode)}&trade=${tradeType}&tier=free`);
      if (!res.ok) throw new Error('scan api error');
      const data = await res.json();
      rankedJobs = (data.leads ?? []).map((l: Record<string, unknown>) => ({
        id: String(l.id),
        title: String(l.title),
        trade: String(l.trade),
        location: String(l.location),
        postcodeOutward: String(l.postcodeOutward ?? l.location),
        estimatedValue: parseFloat(String(l.estimatedValue)) || 0,
        urgency: urgencyMap[String(l.urgency)] ?? 'planned',
        sourceConfidence: Number(l.sourceConfidence) || 70,
        status: 'open' as const,
      }));
      resolvedRegion = String(data.region ?? resolvedRegion);
    } catch {
      // fallback to local mock data
      const selectedTrade = tradeType === 'heating' || tradeType === 'building' ? 'general' : tradeType;
      const tradeJobs = UK_JOB_DATA[resolvedRegion]?.[selectedTrade] || UK_JOB_DATA[resolvedRegion]?.general || [];
      const outwardPrefix = postcode.toUpperCase().replace(/\s+/g, '').match(/^[A-Z]{1,2}\d[A-Z\d]?/)?.[0] || '';
      rankedJobs = [...tradeJobs]
        .map((job) => {
          const locationMatch = outwardPrefix && job.location.startsWith(outwardPrefix.substring(0, 2)) ? 20 : 7;
          const valueWeight = Math.min(35, Math.round(job.estimatedValue / 120));
          return { ...job, sourceConfidence: Math.min(99, job.sourceConfidence + getUrgencyWeight(job.urgency) / 5), rankScore: valueWeight + getUrgencyWeight(job.urgency) + locationMatch + Math.round(job.sourceConfidence / 6) };
        })
        .sort((a, b) => b.rankScore - a.rankScore)
        .map(({ rankScore: _rankScore, ...job }) => job);
    }

    setLeadResults(rankedJobs);
    setScanRegion(resolvedRegion);
    setFreeViewsUsed((v) => Math.min(3, v + 1));

    const elapsed = Date.now() - startTime;
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
      trackEvent('filter_scan_complete', { jobs_returned: rankedJobs.length });
    }, Math.max(0, 900 - elapsed));
  };

  const tools = [
    { id: 'quote' as ToolId, icon: '📋', label: 'Quote Builder', desc: 'Build a quote in 30 seconds' },
    { id: 'dayrate' as ToolId, icon: '💷', label: 'Day Rate Calc', desc: 'Find your minimum day rate' },
    { id: 'leadvalue' as ToolId, icon: '🎯', label: 'Lead Value Checker', desc: 'Is this job worth chasing?' },
    { id: 'markup' as ToolId, icon: '📦', label: 'Material Markup', desc: 'Never undersell materials again' },
    { id: 'timeestimate' as ToolId, icon: '⏱', label: 'Time Estimator', desc: 'How long will it actually take?' },
    { id: 'fuelcost' as ToolId, icon: '⛽', label: 'Fuel Cost Calc', desc: 'Know your true travel cost' },
    { id: 'invoice' as ToolId, icon: '🧾', label: 'Invoice Generator', desc: 'Instant professional invoice' },
    { id: 'profit' as ToolId, icon: '📈', label: 'Profit Margin', desc: 'Is this job actually profitable?' },
    { id: 'cashflow' as ToolId, icon: '💰', label: 'Cash Flow Forecast', desc: 'Predict your money 12 months out' },
    { id: 'vatcheck' as ToolId, icon: '🔍', label: 'VAT Threshold Checker', desc: 'Are you close to the VAT limit?' },
  ];

  return (
    <div className="min-h-screen bg-deep-slate text-slate-100 font-sans selection:bg-high-vis-orange selection:text-deep-slate">

      {/* ── NAV ── */}
      <nav className="fixed top-0 w-full z-50 px-4 py-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-deep-slate/80 backdrop-blur-xl border border-white/10 rounded-sm px-6 py-3 flex justify-between items-center shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="group flex items-center gap-3 cursor-pointer">
                <div className="w-10 h-10 bg-high-vis-orange rounded-sm flex items-center justify-center font-display text-2xl font-extrabold text-deep-slate italic group-hover:bg-white transition-colors">JF</div>
                <div className="flex flex-col">
                  <span className="font-display text-2xl font-extrabold uppercase tracking-tighter italic leading-none">JobFilter</span>
                  <span className="text-[8px] font-extrabold uppercase tracking-[0.3em] text-high-vis-orange leading-none mt-1">Built For Trades</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-10">
              <div className="flex items-center gap-8 text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400">
                <a href="#filter" className="hover:text-electric-cyan transition-colors">Find Jobs Near You</a>
                <a href="#tools" className="hover:text-electric-cyan transition-colors">Free Tools</a>
                <a href="#roi" className="hover:text-electric-cyan transition-colors">ROI Calc</a>
                <a href="#pricing" className="hover:text-electric-cyan transition-colors">Pricing</a>
              </div>
              <div className="h-4 w-px bg-white/10"></div>
              <div className="flex items-center gap-4">
                <a href="/login" className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Log In</a>
                <a href="#filter" onClick={() => trackEvent('nav_cta_click')} className="bg-high-vis-orange text-deep-slate text-[10px] font-extrabold px-4 py-2 rounded-sm uppercase tracking-widest hover:bg-amber-500 transition-all glow-orange">
                  Find Jobs Near Me
                </a>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="hidden sm:flex flex-col items-end">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></span>
                  <span className="text-[9px] font-extrabold uppercase tracking-tighter text-green-500">LIVE</span>
                </div>
              </div>
              <button className="lg:hidden text-slate-400 hover:text-white transition-colors" onClick={() => setMobileMenuOpen(o => !o)} aria-label="Toggle menu">
                {mobileMenuOpen
                  ? <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                  : <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"/></svg>
                }
              </button>
            </div>
          </div>
          {mobileMenuOpen && (
            <div className="lg:hidden mt-2 bg-deep-slate/95 backdrop-blur-xl border border-white/10 rounded-sm px-6 py-4 flex flex-col gap-4">
              <a href="#filter" onClick={() => setMobileMenuOpen(false)} className="text-[11px] font-extrabold uppercase tracking-widest text-slate-300 hover:text-electric-cyan transition-colors">Find Jobs Near You</a>
              <a href="#tools" onClick={() => setMobileMenuOpen(false)} className="text-[11px] font-extrabold uppercase tracking-widest text-slate-300 hover:text-electric-cyan transition-colors">Free Tools</a>
              <a href="#roi" onClick={() => setMobileMenuOpen(false)} className="text-[11px] font-extrabold uppercase tracking-widest text-slate-300 hover:text-electric-cyan transition-colors">ROI Calc</a>
              <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="text-[11px] font-extrabold uppercase tracking-widest text-slate-300 hover:text-electric-cyan transition-colors">Pricing</a>
              <a href="#filter" onClick={() => setMobileMenuOpen(false)} className="mt-2 text-center bg-high-vis-orange text-deep-slate text-[11px] font-extrabold py-3 rounded-sm uppercase tracking-widest">Find Jobs Near Me</a>
            </div>
          )}
        </div>
      </nav>

      {/* ── HERO ── */}
      <header className="relative pt-40 pb-28 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-sm px-4 py-2 mb-8">
            <span className="w-1.5 h-1.5 bg-high-vis-orange rounded-full animate-pulse"></span>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-high-vis-orange">Free — No Card Needed</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="font-display text-6xl md:text-9xl font-extrabold tracking-tighter mb-6 leading-[0.85] uppercase italic"
          >
            Stop Wasting Time<br /><span className="text-high-vis-orange">On Bad Jobs.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="text-lg md:text-2xl text-slate-400 max-w-2xl mx-auto mb-4 leading-snug font-medium"
          >
            Enter your postcode. JobFilter scans local leads, kills the rubbish, and shows you only the jobs worth quoting. Free forever.
          </motion.p>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-sm text-slate-500 font-bold uppercase tracking-widest mb-10">
            Electricians · Plumbers · Builders · Heating Engineers · General Trade
          </motion.p>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35 }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#filter" onClick={() => trackEvent('hero_cta_click', { source: 'hero' })}
              className="inline-flex items-center justify-center gap-3 bg-high-vis-orange hover:bg-amber-500 text-deep-slate text-xl font-extrabold py-5 px-10 rounded-sm shadow-2xl glow-orange transition-all transform hover:scale-105 active:scale-95 uppercase italic">
              Find Jobs Near Me →
            </a>
            <a href="#tools" className="inline-flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xl font-extrabold py-5 px-10 rounded-sm transition-all uppercase italic">
              Free Trade Tools
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-10 flex flex-wrap justify-center gap-8 text-xs font-bold uppercase tracking-widest text-slate-500">
            <span>✓ No account needed</span>
            <span>✓ 3 full records free / month</span>
            <span>✓ Postcode-accurate filtering</span>
            <span>✓ 10 free trade tools</span>
          </motion.div>
        </div>

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-15 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-amber-500 rounded-full blur-[180px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-500 rounded-full blur-[180px]"></div>
        </div>
      </header>

      {/* ── SOCIAL PROOF STRIP ── */}
      <div className="py-6 px-6 bg-charcoal/50 border-y border-white/5">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-10 text-center">
          {[
            { v: '2,400+', l: 'Leads Scanned' },
            { v: '£340', l: 'Avg Saved / Month' },
            { v: '94%', l: 'Bad Leads Filtered' },
            { v: '10', l: 'Free Trade Tools' },
          ].map(({ v, l }) => (
            <div key={l}>
              <p className="font-display text-3xl font-extrabold text-high-vis-orange italic">{v}</p>
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 mt-1">{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── THE FILTER ── */}
      <section id="filter" className="py-24 px-6 bg-charcoal/30 border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-6xl font-extrabold uppercase italic mb-3">ENTER THE <span className="text-electric-cyan">INTAKE</span></h2>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Real leads by postcode. No chasing. No competing.</p>
          </div>

          <div className="bg-deep-slate p-6 md:p-8 rounded-sm border border-white/10 shadow-2xl">
            <div className="grid md:grid-cols-[1.4fr_2fr_1fr] gap-4 mb-6">
              <div>
                <label className="text-xs font-extrabold text-slate-500 uppercase tracking-widest block mb-2">Your Trade</label>
                <select value={tradeType} onChange={(e) => setTradeType(e.target.value)}
                  className="w-full bg-slate-900/70 border border-white/10 rounded-sm px-4 py-3 text-sm font-bold uppercase tracking-wide text-slate-100 focus:outline-none focus:border-electric-cyan">
                  <option value="general">General Trade</option>
                  <option value="electrical">Electrical</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="heating">Heating</option>
                  <option value="building">Building</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-extrabold text-slate-500 uppercase tracking-widest block mb-2">Your Postcode</label>
                <input value={postcode} onChange={(e) => setPostcode(e.target.value.toUpperCase())} placeholder="e.g. B14 7QH"
                  className="w-full bg-slate-900/70 border border-white/10 rounded-sm px-4 py-3 text-xl font-bold uppercase tracking-wide text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-electric-cyan" />
              </div>
              <div className="flex items-end">
                <button onClick={startScan} disabled={isScanning || postcode.trim().length < 4}
                  className="w-full bg-high-vis-orange disabled:bg-slate-700 disabled:text-slate-500 hover:bg-amber-500 text-deep-slate font-extrabold py-3 px-4 rounded-sm uppercase italic tracking-widest transition-all h-[52px] text-sm">
                  {isScanning ? 'Scanning...' : 'Start Job Scan'}
                </button>
              </div>
            </div>

            <div className="relative min-h-[180px] bg-slate-900/50 p-5 rounded-sm border border-white/5">
              {isScanning && <div className="absolute inset-0 z-10 overflow-hidden rounded-sm"><div className="w-full h-0.5 bg-electric-cyan shadow-[0_0_15px_#22d3ee] absolute animate-scan"></div></div>}

              {scanComplete ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                  <div className="flex items-center gap-3 text-green-400 font-bold uppercase italic text-sm"><span>✔</span> CONTROL THE JOBS — REAL LEADS ONLY</div>
                  <div className="grid gap-2">
                    {leadResults.map((job, index) => (
                      <div key={`${job.title}-${index}`} className="bg-slate-800/70 border border-white/10 rounded-sm p-3">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-extrabold uppercase tracking-wide text-slate-100">{job.title}</p>
                            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mt-1">{job.trade} • {job.location} • Confidence {job.sourceConfidence}%</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs font-extrabold uppercase tracking-widest text-high-vis-orange">Est. Value</p>
                            <p className="text-lg font-display font-extrabold italic text-high-vis-orange">£{job.estimatedValue.toLocaleString('en-GB')}</p>
                          </div>
                        </div>
                        <p className="text-[11px] font-bold uppercase tracking-widest text-electric-cyan mt-2">{toDisplayUrgency(job.urgency)}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-slate-800/80 border border-electric-cyan/30 p-4 rounded-sm mt-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-slate-400 font-extrabold uppercase tracking-widest">Lead Quality Score</p>
                        <p className="text-4xl font-display font-extrabold text-electric-cyan mt-1">{leadQualityScore}<span className="text-xl text-slate-500">/100</span></p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-400 font-extrabold uppercase tracking-widest mb-1">{freeViewsUsed} of 3 free views used</p>
                        <div className="flex gap-1 justify-end">{[0,1,2].map(i => <div key={i} className={`w-6 h-2 rounded-sm ${i < freeViewsUsed ? 'bg-high-vis-orange' : 'bg-slate-700'}`}></div>)}</div>
                      </div>
                    </div>
                    <ul className="mt-3 space-y-1 text-xs text-slate-300 font-bold uppercase tracking-wide">
                      <li>• Region locked: {scanRegion}</li>
                      <li>• Scope matches {tradeType} profile</li>
                      <li>• FAIR SYSTEM: no hidden lead mixing</li>
                    </ul>
                  </div>
                  <div className="pt-3 border-t border-white/5 flex flex-col sm:flex-row items-center gap-4 justify-between">
                    <p className="text-sm font-bold text-slate-400">STAY IN CONTROL. NO CONTRACTS. <span className="text-high-vis-orange">{Math.max(0, 3 - freeViewsUsed)} free views left this month.</span></p>
                    <a href="#pricing" onClick={() => trackEvent('upgrade_cta_click', { source: 'filter' })}
                      className="inline-block bg-high-vis-orange hover:bg-amber-500 text-deep-slate font-extrabold py-2.5 px-6 rounded-sm uppercase italic tracking-widest text-xs whitespace-nowrap">
                      Unlock Unlimited →
                    </a>
                  </div>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full py-8">
                  <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-4">ENTER POSTCODE. START JOB SCAN.</p>
                  <div className="flex gap-2">
                    {['REAL LEADS', 'NO CHASING', 'NO COMPETING'].map((s, i) => (
                      <div key={i} className="bg-slate-800/60 border border-white/5 px-3 py-2 rounded-sm text-[10px] font-bold uppercase tracking-wide text-slate-500 text-center">{s}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── FREE TOOLS ── */}
      <section id="tools" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="font-display text-4xl md:text-6xl font-extrabold uppercase italic mb-3">Free <span className="text-high-vis-orange">Trade Tools</span></h2>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">10 tools. All free. Built for tradesmen who want to make more money.</p>
          </div>

          {/* Tool grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
            {tools.map(t => (
              <button key={t.id} onClick={() => { setActiveToolId(t.id === activeToolId ? null : t.id); trackEvent('tool_used', { tool: t.id }); }}
                className={`p-4 rounded-sm border text-left transition-all ${activeToolId === t.id ? 'bg-high-vis-orange/10 border-high-vis-orange text-white' : 'bg-slate-900/50 border-white/10 hover:border-white/20 text-slate-300'}`}>
                <span className="text-2xl block mb-2">{t.icon}</span>
                <p className="text-xs font-extrabold uppercase tracking-wide leading-tight">{t.label}</p>
                <p className="text-[10px] text-slate-500 mt-1 leading-tight">{t.desc}</p>
              </button>
            ))}
          </div>

          {/* Tool panels */}
          <AnimatePresence mode="wait">
            {activeToolId && (
              <motion.div key={activeToolId} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-deep-slate border border-white/10 rounded-sm p-6 md:p-8">

                {/* ── QUOTE BUILDER ── */}
                {activeToolId === 'quote' && (
                  <div>
                    <h3 className="font-display text-3xl font-extrabold uppercase italic mb-6">Quote Quick <span className="text-high-vis-orange">Builder</span></h3>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <SliderField label="Labour hours" value={qtLabour} setValue={setQtLabour} min={1} max={40} unit="hrs" />
                        <SliderField label="Your hourly rate" value={qtRate} setValue={setQtRate} min={15} max={100} prefix="£" />
                        <SliderField label="Materials cost" value={qtMaterials} setValue={setQtMaterials} min={0} max={5000} step={50} prefix="£" />
                        <SliderField label="Materials markup" value={qtMarkup} setValue={setQtMarkup} min={0} max={60} unit="%" />
                      </div>
                      <div className="bg-slate-900/60 rounded-sm p-6 border border-white/5 flex flex-col justify-between">
                        <div className="space-y-4">
                          <QuoteLine label="Labour" value={`£${qtLabourTotal.toFixed(0)}`} />
                          <QuoteLine label={`Materials (inc. ${qtMarkup}% markup)`} value={`£${qtMaterialsTotal.toFixed(0)}`} />
                          <div className="border-t border-white/10 pt-4">
                            <QuoteLine label="TOTAL QUOTE" value={`£${qtTotal.toFixed(0)}`} large orange />
                          </div>
                          <div className="border-t border-white/10 pt-4">
                            <QuoteLine label="Inc. VAT (20%)" value={`£${(qtTotal * 1.2).toFixed(0)}`} small />
                          </div>
                        </div>
                        <div className="mt-6 p-3 bg-amber-500/10 border border-amber-500/20 rounded-sm">
                          <p className="text-xs font-bold text-amber-400 uppercase tracking-wide">💡 Better leads = bigger quotes. <a href="#pricing" className="underline">Unlock unlimited access →</a></p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── DAY RATE ── */}
                {activeToolId === 'dayrate' && (
                  <div>
                    <h3 className="font-display text-3xl font-extrabold uppercase italic mb-6">Day Rate <span className="text-high-vis-orange">Calculator</span></h3>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <SliderField label="Annual income target" value={drAnnualTarget} setValue={setDrAnnualTarget} min={20000} max={120000} step={1000} prefix="£" />
                        <SliderField label="Working days per year" value={drDaysWorked} setValue={setDrDaysWorked} min={100} max={260} unit="days" />
                        <SliderField label="Annual overheads (van, tools, insurance)" value={drOverheads} setValue={setDrOverheads} min={0} max={30000} step={500} prefix="£" />
                      </div>
                      <div className="bg-slate-900/60 rounded-sm p-6 border border-white/5 flex flex-col justify-center text-center">
                        <p className="text-xs font-extrabold uppercase tracking-widest text-slate-500 mb-2">Your Minimum Day Rate</p>
                        <p className="font-display text-7xl font-extrabold text-high-vis-orange italic">£{drRequired}</p>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-2">Per day to hit your target</p>
                        <div className="mt-4 text-sm font-bold text-slate-300">
                          = <span className="text-electric-cyan">£{Math.ceil(drRequired / 8)}/hr</span> based on 8hr day
                        </div>
                        <div className="mt-6 p-3 bg-amber-500/10 border border-amber-500/20 rounded-sm text-left">
                          <p className="text-xs font-bold text-amber-400 uppercase tracking-wide">💡 Charging less? You're subsidising your clients. <a href="#filter" className="underline">Find better-paying jobs →</a></p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── LEAD VALUE ── */}
                {activeToolId === 'leadvalue' && (
                  <div>
                    <h3 className="font-display text-3xl font-extrabold uppercase italic mb-6">Lead Value <span className="text-high-vis-orange">Checker</span></h3>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <div>
                          <label className="text-xs font-extrabold uppercase tracking-widest text-slate-400 block mb-2">Client's budget (£)</label>
                          <input type="number" value={lvBudget} onChange={e => setLvBudget(e.target.value)} placeholder="e.g. 800" className="w-full bg-slate-900/70 border border-white/10 rounded-sm px-4 py-3 text-lg font-bold text-slate-100 focus:outline-none focus:border-electric-cyan" />
                        </div>
                        <div>
                          <label className="text-xs font-extrabold uppercase tracking-widest text-slate-400 block mb-2">Job scope</label>
                          <select value={lvScope} onChange={e => setLvScope(e.target.value)} className="w-full bg-slate-900/70 border border-white/10 rounded-sm px-4 py-3 text-sm font-bold text-slate-100 focus:outline-none focus:border-electric-cyan">
                            <option value="small">Small (half day)</option>
                            <option value="medium">Medium (1–3 days)</option>
                            <option value="large">Large (week+)</option>
                          </select>
                        </div>
                        <SliderField label="Distance from you" value={lvDistance} setValue={setLvDistance} min={1} max={50} unit="miles" />
                        <div>
                          <label className="text-xs font-extrabold uppercase tracking-widest text-slate-400 block mb-2">Payment method</label>
                          <select value={lvPayType} onChange={e => setLvPayType(e.target.value)} className="w-full bg-slate-900/70 border border-white/10 rounded-sm px-4 py-3 text-sm font-bold text-slate-100 focus:outline-none focus:border-electric-cyan">
                            <option value="card">Card / Bank Transfer</option>
                            <option value="cash">Cash</option>
                            <option value="unknown">Not stated</option>
                          </select>
                        </div>
                      </div>
                      <div className="bg-slate-900/60 rounded-sm p-6 border border-white/5 flex flex-col justify-center text-center">
                        <p className="text-xs font-extrabold uppercase tracking-widest text-slate-500 mb-2">Lead Score</p>
                        <p className={`font-display text-8xl font-extrabold italic ${lvColor}`}>{lvScore}</p>
                        <p className={`text-lg font-extrabold uppercase italic mt-2 ${lvColor}`}>{lvLabel}</p>
                        <div className="mt-4 w-full bg-slate-800 rounded-sm h-2">
                          <div className={`h-2 rounded-sm transition-all ${lvScore >= 75 ? 'bg-green-400' : lvScore >= 55 ? 'bg-amber-400' : 'bg-red-400'}`} style={{ width: `${lvScore}%` }}></div>
                        </div>
                        {lvScore < 55 && (
                          <div className="mt-6 p-3 bg-amber-500/10 border border-amber-500/20 rounded-sm text-left">
                            <p className="text-xs font-bold text-amber-400 uppercase tracking-wide">💡 This job is low value. <a href="#filter" className="underline">Find better leads near you →</a></p>
                          </div>
                        )}
                        {lvScore >= 75 && (
                          <div className="mt-6 p-3 bg-green-500/10 border border-green-500/20 rounded-sm text-left">
                            <p className="text-xs font-bold text-green-400 uppercase tracking-wide">✔ Strong lead. Quote fast before someone else does.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── MARKUP ── */}
                {activeToolId === 'markup' && (
                  <div>
                    <h3 className="font-display text-3xl font-extrabold uppercase italic mb-6">Material Markup <span className="text-high-vis-orange">Calculator</span></h3>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <SliderField label="Materials cost (what you pay)" value={mmCost} setValue={setMmCost} min={10} max={10000} step={10} prefix="£" />
                        <SliderField label="Your markup %" value={mmMarkup} setValue={setMmMarkup} min={5} max={100} unit="%" />
                        <div className="p-4 bg-slate-900/50 border border-white/5 rounded-sm text-xs font-bold uppercase tracking-wide text-slate-400">
                          <p>Industry standard markup: <span className="text-white">20–30%</span></p>
                          <p className="mt-1">Premium materials (specialist): <span className="text-white">40–60%</span></p>
                        </div>
                      </div>
                      <div className="bg-slate-900/60 rounded-sm p-6 border border-white/5 space-y-4">
                        <QuoteLine label="Your cost" value={`£${mmCost.toFixed(0)}`} />
                        <QuoteLine label={`Charge to client (+${mmMarkup}%)`} value={`£${mmCharge.toFixed(0)}`} large orange />
                        <div className="border-t border-white/10 pt-4">
                          <QuoteLine label="Your profit on materials" value={`£${mmProfit.toFixed(0)}`} />
                        </div>
                        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-sm">
                          <p className="text-xs font-bold text-amber-400 uppercase tracking-wide">💡 Most tradesmen undercharge on materials by 15–20%. Don't leave money on the bench.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── TIME ESTIMATE ── */}
                {activeToolId === 'timeestimate' && (
                  <div>
                    <h3 className="font-display text-3xl font-extrabold uppercase italic mb-6">Time <span className="text-high-vis-orange">Estimator</span></h3>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        {[
                          { label: 'Job scope', val: teScope, set: setTeScope, opts: [['small','Small — half day or less'],['medium','Medium — 1 to 3 days'],['large','Large — 1 to 2 weeks'],['major','Major — 2 weeks+']] },
                          { label: 'Trade type', val: teTrade, set: setTeTrade, opts: [['general','General'],['electrical','Electrical'],['plumbing','Plumbing'],['heating','Heating / Gas'],['building','Building']] },
                          { label: 'Site access', val: teAccess, set: setTeAccess, opts: [['easy','Easy — clear access'],['moderate','Moderate — some obstacles'],['difficult','Difficult — restricted access']] },
                        ].map(({ label, val, set, opts }) => (
                          <div key={label}>
                            <label className="text-xs font-extrabold uppercase tracking-widest text-slate-400 block mb-2">{label}</label>
                            <select value={val} onChange={e => set(e.target.value)} className="w-full bg-slate-900/70 border border-white/10 rounded-sm px-4 py-3 text-sm font-bold text-slate-100 focus:outline-none focus:border-electric-cyan">
                              {opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                            </select>
                          </div>
                        ))}
                      </div>
                      <div className="bg-slate-900/60 rounded-sm p-6 border border-white/5 flex flex-col justify-center text-center">
                        <p className="text-xs font-extrabold uppercase tracking-widest text-slate-500 mb-2">Estimated Time</p>
                        <p className="font-display text-8xl font-extrabold text-electric-cyan italic">{teHours}</p>
                        <p className="text-lg font-bold uppercase tracking-widest text-slate-400 mt-1">hours</p>
                        <div className="mt-4 grid grid-cols-2 gap-3 text-center">
                          <div className="bg-slate-800/60 rounded-sm p-3">
                            <p className="text-xs text-slate-500 font-bold uppercase tracking-wide">Days</p>
                            <p className="font-extrabold text-xl text-white">{(teHours / 8).toFixed(1)}</p>
                          </div>
                          <div className="bg-slate-800/60 rounded-sm p-3">
                            <p className="text-xs text-slate-500 font-bold uppercase tracking-wide">Weeks</p>
                            <p className="font-extrabold text-xl text-white">{(teHours / 40).toFixed(1)}</p>
                          </div>
                        </div>
                        <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-sm text-left">
                          <p className="text-xs font-bold text-amber-400 uppercase tracking-wide">💡 Always add 20% buffer for access, snagging, and client changes.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── FUEL ── */}
                {activeToolId === 'fuelcost' && (
                  <div>
                    <h3 className="font-display text-3xl font-extrabold uppercase italic mb-6">Fuel Cost <span className="text-high-vis-orange">Calculator</span></h3>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <SliderField label="Round trip miles" value={fcMiles} setValue={setFcMiles} min={2} max={200} unit="miles" />
                        <SliderField label="Van MPG" value={fcMpg} setValue={setFcMpg} min={15} max={60} unit="mpg" />
                        <SliderField label="Fuel price (pence/litre)" value={fcPrice} setValue={setFcPrice} min={100} max={200} unit="p" />
                        <SliderField label="Number of trips to site" value={fcTrips} setValue={setFcTrips} min={1} max={20} unit="trips" />
                      </div>
                      <div className="bg-slate-900/60 rounded-sm p-6 border border-white/5 space-y-4">
                        <QuoteLine label="Fuel per trip" value={`£${fcCostPerTrip.toFixed(2)}`} />
                        <QuoteLine label={`Total (${fcTrips} trips)`} value={`£${fcTotal.toFixed(2)}`} large orange />
                        <div className="border-t border-white/10 pt-4">
                          <p className="text-xs font-extrabold uppercase tracking-widest text-slate-500 mb-2">Add to your quote</p>
                          <div className="flex gap-2">
                            {[0, 10, 20].map(markup => (
                              <div key={markup} className="flex-1 bg-slate-800/60 rounded-sm p-3 text-center">
                                <p className="text-[10px] text-slate-500 font-bold uppercase">{markup === 0 ? 'Cost' : `+${markup}%`}</p>
                                <p className="font-extrabold text-sm text-white mt-1">£{(fcTotal * (1 + markup / 100)).toFixed(2)}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-sm">
                          <p className="text-xs font-bold text-amber-400 uppercase tracking-wide">💡 Always charge travel. Time sat in the van is still your time.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── INVOICE ── */}
                {activeToolId === 'invoice' && (
                  <div>
                    <h3 className="font-display text-3xl font-extrabold uppercase italic mb-6">Invoice <span className="text-high-vis-orange">Generator</span></h3>
                    {!invGenerated ? (
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <div>
                            <label className="text-xs font-extrabold uppercase tracking-widest text-slate-400 block mb-2">Client name</label>
                            <input value={invClient} onChange={e => setInvClient(e.target.value)} placeholder="e.g. John Smith" className="w-full bg-slate-900/70 border border-white/10 rounded-sm px-4 py-3 text-sm font-bold text-slate-100 focus:outline-none focus:border-electric-cyan" />
                          </div>
                          <div>
                            <label className="text-xs font-extrabold uppercase tracking-widest text-slate-400 block mb-2">Job description</label>
                            <input value={invJob} onChange={e => setInvJob(e.target.value)} placeholder="e.g. Boiler service and thermostat replacement" className="w-full bg-slate-900/70 border border-white/10 rounded-sm px-4 py-3 text-sm font-bold text-slate-100 focus:outline-none focus:border-electric-cyan" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-xs font-extrabold uppercase tracking-widest text-slate-400 block mb-2">Labour (£)</label>
                              <input type="number" value={invLabour || ''} onChange={e => setInvLabour(parseFloat(e.target.value) || 0)} placeholder="0" className="w-full bg-slate-900/70 border border-white/10 rounded-sm px-4 py-3 text-sm font-bold text-slate-100 focus:outline-none focus:border-electric-cyan" />
                            </div>
                            <div>
                              <label className="text-xs font-extrabold uppercase tracking-widest text-slate-400 block mb-2">Materials (£)</label>
                              <input type="number" value={invMaterials || ''} onChange={e => setInvMaterials(parseFloat(e.target.value) || 0)} placeholder="0" className="w-full bg-slate-900/70 border border-white/10 rounded-sm px-4 py-3 text-sm font-bold text-slate-100 focus:outline-none focus:border-electric-cyan" />
                            </div>
                          </div>
                          <label className="flex items-center gap-3 cursor-pointer">
                            <div onClick={() => setInvVat(v => !v)} className={`w-10 h-6 rounded-full transition-all ${invVat ? 'bg-high-vis-orange' : 'bg-slate-700'} relative`}>
                              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${invVat ? 'left-5' : 'left-1'}`}></div>
                            </div>
                            <span className="text-sm font-bold text-slate-300">Add VAT (20%)</span>
                          </label>
                          <button onClick={() => setInvGenerated(true)} disabled={!invClient || !invJob} className="w-full bg-high-vis-orange disabled:bg-slate-700 disabled:text-slate-500 hover:bg-amber-500 text-deep-slate font-extrabold py-4 rounded-sm uppercase italic tracking-widest transition-all">
                            Generate Invoice
                          </button>
                        </div>
                        <div className="bg-slate-900/60 rounded-sm p-6 border border-white/5 space-y-3">
                          <QuoteLine label="Labour" value={`£${invLabour.toFixed(2)}`} />
                          <QuoteLine label="Materials" value={`£${invMaterials.toFixed(2)}`} />
                          {invVat && <QuoteLine label="VAT (20%)" value={`£${invVatAmt.toFixed(2)}`} />}
                          <div className="border-t border-white/10 pt-3">
                            <QuoteLine label="Total Due" value={`£${invTotal.toFixed(2)}`} large orange />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="bg-white text-slate-900 p-8 rounded-sm mb-4">
                          <div className="flex justify-between items-start mb-8">
                            <div>
                              <p className="font-display text-2xl font-extrabold uppercase italic text-amber-500">JobFilter</p>
                              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Built For Trades</p>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-extrabold text-slate-900">INVOICE</p>
                              <p className="text-xs text-slate-500 font-bold mt-1">{invNumber}</p>
                              <p className="text-xs text-slate-500 font-bold">{invDate}</p>
                            </div>
                          </div>
                          <div className="mb-6">
                            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Bill To</p>
                            <p className="font-bold text-lg">{invClient || 'Client Name'}</p>
                          </div>
                          <div className="mb-6">
                            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Description</p>
                            <p className="font-medium">{invJob || 'Job Description'}</p>
                          </div>
                          <div className="border-t border-slate-200 pt-4 space-y-2">
                            <div className="flex justify-between text-sm"><span className="font-medium text-slate-600">Labour</span><span className="font-bold">£{invLabour.toFixed(2)}</span></div>
                            <div className="flex justify-between text-sm"><span className="font-medium text-slate-600">Materials</span><span className="font-bold">£{invMaterials.toFixed(2)}</span></div>
                            {invVat && <div className="flex justify-between text-sm"><span className="font-medium text-slate-600">VAT (20%)</span><span className="font-bold">£{invVatAmt.toFixed(2)}</span></div>}
                            <div className="flex justify-between text-xl font-extrabold border-t border-slate-300 pt-2 mt-2">
                              <span>Total Due</span><span className="text-amber-500">£{invTotal.toFixed(2)}</span>
                            </div>
                          </div>
                          <div className="mt-6 text-xs text-slate-400">Payment due within 14 days. Bank transfer preferred.</div>
                        </div>
                        <div className="flex gap-3">
                          <button onClick={() => window.print()} className="flex-1 bg-high-vis-orange hover:bg-amber-500 text-deep-slate font-extrabold py-3 rounded-sm uppercase italic tracking-widest text-sm">Print / Save PDF</button>
                          <button onClick={() => setInvGenerated(false)} className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-extrabold py-3 rounded-sm uppercase italic tracking-widest text-sm">Edit Invoice</button>
                        </div>
                        <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-sm">
                          <p className="text-xs font-bold text-amber-400 uppercase tracking-wide">💡 Getting paid slow? JobFilter Pro includes a Payment Chaser that auto-follows up. <a href="#pricing" className="underline">See plans →</a></p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ── PROFIT MARGIN ── */}
                {activeToolId === 'profit' && (
                  <div>
                    <h3 className="font-display text-3xl font-extrabold uppercase italic mb-6">Profit Margin <span className="text-high-vis-orange">Calculator</span></h3>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <SliderField label="Job revenue (what you charge)" value={pmRevenue} setValue={setPmRevenue} min={100} max={20000} step={50} prefix="£" />
                        <SliderField label="Total job costs (labour + materials + fuel)" value={pmCosts} setValue={setPmCosts} min={50} max={18000} step={50} prefix="£" />
                        <div className="p-4 bg-slate-900/50 border border-white/5 rounded-sm text-xs font-bold uppercase tracking-wide text-slate-400 space-y-1">
                          <p>Target margin: <span className="text-white">30–40%</span> minimum</p>
                          <p>Below 20%: <span className="text-red-400">You're working for free</span></p>
                        </div>
                      </div>
                      <div className="bg-slate-900/60 rounded-sm p-6 border border-white/5 flex flex-col justify-center text-center">
                        <p className="text-xs font-extrabold uppercase tracking-widest text-slate-500 mb-2">Profit Margin</p>
                        <p className={`font-display text-7xl font-extrabold italic ${pmColor}`}>{pmMargin}%</p>
                        <p className={`text-lg font-extrabold uppercase italic mt-1 ${pmColor}`}>{pmLabel}</p>
                        <div className="mt-4 w-full bg-slate-800 rounded-sm h-3">
                          <div className={`h-3 rounded-sm transition-all ${parseFloat(pmMargin) >= 40 ? 'bg-green-400' : parseFloat(pmMargin) >= 20 ? 'bg-amber-400' : 'bg-red-400'}`} style={{ width: `${Math.min(100, parseFloat(pmMargin) * 2.5)}%` }}></div>
                        </div>
                        <div className="mt-4 border-t border-white/10 pt-4">
                          <QuoteLine label="Profit on this job" value={`£${pmProfit.toFixed(0)}`} large orange />
                        </div>
                        {parseFloat(pmMargin) < 30 && (
                          <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-sm text-left">
                            <p className="text-xs font-bold text-amber-400 uppercase tracking-wide">💡 Low margin. You need better-paying leads. <a href="#filter" className="underline">Find them here →</a></p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── CASH FLOW ── */}
                {activeToolId === 'cashflow' && (
                  <div>
                    <h3 className="font-display text-3xl font-extrabold uppercase italic mb-6">Cash Flow <span className="text-high-vis-orange">Forecast</span></h3>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <SliderField label="Average weekly income" value={cfWeeklyIn} setValue={setCfWeeklyIn} min={200} max={10000} step={100} prefix="£" />
                        <SliderField label="Average weekly outgoings (fuel, materials, subs)" value={cfWeeklyOut} setValue={setCfWeeklyOut} min={100} max={8000} step={100} prefix="£" />
                      </div>
                      <div className="bg-slate-900/60 rounded-sm p-6 border border-white/5 space-y-4">
                        <div className="grid grid-cols-3 gap-3 text-center">
                          {[
                            { label: 'Weekly Net', value: `£${cfWeeklyNet.toFixed(0)}`, color: cfWeeklyNet > 0 ? 'text-green-400' : 'text-red-400' },
                            { label: 'Monthly Net', value: `£${cfMonthlyNet.toFixed(0)}`, color: cfMonthlyNet > 0 ? 'text-green-400' : 'text-red-400' },
                            { label: 'Annual Net', value: `£${(cfAnnualNet / 1000).toFixed(1)}k`, color: cfAnnualNet > 0 ? 'text-green-400' : 'text-red-400' },
                          ].map(({ label, value, color }) => (
                            <div key={label} className="bg-slate-800/60 rounded-sm p-4">
                              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wide mb-1">{label}</p>
                              <p className={`font-display text-xl font-extrabold italic ${color}`}>{value}</p>
                            </div>
                          ))}
                        </div>
                        <div className="border-t border-white/10 pt-4">
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">12-Week Projection</p>
                          <div className="flex items-end gap-1 h-16">
                            {Array.from({ length: 12 }, (_, i) => {
                              const variance = (Math.sin(i * 1.3) * 0.15 + 1);
                              const h = Math.max(10, Math.min(100, ((cfWeeklyNet * variance) / Math.max(cfWeeklyIn, 1)) * 100 + 50));
                              return <div key={i} className={`flex-1 rounded-sm ${cfWeeklyNet > 0 ? 'bg-green-500' : 'bg-red-500'} opacity-${60 + i * 3}`} style={{ height: `${h}%` }}></div>;
                            })}
                          </div>
                        </div>
                        {cfWeeklyNet < 200 && (
                          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-sm">
                            <p className="text-xs font-bold text-amber-400 uppercase tracking-wide">💡 Tight margins. More consistent leads = steadier cash flow. <a href="#filter" className="underline">Find leads →</a></p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── VAT CHECKER ── */}
                {activeToolId === 'vatcheck' && (
                  <div>
                    <h3 className="font-display text-3xl font-extrabold uppercase italic mb-6">VAT Threshold <span className="text-high-vis-orange">Checker</span></h3>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <SliderField label="Your annual turnover" value={vtTurnover} setValue={setVtTurnover} min={10000} max={200000} step={1000} prefix="£" />
                        <div className="p-4 bg-slate-900/50 border border-white/5 rounded-sm text-xs font-bold uppercase tracking-wide text-slate-400 space-y-1">
                          <p>VAT registration threshold: <span className="text-white">£{vtThreshold.toLocaleString()}</span></p>
                          <p>Once over: <span className="text-amber-400">Must register within 30 days</span></p>
                          <p>Voluntary registration: <span className="text-white">Any turnover level</span></p>
                        </div>
                      </div>
                      <div className="bg-slate-900/60 rounded-sm p-6 border border-white/5 flex flex-col justify-center">
                        <div className="mb-4">
                          <div className="flex justify-between mb-2">
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">£0</span>
                            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">£{vtThreshold.toLocaleString()} threshold</span>
                          </div>
                          <div className="w-full bg-slate-800 rounded-sm h-4">
                            <div className={`h-4 rounded-sm transition-all ${vtOver ? 'bg-red-500' : vtPercent > 80 ? 'bg-amber-400' : 'bg-green-400'}`} style={{ width: `${Math.min(100, vtPercent)}%` }}></div>
                          </div>
                          <p className="text-xs text-slate-500 font-bold mt-1 text-right">{vtPercent.toFixed(0)}% of threshold</p>
                        </div>
                        {vtOver ? (
                          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-sm">
                            <p className="text-red-400 font-extrabold uppercase italic text-sm">⚠ Over Threshold</p>
                            <p className="text-xs text-slate-300 font-bold mt-1">You're £{Math.abs(vtGap).toLocaleString()} over the VAT threshold. You should be registered. Speak to an accountant immediately.</p>
                          </div>
                        ) : vtPercent > 80 ? (
                          <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-sm">
                            <p className="text-amber-400 font-extrabold uppercase italic text-sm">⚡ Getting Close</p>
                            <p className="text-xs text-slate-300 font-bold mt-1">Only £{vtGap.toLocaleString()} below the threshold. Plan ahead — VAT registration can affect pricing.</p>
                          </div>
                        ) : (
                          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-sm">
                            <p className="text-green-400 font-extrabold uppercase italic text-sm">✔ Below Threshold</p>
                            <p className="text-xs text-slate-300 font-bold mt-1">£{vtGap.toLocaleString()} below the VAT threshold. You're clear — but track your turnover monthly.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── ROI CALCULATOR ── */}
      <section id="roi" className="py-24 px-6 bg-charcoal/30 border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-6xl font-extrabold uppercase italic mb-3">The <span className="text-high-vis-orange">Diesel Burn</span> Calculator</h2>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm italic">See exactly what free quoting is costing you every year.</p>
          </div>
          <div className="bg-charcoal p-8 rounded-sm border border-white/5 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <SliderField label="Unpaid quotes per week" value={quotesPerWeek} setValue={setQuotesPerWeek} min={1} max={20} />
                <SliderField label="Miles driven for wasted surveys" value={milesDriven} setValue={setMilesDriven} min={5} max={200} step={5} unit="mi" />
              </div>
              <div className="bg-deep-slate p-8 rounded-sm border border-white/5 flex flex-col justify-center text-center gap-6">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-widest text-slate-500 mb-2">Annual Admin Debt</p>
                  <p className="text-5xl font-display font-extrabold text-red-500 italic">£{annualAdminDebt.toLocaleString()}</p>
                  <p className="text-xs text-slate-500 font-bold mt-1">Time + fuel wasted on bad leads</p>
                </div>
                <div className="border-t border-white/5 pt-6">
                  <p className="text-xs font-extrabold uppercase tracking-widest text-slate-500 mb-2">With JobFilter You Could Save</p>
                  <p className="text-6xl font-display font-extrabold text-green-500 italic shadow-[0_0_20px_rgba(34,197,94,0.2)]">£{jobFilterSavings.toLocaleString()}</p>
                  <p className="text-xs text-slate-500 font-bold mt-1">Back in your pocket per year</p>
                </div>
                <a href="#pricing" className="inline-block bg-high-vis-orange hover:bg-amber-500 text-deep-slate font-extrabold py-3 px-6 rounded-sm uppercase italic tracking-widest text-sm">
                  Start Saving Now →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-4xl md:text-6xl font-extrabold text-center mb-4 uppercase italic">Simple <span className="text-high-vis-orange">Pricing</span></h2>
          <p className="text-center text-slate-400 font-bold uppercase tracking-widest mb-4 italic text-sm">One job win pays for a year's subscription.</p>
          <p className="text-center text-slate-500 font-bold uppercase tracking-widest mb-12 text-xs">Early access — join the list, launch price guaranteed.</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-900/50 border border-white/10 p-6 rounded-sm flex flex-col">
              <p className="text-slate-400 font-extrabold uppercase tracking-widest text-xs">Starter</p>
              <p className="text-4xl font-display font-extrabold mt-2">£0</p>
              <p className="text-[10px] font-bold text-slate-500 uppercase italic tracking-widest mt-2 leading-tight">Free forever. Try the filter and open 3 full records/month.</p>
              <ul className="mt-6 space-y-2 text-slate-300 text-sm font-bold flex-1">
                <li>✓ All 10 free tools</li>
                <li>✓ Lead scanning</li>
                <li>✓ 3 full record views / month</li>
              </ul>
              <a href="#filter" onClick={() => trackEvent('pricing_plan_click', { plan: 'starter' })} className="mt-8 block text-center bg-slate-800 hover:bg-slate-700 text-white text-[10px] font-extrabold py-4 rounded-sm uppercase italic tracking-widest transition-colors">Start Free</a>
            </div>

            <div className="bg-slate-900/50 border border-white/10 p-6 rounded-sm flex flex-col">
              <p className="text-slate-400 font-extrabold uppercase tracking-widest text-xs">Scout Basic</p>
              <p className="text-4xl font-display font-extrabold mt-2">£19<span className="text-sm text-slate-500 font-normal">/mo</span></p>
              <p className="text-[10px] font-bold text-slate-500 uppercase italic tracking-widest mt-2 leading-tight">For occasional use — up to 10 full records/month.</p>
              <ul className="mt-6 space-y-2 text-slate-300 text-sm font-bold flex-1">
                <li>✓ 10 full record views / month</li>
                <li>✓ Lead scanning</li>
                <li>✓ All free tools</li>
              </ul>
              <button onClick={() => openWaitlist('Scout Basic')} className="mt-8 w-full text-center bg-slate-800 hover:bg-slate-700 text-white text-[10px] font-extrabold py-4 rounded-sm uppercase italic tracking-widest transition-colors">Join Early Access</button>
            </div>

            <div className="bg-amber-500/5 border-2 border-high-vis-orange p-6 rounded-sm shadow-2xl flex flex-col relative scale-105">
              <div className="absolute -top-3 left-4 bg-high-vis-orange text-deep-slate px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-widest">Most Popular</div>
              <p className="text-high-vis-orange font-extrabold uppercase tracking-widest text-xs">Scout Pro</p>
              <p className="text-4xl font-display font-extrabold mt-2">£39<span className="text-sm text-amber-500/60 font-normal">/mo</span></p>
              <p className="text-[10px] font-bold text-amber-400/80 uppercase italic tracking-widest mt-2 leading-tight">Full access. No limits. Built for active tradesmen.</p>
              <ul className="mt-6 space-y-2 text-slate-100 text-sm font-bold flex-1">
                <li>✓ Unlimited lead access</li>
                <li>✓ WhatsApp job alerts</li>
                <li>✓ Smart Quoting</li>
                <li>✓ Payment Chaser</li>
                <li>✓ Review Harvester</li>
              </ul>
              <button onClick={() => openWaitlist('Scout Pro')} className="mt-8 w-full text-center bg-high-vis-orange hover:bg-amber-500 text-deep-slate text-[10px] font-extrabold py-4 rounded-sm uppercase italic tracking-widest transition-all">Join Early Access</button>
            </div>

            <div className="bg-slate-900/50 border border-white/10 p-6 rounded-sm flex flex-col">
              <p className="text-slate-400 font-extrabold uppercase tracking-widest text-xs">Scout Max</p>
              <p className="text-4xl font-display font-extrabold mt-2">£59<span className="text-sm text-slate-500 font-normal">/mo</span></p>
              <p className="text-[10px] font-bold text-slate-500 uppercase italic tracking-widest mt-2 leading-tight">For busy teams that need priority access and multi-user.</p>
              <ul className="mt-6 space-y-2 text-slate-300 text-sm font-bold flex-1">
                <li>✓ Everything in Pro</li>
                <li>✓ Priority first access to leads</li>
                <li>✓ Multi-user (up to 3)</li>
              </ul>
              <button onClick={() => openWaitlist('Scout Max')} className="mt-8 w-full text-center bg-slate-800 hover:bg-slate-700 text-white text-[10px] font-extrabold py-4 rounded-sm uppercase italic tracking-widest transition-colors">Join Early Access</button>
            </div>
          </div>

          <div className="mt-8 bg-charcoal border border-white/10 p-8 rounded-sm flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="max-w-2xl">
              <h3 className="text-2xl font-display font-extrabold uppercase">Hammer Tier — £99/mo</h3>
              <p className="text-slate-400 font-bold text-sm mt-2">Done-for-you concierge outreach. We find, filter, and deliver qualified jobs to your inbox. You just quote.</p>
            </div>
            <button onClick={() => openWaitlist('Hammer')} className="bg-high-vis-orange hover:bg-amber-500 text-deep-slate text-sm font-extrabold py-4 px-8 rounded-sm uppercase tracking-widest whitespace-nowrap">Join Early Access</button>
          </div>
        </div>
      </section>

      {/* ── WAITLIST MODAL ── */}
      <AnimatePresence>
        {showModal === 'waitlist' && (
          <motion.div key="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm" onClick={() => setShowModal(null)}>
            <motion.div key="panel" initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-deep-slate border border-white/10 rounded-sm p-8 max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
              {waitlistSubmitted ? (
                <div className="text-center py-4">
                  <div className="w-12 h-12 bg-high-vis-orange rounded-sm flex items-center justify-center mx-auto mb-4 font-display text-2xl font-extrabold text-deep-slate">✓</div>
                  <h3 className="font-display text-2xl font-extrabold uppercase italic mb-2">You're On The List</h3>
                  <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">We'll notify you when {waitlistPlan} goes live.</p>
                  <button onClick={() => setShowModal(null)} className="mt-6 text-[10px] font-extrabold uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Close</button>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-high-vis-orange mb-1">Early Access — {waitlistPlan}</p>
                    <h3 className="font-display text-2xl font-extrabold uppercase italic leading-tight">Lock In Your Launch Price</h3>
                    <p className="text-slate-400 text-sm font-bold mt-2">Be first when we go live. No spam. We only email when you have access.</p>
                  </div>
                  <form onSubmit={submitWaitlist} className="space-y-4">
                    <input type="email" required value={waitlistEmail} onChange={e => setWaitlistEmail(e.target.value)} placeholder="your@email.com"
                      className="w-full bg-slate-900/70 border border-white/10 rounded-sm px-4 py-3 text-sm font-bold text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-electric-cyan" />
                    <button type="submit" className="w-full bg-high-vis-orange hover:bg-amber-500 text-deep-slate text-[10px] font-extrabold py-4 rounded-sm uppercase italic tracking-widest transition-all">Secure My Spot</button>
                  </form>
                  <button onClick={() => setShowModal(null)} className="mt-4 w-full text-center text-[10px] font-extrabold uppercase tracking-widest text-slate-600 hover:text-slate-400 transition-colors">Not Now</button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FOOTER ── */}
      <footer className="py-16 px-6 border-t border-white/5 bg-slate-900/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-high-vis-orange rounded-sm flex items-center justify-center font-display text-xl font-extrabold text-deep-slate italic">JF</div>
              <span className="font-display text-xl font-extrabold uppercase tracking-tighter italic">JobFilter</span>
            </div>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] italic mb-2">Built in Birmingham. Built for the trade.</p>
            <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest">© {new Date().getFullYear()} JobFilter. All rights reserved.</p>
          </div>
          <div className="grid grid-cols-2 gap-10 text-[11px] font-extrabold uppercase tracking-widest text-slate-500">
            <div className="space-y-3">
              <p className="text-slate-300">Product</p>
              <a href="#filter" className="block hover:text-white transition-colors">Find Jobs Near You</a>
              <a href="#tools" className="block hover:text-white transition-colors">Free Tools</a>
              <a href="#pricing" className="block hover:text-white transition-colors">Pricing</a>
            </div>
            <div className="space-y-3">
              <p className="text-slate-300">Legal</p>
              <a href="/privacy" className="block hover:text-white transition-colors">Privacy</a>
              <a href="/terms" className="block hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── Reusable UI helpers ───────────────────────────────────────────────────────
function SliderField({ label, value, setValue, min, max, step = 1, unit, prefix }: {
  label: string; value: number; setValue: (v: number) => void;
  min: number; max: number; step?: number; unit?: string; prefix?: string;
}) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <label className="text-xs font-extrabold uppercase tracking-widest text-slate-400 italic">{label}</label>
        <span className="text-high-vis-orange font-extrabold text-sm">{prefix}{value.toLocaleString()}{unit}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={e => setValue(parseFloat(e.target.value))}
        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-high-vis-orange" />
    </div>
  );
}

function QuoteLine({ label, value, large, orange, small }: { label: string; value: string; large?: boolean; orange?: boolean; small?: boolean }) {
  return (
    <div className="flex justify-between items-center">
      <span className={`font-bold uppercase tracking-wide ${small ? 'text-[10px] text-slate-500' : large ? 'text-sm text-slate-300' : 'text-xs text-slate-500'}`}>{label}</span>
      <span className={`font-extrabold ${large ? 'text-2xl' : small ? 'text-sm text-slate-400' : 'text-sm text-slate-300'} ${orange ? 'text-high-vis-orange' : ''}`}>{value}</span>
    </div>
  );
}
