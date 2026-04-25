import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock_key', {
  apiVersion: '2023-10-16' as any,
});

// ==========================================
// LEAD ENGINE TYPES
// ==========================================

interface Lead {
  id: string;
  title: string;
  trade: string;
  location: string;
  postcodeOutward: string;
  estimatedValue: string;
  urgency: 'low' | 'medium' | 'high';
  source: string;
  sourceConfidence: number;
  contactInfo?: { name?: string; phone?: string; email?: string };
  status: 'open';
  score: number;
  postedDate: string;
  description: string;
}

// ==========================================
// DOMESTIC LEADS DATASET
// ==========================================

const DOMESTIC_LEADS: (Omit<Lead, 'score' | 'postcodeOutward'> & { region: string })[] = [
  // West Midlands
  { id: 'd-wm-1', title: 'Boiler Replacement – Vaillant 10yr old, no hot water', trade: 'plumbing', location: 'Birmingham, B15', region: 'West Midlands', estimatedValue: '£2,800–£3,500', urgency: 'high', source: 'Local Network', sourceConfidence: 82, contactInfo: { name: 'T. Sharma', phone: '07700 900 112' }, status: 'open', postedDate: new Date(Date.now() - 86400000).toISOString(), description: 'Vaillant boiler 10 years old, stopped producing hot water 2 days ago. Need full replacement inc flue. 3-bed semi.' },
  { id: 'd-wm-2', title: 'Full Rewire – 3-bed semi, no RCD boards', trade: 'electrical', location: 'Coventry, CV5', region: 'West Midlands', estimatedValue: '£3,800–£5,200', urgency: 'medium', source: 'Local Network', sourceConfidence: 78, contactInfo: { name: 'Mrs Patel' }, status: 'open', postedDate: new Date(Date.now() - 172800000).toISOString(), description: 'Full rewire required on 1970s 3-bed semi. No RCD boards, old rubber wiring. Needs full certificate.' },
  { id: 'd-wm-3', title: 'Roof Replacement – Tiles Slipping, Active Leak', trade: 'roofing', location: 'Wolverhampton, WV3', region: 'West Midlands', estimatedValue: '£9,000–£14,000', urgency: 'high', source: 'Local Network', sourceConfidence: 90, contactInfo: { name: 'D. Williams', phone: '07700 900 441' }, status: 'open', postedDate: new Date(Date.now() - 43200000).toISOString(), description: 'Tiles slipping, water ingress in loft confirmed. 4-bed detached, approx 80sqm. Needs full re-roof in concrete tile.' },
  { id: 'd-wm-4', title: 'Kitchen Extension – Single Storey 4x4m', trade: 'building', location: 'Solihull, B91', region: 'West Midlands', estimatedValue: '£28,000–£40,000', urgency: 'low', source: 'Planning Applications', sourceConfidence: 88, contactInfo: { name: 'J. & S. Thompson' }, status: 'open', postedDate: new Date(Date.now() - 259200000).toISOString(), description: 'Planning approved for single-storey rear kitchen extension, 4m x 4m. Full build including bi-fold doors and lantern roof.' },
  { id: 'd-wm-5', title: 'EV Charger Install – 7kW home unit required', trade: 'electrical', location: 'Dudley, DY1', region: 'West Midlands', estimatedValue: '£750–£1,100', urgency: 'medium', source: 'Local Network', sourceConfidence: 75, contactInfo: { name: 'R. Khan' }, status: 'open', postedDate: new Date(Date.now() - 86400000).toISOString(), description: 'Need 7kW OLEV-approved EV charger installed. New Tesla Model Y, off-road parking available. OZEV grant eligible.' },
  // Greater Manchester
  { id: 'd-gm-1', title: 'Loft Conversion – Dormer, 2 beds + bathroom', trade: 'building', location: 'Manchester, M20', region: 'Greater Manchester', estimatedValue: '£42,000–£58,000', urgency: 'low', source: 'Planning Applications', sourceConfidence: 91, contactInfo: { name: 'A. Clarke' }, status: 'open', postedDate: new Date(Date.now() - 345600000).toISOString(), description: 'Planning approved. Dormer loft conversion creating 2 bedrooms and ensuite. Structural drawings complete. Need full build team.' },
  { id: 'd-gm-2', title: 'Power Flush – 14 radiators, cold spots', trade: 'plumbing', location: 'Salford, M6', region: 'Greater Manchester', estimatedValue: '£450–£650', urgency: 'medium', source: 'Local Network', sourceConfidence: 72, contactInfo: { name: 'Mr Okafor', phone: '07700 900 837' }, status: 'open', postedDate: new Date(Date.now() - 86400000).toISOString(), description: '14-radiator system with significant cold spots bottom 50%. Boiler runs fine but system inefficient. Needs full power flush and inhibitor.' },
  { id: 'd-gm-3', title: 'Bathroom Refit – Full suite replacement', trade: 'plumbing', location: 'Stockport, SK4', region: 'Greater Manchester', estimatedValue: '£4,500–£7,000', urgency: 'low', source: 'Local Network', sourceConfidence: 70, contactInfo: { name: 'H. Brennan' }, status: 'open', postedDate: new Date(Date.now() - 518400000).toISOString(), description: 'Full bathroom refit. Remove existing suite, tile floor + walls, fit new shower enclosure, WC, basin, bath. Supply or fit-only considered.' },
  { id: 'd-gm-4', title: 'Consumer Unit Upgrade – Old fuse box, tenant complaint', trade: 'electrical', location: 'Bolton, BL3', region: 'Greater Manchester', estimatedValue: '£700–£1,000', urgency: 'high', source: 'Local Network', sourceConfidence: 85, contactInfo: { name: 'P. Arora (Landlord)', phone: '07700 900 229' }, status: 'open', postedDate: new Date(Date.now() - 43200000).toISOString(), description: 'Old BS3036 rewireable fuse board in rental property. EICR failed, tenant flagged. Needs new 18-way consumer unit with RCBOs ASAP.' },
  { id: 'd-gm-5', title: 'Flat Roof Replacement – Garage + extension', trade: 'roofing', location: 'Bury, BL9', region: 'Greater Manchester', estimatedValue: '£3,200–£5,500', urgency: 'medium', source: 'Local Network', sourceConfidence: 77, contactInfo: { name: 'S. Whittle' }, status: 'open', postedDate: new Date(Date.now() - 172800000).toISOString(), description: 'Existing felt flat roof on garage and kitchen extension both failing. Approx 60sqm total. Preferably GRP fibreglass replacement.' },
  // West Yorkshire
  { id: 'd-wy-1', title: 'Damp Proof Course – 1930s terrace, rising damp', trade: 'building', location: 'Leeds, LS6', region: 'West Yorkshire', estimatedValue: '£1,800–£3,200', urgency: 'high', source: 'Local Network', sourceConfidence: 80, contactInfo: { name: 'O. Jenkins', phone: '07700 900 553' }, status: 'open', postedDate: new Date(Date.now() - 86400000).toISOString(), description: 'Rising damp visible in front room and hallway. 1930s terrace, no existing DPC. Needs injection + replastering affected areas.' },
  { id: 'd-wy-2', title: 'Solar PV + Battery – 10 panels + 5kWh storage', trade: 'electrical', location: 'Bradford, BD9', region: 'West Yorkshire', estimatedValue: '£8,500–£12,000', urgency: 'low', source: 'Local Network', sourceConfidence: 73, contactInfo: { name: 'F. Hussain' }, status: 'open', postedDate: new Date(Date.now() - 432000000).toISOString(), description: '10-panel 3.7kWp solar system + 5kWh battery storage required. 3-bed semi south-facing roof. MCS-certified installer required for SEG.' },
  { id: 'd-wy-3', title: 'Ridge & Hip Tile Repoint – Half hip roof', trade: 'roofing', location: 'Huddersfield, HD4', region: 'West Yorkshire', estimatedValue: '£900–£1,600', urgency: 'medium', source: 'Local Network', sourceConfidence: 76, contactInfo: { name: 'C. Brook' }, status: 'open', postedDate: new Date(Date.now() - 259200000).toISOString(), description: 'Ridge and hip tiles loose after recent storms. Half-hip roof on 1960s bungalow. Need full repoint in dry mortar mix.' },
  { id: 'd-wy-4', title: 'New Staircase – Straight flight, oak finish', trade: 'carpentry', location: 'Wakefield, WF1', region: 'West Yorkshire', estimatedValue: '£2,800–£4,500', urgency: 'low', source: 'Local Network', sourceConfidence: 68, contactInfo: { name: 'L. Hargreaves' }, status: 'open', postedDate: new Date(Date.now() - 604800000).toISOString(), description: 'Existing pine staircase needs replacing with new straight-flight oak staircase. 13 risers, balustrade included. Supply and fit.' },
  // East London
  { id: 'd-el-1', title: 'Kitchen Extension – Planning approved, 5x4m', trade: 'building', location: 'Hackney, E8', region: 'East London', estimatedValue: '£45,000–£65,000', urgency: 'low', source: 'Planning Applications', sourceConfidence: 94, contactInfo: { name: 'M. & K. Osei' }, status: 'open', postedDate: new Date(Date.now() - 259200000).toISOString(), description: 'Planning approved rear kitchen extension, 5x4m wraparound. Bifold doors, skylight, underfloor heating. SE1 structural engineer appointed.' },
  { id: 'd-el-2', title: 'Bathroom + En-suite Install – New build fit-out', trade: 'plumbing', location: 'Stratford, E15', region: 'East London', estimatedValue: '£6,500–£9,500', urgency: 'medium', source: 'Local Network', sourceConfidence: 83, contactInfo: { name: 'H. Developments Ltd', phone: '07700 900 761' }, status: 'open', postedDate: new Date(Date.now() - 86400000).toISOString(), description: 'Small developer needs plumber to fit out 2 bathrooms in 2-bed flat. First fix complete. Need 2nd fix, tiling, and commissioning.' },
  { id: 'd-el-3', title: 'Emergency Leak – Burst pipe, ceiling damage', trade: 'plumbing', location: 'Bow, E3', region: 'East London', estimatedValue: '£300–£800', urgency: 'high', source: 'Local Network', sourceConfidence: 95, contactInfo: { name: 'Y. Okonkwo', phone: '07700 900 004' }, status: 'open', postedDate: new Date(Date.now() - 7200000).toISOString(), description: 'Burst pipe in ceiling – water leaking into front room. Stop valve closed but needs fix today. Possible floor replacement.' },
  // North West London
  { id: 'd-nwl-1', title: 'Full Rewire + Smart Home Wiring – 5-bed Victorian', trade: 'electrical', location: 'Hampstead, NW3', region: 'North West London', estimatedValue: '£12,000–£18,000', urgency: 'medium', source: 'Local Network', sourceConfidence: 87, contactInfo: { name: 'Beaumont Property' }, status: 'open', postedDate: new Date(Date.now() - 172800000).toISOString(), description: '5-bed Victorian terrace full rewire + Cat6 data points, speaker cable, Ring doorbell circuits, EV point in garage. Full cert required.' },
  // South East London
  { id: 'd-sel-1', title: 'Roof Repair – Chimney stack repointing + flashing', trade: 'roofing', location: 'Lewisham, SE13', region: 'South East London', estimatedValue: '£1,200–£2,200', urgency: 'medium', source: 'Local Network', sourceConfidence: 79, contactInfo: { name: 'B. Forde' }, status: 'open', postedDate: new Date(Date.now() - 345600000).toISOString(), description: 'Chimney stack crumbling mortar + failed lead flashing causing minor leak. Victorian terraced house. Scaffold may be needed.' },
  // Merseyside
  { id: 'd-ms-1', title: 'Heating System Install – New build, first fix + second fix', trade: 'plumbing', location: 'Liverpool, L1', region: 'Merseyside', estimatedValue: '£5,500–£8,000', urgency: 'medium', source: 'Local Network', sourceConfidence: 84, contactInfo: { name: 'Mersey Build Ltd', phone: '07700 900 882' }, status: 'open', postedDate: new Date(Date.now() - 86400000).toISOString(), description: 'New build 3-bed terrace, gas heating system first and second fix. Underfloor heating ground floor + rads upstairs. Combi boiler.' },
  { id: 'd-ms-2', title: 'Render Removal + Re-render – 1950s bungalow', trade: 'building', location: 'Wirral, CH49', region: 'Merseyside', estimatedValue: '£4,500–£7,500', urgency: 'low', source: 'Local Network', sourceConfidence: 70, contactInfo: { name: 'R. Dolan' }, status: 'open', postedDate: new Date(Date.now() - 518400000).toISOString(), description: 'Existing sand-cement render blown and cracking on 3 elevations. 1950s bungalow. Hack off and re-render in K-Rend or similar.' },
  // Edinburgh
  { id: 'd-ed-1', title: 'Tenement Flat Rewire – Common close + 3 flats', trade: 'electrical', location: 'Edinburgh, EH6', region: 'Edinburgh', estimatedValue: '£8,000–£12,000', urgency: 'medium', source: 'Local Network', sourceConfidence: 82, contactInfo: { name: 'Edinburgh Factor Ltd' }, status: 'open', postedDate: new Date(Date.now() - 172800000).toISOString(), description: 'Victorian tenement, 3 flats requiring full rewire including common close. EICR expired 2023. All owners agreed to proceed.' },
  // Glasgow
  { id: 'd-gl-1', title: 'Boiler Swap – LPG to Mains Gas Conversion', trade: 'plumbing', location: 'Glasgow, G11', region: 'Glasgow', estimatedValue: '£3,200–£5,000', urgency: 'medium', source: 'Local Network', sourceConfidence: 78, contactInfo: { name: 'W. McAllister', phone: '07700 900 311' }, status: 'open', postedDate: new Date(Date.now() - 172800000).toISOString(), description: 'Mains gas now connected to street. Converting existing LPG system to mains. Remove LPG tank, new combi boiler, adjust pipework.' },
  // Cardiff
  { id: 'd-cf-1', title: 'Extension + Garage Conversion – Double up', trade: 'building', location: 'Cardiff, CF14', region: 'Cardiff', estimatedValue: '£35,000–£55,000', urgency: 'low', source: 'Planning Applications', sourceConfidence: 89, contactInfo: { name: 'G. Davies' }, status: 'open', postedDate: new Date(Date.now() - 345600000).toISOString(), description: 'Planning approved for 3x4m rear extension + integral garage conversion. Combined project. Looking for main contractor.' },
  // Bristol
  { id: 'd-bs-1', title: 'Hardwood Floor Install – 80sqm, engineered oak', trade: 'carpentry', location: 'Bristol, BS6', region: 'Bristol', estimatedValue: '£4,200–£6,500', urgency: 'low', source: 'Local Network', sourceConfidence: 71, contactInfo: { name: 'J. Whitfield' }, status: 'open', postedDate: new Date(Date.now() - 432000000).toISOString(), description: '80sqm engineered oak flooring, supply and fit. Living room + hallway + dining room. Underfloor heating below, needs floating floor system.' },
  // Southampton
  { id: 'd-so-1', title: 'Flat Roof Leak – EPDM replacement needed', trade: 'roofing', location: 'Southampton, SO17', region: 'Southampton', estimatedValue: '£2,800–£4,500', urgency: 'high', source: 'Local Network', sourceConfidence: 81, contactInfo: { name: 'T. Nguyen', phone: '07700 900 663' }, status: 'open', postedDate: new Date(Date.now() - 43200000).toISOString(), description: 'EPDM flat roof over kitchen extension leaking at upstand. 35sqm. Old felt underneath failing. Want full EPDM replacement.' },
  // Nottingham
  { id: 'd-ng-1', title: 'HMO Compliance Works – 6-bed, fire cert required', trade: 'electrical', location: 'Nottingham, NG7', region: 'Nottingham', estimatedValue: '£3,500–£5,500', urgency: 'high', source: 'Local Network', sourceConfidence: 88, contactInfo: { name: 'East Midlands Rentals', phone: '07700 900 174' }, status: 'open', postedDate: new Date(Date.now() - 86400000).toISOString(), description: 'HMO licence renewal requires fire alarm upgrade to Grade A system, emergency lighting, and full EICR. 6-bed property. Deadline in 6 weeks.' },
  // Newcastle
  { id: 'd-ne-1', title: 'Pointing + Tuck Pointing – Victorian terrace, 3 elevations', trade: 'building', location: 'Newcastle, NE4', region: 'Newcastle', estimatedValue: '£2,200–£3,800', urgency: 'medium', source: 'Local Network', sourceConfidence: 74, contactInfo: { name: 'A. Gibson' }, status: 'open', postedDate: new Date(Date.now() - 259200000).toISOString(), description: 'Victorian brick terrace, mortar failing on 3 elevations. Rake out and repoint in lime mortar. Scaffold required. Listed building, lime mortar only.' },
  // Surrey
  { id: 'd-sr-1', title: 'ASHP Installation – Air source heat pump, 4-bed', trade: 'hvac', location: 'Guildford, GU1', region: 'Surrey', estimatedValue: '£9,000–£14,000', urgency: 'low', source: 'Local Network', sourceConfidence: 77, contactInfo: { name: 'P. Morrison' }, status: 'open', postedDate: new Date(Date.now() - 432000000).toISOString(), description: '4-bed detached, removing gas boiler. Install 10kW ASHP + new UFH on ground floor + oversized rads upstairs. MCS cert required for BUS grant.' },
  // Kent
  { id: 'd-kt-1', title: 'Conservatory Roof Replacement – Solid tiled roof', trade: 'roofing', location: 'Maidstone, ME15', region: 'Kent', estimatedValue: '£7,500–£12,000', urgency: 'medium', source: 'Local Network', sourceConfidence: 76, contactInfo: { name: 'R. & T. Spencer' }, status: 'open', postedDate: new Date(Date.now() - 345600000).toISOString(), description: 'Polycarbonate conservatory roof replacement with solid insulated tiled system. 5x3.5m conservatory. Too hot in summer, cold in winter.' },
  // Hertfordshire
  { id: 'd-hf-1', title: 'Landscaping + Driveaway – Block pave, 3 cars', trade: 'landscaping', location: 'St Albans, AL1', region: 'Hertfordshire', estimatedValue: '£8,000–£14,000', urgency: 'low', source: 'Local Network', sourceConfidence: 69, contactInfo: { name: 'N. Goldstein' }, status: 'open', postedDate: new Date(Date.now() - 518400000).toISOString(), description: 'Existing lawn to 3-car block paved driveway. Approx 75sqm. New dropped kerb already approved. Needs drainage + permeable paving (SUDS compliant).' },
  // North Yorkshire
  { id: 'd-ny-1', title: 'Holiday Let Refurb – Full internal redecoration', trade: 'painting', location: 'Harrogate, HG2', region: 'North Yorkshire', estimatedValue: '£3,500–£5,500', urgency: 'medium', source: 'Local Network', sourceConfidence: 73, contactInfo: { name: 'Dales Retreats Ltd', phone: '07700 900 507' }, status: 'open', postedDate: new Date(Date.now() - 172800000).toISOString(), description: '4-bed holiday cottage full internal redecoration. Walls, woodwork, ceilings. Has been let for 8 years. Needs prep + 2 coats throughout.' },
  // Staffordshire
  { id: 'd-st-1', title: 'New Build Plastering – Block and beam new build, 4 bed', trade: 'building', location: 'Stafford, ST16', region: 'Staffordshire', estimatedValue: '£6,000–£9,000', urgency: 'medium', source: 'Local Network', sourceConfidence: 79, contactInfo: { name: 'Staffordshire Homes Ltd' }, status: 'open', postedDate: new Date(Date.now() - 172800000).toISOString(), description: 'New build 4-bed detached, block and beam construction. Need skim plaster throughout including garage conversion. Approx 300sqm.' },
  // Berkshire
  { id: 'd-bk-1', title: 'Whole House Painting – 5 bed detached, inside and out', trade: 'painting', location: 'Reading, RG6', region: 'Berkshire', estimatedValue: '£7,500–£12,000', urgency: 'low', source: 'Local Network', sourceConfidence: 71, contactInfo: { name: 'B. & C. Hawkins' }, status: 'open', postedDate: new Date(Date.now() - 432000000).toISOString(), description: '5-bed detached, full interior + exterior redecoration. Interior: 12 rooms, woodwork, ceilings. Exterior: render, soffits, fascias, windows.' },
  // Peterborough
  { id: 'd-pe-1', title: 'Central Heating First Fix – New self-build', trade: 'plumbing', location: 'Peterborough, PE3', region: 'Peterborough', estimatedValue: '£4,200–£6,500', urgency: 'medium', source: 'Local Network', sourceConfidence: 80, contactInfo: { name: 'M. Kowalski', phone: '07700 900 390' }, status: 'open', postedDate: new Date(Date.now() - 259200000).toISOString(), description: 'Self-build 3-bed bungalow. Need plumber for heating first fix – pipework, rads, underfloor ground floor. Plot stage: slab done, walls rising.' },
  // Generic high-value commercial leads available anywhere
  { id: 'd-gen-1', title: 'School HVAC Maintenance Contract – 3yr term', trade: 'hvac', location: 'Regional Schools Trust', region: 'United Kingdom', estimatedValue: '£24,000/yr', urgency: 'medium', source: 'Contracts Finder (Gov.uk)', sourceConfidence: 91, contactInfo: { name: 'Facilities Manager', email: 'facilities@schoolstrust.ac.uk' }, status: 'open', postedDate: new Date(Date.now() - 172800000).toISOString(), description: '3-year HVAC maintenance contract for 4 primary schools. Quarterly PPM visits + callout cover. Gas Safe + REFCOM required.' },
  { id: 'd-gen-2', title: 'Housing Association Void Works – 40 properties', trade: 'building', location: 'Social Housing', region: 'United Kingdom', estimatedValue: '£180,000', urgency: 'high', source: 'Contracts Finder (Gov.uk)', sourceConfidence: 93, contactInfo: { name: 'Procurement Team' }, status: 'open', postedDate: new Date(Date.now() - 86400000).toISOString(), description: 'Void property refurbishment contract – 40 properties requiring kitchens, bathrooms, decoration, and general repairs. 6-month contract, renewable.' },
  { id: 'd-gen-3', title: 'Commercial Electrical Inspection Contract – Office estate', trade: 'electrical', location: 'National', region: 'United Kingdom', estimatedValue: '£35,000', urgency: 'medium', source: 'Contracts Finder (Gov.uk)', sourceConfidence: 89, contactInfo: { name: 'FM Operations' }, status: 'open', postedDate: new Date(Date.now() - 259200000).toISOString(), description: 'EICR inspections across 12 office buildings in UK. Approx 80,000sqm total. 18-month programme. Accredited contractor required.' },
];

