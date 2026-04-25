/**
 * Companies House Strategic Signal Fetcher
 *
 * Implements the three arbitrage signals from the JobFilter Intelligence Report:
 *
 *  Signal 1 — Recent Capital Infusion (SH01 proxy):
 *    Companies incorporated within 6 months are post-funding.
 *    They need premises fit-out, electrical, HVAC, plumbing — NOW.
 *
 *  Signal 2 — SIC Code Pivot (CS01):
 *    Company changing sector = new premises = immediate trade need.
 *    Mapped via targeted SIC code search.
 *
 *  Signal 3 — Growth Sector Incorporation:
 *    Esports, Cleantech, Hospitality, PropTech = high-probability fit-out.
 *
 * API: https://api.company-information.service.gov.uk
 * Auth: HTTP Basic — COMPANIES_HOUSE_API_KEY as username, no password
 * Free key: https://developer.company-information.service.gov.uk/get-started
 *
 * If COMPANIES_HOUSE_API_KEY is not set → returns empty + logs skip message.
 */

import type { RawLead, SourceStats } from '../types.ts';

const CH_BASE = 'https://api.company-information.service.gov.uk';

// SIC code → trade opportunity mapping
// "Direct" = company IS in this trade (subcontractor signals)
// "Indirect" = company TYPE implies upcoming premises work
interface SicSignal {
  trade: string;
  signalType: 'direct' | 'indirect';
  titlePrefix: string;
  description: string;
  valueLow: number;
  valueHigh: number;
  urgencyBias: 'high' | 'medium' | 'low';
}

