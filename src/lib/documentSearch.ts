export type KeywordTag =
  | 'building'
  | 'electrical'
  | 'plumbing'
  | 'roofing'
  | 'carpentry'
  | 'hvac'
  | 'landscaping'
  | 'painting'
  | 'extension'
  | 'loft'
  | 'heat pump'
  | 'solar'
  | 'EV charger'
  | 'kitchen'
  | 'bathroom'
  | 'timber frame'
  | 'velux'
  | 'garage'
  | 'rewire'
  | 'new build'
  | 'conservation'
  | 'listed building'
  | 'flat roof'
  | 'drainage';

export interface DocumentSearchResult {
  id: string;
  title: string;
  location: string;
  source: string;
  docType: string;
  matchedKeywords: string[];
  snippet: string;
  score: number;
  detectedTags: KeywordTag[];
  planningRef?: string;
  documentUrl?: string;
}

const KEYWORD_TRADE_MAP: Record<string, KeywordTag[]> = {
  'extension': ['building', 'extension'],
  'loft': ['building', 'loft', 'carpentry', 'roofing'],
  'heat pump': ['hvac', 'plumbing', 'heat pump'],
  'solar': ['electrical', 'roofing', 'solar'],
  'ev charger': ['electrical', 'EV charger'],
  'kitchen': ['building', 'plumbing', 'electrical', 'kitchen'],
  'bathroom': ['building', 'plumbing', 'bathroom'],
  'timber frame': ['carpentry', 'building', 'timber frame'],
  'velux': ['roofing', 'carpentry', 'velux'],
  'two storey': ['building', 'extension'],
  'garage': ['building', 'garage', 'electrical'],
  'rewire': ['electrical', 'rewire'],
  'new build': ['building', 'electrical', 'plumbing', 'roofing', 'new build'],
  'conservation': ['building', 'conservation', 'listed building'],
  'flat roof': ['roofing', 'flat roof'],
  'drainage': ['plumbing', 'landscaping', 'drainage'],
};

const MOCK_DOCUMENTS: DocumentSearchResult[] = [
  {
    id: 'doc-001',
    title: 'Two storey rear extension and loft conversion',
    location: 'Solihull, B91',
    source: 'Solihull Council',
    docType: 'Planning Application',
    matchedKeywords: ['extension', 'loft'],
    snippet: '...proposed <mark>two storey rear extension</mark> measuring 6m x 4m with associated <mark>loft conversion</mark> including dormer window to rear elevation...',
    score: 92,
    detectedTags: ['building', 'extension', 'loft', 'carpentry', 'roofing'],
    planningRef: 'P2026/0847/FUL',
  },
  {
    id: 'doc-002',
    title: 'Installation of air source heat pump',
    location: 'Edgbaston, B15',
    source: 'Birmingham City Council',
    docType: 'Prior Notification',
    matchedKeywords: ['heat pump'],
    snippet: '...installation of external <mark>air source heat pump</mark> unit to side elevation of dwelling, including associated pipework and electrical connection...',
    score: 95,
    detectedTags: ['hvac', 'plumbing', 'heat pump', 'electrical'],
    planningRef: 'BN2026/0234',
  },
  {
    id: 'doc-003',
    title: 'Solar panel installation on commercial roof',
    location: 'Digbeth, B5',
    source: 'Birmingham City Council',
    docType: 'Planning Application',
    matchedKeywords: ['solar'],
    snippet: '...installation of 48 <mark>solar</mark> photovoltaic panels on flat commercial roof, generating capacity 24kWp, with associated inverter and grid connection...',
    score: 88,
    detectedTags: ['electrical', 'roofing', 'solar'],
    planningRef: 'P2026/1102/FUL',
  },
  {
    id: 'doc-004',
    title: 'Single storey side extension and garage conversion',
    location: 'Sutton Coldfield, B73',
    source: 'Birmingham City Council',
    docType: 'Planning Application',
    matchedKeywords: ['extension', 'garage'],
    snippet: '...proposed <mark>single storey side extension</mark> and integral <mark>garage conversion</mark> to form additional living space with new kitchen layout...',
    score: 85,
    detectedTags: ['building', 'extension', 'garage', 'kitchen', 'electrical'],
    planningRef: 'P2026/0923/FUL',
  },
  {
    id: 'doc-005',
    title: 'Full rewire and consumer unit upgrade',
    location: 'Moseley, B13',
    source: 'Building Control Notice',
    docType: 'Building Regulations',
    matchedKeywords: ['rewire'],
    snippet: '...notification of full electrical <mark>rewire</mark> of 3-bed semi-detached property including new consumer unit, earthing, and bonding to current 18th edition standards...',
    score: 90,
    detectedTags: ['electrical', 'rewire'],
    planningRef: 'BR2026/0445',
  },
  {
    id: 'doc-006',
    title: 'Timber frame garden room and landscaping',
    location: 'Harborne, B17',
    source: 'Birmingham City Council',
    docType: 'Prior Notification',
    matchedKeywords: ['timber frame'],
    snippet: '...erection of <mark>timber frame</mark> garden room 4.5m x 3m within permitted development, including associated <mark>landscaping</mark> and drainage works to rear garden...',
    score: 82,
    detectedTags: ['carpentry', 'building', 'timber frame', 'landscaping', 'drainage'],
    planningRef: 'BN2026/0189',
  },
  {
    id: 'doc-007',
    title: 'Velux window installation and flat roof replacement',
    location: 'Kings Heath, B14',
    source: 'Birmingham City Council',
    docType: 'Planning Application',
    matchedKeywords: ['velux', 'flat roof'],
    snippet: '...replacement of existing <mark>flat roof</mark> with insulated warm roof system and installation of 3 <mark>velux</mark> roof windows to loft space...',
    score: 87,
    detectedTags: ['roofing', 'velux', 'carpentry', 'flat roof'],
    planningRef: 'P2026/0756/FUL',
  },
  {
    id: 'doc-008',
    title: 'New build dwelling with EV charging point',
    location: 'Erdington, B23',
    source: 'Birmingham City Council',
    docType: 'Planning Application',
    matchedKeywords: ['new build', 'EV charger'],
    snippet: '...construction of new detached dwelling with integral garage and provision of <mark>EV charger</mark> charging point in driveway as per Part S building regulations...',
    score: 78,
    detectedTags: ['building', 'electrical', 'EV charger', 'new build'],
    planningRef: 'P2026/1201/FUL',
  },
  {
    id: 'doc-009',
    title: 'Kitchen extension with bi-fold doors',
    location: 'Bournville, B30',
    source: 'Birmingham City Council',
    docType: 'Planning Application',
    matchedKeywords: ['kitchen', 'extension'],
    snippet: '...single storey rear <mark>extension</mark> to form open plan <mark>kitchen</mark>/dining area with bi-fold doors to garden, new drainage connection and internal alterations...',
    score: 91,
    detectedTags: ['building', 'kitchen', 'extension', 'plumbing', 'drainage'],
    planningRef: 'P2026/0634/FUL',
  },
  {
    id: 'doc-010',
    title: 'Bathroom refurbishment and drainage works',
    location: 'Selly Oak, B29',
    source: 'Building Control Notice',
    docType: 'Building Regulations',
    matchedKeywords: ['bathroom'],
    snippet: '...complete <mark>bathroom</mark> refurbishment including new soil stack, waste drainage, and plumbing connections to existing soil vent pipe...',
    score: 76,
    detectedTags: ['plumbing', 'bathroom', 'building', 'drainage'],
    planningRef: 'BR2026/0312',
  },
  {
    id: 'doc-011',
    title: 'Conservation area consent for listed building restoration',
    location: 'Edgbaston, B15',
    source: 'Birmingham City Council',
    docType: 'Listed Building Consent',
    matchedKeywords: ['conservation'],
    snippet: '...restoration of original features to Grade II <mark>listed building</mark> within <mark>conservation</mark> area, including lime plaster repair and timber window restoration...',
    score: 72,
    detectedTags: ['building', 'conservation', 'listed building', 'carpentry'],
    planningRef: 'LB2026/0078',
  },
  {
    id: 'doc-012',
    title: 'Loft conversion with dormer and velux windows',
    location: 'Four Oaks, B74',
    source: 'Sutton Coldfield Council',
    docType: 'Planning Application',
    matchedKeywords: ['loft', 'velux'],
    snippet: '...<mark>loft conversion</mark> to create 2 additional bedrooms with rear dormer and 4 <mark>velux</mark> windows, new staircase, and associated electrical and plumbing works...',
    score: 94,
    detectedTags: ['building', 'loft', 'carpentry', 'roofing', 'velux', 'electrical', 'plumbing'],
    planningRef: 'P2026/0512/FUL',
  },
];

