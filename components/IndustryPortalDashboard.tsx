"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Calendar,
  History,
  Gauge,
  Clock,
  HardHat,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Award,
  Percent,
} from "lucide-react";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import StatusPill from "./ui/StatusPill";
import { efficiencyData, type EfficiencyCategory, type TeamMember } from "@/lib/data";
import { fmt, rawEfficiency, weightedEfficiency, totalMinutes, weightedShares } from "@/lib/efficiency";
import { categoryWorkerBreakdown } from "@/lib/efficiencyBreakdown";
import { portalData, totalAttendanceMinutes } from "@/lib/portalData";
import { cn } from "@/lib/utils";

function categoryTaskRows(slug: string, categoryIndex: number, categoryMinutes: number) {
  const breakdown = categoryWorkerBreakdown[slug]?.[categoryIndex] ?? [];
  if (breakdown.length === 0) return [];
  const shares = weightedShares(
    categoryMinutes,
    breakdown.map((b) => b.weight)
  );
  return breakdown.map((b, i) => ({ worker: b.worker, task: b.task, minutes: shares[i] }));
}

type NavKey = "overview" | "team" | "schedule" | "jobHistory" | "efficiency" | "attendance" | "ehs";

function barColor(weight: number) {
  return weight > 0 ? `rgba(249, 115, 22, ${weight})` : "var(--border-strong)";
}

function CategoryRow({
  category,
  index,
  totalMinutes: total,
  taskRows,
}: {
  category: EfficiencyCategory;
  index: number;
  totalMinutes: number;
  taskRows: { worker: string; task: string; minutes: number }[];
}) {
  const [open, setOpen] = useState(false);
  const pct = Math.max((category.minutes / total) * 100, 2);

  return (
    <div className={cn("px-5 py-4", index !== 0 && "border-t border-border")}>
      <button onClick={() => setOpen((o) => !o)} className="group w-full text-left" aria-expanded={open}>
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-semibold text-foreground sm:text-sm">{category.label}</span>
          <span className="font-mono-data shrink-0 text-xs text-muted-2">{fmt(category.minutes)} min</span>
        </div>
        <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-surface-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.7, delay: 0.1 + index * 0.06, ease: [0.16, 1, 0.3, 1] }}
            style={{ background: barColor(category.weight) }}
            className="h-full rounded-full transition-transform duration-300 group-hover:brightness-110"
          />
        </div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-3 space-y-1.5">
              {taskRows.map((r, i) => (
                <div key={r.task + i} className="rounded-lg bg-surface-2 px-3.5 py-2.5 text-xs text-foreground">
                  <span className="font-semibold">{r.worker}</span> — {r.task}:{" "}
                  <span className="font-mono-data text-muted-2">{fmt(r.minutes)} min</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function OverviewStat({
  icon: Icon,
  label,
  value,
  caption,
  gradient,
  mono = true,
  wrap = false,
}: {
  icon: typeof Users;
  label: string;
  value: string;
  caption: string;
  gradient?: boolean;
  mono?: boolean;
  wrap?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-orange/10 text-brand-orange">
          <Icon className="h-3.5 w-3.5" strokeWidth={2.25} />
        </span>
        <p className="label-mono text-[10px] text-muted-2">{label}</p>
      </div>
      <p
        className={cn(
          "mt-2.5 font-bold",
          wrap ? "text-base leading-snug break-words sm:text-lg" : "truncate text-xl sm:text-2xl",
          mono && "font-mono-data",
          gradient ? "gradient-text" : "text-foreground"
        )}
      >
        {value}
      </p>
      <p className={cn("mt-1 text-[11px] text-muted-2", wrap ? "line-clamp-1" : "truncate")}>{caption}</p>
    </div>
  );
}

function RosterRow({
  member,
  avatar,
  active,
  metric,
  onClick,
}: {
  member: TeamMember;
  avatar?: number;
  active: boolean;
  metric: "weighted" | "time";
  onClick: () => void;
}) {
  const total = totalMinutes(member.categories);
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition-colors",
        active ? "border-brand-orange/40 bg-brand-orange/5" : "border-border bg-surface hover:border-border-strong hover:bg-surface-2"
      )}
    >
      <div className="flex min-w-0 items-center gap-3">
        {avatar ? (
          <img src={`https://i.pravatar.cc/72?img=${avatar}`} alt="" width={36} height={36} loading="lazy" decoding="async" className="h-9 w-9 shrink-0 rounded-full object-cover" />
        ) : (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-2 text-xs font-semibold text-muted-2">
            {member.name.charAt(0)}
          </span>
        )}
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">{member.name}</p>
          <p className="truncate text-xs text-muted-2">{member.job}</p>
        </div>
      </div>
      {metric === "weighted" ? (
        <div className="shrink-0 text-right">
          <p className="gradient-text font-mono-data text-sm font-bold">{fmt(weightedEfficiency(member.categories))}%</p>
          <p className="text-[10px] text-muted-2">weighted</p>
        </div>
      ) : (
        <div className="shrink-0 text-right">
          <p className="font-mono-data text-sm font-bold text-foreground">{fmt(total)} min</p>
          <p className="text-[10px] text-muted-2">on-site today</p>
        </div>
      )}
    </button>
  );
}

