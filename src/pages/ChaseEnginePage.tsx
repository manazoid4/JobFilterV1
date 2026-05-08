import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { ChaseLead, ChaseStage } from '../lib/types';
import {
  getChaseLeads,
  importLeadToChase,
  saveChaseLead,
} from '../lib/chaseStore';
import { fillTemplate, getTemplateByKey } from '../lib/chaseTemplates';
import { getStoredLeads } from '../lib/leadStore';

const STAGES: { key: ChaseStage | 'all'; label: string; color: string }[] = [
  { key: 'all', label: 'All', color: '' },
  { key: 'not_contacted', label: 'New', color: 'bg-[var(--yellow)]' },
  { key: 'contacted', label: 'Contacted', color: 'bg-blue-500' },
  { key: 'following_up', label: 'Following Up', color: 'bg-[var(--orange)]' },
];

export function ChaseEnginePage() {
  const [chaseLeads, setChaseLeads] = useState<ChaseLead[]>([]);
  const [filterStage, setFilterStage] = useState<ChaseStage | 'all'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    setChaseLeads(getChaseLeads());
  }, []);

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
    if (imported > 0) setChaseLeads(getChaseLeads());
  }, [chaseLeads]);

  const filteredLeads = chaseLeads.filter((l) => {
    if (filterStage !== 'all' && l.stage !== filterStage) return false;
    return l.stage !== 'won' && l.stage !== 'lost';
  });

  const advanceStage = (lead: ChaseLead) => {
    const order: ChaseStage[] = ['not_contacted', 'contacted', 'following_up'];
    const idx = order.indexOf(lead.stage);
    if (idx < order.length - 1) {
      lead.stage = order[idx + 1];
      saveChaseLead(lead);
      setChaseLeads(getChaseLeads());
    }
  };

  const copyMessage = (lead: ChaseLead) => {
    const template = getTemplateByKey(
      lead.stage === 'not_contacted' ? 'initial_contact' :
      lead.stage === 'contacted' ? 'follow_up_1' : 'follow_up_2'
    );
    const msg = fillTemplate(template, {
      job_type: lead.leadTitle,
      area: lead.location,
    });
    navigator.clipboard.writeText(msg).then(() => {
      setCopiedId(lead.leadId);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const activeCount = chaseLeads.filter((l) => l.stage !== 'won' && l.stage !== 'lost').length;
  const wonCount = chaseLeads.filter((l) => l.stage === 'won').length;

  return (
    <main className="page-shell grid gap-6 py-6 pb-24">
      <section className="jf-box bg-[var(--ink)] p-5 text-white">
        <p className="micro-label text-[var(--yellow)]">CHASE</p>
        <h1 className="headline mt-2 text-3xl sm:text-4xl">LEADS YOU'RE CHASING</h1>
        <p className="mt-2 text-sm font-black text-white/70">
          Copy the message. Paste in WhatsApp. Move to next stage.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button onClick={importAvailableLeads} className="jf-button bg-[var(--yellow)] text-[var(--ink)] text-sm">
            IMPORT FROM INTAKE
          </button>
          <Link to="/win" className="jf-button bg-[var(--green)] text-white text-sm">
            WINS ({wonCount}) →
          </Link>
        </div>
      </section>

      <div className="flex gap-4 sm:gap-6">
        <Stat label="Active" value={activeCount} />
        <Stat label="Won" value={wonCount} color="text-[var(--green)]" />
      </div>

      <div className="flex flex-wrap gap-2">
        {STAGES.map((s) => (
          <button
            key={s.key}
            onClick={() => setFilterStage(s.key)}
            className={`px-3 py-2 text-xs font-black uppercase border-2 border-[var(--ink)] min-h-[44px] ${
              filterStage === s.key ? 'bg-[var(--yellow)]' : 'bg-white'
            }`}
          >
            {s.label}
            <span className="ml-1 opacity-60">
              ({s.key === 'all'
                ? chaseLeads.filter((l) => l.stage !== 'won' && l.stage !== 'lost').length
                : chaseLeads.filter((l) => l.stage === s.key).length})
            </span>
          </button>
        ))}
      </div>

      {filteredLeads.length === 0 && (
        <div className="jf-box bg-white p-8 text-center">
          <p className="headline text-2xl">No leads to chase.</p>
          <p className="mt-2 text-[var(--muted)]">Scan for jobs or import from Intake.</p>
          <Link to="/find-jobs" className="jf-button bg-[var(--yellow)] text-[var(--ink)] mt-4 inline-block">
            FIND JOBS
          </Link>
        </div>
      )}

      <div className="grid gap-3">
        {filteredLeads.map((lead) => {
          const isExpanded = expandedId === lead.leadId;
          const stageLabel = STAGES.find((s) => s.key === lead.stage)?.label || lead.stage;
          return (
            <div key={lead.leadId} className="jf-box bg-white">
              <button
                onClick={() => setExpandedId(isExpanded ? null : lead.leadId)}
                className="w-full text-left p-4 flex items-start justify-between gap-3"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`inline-block w-2 h-2 rounded-full ${STAGES.find(s => s.key === lead.stage)?.color || 'bg-gray-400'}`} />
                    <span className="text-xs font-black uppercase text-[var(--muted)]">{stageLabel}</span>
                    {lead.score && (
                      <span className="text-xs font-black bg-[var(--yellow)] px-1.5 py-0.5">{lead.score}</span>
                    )}
                  </div>
                  <p className="mt-1 font-black text-[var(--ink)] truncate">{lead.leadTitle}</p>
                  <p className="text-sm text-[var(--muted)]">{lead.location}{lead.estimatedValue !== 'TBC' ? ` · ${lead.estimatedValue}` : ''}</p>
                </div>
                <span className="text-[var(--muted)] text-lg flex-shrink-0">{isExpanded ? '−' : '+'}</span>
              </button>

              {isExpanded && (
                <div className="border-t-2 border-[var(--line)] p-4 grid gap-3">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => copyMessage(lead)}
                      className="jf-button bg-[var(--yellow)] text-[var(--ink)] text-sm"
                    >
                      {copiedId === lead.leadId ? 'COPIED ✓' : 'COPY WHATSAPP MESSAGE'}
                    </button>
                    <button
                      onClick={() => advanceStage(lead)}
                      className="jf-button bg-[var(--ink)] text-white text-sm"
                    >
                      MOVE TO {STAGES[STAGES.findIndex(s => s.key === lead.stage) + 1]?.label?.toUpperCase() || 'DONE'}
                    </button>
                  </div>
                  <p className="text-xs text-[var(--muted)]">
                    Tip: Paste the copied message in WhatsApp. Then move to the next stage.
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}

function Stat({ label, value, color = '' }: { label: string; value: number; color?: string }) {
  return (
    <div className="jf-box bg-white p-4 flex-1">
      <p className="text-xs font-black uppercase text-[var(--muted)]">{label}</p>
      <p className={`headline text-3xl mt-1 ${color || 'text-[var(--ink)]'}`}>{value}</p>
    </div>
  );
}
