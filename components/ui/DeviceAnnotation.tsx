"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function DeviceAnnotation({
  x,
  y,
  dir = "right",
  title,
  text,
  delay = 0,
}: {
  x: string;
  y: string;
  dir?: "left" | "right";
  title: string;
  text: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay }}
      className={cn("absolute hidden items-center gap-2 sm:flex", dir === "left" && "flex-row-reverse")}
      style={{ left: x, top: y }}
    >
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="absolute h-full w-full animate-ping rounded-full bg-accent-teal opacity-75" />
        <span className="relative h-2 w-2 rounded-full bg-accent-teal" />
      </span>
      <div className="h-px w-8 shrink-0 bg-white/30" />
      <div className={dir === "left" ? "text-right" : "text-left"}>
        <p className="whitespace-nowrap text-[11px] font-semibold text-white">{title}</p>
        <p className="whitespace-nowrap text-[10px] text-white/55">{text}</p>
      </div>
    </motion.div>
  );
}
