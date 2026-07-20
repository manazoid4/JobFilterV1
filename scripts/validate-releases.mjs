import { readFile } from 'node:fs/promises';

const sourceUrl = new URL('../src/data/releases.json', import.meta.url);
const releases = JSON.parse(await readFile(sourceUrl, 'utf8'));
const errors = [];
const ids = new Set();
const allowedSectionLabels = new Set(['NEW', 'BETTER', 'FIXED']);
const today = new Date().toISOString().slice(0, 10);

const addError = (message) => errors.push(message);
const isText = (value) => typeof value === 'string' && value.trim().length > 0;

if (!Array.isArray(releases) || releases.length === 0) {
  addError('Release data must be a non-empty array.');
} else {
  releases.forEach((release, index) => {
    const label = `Release ${index + 1}`;

    if (!isText(release.id) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(release.id)) {
      addError(`${label} has an invalid stable ID.`);
    } else if (ids.has(release.id)) {
      addError(`${label} duplicates ID "${release.id}".`);
    } else {
      ids.add(release.id);
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(release.publishedAt ?? '')) {
      addError(`${label} must use an ISO YYYY-MM-DD date.`);
    } else {
      const parsed = new Date(`${release.publishedAt}T00:00:00Z`);
      if (Number.isNaN(parsed.valueOf()) || parsed.toISOString().slice(0, 10) !== release.publishedAt) {
        addError(`${label} has an impossible calendar date.`);
      }
      if (release.publishedAt > today) {
        addError(`${label} cannot be published in the future.`);
      }
      if (index > 0 && release.publishedAt > releases[index - 1].publishedAt) {
        addError(`${label} is out of newest-first order.`);
      }
    }

    if (release.status !== 'live') addError(`${label} must be live before it is public.`);
    for (const field of ['title', 'summary', 'availability']) {
      if (!isText(release[field])) addError(`${label} is missing ${field}.`);
    }

    if (!Array.isArray(release.audiences) || !release.audiences.every(isText) || release.audiences.length === 0) {
      addError(`${label} must name at least one audience.`);
    }

    if (!Array.isArray(release.sections) || release.sections.length === 0) {
      addError(`${label} must contain at least one customer-facing section.`);
    } else {
      const seenLabels = new Set();
      release.sections.forEach((section, sectionIndex) => {
        if (!allowedSectionLabels.has(section.label)) {
          addError(`${label}, section ${sectionIndex + 1} has an invalid label.`);
        }
        if (seenLabels.has(section.label)) {
          addError(`${label} repeats the ${section.label} section.`);
        }
        seenLabels.add(section.label);
        if (!Array.isArray(section.items) || section.items.length === 0 || !section.items.every(isText)) {
          addError(`${label}, section ${sectionIndex + 1} needs non-empty items.`);
        }
      });
    }

    const commits = release.evidence?.commits;
    if (!Array.isArray(commits) || commits.length === 0 || !commits.every((hash) => /^[0-9a-f]{7,40}$/.test(hash))) {
      addError(`${label} needs valid commit evidence.`);
    }
    const pullRequests = release.evidence?.pullRequests;
    if (!Array.isArray(pullRequests) || !pullRequests.every((number) => Number.isInteger(number) && number > 0)) {
      addError(`${label} has invalid pull request evidence.`);
    }
  });
}

if (errors.length > 0) {
  console.error(`Release validation failed:\n- ${errors.join('\n- ')}`);
  process.exit(1);
}

console.log(`Release validation passed: ${releases.length} valid entries.`);
