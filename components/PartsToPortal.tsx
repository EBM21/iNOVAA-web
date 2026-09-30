"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";
import ImageCrop from "./ui/ImageCrop";
import SampleBadge from "./ui/SampleBadge";
import { PORTAL_SHOT_H, PORTAL_SHOT_W } from "@/lib/portalScreens";

const EASE = [0.16, 1, 0.3, 1] as const;

// Each Tracker part, paired with the region of the real Portal screen its data shows up in.
// Crops are [x, y, w, h] in the 1870 × 841 screenshots.
const pairs = [
  {
    part: { src: "/tracker-part-sensor.png", w: 1360, h: 1157, name: "Motion sensors", alt: "Motion sensor module on the underside of the iNOVAA Tracker" },
    screen: {
      src: "/portal-schedule.png",
      crop: [1505, 515, 340, 212] as [number, number, number, number],
      name: "Team efficiency",
      alt: "Team Performance panel in the iNOVAA Portal showing a 77% completion ring",
    },
    text: "Motion becomes each crew's completion score.",
  },
  {
    part: { src: "/tracker-part-pcb.png", w: 248, h: 211, name: "Main PCB", alt: "iNOVAA Tracker main circuit board with processor and motion sensors" },
    screen: {
      src: "/portal-jobs.png",
      crop: [300, 465, 520, 325] as [number, number, number, number],
      name: "Live job status",
      alt: "Job cards in the iNOVAA Portal marked completed, in progress, and scheduled",
    },
    text: "On-device classification moves every job card.",
  },
  {
    part: { src: "/tracker-part-button.png", w: 248, h: 211, name: "Side button", alt: "Orange side action button on the iNOVAA Tracker" },
    screen: {
      src: "/portal-dashboard.png",
      crop: [1365, 318, 480, 300] as [number, number, number, number],
      name: "Attention needed",
      alt: "Attention Needed list in the iNOVAA Portal with issues ranked high, medium, and low",
    },
    text: "One press flags an issue straight to dispatch.",
  },
  {
    part: { src: "/tracker-part-battery.png", w: 248, h: 211, name: "7-day battery", alt: "Li-Po battery that powers the iNOVAA Tracker for up to 7 days" },
    screen: {
      src: "/portal-schedule.png",
      crop: [262, 240, 700, 437] as [number, number, number, number],
      name: "Shift schedule",
      alt: "Month calendar of team shifts in the iNOVAA Portal",
    },
    text: "Lasts every shift, so the calendar has no gaps.",
  },
];

// Line + travelling dot between the part and its screen: the "these are connected" cue.
function Connector({ delay }: { delay: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <div className="relative mx-1 h-px min-w-6 flex-1 sm:mx-2" aria-hidden>
      <span
        className="absolute inset-0"
        style={{ backgroundImage: "linear-gradient(90deg, var(--brand-orange), var(--brand-magenta), var(--brand-purple))" }}
      />
      <span className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-brand-orange" />
      <span className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-brand-purple" />
      {!reduceMotion && (
        <motion.span
          className="absolute top-1/2 -mt-[3px] h-1.5 w-1.5 rounded-full bg-brand-magenta shadow-[0_0_8px_rgba(214,64,159,0.8)]"
          initial={{ left: "0%", opacity: 0 }}
          animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.8, delay, repeat: Infinity, repeatDelay: 0.6, ease: "easeInOut" }}
        />
      )}
    </div>
  );
}

export default function PartsToPortal() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading eyebrow="Components" title="Every part, wired to the Portal" />

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {pairs.map((p, i) => (
            <motion.div
              key={p.part.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.08, ease: EASE }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-border bg-white p-4 shadow-[0_2px_8px_-2px_rgba(21,18,16,0.06),0_20px_44px_-24px_rgba(21,18,16,0.22)] transition-shadow duration-300 hover:shadow-[0_8px_16px_-4px_rgba(21,18,16,0.08),0_28px_52px_-20px_rgba(214,64,159,0.2)] sm:p-5"
            >
              <div className="flex items-center">
                {/* Tracker side */}
                <div className="relative aspect-square w-20 shrink-0 overflow-hidden rounded-xl bg-studio shadow-[0_10px_24px_-12px_rgba(21,18,16,0.5)] sm:w-28">
                  <Image src={p.part.src} alt={p.part.alt} fill sizes="112px" className="object-cover" />
                </div>

                <Connector delay={i * 0.35} />

                {/* Portal side */}
                <div className="relative w-40 shrink-0 overflow-hidden rounded-lg border border-black/[0.07] bg-[#0e1422] shadow-[0_10px_24px_-12px_rgba(21,18,16,0.5)] sm:w-56">
                  <ImageCrop
                    src={p.screen.src}
                    alt={p.screen.alt}
                    width={PORTAL_SHOT_W}
                    height={PORTAL_SHOT_H}
                    crop={p.screen.crop}
                    sizes="(min-width: 640px) 1200px, 900px"
                  />
                  <SampleBadge className="absolute bottom-1.5 right-1.5 px-1.5 text-[8px]" />
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <p className="text-sm font-semibold text-foreground">
                  <span className="text-brand-orange">{p.part.name}</span>
                  <span className="mx-1.5 text-muted-2">→</span>
                  <span className="gradient-text-logo">{p.screen.name}</span>
                </p>
                <p className="text-sm text-muted">{p.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
