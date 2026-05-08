import type { LostJob, LostReason, WinEngineData, WinJob } from './types';

const KEY = 'jobfilter.win';

export function getWinData(): WinEngineData {
  try {
    const raw = localStorage.getItem(KEY);
    return raw
      ? (JSON.parse(raw) as WinEngineData)
      : { wins: [], losses: [] };
  } catch {
    return { wins: [], losses: [] };
  }
}

function saveWinData(data: WinEngineData) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function markWon(job: Omit<WinJob, 'id' | 'wonAt'>): WinJob {
  const data = getWinData();
  const win: WinJob = {
    ...job,
    id: `win-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    wonAt: new Date().toISOString(),
  };
  data.wins.unshift(win);
  saveWinData(data);
  return win;
}

export function markLost(job: Omit<LostJob, 'id' | 'lostAt'>): LostJob {
  const data = getWinData();
  const lost: LostJob = {
    ...job,
    id: `lost-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    lostAt: new Date().toISOString(),
  };
  data.losses.unshift(lost);
  saveWinData(data);
  return lost;
}

export function updateLostReason(lostId: string, reason: LostReason, notes?: string) {
  const data = getWinData();
  data.losses = data.losses.map((l) =>
    l.id === lostId ? { ...l, reason, notes: notes ?? l.notes } : l
  );
  saveWinData(data);
}

export function removeWin(winId: string) {
  const data = getWinData();
  data.wins = data.wins.filter((w) => w.id !== winId);
  saveWinData(data);
}

export function removeLost(lostId: string) {
  const data = getWinData();
  data.losses = data.losses.filter((l) => l.id !== lostId);
  saveWinData(data);
}

export function getMonthlyStats(year?: number, month?: number) {
  const { wins } = getWinData();
  const now = new Date();
  const y = year ?? now.getFullYear();
  const m = month ?? now.getMonth();

  const monthlyWins = wins.filter((w) => {
    const d = new Date(w.wonAt);
    return d.getFullYear() === y && d.getMonth() === m;
  });

  const count = monthlyWins.length;
  const totalValue = monthlyWins.reduce((sum, w) => sum + w.value, 0);

  return { count, totalValue, wins: monthlyWins };
}

export function getYearlyTrend(): { month: string; count: number; value: number }[] {
  const { wins } = getWinData();
  const now = new Date();
  const trend: { month: string; count: number; value: number }[] = [];

  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const y = d.getFullYear();
    const m = d.getMonth();
    const monthWins = wins.filter((w) => {
      const wd = new Date(w.wonAt);
      return wd.getFullYear() === y && wd.getMonth() === m;
    });
    trend.push({
      month: d.toLocaleDateString('en-GB', { month: 'short' }),
      count: monthWins.length,
      value: monthWins.reduce((sum, w) => sum + w.value, 0),
    });
  }

  return trend;
}

export function getLostReasonBreakdown(): { reason: LostReason; count: number; label: string }[] {
  const { losses } = getWinData();
  const reasons: Record<string, number> = {};

  losses.forEach((l) => {
    reasons[l.reason] = (reasons[l.reason] || 0) + 1;
  });

  const labels: Record<LostReason, string> = {
    price: 'Price Too High',
    timing: 'Bad Timing',
    competition: 'Lost to Competition',
    not_interested: 'Not Interested',
    went_elsewhere: 'Went Elsewhere',
    other: 'Other',
  };

  return (Object.keys(reasons) as LostReason[]).map((reason) => ({
    reason,
    count: reasons[reason],
    label: labels[reason],
  })).sort((a, b) => b.count - a.count);
}

export function generateReviewMessage(win: WinJob, platform: 'google' | 'checkatrade'): string {
  const tradeLabel = win.trade.charAt(0).toUpperCase() + win.trade.slice(1);
  if (platform === 'google') {
    return `Hi, thanks for choosing us for the ${win.title} in ${win.location}. If you're happy with the work, it would mean a lot if you could leave us a quick Google review. Takes 30 seconds: https://g.page/r/YOUR_GOOGLE_REVIEW_LINK/review`;
  }
  return `Hi, thanks for choosing us for the ${win.title} in ${win.location}. If you're happy with the ${tradeLabel.toLowerCase()} work, please leave us a review on Checkatrade — it helps us get more jobs like yours: https://www.checkatrade.com/YOUR_PROFILE/review`;
}
