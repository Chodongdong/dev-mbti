"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Trash2, Trophy } from "lucide-react";
import { AppHeader } from "@/components/shared/AppHeader";
import { AppFooter } from "@/components/shared/AppFooter";
import { Button } from "@/components/ui/button";
import { getHistory, clearHistory, getRanking } from "@/lib/history";
import type { RankingItem } from "@/lib/history";
import type { HistoryItem } from "@/types";
import { DEV_TYPE_MAP } from "@/constants/devTypes";

export default function HistoryPage() {
  const router = useRouter();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [ranking, setRanking] = useState<RankingItem[]>([]);

  useEffect(() => {
    setHistory(getHistory());
    setRanking(getRanking());
  }, []);

  const handleClear = () => {
    clearHistory();
    setHistory([]);
    setRanking([]);
  };

  const maxCount = ranking[0]?.count ?? 1;

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
        <div className="w-full max-w-2xl mt-12 space-y-12">
          {/* 최근 분석 히스토리 */}
          <section>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-muted-foreground" />
                <h1 className="text-xl font-semibold">최근 분석 히스토리</h1>
              </div>
              {history.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-muted-foreground"
                  onClick={handleClear}
                >
                  <Trash2 size={13} className="mr-1" />
                  전체 삭제
                </Button>
              )}
            </div>

            {history.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <p className="text-4xl mb-3">🔍</p>
                <p className="text-sm">아직 분석한 유저가 없어요.</p>
                <Link
                  href="/"
                  className="inline-block mt-4 text-sm underline underline-offset-4 hover:text-foreground transition-colors"
                >
                  지금 분석해보기
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <AnimatePresence>
                  {history.map((item, i) => (
                    <motion.button
                      key={item.username}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 12 }}
                      transition={{ duration: 0.25, delay: i * 0.04 }}
                      onClick={() => router.push(`/result/${item.username}`)}
                      className="flex items-center gap-4 p-4 rounded-xl border bg-card hover:bg-accent transition-colors text-left"
                    >
                      <img
                        src={item.avatarUrl}
                        alt={item.username}
                        className="w-10 h-10 rounded-full shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate">@{item.username}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {item.devTypeEmoji} {item.devTypeName}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0">
                        {new Date(item.analyzedAt).toLocaleDateString("ko-KR")}
                      </span>
                    </motion.button>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </section>

          {/* 유형 랭킹 */}
          {ranking.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-5">
                <Trophy size={18} className="text-muted-foreground" />
                <h2 className="text-xl font-semibold">유형 랭킹</h2>
                <span className="text-xs text-muted-foreground ml-1">내가 만난 유형 분포</span>
              </div>

              <div className="flex flex-col gap-3">
                {ranking.map((item, i) => {
                  const color = DEV_TYPE_MAP[item.devTypeId]?.color ?? "#6366f1";
                  const pct = Math.round((item.count / maxCount) * 100);

                  return (
                    <motion.div
                      key={item.devTypeName}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.06 }}
                      className="flex items-center gap-3"
                    >
                      <span className="w-5 text-xs text-muted-foreground text-right shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-lg shrink-0">{item.devTypeEmoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium truncate">{item.devTypeName}</span>
                          <span className="text-xs text-muted-foreground shrink-0 ml-2">
                            {item.count}명
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 0.6, delay: 0.2 + i * 0.06, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
