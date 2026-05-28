"use client";
import { TradePage, type TradePageData } from '../components/TradePage';

const data: TradePageData = {
  slug: 'decorators',
  trade: 'Decorators',
  tradePlural: 'Decorators',
  headline: 'How Decorators Find Work From',
  highlightedPhrase: 'Planning Approvals',
  sub: 'Every extension approval means a freshly plastered space that needs painting. Every new build completion means dozens of homeowners who need interior decoration done before they move in. Every property transaction means a new owner who wants the place looking like theirs. JobFilter finds those jobs weeks before the homeowner starts asking around.',
  painPoints: [
    ['Word of mouth dries up without warning', 'Decorating work runs on referrals — until it doesn\'t. One slow month becomes two, and suddenly you\'re back to quoting jobs you won\'t win. You need a way to find work that doesn\'t depend on who you happen to know.'],
    ['Extension work goes to whoever the builder recommends', 'Homeowners building an extension ask their builder who they use for decorating. Unless you\'re already on that builder\'s list, you never hear about the job — even though it\'s happening two streets away.'],
    ['New build estate work is all or nothing', 'Developers want one decorator firm for the whole estate. If you\'re not in conversation early, you miss it entirely. By the time the completion notices go out, the work is already allocated.'],
    ['Property transaction leads are too slow', 'You know new homeowners always redecorate. But by the time they\'re settled in and asking for quotes, three other decorators have already knocked on the door or been recommended by the estate agent.'],
  ],
  stats: [
    ['40,000+', 'New builds completed annually — all need interior decoration'],
    ['£1,500-£8,000', 'Average decorator job value per property'],
    ['230,000+', 'Property transactions in England and Wales per year'],
    ['400+', 'Councils scanned for planning and completion signals'],
  ],
  signals: [
    ['Planning applications', 'Extension approvals mean new rooms that need decorating. Loft conversions create fresh plasterwork that needs painting. We flag planning approvals at the point of decision — weeks before the build is finished.'],
    ['New build completions', 'Residential planning approvals for estates of 10 or more units represent significant decoration contracts. We identify these at planning stage so you can approach the developer before the work is allocated.'],
    ['Property transactions', 'New homeowners overwhelmingly redecorate within the first 12 months. We cross-reference recent transactions with property age and condition signals to identify the most likely prospects in your area.'],
  ],
  howItWorks: [
    ['01', 'Enter your postcode', 'Tell us where you work. We scan planning approvals, new build notices, and property transaction data within your working radius.'],
    ['02', 'Decoration signals get scored', 'Extension completions, new build estate approvals, and post-transaction property flags — each scored by job value and how close to ready the property is.'],
    ['03', 'Gold leads fire to WhatsApp', 'A 45-unit estate completion in your area or a cluster of new owners who need the place refreshed? You get the alert before they start asking around on Facebook.'],
  ],
  tradeLeadExample: {
    title: 'New build estate completion — decorator packages needed',
    rows: [
      ['Trade', 'Decorator / Interior Painting'],
      ['Area', 'OX4 / Oxford East'],
      ['Value', '£1,500-£4,500 per unit — 45 units flagged'],
      ['Urgency', 'Completion notices filed — first occupancies in 3-4 weeks'],
      ['Signal type', 'Verified planning signal — 90% confidence'],
      ['Signal', '45-unit residential new build, completion stage reached, decoration packages required before handover'],
    ],
    tags: ['Verified signal', 'High value', 'Free preview'],
  },
  whatsappMessage: `GOLD LEAD — Decorator
Area: OX4 / Oxford East
Value: £1,500-£4,500 per unit — 45 units
Urgency: Completion notices filed, occupancy in 3-4 weeks
Why it matters: New build estate — decoration packages needed before handover
Action: Open notice → jobfilter.uk/lead/dec594`,
  comparisonOld: [
    'Depend on word of mouth — feast or famine with no predictability',
    'Miss extension jobs because builders use their own preferred decorator',
    'No visibility into new build estate contracts before they\'re allocated',
    'By the time you hear about property transactions, others are already quoting',
    'Compete with every local decorator on price on Facebook Marketplace',
    'No pipeline — you can\'t plan materials or subcontractor availability',
  ],
  comparisonNew: [
    '£39/month founder — all decorator signals, unlimited area scans',
    'Extension approvals flagged weeks before the plastering is even dry',
    'New build estate completions identified at planning stage',
    'Property transaction signals cross-referenced with decoration likelihood',
    'WhatsApp alerts within minutes of planning approval or completion notice',
    'No contracts. Cancel anytime. 30-day guarantee',
  ],
  ctaPostcode: 'OX4',
  metaTitle: 'How Decorators Find Work From Planning Approvals — JobFilter',
  metaDescription: 'JobFilter scans planning applications and property transactions across 400+ councils for decorator opportunities. Extensions, new builds, property sales — Gold leads sent to WhatsApp. Free scan for decorators.',
};

export function TradeDecorators() {
  return <TradePage data={data} />;
}
