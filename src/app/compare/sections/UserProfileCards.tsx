"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import type { AnalysisResult } from "@/types";

interface UserProfileCardsProps {
  userA: AnalysisResult;
  userB: AnalysisResult;
}

export function UserProfileCards({ userA, userB }: UserProfileCardsProps) {
  return (
    <AnimatedSection trigger="mount" className="grid grid-cols-2 gap-4">
      {[userA, userB].map((user) => (
        <Card
          key={user.username}
          className="overflow-hidden border-2"
          style={{ borderColor: user.devType.color + "60", backgroundColor: user.devType.color + "08" }}
        >
          <CardContent className="p-5 flex flex-col items-center text-center gap-3">
            <Image
              src={user.avatarUrl}
              alt={user.username}
              width={56}
              height={56}
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
    </AnimatedSection>
  );
}
