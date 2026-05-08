# ServiceNow Connector Spec

Created: 8 May 2026
Status: Draft — Ready for Review

---

## 1. API Options

### 1.1 Table API (REST)

The primary API for CRUD operations on any ServiceNow table.

**Endpoint pattern:**
```
https://{instance}.service-now.com/api/now/table/{tableName}
```

**Capabilities:**
- GET — query records with filters, sorting, pagination
- POST — create new records
- PUT — full record update
- PATCH — partial record update
- DELETE — remove records

**Pros:**
- Universal — works on every table (incident, case, change_request, custom tables)
- Well-documented, stable across all ServiceNow versions
- Supports query parameters: `sysparm_query`, `sysparm_fields`, `sysparm_limit`, `sysparm_offset`
- Returns JSON natively
- No custom development needed on ServiceNow side

**Cons:**
- Rate limited (default: 100 requests/15 seconds per user)
- Can't execute complex business logic (only CRUD)
- No batch operations without Import Set API
- Field-level ACLs can silently filter data

**Verdict for MVP:** PRIMARY API. Covers 90% of AgentDock needs.

---

### 1.2 Import Set API (REST)

Bulk data loading via staging tables.

**Endpoint pattern:**
```
https://{instance}.service-now.com/api/now/import/{importSetTableName}
```

**Capabilities:**
- POST — submit batch records to a staging table
- ServiceNow transform maps push data into target tables

**Pros:**
- Handles bulk operations efficiently
- Built-in deduplication via coalesce fields
- Transform maps handle data validation and mapping

**Cons:**
- Requires ServiceNow admin to configure transform maps
- Async — you submit, ServiceNow processes later
- Overkill for real-time complaint management
- Adds complexity to MVP

**Verdict for MVP:** SKIP for now. Add in V1 when batch sync is needed.

---

### 1.3 Scripted REST APIs (Custom)

Custom endpoints written in ServiceNow's server-side JavaScript.

**Endpoint pattern:**
```
https://{instance}.service-now.com/api/{namespace}/{apiName}/{resource}
```

**Capabilities:**
- Full server-side logic (GlideRecord, business rules, workflows)
- Custom request/response shapes
- Can trigger workflows, approvals, notifications

**Pros:**
- Executes complex business logic in a single call
- Can return computed/aggregated data
- Full control over authentication and response format
- Can orchestrate multi-table operations

**Cons:**
- Requires ServiceNow developer to build and maintain
- Scoped app permissions can limit access
- Custom code = custom maintenance burden
- Tightly coupled to ServiceNow instance configuration

**Verdict for MVP:** BUILD ONE for complaint-specific operations that Table API can't handle cleanly (e.g., "triage and assign" as a single atomic operation).

---

### 1.4 Integration Hub (Spokes + Actions)

ServiceNow's native integration platform (requires paid subscription).

**Capabilities:**
- Pre-built spokes for common systems (email, Slack, Jira, etc.)
- Custom actions via Flow Designer
- Runs inside ServiceNow, not external

**Pros:**
- Native to ServiceNow — no external infrastructure
- Flow Designer UI for non-developers
- Built-in error handling and retry

**Cons:**
- Requires Integration Hub license (extra cost)
- Runs inside ServiceNow — AgentDock can't control execution
- Not designed for third-party platforms to drive
- Adds cost to customer's ServiceNow bill

**Verdict for MVP:** SKIP. AgentDock is the orchestrator, not ServiceNow. We call ServiceNow, not the other way around.

---

### 1.5 Flow Designer (Low-Code Automation)

ServiceNow's visual automation builder.

**Capabilities:**
- Trigger flows on record changes
- Execute actions, approvals, notifications
- Can call external REST endpoints (outbound)

**Pros:**
- Can push events to AgentDock via outbound REST
- No-code configuration for ServiceNow admins
- Real-time triggers when records change

**Cons:**
- Requires ServiceNow admin to configure
- Limited error handling for external calls
- Flow execution is opaque to AgentDock
- Another layer of indirection

**Verdict for MVP:** USE for webhooks only. Configure Flow Designer to POST to AgentDock's webhook endpoint when complaints change state. Not for core data sync.

---

### 1.6 Agent Workspace (Embedding)

ServiceNow's modern agent UI framework.

**Capabilities:**
- Embed external UI components via UI Builder
- Custom panels alongside ServiceNow records
- Shared context between ServiceNow and embedded apps

**Pros:**
- Agents work inside their existing ServiceNow UI
- No context switching
- Professional, integrated experience

**Cons:**
- Requires UI Builder development
- iframe embedding has limitations
- Adds significant development time
- Not needed for MVP — AgentDock has its own dashboard

