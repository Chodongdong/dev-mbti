"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DevType, DevTypeAxis } from "@/types";

const AXIS_LABELS: Record<string, [string, string]> = {
  codeStyle: ["함수형", "객체지향"],
  workPattern: ["새벽 스프린터", "꾸준한 마라토너"],
  commitHabit: ["완벽주의", "빠른 실험가"],
  documentation: ["주석 철학자", "코드가 문서"],
};

const AXIS_KEYS = ["codeStyle", "workPattern", "commitHabit", "documentation"] as const;

const AXIS_VALUES: Record<string, Record<string, number>> = {
  codeStyle: { functional: 0, oop: 100 },
  workPattern: { "night-sprinter": 0, "steady-marathoner": 100 },
  commitHabit: { perfectionist: 0, "fast-experimenter": 100 },
  documentation: { "comment-philosopher": 0, "code-is-docs": 100 },
};

interface StyleAxesProps {
  axes: DevTypeAxis;
  devType: DevType;
}

export function StyleAxes({ axes, devType }: StyleAxesProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-base">개발 스타일 분석</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          {AXIS_KEYS.map((key) => {
            const [leftLabel, rightLabel] = AXIS_LABELS[key];
            const val = AXIS_VALUES[key][axes[key]] ?? 50;
            return (
              <div key={key}>
                <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                  <span>{leftLabel}</span>
                  <span>{rightLabel}</span>
                </div>
                <div className="relative h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="absolute left-0 top-0 h-full rounded-full"
                    style={{ backgroundColor: devType.color }}
                    initial={{ width: "0%" }}
                    animate={{ width: `${val}%` }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                  />
                </div>
                <p className="text-xs text-right mt-1 font-medium" style={{ color: devType.color }}>
                  {val <= 30 ? leftLabel : val >= 70 ? rightLabel : "중간형"}
                </p>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </motion.div>
  );
}
