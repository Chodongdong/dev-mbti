"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

interface CompareCTAProps {
  userAUsername: string;
  onReset: () => void;
}

export function CompareCTA({ userAUsername, onReset }: CompareCTAProps) {
  const router = useRouter();

  return (
    <AnimatedSection trigger="mount" delay={0.4} className="flex flex-col sm:flex-row gap-3 justify-center">
      <Button variant="outline" onClick={() => router.push("/")}>다른 유저 분석하기</Button>
      <Button variant="outline" onClick={onReset}>다시 비교하기</Button>
      <Button onClick={() => router.push(`/result/${userAUsername}`)}>
        @{userAUsername} 결과 보기
      </Button>
    </AnimatedSection>
  );
}
