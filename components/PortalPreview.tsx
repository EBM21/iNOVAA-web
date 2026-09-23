"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LayoutDashboard, MapPin, Users, Settings, ArrowRight } from "lucide-react";
import Reveal from "./ui/Reveal";

const sidebarIcons = [LayoutDashboard, MapPin, Users, Settings];

const stats = [
  { label: "Active jobs", value: "24" },
  { label: "Crews on site", value: "9" },
  { label: "Avg. dispatch", value: "34m" },
  { label: "Verified today", value: "18" },
];

const bars = [40, 65, 50, 80, 60, 90, 45];

const verifications = [
  { name: "J. Alvarez", job: "Sunridge Solar Array", initials: "JA" },
  { name: "K. Reyes", job: "Meridian HVAC Retrofit", initials: "KR" },
];

export default function PortalPreview() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-12">
          <Reveal>
            <p className="label-mono text-xs text-brand-orange">iNOVAA Portal</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">The software behind it</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">Every reading from the Tracker lands here — live, GPS-tagged, and ready to verify.</p>
            <Link
              href="/platform/field-ops-dashboard"
              className="btn-secondary group mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
            >
              Explore the dashboard
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Reveal>

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden rounded-2xl border border-border bg-background shadow-[0_30px_70px_-30px_rgba(21,18,16,0.28)]"
          >
            {/* browser chrome */}
            <div className="flex items-center gap-2 border-b border-border bg-surface-2 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
              <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
              <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
              <span className="font-mono-data ml-3 truncate rounded-md bg-background px-3 py-1 text-[11px] text-muted-2">
                app.inovaa.ai/dashboard
              </span>
            </div>

            <div className="flex">
              {/* sidebar */}
              <div className="flex flex-col items-center gap-3 border-r border-border bg-surface-2 px-3 py-5">
                {sidebarIcons.map((Icon, i) => (
                  <span
                    key={i}
                    className={`flex h-8 w-8 items-center justify-center rounded-lg ${i === 0 ? "bg-brand-orange text-white" : "text-muted-2"}`}
                  >
                    <Icon className="h-4 w-4" strokeWidth={2} />
                  </span>
                ))}
              </div>

              <div className="flex-1 p-4 sm:p-5">
                {/* stat tiles */}
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                  {stats.map((s) => (
                    <div key={s.label} className="rounded-xl border border-border bg-surface-2 p-3">
                      <p className="text-lg font-bold text-foreground">{s.value}</p>
                      <p className="label-mono mt-0.5 text-[9px] text-muted-2">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* bar chart */}
                <div className="mt-4 flex h-20 items-end gap-1.5 rounded-xl border border-border bg-surface-2 p-3">
                  {bars.map((h, i) => (
                    <div key={i} className="flex-1 rounded-t-sm bg-brand-orange/60" style={{ height: `${h}%` }} />
                  ))}
                </div>

                {/* verification rows */}
                <div className="mt-4 space-y-2">
                  {verifications.map((v) => (
                    <div key={v.name} className="flex items-center justify-between rounded-xl border border-border bg-surface-2 px-3 py-2.5">
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-brand-purple to-brand-orange text-[10px] font-bold text-white">
                          {v.initials}
                        </span>
                        <div>
                          <p className="text-xs font-medium text-foreground">{v.name}</p>
                          <p className="text-[10px] text-muted-2">{v.job}</p>
                        </div>
                      </div>
                      <span className="relative flex h-2 w-2">
                        <span className="absolute h-full w-full animate-ping rounded-full bg-accent-teal opacity-75" />
                        <span className="relative h-2 w-2 rounded-full bg-accent-teal" />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
