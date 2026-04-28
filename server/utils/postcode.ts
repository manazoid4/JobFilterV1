const UK_POSTCODE =
  /^([A-Z]{1,2}\d[A-Z\d]?)\s*(\d[A-Z]{2})$/i;

const REGION_BY_PREFIX: Array<[RegExp, string]> = [
  [/^(BT)/, 'Northern Ireland'],
  [/^(B|CV|DY|WS|WV)/, 'West Midlands'],
  [/^(M|OL|BL|SK|WA|WN)/, 'North West'],
  [/^(BS|BA|GL|SN|TA|EX|PL|TQ)/, 'South West'],
  [/^(E|EC|N|NW|SE|SW|W|WC|BR|CR|DA|EN|HA|IG|KT|RM|SM|TW|UB)/, 'London'],
  [/^(LS|BD|HD|HX|WF|YO|S$)/, 'Yorkshire'],
  [/^(NE|SR|DH|DL|TS)/, 'North East'],
  [/^(NG|DE|LE|LN|PE)/, 'East Midlands'],
  [/^(CB|CM|CO|IP|LU|MK|NR|SG|SS)/, 'East of England'],
  [/^(BN|GU|HP|OX|PO|RG|RH|SL|SO|TN)/, 'South East'],
  [/^(CF|LD|LL|NP|SA|SY)/, 'Wales'],
  [/^(AB|DD|DG|EH|FK|G|HS|IV|KA|KW|KY|ML|PA|PH|TD|ZE)/, 'Scotland'],
];

export type PostcodeInfo = {
  postcode: string;
  outward: string;
  region: string;
};

export function parseUkPostcode(input: unknown): PostcodeInfo {
  if (typeof input !== 'string') {
    throw new Error('postcode must be a string');
  }

  const cleaned = input.toUpperCase().replace(/[^A-Z0-9]/g, '');
  const match = cleaned.match(UK_POSTCODE);
  if (!match) {
    throw new Error('valid UK postcode required');
  }

  const outward = match[1];
  const inward = match[2];
  const postcode = `${outward} ${inward}`;
  const area = outward.match(/^[A-Z]+/)?.[0] ?? outward;
  const region = regionFromArea(area);

  return { postcode, outward, region };
}

export function outwardFromPostcode(input: string) {
  const cleaned = input.toUpperCase().replace(/[^A-Z0-9]/g, '');
  return cleaned.match(/^([A-Z]{1,2}\d[A-Z\d]?)(\d[A-Z]{2})$/)?.[1] ?? '';
}

export function regionFromOutward(outward: string) {
  const area = outward.toUpperCase().match(/^[A-Z]+/)?.[0] ?? outward.toUpperCase();
  return regionFromArea(area);
}

function regionFromArea(area: string) {
  return REGION_BY_PREFIX.find(([pattern]) => pattern.test(area))?.[1] ?? 'United Kingdom';
}
