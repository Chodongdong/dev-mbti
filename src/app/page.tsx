"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAnalysisStore } from "@/store/analysisStore";
import { GithubInput } from "@/components/shared/GithubInput";
import { HistoryList } from "@/components/shared/HistoryList";
import { DevTypeCard } from "@/components/shared/DevTypeCard";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { DEV_TYPES } from "@/constants/devTypes";

export default function Home() {
  const router = useRouter();
  const { analyze, isAnalyzing, analysisError } = useAnalysisStore();

  const handleSubmit = async (username: string) => {
    await analyze(username);
    const { analysisResult } = useAnalysisStore.getState();
    if (analysisResult) {
      router.push(`/result/${username}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 헤더 */}
      <header className="flex items-center justify-between px-6 py-4 border-b">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🧬</span>
          <span className="font-bold text-lg tracking-tight">dev-mbti</span>
        </div>
        <p className="text-sm text-muted-foreground hidden sm:block">
          GitHub 데이터로 분석하는 나의 개발자 유형
        </p>
      </header>

      <main className="flex flex-col items-center flex-1 px-4">
        {/* 히어로 섹션 */}
        <section className="flex flex-col items-center text-center pt-20 pb-12 gap-6 w-full max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-4"
          >
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
              나의 개발자 유형은?
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              GitHub 커밋 패턴, 사용 언어, 활동 시간대를 AI가 분석해
              <br className="hidden sm:block" />
              {" "}8가지 개발자 유형 중 하나를 찾아드려요.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="w-full flex flex-col items-center gap-3"
          >
            <GithubInput onSubmit={handleSubmit} isLoading={isAnalyzing} />
            {analysisError && (
              <p className="text-sm text-destructive">{analysisError}</p>
            )}
          </motion.div>

          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full"
            >
              <LoadingSpinner />
            </motion.div>
          )}
        </section>

        {/* 히스토리 */}
        <section className="w-full max-w-md mb-16">
          <HistoryList />
        </section>

        {/* 유형 미리보기 */}
        <section className="w-full max-w-4xl mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-xl font-semibold text-center mb-6">
              8가지 개발자 유형
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {DEV_TYPES.map((devType, i) => (
                <motion.div
                  key={devType.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.35 + i * 0.04 }}
                >
                  <DevTypeCard devType={devType} size="sm" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </main>

      {/* 푸터 */}
      <footer className="border-t py-6 text-center text-xs text-muted-foreground">
        public repo만 분석 가능 · GitHub API 기반 · AI 분류 결과는 재미로만 봐주세요 😄
      </footer>
    </div>
  );
}
