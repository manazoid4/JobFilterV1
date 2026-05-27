"use client";
import { TradePage, type TradePageData } from '../components/TradePage';

const data: TradePageData = {
  slug: 'fire-safety',
  trade: 'Fire Safety Engineers',
  tradePlural: 'Fire Safety Engineers',
  headline: 'How Fire Safety Engineers Win Work From',
  highlightedPhrase: 'Compliance Triggers',
  sub: 'HMO licence applications legally require a fire risk assessment. Change-of-use planning for care homes, schools, and commercial buildings triggers mandatory FRA work. The Building Safety Act 2022 created a wave of compliance demand. JobFilter scans licensing applications and planning data across 400+ councils and flags FRA-triggering events before the client starts searching.',
  painPoints: [
    ['HMO licensing work goes to whoever the landlord already knows', 'Landlords applying for HMO licences need a fire risk assessment — it\'s a legal requirement. But they call whoever they\'ve used before, or whoever comes up first on Google. You\'re not in the conversation until it\'s too late.'],
    ['Building Safety Act compliance demand is fragmented', 'The Building Safety Act 2022 created enormous FRA demand across higher-risk buildings. But the compliance triggers are spread across planning portals, building control records, and licensing registers — impossible to monitor manually.'],
    ['Change-of-use applications go untracked', 'A planning application to convert a commercial unit to a care home, nursery, or HMO is a guaranteed fire safety commission. But these applications are filed as planning documents with no direct route to fire safety engineers.'],
    ['Care sector building works are high-value but hard to find', 'Care home extensions, new build care facilities, and sheltered housing schemes require specialist fire safety engineering input. These projects are in planning data — but nobody is filtering them for fire safety firms.'],
  ],
  stats: [
    ['500,000+', 'HMO properties in England requiring licensed FRA compliance'],
    ['£500-£5,000', 'Average fire risk assessment fee by property type and size'],
    ['400+', 'Councils scanned for HMO, change-of-use, and planning signals'],
    ['Building Safety Act 2022', 'created recurring compliance demand across higher-risk buildings'],
  ],
  signals: [
    ['HMO licence applications', 'Every HMO licence application and renewal requires a fire risk assessment — it\'s a statutory obligation. We flag HMO licensing events in your area the moment they\'re filed, with property address and bed count.'],
    ['Change-of-use planning', 'Planning applications for care homes, nurseries, houses of multiple occupation, and commercial-to-residential conversions all trigger fire safety requirements. Flagged at application stage with estimated FRA value.'],
    ['Building Safety Act compliance', 'Higher-risk buildings undergoing planning changes, refurbishment, or ownership transfer create Building Safety Act compliance requirements. Cross-referenced with building height and occupancy type to prioritise the highest-value assessments.'],
  ],
  howItWorks: [
    ['01', 'Enter your postcode', 'Tell us where you practise. We scan HMO licensing registers, change-of-use planning applications, and Building Safety Act compliance triggers within your working radius.'],
    ['02', 'Fire safety signals get scored', 'HMO applications, care home planning, change-of-use notices — each scored by estimated FRA value, property size, and how urgently the compliance work is required.'],
    ['03', 'Gold leads fire to WhatsApp', 'An HMO licence application for an 8-bed property near you is a guaranteed FRA commission worth £650-£1,200. You get the alert the day the application is filed.'],
  ],
  tradeLeadExample: {
    title: '8-bed HMO licence application — FRA legally required',
    rows: [
      ['Trade', 'Fire Safety Engineer / FRA Consultant'],
      ['Area', 'N1 / Islington, London'],
      ['Value', '£650-£1,200 fire risk assessment fee'],
      ['Urgency', 'HMO licence application filed 3 days ago'],
      ['Signal type', 'Verified licensing signal — 97% confidence'],
      ['Signal', '8-bedroom HMO licence application — statutory FRA required before licence is granted'],
    ],
    tags: ['Verified signal', 'Statutory requirement', 'Free preview'],
  },
  whatsappMessage: `GOLD LEAD — Fire Safety Engineer
Area: N1 / Islington, London
Value: £650-£1,200 FRA commission
Urgency: HMO licence application filed 3 days ago
Why it matters: 8-bed HMO — statutory FRA required before licence granted
Action: Open notice → jobfilter.uk/lead/fsa288`,
  comparisonOld: [
    'Wait for landlords to find you on Google when they\'re already in a compliance panic',
    'HMO licensing applications filed across dozens of council portals — impossible to track',
    'Change-of-use planning with fire safety triggers invisible to FRA consultants',
    'Building Safety Act compliance demand fragmented and hard to identify',
    'Compete on price when the client is already under pressure to comply',
    'No pipeline — FRA work comes in unpredictable bursts',
  ],
  comparisonNew: [
    '£39/month founder — all fire safety signals, unlimited licensing and planning scans',
    'HMO licence applications flagged the day they\'re filed — before the landlord panics',
    'Change-of-use planning with fire safety triggers identified at application stage',
    'Building Safety Act compliance events cross-referenced with property type and height',
    'WhatsApp alerts within minutes of HMO application or planning filing',
    'No contracts. Cancel anytime. 30-day guarantee',
  ],
  ctaPostcode: 'N1',
  metaTitle: 'How Fire Safety Engineers Win Work From Compliance Triggers — JobFilter',
  addOns: [
    { slug: 'fra-template', title: 'FRA TEMPLATE', tagline: 'PAS 79:2020-compliant Fire Risk Assessments with Responsible Person documentation.' },
  ],
  metaDescription: 'JobFilter scans HMO licensing, planning applications, and Building Safety Act compliance triggers across 400+ councils for fire safety engineering opportunities. Gold leads sent to WhatsApp. Free scan.',
};

export function TradeFireSafety() {
  return <TradePage data={data} />;
}