// ==========================================
// LEAD ENGINE HELPERS
// ==========================================

async function lookupPostcode(postcode: string): Promise<any> {
  const clean = postcode.replace(/\s+/g, '').toUpperCase();
  try {
    const r = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(clean)}`, {
      signal: AbortSignal.timeout(5000),
    });
    const data = await r.json() as any;
    if (data.status === 200) return data.result;
  } catch {}
  return null;
}

function getOutward(postcode: string): string {
  return postcode.trim().toUpperCase().split(' ')[0];
}

function regionFromPostcode(postcode: string): string {
  const prefix = getOutward(postcode).replace(/[0-9\s]/g, '').toUpperCase();
  const map: Record<string, string> = {
    'B': 'West Midlands', 'CV': 'West Midlands', 'WV': 'West Midlands', 'WS': 'West Midlands', 'DY': 'West Midlands',
    'M': 'Greater Manchester', 'SK': 'Greater Manchester', 'OL': 'Greater Manchester', 'WN': 'Greater Manchester', 'BL': 'Greater Manchester',
    'LS': 'West Yorkshire', 'BD': 'West Yorkshire', 'HX': 'West Yorkshire', 'WF': 'West Yorkshire', 'HD': 'West Yorkshire',
    'S': 'South Yorkshire', 'DN': 'South Yorkshire', 'HU': 'East Yorkshire',
    'L': 'Merseyside', 'CH': 'Merseyside',
    'E': 'East London', 'EC': 'City of London', 'N': 'North London', 'NW': 'North West London',
    'SE': 'South East London', 'SW': 'South West London', 'W': 'West London', 'WC': 'Central London',
    'EH': 'Edinburgh', 'G': 'Glasgow', 'FK': 'Stirling', 'DD': 'Dundee', 'AB': 'Aberdeen',
    'CF': 'Cardiff', 'SA': 'Swansea', 'NP': 'Newport',
    'BS': 'Bristol', 'BA': 'Bath',
    'SO': 'Southampton', 'PO': 'Portsmouth', 'BN': 'Brighton',
    'NG': 'Nottingham', 'DE': 'Derby', 'LE': 'Leicester',
    'OX': 'Oxford', 'MK': 'Milton Keynes',
    'CM': 'Essex', 'CO': 'Essex', 'IP': 'Suffolk', 'NR': 'Norfolk',
    'YO': 'North Yorkshire', 'HG': 'North Yorkshire', 'TS': 'Teesside',
    'NE': 'Newcastle', 'SR': 'Sunderland', 'DH': 'County Durham',
    'PE': 'Peterborough', 'CB': 'Cambridge', 'SG': 'Hertfordshire',
    'AL': 'Hertfordshire', 'HP': 'Hertfordshire', 'EN': 'Hertfordshire',
    'TW': 'Surrey', 'KT': 'Surrey', 'SM': 'Surrey', 'CR': 'Surrey', 'RH': 'Surrey', 'GU': 'Surrey',
    'DA': 'Kent', 'ME': 'Kent', 'CT': 'Kent', 'TN': 'Kent',
    'RG': 'Berkshire', 'SL': 'Berkshire',
    'NN': 'Northamptonshire',
    'TA': 'Somerset', 'EX': 'Devon', 'PL': 'Plymouth', 'TR': 'Cornwall',
    'GL': 'Gloucestershire', 'HR': 'Herefordshire', 'TF': 'Telford', 'ST': 'Staffordshire',
    'WR': 'Worcestershire', 'LL': 'North Wales', 'BT': 'Northern Ireland',
    'BH': 'Bournemouth', 'DT': 'Dorset', 'IV': 'Inverness', 'KA': 'Ayrshire',
  };
  for (const key of Object.keys(map).sort((a, b) => b.length - a.length)) {
    if (prefix.startsWith(key)) return map[key];
  }
  return 'United Kingdom';
}

async function fetchContractsFinder(trade: string, outward: string): Promise<Lead[]> {
  const keywords: Record<string, string> = {
    plumbing: 'plumbing heating boiler',
    electrical: 'electrical installation wiring',
    roofing: 'roofing flat roof tiles',
    building: 'refurbishment construction building works',
    carpentry: 'carpentry joinery timber',
    painting: 'decorating painting redecoration',
    landscaping: 'grounds maintenance landscaping',
    hvac: 'HVAC ventilation air conditioning',
    all: 'maintenance repair building works',
  };
  const keyword = keywords[trade] || keywords.all;
  try {
    const url = `https://www.contractsfinder.service.gov.uk/Published/Notices/PublicSearch/Search?NoticeType=0&Keyword=${encodeURIComponent(keyword)}&Page=1&PageSize=15&SortBy=0`;
    const r = await fetch(url, {
      headers: { 'Accept': 'application/json', 'User-Agent': 'JobFilter/1.0' },
      signal: AbortSignal.timeout(8000),
    });
    if (!r.ok) return [];
    const data = await r.json() as any;
    const notices: any[] = data?.results || data?.Results || [];
    return notices.slice(0, 8).map((n: any, i: number) => {
      const rawVal = Number(n.valueLow || n.ValueLow || n.value || n.Value || 50000);
      const urgency: Lead['urgency'] = rawVal > 100000 ? 'high' : rawVal > 20000 ? 'medium' : 'low';
      return {
        id: `cf-${n.id || n.Id || i}`,
        title: (n.title || n.Title || 'Commercial Contract').substring(0, 80),
        trade: trade === 'all' ? 'building' : trade,
        location: n.organisationAddress?.town || n.Location || 'United Kingdom',
        postcodeOutward: outward,
        estimatedValue: formatValue(rawVal),
        urgency,
        source: 'Contracts Finder (Gov.uk)',
        sourceConfidence: 85,
        contactInfo: { name: n.organisationName || n.OrganisationName },
        status: 'open' as const,
        score: 0,
        postedDate: n.publishedDate || n.PublishedDate || new Date().toISOString(),
        description: (n.description || n.Description || 'Government/public sector procurement opportunity.').substring(0, 200),
      };
    });
  } catch {
    return [];
  }
}

