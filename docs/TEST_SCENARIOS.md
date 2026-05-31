# JobFilter Test Scenarios

## Lead Search

1. Valid postcode and trade returns structured response.
   - Input: `B14 7QH`, `electrical`, `25`
   - Expect: `ok`, `source`, `count`, `region`, `outward`, `leads`, `errors`

2. Empty territory returns no fake leads.
   - Input: remote/low-signal postcode and trade
   - Expect: empty `leads`, structured reason, no placeholder data

3. Invalid postcode fails safely.
   - Input: `ABC`, `roofing`
   - Expect: validation error, no source fetch, no crash

## Lead Quality

4. Lead without contact path is not WhatsApp-ready.
   - Expect: status is review/rejected, not delivered

5. Duplicate source records collapse to one lead.
   - Expect: same source URL/reference does not appear twice

6. Higher urgency and higher value sort above low-value leads.
   - Expect: scoring order reflects urgency, value, proximity, completeness

## Monetisation

7. Free response redacts depth, not trust.
   - Expect: source and summary visible, contact/deeper action gated

8. Paid response includes full eligible lead details.
   - Expect: contact path, score reasons, priority, and next action available

## Delivery

9. WhatsApp payload is concise and actionable.
   - Expect: title, trade, location, value/urgency, source, next action

10. Weak source confidence blocks delivery.
    - Expect: no WhatsApp send for weak/unverified leads

## Production

11. Build and typecheck pass.
    - Command: `npm run lint && npm run build`

12. Server-only keys do not appear in client code.
    - Search for secret env names under browser/client files
