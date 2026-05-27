"use client";
import { TradePage, type TradePageData } from '../components/TradePage';

const data: TradePageData = {
  slug: 'groundworkers',
  trade: 'Groundworkers',
  tradePlural: 'Groundworkers',
  headline: 'How Groundworkers Win Jobs From',
  highlightedPhrase: 'Planning Permissions',
  sub: 'Every residential planning approval for new build, every brownfield site conversion, every drainage application — they all start with groundworks. The problem is that by the time the main contractor is on site, the groundworks package is already placed. JobFilter scans 400+ councils and flags new planning approvals the day they\'re granted, so you\'re first to tender.',
  painPoints: [
    ['Groundworks contracts go before you hear about the job', 'Main contractors have preferred groundwork firms they call first. By the time a new build or brownfield project appears on your radar, the enabling works are already underway. You missed the window.'],
    ['Brownfield planning approvals are buried in portals', 'Brownfield site conversions are some of the highest-value groundworks opportunities in the UK. But they sit in planning portals as dense PDF documents. No groundworker has time to read them all.'],
    ['Drainage applications are invisible to most contractors', 'Drainage alteration and new drainage scheme applications signal groundworks directly — but they\'re not tracked by any job board. They\'re planning data, and nobody is filtering it for groundwork firms.'],
    ['Commercial groundworks tenders close before you see them', 'Public sector groundworks — school playing fields, highway drainage, industrial estate enabling works — get published on procurement portals and close within weeks. If you\'re not monitoring them, you miss them.'],
  ],
  stats: [
    ['£15k-£80k', 'Average groundworks package on a residential new build'],
    ['1,400+', 'Brownfield planning approvals granted in England per year'],
    ['400+', 'Councils scanned for planning and drainage signals'],
    ['3-6 months', 'Lead time from planning approval to groundworks start'],
  ],
  signals: [
    ['Planning applications', 'Every residential and commercial new build approval, brownfield site conversion, and drainage alteration application is a potential groundworks contract. We scan 400+ councils and flag them at the point of approval.'],
    ['Brownfield site signals', 'Former industrial, retail, and commercial sites being converted to residential or commercial use require significant enabling and groundworks. Flagged by site size, likely contract value, and planning approval stage.'],
    ['Drainage applications', 'New drainage scheme applications, drainage alteration planning, and flood risk assessments all indicate groundworks packages. Cross-referenced with build size and value to prioritise the highest-value opportunities.'],
  ],
  howItWorks: [
    ['01', 'Enter your postcode', 'Tell us where you operate. We scan planning approvals, brownfield site data, and drainage applications within your working radius.'],
    ['02', 'Groundwork signals get scored', 'Residential new build approvals, brownfield conversions, drainage scheme applications — each scored by estimated contract value and how early in the process the project is.'],
    ['03', 'Gold leads fire to WhatsApp', 'A 12-unit brownfield approval near you is a groundworks package worth £35k-£65k. You get the alert the day planning is granted — before the developer calls their usual firm.'],
  ],
  tradeLeadExample: {
    title: '12-unit residential brownfield approval — groundworks required',
    rows: [
      ['Trade', 'Groundworker / Civil Engineering'],
      ['Area', 'B45 / Birmingham South West'],
      ['Value', '£35,000-£65,000 groundworks package'],
      ['Urgency', 'Planning approved 4 days ago'],
      ['Signal type', 'Verified planning signal — 94% confidence'],
      ['Signal', '12-unit residential new build on former industrial brownfield site — full enabling works, drainage, and foundations required'],
    ],
    tags: ['Verified signal', 'High value', 'Free preview'],
  },
  whatsappMessage: `GOLD LEAD — Groundworker
Area: B45 / Birmingham South West
Value: £35,000-£65,000 groundworks package
Urgency: Planning approved 4 days ago
Why it matters: 12-unit residential brownfield — full enabling works required
Action: Open notice → jobfilter.uk/lead/gnd847`,
  comparisonOld: [
    'Rely on developer relationships — miss everything outside your network',
    'Brownfield planning approvals buried in portals you don\'t have time to read',
    'Drainage application groundworks invisible — no job board covers them',
    'Public sector tenders found too late to prepare a competitive bid',
    'Main contractor preferred lists mean you never get a first look',
    'No pipeline visibility — you can\'t plan plant and labour months ahead',
  ],
  comparisonNew: [
    '£39/month founder — all groundwork signals, unlimited area scans',
    'Brownfield and new build approvals flagged the day planning is granted',
    'Drainage applications cross-referenced with build value for priority scoring',
    'Public sector groundworks tenders with deadlines and buyer names',
    'WhatsApp alerts within minutes of planning approval',
    'No contracts. Cancel anytime. 30-day guarantee',
  ],
  ctaPostcode: 'B45',
  metaTitle: 'How Groundworkers Win Jobs From Planning Permissions — JobFilter',
  metaDescription: 'JobFilter scans planning applications across 400+ councils for groundwork opportunities. Brownfield sites, new builds, drainage applications — Gold leads sent to WhatsApp. Free scan for groundworkers.',
};

export function TradeGroundworkers() {
  return <TradePage data={data} />;
}
