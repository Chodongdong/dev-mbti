"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { DevType } from "@/types";

interface ResultCTAProps {
  username: string;
  devType: DevType;
}

export function ResultCTA({ username, devType }: ResultCTAProps) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.7 }}
      className="flex flex-col sm:flex-row gap-3 justify-center"
    >
      <Button variant="outline" onClick={() => router.push("/")}>다른 유저 분석하기</Button>
      <Button variant="outline" onClick={() => router.push("/types")}>전체 유형 보기</Button>
      <Button
        onClick={() => router.push(`/compare?userA=${username}`)}
        style={{ backgroundColor: devType.color }}
      >
        개발자 궁합 비교하기
      </Button>
    </motion.div>
  );
}
