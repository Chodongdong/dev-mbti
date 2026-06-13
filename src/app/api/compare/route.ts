import { NextRequest, NextResponse } from "next/server";
import { getGitHubStats } from "@/lib/github";
import { analyzeDevType, analyzeCompatibility } from "@/lib/gemini";
import { buildAnalysisResult } from "@/lib/analysis";
import { CompareResult } from "@/types";

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

    const resultA = buildAnalysisResult(statsA, analysisA);
    const resultB = buildAnalysisResult(statsB, analysisB);

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
