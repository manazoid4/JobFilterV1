#!/usr/bin/env node
/**
 * vault-digest.js
 * Generates a markdown digest of the last N hours of repo activity
 * and writes it to the Obsidian vault under Sessions/.
 *
 * Env vars:
 *   GH_TOKEN            — auto-provided by GitHub Actions
 *   GITHUB_REPOSITORY   — e.g. manazoid4/JobFilterV1
 *   HOURS               — how many hours back to cover (default 24)
 */

const fs = require('fs');
const path = require('path');

const REPO = process.env.GITHUB_REPOSITORY || 'manazoid4/JobFilterV1';
const GH_TOKEN = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
const HOURS = parseInt(process.env.HOURS || '24', 10);
const VAULT_DIR = path.join(
  process.cwd(),
  'Obsidian_Memory', 'Obsidian_Vault', 'JobFilter', 'Sessions'
);

const since = new Date(Date.now() - HOURS * 60 * 60 * 1000).toISOString();

const headers = {
  Authorization: `Bearer ${GH_TOKEN}`,
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
};

async function gh(endpoint) {
  const res = await fetch(`https://api.github.com/repos/${REPO}${endpoint}`, { headers });
  if (!res.ok) throw new Error(`GitHub API ${endpoint} → ${res.status}`);
  return res.json();
}

async function getCommits() {
  return gh(`/commits?since=${since}&per_page=100`);
}

async function getMergedPRs() {
  const prs = await gh(`/pulls?state=closed&sort=updated&direction=desc&per_page=50`);
  return prs.filter(pr => pr.merged_at && pr.merged_at > since);
}

async function getOpenPRs() {
  return gh(`/pulls?state=open&sort=updated&direction=desc&per_page=20`);
}

function fmtDate(iso) {
  return new Date(iso).toLocaleString('en-GB', {
    timeZone: 'Europe/London',
    dateStyle: 'short',
    timeStyle: 'short',
  });
}

function commitLine(c) {
  const msg = c.commit.message.split('\n')[0].slice(0, 100);
  const sha = c.sha.slice(0, 7);
  const author = c.commit.author.name;
  const time = fmtDate(c.commit.author.date);
  return `- \`${sha}\` ${msg} — *${author}* @ ${time}`;
}

function prLine(pr) {
  const time = fmtDate(pr.merged_at);
  return `- **#${pr.number}** ${pr.title} — merged ${time}`;
}

function openPrLine(pr) {
  return `- **#${pr.number}** ${pr.title}`;
}

async function run() {
  const [commits, mergedPRs, openPRs] = await Promise.all([
    getCommits(),
    getMergedPRs(),
    getOpenPRs(),
  ]);

  const now = new Date();
  const dateLabel = now.toISOString().slice(0, 10);
  const timeLabel = fmtDate(now.toISOString());

  const realCommits = commits.filter(
    c => !/^Merge (branch|pull request)/i.test(c.commit.message.split('\n')[0])
  );

  const lines = [
    `---`,
    `type: daily-digest`,
    `date: ${dateLabel}`,
    `generated: ${timeLabel}`,
    `hours_covered: ${HOURS}`,
    `tags: [digest, auto, jobfilter]`,
    `---`,
    ``,
    `# JobFilter Digest — ${dateLabel}`,
    `_Auto-generated. Covers last ${HOURS} hours (since ${fmtDate(since)})._`,
    ``,
    `## Merged PRs (${mergedPRs.length})`,
    ...(mergedPRs.length ? mergedPRs.map(prLine) : ['- None in window']),
    ``,
    `## Open PRs (${openPRs.length})`,
    ...(openPRs.length ? openPRs.map(openPrLine) : ['- None open']),
    ``,
    `## Commits (${realCommits.length})`,
    ...(realCommits.length ? realCommits.map(commitLine) : ['- No commits in window']),
    ``,
    `## Summary`,
    `- **${mergedPRs.length}** PR(s) merged`,
    `- **${openPRs.length}** PR(s) still open`,
    `- **${realCommits.length}** non-merge commit(s)`,
  ];

  if (!fs.existsSync(VAULT_DIR)) {
    fs.mkdirSync(VAULT_DIR, { recursive: true });
  }

  const outFile = path.join(VAULT_DIR, `Digest-${dateLabel}.md`);
  fs.writeFileSync(outFile, lines.join('\n'), 'utf8');
  console.log(`Digest written → ${outFile}`);
}

run().catch(err => { console.error(err); process.exit(1); });
