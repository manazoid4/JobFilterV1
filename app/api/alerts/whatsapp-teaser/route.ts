import { getSupabaseServiceClient } from '../../../../../src/lib/supabase/server';
import { scan } from '../../../../../leadEngine/scan';

export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret || request.headers.get('authorization') !== `Bearer ${cronSecret}`) {
    return Response.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }
  
  const admin = getSupabaseServiceClient();
  if (!admin) return Response.json({ ok: false, error: 'DB not configured' }, { status: 503 });

  // 1. Find users who opted in to WhatsApp but are FREE tier
  const { data: users } = await admin
    .from('profiles')
    .select('id, phone, whatsapp_opt_in_at, whatsapp_opt_out_at, subscriptions!left(status, active)')
    .not('phone', 'is', null)
    .not('whatsapp_opt_in_at', 'is', null);
    
  if (!users) return Response.json({ ok: true, sent: 0 });

  let sentCount = 0;
  for (const user of users) {
    const isFree = !user.subscriptions?.some((s: any) => s.active || s.status === 'active');
    if (!isFree) continue; // Only tease free users
    
    // Check if they have an alert
    const { data: alerts } = await admin.from('lead_alerts').select('*').eq('user_id', user.id).eq('active', true).limit(1);
    if (!alerts || alerts.length === 0) continue;
    const alert = alerts[0];
    
    // Run scan
    const result = await scan({
      postcode: alert.postcode_outward,
      trade: alert.trade,
      tier: 'free',
      radiusMiles: alert.radius_miles ?? 25
    });
    
    const awardLeads = result.leads.filter(l => l.decision === 'SUBCONTRACT' && l.source === 'FTS');
    if (awardLeads.length > 0) {
      const lead = awardLeads[0];
      const title = lead.title;
      const value = lead.estimatedValue !== 'Unlock exact value' ? lead.estimatedValue : 'High value';
      
      const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
      const token = process.env.WHATSAPP_ACCESS_TOKEN;
      const template = process.env.WHATSAPP_TEASER_TEMPLATE || 'teaser_template';
      
      if (phoneId && token) {
        // Stripe payment link for this user
        const stripeUrl = `https://jobfilter.uk/pricing?checkout=1&user=${user.id}`;
        
        await fetch(`https://graph.facebook.com/v21.0/${phoneId}/messages`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            messaging_product: 'whatsapp',
            to: user.phone,
            type: 'template',
            template: {
              name: template,
              language: { code: 'en_GB' },
              components: [{
                type: 'body',
                parameters: [
                  { type: 'text', text: value },
                  { type: 'text', text: lead.trade },
                  { type: 'text', text: lead.postcodeOutward },
                  { type: 'text', text: stripeUrl }
                ]
              }]
            }
          })
        });
        sentCount++;
      }
    }
  }
  
  return Response.json({ ok: true, sent: sentCount });
}
