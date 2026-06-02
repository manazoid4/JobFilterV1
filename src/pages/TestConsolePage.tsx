"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

import { CheckCircle2, XCircle, AlertCircle, RefreshCw, ExternalLink } from 'lucide-react';

type IntegrationStatus = { configured: boolean; [key: string]: unknown };
type StatusPayload = {
  ok: boolean;
  service: string;
  generatedAt: string;
  integrations: {
    stripe: IntegrationStatus & { priceIds: Record<string, boolean>; webhookSecret: boolean };
    supabase: IntegrationStatus;
    resend: IntegrationStatus;
    whatsapp: IntegrationStatus;
    companiesHouse: IntegrationStatus;
    epc: IntegrationStatus;
  };
  flags: { nodeEnv: string; vercel: boolean; fullAccessTestMode: boolean };
};

type ProbeState = 'idle' | 'running' | 'ok' | 'fail';
type Probe = { state: ProbeState; ms?: number; detail?: string; data?: unknown };

const blankProbe: Probe = { state: 'idle' };

export function TestConsolePage() {
  const [status, setStatus] = useState<StatusPayload | null>(null);
  const [statusError, setStatusError] = useState<string | null>(null);
  const [statusLoading, setStatusLoading] = useState(false);

  const [health, setHealth] = useState<Probe>(blankProbe);
  const [leadSearch, setLeadSearch] = useState<Probe>(blankProbe);
  const [waitlistCount, setWaitlistCount] = useState<Probe>(blankProbe);
  const [waitlistSubmit, setWaitlistSubmit] = useState<Probe>(blankProbe);
  const [stripeCheckout, setStripeCheckout] = useState<Probe>(blankProbe);

  const [postcode, setPostcode] = useState('B14 7QH');
  const [trade, setTrade] = useState('electrical');
  const [radiusMiles, setRadiusMiles] = useState(10);
  const [testEmail, setTestEmail] = useState('test+console@jobfilter.uk');

  async function loadStatus() {
    setStatusLoading(true);
    setStatusError(null);
    try {
      const res = await fetch('/api/status');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus(await res.json());
    } catch (err) {
      setStatusError(err instanceof Error ? err.message : 'unknown error');
    } finally {
      setStatusLoading(false);
    }
  }

  useEffect(() => {
    loadStatus();
  }, []);

  async function timeFetch(url: string, init?: RequestInit): Promise<{ ms: number; res: Response; body: unknown }> {
    const t0 = performance.now();
    const res = await fetch(url, init);
    const ms = Math.round(performance.now() - t0);
    let body: unknown = null;
    try {
      body = await res.json();
    } catch {
      body = await res.text().catch(() => null);
    }
    return { ms, res, body };
  }

  async function runHealth() {
    setHealth({ state: 'running' });
    try {
      const { ms, res, body } = await timeFetch('/api/health');
      setHealth({
        state: res.ok ? 'ok' : 'fail',
        ms,
        detail: res.ok ? 'Server responding' : `HTTP ${res.status}`,
        data: body,
      });
    } catch (err) {
      setHealth({ state: 'fail', detail: err instanceof Error ? err.message : 'fetch failed' });
    }
  }

  async function runLeadSearch() {
    setLeadSearch({ state: 'running' });
    try {
      const { ms, res, body } = await timeFetch('/api/leads/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postcode, trade, radiusMiles }),
      });
      const data = body as { ok?: boolean; count?: number; leads?: unknown[]; errors?: string[] } | null;
      const count = data?.leads?.length ?? data?.count ?? 0;
      setLeadSearch({
        state: data?.ok ? 'ok' : 'fail',
        ms,
        detail: data?.ok
          ? count > 0
            ? `${count} leads returned`
            : 'OK — empty result (valid for many postcode/trade combos)'
          : (data?.errors?.[0] ?? `HTTP ${res.status}`),
        data: body,
      });
    } catch (err) {
      setLeadSearch({ state: 'fail', detail: err instanceof Error ? err.message : 'fetch failed' });
    }
  }

  async function runWaitlistCount() {
    setWaitlistCount({ state: 'running' });
    try {
      const { ms, res, body } = await timeFetch('/api/waitlist/count');
      const data = body as { remaining?: number; count?: number } | null;
      setWaitlistCount({
        state: res.ok ? 'ok' : 'fail',
        ms,
        detail: res.ok ? `remaining: ${data?.remaining ?? '?'} · count: ${data?.count ?? '?'}` : `HTTP ${res.status}`,
        data: body,
      });
    } catch (err) {
      setWaitlistCount({ state: 'fail', detail: err instanceof Error ? err.message : 'fetch failed' });
    }
  }

  async function runWaitlistSubmit() {
    setWaitlistSubmit({ state: 'running' });
    try {
      const { ms, res, body } = await timeFetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Test Console',
          trade,
          contact: testEmail,
          source: 'test-console',
        }),
      });
      const data = body as { ok?: boolean; stored?: { id?: string } } | null;
      setWaitlistSubmit({
        state: data?.ok ? 'ok' : 'fail',
        ms,
        detail: data?.ok ? `Stored id ${data?.stored?.id ?? '—'}` : `HTTP ${res.status}`,
        data: body,
      });
    } catch (err) {
      setWaitlistSubmit({ state: 'fail', detail: err instanceof Error ? err.message : 'fetch failed' });
    }
  }

  async function runStripeCheckout() {
    setStripeCheckout({ state: 'running' });
    try {
      const { ms, res, body } = await timeFetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier: 'founding', billing: 'monthly' }),
      });
      const data = body as { url?: string; error?: string } | null;
      if (data?.url) {
        setStripeCheckout({ state: 'ok', ms, detail: 'Session created. Click to open.', data: body });
      } else {
        setStripeCheckout({
          state: 'fail',
          ms,
          detail: data?.error ?? `HTTP ${res.status} — set STRIPE_SECRET_KEY?`,
          data: body,
        });
      }
    } catch (err) {
      setStripeCheckout({ state: 'fail', detail: err instanceof Error ? err.message : 'fetch failed' });
    }
  }

  return (
    <main className="page-shell py-8 pb-16">
      {/* ── Hero ── */}
      <section className="jf-box bg-[var(--ink)] p-7 text-white">
        <p className="micro-label text-[var(--yellow)]">JOBFILTER TEST CONSOLE</p>
        <h1 className="headline mt-3 text-4xl leading-none sm:text-5xl">SYSTEM CHECK.</h1>
        <p className="mt-3 max-w-2xl text-base font-bold text-white/80">
          Live status of every integration and endpoint. No mocks. Tap to probe.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            className="jf-button bg-[var(--yellow)] text-[var(--ink)] inline-flex items-center gap-2"
            onClick={loadStatus}
            disabled={statusLoading}
          >
            <RefreshCw size={14} strokeWidth={3} className={statusLoading ? 'animate-spin' : ''} />
            {statusLoading ? 'Reading…' : 'Refresh Status'}
          </button>
          <Link href="/dev-portal" className="jf-button bg-white text-[var(--ink)]">
            Dev Portal
          </Link>
        </div>
      </section>

      {/* ── Integration status ── */}
      <section className="mt-6 jf-box bg-white p-6">
        <p className="micro-label text-[var(--orange)]">INTEGRATIONS</p>
        <h2 className="headline mt-1 text-2xl">WHAT IS WIRED UP.</h2>

        {statusError && (
          <div className="mt-4 border-2 border-[var(--orange)] bg-[var(--orange)]/10 p-3 text-sm font-black text-[var(--orange)]">
            Could not reach /api/status — {statusError}
          </div>
        )}

        {status && (
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <IntegrationCard
              label="Stripe"
              ok={status.integrations.stripe.configured}
              extras={[
                ['Webhook secret', status.integrations.stripe.webhookSecret],
                ['Founding monthly price', status.integrations.stripe.priceIds.foundingMonthly],
                ['Founding annual price', status.integrations.stripe.priceIds.foundingAnnual],
                ['Pro monthly price', status.integrations.stripe.priceIds.proMonthly],
                ['Pro annual price', status.integrations.stripe.priceIds.proAnnual],
              ]}
              missingHint="Add STRIPE_SECRET_KEY and STRIPE_PUBLISHABLE_KEY"
            />
            <IntegrationCard
              label="Supabase"
              ok={status.integrations.supabase.configured}
              missingHint="Add SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY"
            />
            <IntegrationCard
              label="Resend (email)"
              ok={status.integrations.resend.configured}
              missingHint="Add RESEND_API_KEY"
            />
            <IntegrationCard
              label="WhatsApp (Meta Cloud API)"
              ok={status.integrations.whatsapp.configured}
              extras={[
                ['Recipient override (WHATSAPP_TO)', Boolean(status.integrations.whatsapp.recipientOverride)],
              ]}
              missingHint="Add WHATSAPP_PHONE_NUMBER_ID + WHATSAPP_ACCESS_TOKEN (recipient defaults to payload.phone)"
            />
            <IntegrationCard
              label="Companies House"
              ok={status.integrations.companiesHouse.configured}
              missingHint="Add COMPANIES_HOUSE_API_KEY"
            />
            <IntegrationCard
              label="EPC register"
              ok={status.integrations.epc.configured}
              missingHint="Add EPC_BEARER_TOKEN"
            />
          </div>
        )}

        {status && (
          <div className="mt-5 grid gap-2 text-xs font-black uppercase tracking-wider text-[var(--muted)]">
            <span>NODE_ENV: {status.flags.nodeEnv}</span>
            <span>VERCEL: {status.flags.vercel ? 'yes' : 'no'}</span>
            <span>FULL_ACCESS_TEST_MODE: {status.flags.fullAccessTestMode ? 'on' : 'off'}</span>
            <span>Generated: {new Date(status.generatedAt).toLocaleString('en-GB')}</span>
          </div>
        )}
      </section>

      {/* ── Live probes ── */}
      <section className="mt-6 jf-box bg-white p-6">
        <p className="micro-label text-[var(--orange)]">LIVE PROBES</p>
        <h2 className="headline mt-1 text-2xl">DOES IT ACTUALLY WORK.</h2>
        <p className="mt-2 text-sm font-bold text-[var(--muted)]">Click each probe to hit the real endpoint. Latency and response shown below.</p>

        <div className="mt-5 grid gap-3">
          <ProbeRow
            label="API health"
            endpoint="GET /api/health"
            probe={health}
            onRun={runHealth}
            description="Server reachable + Express app booted."
          />

          <ProbeRow
            label="Waitlist count"
            endpoint="GET /api/waitlist/count"
            probe={waitlistCount}
            onRun={runWaitlistCount}
            description="Reads from Supabase if configured, in-memory otherwise."
          />

          <div className="border-2 border-[var(--line)] bg-[var(--paper)] p-4">
            <ProbeHeader label="Leads search" endpoint="POST /api/leads/search" probe={leadSearch} />
            <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_1fr_120px_auto]">
              <input
                className="field-input"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                placeholder="Postcode"
              />
              <input
                className="field-input"
                value={trade}
                onChange={(e) => setTrade(e.target.value)}
                placeholder="Trade"
              />
              <input
                className="field-input"
                type="number"
                min={1}
                max={100}
                value={radiusMiles}
                onChange={(e) => setRadiusMiles(Number(e.target.value))}
                placeholder="Radius (mi)"
              />
              <button type="button" className="jf-button bg-[var(--ink)] text-white" onClick={runLeadSearch}>
                RUN
              </button>
            </div>
            <ProbeDetail probe={leadSearch} description="Real UK signal sources: planning, EPC, tenders, Companies House. Empty result is a valid pass." />
          </div>

          <div className="border-2 border-[var(--line)] bg-[var(--paper)] p-4">
            <ProbeHeader label="Waitlist submit" endpoint="POST /api/waitlist" probe={waitlistSubmit} />
            <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_auto]">
              <input
                className="field-input"
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                placeholder="Test email"
              />
              <button type="button" className="jf-button bg-[var(--ink)] text-white" onClick={runWaitlistSubmit}>
                SUBMIT TEST
              </button>
            </div>
            <ProbeDetail probe={waitlistSubmit} description="Stores in-memory + Supabase if configured; sends confirmation email if Resend configured." />
          </div>

          <div className="border-2 border-[var(--line)] bg-[var(--paper)] p-4">
            <ProbeHeader label="Stripe checkout session" endpoint="POST /api/create-checkout-session" probe={stripeCheckout} />
            <div className="mt-3 flex flex-wrap gap-2">
              <button type="button" className="jf-button bg-[var(--ink)] text-white" onClick={runStripeCheckout}>
                CREATE FOUNDING MONTHLY SESSION
              </button>
              {stripeCheckout.state === 'ok' && (stripeCheckout.data as { url?: string })?.url && (
                <a
                  className="jf-button bg-[var(--yellow)] text-[var(--ink)] inline-flex items-center gap-2"
                  href={(stripeCheckout.data as { url: string }).url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  OPEN STRIPE <ExternalLink size={14} strokeWidth={3} />
                </a>
              )}
            </div>
            <ProbeDetail
              probe={stripeCheckout}
              description="Uses Stripe test keys if STRIPE_SECRET_KEY starts with sk_test_. Otherwise returns 'Stripe not configured'."
            />
          </div>
        </div>
      </section>

      {/* ── Manual flow checklist ── */}
      <section className="mt-6 jf-box bg-[var(--yellow)] p-6">
        <p className="micro-label text-[var(--ink)]">MANUAL END-TO-END FLOW</p>
        <h2 className="headline mt-1 text-2xl">WHAT TO TEST BY HAND.</h2>
        <ol className="mt-4 grid gap-2 text-sm font-bold text-[var(--ink)]">
          <li>
            <strong>1.</strong> Above: confirm all six integrations show green. Anything red blocks that part of the flow.
          </li>
          <li>
            <strong>2.</strong> Click <em>API health</em>. Should respond &lt; 200ms with <code>{'{ ok: true }'}</code>.
          </li>
          <li>
            <strong>3.</strong> Run <em>Leads search</em> with your own postcode and trade. Expect real signals or an empty list — never an error.
          </li>
          <li>
            <strong>4.</strong> Submit a waitlist entry with a real address you control. If Resend is configured, you should receive an email.
          </li>
          <li>
            <strong>5.</strong> Create a Stripe session. If keys are test mode, click <em>Open Stripe</em> and complete checkout with card <code>4242 4242 4242 4242</code>.
          </li>
          <li>
            <strong>6.</strong> Confirm Supabase row appears in the <code>payments</code> table (via Supabase dashboard). If not, webhook secret may be missing.
          </li>
          <li>
            <strong>7.</strong> Walk the live site: <Link className="underline" href="/">Home</Link>, <Link className="underline" href="/find-jobs">Find Jobs</Link>, <Link className="underline" href="/free-tools">Free Tools</Link>, <Link className="underline" href="/pricing">Pricing</Link>, <Link className="underline" href="/news">News</Link>, <Link className="underline" href="/intelligence/birmingham">City Intel</Link>.
          </li>
        </ol>
      </section>
    </main>
  );
}

