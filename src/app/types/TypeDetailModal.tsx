"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { DevType } from "@/types";

interface TypeDetailModalProps {
  devType: DevType | null;
  onClose: () => void;
}

export function TypeDetailModal({ devType, onClose }: TypeDetailModalProps) {
  return (
    <AnimatePresence>
      {devType && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-background border-2 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
              style={{ borderColor: devType.color + "60" }}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="p-6 rounded-t-2xl"
                style={{ backgroundColor: devType.color + "12" }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="text-6xl">{devType.emoji}</span>
                    <div>
                      <h2 className="text-2xl font-bold">{devType.name}</h2>
                      <p className="text-sm text-muted-foreground mt-1">{devType.shortDescription}</p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-muted-foreground hover:text-foreground transition-colors text-xl leading-none mt-1 shrink-0"
                    aria-label="닫기"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-6 flex flex-col gap-6">
                <p className="text-sm text-muted-foreground leading-relaxed">{devType.description}</p>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-semibold mb-2 flex items-center gap-1">
                      <span>💪</span> 강점
                    </h3>
                    <ul className="flex flex-col gap-1.5">
                      {devType.strengths.map((s) => (
                        <li key={s} className="flex items-start gap-2 text-sm">
                          <span className="text-green-500 shrink-0 mt-0.5">✓</span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold mb-2 flex items-center gap-1">
                      <span>⚠️</span> 약점
                    </h3>
                    <ul className="flex flex-col gap-1.5">
                      {devType.weaknesses.map((w) => (
                        <li key={w} className="flex items-start gap-2 text-sm">
                          <span className="text-amber-500 shrink-0 mt-0.5">!</span>
                          {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div
                  className="rounded-xl p-4 flex flex-col gap-2"
                  style={{ backgroundColor: devType.color + "10", borderLeft: `3px solid ${devType.color}` }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">🏆 닮은 프로젝트</span>
                    <Badge style={{ backgroundColor: devType.color + "20", color: devType.color }} className="text-xs">
                      {devType.famousProject}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground italic">&quot;{devType.meme}&quot;</p>
                </div>

                <Button
                  className="w-full"
                  style={{ backgroundColor: devType.color, color: "#fff" }}
                  onClick={() => {
                    window.location.href = "/";
                  }}
                >
                  내 유형 분석해보기 →
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
