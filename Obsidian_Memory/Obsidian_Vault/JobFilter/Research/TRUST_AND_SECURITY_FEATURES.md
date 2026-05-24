# Trust and Security Features

## Philosophy

Trust is not a feature. It is the foundation.

Every system, badge, and page must answer:
> "How does this increase trust and reduce wasted time for a skeptical UK tradesman?"

---

## Trust Architecture

### Layer 1: Data Trust
| Feature | Implementation | User Impact |
|---------|---------------|-------------|
| Official Source Badging | Label every lead with source category | User knows signal is real, not scraped |
| Timestamp Verification | Show when signal was detected | Proves freshness |
| Cross-Reference Check | Multiple sources confirming same property | Reduces false positives |
| Data Freshness Indicator | Hours/days since signal | Old signals are less valuable |

### Layer 2: Lead Trust
| Feature | Implementation | User Impact |
|---------|---------------|-------------|
| Serious Buyer Score | 0-100 algorithmic score | Quantifies intent |
| Ghost Risk Rating | LOW / MEDIUM / HIGH | Warns before waste |
| Planning Verified | Planning application exists | Homeowner has invested |
| Budget Band | Estimated value range | Matches quote readiness |
| Timeline Confidence | Urgency indicator | Aligns scheduling |

### Layer 3: Platform Trust
| Feature | Implementation | User Impact |
|---------|---------------|-------------|
| 30-Day Money-Back Guarantee | No-questions refund policy | Removes financial risk |
| No Shared Leads | Exclusive delivery per trade/territory | No bidding wars |
| Built in Birmingham | Local origin story | Not a faceless startup |
| Public Changelog | Visible product updates | Shows active development |
| GDPR Compliance | Clear privacy policy | Legal confidence |

### Layer 4: Operator Trust
| Feature | Implementation | User Impact |
|---------|---------------|-------------|
| Field Notes | Weekly tactical insights | Human expertise |
| Trade Intelligence Briefings | Market analysis | Industry authority |
| Direct Support | WhatsApp/email access | Personal accountability |
| Founder Access | Manazir visible in communications | Real person behind brand |

---

## Security Measures

### Data Handling
- All data sourced from Open Government Licence or public registers.
- No scraping of private homeowner data.
- UPRN used as internal join key, never exposed.
- Property addresses truncated to postcode level for privacy.

### API Security
- Rate limiting on all endpoints.
- No exposed API keys in frontend code.
- Firebase security rules for lead access.
- Stripe for payment processing (PCI compliance handled by Stripe).

### User Data
- Minimal data collection: name, trade, contact, postcode.
- No selling of user data to third parties.
- Right to deletion on request.
- Data retention: 12 months for inactive accounts.

---

## Trust Center Page Structure

### Sections
1. **Our Promise** — one sentence guarantee.
2. **How Scoring Works** — simplified methodology.
3. **Data Sources** — category list, no API details.
4. **Anti-Ghost Philosophy** — why we filter, not maximise volume.
5. **Privacy First** — GDPR summary.
6. **Fair Use & Refunds** — 30-day policy.
7. **Public Changelog** — recent updates.
8. **Contact** — direct support channels.

---

## Trust Badge System (Overview)

See full specification in `TRUST_BADGE_SYSTEM.md`.

Quick reference:
- Planning Verified
- Recently Approved
- Ownership Confidence
- Lead Freshness
- Serious Buyer Score
- Not Shared Lead
- Budget Band
- Retrofit Trigger
- Tender Verified
- Ghost Risk Score

---

## Implementation Priority

| Priority | Feature | Effort |
|----------|---------|--------|
| P0 | Remove tool paywall | 1 hour |
| P0 | Fix mobile rendering | 2 hours |
| P1 | Add trust badges to lead cards | 4 hours |
| P1 | Build Trust Center page | 4 hours |
| P2 | Implement Ghost Risk scoring | 8 hours |
| P2 | Add data source labels | 2 hours |
| P3 | Public changelog | 2 hours |
| P3 | Field Notes system | 8 hours |
