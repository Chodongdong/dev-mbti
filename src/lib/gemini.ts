import { GoogleGenerativeAI } from "@google/generative-ai";
import { GitHubStats, DevType, DevTypeAxis } from "@/types";
import { DEV_TYPES } from "@/constants/devTypes";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

function buildAnalysisPrompt(stats: GitHubStats): string {
  const topLanguages = Object.entries(stats.languages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([lang, count]) => `${lang}(${count}개 repo)`)
    .join(", ");

  const nightCommits = Object.entries(stats.commitTimeDistribution)
    .filter(([hour]) => parseInt(hour) >= 22 || parseInt(hour) <= 5)
    .reduce((sum, [, count]) => sum + count, 0);

  const totalCommitsForCalc = Object.values(stats.commitTimeDistribution).reduce(
    (sum, count) => sum + count,
    0
  );

  const nightRatio = totalCommitsForCalc > 0 ? nightCommits / totalCommitsForCalc : 0;

  const devTypeOptions = DEV_TYPES.map(
    (t) => `- ${t.id}: ${t.name} (${t.shortDescription})`
  ).join("\n");

  return `
당신은 GitHub 데이터를 분석해서 개발자 유형을 분류하는 전문가입니다.

## 분석 대상 데이터
- 유저명: ${stats.username}
- 총 public repo: ${stats.publicRepos}개
- 주요 사용 언어: ${topLanguages || "데이터 없음"}
- 총 분석된 커밋 수: ${stats.totalCommits}개
- 평균 커밋 메시지 길이: ${stats.avgCommitMessageLength}자
- 새벽(22시~5시) 커밋 비율: ${Math.round(nightRatio * 100)}%
- 최근 커밋 메시지 샘플: ${stats.recentCommitMessages.slice(0, 5).join(" / ") || "없음"}
- README 프로필 존재: ${stats.hasReadme ? "예" : "아니오"}
- 팔로워: ${stats.followers}명

## 선택 가능한 개발자 유형
${devTypeOptions}

## 응답 형식 (JSON만 응답, 다른 텍스트 없이)
{
  "devTypeId": "선택된 유형 ID",
  "axes": {
    "codeStyle": "functional 또는 oop",
    "workPattern": "night-sprinter 또는 steady-marathoner",
    "commitHabit": "perfectionist 또는 fast-experimenter",
    "documentation": "comment-philosopher 또는 code-is-docs"
  },
  "aiDescription": "이 개발자에 대한 재미있고 통찰력 있는 2~3문장 설명. 실제 데이터를 근거로 작성.",
  "similarProject": "이 개발자의 스타일과 가장 닮은 유명 오픈소스 프로젝트 이름 하나",
  "learningRoadmap": ["추천 학습 방향 1", "추천 학습 방향 2", "추천 학습 방향 3"]
}
`.trim();
}

export async function analyzeDevType(stats: GitHubStats): Promise<{
  devType: DevType;
  axes: DevTypeAxis;
  aiDescription: string;
  similarProject: string;
  learningRoadmap: string[];
}> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }, { apiVersion: "v1beta" });
  const prompt = buildAnalysisPrompt(stats);

  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();

  // JSON 파싱
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("AI 분석 결과를 파싱할 수 없어요.");

  const parsed = JSON.parse(jsonMatch[0]);

  const devType = DEV_TYPES.find((t) => t.id === parsed.devTypeId) ?? DEV_TYPES[0];

  return {
    devType,
    axes: parsed.axes,
    aiDescription: parsed.aiDescription,
    similarProject: parsed.similarProject,
    learningRoadmap: parsed.learningRoadmap,
  };
}

export async function analyzeCompatibility(
  usernameA: string,
  usernameB: string,
  typeA: string,
  typeB: string,
  descA: string,
  descB: string
): Promise<{
  compatibility: number;
  compatibilityDescription: string;
  strengths: string[];
  challenges: string[];
}> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }, { apiVersion: "v1beta" });

  const prompt = `
두 개발자의 궁합을 분석해주세요.

개발자 A: ${usernameA} (유형: ${typeA})
${descA}

개발자 B: ${usernameB} (유형: ${typeB})
${descB}

## 응답 형식 (JSON만 응답)
{
  "compatibility": 0~100 사이의 궁합 점수,
  "compatibilityDescription": "두 개발자의 궁합에 대한 재미있는 2문장 설명",
  "strengths": ["함께 일할 때 강점 1", "강점 2", "강점 3"],
  "challenges": ["함께 일할 때 주의할 점 1", "주의할 점 2"]
}
`.trim();

  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("궁합 분석 결과를 파싱할 수 없어요.");

  return JSON.parse(jsonMatch[0]);
}
