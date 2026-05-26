"use client";
import Link from 'next/link';

import {
  ArrowRight,
  Database,
  Home,
  MapPinned,
  Radar,
  Route,
  ShieldCheck,
  Zap,
  Target,
  Clock,
  TrendingUp,
  Layers,
  Send,
  Phone,
  FileText,
  Building2,
  HardHat,
  Wrench,
  CheckCircle,
} from 'lucide-react';

/* ── PIPELINE STEPS ─────────────────────────────────── */
const pipelineSteps = [
  {
    num: '01',
    label: 'FETCH',
    icon: Radar,
    body: 'Scan official sources — planning applications, government contracts, energy ratings, land registry, company filings, council notices, and streetworks permits.',
  },
  {
    num: '02',
    label: 'NORMALISE',
    icon: Database,
    body: 'Join every signal to a persistent property key — postcode, UPRN, and company number. No orphan records. No guesswork.',
  },
  {
    num: '03',
    label: 'ENRICH',
    icon: Layers,
    body: 'Add property type, floor area, price-paid history, trade-fit classification, and local demand indicators. Context turns a signal into a lead.',
  },
  {
    num: '04',
    label: 'SCORE',
    icon: Target,
    body: 'Rank by value, urgency, rarity, distance, win probability, and contactability. Not volume. A hundred weak leads are worth less than five strong ones.',
  },
  {
    num: '05',
    label: 'STORE',
    icon: HardHat,
    body: 'Build a persistent property graph. Every scan improves coverage, confidence, and scoring accuracy. The system gets sharper the longer it runs.',
  },
  {
    num: '06',
    label: 'DELIVER',
    icon: Send,
    body: 'Gold signals route to WhatsApp, direct letters, territory locks, and follow-up tracking. The right trade gets the right lead at the right time.',
  },
];

/* ── FUSION STACKS ───────────────────────────────────── */
const fusionStacks = [
  {
    title: 'Homeowner Retrofit',
    icon: Home,
    signals: [
      'Planning application',
      'Energy efficiency rating',
      'Affluent postcode',
      'Detached or semi-detached',
      'High floor area',
      'Recent sale or probate',
    ],
  },
  {
    title: 'Active Site',
    icon: Building2,
    signals: [
      'Planning or building control',
      'Scaffold permit',
      'Skip permit',
      'Streetworks notice',
      'Fresh site activity',
    ],
  },
  {
    title: 'Commercial Fit-Out',
    icon: Wrench,
    signals: [
      'New company registration',
      'Licensing application',
      'Change of use',
      'Retail, restaurant, or clinic',
      'Commercial property movement',
    ],
  },
  {
    title: 'Distressed Property',
    icon: FileText,
    signals: [
      'Probate notice',
      'Auction listing',
      'Vacant home flag',
      'Low energy rating',
      'Recent price-paid',
      'Storm or flood cluster',
    ],
  },
];

/* ── SIGNAL SCOREBOARD ───────────────────────────────── */
const signalScores = [
  { name: 'Planning before approval', cost: 2, ease: 7, quality: 9, speed: 8, moat: 8 },
  { name: 'Retrofit clusters (low-rated)', cost: 2, ease: 8, quality: 8, speed: 9, moat: 7 },
  { name: 'Scaffold / road occupation', cost: 3, ease: 5, quality: 9, speed: 6, moat: 9 },
  { name: 'Skip permits / waste', cost: 2, ease: 5, quality: 8, speed: 6, moat: 8 },
  { name: 'Commercial fit-out licences', cost: 2, ease: 6, quality: 8, speed: 7, moat: 8 },
];

/* ── DATA SOURCES ────────────────────────────────────── */
const dataSources = [
  {
    category: 'Planning',
    icon: FileText,
    items: ['England — Planning Data API', 'London — Planning London Datahub', 'Scotland — building warrants + weekly lists'],
  },
  {
    category: 'Procurement',
    icon: ShieldCheck,
    items: ['England procurement portals', 'Scotland contract notices', 'Wales procurement feeds', 'Northern Ireland tender notices'],
  },
  {
    category: 'Property',
    icon: Home,
    items: ['Energy efficiency signals', 'Property price-paid data', 'Council tax bands'],
  },
  {
    category: 'Site Activity',
    icon: HardHat,
    items: ['Streetworks', 'Road occupation notices', 'Skip permits', 'Scaffold permits', 'Hoardings licences'],
  },
  {
    category: 'Commercial',
    icon: Building2,
    items: ['Business registration filings', 'Licensing applications', 'Change of use', 'HMO registrations'],
  },
  {
    category: 'Triggers',
    icon: Zap,
    items: ['Storm and flood clusters', 'Subsidence alerts', 'Probate notices', 'Auction listings'],
  },
];

/* ── DELIVERY LOOP ───────────────────────────────────── */
const deliverySteps = [
  {
    icon: Radar,
    title: 'Signal detected',
    body: 'Planning submitted, energy signal filed, permit issued. The raw event lands in the pipeline.',
  },
  {
    icon: Target,
    title: 'Lead scored',
    body: 'Fused with property context, ranked by value and trade fit. Weak signals stay out.',
  },
  {
    icon: Phone,
    title: 'Delivered to you',
    body: 'WhatsApp alert, direct letter, or territory notification. You choose the channel.',
  },
  {
    icon: CheckCircle,
    title: 'You close it',
    body: 'Quote, follow-up, win. Feedback improves future scoring. The loop gets tighter.',
  },
];

/* ── AUDIENCE CARDS ──────────────────────────────────── */
const audienceCards = [
  {
    icon: MapPinned,
    title: 'For Trades',
    body: 'Own the patch, receive high-intent signals, and stop wasting evenings on weak enquiries.',
  },
  {
    icon: Home,
    title: 'For Homeowners',
    body: 'Get matched to serious local operators without creating a noisy shared lead.',
  },
  {
    icon: Route,
    title: 'For JobFilter',
    body: 'Build the UK signal layer: cheaper than incumbents, earlier than marketplaces, sharper than ads.',
  },
];

