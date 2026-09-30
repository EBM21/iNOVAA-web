"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, RefreshCw } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import BrowserFrame from "./ui/BrowserFrame";
import SampleBadge from "./ui/SampleBadge";
import { portalScreens } from "@/lib/portalScreens";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

const sides = {
  portal: {
    step: "02 · The software brain",
    name: "iNOVAA Portal",
    text: "Joins it with photos and the schedule, verifies the job, scores efficiency.",
    chips: ["Verified jobs", "Efficiency score", "Live status"],
  },
};

function Chips({ items, tone, className }: { items: string[]; tone: "orange" | "brand"; className?: string }) {
  return (
    <div className={cn("mt-3 flex flex-wrap gap-1.5", className)}>
      {items.map((c) => (
        <span
          key={c}
          className={cn(
            "rounded-full border px-2.5 py-1 text-[11px] font-medium",
            tone === "orange" ? "border-brand-orange/25 bg-brand-orange/[0.07] text-brand-orange" : "border-brand-magenta/20 bg-brand-magenta/[0.06] text-brand-magenta"
          )}
        >
          {c}
        </span>
      ))}
    </div>
  );
}

// Data dots travelling across the seam, device → dashboard.
function DataStream({ vertical }: { vertical?: boolean }) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;
  return (
    <>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-brand-magenta shadow-[0_0_10px_rgba(214,64,159,0.7)]"
          style={vertical ? { left: "50%", marginLeft: -3 } : { top: "50%", marginTop: -3 }}
          initial={vertical ? { top: "0%", opacity: 0 } : { left: "0%", opacity: 0 }}
          animate={vertical ? { top: ["0%", "100%"], opacity: [0, 1, 1, 0] } : { left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2.4, delay: i * 0.8, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </>
  );
}

export default function HowItConnects() {
  const shot = portalScreens[0];

  return (
    <section className="bg-surface-2 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          align="center"
          eyebrow="How it connects"
          index="§04"
          title="The Tracker feeds it. The Portal makes sense of it."
          description="Two sides of one product: the wearable collects the data, the software turns it into a verified job and an efficiency score."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative mt-14 overflow-hidden rounded-[2rem] border border-border bg-background shadow-[0_2px_8px_-2px_rgba(21,18,16,0.06),0_40px_80px_-40px_rgba(21,18,16,0.3)] lg:grid lg:min-h-[560px] lg:grid-cols-2"
        >
          {/* faint brand wash behind the Portal half */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(ellipse 60% 70% at 85% 50%, rgba(214,64,159,0.07), rgba(124,58,237,0.04) 45%, transparent 75%)" }}
          />

          {/* LEFT — the Tracker. The photo dissolves into the light stage instead of ending on a hard edge. */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="relative h-[24rem] sm:h-[28rem] lg:h-auto"
          >
            <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_55%,transparent)] lg:[mask-image:linear-gradient(to_right,black_50%,transparent_96%)]">
              <Image
                src="/tracker-rock-hero.png"
                alt="Orange iNOVAA Tracker wearable — the sensor that feeds the iNOVAA Portal"
                fill
                sizes="(min-width: 1024px) 640px, 100vw"
                className="object-cover"
                style={{ objectPosition: "50% 42%" }}
              />
            </div>
            {/* Card takes the diagram's own 1195:635 ratio, so the whole image shows — nothing cropped or zoomed. */}
            <div className="absolute bottom-4 left-4 right-4 aspect-[1195/635] max-w-xs overflow-hidden rounded-2xl border border-white/60 bg-white/85 shadow-[0_20px_40px_-24px_rgba(21,18,16,0.4)] backdrop-blur-md sm:bottom-6 sm:left-6 lg:bottom-8 lg:left-8">
              <Image
                src="/tracker-parts-diagram.png"
                alt="Exploded diagram of the iNOVAA Tracker: silicone strap, main PCB, Li-Po battery, side button, casing, and back cover"
                fill
                sizes="(min-width: 640px) 320px, 90vw"
                className="object-cover"
              />
            </div>
          </motion.div>

          {/* SEAM — sync node sitting on the blend, with data flowing across it */}
          <div className="relative z-10 flex h-20 items-center justify-center lg:absolute lg:left-1/2 lg:top-1/2 lg:h-auto lg:w-40 lg:-translate-x-1/2 lg:-translate-y-1/2" aria-hidden>
            <div className="absolute inset-y-0 left-1/2 w-px lg:hidden">
              <DataStream vertical />
            </div>
            <div className="absolute inset-x-0 top-1/2 hidden h-px lg:block" style={{ backgroundImage: "linear-gradient(90deg, transparent, rgba(214,64,159,0.45), transparent)" }}>
              <DataStream />
            </div>
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.45, ease: EASE }}
              className="relative flex flex-col items-center"
            >
              <span className="icon-badge-brand relative flex h-12 w-12 items-center justify-center rounded-full ring-[6px] ring-background/80">
                <span className="absolute inset-0 animate-ping rounded-full bg-brand-magenta/25" />
                <RefreshCw className="relative h-5 w-5" strokeWidth={2} />
              </span>
              <span className="label-mono mt-2 hidden rounded-full bg-background/90 px-2 py-0.5 text-[9px] text-muted lg:block">Syncs over BLE</span>
            </motion.div>
          </div>

          {/* RIGHT — the Portal */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            className="relative flex flex-col justify-center px-4 pb-6 sm:px-8 sm:pb-8 lg:py-12 lg:pl-20 lg:pr-12"
          >
            <p className="label-mono text-[10px] text-brand-magenta">{sides.portal.step}</p>
            <p className="mt-1 text-lg font-bold tracking-tight text-foreground">{sides.portal.name}</p>
            <p className="mt-1 max-w-md text-sm leading-snug text-muted">{sides.portal.text}</p>
            <Chips items={sides.portal.chips} tone="brand" />
            <p className="mt-4 flex max-w-md items-start gap-2 text-sm leading-snug text-foreground">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-magenta" strokeWidth={2} />
              <span>
                <strong className="font-semibold">Photos pinned to the exact spot.</strong> Every job photo lands on its
                position on the site diagram — the exact panel, unit, or zone.
              </span>
            </p>
            <div className="relative mt-6">
              <BrowserFrame src={shot.src} alt={shot.alt} url={shot.url} sizes="(min-width: 1024px) 560px, 92vw" />
              {/* sits just below the browser chrome bar (h-9) */}
              <SampleBadge className="absolute right-3 top-12" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