**Verdict for MVP:** SKIP. AgentDock's Operations Dock IS the operations UI. Embedding comes in V2 when customers demand it.

---

### API Decision Matrix

| API | MVP Use | Why |
|-----|---------|-----|
| Table API | PRIMARY | CRUD on complaints, cases, users |
| Import Set API | V1 | Bulk sync, initial data load |
| Scripted REST API | MVP (1 endpoint) | Atomic triage+assign operation |
| Integration Hub | Skip | Wrong direction of control |
| Flow Designer | Webhooks only | Push events to AgentDock |
| Agent Workspace | V2 | Embed AgentDock in ServiceNow |

---

## 2. Authentication

### 2.1 OAuth 2.0 (RECOMMENDED)

ServiceNow supports OAuth 2.0 as both provider and consumer.

**Flow for AgentDock → ServiceNow:**

```
┌─────────────┐     ┌──────────────────┐     ┌─────────────────────┐
│  AgentDock   │     │  ServiceNow      │     │  ServiceNow Admin   │
│  Backend     │     │  OAuth Provider  │     │                     │
└──────┬──────┘     └────────┬─────────┘     └──────────┬──────────┘
       │                     │                          │
       │  1. User clicks     │                          │
       │  "Connect SN"       │                          │
       │────────────────────>│                          │
       │                     │                          │
       │  2. Redirect to     │                          │
       │  ServiceNow login   │                          │
       │<────────────────────│                          │
       │                     │                          │
       │  3. User authenticates                         │
       │  and grants access  │                          │
       │                     │                          │
       │  4. Authorization   │                          │
       │  code returned      │                          │
       │<────────────────────│                          │
       │                     │                          │
       │  5. Exchange code   │                          │
       │  for access token   │                          │
       │────────────────────>│                          │
       │                     │                          │
       │  6. Access token    │                          │
       │  + refresh token    │                          │
       │<────────────────────│                          │
       │                     │                          │
       │  7. Store tokens    │                          │
       │  securely (encrypted│                          │
       │  in DB)             │                          │
       │                     │                          │
       │  8. Use access token│                          │
       │  for all API calls  │                          │
       │────────────────────>│                          │
       │                     │                          │
       │  9. Refresh token   │                          │
       │  when access expires│                          │
       │────────────────────>│                          │
       │                     │                          │
```

**Setup steps (ServiceNow admin side):**
1. Navigate to `System OAuth > Application Registry`
2. Create new OAuth API endpoint for external client
3. Configure:
   - Name: `AgentDock Connector`
   - Redirect URL: `https://agentdock.example.com/auth/servicenow/callback`
   - Grant type: Authorization Code
4. Note `Client ID` and `Client Secret`
5. Configure OAuth scopes (or use default `useraccount`)

**Token endpoint:**
```
POST https://{instance}.service-now.com/oauth_token.do
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code
&code={auth_code}
&client_id={client_id}
&client_secret={client_secret}
&redirect_uri={redirect_uri}
```

**Refresh token:**
```
POST https://{instance}.service-now.com/oauth_token.do
Content-Type: application/x-www-form-urlencoded

grant_type=refresh_token
&refresh_token={refresh_token}
&client_id={client_id}
&client_secret={client_secret}
```

**Pros:**
- Industry standard, auditable
- Token-based — no credentials stored
- Refresh tokens for long-lived sessions
- Scopes limit access
- Revocable at any time
- Required for SOC 2 compliance

**Cons:**
- More complex initial setup
- Requires redirect flow (not ideal for headless)
- Token management overhead

---

### 2.2 Basic Auth

**Format:**
```
Authorization: Basic {base64(username:password)}
```

**Pros:**
- Simplest to implement
- Works immediately with any ServiceNow user
- No setup required on ServiceNow side

**Cons:**
- Credentials stored in plaintext (even if encrypted at rest)
- Password changes break integration
- No token expiry or refresh
- Fails SOC 2 audit requirements
- ServiceNow can disable basic auth per-instance

**Verdict:** SUPPORT for dev/testing only. NEVER for production.

---

### 2.3 API Keys (Bearer Token)

ServiceNow supports API keys via `System Web Services > API Keys`.

**Format:**
```
Authorization: Bearer {api_key}
```

**Pros:**
- Simpler than OAuth
- No redirect flow needed
- Revocable

**Cons:**
- Less granular than OAuth scopes
- Not as widely audited
- Limited to specific user context

**Verdict:** VIABLE alternative for customers who can't configure OAuth.

---

### 2.4 Mutual TLS (mTLS)

