"use client";
import { TradePage, type TradePageData } from '../components/TradePage';

const data: TradePageData = {
  slug: 'damp-proofers',
  trade: 'Damp Proofers',
  tradePlural: 'Damp Proofers',
  headline: 'How Damp Proofers Find Work Before',
  highlightedPhrase: 'Problems Get Worse',
  sub: 'Pre-war property clusters, basement conversion planning applications, flood zone planning notices, and property transaction surveys flagging damp — all visible before the homeowner starts getting quotes. JobFilter scans energy signals, planning applications, and property transactions across 400+ councils to find damp treatment work before the damp proofer down the road gets the call.',
  painPoints: [
    ['Damp work comes from surveyor referrals or desperation calls', 'Homeowners either call you because a surveyor flagged damp in a report, or because they\'ve watched the problem get worse for months. Either way, you\'re reactive — you didn\'t find the customer, the problem found you.'],
    ['Pre-war property surveys flag damp but nobody tracks them', 'RICS surveys on Victorian and Edwardian properties flag damp regularly. That survey data is in the property transaction record. But no damp proofer is cross-referencing it with addresses and ownership to find warm leads.'],
    ['Basement conversion planning needs tanking before the build starts', 'A planning application for a basement conversion means a tanking and waterproofing contract — often £5,000-£15,000. But by the time the homeowner starts building, they\'ve already found a contractor through their builder.'],
    ['Flood zone and high-water-table planning flags are ignored', 'Planning applications in flood risk zones often require drainage and waterproofing solutions as a planning condition. These conditions are in the planning documents — but nobody is filtering them for damp and waterproofing contractors.'],
  ],
  stats: [
    ['5 million+', 'Pre-1919 UK properties susceptible to damp and penetrating moisture'],
    ['£800-£4,000', 'Average damp treatment job value by property type'],
    ['400+', 'Councils scanned for planning, energy signals, and property data'],
    ['1 in 5', 'UK homes has some form of damp or moisture issue'],
  ],
  signals: [
    ['Energy moisture signals', 'Properties with energy flags for ventilation, moisture, or condensation issues are prime damp treatment candidates. Cross-referenced with property age, construction type, and location to identify high-probability leads.'],
    ['Basement conversion planning', 'Every basement conversion planning application requires tanking and waterproofing work. We flag them the day approval is granted — before the homeowner has appointed a contractor.'],
    ['Pre-war property clusters', 'Victorian and Edwardian terraces in areas with known high water tables or drainage issues are flagged in clusters — giving you a geographic pipeline rather than individual one-off leads.'],
  ],
  howItWorks: [
    ['01', 'Enter your postcode', 'Tell us where you work. We scan energy signals, basement conversion planning, and pre-war property transaction signals within your working radius.'],
    ['02', 'Damp signals get scored', 'Energy moisture flags, basement planning approvals, flood zone planning conditions — each scored by job value, property type, and how urgent the treatment need is likely to be.'],
    ['03', 'Gold leads fire to WhatsApp', 'A Victorian terrace cluster in your area with moisture signals is 12 potential damp treatment jobs worth £800-£4,000 each. You get the alert before the homeowners start calling around.'],
  ],
  tradeLeadExample: {
    title: 'Victorian terrace cluster — damp issues flagged across 12 properties',
    rows: [
      ['Trade', 'Damp Proofer / Waterproofing Contractor'],
      ['Area', 'M14 / Manchester South'],
      ['Value', '£800-£4,000 per property — 12 properties flagged'],
      ['Urgency', 'Energy signals updated — cluster identified this week'],
      ['Signal type', 'Verified energy signal — 87% confidence'],
      ['Signal', 'Pre-1900 terrace cluster, energy signals flagging moisture and ventilation issues across 12 adjacent properties'],
    ],
    tags: ['Verified signal', 'Cluster lead', 'Free preview'],
  },
  whatsappMessage: `GOLD LEAD — Damp Proofer
Area: M14 / Manchester South
Value: £800-£4,000 per property — 12 properties flagged
Urgency: Energy signals identified this week
Why it matters: Pre-1900 terrace cluster — moisture and damp flagged across 12 properties
Action: Open notice → jobfilter.uk/lead/dmp519`,
  comparisonOld: [
    'Wait for surveyor referrals or emergency calls from homeowners in distress',
    'Pre-war property damp demand invisible — no one is cross-referencing energy signals',
    'Basement conversion tanking contracts go to whoever the builder knows',
    'Flood zone planning conditions buried in planning documents nobody reads',
    'Compete with national damp guarantee firms who undercut on price',
    'No pipeline — feast and famine with no forward visibility',
  ],
  comparisonNew: [
    '£39/month founder — all damp signals, unlimited energy and planning scans',
    'Energy moisture flags cross-referenced with property age to find cluster leads',
    'Basement conversion approvals flagged the day planning is granted',
    'Flood zone and planning condition signals identified at application stage',
    'WhatsApp alerts within minutes of energy update or planning approval',
    'No contracts. Cancel anytime. 30-day guarantee',
  ],
  ctaPostcode: 'M14',
  metaTitle: 'How Damp Proofers Find Work Before Problems Get Worse — JobFilter',
  metaDescription: 'JobFilter scans energy signals and planning applications across 400+ councils for damp treatment opportunities. Pre-war property clusters, basement conversions, flood zones — Gold leads sent to WhatsApp. Free scan.',
};

export function TradeDampProofers() {
  return <TradePage data={data} />;
}
