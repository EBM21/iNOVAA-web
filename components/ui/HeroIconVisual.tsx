"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export default function HeroIconVisual({ icon }: { icon: ReactNode }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div
        className="absolute h-64 w-64 rounded-full opacity-30 blur-3xl sm:h-80 sm:w-80"
        style={{ backgroundImage: "var(--tracker-orange-gradient)" }}
      />
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="icon-badge-orange flex h-40 w-40 items-center justify-center rounded-[2rem] sm:h-52 sm:w-52"
        >
          {icon}
        </motion.div>
      </motion.div>
    </div>
  );
}