Enterprise-grade certificate-based authentication.

**Pros:**
- Highest security level
- Required by some enterprise customers
- No token management

**Cons:**
- Complex certificate lifecycle
- Requires ServiceNow admin setup
- Overkill for MVP

**Verdict:** V2 feature. Enterprise customers will request it.

---

### Authentication Decision

| Method | MVP | Production | Enterprise |
|--------|-----|------------|------------|
| OAuth 2.0 | PRIMARY | REQUIRED | REQUIRED |
| Basic Auth | Dev only | BLOCKED | BLOCKED |
| API Key | FALLBACK | SUPPORTED | SUPPORTED |
| mTLS | Skip | V1 | REQUIRED |

---

## 3. Data Model Mapping

### 3.1 ServiceNow Tables → AgentDock Entities

```
ServiceNow Table          →  AgentDock Entity
─────────────────────────    ──────────────────
incident                  →  Task (complaint)
sn_customerservice_case   →  Task (customer service case)
sys_user                  →  Agent / User
sys_user_group            →  Assignment Group
sys_comment / work_notes  →  Handoff / Audit Entry
sysapproval_approver      →  Review Gate
```

### 3.2 Field Mapping: Incident → AgentDock Task

| ServiceNow Field | AgentDock Field | Type | Notes |
|------------------|-----------------|------|-------|
| `sys_id` | `externalId` | string | Unique ServiceNow record ID |
| `number` | `reference` | string | Human-readable (INC0012345) |
| `short_description` | `title` | string | Complaint summary |
| `description` | `body` | string | Full complaint details |
| `state` | `status` | number | 1=New, 2=In Progress, 6=Resolved, 7=Closed |
| `priority` | `priority` | number | 1=Critical, 2=High, 3=Moderate, 4=Low |
| `assigned_to` | `assignee` | ref (sys_user) | Assigned agent |
| `assignment_group` | `group` | ref (sys_user_group) | Team assignment |
| `caller_id` | `customer` | ref (sys_user) | Complainant |
| `category` | `category` | string | Complaint type |
| `subcategory` | `subcategory` | string | Complaint sub-type |
| `impact` | `impact` | number | 1=High, 2=Medium, 3=Low |
| `urgency` | `urgency` | number | 1=High, 2=Medium, 3=Low |
| `opened_at` | `createdAt` | datetime | When complaint was logged |
| `closed_at` | `resolvedAt` | datetime | When complaint was resolved |
| `work_notes` | `internalNotes` | string | Agent internal notes |
| `comments` | `customerNotes` | string | Visible to customer |
| `correlation_id` | `correlationId` | string | Links related records |
| `sla_due` | `slaDeadline` | datetime | SLA target time |
| `business_service` | `service` | ref (cmdb_ci_service) | Affected service |

### 3.3 State Mapping

| ServiceNow State | Value | AgentDock Pipeline Stage |
|------------------|-------|--------------------------|
| New | 1 | TRIGGER |
| In Progress | 2 | TRIAGE → DRAFT → REVIEW |
| On Hold | 3 | REVIEW (paused) |
| Resolved | 6 | SEND → LOG |
| Closed | 7 | LOG (complete) |
| Cancelled | 8 | LOG (cancelled) |

### 3.4 Tracking Agent Actions in ServiceNow

**Work Notes (internal, not visible to customer):**
```
[AgentDock] Triage Agent classified complaint as "Broadband - No Connection"
[AgentDock] Draft Agent generated response (pending human approval)
[AgentDock] Response approved by john.manager@company.com
[AgentDock] Priority escalated from 3 to 2 due to SLA risk
```

**Additional Comments (visible to customer):**
```
Only populated when a human-approved response is sent.
AgentDock never posts to customer-facing comments without approval.
```

**Audit Trail Fields:**
| Field | Purpose |
|-------|---------|
| `work_notes` | Internal agent actions, triage results, drafts |
| `comments` | Customer-facing responses (approval-gated) |
| `sys_mod_count` | Record modification count |
| `sys_updated_by` | Last user/bot to modify |
| `sys_updated_on` | Last modification timestamp |
| `sys_created_by` | Original creator |
| `sys_created_on` | Original creation timestamp |

### 3.5 Custom Fields (Optional Scoped App)

If building a scoped app, add these fields to track AgentDock metadata:

| Custom Field | Type | Purpose |
|--------------|------|---------|
| `u_agentdock_agent_id` | string | Which AgentDock agent processed this |
| `u_agentdock_workflow_id` | string | Which workflow was executed |
| `u_agentdock_approval_status` | choice | pending/approved/rejected |
| `u_agentdock_approval_by` | ref (sys_user) | Who approved the action |
| `u_agentdock_approval_at` | datetime | When approved |
| `u_agentdock_conflict_flag` | boolean | Conflict detected with another agent |

