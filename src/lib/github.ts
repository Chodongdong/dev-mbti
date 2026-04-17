import { GitHubStats } from "@/types";

const GITHUB_API = "https://api.github.com";

const headers: Record<string, string> = {
  Accept: "application/vnd.github.v3+json",
};

if (process.env.GITHUB_TOKEN) {
  headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
}

async function fetchGitHub(endpoint: string) {
  const res = await fetch(`${GITHUB_API}${endpoint}`, { headers });
  if (!res.ok) {
    if (res.status === 404) throw new Error("GitHub 유저를 찾을 수 없어요.");
    if (res.status === 403) throw new Error("API 요청 한도를 초과했어요. 잠시 후 다시 시도해주세요.");
    throw new Error("GitHub API 요청에 실패했어요.");
  }
  return res.json();
}

export async function getGitHubStats(username: string): Promise<GitHubStats> {
  const [user, repos] = await Promise.all([
    fetchGitHub(`/users/${username}`),
    fetchGitHub(`/users/${username}/repos?sort=updated&per_page=30`),
  ]);

  // 언어 사용 통계
  const languages: Record<string, number> = {};
  for (const repo of repos) {
    if (repo.language) {
      languages[repo.language] = (languages[repo.language] || 0) + 1;
    }
  }

  // 최근 커밋 데이터 수집 (상위 5개 repo)
  const topReposByCommits = repos
    .filter((r: { fork: boolean }) => !r.fork)
    .slice(0, 5);

  const commitTimeDistribution: Record<string, number> = {};
  const recentCommitMessages: string[] = [];
  let totalCommits = 0;
  let totalMessageLength = 0;

  await Promise.all(
    topReposByCommits.map(async (repo: { name: string }) => {
      try {
        const commits = await fetchGitHub(
          `/repos/${username}/${repo.name}/commits?author=${username}&per_page=20`
        );
        for (const commit of commits) {
          totalCommits++;
          const message = commit.commit.message.split("\n")[0];
          recentCommitMessages.push(message);
          totalMessageLength += message.length;

          const date = new Date(commit.commit.author.date);
          const hour = date.getHours().toString();
          commitTimeDistribution[hour] = (commitTimeDistribution[hour] || 0) + 1;
        }
      } catch {
        // 개별 repo 실패는 무시
      }
    })
  );

  // README 존재 여부
  let hasReadme = false;
  try {
    await fetchGitHub(`/repos/${username}/${username}/readme`);
    hasReadme = true;
  } catch {
    hasReadme = false;
  }

  const topRepos = repos
    .filter((r: { fork: boolean }) => !r.fork)
    .slice(0, 5)
    .map((r: { name: string; stargazers_count: number; language: string | null; description: string | null }) => ({
      name: r.name,
      stars: r.stargazers_count,
      language: r.language,
      description: r.description,
    }));

  return {
    username,
    avatarUrl: user.avatar_url,
    name: user.name,
    bio: user.bio,
    publicRepos: user.public_repos,
    followers: user.followers,
    following: user.following,
    languages,
    commitTimeDistribution,
    avgCommitMessageLength:
      totalCommits > 0 ? Math.round(totalMessageLength / totalCommits) : 0,
    totalCommits,
    topRepos,
    hasReadme,
    recentCommitMessages: recentCommitMessages.slice(0, 20),
  };
}
