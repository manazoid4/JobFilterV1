import assert from 'node:assert/strict';
import fs from 'node:fs';

const app = fs.readFileSync('src/App.tsx', 'utf8');
const nav = fs.readFileSync('src/components/TopNav.tsx', 'utf8');
const pagePath = 'src/pages/NewsPage.tsx';

assert.match(app, /NewsPage/, 'App must import the news page');
assert.match(app, /path="\/news"/, 'App must expose /news');
assert.match(nav, /\/news/, 'Top nav must expose the news link');
assert.ok(fs.existsSync(pagePath), 'News page file must exist');

const page = fs.readFileSync(pagePath, 'utf8');
assert.match(page, /Federation of Master Builders/i, 'news page must include FMB');
assert.match(page, /Construction Leadership Council|Electrical Safety First|Building Safety Regulator/i, 'news page must include practical trade sources');
assert.match(page, /sourceUrl/i, 'news items must link to sources');

console.log('news link regression passed');
