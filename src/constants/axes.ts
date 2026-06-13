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

const AXIS_SIDE: Record<AxisKey, Record<string, 0 | 1>> = {
  codeStyle: { functional: 0, oop: 1 },
  workPattern: { "night-sprinter": 0, "steady-marathoner": 1 },
  commitHabit: { perfectionist: 0, "fast-experimenter": 1 },
  documentation: { "comment-philosopher": 0, "code-is-docs": 1 },
};

export function getAxisValue(
  key: AxisKey,
  axes: DevTypeAxis,
  [low, high]: [number, number] = [0, 100]
): number {
  const side = AXIS_SIDE[key][axes[key]];
  if (side === undefined) return (low + high) / 2;
  return side === 0 ? low : high;
}
