import type { Express, Request, Response } from 'express';

type MaterialCategory =
  | 'plasterboard'
  | 'timber'
  | 'sheet-material'
  | 'cement'
  | 'sand'
  | 'insulation'
  | 'fixings'
  | 'foam'
  | 'plumbing'
  | 'electrical';

type MaterialPrice = {
  id: string;
  material: string;
  category: MaterialCategory;
  supplier: string;
  productName: string;
  priceIncVat: number;
  unit: string;
  sourceUrl: string;
  checkedAt: string;
  sourceConfidence: number;
  branchSignal: string;
  deliveryOptions: string;
  collectionOptions: string;
  tradePricingNote: string;
  postcodeRelevance: 'national' | 'postcode-required' | 'branch-specific';
  warning: string;
  keywords: string[];
};

const CHECKED_AT = '2026-05-22T03:15:27+01:00';

const MATERIAL_PRICES: MaterialPrice[] = [
  {
    id: 'selco-siniat-te-plasterboard-2400-1200-125',
    material: 'Plasterboard 12.5mm 2400 x 1200',
    category: 'plasterboard',
    supplier: 'Selco Builders Warehouse',
    productName: 'Siniat Standard Tapered Edge Plasterboard 2400 x 1200 x 12.5mm',
    priceIncVat: 11.86,
    unit: 'sheet',
    sourceUrl: 'https://www.selcobw.com/siniat-standard-tapered-edge-plasterboard-2400-x-1200-x-12-5mm',
    checkedAt: CHECKED_AT,
    sourceConfidence: 96,
    branchSignal: 'Choose a branch to collect from; postcode needed for local stock.',
    deliveryOptions: 'Click & Deliver; free delivery available with restrictions shown by Selco.',
    collectionOptions: 'Click & Collect available for collection after branch selection.',
    tradePricingNote: 'Selco trade card/login needed to buy online.',
    postcodeRelevance: 'postcode-required',
    warning: 'Prices and stock can change. Confirm with supplier before purchase.',
    keywords: ['plasterboard', 'siniat', 'drylining', 'board', '12.5mm'],
  },
  {
    id: 'wickes-cls-38-63-3000',
    material: 'CLS timber 38 x 63 x 3000mm',
    category: 'timber',
    supplier: 'Wickes',
    productName: 'Wickes Studwork CLS Timber - 38 x 63 x 3000mm',
    priceIncVat: 5.15,
    unit: 'length',
    sourceUrl: 'https://www.wickes.co.uk/Wickes-Studwork-CLS-Timber---38-x-63-x-3000mm/p/145305',
    checkedAt: CHECKED_AT,
    sourceConfidence: 96,
    branchSignal: 'Currently in stock on product page; postcode needed for nearest store.',
    deliveryOptions: 'Next day delivery shown; standard delivery from GBP4, exclusions apply.',
    collectionOptions: 'Free Click & Collect in as little as 15 minutes from over 230 stores.',
    tradePricingNote: 'Public retail price; trade account pricing not shown on page.',
    postcodeRelevance: 'postcode-required',
    warning: 'Prices and stock can change. Confirm with supplier before purchase.',
    keywords: ['cls', 'timber', 'studwork', 'wood', '38x63'],
  },
  {
    id: 'screwfix-no-nonsense-foam-gun-grade-750',
    material: 'Expanding foam 750ml',
    category: 'foam',
    supplier: 'Screwfix',
    productName: 'No Nonsense Expanding Foam Gun Grade 750ml',
    priceIncVat: 6.25,
    unit: 'can',
    sourceUrl: 'https://www.screwfix.com/p/no-nonsense-expanding-foam-gun-grade-750ml/87934',
    checkedAt: CHECKED_AT,
    sourceConfidence: 98,
    branchSignal: 'Screwfix page showed 40 in stock in Thame during check.',
    deliveryOptions: 'Store collection only on checked page.',
    collectionOptions: 'Collect today in selected local store.',
    tradePricingNote: 'Public price; account terms may differ.',
    postcodeRelevance: 'branch-specific',
    warning: 'Prices and stock can change. Confirm with supplier before purchase.',
    keywords: ['expanding foam', 'foam', 'pu foam', 'gun grade', 'sealant'],
  },
  {
    id: 'bq-osb-18-1220-607',
    material: 'OSB 3 board 18mm',
    category: 'sheet-material',
    supplier: 'B&Q',
    productName: 'OSB 3 OSB (L)1220mm (W)607mm (T)18mm',
    priceIncVat: 19,
    unit: 'board',
    sourceUrl: 'https://www.diy.com/departments/osb-3-osb-l-1220mm-w-607mm-t-18mm/3663602461463_BQ.prd',
    checkedAt: CHECKED_AT,
    sourceConfidence: 94,
    branchSignal: 'Enter postcode for delivery and collection options.',
    deliveryOptions: 'B&Q page advertises delivery/collection options after postcode.',
    collectionOptions: 'B&Q page advertises Click + Collect in as little as 15 minutes where available.',
    tradePricingNote: 'TradePoint/B&Q Club pricing may differ and needs account verification.',
    postcodeRelevance: 'postcode-required',
    warning: 'Prices and stock can change. Confirm with supplier before purchase.',
    keywords: ['osb', 'sheet', 'board', '18mm', 'roof decking'],
  },
  {
    id: 'builder-depot-gyproc-soundbloc-125',
    material: 'Acoustic plasterboard 12.5mm 2400 x 1200',
    category: 'plasterboard',
    supplier: 'Builder Depot',
    productName: '12.5mm Gyproc SoundBloc Tapered Edge Plasterboard 2400 x 1200mm',
    priceIncVat: 17.94,
    unit: 'sheet',
    sourceUrl: 'https://www.builderdepot.co.uk/12-5mm-british-gypsum-gyproc-soundbloc-plasterboard-tapered-edge-2400mm-x-1200mm-8ft-x-4ft',
    checkedAt: CHECKED_AT,
    sourceConfidence: 97,
    branchSignal: 'Product page showed 987 in stock during check.',
    deliveryOptions: 'Lead time 2-3 working days; Zone 1 restriction noted by Builder Depot.',
    collectionOptions: 'Available for in-store purchase; view in-store stock.',
    tradePricingNote: 'Quantity discount shown: 20+ at GBP17.27 inc VAT.',
    postcodeRelevance: 'branch-specific',
    warning: 'Prices and stock can change. Confirm with supplier before purchase.',
    keywords: ['plasterboard', 'soundbloc', 'acoustic', 'gyproc', 'drylining'],
  },
  {
    id: 'city-plumbing-plumbright-15mm-tee',
    material: 'Copper endfeed tee 15mm',
    category: 'plumbing',
    supplier: 'City Plumbing',
    productName: 'Plumbright Endfeed Equal Tee 15mm 78705',
    priceIncVat: 1.43,
    unit: 'each',
    sourceUrl: 'https://www.cityplumbing.co.uk/p/plumbright-endfeed-equal-tee-15mm-78705/p/950515',
    checkedAt: CHECKED_AT,
    sourceConfidence: 95,
    branchSignal: 'Enter postcode for local availability.',
    deliveryOptions: 'Free delivery over GBP75 ex VAT advertised by City Plumbing.',
    collectionOptions: 'Free click & collect advertised; branch stock requires postcode.',
    tradePricingNote: 'Login/register for trade price; public price captured.',
    postcodeRelevance: 'postcode-required',
    warning: 'Prices and stock can change. Confirm with supplier before purchase.',
    keywords: ['copper', 'pipe', 'tee', '15mm', 'plumbing'],
  },
  {
    id: 'toolstation-weber-render-25kg',
    material: 'Render 25kg',
    category: 'cement',
    supplier: 'Toolstation',
    productName: 'Weber One Coat Base Render 25kg',
    priceIncVat: 19.99,
    unit: 'bag',
    sourceUrl: 'https://www.toolstation.com/weber-one-coat-base-render/p31617',
    checkedAt: CHECKED_AT,
    sourceConfidence: 88,
    branchSignal: 'Toolstation page supports nearby stock check.',
    deliveryOptions: 'Toolstation category pages advertise free delivery on orders over GBP40 where eligible.',
    collectionOptions: 'Collection available; nearby stock check required.',
    tradePricingNote: 'Toolstation rewards/trade promotions may alter final price.',
    postcodeRelevance: 'postcode-required',
    warning: 'Prices and stock can change. Confirm with supplier before purchase.',
    keywords: ['render', 'cement', 'weber', 'bag', 'mortar'],
  },
  {
    id: 'toolstation-blue-circle-concrete-5kg',
    material: 'Concrete mix 5kg',
    category: 'cement',
    supplier: 'Toolstation',
    productName: 'Blue Circle Multi Purpose Concrete Mix 5kg',
    priceIncVat: 14.89,
    unit: 'bag',
    sourceUrl: 'https://www.toolstation.com/landscaping/concrete/c1062?type=Cement',
    checkedAt: CHECKED_AT,
    sourceConfidence: 86,
    branchSignal: 'Category page listed collection check nearby.',
    deliveryOptions: 'Delivery options vary by order value and local stock.',
    collectionOptions: 'Toolstation category pages advertise collection within 10 minutes where available.',
    tradePricingNote: 'Public price; rewards/promotions may apply.',
    postcodeRelevance: 'postcode-required',
    warning: 'Prices and stock can change. Confirm with supplier before purchase.',
    keywords: ['cement', 'concrete', 'blue circle', 'bag', 'mix'],
  },
  {
    id: 'builder-depot-secolite-cement-board-125',
    material: 'Cement board 12.5mm 2400 x 1200',
    category: 'sheet-material',
    supplier: 'Builder Depot',
    productName: 'Secolite Aerolite Cement Particle Board 2400 x 1200 x 12.5mm',
    priceIncVat: 44.03,
    unit: 'board',
    sourceUrl: 'https://www.builderdepot.co.uk/secolite-cement-particle-board-2400mm-x-1200mm-x-12-5mm',
    checkedAt: CHECKED_AT,
    sourceConfidence: 88,
    branchSignal: 'Builder Depot product page; delivery eligibility needs address check.',
    deliveryOptions: 'Delivery details shown at checkout; heavy product handling may apply.',
    collectionOptions: 'Store collection may be available subject to stock.',
    tradePricingNote: 'Public price; pallet deals may require sales office.',
    postcodeRelevance: 'branch-specific',
    warning: 'Prices and stock can change. Confirm with supplier before purchase.',
    keywords: ['cement board', 'board', 'sheet', 'render board', 'secolite'],
  },
  {
    id: 'selco-siniat-thermal-xp-27',
    material: 'Insulated plasterboard 27mm',
    category: 'insulation',
    supplier: 'Selco Builders Warehouse',
    productName: 'Siniat Thermal XP Tapered Edge 2400 x 1200 x 27mm',
    priceIncVat: 56.29,
    unit: 'sheet',
    sourceUrl: 'https://www.selcobw.com/siniat-thermal-xp-tapered-edge-2400-x-1200-x-27mm',
    checkedAt: CHECKED_AT,
    sourceConfidence: 91,
    branchSignal: 'Choose a branch to collect from; postcode needed for local stock.',
    deliveryOptions: 'Click & Deliver; free delivery available with restrictions shown by Selco.',
    collectionOptions: 'Click & Collect available after branch selection.',
    tradePricingNote: 'Selco trade card/login needed to buy online.',
    postcodeRelevance: 'postcode-required',
    warning: 'Prices and stock can change. Confirm with supplier before purchase.',
    keywords: ['insulation', 'insulated plasterboard', 'thermal', 'siniat', 'xps'],
  },
  {
    id: 'wickes-knauf-square-edge-plasterboard-125',
    material: 'Plasterboard 12.5mm 2400 x 1200',
    category: 'plasterboard',
    supplier: 'Wickes',
    productName: 'Knauf Square Edge Plasterboard 12.5 x 1200 x 2400mm',
    priceIncVat: 12.9,
    unit: 'sheet',
    sourceUrl: 'https://www.wickes.co.uk/Knauf-Square-Edge-Plasterboard---12-5-x-1200-x-2400mm/p/104123',
    checkedAt: CHECKED_AT,
    sourceConfidence: 92,
    branchSignal: 'Currently in stock on checked page; postcode needed for nearest store.',
    deliveryOptions: 'Next-day delivery shown by Wickes where available.',
    collectionOptions: 'Free Click & Collect in as little as 15 minutes where stocked.',
    tradePricingNote: 'Public retail price; trade price not shown.',
    postcodeRelevance: 'postcode-required',
    warning: 'Prices and stock can change. Confirm with supplier before purchase.',
    keywords: ['plasterboard', 'knauf', 'drylining', 'board', '12.5mm'],
  },
  {
    id: 'huws-gray-knauf-wallboard-125',
    material: 'Plasterboard 12.5mm 2400 x 1200',
    category: 'plasterboard',
    supplier: 'Huws Gray / Buildbase',
    productName: 'Knauf Wallboard 2400 x 1200 x 12.5mm Square Edge',
    priceIncVat: 12.6,
    unit: 'sheet',
    sourceUrl: 'https://www.huwsgray.co.uk/u0006477-knauf-wallboard-2400-x-1200-x-12-5mm-square-edge-243643',
    checkedAt: CHECKED_AT,
    sourceConfidence: 90,
    branchSignal: 'Click & Collect / selected branches; delivery postcode required.',
    deliveryOptions: 'Delivery postcode required for final availability.',
    collectionOptions: 'Click & Collect available at selected branches.',
    tradePricingNote: 'Public visible price; account pricing may differ.',
    postcodeRelevance: 'postcode-required',
    warning: 'Prices and stock can change. Confirm with supplier before purchase.',
    keywords: ['plasterboard', 'knauf', 'huws gray', 'buildbase', 'wallboard'],
  },
  {
    id: 'bq-blue-circle-cement-25kg',
    material: 'General purpose cement 25kg',
    category: 'cement',
    supplier: 'B&Q',
    productName: 'Blue Circle General Purpose Grey Cement 25kg',
    priceIncVat: 6.75,
    unit: 'bag',
    sourceUrl: 'https://www.diy.com/departments/blue-circle-multipurpose-cement-25kg-bag/35715_BQ.prd',
    checkedAt: CHECKED_AT,
    sourceConfidence: 88,
    branchSignal: 'Sold & shipped by B&Q; enter postcode for local stock.',
    deliveryOptions: 'Delivery availability depends on location.',
    collectionOptions: 'Collection availability depends on local store.',
    tradePricingNote: 'TradePoint pricing may differ and needs account verification.',
    postcodeRelevance: 'postcode-required',
    warning: 'Prices and stock can change. Confirm with supplier before purchase.',
    keywords: ['cement', 'blue circle', '25kg', 'bag', 'mortar'],
  },
  {
    id: 'travisperkins-castle-multicem-25kg',
    material: 'Multicem cement 25kg',
    category: 'cement',
    supplier: 'Travis Perkins',
    productName: 'Castle Multicem Cement in Plastic Bag 25kg',
    priceIncVat: 9.28,
    unit: 'bag',
    sourceUrl: 'https://www.travisperkins.co.uk/cement/castle-multicem-cement-in-plastic-bag-25kg/p/210768',
    checkedAt: CHECKED_AT,
    sourceConfidence: 86,
    branchSignal: 'Delivery/collection requires postcode or branch.',
    deliveryOptions: 'Delivery requires postcode/branch check.',
    collectionOptions: 'Collection requires postcode/branch check.',
    tradePricingNote: 'Trade price shown separately by Travis Perkins; public retail price captured.',
    postcodeRelevance: 'postcode-required',
    warning: 'Prices and stock can change. Confirm with supplier before purchase.',
    keywords: ['cement', 'multicem', 'travis perkins', '25kg', 'bag'],
  },
  {
    id: 'wickes-sharp-sand-major-bag',
    material: 'Sharp sand major bag',
    category: 'sand',
    supplier: 'Wickes',
    productName: 'Suburban Build Sharp Sand Major Bag',
    priceIncVat: 3.25,
    unit: 'bag',
    sourceUrl: 'https://www.wickes.co.uk/Products/Building-Materials/Cement%2BAggregates/Sand/c/1039001/f/sharp-sand',
    checkedAt: CHECKED_AT,
    sourceConfidence: 85,
    branchSignal: 'Category availability depends on store/postcode.',
    deliveryOptions: 'Home delivery shown on category.',
    collectionOptions: '15-minute Click & Collect shown on category where available.',
    tradePricingNote: 'Public visible price; trade price not shown.',
    postcodeRelevance: 'postcode-required',
    warning: 'Prices and stock can change. Confirm with supplier before purchase.',
    keywords: ['sharp sand', 'sand', 'aggregate', 'major bag'],
  },
  {
    id: 'builder-depot-sharp-sand-bulk-bag',
    material: 'Sharp sand bulk bag approx 850kg',
    category: 'sand',
    supplier: 'Builder Depot',
    productName: 'Coarse Sharp Sand Approx 850kg Bulk Bag',
    priceIncVat: 76.74,
    unit: 'bulk bag',
    sourceUrl: 'https://www.builderdepot.co.uk/coarse-sharp-sand-bulk-bag',
    checkedAt: CHECKED_AT,
    sourceConfidence: 90,
    branchSignal: 'Delivery/collection depends on area.',
    deliveryOptions: 'Minimum order quantity 3 bags noted in research.',
    collectionOptions: 'Collection depends on local stock/branch.',
    tradePricingNote: 'Public price; bulk/project quote may differ.',
    postcodeRelevance: 'branch-specific',
    warning: 'Prices and stock can change. Confirm with supplier before purchase.',
    keywords: ['sharp sand', 'bulk bag', 'aggregate', 'sand', '850kg'],
  },
  {
    id: 'toolstation-drywall-screws-35-38-1000',
    material: 'Drywall screws 3.5 x 38mm 1000 pack',
    category: 'fixings',
    supplier: 'Toolstation',
    productName: 'Drywall Black Phosphate Phillips Screw 3.5 x 38mm, 1000 pack',
    priceIncVat: 8.99,
    unit: '1000 pack',
    sourceUrl: 'https://www.toolstation.com/screws-fixings/drywall/c390?brand=FandF',
    checkedAt: CHECKED_AT,
    sourceConfidence: 86,
    branchSignal: 'Check nearby store for availability.',
    deliveryOptions: 'Delivery icon shown; final eligibility depends on stock/order.',
    collectionOptions: 'Collection icon shown; check nearby store.',
    tradePricingNote: 'Public visible price; rewards/promotions may alter final price.',
    postcodeRelevance: 'postcode-required',
    warning: 'Prices and stock can change. Confirm with supplier before purchase.',
    keywords: ['screws', 'drywall screws', 'fixings', 'plasterboard screws'],
  },
  {
    id: 'screwfix-wednesbury-copper-pipe-15-3m',
    material: 'Copper pipe 15mm x 3m',
    category: 'plumbing',
    supplier: 'Screwfix',
    productName: 'Wednesbury Copper Pipe 15mm x 3m',
    priceIncVat: 14.29,
    unit: 'length',
    sourceUrl: 'https://www.screwfix.com/p/copper-pipe-15mm-x-3m/98683',
    checkedAt: CHECKED_AT,
    sourceConfidence: 92,
    branchSignal: 'Store collection only; local stock check required.',
    deliveryOptions: 'Store collection only on checked page.',
    collectionOptions: 'Check local Screwfix stock before purchase.',
    tradePricingNote: 'Public price; account terms may differ.',
    postcodeRelevance: 'branch-specific',
    warning: 'Prices and stock can change. Confirm with supplier before purchase.',
    keywords: ['copper', 'pipe', '15mm', 'plumbing', 'wednesbury'],
  },
  {
    id: 'toolstation-hippo-megabag',
    material: 'Waste bag / skip bag',
    category: 'fixings',
    supplier: 'Toolstation',
    productName: 'Hippo MEGABAG 180 x 90 x 70cm',
    priceIncVat: 18.99,
    unit: 'bag',
    sourceUrl: 'https://www.toolstation.com/hippo-megabag/p95352',
    checkedAt: CHECKED_AT,
    sourceConfidence: 90,
    branchSignal: '20+ available for delivery shown in research.',
    deliveryOptions: 'Bag only; collection service purchased separately.',
    collectionOptions: 'Toolstation collection/delivery availability requires local check.',
    tradePricingNote: 'Waste collection cost is separate from bag price.',
    postcodeRelevance: 'postcode-required',
    warning: 'Prices and stock can change. Confirm with supplier before purchase.',
    keywords: ['skip', 'waste bag', 'hippo', 'megabag', 'rubbish'],
  },
];

