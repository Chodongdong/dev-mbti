"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AXIS_KEYS, AXIS_LABELS, getAxisValue } from "@/constants/axes";
import type { DevType, DevTypeAxis } from "@/types";

interface StyleAxesProps {
  axes: DevTypeAxis;
  devType: DevType;
}

export function StyleAxes({ axes, devType }: StyleAxesProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-base">개발 스타일 분석</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          {AXIS_KEYS.map((key) => {
            const [leftLabel, rightLabel] = AXIS_LABELS[key];
            const val = getAxisValue(key, axes);
            return (
              <div key={key}>
                <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                  <span>{leftLabel}</span>
                  <span>{rightLabel}</span>
                </div>
                <div className="relative h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="absolute left-0 top-0 h-full rounded-full"
                    style={{ backgroundColor: devType.color }}
                    initial={{ width: "0%" }}
                    animate={{ width: `${val}%` }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                  />
                </div>
                <p className="text-xs text-right mt-1 font-medium" style={{ color: devType.color }}>
                  {val <= 30 ? leftLabel : val >= 70 ? rightLabel : "중간형"}
                </p>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </motion.div>
  );
}
