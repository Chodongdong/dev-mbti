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
