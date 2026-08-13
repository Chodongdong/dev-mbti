import { TwoColumnListSection } from "@/components/shared/TwoColumnListSection";
import type { DevType } from "@/types";

interface StrengthsWeaknessesProps {
  devType: DevType;
}

export function StrengthsWeaknesses({ devType }: StrengthsWeaknessesProps) {
  return (
    <TwoColumnListSection
      delay={0.3}
      left={{ title: "💪 강점", items: devType.strengths, icon: "✓", iconColor: "text-green-500" }}
      right={{ title: "⚠️ 약점", items: devType.weaknesses, icon: "!", iconColor: "text-amber-500" }}
    />
  );
}
