import { onRequest } from 'firebase-functions/v2/https';
import express from 'express';
import { getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { scan } from './leadEngine/scan';
import { assertValidPostcodeInput, getOutward, regionFromOutward } from './leadEngine/postcode';
import { createCheckoutSession, handleStripeWebhook } from './stripe';

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) { rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 }); return true; }
  if (entry.count >= 10) return false;
  entry.count++;
  return true;
}

function validUkPostcode(v: unknown): v is string {
  if (typeof v !== 'string') return false;
  try {
    assertValidPostcodeInput(v);
    return true;
  } catch {
    return false;
  }
}

async function twilioWhatsApp(message: string) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_FROM || 'whatsapp:+14155238886';
  const to = process.env.TWILIO_WHATSAPP_TO;
  if (!sid || !token || !to) return { triggered: false, provider: 'none' };
  try {
    const auth = Buffer.from(`${sid}:${token}`).toString('base64');
    await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
      method: 'POST',
      headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ From: `whatsapp:${from}`, To: `whatsapp:${to}`, Body: message }).toString(),
    });
    return { triggered: true, provider: 'twilio-whatsapp' };
  } catch (e: any) {
    console.error('[twilio]', e?.message);
    return { triggered: false, provider: 'twilio-error' };
  }
}

async function sendEmail(to: string, subject: string, html: string) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { sent: false, provider: 'none' };
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: 'JobFilter <no-reply@jobfilter.uk>', to, subject, html }),
    });
    return { sent: res.ok, provider: 'resend' };
  } catch (e: any) {
    console.error('[resend]', e?.message);
    return { sent: false, provider: 'resend-error' };
  }
}

const app = express();
app.use(express.json());
if (!getApps().length) initializeApp();

app.post('/api/leads/scan', async (req, res) => {
  const ip = String(req.headers['x-forwarded-for'] ?? req.socket.remoteAddress ?? 'unknown').split(',')[0].trim();
  if (!checkRateLimit(ip)) return res.status(429).json({ error: 'Too many requests.', leads: [], total: 0, errors: ['Too many requests.'] });
  try {
    const { postcode, trade = 'all', tier = 'free' } = req.body ?? {};
    if (!validUkPostcode(postcode)) return res.status(400).json({ error: 'Valid UK postcode required' });
    const result = await scan({ postcode: postcode.trim(), trade: String(trade || 'all'), tier: tier === 'paid' ? 'paid' : 'free' });
    const leads = result.leads;
    return res.json({ ...result, leads, total: leads.length });
  } catch (err: any) {
    return res.status(500).json({ error: 'Scan failed', leads: [], total: 0, errors: [String(err?.message ?? 'scan failed')] });
  }
});

app.post('/api/leads/search', async (req, res) => {
  const ip = String(req.headers['x-forwarded-for'] ?? req.socket.remoteAddress ?? 'unknown').split(',')[0].trim();
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ ok: false, source: 'lead_engine', count: 0, region: '', outward: '', leads: [], lockedCount: 0, errors: ['Too many requests.'] });
  }

  try {
    const { postcode, trade = 'electrical' } = req.body ?? {};
    if (!validUkPostcode(postcode)) {
      return res.status(400).json({ ok: false, source: 'lead_engine', count: 0, region: '', outward: '', leads: [], lockedCount: 0, errors: ['valid UK postcode required'] });
    }

    const result = await scan({ postcode: postcode.trim(), trade: String(trade || 'electrical'), tier: 'paid' });
    const allLeads = result.leads;

    const FREE_LIMIT = 2;
    const visibleLeads = allLeads.slice(0, FREE_LIMIT).map(toFreePreviewLead);
    const lockedCount = Math.max(0, allLeads.length - FREE_LIMIT);

    return res.json({
      ok: true,
      source: 'lead_engine',
      count: allLeads.length,
      region: result.region,
      outward: result.outward,
      leads: visibleLeads,
      lockedCount,
      errors: result.errors ?? [],
    });
  } catch (err: any) {
    return res.status(503).json({ ok: false, source: 'lead_engine', count: 0, region: '', outward: '', leads: [], lockedCount: 0, errors: [String(err?.message ?? 'scan failed')] });
  }
});

