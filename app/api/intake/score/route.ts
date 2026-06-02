import { scoreIntake } from '../../../../server/services/decisionScoring';
import { outwardFromPostcode } from '../../../../server/utils/postcode';
import { persistLeads } from '../../../../server/services/leadPersistence';
import { triggerGoldLeadWhatsApp } from '../../../../server/services/sms';
import type { Lead } from '../../../../leadEngine/types';

const JOB_TYPES = new Set([
  'Electrical', 'Plumbing', 'Roofing', 'Building',
  'HVAC', 'Carpentry', 'Landscaping', 'Painting', 'Heat Pumps',
]);
const URGENCY_TYPES = new Set(['Emergency', 'This week', 'Later']);

const TRADE_MAP: Record<string, string> = {
  Electrical: 'electrical', Plumbing: 'plumbing', Roofing: 'roofing',
  Building: 'building', HVAC: 'hvac', Carpentry: 'carpentry',
  Landscaping: 'landscaping', Painting: 'painting', 'Heat Pumps': 'hvac',
};

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const jobType = sanitizeJobType(body?.jobType);
    const urgency = sanitizeUrgency(body?.urgency);
    const details = sanitizeText(body?.details);
    const postcode = sanitizeText(body?.postcode).toUpperCase();
    const phone = sanitizeText(body?.phone);
    const hasPhotos = Boolean(body?.hasPhotos);
    const budget = sanitizeText(body?.budget);
    const username = sanitizeText(body?.username);
    const area = outwardFromPostcode(postcode) || postcode || 'Area unknown';
    const { score, flags, tier } = scoreIntake({ jobType, urgency, details, postcode, hasPhotos, budget });

    const qualityLabel = tier === 'GOLD' ? 'GOLD' : tier === 'SILVER' ? 'SILVER' : 'BRONZE';
    const leadUrgency = urgency === 'Emergency' ? 'high' : urgency === 'This week' ? 'medium' : 'low';

    const lead: Lead = {
      id: `intake-${Date.now()}`,
      title: `${jobType} job`,
      trade: TRADE_MAP[jobType] ?? 'building',
      location: area,
      postcodeOutward: area,
      estimatedValue: budget || 'POA',
      urgency: leadUrgency,
      source: 'Intake',
      sourceConfidence: hasPhotos ? 85 : 70,
      contactSignal: phone ? 'strong' : 'weak',
      status: 'new',
      description: details,
      score,
      scoreReasons: flags,
      qualityLabel,
      recommendedAction: phone ? 'Call or WhatsApp the buyer today' : 'Request phone number before quoting',
      evidenceBadges: hasPhotos ? ['Customer photos'] : ['Customer request'],
      signalStack: username ? [`intake:${username}`] : ['customer_intake'],
    };

    const persistence = await persistLeads([lead]).catch(() => ({ stored: false, count: 0, provider: 'supabase' }));

    let whatsapp: { triggered: boolean; provider: string; reason?: string } = { triggered: false, provider: 'none' };
    if (tier === 'GOLD') {
      whatsapp = await triggerGoldLeadWhatsApp({
        score,
        jobType,
        area,
        budget,
        phone,
        postcode,
        leadId: lead.id,
        sourceSystem: 'Intake',
        scoreReasons: flags,
        recommendedAction: lead.recommendedAction,
      }).catch((err: Error) => ({ triggered: false, provider: 'meta-whatsapp', reason: err.message }));
    }

    return Response.json({
      ok: true,
      whatsapp,
      persistence,
      lead: {
        id: lead.id,
        title: lead.title,
        score,
        jobType,
        urgency,
        postcode,
        phone,
        area,
        flags,
        details,
        budget,
        tier: qualityLabel,
        qualityLabel,
        status: 'new',
        createdAt: new Date().toISOString(),
        recommendedAction: lead.recommendedAction,
        evidenceBadges: lead.evidenceBadges,
        signalStack: lead.signalStack,
      },
    });
  } catch (error: any) {
    return Response.json({
      ok: false,
      errors: [String(error?.message ?? error)],
    }, { status: 422 });
  }
}

function sanitizeJobType(input: unknown) {
  const value = String(input ?? '').trim();
  if (!JOB_TYPES.has(value)) throw new Error('pick a job type');
  return value;
}

function sanitizeUrgency(input: unknown) {
  const value = String(input ?? '').trim();
  if (!URGENCY_TYPES.has(value)) throw new Error('pick urgency');
  return value as 'Emergency' | 'This week' | 'Later';
}

function sanitizeText(input: unknown) {
  return String(input ?? '').replace(/[<>]/g, '').trim().slice(0, 500);
}