function formatValue(v: number): string {
  if (v >= 1000000) return `£${(v / 1000000).toFixed(1)}M`;
  if (v >= 1000) return `£${(v / 1000).toFixed(0)}k`;
  return `£${v}`;
}

function getDomesticLeads(region: string, trade: string, outward: string): Lead[] {
  const filtered = DOMESTIC_LEADS.filter(l => {
    const regionMatch = l.region === region || l.region === 'United Kingdom';
    const tradeMatch = trade === 'all' || l.trade === trade;
    return regionMatch && tradeMatch;
  });

  const results = filtered.length >= 4 ? filtered : [
    ...filtered,
    ...DOMESTIC_LEADS.filter(l => l.region === 'United Kingdom' && (trade === 'all' || l.trade === trade)),
    ...DOMESTIC_LEADS.filter(l => trade === 'all' || l.trade === trade).slice(0, 6),
  ].slice(0, 12);

  return results.map(({ region: _r, ...l }) => ({
    ...l,
    postcodeOutward: outward,
    id: `${l.id}-${outward}`,
  }));
}

function scoreLead(l: Lead): number {
  let s = l.sourceConfidence;
  if (l.urgency === 'high') s += 30;
  else if (l.urgency === 'medium') s += 15;
  if (l.contactInfo?.phone) s += 20;
  if (l.contactInfo?.email) s += 15;
  if (l.contactInfo?.name && !l.contactInfo.name.includes('Unlock')) s += 10;
  if (l.description.length > 120) s += 5;
  const valStr = l.estimatedValue.replace(/£|,/g, '');
  if (valStr.includes('M')) s += 40;
  else if (valStr.includes('k')) s += Math.min(parseInt(valStr) || 0, 30);
  return s;
}

