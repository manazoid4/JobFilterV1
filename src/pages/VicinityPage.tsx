import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera, LayoutTemplate, PenTool, Share2, Star, ArrowRight, MessageCircle, Instagram, Globe } from 'lucide-react';
import { WaitlistForm } from '../components/WaitlistForm';

const templates = [
  { id: 'whatsapp', label: 'WhatsApp Status', icon: '💬' },
  { id: 'instagram', label: 'Instagram Post', icon: '📷' },
  { id: 'review', label: 'Website Review', icon: '⭐' },
];

const recentProofs = [
  {
    id: 1,
    title: 'Dulwich Kitchen Fit',
    area: 'SE21',
    template: 'WhatsApp Status',
    img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80',
    age: '2 hours ago',
  },
  {
    id: 2,
    title: 'Brixton Bathroom Tile',
    area: 'SW9',
    template: 'Instagram Post',
    img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&q=80',
    age: 'Yesterday',
  },
  {
    id: 3,
    title: 'Peckham Full Rewire',
    area: 'SE15',
    template: 'Website Review',
    img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&q=80',
    age: '3 days ago',
  },
  {
    id: 4,
    title: 'Hackney Boiler Swap',
    area: 'E8',
    template: 'WhatsApp Status',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    age: '5 days ago',
  },
];

