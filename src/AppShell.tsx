import { useState } from 'react';

// ── Mock data ──────────────────────────────────────────────────────────────────
const JOBS = [
  { id: 1, title: 'Boiler Replacement', location: 'Birmingham B14', budget: '£800–£1,200', trade: 'Heating' },
  { id: 2, title: 'Full House Rewire', location: 'Solihull B91', budget: '£2,000–£3,500', trade: 'Electrical' },
  { id: 3, title: 'Bathroom Installation', location: 'Coventry CV1', budget: '£1,500–£2,500', trade: 'Plumbing' },
  { id: 4, title: 'Flat Roof Repair', location: 'Wolverhampton WV1', budget: '£400–£900', trade: 'Roofing' },
  { id: 5, title: 'Kitchen Plumbing', location: 'Dudley DY1', budget: '£200–£450', trade: 'Plumbing' },
  { id: 6, title: 'Consumer Unit Upgrade', location: 'Walsall WS1', budget: '£600–£900', trade: 'Electrical' },
];

type Tab = 'jobs' | 'boost' | 'quote';

export default function AppShell() {
  const [tab, setTab] = useState<Tab>('jobs');
  const [usesLeft, setUsesLeft] = useState(3);
  const [showUpgrade, setShowUpgrade] = useState(false);

  function useFeature(): boolean {
    if (usesLeft <= 0) { setShowUpgrade(true); return false; }
    setUsesLeft(u => u - 1);
    return true;
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col max-w-lg mx-auto relative">
      {/* Header */}
      <header className="bg-white border-b-4 border-[#f5d000] px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 32 32" className="w-8 h-8 border-2 border-[#0f1933] shrink-0">
            <rect width="32" height="32" fill="#012169"/>
            <path d="M0 0 L32 32 M32 0 L0 32" stroke="#fff" strokeWidth="4"/>
            <path d="M0 0 L32 32 M32 0 L0 32" stroke="#C8102E" strokeWidth="2.5"/>
            <path d="M16 0 V32 M0 16 H32" stroke="#fff" strokeWidth="6"/>
            <path d="M16 0 V32 M0 16 H32" stroke="#C8102E" strokeWidth="4"/>
          </svg>
          <span className="font-black text-lg uppercase tracking-tight italic text-[#0f1933]">JOBFILTER</span>
        </div>
        <button
          onClick={() => setShowUpgrade(true)}
          className="text-xs font-black uppercase tracking-widest bg-[#f5d000] border-2 border-[#0f1933] px-3 py-1 shadow-[2px_2px_0_#0f1933]"
        >
          {usesLeft > 0 ? `${usesLeft} free left` : 'Upgrade'}
        </button>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        {tab === 'jobs' && <JobFeed useFeature={useFeature} />}
        {tab === 'boost' && <BoostMyJob useFeature={useFeature} />}
        {tab === 'quote' && <WriteMyQuote useFeature={useFeature} />}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg bg-white border-t-4 border-[#0f1933] flex z-10">
        {([
          { id: 'jobs', label: 'Jobs', icon: '🔍' },
          { id: 'boost', label: 'Boost', icon: '🚀' },
          { id: 'quote', label: 'Quote', icon: '✍️' },
        ] as { id: Tab; label: string; icon: string }[]).map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 py-3 flex flex-col items-center gap-0.5 font-black uppercase text-[10px] tracking-widest transition-colors ${
              tab === t.id ? 'bg-[#f5d000] text-[#0f1933]' : 'text-slate-500 hover:text-[#0f1933]'
            }`}
          >
            <span className="text-xl">{t.icon}</span>
            {t.label}
          </button>
        ))}
      </nav>

      {/* Upgrade Modal */}
      {showUpgrade && <UpgradeModal onClose={() => setShowUpgrade(false)} />}
    </div>
  );
}

// ── Job Feed ───────────────────────────────────────────────────────────────────
function JobFeed({ useFeature }: { useFeature: () => boolean }) {
  const [copied, setCopied] = useState<number | null>(null);

  function handleQuote(jobId: number, title: string, location: string) {
    if (!useFeature()) return;
    const text = `Hi, I'm interested in the ${title} job in ${location}. I'm available and can start quickly. Can we chat?`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(jobId);
      setTimeout(() => setCopied(null), 2000);
    });
  }

  return (
    <div className="p-4 space-y-3">
      <h2 className="font-black text-xl uppercase tracking-tight text-[#0f1933]">Jobs Near You</h2>
      <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Live leads — updated daily</p>
      {JOBS.map(job => (
        <div key={job.id} className="bg-white border-[3px] border-[#0f1933] shadow-[4px_4px_0_#0f1933] p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="font-black text-[#0f1933] uppercase tracking-tight">{job.title}</p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-0.5">{job.location}</p>
            </div>
            <span className="text-xs font-black bg-slate-100 border border-slate-300 px-2 py-0.5 text-slate-600">{job.trade}</span>
          </div>
          <p className="text-lg font-black text-[#0f1933] mb-3">{job.budget}</p>
          <div className="flex gap-2">
            <button className="flex-1 py-2 border-2 border-[#0f1933] font-black text-xs uppercase tracking-widest text-[#0f1933] hover:bg-slate-50 transition-colors">
              View
            </button>
            <button
              onClick={() => handleQuote(job.id, job.title, job.location)}
              className="flex-1 py-2 bg-[#f5d000] border-2 border-[#0f1933] font-black text-xs uppercase tracking-widest text-[#0f1933] shadow-[2px_2px_0_#0f1933] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all"
            >
              {copied === job.id ? '✓ Copied!' : 'Use Quote'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Boost My Job ──────────────────────────────────────────────────────────────
function BoostMyJob({ useFeature }: { useFeature: () => boolean }) {
  const [jobType, setJobType] = useState('');
  const [location, setLocation] = useState('');
  const [caption, setCaption] = useState('');
  const [review, setReview] = useState('');
  const [copied, setCopied] = useState(false);

  function generate() {
    if (!jobType.trim() || !location.trim()) return;
    if (!useFeature()) return;
    setCaption(`Just completed a ${jobType} in ${location} 🔥 Message me if interested`);
    setReview(`"Brilliant work on our ${jobType}. Fast, tidy, and great price. Highly recommend!" — Local customer, ${location}`);
  }

  function copyAll() {
    navigator.clipboard.writeText(`${caption}\n\n${review}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const waLink = `https://wa.me/?text=${encodeURIComponent(caption || `Just completed a ${jobType} in ${location} 🔥 Message me if interested`)}`;

  return (
    <div className="p-4 space-y-4">
      <h2 className="font-black text-xl uppercase tracking-tight text-[#0f1933]">Boost My Job</h2>
      <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Turn a completed job into more leads</p>

      <div className="space-y-3">
        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-1">Job Type</label>
          <input
            value={jobType}
            onChange={e => setJobType(e.target.value)}
            placeholder="e.g. Boiler replacement"
            className="w-full border-2 border-[#0f1933] px-3 py-2.5 text-sm font-bold text-[#0f1933] focus:outline-none focus:ring-2 focus:ring-[#f5d000]"
          />
        </div>
        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-1">Location</label>
          <input
            value={location}
            onChange={e => setLocation(e.target.value)}
            placeholder="e.g. Birmingham B14"
            className="w-full border-2 border-[#0f1933] px-3 py-2.5 text-sm font-bold text-[#0f1933] focus:outline-none focus:ring-2 focus:ring-[#f5d000]"
          />
        </div>
        <button
          onClick={generate}
          disabled={!jobType.trim() || !location.trim()}
          className="w-full py-3 bg-[#f5d000] border-2 border-[#0f1933] font-black uppercase tracking-widest text-[#0f1933] shadow-[4px_4px_0_#0f1933] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0_#0f1933]"
        >
          Generate
        </button>
      </div>

      {caption && (
        <div className="bg-white border-[3px] border-[#0f1933] shadow-[4px_4px_0_#0f1933] p-4 space-y-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Caption</p>
            <p className="font-bold text-[#0f1933] text-sm">{caption}</p>
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Review Line</p>
            <p className="font-bold text-[#0f1933] text-sm italic">{review}</p>
          </div>
          <div className="flex gap-2 pt-2">
            <button
              onClick={copyAll}
              className="flex-1 py-2.5 border-2 border-[#0f1933] font-black text-xs uppercase tracking-widest text-[#0f1933] hover:bg-slate-50 transition-colors"
            >
              {copied ? '✓ Copied!' : 'Copy'}
            </button>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 bg-green-500 border-2 border-[#0f1933] font-black text-xs uppercase tracking-widest text-white text-center shadow-[2px_2px_0_#0f1933] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all"
            >
              Send to WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Write My Quote ─────────────────────────────────────────────────────────────
function WriteMyQuote({ useFeature }: { useFeature: () => boolean }) {
  const [desc, setDesc] = useState('');
  const [bullets, setBullets] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  function generate() {
    if (!desc.trim()) return;
    if (!useFeature()) return;
    setBullets([
      `✓ I specialise in this exact type of work and have completed dozens of similar jobs across your area.`,
      `✓ Years of hands-on experience means I get it right first time — no comebacks, no mess.`,
      `✓ I'm local, fully insured, and my customers recommend me to their neighbours. References available.`,
    ]);
  }

  function copy() {
    navigator.clipboard.writeText(bullets.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="p-4 space-y-4">
      <h2 className="font-black text-xl uppercase tracking-tight text-[#0f1933]">Write My Quote</h2>
      <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Win more jobs with a better response</p>

      <div className="space-y-3">
        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-1">Job Description</label>
          <textarea
            value={desc}
            onChange={e => setDesc(e.target.value)}
            rows={4}
            placeholder="Paste the job description here..."
            className="w-full border-2 border-[#0f1933] px-3 py-2.5 text-sm font-bold text-[#0f1933] focus:outline-none focus:ring-2 focus:ring-[#f5d000] resize-none"
          />
        </div>
        <button
          onClick={generate}
          disabled={!desc.trim()}
          className="w-full py-3 bg-[#f5d000] border-2 border-[#0f1933] font-black uppercase tracking-widest text-[#0f1933] shadow-[4px_4px_0_#0f1933] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0_#0f1933]"
        >
          Write My Quote
        </button>
      </div>

      {bullets.length > 0 && (
        <div className="bg-white border-[3px] border-[#0f1933] shadow-[4px_4px_0_#0f1933] p-4 space-y-3">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Use this in your reply:</p>
          {bullets.map((b, i) => (
            <p key={i} className="text-sm font-bold text-[#0f1933] leading-snug">{b}</p>
          ))}
          <button
            onClick={copy}
            className="w-full mt-2 py-2.5 bg-[#f5d000] border-2 border-[#0f1933] font-black text-xs uppercase tracking-widest text-[#0f1933] shadow-[2px_2px_0_#0f1933] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all"
          >
            {copied ? '✓ Copied!' : 'Copy'}
          </button>
        </div>
      )}
    </div>
  );
}

// ── Upgrade Modal ──────────────────────────────────────────────────────────────
function UpgradeModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-end" onClick={onClose}>
      <div className="w-full max-w-lg mx-auto bg-white border-t-4 border-[#f5d000] p-6" onClick={e => e.stopPropagation()}>
        <h3 className="font-black text-2xl uppercase tracking-tight text-[#0f1933] mb-1">Get More Work</h3>
        <p className="text-sm font-bold text-slate-500 mb-6">You've used your 3 free goes. Upgrade to keep winning jobs.</p>

        <div className="space-y-3 mb-6">
          {/* Core */}
          <div className="border-2 border-[#0f1933] p-4 shadow-[4px_4px_0_#0f1933]">
            <div className="flex justify-between items-center mb-1">
              <span className="font-black uppercase tracking-tight text-[#0f1933]">Core</span>
              <span className="font-black text-2xl italic text-[#0f1933]">£39<span className="text-sm font-bold text-slate-500">/mo</span></span>
            </div>
            <p className="text-xs font-bold text-slate-600">Unlimited access to all features. Get more work every month.</p>
            <button className="w-full mt-3 py-2.5 bg-[#f5d000] border-2 border-[#0f1933] font-black text-sm uppercase tracking-widest text-[#0f1933] shadow-[2px_2px_0_#0f1933] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all">
              Get Core
            </button>
          </div>

          {/* Pro */}
          <div className="border-2 border-[#0f1933] p-4 bg-[#0f1933]">
            <div className="flex justify-between items-center mb-1">
              <span className="font-black uppercase tracking-tight text-[#f5d000]">Pro</span>
              <span className="font-black text-2xl italic text-white">£79<span className="text-sm font-bold text-slate-400">/mo</span></span>
            </div>
            <p className="text-xs font-bold text-slate-300">Better leads. Priority access. Win more jobs than your competition.</p>
            <button className="w-full mt-3 py-2.5 bg-[#f5d000] border-2 border-[#f5d000] font-black text-sm uppercase tracking-widest text-[#0f1933] shadow-[2px_2px_0_#f5d000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all">
              Get Pro
            </button>
          </div>
        </div>

        <button onClick={onClose} className="w-full text-center text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 py-2">
          Not now
        </button>
      </div>
    </div>
  );
}