app.post('/api/intake/score', async (req, res) => {
  try {
    const jobType = clean(req.body?.jobType, 60);
    const urgency = clean(req.body?.urgency, 40) as 'Emergency' | 'This week' | 'Later';
    const details = clean(req.body?.details, 500);
    const postcode = clean(req.body?.postcode, 20).toUpperCase();
    const phone = clean(req.body?.phone, 40);
    const hasPhotos = Boolean(req.body?.hasPhotos);
    if (!jobType || !urgency) return res.status(422).json({ ok: false, errors: ['pick job type and urgency'] });

    const scored = scoreIntake({ urgency, details, postcode, hasPhotos });
    const lead = {
      id: `lead-${Date.now()}`,
      title: `${jobType} job`,
      score: scored.score,
      jobType,
      urgency,
      postcode,
      phone,
      area: postcode.split(/\s+/)[0] || 'Area unknown',
      flags: scored.flags,
      details,
      status: 'new',
      createdAt: new Date().toISOString(),
    };

    if (lead.score > 80) console.log('[sms/gold-lead]', { title: 'NEW GOLD LEAD', job: lead.jobType, area: lead.area, score: lead.score });
    return res.json({ ok: true, sms: { triggered: lead.score > 80, provider: 'stub' }, lead });
  } catch (err: any) {
    return res.status(500).json({ ok: false, errors: [String(err?.message ?? 'score failed')] });
  }
});

app.post('/api/waitlist', async (req, res) => {
  try {
    const entry = {
      name: clean(req.body?.name, 80),
      trade: clean(req.body?.trade, 60),
      contact: clean(req.body?.contact, 120),
      contactType: detectContactType(req.body?.contact),
      source: clean(req.body?.source, 80) || 'site',
      createdAt: new Date().toISOString(),
    };
    if (!entry.name || !entry.trade || !entry.contact) {
      return res.status(422).json({ ok: false, error: 'Name, trade, and email or phone are required.' });
    }
    await getFirestore().collection('waitlist').add(entry);
    if (entry.contactType === 'email') {
      sendEmail(entry.contact, "You're on the JobFilter Founding 30 list", `<div style="font-family:sans-serif;max-width:500px;margin:0 auto;padding:24px"><h1>You're on the list, ${entry.name}.</h1><p>Thanks for joining the JobFilter Founding 30 waitlist. We'll email you the moment it's live.</p><p>Free scan: <a href="https://jobfilter.uk/find-jobs">jobfilter.uk/find-jobs</a></p></div>`).catch(() => {});
    }
    return res.json({ ok: true, stored: 'firestore' });
  } catch (err: any) {
    return res.status(500).json({ ok: false, error: String(err?.message ?? 'Waitlist failed.') });
  }
});

app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const result = await createCheckoutSession(req.body ?? {});
    res.json(result);
  } catch (err: any) {
    res.status(503).json({ error: err.message });
  }
});

app.post('/api/stripe/webhook', async (req, res) => {
  try {
    const rawBody = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    const signature = req.headers['stripe-signature'] as string;
    const result = await handleStripeWebhook(rawBody, signature);
    res.json(result);
  } catch (err: any) {
    res.status(err.message?.includes('signature') ? 400 : 500).json({ error: err.message });
  }
});

app.post('/api/onboarding/submit', (req, res) => { res.json({ ok: true }); });
app.post('/api/email-gate/unlock', (req, res) => { res.json({ ok: true }); });
app.post('/api/calendar/sync', (_req, res) => { res.status(501).json({ status: 'not_implemented' }); });

app.get('/api/waitlist/count', async (_req, res) => {
  try {
    const snapshot = await getFirestore().collection('waitlist').count().get();
    const count = snapshot.data().count || 0;
    const foundingMax = 30;
    const remaining = Math.max(0, foundingMax - count);
    return res.json({ ok: true, count, remaining, foundingMax });
  } catch (e: any) { return res.status(500).json({ ok: false, error: String(e?.message) }); }
});

app.post('/api/leads/notify', async (req, res) => {
  try {
    const { phoneNumber, leadData } = req.body || {};
    if (!phoneNumber || !leadData) return res.status(422).json({ ok: false, error: 'phoneNumber and leadData required.' });
    const trade = leadData.trade || 'Trade';
    const area = leadData.area || leadData.location || 'Unknown';
    const value = leadData.value || leadData.estimatedValue || 'Not specified';
    const message = `NEW GOLD LEAD\nJob: ${trade}\nArea: ${area}\nValue: ${value}\nScore: ${leadData.score || 80}/100\nSource: ${leadData.source || 'Official'}`;
    const result = await twilioWhatsApp(message);
    return res.json({ ok: true, result });
  } catch (e: any) { return res.status(500).json({ ok: false, error: String(e?.message) }); }
});