export async function searchDocuments(keyword: string): Promise<DocumentSearchResult[]> {
  await new Promise((r) => setTimeout(r, 800));

  const normalized = keyword.toLowerCase().trim();

  const matched = MOCK_DOCUMENTS.filter((doc) => {
    const titleMatch = doc.title.toLowerCase().includes(normalized);
    const snippetMatch = doc.snippet.toLowerCase().includes(normalized);
    const tagMatch = doc.detectedTags.some((t) => t.toLowerCase().includes(normalized));
    return titleMatch || snippetMatch || tagMatch;
  });

  return matched.sort((a, b) => b.score - a.score);
}

export function getDetectedTagsForLead(title: string, description: string): KeywordTag[] {
  const text = `${title} ${description}`.toLowerCase();
  const tags: KeywordTag[] = [];

  for (const [keyword, tagList] of Object.entries(KEYWORD_TRADE_MAP)) {
    if (text.includes(keyword.toLowerCase())) {
      for (const tag of tagList) {
        if (!tags.includes(tag)) {
          tags.push(tag);
        }
      }
    }
  }

  return tags;
}

export function scoreDocumentRelevance(title: string, description: string, userTrade: string): number {
  const text = `${title} ${description}`.toLowerCase();
  let score = 0;

  const tradeKeywords: Record<string, string[]> = {
    building: ['extension', 'new build', 'garage', 'loft', 'conversion', 'storey'],
    electrical: ['rewire', 'solar', 'ev charger', 'electrical', 'consumer unit', 'wiring'],
    plumbing: ['bathroom', 'kitchen', 'drainage', 'heat pump', 'plumbing', 'soil'],
    roofing: ['roof', 'velux', 'flat roof', 'dormer', 'slate', 'tile'],
    carpentry: ['timber frame', 'joinery', 'staircase', 'door', 'window', 'loft'],
    hvac: ['heat pump', 'boiler', 'heating', 'ventilation', 'air source'],
    landscaping: ['garden', 'landscaping', 'patio', 'fence', 'decking'],
    painting: ['decoration', 'painting', 'plaster', 'lime'],
  };

  const keywords = tradeKeywords[userTrade] ?? [];
  for (const kw of keywords) {
    if (text.includes(kw)) score += 15;
  }

  return Math.min(score, 100);
}
