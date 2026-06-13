import { DevTypeAxis } from "@/types";

export const AXIS_KEYS = ["codeStyle", "workPattern", "commitHabit", "documentation"] as const;

export type AxisKey = (typeof AXIS_KEYS)[number];

export const AXIS_LABELS: Record<AxisKey, [string, string]> = {
  codeStyle: ["함수형", "객체지향"],
  workPattern: ["새벽 스프린터", "꾸준한 마라토너"],
  commitHabit: ["완벽주의", "빠른 실험가"],
  documentation: ["주석 철학자", "코드가 문서"],
};

export const AXIS_SHORT_LABELS: Record<AxisKey, string> = {
  codeStyle: "코드스타일",
  workPattern: "작업패턴",
  commitHabit: "커밋습관",
  documentation: "문서화",
};

/** axes[key]는 0~100 점수. [low, high] 스케일로 비례 변환한다. */
export function getAxisValue(
  key: AxisKey,
  axes: DevTypeAxis,
  [low, high]: [number, number] = [0, 100]
): number {
  const score = Math.min(100, Math.max(0, axes[key]));
  return low + (score / 100) * (high - low);
}
