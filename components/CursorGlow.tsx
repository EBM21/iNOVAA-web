"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const springX = useSpring(x, { stiffness: 60, damping: 22, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 60, damping: 22, mass: 0.6 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setActive(true);
    };
    const leave = () => setActive(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
    };
  }, [x, y]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] hidden overflow-hidden md:block" style={{ mixBlendMode: "multiply" }}>
      <motion.div
        style={{ x: springX, y: springY }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ opacity: { duration: 0.6 } }}
        className="absolute left-0 top-0 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full"
      >
        <div
          className="h-full w-full rounded-full blur-[90px]"
          style={{
            background:
              "radial-gradient(circle, rgba(59,130,246,0.16) 0%, rgba(236,72,153,0.12) 40%, rgba(249,115,22,0.08) 65%, transparent 80%)",
          }}
        />
      </motion.div>
    </div>
  );
}
