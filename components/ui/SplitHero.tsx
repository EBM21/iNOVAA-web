"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function SplitHero({
  eyebrow,
  title,
  subhead,
  ctaLabel = "Book a call",
  ctaHref = "/contact",
  secondaryLabel,
  secondaryHref,
  stats,
  visual,
  dark = false,
}: {
  eyebrow: string;
  title: ReactNode;
  subhead: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  stats?: { label: string; value: string }[];
  visual: ReactNode;
  dark?: boolean;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden pb-14 sm:pb-20 lg:flex lg:min-h-[85vh] lg:items-center lg:pb-28",
        dark
          ? "bg-studio -mt-[70px] pt-[126px] sm:-mt-[94px] sm:pt-[174px]"
          : "bg-background pt-14 sm:pt-20 lg:pt-28"
      )}
    >
      {/* full-bleed soft gradient blend — dark zone bleeds directly into the light background, no boxed card */}
      {!dark && (
        <>
          <div
            className="pointer-events-none absolute inset-0 lg:hidden"
            style={{
              background:
                "radial-gradient(ellipse 150% 65% at 50% 100%, var(--studio-3) 0%, var(--studio-2) 32%, transparent 62%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 hidden lg:block"
            style={{
              background:
                "radial-gradient(ellipse 68% 95% at 82% 50%, var(--studio-3) 0%, var(--studio-2) 40%, transparent 70%)",
            }}
          />
        </>
      )}

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-6 px-6 lg:grid-cols-2 lg:gap-10 lg:px-8">
        <div>
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={cn("label-mono flex items-center gap-2 text-xs", dark ? "text-white/50" : "text-muted-2")}
          >
            <span className="text-brand-orange">◆</span> {eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.06 }}
            className={cn("mt-4 text-4xl font-black leading-[1.02] tracking-tight sm:text-5xl", dark ? "text-white" : "text-foreground")}
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className={cn("mt-5 max-w-sm text-base leading-relaxed", dark ? "text-white/60" : "text-muted")}
          >
            {subhead}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <Link
              href={ctaHref}
              className="btn-primary group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
            >
              {ctaLabel}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            {secondaryLabel && secondaryHref && (
              <Link
                href={secondaryHref}
                className={cn(
                  "inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-300",
                  dark
                    ? "border border-white/25 text-white hover:border-white/45 hover:bg-white/5"
                    : "btn-secondary"
                )}
              >
                {secondaryLabel}
              </Link>
            )}
          </motion.div>

          {stats && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className={cn("mt-9 grid max-w-md grid-cols-3 gap-4 border-t pt-6", dark ? "border-white/15" : "border-border")}
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <p className={cn("font-mono-data text-lg font-semibold", dark ? "text-white" : "text-foreground")}>{s.value}</p>
                  <p className={cn("label-mono mt-1 text-[10px]", dark ? "text-white/40" : "text-muted-2")}>{s.label}</p>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        <div className="relative flex h-[380px] items-center justify-center sm:h-[460px] lg:h-[560px]">{visual}</div>
      </div>
    </section>
  );
}
