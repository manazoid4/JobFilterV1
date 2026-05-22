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

- **Slack**: replace `emailSend` node with `n8n-nodes-base.slack` + webhook URL
- **Telegram**: `n8n-nodes-base.telegram` + bot token
- **Webhook push**: `n8n-nodes-base.httpRequest` POST to your own endpoint

---

## 8. API Endpoints Used

| Endpoint | Method | Required body |
|----------|--------|---------------|
| `/api/leads/search` | POST | `{ postcode, trade, radiusMiles }` |
| `/api/start-signals/search` | POST | `{ postcode, trade, radiusMiles }` |
| `/api/health` | GET | — |

Set `FULL_ACCESS_TEST_MODE=true` in server `.env` to test start-signals locally without paid tier.
