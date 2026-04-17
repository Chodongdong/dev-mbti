import { NextRequest, NextResponse } from "next/server";
import { getGitHubStats } from "@/lib/github";
import { analyzeDevType, analyzeCompatibility } from "@/lib/gemini";
import { AnalysisResult, CompareResult } from "@/types";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userA = searchParams.get("userA");
  const userB = searchParams.get("userB");

  if (!userA || !userB) {
    return NextResponse.json({ error: "userA, userB 모두 필요해요." }, { status: 400 });
  }

  try {
    const [statsA, statsB] = await Promise.all([
      getGitHubStats(userA),
      getGitHubStats(userB),
    ]);

    const [analysisA, analysisB] = await Promise.all([
      analyzeDevType(statsA),
      analyzeDevType(statsB),
    ]);

    const resultA: AnalysisResult = {
      username: statsA.username,
      avatarUrl: statsA.avatarUrl,
      name: statsA.name,
      devType: analysisA.devType,
      axes: analysisA.axes,
      stats: statsA,
      aiDescription: analysisA.aiDescription,
      similarProject: analysisA.similarProject,
      learningRoadmap: analysisA.learningRoadmap,
      analyzedAt: new Date().toISOString(),
    };

    const resultB: AnalysisResult = {
      username: statsB.username,
      avatarUrl: statsB.avatarUrl,
      name: statsB.name,
      devType: analysisB.devType,
      axes: analysisB.axes,
      stats: statsB,
      aiDescription: analysisB.aiDescription,
      similarProject: analysisB.similarProject,
      learningRoadmap: analysisB.learningRoadmap,
      analyzedAt: new Date().toISOString(),
    };

    const compatibility = await analyzeCompatibility(
      userA,
      userB,
      analysisA.devType.name,
      analysisB.devType.name,
      analysisA.aiDescription,
      analysisB.aiDescription
    );

    const result: CompareResult = {
      userA: resultA,
      userB: resultB,
      ...compatibility,
    };

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "비교 분석 중 오류가 발생했어요.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
