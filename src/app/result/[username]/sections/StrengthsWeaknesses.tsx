import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedSection } from "./AnimatedSection";
import type { DevType } from "@/types";

interface StrengthsWeaknessesProps {
  devType: DevType;
}

export function StrengthsWeaknesses({ devType }: StrengthsWeaknessesProps) {
  return (
    <AnimatedSection delay={0.3} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">💪 강점</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {devType.strengths.map((s) => (
            <div key={s} className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <p className="text-sm">{s}</p>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">⚠️ 약점</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {devType.weaknesses.map((w) => (
            <div key={w} className="flex items-start gap-2">
              <span className="text-amber-500 mt-0.5">!</span>
              <p className="text-sm">{w}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </AnimatedSection>
  );
}
