"use client";

import { motion } from "framer-motion";
import { ChevronRight, LayoutDashboard, Smartphone, Watch } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

// What iNOVAA is: three parts, one product — shown left to right in the order data flows.
const parts = [
  {
    icon: Watch,
    step: "01",
    role: "On the wrist",
    roleColor: "text-brand-orange",
    name: "iNOVAA Tracker",
    text: "The wearable that recognizes hands-on work from wrist motion — offline, all shift.",
    badge: "icon-badge-orange",
  },
  {
    icon: Smartphone,
    step: "02",
    role: "On every phone",
    roleColor: "text-brand-purple",
    name: "iNOVAA App",
    text: "The mobile app your field team uses to check in from site.",
    badge: "icon-badge-purple",
  },
  {
    icon: LayoutDashboard,
    step: "03",
    role: "In the office",
    roleColor: "text-brand-magenta",
    name: "iNOVAA Portal",
    text: "Where the data becomes verified, actionable insight — jobs, efficiency, schedules, attendance.",
    badge: "icon-badge-brand",
  },
];

export default function PlatformIntro() {
  return (
    <section className="pb-4 pt-20 sm:pt-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="The Platform"
          index="§01"
          title="One platform, three parts."
          description="The Tracker is the device on the wrist, the App is where your team checks in from their phones, and the Portal is where it all turns into value."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="relative mt-12 overflow-hidden rounded-3xl border border-border bg-white shadow-[0_2px_8px_-2px_rgba(21,18,16,0.05),0_30px_60px_-36px_rgba(21,18,16,0.25)]"
        >
          {/* one continuous accent across the top: the flow from device to software */}
          <span
            className="absolute inset-x-0 top-0 h-[3px]"
            style={{ backgroundImage: "linear-gradient(90deg, var(--brand-orange), var(--brand-purple), var(--brand-magenta))" }}
          />

          <div className="grid divide-y divide-border lg:grid-cols-3 lg:divide-x lg:divide-y-0">
            {parts.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: EASE }}
                className="group relative p-7 transition-colors duration-300 hover:bg-surface/60 sm:p-9"
              >
                <div className="flex items-center justify-between">
                  <span className={cn("flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:-translate-y-0.5", p.badge)}>
                    <p.icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <span className="font-mono-data text-sm text-muted-2">{p.step}</span>
                </div>

                <p className={cn("label-mono mt-6 text-[10px]", p.roleColor)}>{p.role}</p>
                <h3 className="mt-1.5 text-xl font-bold tracking-tight text-foreground">{p.name}</h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">{p.text}</p>

                {/* chevron sitting on the divider, pointing to the next part (desktop only) */}
                {i < parts.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute -right-3.5 top-[3.25rem] z-10 hidden h-7 w-7 items-center justify-center rounded-full border border-border bg-white text-muted-2 shadow-sm lg:flex"
                  >
                    <ChevronRight className="h-3.5 w-3.5" strokeWidth={2.25} />
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
