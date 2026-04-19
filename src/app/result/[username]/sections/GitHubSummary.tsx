"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { DevType, GitHubStats } from "@/types";

interface GitHubSummaryProps {
  stats: GitHubStats;
  devType: DevType;
}

export function GitHubSummary({ stats, devType }: GitHubSummaryProps) {
  const statItems = [
    { label: "공개 레포", value: stats.publicRepos },
    { label: "총 커밋", value: stats.totalCommits },
    { label: "팔로워", value: stats.followers },
    { label: "평균 커밋 길이", value: `${stats.avgCommitMessageLength}자` },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-base">📊 GitHub 요약</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {statItems.map(({ label, value }) => (
              <div key={label} className="text-center">
                <p className="text-2xl font-bold" style={{ color: devType.color }}>{value}</p>
                <p className="text-xs text-muted-foreground mt-1">{label}</p>
              </div>
            ))}
          </div>

          {stats.topRepos.length > 0 && (
            <div className="mt-6">
              <p className="text-sm font-medium mb-3">주요 레포지토리</p>
              <div className="flex flex-col gap-2">
                {stats.topRepos.slice(0, 3).map((repo) => (
                  <div key={repo.name} className="flex items-center justify-between px-3 py-2 rounded-md bg-muted/50">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{repo.name}</span>
                      {repo.language && (
                        <Badge variant="secondary" className="text-xs">{repo.language}</Badge>
                      )}
                    </div>
                    {repo.stars > 0 && (
                      <span className="text-xs text-muted-foreground">⭐ {repo.stars}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
