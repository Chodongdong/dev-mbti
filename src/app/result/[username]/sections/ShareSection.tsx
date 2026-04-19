"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShareButtons } from "@/components/shared/ShareButtons";
import type { DevType } from "@/types";

interface ShareSectionProps {
  devType: DevType;
}

export function ShareSection({ devType }: ShareSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.6 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-base">📣 결과 공유하기</CardTitle>
        </CardHeader>
        <CardContent>
          <ShareButtons typeName={devType.name} emoji={devType.emoji} />
        </CardContent>
      </Card>
    </motion.div>
  );
}
