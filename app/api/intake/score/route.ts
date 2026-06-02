import { scoreIntake } from '../../../../server/services/decisionScoring';
import { outwardFromPostcode } from '../../../../server/utils/postcode';

const JOB_TYPES = new Set([
  'Electrical', 'Plumbing', 'Roofing', 'Building',
  'HVAC', 'Carpentry', 'Landscaping', 'Painting', 'Heat Pumps',
]);
const URGENCY_TYPES = new Set(['Emergency', 'This week', 'Later']);

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
    const area = outwardFromPostcode(postcode) || postcode || 'Area unknown';
    const { score, flags, tier } = scoreIntake({ jobType, urgency, details, postcode, hasPhotos, budget });

    return Response.json({
      ok: true,
      whatsapp: { triggered: false, provider: 'none' },
      lead: {
        id: `lead-${Date.now()}`,
        title: `${jobType} job`,
        score,
        jobType,
        urgency,
        postcode,
        phone,
        area,
        flags,
        details,
        budget,
        tier,
        status: 'new',
        createdAt: new Date().toISOString(),
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
