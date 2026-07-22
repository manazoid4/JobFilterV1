import { getSupabaseServiceClient } from '../../../../src/lib/supabase/server';
import { requireN8nIngressSignature } from '../auth';

export async function POST(request: Request) {
  const rawBody = await request.text();
  const authFailure = requireN8nIngressSignature(request, rawBody);
  if (authFailure) return authFailure;

  let payload: unknown;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return Response.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }
  const supabase = getSupabaseServiceClient();

  if (supabase) {
    await supabase.from('n8n_events').insert({
      event_type: 'lead.created',
      payload,
      status: 'queued',
    });
  }

  if (process.env.N8N_WEBHOOK_URL) {
    await fetch(process.env.N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.N8N_API_KEY ? { Authorization: `Bearer ${process.env.N8N_API_KEY}` } : {}),
      },
      body: JSON.stringify({ event: 'lead.created', payload }),
    });
  }

  return Response.json({ ok: true });
}
