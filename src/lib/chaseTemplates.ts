import type { MessageTemplate } from '../lib/types';

export type TemplateChannel = 'whatsapp' | 'portal' | 'canvass' | 'letter' | 'email';

export const MESSAGE_TEMPLATES: (MessageTemplate & { channel?: TemplateChannel })[] = [
  {
    key: 'first_touch_2h',
    label: 'First Touch',
    stage: 'not_contacted',
    timing: '2 hours after lead detected',
    purpose: 'Quick intro — let them know you saw the job and you are local',
    channel: 'whatsapp',
    body: `Hi, I saw your {job_type} job in {area} come up. I'm local and available this week. Happy to pop round and give you a proper quote — no obligation. Give me a shout if you want to arrange a time.`,
  },
  {
    key: 'quick_quote_offer',
    label: 'Quick Quote',
    stage: 'not_contacted',
    timing: 'Any time — alternative to first touch',
    purpose: 'Lead with speed — offer a same-day quote to stand out',
    channel: 'whatsapp',
    body: `Saw your {job_type} job in {area}. I can be round today or tomorrow to give you a quote. No faff, no pressure — just a straight price. Let me know what works.`,
  },
  {
    key: 'follow_up_24h',
    label: '24h Follow-up',
    stage: 'following_up',
    timing: '24 hours after first contact',
    purpose: 'Gentle reminder — you are still interested and available',
    channel: 'whatsapp',
    body: `Hi, just following up on the {job_type} in {area}. I've got space in my diary this week if you still need a quote. I've done similar jobs round your area so I know what's involved. Let me know if you want me to swing by.`,
  },
  {
    key: 'availability_check',
    label: 'Avail. Check',
    stage: 'following_up',
    timing: 'Alternative follow-up — focus on your schedule',
    purpose: 'Frame it around your diary, not their delay',
    channel: 'whatsapp',
    body: `Hi, just planning my week ahead. Still got the {job_type} in {area} on my radar if you need a quote. Let me know either way so I can plan accordingly. Cheers.`,
  },
  {
    key: 'final_nudge_48h',
    label: 'Final Nudge',
    stage: 'following_up',
    timing: '48 hours after first contact',
    purpose: 'Last attempt before marking as cold — create urgency without being pushy',
    channel: 'whatsapp',
    body: `Hi, last message from me about the {job_type} job. I'm booking up for next week so if you still need someone give me a call today and I'll fit you in. If not, no worries — all the best with the job.`,
  },
  {
    key: 'won_thanks',
    label: 'Won — thanks',
    stage: 'won',
    timing: 'After marking job as won',
    purpose: 'Professional thanks and set expectations for the work',
    channel: 'whatsapp',
    body: `Thanks for the job — appreciate it. I'll get started on {job_type} as discussed. I'll keep you updated as we go. If anything changes just message me.`,
  },
  {
    key: 'portal_pitch',
    label: 'Portal Pitch',
    stage: 'not_contacted',
    timing: 'When contact is via a procurement or planning portal',
    purpose: 'Professional intro for portal-based response — structured, no fluff',
    channel: 'portal',
    body: `I'm a {job_type} contractor based in {area} and I'd like to express interest in this project. I have local experience with similar jobs and can mobilise quickly. I'm happy to provide a full quote, references, and any certificates required. Please get in touch and I'll send everything across.`,
  },
  {
    key: 'canvass_script',
    label: 'Site Canvass',
    stage: 'not_contacted',
    timing: 'When planning work is nearby — visit the site or knock adjacent properties',
    purpose: 'Door-step script — introduce yourself before work starts, low pressure',
    channel: 'canvass',
    body: `Hi, I noticed planning work coming up on your road. I'm a local {job_type} — just wanted to introduce myself before work gets started in case you need anyone. I'm fully insured and I know the area well. Happy to leave my card — give me a ring if you want a chat.`,
  },
  {
    key: 'letter_drop',
    label: 'Letter Drop',
    stage: 'not_contacted',
    timing: 'Post through the door when you have the address',
    purpose: 'Physical letter — stands out, no spam filter, works for planning approvals',
    channel: 'letter',
    body: `Dear Homeowner,\n\nI noticed planning approval has come through for {job_type} work at your property. As a local contractor in {area} I'd love to give you a no-obligation quote before you appoint anyone.\n\nI'm fully insured, local, and available to start promptly.\n\nCall or text me on [YOUR NUMBER] — I'll get back to you the same day.\n\n[YOUR NAME]\n{job_type} | {area}`,
  },
  {
    key: 'email_first_touch',
    label: 'Email — First Touch',
    stage: 'not_contacted',
    timing: 'Within 2 hours of discovering the lead',
    purpose: 'Professional email intro for contract/planning leads — short, specific, no fluff',
    channel: 'email',
    body: `Subject: Re: {job_type} opportunity in {area}\n\nHi there,\n\nI came across your {job_type} project in {area} and wanted to introduce myself. I'm a local contractor with experience on similar jobs in the area.\n\nI'd be happy to provide a no-obligation quote and can typically mobilise within a few days.\n\nIf you're still looking for contractors, let me know and I'll send across my references and availability.\n\nBest,\n[YOUR NAME]\n[YOUR NUMBER]`,
  },
  {
    key: 'email_follow_up',
    label: 'Email — Follow Up',
    stage: 'following_up',
    timing: '48 hours after first email with no reply',
    purpose: 'Polite follow-up that adds value without being pushy',
    channel: 'email',
    body: `Subject: Quick follow-up — {job_type} in {area}\n\nHi again,\n\nJust circling back on the {job_type} work in {area}. I'm planning my schedule for the next fortnight and wanted to check if you still need a quote.\n\nI've completed several similar projects locally and can share references if helpful.\n\nNo pressure either way — just wanted to make sure you had my details.\n\nBest,\n[YOUR NAME]\n[YOUR NUMBER]`,
  },
  {
    key: 'email_tender_proposal',
    label: 'Email — Tender Proposal',
    stage: 'not_contacted',
    timing: 'For public contract or tender leads',
    purpose: 'Formal but concise tender expression of interest',
    channel: 'email',
    body: `Subject: Expression of interest — {job_type} ({area})\n\nTo whom it may concern,\n\nI am writing to express interest in the {job_type} contract advertised.\n\nI am a local contractor based in {area} with relevant experience and the capacity to deliver this work to specification and on schedule.\n\nI would welcome the opportunity to submit a formal quotation and can provide references, insurance details, and any required accreditations on request.\n\nPlease let me know the next steps or deadline for submissions.\n\nKind regards,\n[YOUR NAME]\n[YOUR COMPANY]\n[YOUR NUMBER]\n[YOUR EMAIL]`,
  },
  {
    key: 'email_value_add',
    label: 'Email — Value Add',
    stage: 'not_contacted',
    timing: 'Alternative first touch — lead with insight, not a sales pitch',
    purpose: 'Differentiate by offering useful information before asking for the job',
    channel: 'email',
    body: `Subject: A quick note on your {job_type} project in {area}\n\nHi,\n\nI spotted your {job_type} project in {area} and thought I'd share a quick observation: projects of this type often run smoother when [relevant tip, e.g., "the EPC is updated before work starts" / "planning conditions are discharged early"].\n\nI'm a local {job_type} contractor and have handled several similar jobs nearby. If you want a second opinion or a no-obligation quote, I'm happy to pop round.\n\nNo hard sell — just thought it might save you a headache.\n\n[YOUR NAME]\n[YOUR NUMBER]`,
  },
];

export function getTemplatesForStage(stage: string): MessageTemplate[] {
  return MESSAGE_TEMPLATES.filter((t) => t.stage === stage);
}

export function getTemplateByKey(key: string): MessageTemplate | undefined {
  return MESSAGE_TEMPLATES.find((t) => t.key === key);
}

export function fillTemplate(template: MessageTemplate, vars: { job_type: string; area: string }): string {
  return template.body.replace(/\{job_type\}/g, vars.job_type).replace(/\{area\}/g, vars.area);
}

export function toSmsHref(phone: string | undefined, body: string): string {
  const digits = (phone ?? '').replace(/\D/g, '');
  return `sms:${digits}?body=${encodeURIComponent(body)}`;
}

export function parseEmailSubject(body: string): { subject: string; body: string } {
  const match = body.match(/^Subject:\s*(.+?)(?:\r?\n){2,}/im);
  if (match) {
    const subject = match[1].trim();
    const bodyStart = body.indexOf(match[0]) + match[0].length;
    return { subject, body: body.slice(bodyStart).trim() };
  }
  return { subject: '', body };
}
