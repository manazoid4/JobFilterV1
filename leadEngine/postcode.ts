export interface PostcodeInfo {
  outward: string;
  region: string;
  adminDistrict?: string;
  latitude?: number;
  longitude?: number;
}

const REGION_MAP: Array<[string, string]> = [
  // Length-3 prefixes first (more specific)
  ['NW', 'North West London'], ['SE', 'South East London'], ['SW', 'South West London'],
  ['EC', 'City of London'], ['WC', 'Central London'],
  // Length-2
  ['AB', 'Aberdeen'], ['AL', 'Hertfordshire'], ['BA', 'Bath'],
  ['BD', 'West Yorkshire'], ['BH', 'Bournemouth'], ['BL', 'Greater Manchester'],
  ['BN', 'Brighton'], ['BR', 'South East London'], ['BS', 'Bristol'],
  ['BT', 'Northern Ireland'],
  ['B',  'West Midlands'],
  ['CA', 'Cumbria'], ['CB', 'Cambridge'], ['CF', 'Cardiff'],
  ['CH', 'Merseyside'], ['CM', 'Essex'], ['CO', 'Essex'],
  ['CR', 'Surrey'], ['CT', 'Kent'], ['CV', 'West Midlands'],
  ['CW', 'Cheshire'],
  ['DA', 'Kent'], ['DD', 'Dundee'], ['DE', 'Derby'], ['DG', 'Dumfries'],
  ['DH', 'County Durham'], ['DL', 'County Durham'], ['DN', 'South Yorkshire'],
  ['DT', 'Dorset'], ['DY', 'West Midlands'],
  ['E',  'East London'],
  ['EC', 'City of London'], ['EH', 'Edinburgh'], ['EN', 'Hertfordshire'],
  ['EX', 'Devon'],
  ['FK', 'Stirling'], ['FY', 'Lancashire'],
  ['G',  'Glasgow'], ['GL', 'Gloucestershire'], ['GU', 'Surrey'],
  ['GY', 'Guernsey'],
  ['HA', 'North West London'], ['HD', 'West Yorkshire'], ['HG', 'North Yorkshire'],
  ['HP', 'Hertfordshire'], ['HR', 'Herefordshire'], ['HS', 'Western Isles'],
  ['HU', 'East Yorkshire'], ['HX', 'West Yorkshire'],
  ['IG', 'East London'], ['IP', 'Suffolk'], ['IV', 'Inverness'],
  ['JE', 'Jersey'],
  ['KA', 'Ayrshire'], ['KT', 'Surrey'], ['KW', 'Caithness'], ['KY', 'Fife'],
  ['L',  'Merseyside'], ['LA', 'Lancashire'], ['LD', 'Powys'], ['LE', 'Leicester'],
  ['LL', 'North Wales'], ['LN', 'Lincolnshire'], ['LS', 'West Yorkshire'],
  ['LU', 'Luton'],
  ['M',  'Greater Manchester'], ['ME', 'Kent'], ['MK', 'Milton Keynes'],
  ['ML', 'Glasgow'],
  ['N',  'North London'], ['NE', 'Newcastle'], ['NG', 'Nottingham'],
  ['NN', 'Northamptonshire'], ['NP', 'Newport'], ['NR', 'Norfolk'],
  ['NW', 'North West London'],
  ['OL', 'Greater Manchester'], ['OX', 'Oxford'],
  ['PA', 'Argyll'], ['PE', 'Peterborough'], ['PH', 'Perth'], ['PL', 'Plymouth'],
  ['PO', 'Portsmouth'],
  ['PR', 'Lancashire'],
  ['RG', 'Berkshire'], ['RH', 'Surrey'], ['RM', 'East London'],
  ['S',  'South Yorkshire'], ['SA', 'Swansea'], ['SE', 'South East London'],
  ['SG', 'Hertfordshire'], ['SK', 'Greater Manchester'], ['SL', 'Berkshire'],
  ['SM', 'Surrey'], ['SN', 'Swindon'], ['SO', 'Southampton'],
  ['SP', 'Salisbury'], ['SR', 'Sunderland'], ['SS', 'Essex'],
  ['ST', 'Staffordshire'], ['SW', 'South West London'], ['SY', 'Shropshire'],
  ['TA', 'Somerset'], ['TD', 'Scottish Borders'], ['TF', 'Telford'],
  ['TN', 'Kent'], ['TQ', 'Devon'], ['TR', 'Cornwall'], ['TS', 'Teesside'],
  ['TW', 'Surrey'],
  ['UB', 'West London'],
  ['W',  'West London'], ['WA', 'Cheshire'], ['WC', 'Central London'],
  ['WD', 'Hertfordshire'], ['WF', 'West Yorkshire'], ['WN', 'Greater Manchester'],
  ['WR', 'Worcestershire'], ['WS', 'West Midlands'], ['WV', 'West Midlands'],
  ['YO', 'North Yorkshire'],
  ['ZE', 'Shetland'],
];

export function getOutward(postcode: string): string {
  const cleaned = String(postcode ?? '').trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
  return cleaned.match(/^([A-Z]{1,2}\d[A-Z\d]?)(?:\d[A-Z]{2})?$/)?.[1] ?? '';
}

export function assertValidPostcodeInput(postcode: string): string {
  const value = String(postcode ?? '').trim().toUpperCase();
  const cleaned = value.replace(/\s+/g, '');
  const match = cleaned.match(/^([A-Z]{1,2}\d[A-Z\d]?)(?:\d[A-Z]{2})?$/);
  if (!match) throw new Error('valid UK postcode required');

  const outward = match[1];
  if (regionFromOutward(outward) === 'United Kingdom') {
    throw new Error('valid UK postcode required');
  }
  return outward;
}

