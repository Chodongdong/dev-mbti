import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { DevTypeProfileCard } from "@/components/shared/DevTypeProfileCard";
import type { AnalysisResult } from "@/types";

interface ProfileHeroProps {
  result: AnalysisResult;
}

export function ProfileHero({ result }: ProfileHeroProps) {
  const { devType, username, avatarUrl, name, aiDescription } = result;

  return (
    <AnimatedSection>
      <DevTypeProfileCard
        username={username}
        avatarUrl={avatarUrl}
        name={name}
        devType={devType}
        aiDescription={aiDescription}
        size="hero"
      />
    </AnimatedSection>
  );
}