function IntegrationCard({
  label,
  ok,
  extras,
  missingHint,
}: {
  label: string;
  ok: boolean;
  extras?: [string, boolean][];
  missingHint?: string;
}) {
  return (
    <div className={`border-2 p-4 ${ok ? 'border-[var(--green)] bg-[var(--green)]/5' : 'border-[var(--orange)] bg-[var(--orange)]/5'}`}>
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-black uppercase tracking-wider text-[var(--ink)]">{label}</p>
        <StatusIcon ok={ok} />
      </div>
      <p className={`mt-1 text-xs font-black uppercase ${ok ? 'text-[var(--green)]' : 'text-[var(--orange)]'}`}>
        {ok ? 'Configured' : 'Not configured'}
      </p>
      {extras && extras.length > 0 && (
        <ul className="mt-3 grid gap-1 text-[11px] font-black uppercase tracking-wider text-[var(--muted)]">
          {extras.map(([k, v]) => (
            <li key={k} className="flex items-center gap-1.5">
              <span className={`inline-block h-2 w-2 ${v ? 'bg-[var(--green)]' : 'bg-[var(--orange)]'}`} />
              {k}
            </li>
          ))}
        </ul>
      )}
      {!ok && missingHint && (
        <p className="mt-2 text-[11px] font-black uppercase tracking-wider text-[var(--muted)]">
          {missingHint}
        </p>
      )}
    </div>
  );
}