const SIC_SIGNALS: Record<string, SicSignal> = {
  // ── Direct: construction/trade contractors needing subcontractors ─────────
  '43210': { trade: 'electrical', signalType: 'direct', titlePrefix: 'Electrical Contractor',
    description: 'Recently incorporated electrical contractor — subcontract or project partnership opportunity.',
    valueLow: 8000, valueHigh: 60000, urgencyBias: 'medium' },
  '43220': { trade: 'plumbing', signalType: 'direct', titlePrefix: 'Plumbing & Heating Contractor',
    description: 'New plumbing/heating firm — subcontract or overflow work partnership.',
    valueLow: 6000, valueHigh: 40000, urgencyBias: 'medium' },
  '43290': { trade: 'building', signalType: 'direct', titlePrefix: 'Specialist Installer',
    description: 'New specialist installation contractor — construction project partner opportunity.',
    valueLow: 10000, valueHigh: 80000, urgencyBias: 'medium' },
  '43310': { trade: 'painting', signalType: 'direct', titlePrefix: 'Plastering Contractor',
    description: 'Recently incorporated plastering firm — subcontract opportunities on live sites.',
    valueLow: 4000, valueHigh: 25000, urgencyBias: 'medium' },
  '43320': { trade: 'carpentry', signalType: 'direct', titlePrefix: 'Joinery Installer',
    description: 'New joinery/flooring installer — project partner for fit-out contracts.',
    valueLow: 5000, valueHigh: 30000, urgencyBias: 'medium' },
  '43330': { trade: 'painting', signalType: 'direct', titlePrefix: 'Floor & Wall Specialist',
    description: 'Newly formed floor/wall covering contractor — fit-out project opportunity.',
    valueLow: 4000, valueHigh: 20000, urgencyBias: 'low' },
  '43341': { trade: 'painting', signalType: 'direct', titlePrefix: 'Painting Contractor',
    description: 'New painting/decorating company — residential and commercial subcontract.',
    valueLow: 3000, valueHigh: 20000, urgencyBias: 'low' },

  // ── Indirect: developers and property companies needing all trades ─────────
  '41100': { trade: 'building', signalType: 'indirect', titlePrefix: 'Property Developer',
    description: 'Property development company recently incorporated — site construction and all trades required.',
    valueLow: 40000, valueHigh: 250000, urgencyBias: 'high' },
  '41201': { trade: 'building', signalType: 'indirect', titlePrefix: 'Residential Builder',
    description: 'New domestic house builder — all trade subcontractors needed for live build programme.',
    valueLow: 30000, valueHigh: 180000, urgencyBias: 'high' },
  '41202': { trade: 'building', signalType: 'indirect', titlePrefix: 'Commercial Builder',
    description: 'New commercial construction firm — subcontracts across electrical, plumbing, roofing, fit-out.',
    valueLow: 60000, valueHigh: 500000, urgencyBias: 'high' },
  '68100': { trade: 'building', signalType: 'indirect', titlePrefix: 'Property Investment Co.',
    description: 'Property company recently formed — renovation and conversion work pipeline.',
    valueLow: 20000, valueHigh: 120000, urgencyBias: 'medium' },
  '68201': { trade: 'building', signalType: 'indirect', titlePrefix: 'Residential Landlord',
    description: 'New residential letting company — void works, compliance upgrades, maintenance contracts.',
    valueLow: 5000, valueHigh: 40000, urgencyBias: 'medium' },
  '68320': { trade: 'building', signalType: 'indirect', titlePrefix: 'Property Manager',
    description: 'New property management firm — building maintenance and reactive repair contracts.',
    valueLow: 8000, valueHigh: 50000, urgencyBias: 'medium' },

  // ── Indirect: hospitality/retail fit-outs ─────────────────────────────────
  '55100': { trade: 'building', signalType: 'indirect', titlePrefix: 'Hotel Opening',
    description: 'New hotel or B&B — full commercial fit-out including all trade disciplines.',
    valueLow: 80000, valueHigh: 600000, urgencyBias: 'high' },
  '56101': { trade: 'plumbing', signalType: 'indirect', titlePrefix: 'Restaurant Fit-Out',
    description: 'New licensed restaurant — commercial kitchen plumbing, gas, extraction system.',
    valueLow: 15000, valueHigh: 80000, urgencyBias: 'high' },
  '56102': { trade: 'plumbing', signalType: 'indirect', titlePrefix: 'Café / Unlicensed Restaurant',
    description: 'New food service business — kitchen fit-out, plumbing, commercial extraction.',
    valueLow: 8000, valueHigh: 45000, urgencyBias: 'high' },

  // ── Indirect: tech / office fit-outs ─────────────────────────────────────
  '62011': { trade: 'electrical', signalType: 'indirect', titlePrefix: 'Tech Company Office',
    description: 'New tech company incorporation — office electrical fit-out, Cat6 wiring, server room, EV points.',
    valueLow: 20000, valueHigh: 90000, urgencyBias: 'medium' },
  '62020': { trade: 'hvac', signalType: 'indirect', titlePrefix: 'IT Consultancy Premises',
    description: 'IT firm requiring office premises — HVAC, electrical, specialist cooling for server infrastructure.',
    valueLow: 15000, valueHigh: 60000, urgencyBias: 'medium' },
  '62090': { trade: 'electrical', signalType: 'indirect', titlePrefix: 'Tech Business Fit-Out',
    description: 'New technology business — office fit-out, data points, electrical upgrade.',
    valueLow: 12000, valueHigh: 60000, urgencyBias: 'medium' },

  // ── Indirect: cleantech / renewable energy (from report SIC 2026 additions) ─
  '35111': { trade: 'electrical', signalType: 'indirect', titlePrefix: 'Renewable Energy Co.',
    description: 'Renewable energy firm — solar installation, battery storage, grid connection works.',
    valueLow: 30000, valueHigh: 200000, urgencyBias: 'medium' },
  '35120': { trade: 'hvac', signalType: 'indirect', titlePrefix: 'Heat Network Operator',
    description: 'Heat/cooling network company — ASHP installation, district heating, mechanical works.',
    valueLow: 40000, valueHigh: 300000, urgencyBias: 'medium' },
  '35190': { trade: 'electrical', signalType: 'indirect', titlePrefix: 'Clean Energy Business',
    description: 'Clean energy startup — electrical infrastructure, battery systems, switchgear.',
    valueLow: 25000, valueHigh: 150000, urgencyBias: 'medium' },

  // ── Indirect: high-growth new SIC codes from 2026 framework ─────────────
  '93112': { trade: 'building', signalType: 'indirect', titlePrefix: 'Esports Facility',
    description: 'Esports venue operator — full commercial fit-out: power, cooling, acoustic, networking.',
    valueLow: 100000, valueHigh: 600000, urgencyBias: 'high' },
  '26200': { trade: 'building', signalType: 'indirect', titlePrefix: 'Data Centre Operator',
    description: 'New data centre or server facility — specialist electrical, cooling, structural.',
    valueLow: 200000, valueHigh: 2000000, urgencyBias: 'high' },
};

