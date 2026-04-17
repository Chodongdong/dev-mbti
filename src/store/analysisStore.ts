import { create } from "zustand";
import { AnalysisResult, CompareResult, HistoryItem } from "@/types";
import { getHistory, addToHistory, clearHistory } from "@/lib/history";

type AnalysisState = {
  // 분석 상태
  isAnalyzing: boolean;
  analysisResult: AnalysisResult | null;
  analysisError: string | null;

  // 비교 상태
  isComparing: boolean;
  compareResult: CompareResult | null;
  compareError: string | null;

  // 히스토리
  history: HistoryItem[];

  // 분석 액션
  analyze: (username: string) => Promise<void>;
  resetAnalysis: () => void;

  // 비교 액션
  compare: (userA: string, userB: string) => Promise<void>;
  resetCompare: () => void;

  // 히스토리 액션
  loadHistory: () => void;
  removeHistory: () => void;
};

export const useAnalysisStore = create<AnalysisState>((set) => ({
  isAnalyzing: false,
  analysisResult: null,
  analysisError: null,

  isComparing: false,
  compareResult: null,
  compareError: null,

  history: [],

  analyze: async (username) => {
    set({ isAnalyzing: true, analysisError: null, analysisResult: null });
    try {
      const res = await fetch(`/api/analyze?username=${encodeURIComponent(username)}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      set({ analysisResult: data });

      // 히스토리 저장
      addToHistory({
        username: data.username,
        avatarUrl: data.avatarUrl,
        devTypeName: data.devType.name,
        devTypeEmoji: data.devType.emoji,
        analyzedAt: data.analyzedAt,
      });
      set({ history: getHistory() });
    } catch (error) {
      set({ analysisError: error instanceof Error ? error.message : "분석 중 오류가 발생했어요." });
    } finally {
      set({ isAnalyzing: false });
    }
  },

  resetAnalysis: () => set({ analysisResult: null, analysisError: null }),

  compare: async (userA, userB) => {
    set({ isComparing: true, compareError: null, compareResult: null });
    try {
      const res = await fetch(
        `/api/compare?userA=${encodeURIComponent(userA)}&userB=${encodeURIComponent(userB)}`
      );
      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      set({ compareResult: data });
    } catch (error) {
      set({ compareError: error instanceof Error ? error.message : "비교 중 오류가 발생했어요." });
    } finally {
      set({ isComparing: false });
    }
  },

  resetCompare: () => set({ compareResult: null, compareError: null }),

  loadHistory: () => set({ history: getHistory() }),

  removeHistory: () => {
    clearHistory();
    set({ history: [] });
  },
}));
