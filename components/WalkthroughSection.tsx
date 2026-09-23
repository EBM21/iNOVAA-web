"use client";

import { CheckCircle2 } from "lucide-react";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import { walkthroughSteps, auditLog } from "@/lib/data";

export default function WalkthroughSection() {
  const narrativeSteps = walkthroughSteps.slice(0, -1);
  const logStep = walkthroughSteps[walkthroughSteps.length - 1];

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="How it reached this answer"
          index="§08"
          align="center"
          title="Every recommendation is traceable, end to end"
        />

        <div className="mt-16">
          {narrativeSteps.map((step, i) => (
            <Reveal key={step.label} delay={i * 0.08}>
              <div className="flex gap-5">
                <div className="flex flex-col items-center">
                  <span className="font-mono-data flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent-blue to-accent-teal text-xs font-semibold text-white shadow-[0_4px_10px_-2px_rgba(59,130,246,0.4)]">
                    {i + 1}
                  </span>
                  <span className="mt-1 h-full w-px flex-1 bg-border-strong" />
                </div>
                <div className="pb-8">
                  <p className="text-sm font-semibold text-foreground">{step.label}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{step.detail}</p>
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal delay={narrativeSteps.length * 0.08}>
            <div className="flex gap-5">
              <div className="flex flex-col items-center">
                <span className="font-mono-data flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-purple to-brand-orange text-xs font-semibold text-white shadow-[0_4px_10px_-2px_rgba(147,51,234,0.4)]">
                  {narrativeSteps.length + 1}
                </span>
              </div>
              <div className="w-full">
                <p className="text-sm font-semibold text-foreground">{logStep.label}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{logStep.detail}</p>

                <div className="surface-card mt-5 overflow-hidden rounded-2xl">
                  <div className="border-b border-border bg-surface-2 px-5 py-3.5">
                    <p className="font-mono-data text-xs text-muted-2">audit-log · route-12-last-mile · job#5820</p>
                  </div>
                  <div className="space-y-4 p-5">
                    {auditLog.map((entry) => (
                      <div key={entry.n} className="flex gap-3">
                        <span className="font-mono-data mt-0.5 text-xs text-muted-2">{entry.time}</span>
                        <p className="text-sm text-muted">{entry.text}</p>
                      </div>
                    ))}
                    <div className="flex items-center gap-2 rounded-lg border border-status-green/25 bg-status-green/5 px-3.5 py-3">
                      <CheckCircle2 className="h-4 w-4 text-status-green" />
                      <p className="text-sm text-status-green">{auditLog[auditLog.length - 1].text}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
