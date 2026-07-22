/**
 * Legacy Express-side WhatsApp delivery is deliberately disabled.
 *
 * It previously accepted free-form content and caller-selected recipients,
 * which cannot prove per-user consent or Meta template approval. Proactive
 * delivery now goes through the authenticated `/api/leads/whatsapp` App route,
 * which binds the recipient to the signed-in profile, verifies opt-in/opt-out,
 * and sends only an approved template.
 */

type WhatsAppPayload = {
  score: number;
  jobType: string;
  area: string;
  leadId?: string;
  [key: string]: unknown;
};

export async function triggerGoldLeadWhatsApp(_payload: WhatsAppPayload) {
  return {
    triggered: false,
    provider: 'disabled',
    reason: 'Legacy WhatsApp delivery is disabled; use the authenticated consent-and-template route.',
  };
}
