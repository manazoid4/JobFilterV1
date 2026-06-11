import { scoreIntake } from '../../../../server/services/decisionScoring';
import { outwardFromPostcode } from '../../../../server/utils/postcode';
import { triggerGoldLeadWhatsApp } from '../../../../server/services/sms';
import { supabase } from '../../../../server/lib/supabase';

const JOB_TYPES = new Set([
  'Electrical', 'Plumbing', 'Roofing', 'Building',
  'HVAC', 'Carpentry', 'Landscaping', 'Painting', 'Heat Pumps',
]);
const URGENCY_TYPES = new Set(['Emergency', 'This week', 'Later']);
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

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
    const username = sanitizeText(body?.username) || 'tradesman';
    const area = outwardFromPostcode(postcode) || postcode || 'Area unknown';
    const { score, flags, tier } = scoreIntake({ jobType, urgency, details, postcode, hasPhotos, budget });

    const leadId = `intake-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    // Persist server-side so the tradesperson can see submissions from any device.
    // Graceful no-op if Supabase env vars or the intake_submissions table are absent.
    let stored = false;
    if (supabase) {
      const { error } = await supabase.from('intake_submissions').insert({
        id: leadId,
        username,
        job_type: jobType,
        urgency,
        details,
        postcode,
        phone,
        has_photos: hasPhotos,
        budget,
        score,
        tier,
        area,
        flags,
      });
      if (error) {
        console.warn('[intake/score] persist failed:', error.message);
      } else {
        stored = true;
      }
    }

    // GOLD leads alert the tradesperson on WhatsApp. Recipient resolution:
    // profile whatsapp_number (when username is an account id) → WHATSAPP_TO env fallback.
    let whatsapp: { triggered: boolean; provider: string; reason?: string } = { triggered: false, provider: 'none' };
    if (tier === 'GOLD') {
      let recipient: string | undefined;
      if (supabase && UUID_RE.test(username)) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('whatsapp_number')
          .eq('id', username)
          .maybeSingle();
        recipient = profile?.whatsapp_number ?? undefined;
      }
      try {
        whatsapp = await triggerGoldLeadWhatsApp({
          score,
          jobType,
          area,
          budget,
          phone: recipient,
          postcode,
          leadId,
          sourceSystem: 'intake',
        });
      } catch (err: any) {
        whatsapp = { triggered: false, provider: 'none', reason: String(err?.message ?? err) };
      }
    }

    return Response.json({
      ok: true,
      stored,
      whatsapp,
      lead: {
        id: leadId,
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
        username,
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
