"use client";

import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAnalysisStore } from "@/store/analysisStore";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { AppHeader } from "@/components/shared/AppHeader";
import { AppFooter } from "@/components/shared/AppFooter";
import { Button } from "@/components/ui/button";
import { ProfileHero } from "./sections/ProfileHero";
import { StyleAxes } from "./sections/StyleAxes";
import { GitHubCharts } from "./sections/GitHubCharts";
import { StrengthsWeaknesses } from "./sections/StrengthsWeaknesses";
import { ProjectRoadmap } from "./sections/ProjectRoadmap";
import { GitHubSummary } from "./sections/GitHubSummary";
import { ShareSection } from "./sections/ShareSection";
import { ResultCTA } from "./sections/ResultCTA";

export default function ResultPage({ params }: { params: Promise<{ username: string }> }) {
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

  const { devType, axes, stats, similarProject, learningRoadmap } = result;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader right={
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          ← 다시 분석하기
        </Link>
      } />

      <main className="flex flex-col items-center flex-1 px-4 pb-20">
        <div className="w-full max-w-3xl mt-10 flex flex-col gap-8">
          <ProfileHero result={result} />
          <StyleAxes axes={axes} devType={devType} />
          <GitHubCharts stats={stats} devType={devType} />
          <StrengthsWeaknesses devType={devType} />
          <ProjectRoadmap similarProject={similarProject} learningRoadmap={learningRoadmap} devType={devType} />
          <GitHubSummary stats={stats} devType={devType} />
          <ShareSection devType={devType} />
          <ResultCTA username={username} devType={devType} />
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