---

## 4. Compliance Requirements

### 4.1 ServiceNow Audit Trail

ServiceNow provides built-in audit capabilities:

| Feature | Description | AgentDock Usage |
|---------|-------------|-----------------|
| **Audit Log** (`sys_audit`) | Tracks all field-level changes | Read for cross-reference |
| **System Log** (`syslog`) | Platform events and errors | Monitor for integration issues |
| **Update Sets** | Tracks configuration changes | Not relevant for runtime |
| **Field History** | Per-field change history | Supplement AgentDock audit |

**ServiceNow audit log fields:**
- `tablename` — which table changed
- `documentkey` — sys_id of the changed record
- `fieldname` — which field changed
- `oldvalue` / `newvalue` — before and after
- `created` / `created_by` — when and who

**AgentDock must:**
1. Log every API call (method, endpoint, status, timestamp)
2. Log every record read/write (sys_id, fields changed)
3. Log every approval decision (who, when, what)
4. Store audit logs independently of ServiceNow (self-hosted)
5. Export audit logs as CSV (compliance-ready format)

### 4.2 Data Residency

| Requirement | Detail | AgentDock Action |
|-------------|--------|------------------|
| **UK Data Residency** | Telecom complaints contain PII; must stay in UK | Self-host in UK region (AWS eu-west-2, Azure UK South) |
| **ServiceNow Instance Location** | Customer's SN instance may be in any region | No control — customer responsibility |
| **Data in Transit** | All API calls must use TLS 1.2+ | Enforce HTTPS, reject HTTP |
| **Data at Rest** | Audit logs and cached data must be encrypted | Encrypt database, encrypt token storage |
| **Data Retention** | Audit logs retained per customer policy (default: 1 year) | Configurable retention, auto-purge |
| **Data Deletion** | Right to erasure (GDPR Article 17) | Support deletion requests, log deletions |

### 4.3 FCA/Ofcom Compliance for Telecom Complaints

**FCA (Financial Conduct Authority) — if complaint involves billing/payments:**

| Requirement | Detail |
|-------------|--------|
| **DISP 1.6** | Firms must maintain adequate records of complaints |
| **DISP 1.6.1R** | Records must include: complaint details, redress offered, final response |
| **DISP 1.6.2R** | Records retained for 5 years minimum |
| **DISP 1.4** | Complaints must be handled promptly and fairly |
| **DISP 1.5** | Final response must include FOS (Financial Ombudsman) reference |

**Ofcom (Telecoms) — General Conditions of Entitlement:**

| Requirement | Detail |
|-------------|--------|
| **C1.7-C1.10** | Complaints handling procedures must be published and followed |
| **C1.8** | Complaints must be handled free of charge |
| **C1.9** | Customers must receive a response within a reasonable timeframe |
| **General Condition 15** | Dispute resolution — must inform customers of ADR schemes |
| **8-week rule** | If unresolved after 8 weeks, customer can escalate to Ombudsman |

**AgentDock Compliance Checklist:**

| # | Requirement | Status | Notes |
|---|-------------|--------|-------|
| 1 | Every complaint logged with timestamp | MVP | Built into audit log |
| 2 | Every action attributed to an agent/human | MVP | Agent ID + user ID in audit |
| 3 | Approval gate before customer-facing actions | MVP | Review Gate component |
| 4 | Audit trail exportable (CSV) | MVP | CSV export feature |
| 5 | Audit logs retained minimum 1 year (configurable) | MVP | Default 1 year, extendable |
| 6 | Audit logs tamper-evident | V1 | Hash chaining for immutability |
| 7 | PII encrypted at rest | MVP | Database encryption |
| 8 | PII encrypted in transit | MVP | TLS 1.2+ enforced |
| 9 | Data residency configurable (UK default) | MVP | Self-hosted in UK |
| 10 | Deletion requests supported | V1 | GDPR Article 17 compliance |
| 11 | SLA tracking visible | V1 | SLA risk indicator on task cards |
| 12 | 8-week escalation flag | V1 | Automatic flag at 7 weeks |
| 13 | FOS/ADR reference tracking | V1 | Custom field for ombudsman ref |
| 14 | Complaint categorization standard | V1 | Map to Ofcom complaint categories |

---

## 5. Implementation Approach

### 5.1 Decision: Standalone Connector (NOT Scoped App)

**Why standalone:**