const chaseStore: Record<string, { status: string; sentAt: string; nudged: boolean }> = {};

app.post('/api/chase/update', (req, res) => {
  try {
    const { leadId, status } = req.body || {};
    if (!leadId || !status) return res.status(422).json({ ok: false, error: 'leadId and status required.' });
    chaseStore[leadId] = { status, sentAt: chaseStore[leadId]?.sentAt || new Date().toISOString(), nudged: chaseStore[leadId]?.nudged || false };
    return res.json({ ok: true });
  } catch (e: any) { return res.status(500).json({ ok: false, error: String(e?.message) }); }
});

app.post('/api/chase/nudge', async (req, res) => {
  try {
    const { leadId, phoneNumber, trade, area } = req.body || {};
    if (!leadId || !phoneNumber) return res.status(422).json({ ok: false, error: 'leadId and phoneNumber required.' });
    const entry = chaseStore[leadId];
    if (entry?.nudged) return res.json({ ok: true, nudged: false, reason: 'already_nudged' });
    if (entry?.status === 'contacted' || entry?.status === 'quoted' || entry?.status === 'won') return res.json({ ok: true, nudged: false, reason: 'already_contacted' });
    chaseStore[leadId] = { ...entry, status: entry?.status || 'sent', sentAt: entry?.sentAt || new Date().toISOString(), nudged: true };
    const message = `Follow-up: Still interested in the ${trade || 'trade'} job in ${area || 'your area'}? Tap to draft a message.`;
    const result = await twilioWhatsApp(message);
    return res.json({ ok: true, nudged: true, result });
  } catch (e: any) { return res.status(500).json({ ok: false, error: String(e?.message) }); }
});

app.post('/api/chase/template', (req, res) => {
  try {
    const { trade, area, address, description } = req.body || {};
    const message = `Hi, I noticed your property${address ? ` at ${address}` : ''} has planning approval for ${description || 'work'}. I'm a local ${trade || 'tradesman'} â€” would you like a quote? No obligation.`;
    return res.json({ ok: true, message });
  } catch (e: any) { return res.status(500).json({ ok: false, error: String(e?.message) }); }
});

const outcomes: Record<string, { id: string; title: string; status: string; value?: string; createdAt: string; lostReason?: string }> = {};

app.post('/api/leads/outcome', (req, res) => {
  try {
    const { leadId, status, title, value, lostReason } = req.body || {};
    if (!leadId || !status) return res.status(422).json({ ok: false, error: 'leadId and status required.' });
    outcomes[leadId] = { id: leadId, title: title || 'Unknown job', status, value, createdAt: outcomes[leadId]?.createdAt || new Date().toISOString(), lostReason: status === 'lost' ? lostReason : undefined };
    return res.json({ ok: true });
  } catch (e: any) { return res.status(500).json({ ok: false, error: String(e?.message) }); }
});

app.post('/api/leads/review-link', (req, res) => {
  try {
    const { customerName, trade } = req.body || {};
    const reviewUrl = 'https://g.page/r/yourbusiness/review';
    const message = `Hi ${customerName || 'there'}, thanks for choosing us for your ${trade || 'trade'} work. If you're happy with the job, a quick review here would mean the world: ${reviewUrl}`;
    return res.json({ ok: true, reviewUrl, message });
  } catch (e: any) { return res.status(500).json({ ok: false, error: String(e?.message) }); }
});

app.get('/api/leads/summary', (_req, res) => {
  try {
    const all = Object.values(outcomes);
    const won = all.filter((o) => o.status === 'won');
    const wonCount = won.length;
    const totalValue = won.reduce((sum, o) => { const v = parseFloat((o.value || '0').replace(/[^0-9.]/g, '')); return sum + (isNaN(v) ? 0 : v); }, 0);
    return res.json({ ok: true, wonCount, totalValue: totalValue > 0 ? `Â£${totalValue.toLocaleString()}` : 'N/A', monthlyCost: 29, summary: wonCount > 0 ? `${wonCount} jobs won. ~Â£${totalValue.toLocaleString()} total. Â£29 subscription.` : 'No won jobs tracked yet.' });
  } catch (e: any) { return res.status(500).json({ ok: false, error: String(e?.message) }); }
});

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

