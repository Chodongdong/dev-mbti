"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CTAButtonGroup } from "@/components/shared/CTAButtonGroup";

interface CompareCTAProps {
  userAUsername: string;
  onReset: () => void;
}

export function CompareCTA({ userAUsername, onReset }: CompareCTAProps) {
  const router = useRouter();

  return (
    <CTAButtonGroup delay={0.4}>
      <Button variant="outline" onClick={() => router.push("/")}>다른 유저 분석하기</Button>
      <Button variant="outline" onClick={onReset}>다시 비교하기</Button>
      <Button onClick={() => router.push(`/result/${userAUsername}`)}>
        @{userAUsername} 결과 보기
      </Button>
    </CTAButtonGroup>
  );
}
