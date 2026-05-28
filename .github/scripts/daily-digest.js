#!/usr/bin/env node
/**
 * JobFilter Daily Digest
 * Fetches all commits from the last 24h, categorises them,
 * and sends an HTML digest email via Resend.
 *
 * Required env vars (GitHub Secrets):
 *   RESEND_API_KEY        — from resend.com dashboard
 *   DIGEST_TO_EMAIL       — recipient (e.g. manazoid4@gmail.com)
 *   DIGEST_FROM_EMAIL     — verified Resend sender (e.g. digest@jobfilter.uk)
 *   GH_TOKEN              — auto-provided by GitHub Actions as GITHUB_TOKEN
 */

const REPO = process.env.GITHUB_REPOSITORY || 'manazoid4/JobFilterV1';
const GH_TOKEN = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const TO_EMAIL = process.env.DIGEST_TO_EMAIL || 'manazoid4@gmail.com';
const FROM_EMAIL = process.env.DIGEST_FROM_EMAIL || 'digest@jobfilter.uk';

// ── Fetch commits from the last 24 hours ──────────────────────────────────────

async function getCommits() {
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const url = `https://api.github.com/repos/${REPO}/commits?since=${since}&per_page=100`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${GH_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  if (!res.ok) throw new Error(`GitHub API error: ${res.status} ${await res.text()}`);
  return res.json();
}

// ── Categorise by commit message prefix ──────────────────────────────────────

const CATEGORIES = [
  { label: '🐛 Bug Fixes',        pattern: /^\[fix\]|^fix:|^bugfix/i },
  { label: '✨ New Features',     pattern: /^\[feat\]|^feat:|^add |^new /i },
  { label: '🧭 Navigation',       pattern: /nav|navigation|menu|topnav/i },
  { label: '🏠 Homepage',         pattern: /homepage|hero|landing/i },
  { label: '📱 Mobile',           pattern: /mobile|responsive/i },
  { label: '💰 Pricing',          pattern: /pricing|price|revenue|stripe/i },
  { label: '🔐 Auth',             pattern: /auth|login|signup|password|account/i },
  { label: '🤖 Agent Runs',       pattern: /NightlyBuildAgent|BuildAgent|\[vault\]|audit-agent/i },
  { label: '📋 Copy & Content',   pattern: /copy|content|text|claim|message|headline/i },
  { label: '🚀 Trades / Pages',   pattern: /trade|TradePage|trade page/i },
  { label: '🧠 Strategy & Vault', pattern: /vault|obsidian|expansion plan|strategy/i },
  { label: '⚙️ Config & CI',      pattern: /config|workflow|ci|deploy|vercel|tailwind|postcss/i },
  { label: '🔧 Refactor',         pattern: /refactor|cleanup|clean up|polish|tidy/i },
];

function categorise(commits) {
  const buckets = {};
  const uncategorised = [];

  for (const commit of commits) {
    const msg = commit.commit.message.split('\n')[0]; // first line only
    // Skip merge commits
    if (/^Merge (branch|pull request)/i.test(msg)) continue;

    let matched = false;
    for (const { label, pattern } of CATEGORIES) {
      if (pattern.test(msg)) {
        if (!buckets[label]) buckets[label] = [];
        buckets[label].push({ msg, sha: commit.sha.slice(0, 7), author: commit.commit.author.name, url: commit.html_url });
        matched = true;
        break;
      }
    }
    if (!matched) {
      uncategorised.push({ msg, sha: commit.sha.slice(0, 7), author: commit.commit.author.name, url: commit.html_url });
    }
  }

  if (uncategorised.length) buckets['📦 Other'] = uncategorised;
  return buckets;
}

// ── Build HTML email ──────────────────────────────────────────────────────────

function buildEmail(buckets, total, since) {
  const dateStr = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  const categoryBlocks = Object.entries(buckets).map(([label, items]) => `
    <div style="margin-bottom:24px;">
      <h2 style="font-family:'Barlow Condensed',Arial,sans-serif;font-size:18px;font-weight:800;
                 text-transform:uppercase;letter-spacing:0.05em;color:#080808;
                 border-bottom:3px solid #E3B72A;padding-bottom:6px;margin:0 0 12px 0;">
        ${label}
      </h2>
      <ul style="margin:0;padding:0;list-style:none;">
        ${items.map(({ msg, sha, author, url }) => `
          <li style="padding:8px 0;border-bottom:1px solid #E8E5DA;font-size:14px;color:#2F2F2A;">
            <a href="${url}" style="color:#080808;font-weight:700;text-decoration:none;"
               onmouseover="this.style.color='#E3B72A'" onmouseout="this.style.color='#080808'">
              ${escHtml(msg)}
            </a>
            <span style="color:#888;font-size:12px;margin-left:8px;">${sha} · ${escHtml(author)}</span>
          </li>
        `).join('')}
      </ul>
    </div>
  `).join('');

  const noActivity = total === 0 ? `
    <p style="font-size:16px;color:#888;text-align:center;padding:40px 0;">
      No commits in the last 24 hours.
    </p>
  ` : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>JobFilter Daily Digest — ${dateStr}</title>
</head>
<body style="margin:0;padding:0;background:#F3F1EA;font-family:Barlow,Arial,sans-serif;">
  <div style="max-width:640px;margin:32px auto;background:#FFFDF4;border:3px solid #080808;
              box-shadow:6px 6px 0 #E3B72A;">

    <!-- Header -->
    <div style="background:#080808;padding:24px 32px;border-bottom:4px solid #E3B72A;">
      <p style="font-family:'Barlow Condensed',Arial,sans-serif;font-size:11px;font-weight:700;
                letter-spacing:0.12em;text-transform:uppercase;color:#E3B72A;margin:0 0 6px 0;">
        JOBFILTER DAILY DIGEST
      </p>
      <h1 style="font-family:'Barlow Condensed',Arial,sans-serif;font-size:32px;font-weight:800;
                 text-transform:uppercase;color:#FFFFFF;margin:0;line-height:1;">
        ${dateStr}
      </h1>
      <p style="font-size:13px;color:rgba(255,255,255,0.6);margin:8px 0 0 0;font-weight:600;">
        ${total} commit${total !== 1 ? 's' : ''} in the last 24 hours
      </p>
    </div>

    <!-- Stats bar -->
    <div style="background:#E3B72A;padding:12px 32px;display:flex;gap:24px;">
      <span style="font-size:12px;font-weight:800;text-transform:uppercase;color:#080808;">
        ✓ ${total} commits
      </span>
      <span style="font-size:12px;font-weight:800;text-transform:uppercase;color:#080808;">
        ✓ ${Object.keys(buckets).length} categories
      </span>
      <span style="font-size:12px;font-weight:800;text-transform:uppercase;color:#080808;">
        ✓ ${REPO}
      </span>
    </div>

    <!-- Body -->
    <div style="padding:32px;">
      ${noActivity}
      ${categoryBlocks}
    </div>

    <!-- Footer -->
    <div style="background:#080808;padding:16px 32px;border-top:3px solid #E3B72A;">
      <p style="font-size:11px;font-weight:700;text-transform:uppercase;
                letter-spacing:0.08em;color:rgba(255,255,255,0.5);margin:0;">
        JobFilter · Automated digest ·
        <a href="https://github.com/${REPO}/commits/main"
           style="color:#E3B72A;text-decoration:none;">View all commits →</a>
      </p>
    </div>

  </div>
</body>
</html>`;
}

function escHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ── Send via Resend API ───────────────────────────────────────────────────────

async function sendEmail(subject, html) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      subject,
      html,
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(`Resend error: ${JSON.stringify(data)}`);
  console.log(`✅ Digest sent to ${TO_EMAIL} — id: ${data.id}`);
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  if (!RESEND_API_KEY) throw new Error('RESEND_API_KEY secret is not set');

  console.log('Fetching commits from the last 24h...');
  const commits = await getCommits();
  console.log(`Found ${commits.length} commits`);

  const buckets = categorise(commits);
  const html = buildEmail(buckets, commits.length);
  const dateStr = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  const subject = `JobFilter Digest — ${commits.length} commit${commits.length !== 1 ? 's' : ''} · ${dateStr}`;

  await sendEmail(subject, html);
}

main().catch((err) => {
  console.error('❌ Digest failed:', err.message);
  process.exit(1);
});
