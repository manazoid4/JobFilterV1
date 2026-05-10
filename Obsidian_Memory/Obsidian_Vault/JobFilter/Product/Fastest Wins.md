# Fastest Wins

## 24 Hours

- Store the growth playbook and earliest buying-signal brief in the vault.
- Add full-access dev mode and dev portal for testing.
- Make `/api/leads/search` return full paid-mode lead details in test mode.
- Add Blueprint page explaining the UPRN graph and homeowner matching model.
- Add a visible homeowner pathway from homepage to `/post-job`.
- Create signal scoreboard and unfair advantage stack notes.

## 7 Days

- Build first UPRN graph table/model:
  - UPRN or stable property key
  - outward postcode
  - source events
  - source confidence
  - trade fit
  - latest activity date
  - score history
- Improve Planning Data connector:
  - recent applications
  - submitted/pending/consultation stages
  - no invented urgency deadlines
- Improve EPC connector:
  - F/G focus
  - property type
  - potential rating
  - floor area
  - retrofit value estimate
- Add one council weekly-list adapter for Birmingham/West Midlands.
- Add first scaffold/skip permit research adapter where official public data exists.

## 30 Days

- Build signal fusion:
  - planning + EPC + property value
  - planning + scaffold/skip
  - low EPC + affluent postcode + heat pump/solar trade fit
  - commercial licence + Companies House + fit-out keywords
- Add feedback loop:
  - lead opened
  - WhatsApp sent
  - tracked
  - quoted
  - won/lost
  - estimated value won
- Build PatchLock territory confidence score.
- Add direct-letter pack from selected Gold leads.
- Add compliant opt-out tracking for outreach.

## Cheap Stack

- Firebase Functions or Cloudflare Workers for scheduled fetchers
- Firestore/Supabase/Postgres for structured lead graph
- Google Sheets only for early manual review and QA
- n8n only for temporary source experimentation
- WhatsApp delivery via Twilio or Meta WhatsApp API

## Rule

Do not chase every source at once. Build one reliable signal path, score it well, then add fusion.
