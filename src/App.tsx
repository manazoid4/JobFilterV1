/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type AnalyticsEventName =
  | 'hero_cta_click'
  | 'filter_scan_start'
  | 'filter_scan_complete'
  | 'pricing_plan_click'
  | 'upgrade_cta_click'
  | 'nav_cta_click';

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export default function App() {
  const [quotesPerWeek, setQuotesPerWeek] = useState(5);
  const [milesDriven, setMilesDriven] = useState(20);
  const [postcode, setPostcode] = useState('');
  const [tradeType, setTradeType] = useState('general');
  const [showModal, setShowModal] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  const trackEvent = (eventName: AnalyticsEventName, params: Record<string, unknown> = {}) => {
    const eventPayload = {
      event: eventName,
      ...params,
      timestamp: new Date().toISOString(),
    };
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(eventPayload);
    }
    console.log('[analytics]', eventPayload);
  };

  // ROI Calculations
  const hourlyRate = 45;
  const timePerQuote = 1.5; // hours
  const fuelCostPerMile = 0.20;
  const annualAdminDebt = Math.round((quotesPerWeek * timePerQuote * hourlyRate + milesDriven * fuelCostPerMile) * 52);
  const jobFilterSavings = Math.round(annualAdminDebt * 0.85);
  const postcodeStrength = postcode.replace(/\s/g, '').length;
  const tradeBoost = tradeType === 'electrical' || tradeType === 'plumbing' ? 6 : 3;
  const leadQualityScore = Math.max(42, Math.min(94, 55 + postcodeStrength * 4 + tradeBoost));

  const startScan = () => {
    setIsScanning(true);
    setScanComplete(false);
    trackEvent('filter_scan_start', {
      source: 'filter',
      postcode_present: postcode.trim().length >= 4,
    });
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
      trackEvent('filter_scan_complete', {
        source: 'filter',
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-deep-slate text-slate-100 font-sans selection:bg-high-vis-orange selection:text-deep-slate">
      {/* Navigation */}
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
                <a href="#filter" className="hover:text-electric-cyan transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                  FILTER LEADS
                </a>
                <a href="#roi" className="hover:text-electric-cyan transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                  ADMIN DEBT CALCULATOR
                </a>
                <a href="#pricing" className="hover:text-electric-cyan transition-colors flex items-center gap-2">
                  <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                  PRICING
                </a>
              </div>
              <div className="h-4 w-px bg-white/10"></div>
              <div className="flex items-center gap-4">
                <a 
                  href="/login" 
                  className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
                >
                  Log In
                </a>
                <a 
                  href="#filter" 
                  onClick={() => trackEvent('nav_cta_click')}
                  className="bg-electric-cyan text-deep-slate text-[10px] font-extrabold px-4 py-2 rounded-sm uppercase tracking-widest hover:bg-white transition-all glow-cyan"
                >
                  Get Started
                </a>
              </div>
            </div>

            {/* Status & Mobile Toggle */}
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-end hidden sm:flex">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></span>
                  <span className="text-[9px] font-extrabold uppercase tracking-tighter text-green-500">SYSTEM ONLINE</span>
                </div>
              </div>
              
              {/* Simple Mobile Icon Placeholder */}
              <button className="lg:hidden text-slate-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"/></svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-40 pb-32 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-7xl md:text-9xl font-extrabold tracking-tighter mb-8 leading-[0.8] uppercase italic"
          >
            Control The Chaos. <br /> <span className="text-high-vis-orange">Run The Gauge.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-3xl text-slate-400 max-w-3xl mx-auto mb-12 leading-tight font-medium"
          >
            JobFilter gives you zero-friction filter control: postcode in, weak leads out, and only quote-ready jobs left. Run free with 3 full records each month, then keep momentum with Scout Pro.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center gap-6"
          >
            <a
              href="#filter"
              onClick={() => trackEvent('hero_cta_click', { source: 'hero' })}
              className="inline-flex bg-high-vis-orange hover:bg-amber-600 text-deep-slate text-2xl font-extrabold py-6 px-12 rounded-sm shadow-2xl glow-orange transition-all transform hover:scale-105 active:scale-95 uppercase italic"
            >
              Start The Filter
            </a>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest italic">
              Zero-friction via postcode, WhatsApp, or voice. Free includes 3 full records/month. Scout Pro is the default for active quoting.
            </p>
          </motion.div>
        </div>

        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-amber-500 rounded-full blur-[180px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-500 rounded-full blur-[180px]"></div>
        </div>
      </header>

      {/* THE FILTER */}
      <section id="filter" className="py-32 px-6 bg-charcoal/30 border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-6xl font-extrabold uppercase italic mb-4">THE <span className="text-electric-cyan">FILTER</span></h2>
            <p className="text-slate-400 font-bold uppercase tracking-widest">Postcode in. Local leads out. Filter first, then open full records.</p>
          </div>

          <div className="bg-deep-slate p-8 rounded-sm border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="grid md:grid-cols-[1.5fr_2fr_1fr] gap-4 mb-8 border-b border-white/5 pb-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="tradeType" className="text-xs font-extrabold text-slate-500 uppercase tracking-widest block mb-2">Trade Profile</label>
                  <select
                    id="tradeType"
                    value={tradeType}
                    onChange={(e) => setTradeType(e.target.value)}
                    className="w-full bg-slate-900/70 border border-white/10 rounded-sm px-4 py-3 text-sm font-bold uppercase tracking-wide text-slate-100 focus:outline-none focus:border-electric-cyan"
                  >
                    <option value="general">General Trade</option>
                    <option value="electrical">Electrical</option>
                    <option value="plumbing">Plumbing</option>
                    <option value="heating">Heating</option>
                    <option value="building">Building</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="postcode" className="text-xs font-extrabold text-slate-500 uppercase tracking-widest block mb-2">Your Postcode</label>
                <input
                  id="postcode"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                  placeholder="e.g. B14 7QH"
                  className="w-full bg-slate-900/70 border border-white/10 rounded-sm px-4 py-4 text-xl font-bold uppercase tracking-wide text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-electric-cyan"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={startScan}
                  disabled={isScanning || postcode.trim().length < 4}
                  className="w-full bg-high-vis-orange disabled:bg-slate-700 disabled:text-slate-500 hover:bg-amber-600 text-deep-slate font-extrabold py-4 px-6 rounded-sm uppercase italic tracking-widest transition-all h-[60px]"
                >
                  {isScanning ? 'Scanning...' : 'See Local Jobs'}
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-3 mb-8 text-xs font-bold uppercase tracking-widest">
              <div className="bg-slate-900/70 border border-white/10 p-3 rounded-sm text-slate-300 text-center">Step 1: Enter your postcode</div>
              <div className="bg-slate-900/70 border border-white/10 p-3 rounded-sm text-slate-300 text-center">Step 2: Scan and filter local leads</div>
              <div className="bg-slate-900/70 border border-white/10 p-3 rounded-sm text-slate-300 text-center">Step 3: Open 3 full records free</div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 border-b border-white/5 pb-4">
              <div>
                <p className="text-xs font-extrabold text-slate-500 uppercase tracking-widest">Upgrade Trigger</p>
                <p className="font-bold text-slate-300">You've used your 3 free full records. Upgrade to <span className="text-high-vis-orange">Scout Pro</span> to keep opening leads without limits.</p>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mt-2">No workflow change — same filter, full access.</p>
              </div>
              <a
                href="#pricing"
                onClick={() => trackEvent('upgrade_cta_click', { source: 'filter' })}
                className="inline-flex items-center justify-center bg-high-vis-orange hover:bg-amber-600 text-deep-slate text-xs font-extrabold py-3 px-5 rounded-sm uppercase tracking-widest"
              >
                Continue with Scout Pro
              </a>
            </div>

            <div className="relative min-h-[200px] bg-slate-900/50 p-6 rounded-sm border border-white/5">
              {isScanning && (
                <div className="absolute inset-0 z-10">
                  <div className="w-full h-1 bg-electric-cyan shadow-[0_0_15px_#22d3ee] absolute animate-scan"></div>
                </div>
              )}

              <div className="space-y-4">
                {scanComplete ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <div className="flex items-center gap-3 text-red-500 font-bold uppercase italic text-sm">
                      <span className="text-xl">🚩</span> Low-quality job filtered out
                    </div>
                    <div className="flex items-center gap-3 text-red-500 font-bold uppercase italic text-sm">
                      <span className="text-xl">🚩</span> Out-of-area postcode removed
                    </div>
                    <div className="flex items-center gap-3 text-green-500 font-bold uppercase italic text-sm">
                      <span className="text-xl">✔</span> Good local lead ready to open
                    </div>
                    <div className="bg-slate-800/80 border border-electric-cyan/30 p-4 rounded-sm">
                      <p className="text-xs text-slate-400 font-extrabold uppercase tracking-widest">Lead Quality Score</p>
                      <p className="text-3xl font-display font-extrabold text-electric-cyan mt-1">{leadQualityScore}/100</p>
                      <ul className="mt-3 space-y-1 text-xs text-slate-300 font-bold uppercase tracking-wide">
                        <li>• Distance fits your current service radius</li>
                        <li>• Scope aligns with {tradeType} profile</li>
                        <li>• Job detail quality is high enough to quote</li>
                      </ul>
                    </div>
                    <div className="mt-8 pt-6 border-t border-white/5 text-center">
                      <p className="font-display text-2xl font-extrabold text-electric-cyan uppercase italic mb-2">2 filtered, 1 worth opening.</p>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-2">Free account: 2 of 3 full record views remaining.</p>
                      
                      <div className="my-8 p-6 bg-amber-500/10 border border-amber-500/30 rounded-sm">
                        <p className="text-high-vis-orange font-extrabold uppercase italic text-sm mb-2">Upgrade Trigger</p>
                        <p className="font-bold text-slate-300 mb-4">You've used your 3 free full records. Upgrade to Scout Pro to keep opening leads without limits.</p>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-6">No workflow change — same filter, full access.</p>
                        <a 
                          href="#pricing"
                          onClick={() => trackEvent('upgrade_cta_click', { source: 'filter' })}
                          className="inline-block bg-high-vis-orange hover:bg-amber-600 text-deep-slate font-extrabold py-3 px-8 rounded-sm uppercase italic tracking-widest text-sm"
                        >
                          Unlock Unlimited Access
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full py-10">
                    <button
                      onClick={startScan}
                      disabled={isScanning}
                      className="bg-slate-800 hover:bg-slate-700 text-electric-cyan font-extrabold py-4 px-8 rounded-sm border border-electric-cyan/30 uppercase italic tracking-widest transition-all glow-cyan"
                    >
                      {isScanning ? 'Scanning Leads...' : 'Run Intake Scan'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI 'Diesel Burn' Calculator */}
      <section id="roi" className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-6xl font-extrabold uppercase italic mb-4">The Diesel <span className="text-high-vis-orange">Burn</span> Calculator</h2>
            <p className="text-slate-400 font-bold uppercase tracking-widest italic">This is what free quoting is actually costing your business.</p>
          </div>

          <div className="bg-charcoal p-10 rounded-sm border border-white/5 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-10">
                <div>
                  <div className="flex justify-between mb-4">
                    <label className="text-xs font-extrabold uppercase tracking-widest text-slate-400 italic">Unpaid quotes per week</label>
                    <span className="text-high-vis-orange font-extrabold">{quotesPerWeek}</span>
                  </div>
                  <input 
                    type="range" min="1" max="20" value={quotesPerWeek} 
                    onChange={(e) => setQuotesPerWeek(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-high-vis-orange"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-4">
                    <label className="text-xs font-extrabold uppercase tracking-widest text-slate-400 italic">Miles driven for nothing</label>
                    <span className="text-high-vis-orange font-extrabold">{milesDriven}</span>
                  </div>
                  <input 
                    type="range" min="5" max="200" step="5" value={milesDriven} 
                    onChange={(e) => setMilesDriven(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-high-vis-orange"
                  />
                </div>
              </div>

              <div className="bg-deep-slate p-8 rounded-sm border border-white/5 flex flex-col justify-center text-center">
                <p className="text-xs font-extrabold uppercase tracking-widest text-slate-500 mb-2">Annual Admin Debt</p>
                <p className="text-5xl font-display font-extrabold text-red-500 mb-8 italic">£{annualAdminDebt.toLocaleString()}</p>
                
                <p className="text-xs font-extrabold uppercase tracking-widest text-slate-500 mb-2">JobFilter Savings</p>
                <p className="text-6xl font-display font-extrabold text-green-500 italic shadow-[0_0_20px_rgba(34,197,94,0.2)]">£{jobFilterSavings.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-32 px-6 bg-charcoal/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-4xl md:text-6xl font-extrabold text-center mb-6 uppercase italic">Simple <span className="text-high-vis-orange">Pricing</span></h2>
          <p className="text-center text-slate-400 font-bold uppercase tracking-widest mb-16 italic text-sm">One job win pays for the sub. Keep your pipeline full.</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Free */}
            <div className="bg-slate-900/50 border border-white/10 p-6 rounded-sm flex flex-col">
              <p className="text-slate-400 font-extrabold uppercase tracking-widest text-xs">Starter</p>
              <p className="text-4xl font-display font-extrabold mt-2">£0</p>
              <p className="mt-4 text-[10px] font-extrabold text-slate-500 uppercase italic tracking-widest leading-tight">Best for trying filter and opening up to 3 full records/month.</p>
              <ul className="mt-6 space-y-2 text-slate-300 text-sm font-bold flex-1">
                <li>• Tools access</li>
                <li>• Lead scanning</li>
                <li>• 3 full record views / month</li>
              </ul>
              <a 
                href="#filter" 
                onClick={() => trackEvent('pricing_plan_click', { plan: 'starter' })}
                className="mt-8 block text-center bg-slate-800 hover:bg-slate-700 text-white text-[10px] font-extrabold py-4 rounded-sm uppercase italic tracking-widest transition-colors"
              >
                Get Started
              </a>
            </div>

            {/* Basic */}
            <div className="bg-slate-900/50 border border-white/10 p-6 rounded-sm flex flex-col">
              <p className="text-slate-400 font-extrabold uppercase tracking-widest text-xs">Scout Basic</p>
              <p className="text-4xl font-display font-extrabold mt-2">£19</p>
              <p className="mt-4 text-[10px] font-extrabold text-slate-500 uppercase italic tracking-widest leading-tight">For occasional unlocks if your lead volume is low.</p>
              <ul className="mt-6 space-y-2 text-slate-300 text-sm font-bold flex-1">
                <li>• 10 full record views / month</li>
                <li>• Lead scanning</li>
              </ul>
              <a 
                href="https://wa.me/1234567890?text=I%20want%20Scout%20Basic" 
                onClick={() => trackEvent('pricing_plan_click', { plan: 'basic' })}
                className="mt-8 block text-center bg-slate-800 hover:bg-slate-700 text-white text-[10px] font-extrabold py-4 rounded-sm uppercase italic tracking-widest transition-colors"
              >
                Select Basic
              </a>
            </div>

            {/* Pro - Popular */}
            <div className="bg-amber-500/5 border-2 border-high-vis-orange p-6 rounded-sm shadow-2xl flex flex-col relative scale-105">
              <div className="absolute -top-3 left-4 bg-high-vis-orange text-deep-slate px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-widest">Recommended</div>
              <p className="text-high-vis-orange font-extrabold uppercase tracking-widest text-xs">Scout Pro</p>
              <p className="text-4xl font-display font-extrabold mt-2">£39</p>
              <p className="mt-4 text-[10px] font-extrabold text-high-vis-orange uppercase italic tracking-widest leading-tight">Default for active tradespeople who need full lead visibility and ongoing alerts.</p>
              <ul className="mt-6 space-y-2 text-slate-100 text-sm font-bold flex-1">
                <li>• Unlimited access</li>
                <li>• WhatsApp job alerts</li>
                <li>• Smart Quoting</li>
                <li>• Payment Chaser</li>
                <li>• Review Harvester</li>
              </ul>
              <button 
                onClick={() => {
                  trackEvent('pricing_plan_click', { plan: 'pro' });
                  trackEvent('upgrade_cta_click', { source: 'pricing_pro' });
                }}
                className="mt-8 block text-center bg-high-vis-orange hover:bg-amber-600 text-deep-slate text-[10px] font-extrabold py-4 rounded-sm uppercase italic tracking-widest transition-all"
              >
                Continue with Pro
              </button>
            </div>

            {/* Max */}
            <div className="bg-slate-900/50 border border-white/10 p-6 rounded-sm flex flex-col">
              <p className="text-slate-400 font-extrabold uppercase tracking-widest text-xs">Scout Max</p>
              <p className="text-4xl font-display font-extrabold mt-2">£59</p>
              <p className="mt-4 text-[10px] font-extrabold text-slate-500 uppercase italic tracking-widest leading-tight">For teams that need Pro plus priority access.</p>
              <ul className="mt-6 space-y-2 text-slate-300 text-sm font-bold flex-1">
                <li>• Everything in Pro</li>
                <li>• Priority access to newest leads</li>
              </ul>
              <a 
                href="https://wa.me/1234567890?text=I%20want%20Scout%20Max" 
                onClick={() => trackEvent('pricing_plan_click', { plan: 'max' })}
                className="mt-8 block text-center bg-slate-800 hover:bg-slate-700 text-white text-[10px] font-extrabold py-4 rounded-sm uppercase italic tracking-widest transition-colors"
              >
                Choose Max
              </a>
            </div>
          </div>

          {/* Hammer */}
          <div className="mt-8 bg-charcoal border border-white/10 p-10 rounded-sm flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="max-w-2xl">
              <h3 className="text-3xl font-display font-extrabold uppercase mb-2">Hammer Tier</h3>
              <p className="font-body font-bold text-slate-200 mb-2">The Concierge Outreach Engine (£99/mo).</p>
              <p className="text-sm font-body text-slate-400">Optional concierge outreach add-on for operators who want done-for-you physical outreach.</p>
            </div>
            <a
              href="https://wa.me/1234567890?text=I%20want%20to%20upgrade%20to%20Hammer"
              onClick={() => {
                trackEvent('pricing_plan_click', { plan: 'hammer' });
                trackEvent('upgrade_cta_click', { source: 'pricing', plan: 'hammer' });
              }}
              className="bg-high-vis-orange hover:bg-amber-600 text-deep-slate text-sm font-extrabold py-4 px-8 rounded-sm uppercase tracking-widest"
            >
              Activate Concierge
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5 bg-slate-900/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
              <div className="w-8 h-8 bg-high-vis-orange rounded-sm flex items-center justify-center font-display text-xl font-extrabold text-deep-slate italic">JF</div>
              <span className="font-display text-xl font-extrabold uppercase tracking-tighter italic">JobFilter</span>
            </div>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] italic">Built to protect your time, your fuel, and your profit.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
