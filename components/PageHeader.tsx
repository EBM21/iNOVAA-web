"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import Badge from "./ui/Badge";

export default function PageHeader({
  eyebrow,
  title,
  description,
  badge,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  badge?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-grid border-b border-border pb-16 pt-16 lg:pt-20">
      <div className="blob-float pointer-events-none absolute -right-32 top-0 -z-10 h-[380px] w-[560px] rounded-full bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(147,51,234,0.12),transparent)]" />
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge>{badge}</Badge>
          </motion.div>
        )}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.04 }}
          className="mt-4 flex items-center gap-3"
        >
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="h-px w-8 origin-left bg-accent-blue"
          />
          <p className="text-xs font-semibold uppercase tracking-wider text-accent-blue">{eyebrow}</p>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="mt-4 max-w-2xl text-4xl font-bold leading-[1.03] tracking-tight sm:text-5xl"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.14 }}
          className="mt-5 max-w-xl text-lg leading-relaxed text-muted"
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
}
