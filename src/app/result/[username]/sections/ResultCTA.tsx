"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CTAButtonGroup } from "@/components/shared/CTAButtonGroup";
import type { DevType } from "@/types";

interface ResultCTAProps {
  username: string;
  devType: DevType;
}

export function ResultCTA({ username, devType }: ResultCTAProps) {
  const router = useRouter();

  return (
    <CTAButtonGroup delay={0.7}>
      <Button variant="outline" onClick={() => router.push("/")}>다른 유저 분석하기</Button>
      <Button variant="outline" onClick={() => router.push("/types")}>전체 유형 보기</Button>
      <Button
        onClick={() => router.push(`/compare?userA=${username}`)}
        style={{ backgroundColor: devType.color }}
      >
        개발자 궁합 비교하기
      </Button>
    </CTAButtonGroup>
  );
}
