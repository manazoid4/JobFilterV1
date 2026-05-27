"use client";
import { TradePage, type TradePageData } from '../components/TradePage';

const data: TradePageData = {
  slug: 'solar-pv-installers',
  trade: 'Solar PV Installers',
  tradePlural: 'Solar PV Installers',
  headline: 'How Solar Installers Find Rooftops Ready For',
  highlightedPhrase: 'Panels',
  sub: 'South-facing roofs on new extensions, EPC C-band properties pushed toward solar, and new estate planning approvals — all visible in planning data before the homeowner starts Googling installers. JobFilter scans 400+ councils and flags solar-ready properties before your competition knows they exist.',
  painPoints: [
    ['Leads go to comparison sites first', 'Homeowners visit comparison platforms and get four or five solar quotes within hours. You\'re competing on price with every other installer in your region before you\'ve even spoken to them.'],
    ['New build estates are invisible', 'A planning approval for a 60-unit estate in your area means 60 potential solar installs — but no installer hears about it until the developer puts the contract out to tender late in the build.'],
    ['EPC-driven demand is hard to track', 'Properties rated EPC D or below are prime solar candidates. Energy performance data is public, but cross-referencing it with location and ownership to find warm leads takes hours most installers don\'t have.'],
    ['Energy cost pressure creates demand but no direction', 'Homeowners researching solar because of energy bills start on comparison sites, not by calling local installers. You need to be in front of them before they reach that comparison page.'],
  ],
  stats: [
    ['350,000+', 'Solar installs per year across the UK'],
    ['£6k-£12k', 'Average residential solar installation value'],
    ['3+', 'Signal types cross-referenced per solar lead'],
    ['400+', 'Councils scanned for planning and EPC signals'],
  ],
  signals: [
    ['Planning applications', 'Extension approvals with south-facing roof additions, new build estates, and loft conversions all represent solar installation opportunities. We flag them at approval — weeks before the homeowner starts researching.'],
    ['EPC energy signals', 'Properties rated EPC D and below near the C threshold are prime retrofit targets. Cross-referenced with property age, roof type, and ownership signals to identify homeowners most likely to invest in solar this year.'],
    ['New estate completions', 'Residential planning approvals for 10+ units flag entire streets of potential solar customers before the first brick is laid. Early contact means you can tender for the whole estate, not just individual installs.'],
  ],
  howItWorks: [
    ['01', 'Enter your postcode', 'Tell us where you operate. We scan planning approvals, EPC data, and new build completions within your working radius for solar-relevant signals.'],
    ['02', 'Solar signals get scored', 'South-facing roof extensions, EPC-flagged properties, new estate approvals — each scored by value, urgency, and installation likelihood before it reaches you.'],
    ['03', 'Gold leads fire to WhatsApp', 'A 45-unit new build approved in your area or an EPC-flagged property cluster? That\'s a solar pipeline worth £270k-£495k. You get the alert before anyone else pitches the developer.'],
  ],
  tradeLeadExample: {
    title: 'New extension — south-facing roof, solar-ready',
    rows: [
      ['Trade', 'Solar PV Installation'],
      ['Area', 'B30 / Birmingham South'],
      ['Value', '£7k-£11k solar installation'],
      ['Urgency', 'Extension approved 8 days ago'],
      ['Signal type', 'Verified planning signal — 91% confidence'],
      ['Signal', 'Single-storey rear extension, south-facing roof addition, EPC D rating on existing property'],
    ],
    tags: ['Verified signal', 'High value', 'Free preview'],
  },
  whatsappMessage: `GOLD LEAD — Solar PV
Area: B30 / Birmingham South
Value: £7k-£11k solar installation
Urgency: Extension approved 8 days ago
Why it matters: South-facing roof added, existing EPC D — prime solar candidate
Action: Open notice → jobfilter.uk/lead/sol482`,
  comparisonOld: [
    'Pay for leads on comparison platforms — shared with 4-5 other installers',
    'Cold-call EPC lists with no ownership or timing context',
    'Miss new build estate contracts because you hear about them too late',
    'Compete on price with national solar chains on every enquiry',
    'No visibility into planning-approved extensions ready for solar',
    'Reactive pipeline — boom and bust with energy news cycles',
  ],
  comparisonNew: [
    '£39/month founder — all solar signals, unlimited area scans',
    'No shared auction — signal goes to you before it hits comparison sites',
    'New build estate approvals flagged before developer tenders the contract',
    'EPC signals cross-referenced with planning to find warm leads',
    'WhatsApp alerts within minutes of planning approval or EPC data update',
    'No contracts. Cancel anytime. 30-day guarantee',
  ],
  ctaPostcode: 'B30',
  metaTitle: 'How Solar PV Installers Find Rooftops Ready For Panels — JobFilter',
  addOns: [
    { slug: 'dno-brief', title: 'DNO BRIEF', tagline: 'Grid connection application pack — pre-filled for your DNO area.' },
    { slug: 'ozev-grant-pack', title: 'OZEV GRANT PACK', tagline: 'Close more solar jobs with OZEV and grant paperwork sorted for the customer.' },
  ],
  metaDescription: 'JobFilter scans planning applications and EPC data across 400+ councils for solar installation opportunities. New builds, extensions, EPC-flagged properties — Gold leads sent to WhatsApp. Free scan for solar installers.',
};

export function TradeSolar() {
  return <TradePage data={data} />;
}
