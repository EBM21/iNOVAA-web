"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard,
  Radio,
  Users,
  Building2,
  ArrowRight,
  Activity,
  Waypoints,
  ScanFace,
} from "lucide-react";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import FadeImage from "./ui/FadeImage";
import { platformFeatures } from "@/lib/data";
import { cn } from "@/lib/utils";

const icons = { LayoutDashboard, Radio, Users, Building2 };

const diagrams = [
  (
    <FadeImage key="d1" src="/tracker-rock-hero.png" alt="iNOVAA Tracker band" className="h-full w-full" maskSize="92% 88%" />
  ),
  (
    <div key="d2" className="flex h-full w-full items-center justify-center">
      <Activity className="h-20 w-20 text-accent-blue" strokeWidth={1.5} />
    </div>
  ),
  (
    <div key="d3" className="flex h-full w-full items-center justify-center">
      <ScanFace className="h-20 w-20 text-accent-blue" strokeWidth={1.5} />
    </div>
  ),
  (
    <div key="d4" className="flex h-full w-full items-center justify-center">
      <Waypoints className="h-20 w-20 text-accent-blue" strokeWidth={1.5} />
    </div>
  ),
];

export default function PlatformGrid() {
  const [active, setActive] = useState(0);
  const activeFeature = platformFeatures[active];
  const ActiveIcon = icons[activeFeature.icon as keyof typeof icons];

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading eyebrow="Platform" index="§07" title="Four systems, one job record" />

        <Reveal delay={0.1} className="surface-card mt-14 grid gap-0 overflow-hidden rounded-3xl lg:grid-cols-[0.85fr_1.15fr]">
          <div className="divide-y divide-border border-b border-border bg-surface-2 lg:border-b-0 lg:border-r">
            {platformFeatures.map((f, i) => {
              const Icon = icons[f.icon as keyof typeof icons];
              const isActive = active === i;
              return (
                <button
                  key={f.title}
                  onClick={() => setActive(i)}
                  className={cn(
                    "relative flex w-full items-center gap-4 px-6 py-5 text-left transition-colors",
                    isActive ? "bg-surface" : "hover:bg-surface/60"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="platform-active-bar"
                      className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-brand-purple to-brand-orange"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors",
                      isActive ? "bg-gradient-to-br from-accent-blue to-accent-teal" : "bg-surface-2"
                    )}
                  >
                    <Icon className={cn("h-4.5 w-4.5", isActive ? "text-white" : "text-muted")} strokeWidth={2} />
                  </span>
                  <span className={cn("text-sm font-semibold", isActive ? "text-foreground" : "text-muted")}>
                    {f.title}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative min-h-[420px] p-8 sm:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="flex h-full flex-col"
              >
                <div className="flex h-56 items-center justify-center overflow-hidden rounded-2xl border border-border bg-surface-2 sm:h-64">
                  {diagrams[active]}
                </div>
                <div className="mt-7 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent-blue to-accent-teal">
                    <ActiveIcon className="h-5 w-5 text-white" strokeWidth={2} />
                  </span>
                  <h3 className="text-xl font-bold text-foreground">{activeFeature.title}</h3>
                </div>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">{activeFeature.description}</p>
                <Link
                  href={activeFeature.href}
                  className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent-blue"
                >
                  Explore
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
