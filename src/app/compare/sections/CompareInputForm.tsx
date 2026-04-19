"use client";

import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CompareInputFormProps {
  userA: string;
  userB: string;
  isComparing: boolean;
  onUserAChange: Dispatch<SetStateAction<string>>;
  onUserBChange: Dispatch<SetStateAction<string>>;
  onCompare: () => void;
}

export function CompareInputForm({ userA, userB, isComparing, onUserAChange, onUserBChange, onCompare }: CompareInputFormProps) {
  const handleKey = (e: React.KeyboardEvent) => e.key === "Enter" && onCompare();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-base">두 개발자의 GitHub 유저네임을 입력하세요</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="첫 번째 유저네임"
            value={userA}
            onChange={(e) => onUserAChange(e.target.value)}
            onKeyDown={handleKey}
          />
          <div className="flex items-center justify-center text-muted-foreground font-bold">VS</div>
          <Input
            placeholder="두 번째 유저네임"
            value={userB}
            onChange={(e) => onUserBChange(e.target.value)}
            onKeyDown={handleKey}
          />
          <Button
            onClick={onCompare}
            disabled={isComparing || !userA.trim() || !userB.trim()}
            className="shrink-0"
          >
            비교하기
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
