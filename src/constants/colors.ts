/** devType.color가 없을 때 쓰는 기본 브랜드 색상 (indigo-500) */
export const DEFAULT_DEV_TYPE_COLOR = "#6366f1";

/** 언어/시간대 등 다항목 차트에서 순서대로 순환 사용하는 팔레트 */
export const CHART_PALETTE = [
  "#6366f1",
  "#f59e0b",
  "#10b981",
  "#3b82f6",
  "#ec4899",
  "#8b5cf6",
  "#f97316",
  "#ef4444",
];

/** 두 유저를 나란히 비교하는 차트(레이더 등)에서 쓰는 A/B 색상 */
export const COMPARE_COLORS = {
  userA: DEFAULT_DEV_TYPE_COLOR,
  userB: "#f43f5e",
} as const;
