import { TradePage, type TradePageData } from '../components/TradePage';

const data: TradePageData = {
  slug: 'builders',
  trade: 'Builders',
  tradePlural: 'Builders',
  headline: 'How Builders Win Extension Jobs From',
  highlightedPhrase: 'Planning Data',
  sub: 'Every approved planning application is a job waiting to be quoted. JobFilter reads planning approvals across 400+ councils and sends you extension, loft, and new-build leads the moment they\'re approved. You\'re on the driveway before the competition knows the job exists.',
  painPoints: [
    ['You hear about jobs too late', 'By the time a planning-approved extension hits MyBuilder, the homeowner has already had 3 quotes. The first builder on site wins 70% of the time.'],
    ['Quiet weeks kill your cashflow', 'You finish a big job and your diary is empty. You\'re not short of skill — you\'re short of pipeline. Planning data shows work coming 2-3 months out.'],
    ['Directories don\'t show project scope', 'A "builder needed" listing tells you nothing. Is it a £5k patch job or a £80k extension? JobFilter shows estimated value before you pick up the phone.'],
    ['You\'re competing with cowboys', 'Shared lead platforms let anyone with a van and a ladder quote. No vetting, no quality bar. You lose jobs to people who can\'t do the work properly.'],
  ],
  stats: [
    ['~3,500', 'Extensions approved per week across the UK'],
    ['400+', 'Councils covered by JobFilter planning scans'],
    ['£85k', 'Average extension job value in the UK'],
    ['70%+', 'Jobs won by the first builder to quote'],
  ],
  signals: [
    ['Planning applications', 'Approved extensions, loft conversions, and new builds — the biggest source of building work in the UK. We scan 400+ councils and flag jobs in your patch.'],
    ['Energy signals', 'Properties flagged for energy upgrades often need structural work, insulation, and full renovations. Cross-referenced with planning approvals for higher-intent leads.'],
    ['Council contracts', 'School refurbishments, social housing projects, council building maintenance — public tenders with named buyers, values, and deadlines.'],
  ],
  howItWorks: [
    ['01', 'Enter your postcode and trade', 'Tell us where you build. We scan planning approvals, council contracts, and energy signals within your working radius.'],
    ['02', 'Extension and new-build leads get flagged', 'Approved applications for extensions, loft conversions, new builds, and commercial fit-outs — scored by value and urgency.'],
    ['03', 'Gold leads fire to your phone', 'Planning approved for a two-storey extension in your patch? You get a WhatsApp alert with the address, estimated value, and source link.'],
  ],
  tradeLeadExample: {
    title: 'Two-storey rear extension + loft conversion',
    rows: [
      ['Trade', 'Building / General'],
      ['Area', 'LS6 / Leeds'],
      ['Value', '£60k-£90k estimated'],
      ['Urgency', 'Planning approved 3 days ago'],
      ['Signal type', 'Verified planning signal — 96% confidence'],
      ['Signal', 'Full plans approved, no contractor named yet'],
    ],
    tags: ['Verified signal', 'High value', 'Free preview'],
  },
  whatsappMessage: `GOLD LEAD — Building
Area: LS6 / Leeds
Value: £60k-£90k estimated
Urgency: Planning approved 3 days ago
Why it matters: Two-storey extension + loft, no contractor named
Action: Open notice → jobfilter.uk/lead/ghi789`,
  comparisonOld: [
    'Pay £80-£150/month for builder leads on directories',
    'Leads shared with 5-8 other builders in your area',
    'No project scope — you drive to quote blind',
    'Cowboys undercutting with no quality bar',
    'You find out about jobs after they\'re posted',
    'Contracts lock you in during quiet months',
  ],
  comparisonNew: [
    '£39/month founder — all building signals, unlimited scans',
    'No shared auction — lead goes to you, not five other builders',
    'Estimated value and project scope shown upfront',
    'Official planning data — approved applications only',
    'Alerts fire within minutes of approval',
    'No contracts. Cancel anytime. 30-day guarantee',
  ],
  ctaPostcode: 'LS1',
  metaTitle: 'How Builders Win Extension Jobs From Planning Data — JobFilter',
  metaDescription: 'JobFilter scans 400+ council planning approvals for extension, loft, and new-build leads. Gold alerts sent to WhatsApp before jobs hit directories. Free scan for builders.',
};

export function TradeBuilders() {
  return <TradePage data={data} />;
}