| Factor | Standalone Connector | Scoped App |
|--------|---------------------|------------|
| Development speed | Days | Weeks |
| Deployment | No SN admin needed | SN admin + deployment |
| Maintenance | AgentDock team | Customer SN team |
| Multi-instance | One connector, many customers | Deploy per customer |
| Updates | Push updates centrally | Customer must upgrade |
| MVP readiness | YES | NO |
| Customer friction | Low (just auth) | High (install + configure) |
| Custom logic | In AgentDock backend | In ServiceNow server-side JS |

**Architecture:**

```
┌──────────────────────────────────────────────────────┐
│                    AgentDock Backend                  │
│                                                       │
│  ┌─────────────┐    ┌──────────────┐    ┌──────────┐ │
│  │ Connector   │    │ Task Engine  │    │ Audit    │ │
│  │ Manager     │───>│ (Pipeline)   │───>│ Logger   │ │
│  │             │    │              │    │          │ │
│  │ - Auth      │    │ - Triage     │    │ - CSV    │ │
│  │ - Retry     │    │ - Draft      │    │ - Export │ │
│  │ - Rate      │    │ - Review     │    │ - Hash   │ │
│  │   limiting  │    │ - Send       │    │   chain  │ │
│  │ - Mapping   │    │ - Log        │    │          │ │
│  └──────┬──────┘    └──────────────┘    └──────────┘ │
│         │                                              │
│         │  REST API (Table API)                       │
│         │  Webhook (Flow Designer outbound)           │
│         ▼                                              │
└──────────────────────────────────────────────────────┘
                    │
                    │  HTTPS / OAuth 2.0
                    ▼
┌──────────────────────────────────────────────────────┐
│              Customer ServiceNow Instance             │
│                                                       │
│  Tables: incident, sn_customerservice_case,          │
│          sys_user, sys_user_group                    │
│                                                       │
│  Webhooks: Flow Designer → AgentDock endpoint        │
└──────────────────────────────────────────────────────┘
```

### 5.2 Fastest Path to MVP

**Week 1: Authentication + Basic CRUD**
- [ ] OAuth 2.0 flow implementation
- [ ] Table API wrapper (GET, POST, PATCH)
- [ ] Rate limiter (100 req/15s)
- [ ] Error handler with retry logic
- [ ] Test against ServiceNow PDI (Personal Developer Instance)

**Week 2: Data Sync + Pipeline Integration**
- [ ] Poll incidents/cases on schedule (every 30s)
- [ ] Map ServiceNow fields → AgentDock tasks
- [ ] Create tasks in pipeline on new incidents
- [ ] Update task status on ServiceNow state changes
- [ ] Webhook endpoint for real-time updates

**Week 3: Actions + Audit**
- [ ] Update incident state from AgentDock
- [ ] Add work notes from agent actions
- [ ] Add customer comments (approval-gated)
- [ ] Audit log every action
- [ ] CSV export

**Week 4: Polish + Testing**
- [ ] Conflict detection (two agents, same ticket)
- [ ] SLA deadline display
- [ ] Error UI (connection lost, auth expired)
- [ ] End-to-end test on PDI
- [ ] Documentation

### 5.3 Connector Plugin Architecture

Following the existing connector architecture from `System Connectors.md`:

```typescript
// types/connector.ts
interface ConnectorConfig {
  id: string;
  name: string;
  type: 'servicenow' | 'zendesk' | 'jira' | 'email' | 'webhook';
  status: 'connected' | 'error' | 'disconnected';
  auth: AuthConfig;
  dataMapper: DataMapper;
  webhookUrl?: string;
}

interface AuthConfig {
  type: 'oauth2' | 'basic' | 'apikey';
  credentials: Record<string, string>; // encrypted
  tokenExpiry?: Date;
}

interface DataMapper {
  sourceFields: string[];    // ServiceNow field names
  targetFields: string[];    // AgentDock field names
  transform: (source: Record<string, any>) => Record<string, any>;
}

// connectors/servicenow.ts
class ServiceNowConnector {
  private config: ConnectorConfig;
  private rateLimiter: RateLimiter;
  private tokenManager: TokenManager;

  async authenticate(): Promise<void>;
  async fetchIncidents(query?: string): Promise<Incident[]>;
  async fetchCases(query?: string): Promise<Case[]>;
  async createIncident(data: Partial<Incident>): Promise<Incident>;
  async updateIncident(sysId: string, data: Partial<Incident>): Promise<Incident>;
  async addWorkNote(sysId: string, note: string): Promise<void>;
  async addComment(sysId: string, comment: string): Promise<void>;
  async fetchUser(sysId: string): Promise<User>;
  async fetchGroup(sysId: string): Promise<Group>;
}
```

