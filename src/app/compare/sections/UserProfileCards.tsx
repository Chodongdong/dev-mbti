"use client";

import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { DevTypeProfileCard } from "@/components/shared/DevTypeProfileCard";
import type { AnalysisResult } from "@/types";

interface UserProfileCardsProps {
  userA: AnalysisResult;
  userB: AnalysisResult;
}

export function UserProfileCards({ userA, userB }: UserProfileCardsProps) {
  return (
    <AnimatedSection trigger="mount" className="grid grid-cols-2 gap-4">
      {[userA, userB].map((user) => (
        <DevTypeProfileCard
          key={user.username}
          username={user.username}
          avatarUrl={user.avatarUrl}
          devType={user.devType}
          size="compact"
        />
      ))}
    </AnimatedSection>
  );
}
