"use client";
import { TradePage, type TradePageData } from '../components/TradePage';

const data: TradePageData = {
  slug: 'structural-engineers',
  trade: 'Structural Engineers',
  tradePlural: 'Structural Engineers',
  headline: 'How Structural Engineers Win Commissions From',
  highlightedPhrase: 'Planning Applications',
  sub: 'Every loft conversion, every extension with knocked walls, every basement dig — they all need structural calculations. Planning data fires the moment approval is granted, weeks before the homeowner starts searching for a structural engineer. JobFilter scans 400+ councils and flags every approved project that needs structural input before the client even knows to look.',
  painPoints: [
    ['Clients find structural engineers at the last minute', 'A homeowner gets planning approved, starts their loft conversion, and only calls a structural engineer when the builder says they need calcs — often days before the steels need to be ordered. You\'re brought in late with no time to do the job properly.'],
    ['Word of mouth is unpredictable', 'Most structural engineering commissions come via architect or builder referral. That network takes years to build and can go quiet overnight. You need a way to find projects before they\'ve even appointed an architect.'],
    ['Loft conversions and extensions are invisible demand', 'Hundreds of loft conversions and extensions get planning approved every week. Every single one needs structural calcs. But no platform tracks this demand — it sits in planning portals, unread.'],
    ['Basement projects are high-value but hard to find', 'Basement conversions and underpinning projects are among the highest-fee structural commissions available — but they\'re buried in planning applications as change-of-use or extension notices with no clear signal.'],
  ],
  stats: [
    ['100,000+', 'Structural engineering commissions per year in the UK'],
    ['£500-£3,000', 'Average structural engineer fee per residential project'],
    ['400+', 'Councils scanned for loft, extension, and basement planning signals'],
    ['Every loft conversion', 'legally requires structural calcs — no exceptions'],
  ],
  signals: [
    ['Planning applications', 'Loft conversions, extensions, basement conversions, and any project involving knocked walls or altered structure all need structural calculations. We flag these at planning approval — before the client starts looking for an engineer.'],
    ['Dormer and mansard applications', 'Dormer additions and mansard roof conversions require structural input at both design and construction stage. Planning approval is the trigger — flagged with property type, size, and estimated fee.'],
    ['Extension and knock-through signals', 'Single and double-storey extensions requiring load-bearing wall removal are flagged by job type, location, and likely fee. These are short-timeline commissions where being first means getting the job.'],
  ],
  howItWorks: [
    ['01', 'Enter your postcode', 'Tell us where you practice. We scan loft conversion, extension, basement, and structural alteration planning approvals within your working radius.'],
    ['02', 'Structural signals get scored', 'Dormer approvals, double extensions with wall removal, basement conversions — each scored by estimated fee, complexity, and urgency.'],
    ['03', 'Gold leads fire to WhatsApp', 'A dormer loft conversion approved in your area is an £800-£1,800 structural calcs commission. You get the alert the day planning is granted — before the homeowner even calls a builder.'],
  ],
  tradeLeadExample: {
    title: 'Dormer loft conversion approved — structural calcs required',
    rows: [
      ['Trade', 'Structural Engineer'],
      ['Area', 'SW15 / Putney, London'],
      ['Value', '£800-£1,800 structural engineering fee'],
      ['Urgency', 'Planning approved 7 days ago'],
      ['Signal type', 'Verified planning signal — 96% confidence'],
      ['Signal', 'Hip-to-gable dormer loft conversion approved — structural calculations required for ridge beam, dormer frame, and floor strengthening'],
    ],
    tags: ['Verified signal', 'High value', 'Free preview'],
  },
  whatsappMessage: `GOLD LEAD — Structural Engineer
Area: SW15 / Putney, London
Value: £800-£1,800 structural engineering fee
Urgency: Planning approved 7 days ago
Why it matters: Dormer loft conversion — structural calcs required for ridge beam and floor
Action: Open notice → jobfilter.uk/lead/str109`,
  comparisonOld: [
    'Depend on architect and builder referrals — network takes years to build',
    'Clients call you when the build has already started and they need calcs yesterday',
    'No visibility into loft and extension planning approvals in your area',
    'Miss basement and underpinning commissions — buried in planning portals',
    'Compete with every other structural engineer when the homeowner finally searches online',
    'No forward pipeline — can\'t plan capacity or staff utilisation',
  ],
  comparisonNew: [
    '£39/month founder — all structural signals, unlimited area scans',
    'Loft conversion and extension approvals flagged the day planning is granted',
    'Dormer, basement, and wall-removal projects prioritised by fee value',
    'You\'re first contact — before the homeowner has appointed a builder',
    'WhatsApp alerts within minutes of relevant planning approval',
    'No contracts. Cancel anytime. 30-day guarantee',
  ],
  ctaPostcode: 'SW15',
  metaTitle: 'How Structural Engineers Win Commissions From Planning Applications — JobFilter',
  addOns: [
    { slug: 'calc-pack', title: 'CALC PACK', tagline: 'Residential structural calcs, beam specs and scope letters — delivered in 6 hours.' },
  ],
  metaDescription: 'JobFilter scans planning applications across 400+ councils for structural engineering commissions. Loft conversions, extensions, basements — Gold leads sent to WhatsApp. Free scan for structural engineers.',
};

export function TradeStructuralEngineers() {
  return <TradePage data={data} />;
}
