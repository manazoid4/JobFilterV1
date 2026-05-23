import Link from 'next/link';
import { useState } from 'react';
import { Copy, CheckCheck, ChevronDown, ChevronUp, MessageSquare, Lock, ExternalLink, MapPin, Mail } from 'lucide-react';

import { fillTemplate, MESSAGE_TEMPLATES, type TemplateChannel } from '../lib/chaseTemplates';
import { importLeadToChase, isLeadTracked, updateChaseStage } from '../lib/chaseStore';
import type { ContactSignal } from '../lib/types';

type Props = {
  leadId: string;
  trade: string;
  area: string;
  score: number;
  publishedAt?: string;
  unlocked: boolean;
  title: string;
  estimatedValue: string;
  contactSignal?: ContactSignal;
  url?: string;
};

function getChannels(contactSignal?: ContactSignal): TemplateChannel[] {
  if (contactSignal === 'strong') return ['whatsapp'];
  if (contactSignal === 'weak') return ['whatsapp', 'portal'];
  return ['portal', 'canvass', 'letter'];
}

const CHANNEL_META: Record<TemplateChannel, { label: string; icon: React.ElementType; copyLabel: string; copiedLabel: string }> = {
  whatsapp: { label: 'WhatsApp', icon: MessageSquare, copyLabel: 'COPY MESSAGE', copiedLabel: 'COPIED — PASTE & SEND' },
  portal: { label: 'Portal Pitch', icon: Mail, copyLabel: 'COPY FOR PORTAL', copiedLabel: 'COPIED — PASTE INTO PORTAL' },
  canvass: { label: 'Site Canvass', icon: MapPin, copyLabel: 'COPY SCRIPT', copiedLabel: 'COPIED — USE ON SITE' },
  letter: { label: 'Letter Drop', icon: Mail, copyLabel: 'COPY LETTER', copiedLabel: 'COPIED — PRINT & POST' },
};

const WA_TIMING_KEYS = ['first_touch_2h', 'follow_up_24h', 'final_nudge_48h'];

function getDefaultKey(channels: TemplateChannel[], publishedAt?: string): string {
  if (channels.includes('whatsapp')) {
    const hrs = publishedAt ? (Date.now() - new Date(publishedAt).getTime()) / 3600000 : 0;
    if (hrs > 48) return 'final_nudge_48h';
    if (hrs > 20) return 'follow_up_24h';
    return 'first_touch_2h';
  }
  if (channels.includes('portal')) return 'portal_pitch';
  if (channels.includes('canvass')) return 'canvass_script';
  return 'letter_drop';
}