const teamStatusColor: Record<string, string> = {
  "On Site": "bg-status-green",
  "In Route": "bg-status-amber",
  "Off Duty": "bg-muted-2",
};

const severityColor: Record<string, string> = {
  Low: "text-status-blue bg-status-blue/10 border-status-blue/25",
  Medium: "text-status-amber bg-status-amber/10 border-status-amber/25",
  High: "text-status-red bg-status-red/10 border-status-red/25",
};

const logStatusColor: Record<string, string> = {
  Resolved: "text-status-green bg-status-green/10 border-status-green/25",
  Open: "text-status-amber bg-status-amber/10 border-status-amber/25",
};

export default function IndustryPortalDashboard({ slug }: { slug: string }) {
  const industry = efficiencyData.find((d) => d.slug === slug) ?? efficiencyData[0];
  const portal = portalData[industry.slug] ?? portalData.hvac;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeNav, setActiveNav] = useState<NavKey>("efficiency");

  const member = industry.team[selectedIndex];
  const categories = member.categories;
  const total = totalMinutes(categories);
  const raw = rawEfficiency(categories);
  const weighted = weightedEfficiency(categories);

  const selectMember = (i: number) => {
    setSelectedIndex(i);
    setActiveNav("efficiency");
  };

  const navItems: { key: NavKey; icon: typeof LayoutDashboard; label: string }[] = [
    { key: "overview", icon: LayoutDashboard, label: "Overview" },
    { key: "team", icon: Users, label: "Teams" },
    { key: "schedule", icon: Calendar, label: "Schedule" },
    { key: "jobHistory", icon: History, label: "Job History" },
    { key: "efficiency", icon: Gauge, label: "Efficiency" },
    { key: "attendance", icon: Clock, label: "Attendance" },
    { key: "ehs", icon: HardHat, label: "EHS" },
  ];

  const avgWeighted =
    industry.team.reduce((sum, m) => sum + weightedEfficiency(m.categories), 0) / industry.team.length;
  const topPerformer = [...industry.team].sort(
    (a, b) => weightedEfficiency(b.categories) - weightedEfficiency(a.categories)
  )[0];
  const totalWorkHours = totalAttendanceMinutes(portal.attendance) / 60;

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="iNOVAA Portal"
          index="§01"
          title={`How ${industry.name} minutes become a fair efficiency number`}
          description="Raw efficiency only counts hands-on-tool time. Weighted efficiency credits the ladder climbs, lifting, and positioning that make the tool time possible — pick a technician from the roster to see their exact numbers."
        />

        {/* Persistent formula — always visible, never collapsed */}
        <Reveal delay={0.08} className="mt-8">
          <div className="rounded-2xl border border-border-strong bg-surface-2 px-5 py-4 sm:px-6 sm:py-5">
            <p className="label-mono text-[10px] text-muted-2">The formula</p>
            <p className="font-mono-data mt-2 text-[11px] leading-relaxed text-muted sm:text-xs">
              Efficiency % = [(<span className="text-brand-orange">W₁</span> × T<sub>active</sub>) + (
              <span className="text-brand-orange">W₂</span> × T<sub>exertion</sub>) + (
              <span className="text-brand-orange">W₃</span> × T<sub>access</sub>)] ÷ T<sub>total</sub> × 100
            </p>
          </div>
        </Reveal>

        {/* Portal mockup */}
        <Reveal delay={0.14} className="mt-8">
          <div className="overflow-hidden rounded-3xl border border-border bg-background shadow-[0_30px_70px_-30px_rgba(21,18,16,0.28)]">
            {/* browser chrome */}
            <div className="flex items-center gap-2 border-b border-border bg-surface-2 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
              <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
              <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
              <span className="font-mono-data ml-3 truncate rounded-md bg-background px-3 py-1 text-[11px] text-muted-2">
                app.inovaa.ai/{industry.slug}
              </span>
            </div>

            <div className="flex flex-col lg:flex-row">
              {/* sidebar */}
              <div className="flex shrink-0 items-center gap-1 overflow-x-auto border-b border-border bg-surface-2 px-3 py-3 no-scrollbar lg:w-52 lg:flex-col lg:items-stretch lg:gap-1 lg:overflow-visible lg:border-b-0 lg:border-r lg:px-4 lg:py-6">
                <div className="mb-0 hidden lg:mb-6 lg:block">
                  <span className="gradient-text-logo font-heading text-xl font-extrabold tracking-tight">iNOVAA</span>
                </div>
                {navItems.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setActiveNav(item.key)}
                    className={cn(
                      "flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-xs font-medium transition-colors sm:text-sm",
                      activeNav === item.key
                        ? "bg-gradient-to-r from-brand-purple via-brand-magenta to-brand-orange text-white shadow-[0_8px_16px_-8px_rgba(214,64,159,0.5)]"
                        : "text-muted-2 hover:bg-background/60 hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-4 w-4 shrink-0" strokeWidth={2} />
                    <span className="hidden lg:inline">{item.label}</span>
                  </button>
                ))}
              </div>

              {/* main content */}
              <div className="flex-1 p-5 sm:p-7 lg:p-8">
                {/* topbar */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-5">
                  <div>
                    <p className="text-base font-bold text-foreground sm:text-lg">
                      {industry.name} — {member.job}
                    </p>
                    <p className="font-mono-data mt-1 text-xs text-muted-2">
                      {member.name} · {fmt(total)} min on-site
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full bg-status-green/10 px-3 py-1.5 text-xs font-semibold text-status-green">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute h-full w-full animate-ping rounded-full bg-status-green opacity-75" />
                      <span className="relative h-1.5 w-1.5 rounded-full bg-status-green" />
                    </span>
                    Live · Today
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeNav}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {activeNav === "efficiency" && (
                      <>
                        {/* The two efficiency numbers — the core contrast of the dashboard */}
                        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-6">
                          <div className="rounded-2xl border border-border bg-surface p-4 sm:p-7">
                            <p className="label-mono text-[10px] text-muted-2 sm:text-[11px]">Raw Efficiency</p>
                            <p className="font-mono-data mt-1.5 text-3xl font-bold text-muted sm:mt-2 sm:text-5xl">{fmt(raw)}%</p>
                          </div>
                          <div className="rounded-2xl border border-brand-orange/25 bg-surface p-4 shadow-[0_16px_36px_-22px_rgba(242,99,5,0.4)] sm:p-7">
                            <p className="label-mono text-[10px] text-brand-orange sm:text-[11px]">Weighted Efficiency</p>
                            <p className="gradient-text font-mono-data mt-1.5 text-3xl font-black sm:mt-2 sm:text-5xl">{fmt(weighted)}%</p>
                          </div>
                        </div>

                        {/* Unified card: worker/job context + category breakdown, each row expandable */}
                        <div className="mt-8 overflow-hidden rounded-2xl border border-border">
                          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-b border-border bg-surface-2 px-5 py-4">
                            <div>
                              <p className="label-mono text-[10px] text-muted-2">Worker</p>
                              <p className="mt-0.5 text-sm font-semibold text-foreground">{member.name}</p>
                            </div>
                            <div>
                              <p className="label-mono text-[10px] text-muted-2">Job</p>
                              <p className="mt-0.5 text-sm font-semibold text-foreground">{member.job}</p>
                            </div>
                            <div>
                              <p className="label-mono text-[10px] text-muted-2">Total on-site</p>
                              <p className="font-mono-data mt-0.5 text-sm font-semibold text-foreground">{fmt(total)} min</p>
                            </div>
                          </div>
                          <div>
                            {categories.map((c, i) => (
                              <CategoryRow
                                key={c.label + i}
                                category={c}
                                index={i}
                                totalMinutes={total}
                                taskRows={categoryTaskRows(industry.slug, i, c.minutes)}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Insight */}
                        <div className="mt-7 rounded-xl border border-brand-orange/20 bg-brand-orange/5 p-4">
                          <p className="text-sm leading-relaxed text-muted">
                            <span className="font-semibold text-foreground">Field insight — </span>
                            {industry.insight}
                          </p>
                        </div>
                      </>
                    )}

                    {activeNav === "overview" && (
                      <div className="mt-6">
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                          <OverviewStat icon={Users} label="Team size" value={String(industry.team.length)} caption="active technicians" />
                          <OverviewStat
                            icon={Gauge}
                            label="Team Efficiency"
                            value={`${fmt(avgWeighted)}%`}
                            caption="efficiency score"
                            gradient
                          />
                          <OverviewStat
                            icon={Award}
                            label="Top performer"
                            value={topPerformer.name}
                            caption={topPerformer.job}
                            mono={false}
                            wrap
                          />
                          <OverviewStat
                            icon={Percent}
                            label="Attendance"
                            value={`${fmt(portal.attendanceRate)}%`}
                            caption="crew present today"
                          />
                          <OverviewStat
                            icon={Clock}
                            label="Work hours"
                            value={`${fmt(totalWorkHours)}h`}
                            caption="logged across crew today"
                          />
                        </div>
                        <p className="mt-7 text-xs font-semibold text-muted-2">Today&apos;s crew</p>
                        <div className="mt-3 space-y-2">
                          {industry.team.map((m, i) => (
                            <RosterRow
                              key={m.name}
                              member={m}
                              avatar={portal.team.find((p) => p.name === m.name)?.avatar}
                              active={i === selectedIndex}
                              metric="weighted"
                              onClick={() => selectMember(i)}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {activeNav === "team" && (
                      <div className="mt-6 space-y-2">
                        {portal.team.map((m) => (
                          <div
                            key={m.name}
                            className="flex items-center justify-between gap-3 rounded-xl border border-border bg-surface px-4 py-3.5"
                          >
                            <div className="flex min-w-0 items-center gap-3">
                              <img
                                src={`https://i.pravatar.cc/72?img=${m.avatar}`}
                                alt="" width={40} height={40} loading="lazy" decoding="async"
                                className="h-10 w-10 shrink-0 rounded-full object-cover"
                              />
                              <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-foreground">{m.name}</p>
                                <p className="truncate text-xs text-muted-2">{m.role}</p>
                              </div>
                            </div>
                            <div className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-muted">
                              <span className={cn("h-1.5 w-1.5 rounded-full", teamStatusColor[m.status])} />
                              {m.status}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeNav === "schedule" && (
                      <div className="mt-6 space-y-2">
                        {portal.schedule.map((job, i) => (
                          <div
                            key={job.site + i}
                            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-surface px-4 py-3.5"
                          >
                            <div className="min-w-0">
                              <p className="truncate text-sm font-semibold text-foreground">{job.site}</p>
                              <p className="font-mono-data mt-0.5 truncate text-xs text-muted-2">
                                {job.assignee} · {job.time}
                              </p>
                            </div>
                            <StatusPill status={job.status} />
                          </div>
                        ))}
                      </div>
                    )}

                    {activeNav === "jobHistory" && (
                      <div className="mt-6 space-y-5">
                        {portal.jobHistory.map((entry) => (
                          <div key={entry.site + entry.worker} className="overflow-hidden rounded-2xl border border-border">
                            <div className="border-b border-border bg-surface-2 px-5 py-3.5">
                              <p className="text-sm font-semibold text-foreground">{entry.site}</p>
                              <p className="text-xs text-muted-2">
                                {entry.worker} · {entry.date}
                              </p>
                            </div>
                            <div className="p-5">
                              {entry.stages.map((s, i) => (
                                <div key={s.label} className="relative flex gap-4 pb-6 last:pb-0">
                                  {i < entry.stages.length - 1 && (
                                    <span className="absolute left-[7px] top-4 h-full w-px bg-border" />
                                  )}
                                  <span className="relative z-10 mt-1 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-brand-orange ring-4 ring-brand-orange/15" />
                                  <div>
                                    <p className="text-sm font-semibold text-foreground">{s.label}</p>
                                    <p className="font-mono-data text-xs text-muted-2">{s.time}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeNav === "attendance" && (
                      <div className="mt-6 overflow-hidden rounded-2xl border border-border">
                        <div className="overflow-x-auto">
                          <table className="w-full min-w-[480px] text-left">
                            <thead>
                              <tr className="border-b border-border bg-surface-2 text-xs text-muted-2">
                                <th className="px-5 py-2.5 font-medium">Worker</th>
                                <th className="px-5 py-2.5 font-medium">Time In</th>
                                <th className="px-5 py-2.5 font-medium">Time Out</th>
                                <th className="px-5 py-2.5 font-medium">Total Time</th>
                              </tr>
                            </thead>
                            <tbody>
                              {portal.attendance.map((a) => (
                                <tr key={a.name} className="border-b border-border text-sm last:border-0">
                                  <td className="px-5 py-3">
                                    <div className="flex items-center gap-3">
                                      <img
                                        src={`https://i.pravatar.cc/64?img=${a.avatar}`}
                                        alt="" width={32} height={32} loading="lazy" decoding="async"
                                        className="h-8 w-8 shrink-0 rounded-full object-cover"
                                      />
                                      <span className="font-medium text-foreground">{a.name}</span>
                                    </div>
                                  </td>
                                  <td className="font-mono-data px-5 py-3 text-muted">{a.timeIn}</td>
                                  <td className="font-mono-data px-5 py-3 text-muted">{a.timeOut}</td>
                                  <td className="font-mono-data px-5 py-3 font-semibold text-foreground">{a.totalTime}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {activeNav === "ehs" && (
                      <div className="mt-6 space-y-8">
                        {/* Safety checklist */}
                        <div>
                          <p className="text-xs font-semibold text-muted-2">Safety checklist</p>
                          <div className="mt-3 overflow-hidden rounded-2xl border border-border">
                            {portal.ehs.checklist.map((c, i) => (
                              <div
                                key={c.item}
                                className={cn(
                                  "flex items-center gap-3 px-4 py-3",
                                  i !== portal.ehs.checklist.length - 1 && "border-b border-border"
                                )}
                              >
                                {c.completed ? (
                                  <CheckCircle2 className="h-4 w-4 shrink-0 text-status-green" strokeWidth={2} />
                                ) : (
                                  <XCircle className="h-4 w-4 shrink-0 text-status-red" strokeWidth={2} />
                                )}
                                <p className="text-sm text-foreground">{c.item}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* PPE compliance */}
                        <div>
                          <p className="text-xs font-semibold text-muted-2">PPE compliance</p>
                          <div className="mt-3 grid gap-2 sm:grid-cols-2">
                            {portal.ehs.ppe.map((p) => (
                              <div
                                key={p.name}
                                className="flex items-center justify-between gap-3 rounded-xl border border-border bg-surface px-4 py-3"
                              >
                                <div className="flex min-w-0 items-center gap-2.5">
                                  <img
                                    src={`https://i.pravatar.cc/56?img=${p.avatar}`}
                                    alt="" width={32} height={32} loading="lazy" decoding="async"
                                    className="h-8 w-8 shrink-0 rounded-full object-cover"
                                  />
                                  <span className="truncate text-sm font-medium text-foreground">{p.name}</span>
                                </div>
                                <span
                                  className={cn(
                                    "shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-semibold",
                                    p.status === "Compliant"
                                      ? "border-status-green/25 bg-status-green/10 text-status-green"
                                      : "border-status-red/25 bg-status-red/10 text-status-red"
                                  )}
                                >
                                  {p.status}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Incident / near-miss log */}
                        <div>
                          <p className="text-xs font-semibold text-muted-2">Incident / near-miss log</p>
                          <div className="mt-3 space-y-2">
                            {portal.ehs.incidents.map((inc, i) => (
                              <div key={i} className="rounded-xl border border-border bg-surface px-4 py-3.5">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                  <div className="flex items-center gap-2">
                                    <AlertTriangle className="h-3.5 w-3.5 text-status-amber" strokeWidth={2} />
                                    <span className="text-sm font-semibold text-foreground">{inc.type}</span>
                                    <span className="font-mono-data text-xs text-muted-2">· {inc.date}</span>
                                  </div>
                                  <span className={cn("rounded-full border px-2.5 py-1 text-[10px] font-semibold", logStatusColor[inc.status])}>
                                    {inc.status}
                                  </span>
                                </div>
                                <p className="mt-1.5 text-xs leading-relaxed text-muted">{inc.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Hazard reports */}
                        <div>
                          <p className="text-xs font-semibold text-muted-2">Hazard reports</p>
                          <div className="mt-3 space-y-2">
                            {portal.ehs.hazards.map((h, i) => (
                              <div key={i} className="rounded-xl border border-border bg-surface px-4 py-3.5">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                  <div className="min-w-0">
                                    <span className="text-sm font-semibold text-foreground">{h.site}</span>
                                    <span className="font-mono-data ml-2 text-xs text-muted-2">{h.date}</span>
                                  </div>
                                  <div className="flex shrink-0 items-center gap-1.5">
                                    <span className={cn("rounded-full border px-2.5 py-1 text-[10px] font-semibold", severityColor[h.severity])}>
                                      {h.severity}
                                    </span>
                                    <span className={cn("rounded-full border px-2.5 py-1 text-[10px] font-semibold", logStatusColor[h.status])}>
                                      {h.status}
                                    </span>
                                  </div>
                                </div>
                                <p className="mt-1.5 text-xs leading-relaxed text-muted">{h.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
