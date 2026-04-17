"use client";

import { motion } from "framer-motion";

type Props = {
  message?: string;
};

const steps = [
  "GitHub 데이터 수집 중...",
  "커밋 패턴 분석 중...",
  "AI가 유형 분류 중...",
  "결과 정리 중...",
];

export function LoadingSpinner({ message }: Props) {
  return (
    <div className="flex flex-col items-center gap-6 py-12">
      <div className="relative w-20 h-20">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute inset-0 rounded-full border-2 border-primary"
            animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }}
            transition={{ duration: 1.8, delay: i * 0.6, repeat: Infinity }}
          />
        ))}
        <span className="absolute inset-0 flex items-center justify-center text-2xl">🔍</span>
      </div>

      {message ? (
        <p className="text-muted-foreground text-sm">{message}</p>
      ) : (
        <motion.div className="flex flex-col items-center gap-1">
          {steps.map((step, i) => (
            <motion.p
              key={step}
              className="text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, delay: i * 2, repeat: Infinity, repeatDelay: steps.length * 2 - 2 }}
            >
              {step}
            </motion.p>
          ))}
        </motion.div>
      )}
    </div>
  );
}