function normalise(value: unknown) {
  return String(value ?? '').trim().toLowerCase();
}

function relevanceScore(item: MaterialPrice, query: string) {
  if (!query) return 1;
  const haystack = [
    item.material,
    item.category,
    item.supplier,
    item.productName,
    ...item.keywords,
  ].join(' ').toLowerCase();
  const terms = query.split(/\s+/).filter(Boolean);
  return terms.reduce((score, term) => score + (haystack.includes(term) ? 1 : 0), 0);
}

function estimateDistanceMiles(postcode: string, item: MaterialPrice) {
  if (!postcode) return null;
  if (item.postcodeRelevance === 'national') return 8;
  if (item.postcodeRelevance === 'branch-specific') return 6;
  return 10;
}

export function registerMaterialPricesRoute(app: Express) {
  app.get('/api/material-prices', (req: Request, res: Response) => {
    const query = normalise(req.query.q);
    const postcode = String(req.query.postcode ?? '').trim().toUpperCase();

    const matched = MATERIAL_PRICES
      .map((item) => ({ item, score: relevanceScore(item, query) }))
      .filter(({ score }) => score > 0)
      .map(({ item }) => ({
        ...item,
        estimatedDistanceMiles: estimateDistanceMiles(postcode, item),
        stale: Date.now() - new Date(item.checkedAt).getTime() > 24 * 60 * 60 * 1000,
      }))
      .sort((a, b) => a.priceIncVat - b.priceIncVat);

    res.json({
      ok: true,
      source: 'material_price_engine',
      query,
      postcode,
      checkedAt: new Date().toISOString(),
      disclaimer: 'Prices and stock can change. Confirm with supplier before purchase.',
      count: matched.length,
      results: matched,
      unavailable: matched.length === 0,
      errors: matched.length === 0 ? ['No traceable supplier prices available for that material yet.'] : [],
    });
  });
}
