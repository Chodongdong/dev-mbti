"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AppHeader } from "@/components/shared/AppHeader";
import { AppFooter } from "@/components/shared/AppFooter";
import { DevTypeCard } from "@/components/shared/DevTypeCard";
import { DEV_TYPES } from "@/constants/devTypes";
import type { DevType } from "@/types";
import { TypeDetailModal } from "./TypeDetailModal";

export default function TypesPage() {
  const [selected, setSelected] = useState<DevType | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader
        right={
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← 내 유형 분석하기
          </Link>
        }
      />

      <main className="flex flex-col items-center flex-1 px-4 pb-20">
        <div className="w-full max-w-5xl mt-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-10"
          >
            <h1 className="text-3xl font-bold mb-3">개발자 유형 8종</h1>
            <p className="text-muted-foreground">
              GitHub 활동 패턴으로 분류한 개발자 성향 유형.<br />
              카드를 클릭하면 자세히 볼 수 있어요.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DEV_TYPES.map((devType, i) => (
              <motion.div
                key={devType.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="h-full"
              >
                <DevTypeCard
                  devType={devType}
                  size="md"
                  onClick={() => setSelected(devType)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <AppFooter />

      <TypeDetailModal devType={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
