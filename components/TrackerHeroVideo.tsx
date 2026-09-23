"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function TrackerHeroVideo({ className }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className={cn("relative h-full w-full", className)}
    >
      <video
        className="h-full w-full object-contain mix-blend-screen"
        src="/hero-tracker.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
    </motion.div>
  );
}
