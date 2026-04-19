"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import type { AnalysisResult } from "@/types";

interface ProfileHeroProps {
  result: AnalysisResult;
}

export function ProfileHero({ result }: ProfileHeroProps) {
  const { devType, username, avatarUrl, name, aiDescription } = result;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        className="overflow-hidden border-2"
        style={{ borderColor: devType.color + "60", backgroundColor: devType.color + "08" }}
      >
        <CardContent className="p-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="shrink-0">
              <img
                src={avatarUrl}
                alt={username}
                className="w-20 h-20 rounded-full border-2"
                style={{ borderColor: devType.color + "80" }}
              />
            </div>
            <div className="flex flex-col gap-2 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-sm text-muted-foreground">@{username}</span>
                {name && <span className="text-sm font-medium">{name}</span>}
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-3">
                <span className="text-5xl">{devType.emoji}</span>
                <div>
                  <p className="text-2xl font-bold">{devType.name}</p>
                  <p className="text-sm text-muted-foreground">{devType.shortDescription}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-lg bg-background/60 border">
            <p className="text-sm leading-relaxed text-muted-foreground">{aiDescription}</p>
          </div>

          <p className="mt-4 text-center text-sm italic font-medium" style={{ color: devType.color }}>
            &quot;{devType.meme}&quot;
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