---

## 6. Code Examples

### 6.1 Authentication — OAuth 2.0 Token Exchange

```typescript
// services/servicenow/auth.ts
import crypto from 'crypto';

interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
}

class ServiceNowAuth {
  private instance: string;
  private clientId: string;
  private clientSecret: string;
  private redirectUri: string;

  constructor(config: {
    instance: string;
    clientId: string;
    clientSecret: string;
    redirectUri: string;
  }) {
    this.instance = config.instance;
    this.clientId = config.clientId;
    this.clientSecret = config.clientSecret;
    this.redirectUri = config.redirectUri;
  }

  // Step 1: Generate authorization URL
  getAuthorizationUrl(state?: string): string {
    const authState = state || crypto.randomBytes(16).toString('hex');
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      state: authState,
    });
    return `https://${this.instance}.service-now.com/oauth_auth.do?${params}`;
  }

  // Step 2: Exchange authorization code for tokens
  async exchangeCode(code: string): Promise<TokenResponse> {
    const response = await fetch(
      `https://${this.instance}.service-now.com/oauth_token.do`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          client_id: this.clientId,
          client_secret: this.clientSecret,
          redirect_uri: this.redirectUri,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Token exchange failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Step 3: Refresh access token
  async refreshToken(refreshToken: string): Promise<TokenResponse> {
    const response = await fetch(
      `https://${this.instance}.service-now.com/oauth_token.do`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
          client_id: this.clientId,
          client_secret: this.clientSecret,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Token refresh failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }
}
```

### 6.2 Table API — Fetch Incidents (Complaints)

```typescript
// services/servicenow/table-api.ts
interface ServiceNowIncident {
  sys_id: string;
  number: string;
  short_description: string;
  description: string;
  state: string;
  priority: string;
  assigned_to: { value: string; display_value: string } | null;
  assignment_group: { value: string; display_value: string } | null;
  caller_id: { value: string; display_value: string } | null;
  category: string;
  subcategory: string;
  impact: string;
  urgency: string;
  opened_at: string;
  closed_at: string | null;
  work_notes: string | null;
  comments: string | null;
  sla_due: string | null;
  sys_updated_on: string;
  sys_updated_by: string;
}

interface FetchOptions {
  query?: string;
  fields?: string[];
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

class ServiceNowTableAPI {
  private instance: string;
  private getAccessToken: () => Promise<string>;

  constructor(instance: string, getAccessToken: () => Promise<string>) {
    this.instance = instance;
    this.getAccessToken = getAccessToken;
  }

  private async request<T>(
    method: string,
    table: string,
    options?: { body?: Record<string, any>; queryParams?: URLSearchParams }
  ): Promise<T> {
    const token = await this.getAccessToken();
    const params = options?.queryParams || new URLSearchParams();
    const url = `https://${this.instance}.service-now.com/api/now/table/${table}?${params}`;

    const response = await fetch(url, {
      method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: options?.body ? JSON.stringify(options.body) : undefined,
    });

    if (response.status === 401) {
      // Token expired — caller should refresh and retry
      throw new Error('AUTH_EXPIRED');
    }

    if (response.status === 429) {
      // Rate limited — retry after header
      const retryAfter = response.headers.get('retry-after') || '15';
      throw new Error(`RATE_LIMITED: retry after ${retryAfter}s`);
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: response.statusText }));
      throw new Error(`ServiceNow API error: ${error.error?.message || response.statusText}`);
    }

    return response.json();
  }

  // Fetch incidents with filtering
  async fetchIncidents(options: FetchOptions = {}): Promise<ServiceNowIncident[]> {
    const params = new URLSearchParams();

    if (options.query) {
      params.set('sysparm_query', options.query);
    }
    if (options.fields) {
      params.set('sysparm_fields', options.fields.join(','));
    }
    if (options.limit) {
      params.set('sysparm_limit', String(options.limit));
    }
    if (options.offset) {
      params.set('sysparm_offset', String(options.offset));
    }
    if (options.sortBy) {
      params.set('sysparm_orderby', `${options.sortOrder === 'desc' ? 'DESC:' : ''}${options.sortBy}`);
    }

    const result = await this.request<{ result: ServiceNowIncident[] }>(
      'GET',
      'incident',
      { queryParams: params }
    );

    return result.result;
  }

  // Fetch a single incident by sys_id
  async fetchIncidentById(sysId: string): Promise<ServiceNowIncident> {
    const result = await this.request<{ result: ServiceNowIncident }>(
      'GET',
      `incident/${sysId}`
    );
    return result.result;
  }

  // Fetch a single incident by number (e.g., INC0012345)
  async fetchIncidentByNumber(number: string): Promise<ServiceNowIncident> {
    const params = new URLSearchParams({
      sysparm_query: `number=${number}`,
      sysparm_limit: '1',
    });

    const result = await this.request<{ result: ServiceNowIncident[] }>(
      'GET',
      'incident',
      { queryParams: params }
    );

    if (result.result.length === 0) {
      throw new Error(`Incident ${number} not found`);
    }

    return result.result[0];
  }
}
```

### 6.3 Create Incident

```typescript
// services/servicenow/incidents.ts
async createIncident(data: {
  short_description: string;
  description: string;
  caller_id?: string;       // sys_user sys_id
  category?: string;
  subcategory?: string;
  priority?: number;
  assignment_group?: string; // sys_user_group sys_id
}): Promise<ServiceNowIncident> {
  const body: Record<string, any> = {
    short_description: data.short_description,
    description: data.description,
  };

  if (data.caller_id) body.caller_id = data.caller_id;
  if (data.category) body.category = data.category;
  if (data.subcategory) body.subcategory = data.subcategory;
  if (data.priority) body.priority = String(data.priority);
  if (data.assignment_group) body.assignment_group = data.assignment_group;

  const result = await this.request<{ result: ServiceNowIncident }>(
    'POST',
    'incident',
    { body }
  );

  return result.result;
}
```

### 6.4 Update Incident State

```typescript
async updateIncidentState(
  sysId: string,
  state: number,
  workNote?: string
): Promise<ServiceNowIncident> {
  const body: Record<string, any> = {
    state: String(state),
  };

  if (workNote) {
    body.work_notes = workNote;
  }

  const result = await this.request<{ result: ServiceNowIncident }>(
    'PATCH',
    `incident/${sysId}`,
    { body }
  );

  return result.result;
}
```

### 6.5 Add Work Note (Internal)

```typescript
async addWorkNote(sysId: string, note: string): Promise<void> {
  await this.request(
    'PATCH',
    `incident/${sysId}`,
    {
      body: {
        work_notes: `[AgentDock] ${note}`,
      },
    }
  );
}
```

### 6.6 Add Customer Comment (Approval-Gated)

```typescript
async addCustomerComment(
  sysId: string,
  comment: string,
  approvedBy: string,
  approvedAt: Date
): Promise<void> {
  // Only post customer-facing comments that have been approved
  const formattedComment = [
    comment,
    '',
    `---`,
    `This response was reviewed and approved by ${approvedBy} at ${approvedAt.toISOString()}`,
  ].join('\n');

  await this.request(
    'PATCH',
    `incident/${sysId}`,
    {
      body: {
        comments: formattedComment,
        work_notes: `Customer response sent (approved by ${approvedBy})`,
      },
    }
  );
}
```

### 6.7 Polling with Rate Limiting

```typescript
// services/servicenow/sync.ts
class ServiceNowSync {
  private tableAPI: ServiceNowTableAPI;
  private lastSyncTime: Date;
  private isSyncing: boolean;

