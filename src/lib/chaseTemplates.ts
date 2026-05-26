import type { MessageTemplate } from '../lib/types';

export type TemplateChannel = 'whatsapp' | 'portal' | 'canvass' | 'letter';

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
    key: 'follow_up_24h',
    label: '24h Follow-up',
    stage: 'following_up',
    timing: '24 hours after first contact',
    purpose: 'Gentle reminder — you are still interested and available',
    channel: 'whatsapp',
    body: `Hi, just following up on the {job_type} in {area}. I've got space in my diary this week if you still need a quote. I've done similar jobs round your area so I know what's involved. Let me know if you want me to swing by.`,
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
    key: 'quick_quote_offer',
    label: 'Quick quote offer',
    stage: 'not_contacted',
    timing: 'Any time — alternative to first touch',
    purpose: 'Lead with speed — offer a same-day quote to stand out',
    channel: 'whatsapp',
    body: `Saw your {job_type} job in {area}. I can be round today or tomorrow to give you a quote. No faff, no pressure — just a straight price. Let me know what works.`,
  },
  {
    key: 'availability_check',
    label: 'Availability check',
    stage: 'following_up',
    timing: 'Alternative follow-up — focus on your schedule',
    purpose: 'Frame it around your diary, not their delay',
    channel: 'whatsapp',
    body: `Hi, just planning my week ahead. Still got the {job_type} in {area} on my radar if you need a quote. Let me know either way so I can plan accordingly. Cheers.`,
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
