"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Clock, Trash2 } from "lucide-react";
import { getHistory, clearHistory } from "@/lib/history";
import type { HistoryItem } from "@/types";

export function HistoryList() {
  const router = useRouter();
  const [history, setHistory] = useState<HistoryItem[]>(() => getHistory());

  const handleRemove = () => {
    clearHistory();
    setHistory([]);
  };

  if (history.length === 0) return null;

  return (
    <div className="w-full max-w-md">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock size={14} />
          <span>최근 분석</span>
        </div>
        <div className="flex items-center gap-1">
          <Link
            href="/history"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors px-1 py-1"
          >
            전체 보기 →
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-muted-foreground h-auto p-1"
            onClick={handleRemove}
          >
            <Trash2 size={12} className="mr-1" />
            삭제
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <AnimatePresence>
          {history.map((item) => (
            <motion.button
              key={item.username}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              onClick={() => router.push(`/result/${item.username}`)}
              className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent transition-colors text-left"
            >
              <Image
                src={item.avatarUrl}
                alt={item.username}
                width={32}
                height={32}
                className="rounded-full shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">@{item.username}</p>
                <p className="text-xs text-muted-foreground">
                  {item.devTypeEmoji} {item.devTypeName}
                </p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {new Date(item.analyzedAt).toLocaleDateString("ko-KR")}
              </span>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
