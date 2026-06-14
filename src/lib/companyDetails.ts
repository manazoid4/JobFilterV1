// Plain-English industry label for a Companies House SIC code.
// Mirrors the titlePrefix values in leadEngine/fetchers/companiesHouseFetcher.ts SIC_SIGNALS.
const SIC_LABELS: Record<string, string> = {
  '43210': 'Electrical contractor',
  '43220': 'Plumbing & heating contractor',
  '43290': 'Specialist installer',
  '43310': 'Plastering contractor',
  '43320': 'Joinery installer',
  '43330': 'Floor & wall specialist',
  '43341': 'Painting contractor',
  '41100': 'Property developer',
  '41201': 'Residential builder',
  '41202': 'Commercial builder',
  '68100': 'Property investment company',
  '68201': 'Residential landlord',
  '68320': 'Property manager',
  '55100': 'Hotel / B&B',
  '56101': 'Restaurant',
  '56102': 'Cafe / unlicensed restaurant',
  '62011': 'Tech company office',
  '62020': 'IT consultancy',
  '62090': 'Tech business fit-out',
  '35111': 'Renewable energy company',
  '35120': 'Heat network operator',
  '35190': 'Clean energy business',
  '93112': 'Esports facility',
  '26200': 'Data centre operator',
};

export type CompanyDetails = {
  incorporated: string | null;
  companyNumber: string | null;
  industry: string | null;
};

// Parses the "Incorporated: ... | Co. No: ... | SIC: ..." fields out of a
// CompaniesHouse lead's description (only present for paid-tier leads).
export function parseCompanyDetails(description?: string, source?: string): CompanyDetails | null {
  if (!description || source !== 'CompaniesHouse') return null;

  const incorporatedMatch = description.match(/Incorporated:\s*([^|]+)/i);
  const companyNumberMatch = description.match(/Co\.\s*No:\s*([^|]+)/i);
  const sicMatch = description.match(/SIC:\s*(\d+)/i);

  const incorporated = incorporatedMatch ? incorporatedMatch[1].trim() : null;
  const companyNumber = companyNumberMatch ? companyNumberMatch[1].trim() : null;
  const industry = sicMatch ? (SIC_LABELS[sicMatch[1]] ?? null) : null;

  if (!incorporated && !companyNumber && !industry) return null;

  return {
    incorporated: incorporated && incorporated.toLowerCase() !== 'recent' ? incorporated : null,
    companyNumber,
    industry,
  };
}
