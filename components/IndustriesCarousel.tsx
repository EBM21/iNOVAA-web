"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { industryGroups } from "@/lib/data";
import { cn } from "@/lib/utils";

const gradients = [
  "from-accent-blue to-accent-teal",
  "from-brand-purple to-brand-magenta",
  "from-brand-magenta to-brand-orange",
  "from-accent-teal to-brand-purple",
  "from-brand-orange to-accent-blue",
];

export default function IndustriesCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = industryGroups.length;

  const go = (dir: 1 | -1) => {
    setDirection(dir);
    setIndex((i) => (i + dir + total) % total);
  };

  const goTo = (i: number) => {
    setDirection(i > index ? 1 : -1);
    setIndex(i);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => go(1), 5500);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const restartTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    restartTimer();
    if (info.offset.x < -80) go(1);
    else if (info.offset.x > 80) go(-1);
  };

  const group = industryGroups[index];

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-3xl">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={group.slug}
            custom={direction}
            initial={{ x: direction > 0 ? 80 : -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction > 0 ? -80 : 80, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            className="surface-card cursor-grab overflow-hidden rounded-3xl active:cursor-grabbing"
          >
            <div className={cn("h-40 bg-gradient-to-br", gradients[index % gradients.length])} />
            <div className="p-8 sm:p-10">
              <span className="font-mono-data text-xs text-muted-2">0{index + 1} / 0{total}</span>
              <h3 className="mt-2 text-2xl font-bold tracking-tight text-foreground">{group.name}</h3>
              <p className="mt-3 max-w-xl text-muted leading-relaxed">{group.blurb}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.sub.map((s) => (
                  <li key={s} className="rounded-full border border-border-strong bg-surface-2 px-3 py-1.5 text-xs font-medium text-muted">
                    {s}
                  </li>
                ))}
              </ul>
              <Link
                href={`/industries/${group.slug}`}
                className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-accent-blue"
              >
                Explore {group.name}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex gap-2">
          {industryGroups.map((g, i) => (
            <button
              key={g.slug}
              onClick={() => {
                goTo(i);
                restartTimer();
              }}
              aria-label={`Go to ${g.name}`}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                index === i ? "w-6 bg-gradient-to-r from-brand-purple to-brand-orange" : "w-2 bg-border-strong hover:bg-muted-2"
              )}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              go(-1);
              restartTimer();
            }}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border-strong text-muted transition-all hover:-translate-y-0.5 hover:border-accent-blue hover:text-accent-blue hover:shadow-md"
            aria-label="Previous industry"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => {
              go(1);
              restartTimer();
            }}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border-strong text-muted transition-all hover:-translate-y-0.5 hover:border-accent-blue hover:text-accent-blue hover:shadow-md"
            aria-label="Next industry"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