// Outward code → approximate town name for CH location search
const OUTWARD_TO_LOCATION: Record<string, string> = {
  B: 'Birmingham', BL: 'Bolton', BD: 'Bradford', BS: 'Bristol', CF: 'Cardiff',
  CV: 'Coventry', DE: 'Derby', DY: 'Dudley', EH: 'Edinburgh', G: 'Glasgow',
  GL: 'Gloucester', GU: 'Guildford', HD: 'Huddersfield', HX: 'Halifax',
  L: 'Liverpool', LE: 'Leicester', LN: 'Lincoln', LS: 'Leeds',
  M: 'Manchester', ME: 'Maidstone', MK: 'Milton Keynes', NG: 'Nottingham',
  NE: 'Newcastle', NN: 'Northampton', N: 'London', NW: 'London',
  OX: 'Oxford', PE: 'Peterborough', PL: 'Plymouth', PO: 'Portsmouth',
  PR: 'Preston', RG: 'Reading', S: 'Sheffield', SK: 'Stockport',
  SN: 'Swindon', SO: 'Southampton', SR: 'Sunderland', ST: 'Stoke-on-Trent',
  SW: 'London', SE: 'London', E: 'London', W: 'London', WC: 'London',
  EC: 'London', TN: 'Tunbridge Wells', TS: 'Middlesbrough', TW: 'Twickenham',
  WA: 'Warrington', WD: 'Watford', WF: 'Wakefield', WN: 'Wigan',
  WR: 'Worcester', WS: 'Walsall', WV: 'Wolverhampton', YO: 'York',
};

function locationFromOutward(outward: string): string {
  const prefix2 = outward.substring(0, 2).toUpperCase();
  const prefix1 = outward.substring(0, 1).toUpperCase();
  return OUTWARD_TO_LOCATION[prefix2] ?? OUTWARD_TO_LOCATION[prefix1] ?? '';
}

function inferUrgency(dateOfCreation: string, biasFn: SicSignal['urgencyBias']): 'low' | 'medium' | 'high' {
  if (!dateOfCreation) return biasFn;
  const ageDays = (Date.now() - new Date(dateOfCreation).getTime()) / 86_400_000;
  if (ageDays < 60) return 'high';
  if (ageDays < 150) return 'medium';
  return biasFn;
}

