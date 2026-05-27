"use client";
import { TradePage, type TradePageData } from '../components/TradePage';

const data: TradePageData = {
  slug: 'fibre-installers',
  trade: 'Fibre Installers',
  tradePlural: 'Fibre Installers',
  headline: 'How Fibre Installers Win New Build Contracts Before',
  highlightedPhrase: 'Tender Closes',
  sub: 'Every new build in the UK must be equipped with gigabit-capable broadband under the Building Regulations — it\'s the law. Every residential planning approval for new homes is a FTTP installation contract. JobFilter scans planning approvals across 400+ councils and flags new build fibre opportunities the day they\'re granted, before the developer appoints an installer.',
  painPoints: [
    ['New build FTTP contracts go to whoever the developer already uses', 'Developers have a preferred telecoms installer. Unless you\'re on their list, you miss every new build contract in your area — even though every single one legally requires FTTP.'],
    ['OFCOM rollout zone data is useful but hard to act on', 'OFCOM publishes broadband rollout data, but it doesn\'t tell you which specific addresses are unconnected, who the property owner is, or when they\'re likely to want installation. It\'s research, not a lead.'],
    ['Commercial structured cabling tenders are buried in procurement portals', 'Office fit-outs, school network upgrades, and commercial refurbishments requiring structured cabling are significant contracts. But they\'re published as procurement notices in portals that nobody in the trade monitors.'],
    ['Street works coordination slows reactive installs', 'Installing fibre to unconnected streets requires street works permits and utility coordination. You can\'t plan this reactively. You need to know about new build approvals months before the developer needs the cable pulled.'],
  ],
  stats: [
    ['3 million+', 'New FTTP connections targeted per year under UK rollout plans'],
    ['£200-£600', 'Average residential FTTP installation value'],
    ['£5k-£50k', 'Commercial structured cabling contract value per project'],
    ['100%', 'New builds legally require gigabit-capable broadband by regulation'],
  ],
  signals: [
    ['Residential planning approvals', 'Every new build planning approval — single dwelling, terrace, estate — is a legal FTTP installation requirement. We flag them the day planning is granted with unit count and estimated installation contract value.'],
    ['Commercial planning applications', 'Office fit-outs, school refurbishments, retail and mixed-use developments all require structured data cabling contracts. Flagged with floor area, building type, and estimated contract value.'],
    ['OFCOM rollout signals', 'OFCOM connectivity data cross-referenced with planning approvals and property transactions identifies the highest-priority unconnected areas in your operating region — for proactive rollout tendering.'],
  ],
  howItWorks: [
    ['01', 'Enter your postcode', 'Tell us where you operate. We scan new build planning approvals, commercial fit-out planning, and OFCOM rollout data within your working radius.'],
    ['02', 'Fibre signals get scored', 'New build estate approvals, commercial fit-out planning, unconnected property clusters — each scored by installation contract value and how early in the procurement cycle you can engage.'],
    ['03', 'Gold leads fire to WhatsApp', 'An 85-unit residential development approved in your area is a FTTP contract worth £17,000-£51,000. You get the alert before the developer starts thinking about telecoms.'],
  ],
  tradeLeadExample: {
    title: '85-unit residential development — FTTP + structured cabling required',
    rows: [
      ['Trade', 'Fibre / FTTP Installer'],
      ['Area', 'BS1 / Bristol City Centre'],
      ['Value', '£17,000-£51,000 FTTP installation contract'],
      ['Urgency', 'Planning approved 11 days ago'],
      ['Signal type', 'Verified planning signal — 99% confidence'],
      ['Signal', '85-unit residential new build — gigabit FTTP legally required for all units under Building Regulations Part R'],
    ],
    tags: ['Verified signal', 'Legal requirement', 'Free preview'],
  },
  whatsappMessage: `GOLD LEAD — Fibre / FTTP Installer
Area: BS1 / Bristol City Centre
Value: £17,000-£51,000 FTTP installation
Urgency: Planning approved 11 days ago
Why it matters: 85-unit new build — FTTP legally required for all units
Action: Open notice → jobfilter.uk/lead/fib334`,
  comparisonOld: [
    'Rely on developer relationships — miss everything outside your existing network',
    'OFCOM rollout data is research, not a lead — no actionable timing',
    'Commercial structured cabling tenders closed before you find them',
    'New build FTTP contracts placed months before you see the site hoarding',
    'Compete on price with national telecoms contractors for every opportunity',
    'Can\'t plan crews or materials without a forward pipeline',
  ],
  comparisonNew: [
    '£39/month founder — all fibre signals, unlimited new build and planning scans',
    'New build planning approvals flagged with unit count and FTTP contract value',
    'Commercial fit-out planning identified at application stage for early tendering',
    'Building Regulations Part R compliance requirements flagged for every eligible approval',
    'WhatsApp alerts within minutes of planning approval',
    'No contracts. Cancel anytime. 30-day guarantee',
  ],
  ctaPostcode: 'BS1',
  metaTitle: 'How Fibre Installers Win New Build Contracts Before Tender Closes — JobFilter',
  metaDescription: 'JobFilter scans planning applications across 400+ councils for FTTP and fibre installation opportunities. New builds, commercial fit-outs, Part R compliance — Gold leads sent to WhatsApp. Free scan for fibre installers.',
};

export function TradeFibreInstallers() {
  return <TradePage data={data} />;
}
