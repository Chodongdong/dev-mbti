import { HistoryItem } from "@/types";

const HISTORY_KEY = "dev-mbti-history";
const MAX_HISTORY = 10;

export function getHistory(): HistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addToHistory(item: HistoryItem): void {
  if (typeof window === "undefined") return;
  const history = getHistory();
  const filtered = history.filter((h) => h.username !== item.username);
  const updated = [item, ...filtered].slice(0, MAX_HISTORY);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
}

export function clearHistory(): void {
  if (typeof window === "undefined") return;
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
    const key = item.devTypeName;
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
