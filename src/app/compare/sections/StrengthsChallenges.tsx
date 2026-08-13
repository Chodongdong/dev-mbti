import { TwoColumnListSection } from "@/components/shared/TwoColumnListSection";

interface StrengthsChallengesProps {
  strengths: string[];
  challenges: string[];
}

export function StrengthsChallenges({ strengths, challenges }: StrengthsChallengesProps) {
  return (
    <TwoColumnListSection
      trigger="mount"
      delay={0.3}
      left={{ title: "💪 함께하면 강점", items: strengths, icon: "✓", iconColor: "text-green-500" }}
      right={{ title: "⚠️ 주의할 점", items: challenges, icon: "!", iconColor: "text-amber-500" }}
    />
  );
}
