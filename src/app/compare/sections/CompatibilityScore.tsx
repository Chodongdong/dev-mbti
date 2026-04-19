"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface CompatibilityScoreProps {
  compatibility: number;
  compatibilityDescription: string;
}

export function CompatibilityScore({ compatibility, compatibilityDescription }: CompatibilityScoreProps) {
  const circumference = 2 * Math.PI * 42;
  const offset = circumference * (1 - compatibility / 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <Card>
        <CardContent className="p-8 flex flex-col items-center gap-4">
          <p className="text-sm text-muted-foreground">개발자 궁합 점수</p>
          <div className="relative flex items-center justify-center w-32 h-32">
            <svg className="absolute inset-0" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#e5e7eb" strokeWidth="8" />
              <motion.circle
                cx="50" cy="50" r="42"
                fill="none" stroke="#6366f1" strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                transform="rotate(-90 50 50)"
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
              />
            </svg>
            <motion.span
              className="text-3xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {compatibility}
            </motion.span>
          </div>
          <p className="text-sm text-center text-muted-foreground max-w-sm leading-relaxed">
            {compatibilityDescription}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
