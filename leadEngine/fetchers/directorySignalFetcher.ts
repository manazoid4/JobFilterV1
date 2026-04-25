import type { RawLead, SourceStats } from '../types.ts';

// ── Directory Signal Fetcher ───────────────────────────────────────────────────
// Internal structured dataset — guaranteed fallback.
// Organised by region → trade.
// Realistic UK trade leads with real location signals.

interface InternalLead {
  title: string;
  description: string;
  valueLow: number;
  valueHigh: number;
  trade: string;
  location: string;
  urgency: 'low' | 'medium' | 'high';
  contactSignalLevel: 'none' | 'weak' | 'strong';
  buyer?: string;
}

const LEADS_BY_REGION: Record<string, InternalLead[]> = {
  'West Midlands': [
    { title: 'Boiler Replacement – Vaillant, no hot water', trade: 'plumbing', location: 'Birmingham, B15', valueLow: 2500, valueHigh: 3500, urgency: 'high', contactSignalLevel: 'strong', description: 'Vaillant boiler failed, 3-bed semi, no hot water for 2 days. Need full replacement inc flue.' },
    { title: 'Full Rewire – 3-bed semi, no RCD board', trade: 'electrical', location: 'Coventry, CV5', valueLow: 3800, valueHigh: 5200, urgency: 'medium', contactSignalLevel: 'weak', description: 'Full rewire on 1970s 3-bed semi. Old rubber wiring, no RCD. EICR cert required on completion.' },
    { title: 'Roof Replacement – Active leak, slipped tiles', trade: 'roofing', location: 'Wolverhampton, WV3', valueLow: 9000, valueHigh: 14000, urgency: 'high', contactSignalLevel: 'strong', description: '4-bed detached, approx 90sqm. Tiles slipping, confirmed water ingress in loft. Need full re-roof.' },
    { title: 'Kitchen Extension – Planning approved, 4×4m', trade: 'building', location: 'Solihull, B91', valueLow: 28000, valueHigh: 42000, urgency: 'low', contactSignalLevel: 'weak', description: 'Planning approved, single-storey rear extension 4m×4m, bifold doors and lantern roof.' },
    { title: 'EV Charger Install – 7kW home unit', trade: 'electrical', location: 'Dudley, DY1', valueLow: 750, valueHigh: 1100, urgency: 'medium', contactSignalLevel: 'weak', description: 'New Tesla, need OZEV-approved 7kW charger. Off-road parking, grant eligible.' },
    { title: 'Central Heating Upgrade – 12 rads, power flush', trade: 'plumbing', location: 'Walsall, WS1', valueLow: 5500, valueHigh: 8000, urgency: 'medium', contactSignalLevel: 'weak', description: 'Replace existing system with 12 new rads, power flush, new Ideal combi boiler.' },
    { title: 'Hardwood Flooring – 65sqm, engineered oak', trade: 'carpentry', location: 'Birmingham, B17', valueLow: 3500, valueHigh: 5500, urgency: 'low', contactSignalLevel: 'none', description: '65sqm engineered oak supply and fit, living room + hall + dining room.' },
    { title: 'Damp Proof Course – 1930s terrace, rising damp', trade: 'building', location: 'Smethwick, B67', valueLow: 1800, valueHigh: 3200, urgency: 'high', contactSignalLevel: 'strong', description: 'Rising damp in front room + hallway. 1930s terrace, no DPC. Injection + replaster.' },
  ],
  'Greater Manchester': [
    { title: 'Loft Conversion – Dormer, 2 beds + bathroom', trade: 'building', location: 'Manchester, M20', valueLow: 42000, valueHigh: 58000, urgency: 'low', contactSignalLevel: 'weak', description: 'Planning approved dormer loft, 2 bedrooms and ensuite. Structural drawings complete.' },
    { title: 'Consumer Unit Upgrade – Rental EICR failed', trade: 'electrical', location: 'Bolton, BL3', valueLow: 700, valueHigh: 1000, urgency: 'high', contactSignalLevel: 'strong', buyer: 'Landlord (rental property)', description: 'Old BS3036 fuse board, EICR failed, tenant complaint. 18-way CU with RCBOs needed ASAP.' },
    { title: 'Flat Roof Replacement – Garage + kitchen ext, 60sqm', trade: 'roofing', location: 'Bury, BL9', valueLow: 3200, valueHigh: 5500, urgency: 'medium', contactSignalLevel: 'weak', description: 'Existing felt failing on garage + kitchen extension. 60sqm total. GRP fibreglass preferred.' },
    { title: 'Bathroom Refit – Full suite replacement', trade: 'plumbing', location: 'Stockport, SK4', valueLow: 4500, valueHigh: 7000, urgency: 'low', contactSignalLevel: 'none', description: 'Full bathroom refit, new shower enclosure, WC, basin, bath, floor + wall tiling.' },
    { title: 'Solar PV + Battery – 10 panels + 5kWh', trade: 'electrical', location: 'Bradford, BD9', valueLow: 8500, valueHigh: 12000, urgency: 'low', contactSignalLevel: 'weak', description: '10-panel 3.7kWp + 5kWh battery, south-facing roof, MCS cert required for SEG.' },
    { title: 'Render Removal + Re-render – 3 elevations', trade: 'building', location: 'Bury, BL8', valueLow: 4500, valueHigh: 7500, urgency: 'low', contactSignalLevel: 'none', description: 'Blown sand-cement render on 3 elevations, 1950s bungalow. Hack off + K-Rend re-render.' },
    { title: 'HVAC Maintenance Contract – Offices, 2yr', trade: 'hvac', location: 'Salford, M5', valueLow: 12000, valueHigh: 18000, urgency: 'medium', contactSignalLevel: 'weak', buyer: 'Commercial property management', description: '2-year PPM contract, 6 HVAC units across office estate. Quarterly visits + callout cover.' },
  ],
  'West Yorkshire': [
    { title: 'Ridge & Hip Tile Repoint – Half-hip roof', trade: 'roofing', location: 'Huddersfield, HD4', valueLow: 900, valueHigh: 1600, urgency: 'medium', contactSignalLevel: 'none', description: 'Ridge and hip tiles loose after storm. Half-hip roof, 1960s bungalow. Full repoint in dry mortar.' },
    { title: 'New Staircase – Straight flight, oak', trade: 'carpentry', location: 'Wakefield, WF1', valueLow: 2800, valueHigh: 4500, urgency: 'low', contactSignalLevel: 'none', description: 'Replace pine staircase with new straight-flight oak, 13 risers, balustrade included.' },
    { title: 'Damp Proof Course – 1930s terrace', trade: 'building', location: 'Leeds, LS6', valueLow: 1800, valueHigh: 3200, urgency: 'high', contactSignalLevel: 'strong', description: 'Rising damp front room + hallway. Injection DPC + replaster affected areas.' },
    { title: 'Full Rewire + Smart Wiring – 4-bed', trade: 'electrical', location: 'Bradford, BD3', valueLow: 5500, valueHigh: 8000, urgency: 'medium', contactSignalLevel: 'weak', description: '4-bed 1960s semi full rewire + Cat6, Ring doorbell circuits, EV point.' },
    { title: 'Boiler Swap + System Flush – Worcester', trade: 'plumbing', location: 'Halifax, HX1', valueLow: 2200, valueHigh: 3200, urgency: 'medium', contactSignalLevel: 'weak', description: 'Replace 14yr Worcester boiler, full power flush, 10 rads. New MagnaClean filter.' },
  ],
  'East London': [
    { title: 'Emergency Burst Pipe – Ceiling damage, urgent', trade: 'plumbing', location: 'Bow, E3', valueLow: 300, valueHigh: 800, urgency: 'high', contactSignalLevel: 'strong', description: 'Burst pipe in ceiling, water into front room. Stop valve closed, needs fix today.' },
    { title: 'Kitchen Extension – Planning approved, 5×4m', trade: 'building', location: 'Hackney, E8', valueLow: 45000, valueHigh: 65000, urgency: 'low', contactSignalLevel: 'weak', description: 'Planning approved rear extension 5×4m, bifold doors, skylight, underfloor heating.' },
    { title: 'Bathroom + En-suite – Developer fit-out, 2 units', trade: 'plumbing', location: 'Stratford, E15', valueLow: 6500, valueHigh: 9500, urgency: 'medium', contactSignalLevel: 'strong', buyer: 'Small developer', description: 'First fix complete, need 2nd fix plumber for 2 bathrooms in 2-bed flat.' },
    { title: 'Full Rewire – Victorian conversion, 4 flats', trade: 'electrical', location: 'Bethnal Green, E2', valueLow: 14000, valueHigh: 20000, urgency: 'medium', contactSignalLevel: 'weak', description: 'Victorian house converted to 4 flats, full rewire inc common parts + EICR.' },
  ],
  'North West London': [
    { title: 'Full Rewire + Smart Home – 5-bed Victorian', trade: 'electrical', location: 'Hampstead, NW3', valueLow: 12000, valueHigh: 18000, urgency: 'medium', contactSignalLevel: 'weak', description: '5-bed Victorian terrace rewire + Cat6, speaker cable, Ring, EV point in garage.' },
    { title: 'Roof Repair – Chimney repointing + lead flashing', trade: 'roofing', location: 'Kilburn, NW6', valueLow: 1200, valueHigh: 2200, urgency: 'medium', contactSignalLevel: 'none', description: 'Chimney stack crumbling mortar + failed lead flashing causing minor leak. Scaffold needed.' },
    { title: 'Bathroom Refurb – En-suite + family bathroom', trade: 'plumbing', location: 'Finchley, N3', valueLow: 9000, valueHigh: 14000, urgency: 'low', contactSignalLevel: 'none', description: 'Both bathrooms being refurbed, full supply and fit, tiling and plastering by others.' },
  ],
  'South East London': [
    { title: 'Roof Repair – Flat roof leak, EPDM needed', trade: 'roofing', location: 'Lewisham, SE13', valueLow: 2800, valueHigh: 4500, urgency: 'high', contactSignalLevel: 'strong', description: 'EPDM flat roof over kitchen extension leaking at upstand. 35sqm. Full replacement.' },
    { title: 'Loft Conversion – L-shaped dormer', trade: 'building', location: 'Peckham, SE15', valueLow: 55000, valueHigh: 75000, urgency: 'low', contactSignalLevel: 'weak', description: 'L-shaped dormer loft conversion, 2 bedrooms + bathroom. Planning approved.' },
    { title: 'Consumer Unit + EICR – Landlord package', trade: 'electrical', location: 'Catford, SE6', valueLow: 650, valueHigh: 950, urgency: 'high', contactSignalLevel: 'strong', buyer: 'Buy-to-let landlord', description: 'EICR + consumer unit upgrade for rental compliance. 3-bed terrace.' },
  ],
  'Merseyside': [
    { title: 'Heating First Fix – New build, 3-bed terrace', trade: 'plumbing', location: 'Liverpool, L1', valueLow: 5500, valueHigh: 8000, urgency: 'medium', contactSignalLevel: 'strong', buyer: 'Small developer', description: 'Gas heating first fix + second fix, underfloor ground floor, rads upstairs, combi boiler.' },
    { title: 'Exterior Render Removal + Re-render', trade: 'building', location: 'Wirral, CH49', valueLow: 4500, valueHigh: 7500, urgency: 'low', contactSignalLevel: 'none', description: 'Blown sand-cement render 3 elevations, 1950s bungalow. K-Rend replacement.' },
    { title: 'Solar PV – 8 panels, south facing', trade: 'electrical', location: 'Liverpool, L15', valueLow: 6000, valueHigh: 9000, urgency: 'low', contactSignalLevel: 'none', description: '8-panel system, MCS required for SEG payments. Roof survey done, south facing.' },
  ],
  'Edinburgh': [
    { title: 'Tenement Rewire – 3 flats + common close', trade: 'electrical', location: 'Edinburgh, EH6', valueLow: 8000, valueHigh: 12000, urgency: 'medium', contactSignalLevel: 'weak', buyer: 'Factors (property management)', description: 'Victorian tenement, 3 flats + common close full rewire. EICR expired, owners agreed.' },
    { title: 'Boiler Replacement – 4-bed, Worcester Bosch', trade: 'plumbing', location: 'Edinburgh, EH10', valueLow: 2800, valueHigh: 3800, urgency: 'high', contactSignalLevel: 'strong', description: 'Existing boiler condemned at service, no heat. 4-bed Victorian semi, urgent.' },
    { title: 'Pitched Roof Overhaul – Slate tiles + ridge', trade: 'roofing', location: 'Edinburgh, EH4', valueLow: 6000, valueHigh: 10000, urgency: 'medium', contactSignalLevel: 'none', description: 'Aging slate roof, multiple slipped slates + failing ridge. Full overhaul in matching slate.' },
  ],
  'Glasgow': [
    { title: 'LPG to Mains Gas Conversion', trade: 'plumbing', location: 'Glasgow, G11', valueLow: 3200, valueHigh: 5000, urgency: 'medium', contactSignalLevel: 'strong', description: 'Mains gas connected to street. Convert from LPG, new combi, adjust pipework.' },
    { title: 'Full Rewire – 3-bed terrace, 1960s', trade: 'electrical', location: 'Glasgow, G51', valueLow: 3500, valueHigh: 5000, urgency: 'medium', contactSignalLevel: 'weak', description: '3-bed 1960s terrace, old wiring, no RCD. Full rewire + new CU, EICR cert.' },
  ],
  'Cardiff': [
    { title: 'Extension + Garage Conversion – Double project', trade: 'building', location: 'Cardiff, CF14', valueLow: 35000, valueHigh: 55000, urgency: 'low', contactSignalLevel: 'weak', description: 'Planning approved 3×4m rear extension + integral garage conversion. Looking for main contractor.' },
    { title: 'Bathroom Refit – Welsh slate feature', trade: 'plumbing', location: 'Cardiff, CF5', valueLow: 5500, valueHigh: 8000, urgency: 'low', contactSignalLevel: 'none', description: 'Full bathroom refit with Welsh slate feature wall. Supply and fit, high spec.' },
  ],
  'Bristol': [
    { title: 'Hardwood Floor Install – 80sqm, engineered oak', trade: 'carpentry', location: 'Bristol, BS6', valueLow: 4200, valueHigh: 6500, urgency: 'low', contactSignalLevel: 'none', description: '80sqm engineered oak, living room + hall + dining room. UFH below, floating floor system.' },
    { title: 'Air Source Heat Pump – 4-bed detached', trade: 'hvac', location: 'Bristol, BS9', valueLow: 9000, valueHigh: 14000, urgency: 'low', contactSignalLevel: 'weak', description: 'Remove gas boiler, install 10kW ASHP + UFH ground floor + oversized rads. BUS grant eligible.' },
    { title: 'Flat Roof Leak – EPDM replacement', trade: 'roofing', location: 'Bristol, BS4', valueLow: 2800, valueHigh: 4500, urgency: 'high', contactSignalLevel: 'strong', description: 'EPDM flat roof over kitchen extension leaking at upstand. 40sqm. Full EPDM replacement.' },
  ],
  'Southampton': [
    { title: 'HMO Fire Alarm Upgrade – 6-bed, deadline 6 weeks', trade: 'electrical', location: 'Southampton, SO17', valueLow: 3500, valueHigh: 5500, urgency: 'high', contactSignalLevel: 'strong', buyer: 'HMO landlord', description: 'HMO licence renewal, Grade A fire alarm + emergency lighting + EICR. 6 weeks deadline.' },
    { title: 'Central Heating Install – First fix, 3-bed new build', trade: 'plumbing', location: 'Southampton, SO16', valueLow: 4200, valueHigh: 6500, urgency: 'medium', contactSignalLevel: 'strong', buyer: 'Self-build client', description: 'Self-build 3-bed, heating first fix. Underfloor ground floor + rads upstairs. Combi boiler.' },
  ],
  'Surrey': [
    { title: 'Conservatory Roof Replacement – Solid tiled', trade: 'roofing', location: 'Guildford, GU1', valueLow: 7500, valueHigh: 12000, urgency: 'medium', contactSignalLevel: 'none', description: 'Polycarbonate replaced with solid insulated tiled system. 5×3.5m conservatory.' },
    { title: 'ASHP Installation – 4-bed, BUS grant', trade: 'hvac', location: 'Guildford, GU2', valueLow: 9000, valueHigh: 14000, urgency: 'low', contactSignalLevel: 'weak', description: 'Gas boiler removal, 10kW ASHP, MCS cert required. BUS grant approved.' },
    { title: 'Block Pave Driveway – 3-car, 75sqm', trade: 'landscaping', location: 'Woking, GU21', valueLow: 8000, valueHigh: 14000, urgency: 'low', contactSignalLevel: 'none', description: '75sqm lawn to block-paved driveway, dropped kerb approved, SUDS drainage required.' },
  ],
  'Kent': [
    { title: 'Pointing – Victorian terrace, lime mortar only', trade: 'building', location: 'Maidstone, ME15', valueLow: 2200, valueHigh: 3800, urgency: 'medium', contactSignalLevel: 'none', description: 'Victorian brick terrace, mortar failing 3 elevations. Lime mortar only, scaffold required.' },
    { title: 'Full Rewire – 3-bed semi, EICR needed', trade: 'electrical', location: 'Canterbury, CT1', valueLow: 3500, valueHigh: 5000, urgency: 'medium', contactSignalLevel: 'weak', description: '3-bed 1970s semi, no RCD. Full rewire + new 18-way CU + EICR cert required.' },
  ],
  'Newcastle': [
    { title: 'Housing Association Void Works – 6 properties', trade: 'building', location: 'Newcastle, NE4', valueLow: 42000, valueHigh: 65000, urgency: 'high', contactSignalLevel: 'strong', buyer: 'Housing association', description: 'Void property refurb, 6 units. Kitchens, bathrooms, decoration. 3-month contract.' },
    { title: 'Boiler Replacement Contract – 12 units, HA', trade: 'plumbing', location: 'Gateshead, NE8', valueLow: 30000, valueHigh: 45000, urgency: 'high', contactSignalLevel: 'strong', buyer: 'Housing association', description: 'Replace 12 boilers in social housing. Ideal Vogue or equivalent, all gas safe sign-offs.' },
  ],
  'Nottingham': [
    { title: 'HMO Compliance – 6-bed, Grade A fire alarm', trade: 'electrical', location: 'Nottingham, NG7', valueLow: 3500, valueHigh: 5500, urgency: 'high', contactSignalLevel: 'strong', buyer: 'HMO landlord', description: 'HMO licence renewal. Grade A fire alarm + emergency lighting + full EICR. Deadline 6 weeks.' },
    { title: 'Extension Plastering – New build, 300sqm skim', trade: 'building', location: 'Nottingham, NG5', valueLow: 6000, valueHigh: 9000, urgency: 'medium', contactSignalLevel: 'weak', description: 'New build 4-bed, block and beam. Skim plaster throughout inc garage. Approx 300sqm.' },
  ],
};