export const api = onRequest({ region: 'europe-west2', memory: '512MiB', timeoutSeconds: 60 }, app);

function clean(input: unknown, max: number) {
  return String(input ?? '').replace(/[<>]/g, '').trim().slice(0, max);
}

function detectContactType(input: unknown) {
  const value = String(input ?? '').trim();
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'email';
  if (/^\+?[\d\s().-]{8,}$/.test(value)) return 'phone';
  return 'unknown';
}

function scoreIntake(input: { urgency: string; details: string; postcode: string; hasPhotos: boolean }) {
  const flags: string[] = [];
  let score = 40;

  if (input.urgency === 'Emergency') {
    score += 30;
    flags.push('Urgent');
  } else if (input.urgency === 'This week') {
    score += 20;
    flags.push('Urgent');
  }

  if (input.postcode.trim()) {
    score += 20;
    flags.push('Local');
  }

  if (input.hasPhotos) {
    score += 10;
    flags.push('Photos');
  }

  const text = input.details.toLowerCase();
  if (text.length >= 20) {
    flags.push('Clear');
  } else {
    score -= 20;
    flags.push('Risk');
  }

  if (text.includes('cheap') || text.includes('low budget') || text.includes('small budget')) {
    score -= 50;
    flags.push('Budget');
  }

  return { score: Math.max(0, Math.min(100, score)), flags: flags.slice(0, 4) };
}

async function fetchContractsFinderSearch(trade: string, outward: string, region: string, radiusMiles: number) {
  const publishedFrom = new Date(Date.now() - 45 * 86_400_000).toISOString().replace('T', ' ').substring(0, 19);
  const params = new URLSearchParams({ publishedFrom, stages: 'tender', limit: '100' });
  const response = await fetch(`https://www.contractsfinder.service.gov.uk/Published/Notices/OCDS/Search?${params}`, {
    signal: AbortSignal.timeout(10_000),
    headers: {
      Accept: 'application/json',
      'User-Agent': 'JobFilter/1.0 (jobfilter.uk)',
    },
  });

  if (!response.ok) throw new Error(`contracts finder returned ${response.status}`);
  const payload = await response.json() as { releases?: any[] };
  const releases = Array.isArray(payload.releases) ? payload.releases : [];

  return releases
    .map(mapContractsFinderRelease)
    .filter(Boolean)
    .filter((notice: any) => noticeMatchesTrade(notice, trade))
    .filter((notice: any) => noticeFitsLocation(notice, outward, region, radiusMiles))
    .map((notice: any) => normalizeContractsFinderLead(notice, trade, outward, region))
    .sort((a: any, b: any) => b.score - a.score)
    .slice(0, radiusMiles >= 100 ? 25 : 15);
}

function mapContractsFinderRelease(release: any) {
  const tender = release?.tender ?? {};
  const items = Array.isArray(tender.items) ? tender.items : [];
  const documents = Array.isArray(tender.documents) ? tender.documents : [];
  const firstAddress = items.flatMap((item: any) => item?.deliveryAddresses ?? [])[0] ?? {};
  const title = clean(tender.title, 300);
  if (!title) return null;

  return {
    id: clean(release.id || release.ocid || title, 120),
    ocid: clean(release.ocid, 120),
    title,
    description: clean(tender.description, 600),
    buyer: clean(release?.buyer?.name || tender?.procuringEntity?.name, 160),
    location: clean(firstAddress.region || firstAddress.locality || firstAddress.countryName || firstAddress.postalCode || 'United Kingdom', 160),
    postcode: clean(firstAddress.postalCode, 20),
    value: Number(tender?.value?.amount) || undefined,
    publishedAt: clean(tender.datePublished || release.date, 80),
    deadlineAt: clean(tender?.tenderPeriod?.endDate, 80),
    url: clean(documents[0]?.url, 300) || (release.id ? `https://www.contractsfinder.service.gov.uk/Notice/${release.id}` : 'https://www.contractsfinder.service.gov.uk/'),
    cpvCodes: [
      tender?.classification?.id,
      ...items.flatMap((item: any) => [
        item?.classification?.id,
        ...(item?.additionalClassifications ?? []).map((entry: any) => entry?.id),
      ]),
    ].filter(Boolean).map(String),
  };
}

