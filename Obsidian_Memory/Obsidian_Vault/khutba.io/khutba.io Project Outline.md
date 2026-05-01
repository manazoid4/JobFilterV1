# khutba.io Project Outline

## Links
- [[khutba.io Overview]]
- [[khutba.io APIs]]
- [[khutba.io Map]]

## Phase 1 — MVP (weeks 1–3)
| Task | Detail |
|---|---|
| Live speech capture | Browser mic → WebSocket stream |
| Speech-to-text | [[khutba.io APIs#Speech-to-Text\|Deepgram]] streaming |
| Translation | [[khutba.io APIs#Translation\|Google Translate API]] |
| Display screen | Full-screen auto-scroll React app |
| Languages | Arabic + English + Urdu |

## Phase 2 — Masjid Ready (weeks 4–6)
| Task | Detail |
|---|---|
| Admin dashboard | Set languages, font size, layout |
| Presenter control | Start/stop from phone |
| Personal device | Congregation follows on own phone |
| Masjid branding | Logo on screen |

## Phase 3 — Growth (weeks 7–12)
| Task | Detail |
|---|---|
| Stripe billing | Monthly sub per masjid |
| Archive | Searchable recorded khutbas |
| More languages | Somali, Bengali, Turkish |
| Analytics | Language usage, attendance |

## Tech Stack
| Layer | Tech |
|---|---|
| Frontend | React + Vite + TailwindCSS |
| Backend | Node/Express |
| STT | Deepgram |
| Translation | Google Translate API |
| Realtime | Socket.io |
| DB | Supabase |
| Billing | Stripe |
| Hosting | Vercel + Railway |
