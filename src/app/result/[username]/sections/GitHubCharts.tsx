"use client";

import { motion } from "framer-motion";
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DevType, GitHubStats } from "@/types";

const PIE_COLORS = ["#6366f1", "#f59e0b", "#10b981", "#3b82f6", "#ec4899", "#8b5cf6", "#f97316", "#ef4444"];

const TIME_LABELS: Record<string, string> = {
  morning: "오전(6-12)",
  afternoon: "오후(12-18)",
  evening: "저녁(18-24)",
  night: "새벽(0-6)",
};

interface GitHubChartsProps {
  stats: GitHubStats;
  devType: DevType;
}

export function GitHubCharts({ stats, devType }: GitHubChartsProps) {
  const langData = Object.entries(stats.languages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6)
    .map(([name, value]) => ({ name, value }));

  const timeBuckets: Record<string, number> = { morning: 0, afternoon: 0, evening: 0, night: 0 };
  for (const [hour, count] of Object.entries(stats.commitTimeDistribution)) {
    const h = Number(hour);
    if (h >= 6 && h < 12) timeBuckets.morning += count;
    else if (h >= 12 && h < 18) timeBuckets.afternoon += count;
    else if (h >= 18 && h < 24) timeBuckets.evening += count;
    else timeBuckets.night += count;
  }
  const timeData = Object.entries(timeBuckets).map(([key, value]) => ({ name: TIME_LABELS[key], value }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-base">주요 언어</CardTitle>
        </CardHeader>
        <CardContent>
          {langData.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={langData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={2} dataKey="value">
                    {langData.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, ""]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-2 mt-2 justify-center">
                {langData.map((item, i) => (
                  <span key={item.name} className="flex items-center gap-1 text-xs">
                    <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                    {item.name}
                  </span>
                ))}
              </div>
            </>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">언어 데이터 없음</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">커밋 활동 시간대</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={timeData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="value" fill={devType.color} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}
