"use client";

import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useAnalysisStore } from "@/store/analysisStore";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

const PIE_COLORS = [
  "#6366f1", "#f59e0b", "#10b981", "#3b82f6",
  "#ec4899", "#8b5cf6", "#f97316", "#ef4444",
];

const TIME_LABELS: Record<string, string> = {
  morning: "오전(6-12)",
  afternoon: "오후(12-18)",
  evening: "저녁(18-24)",
  night: "새벽(0-6)",
};

export default function ResultPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = use(params);
  const router = useRouter();
  const { analysisResult, isAnalyzing, analysisError, analyze } = useAnalysisStore();

  const result = analysisResult?.username === username ? analysisResult : null;

  useEffect(() => {
    if (!result && !isAnalyzing) {
      analyze(username);
    }
  }, [username]);

  if (isAnalyzing || (!result && !analysisError)) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (analysisError) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center gap-4">
        <p className="text-lg font-semibold text-destructive">{analysisError}</p>
        <Button onClick={() => router.push("/")}>홈으로</Button>
      </div>
    );
  }

  if (!result) return null;

  const { devType, axes, stats, aiDescription, similarProject, learningRoadmap } = result;

  // 언어 차트 데이터 (상위 6개)
  const langData = Object.entries(stats.languages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6)
    .map(([name, value]) => ({ name, value }));

  // 커밋 시간대 데이터 집계 (0~23 → 오전/오후/저녁/새벽)
  const timeRaw = stats.commitTimeDistribution;
  const timeBuckets: Record<string, number> = { morning: 0, afternoon: 0, evening: 0, night: 0 };
  for (const [hour, count] of Object.entries(timeRaw)) {
    const h = Number(hour);
    if (h >= 6 && h < 12) timeBuckets.morning += count;
    else if (h >= 12 && h < 18) timeBuckets.afternoon += count;
    else if (h >= 18 && h < 24) timeBuckets.evening += count;
    else timeBuckets.night += count;
  }
  const timeData = Object.entries(timeBuckets).map(([key, value]) => ({
    name: TIME_LABELS[key],
    value,
  }));

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 헤더 */}
      <header className="flex items-center justify-between px-6 py-4 border-b">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <span className="text-2xl">🧬</span>
          <span className="font-bold text-lg tracking-tight">dev-mbti</span>
        </Link>
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          ← 다시 분석하기
        </Link>
      </header>

      <main className="flex flex-col items-center flex-1 px-4 pb-20">
        <div className="w-full max-w-3xl mt-10 flex flex-col gap-8">

          {/* 프로필 + 유형 히어로 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card
              className="overflow-hidden border-2"
              style={{ borderColor: devType.color + "60", backgroundColor: devType.color + "08" }}
            >
              <CardContent className="p-8">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  {/* 아바타 */}
                  <div className="shrink-0">
                    <img
                      src={result.avatarUrl}
                      alt={username}
                      className="w-20 h-20 rounded-full border-2"
                      style={{ borderColor: devType.color + "80" }}
                    />
                  </div>

                  {/* 유형 정보 */}
                  <div className="flex flex-col gap-2 text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <span className="text-sm text-muted-foreground">@{username}</span>
                      {result.name && (
                        <span className="text-sm font-medium">{result.name}</span>
                      )}
                    </div>
                    <div className="flex items-center justify-center sm:justify-start gap-3">
                      <span className="text-5xl">{devType.emoji}</span>
                      <div>
                        <p className="text-2xl font-bold">{devType.name}</p>
                        <p className="text-sm text-muted-foreground">{devType.shortDescription}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI 설명 */}
                <div className="mt-6 p-4 rounded-lg bg-background/60 border">
                  <p className="text-sm leading-relaxed text-muted-foreground">{aiDescription}</p>
                </div>

                {/* 밈 */}
                <p
                  className="mt-4 text-center text-sm italic font-medium"
                  style={{ color: devType.color }}
                >
                  &quot;{devType.meme}&quot;
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* 4축 분석 */}
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

          {/* GitHub 통계 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {/* 언어 비율 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">주요 언어</CardTitle>
              </CardHeader>
              <CardContent>
                {langData.length > 0 ? (
                  <>
                    <ResponsiveContainer width="100%" height={180}>
                      <PieChart>
                        <Pie
                          data={langData}
                          cx="50%"
                          cy="50%"
                          innerRadius={45}
                          outerRadius={75}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {langData.map((_, i) => (
                            <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => [`${value}%`, ""]}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex flex-wrap gap-2 mt-2 justify-center">
                      {langData.map((item, i) => (
                        <span key={item.name} className="flex items-center gap-1 text-xs">
                          <span
                            className="inline-block w-2 h-2 rounded-full"
                            style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }}
                          />
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

            {/* 커밋 시간대 */}
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

          {/* 강점 / 약점 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-base">💪 강점</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                {devType.strengths.map((s) => (
                  <div key={s} className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <p className="text-sm">{s}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">⚠️ 약점</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                {devType.weaknesses.map((w) => (
                  <div key={w} className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">!</span>
                    <p className="text-sm">{w}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* 닮은 프로젝트 + 학습 로드맵 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-base">🔭 닮은 오픈소스</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="inline-block px-3 py-1.5 rounded-md text-sm font-semibold"
                  style={{ backgroundColor: devType.color + "20", color: devType.color }}
                >
                  {similarProject}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  당신의 개발 스타일과 가장 비슷한 프로젝트예요.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">🗺️ 학습 로드맵</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                {learningRoadmap.map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Badge
                      variant="outline"
                      className="text-xs shrink-0"
                      style={{ borderColor: devType.color + "60", color: devType.color }}
                    >
                      {i + 1}
                    </Badge>
                    <p className="text-sm">{item}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* GitHub 통계 요약 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-base">📊 GitHub 요약</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: "공개 레포", value: stats.publicRepos },
                    { label: "총 커밋", value: stats.totalCommits },
                    { label: "팔로워", value: stats.followers },
                    { label: "평균 커밋 길이", value: `${stats.avgCommitMessageLength}자` },
                  ].map(({ label, value }) => (
                    <div key={label} className="text-center">
                      <p className="text-2xl font-bold" style={{ color: devType.color }}>
                        {value}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{label}</p>
                    </div>
                  ))}
                </div>

                {stats.topRepos.length > 0 && (
                  <div className="mt-6">
                    <p className="text-sm font-medium mb-3">주요 레포지토리</p>
                    <div className="flex flex-col gap-2">
                      {stats.topRepos.slice(0, 3).map((repo) => (
                        <div
                          key={repo.name}
                          className="flex items-center justify-between px-3 py-2 rounded-md bg-muted/50"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{repo.name}</span>
                            {repo.language && (
                              <Badge variant="secondary" className="text-xs">
                                {repo.language}
                              </Badge>
                            )}
                          </div>
                          {repo.stars > 0 && (
                            <span className="text-xs text-muted-foreground">⭐ {repo.stars}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Button variant="outline" onClick={() => router.push("/")}>
              다른 유저 분석하기
            </Button>
            <Button
              onClick={() => router.push(`/compare?userA=${username}`)}
              style={{ backgroundColor: devType.color }}
            >
              개발자 궁합 비교하기
            </Button>
          </motion.div>

        </div>
      </main>

      <footer className="border-t py-6 text-center text-xs text-muted-foreground">
        public repo만 분석 가능 · GitHub API 기반 · AI 분류 결과는 재미로만 봐주세요 😄
      </footer>
    </div>
  );
}
