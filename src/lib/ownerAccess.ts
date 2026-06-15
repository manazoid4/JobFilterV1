/**
 * Client-safe owner/superuser check.
 * Mirrors server/lib/ownerAccess.ts but without server-only env access —
 * grants the account owner unlimited scans and unlocked lead previews.
 */

const OWNER_EMAILS = new Set(['manazoid4@gmail.com']);

export function isOwnerEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return OWNER_EMAILS.has(email.trim().toLowerCase());
}