export async function companiesHouseFetcher(
  _region: string,
  trade: string,
  outward: string,
): Promise<{ leads: RawLead[]; stats: Record<string, SourceStats> }> {
  const apiKey = process.env.COMPANIES_HOUSE_API_KEY;

  if (!apiKey) {
    return {
      leads: [],
      stats: {
        CompaniesHouse: {
          fetched: 0, passed: 0, dropped: 0, failed: false,
          error: 'COMPANIES_HOUSE_API_KEY not set — skipping. Get free key: developer.company-information.service.gov.uk',
        },
      },
    };
  }

  const authHeader = `Basic ${Buffer.from(`${apiKey}:`).toString('base64')}`;

  // Select SIC codes relevant to the requested trade
  const targetSics = Object.entries(SIC_SIGNALS).filter(([, sig]) =>
    trade === 'all' || sig.trade === trade
  );

  if (!targetSics.length) {
    return {
      leads: [],
      stats: { CompaniesHouse: { fetched: 0, passed: 0, dropped: 0, failed: false } },
    };
  }

  const sicCodes = targetSics.map(([code]) => code);
  const location = locationFromOutward(outward);

  // Batch into groups of 4 (CH API limit per request)
  const batches: string[][] = [];
  for (let i = 0; i < Math.min(sicCodes.length, 20); i += 4) {
    batches.push(sicCodes.slice(i, i + 4));
  }

  const leads: RawLead[] = [];
  let totalFetched = 0;
  let dropped = 0;
  let failed = false;
  let errorMsg = '';

  const incorporatedFrom = new Date(Date.now() - 365 * 86_400_000).toISOString().substring(0, 10);

  for (const batch of batches.slice(0, 4)) {
    const params = new URLSearchParams({
      incorporated_from: incorporatedFrom,
      company_status: 'active',
      size: '20',
      start_index: '0',
    });
    if (location) params.set('location', location);
    batch.forEach(sic => params.append('sic_codes', sic));

    const url = `${CH_BASE}/advanced-search/companies?${params}`;

    try {
      const r = await fetch(url, {
        headers: { Authorization: authHeader, Accept: 'application/json' },
        signal: AbortSignal.timeout(8000),
      });

      if (r.status === 401) {
        failed = true;
        errorMsg = 'Invalid COMPANIES_HOUSE_API_KEY';
        break;
      }
      if (r.status === 429) {
        console.error('[CompaniesHouse] rate limited — skipping remaining batches');
        break;
      }
      if (!r.ok) {
        console.error(`[CompaniesHouse] HTTP ${r.status} — ${url}`);
        continue;
      }

      const data = await r.json() as any;
      const items: any[] = data?.items ?? [];
      totalFetched += items.length;

      for (const company of items) {
        const name = String(company?.company_name ?? '').trim();
        if (!name) { dropped++; continue; }

        const companyNumber = String(company?.company_number ?? '');
        const sicCodes: string[] = Array.isArray(company?.sic_codes) ? company.sic_codes : [];
        const addr = company?.registered_office_address ?? {};
        const postcode = String(addr?.postal_code ?? outward).trim();
        const locality = String(addr?.locality ?? addr?.region ?? location).trim();
        const dateCreated = String(company?.date_of_creation ?? '');

        // Find best SIC signal match
        const matchedEntry = sicCodes
          .map(sic => [sic, SIC_SIGNALS[sic]] as [string, SicSignal])
          .find(([, sig]) => sig !== undefined && (trade === 'all' || sig.trade === trade));

        if (!matchedEntry) { dropped++; continue; }
        const [matchedSic, signal] = matchedEntry;

        const urgency = inferUrgency(dateCreated, signal.urgencyBias);
        const deadlineDays = urgency === 'high' ? 7 : urgency === 'medium' ? 21 : 45;

        leads.push({
          rawId: `ch-${companyNumber || `${Date.now()}-${leads.length}`}`,
          rawTitle: `${signal.titlePrefix}: ${name}`,
          rawDescription: `${signal.description} | Incorporated: ${dateCreated || 'recent'} | Co. No: ${companyNumber} | SIC: ${matchedSic}${sicCodes.length > 1 ? ` (+${sicCodes.length - 1} more)` : ''}`.substring(0, 300),
          rawValueMin: signal.valueLow,
          rawValueMax: signal.valueHigh,
          rawLocation: locality || location || outward,
          rawPostcode: postcode,
          rawDeadline: new Date(Date.now() + deadlineDays * 86_400_000).toISOString(),
          rawPublished: new Date().toISOString(),
          rawBuyer: name,
          rawCpvCodes: [],
          sourceSystem: 'CompaniesHouse',
          sourceUrl: companyNumber
            ? `https://find-and-update.company-information.service.gov.uk/company/${companyNumber}`
            : undefined,
        });
      }
    } catch (err: any) {
      console.error(`[CompaniesHouse] threw — ${err?.message ?? err}`);
      if (!leads.length) {
        failed = true;
        errorMsg = String(err?.message ?? err);
      }
    }
  }

  const passed = leads.length;
  console.error(`[CH] CompaniesHouse → fetched=${totalFetched} passed=${passed} dropped=${dropped}${failed ? ' FAILED=' + errorMsg : ''}`);

  return {
    leads,
    stats: {
      CompaniesHouse: { fetched: totalFetched, passed, dropped, failed, error: errorMsg || undefined },
    },
  };
}