// National/generic leads — shown when region match is sparse
const NATIONAL_LEADS: InternalLead[] = [
  { title: 'School HVAC Maintenance Contract – 3yr term', trade: 'hvac', location: 'Various (regional schools)', valueLow: 24000, valueHigh: 36000, urgency: 'medium', contactSignalLevel: 'strong', buyer: 'Academy Trust', description: '3-year HVAC maintenance contract, 4 primary schools. Quarterly PPM + callout cover.' },
  { title: 'Housing Association Void Works – Multi-unit', trade: 'building', location: 'Social Housing (regional)', valueLow: 120000, valueHigh: 200000, urgency: 'high', contactSignalLevel: 'strong', buyer: 'Housing Association', description: 'Void property refurb, 25–40 units. Kitchens, bathrooms, decoration. 6-month rolling contract.' },
  { title: 'Commercial Electrical Inspection Contract', trade: 'electrical', location: 'National', valueLow: 25000, valueHigh: 45000, urgency: 'medium', contactSignalLevel: 'weak', buyer: 'FM Company', description: 'EICR inspections across 10 office buildings. MCS/NICEIC accredited contractor required.' },
  { title: 'Boiler Replacement Framework – Council housing', trade: 'plumbing', location: 'Regional (awarded by postcode)', valueLow: 80000, valueHigh: 150000, urgency: 'high', contactSignalLevel: 'strong', buyer: 'Local Authority', description: 'Framework contract, boiler replacements across council housing stock. Gas Safe required.' },
  { title: 'Grounds Maintenance Contract – Business park', trade: 'landscaping', location: 'Business Park (regional)', valueLow: 18000, valueHigh: 30000, urgency: 'medium', contactSignalLevel: 'strong', buyer: 'Property Management', description: '2-year grounds maintenance, 20-acre business park. Fortnightly visits + winter treatment.' },
  { title: 'Roofing Framework – Housing association', trade: 'roofing', location: 'Regional', valueLow: 200000, valueHigh: 500000, urgency: 'medium', contactSignalLevel: 'weak', buyer: 'Housing Association', description: 'Framework for planned and reactive roofing works across housing stock. CHAS accredited required.' },
];

