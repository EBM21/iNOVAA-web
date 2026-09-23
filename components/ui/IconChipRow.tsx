"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function IconChipRow({
  eyebrow,
  title,
  accent,
  subtitle,
  items,
  beige = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  accent?: string;
  subtitle?: string;
  items: { icon: ReactNode; label: string; href?: string }[];
  beige?: boolean;
}) {
  return (
    <section className={cn("py-20 sm:py-28", beige && "bg-surface-2")}>
      <div className="mx-auto max-w-5xl px-6 text-center lg:px-8">
        {eyebrow && <p className="label-mono text-xs text-brand-orange">{eyebrow}</p>}
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          {title} {accent && <span className="text-brand-orange">{accent}</span>}
        </h2>
        {subtitle && <p className="mt-3 text-sm text-muted">{subtitle}</p>}

        <div className="mt-12 flex flex-wrap items-start justify-center gap-x-8 gap-y-8 sm:gap-x-12">
          {items.map((f, i) => {
            const Chip = (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className="group flex w-20 flex-col items-center gap-3"
              >
                <span className="icon-badge-orange-hover flex h-20 w-20 items-center justify-center rounded-full border border-brand-orange/40 bg-background text-brand-orange">
                  {f.icon}
                </span>
                <span className="text-xs font-medium text-muted">{f.label}</span>
              </motion.div>
            );
            return f.href ? (
              <Link key={f.label} href={f.href}>
                {Chip}
              </Link>
            ) : (
              <div key={f.label}>{Chip}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
