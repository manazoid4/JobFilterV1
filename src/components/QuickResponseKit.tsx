import { useState } from 'react';
import { Copy, CheckCheck, ChevronDown, ChevronUp, MessageSquare, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fillTemplate, MESSAGE_TEMPLATES } from '../lib/chaseTemplates';
import { importLeadToChase, isLeadTracked, updateChaseStage } from '../lib/chaseStore';

type Props = {
  leadId: string;
  trade: string;
  area: string;
  score: number;
  publishedAt?: string;
  unlocked: boolean;
  title: string;
  estimatedValue: string;
};

const TABS = [
  { key: 'first_touch_2h', label: 'First Touch' },
  { key: 'follow_up_24h', label: '24h Follow-up' },
  { key: 'final_nudge_48h', label: 'Final Nudge' },
] as const;

function getAutoTab(publishedAt?: string): typeof TABS[number]['key'] {
  if (!publishedAt) return 'first_touch_2h';
  const hrs = (Date.now() - new Date(publishedAt).getTime()) / 3600000;
  if (hrs > 48) return 'final_nudge_48h';
  if (hrs > 20) return 'follow_up_24h';
  return 'first_touch_2h';
}

export function QuickResponseKit({ leadId, trade, area, score, publishedAt, unlocked, title, estimatedValue }: Props) {
  const [open, setOpen] = useState(false);
  const [activeKey, setActiveKey] = useState<typeof TABS[number]['key']>(getAutoTab(publishedAt));
  const [copied, setCopied] = useState(false);
  const [tracked, setTracked] = useState(isLeadTracked(leadId));

  const isGold = score >= 80;
  const isSilver = score >= 50 && score < 80;
  if (!isGold && !isSilver) return null;

  const template = MESSAGE_TEMPLATES.find((t) => t.key === activeKey);
  const filledMsg = template ? fillTemplate(template, { job_type: trade, area }) : '';

  function handleCopy() {
    navigator.clipboard.writeText(filledMsg).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);

      // Auto-track on first copy if not already tracked
      if (!tracked) {
        importLeadToChase({ id: leadId, title, trade, location: area, estimatedValue, score });
        setTracked(true);
      }
      if (activeKey !== 'first_touch_2h') {
        updateChaseStage(leadId, 'following_up');
      }
    });
  }

  if (!unlocked) {
    return (
      <div className="mt-3 border-2 border-[var(--line)] bg-[var(--offwhite)] p-4">
        <div className="flex items-center gap-2 mb-2">
          <Lock className="w-3.5 h-3.5 text-[var(--muted)]" />
          <p className="text-xs font-black uppercase tracking-wider text-[var(--muted)]">Response Kit</p>
          <span className="ml-auto text-[10px] font-black uppercase bg-[var(--ink)] text-[var(--yellow)] px-2 py-0.5">PATCH PLAN</span>
        </div>
        <p className="text-xs font-bold text-[var(--muted)] mb-3">Pre-written message templates that auto-fill with trade and postcode. Copy and send in one tap.</p>
        <div className="select-none blur-[3px] pointer-events-none text-xs font-bold text-[var(--ink)] mb-3 border border-[var(--line)] p-3 bg-white">
          Hi, I saw your builder job in SW12 come up. I'm local and available this week...
        </div>
        <Link to="/pricing" className="jf-button w-full bg-[var(--yellow)] text-[var(--ink)] text-xs text-center block">
          UNLOCK RESPONSE KIT →
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-3 border-2 border-[var(--ink)]">
      <button
        className="flex w-full items-center justify-between bg-[var(--ink)] px-4 py-2.5 text-left"
        onClick={() => setOpen((o) => !o)}
      >
        <div className="flex items-center gap-2">
          <MessageSquare className="w-3.5 h-3.5 text-[var(--yellow)]" />
          <span className="text-xs font-black uppercase tracking-wider text-white">Response Kit</span>
          {tracked && (
            <span className="text-[10px] font-black uppercase bg-[var(--green)] text-white px-1.5 py-0.5">TRACKING</span>
          )}
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-white/60" /> : <ChevronDown className="w-4 h-4 text-white/60" />}
      </button>

      {open && (
        <div className="bg-white p-4">
          {/* Template tabs */}
          <div className="flex gap-0 border-2 border-[var(--line)] mb-4">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveKey(tab.key)}
                className={`flex-1 px-3 py-2 text-[10px] font-black uppercase tracking-wider transition-colors ${
                  activeKey === tab.key
                    ? 'bg-[var(--ink)] text-[var(--yellow)]'
                    : 'bg-white text-[var(--muted)] hover:bg-[var(--offwhite)]'
                }`}
              >
                {tab.label}
                {tab.key === getAutoTab(publishedAt) && activeKey !== tab.key && (
                  <span className="ml-1 text-[var(--orange)]">★</span>
                )}
              </button>
            ))}
          </div>

          {/* Template purpose hint */}
          {template && (
            <p className="text-[10px] font-black uppercase tracking-wider text-[var(--muted)] mb-2">{template.purpose}</p>
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
              {copied ? 'COPIED — PASTE & SEND' : 'COPY MESSAGE'}
            </button>
          </div>

          {copied && !tracked && (
            <p className="mt-2 text-[10px] font-black text-[var(--green)] uppercase tracking-wider">
              ✓ Added to chase tracker automatically
            </p>
          )}
          {copied && tracked && (
            <p className="mt-2 text-[10px] font-black text-[var(--green)] uppercase tracking-wider">
              ✓ Chase stage updated
            </p>
          )}

          <p className="mt-3 text-[10px] text-[var(--muted)] font-bold">
            ★ = recommended for this lead's age · copying auto-tracks the lead
          </p>
        </div>
      )}
    </div>
  );
}