export function regionFromOutward(outward: string): string {
  const clean = outward.toUpperCase();
  // Sort by prefix length descending so longer (more specific) prefixes match first
  const sorted = [...REGION_MAP].sort((a, b) => b[0].length - a[0].length);
  for (const [prefix, region] of sorted) {
    if (clean.startsWith(prefix)) return region;
  }
  return 'United Kingdom';
}

export async function lookupPostcode(postcode: string): Promise<PostcodeInfo> {
  const outward = assertValidPostcodeInput(postcode);
  const fallback: PostcodeInfo = { outward, region: regionFromOutward(outward) };
  try {
    const clean = postcode.replace(/\s+/g, '').toUpperCase();
    const r = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(clean)}`, {
      signal: AbortSignal.timeout(4_000),
    });
    if (!r.ok) return fallback;
    const data = await r.json() as any;
    if (data?.status !== 200) return fallback;
    const result = data.result;
    return {
      outward,
      // postcodes.io returns broad ONS regions ("North West", "London") which don't
      // match our directory keys ("Greater Manchester", "East London").
      // Prefer our outward-code map when it's specific; only fall back to postcodes.io
      // for outward codes we don't recognise ("United Kingdom").
      region: fallback.region !== 'United Kingdom'
        ? fallback.region
        : (result.region || result.european_electoral_region || fallback.region),
      adminDistrict: result.admin_district,
      latitude: result.latitude,
      longitude: result.longitude,
    };
  } catch {
    return fallback;
  }
}

// NUTS region codes -> UK regions (used to map FTS delivery locations)
const NUTS_MAP: Record<string, string> = {
  'UKC': 'North East England', 'UKD': 'North West England', 'UKE': 'Yorkshire and the Humber',
  'UKF': 'East Midlands', 'UKG': 'West Midlands', 'UKH': 'East of England',
  'UKI': 'London', 'UKJ': 'South East England', 'UKK': 'South West England',
  'UKL': 'Wales', 'UKM': 'Scotland', 'UKN': 'Northern Ireland',
  'UKC1': 'Tyne and Wear', 'UKC2': 'Northumberland and Durham',
  'UKD1': 'Cumbria', 'UKD3': 'Greater Manchester', 'UKD4': 'Lancashire', 'UKD6': 'Cheshire',
  'UKE1': 'East Yorkshire', 'UKE2': 'North Yorkshire', 'UKE3': 'South Yorkshire', 'UKE4': 'West Yorkshire',
  'UKF1': 'Derbyshire and Nottinghamshire', 'UKF2': 'Leicestershire and Rutland', 'UKF3': 'Lincolnshire',
  'UKG1': 'Herefordshire and Worcestershire', 'UKG2': 'Shropshire and Staffordshire', 'UKG3': 'West Midlands conurbation',
  'UKH1': 'East Anglia', 'UKH2': 'Bedfordshire and Hertfordshire', 'UKH3': 'Essex',
  'UKI3': 'Inner London West', 'UKI4': 'Inner London East', 'UKI5': 'Outer London East',
  'UKI6': 'Outer London South', 'UKI7': 'Outer London West',
  'UKJ1': 'Berkshire, Bucks and Oxon', 'UKJ2': 'Surrey, East and West Sussex', 'UKJ3': 'Hampshire and IoW', 'UKJ4': 'Kent',
  'UKK1': 'Gloucestershire, Wiltshire and Bristol', 'UKK2': 'Dorset and Somerset', 'UKK3': 'Cornwall and IoS', 'UKK4': 'Devon',
  'UKL1': 'West Wales and the Valleys', 'UKL2': 'East Wales',
  'UKM2': 'Eastern Scotland', 'UKM3': 'South Western Scotland', 'UKM5': 'North Eastern Scotland', 'UKM6': 'Highlands and Islands',
};

export function regionFromNuts(nuts: string): string {
  if (!nuts) return '';
  // Try exact match first, then prefix
  if (NUTS_MAP[nuts]) return NUTS_MAP[nuts];
  const prefix = nuts.substring(0, 4);
  if (NUTS_MAP[prefix]) return NUTS_MAP[prefix];
  const prefix3 = nuts.substring(0, 3);
  if (NUTS_MAP[prefix3]) return NUTS_MAP[prefix3];
  return '';
}

export function haversineMiles(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3958.8;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Rough region similarity for scoring — returns 0-1
export function regionSimilarity(regionA: string, regionB: string): number {
  if (!regionA || !regionB) return 0.2;
  const a = regionA.toLowerCase();
  const b = regionB.toLowerCase();
  if (a === b) return 1;
  if (a.includes(b) || b.includes(a)) return 0.8;
  // Both in same broad area
  const broadGroups: string[][] = [
    ['london', 'east london', 'west london', 'north london', 'south east london', 'south west london', 'north west london', 'central london', 'city of london'],
    ['yorkshire', 'west yorkshire', 'south yorkshire', 'east yorkshire', 'north yorkshire'],
    ['manchester', 'greater manchester', 'merseyside', 'lancashire', 'cheshire'],
    ['midlands', 'west midlands', 'east midlands', 'staffordshire', 'worcestershire', 'warwickshire'],
    ['scotland', 'edinburgh', 'glasgow', 'aberdeen', 'dundee', 'inverness', 'stirling'],
    ['wales', 'cardiff', 'swansea', 'newport'],
    ['north east', 'newcastle', 'sunderland', 'teesside', 'county durham'],
  ];
  for (const group of broadGroups) {
    if (group.some(g => a.includes(g)) && group.some(g => b.includes(g))) return 0.6;
  }
  return 0.1;
}
