# Complaint Compliance Notes

Updated: 6 May 2026

## Product Position

AgentDock should not claim to make customers compliant.

It should track complaint clocks, evidence gaps, approval status, and escalation risk so managers can act before deadlines become surprises.

## FCA Timers

- Summary resolution route: complaints resolved by close of the third business day after receipt.
- Standard final response: normally within 8 weeks.
- Payment services / e-money complaints: normally within 15 business days, with an outer 35-business-day limit where exceptional delay is explained.

Sources:

- FCA DISP 1.5
- FCA DISP 1.6

## Telecom Timers

- UK telecom complaints can move toward ADR after 8 weeks or deadlock.
- Irish telecom providers operate under ComReg complaint-handling expectations and published codes of practice.

Sources:

- Ofcom complaints guidance
- Ofcom ADR scheme guidance
- ComReg complaints guidance

## Glide-Style Operator Context

Glide is a UK managed connectivity provider. Use only as market context, not as a customer claim.

Relevant environment:

- Managed Wi-Fi
- Broadband
- Student accommodation
- Build-to-rent
- Business connectivity
- Field operations
- Billing disputes
- SLA pressure
- Repeat complaints

## AgentDock Rules

- Track complaint age by source system.
- Keep jurisdiction explicit: FCA, Ofcom, ComReg, internal SLA, or customer contract.
- Never auto-send final responses.
- Route financial redress, credits, deadlock letters, and final responses through Review Gate.
- Log who approved what, when, and from which evidence.