const beforeAfterPairs = [
  {
    before: { img: 'https://images.unsplash.com/photo-1585128903994-9788298932a4?w=400&q=80', label: 'Before: Dated Bathroom' },
    after: { img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&q=80', label: 'After: Modern Refit' },
    caption: 'Full bathroom strip & refit. New tiles, suite, and underfloor heating. SE21. 5 days.',
  },
  {
    before: { img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80', label: 'Before: Old Kitchen' },
    after: { img: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=400&q=80', label: 'After: Contemporary Kitchen' },
    caption: 'Kitchen gutted and rebuilt. New units, quartz worktops, LED splashback. SW9. 7 days.',
  },
];

const examplePosts = [
  { img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80', caption: 'Fresh kitchen fit in Dulwich. New units, worktops, splashback — 4-day turnaround.', platform: 'WhatsApp', icon: '💬' },
  { img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&q=80', caption: 'Bathroom refit complete. Floor-to-ceiling tiles, walk-in shower, heated towel rail.', platform: 'Instagram', icon: '📷' },
  { img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&q=80', caption: 'Full rewire for a Victorian terrace. New consumer unit, downlights, USB sockets throughout.', platform: 'Review', icon: '⭐' },
  { img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', caption: 'Boiler swap in Hackney. Old combi out, new Worcester 8000 in. Same-day hot water restored.', platform: 'WhatsApp', icon: '💬' },
  { img: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=400&q=80', caption: 'Open-plan kitchen-diner. Structural wall removed, RSJ installed, full reno.', platform: 'Instagram', icon: '📷' },
  { img: 'https://images.unsplash.com/photo-1585128903994-9788298932a4?w=400&q=80', caption: 'Bathroom stripped back to brick. New suite, tiling, underfloor heating. 5 days flat.', platform: 'Review', icon: '⭐' },
];

const howItWorks = [
  { icon: Camera, label: 'Snap', desc: 'Take photos on site' },
  { icon: LayoutTemplate, label: 'Pick', desc: 'Choose a template' },
  { icon: PenTool, label: 'Write', desc: 'Vicinity writes copy' },
  { icon: Share2, label: 'Post', desc: 'Share & win jobs' },
];

export function VicinityPage() {
  const [selectedTemplate, setSelectedTemplate] = useState('whatsapp');
  const [selectedPreview, setSelectedPreview] = useState<string | null>(null);

  return (
    <main style={{ background: 'var(--offwhite)', minHeight: '100vh' }} className="pb-24 md:pb-0">
      <div className="page-shell py-10">

        {/* ── ENHANCED HERO ──────────────────────────── */}
        <section className="mb-12 relative overflow-hidden" style={{ background: 'var(--navy)' }}>
          {/* Diagonal stripe pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: `repeating-linear-gradient(
                -45deg,
                var(--yellow) 0px,
                var(--yellow) 1px,
                transparent 1px,
                transparent 14px
              )`,
            }}
          />
          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `
                linear-gradient(var(--yellow) 1px, transparent 1px),
                linear-gradient(90deg, var(--yellow) 1px, transparent 1px)
              `,
              backgroundSize: '48px 48px',
            }}
          />

          <div className="relative z-10 px-6 py-12 md:px-12 md:py-16 lg:py-20">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-12">
              {/* Left: headline + copy */}
              <div className="flex-1">
                <span
                  className="inline-block w-fit px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em]"
                  style={{ background: 'var(--yellow)', color: 'var(--navy)', border: '2px solid var(--yellow)' }}
                >
                  Vicinity™ Proof Generator
                </span>
                <h1
                  className="headline mt-4"
                  style={{ fontSize: 'clamp(36px, 6vw, 72px)', lineHeight: 1.0, color: 'var(--paper)' }}
                >
                  Finished jobs into{' '}
                  <span
                    style={{
                      background: 'var(--yellow)',
                      border: '4px solid var(--yellow)',
                      boxShadow: '6px 6px 0 var(--paper)',
                      display: 'inline-block',
                      padding: '0 10px 4px',
                      lineHeight: 1.05,
                      color: 'var(--navy)',
                    }}
                  >
                    Local Proof
                  </span>
                </h1>
                <p className="mt-4 max-w-lg text-[17px] font-medium leading-[1.55] text-white/70">
                  Turn photos from your camera roll into WhatsApp, social, and website assets that bring in better local work.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    className="jf-button bg-[var(--yellow)] text-[var(--navy)]"
                    to="#create"
                  >
                    Start Creating Proof →
                  </Link>
                  <a
                    href="#how-it-works"
                    className="jf-button border-[var(--paper)] bg-transparent text-[var(--paper)] hover:bg-white/10"
                  >
                    See How It Works
                  </a>
                </div>
              </div>

              {/* Right: floating preview cards */}
              <div className="hidden lg:flex lg:flex-col lg:gap-4" style={{ minWidth: 320 }}>
                {/* WhatsApp preview */}
                <div
                  className="relative -rotate-2 transition-transform hover:rotate-0 hover:scale-105"
                  style={{
                    background: 'var(--paper)',
                    border: '4px solid var(--navy)',
                    boxShadow: '6px 6px 0 var(--yellow)',
                    padding: 12,
                    maxWidth: 280,
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-8 w-8 rounded-full overflow-hidden" style={{ border: '2px solid var(--navy)' }}>
                      <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=80&q=80" alt="" className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wide text-[var(--navy)]">Dave's Kitchens</p>
                      <p className="text-[9px] text-[var(--muted)]">Today</p>
                    </div>
                  </div>
                  <img src="https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=300&q=80" alt="Kitchen preview" className="w-full object-cover" style={{ height: 120, borderBottom: '2px solid var(--navy)' }} />
                  <p className="mt-2 text-[11px] font-semibold text-[var(--navy)]">Fresh kitchen fit in SE21 ✅ New units, quartz tops, 4-day turnaround.</p>
                </div>

                {/* Instagram preview */}
                <div
                  className="relative rotate-1 ml-8 transition-transform hover:rotate-0 hover:scale-105"
                  style={{
                    background: 'var(--paper)',
                    border: '4px solid var(--navy)',
                    boxShadow: '6px 6px 0 var(--navy)',
                    padding: 12,
                    maxWidth: 260,
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Instagram size={16} style={{ color: 'var(--navy)' }} />
                    <p className="text-[11px] font-bold uppercase tracking-wide text-[var(--navy)]">Instagram Post</p>
                  </div>
                  <img src="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=300&q=80" alt="Bathroom preview" className="w-full object-cover" style={{ height: 100, borderBottom: '2px solid var(--navy)' }} />
                  <p className="mt-2 text-[11px] font-semibold text-[var(--navy)]">Bathroom refit complete. Walk-in shower, heated rail. #trades #london</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SOCIAL PROOF STATS BAR ─────────────────── */}
        <section className="mb-12" style={{ background: 'var(--yellow)', border: '4px solid var(--navy)', boxShadow: '6px 6px 0 var(--navy)' }}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0">
            {[
              { stat: '47%', label: 'more enquiries from trades using Vicinity' },
              { stat: '3 min', label: 'to create a post' },
              { stat: '4+', label: 'platforms: WhatsApp, Insta, Facebook, Google' },
            ].map((item, i) => (
              <div
                key={i}
                className="px-6 py-6 text-center"
                style={{
                  borderRight: i < 2 ? '4px solid var(--navy)' : 'none',
                  borderBottom: i === 0 ? '4px solid var(--navy)' : 'none',
                }}
              >
                <p className="headline text-[clamp(32px,5vw,48px)] text-[var(--navy)]" style={{ lineHeight: 1 }}>
                  {item.stat}
                </p>
                <p className="mt-1 text-[13px] font-bold uppercase tracking-[0.04em] text-[var(--muted)]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── VISUAL TEMPLATE GALLERY ─────────────────── */}
        <section className="mb-12" id="create">
          <h2
            className="headline mb-8 pl-4 text-[clamp(22px,3vw,36px)] uppercase text-[var(--navy)]"
            style={{ borderLeft: '8px solid var(--yellow)' }}
          >
            Pick Your Template
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {/* WhatsApp Status */}
            <button
              onClick={() => setSelectedTemplate('whatsapp')}
              className="group relative cursor-pointer overflow-hidden text-left transition-all"
              style={{
                border: selectedTemplate === 'whatsapp' ? '4px solid var(--yellow)' : '4px solid var(--navy)',
                boxShadow: selectedTemplate === 'whatsapp' ? '6px 6px 0 var(--yellow)' : '6px 6px 0 var(--navy)',
                background: 'var(--paper)',
              }}
            >
              {/* Phone mockup header */}
              <div className="flex items-center gap-2 px-4 py-3" style={{ background: '#075E54', borderBottom: '2px solid var(--navy)' }}>
                <MessageCircle size={16} style={{ color: 'white' }} />
                <span className="text-[12px] font-bold uppercase tracking-wide text-white">WhatsApp Status</span>
              </div>
              {/* Image area */}
              <div className="relative" style={{ height: 200 }}>
                <img src="https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=400&q=80" alt="WhatsApp preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)' }} />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-[11px] font-bold text-white">Fresh kitchen fit in SE21 ✅</p>
                  <p className="text-[9px] text-white/70">New units, quartz tops, 4-day turnaround</p>
                </div>
              </div>
              <div className="px-4 py-3" style={{ background: '#DCF8C6', borderTop: '2px solid var(--navy)' }}>
                <p className="text-[11px] font-bold text-[var(--navy)]">💬 Tap to view status</p>
              </div>
              {selectedTemplate === 'whatsapp' && (
                <div className="absolute top-3 right-3 h-6 w-6 flex items-center justify-center" style={{ background: 'var(--yellow)', border: '2px solid var(--navy)' }}>
                  <span className="text-[12px] font-bold text-[var(--navy)]">✓</span>
                </div>
              )}
            </button>

            {/* Instagram Post */}
            <button
              onClick={() => setSelectedTemplate('instagram')}
              className="group relative cursor-pointer overflow-hidden text-left transition-all"
              style={{
                border: selectedTemplate === 'instagram' ? '4px solid var(--yellow)' : '4px solid var(--navy)',
                boxShadow: selectedTemplate === 'instagram' ? '6px 6px 0 var(--yellow)' : '6px 6px 0 var(--navy)',
                background: 'var(--paper)',
              }}
            >
              {/* Instagram header */}
              <div className="flex items-center gap-2 px-4 py-3" style={{ background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)', borderBottom: '2px solid var(--navy)' }}>
                <Instagram size={16} style={{ color: 'white' }} />
                <span className="text-[12px] font-bold uppercase tracking-wide text-white">Instagram Post</span>
              </div>
              {/* Square image */}
              <div className="relative" style={{ height: 200 }}>
                <img src="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&q=80" alt="Instagram preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 40%)' }} />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-[11px] font-bold text-white">Bathroom refit complete 🛁</p>
                  <p className="text-[9px] text-white/70">#trades #london #bathroom</p>
                </div>
              </div>
              <div className="px-4 py-3" style={{ background: 'var(--paper)', borderTop: '2px solid var(--navy)' }}>
                <p className="text-[11px] font-bold text-[var(--navy)]">📷 Square post with caption</p>
              </div>
              {selectedTemplate === 'instagram' && (
                <div className="absolute top-3 right-3 h-6 w-6 flex items-center justify-center" style={{ background: 'var(--yellow)', border: '2px solid var(--navy)' }}>
                  <span className="text-[12px] font-bold text-[var(--navy)]">✓</span>
                </div>
              )}
            </button>

            {/* Website Review */}
            <button
              onClick={() => setSelectedTemplate('review')}
              className="group relative cursor-pointer overflow-hidden text-left transition-all"
              style={{
                border: selectedTemplate === 'review' ? '4px solid var(--yellow)' : '4px solid var(--navy)',
                boxShadow: selectedTemplate === 'review' ? '6px 6px 0 var(--yellow)' : '6px 6px 0 var(--navy)',
                background: 'var(--paper)',
              }}
            >
              {/* Review header */}
              <div className="flex items-center gap-2 px-4 py-3" style={{ background: '#4285F4', borderBottom: '2px solid var(--navy)' }}>
                <Globe size={16} style={{ color: 'white' }} />
                <span className="text-[12px] font-bold uppercase tracking-wide text-white">Website Review</span>
              </div>
              {/* Review card */}
              <div className="p-4" style={{ height: 200, background: 'var(--paper)' }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-full overflow-hidden" style={{ border: '2px solid var(--navy)' }}>
                    <img src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=80&q=80" alt="" className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <p className="text-[12px] font-bold text-[var(--navy)]">Sarah M.</p>
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(s => (
                        <Star key={s} size={12} fill="var(--yellow)" stroke="var(--navy)" strokeWidth={1.5} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-[12px] leading-snug text-[var(--muted)]">
                  "Brilliant job on our full rewire. Turned up on time, clean, professional. Would absolutely recommend."
                </p>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-wide text-[var(--muted)]">SE15 · 3 days ago</p>
              </div>
              <div className="px-4 py-3" style={{ background: '#E8F5E9', borderTop: '2px solid var(--navy)' }}>
                <p className="text-[11px] font-bold text-[var(--navy)]">⭐ Google-style review card</p>
              </div>
              {selectedTemplate === 'review' && (
                <div className="absolute top-3 right-3 h-6 w-6 flex items-center justify-center" style={{ background: 'var(--yellow)', border: '2px solid var(--navy)' }}>
                  <span className="text-[12px] font-bold text-[var(--navy)]">✓</span>
                </div>
              )}
            </button>
          </div>
        </section>

        {/* ── UPLOAD + FORM CARD ───────────────────────── */}
        <section className="mb-12">
          <div
            className="p-8"
            style={{
              background: 'var(--paper)',
              border: '4px solid var(--navy)',
              boxShadow: '8px 8px 0 var(--yellow)',
            }}
          >
            {/* Photo upload zone */}
            <div
              className="flex cursor-pointer flex-col items-center justify-center gap-4 p-10 text-center transition-colors hover:bg-white"
              style={{ border: '2px dashed var(--navy)', background: 'var(--offwhite)' }}
            >
              <div
                className="flex h-16 w-16 items-center justify-center"
                style={{
                  background: 'var(--yellow)',
                  border: '2px solid var(--navy)',
                  boxShadow: '4px 4px 0 var(--navy)',
                }}
              >
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="var(--navy)" strokeWidth={2}>
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 15l-5-5L5 21" />
                </svg>
              </div>
              <div>
                <h3 className="headline mb-1 text-[18px] uppercase text-[var(--navy)]">Upload Job Photos</h3>
                <p className="text-[14px] text-[var(--muted)]">Before & after shots, finished work, on-site photos</p>
              </div>
            </div>

            {/* Job summary */}
            <div className="mt-6">
              <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--navy)]">
                Job Summary
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Full kitchen refit in SE21. New units, worktops, and splashback. 4-day job."
                className="w-full resize-none px-4 py-3 text-[15px] text-[var(--navy)] outline-none"
                style={{
                  border: '2px solid var(--navy)',
                  background: 'var(--offwhite)',
                  fontFamily: 'Barlow, sans-serif',
                }}
              />
            </div>

            {/* Tag buttons */}
            <div className="mt-4 flex flex-wrap gap-3">
              {['📍 Add Location', '🏷️ Tag Services'].map((label) => (
                <button
                  key={label}
                  className="flex items-center gap-2 px-4 py-2 text-[13px] font-bold uppercase transition-all active:translate-y-[1px]"
                  style={{
                    border: '2px solid var(--navy)',
                    background: 'var(--paper)',
                    color: 'var(--navy)',
                    fontFamily: "'Barlow Condensed', sans-serif",
                    letterSpacing: '0.04em',
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Template selector (compact, below gallery) */}
            <div className="mt-6">
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--navy)]">
                Output Template
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                {templates.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTemplate(t.id)}
                    className="flex items-center gap-3 p-4 text-left transition-all"
                    style={{
                      border: '2px solid var(--navy)',
                      background: selectedTemplate === t.id ? 'var(--navy)' : 'var(--paper)',
                      color: selectedTemplate === t.id ? 'var(--yellow)' : 'var(--navy)',
                      boxShadow: selectedTemplate === t.id ? '4px 4px 0 var(--yellow)' : '4px 4px 0 var(--navy)',
                    }}
                  >
                    <span style={{ fontSize: 20 }}>{t.icon}</span>
                    <span
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 700,
                        fontSize: 14,
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {t.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Generate CTA */}
            <button
              className="mt-6 flex w-full cursor-pointer items-center justify-center gap-3 px-8 py-4 transition-all active:translate-x-[2px] active:translate-y-[2px]"
              style={{
                background: 'var(--navy)',
                color: 'var(--paper)',
                border: '2px solid var(--navy)',
                boxShadow: '4px 4px 0 var(--yellow)',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: 16,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              📲 Generate Proof
            </button>
          </div>
        </section>

        {/* ── BEFORE / AFTER SHOWCASE ─────────────────── */}
        <section className="mb-12">
          <h2
            className="headline mb-8 pl-4 text-[clamp(22px,3vw,36px)] uppercase text-[var(--navy)]"
            style={{ borderLeft: '8px solid var(--yellow)' }}
          >
            Before → After
          </h2>
          <div className="grid gap-8 lg:grid-cols-2">
            {beforeAfterPairs.map((pair, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--paper)',
                  border: '4px solid var(--navy)',
                  boxShadow: '6px 6px 0 var(--yellow)',
                }}
              >
                <div className="grid grid-cols-2">
                  {/* Before */}
                  <div className="relative overflow-hidden" style={{ borderRight: '2px solid var(--navy)' }}>
                    <img src={pair.before.img} alt={pair.before.label} className="w-full object-cover" style={{ height: 220 }} />
                    <div
                      className="absolute top-0 left-0 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white"
                      style={{ background: 'var(--orange)' }}
                    >
                      Before
                    </div>
                  </div>
                  {/* After */}
                  <div className="relative overflow-hidden">
                    <img src={pair.after.img} alt={pair.after.label} className="w-full object-cover" style={{ height: 220 }} />
                    <div
                      className="absolute top-0 left-0 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--navy)]"
                      style={{ background: 'var(--yellow)' }}
                    >
                      After
                    </div>
                  </div>
                </div>
                <div className="p-4" style={{ borderTop: '2px solid var(--navy)' }}>
                  <p className="text-[13px] font-semibold leading-snug text-[var(--navy)]">{pair.caption}</p>
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">← Swipe to compare →</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── TEMPLATE EXAMPLES GRID ──────────────────── */}
        <section className="mb-12">
          <h2
            className="headline mb-8 pl-4 text-[clamp(22px,3vw,36px)] uppercase text-[var(--navy)]"
            style={{ borderLeft: '8px solid var(--yellow)' }}
          >
            Real Posts, Real Work
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {examplePosts.map((post, i) => (
              <div
                key={i}
                className="group cursor-pointer overflow-hidden transition-transform hover:-translate-y-1 hover:scale-[1.02]"
                style={{
                  background: 'var(--paper)',
                  border: '4px solid var(--navy)',
                  boxShadow: '6px 6px 0 var(--navy)',
                }}
              >
                <div className="relative overflow-hidden" style={{ borderBottom: '2px solid var(--navy)' }}>
                  <img
                    src={post.img}
                    alt={post.caption}
                    className="w-full object-cover transition-transform group-hover:scale-105"
                    style={{ height: 180 }}
                  />
                  <div
                    className="absolute top-2 right-2 px-2 py-1 text-[10px] font-bold uppercase tracking-wider"
                    style={{ background: 'var(--yellow)', border: '2px solid var(--navy)', color: 'var(--navy)' }}
                  >
                    {post.icon} {post.platform}
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-[13px] font-semibold leading-snug text-[var(--navy)]">{post.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── HOW IT WORKS ────────────────────────────── */}
        <section className="mb-12" id="how-it-works" style={{ background: 'var(--paper)', border: '4px solid var(--navy)', boxShadow: '6px 6px 0 var(--yellow)' }}>
          <div className="px-6 py-10 md:px-10 md:py-12">
            <h2
              className="headline mb-10 text-center text-[clamp(24px,3vw,40px)] uppercase text-[var(--navy)]"
            >
              How It Works
            </h2>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-4">
              {howItWorks.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={i} className="flex flex-col items-center text-center">
                    {/* Step number + icon */}
                    <div
                      className="relative flex h-16 w-16 items-center justify-center mb-4"
                      style={{
                        background: 'var(--yellow)',
                        border: '4px solid var(--navy)',
                        boxShadow: '4px 4px 0 var(--navy)',
                      }}
                    >
                      <Icon size={28} style={{ color: 'var(--navy)' }} />
                      <span
                        className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center text-[10px] font-bold"
                        style={{ background: 'var(--navy)', color: 'var(--yellow)', border: '2px solid var(--navy)' }}
                      >
                        {i + 1}
                      </span>
                    </div>
                    <p className="headline text-[16px] uppercase text-[var(--navy)]">{step.label}</p>
                    <p className="mt-1 text-[12px] font-medium text-[var(--muted)]">{step.desc}</p>
                    {i < 3 && (
                      <div className="hidden md:block mt-4">
                        <ArrowRight size={20} style={{ color: 'var(--yellow)' }} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Recent Proofs grid ─────────────────── */}
        <section className="mb-10">
          <h3
            className="headline mb-8 pl-4 text-[clamp(22px,3vw,32px)] uppercase text-[var(--navy)]"
            style={{ borderLeft: '8px solid var(--yellow)' }}
          >
            Recent Proofs
          </h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {recentProofs.map((proof) => (
              <div
                key={proof.id}
                className="cursor-pointer overflow-hidden transition-transform hover:-translate-y-1"
                style={{
                  border: '2px solid var(--navy)',
                  boxShadow: '6px 6px 0 var(--yellow)',
                  background: 'var(--paper)',
                }}
              >
                <img
                  src={proof.img}
                  alt={proof.title}
                  className="w-full object-cover"
                  style={{ height: 180, borderBottom: '2px solid var(--navy)' }}
                />
                <div className="p-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--muted)]">
                    {proof.age}
                  </p>
                  <h4 className="headline mt-1 text-[15px] uppercase text-[var(--navy)]">{proof.title}</h4>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span
                      className="px-2 py-[2px] text-[10px] font-bold uppercase"
                      style={{ background: 'var(--offwhite)', border: '1px solid var(--navy)', color: 'var(--navy)' }}
                    >
                      {proof.area}
                    </span>
                    <span
                      className="px-2 py-[2px] text-[10px] font-bold uppercase"
                      style={{ background: 'var(--yellow)', border: '1px solid var(--navy)', color: 'var(--navy)' }}
                    >
                      {proof.template}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────── */}
        <section className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
          <div
            className="p-7"
            style={{
              background: 'var(--paper)',
              border: '4px solid var(--navy)',
              boxShadow: '8px 8px 0 var(--yellow)',
            }}
          >
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--muted)]">
              Coming soon
            </p>
            <h2 className="headline text-[clamp(24px,3vw,36px)] uppercase text-[var(--navy)]">
              Stop letting good work die in your camera roll.
            </h2>
            <p className="mt-3 text-[16px] leading-relaxed text-[var(--muted)]">
              Every finished job is a sales asset. Vicinity™ turns your phone photos into professional local proof that brings in the next one.
            </p>
            <div className="mt-4 flex items-center gap-2 px-4 py-3" style={{ background: 'var(--yellow)', border: '2px solid var(--navy)' }}>
              <span className="text-[13px] font-bold uppercase tracking-wide text-[var(--navy)]">✓ Included free with JobFilter subscription</span>
            </div>
            <Link to="/intake-test" className="jf-button mt-6 inline-flex bg-[var(--yellow)] text-[var(--navy)]">
              Start Creating Proof →
            </Link>
          </div>
          <WaitlistForm source="vicinity" />
        </section>

        {/* ── Conversion CTA: WhatsApp Alerts ───────── */}
        <section className="mt-10 jf-box bg-[var(--navy)] p-6 text-white">
          <p className="micro-label text-[var(--yellow)]">WANT TO TURN FINISHED JOBS INTO MORE WORK?</p>
          <h2 className="headline mt-2 text-3xl leading-none text-[var(--yellow)]">GET WHATSAPP ALERTS FOR NEW LEADS.</h2>
          <p className="mt-3 max-w-xl font-black text-white/70">
            Vicinity proves your work. Intake feeds you the next job. Real leads in your area, sent straight to WhatsApp. No chasing. No competing. STAY IN CONTROL.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link className="jf-button bg-[var(--yellow)] text-[var(--ink)]" to="/find-jobs">SCAN MY AREA FREE →</Link>
            <Link className="jf-button bg-white text-[var(--ink)]" to="/pricing">GET FOUNDING 30</Link>
          </div>
        </section>

        {/* ── Cross-Tool Navigation ─────────────────── */}
        <section className="mt-6 jf-box bg-white p-5">
          <p className="micro-label text-[var(--muted)]">TRY ANOTHER FREE TOOL</p>
          <div className="mt-3 flex flex-wrap gap-3">
            <Link className="jf-button text-sm !bg-transparent border-2 border-[var(--ink)] !text-[var(--ink)] hover:!bg-[var(--ink)] hover:!text-white transition-colors" to="/free-tools">
              ALL FREE TOOLS
            </Link>
            <Link className="jf-button text-sm !bg-transparent border-2 border-[var(--ink)] !text-[var(--ink)] hover:!bg-[var(--ink)] hover:!text-white transition-colors" to="/vantage">
              VANTAGE — BID DECKS
            </Link>
            <Link className="jf-button text-sm !bg-transparent border-2 border-[var(--ink)] !text-[var(--ink)] hover:!bg-[var(--ink)] hover:!text-white transition-colors" to="/tips">
              TRADE TIPS
            </Link>
          </div>
        </section>
      </div>

    </main>
  );
}