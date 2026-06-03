import { scoreIntake } from '../../../../server/services/decisionScoring';
import { outwardFromPostcode } from '../../../../server/utils/postcode';
import { supabase } from '../../../../server/lib/supabase';
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

// 10 submissions per IP per minute — prevents table flooding and WhatsApp spam
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 10;

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    ?? request.headers.get('x-real-ip')
    ?? 'unknown';

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
    const leadUrgency = urgency === 'Emergency' ? 'high' : urgency === 'This week' ? 'medium' : 'low';

    // profiles.whatsapp_number and profiles.username columns don't exist yet in the schema;
    // owner routing is handled via the WHATSAPP_TO env var until those columns are added.
    const leadId = `intake-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

    // Insert to intake_submissions first so the row anchors this request before we count.
    // This makes the rate limit check atomic: count includes our row, so parallel requests
    // all see each other's inserts and the check is meaningful.
    if (supabase) {
      const { error: intakeErr } = await supabase.from('intake_submissions').insert({
        id: leadId,
        username,
        ip,
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
        created_at: new Date().toISOString(),
      });

      if (intakeErr && intakeErr.code !== '42P01') {
        console.warn('[intake] intake_submissions insert failed:', intakeErr.message);
      }

      // Count after insert (our row is now included). If over limit, delete and reject.
      if (!intakeErr && ip !== 'unknown') {
        const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();
        let submissionCount = 0;
        try {
          const result = await supabase
            .from('intake_submissions')
            .select('id', { count: 'exact', head: true })
            .eq('ip', ip)
            .gte('created_at', windowStart);
          submissionCount = result.count ?? 0;
        } catch {
          submissionCount = 0;
        }
        if (submissionCount > RATE_LIMIT_MAX) {
          try { await supabase.from('intake_submissions').delete().eq('id', leadId); } catch { /* best-effort */ }
          return Response.json(
            { ok: false, errors: ['Too many requests — please wait a moment before trying again.'] },
            { status: 429 },
          );
        }
      }
    }

    const lead: Lead = {
      id: leadId,
      title: `${jobType} job`,
      trade: TRADE_MAP[jobType] ?? 'building',
      location: area,
      postcodeOutward: area,
      estimatedValue: budget || 'POA',
      urgency: leadUrgency,
      source: 'Intake',
      sourceConfidence: hasPhotos ? 85 : 70,
      contactSignal: phone ? 'strong' : 'weak',
      buyerPhone: phone || undefined,
      status: 'new',
      description: details,
      score,
      scoreReasons: flags,
      qualityLabel,
      recommendedAction,
      evidenceBadges: hasPhotos ? ['Customer photos'] : ['Customer request'],
      signalStack: [`intake:${username}`],
    };

    let persistence: { stored: boolean; count: number; provider: string; error?: string };
    try {
      persistence = await persistLeads([lead]);
    } catch {
      persistence = { stored: false, count: 0, provider: 'supabase' };
    }

    // Trigger WhatsApp notification for GOLD leads. Routes to WHATSAPP_TO env var
    // until profiles.whatsapp_number column exists for per-owner routing.
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
          postcode,
          leadId,
          // Include leadId in sourceSystem so each intake submission gets a unique
          // delivery_lock_key — prevents the second GOLD lead in the same patch/trade
          // from being suppressed by the patch-level lock.
          sourceSystem: `Intake:${username}:${leadId}`,
          scoreReasons: flags,
          recommendedAction,
        });
      } catch (err: any) {
        whatsapp = { triggered: false, provider: 'meta-whatsapp', reason: String(err?.message ?? err) };
      }
    }

    return Response.json({
      ok: true,
      whatsapp,
      persistence,
      lead: {
        id: leadId,
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
        tier,
        qualityLabel,
        recommendedAction,
        evidenceBadges: lead.evidenceBadges,
        signalStack: lead.signalStack,
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
