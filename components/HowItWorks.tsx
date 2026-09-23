"use client";

import { motion } from "framer-motion";
import { ClipboardList, ScanEye, FileCheck2 } from "lucide-react";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";

const steps = [
  {
    n: "01",
    icon: ClipboardList,
    title: "Schedule the job",
    description:
      "Dispatch assigns a crew, a site, and a stage checklist — synced to every technician's phone instantly.",
  },
  {
    n: "02",
    icon: ScanEye,
    title: "Track it live",
    description:
      "Job stages, GPS pings, and iNOVAA Tracker activity update the record automatically as work happens.",
  },
  {
    n: "03",
    icon: FileCheck2,
    title: "Close with proof",
    description:
      "Before/after photos, annotations, and a signed FSR attach to the job — visible to the customer in real time.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading eyebrow="How iNOVAA works" index="§02" align="center" title="From scheduled to signed off, in three stages" />

        <div className="relative mt-16">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
            className="absolute left-0 top-11 hidden h-px w-full origin-left bg-gradient-to-r from-brand-purple via-brand-magenta to-brand-orange opacity-30 md:block"
          />

          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.15}>
                <div className="surface-card surface-card-hover relative h-full rounded-2xl p-7">
                  <span className="pointer-events-none absolute -top-4 right-5 font-mono-data text-6xl font-bold text-border-strong">
                    {step.n}
                  </span>
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent-blue to-accent-teal shadow-[0_8px_16px_-6px_rgba(59,130,246,0.4)]">
                    <step.icon className="h-5 w-5 text-white" strokeWidth={2.25} />
                  </div>
                  <h3 className="mt-5 text-xl font-bold tracking-tight text-foreground">{step.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
