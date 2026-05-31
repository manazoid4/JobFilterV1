"use client";
import { TradePage, type TradePageData } from '../components/TradePage';

const data: TradePageData = {
  slug: 'solar-pv-installers',
  trade: 'Solar PV Installers',
  tradePlural: 'Solar PV Installers',
  headline: 'How Solar Installers Find Rooftops Ready For',
  highlightedPhrase: 'Panels',
  sub: 'The Warm Homes Plan commits £15B and targets upgrades to 5 million homes by 2030. The Future Homes Standard puts solar on the majority of new builds. 369,000 certified installs happened in 2025 alone — a record. JobFilter reads planning approvals, energy signals, and retrofit award lists 4–16 weeks before the homeowner ever starts Googling installers.',
  painPoints: [
    ['Leads go to comparison sites first', 'Homeowners visit Checkatrade, Bark, and MCS consumer sites and get four or five solar quotes within hours. You\'re competing on price with every other installer in your region before you\'ve even spoken to them.'],
    ['New build estates are invisible', 'A planning approval for a 60-unit estate in your area means 60 potential solar installs — but no installer hears about it until the developer puts the contract out to tender late in the build.'],
    ['Energy upgrade demand is hard to track', 'Properties with low energy ratings are prime solar candidates. Energy performance data is public, but cross-referencing it with location and ownership to find warm leads takes hours most installers don\'t have.'],
    ['Energy cost pressure creates demand but no direction', 'Homeowners researching solar because of energy bills start on comparison sites, not by calling local installers. You need to be in front of them before they reach that comparison page.'],
  ],
  stats: [
    ['5,006', 'MCS-certified solar PV installers in the UK (2025 — MCS dashboard)'],
    ['369,000', 'Certified renewable installations in 2025 — a record year for solar'],
    ['£7,000–£12,000+', 'Average residential solar installation value (battery bundles higher)'],
    ['4–16 weeks', 'Typical signal advantage over homeowner directories'],
  ],
  signals: [
    ['Planning applications', 'Extension approvals with south-facing roof additions, new build estates, loft conversions, barn conversions, and outbuildings — all visible at approval stage, 4–16 weeks before the homeowner starts Googling installers.'],
    ['Energy signals', 'Properties with weak energy ratings are prime solar candidates — high electricity burden, weak fabric, strong payback case. Cross-referenced with ownership and property age to identify the warmest leads in your patch.'],
    ['Social housing & retrofit programmes', 'Warm Homes Plan retrofit award lists, social-housing wave funding for solar, and council developer site-start files flag commercial and residential estate contracts before they reach any tender portal.'],
  ],
  howItWorks: [
    ['01', 'Enter your postcode', 'Tell us where you operate. We scan planning approvals, energy signals, and new build completions within your working radius for solar-relevant signals.'],
    ['02', 'Solar signals get scored', 'South-facing roof extensions, energy-flagged properties, new estate approvals — each scored by value, urgency, and installation likelihood before it reaches you.'],
    ['03', 'Gold leads fire to WhatsApp', 'A 45-unit new build approved in your area or an energy-flagged property cluster? That\'s a solar pipeline worth £270k-£495k. You get the alert before anyone else pitches the developer.'],
  ],
  tradeLeadExample: {
    title: 'New extension — south-facing roof, solar-ready',
    rows: [
      ['Trade', 'Solar PV Installation'],
      ['Area', 'B30 / Birmingham South'],
      ['Value', '£7k-£11k solar installation'],
      ['Urgency', 'Extension approved 8 days ago'],
      ['Signal type', 'Verified planning signal — 91% confidence'],
      ['Signal', 'Single-storey rear extension, south-facing roof addition, low energy rating on existing property'],
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
    'Pay for leads on Checkatrade, Bark, or MCS — shared with 4-5 other installers',
    'Cold-call energy upgrade lists with no ownership or timing context',
    'Miss new build estate contracts because you hear about them too late',
    'Compete on price with national solar chains on every enquiry',
    'No visibility into planning-approved extensions ready for solar',
    'Reactive pipeline — boom and bust with energy news cycles',
  ],
  comparisonNew: [
    '£39/month founder — all solar signals, unlimited area scans',
    'No shared auction — signal goes to you before it hits comparison sites',
    'New build estate approvals flagged before developer tenders the contract',
    'Energy signals cross-referenced with planning to find warm leads',
    'WhatsApp alerts within minutes of planning approval or energy signal update',
    'No contracts. Cancel anytime. 30-day guarantee',
  ],
  ctaPostcode: 'B30',
  metaTitle: 'How Solar PV Installers Find Rooftops Ready For Panels — JobFilter',
  addOns: [
    { slug: 'dno-brief', title: 'DNO BRIEF', tagline: 'Grid connection application pack — pre-filled for your DNO area.' },
    { slug: 'ozev-grant-pack', title: 'OZEV GRANT PACK', tagline: 'Close more solar jobs with OZEV and grant paperwork sorted for the customer.' },
  ],
  metaDescription: 'JobFilter scans planning applications and energy signals across 400+ councils for solar installation opportunities. New builds, extensions, energy-flagged properties — Gold leads sent to WhatsApp. Free scan for solar installers.',
};

export function TradeSolar() {
  return <TradePage data={data} />;
}
