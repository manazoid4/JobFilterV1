"use client";
import { TradePage, type TradePageData } from '../components/TradePage';

const data: TradePageData = {
  slug: 'scaffolders',
  trade: 'Scaffolders',
  tradePlural: 'Scaffolding Contractors',
  headline: 'How Scaffolders Win Jobs From',
  highlightedPhrase: 'Planning Approvals',
  sub: 'Every extension, every loft conversion, every re-roof, every new build — they all need scaffold. Planning approvals fire weeks before the build starts. JobFilter scans 400+ councils and flags every approved project that needs scaffolding before the main contractor has called anyone for a quote.',
  painPoints: [
    ['Scaffold work goes to whoever the builder calls first', 'Builders have a scaffold firm they always ring. Unless you\'re already in their phone, you\'re not getting the call — even when there\'s a job starting on your doorstep.'],
    ['You find out about jobs when it\'s already urgent', 'A roofer calls needing scaffold up by Monday. You\'re either busy or scrambling to fit it in. You need to know about jobs weeks in advance, not the Friday before.'],
    ['New build site contracts go to the developer\'s framework', 'Large residential and commercial new build sites allocate scaffold contracts months before work starts. By the time you see the site hoarding go up, the contract is already placed.'],
    ['Extension and loft conversion volume is invisible', 'Hundreds of extensions and loft conversions are approved every week across every region. Every single one needs scaffold. But that demand sits in planning portals — no job board captures it.'],
  ],
  stats: [
    ['£500-£3,000/week', 'Average scaffold hire value by project type'],
    ['3,500+', 'Planning approvals per week include scaffolding requirements'],
    ['400+', 'Councils scanned for extension, loft, and new build approvals'],
    ['8-12 weeks', 'Typical scaffold hire duration on a loft or extension project'],
  ],
  signals: [
    ['Planning applications', 'Extensions, loft conversions, re-roofs, and new builds all require scaffold. We scan 400+ councils and flag approvals that need scaffolding — with estimated project duration and hire value.'],
    ['New build site approvals', 'Residential and commercial new build planning approvals are flagged with unit count, build programme estimate, and anticipated scaffold contract value — giving you time to approach the developer before the tender.'],
    ['Roofing and cladding signals', 'Re-roofing planning notifications, cladding replacement schemes, and chimney works all require scaffold access. Flagged alongside planning signals with urgency and estimated duration.'],
  ],
  howItWorks: [
    ['01', 'Enter your postcode', 'Tell us where you operate. We scan planning approvals, new build notifications, and roofing and cladding signals within your working radius.'],
    ['02', 'Scaffold signals get scored', 'Three-storey extensions, dormer conversions, new build sites, re-roofs — each scored by estimated hire value, duration, and how close to start date the project is.'],
    ['03', 'Gold leads fire to WhatsApp', 'A three-storey extension approved in your area is 8 weeks of scaffold hire at £2,400-£4,800. You get the alert before the builder has booked anyone.'],
  ],
  tradeLeadExample: {
    title: 'Three-storey extension approved — scaffold required for 8 weeks',
    rows: [
      ['Trade', 'Scaffold Contractor'],
      ['Area', 'LS6 / Leeds North West'],
      ['Value', '£2,400-£4,800 scaffold hire (8 weeks)'],
      ['Urgency', 'Planning approved 6 days ago — build starts ~6 weeks'],
      ['Signal type', 'Verified planning signal — 91% confidence'],
      ['Signal', 'Three-storey side and rear extension approved — full scaffold package required for 8-week build programme'],
    ],
    tags: ['Verified signal', 'Recurring hire', 'Free preview'],
  },
  whatsappMessage: `GOLD LEAD — Scaffolding Contractor
Area: LS6 / Leeds North West
Value: £2,400-£4,800 scaffold hire — 8 weeks
Urgency: Planning approved 6 days ago — build starts ~6 weeks
Why it matters: Three-storey extension — full scaffold package required
Action: Open notice → jobfilter.uk/lead/scf612`,
  comparisonOld: [
    'Rely on builder relationships built over years — miss everything outside your network',
    'Find out about jobs when it\'s Friday before a Monday start',
    'New build site scaffold contracts placed months before you see the hoarding',
    'Extension and loft volume invisible — planning portals unread',
    'Compete on day rate with every other scaffold firm in the area',
    'Can\'t plan labour, equipment, or tube availability without a pipeline',
  ],
  comparisonNew: [
    '£39/month founder — all scaffold signals, unlimited planning scans',
    'Extension and loft approvals flagged weeks before the build starts',
    'New build site approvals identified at planning stage for early tendering',
    'Estimated hire duration and value shown before you make the call',
    'WhatsApp alerts within minutes of planning approval',
    'No contracts. Cancel anytime. 30-day guarantee',
  ],
  ctaPostcode: 'LS6',
  metaTitle: 'How Scaffolders Win Jobs From Planning Approvals — JobFilter',
  metaDescription: 'JobFilter scans planning applications across 400+ councils for scaffolding opportunities. Extensions, loft conversions, new builds, re-roofs — Gold leads sent to WhatsApp. Free scan for scaffolding contractors.',
};

export function TradeScaffolders() {
  return <TradePage data={data} />;
}
