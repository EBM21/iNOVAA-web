"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Activity, AlertTriangle, ArrowRight, ArrowUpRight, Gauge } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import SampleBadge from "./ui/SampleBadge";
import { portalScreens, type PortalScreenKey } from "@/lib/portalScreens";
import { industries } from "@/lib/industries";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

// Bento layout mirroring Tracker Spotlight: one large tile, then a wide tile over two squares.
// `focus` holds object-position classes framing the most telling part of each 1870 × 841 screenshot.
// The large tile changes shape per breakpoint, so its crop does too — each value keeps the app's
// sidebar logo just out of frame while the first KPI card stays whole.
const tiles: { key: PortalScreenKey; label: string; focus: string; variant: "large" | "wide" | "square" }[] = [
  { key: "dashboard", label: "Operations Dashboard", focus: "object-[28%_0%] sm:object-[23%_0%] lg:object-[21%_0%]", variant: "large" },
  { key: "activity", label: "Field Activity Log", focus: "object-[100%_0%]", variant: "wide" },
  { key: "jobs", label: "Jobs & Analytics", focus: "object-[28%_0%]", variant: "square" },
  { key: "schedule", label: "Teams & Performance", focus: "object-[100%_0%]", variant: "square" },
];

// One line each — drawn from what the real Portal screens show.
const callouts = [
  { icon: Activity, title: "Live job status", text: "Completed, pending, and missed — as Tracker data syncs." },
  { icon: Gauge, title: "Team efficiency", text: "Completion rate per crew, day by day." },
  { icon: AlertTriangle, title: "Attention needed", text: "Issues ranked before they become missed jobs." },
];

// Every industry from the shared list, each opening its own page's interactive Portal demo.
// (Falls back to Contact if an industry is ever added without a demo page.)
const demoIndustries = industries.map((ind) => ({ label: ind.label, href: ind.demo ?? "/contact", live: Boolean(ind.demo) }));

function ScreenTile({ tile, delay }: { tile: (typeof tiles)[number]; delay: number }) {
  const screen = portalScreens.find((s) => s.key === tile.key)!;
  const large = tile.variant === "large";

  return (
    <motion.figure
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: EASE }}
      whileHover={{ y: -4 }}
      className={cn(
        "group relative overflow-hidden rounded-[1.75rem] bg-[#0b1220] shadow-[0_24px_60px_-36px_rgba(21,18,16,0.55)]",
        large && "aspect-[4/3] sm:aspect-square lg:aspect-auto lg:h-full",
        tile.variant === "wide" && "col-span-2 aspect-[2/1]",
        tile.variant === "square" && "aspect-square"
      )}
    >
      {/* Screenshot fades into the navy tile at its edges instead of ending on a hard crop line. */}
      <div
        className="absolute inset-0"
        style={{
          maskImage: "radial-gradient(ellipse 120% 115% at 50% 20%, black 55%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 120% 115% at 50% 20%, black 55%, transparent 100%)",
        }}
      >
        <Image
          src={screen.src}
          alt={screen.alt}
          fill
          quality={90}
          // object-cover scales these wide shots by height, so they render ~2x wider than the tile.
          sizes={large ? "(min-width: 1024px) 1300px, 200vw" : "(min-width: 1024px) 700px, 110vw"}
          className={cn("object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]", tile.focus)}
        />
      </div>

      {/* soft brand glow + caption on a bottom fade, same treatment as the Tracker Spotlight tiles */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{ background: "radial-gradient(ellipse 70% 50% at 0% 100%, rgba(214,64,159,0.22), transparent 70%)" }}
      />
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0b1220] via-[#0b1220]/80 to-transparent px-5 pb-4 pt-14 sm:px-6 sm:pb-5">
        <p className="label-mono text-[10px] text-white/55">{tile.label}</p>
        <p
          className={cn(
            "mt-1 font-semibold text-white",
            large ? "text-base sm:text-lg" : "text-sm",
            tile.variant === "square" && "hidden sm:block" // phones: label only, so the screenshot stays visible
          )}
        >
          {screen.caption}
        </p>
      </figcaption>
      <SampleBadge className="absolute right-4 top-4" />
      <span className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-white/10" />
    </motion.figure>
  );
}

export default function PortalShowcase({
  index,
  id = "portal",
  title = "The iNOVAA Tracker + Application + Portal — where visibility translates into a decision",
}: {
  index?: string;
  id?: string;
  title?: string;
}) {
  const [large, ...rest] = tiles;

  return (
    <section id={id} className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading eyebrow="The Software" index={index} title={title} />

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <ScreenTile tile={large} delay={0} />
          <div className="grid grid-cols-2 gap-4">
            {rest.map((t, i) => (
              <ScreenTile key={t.key} tile={t} delay={0.08 * (i + 1)} />
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {callouts.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: EASE }}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-border bg-background p-5 shadow-[0_20px_50px_-30px_rgba(21,18,16,0.25)] transition-shadow duration-300 hover:shadow-[0_28px_60px_-24px_rgba(21,18,16,0.3)]"
            >
              <span className="icon-badge-orange flex h-11 w-11 items-center justify-center rounded-xl">
                <c.icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <p className="mt-4 font-semibold text-foreground">{c.title}</p>
              <p className="mt-1 text-sm text-muted">{c.text}</p>
            </motion.div>
          ))}
        </div>

        {/* bridge to the interactive industry dashboards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          className="bg-studio mt-4 flex flex-col gap-5 rounded-[1.75rem] px-6 py-6 sm:px-8 sm:py-7"
        >
          <div>
            <p className="font-semibold text-white">See it in action for your industry</p>
            <p className="mt-1 text-sm text-white/55">A working Portal, loaded with a real crew&apos;s day.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {demoIndustries.map((d) => (
              <Link
                key={d.label}
                href={d.href}
                title={d.live ? `Open the live ${d.label} demo` : `Book a ${d.label} demo`}
                className="group inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white/85 transition-colors hover:border-white/40 hover:bg-white/5 hover:text-white"
              >
                {d.label}
                {d.live ? (
                  <ArrowRight className="h-3.5 w-3.5 text-brand-orange transition-transform group-hover:translate-x-0.5" />
                ) : (
                  <ArrowUpRight className="h-3.5 w-3.5 text-white/60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                )}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