/* ── SCORE BAR ───────────────────────────────────────── */
function ScoreBar({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className={`h-3.5 w-3.5 border-2 border-[var(--line)] ${
            i < value ? 'bg-[var(--yellow)]' : 'bg-transparent'
          }`}
        />
      ))}
    </div>
  );
}

/* ── SVG: PROPERTY RADAR ─────────────────────────────── */
function PropertyRadarSvg() {
  return (
    <svg viewBox="0 0 400 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-md mx-auto">
      {/* Radar waves */}
      <circle cx="200" cy="180" r="140" stroke="var(--yellow)" strokeWidth="1.5" opacity="0.2" />
      <circle cx="200" cy="180" r="100" stroke="var(--yellow)" strokeWidth="1.5" opacity="0.35" />
      <circle cx="200" cy="180" r="60" stroke="var(--yellow)" strokeWidth="2" opacity="0.55" />
      {/* Radar sweep */}
      <path d="M200 180 L200 40 A140 140 0 0 1 321 110 Z" fill="var(--yellow)" opacity="0.12" />
      {/* House body */}
      <rect x="140" y="160" width="120" height="90" fill="var(--paper)" stroke="var(--yellow)" strokeWidth="3" />
      {/* Roof */}
      <path d="M130 165 L200 105 L270 165" fill="none" stroke="var(--yellow)" strokeWidth="3" strokeLinejoin="round" />
      {/* Door */}
      <rect x="180" y="200" width="30" height="50" fill="var(--ink)" stroke="var(--yellow)" strokeWidth="2" />
      {/* Window left */}
      <rect x="152" y="180" width="22" height="22" fill="var(--yellow)" opacity="0.6" stroke="var(--yellow)" strokeWidth="2" />
      {/* Window right */}
      <rect x="226" y="180" width="22" height="22" fill="var(--yellow)" opacity="0.6" stroke="var(--yellow)" strokeWidth="2" />
      {/* Signal dots */}
      <circle cx="80" cy="100" r="6" fill="var(--yellow)" opacity="0.7" />
      <circle cx="320" cy="80" r="6" fill="var(--yellow)" opacity="0.7" />
      <circle cx="340" cy="200" r="6" fill="var(--yellow)" opacity="0.5" />
      <circle cx="60" cy="220" r="6" fill="var(--yellow)" opacity="0.5" />
      <circle cx="150" cy="50" r="6" fill="var(--yellow)" opacity="0.6" />
      {/* Connection lines from dots to house */}
      <line x1="80" y1="100" x2="140" y2="160" stroke="var(--yellow)" strokeWidth="1" opacity="0.3" strokeDasharray="4 4" />
      <line x1="320" y1="80" x2="260" y2="160" stroke="var(--yellow)" strokeWidth="1" opacity="0.3" strokeDasharray="4 4" />
      <line x1="340" y1="200" x2="260" y2="200" stroke="var(--yellow)" strokeWidth="1" opacity="0.3" strokeDasharray="4 4" />
      <line x1="60" y1="220" x2="140" y2="210" stroke="var(--yellow)" strokeWidth="1" opacity="0.3" strokeDasharray="4 4" />
      <line x1="150" y1="50" x2="200" y2="105" stroke="var(--yellow)" strokeWidth="1" opacity="0.3" strokeDasharray="4 4" />
      {/* Ground line */}
      <line x1="100" y1="250" x2="300" y2="250" stroke="var(--yellow)" strokeWidth="2" opacity="0.4" />
    </svg>
  );
}

