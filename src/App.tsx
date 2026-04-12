/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [quotesPerWeek, setQuotesPerWeek] = useState(5);
  const [milesDriven, setMilesDriven] = useState(20);
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
            <a href="#demo" className="hover:text-electric-cyan transition-colors">The X-Ray</a>
            <a href="#roi" className="hover:text-electric-cyan transition-colors">ROI Calculator</a>
            <a href="#reality" className="hover:text-electric-cyan transition-colors">The Timeline</a>
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
            Stop Quoting <br /> <span className="text-high-vis-orange">For Free.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-3xl text-slate-400 max-w-3xl mx-auto mb-12 leading-tight font-medium"
          >
            You don’t need more leads. You need better ones. JobFilter is the AI shield for your WhatsApp that forces customers to send photos and postcodes before your phone even rings.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center gap-6"
          >
            <a href="https://wa.me/1234567890?text=Hi%20JobFilter" className="inline-flex bg-high-vis-orange hover:bg-amber-600 text-deep-slate text-2xl font-black py-6 px-12 rounded-sm shadow-2xl glow-orange transition-all transform hover:scale-105 active:scale-95 uppercase italic">
              Connect My WhatsApp
            </a>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest italic">
              No shared leads. No subscription traps. No fighting five blokes for the same job.
            </p>
          </motion.div>
        </div>

        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-amber-500 rounded-full blur-[180px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-500 rounded-full blur-[180px]"></div>
        </div>
      </header>

      {/* The Tyre-Kicker X-Ray (Interactive Demo) */}
      <section id="demo" className="py-32 px-6 bg-charcoal/30 border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-6xl font-black uppercase italic mb-4">The Tyre-Kicker <span className="text-electric-cyan">X-Ray</span></h2>
            <p className="text-slate-400 font-bold uppercase tracking-widest">AI Foreman detecting bad leads in real-time.</p>
          </div>

          <div className="bg-deep-slate p-8 rounded-sm border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="flex items-center gap-4 mb-8 border-b border-white/5 pb-4">
              <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-slate-500">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08s5.97 1.09 6 3.08c-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
              </div>
              <div>
                <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Incoming Message</p>
                <p className="font-bold text-slate-300">"Alright mate, how much to just pop round and look at my boiler? Should be a 5-minute job."</p>
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
                      <span className="text-xl">🚩</span> Danger: Fishing for cheapest price
                    </div>
                    <div className="flex items-center gap-3 text-red-500 font-bold uppercase italic text-sm">
                      <span className="text-xl">🚩</span> Danger: Refusing to send a photo
                    </div>
                    <div className="flex items-center gap-3 text-red-500 font-bold uppercase italic text-sm">
                      <span className="text-xl">🚩</span> Danger: 'Just a 5-minute job' guy
                    </div>
                    <div className="mt-8 pt-6 border-t border-white/5 text-center">
                      <p className="font-display text-2xl font-black text-electric-cyan uppercase italic">Lead Binned.</p>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-2">You didn't even have to look at your phone.</p>
                    </div>
                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full py-10">
                    <button 
                      onClick={startScan}
                      disabled={isScanning}
                      className="bg-slate-800 hover:bg-slate-700 text-electric-cyan font-black py-4 px-8 rounded-sm border border-electric-cyan/30 uppercase italic tracking-widest transition-all glow-cyan"
                    >
                      {isScanning ? 'Analyzing Intent...' : 'Run AI Analysis'}
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

      {/* The Directory Trap (Comparison Table) */}
      <section className="py-32 px-6 bg-charcoal/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display text-4xl md:text-6xl font-black text-center mb-20 uppercase italic">The Directory <span className="text-red-500">Trap</span></h2>
          
          <div className="overflow-hidden rounded-sm border border-white/10 shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/50">
                  <th className="p-8 text-slate-500 font-black uppercase tracking-widest text-xs">The Difference</th>
                  <th className="p-8 text-slate-400 font-display text-2xl font-black uppercase italic">Directories</th>
                  <th className="p-8 text-high-vis-orange font-display text-3xl font-black uppercase italic bg-amber-500/5 border-x-2 border-high-vis-orange">JobFilter</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { label: 'Competition', dir: 'Fighting 5 guys for scraps', jf: '100% Exclusive' },
                  { label: 'Ownership', dir: 'Renting your profile', jf: 'Owning your customer list' },
                  { label: 'Lead Quality', dir: 'Pay for every tyre-kicker', jf: 'Only see vetted jobs' },
                  { label: 'Admin Work', dir: 'Manual chasing', jf: 'AI Gatekeeper' }
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors">
                    <td className="p-8 font-bold text-slate-400 uppercase italic text-sm">{row.label}</td>
                    <td className="p-8 text-slate-500 font-medium">{row.dir}</td>
                    <td className="p-8 font-black text-white bg-amber-500/5 border-x-2 border-high-vis-orange uppercase italic">
                      <div className="flex items-center gap-3">
                        <span className="text-high-vis-orange">✔</span> {row.jf}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
