/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [quotesPerWeek, setQuotesPerWeek] = useState(5);
  const [milesDriven, setMilesDriven] = useState(20);
  const [postcode, setPostcode] = useState('');
  const [showModal, setShowModal] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  // ROI Calculations
  const hourlyRate = 45;
  const timePerQuote = 1.5; // hours
  const fuelCostPerMile = 0.20;
  const annualAdminDebt = Math.round((quotesPerWeek * timePerQuote * hourlyRate + milesDriven * fuelCostPerMile) * 52);
  const jobFilterSavings = Math.round(annualAdminDebt * 0.85);

  const startScan = () => {
    setIsScanning(true);
    setScanComplete(false);
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-deep-slate text-slate-100 font-sans selection:bg-high-vis-orange selection:text-deep-slate">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-nav px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-high-vis-orange rounded-sm flex items-center justify-center font-display text-2xl font-black text-deep-slate italic">JF</div>
            <span className="font-display text-2xl font-black uppercase tracking-tighter italic">JobFilter</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-slate-400">
            <a href="#intake" className="hover:text-electric-cyan transition-colors">THE INTAKE</a>
            <a href="#roi" className="hover:text-electric-cyan transition-colors">ROI Calculator</a>
            <a href="#pricing" className="hover:text-electric-cyan transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-electric-cyan rounded-full animate-pulse shadow-[0_0_8px_#22d3ee]"></span>
            <span className="text-[10px] font-black uppercase tracking-widest text-electric-cyan">System Online</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-40 pb-32 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-7xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.8] uppercase italic"
          >
            UK Trade Leads, <br /> <span className="text-high-vis-orange">Filtered Fast.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-3xl text-slate-400 max-w-3xl mx-auto mb-12 leading-tight font-medium"
          >
            JobFilter is a postcode-first intake for tradesmen. See real local jobs, filter out low-quality work, and use your 3 free full records each month before you upgrade.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center gap-6"
          >
            <a href="#intake" className="inline-flex bg-high-vis-orange hover:bg-amber-600 text-deep-slate text-2xl font-black py-6 px-12 rounded-sm shadow-2xl glow-orange transition-all transform hover:scale-105 active:scale-95 uppercase italic">
              Enter Your Postcode
            </a>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest italic">
              Free includes tools + scanning + 3 full records per month. Scout Pro is the default for full access.
            </p>
          </motion.div>
        </div>

        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-amber-500 rounded-full blur-[180px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-500 rounded-full blur-[180px]"></div>
        </div>
      </header>

      {/* THE INTAKE */}
      <section id="intake" className="py-32 px-6 bg-charcoal/30 border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-6xl font-black uppercase italic mb-4">THE <span className="text-electric-cyan">INTAKE</span></h2>
            <p className="text-slate-400 font-bold uppercase tracking-widest">Postcode input → see leads → unlock 3 full records free.</p>
          </div>

          <div className="bg-deep-slate p-8 rounded-sm border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="grid md:grid-cols-[2fr_1fr] gap-4 mb-8 border-b border-white/5 pb-6">
              <div>
                <label htmlFor="postcode" className="text-xs font-black text-slate-500 uppercase tracking-widest block mb-2">Your Postcode</label>
                <input
                  id="postcode"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                  placeholder="e.g. B14 7QH"
                  className="w-full bg-slate-900/70 border border-white/10 rounded-sm px-4 py-4 text-xl font-bold uppercase tracking-wide text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-electric-cyan"
                />
              </div>
              <button
                onClick={startScan}
                disabled={isScanning || postcode.trim().length < 4}
                className="bg-high-vis-orange disabled:bg-slate-700 disabled:text-slate-500 hover:bg-amber-600 text-deep-slate font-black py-4 px-6 rounded-sm uppercase italic tracking-widest transition-all"
              >
                {isScanning ? 'Scanning...' : 'See Local Jobs'}
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-3 mb-8 text-xs font-bold uppercase tracking-widest">
              <div className="bg-slate-900/70 border border-white/10 p-3 rounded-sm text-slate-300">Step 1: Enter Postcode</div>
              <div className="bg-slate-900/70 border border-white/10 p-3 rounded-sm text-slate-300">Step 2: Scan Leads</div>
              <div className="bg-slate-900/70 border border-white/10 p-3 rounded-sm text-slate-300">Step 3: Unlock 3 Full Records Free</div>
            </div>

            <div className="flex items-center gap-4 mb-8 border-b border-white/5 pb-4">
              <div>
                <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Upgrade Trigger</p>
                <p className="font-bold text-slate-300">Used your 3 free records? Move to <span className="text-high-vis-orange">Scout Pro</span> for unlimited access and alerts.</p>
              </div>
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
                    <div className="mt-8 pt-6 border-t border-white/5 text-center">
                      <p className="font-display text-2xl font-black text-electric-cyan uppercase italic">2 filtered, 1 worth opening.</p>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-2">Free account: 2 of 3 full record views remaining.</p>
                    </div>
                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full py-10">
                    <button
                      onClick={startScan}
                      disabled={isScanning}
                      className="bg-slate-800 hover:bg-slate-700 text-electric-cyan font-black py-4 px-8 rounded-sm border border-electric-cyan/30 uppercase italic tracking-widest transition-all glow-cyan"
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
            <h2 className="font-display text-4xl md:text-6xl font-black uppercase italic mb-4">The Diesel <span className="text-high-vis-orange">Burn</span> Calculator</h2>
            <p className="text-slate-400 font-bold uppercase tracking-widest italic">This is what free quoting is actually costing your business.</p>
          </div>

          <div className="bg-charcoal p-10 rounded-sm border border-white/5 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-10">
                <div>
                  <div className="flex justify-between mb-4">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 italic">Unpaid quotes per week</label>
                    <span className="text-high-vis-orange font-black">{quotesPerWeek}</span>
                  </div>
                  <input 
                    type="range" min="1" max="20" value={quotesPerWeek} 
                    onChange={(e) => setQuotesPerWeek(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-high-vis-orange"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-4">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 italic">Miles driven for nothing</label>
                    <span className="text-high-vis-orange font-black">{milesDriven}</span>
                  </div>
                  <input 
                    type="range" min="5" max="200" step="5" value={milesDriven} 
                    onChange={(e) => setMilesDriven(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-high-vis-orange"
                  />
                </div>
              </div>

              <div className="bg-deep-slate p-8 rounded-sm border border-white/5 flex flex-col justify-center text-center">
                <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Annual Admin Debt</p>
                <p className="text-5xl font-display font-black text-red-500 mb-8 italic">£{annualAdminDebt.toLocaleString()}</p>
                
                <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">JobFilter Savings</p>
                <p className="text-6xl font-display font-black text-green-500 italic shadow-[0_0_20px_rgba(34,197,94,0.2)]">£{jobFilterSavings.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reality Split (Chaos vs. Control) */}
      <section className="py-32 px-6 bg-charcoal/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <h3 className="font-display text-4xl font-black uppercase italic text-red-500/80">The Chaos</h3>
              <div className="bg-slate-900/50 p-6 rounded-sm border border-red-500/20 opacity-60">
                <div className="space-y-4">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="bg-slate-800 p-3 rounded-sm text-xs text-slate-500 italic">
                      "Alright mate, can you just pop round to B14 and look at my tap? Should be 2 mins."
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest italic">5 tyre-kickers asking for free advice.</p>
            </div>

            <div className="space-y-8">
              <h3 className="font-display text-4xl font-black uppercase italic text-green-500/80">The Control</h3>
              <div className="bg-deep-slate p-6 rounded-sm border border-high-vis-orange glow-orange">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-high-vis-orange rounded-full flex items-center justify-center text-deep-slate font-black">!</div>
                  <p className="font-display text-xl font-black uppercase italic">Qualified Lead: B14 Area</p>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="text-slate-300 flex items-center gap-2"><span className="text-green-500">✔</span> Leak confirmed via photo</p>
                  <p className="text-slate-300 flex items-center gap-2"><span className="text-green-500">✔</span> Budget £300 approved</p>
                  <p className="text-slate-300 flex items-center gap-2"><span className="text-green-500">✔</span> Postcode verified</p>
                </div>
              </div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest italic">One clean JobFilter notification.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Van-to-Sofa Reality (Timeline) */}
      <section id="reality" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-4xl md:text-6xl font-black text-center mb-20 uppercase italic">Van-to-Sofa <span className="text-high-vis-orange">Reality</span></h2>
          
          <div className="grid md:grid-cols-2 gap-20 relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 hidden md:block"></div>
            
            <div className="space-y-12">
              <h3 className="font-display text-3xl font-black uppercase italic text-red-500 text-center mb-10">Running on Fumes</h3>
              {[
                'Finish on site at 4:30 PM',
                'Sit in M6 traffic for 45 mins',
                'Drive to a house to look at a job with no budget',
                'Get home late at 7:30 PM',
                'Eat cold dinner while typing up a free quote'
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-6 group">
                  <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-xs font-black text-slate-500 shrink-0">{i+1}</div>
                  <p className="text-slate-400 font-medium">{step}</p>
                </div>
              ))}
            </div>

            <div className="space-y-12">
              <h3 className="font-display text-3xl font-black uppercase italic text-green-500 text-center mb-10">The JobFilter Day</h3>
              {[
                'Finish on site at 4:30 PM',
                'JobFilter has secured a vetted job for tomorrow',
                'Drive straight home (Skip the M6 detour)',
                'Tools down and on the sofa by 5:15 PM',
                'Enjoy your evening. The AI handles the rest.'
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-6 group">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center text-xs font-black text-green-500 shrink-0">{i+1}</div>
                  <p className="text-slate-200 font-bold italic">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-32 px-6 bg-charcoal/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-4xl md:text-6xl font-black text-center mb-6 uppercase italic">Choose Your <span className="text-high-vis-orange">Scout Plan</span></h2>
          <p className="text-center text-slate-400 font-bold uppercase tracking-widest mb-16">Start free. Upgrade when your 3 monthly full record views are used.</p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-900/50 border border-white/10 p-6 rounded-sm">
              <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Free</p>
              <p className="text-4xl font-display font-black mt-2">£0</p>
              <ul className="mt-6 space-y-2 text-slate-300 text-sm">
                <li>• Tools access</li>
                <li>• Lead scanning</li>
                <li>• 3 full record views / month</li>
              </ul>
            </div>

            <div className="bg-amber-500/5 border-2 border-high-vis-orange p-6 rounded-sm shadow-2xl">
              <p className="text-high-vis-orange font-black uppercase tracking-widest text-xs">Scout Pro (Default)</p>
              <p className="text-4xl font-display font-black mt-2">~£39</p>
              <ul className="mt-6 space-y-2 text-slate-100 text-sm font-bold">
                <li>• Unlimited access</li>
                <li>• Job alerts</li>
                <li>• Full lead visibility</li>
                <li>• Smart Quoting</li>
                <li>• Payment Chaser</li>
                <li>• Review Harvester</li>
              </ul>
              <a href="https://wa.me/1234567890?text=Upgrade%20me%20to%20Scout%20Pro" className="mt-6 inline-flex bg-high-vis-orange hover:bg-amber-600 text-deep-slate text-sm font-black py-3 px-4 rounded-sm uppercase tracking-widest">Upgrade to Scout Pro</a>
            </div>

            <div className="bg-slate-900/50 border border-white/10 p-6 rounded-sm">
              <p className="text-slate-400 font-black uppercase tracking-widest text-xs">More Plans</p>
              <p className="text-2xl font-display font-black mt-2">Scout Basic ~£19</p>
              <p className="text-2xl font-display font-black mt-2">Scout Max ~£59</p>
              <p className="text-2xl font-display font-black mt-2">Hammer ~£99</p>
              <p className="mt-4 text-sm text-slate-300">Hammer includes everything in Scout, plus stronger homeowner-facing professional positioning.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Conversion Block */}
      <section className="py-40 px-6 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="font-display text-6xl md:text-8xl font-black uppercase italic mb-8 leading-tight">Ready to Get Your <br /> <span className="text-high-vis-orange">Evenings Back?</span></h2>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <a href="https://wa.me/1234567890?text=Hi%20JobFilter" className="inline-flex bg-high-vis-orange hover:bg-amber-600 text-deep-slate text-4xl font-black py-8 px-16 rounded-sm shadow-2xl glow-orange transition-all uppercase italic">
              Connect My WhatsApp
            </a>
          </motion.div>
          <div className="mt-12 max-w-lg mx-auto">
            <p className="text-slate-500 font-bold italic leading-relaxed">
              "Built by a fellow tradesman who got sick of pricing jobs at 9 PM. We know the graft, we just want the results."
            </p>
          </div>
        </div>
        
        {/* Background Glow */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-amber-500 rounded-full blur-[200px]"></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5 bg-slate-900/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
              <div className="w-8 h-8 bg-high-vis-orange rounded-sm flex items-center justify-center font-display text-xl font-black text-deep-slate italic">JF</div>
              <span className="font-display text-xl font-black uppercase tracking-tighter italic">JobFilter</span>
            </div>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] italic">Built to protect your time, your fuel, and your profit.</p>
          </div>
          <div className="flex gap-10 text-slate-400 font-black uppercase tracking-widest text-[10px] italic">
            <button onClick={() => setShowModal('privacy')} className="hover:text-high-vis-orange transition-colors">Privacy</button>
            <button onClick={() => setShowModal('terms')} className="hover:text-high-vis-orange transition-colors">Terms</button>
            <button onClick={() => setShowModal('cookies')} className="hover:text-high-vis-orange transition-colors">Cookies</button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(null)}
              className="absolute inset-0 bg-deep-slate/90 backdrop-blur-sm"
            ></motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-charcoal border border-white/10 p-10 max-w-2xl w-full rounded-sm shadow-2xl"
            >
              <button onClick={() => setShowModal(null)} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
              <h4 className="font-display text-3xl font-black uppercase italic mb-6 text-high-vis-orange">
                {showModal === 'privacy' && 'Privacy Policy'}
                {showModal === 'terms' && 'Terms of Service'}
                {showModal === 'cookies' && 'Cookie Notice'}
              </h4>
              <div className="text-slate-400 leading-relaxed font-medium">
                {showModal === 'privacy' && 'We don’t sell your data. We don’t auction your jobs. JobFilter processes WhatsApp messages, images, and postcodes strictly to qualify and filter job requests on your behalf. This may involve automated AI analysis to assess job quality, location relevance, and intent. Your data is used only to improve your workflow and is never shared with third-party lead marketplaces. You stay in control. Always.'}
                {showModal === 'terms' && 'JobFilter is a filtering tool — not a marketplace. We help qualify incoming job requests using automated systems, but we don’t guarantee job accuracy, customer intent, or final outcomes. All decisions, pricing, and agreements remain your responsibility. Use it as your gatekeeper — not your replacement.'}
                {showModal === 'cookies' && 'We use minimal cookies to understand what’s working and what’s not — nothing invasive, nothing sold. Just enough to make JobFilter better.'}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
