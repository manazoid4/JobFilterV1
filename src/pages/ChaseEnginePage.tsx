import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChaseStatus } from '../components/ChaseStatus';
import type { ChaseLead, ChaseStage, Lead, MessageTemplate, NudgeEvent } from '../lib/types';
import {
  addNudgeEvent,
  getChaseLeads,
  importLeadToChase,
  removeChaseLead,
  saveChaseLead,
} from '../lib/chaseStore';
import { fillTemplate, getTemplateByKey, getTemplatesForStage, MESSAGE_TEMPLATES } from '../lib/chaseTemplates';
import { getStoredLeads } from '../lib/leadStore';
import { getMonthlyStats, markWon as markWonInWin } from '../lib/winStore';

type ViewMode = 'board' | 'list';

export function ChaseEnginePage() {
  const [chaseLeads, setChaseLeads] = useState<ChaseLead[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('board');
  const [selectedLead, setSelectedLead] = useState<ChaseLead | null>(null);
  const [showTemplatePicker, setShowTemplatePicker] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [now, setNow] = useState(Date.now());
  const [filterStage, setFilterStage] = useState<ChaseStage | 'all'>('all');
  const [monthlyWinStats, setMonthlyWinStats] = useState({ count: 0, totalValue: 0 });

  useEffect(() => {
    setChaseLeads(getChaseLeads());
    setMonthlyWinStats(getMonthlyStats());
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (selectedLead) {
      const refreshed = getChaseLeads().find((l) => l.leadId === selectedLead.leadId);
      if (refreshed) setSelectedLead(refreshed);
    }
  }, [chaseLeads]);

  const importAvailableLeads = useCallback(() => {
    const stored = getStoredLeads();
    const existingIds = new Set(chaseLeads.map((l) => l.leadId));
    let imported = 0;
    stored.forEach((lead) => {
      if (!existingIds.has(lead.id)) {
        importLeadToChase({
          id: lead.id,
          title: lead.jobType,
          trade: lead.flags?.join(', ') || 'general',
          location: lead.area,
          estimatedValue: lead.budget || 'TBC',
          score: lead.score,
        });
        imported++;
      }
    });
    if (imported > 0) {
      setChaseLeads(getChaseLeads());
    }
  }, [chaseLeads]);

  const filteredLeads = filterStage === 'all'
    ? chaseLeads
    : chaseLeads.filter((l) => l.stage === filterStage);

  const activeCount = chaseLeads.filter((l) => l.stage !== 'won' && l.stage !== 'lost').length;
  const wonCount = chaseLeads.filter((l) => l.stage === 'won').length;
  const overdueCount = chaseLeads.filter((l) => l.nextNudgeAt && new Date(l.nextNudgeAt).getTime() < now && l.stage !== 'won' && l.stage !== 'lost').length;

  return (
    <main className="page-shell grid gap-6 py-8 pb-24">
      {/* Header */}
      <section className="jf-box bg-[var(--ink)] p-6 text-white">
        <p className="micro-label text-[var(--yellow)]">CHASE ENGINE</p>
        <h1 className="headline mt-2 text-3xl leading-none sm:text-5xl">YOUR WHATSAPP BODYGUARD</h1>
        <p className="mt-3 max-w-2xl font-black text-white/70">
          Leads go cold in 2 hours. Chase Engine nudges them so you do not have to. Three-touch follow-up: 2h, 24h, 48h. Pre-written messages in tradesman language. Copy, send, win.
        </p>
        {monthlyWinStats.count > 0 && (
          <div className="mt-4 border-2 border-[var(--yellow)] bg-[var(--yellow)]/10 px-4 py-3">
            <p className="text-sm font-black text-[var(--yellow)]">
              YOU'VE WON {monthlyWinStats.count} JOB{monthlyWinStats.count !== 1 ? 'S' : ''} WORTH £{monthlyWinStats.totalValue.toLocaleString()} THIS MONTH
            </p>
            <Link to="/win" className="text-xs font-black text-white underline underline-offset-2 mt-1 inline-block">
              VIEW IN WIN ENGINE →
            </Link>
          </div>
        )}
        <div className="mt-5 flex flex-wrap gap-3">
          <button
            onClick={importAvailableLeads}
            className="jf-button bg-[var(--yellow)] text-[var(--ink)]"
          >
            IMPORT LEADS FROM INTAKE
          </button>
          <button
            onClick={() => setViewMode(viewMode === 'board' ? 'list' : 'board')}
            className="jf-button bg-white text-[var(--ink)]"
          >
            {viewMode === 'board' ? 'LIST VIEW' : 'BOARD VIEW'}
          </button>
          <Link to="/win" className="jf-button bg-[var(--green)] text-white">
            GO TO WIN →
          </Link>
        </div>
      </section>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatBox label="In The Chase" value={String(activeCount)} sub="Active leads being followed up" />
        <StatBox label="Overdue Nudge" value={String(overdueCount)} sub="Needs attention now" color={overdueCount > 0 ? 'bg-[var(--orange)] text-white' : ''} />
        <StatBox label="Won" value={String(wonCount)} sub="Closed this month" />
        <StatBox label="Total Tracked" value={String(chaseLeads.length)} sub="All time" />
      </div>

      {/* Stage Filter */}
      <div className="flex flex-wrap gap-2">
        {(['all', 'not_contacted', 'contacted', 'following_up', 'won', 'lost'] as const).map((stage) => (
          <button
            key={stage}
            onClick={() => setFilterStage(stage)}
            className={`px-3 py-1.5 text-xs font-black uppercase tracking-wider border-2 border-[var(--ink)] ${
              filterStage === stage
                ? 'bg-[var(--yellow)] text-[var(--ink)]'
                : 'bg-white text-[var(--muted)]'
            }`}
          >
            {stage === 'all' ? 'ALL' : stage.replace(/_/g, ' ')}
            {stage !== 'all' && (
              <span className="ml-1.5">({chaseLeads.filter((l) => l.stage === stage).length})</span>
            )}
          </button>
        ))}
      </div>

      {/* Board or List */}
      {filteredLeads.length === 0 ? (
        <section className="jf-box bg-white p-10 text-center">
          <p className="micro-label text-[var(--muted)]">CHASE ENGINE</p>
          <h2 className="headline mt-3 text-2xl">NO LEADS IN THE CHASE YET</h2>
          <p className="mt-2 font-black text-[var(--muted)]">
            Import leads from the Intake Engine or add one manually to start chasing.
          </p>
          <div className="mt-5 flex justify-center gap-3">
            <button onClick={importAvailableLeads} className="jf-button bg-[var(--yellow)] text-[var(--ink)]">
              IMPORT FROM INTAKE
            </button>
            <Link to="/find-jobs" className="jf-button bg-[var(--ink)] text-white">
              FIND JOBS
            </Link>
          </div>
        </section>
      ) : viewMode === 'board' ? (
        <BoardView
          leads={filteredLeads}
          now={now}
          onSelect={setSelectedLead}
          onRemove={(id) => {
            removeChaseLead(id);
            setChaseLeads(getChaseLeads());
          }}
        />
      ) : (
        <ListView
          leads={filteredLeads}
          now={now}
          onSelect={setSelectedLead}
          onRemove={(id) => {
            removeChaseLead(id);
            setChaseLeads(getChaseLeads());
          }}
        />
      )}

      {/* Lead Detail Panel */}
      {selectedLead && (
        <LeadDetailPanel
          lead={selectedLead}
          now={now}
          onClose={() => setSelectedLead(null)}
          onCopyMessage={(templateKey) => {
            const template = getTemplateByKey(templateKey);
            if (!template) return;
            const filled = fillTemplate(template, {
              job_type: selectedLead.leadTitle,
              area: selectedLead.location,
            });
            navigator.clipboard.writeText(filled).then(() => {
              setCopiedId(templateKey);
              setTimeout(() => setCopiedId(null), 2000);
            });
          }}
          copiedId={copiedId}
          onSendNudge={(templateKey, message) => {
            const event: NudgeEvent = {
              id: `nudge-${Date.now()}`,
              stage: selectedLead.stage,
              templateKey,
              message,
              sentAt: new Date().toISOString(),
              channel: 'whatsapp',
            };
            addNudgeEvent(selectedLead.leadId, event);
            const updated = getChaseLeads().find((l) => l.leadId === selectedLead.leadId);
            if (updated) {
              setSelectedLead(updated);
              setChaseLeads(getChaseLeads());
            }
          }}
          onStageChange={(stage) => {
            if (stage === 'won') {
              const value = parseInt(selectedLead.estimatedValue.replace(/[^0-9]/g, ''), 10) || 0;
              if (value > 0) {
                markWonInWin({
                  leadId: selectedLead.leadId,
                  title: selectedLead.leadTitle,
                  trade: selectedLead.trade,
                  location: selectedLead.location,
                  value,
                  source: 'chase',
                });
              }
            }
            const updated = getChaseLeads().find((l) => l.leadId === selectedLead.leadId);
            if (updated) {
              setSelectedLead(updated);
              setChaseLeads(getChaseLeads());
              setMonthlyWinStats(getMonthlyStats());
            }
          }}
        />
      )}
    </main>
  );
}

function StatBox({ label, value, sub, color }: { label: string; value: string; sub: string; color?: string }) {
  return (
    <div className={`jf-box p-4 ${color || 'bg-white'}`}>
      <p className="micro-label text-[var(--muted)]">{label}</p>
      <p className="headline mt-1 text-3xl leading-none">{value}</p>
      <p className="mt-1 text-xs font-semibold text-[var(--muted)]">{sub}</p>
    </div>
  );
}

function BoardView({ leads, now, onSelect, onRemove }: { leads: ChaseLead[]; now: number; onSelect: (lead: ChaseLead) => void; onRemove: (id: string) => void }) {
  const stages: { key: ChaseStage; label: string; borderColor: string }[] = [
    { key: 'not_contacted', label: 'NOT CONTACTED', borderColor: 'border-[var(--orange)]' },
    { key: 'contacted', label: 'CONTACTED', borderColor: 'border-[var(--yellow)]' },
    { key: 'following_up', label: 'FOLLOWING UP', borderColor: 'border-[var(--ink)]' },
    { key: 'won', label: 'WON', borderColor: 'border-green-600' },
    { key: 'lost', label: 'LOST', borderColor: 'border-gray-400' },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
      {stages.map((stage) => {
        const stageLeads = leads.filter((l) => l.stage === stage.key);
        return (
          <div key={stage.key} className={`border-2 ${stage.borderColor} bg-white`}>
            <div className="border-b-2 border-[var(--ink)] bg-[var(--bg-main)] px-3 py-2">
              <p className="micro-label">{stage.label}</p>
              <p className="text-xs font-bold text-[var(--muted)]">{stageLeads.length} lead{stageLeads.length !== 1 ? 's' : ''}</p>
            </div>
            <div className="grid gap-3 p-3">
              {stageLeads.length === 0 && (
                <p className="text-center text-xs font-semibold text-[var(--muted)] py-4">No leads</p>
              )}
              {stageLeads.map((lead) => (
                <BoardCard key={lead.leadId} lead={lead} now={now} onSelect={onSelect} onRemove={onRemove} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function BoardCard({ lead, now, onSelect, onRemove }: { lead: ChaseLead; now: number; onSelect: (lead: ChaseLead) => void; onRemove: (id: string) => void }) {
  const timeSinceContact = lead.lastContactAt
    ? getTimeAgo(new Date(lead.lastContactAt).getTime(), now)
    : getTimeAgo(new Date(lead.firstSeenAt).getTime(), now);

  const isOverdue = lead.nextNudgeAt && new Date(lead.nextNudgeAt).getTime() < now && lead.stage !== 'won' && lead.stage !== 'lost';

  return (
    <div
      className={`border-2 border-[var(--ink)] p-3 cursor-pointer transition-shadow hover:shadow-[4px_4px_0_var(--yellow)] ${
        isOverdue ? 'bg-red-50' : 'bg-white'
      }`}
      onClick={() => onSelect(lead)}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-black leading-tight">{lead.leadTitle}</h3>
        <button
          onClick={(e) => { e.stopPropagation(); onRemove(lead.leadId); }}
          className="text-[var(--muted)] hover:text-[var(--orange)] text-xs font-black"
        >
          x
        </button>
      </div>
      <p className="mt-1 text-xs font-semibold text-[var(--muted)]">{lead.location} · {lead.estimatedValue}</p>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-[10px] font-black uppercase">
          {lead.lastContactAt ? `${timeSinceContact} since contact` : `${timeSinceContact} since detected`}
        </span>
        {isOverdue && (
          <span className="badge bg-[var(--orange)] text-white">OVERDUE</span>
        )}
      </div>
      {lead.nudges.length > 0 && (
        <p className="mt-1 text-[10px] font-bold text-[var(--muted)]">{lead.nudges.length} nudge{lead.nudges.length > 1 ? 's' : ''} sent</p>
      )}
      {lead.stage === 'won' && (
        <Link
          to="/win"
          onClick={(e) => e.stopPropagation()}
          className="mt-2 inline-block text-[10px] font-black text-green-700 underline underline-offset-2"
        >
          VIEW IN WIN ENGINE →
        </Link>
      )}
    </div>
  );
}

function ListView({ leads, now, onSelect, onRemove }: { leads: ChaseLead[]; now: number; onSelect: (lead: ChaseLead) => void; onRemove: (id: string) => void }) {
  return (
    <div className="jf-box bg-white overflow-hidden">
      <div className="grid grid-cols-12 gap-2 border-b-2 border-[var(--ink)] bg-[var(--bg-main)] px-4 py-2 text-[10px] font-black uppercase tracking-wider text-[var(--muted)]">
        <div className="col-span-4">Lead</div>
        <div className="col-span-2">Stage</div>
        <div className="col-span-2">Last Contact</div>
        <div className="col-span-2">Next Nudge</div>
        <div className="col-span-1">Nudges</div>
        <div className="col-span-1"></div>
      </div>
      {leads.map((lead) => {
        const isOverdue = lead.nextNudgeAt && new Date(lead.nextNudgeAt).getTime() < now && lead.stage !== 'won' && lead.stage !== 'lost';
        return (
          <div
            key={lead.leadId}
            className={`grid grid-cols-12 gap-2 border-b border-[var(--line)] px-4 py-3 cursor-pointer hover:bg-[var(--yellow)]/10 ${
              isOverdue ? 'bg-red-50/50' : ''
            }`}
            onClick={() => onSelect(lead)}
          >
            <div className="col-span-4">
              <p className="text-sm font-black">{lead.leadTitle}</p>
              <p className="text-xs text-[var(--muted)]">{lead.location} · {lead.estimatedValue}</p>
            </div>
            <div className="col-span-2 flex items-center">
              <StageBadge stage={lead.stage} />
            </div>
            <div className="col-span-2 flex items-center">
              <span className="text-xs font-semibold">
                {lead.lastContactAt ? getTimeAgo(new Date(lead.lastContactAt).getTime(), now) : 'Never'}
              </span>
            </div>
            <div className="col-span-2 flex items-center">
              <span className={`text-xs font-semibold ${isOverdue ? 'text-[var(--orange)] font-black' : 'text-[var(--muted)]'}`}>
                {lead.nextNudgeAt ? getTimeAgo(new Date(lead.nextNudgeAt).getTime(), now, true) : '—'}
                {isOverdue && ' OVERDUE'}
              </span>
            </div>
            <div className="col-span-1 flex items-center">
              <span className="text-xs font-black">{lead.nudges.length}</span>
            </div>
            <div className="col-span-1 flex items-center justify-end gap-1">
              {lead.stage === 'won' && (
                <Link
                  to="/win"
                  onClick={(e) => e.stopPropagation()}
                  className="text-[9px] font-black text-green-700 underline underline-offset-2"
                >
                  WIN →
                </Link>
              )}
              <button
                onClick={(e) => { e.stopPropagation(); onRemove(lead.leadId); }}
                className="text-[var(--muted)] hover:text-[var(--orange)] text-xs font-black"
              >
                x
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function StageBadge({ stage }: { stage: ChaseStage }) {
  const map: Record<ChaseStage, string> = {
    not_contacted: 'bg-[var(--orange)] text-white',
    contacted: 'bg-[var(--yellow)] text-[var(--ink)]',
    following_up: 'bg-[var(--ink)] text-white',
    won: 'bg-green-600 text-white',
    lost: 'bg-gray-400 text-[var(--ink)]',
  };
  return (
    <span className={`badge ${map[stage]} text-[10px]`}>
      {stage.replace(/_/g, ' ')}
    </span>
  );
}

function LeadDetailPanel({
  lead,
  now,
  onClose,
  onCopyMessage,
  copiedId,
  onSendNudge,
  onStageChange,
}: {
  lead: ChaseLead;
  now: number;
  onClose: () => void;
  onCopyMessage: (key: string) => void;
  copiedId: string | null;
  onSendNudge: (key: string, message: string) => void;
  onStageChange: (stage: ChaseStage) => void;
}) {
  const [expandedTemplate, setExpandedTemplate] = useState<string | null>(null);
  const availableTemplates = getTemplatesForStage(lead.stage);
  const timeSinceContact = lead.lastContactAt
    ? getTimeAgo(new Date(lead.lastContactAt).getTime(), now)
    : getTimeAgo(new Date(lead.firstSeenAt).getTime(), now);
  const isOverdue = lead.nextNudgeAt && new Date(lead.nextNudgeAt).getTime() < now && lead.stage !== 'won' && lead.stage !== 'lost';

  return (
    <section className="jf-box bg-white p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="micro-label text-[var(--muted)]">CHASE DETAIL</p>
          <h2 className="headline mt-1 text-2xl leading-none">{lead.leadTitle}</h2>
          <p className="mt-1 font-black text-[var(--muted)]">{lead.location} · {lead.estimatedValue} · Score {lead.score}</p>
        </div>
        <button onClick={onClose} className="jf-button bg-[var(--ink)] text-white text-xs px-3">CLOSE</button>
      </div>

      {/* Status */}
      <div className="mt-5">
        <ChaseStatus leadId={lead.leadId} currentStage={lead.stage} onStageChange={onStageChange} />
      </div>

      {/* Timeline */}
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="border-2 border-[var(--ink)] bg-[var(--bg-main)] p-3">
          <p className="micro-label text-[10px]">First Seen</p>
          <p className="mt-1 text-sm font-black">{formatDate(lead.firstSeenAt)}</p>
        </div>
        <div className="border-2 border-[var(--ink)] bg-[var(--bg-main)] p-3">
          <p className="micro-label text-[10px]">Last Contact</p>
          <p className="mt-1 text-sm font-black">{lead.lastContactAt ? `${timeSinceContact} ago` : 'Never'}</p>
        </div>
        <div className={`border-2 p-3 ${isOverdue ? 'border-[var(--orange)] bg-red-50' : 'border-[var(--ink)] bg-[var(--bg-main)]'}`}>
          <p className="micro-label text-[10px]">Next Nudge</p>
          <p className={`mt-1 text-sm font-black ${isOverdue ? 'text-[var(--orange)]' : ''}`}>
            {lead.nextNudgeAt ? (isOverdue ? 'OVERDUE — send now' : getTimeAgo(new Date(lead.nextNudgeAt).getTime(), now, true)) : 'No more nudges'}
          </p>
        </div>
      </div>

      {/* Message Templates */}
      <div className="mt-6">
        <p className="micro-label text-[var(--muted)]">MESSAGE TEMPLATES — {lead.stage.replace(/_/g, ' ').toUpperCase()}</p>
        {availableTemplates.length === 0 && (
          <p className="mt-2 text-sm font-black text-[var(--muted)]">No templates for this stage. Change the status to see relevant templates.</p>
        )}
        <div className="mt-3 grid gap-3">
          {availableTemplates.map((template) => (
            <div key={template.key} className="border-2 border-[var(--ink)] bg-white">
              <button
                onClick={() => setExpandedTemplate(expandedTemplate === template.key ? null : template.key)}
                className="w-full flex items-center justify-between px-4 py-3 text-left"
              >
                <div>
                  <p className="text-sm font-black">{template.label}</p>
                  <p className="text-xs text-[var(--muted)]">{template.timing}</p>
                </div>
                <span className="text-lg font-black text-[var(--muted)]">{expandedTemplate === template.key ? '−' : '+'}</span>
              </button>
              {expandedTemplate === template.key && (
                <div className="border-t-2 border-[var(--ink)] px-4 py-3">
                  <p className="text-xs font-bold text-[var(--muted)] mb-2">{template.purpose}</p>
                  <div className="border-2 border-[var(--line)] bg-[var(--bg-main)] p-3 font-mono text-sm leading-relaxed">
                    {fillTemplate(template, { job_type: lead.leadTitle, area: lead.location })}
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => onCopyMessage(template.key)}
                      className={`jf-button text-xs ${copiedId === template.key ? 'bg-green-600 text-white' : 'bg-[var(--yellow)] text-[var(--ink)]'}`}
                    >
                      {copiedId === template.key ? 'COPIED' : 'COPY TO CLIPBOARD'}
                    </button>
                    <button
                      onClick={() => {
                        const filled = fillTemplate(template, { job_type: lead.leadTitle, area: lead.location });
                        onSendNudge(template.key, filled);
                      }}
                      className="jf-button text-xs bg-[var(--ink)] text-white"
                    >
                      SEND VIA WHATSAPP
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* All Templates Reference */}
      <div className="mt-6">
        <p className="micro-label text-[var(--muted)]">ALL TEMPLATES REFERENCE</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {MESSAGE_TEMPLATES.map((t) => (
            <div key={t.key} className="border border-[var(--line)] bg-[var(--bg-main)] p-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-black">{t.label}</p>
                <StageBadge stage={t.stage} />
              </div>
              <p className="mt-1 text-[10px] text-[var(--muted)]">{t.purpose}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Chase History */}
      {lead.nudges.length > 0 && (
        <div className="mt-6">
          <p className="micro-label text-[var(--muted)]">CHASE HISTORY</p>
          <div className="mt-3 grid gap-2">
            {[...lead.nudges].reverse().map((nudge) => (
              <div key={nudge.id} className="border-2 border-[var(--ink)] bg-white p-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-black">{nudge.templateKey.replace(/_/g, ' ')}</p>
                  <span className="text-[10px] font-bold text-[var(--muted)]">{formatDate(nudge.sentAt)}</span>
                </div>
                <p className="mt-1 text-sm font-mono text-[var(--muted)] line-clamp-2">{nudge.message}</p>
                <span className={`mt-1 inline-block badge ${nudge.channel === 'whatsapp' ? 'bg-green-100 text-green-800' : 'bg-[var(--bg-main)] text-[var(--muted)]'}`}>
                  {nudge.channel === 'whatsapp' ? 'SENT' : 'DRAFT'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function getTimeAgo(timestamp: number, nowMs: number, future = false): string {
  const diff = future ? timestamp - nowMs : nowMs - timestamp;
  const absDiff = Math.abs(diff);
  const mins = Math.floor(absDiff / 60000);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ${hours % 24}h`;
  if (hours > 0) return `${hours}h ${mins % 60}m`;
  if (mins > 0) return `${mins}m`;
  return 'Just now';
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}
