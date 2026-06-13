"use client";

import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { AXIS_KEYS, AXIS_SHORT_LABELS, getAxisValue } from "@/constants/axes";
import type { CompareResult } from "@/types";

interface StyleRadarChartProps {
  compareResult: CompareResult;
}

export function StyleRadarChart({ compareResult }: StyleRadarChartProps) {
  const radarData = AXIS_KEYS.map((key) => ({
    axis: AXIS_SHORT_LABELS[key],
    A: getAxisValue(key, compareResult.userA.axes, [20, 80]),
    B: getAxisValue(key, compareResult.userB.axes, [20, 80]),
  }));

  return (
    <AnimatedSection trigger="mount" delay={0.2}>
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
    </AnimatedSection>
  );
}