function normalizeContractsFinderLead(notice: any, trade: string, outward: string, region: string) {
  const score = scoreContractsFinderNotice(notice, trade, outward, region);
  return {
    id: `cf-${String(notice.id || notice.ocid || notice.title).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80)}`,
    title: notice.title,
    trade,
    buyer: notice.buyer,
    location: notice.location || region || 'United Kingdom',
    postcodeOutward: notice.postcode ? getOutward(notice.postcode) : outward,
    estimatedValue: formatValue(notice.value),
    urgency: score.urgency,
    publishedAt: normalizeDate(notice.publishedAt),
    deadlineAt: normalizeDate(notice.deadlineAt),
    url: notice.url,
    source: 'Contracts Finder',
    sourceConfidence: score.sourceConfidence,
    contactSignal: score.contactSignal,
    status: 'new',
    reasons: score.reasons,
    revenueTier: score.score >= 80 ? 'gold' : score.score >= 55 ? 'worth-checking' : 'low-signal',
    tradeMatch: trade,
    score: score.score,
  };
}

function toFreePreviewLead(lead: any) {
  return {
    ...lead,
    title: `${titleCase(lead.trade)} opportunity near ${lead.postcodeOutward}`,
    buyer: '',
    deadlineAt: '',
    url: '',
    estimatedValue: valuePreview(lead.estimatedValue),
    urgency: 'medium',
    sourceConfidence: previewSourceConfidence(lead.sourceConfidence),
    contactSignal: 'none',
    score: previewScore(lead.score),
    reasons: ['Paid preview - unlock buyer, deadline, exact value, and action route'],
  };
}

function previewScore(score: number) {
  if (score >= 80) return 80;
  if (score >= 55) return 55;
  return 35;
}

function previewSourceConfidence(confidence: number) {
  if (confidence >= 85) return 80;
  if (confidence >= 70) return 65;
  return 50;
}

function valuePreview(value: string) {
  const amount = Number(String(value).replace(/[^0-9.]/g, ''));
  if (!Number.isFinite(amount) || amount <= 0) return 'Unlock exact value';
  if (amount >= 100_000) return 'High-value contract';
  if (amount >= 25_000) return 'Strong-value job';
  if (amount >= 5_000) return 'Paid job signal';
  return 'Unlock exact value';
}

function titleCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function noticeMatchesTrade(notice: any, trade: string) {
  const text = `${notice.title} ${notice.description}`.toLowerCase();
  const keywords = keywordsForTrade(trade);
  return keywords.some((keyword) => text.includes(keyword)) || cpvPrefixesForTrade(trade).some((prefix) => notice.cpvCodes.some((code: string) => code.startsWith(prefix)));
}

function noticeFitsLocation(notice: any, outward: string, region: string, radiusMiles: number) {
  const location = `${notice.location} ${notice.postcode}`.toUpperCase();
  if (!notice.postcode && location.includes('UNITED KINGDOM')) return true;
  const noticeOutward = notice.postcode ? getOutward(notice.postcode) : '';
  if (!noticeOutward) return radiusMiles >= 100 || location.includes('UNITED KINGDOM');
  if (noticeOutward === outward) return true;
  return radiusMiles >= 25 && regionFromOutward(noticeOutward) === region;
}

function scoreContractsFinderNotice(notice: any, trade: string, outward: string, region: string) {
  const text = `${notice.title} ${notice.description}`.toLowerCase();
  const keywordHits = keywordsForTrade(trade).filter((keyword) => text.includes(keyword)).length;
  const keywordScore = Math.min(20, keywordHits * 8);
  const cpvScore = notice.cpvCodes.length ? 14 : 0;
  const urgencyScore = scoreUrgency(notice.deadlineAt, notice.publishedAt);
  const valueScore = scoreValue(notice.value);
  const locationScore = notice.postcode && getOutward(notice.postcode) === outward ? 20 : regionFromOutward(getOutward(notice.postcode || '')) === region ? 14 : 0;
  const completenessScore = scoreCompleteness(notice);
  const rawScore = keywordScore + cpvScore + urgencyScore + valueScore + locationScore + completenessScore;
  return {
    score: Math.max(20, Math.min(100, rawScore)),
    sourceConfidence: Math.max(55, Math.min(96, 52 + keywordScore + cpvScore + (notice.url ? 8 : 0) + (notice.buyer ? 6 : 0))),
    urgency: urgencyFromScores(notice.deadlineAt, notice.publishedAt, notice.value),
    contactSignal: contactSignalFor(notice),
    reasons: buildReasons(notice, keywordHits, locationScore, urgencyScore, valueScore, completenessScore),
  };
}

