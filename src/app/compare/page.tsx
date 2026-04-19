"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAnalysisStore } from "@/store/analysisStore";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { AppHeader } from "@/components/shared/AppHeader";
import { AppFooter } from "@/components/shared/AppFooter";
import { Button } from "@/components/ui/button";
import { CompareInputForm } from "./sections/CompareInputForm";
import { UserProfileCards } from "./sections/UserProfileCards";
import { CompatibilityScore } from "./sections/CompatibilityScore";
import { StyleRadarChart } from "./sections/StyleRadarChart";
import { StrengthsChallenges } from "./sections/StrengthsChallenges";
import { CompareCTA } from "./sections/CompareCTA";

function CompareContent() {
  const searchParams = useSearchParams();
  const { isComparing, compareResult, compareError, compare, resetCompare } = useAnalysisStore();

  const [userA, setUserA] = useState(searchParams.get("userA") ?? "");
  const [userB, setUserB] = useState(searchParams.get("userB") ?? "");

  useEffect(() => {
    resetCompare();
  }, []);

  const handleCompare = async () => {
    if (!userA.trim() || !userB.trim()) return;
    await compare(userA.trim(), userB.trim());
  };

  const handleReset = () => {
    resetCompare();
    setUserA("");
    setUserB("");
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader right={<span className="text-sm text-muted-foreground">개발자 궁합 비교</span>} />

      <main className="flex flex-col items-center flex-1 px-4 pb-20">
        <div className="w-full max-w-3xl mt-10 flex flex-col gap-8">
          <CompareInputForm
            userA={userA}
            userB={userB}
            isComparing={isComparing}
            onUserAChange={setUserA}
            onUserBChange={setUserB}
            onCompare={handleCompare}
          />

          {isComparing && (
            <div className="flex justify-center py-20">
              <LoadingSpinner />
            </div>
          )}

          {compareError && !isComparing && (
            <div className="flex flex-col items-center gap-3 py-10">
              <p className="text-destructive text-sm">{compareError}</p>
              <Button variant="outline" onClick={() => resetCompare()}>다시 시도</Button>
            </div>
          )}

          {compareResult && !isComparing && (
            <>
              <UserProfileCards userA={compareResult.userA} userB={compareResult.userB} />
              <CompatibilityScore
                compatibility={compareResult.compatibility}
                compatibilityDescription={compareResult.compatibilityDescription}
              />
              <StyleRadarChart compareResult={compareResult} />
              <StrengthsChallenges strengths={compareResult.strengths} challenges={compareResult.challenges} />
              <CompareCTA userAUsername={compareResult.userA.username} onReset={handleReset} />
            </>
          )}
        </div>
      </main>

      <AppFooter />
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense>
      <CompareContent />
    </Suspense>
  );
}
