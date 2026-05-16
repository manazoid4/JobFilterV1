import { TradePage, type TradePageData } from '../components/TradePage';

const data: TradePageData = {
  slug: 'roofers',
  trade: 'Roofers',
  tradePlural: 'Roofers',
  headline: 'How Roofers Find Work From',
  highlightedPhrase: 'Planning Applications',
  sub: 'Every planning application for an extension, loft conversion, or new build needs a roofer. JobFilter scans approved applications across 400+ councils and flags roofing work before the homeowner starts getting quotes. You\'re on the scaffold before anyone else knows the job exists.',
  painPoints: [
    ['Storm damage work is reactive', 'You wait for the phone to ring after a storm. The roofer who gets there first gets the job. But you can\'t be everywhere at once.'],
    ['New roof enquiries go to directories', 'Homeowners post "need new roof" on Checkatrade and get 6 quotes. The cheapest wins. You\'re a proper roofer — you can\'t compete with a bloke with a ladder and some felt.'],
    ['Planning-approved work is invisible to most roofers', 'An extension gets approved. The homeowner needs a roof on it in 3-6 months. But no roofer knows about it because planning data isn\'t on any job board.'],
    ['Flat roof and Velux jobs are hard to find', 'Dormer conversions, flat roof replacements, Velux installs — these show up in planning applications but never make it to lead platforms.'],
  ],
  stats: [
    ['3,500+', 'Planning apps/week include roofing work'],
    ['400+', 'Councils scanned for planning applications'],
    ['£12k', 'Average new roof job value in the UK'],
    ['89%', 'Of UK trades use WhatsApp — be first on it'],
  ],
  signals: [
    ['Planning applications', 'Every extension, loft conversion, dormer, and new build needs roofing work. We scan 400+ councils and flag approved applications that need a roofer — before the job is posted anywhere.'],
    ['Energy signals', 'Properties with poor energy ratings often need roof insulation, flat roof replacements, or full re-roofs as part of retrofit upgrades. Verified energy signals show which properties are likely candidates.'],
    ['Council contracts', 'School roof replacements, social housing re-roofing programmes, council building maintenance — public tenders with named buyers, values, and deadlines.'],
  ],
  howItWorks: [
    ['01', 'Enter your postcode', 'Tell us where you roof. We scan planning approvals, energy efficiency signals, and council contracts within your working radius.'],
    ['02', 'Roofing signals get scored', 'Extensions needing new roofs, loft conversions with dormers, flat roof replacements, Velux installs — flagged and scored by value and urgency.'],
    ['03', 'Gold leads fire to WhatsApp', 'Planning approved for a two-storey extension in your patch? That\'s a roofing package worth £8k-£20k. You get the alert before the homeowner posts the job.'],
  ],
  tradeLeadExample: {
    title: 'Dormer loft conversion — full re-roof required',
    rows: [
      ['Trade', 'Roofing'],
      ['Area', 'EC2 / East London'],
      ['Value', '£10k-£18k roofing package'],
      ['Urgency', 'Planning approved 5 days ago'],
      ['Signal type', 'Verified planning signal — 93% confidence'],
      ['Signal', 'Dormer approved, existing roof flagged for replacement'],
    ],
    tags: ['Verified signal', 'High value', 'Free preview'],
  },
  whatsappMessage: `GOLD LEAD — Roofing
Area: EC2 / East London
Value: £10k-£18k roofing package
Urgency: Planning approved 5 days ago
Why it matters: Dormer loft conversion, full re-roof required
Action: Open notice → jobfilter.uk/lead/mno345`,
  comparisonOld: [
    'Pay £60-£120/month on directories for roofing leads',
    'Same lead sold to 5-6 other roofers in your area',
    'Storm damage work is first-come-first-served chaos',
    'No visibility into planning-approved roofing jobs',
    'You compete on price with unqualified roofers',
    'No way to pipeline work 2-3 months out',
  ],
  comparisonNew: [
    '£39/month founder — all roofing signals, unlimited scans',
    'No shared auction — lead goes to you, not five other roofers',
    'Planning data shows roofing jobs before they\'re posted',
    'Estimated value shown before you pick up the phone',
    'WhatsApp alerts within minutes of planning approval',
    'No contracts. Cancel anytime. 30-day guarantee',
  ],
  ctaPostcode: 'EC1',
  metaTitle: 'How Roofers Find Work From Planning Applications — JobFilter',
  metaDescription: 'JobFilter scans planning applications across 400+ councils for roofing jobs. Extensions, loft conversions, new builds — Gold leads sent to WhatsApp. Free scan for roofers.',
};

export function TradeRoofers() {
  return <TradePage data={data} />;
}


