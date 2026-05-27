"use client";
import { TradePage, type TradePageData } from '../components/TradePage';

const data: TradePageData = {
  slug: 'hvac-engineers',
  trade: 'HVAC Engineers',
  tradePlural: 'HVAC Engineers',
  headline: 'How HVAC Engineers Win Commercial Jobs From',
  highlightedPhrase: 'Planning Applications',
  sub: 'Every commercial planning approval — office conversion, school refurb, data centre build, mixed-use development — carries an HVAC specification requirement under Part L of the Building Regulations. JobFilter scans 400+ councils and flags these applications at the point of approval, weeks before the M&E contractor goes out to tender.',
  painPoints: [
    ['Commercial M&E tenders go to framework contractors', 'Procurement frameworks lock most commercial HVAC work to a short list of M&E firms. Unless you\'re on the framework, you\'re tendering blind and late. The only way to change that is to be in conversation before the tender is written.'],
    ['Office-to-residential conversions are huge HVAC contracts', 'Permitted development and full planning approvals for office-to-resi conversions require complete HVAC redesign. These are £45k-£120k contracts — but they\'re sitting in planning portals, not on any M&E tender platform.'],
    ['School refurbishment programmes are missed', 'Local authority school refurb programmes are published as public contracts but they\'re scattered across procurement portals with no trade-specific filtering. By the time you find them, pre-qualification is closed.'],
    ['Part L compliance creates post-approval urgency', 'Planning applications approved after 2023 must meet Part L requirements. Every commercial approval creates an HVAC specification requirement — but the developer often doesn\'t start looking for M&E firms until the approval notice lands.'],
  ],
  stats: [
    ['£4 billion+', 'UK commercial HVAC market annual value'],
    ['£20k-£200k', 'Average commercial HVAC installation value per project'],
    ['400+', 'Councils scanned for commercial planning signals'],
    ['Part L', 'Every new commercial build requires compliant HVAC specification'],
  ],
  signals: [
    ['Commercial planning applications', 'Office conversions, school refurbishments, data centres, retail fit-outs, and mixed-use developments all carry HVAC requirements. Flagged at approval with estimated contract value and building size.'],
    ['Part L compliance signals', 'Post-2023 planning approvals for commercial and large residential buildings must meet Part L energy efficiency requirements. Every qualifying approval is a potential HVAC specification contract.'],
    ['Public sector contracts', 'School refurbishment programmes, NHS building works, and local authority commercial building tenders are published as public contracts — filtered for HVAC relevance, with buyer names and submission deadlines.'],
  ],
  howItWorks: [
    ['01', 'Enter your postcode', 'Tell us where you operate. We scan commercial planning approvals, public sector tenders, and Part L compliance requirements within your working radius.'],
    ['02', 'HVAC signals get scored', 'Office conversions, school refurbs, data centres, large residential — each scored by estimated HVAC contract value and how close to tender stage the project is.'],
    ['03', 'Gold leads fire to WhatsApp', 'An office-to-residential planning approval in your area is a £45k-£120k HVAC contract. You get the alert the day it\'s approved — before the M&E procurement even starts.'],
  ],
  tradeLeadExample: {
    title: 'Office-to-residential conversion — full HVAC specification required',
    rows: [
      ['Trade', 'HVAC Engineer / M&E Contractor'],
      ['Area', 'EC1 / Central London'],
      ['Value', '£45,000-£120,000 HVAC installation'],
      ['Urgency', 'Planning approved 9 days ago'],
      ['Signal type', 'Verified planning signal — 92% confidence'],
      ['Signal', '6-storey office conversion to 28 residential units — full Part L HVAC redesign required'],
    ],
    tags: ['Verified signal', 'High value', 'Free preview'],
  },
  whatsappMessage: `GOLD LEAD — HVAC Engineer
Area: EC1 / Central London
Value: £45,000-£120,000 HVAC installation
Urgency: Planning approved 9 days ago
Why it matters: Office-to-residential conversion — full Part L HVAC spec required
Action: Open notice → jobfilter.uk/lead/hvc362`,
  comparisonOld: [
    'Rely on M&E framework contractor status — miss everything outside it',
    'Find commercial tenders too late to meet pre-qualification deadlines',
    'No visibility into office conversion planning until M&E tender is live',
    'School and public sector refurbs go to authority preferred lists',
    'Compete on price with national M&E contractors for every opportunity',
    'No pipeline — can\'t plan engineer availability or equipment procurement',
  ],
  comparisonNew: [
    '£39/month founder — all HVAC signals, unlimited commercial scans',
    'Office conversion approvals flagged the day planning is granted',
    'Part L compliance requirements identified for every qualifying project',
    'Public sector school and NHS tenders with buyer names and deadlines',
    'WhatsApp alerts within minutes of commercial planning approval',
    'No contracts. Cancel anytime. 30-day guarantee',
  ],
  ctaPostcode: 'EC1',
  metaTitle: 'How HVAC Engineers Win Commercial Jobs From Planning Applications — JobFilter',
  addOns: [
    { slug: 'om-builder', title: 'O  metaDescription:M BUILDER', tagline: 'Operations   metaDescription: Maintenance manual to BSRIA BG 1 standard — ready for client handover.' },
  ],
  metaDescription: 'JobFilter scans commercial planning applications across 400+ councils for HVAC opportunities. Office conversions, school refurbs, data centres — Gold leads sent to WhatsApp. Free scan for HVAC engineers.',
};

export function TradeHVAC() {
  return <TradePage data={data} />;
}
