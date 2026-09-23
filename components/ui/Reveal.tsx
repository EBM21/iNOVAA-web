"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export default function Reveal({
  children,
  delay = 0,
  y = 18,
  wipe = false,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  wipe?: boolean;
  className?: string;
}) {
  if (wipe) {
    return (
      <motion.div
        initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0.4 }}
        whileInView={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay, ease: [0.65, 0, 0.35, 1] }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
