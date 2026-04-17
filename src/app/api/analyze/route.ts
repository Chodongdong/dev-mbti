import { NextRequest, NextResponse } from "next/server";
import { getGitHubStats } from "@/lib/github";
import { analyzeDevType } from "@/lib/gemini";
import { AnalysisResult } from "@/types";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json({ error: "username이 필요해요." }, { status: 400 });
  }

  try {
    const stats = await getGitHubStats(username);
    const { devType, axes, aiDescription, similarProject, learningRoadmap } =
      await analyzeDevType(stats);

    const result: AnalysisResult = {
      username: stats.username,
      avatarUrl: stats.avatarUrl,
      name: stats.name,
      devType,
      axes,
      stats,
      aiDescription,
      similarProject,
      learningRoadmap,
      analyzedAt: new Date().toISOString(),
    };

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "분석 중 오류가 발생했어요.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
