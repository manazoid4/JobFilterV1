"use client";
import { TradePage, type TradePageData } from '../components/TradePage';

const data: TradePageData = {
  slug: 'gas-engineers',
  trade: 'Gas Engineers',
  tradePlural: 'Gas Engineers',
  headline: 'How Gas Engineers Find Boiler Jobs Before They Hit',
  highlightedPhrase: 'Directories',
  sub: '76,630 Gas Safe businesses serve 21.2 million gas-heated homes. The market is £8–12B annually — but the best jobs (boiler swaps, landlord CP12s, social housing programmes) are found in planning data and licensing registers, not comparison sites. A wasted diagnostic costs £60–£180. JobFilter surfaces install and compliance jobs 2–12 weeks before directories know they exist.',
  painPoints: [
    ['Boiler breakdown work is unpredictable', 'Emergency callouts keep the lights on but they\'re impossible to plan around. You need a pipeline of replacement jobs booked in advance — not a phone that either rings constantly or goes silent.'],
    ['Directory leads go to whoever is cheapest', 'Homeowners post boiler replacement jobs on Checkatrade and compare quotes instantly. You\'re a Gas Safe engineer with a reputation — competing on price with someone charging £200 less is a race to the bottom.'],
    ['Energy-driven replacement demand is invisible', 'Tens of thousands of low energy-rated properties in the UK have boilers that are due for replacement — but no installer knows which ones are about to act. That data is public and sits in planning records.'],
    ['Social housing programmes go to favoured contractors', 'Council and housing association retrofit programmes replace boilers at scale. But the contracts go to whoever is on the approved framework, and most Gas Safe engineers never find out the programme exists until it\'s done.'],
  ],
  stats: [
    ['1.7 million', 'Boiler replacements completed in the UK per year'],
    ['£2,500-£4,500', 'Average boiler installation value'],
    ['130,000+', 'Gas Safe registered businesses in the UK'],
    ['400+', 'Councils scanned for energy and planning signals'],
  ],
  signals: [
    ['Energy efficiency signals', 'Properties with low energy ratings are prime boiler replacement candidates — especially older terraces and semis where the boiler is likely 15+ years old. Cross-referenced with property age and location to identify clusters of warm leads.'],
    ['Property transactions', 'New homeowners inherit the previous owner\'s boiler. When a property sells and the boiler is flagged as old or inefficient, the new owner is likely to replace it within 12 months. We track conveyancing signals.'],
    ['Council and social housing contracts', 'Social housing retrofit programmes, council maintenance contracts, and ECO4 scheme works are published as public tenders. Named buyers, contract values, and deadlines — flagged before the tender window closes.'],
  ],
  howItWorks: [
    ['01', 'Enter your postcode', 'Tell us where you work. We scan energy signals, property transactions, and public tenders within your radius for boiler replacement signals.'],
    ['02', 'Boiler signals get scored', 'Low energy-rated properties, post-transaction flags, and council programme tenders — each scored by value, replacement likelihood, and urgency.'],
    ['03', 'Gold leads fire to WhatsApp', 'A cluster of six low-rated terraces in your area or a social housing tender with a named buyer? You get the alert before the homeowner opens a comparison site.'],
  ],
  tradeLeadExample: {
    title: 'Low-efficiency terrace cluster — boiler replacements likely',
    rows: [
      ['Trade', 'Gas Engineer / Boiler Installation'],
      ['Area', 'S5 / Sheffield North'],
      ['Value', '£2,500-£4,500 per boiler — 6 properties flagged'],
      ['Urgency', 'Energy signals updated — 3 properties triggered in last 14 days'],
      ['Signal type', 'Verified energy signal — 88% confidence'],
      ['Signal', 'Low-efficiency cluster — 6 terraces, boilers 15+ years old, flagged for ECO4 eligibility'],
    ],
    tags: ['Verified signal', 'High value', 'Free preview'],
  },
  whatsappMessage: `GOLD LEAD — Gas Engineer / Boiler Installation
Area: S5 / Sheffield North
Value: £2,500-£4,500 per unit — 6 properties flagged
Urgency: Energy signals updated in last 14 days
Why it matters: Low-efficiency cluster, boilers 15+ years old, ECO4 eligibility likely
Action: Open notice → jobfilter.uk/lead/gas731`,
  comparisonOld: [
    'Pay for directory leads shared with every other Gas Safe engineer in your area',
    'Wait for emergency breakdowns — reactive not planned',
    'No visibility into energy-flagged properties with replacement-due boilers',
    'Miss social housing tenders because they\'re buried in procurement portals',
    'Compete on price with boiler-only swap firms charging rock-bottom rates',
    'No pipeline — you don\'t know what work is coming next month',
  ],
  comparisonNew: [
    '£39/month founder — all Gas Safe signals, unlimited area scans',
    'No shared leads — energy signals go to you before the homeowner searches',
    'Property transaction flags identify new owners with old boilers',
    'Social housing and council tenders with named buyers and deadlines',
    'WhatsApp alerts within minutes of energy update or planning approval',
    'No contracts. Cancel anytime. 30-day guarantee',
  ],
  ctaPostcode: 'S5',
  metaTitle: 'How Gas Engineers Find Boiler Jobs Before They Hit Directories — JobFilter',
  addOns: [
    { slug: 'gas-safe-kit', title: 'GAS SAFE KIT', tagline: 'CP12s, warning notices, RIDDOR reports — correct documents for every gas job.' },
  ],
  metaDescription: 'JobFilter scans energy signals and planning applications across 400+ councils for boiler replacement signals. Low-rated properties, property transactions, social housing tenders — Gold leads to WhatsApp. Free scan.',
};

export function TradeGasEngineers() {
  return <TradePage data={data} />;
}
