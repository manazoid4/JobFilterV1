import { TradePage, type TradePageData } from '../components/TradePage';

const data: TradePageData = {
  slug: 'electricians',
  trade: 'Electricians',
  tradePlural: 'Electricians',
  headline: 'How Electricians Find Planning-Approved Jobs Before Anyone',
  highlightedPhrase: 'Quotes',
  sub: 'Every planning application for an extension, loft conversion, or new build needs an electrician. JobFilter finds them at the approval stage — weeks before the homeowner starts looking. You quote first. You win.',
  painPoints: [
    ['Directories sell the same lead to 6 sparkies', 'You pay £90/month for a "lead" that five other electricians also get. The homeowner compares prices and picks the lowest. You undercut yourself.'],
    ['EV charger leads are commoditised', 'Bark and Checkatrade flood you with "need EV charger" enquiries. Half the people haven\'t even got off-street parking. You waste fuel driving to surveys that go nowhere.'],
    ['Rewire jobs go to whoever turns up first', 'A homeowner needs a full rewire. The first electrician who surveys gets the job 70% of the time. If you\'re waiting for a directory alert, you\'re already late.'],
    ['Part P compliance work is invisible online', 'Landlord EICR tests, consumer unit upgrades, fuse board replacements — these don\'t get posted on job boards. But they show up in planning approvals and verified energy signals.'],
  ],
  stats: [
    ['90,500', 'Monthly searches for "electrician near me"'],
    ['18,100', 'Monthly searches for "EV charger installation"'],
    ['5,400', 'Monthly searches for "house rewire cost"'],
    ['3,500+', 'Planning apps/week needing electrical work'],
  ],
  signals: [
    ['Planning applications', 'Every extension, loft conversion, and new build needs full electrical installation. We flag approved applications before the homeowner posts the job anywhere.'],
    ['Energy efficiency signals', 'Low-rated properties often need consumer unit upgrades, rewires, and heating system electrics. Verified official signals show which properties need work — before they post anywhere.'],
    ['Public contracts', 'School rewires, social housing electrical upgrades, street lighting contracts — public tenders with named buyers and defined scopes.'],
  ],
  howItWorks: [
    ['01', 'Set your patch', 'Enter your postcode and radius. We scan verified signals across planning approvals, energy ratings, and public contracts in your area.'],
    ['02', 'Electrical signals get scored', 'Rewires, consumer unit upgrades, EV charger installs, new-build electrics — we flag the ones worth chasing and bin the rest.'],
    ['03', 'Gold alerts fire to WhatsApp', 'Planning approved for a loft conversion? Verified signal shows a low-rated rental needing an EICR? You know within minutes — before the job is posted anywhere.'],
  ],
  tradeLeadExample: {
    title: 'Full house rewire — Victorian terrace, 4 bed',
    rows: [
      ['Trade', 'Electrical'],
      ['Area', 'M20 / Manchester'],
      ['Value', '£6k-£10k rewire'],
      ['Urgency', 'Planning approved — homeowner actively searching'],
      ['Signal type', 'Verified planning + energy signal — 91% confidence'],
      ['Detail', 'Extension approved, low energy rating, no contractor yet'],
    ],
    tags: ['Verified signal', 'High intent', 'Free preview'],
  },
  whatsappMessage: `GOLD LEAD — Electrical
Area: M20 / Manchester
Value: £6k-£10k rewire
Urgency: Planning approved — homeowner actively searching
Why it matters: Victorian terrace, low energy rating, extension approved
Action: Open notice → jobfilter.uk/lead/def456`,
  comparisonOld: [
    '£50-£150/month per category on directories',
    'Same lead sold to 5-6 other electricians',
    'No budget check — you find out on the call',
    'EV charger leads with no off-street parking',
    'You drive to surveys that never convert',
    '12-month contracts with no cancellation',
  ],
  comparisonNew: [
    '£39/month founder flat — all electrical signals, unlimited',
    'No shared auction — lead goes to you, not five other sparkies',
    'Estimated value shown before you chase',
    'Verified signals show which properties actually need work',
    'Planning approvals surface jobs before they\'re posted',
    'No contracts. Cancel anytime. 30-day guarantee',
  ],
  ctaPostcode: 'M1',
  metaTitle: 'How Electricians Find Planning-Approved Jobs Before Anyone Quotes — JobFilter',
  metaDescription: 'JobFilter finds electrical jobs from planning applications, verified energy signals, and council contracts. Gold leads sent to WhatsApp before they hit directories. Free scan for electricians.',
};

export function TradeElectricians() {
  return <TradePage data={data} />;
}