  constructor(tableAPI: ServiceNowTableAPI) {
    this.tableAPI = tableAPI;
    this.lastSyncTime = new Date(Date.now() - 300000); // 5 min ago initial
    this.isSyncing = false;
  }

  async sync(): Promise<void> {
    if (this.isSyncing) return;
    this.isSyncing = true;

    try {
      // Query for incidents updated since last sync
      const query = `sys_updated_on>=${this.formatDate(this.lastSyncTime)}^ORDERBYsys_updated_on`;

      const incidents = await this.tableAPI.fetchIncidents({
        query,
        fields: [
          'sys_id', 'number', 'short_description', 'description',
          'state', 'priority', 'assigned_to', 'assignment_group',
          'caller_id', 'category', 'subcategory', 'impact', 'urgency',
          'opened_at', 'closed_at', 'work_notes', 'comments',
          'sla_due', 'sys_updated_on', 'sys_updated_by',
        ],
        limit: 100,
      });

      for (const incident of incidents) {
        await this.processIncident(incident);
      }

      this.lastSyncTime = new Date();
    } catch (error) {
      if (error.message === 'RATE_LIMITED') {
        // Wait and retry
        await this.sleep(15000);
        return this.sync();
      }
      throw error;
    } finally {
      this.isSyncing = false;
    }
  }

  private async processIncident(incident: ServiceNowIncident): Promise<void> {
    // Check if task exists in AgentDock
    const existingTask = await this.findTaskByExternalId(incident.sys_id);

    if (!existingTask) {
      // New incident — create task
      await this.createTask(incident);
    } else {
      // Existing — check for state changes
      await this.updateTask(incident, existingTask);
    }
  }