// ==========================================
// LEAD SCAN ENDPOINT
// ==========================================

async function buildLeadEngine(app: express.Express) {
  app.post("/api/leads/scan", async (req, res) => {
    const { postcode, trade = 'all', tier = 'free' } = req.body;
    if (!postcode || postcode.trim().length < 2) {
      return res.status(400).json({ error: 'Valid UK postcode required' });
    }

    const outward = getOutward(postcode);
    const [postcodeInfo, contractLeads] = await Promise.all([
      lookupPostcode(postcode),
      fetchContractsFinder(trade, outward),
    ]);

    const region = postcodeInfo?.region || regionFromPostcode(postcode);
    const domesticLeads = getDomesticLeads(region, trade, outward);

    let allLeads: Lead[] = [...contractLeads, ...domesticLeads];
    allLeads = allLeads.map(l => ({ ...l, score: scoreLead(l) }));
    allLeads = allLeads
      .filter(l => l.sourceConfidence >= 60)
      .sort((a, b) => b.score - a.score);

    const total = allLeads.length;
    const lockedCount = tier === 'free' ? Math.max(0, total - 3) : 0;

    const output = (tier === 'free' ? allLeads.slice(0, 3) : allLeads).map(l => ({
      ...l,
      contactInfo: tier === 'free' && l.contactInfo
        ? {
            name: l.contactInfo.name,
            phone: l.contactInfo.phone ? '*** Upgrade to unlock ***' : undefined,
            email: l.contactInfo.email ? '*** Upgrade to unlock ***' : undefined,
          }
        : l.contactInfo,
    }));

    res.json({ leads: output, total, region, outward, lockedCount });
  });
}

