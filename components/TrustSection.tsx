"use client";

"use client";

import { motion } from "framer-motion";
import { Radio, Lock, Users, Palette, FileCheck } from "lucide-react";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import StatusPill from "./ui/StatusPill";
import AvatarChip from "./ui/AvatarChip";
import { trustCallouts } from "@/lib/data";

const calloutIcons = [Lock, Users, Palette, FileCheck];

export default function TrustSection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-start gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal className="relative order-2 lg:order-1">
            <div className="surface-card overflow-hidden rounded-2xl">
              <div className="flex items-center justify-between border-b border-border bg-surface-2 px-5 py-3.5">
                <span className="font-mono-data text-xs text-muted-2">portal.inovaa.ai/desertridge-cleaning</span>
                <span className="rounded-full border border-accent-blue/30 bg-accent-blue/10 px-2.5 py-1 text-[10px] font-semibold text-accent-blue">
                  Custom-branded
                </span>
              </div>
              <div className="flex items-center justify-between gap-3 border-b border-border bg-gradient-to-r from-accent-blue/5 to-accent-teal/5 px-5 py-3">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute h-full w-full animate-ping rounded-full bg-status-green opacity-75" />
                    <span className="relative h-2 w-2 rounded-full bg-status-green" />
                  </span>
                  <Radio className="h-3.5 w-3.5 text-accent-blue" strokeWidth={2} />
                  <span className="text-xs font-medium text-foreground">iNOVAA Tracker — J. Alvarez</span>
                </div>
                <span className="font-mono-data text-[11px] text-muted-2">Tracking active · 87% battery</span>
              </div>
              <div className="divide-y divide-border">
                {[
                  { name: "Sunridge Solar Array", status: "Cleared" as const, owner: "M. Ortega" },
                  { name: "Meridian HVAC Retrofit", status: "At risk" as const, owner: "K. Reyes" },
                  { name: "Route 12 — Last Mile", status: "Cleared" as const, owner: "T. Nwosu" },
                  { name: "Canyon Ridge Landscaping", status: "Blocked" as const, owner: "S. Malik" },
                  { name: "Palo Verde Hotel Turnover", status: "Scheduled" as const, owner: "D. Whitfield" },
                ].map((row) => (
                  <div key={row.name} className="flex items-center justify-between gap-3 px-5 py-3.5">
                    <div className="flex min-w-0 items-center gap-3">
                      <AvatarChip name={row.owner} />
                      <div className="min-w-0">
                        <p className="truncate text-sm text-foreground">{row.name}</p>
                        <p className="truncate text-xs text-muted-2">Owner: {row.owner}</p>
                      </div>
                    </div>
                    <StatusPill status={row.status} />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="Built for multi-tenant scale"
              index="§04"
              title="Every client company gets a portal that feels like theirs"
              description="iNOVAA was built from day one to run more than one company on the same platform. Data stays tenant-isolated, branding stays yours, and every role — from owner to customer — sees exactly the slice of the job record they need and nothing else."
            />

            <div className="mt-9 divide-y divide-border">
              {trustCallouts.map((c, i) => {
                const Icon = calloutIcons[i % calloutIcons.length];
                return (
                  <motion.div
                    key={c.title}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.45, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ x: 4 }}
                    className="group flex items-start gap-4 py-4"
                  >
                    <span className="icon-badge-orange flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                      <Icon className="h-4 w-4" strokeWidth={2} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{c.title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-muted">{c.text}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
