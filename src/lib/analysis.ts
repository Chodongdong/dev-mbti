import { AnalysisResult, GitHubStats, DevTypeAnalysis } from "@/types";

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
