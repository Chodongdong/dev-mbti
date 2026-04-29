export type DevTypeAxis = {
  codeStyle: "functional" | "oop";
  workPattern: "night-sprinter" | "steady-marathoner";
  commitHabit: "perfectionist" | "fast-experimenter";
  documentation: "comment-philosopher" | "code-is-docs";
};

export type DevType = {
  id: string;
  name: string;
  emoji: string;
  shortDescription: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  famousProject: string;
  meme: string;
  color: string;
};

export type GitHubStats = {
  username: string;
  avatarUrl: string;
  name: string | null;
  bio: string | null;
  publicRepos: number;
  followers: number;
  following: number;
  languages: Record<string, number>;
  commitTimeDistribution: Record<string, number>;
  avgCommitMessageLength: number;
  totalCommits: number;
  topRepos: {
    name: string;
    stars: number;
    language: string | null;
    description: string | null;
  }[];
  hasReadme: boolean;
  recentCommitMessages: string[];
};

export type AnalysisResult = {
  username: string;
  avatarUrl: string;
  name: string | null;
  devType: DevType;
  axes: DevTypeAxis;
  stats: GitHubStats;
  aiDescription: string;
  similarProject: string;
  learningRoadmap: string[];
  analyzedAt: string;
};

export type CompareResult = {
  userA: AnalysisResult;
  userB: AnalysisResult;
  compatibility: number;
  compatibilityDescription: string;
  strengths: string[];
  challenges: string[];
};

export type HistoryItem = {
  username: string;
  avatarUrl: string;
  devTypeId: string;
  devTypeName: string;
  devTypeEmoji: string;
  analyzedAt: string;
};
