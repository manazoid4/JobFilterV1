"use client";
import { TradePage, type TradePageData } from '../components/TradePage';

const data: TradePageData = {
  slug: 'ev-charger-installers',
  trade: 'EV Charger Installers',
  tradePlural: 'EV Charger Installers',
  headline: 'How EV Charger Installers Win Jobs Before The',
  highlightedPhrase: 'Car Arrives',
  sub: 'OZEV grants run to March 2027. Part S makes EV charging mandatory on all new residential builds. Domestic installs average £900–£1,800; fleet and workplace jobs hit £50,000+. A wasted domestic lead costs £60–£150 when parking rights, landlord consent, or grant eligibility are wrong. JobFilter flags these signals 2–12 weeks before any directory knows the job exists.',
  painPoints: [
    ['Part S compliance work goes to the main contractor\'s list', 'New builds legally require EV charger provision under Part S. But most of that work gets allocated to whoever the main contractor already knows — you never hear about the job.'],
    ['OZEV grant work is competitive and slow', 'The OZEV grant scheme drives residential installs, but it pushes homeowners to compare quotes online. By the time they\'re comparing, five other installers are already in the running.'],
    ['Commercial planning approvals are invisible', 'A planning application for a 200-space commercial car park means a significant EV charging infrastructure contract. But it\'s sitting in a planning portal — not on any job board.'],
    ['Property transactions trigger charger installs but nobody tracks them', 'People who buy a new house and own an EV will install a charger within weeks. Property transaction data is public, but no one cross-references it with EV ownership signals.'],
  ],
  stats: [
    ['350,000+', 'New EV registrations in the UK per year'],
    ['£800-£2,500', 'Average residential EV charger installation value'],
    ['100%', 'New builds legally require EV provision under Part S'],
    ['400+', 'Councils scanned for planning and Part S signals'],
  ],
  signals: [
    ['Planning applications', 'New build residential approvals, commercial car park planning, and office developments all trigger EV charger installation requirements. We flag them at approval — before the main contractor allocates the work.'],
    ['Part S compliance signals', 'Every new build planning approval for residential properties includes a legal requirement for EV charger provision. We identify these the moment planning is approved and alert you before the contract is placed.'],
    ['Commercial planning', 'Office fit-outs, retail parks, and mixed-use developments requiring car parking all carry EV infrastructure obligations under current planning policy. Flagged with estimated contract value.'],
  ],
  howItWorks: [
    ['01', 'Enter your postcode', 'Tell us where you operate. We scan planning approvals, new build notices, and commercial applications within your working radius for EV charger installation opportunities.'],
    ['02', 'EV signals get scored', 'New build estate approvals with Part S obligations, commercial car park planning, property transactions — each scored by contract value and how close to tender stage they are.'],
    ['03', 'Gold leads fire to WhatsApp', 'A 20-unit new build approved near you means 20 guaranteed EV charger installs under Part S. You get the alert before the main contractor names their preferred installer.'],
  ],
  tradeLeadExample: {
    title: '20-unit new build — Part S EV charger provision required',
    rows: [
      ['Trade', 'EV Charger Installation'],
      ['Area', 'M60 / Greater Manchester'],
      ['Value', '£16,000-£50,000 EV charger package'],
      ['Urgency', 'Planning approved 6 days ago'],
      ['Signal type', 'Verified planning signal — 95% confidence'],
      ['Signal', '20-unit residential new build, Part S EV provision legally required for all units'],
    ],
    tags: ['Verified signal', 'High value', 'Free preview'],
  },
  whatsappMessage: `GOLD LEAD — EV Charger Installation
Area: M60 / Greater Manchester
Value: £16,000-£50,000 EV charger package
Urgency: Planning approved 6 days ago
Why it matters: 20-unit new build — Part S EV provision required for all units
Action: Open notice → jobfilter.uk/lead/evc219`,
  comparisonOld: [
    'Rely on OZEV grant enquiries — competing with every local installer',
    'Miss Part S new build contracts because you never see the planning',
    'Wait for developers to publish tenders — by then it\'s already allocated',
    'No visibility into commercial planning with EV infrastructure obligations',
    'Compete on price with national charging network installers',
    'Reactive pipeline driven by EV news rather than real job signals',
  ],
  comparisonNew: [
    '£39/month founder — all EV charger signals, unlimited scans',
    'No shared auction — signal goes to you before tender is published',
    'Part S new build approvals flagged the day planning is granted',
    'Commercial planning with EV obligations identified early',
    'WhatsApp alerts within minutes of relevant planning approval',
    'No contracts. Cancel anytime. 30-day guarantee',
  ],
  ctaPostcode: 'M60',
  metaTitle: 'How EV Charger Installers Win Jobs Before The Car Arrives — JobFilter',
  metaDescription: 'JobFilter scans planning applications across 400+ councils for EV charger installation opportunities. Part S new builds, commercial planning, property transactions — Gold leads sent to WhatsApp. Free scan.',
};

export function TradeEVCharger() {
  return <TradePage data={data} />;
}