function StatusIcon({ ok }: { ok: boolean }) {
  return ok ? (
    <CheckCircle2 size={18} strokeWidth={3} className="text-[var(--green)]" />
  ) : (
    <XCircle size={18} strokeWidth={3} className="text-[var(--orange)]" />
  );
}

function ProbeHeader({ label, endpoint, probe }: { label: string; endpoint: string; probe: Probe }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div>
        <p className="text-sm font-black uppercase tracking-wider text-[var(--ink)]">{label}</p>
        <p className="font-mono text-[11px] font-black uppercase text-[var(--muted)]">{endpoint}</p>
      </div>
      <ProbeBadge probe={probe} />
    </div>
  );
}

function ProbeRow({
  label,
  endpoint,
  probe,
  onRun,
  description,
}: {
  label: string;
  endpoint: string;
  probe: Probe;
  onRun: () => void;
  description: string;
}) {
  return (
    <div className="border-2 border-[var(--line)] bg-[var(--paper)] p-4">
      <ProbeHeader label={label} endpoint={endpoint} probe={probe} />
      <div className="mt-3">
        <button type="button" className="jf-button bg-[var(--ink)] text-white" onClick={onRun}>
          RUN PROBE
        </button>
      </div>
      <ProbeDetail probe={probe} description={description} />
    </div>
  );
}

