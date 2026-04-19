"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StrengthsChallengesProps {
  strengths: string[];
  challenges: string[];
}

export function StrengthsChallenges({ strengths, challenges }: StrengthsChallengesProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-base">💪 함께하면 강점</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {strengths.map((s) => (
            <div key={s} className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5 shrink-0">✓</span>
              <p className="text-sm">{s}</p>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">⚠️ 주의할 점</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {challenges.map((c) => (
            <div key={c} className="flex items-start gap-2">
              <span className="text-amber-500 mt-0.5 shrink-0">!</span>
              <p className="text-sm">{c}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}
