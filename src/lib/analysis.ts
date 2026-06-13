import { AnalysisResult, GitHubStats } from "@/types";
import { DevTypeAnalysis } from "@/lib/gemini";

export function buildAnalysisResult(stats: GitHubStats, analysis: DevTypeAnalysis): AnalysisResult {
  return {
    username: stats.username,
    avatarUrl: stats.avatarUrl,
    name: stats.name,
    devType: analysis.devType,
    axes: analysis.axes,
    stats,
    aiDescription: analysis.aiDescription,
    similarProject: analysis.similarProject,
    learningRoadmap: analysis.learningRoadmap,
    analyzedAt: new Date().toISOString(),
  };
}
