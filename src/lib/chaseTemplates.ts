import type { MessageTemplate } from '../lib/types';

export const MESSAGE_TEMPLATES: MessageTemplate[] = [
  {
    key: 'first_touch_2h',
    label: 'First touch',
    stage: 'not_contacted',
    timing: '2 hours after lead detected',
    purpose: 'Quick intro — let them know you saw the job and you are local',
    body: `Hi, I saw your {job_type} job in {area} come up. I'm local and available this week. Happy to pop round and give you a proper quote — no obligation. Give me a shout if you want to arrange a time.`,
  },
  {
    key: 'follow_up_24h',
    label: '24h follow-up',
    stage: 'following_up',
    timing: '24 hours after first contact',
    purpose: 'Gentle reminder — you are still interested and available',
    body: `Hi, just following up on the {job_type} in {area}. I've got space in my diary this week if you still need a quote. I've done similar jobs round your area so I know what's involved. Let me know if you want me to swing by.`,
  },
  {
    key: 'final_nudge_48h',
    label: '48h final nudge',
    stage: 'following_up',
    timing: '48 hours after first contact',
    purpose: 'Last attempt before marking as cold — create urgency without being pushy',
    body: `Hi, last message from me about the {job_type} job. I'm booking up for next week so if you still need someone give me a call today and I'll fit you in. If not, no worries — all the best with the job.`,
  },
  {
    key: 'won_thanks',
    label: 'Won — thanks',
    stage: 'won',
    timing: 'After marking job as won',
    purpose: 'Professional thanks and set expectations for the work',
    body: `Thanks for the job — appreciate it. I'll get started on {job_type} as discussed. I'll keep you updated as we go. If anything changes just message me.`,
  },
  {
    key: 'quick_quote_offer',
    label: 'Quick quote offer',
    stage: 'not_contacted',
    timing: 'Any time — alternative to first touch',
    purpose: 'Lead with speed — offer a same-day quote to stand out',
    body: `Saw your {job_type} job in {area}. I can be round today or tomorrow to give you a quote. No faff, no pressure — just a straight price. Let me know what works.`,
  },
  {
    key: 'availability_check',
    label: 'Availability check',
    stage: 'following_up',
    timing: 'Alternative follow-up — focus on your schedule',
    purpose: 'Frame it around your diary, not their delay',
    body: `Hi, just planning my week ahead. Still got the {job_type} in {area} on my radar if you need a quote. Let me know either way so I can plan accordingly. Cheers.`,
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
