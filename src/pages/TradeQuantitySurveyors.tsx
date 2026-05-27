"use client";
import { TradePage, type TradePageData } from '../components/TradePage';

const data: TradePageData = {
  slug: 'quantity-surveyors',
  trade: 'Quantity Surveyors',
  tradePlural: 'Quantity Surveyors',
  headline: 'How Quantity Surveyors Win Commissions Before Tender',
  highlightedPhrase: 'Closes',
  sub: 'Commercial planning approvals, large residential developments, public sector frameworks — every major project needs a QS. The problem is that most quantity surveyors hear about opportunities when the tender is already open. JobFilter scans planning data and public procurement portals so you can get into projects during early cost advice stage, not the scramble at tender close.',
  painPoints: [
    ['You\'re brought in at tender stage when it\'s already competitive', 'Developers know they need a QS but they only start looking when the tender is ready. By then you\'re one of five firms quoting for the same commission with no time to differentiate.'],
    ['Public sector frameworks exclude smaller QS practices', 'Council and NHS frameworks lock out smaller quantity surveyors. But early engagement — providing indicative cost advice before the project is fully designed — is how practices get onto preferred lists in the first place.'],
    ['Large residential planning approvals are missed', 'A planning approval for a 50-unit residential development is a significant QS commission opportunity. But it\'s sitting in a planning portal, and no one is flagging it to quantity surveyors at the right moment.'],
    ['School and education sector work goes to sector specialists', 'Education sector QS work is dominated by firms already embedded in LA frameworks. The only way to break in is to identify projects early and position for early cost advice before the framework procurement opens.'],
  ],
  stats: [
    ['~50,000', 'Quantity surveyors practising in the UK'],
    ['£2k-£20k', 'Average QS commission per project'],
    ['400+', 'Councils scanned for commercial and residential planning signals'],
    ['Early cost advice', 'is how QS practices differentiate — timing is everything'],
  ],
  signals: [
    ['Commercial planning applications', 'Office developments, retail schemes, industrial parks, and mixed-use planning approvals all require quantity surveying services. We flag them at approval with estimated project value and procurement stage.'],
    ['Large residential planning', 'Residential developments of 10 or more units are flagged at planning approval with gross development value estimates — identifying QS commission opportunities months before tender stage.'],
    ['Public sector tenders', 'School expansions, NHS building works, local authority capital projects — published as public contracts with named procurement leads, budget estimates, and submission deadlines. Filtered for QS relevance.'],
  ],
  howItWorks: [
    ['01', 'Enter your postcode', 'Tell us where you practice. We scan commercial planning approvals, large residential developments, and public procurement notices within your working radius.'],
    ['02', 'QS signals get scored', 'Large residential approvals, commercial planning, public sector tenders — each scored by estimated commission value, project stage, and how early in the procurement cycle you can engage.'],
    ['03', 'Gold leads fire to WhatsApp', 'A £2.1m school extension tender published nearby, or a 60-unit residential approval with a named developer? You get the alert before the tender window closes.'],
  ],
  tradeLeadExample: {
    title: 'School extension tender — QS services required',
    rows: [
      ['Trade', 'Quantity Surveyor'],
      ['Area', 'Leeds / West Yorkshire'],
      ['Value', '£2.1m project — QS commission estimated £18,000-£32,000'],
      ['Urgency', 'Tender published — submission deadline 14 days'],
      ['Signal type', 'Verified public tender signal — 98% confidence'],
      ['Signal', 'Primary school 6-classroom extension, full QS cost management required, LA-funded capital programme'],
    ],
    tags: ['Verified signal', 'High value', 'Free preview'],
  },
  whatsappMessage: `GOLD LEAD — Quantity Surveyor
Area: Leeds / West Yorkshire
Value: £2.1m project — QS commission est. £18,000-£32,000
Urgency: Tender published — 14 days to submission
Why it matters: Primary school extension — LA-funded, full QS cost management required
Action: Open notice → jobfilter.uk/lead/qs773`,
  comparisonOld: [
    'Hear about tenders when they\'re already open — no time to differentiate',
    'Public sector frameworks exclude smaller practices from the start',
    'Large residential approvals invisible until developer publishes the brief',
    'Education and NHS QS work dominated by embedded framework firms',
    'Compete on fee alone when brought in late — no relationship, no advantage',
    'No forward pipeline — can\'t plan team capacity or BD activity',
  ],
  comparisonNew: [
    '£39/month founder — all QS signals, unlimited planning and tender scans',
    'Commercial and residential approvals flagged at planning stage for early cost advice',
    'Public sector tenders with named buyers, budgets, and submission deadlines',
    'Large residential approvals identified months before developer appoints QS',
    'WhatsApp alerts within minutes of tender publication or planning approval',
    'No contracts. Cancel anytime. 30-day guarantee',
  ],
  ctaPostcode: 'LS1',
  metaTitle: 'How Quantity Surveyors Win Commissions Before Tender Closes — JobFilter',
  metaDescription: 'JobFilter scans planning applications and public tenders across 400+ councils for QS opportunities. Commercial planning, large residential, school tenders — Gold leads sent to WhatsApp. Free scan for quantity surveyors.',
};

export function TradeQuantitySurveyors() {
  return <TradePage data={data} />;
}
