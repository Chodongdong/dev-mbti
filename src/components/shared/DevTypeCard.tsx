"use client";

import { DevType } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";

type Props = {
  devType: DevType;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
};

export function DevTypeCard({ devType, onClick, size = "md" }: Props) {
  const sizeStyles = {
    sm: "p-3 min-h-[80px]",
    md: "p-5",
    lg: "p-7",
  };

  return (
    <motion.div
      className="h-full"
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card
        onClick={onClick}
        className={`cursor-pointer border-2 transition-colors h-full flex flex-col ${sizeStyles[size]}`}
        style={{ borderColor: devType.color + "40", backgroundColor: devType.color + "08" }}
      >
        <CardHeader className="p-0 pb-3">
          <div className="flex items-center gap-3">
            <span className={size === "sm" ? "text-2xl" : "text-4xl"}>{devType.emoji}</span>
            <div>
              <p className={`font-bold ${size === "sm" ? "text-sm" : "text-base"}`}>
                {devType.name}
              </p>
              <p className="text-xs text-muted-foreground">{devType.shortDescription}</p>
            </div>
          </div>
        </CardHeader>

        {size !== "sm" && (
          <CardContent className="p-0 flex flex-col flex-1">
            <p className="text-sm text-muted-foreground mb-3 flex-1">{devType.description}</p>
            <div className="flex flex-wrap gap-1">
              {devType.strengths.map((s) => (
                <Badge
                  key={s}
                  variant="secondary"
                  className="text-xs"
                  style={{ backgroundColor: devType.color + "20", color: devType.color }}
                >
                  {s}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3 italic">
              &quot;{devType.meme}&quot;
            </p>
          </CardContent>
        )}
      </Card>
    </motion.div>
  );
}
