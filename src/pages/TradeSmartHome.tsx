"use client";
import { TradePage, type TradePageData } from '../components/TradePage';

const data: TradePageData = {
  slug: 'smart-home-installers',
  trade: 'Smart Home Installers',
  tradePlural: 'Smart Home Installers',
  headline: 'How Smart Home Installers Win High-Value Jobs From',
  highlightedPhrase: 'Extension Approvals',
  sub: 'A planning approval for a large extension or whole-house renovation is a signal that the homeowner has serious money to spend. Projects with £200k+ build budgets are exactly where smart home systems belong. JobFilter scans planning approvals across 400+ councils and flags high-value renovation and extension projects before the homeowner has even thought about smart home automation.',
  painPoints: [
    ['Smart home leads come from the wrong stage of the project', 'Homeowners think about smart home systems when the build is nearly finished and they\'re running cable. That\'s the worst time to spec a system properly. The right time is when planning is just approved.'],
    ['New premium build estates are allocated to known AV integrators', 'High-spec new build developers work with a preferred AV and smart home firm. Unless you\'re in conversation during the design stage, you\'re locked out of the best new build projects in your area.'],
    ['High-net-worth property transactions are invisible', 'When a £1.5m house sells, the new owner almost always upgrades the smart home system within the first year. That transaction is on the public register — but no smart home installer is cross-referencing it with property value to find the right leads.'],
    ['Comparison platforms undervalue your work', 'Smart home automation is a premium service. Comparison sites commoditise it. The high-value clients you want don\'t come from Bark.com — they come from being in front of the right project at the right moment.'],
  ],
  stats: [
    ['15%', 'Annual growth rate of the UK smart home market'],
    ['£8k-£50k', 'Average whole-home automation system installation value'],
    ['400+', 'Councils scanned for high-value extension and renovation planning signals'],
    ['£200k+', 'Build budget threshold that indicates smart home specification opportunity'],
  ],
  signals: [
    ['High-value planning applications', 'Large double extensions, whole-house renovations, and substantial loft conversions in high-value postcodes signal significant project budgets. Flagged with planning details, property value context, and estimated renovation budget.'],
    ['New premium build estates', 'Residential planning approvals in high-value areas for new build estates signal premium specification opportunities. Flagged with developer details, unit type, and likely smart home specification tier.'],
    ['High-value property transactions', 'Properties sold above threshold values in postcodes with high smart home adoption rates are flagged as warm leads — cross-referenced with property age, renovation indicators, and transaction recency.'],
  ],
  howItWorks: [
    ['01', 'Enter your postcode', 'Tell us where you operate. We scan high-value planning approvals, premium new build estates, and property transaction signals within your working radius.'],
    ['02', 'Smart home signals get scored', 'Large extensions in premium postcodes, whole-house renovation planning, high-value transactions — each scored by estimated renovation budget and smart home specification probability.'],
    ['03', 'Gold leads fire to WhatsApp', 'A large double extension approved in a £600k+ postcode area near you is a renovation with a £280k budget. You get the alert before the client has had a single conversation about smart home.'],
  ],
  tradeLeadExample: {
    title: 'Large double extension approved — £280k renovation budget',
    rows: [
      ['Trade', 'Smart Home Installer / AV Integrator'],
      ['Area', 'KT2 / Kingston upon Thames'],
      ['Value', '£8,000-£35,000 smart home specification opportunity'],
      ['Urgency', 'Planning approved 12 days ago — build stage ~8-10 weeks out'],
      ['Signal type', 'Verified planning signal — 89% confidence'],
      ['Signal', 'Large rear and side double extension on £650k+ property — total renovation budget estimated £280k, smart home specification opportunity at first fix stage'],
    ],
    tags: ['Verified signal', 'High value', 'Free preview'],
  },
  whatsappMessage: `GOLD LEAD — Smart Home Installer
Area: KT2 / Kingston upon Thames
Value: £8,000-£35,000 smart home spec
Urgency: Planning approved 12 days ago — build ~8-10 weeks out
Why it matters: £280k renovation budget — smart home spec opportunity at first fix
Action: Open notice → jobfilter.uk/lead/smt856`,
  comparisonOld: [
    'Wait for clients to find you after the build is nearly finished — too late for proper spec',
    'Premium new build estates allocated to known AV integrators — you\'re locked out',
    'High-value property transactions invisible — you don\'t know who just bought a £1.5m house',
    'Comparison platforms commoditise smart home work and attract wrong-budget clients',
    'No way to identify projects at the right stage for early design involvement',
    'No pipeline — relies entirely on referrals and inbound that\'s hard to predict',
  ],
  comparisonNew: [
    '£39/month founder — all smart home signals, unlimited high-value planning scans',
    'High-value extension approvals flagged at the right stage for early design input',
    'Premium new build estates identified at planning stage for developer engagement',
    'High-value property transactions cross-referenced with renovation indicators',
    'WhatsApp alerts within minutes of high-value planning approval',
    'No contracts. Cancel anytime. 30-day guarantee',
  ],
  ctaPostcode: 'KT2',
  metaTitle: 'How Smart Home Installers Win High-Value Jobs From Extension Approvals — JobFilter',
  metaDescription: 'JobFilter scans planning applications across 400+ councils for smart home installation opportunities. Large extensions, premium new builds, high-value property transactions — Gold leads sent to WhatsApp. Free scan.',
};

export function TradeSmartHome() {
  return <TradePage data={data} />;
}