function ProbeBadge({ probe }: { probe: Probe }) {
  if (probe.state === 'idle') {
    return (
      <span className="border border-[var(--muted)]/40 bg-white px-2 py-1 text-[10px] font-black uppercase text-[var(--muted)]">
        Not run
      </span>
    );
  }
  if (probe.state === 'running') {
    return (
      <span className="inline-flex items-center gap-1 border border-[var(--muted)]/40 bg-white px-2 py-1 text-[10px] font-black uppercase text-[var(--muted)]">
        <RefreshCw size={10} strokeWidth={3} className="animate-spin" /> Running
      </span>
    );
  }
  if (probe.state === 'ok') {
    return (
      <span className="inline-flex items-center gap-1 border-2 border-[var(--green)] bg-[var(--green)]/10 px-2 py-1 text-[10px] font-black uppercase text-[var(--green)]">
        <CheckCircle2 size={10} strokeWidth={3} /> OK · {probe.ms ?? '?'}ms
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 border-2 border-[var(--orange)] bg-[var(--orange)]/10 px-2 py-1 text-[10px] font-black uppercase text-[var(--orange)]">
      <AlertCircle size={10} strokeWidth={3} /> Fail · {probe.ms ?? '?'}ms
    </span>
  );
}

function ProbeDetail({ probe, description }: { probe: Probe; description: string }) {
  return (
    <div className="mt-3">
      <p className="text-[11px] font-black uppercase tracking-wider text-[var(--muted)]">{description}</p>
      {probe.detail && (
        <p className={`mt-2 text-xs font-black ${probe.state === 'ok' ? 'text-[var(--green)]' : probe.state === 'fail' ? 'text-[var(--orange)]' : 'text-[var(--muted)]'}`}>
          {probe.detail}
        </p>
      )}
    </div>
  );
}

export default TestConsolePage;
