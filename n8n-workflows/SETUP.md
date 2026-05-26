# n8n Setup for JobFilter

## 1. Install n8n (Community Edition — free, local)

```bash
npm install -g n8n
n8n start
```

Opens at http://localhost:5678. Create account on first run (local only, no cloud needed).

Or with Docker:
```bash
docker run -it --rm --name n8n -p 5678:5678 -v ~/.n8n:/home/node/.n8n docker.n8n.io/n8nio/n8n
```

---

## 2. Import a Workflow

1. Open http://localhost:5678
2. Click **Workflows** → **Add workflow**
3. Click **⋮** menu (top right) → **Import from file**
4. Select a `.json` file from this folder
5. Click **Save**

---

## 3. Configure After Import

Every workflow has a `_readme.configure` array in the JSON listing exactly what to change.

### Fields to change in every workflow

| Field | Node | What to set |
|-------|------|-------------|
| `postcode` | HTTP Request or Set Config | Your UK postcode e.g. `M1 1AA` |
| `trade` | HTTP Request or Set Config | `plumbing` `electrical` `roofing` `building` `carpentry` `painting` `hvac` `landscaping` |
| `radiusMiles` | HTTP Request or Set Config | `1` to `100` |
| `url` | HTTP Request | Change `localhost:3000` to your deployed server |
| SMTP credential | Email Send node | See below |

### Add SMTP credential

1. n8n → **Settings** → **Credentials** → **Add Credential** → search SMTP
2. For Gmail: use an App Password (Google Account → Security → App passwords)
3. Attach credential to each Send Email node

---

## 4. Workflows

| File | Trigger | What it does |
|------|---------|-------------|
| `01-daily-lead-digest.json` | Mon–Fri 7am | Searches leads, ranks by score, emails top 10 with gold leads highlighted |
| `02-ready-signal-alert.json` | Every 2 hours | Checks start signals, fires email only when READY signals found |
| `03-multi-trade-sweep.json` | Every Monday 8am | Loops all configured trades, aggregates, sends one combined weekly report |

---

## 5. Test Without Waiting for Schedule

Open workflow → click **Test workflow** (top right) → runs immediately, shows node output.

---

## 6. Run n8n in Background (Windows)

```powershell
pm2 start n8n --interpreter none
pm2 save && pm2 startup
```

Install pm2 first: `npm install -g pm2`

---

## 7. Swap Email for Other Channels

### Slack
1. n8n Credentials → Add → **Slack** → paste OAuth token (xoxb-...) or use Incoming Webhook
2. In workflow: delete `Send Email Digest` node
3. Add **Slack → Send a message**, wire prior node into it
4. Channel: `#jobfilter-leads` (or DM)
5. Text:
   ```
   ={{ '*JobFilter ' + $json.goldCount + ' gold / ' + $json.count + ' total*' }}
   ```
6. Rich layout: set Blocks w/ Slack block kit JSON.

### Telegram
1. `@BotFather` on Telegram → `/newbot` → save bot token
2. Send a message to bot, then `https://api.telegram.org/bot<TOKEN>/getUpdates` → grab `chat.id`
3. n8n Credentials → Add → **Telegram** → paste token
4. Replace email node w/ **Telegram → Send Message**
5. Chat ID: `<numeric id>`. Text expression. Parse mode `MarkdownV2` if using `*bold*` / `` `code` ``.

### Webhook push (Discord / custom CRM)
- Replace email node w/ **HTTP Request → POST**
- Body: JSON. For Discord, paste Discord webhook URL, body `{"content":"{{ $json.summary }}"}`

---

## 8. Centralised Variables Config

n8n **Settings → Variables**. Set once, reference everywhere.

| Variable | Example | Used by |
|----------|---------|---------|
| `JOBFILTER_SERVER_URL` | `http://localhost:3000` | all HTTP nodes |
| `JOBFILTER_POSTCODE` | `M1 1AA` | 01, 02 |
| `JOBFILTER_RADIUS` | `20` | 01, 02 |
| `JOBFILTER_TRADES` | `["plumbing","electrical","roofing"]` | 03, 15 |
| `VAULT_PATH` | `C:/Users/manaz/Desktop/JobFilter/JobFilterV1/Obsidian_Memory/Obsidian_Vault` | all file-writing Code nodes |
| `NOTIFY_EMAIL` | `manazoid4@gmail.com` | email nodes |
| `SLACK_CHANNEL` | `#jobfilter-leads` | Slack nodes |
| `TELEGRAM_CHAT_ID` | `123456789` | Telegram nodes |

Reference: `{{ $vars.JOBFILTER_SERVER_URL }}`. One edit → all workflows update.

---

## 9. FULL_ACCESS_TEST_MODE toggle

Server `.env` flag unlocks paid-tier preview locally (test agent 02 + start-signals without Stripe subscription).

```bash
node scripts/test-mode.mjs status
node scripts/test-mode.mjs on
node scripts/test-mode.mjs off
node scripts/test-mode.mjs toggle
```

Restart server after toggle.

---

## 10. API Endpoints (by agent)

| Endpoint | Method | Body | Used by |
|----------|--------|------|---------|
| `/api/leads/search` | POST | `{ postcode, trade, radiusMiles }` | 01, 03, 15 |
| `/api/start-signals/search` | POST | same | 02 |
| `/api/start-signals/:id/feedback` | POST | `{ status }` | 06 |
| `/api/start-signals/sources` | GET | — | 14 |
| `/api/intake-score` | POST | scoring input | 12 |
| `/api/chase-check` | POST | `{ buckets, total }` | 11 |
| `/api/material-prices` | GET | — | 07 |
| `/api/territory-summary` | GET | — | 08 |
| `/api/waitlist-count` | GET | — | 09, 16 |
| `/api/calendar-export` | GET | — | 13 |
| `/api/status` | GET | — | 14, 16 |
| `/api/health` | GET | — | 16 |
