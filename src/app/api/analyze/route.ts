import { NextRequest, NextResponse } from "next/server";
import { getGitHubStats } from "@/lib/github";
import { analyzeDevType } from "@/lib/gemini";
import { buildAnalysisResult } from "@/lib/analysis";
import { errorResponse } from "@/lib/api";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json({ error: "username이 필요해요." }, { status: 400 });
  }

  try {
    const stats = await getGitHubStats(username);
    const analysis = await analyzeDevType(stats);
    const result = buildAnalysisResult(stats, analysis);

    return NextResponse.json(result);
  } catch (error) {
    return errorResponse(error, "분석 중 오류가 발생했어요.");
  }
}
