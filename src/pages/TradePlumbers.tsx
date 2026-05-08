import { TradePage, type TradePageData } from '../components/TradePage';

const data: TradePageData = {
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
    ['EPC retrofit signals', 'F/G rated properties need boiler upgrades, pipe insulation, and heating system replacements. JobFilter cross-references EPC data with planning approvals to find the highest-intent leads.'],
    ['Council contracts', 'Social housing plumbing upgrades, school refurbishments, council building maintenance — public tenders with named buyers and defined budgets.'],
  ],
  howItWorks: [
    ['01', 'Enter your postcode', 'Tell us where you work. We scan planning portals, EPC registers, and council contracts within your radius.'],
    ['02', 'We filter for plumbing', 'Bathroom installs, boiler replacements, new-build plumbing, pipe upgrades — only signals that match your trade score high.'],
    ['03', 'Gold leads hit WhatsApp', 'When a planning app is approved for a bathroom extension or a property hits F-rated EPC, you know before anyone else.'],
  ],
  tradeLeadExample: {
    title: 'Two-storey extension — full plumbing spec required',
    rows: [
      ['Trade', 'Plumbing'],
      ['Area', 'B14 / Solihull'],
      ['Value', '£8k-£15k plumbing package'],
      ['Urgency', 'Planning approved — work starts Q2'],
      ['Official Source', 'Planning Portal — 94% confidence'],
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
    '£6.99/week (£29/mo) — all plumbing signals, unlimited',
    'Every signal is exclusive — no one else sees your scan',
    'We score every signal. GOLD means worth chasing',
    'Official planning data, EPC ratings, council contracts',
    'Buyer name, value, urgency shown before you act',
    'No contracts. Cancel anytime. 30-day guarantee',
  ],
  ctaPostcode: 'B1',
  metaTitle: 'How Plumbers Find Work Before It Hits MyBuilder — JobFilter',
  metaDescription: 'JobFilter scans planning applications, EPC data, and council contracts for plumbing jobs. Gold leads sent to WhatsApp before they hit MyBuilder or Checkatrade. Free scan.',
};

export function TradePlumbers() {
  return <TradePage data={data} />;
}
