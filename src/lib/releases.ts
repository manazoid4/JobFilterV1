import 'server-only';

import releaseData from '../data/releases.json';

export type ReleaseSectionLabel = 'NEW' | 'BETTER' | 'FIXED';

export type ProductRelease = {
  id: string;
  publishedAt: string;
  status: 'live';
  title: string;
  summary: string;
  availability: string;
  audiences: string[];
  sections: Array<{
    label: ReleaseSectionLabel;
    items: string[];
  }>;
  evidence: {
    commits: string[];
    pullRequests: number[];
  };
};

export const releases = releaseData as ProductRelease[];
export const latestRelease = releases[0];

export function formatReleaseDate(isoDate: string) {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${isoDate}T00:00:00Z`));
}
