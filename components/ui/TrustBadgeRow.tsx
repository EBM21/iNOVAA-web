"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function TrustBadgeRow({
  badges,
  className,
}: {
  badges: { icon: ReactNode; label: string }[];
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-6 sm:gap-8", className)}>
      {badges.map((b, i) => (
        <motion.div
          key={b.label}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2.5"
        >
          <span className="icon-badge-orange flex h-9 w-9 shrink-0 items-center justify-center rounded-full">
            {b.icon}
          </span>
          <span className="text-xs font-medium text-muted">{b.label}</span>
        </motion.div>
      ))}
    </div>
  );
}
