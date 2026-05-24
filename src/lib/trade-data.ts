import { TradePageData } from '../components/TradePage';

export const TRADE_PAGES: Record<string, TradePageData> = {
  plumbers: {
    slug: 'plumbers',
    trade: 'Plumbers',
    tradePlural: 'Plumbers',
    headline: 'How Plumbers Find Work Before It Hits',
    highlightedPhrase: 'MyBuilder',
    sub: 'JobFilter scans planning applications for bathroom installs, boiler upgrades, and new-build plumbing — then sends Gold leads to your WhatsApp before the homeowner posts the job anywhere. No shared leads. No per-lead fees.',
    painPoints: [
      ['Shared lead auctions', 'You pay £80/month on Checkatrade and your "lead" goes to 5 other plumbers. The homeowner picks the cheapest quote. You lose every time.'],
      ['Emergency calls eat your margin', 'You drop a planned job for an emergency callout, drive 40 minutes, and it\'s a loose tap. Your van fuel costs more than the job.'],
      ['Boiler replacement race to the bottom', 'Homeowners post "need new boiler" and get 8 quotes in 24 hours. The only way to win is to be cheapest. That\'s not a business — that\'s a race to zero.'],
      ['No pipeline between jobs', 'You finish a big bathroom install and suddenly your diary is empty for two weeks. Quiet weeks kill cashflow.'],
    ],
    stats: [
      ['3,500+', 'Planning apps/week include plumbing work'],
      ['£15bn', 'Warm Homes Plan creating boiler/heat pump demand'],
      ['165,000', 'F/G rated rentals needing plumbing upgrades by 2030'],
      ['70%', 'Jobs go to the first plumber who quotes'],
    ],
    signals: [
      ['Planning applications', 'Every approved extension, new build, or renovation needs plumbing. We flag them the moment they\'re approved — before the homeowner starts looking for a plumber.'],
      ['Energy efficiency signals', 'F/G rated properties need boiler upgrades, pipe insulation, and heating system replacements. JobFilter cross-references energy efficiency signals with planning approvals to find the highest-intent leads.'],
      ['Council contracts', 'Social housing plumbing upgrades, school refurbishments, council building maintenance — public tenders with named buyers and defined budgets.'],
    ],
    howItWorks: [
      ['01', 'Enter your postcode', 'Tell us where you work. We scan planning approvals, energy efficiency signals, and council contracts within your radius.'],
      ['02', 'We filter for plumbing', 'Bathroom installs, boiler replacements, new-build plumbing, pipe upgrades — only signals that match your trade score high.'],
      ['03', 'Gold leads hit WhatsApp', 'When a planning app is approved for a bathroom extension or a low-rated energy property is flagged, you know before anyone else.'],
    ],
    tradeLeadExample: {
      title: 'Two-storey extension — full plumbing spec required',
      rows: [
        ['Trade', 'Plumbing'],
        ['Area', 'B14 / Solihull'],
        ['Value', '£8k-£15k plumbing package'],
        ['Urgency', 'Planning approved — work starts Q2'],
        ['Signal type', 'Verified planning signal — 94% confidence'],
        ['Signal', 'Extension approved, no contractor named'],
      ],
      tags: ['Verified signal', 'High intent', 'Free preview'],
    },
    whatsappMessage: `GOLD LEAD — Plumbing
Area: B14 / Solihull
Value: £8k-£15k plumbing package
Urgency: Planning approved — work starts Q2
Why it matters: Two-storey extension, no contractor named yet
Action: Open notice → jobfilter.uk/lead/abc123`,
    comparisonOld: [
      'Pay £50-£150/month just to be listed on directories',
      'Leads sold to 4-8 other plumbers — race to the bottom',
      'You call them, filter time-wasters yourself',
      'Hope they have budget. Hope you\'re first.',
      '"Leads" = a name and phone number from a form',
      'No idea if it\'s a real job or a tyre-kicker',
    ],
    comparisonNew: [
      '£39/month founder — all plumbing signals, unlimited',
      'No shared auction — lead goes to you, not five other plumbers',
      'We score every signal. GOLD means worth chasing',
      'Verified planning signals, energy ratings, council contracts',
      'Buyer name, value, urgency shown before you act',
      'No contracts. Cancel anytime. 30-day guarantee',
    ],
    ctaPostcode: 'B1',
    metaTitle: 'How Plumbers Find Work Before It Hits MyBuilder — JobFilter',
    metaDescription: 'JobFilter scans planning applications and verified signals for plumbing jobs. Gold leads sent to WhatsApp before they hit MyBuilder or Checkatrade. Free scan.',
  },
  electricians: {
    slug: 'electricians',
    trade: 'Electricians',
    tradePlural: 'Electricians',
    headline: 'How Electricians Find Work Before It Hits',
    highlightedPhrase: 'Checkatrade',
    sub: 'JobFilter scans planning applications for rewires, extension installs, and commercial fit-outs — then sends Gold leads to your WhatsApp before the directory auctions even start. No shared leads. No per-lead fees.',
    painPoints: [
      ['Directory fees eat your profit', 'You pay £100+/month just to be "visible", then pay again for every lead. Half of them don\'t answer the phone.'],
      ['Race to the bottom quotes', 'Homeowners post "need rewire" and get calls from 6 different sparks. The one who wins is usually the one who cuts corners or has zero overheads.'],
      ['EV charging margin crash', 'EV lead gen is flooded. You\'re competing against national firms with massive marketing budgets. Local sparks are getting left behind.'],
      ['The word-of-mouth trap', 'Word of mouth is great until it stops. If you don\'t have a pipeline, one quiet month can kill your business.'],
    ],
    stats: [
      ['4,200+', 'Planning apps/week include electrical work'],
      ['£20bn', 'Net Zero retrofits creating rewire demand'],
      ['220,000', 'Properties needing EV charger installs'],
      ['65%', 'Jobs won by the first spark to visit'],
    ],
    signals: [
      ['Planning applications', 'Extension approvals, new builds, loft conversions — every single one needs a spark. We flag them the moment they\'re approved.'],
      ['Energy efficiency signals', 'Low-rated properties need solar PV, heat pump connections, and consumer unit upgrades. We cross-reference energy signals with postcode data.'],
      ['Council contracts', 'School maintenance, social housing rewires, street lighting, public building upgrades — public tenders with named buyers.'],
    ],
    howItWorks: [
      ['01', 'Enter your postcode', 'Tell us where you work. We scan planning approvals, energy signals, and council contracts within your radius.'],
      ['02', 'We filter for electrical', 'Rewires, EV installs, solar PV, extensions — only signals that match electrical specs score high.'],
      ['03', 'Gold leads hit WhatsApp', 'When a job scores GOLD for your trade, it fires to your phone within minutes. You\'re first to the door.'],
    ],
    tradeLeadExample: {
      title: 'Full house rewire — planning approved',
      rows: [
        ['Trade', 'Electrical'],
        ['Area', 'M14 / Manchester'],
        ['Value', '£4k-£7k rewire package'],
        ['Urgency', 'Work starting next month'],
        ['Signal type', 'Verified planning signal — 92% confidence'],
        ['Signal', 'Major renovation approved, no contractor named'],
      ],
      tags: ['Verified signal', 'High intent', 'Free preview'],
    },
    whatsappMessage: `GOLD LEAD — Electrical
Area: M14 / Manchester
Value: £4k-£7k rewire package
Urgency: Work starting next month
Why it matters: Major renovation approved, no contractor named yet
Action: Open notice → jobfilter.uk/lead/def456`,
    comparisonOld: [
      'Pay £100+/month directory fees',
      'Leads sold to 5+ other sparks',
      'Hope they answer. Hope they aren\'t price shopping.',
      'Manual searching on council portals',
      'Zero lead scoring — you waste time on junk',
      'Locked into 12-month contracts',
    ],
    comparisonNew: [
      '£39/month founder — all electrical signals, unlimited',
      'No shared auction — lead goes to you privately',
      'We score every signal. GOLD leads only.',
      'Planning, energy, and council signals combined',
      'Buyer name, value, urgency shown early',
      'No contracts. Cancel anytime. 30-day guarantee',
    ],
    ctaPostcode: 'M1',
    metaTitle: 'How Electricians Find Work Before It Hits Checkatrade — JobFilter',
    metaDescription: 'JobFilter scans planning applications and energy signals for electricians. Gold leads sent to WhatsApp before they hit directories. Free scan.',
  },
  builders: {
    slug: 'builders',
    trade: 'Builders',
    tradePlural: 'Builders',
    headline: 'How Builders Find Work Before It Hits',
    highlightedPhrase: 'Checkatrade',
    sub: 'JobFilter scans official planning portals for every extension, loft conversion, and new build approval — then scores them and sends the GOLD leads straight to your phone. No shared leads. No per-lead fees.',
    painPoints: [
      ['Shared lead auctions', 'You pay £80/month for Checkatrade and your "lead" goes to 5 other builders. Homeowner picks the cheapest. You lose every time.'],
      ['Tyre-kicking homeowners', 'People post "thinking about an extension" and waste 3 hours of your time for a quote they can\'t afford. We filter for approved planning only.'],
      ['No pipeline between jobs', 'You finish a 4-month build and suddenly your diary is empty. Scrambling for work kills your margin.'],
      ['Chasing architects', 'Spending days calling architects for referrals, only to find they already have their "preferred" trades.'],
    ],
    stats: [
      ['8,500+', 'Planning applications submitted every week'],
      ['£45bn', 'Estimated value of UK home improvement market'],
      ['22,000', 'New extensions approved every single month'],
      ['72%', 'Jobs won by the first builder who quotes'],
    ],
    signals: [
      ['Planning approvals', 'Every extension, loft conversion, and new build. We flag them the moment they\'re approved — before the homeowner even starts looking for a builder.'],
      ['Energy efficiency signals', 'F/G rated properties needing major retrofits, insulation, and structural upgrades. We cross-reference energy data with planning approvals.'],
      ['Council contracts', 'School refurbishments, social housing maintenance, public building works — tenders with named buyers and defined budgets.'],
    ],
    howItWorks: [
      ['01', 'Enter your postcode', 'Tell us where you work. We scan planning approvals, energy signals, and council contracts within your radius.'],
      ['02', 'We score the lead', 'We look at urgency, value, and source confidence. Only leads that hit 80+ (GOLD) hit your screen.'],
      ['03', 'You get the jump', 'Because we scan official sources, you often find the job before the homeowner has even posted it on a directory.'],
    ],
    tradeLeadExample: {
      title: 'Two-storey side extension — Approved',
      rows: [
        ['Trade', 'General Building'],
        ['Area', 'B14 / Solihull'],
        ['Value', '£45k-£80k build package'],
        ['Urgency', 'Planning approved — work starts Q2'],
        ['Signal type', 'Verified planning signal — 98% confidence'],
        ['Signal', 'Extension approved, no contractor named'],
      ],
      tags: ['Verified signal', 'High intent', 'Free preview'],
    },
    whatsappMessage: `GOLD LEAD — Building
Area: B14 / Solihull
Value: £45k-£80k build package
Urgency: Planning approved — work starts Q2
Why it matters: Two-storey extension, no contractor named yet
Action: Open notice → jobfilter.uk/lead/xyz123`,
    comparisonOld: [
      'Pay £100+/month directory fees',
      'Leads sold to 5+ other builders',
      'Price shopping race to the bottom',
      'Manual searching on planning portals',
      'Zero lead scoring — waste time on tyre-kickers',
      'Locked into 12-month contracts',
    ],
    comparisonNew: [
      '£39/month founder — all building signals, unlimited',
      'No shared auction — lead goes to you privately',
      'We score every signal. GOLD leads only.',
      'Planning, energy, and council signals combined',
      'Buyer name, value, urgency shown early',
      'No contracts. Cancel anytime. 30-day guarantee',
    ],
    ctaPostcode: 'B1',
    metaTitle: 'How Builders Find Work Before It Hits Checkatrade — JobFilter',
    metaDescription: 'JobFilter scans planning portals for every extension and new build approval. Gold leads sent to WhatsApp before they hit directories. Free scan.',
  },
  'heat-pump-installers': {
    slug: 'heat-pump-installers',
    trade: 'Heat Pump Installers',
    tradePlural: 'Heat Pump Installers',
    headline: 'How Heat Pump Installers Find Work Before It Hits',
    highlightedPhrase: 'Google Ads',
    sub: 'JobFilter scans energy efficiency signals and planning approvals to find properties legally required to upgrade — then sends Gold leads to your WhatsApp. No shared leads. No per-lead fees.',
    painPoints: [
      ['Google Ads margin crash', 'Click costs are £10+. You spend £200 for a "lead" that doesn\'t even have a budget for a heat pump.'],
      ['Education fatigue', 'Spending 2 hours on the phone explaining how heat pumps work to people who aren\'t actually buying. We filter for high intent.'],
      ['Grants vs. Reality', 'Homeowners asking about BUS grants but living in properties that aren\'t even insulated yet. We find the ones that are ready.'],
      ['The retrofit lottery', 'No way to know which properties are F/G rated without manual EPC lookups. JobFilter does it for you at scale.'],
    ],
    stats: [
      ['600,000', 'Heat pump target per year by 2028'],
      ['£7,500', 'BUS grant available per install'],
      ['145,000', 'F/G rated properties in West Midlands alone'],
      ['85%', 'Jobs won by the installer who shows the data first'],
    ],
    signals: [
      ['Energy efficiency signals', 'F/G rated properties needing urgent retrofits to stay legally compliant for rental or sale. We flag them the moment they hit the market.'],
      ['Planning applications', 'New builds and major renovations where heat pumps are often a condition of planning. We flag these early in the build cycle.'],
      ['Council contracts', 'Public sector decarbonisation schemes, social housing heat pump rollouts — large-scale contracts with named buyers.'],
    ],
    howItWorks: [
      ['01', 'Enter your postcode', 'Tell us where you work. We scan energy efficiency signals and planning approvals within your radius.'],
      ['02', 'We filter for ASHP', 'We look for properties that meet the technical requirements for a heat pump install and have the budget.'],
      ['03', 'Gold leads hit WhatsApp', 'When a property is flagged as "Retrofit Critical", you get the jump on the competition.'],
    ],
    tradeLeadExample: {
      title: 'Retrofit Critical: F-Rated Rental Property',
      rows: [
        ['Trade', 'Heat Pump / Retrofit'],
        ['Area', 'SW19 / London'],
        ['Value', '£12k-£18k install package'],
        ['Urgency', 'Rental compliance deadline 2025'],
        ['Signal type', 'Verified energy signal — 96% confidence'],
        ['Signal', 'EPC expired/failed, rental property'],
      ],
      tags: ['Verified signal', 'High intent', 'Free preview'],
    },
    whatsappMessage: `GOLD LEAD — Heat Pumps
Area: SW19 / London
Value: £12k-£18k install package
Urgency: Rental compliance deadline 2025
Why it matters: F-rated rental property, needs ASHP for compliance
Action: Open notice → jobfilter.uk/lead/hp789`,
    comparisonOld: [
      'Pay £10+ per click on Google/Facebook',
      'Leads sold to 4 other installers',
      'Manual EPC lookups for every quote',
      'Wait for the phone to ring',
      'No technical lead scoring',
      'Waste time educating non-buyers',
    ],
    comparisonNew: [
      '£39/month founder — all heat pump signals, unlimited',
      'No shared auction — lead goes to you privately',
      'We score every signal. GOLD leads only.',
      'Automated EPC and planning cross-referencing',
      'Compliance deadlines shown early',
      'No contracts. Cancel anytime. 30-day guarantee',
    ],
    ctaPostcode: 'SW1',
    metaTitle: 'How Heat Pump Installers Find Work Before It Hits Google Ads — JobFilter',
    metaDescription: 'JobFilter scans energy signals and planning approvals for heat pump installers. Gold leads sent to WhatsApp. Free scan.',
  },
  roofers: {
    slug: 'roofers',
    trade: 'Roofers',
    tradePlural: 'Roofers',
    headline: 'How Roofers Find Work Before It Hits',
    highlightedPhrase: 'Checkatrade',
    sub: 'JobFilter scans planning portals for major roof replacements, loft conversions, and new build specs — then sends Gold leads to your WhatsApp before the directory auctions start. No shared leads. No per-lead fees.',
    painPoints: [
      ['Shared lead auctions', 'You pay £80/month for Checkatrade and your "lead" goes to 5 other roofers. Homeowner picks the cheapest. You lose every time.'],
      ['Storm chasing is a lottery', 'Waiting for bad weather isn\'t a business model. It\'s a gamble. We find the planned work that happens rain or shine.'],
      ['No pipeline between jobs', 'You finish a big re-roof and suddenly your diary is empty. Scrambling for work kills your margin.'],
      ['Chasing architects', 'Spending days calling architects for referrals, only to find they already have their "preferred" trades.'],
    ],
    stats: [
      ['1,800+', 'Planning apps/week include roofing work'],
      ['£12bn', 'Estimated value of UK roofing market'],
      ['8,000+', 'Loft conversions approved every month'],
      ['68%', 'Jobs won by the first roofer who quotes'],
    ],
    signals: [
      ['Planning applications', 'Loft conversions, extensions, and major roof replacements. We flag them the moment they\'re approved — before the homeowner even starts looking for a roofer.'],
      ['Energy efficiency signals', 'Low-rated properties needing roof insulation and structural upgrades. We cross-reference energy data with planning approvals.'],
      ['Council contracts', 'School roof replacements, social housing maintenance, public building works — tenders with named buyers and defined budgets.'],
    ],
    howItWorks: [
      ['01', 'Enter your postcode', 'Tell us where you work. We scan planning approvals, energy signals, and council contracts within your radius.'],
      ['02', 'We filter for roofing', 'Re-roofs, loft conversions, extension roofing, solar PV prep — only signals that match roofing specs score high.'],
      ['03', 'Gold leads hit WhatsApp', 'When a job scores GOLD for your trade, it fires to your phone within minutes. You\'re first to the door.'],
    ],
    tradeLeadExample: {
      title: 'Major re-roof — Planning approved',
      rows: [
        ['Trade', 'Roofing'],
        ['Area', 'G1 / Glasgow'],
        ['Value', '£15k-£25k roofing package'],
        ['Urgency', 'Work starting next month'],
        ['Signal type', 'Verified planning signal — 94% confidence'],
        ['Signal', 'Major renovation approved, no contractor named'],
      ],
      tags: ['Verified signal', 'High intent', 'Free preview'],
    },
    whatsappMessage: `GOLD LEAD — Roofing
Area: G1 / Glasgow
Value: £15k-£25k roofing package
Urgency: Work starting next month
Why it matters: Major re-roof approved, no contractor named yet
Action: Open notice → jobfilter.uk/lead/roof123`,
    comparisonOld: [
      'Pay £100+/month directory fees',
      'Leads sold to 5+ other roofers',
      'Price shopping race to the bottom',
      'Wait for storm damage to get work',
      'Zero lead scoring — waste time on tyre-kickers',
      'Locked into 12-month contracts',
    ],
    comparisonNew: [
      '£39/month founder — all roofing signals, unlimited',
      'No shared auction — lead goes to you privately',
      'We score every signal. GOLD leads only.',
      'Planning, energy, and council signals combined',
      'Buyer name, value, urgency shown early',
      'No contracts. Cancel anytime. 30-day guarantee',
    ],
    ctaPostcode: 'G1',
    metaTitle: 'How Roofers Find Work Before It Hits Checkatrade — JobFilter',
    metaDescription: 'JobFilter scans planning portals for re-roofs and loft conversions. Gold leads sent to WhatsApp before they hit directories. Free scan.',
  },
};
