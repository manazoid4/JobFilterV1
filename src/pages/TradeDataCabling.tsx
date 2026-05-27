"use client";
import { TradePage, type TradePageData } from '../components/TradePage';

const data: TradePageData = {
  slug: 'data-cabling',
  trade: 'Data Cabling Engineers',
  tradePlural: 'Data Cabling Engineers',
  headline: 'How Data Cabling Engineers Win Contracts From',
  highlightedPhrase: 'Commercial Planning',
  sub: 'Every office fit-out, every school refurbishment, every healthcare building project — they all need structured data cabling. Commercial planning applications and public sector procurement notices fire weeks before the M&E contractor goes out to tender. JobFilter scans 400+ councils and flags data cabling opportunities at the point of planning approval, not when the tender is already live.',
  painPoints: [
    ['Data cabling contracts go to whoever the M&E contractor already uses', 'Commercial fit-outs and refurbishments allocate data cabling to whoever is on the electrical contractor\'s trusted subcontractor list. If you\'re not already in that relationship, you\'re invisible.'],
    ['Office fit-out planning approvals are missed', 'A planning application for a 3,500 sqft office fit-out in your area is a Cat6A cabling contract worth £18k-£35k. But it\'s sitting in a planning portal — and no data cabling firm is monitoring commercial planning applications.'],
    ['Education sector network upgrades go to framework contractors', 'School and further education network infrastructure upgrades are often part of wider LA or academy trust frameworks. Early engagement — before the procurement specification is written — is how smaller firms get onto those frameworks.'],
    ['Healthcare planning carries structured cabling requirements', 'NHS trust building works, GP surgery refurbishments, and private healthcare fit-outs all require specialist medical-grade structured cabling. These are high-value, long-duration contracts — but they\'re buried in NHS estates procurement portals.'],
  ],
  stats: [
    ['£5k-£80k', 'Average data cabling contract value by project type and size'],
    ['400+', 'Councils scanned for commercial and education planning signals'],
    ['Every commercial fit-out', 'requires structured data cabling — Cat6A or fibre backbone standard'],
    ['£4bn+', 'Annual UK commercial fit-out market — data infrastructure is core'],
  ],
  signals: [
    ['Commercial planning applications', 'Office fit-outs, retail refurbishments, and commercial new builds all require structured data cabling. We flag commercial planning approvals with floor area, building type, and estimated cabling contract value.'],
    ['Education and public sector', 'School refurbishment programmes, further education capital works, and local authority building projects all require network infrastructure upgrades. Flagged with procurement lead, budget, and tender deadline.'],
    ['Healthcare building works', 'NHS trust capital works, GP surgery refurbishments, and private healthcare fit-outs require structured cabling to healthcare grade standards. Identified from NHS Estates and LA planning applications.'],
  ],
  howItWorks: [
    ['01', 'Enter your postcode', 'Tell us where you operate. We scan commercial planning approvals, education building works, and healthcare infrastructure tenders within your working radius.'],
    ['02', 'Data cabling signals get scored', 'Office fit-out planning, school refurb tenders, healthcare building works — each scored by estimated contract value, floor area, and how early in the procurement cycle you can engage.'],
    ['03', 'Gold leads fire to WhatsApp', 'A 3,500 sqft office fit-out planning approval in your area is a Cat6A cabling contract worth £18k-£35k. You get the alert the day planning is approved — before the M&E contractor starts calling subcontractors.'],
  ],
  tradeLeadExample: {
    title: 'Office fit-out planning approved — Cat6A + fibre backbone required',
    rows: [
      ['Trade', 'Data Cabling Engineer'],
      ['Area', 'EC2 / City of London'],
      ['Value', '£18,000-£35,000 structured cabling contract'],
      ['Urgency', 'Planning approved 8 days ago'],
      ['Signal type', 'Verified planning signal — 93% confidence'],
      ['Signal', '3,500 sqft office fit-out approved — Cat6A throughout, fibre backbone to comms rooms, full structured cabling spec required'],
    ],
    tags: ['Verified signal', 'High value', 'Free preview'],
  },
  whatsappMessage: `GOLD LEAD — Data Cabling Engineer
Area: EC2 / City of London
Value: £18,000-£35,000 structured cabling
Urgency: Planning approved 8 days ago
Why it matters: 3,500 sqft office fit-out — Cat6A + fibre backbone required
Action: Open notice → jobfilter.uk/lead/dat923`,
  comparisonOld: [
    'Rely on M&E contractor relationships — miss everything outside your network',
    'Office fit-out planning approvals invisible — nobody monitors commercial planning',
    'Education network upgrades locked in LA frameworks you never hear about',
    'Healthcare cabling contracts buried in NHS procurement portals',
    'Brought in late when the M&E spec is already written and it\'s about price',
    'No pipeline — can\'t plan engineers, cable stock, or certification capacity',
  ],
  comparisonNew: [
    '£39/month founder — all data cabling signals, unlimited commercial planning scans',
    'Office fit-out approvals flagged the day planning is granted with estimated contract value',
    'Education and public sector tenders with named buyers and submission deadlines',
    'Healthcare building works identified from NHS Estates and LA planning data',
    'WhatsApp alerts within minutes of commercial planning approval',
    'No contracts. Cancel anytime. 30-day guarantee',
  ],
  ctaPostcode: 'EC2',
  metaTitle: 'How Data Cabling Engineers Win Contracts From Commercial Planning — JobFilter',
  metaDescription: 'JobFilter scans commercial planning applications across 400+ councils for structured data cabling opportunities. Office fit-outs, schools, healthcare — Gold leads sent to WhatsApp. Free scan for data cabling engineers.',
};

export function TradeDataCabling() {
  return <TradePage data={data} />;
}