// ==========================================
// SERVER STARTUP
// ==========================================

async function startServer() {
  const app = express();
  app.use(express.json());
  const PORT = 3000;

  await buildLeadEngine(app);

  // WhatsApp Conversational Engine
  app.post("/api/whatsapp/webhook", async (req, res) => {
    const { message, current_state, filter_strength } = req.body;
    let nextState = current_state;
    let reply = "";
    switch (current_state) {
      case 1:
        if (filter_strength == 5) {
          reply = "Hi, I'm the automated assistant. The boss is extremely busy. To even look at your job, we require a fully deductible Priority Booking deposit upfront. Do you agree to pay this?";
          nextState = 4;
        } else {
          reply = "Hi, I'm the automated assistant for this business. To get you a quote faster, I need a few details. What's the job and your postcode?";
          nextState = 2;
        }
        break;
      case 2:
        if (message.length > 20 && message.match(/[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}/i)) {
          if (filter_strength <= 2) {
            reply = "Thanks. We offer a 'Priority Booking' to guarantee a slot. It's a fully deductible deposit against the final bill.";
            nextState = 4;
          } else {
            reply = "Thanks. Boss's orders: I need 1-3 photos or a quick video of the issue before we can proceed. No photos, no quote.";
            nextState = 3;
          }
        } else {
          reply = "Please provide a detailed description of the job AND your full postcode.";
        }
        break;
      case 3:
        if (req.body.has_media) {
          reply = "Got the photos. We offer a 'Priority Booking' to guarantee a slot. It's a fully deductible deposit against the final bill. Do you agree?";
          nextState = 4;
        } else {
          reply = "I still need those photos. Boss won't look at it without visual proof.";
        }
        break;
      case 4:
        if (/yes|ok|deposit/i.test(message)) {
          reply = "Great. Here is your Priority Pass link: [STRIPE_LINK]. Once paid, we'll lock in a time.";
          nextState = 5;
        } else {
          reply = "No problem. We'll add you to the standard waitlist, but we can't guarantee a timeframe.";
        }
        break;
      case 5:
        reply = "Deposit confirmed. Here are the available slots for next week. Reply with your preferred time.";
        break;
      default:
        reply = "How can we help you today?";
        nextState = 1;
    }
    res.json({ reply, nextState });
  });

  // Stripe Priority Pass
  app.post("/api/stripe/priority-pass", async (req, res) => {
    try {
      const { tradie_id, amount = 5000 } = req.body;
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{ price_data: { currency: 'gbp', product_data: { name: 'Priority Booking Deposit', description: 'Fully deductible against your final invoice.' }, unit_amount: amount }, quantity: 1 }],
        mode: 'payment',
        success_url: `${req.headers.origin || 'http://localhost:3000'}/dashboard?payment=success`,
        cancel_url: `${req.headers.origin || 'http://localhost:3000'}/dashboard?payment=cancelled`,
        metadata: { tradie_id },
      });
      res.json({ url: session.url });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({ server: { middlewareMode: true }, appType: "spa" });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => res.sendFile(path.join(distPath, 'index.html')));
  }

  app.listen(PORT, "0.0.0.0", () => console.log(`JobFilter running on http://localhost:${PORT}`));
}

startServer();
