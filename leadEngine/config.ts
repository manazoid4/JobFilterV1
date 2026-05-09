import type { TradeKey } from './types';

export type { TradeKey };

export interface LeadEngineConfig {
  sources: {
    fts: boolean;
    contractsFinder: boolean;
    planningData: boolean;
    companiesHouse: boolean;
    epcData: boolean;
    sell2wales: boolean;
    publicContractsScotland: boolean;
    landRegistry: boolean;
    charityCommission: boolean;
    forestryCommission: boolean;
  };
  cpvAllowPrefixes: Record<TradeKey, string[]>;
  cpvBlockPrefixes: string[];
  keywordAllow: string[];
  keywordBlock: string[];
  minValueByTrade: Record<TradeKey, number>;
  maxValueByTrade: Record<TradeKey, number>;
  minDeadlineDaysFromNow: number;
  maxDeadlineDaysFromNow: number;
  topN: number;
  freeTierLimit: number;
  fetchTimeoutMs: number;
  retryAttempts: number;
  lookbackDays: number;
}

const CPV_ALLOW: Record<TradeKey, string[]> = {
  plumbing:    ['4533', '4533', '50720', '50730', '50700'],
  electrical:  ['4531', '50710', '50711'],
  roofing:     ['4526', '45260', '45261', '45262', '45263'],
  building:    ['4500', '4510', '4520', '4521', '4522', '4523', '4524', '4525', '4526', '4540', '4541', '4545', '50000', '50700'],
  carpentry:   ['4542', '45420', '45421', '45422', '45423'],
  painting:    ['4544', '45440', '45441', '45442'],
  hvac:        ['45331', '50720', '50730', '45332', '45333'],
  landscaping: ['77300', '77310', '77311', '77312', '77313', '77314'],
  all:         ['45', '50', '773'],
};

// Normalise: use startsWith checks — store raw prefixes
export const CONFIG: LeadEngineConfig = {
  sources: {
    fts:                      process.env.SOURCE_FTS !== 'false',
    contractsFinder:          process.env.SOURCE_CF !== 'false',
    planningData:             process.env.SOURCE_PLANNING_DATA !== 'false',
    companiesHouse:           process.env.COMPANIES_HOUSE_API_KEY ? true : process.env.DEMO_MODE === 'true',
    epcData:                  process.env.SOURCE_EPC !== 'false',
    sell2wales:               process.env.SOURCE_S2W === 'true',   // unresolved endpoint — off until fixed
    publicContractsScotland:  process.env.SOURCE_PCS !== 'false',
    landRegistry:             process.env.DEMO_MODE === 'true',       // disabled — real CSV parsing pending
    charityCommission:        process.env.DEMO_MODE === 'true',       // disabled — real API integration pending
    forestryCommission:       process.env.DEMO_MODE === 'true',       // disabled — real felling licence register pending
  },

  cpvAllowPrefixes: CPV_ALLOW,

  // Block non-trade CPV top-level divisions (first 2 digits)
  cpvBlockPrefixes: [
    '60', '61', '62', '63', '64', '65', '66',
    '70',
    '71',
    '72', '73', '74',
    '75', '76',
    '79',
    '80', '81', '82', '83', '84', '85',
    '90', '91', '92', '93', '94', '95', '96', '98',
  ],

  keywordAllow: [
    'plumb', 'heating', 'boiler', 'hvac', 'ventilation', 'air condition',
    'electrical', 'rewire', 'wiring', 'lighting', 'ev charger', 'solar',
    'roof', 'roofing', 'flat roof', 'tile', 'gutter', 'fascia', 'soffit',
    'building work', 'construction', 'refurb', 'renovation', 'extension', 'conversion',
    'carpentry', 'joinery', 'floor', 'window', 'door fitting',
    'paint', 'decorat', 'plaster', 'render',
    'landscape', 'grounds maintenance', 'groundwork',
    'repair', 'maintenance', 'install', 'fit out', 'fit-out',
    'drain', 'sanitary', 'mechanical',
  ],

  keywordBlock: [
    'software', 'saas', 'cloud hosting', 'it services', 'digital platform',
    'consultancy only', 'advisory service', 'legal service', 'audit service',
    'recruitment', 'staffing agency', 'marketing campaign', 'public relations',
    'research study', 'data analytics platform', 'insurance brok',
    'translation', 'catering supply', 'food supply',
  ],

  minValueByTrade: {
    plumbing: 500,
    electrical: 500,
    roofing: 1_000,
    building: 2_000,
    carpentry: 500,
    painting: 300,
    hvac: 1_000,
    landscaping: 500,
    all: 500,
  },

  maxValueByTrade: {
    plumbing: 5_000_000,
    electrical: 3_000_000,
    roofing: 5_000_000,
    building: 50_000_000,
    carpentry: 2_000_000,
    painting: 2_000_000,
    hvac: 10_000_000,
    landscaping: 5_000_000,
    all: 50_000_000,
  },

  minDeadlineDaysFromNow: 0,
  maxDeadlineDaysFromNow: 180,

  topN: 25,
  freeTierLimit: 5,
  fetchTimeoutMs: 9_000,
  retryAttempts: 2,
  lookbackDays: 14,
};

export const TRADE_KEYS: TradeKey[] = [
  'plumbing', 'electrical', 'roofing', 'building', 'carpentry', 'painting', 'hvac', 'landscaping', 'all',
];
