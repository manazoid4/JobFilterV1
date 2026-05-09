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
    ['Part P compliance work is invisible online', 'Landlord EICR tests, consumer unit upgrades, fuse board replacements — these don\'t get posted on job boards. But they show up in planning and EPC data.'],
  ],
  stats: [
    ['90,500', 'Monthly searches for "electrician near me"'],
    ['18,100', 'Monthly searches for "EV charger installation"'],
    ['5,400', 'Monthly searches for "house rewire cost"'],
    ['3,500+', 'Planning apps/week needing electrical work'],
  ],
  signals: [
    ['Planning applications', 'Every extension, loft conversion, and new build needs full electrical installation. We flag approved applications before the homeowner posts the job anywhere.'],
    ['EPC data', 'F-rated properties often need consumer unit upgrades, rewires, and heating system electrics. EPC data shows which properties need work — and who owns them.'],
    ['Council contracts', 'School rewires, social housing electrical upgrades, street lighting contracts — public tenders with named buyers and defined scopes.'],
  ],
  howItWorks: [
    ['01', 'Set your patch', 'Enter your postcode and radius. We scan every planning application, EPC register, and council contract in your area.'],
    ['02', 'Electrical signals get scored', 'Rewires, consumer unit upgrades, EV charger installs, new-build electrics — we flag the ones worth chasing and bin the rest.'],
    ['03', 'Gold alerts fire to WhatsApp', 'Planning approved for a loft conversion? EPC shows an F-rated rental needing an EICR? You know within minutes — before the job is posted anywhere.'],
  ],
  tradeLeadExample: {
    title: 'Full house rewire — Victorian terrace, 4 bed',
    rows: [
      ['Trade', 'Electrical'],
      ['Area', 'M20 / Manchester'],
      ['Value', '£6k-£10k rewire'],
      ['Urgency', 'Planning approved — homeowner actively searching'],
      ['Official Source', 'Planning Portal + EPC F-rating — 91% confidence'],
      ['Signal', 'Extension approved, existing F-rated EPC, no contractor'],
    ],
    tags: ['Verified signal', 'High intent', 'Free preview'],
  },
  whatsappMessage: `GOLD LEAD — Electrical
Area: M20 / Manchester
Value: £6k-£10k rewire
Urgency: Planning approved — homeowner actively searching
Why it matters: Victorian terrace, F-rated EPC, extension approved
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
    'Exclusive scans — no one else sees your results',
    'Estimated value shown before you chase',
    'EPC data shows which properties actually need work',
    'Planning data shows jobs before they\'re posted',
    'No contracts. Cancel anytime. 30-day guarantee',
  ],
  ctaPostcode: 'M1',
  metaTitle: 'How Electricians Find Planning-Approved Jobs Before Anyone Quotes — JobFilter',
  metaDescription: 'JobFilter finds electrical jobs from planning applications, EPC data, and council contracts. Gold leads sent to WhatsApp before they hit directories. Free scan for electricians.',
};

export function TradeElectricians() {
  return <TradePage data={data} />;
}