/* ── SVG: JOURNEY TIMELINE ────────────────────────────── */
function JourneyTimelineSvg() {
  const steps = [
    { label: 'FETCH', Icon: Radar },
    { label: 'NORMALISE', Icon: Database },
    { label: 'ENRICH', Icon: Layers },
    { label: 'SCORE', Icon: Target },
    { label: 'STORE', Icon: HardHat },
    { label: 'DELIVER', Icon: Send },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[700px] flex items-start gap-0 relative py-4">
        {/* Connecting line */}
        <div className="absolute top-[32px] left-[40px] right-[40px] h-[3px] bg-[var(--yellow)]" />
        {steps.map((step, i) => (
          <div key={step.label} className="flex-1 flex flex-col items-center relative z-10">
            <div className="w-[64px] h-[64px] rounded-full border-[3px] border-[var(--yellow)] bg-[var(--ink)] flex items-center justify-center">
              <step.Icon className="h-7 w-7 text-[var(--yellow)]" />
            </div>
            <p className="mt-3 micro-label text-[var(--yellow)] text-center">{step.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── SVG: HOMEOWNER RETROFIT ──────────────────────────── */
function HomeownerRetrofitSvg() {
  return (
    <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[120px]">
      {/* House */}
      <rect x="20" y="40" width="80" height="55" fill="var(--ink)" stroke="var(--yellow)" strokeWidth="2.5" />
      <path d="M15 44 L60 10 L105 44" fill="none" stroke="var(--yellow)" strokeWidth="2.5" strokeLinejoin="round" />
      {/* Door */}
      <rect x="48" y="65" width="22" height="30" fill="var(--yellow)" stroke="var(--yellow)" strokeWidth="1.5" />
      {/* Solar panels on roof */}
      <rect x="30" y="18" width="14" height="10" fill="var(--yellow)" opacity="0.7" stroke="var(--yellow)" strokeWidth="1.5" />
      <rect x="48" y="22" width="14" height="8" fill="var(--yellow)" opacity="0.7" stroke="var(--yellow)" strokeWidth="1.5" />
      {/* Sun rays */}
      <line x1="95" y1="5" x2="95" y2="15" stroke="var(--yellow)" strokeWidth="2" />
      <line x1="88" y1="10" x2="102" y2="10" stroke="var(--yellow)" strokeWidth="2" />
      <line x1="90" y1="3" x2="100" y2="17" stroke="var(--yellow)" strokeWidth="1.5" />
    </svg>
  );
}

/* ── SVG: ACTIVE SITE ────────────────────────────────── */
function ActiveSiteSvg() {
  return (
    <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[120px]">
      {/* Building */}
      <rect x="25" y="25" width="70" height="70" fill="var(--ink)" stroke="var(--yellow)" strokeWidth="2.5" />
      {/* Windows */}
      <rect x="35" y="35" width="15" height="12" fill="var(--yellow)" opacity="0.5" stroke="var(--yellow)" strokeWidth="1.5" />
      <rect x="58" y="35" width="15" height="12" fill="var(--yellow)" opacity="0.5" stroke="var(--yellow)" strokeWidth="1.5" />
      <rect x="35" y="55" width="15" height="12" fill="var(--yellow)" opacity="0.5" stroke="var(--yellow)" strokeWidth="1.5" />
      <rect x="58" y="55" width="15" height="12" fill="var(--yellow)" opacity="0.5" stroke="var(--yellow)" strokeWidth="1.5" />
      {/* Scaffolding */}
      <line x1="15" y1="20" x2="15" y2="95" stroke="var(--yellow)" strokeWidth="2.5" />
      <line x1="105" y1="20" x2="105" y2="95" stroke="var(--yellow)" strokeWidth="2.5" />
      <line x1="15" y1="35" x2="105" y2="35" stroke="var(--yellow)" strokeWidth="2" />
      <line x1="15" y1="60" x2="105" y2="60" stroke="var(--yellow)" strokeWidth="2" />
      <line x1="15" y1="85" x2="105" y2="85" stroke="var(--yellow)" strokeWidth="2" />
      {/* Cross braces */}
      <line x1="15" y1="35" x2="105" y2="60" stroke="var(--yellow)" strokeWidth="1.5" opacity="0.5" />
      <line x1="105" y1="35" x2="15" y2="60" stroke="var(--yellow)" strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}

/* ── SVG: COMMERCIAL FIT-OUT ──────────────────────────── */
function CommercialFitOutSvg() {
  return (
    <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[120px]">
      {/* Tall building */}
      <rect x="30" y="10" width="60" height="85" fill="var(--ink)" stroke="var(--yellow)" strokeWidth="2.5" />
      {/* Windows grid */}
      <rect x="38" y="18" width="12" height="10" fill="var(--yellow)" opacity="0.4" stroke="var(--yellow)" strokeWidth="1.5" />
      <rect x="54" y="18" width="12" height="10" fill="var(--yellow)" opacity="0.4" stroke="var(--yellow)" strokeWidth="1.5" />
      <rect x="70" y="18" width="12" height="10" fill="var(--yellow)" opacity="0.4" stroke="var(--yellow)" strokeWidth="1.5" />
      <rect x="38" y="34" width="12" height="10" fill="var(--yellow)" opacity="0.4" stroke="var(--yellow)" strokeWidth="1.5" />
      <rect x="54" y="34" width="12" height="10" fill="var(--yellow)" opacity="0.4" stroke="var(--yellow)" strokeWidth="1.5" />
      <rect x="70" y="34" width="12" height="10" fill="var(--yellow)" opacity="0.4" stroke="var(--yellow)" strokeWidth="1.5" />
      <rect x="38" y="50" width="12" height="10" fill="var(--yellow)" opacity="0.4" stroke="var(--yellow)" strokeWidth="1.5" />
      <rect x="54" y="50" width="12" height="10" fill="var(--yellow)" opacity="0.4" stroke="var(--yellow)" strokeWidth="1.5" />
      <rect x="70" y="50" width="12" height="10" fill="var(--yellow)" opacity="0.4" stroke="var(--yellow)" strokeWidth="1.5" />
      {/* Signage */}
      <rect x="38" y="72" width="44" height="14" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="1.5" />
      <line x1="44" y1="79" x2="76" y2="79" stroke="var(--ink)" strokeWidth="2" />
      {/* Door */}
      <rect x="50" y="70" width="20" height="25" fill="var(--ink)" stroke="var(--yellow)" strokeWidth="1.5" />
    </svg>
  );
}

/* ── SVG: DISTRESSED PROPERTY ─────────────────────────── */
function DistressedPropertySvg() {
  return (
    <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[120px]">
      {/* House */}
      <rect x="20" y="40" width="80" height="55" fill="var(--ink)" stroke="var(--yellow)" strokeWidth="2.5" />
      <path d="M15 44 L60 10 L105 44" fill="none" stroke="var(--yellow)" strokeWidth="2.5" strokeLinejoin="round" />
      {/* Broken window */}
      <rect x="32" y="50" width="22" height="18" fill="var(--yellow)" opacity="0.3" stroke="var(--yellow)" strokeWidth="1.5" />
      <line x1="32" y1="50" x2="54" y2="68" stroke="var(--yellow)" strokeWidth="1.5" />
      <line x1="54" y1="50" x2="32" y2="68" stroke="var(--yellow)" strokeWidth="1.5" />
      {/* Door */}
      <rect x="62" y="55" width="20" height="40" fill="var(--yellow)" opacity="0.5" stroke="var(--yellow)" strokeWidth="1.5" />
      {/* Warning tape */}
      <line x1="10" y1="95" x2="110" y2="95" stroke="var(--yellow)" strokeWidth="3" />
      <line x1="10" y1="95" x2="25" y2="88" stroke="var(--yellow)" strokeWidth="2" />
      <line x1="25" y1="95" x2="40" y2="88" stroke="var(--yellow)" strokeWidth="2" />
      <line x1="40" y1="95" x2="55" y2="88" stroke="var(--yellow)" strokeWidth="2" />
      <line x1="55" y1="95" x2="70" y2="88" stroke="var(--yellow)" strokeWidth="2" />
      <line x1="70" y1="95" x2="85" y2="88" stroke="var(--yellow)" strokeWidth="2" />
      <line x1="85" y1="95" x2="100" y2="88" stroke="var(--yellow)" strokeWidth="2" />
      <line x1="100" y1="95" x2="110" y2="88" stroke="var(--yellow)" strokeWidth="2" />
    </svg>
  );
}

/* ── SVG: UK SOURCE MAP ──────────────────────────────── */
function UkSourceMapSvg() {
  return (
    <svg viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-lg mx-auto">
      {/* Simplified UK outline */}
      <path
        d="M250 30 C240 30 230 40 225 55 C220 70 215 80 210 95 C205 110 195 120 190 140 C185 155 180 170 175 185 C170 200 165 215 170 230 C175 245 180 260 185 275 C190 290 195 305 200 320 C205 335 210 345 220 355 C230 365 240 370 250 370 C260 370 270 365 280 355 C290 345 295 335 300 320 C305 305 310 290 315 275 C320 260 325 245 330 230 C335 215 330 200 325 185 C320 170 315 155 310 140 C305 125 295 110 290 95 C285 80 275 65 270 55 C265 45 260 30 250 30 Z"
        fill="var(--ink)"
        stroke="var(--yellow)"
        strokeWidth="2.5"
      />
      {/* Data pins */}
      {/* London - Planning */}
      <circle cx="270" cy="260" r="10" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="2" />
      <FileText className="absolute" style={{ display: 'none' }} />
      <text x="270" y="264" textAnchor="middle" fill="var(--ink)" fontSize="10" fontWeight="800" fontFamily="Barlow Condensed, sans-serif">P</text>

      {/* Manchester - Procurement */}
      <circle cx="240" cy="170" r="10" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="2" />
      <text x="240" y="174" textAnchor="middle" fill="var(--ink)" fontSize="10" fontWeight="800" fontFamily="Barlow Condensed, sans-serif">Pr</text>

      {/* Birmingham - Property */}
      <circle cx="255" cy="220" r="10" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="2" />
      <text x="255" y="224" textAnchor="middle" fill="var(--ink)" fontSize="10" fontWeight="800" fontFamily="Barlow Condensed, sans-serif">Pr</text>

      {/* Edinburgh - Site Activity */}
      <circle cx="230" cy="80" r="10" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="2" />
      <text x="230" y="84" textAnchor="middle" fill="var(--ink)" fontSize="10" fontWeight="800" fontFamily="Barlow Condensed, sans-serif">S</text>

      {/* Bristol - Commercial */}
      <circle cx="220" cy="240" r="10" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="2" />
      <text x="220" y="244" textAnchor="middle" fill="var(--ink)" fontSize="10" fontWeight="800" fontFamily="Barlow Condensed, sans-serif">C</text>

      {/* Leeds - Triggers */}
      <circle cx="235" cy="155" r="10" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="2" />
      <text x="235" y="159" textAnchor="middle" fill="var(--ink)" fontSize="10" fontWeight="800" fontFamily="Barlow Condensed, sans-serif">T</text>

      {/* Connection lines from pins to center */}
      <line x1="270" y1="260" x2="250" y2="200" stroke="var(--yellow)" strokeWidth="1" opacity="0.3" strokeDasharray="3 3" />
      <line x1="240" y1="170" x2="250" y2="200" stroke="var(--yellow)" strokeWidth="1" opacity="0.3" strokeDasharray="3 3" />
      <line x1="255" y1="220" x2="250" y2="200" stroke="var(--yellow)" strokeWidth="1" opacity="0.3" strokeDasharray="3 3" />
      <line x1="230" y1="80" x2="250" y2="200" stroke="var(--yellow)" strokeWidth="1" opacity="0.3" strokeDasharray="3 3" />
      <line x1="220" y1="240" x2="250" y2="200" stroke="var(--yellow)" strokeWidth="1" opacity="0.3" strokeDasharray="3 3" />
      <line x1="235" y1="155" x2="250" y2="200" stroke="var(--yellow)" strokeWidth="1" opacity="0.3" strokeDasharray="3 3" />

      {/* Center hub */}
      <circle cx="250" cy="200" r="14" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="2.5" />
      <text x="250" y="205" textAnchor="middle" fill="var(--ink)" fontSize="11" fontWeight="900" fontFamily="Barlow Condensed, sans-serif">JF</text>

      {/* Labels */}
      <text x="290" y="265" fill="var(--yellow)" fontSize="11" fontWeight="700" fontFamily="Barlow Condensed, sans-serif">Planning</text>
      <text x="260" y="175" fill="var(--yellow)" fontSize="11" fontWeight="700" fontFamily="Barlow Condensed, sans-serif">Procurement</text>
      <text x="275" y="225" fill="var(--yellow)" fontSize="11" fontWeight="700" fontFamily="Barlow Condensed, sans-serif">Property</text>
      <text x="250" y="78" fill="var(--yellow)" fontSize="11" fontWeight="700" fontFamily="Barlow Condensed, sans-serif">Site Activity</text>
      <text x="170" y="245" fill="var(--yellow)" fontSize="11" fontWeight="700" fontFamily="Barlow Condensed, sans-serif">Commercial</text>
      <text x="255" y="152" fill="var(--yellow)" fontSize="11" fontWeight="700" fontFamily="Barlow Condensed, sans-serif">Triggers</text>
    </svg>
  );
}

/* ── SVG: DELIVERY LOOP CIRCULAR ─────────────────────── */
function DeliveryLoopSvg() {
  return (
    <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm mx-auto">
      {/* Circular path */}
      <circle cx="200" cy="200" r="140" stroke="var(--yellow)" strokeWidth="3" opacity="0.3" />
      {/* Arrow indicators on circle */}
      <path d="M200 60 L210 75 L190 75 Z" fill="var(--yellow)" opacity="0.6" />
      <path d="M340 200 L325 210 L325 190 Z" fill="var(--yellow)" opacity="0.6" />
      <path d="M200 340 L190 325 L210 325 Z" fill="var(--yellow)" opacity="0.6" />
      <path d="M60 200 L75 190 L75 210 Z" fill="var(--yellow)" opacity="0.6" />

      {/* Step 1: Signal detected - top */}
      <circle cx="200" cy="60" r="36" fill="var(--ink)" stroke="var(--yellow)" strokeWidth="3" />
      <text x="200" y="55" textAnchor="middle" fill="var(--yellow)" fontSize="20" fontWeight="900" fontFamily="Barlow Condensed, sans-serif">
        &#x1F4E1;
      </text>
      <text x="200" y="72" textAnchor="middle" fill="var(--paper)" fontSize="8" fontWeight="700" fontFamily="Barlow Condensed, sans-serif">SIGNAL</text>

      {/* Step 2: Lead scored - right */}
      <circle cx="340" cy="200" r="36" fill="var(--ink)" stroke="var(--yellow)" strokeWidth="3" />
      <text x="340" y="195" textAnchor="middle" fill="var(--yellow)" fontSize="20" fontWeight="900" fontFamily="Barlow Condensed, sans-serif">
        &#x1F3AF;
      </text>
      <text x="340" y="212" textAnchor="middle" fill="var(--paper)" fontSize="8" fontWeight="700" fontFamily="Barlow Condensed, sans-serif">SCORED</text>

      {/* Step 3: Delivered - bottom */}
      <circle cx="200" cy="340" r="36" fill="var(--ink)" stroke="var(--yellow)" strokeWidth="3" />
      <text x="200" y="335" textAnchor="middle" fill="var(--yellow)" fontSize="20" fontWeight="900" fontFamily="Barlow Condensed, sans-serif">
        &#x1F4F1;
      </text>
      <text x="200" y="352" textAnchor="middle" fill="var(--paper)" fontSize="8" fontWeight="700" fontFamily="Barlow Condensed, sans-serif">DELIVERED</text>

      {/* Step 4: You close it - left */}
      <circle cx="60" cy="200" r="36" fill="var(--ink)" stroke="var(--yellow)" strokeWidth="3" />
      <text x="60" y="195" textAnchor="middle" fill="var(--yellow)" fontSize="20" fontWeight="900" fontFamily="Barlow Condensed, sans-serif">
        &#x2705;
      </text>
      <text x="60" y="212" textAnchor="middle" fill="var(--paper)" fontSize="8" fontWeight="700" fontFamily="Barlow Condensed, sans-serif">CLOSED</text>

      {/* Center label */}
      <text x="200" y="195" textAnchor="middle" fill="var(--yellow)" fontSize="14" fontWeight="900" fontFamily="Barlow Condensed, sans-serif">LOOP</text>
      <text x="200" y="212" textAnchor="middle" fill="var(--yellow)" fontSize="10" fontWeight="700" fontFamily="Barlow Condensed, sans-serif" opacity="0.7">GETS TIGHTER</text>
    </svg>
  );
}

/* ── SVG: REACTIVE VS PROACTIVE ──────────────────────── */
function ReactiveProactiveSvg() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Reactive side */}
      <div className="ops-panel p-5 bg-white">
        <div className="flex items-center gap-3 mb-4">
          <svg viewBox="0 0 60 60" fill="none" className="w-14 h-14 shrink-0">
            {/* Frustrated person */}
            <circle cx="30" cy="18" r="10" fill="none" stroke="var(--muted)" strokeWidth="2.5" />
            {/* Frown */}
            <path d="M24 22 Q30 18 36 22" fill="none" stroke="var(--muted)" strokeWidth="2" />
            {/* Eyes - worried */}
            <circle cx="26" cy="16" r="1.5" fill="var(--muted)" />
            <circle cx="34" cy="16" r="1.5" fill="var(--muted)" />
            {/* Body */}
            <line x1="30" y1="28" x2="30" y2="45" stroke="var(--muted)" strokeWidth="2.5" />
            <line x1="30" y1="35" x2="20" y2="42" stroke="var(--muted)" strokeWidth="2.5" />
            <line x1="30" y1="35" x2="40" y2="42" stroke="var(--muted)" strokeWidth="2.5" />
            <line x1="30" y1="45" x2="22" y2="55" stroke="var(--muted)" strokeWidth="2.5" />
            <line x1="30" y1="45" x2="38" y2="55" stroke="var(--muted)" strokeWidth="2.5" />
            {/* Phone with X */}
            <rect x="42" y="30" width="12" height="18" rx="2" fill="none" stroke="var(--muted)" strokeWidth="2" />
            <line x1="45" y1="36" x2="51" y2="42" stroke="var(--orange)" strokeWidth="2.5" />
            <line x1="51" y1="36" x2="45" y2="42" stroke="var(--orange)" strokeWidth="2.5" />
          </svg>
          <h3 className="headline text-2xl text-[var(--ink)]">Reactive: Belvoir / FixFlo</h3>
        </div>
        <ul className="grid gap-2">
          <li className="flex items-start gap-2 text-sm font-black text-[var(--muted)]">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[var(--muted)]" />
            Wait for tenant to report a problem
          </li>
          <li className="flex items-start gap-2 text-sm font-black text-[var(--muted)]">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[var(--muted)]" />
            Agent triages during office hours (Mon-Fri 9-5)
          </li>
          <li className="flex items-start gap-2 text-sm font-black text-[var(--muted)]">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[var(--muted)]" />
            Landlord approval takes days
          </li>
          <li className="flex items-start gap-2 text-sm font-black text-[var(--muted)]">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[var(--muted)]" />
            Trade gets assigned after the damage is done
          </li>
          <li className="flex items-start gap-2 text-sm font-black text-[var(--muted)]">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[var(--muted)]" />
            Shared with 4,000+ other contractors on FixFlo
          </li>
        </ul>
      </div>

      {/* Proactive side */}
      <div className="ops-panel p-5 bg-[var(--ink)] text-white">
        <div className="flex items-center gap-3 mb-4">
          <svg viewBox="0 0 60 60" fill="none" className="w-14 h-14 shrink-0">
            {/* Happy person */}
            <circle cx="30" cy="18" r="10" fill="none" stroke="var(--yellow)" strokeWidth="2.5" />
            {/* Smile */}
            <path d="M24 20 Q30 26 36 20" fill="none" stroke="var(--yellow)" strokeWidth="2" />
            {/* Eyes - happy */}
            <path d="M25 15 L27 14" fill="none" stroke="var(--yellow)" strokeWidth="2" strokeLinecap="round" />
            <path d="M33 14 L35 15" fill="none" stroke="var(--yellow)" strokeWidth="2" strokeLinecap="round" />
            {/* Body */}
            <line x1="30" y1="28" x2="30" y2="45" stroke="var(--yellow)" strokeWidth="2.5" />
            <line x1="30" y1="35" x2="20" y2="42" stroke="var(--yellow)" strokeWidth="2.5" />
            <line x1="30" y1="35" x2="40" y2="42" stroke="var(--yellow)" strokeWidth="2.5" />
            <line x1="30" y1="45" x2="22" y2="55" stroke="var(--yellow)" strokeWidth="2.5" />
            <line x1="30" y1="45" x2="38" y2="55" stroke="var(--yellow)" strokeWidth="2.5" />
            {/* Phone with notifications */}
            <rect x="42" y="28" width="12" height="18" rx="2" fill="none" stroke="var(--yellow)" strokeWidth="2" />
            {/* Notification dots */}
            <circle cx="54" cy="28" r="4" fill="var(--yellow)" />
            <circle cx="54" cy="28" r="2" fill="var(--ink)" />
            <circle cx="58" cy="24" r="3" fill="var(--yellow)" opacity="0.7" />
            <circle cx="58" cy="24" r="1.5" fill="var(--ink)" />
          </svg>
          <h3 className="headline text-2xl text-white">Proactive: JobFilter</h3>
        </div>
        <ul className="grid gap-2">
          <li className="flex items-start gap-2 text-sm font-bold text-white/80">
            <Zap className="mt-0.5 h-4 w-4 shrink-0 text-[var(--yellow)]" />
            Detect planning applications before approval
          </li>
          <li className="flex items-start gap-2 text-sm font-bold text-white/80">
            <Zap className="mt-0.5 h-4 w-4 shrink-0 text-[var(--yellow)]" />
            Flag low-rated properties as retrofit opportunities
          </li>
          <li className="flex items-start gap-2 text-sm font-bold text-white/80">
            <Zap className="mt-0.5 h-4 w-4 shrink-0 text-[var(--yellow)]" />
            Spot scaffold/skip permits = active work site
          </li>
          <li className="flex items-start gap-2 text-sm font-bold text-white/80">
            <Zap className="mt-0.5 h-4 w-4 shrink-0 text-[var(--yellow)]" />
            WhatsApp alert within minutes of signal detection
          </li>
          <li className="flex items-start gap-2 text-sm font-bold text-white/80">
            <Zap className="mt-0.5 h-4 w-4 shrink-0 text-[var(--yellow)]" />
            Exclusive to you — no shared lead lists
          </li>
        </ul>
      </div>
    </div>
  );
}

/* ── WHATSAPP BUBBLE ─────────────────────────────────── */
function WhatsAppMockup() {
  return (
    <div className="max-w-sm mx-auto">
      {/* Phone frame */}
      <div className="border-[3px] border-[var(--line)] bg-[#0b141a] rounded-[2px] shadow-[4px_4px_0_var(--line)] overflow-hidden">
        {/* Status bar */}
        <div className="bg-[#1f2c34] px-3 py-1.5 flex items-center justify-between">
          <span className="text-white/90 text-[10px] font-bold font-mono">9:41</span>
          <div className="flex gap-1">
            <div className="w-3 h-2 bg-white/40 rounded-sm" />
            <div className="w-3 h-2 bg-white/40 rounded-sm" />
            <div className="w-4 h-2 bg-white/40 rounded-sm" />
          </div>
        </div>
        {/* Chat header */}
        <div className="bg-[#1f2c34] px-3 py-2 flex items-center gap-2 border-b border-white/10">
          <div className="w-8 h-8 rounded-full bg-[var(--yellow)] flex items-center justify-center">
            <Radar className="h-4 w-4 text-[var(--ink)]" />
          </div>
          <div>
            <p className="text-white text-xs font-bold">JobFilter Signals</p>
            <p className="text-white/85 text-[10px]">online</p>
          </div>
        </div>
        {/* Messages */}
        <div className="px-3 py-3 space-y-2 min-h-[180px]">
          {/* Time stamp */}
          <p className="text-center text-white/30 text-[10px] font-bold">Today 14:32</p>
          {/* Gold lead message */}
          <div className="bg-[var(--yellow)] rounded-sm px-3 py-2 max-w-[85%] ml-auto shadow-[2px_2px_0_var(--ink)]">
            <p className="micro-label text-[var(--ink)] text-[9px]">GOLD LEAD</p>
            <p className="text-[var(--ink)] text-xs font-bold leading-snug mt-0.5">
              Planning approved for 2-storey extension in M20. Estimated value: 45k. Builder fit.
            </p>
            <p className="text-[var(--ink)]/90 text-[9px] mt-1 text-right">14:32</p>
          </div>
          {/* Second message */}
          <div className="bg-[var(--yellow)] rounded-sm px-3 py-2 max-w-[85%] ml-auto shadow-[2px_2px_0_var(--ink)]">
            <p className="micro-label text-[var(--ink)] text-[9px]">SIGNAL</p>
            <p className="text-[var(--ink)] text-xs font-bold leading-snug mt-0.5">
              Low-rated property, detached, M20 2AR. Retrofit opportunity. 3 bed, 95sqm.
            </p>
            <p className="text-[var(--ink)]/90 text-[9px] mt-1 text-right">14:33</p>
          </div>
          {/* Read receipt */}
          <div className="flex justify-end">
            <span className="text-[10px] text-[#53bdeb] font-bold">Delivered</span>
          </div>
        </div>
        {/* Input bar */}
        <div className="bg-[#1f2c34] px-3 py-2 flex items-center gap-2 border-t border-white/10">
          <div className="flex-1 bg-white/10 rounded-sm px-3 py-1.5">
            <span className="text-white/30 text-xs">Type a message...</span>
          </div>
          <div className="w-8 h-8 bg-[var(--yellow)] rounded-sm flex items-center justify-center">
            <Send className="h-4 w-4 text-[var(--ink)]" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── PAGE ────────────────────────────────────────────── */
export function BlueprintPage() {
  return (
    <main className="bg-[var(--paper)]">
      {/* ── HERO ──────────────────────────────────────── */}
      <section className="border-b-4 border-[var(--line)] bg-[var(--ink)] text-white relative overflow-hidden">
        {/* Grid pattern background */}
        <div className="absolute inset-0 map-grid opacity-30" />
        <div className="page-shell grid gap-8 py-12 lg:grid-cols-[1fr_420px] lg:items-center relative z-10">
          <div>
            <p className="micro-label text-[var(--yellow)]">BLUEPRINT</p>
            <h1 className="headline mt-4 max-w-5xl text-[clamp(46px,9vw,106px)] leading-[0.88] text-white">
              We find the work before it hits the bid boards.
            </h1>
            <p className="mt-5 max-w-2xl text-xl font-black leading-tight text-white/90 md:text-2xl">
              JobFilter scans verified UK construction signals — planning applications, permits, energy signals, streetworks, company activity — fuses them around each property, scores them for real job value, and delivers the best leads straight to your WhatsApp. No shared leads. No homeowner posts. Just early, exclusive signals routed to the right trade.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link className="jf-button jf-button-lg bg-[var(--yellow)] text-[var(--ink)]" href="/find-jobs">
                Scan a Patch <ArrowRight className="ml-1 inline h-5 w-5" />
              </Link>
              <Link className="jf-button jf-button-lg bg-white text-[var(--ink)]" href="/pricing">
                Get Early Access
              </Link>
            </div>
          </div>

          <div className="hidden lg:block">
            <PropertyRadarSvg />
          </div>
        </div>
      </section>

      {/* ── THE JOURNEY ───────────────────────────────── */}
      <section className="bg-[var(--ink)] text-white border-b-4 border-[var(--line)]">
        <div className="page-shell py-12">
          <p className="micro-label text-[var(--yellow)]">THE JOURNEY</p>
          <h2 className="headline mt-3 max-w-4xl text-[clamp(32px,6vw,64px)] leading-[0.9] text-white">
            Six layers. One job: get you the right work, early.
          </h2>

          {/* Timeline SVG */}
          <div className="mt-10">
            <JourneyTimelineSvg />
          </div>

          {/* Step cards */}
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pipelineSteps.map((step) => (
              <div
                key={step.num}
                className="border-2 border-white/20 bg-white/5 p-5"
              >
                <div className="flex items-center gap-3">
                  <span className="headline text-[var(--yellow)]">{step.num}</span>
                  <step.icon className="h-6 w-6 text-[var(--yellow)]" />
                  <span className="micro-label text-white">{step.label}</span>
                </div>
                <p className="mt-3 text-sm font-bold leading-relaxed text-white/90">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REACTIVE VS PROACTIVE ─────────────────────── */}
      <section className="bg-[var(--paper)] border-y-4 border-[var(--line)]">
        <div className="page-shell py-12">
          <p className="micro-label text-[var(--orange)]">THE COMPETITION WAITS. WE DO NOT.</p>
          <h2 className="headline mt-3 max-w-4xl text-[clamp(32px,6vw,64px)] leading-[0.9] text-[var(--ink)]">
            Reactive maintenance apps are slow. Signal intelligence is early.
          </h2>
          <p className="mt-4 max-w-3xl text-lg font-black leading-snug text-[var(--muted)]">
            Belvoir Maintenance and FixFlo dominate the UK rental maintenance market. But both are purely reactive: tenant reports a problem, the agent triages it, the landlord approves it, then a trade gets assigned. By the time you see the job, three other trades have already quoted. JobFilter works backwards from the official record — detecting work before anyone reports it.
          </p>
          <div className="mt-8">
            <ReactiveProactiveSvg />
          </div>
          <p className="mt-6 text-sm font-black text-[var(--muted)]">
            The 29.7 billion UK rental maintenance market operates on reactive workflows. JobFilter shifts the paradigm: detect the need before the tenant complains, quote before the competition knows the job exists.
          </p>
        </div>
      </section>

      {/* ── SIGNAL FUSION ─────────────────────────────── */}
      <section className="border-y-4 border-[var(--line)] bg-[var(--yellow)]">
        <div className="page-shell py-12">
          <p className="micro-label text-[var(--ink)]">SIGNAL FUSION</p>
          <h2 className="headline mt-3 max-w-4xl text-[clamp(32px,6vw,64px)] leading-[0.9] text-[var(--ink)]">
            Single signals are easy. Fusion is the moat.
          </h2>
          <p className="mt-4 max-w-3xl text-lg font-black leading-snug text-[var(--ink)]">
            A planning application on its own tells you almost nothing. A planning application plus low energy rating, recent sale, scaffold permit, affluent postcode, and solar orientation is a money signal competitors cannot cheaply copy.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {fusionStacks.map((stack, i) => (
              <div
                key={stack.title}
                className="ops-panel p-5"
              >
                <div className="flex items-center gap-3">
                  {/* Property type SVGs */}
                  {i === 0 && <HomeownerRetrofitSvg />}
                  {i === 1 && <ActiveSiteSvg />}
                  {i === 2 && <CommercialFitOutSvg />}
                  {i === 3 && <DistressedPropertySvg />}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <stack.icon className="h-6 w-6 text-[var(--ink)]" />
                      <h3 className="headline text-2xl text-[var(--ink)]">{stack.title}</h3>
                    </div>
                  </div>
                </div>
                <ul className="mt-3 grid gap-1.5">
                  {stack.signals.map((s) => (
                    <li key={s} className="flex items-start gap-2 text-sm font-black text-[var(--ink)]">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[var(--ink)]" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SIGNAL SCOREBOARD ─────────────────────────── */}
      <section className="bg-[var(--paper)]">
        <div className="page-shell py-12">
          <p className="micro-label text-[var(--yellow)]">SCOREBOARD</p>
          <h2 className="headline mt-3 max-w-4xl text-[clamp(32px,6vw,64px)] leading-[0.9] text-[var(--ink)]">
            What we scan. What it costs us. What it earns you.
          </h2>
          <div className="mt-8 grid gap-4">
            {signalScores.map((row) => (
              <div
                key={row.name}
                className="ops-panel p-5"
              >
                <h3 className="headline text-xl text-[var(--ink)]">{row.name}</h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                  <ScoreLabel label="Cost to us" value={row.cost} />
                  <ScoreLabel label="Ease" value={row.ease} />
                  <ScoreLabel label="Lead quality" value={row.quality} />
                  <ScoreLabel label="Speed" value={row.speed} />
                  <ScoreLabel label="Moat" value={row.moat} />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm font-black text-[var(--muted)]">
            We do not chase every source at once. We build one reliable path, score it well, then add fusion.
          </p>
        </div>
      </section>

      {/* ── DATA SOURCES ──────────────────────────────── */}
      <section className="bg-[var(--ink)] text-white">
        <div className="page-shell py-12">
          <p className="micro-label text-[var(--yellow)]">DATA SOURCES</p>
          <h2 className="headline mt-3 max-w-4xl text-[clamp(32px,6vw,64px)] leading-[0.9] text-white">
            Official data first.
          </h2>
          <p className="mt-4 max-w-3xl text-lg font-black leading-snug text-white/90">
            Every connector runs on a schedule. No manual searches. No missed filings.
          </p>

          {/* UK Source Map */}
          <div className="mt-8">
            <UkSourceMapSvg />
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dataSources.map((src) => (
              <div
                key={src.category}
                className="border-2 border-white/20 bg-white/5 p-5"
              >
                <div className="flex items-center gap-2">
                  <src.icon className="h-5 w-5 text-[var(--yellow)]" />
                  <h3 className="micro-label text-[var(--yellow)]">{src.category}</h3>
                </div>
                <ul className="mt-3 grid gap-1">
                  {src.items.map((item) => (
                    <li key={item} className="text-sm font-bold text-white/90">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DELIVERY LOOP ─────────────────────────────── */}
      <section className="bg-[var(--paper)]">
        <div className="page-shell py-12">
          <p className="micro-label text-[var(--yellow)]">DELIVERY</p>
          <h2 className="headline mt-3 max-w-4xl text-[clamp(32px,6vw,64px)] leading-[0.9] text-[var(--ink)]">
            From signal to signed job.
          </h2>

          {/* Circular diagram */}
          <div className="mt-8">
            <DeliveryLoopSvg />
          </div>

          {/* Step cards */}
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {deliverySteps.map((step, i) => (
              <div
                key={step.title}
                className="ops-panel p-5"
              >
                <div className="flex items-center gap-2">
                  <span className="headline text-[var(--yellow)]">{String(i + 1).padStart(2, '0')}</span>
                  <step.icon className="h-5 w-5 text-[var(--ink)]" />
                </div>
                <h3 className="mt-2 headline text-xl text-[var(--ink)]">{step.title}</h3>
                <p className="mt-2 text-sm font-bold leading-relaxed text-[var(--muted)]">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST / PROOF ──────────────────────────────── */}
      <section className="bg-[var(--ink)] text-white border-y-4 border-[var(--line)]">
        <div className="page-shell py-12">
          <p className="micro-label text-[var(--yellow)]">SEE IT IN ACTION</p>
          <h2 className="headline mt-3 max-w-4xl text-[clamp(32px,6vw,64px)] leading-[0.9] text-white">
            This is what a gold lead looks like.
          </h2>
          <p className="mt-4 max-w-3xl text-lg font-black leading-snug text-white/90">
            Real signals, delivered in real time, to the right trade. No noise. No shared leads. Just the work that matters.
          </p>
          <div className="mt-8">
            <WhatsAppMockup />
          </div>
        </div>
      </section>

      {/* ── AUDIENCE / OUTCOMES ────────────────────────── */}
      <section className="bg-[var(--paper)]">
        <div className="page-shell py-12">
          <p className="micro-label text-[var(--yellow)]">WHO IT SERVES</p>
          <h2 className="headline mt-3 max-w-4xl text-[clamp(32px,6vw,64px)] leading-[0.9] text-[var(--ink)]">
            Built for trades who want to own their patch.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {audienceCards.map((card) => (
              <div
                key={card.title}
                className="ops-panel p-5"
              >
                <card.icon className="h-8 w-8 text-[var(--yellow)]" />
                <h3 className="mt-3 headline text-2xl text-[var(--ink)]">{card.title}</h3>
                <p className="mt-2 text-sm font-bold leading-relaxed text-[var(--muted)]">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────── */}
      <section className="border-y-4 border-[var(--line)] bg-[var(--yellow)] relative overflow-hidden">
        {/* Diagonal line pattern */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              var(--ink) 0px,
              var(--ink) 2px,
              transparent 2px,
              transparent 20px
            )`,
          }}
        />
        <div className="page-shell py-12 text-center relative z-10">
          <h2 className="headline max-w-3xl mx-auto text-[clamp(32px,6vw,64px)] leading-[0.9] text-[var(--ink)]">
            See what your patch looks like.
          </h2>
          <p className="mt-4 text-lg font-black text-[var(--ink)]">
            Run a free postcode scan. No signup required.
          </p>
          <div className="mt-6">
            <Link className="jf-button jf-button-lg bg-[var(--ink)] text-[var(--yellow)]" href="/find-jobs">
              Scan a Patch <ArrowRight className="ml-1 inline h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ── SCORE LABEL SUB-COMPONENT ───────────────────────── */
function ScoreLabel({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <p className="micro-label text-[var(--muted)]">{label}</p>
      <ScoreBar value={value} />
    </div>
  );
}