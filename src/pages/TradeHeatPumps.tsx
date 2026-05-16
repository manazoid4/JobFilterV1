import { TradePage, type TradePageData } from '../components/TradePage';

const data: TradePageData = {
  slug: 'heat-pump-installers',
  trade: 'Heat Pump Installers',
  tradePlural: 'Heat Pump Installers',
  headline: 'How Heat Pump Installers Find Retrofit Work Before the',
  highlightedPhrase: 'Deadline',
  sub: '165,000 rental properties in the UK are rated F or G. Every one needs upgrading by 2030 or it can\'t be legally let. JobFilter flags these properties before landlords even know they need you. The £15bn Warm Homes Plan means the work is funded. The question is who gets there first.',
  painPoints: [
    ['Landlords don\'t know they need you yet', 'Most landlords with F/G rated properties haven\'t thought about the 2030 deadline. Waiting for them to post a job means waiting forever.'],
    ['BUS grant applications are competitive', 'The Boiler Upgrade Scheme gives £7,500 off a heat pump install. But homeowners don\'t know about it, and installers who find them first win the job.'],
    ['Energy data is public but unusable', 'The official data is out there — but it\'s a 30-million-row spreadsheet. You can\'t search by postcode, filter by rating, or get alerts when a property changes status.'],
    ['The installer gap is real — but shrinking', 'The UK needs 7.5x more heat pump installers than it has today. Right now there\'s a gold rush. In 18 months there won\'t be.'],
  ],
  stats: [
    ['165,000', 'F/G rated rental properties needing upgrades'],
    ['£15bn', 'Warm Homes Plan funding available'],
    ['£7,500', 'Boiler Upgrade Scheme grant per install'],
    ['7.5x', 'More installers needed to meet 2030 targets'],
  ],
  signals: [
    ['Energy efficiency signals', '165,000 F/G rated rental properties that legally must be upgraded by 2030. JobFilter flags them by postcode, cross-references with ownership data, and scores by retrofit likelihood.'],
    ['Planning applications', 'Extensions and new builds often pair with heating system upgrades. When planning is approved for an extension on an F-rated property, that\'s a high-probability heat pump lead.'],
    ['Council retrofit contracts', 'Local authority warm home programmes, social housing retrofit schemes, and council-funded upgrade projects — all with named buyers and defined budgets.'],
  ],
  howItWorks: [
    ['01', 'Enter your postcode', 'Tell us where you install. We scan for low-rated properties in your area, cross-reference with planning approvals, and flag the best opportunities.'],
    ['02', 'Retrofit signals get scored', 'Properties with F/G ratings, planning applications for extensions (often paired with heating upgrades), and council retrofit contracts — all scored for you.'],
    ['03', 'Gold alerts hit WhatsApp', 'An F-rated property on your street just got planning approval for an extension? That\'s a heat pump opportunity. You know before the landlord does.'],
  ],
  tradeLeadExample: {
    title: 'F-rated semi-detached — planning approved for extension',
    rows: [
      ['Trade', 'Heat Pump / Retrofit'],
      ['Area', 'BS4 / Bristol'],
      ['Value', '£8k-£14k install (after BUS grant)'],
      ['Urgency', 'Low energy rating + extension approved — high retrofit likelihood'],
      ['Signal type', 'Verified energy + planning signals — 89% confidence'],
      ['Signal', 'Low-rated property, extension approved, landlord-owned'],
    ],
    tags: ['Energy signal', 'Grant eligible', 'Free preview'],
  },
  whatsappMessage: `GOLD LEAD — Heat Pump / Retrofit
Area: BS4 / Bristol
Value: £8k-£14k install (after BUS grant)
Urgency: Low energy rating + extension approved
Why it matters: F-rated semi, extension approved, landlord-owned
Action: Open notice → jobfilter.uk/lead/jkl012`,
  comparisonOld: [
    'Waiting for homeowners to search "heat pump installer"',
    'Competing on Checkatrade with 5 other installers',
    'No visibility into which properties actually need work',
    'BUS grant awareness is low — you educate every prospect',
    'Official energy data is a 30-million-row spreadsheet',
    'No way to get alerts when a property becomes eligible',
  ],
  comparisonNew: [
    '£39/month founder — all energy and retrofit signals, unlimited',
    'F/G rated properties flagged by postcode automatically',
    'Cross-referenced with planning data for higher intent',
    'BUS grant eligibility shown on every lead',
    'WhatsApp alerts when a new retrofit opportunity appears',
    'No contracts. Cancel anytime. 30-day guarantee',
  ],
  ctaPostcode: 'BS1',
  metaTitle: 'How Heat Pump Installers Find Retrofit Work Before the Deadline — JobFilter',
  metaDescription: 'JobFilter scans energy efficiency signals and planning applications to find heat pump install jobs before landlords know they need them. 165,000 F/G rated properties. Free scan.',
};

export function TradeHeatPumps() {
  return <TradePage data={data} />;
}


