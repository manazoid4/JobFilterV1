import { scoreIntake } from '../../../../server/services/decisionScoring';
import { outwardFromPostcode } from '../../../../server/utils/postcode';
import { supabase } from '../../../../server/lib/supabase';
import { triggerGoldLeadWhatsApp } from '../../../../server/services/sms';

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
    const username = sanitizeText(body?.username) || 'unknown';
    const area = outwardFromPostcode(postcode) || postcode || 'Area unknown';
    const { score, flags, tier } = scoreIntake({ jobType, urgency, details, postcode, hasPhotos, budget });
    const qualityLabel = tier === 'GOLD' ? 'GOLD' : tier === 'SILVER' ? 'SILVER' : 'BRONZE';
    const recommendedAction = phone
      ? 'Call or WhatsApp the buyer today'
      : 'Request phone number before quoting';

    const leadId = `intake-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const lead = {
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
      qualityLabel,
      recommendedAction,
      evidenceBadges: hasPhotos ? ['Customer photos'] : ['Customer request'],
      signalStack: ['customer_intake'],
      status: 'new' as const,
      createdAt: new Date().toISOString(),
    };

    // Persist intake submission to Supabase so the tradesperson can see it
    if (supabase) {
      await supabase.from('intake_submissions').insert({
        id: leadId,
        username,
        job_type: jobType,
        urgency,
        details: details || null,
        postcode: postcode || null,
        phone: phone || null,
        has_photos: hasPhotos,
        budget: budget || null,
        score,
        tier,
        area,
        flags,
        created_at: lead.createdAt,
      }).then(({ error }) => {
        if (error && error.code !== '42P01') {
          // 42P01 = table doesn't exist yet — silently skip until founder creates it
          console.warn('[intake] Supabase insert failed:', error.message);
        }
      });
    }

    // Trigger WhatsApp notification for GOLD leads
    let whatsapp: { triggered: boolean; provider: string; reason?: string } = {
      triggered: false,
      provider: 'none',
    };
    if (tier === 'GOLD') {
      try {
        whatsapp = await triggerGoldLeadWhatsApp({
          score,
          jobType,
          area,
          budget,
          phone,
          postcode,
          leadId,
          sourceSystem: `Intake:${username}`,
          scoreReasons: flags,
          recommendedAction,
        });
      } catch (err: any) {
        whatsapp = {
          triggered: false,
          provider: 'meta-whatsapp',
          reason: String(err?.message ?? err),
        };
      }
    }

    return Response.json({ ok: true, whatsapp, lead });
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
