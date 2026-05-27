"use client";
import { TradePage, type TradePageData } from '../components/TradePage';

const data: TradePageData = {
  slug: 'asbestos-surveyors',
  trade: 'Asbestos Surveyors',
  tradePlural: 'Asbestos Surveyors',
  headline: 'How Asbestos Surveyors Find Work From',
  highlightedPhrase: 'Demolition Notices',
  sub: 'Pre-1985 buildings in planning applications, demolition notices, industrial refurbishments, and school and public building works — all legally require an asbestos survey before works begin. JobFilter scans demolition notices and planning applications across 400+ councils and flags pre-1985 building works before the contractor starts and realises they need a survey yesterday.',
  painPoints: [
    ['Demolition clients call you in an emergency', 'A contractor starts work on a pre-1985 building and discovers potential asbestos-containing materials. They need a surveyor immediately. You\'re busy, you can\'t plan your schedule, and you\'re firefighting instead of running a business.'],
    ['Refurbishment surveys are booked too late', 'The law requires an R&D survey before refurbishment work begins on pre-1985 buildings. But most clients only think about it when they\'re about to start — not when the planning is approved. You need to be there earlier.'],
    ['Industrial refurb contracts are hidden in planning portals', 'Factory and warehouse conversions on pre-1985 industrial sites are some of the highest-value asbestos survey commissions. They\'re filed as planning applications — but nobody is filtering them for asbestos surveyors.'],
    ['School and public building works require specialist surveys', 'Local authority school refurbishment programmes and public building maintenance works require asbestos management surveys and re-inspection reports. These are published as public tenders but scattered across procurement portals.'],
  ],
  stats: [
    ['1.5 million', 'UK buildings estimated to contain asbestos'],
    ['£300-£1,500', 'Average management or refurbishment survey fee'],
    ['Pre-1985', 'Every pre-1985 building refurb or demolition requires a survey by law'],
    ['400+', 'Councils scanned for demolition notices and pre-1985 building works'],
  ],
  signals: [
    ['Demolition notices', 'Demolition notices and prior approval applications for pre-1985 buildings are a direct trigger for asbestos surveys. We flag them the moment they\'re filed — before the contractor starts work.'],
    ['Planning applications for pre-1985 buildings', 'Refurbishment planning for industrial, commercial, and residential pre-1985 buildings all carry a legal asbestos survey requirement. Cross-referenced with building age and construction type.'],
    ['Public sector building works', 'School refurbishment programmes, council building maintenance contracts, and NHS estates works all require asbestos management surveys. Published as public tenders with named buyers and submission deadlines.'],
  ],
  howItWorks: [
    ['01', 'Enter your postcode', 'Tell us where you operate. We scan demolition notices, pre-1985 building planning applications, and public sector works tenders within your working radius.'],
    ['02', 'Asbestos signals get scored', 'Demolition notices, industrial refurb planning, school works tenders — each scored by survey type required, building age, and estimated fee value.'],
    ['03', 'Gold leads fire to WhatsApp', 'A pre-1960 industrial building refurb application in your area is a survey commission worth £600-£2,000. You get the alert the day the planning application is filed.'],
  ],
  tradeLeadExample: {
    title: 'Pre-1960 industrial building — refurbishment survey required',
    rows: [
      ['Trade', 'Asbestos Surveyor / Licensed Contractor'],
      ['Area', 'B6 / Birmingham North'],
      ['Value', '£600-£1,800 refurbishment and demolition survey'],
      ['Urgency', 'Planning application filed 5 days ago'],
      ['Signal type', 'Verified planning signal — 93% confidence'],
      ['Signal', 'Pre-1960 industrial warehouse conversion planning filed — R&D asbestos survey legally required before refurbishment works begin'],
    ],
    tags: ['Verified signal', 'Legal requirement', 'Free preview'],
  },
  whatsappMessage: `GOLD LEAD — Asbestos Surveyor
Area: B6 / Birmingham North
Value: £600-£1,800 R&D survey
Urgency: Planning application filed 5 days ago
Why it matters: Pre-1960 industrial building — R&D asbestos survey legally required
Action: Open notice → jobfilter.uk/lead/asb441`,
  comparisonOld: [
    'Get called in emergencies when contractors have already started work',
    'No visibility into demolition notices until you stumble across them',
    'Pre-1985 industrial refurb planning buried in portals — impossible to monitor',
    'School and public building tenders go to LA-preferred surveyors',
    'Compete with national chains on price for every residential survey enquiry',
    'Can\'t plan field team capacity without a forward pipeline',
  ],
  comparisonNew: [
    '£39/month founder — all asbestos signals, unlimited demolition and planning scans',
    'Demolition notices flagged the moment they\'re filed — before work starts',
    'Pre-1985 industrial and commercial refurb planning identified at application stage',
    'School and public sector works tenders with buyer names and deadlines',
    'WhatsApp alerts within minutes of demolition notice or planning filing',
    'No contracts. Cancel anytime. 30-day guarantee',
  ],
  ctaPostcode: 'B6',
  metaTitle: 'How Asbestos Surveyors Find Work From Demolition Notices — JobFilter',
  metaDescription: 'JobFilter scans demolition notices and planning applications across 400+ councils for asbestos survey opportunities. Pre-1985 buildings, industrial refurbs, school works — Gold leads sent to WhatsApp. Free scan.',
};

export function TradeAsbestos() {
  return <TradePage data={data} />;
}
