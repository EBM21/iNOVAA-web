"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function SectionHeading({
  eyebrow,
  index,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow: string;
  index?: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div className={cn(centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl", className)}>
      <div className={cn("flex items-center gap-3", centered && "justify-center")}>
        {index && <span className="label-mono text-xs text-muted-2">{index}</span>}
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
          className="h-px w-8 origin-left bg-accent-blue"
        />
        <p className="label-mono text-xs text-accent-blue">{eyebrow}</p>
      </div>
      <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 leading-relaxed text-muted">{description}</p>}
    </div>
  );
}
