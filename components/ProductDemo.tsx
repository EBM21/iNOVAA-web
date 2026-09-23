"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, MapPinned, CloudRain, PackageCheck, Clock, MessageSquareText, CheckCircle2 } from "lucide-react";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import StatusPill, { type Status } from "./ui/StatusPill";
import AvatarChip from "./ui/AvatarChip";
import { productDemoScenarios } from "@/lib/data";
import { cn } from "@/lib/utils";

const citationIcons = { FileText, MapPinned, CloudRain, PackageCheck, Clock };

export default function ProductDemo() {
  const [active, setActive] = useState<(typeof productDemoScenarios)[number]["id"]>("hvac");
  const scenario = productDemoScenarios.find((s) => s.id === active)!;

  return (
    <section className="relative bg-surface-2 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Product in action"
          index="§01"
          title="One record, read by every dispatcher and every customer"
          description="A live look at a real dispatch decision — what iNOVAA read, what it recommended, and where a human still signs off. Same record, every industry."
        />

        <Reveal delay={0.08} className="mt-10">
          <div className="no-scrollbar flex gap-2 overflow-x-auto">
            {productDemoScenarios.map((s) => (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={cn(
                  "relative shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition-colors",
                  active === s.id ? "text-white" : "text-muted hover:text-foreground"
                )}
              >
                {active === s.id && (
                  <motion.span
                    layoutId="demo-tab-bg"
                    className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-brand-purple via-brand-magenta to-brand-orange"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                {s.tab}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.14} className="mt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="grid overflow-hidden rounded-3xl border border-border bg-surface shadow-[0_20px_50px_-24px_rgba(26,26,31,0.16)] lg:grid-cols-[220px_1.1fr_1fr]"
            >
              {/* Sidebar: sites/projects */}
              <div className="border-b border-border bg-surface-2 p-4 lg:border-b-0 lg:border-r">
                <p className="px-2 text-xs font-semibold text-muted-2">Active jobs</p>
                <div className="mt-2 space-y-1">
                  {scenario.sites.map((s) => (
                    <div
                      key={s.name}
                      className={
                        "rounded-lg px-2.5 py-2 text-sm " +
                        (s.active ? "bg-accent-blue/10 font-medium text-accent-blue" : "text-muted hover:bg-background/60")
                      }
                    >
                      <span className="truncate">{s.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Center: task status panel */}
              <div className="border-b border-border p-6 lg:border-b-0 lg:border-r">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-foreground">{scenario.site}</p>
                  <StatusPill status={scenario.status} />
                </div>
                <p className="font-mono-data mt-1 text-xs text-muted-2">{scenario.detail}</p>

                <div className="mt-5 space-y-3">
                  <div className="flex items-center gap-3 rounded-xl border border-border bg-surface-2 p-3">
                    <AvatarChip name={scenario.task.by} size="md" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-foreground">{scenario.task.name}</p>
                      <p className="text-xs text-muted-2">{scenario.task.timestamp} · {scenario.task.by}</p>
                    </div>
                    <StatusPill status={scenario.status} className="hidden sm:inline-flex" />
                  </div>
                  <div className="flex items-center gap-3 rounded-xl border border-border bg-surface-2 p-3">
                    <AvatarChip name={scenario.approver} size="md" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-foreground">Reviewing dispatch recommendation</p>
                      <p className="text-xs text-muted-2">Dispatcher · Now</p>
                    </div>
                    <StatusPill status={"Scheduled" as Status} className="hidden sm:inline-flex" />
                  </div>
                </div>

                <div className="mt-5 rounded-xl border border-status-amber/25 bg-status-amber/5 p-3.5">
                  <p className="text-xs font-semibold text-status-amber">Annotation</p>
                  <p className="mt-1 text-sm text-muted">&ldquo;{scenario.annotation}&rdquo;</p>
                </div>
              </div>

              {/* Right: assistant + citations */}
              <div className="bg-surface-2 p-6">
                <div className="flex items-center gap-2 text-xs font-semibold text-muted-2">
                  <MessageSquareText className="h-3.5 w-3.5" />
                  Dispatch assistant
                </div>

                <div className="mt-4 space-y-3">
                  <div className="ml-auto max-w-[90%] rounded-2xl rounded-tr-sm bg-accent-blue/10 px-4 py-2.5 text-sm text-foreground">
                    {scenario.question}
                  </div>
                  <div className="max-w-[95%] rounded-2xl rounded-tl-sm border border-border bg-background px-4 py-3 text-sm text-muted">
                    {scenario.answer}
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <p className="text-xs font-semibold text-muted-2">Sources cited</p>
                  {scenario.citations.map((c) => {
                    const Icon = citationIcons[c.icon as keyof typeof citationIcons];
                    return (
                      <div key={c.label} className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-xs text-muted">
                        <Icon className="h-3.5 w-3.5 shrink-0 text-accent-blue" />
                        <span className="truncate">{c.label}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 flex items-center gap-2 rounded-lg border border-status-green/25 bg-status-green/5 px-3 py-2 text-xs text-status-green">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Approved by {scenario.approver} · sent to customer
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
