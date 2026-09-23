"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function ScrollProgress() {
  const progress = useMotionValue(0);
  const scaleY = useSpring(progress, { stiffness: 200, damping: 30, restDelta: 0.001 });
  const dotTop = useTransform(scaleY, (v) => `${v * 100}%`);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? window.scrollY / max : 0;
      progress.set(Math.min(Math.max(pct, 0), 1));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [progress]);

  return (
    <div className="pointer-events-none fixed inset-y-0 left-5 z-40 hidden items-center justify-center md:flex lg:left-8">
      <div className="flex h-[56vh] w-5 items-center justify-center rounded-full border border-border-strong bg-surface/80 shadow-[0_10px_36px_-10px_rgba(26,26,31,0.22)] backdrop-blur-md">
        {/* rail — both fill and thumb are positioned relative to this */}
        <div className="relative h-[calc(100%-14px)] w-[5px] rounded-full bg-border-strong">
          <motion.div
            style={{ scaleY }}
            className="absolute inset-0 origin-top rounded-full bg-gradient-to-b from-accent-blue via-brand-magenta to-brand-orange"
          />

          {/* traveling glow thumb */}
          <motion.div style={{ top: dotTop }} className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.span
              animate={{ scale: [1, 2, 1], opacity: [0.55, 0, 0.55] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full bg-brand-magenta blur-[3px]"
            />
            <span className="relative block h-4 w-4 rounded-full bg-white shadow-[0_2px_10px_-1px_rgba(26,26,31,0.4)] ring-[3px] ring-brand-magenta" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
