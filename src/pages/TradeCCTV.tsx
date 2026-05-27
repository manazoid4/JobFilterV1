"use client";
import { TradePage, type TradePageData } from '../components/TradePage';

const data: TradePageData = {
  slug: 'cctv-security',
  trade: 'CCTV & Security Installers',
  tradePlural: 'CCTV & Security Installers',
  headline: 'How Security Installers Win Commercial Contracts From',
  highlightedPhrase: 'Licensing Applications',
  sub: 'Most councils make CCTV a condition of any new licensed premises — bars, restaurants, off-licences. HMO licence applications drive residential security demand. Commercial planning for retail and hospitality triggers security system requirements. JobFilter scans licensing and planning applications across 400+ councils and flags security installation opportunities before the applicant starts looking for an installer.',
  painPoints: [
    ['Licensed premises applicants find security installers too late', 'A bar or restaurant gets its licence granted. The conditions include a requirement for an approved CCTV system within 30 days. They search Google in a panic. You have 30 days to win the job or lose it to whoever ranks highest.'],
    ['HMO licensing security requirements are reactive', 'HMO licence applicants are told by the council they need an intruder alarm or entry system. They ask whoever the letting agent recommends. You\'re not in that conversation unless you knew about the HMO application before the licence was granted.'],
    ['Commercial retail fit-outs need CCTV from day one', 'Retail and hospitality fit-out planning applications always include a security specification requirement. But nobody tracks these planning applications for security installers — they\'re just filed and forgotten in planning portals.'],
    ['NACOSS and NSI-approved work is hard to find without a pipeline', 'Being NACOSS or NSI approved means you can win premium commercial security contracts. But the premium work goes to firms that find it early — not firms waiting for the phone to ring.'],
  ],
  stats: [
    ['Every new licensed premises', 'requires a CCTV system as standard council condition'],
    ['£1,500-£15,000', 'Average commercial CCTV and security installation value'],
    ['400+', 'Councils scanned for licensing and planning applications'],
    ['HMO licensing', 'drives recurring residential security demand across all regions'],
  ],
  signals: [
    ['Licensed premises applications', 'New premises licence applications for bars, restaurants, off-licences, and nightclubs almost universally carry CCTV conditions. We flag them the moment the application is filed — before the licence is even granted.'],
    ['HMO licence applications', 'HMO licensing applications that require fire alarm and intruder alarm compliance are flagged with property size, bed count, and the specific security conditions attached. You\'re first contact before the landlord starts searching.'],
    ['Commercial planning applications', 'Retail fit-out planning, hospitality venue planning, and mixed-use commercial developments all carry security specification requirements. Flagged at application stage with estimated installation value.'],
  ],
  howItWorks: [
    ['01', 'Enter your postcode', 'Tell us where you install. We scan licensed premises applications, HMO licensing, and commercial planning approvals within your working radius.'],
    ['02', 'Security signals get scored', 'Bar and restaurant licence applications, HMO security conditions, commercial retail planning — each scored by estimated install value and how urgent the compliance requirement is.'],
    ['03', 'Gold leads fire to WhatsApp', 'A new licence application for a restaurant in your area with a CCTV condition attached is a £2,500-£6,000 installation. You get the alert before the applicant even knows they need an installer.'],
  ],
  tradeLeadExample: {
    title: 'New premises licence — CCTV condition attached',
    rows: [
      ['Trade', 'CCTV & Security Installer'],
      ['Area', 'E1 / Whitechapel, London'],
      ['Value', '£2,500-£6,000 CCTV installation'],
      ['Urgency', 'Licence application filed — conditional on CCTV within 30 days of grant'],
      ['Signal type', 'Verified licensing signal — 96% confidence'],
      ['Signal', 'New restaurant and bar premises licence application filed — standard council CCTV condition expected on grant'],
    ],
    tags: ['Verified signal', 'Compliance deadline', 'Free preview'],
  },
  whatsappMessage: `GOLD LEAD — CCTV & Security Installer
Area: E1 / Whitechapel, London
Value: £2,500-£6,000 CCTV installation
Urgency: Licence application filed — CCTV condition on grant (30 days)
Why it matters: New restaurant/bar — CCTV standard council condition
Action: Open notice → jobfilter.uk/lead/cctv677`,
  comparisonOld: [
    'Wait for licence holders to search Google under compliance deadline pressure',
    'HMO licensing security requirements — you find out after the landlord panics',
    'Commercial retail planning with security needs invisible in planning portals',
    'Lose to whoever the letting agent or pub chain already uses',
    'Compete on price for reactive installs with no relationship established',
    'No pipeline — impossible to plan stock, engineers, or subcontractors',
  ],
  comparisonNew: [
    '£39/month founder — all security signals, unlimited licensing and planning scans',
    'Licensed premises applications flagged before the licence is granted',
    'HMO security conditions identified at application stage — before the landlord is told',
    'Commercial retail planning with security specifications flagged at planning stage',
    'WhatsApp alerts within minutes of licensing application or planning approval',
    'No contracts. Cancel anytime. 30-day guarantee',
  ],
  ctaPostcode: 'E1',
  metaTitle: 'How CCTV & Security Installers Win Commercial Contracts From Licensing Applications — JobFilter',
  metaDescription: 'JobFilter scans licensed premises applications, HMO licensing, and planning across 400+ councils for CCTV and security installation opportunities. Gold leads sent to WhatsApp. Free scan.',
};

export function TradeCCTV() {
  return <TradePage data={data} />;
}
