"use client";

import { motion } from "framer-motion";
import { Radio, MapPinned, Camera, CalendarClock, CheckCircle2 } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";

const inputs = [
  { icon: Radio, label: "Tracker activity" },
  { icon: MapPinned, label: "GPS & site geofence" },
  { icon: Camera, label: "Job photos" },
  { icon: CalendarClock, label: "Schedule & scope" },
];

const outputStats = [
  { label: "Job", value: "Meridian HVAC Retrofit" },
  { label: "Arrived", value: "8:42 AM" },
  { label: "Active time", value: "2h 14m" },
  { label: "Photos", value: "6" },
];

export default function FourSystemsFlow() {
  return (
    <section className="bg-surface-2 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading
          align="center"
          eyebrow="How it comes together"
          index="§03"
          title="Four systems in. One verified job record out."
        />

        <div className="mt-16 grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-2">
          {/* inputs */}
          <div className="space-y-3">
            {inputs.map((input, i) => (
              <motion.div
                key={input.label}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex items-center gap-3 rounded-2xl border border-border bg-background px-4 py-3.5 shadow-[0_16px_40px_-28px_rgba(21,18,16,0.3)]"
              >
                <span className="bg-studio flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
                  <input.icon className="h-4 w-4 text-white" strokeWidth={2} />
                </span>
                <span className="text-sm font-medium text-foreground">{input.label}</span>
                <span className="absolute left-full top-1/2 hidden h-px w-6 -translate-y-1/2 bg-border-strong lg:block" />
              </motion.div>
            ))}
          </div>

          {/* core node */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full shadow-[0_20px_50px_-16px_rgba(124,58,237,0.4)] lg:mx-6"
            style={{ backgroundImage: "linear-gradient(92deg, var(--brand-purple), var(--brand-magenta), var(--brand-orange))" }}
          >
            <span className="hidden h-6 w-px bg-border-strong lg:absolute lg:-left-6 lg:block" />
            <span className="hidden h-6 w-px bg-border-strong lg:absolute lg:-right-6 lg:block" />
            <span className="font-heading text-lg font-extrabold text-white">i</span>
          </motion.div>

          {/* output */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-2xl border border-border bg-background shadow-[0_24px_60px_-30px_rgba(21,18,16,0.35)]"
          >
            <div className="flex items-center justify-between border-b border-border bg-surface-2 px-5 py-3">
              <span className="label-mono text-[10px] text-muted-2">Verified Job Record</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-status-green/10 px-2.5 py-1 text-[10px] font-semibold text-status-green">
                <CheckCircle2 className="h-3 w-3" />
                Auto-verified
              </span>
            </div>
            <div className="grid grid-cols-2 gap-px bg-border p-px">
              {outputStats.map((s) => (
                <div key={s.label} className="bg-background p-4">
                  <p className="label-mono text-[10px] text-muted-2">{s.label}</p>
                  <p className="mt-1 truncate text-sm font-semibold text-foreground">{s.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
