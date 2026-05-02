import fs from 'node:fs';
import assert from 'node:assert/strict';

const read = (path) => fs.readFileSync(path, 'utf8');

const home = read('src/pages/HomePage.tsx');
const nav = read('src/components/TopNav.tsx');
const findJobs = read('src/pages/FindJobsPage.tsx');
const route = read('server/routes/leadsSearch.ts');
const news = read('src/pages/NewsPage.tsx');
const pricing = read('src/pages/PricingPage.tsx');

for (const label of ['What You Get', 'Testing Stage', 'Blueprint', 'Login', 'Get Started']) {
  assert(nav.includes(label), `top nav missing ${label}`);
}

for (const trade of ['carpentry', 'painting', 'hvac', 'landscaping']) {
  assert(findJobs.includes(`'${trade}'`), `find jobs UI missing ${trade}`);
  assert(route.includes(`'${trade}'`), `lead search route missing ${trade}`);
}

assert(home.includes('STOP FUNDING TYRE-KICKERS'), 'homepage hero must use approved tyre-kicker positioning');
assert(home.includes('INTAKE ENGINE: ACTIVE'), 'homepage must show tool/status proof above fold');
assert(home.includes('CHECK WHAT YOUR AREA IS HIDING'), 'homepage must push first free scan');
assert(home.includes('OFFICIAL SOURCE PROOF'), 'homepage must show official source proof');
assert(home.includes('ONE JOB CAN PAY FOR THIS'), 'homepage must frame £49 with ROI');

for (const source of [
  'GOV.UK Building Materials',
  'Builders Merchant Building Index',
  'Construction Products Association',
  'HSE Construction Enforcement',
  'Planning Data',
]) {
  assert(news.includes(source), `news/trade signals missing ${source}`);
}

for (const phrase of ['Money angle', 'Action this week', 'Trade affected']) {
  assert(news.includes(phrase), `news cards missing ${phrase}`);
}

assert(pricing.includes('ONE PRICE. NO GAMES.'), 'pricing must use approved simple-pricing frame');
assert(pricing.includes('One decent job pays for the month'), 'pricing must explain £49 with one-job ROI');

console.log('launch polish regression passed');