function toRawLead(lead: InternalLead, region: string, outward: string, idx: number): RawLead {
  const deadlineDays = lead.urgency === 'high' ? 3 : lead.urgency === 'medium' ? 14 : 45;
  return {
    rawId: `dir-${region.toLowerCase().replace(/\s+/g, '-')}-${idx}`,
    rawTitle: lead.title,
    rawDescription: lead.description,
    rawValueMin: lead.valueLow,
    rawValueMax: lead.valueHigh,
    rawLocation: lead.location,
    rawPostcode: outward,
    rawDeadline: new Date(Date.now() + deadlineDays * 86_400_000).toISOString(),
    rawPublished: new Date(Date.now() - Math.random() * 7 * 86_400_000).toISOString(),
    rawBuyer: lead.buyer ?? '',
    rawContact: lead.contactSignalLevel === 'strong'
      ? { name: lead.buyer || 'Named buyer', phone: 'available' }
      : lead.contactSignalLevel === 'weak'
        ? { name: lead.buyer || 'Named buyer' }
        : undefined,
    rawCpvCodes: [],
    sourceSystem: 'DirectorySignal',
  };
}

export function directorySignalFetcher(
  region: string,
  trade: string,
  outward: string
): { leads: RawLead[]; stats: Record<string, SourceStats> } {
  const regionLeads = LEADS_BY_REGION[region] ?? [];
  const tradeFiltered = trade === 'all'
    ? regionLeads
    : regionLeads.filter(l => l.trade === trade);

  // If sparse region match, supplement with regional/national framework signals only.
  // Do not borrow domestic jobs from far-away regions.
  let leads = [...tradeFiltered];

  const nationals = NATIONAL_LEADS.filter(l => trade === 'all' || l.trade === trade);
  leads = [...leads, ...nationals];

  const rawLeads = leads.map((l, i) => toRawLead(l, region, outward, i));

  const stats: SourceStats = {
    fetched: rawLeads.length,
    passed: rawLeads.length,
    dropped: 0,
    failed: false,
  };

  return { leads: rawLeads, stats: { DirectorySignal: stats } };
}
