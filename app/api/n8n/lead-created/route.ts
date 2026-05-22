import { getSupabaseServiceClient } from '../../../../src/lib/supabase/server';

export async function POST(request: Request) {
  const payload = await request.json().catch(() => ({}));
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
