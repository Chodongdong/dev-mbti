import { HistoryItem } from "@/types";

const HISTORY_KEY = "dev-mbti-history";
const MAX_HISTORY = 10;

const isBrowser = () => typeof window !== "undefined";

export function getHistory(): HistoryItem[] {
  if (!isBrowser()) return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addToHistory(item: HistoryItem): void {
  if (!isBrowser()) return;
  const history = getHistory();
  const filtered = history.filter((h) => h.username !== item.username);
  const updated = [item, ...filtered].slice(0, MAX_HISTORY);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
}

export function clearHistory(): void {
  if (!isBrowser()) return;
  localStorage.removeItem(HISTORY_KEY);
}

export type RankingItem = {
  devTypeName: string;
  devTypeEmoji: string;
  devTypeId: string;
  count: number;
};

export function getRanking(): RankingItem[] {
  const history = getHistory();
  const counts: Record<string, RankingItem> = {};

  for (const item of history) {
    const key = item.devTypeId;
    if (!counts[key]) {
      counts[key] = {
        devTypeName: item.devTypeName,
        devTypeEmoji: item.devTypeEmoji,
        devTypeId: item.devTypeId,
        count: 0,
      };
    }
    counts[key].count++;
  }

  return Object.values(counts).sort((a, b) => b.count - a.count);
}
