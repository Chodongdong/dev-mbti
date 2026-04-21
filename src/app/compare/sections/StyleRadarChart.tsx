"use client";

import { motion } from "framer-motion";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CompareResult } from "@/types";

const AXIS_LABEL_MAP: Record<string, string> = {
  codeStyle: "코드스타일",
  workPattern: "작업패턴",
  commitHabit: "커밋습관",
  documentation: "문서화",
};

const AXIS_VALUE_MAP: Record<string, Record<string, number>> = {
  codeStyle: { functional: 20, oop: 80 },
  workPattern: { "night-sprinter": 20, "steady-marathoner": 80 },
  commitHabit: { perfectionist: 20, "fast-experimenter": 80 },
  documentation: { "comment-philosopher": 20, "code-is-docs": 80 },
};

interface StyleRadarChartProps {
  compareResult: CompareResult;
}

export function StyleRadarChart({ compareResult }: StyleRadarChartProps) {
  const radarData = Object.keys(AXIS_LABEL_MAP).map((key) => ({
    axis: AXIS_LABEL_MAP[key],
    A: AXIS_VALUE_MAP[key][compareResult.userA.axes[key as keyof typeof compareResult.userA.axes]] ?? 50,
    B: AXIS_VALUE_MAP[key][compareResult.userB.axes[key as keyof typeof compareResult.userB.axes]] ?? 50,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-base">개발 스타일 비교</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center gap-6 mb-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="inline-block w-3 h-0.5 bg-indigo-500" />
              @{compareResult.userA.username}
            </span>
            <span className="flex items-center gap-1">
              <span className="inline-block w-3 h-0.5 bg-rose-500" />
              @{compareResult.userB.username}
            </span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="axis" tick={{ fontSize: 12 }} />
              <Radar name={compareResult.userA.username} dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.25} />
              <Radar name={compareResult.userB.username} dataKey="B" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.25} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}
