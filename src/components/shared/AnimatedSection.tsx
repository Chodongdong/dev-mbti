"use client";

import { motion } from "framer-motion";

interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  /** "view": 스크롤 진입 시 1회 애니메이션, "mount": 마운트 즉시 애니메이션 */
  trigger?: "view" | "mount";
}

export function AnimatedSection({ children, delay = 0, className, trigger = "view" }: AnimatedSectionProps) {
  const triggerProps =
    trigger === "view"
      ? { whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-60px" } }
      : { animate: { opacity: 1, y: 0 } };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      {...triggerProps}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
