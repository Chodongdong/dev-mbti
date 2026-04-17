"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useAnalysisStore } from "@/store/analysisStore";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

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

function CompareContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isComparing, compareResult, compareError, compare, resetCompare } = useAnalysisStore();

  const [userA, setUserA] = useState(searchParams.get("userA") ?? "");
  const [userB, setUserB] = useState(searchParams.get("userB") ?? "");

  useEffect(() => {
    resetCompare();
  }, []);

  const handleCompare = async () => {
    if (!userA.trim() || !userB.trim()) return;
    await compare(userA.trim(), userB.trim());
  };

  const radarData = compareResult
    ? Object.keys(AXIS_LABEL_MAP).map((key) => ({
        axis: AXIS_LABEL_MAP[key],
        A: AXIS_VALUE_MAP[key][compareResult.userA.axes[key as keyof typeof compareResult.userA.axes]] ?? 50,
        B: AXIS_VALUE_MAP[key][compareResult.userB.axes[key as keyof typeof compareResult.userB.axes]] ?? 50,
      }))
    : [];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 헤더 */}
      <header className="flex items-center justify-between px-6 py-4 border-b">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <span className="text-2xl">🧬</span>
          <span className="font-bold text-lg tracking-tight">dev-mbti</span>
        </Link>
        <span className="text-sm text-muted-foreground">개발자 궁합 비교</span>
      </header>

      <main className="flex flex-col items-center flex-1 px-4 pb-20">
        <div className="w-full max-w-3xl mt-10 flex flex-col gap-8">

          {/* 입력 폼 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-base">두 개발자의 GitHub 유저네임을 입력하세요</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row gap-3">
                <Input
                  placeholder="첫 번째 유저네임"
                  value={userA}
                  onChange={(e) => setUserA(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleCompare()}
                />
                <div className="flex items-center justify-center text-muted-foreground font-bold">VS</div>
                <Input
                  placeholder="두 번째 유저네임"
                  value={userB}
                  onChange={(e) => setUserB(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleCompare()}
                />
                <Button
                  onClick={handleCompare}
                  disabled={isComparing || !userA.trim() || !userB.trim()}
                  className="shrink-0"
                >
                  비교하기
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* 로딩 */}
          {isComparing && (
            <div className="flex justify-center py-20">
              <LoadingSpinner />
            </div>
          )}

          {/* 에러 */}
          {compareError && !isComparing && (
            <div className="flex flex-col items-center gap-3 py-10">
              <p className="text-destructive text-sm">{compareError}</p>
              <Button variant="outline" onClick={() => resetCompare()}>다시 시도</Button>
            </div>
          )}

          {/* 결과 */}
          {compareResult && !isComparing && (
            <>
              {/* 두 유저 프로필 */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-2 gap-4"
              >
                {[compareResult.userA, compareResult.userB].map((user) => (
                  <Card
                    key={user.username}
                    className="overflow-hidden border-2"
                    style={{ borderColor: user.devType.color + "60", backgroundColor: user.devType.color + "08" }}
                  >
                    <CardContent className="p-5 flex flex-col items-center text-center gap-3">
                      <img
                        src={user.avatarUrl}
                        alt={user.username}
                        className="w-14 h-14 rounded-full border-2"
                        style={{ borderColor: user.devType.color + "80" }}
                      />
                      <div>
                        <p className="text-xs text-muted-foreground">@{user.username}</p>
                        <p className="text-3xl mt-1">{user.devType.emoji}</p>
                        <p className="font-bold text-sm mt-1">{user.devType.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{user.devType.shortDescription}</p>
                      </div>
                      <p
                        className="text-xs italic"
                        style={{ color: user.devType.color }}
                      >
                        &quot;{user.devType.meme}&quot;
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>

              {/* 궁합 점수 */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <Card>
                  <CardContent className="p-8 flex flex-col items-center gap-4">
                    <p className="text-sm text-muted-foreground">개발자 궁합 점수</p>
                    <div className="relative flex items-center justify-center w-32 h-32">
                      <svg className="absolute inset-0" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="42" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="42"
                          fill="none"
                          stroke="#6366f1"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 42}`}
                          strokeDashoffset={`${2 * Math.PI * 42 * (1 - compareResult.compatibility / 100)}`}
                          transform="rotate(-90 50 50)"
                          initial={{ strokeDashoffset: `${2 * Math.PI * 42}` }}
                          animate={{ strokeDashoffset: `${2 * Math.PI * 42 * (1 - compareResult.compatibility / 100)}` }}
                          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                        />
                      </svg>
                      <motion.span
                        className="text-3xl font-bold"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                      >
                        {compareResult.compatibility}
                      </motion.span>
                    </div>
                    <p className="text-sm text-center text-muted-foreground max-w-sm leading-relaxed">
                      {compareResult.compatibilityDescription}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* 레이더 차트 */}
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
                        <Radar
                          name={compareResult.userA.username}
                          dataKey="A"
                          stroke="#6366f1"
                          fill="#6366f1"
                          fillOpacity={0.25}
                        />
                        <Radar
                          name={compareResult.userB.username}
                          dataKey="B"
                          stroke="#f43f5e"
                          fill="#f43f5e"
                          fillOpacity={0.25}
                        />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>

              {/* 강점 / 도전 */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">💪 함께하면 강점</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-2">
                    {compareResult.strengths.map((s) => (
                      <div key={s} className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                        <p className="text-sm">{s}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">⚠️ 주의할 점</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-2">
                    {compareResult.challenges.map((c) => (
                      <div key={c} className="flex items-start gap-2">
                        <span className="text-amber-500 mt-0.5 shrink-0">!</span>
                        <p className="text-sm">{c}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-3 justify-center"
              >
                <Button variant="outline" onClick={() => router.push("/")}>
                  다른 유저 분석하기
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    resetCompare();
                    setUserA("");
                    setUserB("");
                  }}
                >
                  다시 비교하기
                </Button>
                <Button onClick={() => router.push(`/result/${compareResult.userA.username}`)}>
                  @{compareResult.userA.username} 결과 보기
                </Button>
              </motion.div>
            </>
          )}
        </div>
      </main>

      <footer className="border-t py-6 text-center text-xs text-muted-foreground">
        public repo만 분석 가능 · GitHub API 기반 · AI 분류 결과는 재미로만 봐주세요 😄
      </footer>
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense>
      <CompareContent />
    </Suspense>
  );
}