export function QuickResponseKit({ leadId, trade, area, score, publishedAt, unlocked, title, estimatedValue, contactSignal, url }: Props) {
  const channels = getChannels(contactSignal);
  const defaultKey = getDefaultKey(channels, publishedAt);

  const [open, setOpen] = useState(false);
  const [activeKey, setActiveKey] = useState(defaultKey);
  const [copied, setCopied] = useState(false);
  const [tracked, setTracked] = useState(isLeadTracked(leadId));

  const isGold = score >= 80;
  const isSilver = score >= 50 && score < 80;
  if (!isGold && !isSilver) return null;

  const template = MESSAGE_TEMPLATES.find((t) => t.key === activeKey);
  const activeChannel: TemplateChannel = (template?.channel as TemplateChannel) ?? channels[0];
  const channelMeta = CHANNEL_META[activeChannel];
  const filledMsg = template ? fillTemplate(template, { job_type: trade, area }) : '';

  const channelTabs = channels.map((ch) => {
    const primary = MESSAGE_TEMPLATES.find((t) => t.channel === ch);
    return primary ? { key: primary.key, channel: ch } : null;
  }).filter(Boolean) as { key: string; channel: TemplateChannel }[];

  function handleCopy() {
    navigator.clipboard.writeText(filledMsg).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      if (!isLeadTracked(leadId)) {
        importLeadToChase({ id: leadId, title, trade, location: area, estimatedValue, score });
        setTracked(true);
      } else {
        setTracked(true);
      }
      if (!['first_touch_2h', 'portal_pitch', 'canvass_script', 'letter_drop'].includes(activeKey)) {
        updateChaseStage(leadId, 'following_up');
      }
    });
  }

  if (!unlocked) {
    return (
      <div className="mt-3 border-2 border-[var(--line)] bg-[var(--offwhite)] p-4">
        <div className="flex items-center gap-2 mb-2">
          <Lock className="w-3.5 h-3.5 text-[var(--muted)]" />
          <p className="text-xs font-black uppercase tracking-wider text-[var(--muted)]">First Strike</p>
          <span className="ml-auto text-[10px] font-black uppercase bg-[var(--ink)] text-[var(--yellow)] px-2 py-0.5">PATCH PLAN</span>
        </div>
        <p className="text-xs font-bold text-[var(--muted)] mb-3">
          {contactSignal === 'none'
            ? 'No direct contact on this signal — get portal pitch, site canvass script, and letter template.'
            : 'Pre-written message templates that auto-fill with trade and postcode. Copy and send in one tap.'}
        </p>
        <div className="select-none blur-[3px] pointer-events-none text-xs font-bold text-[var(--ink)] mb-3 border border-[var(--line)] p-3 bg-white">
          {contactSignal === 'none'
            ? "I'm a {job_type} contractor in {area} and I'd like to express interest..."
            : "Hi, I saw your builder job in SW12 come up. I'm local and available this week..."}
        </div>
        <Link href="/pricing" className="jf-button w-full bg-[var(--yellow)] text-[var(--ink)] text-xs text-center block">
          UNLOCK FIRST STRIKE →
        </Link>
      </div>
    );
  }

  const ActiveIcon = channelMeta.icon;

  return (
    <div className="mt-3 border-2 border-[var(--ink)]">
      <button
        className="flex w-full items-center justify-between bg-[var(--ink)] px-4 py-2.5 text-left"
        onClick={() => setOpen((o) => !o)}
      >
        <div className="flex items-center gap-2">
          <MessageSquare className="w-3.5 h-3.5 text-[var(--yellow)]" />
          <span className="text-xs font-black uppercase tracking-wider text-white">First Strike</span>
          {tracked && (
            <span className="text-[10px] font-black uppercase bg-[var(--green)] text-white px-1.5 py-0.5">TRACKING</span>
          )}
          {contactSignal === 'none' && (
            <span className="text-[10px] font-black uppercase bg-[var(--orange)] text-white px-1.5 py-0.5">NO DIRECT CONTACT</span>
          )}
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-white/60" /> : <ChevronDown className="w-4 h-4 text-white/60" />}
      </button>

      {open && (
        <div className="bg-white p-4">
          {/* Channel tabs — only when multiple channels available */}
          {channelTabs.length > 1 && (
            <div className="flex gap-0 border-2 border-[var(--line)] mb-3">
              {channelTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveKey(tab.key)}
                  className={`flex-1 px-3 py-2 text-[10px] font-black uppercase tracking-wider transition-colors ${
                    tab.channel === activeChannel
                      ? 'bg-[var(--ink)] text-[var(--yellow)]'
                      : 'bg-white text-[var(--muted)] hover:bg-[var(--offwhite)]'
                  }`}
                >
                  {CHANNEL_META[tab.channel].label}
                </button>
              ))}
            </div>
          )}

          {/* WhatsApp timing sub-tabs */}
          {activeChannel === 'whatsapp' && (
            <div className="flex gap-0 border border-[var(--line)] mb-4">
              {MESSAGE_TEMPLATES.filter((t) => WA_TIMING_KEYS.includes(t.key)).map((t) => (
                <button
                  key={t.key}
                  onClick={() => setActiveKey(t.key)}
                  className={`flex-1 px-2 py-1.5 text-[9px] font-black uppercase tracking-wider transition-colors ${
                    activeKey === t.key
                      ? 'bg-[var(--ink)] text-[var(--yellow)]'
                      : 'bg-white text-[var(--muted)] hover:bg-[var(--offwhite)]'
                  }`}
                >
                  {t.label}
                  {t.key === defaultKey && activeKey !== t.key && (
                    <span className="ml-1 text-[var(--orange)]">★</span>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Purpose hint */}
          <div className="flex items-center gap-1.5 mb-2">
            <ActiveIcon className="w-3 h-3 text-[var(--muted)]" />
            <p className="text-[10px] font-black uppercase tracking-wider text-[var(--muted)]">
              {template?.purpose}
            </p>
          </div>

          {/* View listing link when no direct contact */}
          {url && activeChannel === 'portal' && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 mb-3 text-[10px] font-black uppercase tracking-wider text-[var(--orange)] underline"
            >
              <ExternalLink className="w-3 h-3" />
              VIEW SOURCE LISTING — contact details usually here
            </a>
          )}

          {/* Message preview */}
          <div className="border border-[var(--line)] bg-[var(--offwhite)] p-3 mb-3">
            <p className="text-sm font-bold text-[var(--ink)] leading-relaxed whitespace-pre-wrap">{filledMsg}</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="jf-button flex flex-1 items-center justify-center gap-2 bg-[var(--ink)] text-white text-xs"
            >
              {copied ? <CheckCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? channelMeta.copiedLabel : channelMeta.copyLabel}
            </button>
            {url && contactSignal !== 'strong' && (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="jf-button flex items-center gap-1 bg-[var(--offwhite)] border-2 border-[var(--ink)] text-[var(--ink)] text-xs"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                LISTING
              </a>
            )}
          </div>

          {copied && (
            <p className="mt-2 text-[10px] font-black text-[var(--green)] uppercase tracking-wider">
              {tracked ? '✓ Chase stage updated' : '✓ Added to chase tracker automatically'}
            </p>
          )}

          <p className="mt-3 text-[10px] text-[var(--muted)] font-bold">
            {activeChannel === 'whatsapp'
              ? "★ = recommended for this lead's age · copying auto-tracks the lead"
              : 'Copying auto-tracks this signal · open listing to find contact details'}
          </p>
        </div>
      )}
    </div>
  );
}