  private formatDate(date: Date): string {
    return date.toISOString().replace('T', ' ').replace('Z', '');
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Stub methods — implement with your task/audit system
  private async findTaskByExternalId(id: string) { return null; }
  private async createTask(incident: ServiceNowIncident) {}
  private async updateTask(incident: ServiceNowIncident, existingTask: any) {}
}
```

### 6.8 Webhook Handler (Flow Designer → AgentDock)

```typescript
// routes/webhooks/servicenow.ts
import express from 'express';

const router = express.Router();

// Webhook endpoint for ServiceNow Flow Designer
router.post('/servicenow', async (req, res) => {
  const {
    sys_id,
    number,
    state,
    table_name,
    event,
  } = req.body;

  // Verify webhook source (shared secret or IP allowlist)
  const isValid = await verifyWebhookSignature(req);
  if (!isValid) {
    return res.status(401).json({ error: 'Invalid webhook signature' });
  }

  try {
    // Trigger task sync for the changed record
    await triggerSync(sys_id, table_name);

    // Log the webhook event
    await logAuditEntry({
      type: 'webhook_received',
      source: 'servicenow',
      table: table_name,
      recordId: sys_id,
      number,
      event,
      timestamp: new Date(),
    });

    res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ error: 'Processing failed' });
  }
});

async function verifyWebhookSignature(req: express.Request): Promise<boolean> {
  // Option 1: Shared secret in header
  const signature = req.headers['x-servicenow-signature'];
  if (signature) {
    const expected = crypto
      .createHmac('sha256', process.env.SN_WEBHOOK_SECRET!)
      .update(JSON.stringify(req.body))
      .digest('hex');
    return signature === expected;
  }

  // Option 2: IP allowlist
  const ip = req.ip;
  const allowedIps = process.env.SN_WEBHOOK_IPS?.split(',') || [];
  return allowedIps.includes(ip);
}

export default router;
```

---

## 7. Recommended Implementation Summary

### MVP Approach

1. **Standalone connector** using Table API — no ServiceNow-side code required
2. **OAuth 2.0** for production, Basic Auth for dev/testing only
3. **Polling + webhooks** for real-time sync (poll every 30s, webhooks for instant updates)
4. **Work notes** for internal audit trail, **comments** for customer-facing (approval-gated)
5. **Self-hosted** in UK region for data residency compliance
6. **CSV audit export** from day one — compliance-ready format

### What to Build First (Ordered)

| Priority | Component | Effort | Blocks |
|----------|-----------|--------|--------|
| 1 | OAuth 2.0 auth flow | 2 days | Everything |
| 2 | Table API wrapper (GET/POST/PATCH) | 2 days | Data sync |
| 3 | Rate limiter + retry logic | 1 day | Reliability |
| 4 | Incident → Task mapper | 2 days | Pipeline |
| 5 | Polling sync service | 2 days | Real-time updates |
| 6 | Work note/comment writer | 1 day | Agent actions |
| 7 | Webhook endpoint | 1 day | Instant triggers |
| 8 | Audit logger + CSV export | 2 days | Compliance |
| 9 | Error handling + UI | 2 days | UX |
| 10 | End-to-end testing on PDI | 3 days | Launch |

**Total: ~17 working days (3.5 weeks)**

### ServiceNow PDI Setup (for testing)

1. Go to https://developer.servicenow.com/
2. Sign up for free account
3. Request a Personal Developer Instance (PDI) — latest release
4. Instance URL: `{your-choice}.service-now.com`
5. Admin credentials provided via email
6. Create test incidents manually or via API
7. Test AgentDock connector against PDI

---

## 8. Risks and Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| ServiceNow API rate limiting | High | Medium | Queue requests, implement backoff, batch where possible |
| Customer SN instance has custom ACLs | Medium | High | Document required permissions, provide setup guide |
| OAuth setup requires SN admin | Medium | High | Provide step-by-step guide with screenshots |
| Custom ServiceNow tables (not standard incident) | Medium | Medium | Support configurable table names in connector config |
| Data residency requirements vary by customer | Low | Low | Self-hosted architecture allows per-customer region |
| ServiceNow API changes between versions | Low | Low | Table API is stable; pin to minimum supported version |
| Competitor builds ServiceNow connector first | High | Medium | Move fast — 3.5 week MVP timeline |

---

## Connections

- [[MVP Scope]]
- [[System Connectors]]
- [[Competitor Intel - 8th May 2026]]
- [[Complaint Compliance Notes]]
- [[Service Manager Persona]]
