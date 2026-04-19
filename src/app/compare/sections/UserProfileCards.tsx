"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import type { AnalysisResult } from "@/types";

interface UserProfileCardsProps {
  userA: AnalysisResult;
  userB: AnalysisResult;
}

export function UserProfileCards({ userA, userB }: UserProfileCardsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="grid grid-cols-2 gap-4"
    >
      {[userA, userB].map((user) => (
        <Card
          key={user.username}
          className="overflow-hidden border-2"
          style={{ borderColor: user.devType.color + "60", backgroundColor: user.devType.color + "08" }}
        >
          <CardContent className="p-5 flex flex-col items-center text-center gap-3">
            <img
              src={user.avatarUrl}
              alt={user.username}
              className="w-14 h-14 rounded-full border-2"
              style={{ borderColor: user.devType.color + "80" }}
            />
            <div>
              <p className="text-xs text-muted-foreground">@{user.username}</p>
              <p className="text-3xl mt-1">{user.devType.emoji}</p>
              <p className="font-bold text-sm mt-1">{user.devType.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{user.devType.shortDescription}</p>
            </div>
            <p className="text-xs italic" style={{ color: user.devType.color }}>
              &quot;{user.devType.meme}&quot;
            </p>
          </CardContent>
        </Card>
      ))}
    </motion.div>
  );
}