function keywordsForTrade(trade: string) {
  const map: Record<string, string[]> = {
    plumbing: ['plumbing', 'boiler', 'heating', 'pipework', 'sanitary', 'mechanical services', 'water'],
    electrical: ['electrical', 'electric', 'wiring', 'ev charger', 'lighting', 'rewire', 'fire alarm'],
    roofing: ['roof', 'roofing', 'cladding', 'guttering', 'fascia', 'flat roof'],
    building: ['refurbishment', 'extension', 'construction', 'building', 'renovation', 'maintenance works'],
  };
  return map[trade] ?? [];
}

function cpvPrefixesForTrade(trade: string) {
  const map: Record<string, string[]> = {
    plumbing: ['45330', '45331', '45332', '45333', '50720', '50730'],
    electrical: ['45310', '45311', '45312', '45315', '45316', '50710', '50711'],
    roofing: ['45260', '45261', '45262', '45263'],
    building: ['45000', '45100', '45200', '45210', '45211', '45220', '45400', '45410', '45450'],
  };
  return map[trade] ?? [];
}

function scoreFreshness(value: string) {
  const published = new Date(value).getTime();
  if (!published) return 4;
  const days = (Date.now() - published) / 86_400_000;
  if (days <= 7) return 12;
  if (days <= 21) return 8;
  if (days <= 45) return 5;
  return 2;
}

function scoreUrgency(deadlineValue: string, publishedValue: string) {
  const deadline = new Date(deadlineValue).getTime();
  if (deadline) {
    const daysLeft = (deadline - Date.now()) / 86_400_000;
    if (daysLeft >= 0 && daysLeft <= 7) return 22;
    if (daysLeft <= 21) return 16;
    if (daysLeft <= 45) return 10;
  }
  return Math.min(12, scoreFreshness(publishedValue));
}

function scoreValue(value?: number) {
  if (!value) return 0;
  if (value >= 25_000 && value <= 250_000) return 18;
  if (value >= 5_000 && value < 25_000) return 12;
  if (value > 250_000) return 8;
  return 4;
}

function scoreCompleteness(notice: any) {
  let score = 0;
  if (notice.buyer) score += 5;
  if (notice.url) score += 4;
  if (notice.value) score += 4;
  if (notice.deadlineAt) score += 4;
  if (notice.location || notice.postcode) score += 3;
  if (String(notice.description ?? '').length >= 80) score += 3;
  return Math.min(18, score);
}

function urgencyFromScores(deadlineValue: string, publishedValue: string, value?: number): 'high' | 'medium' | 'low' {
  const deadline = new Date(deadlineValue).getTime();
  if (deadline) {
    const daysLeft = (deadline - Date.now()) / 86_400_000;
    if (daysLeft >= 0 && daysLeft <= 10) return 'high';
    if (daysLeft <= 30) return 'medium';
  }
  const published = new Date(publishedValue).getTime();
  const daysOld = published ? (Date.now() - published) / 86_400_000 : 99;
  if (daysOld <= 7 && (value ?? 0) >= 25_000) return 'high';
  if (daysOld <= 21 || (value ?? 0) >= 50_000) return 'medium';
  return 'low';
}

function contactSignalFor(notice: any): 'strong' | 'weak' | 'none' {
  if (notice.buyer && notice.url && notice.deadlineAt) return 'strong';
  if (notice.buyer || notice.url) return 'weak';
  return 'none';
}

function buildReasons(notice: any, keywordHits: number, locationScore: number, urgencyScore: number, valueScore: number, completenessScore: number) {
  const reasons: string[] = [];
  if (urgencyScore >= 16) reasons.push('Deadline soon');
  if (valueScore >= 18) reasons.push('High value');
  if (locationScore >= 14) reasons.push(locationScore === 20 ? 'Outward postcode match' : 'Local region');
  if (notice.url) reasons.push('Official source');
  if (notice.buyer) reasons.push('Buyer named');
  if (notice.cpvCodes.length) reasons.push('CPV trade match');
  if (keywordHits) reasons.push('Trade keywords found');
  if (completenessScore < 10) reasons.push('Low detail risk');
  return reasons.slice(0, 6);
}

function formatValue(value?: number) {
  if (!value) return 'Unknown';
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(value);
}

function normalizeDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '' : date.toISOString();
}
