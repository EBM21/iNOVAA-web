"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// `icon` is a rendered element (not a component) so a server page can pass it to this client component.
// `href` is the industry's own page; `demo` is the closest interactive Portal demo, where one exists.
export type IndustryCard = { icon: ReactNode; label: string; sub: string[]; href?: string; demo?: string };

const BRAND_GRADIENT = "linear-gradient(135deg, var(--brand-purple) 0%, var(--brand-magenta) 55%, var(--brand-orange) 100%)";

/**
 * One industry as a flip card. Front: icon and name. Back (iNOVAA brand gradient): the
 * sub-sectors, plus a link when the industry has its own page. Flips on hover and keyboard focus;
 * touch screens (no hover) flip on tap instead.
 */
function FlipCard({ item }: { item: IndustryCard }) {
  const [flipped, setFlipped] = useState(false);

  // Tap-to-flip only where there's no hover; on desktop, hover does the flipping.
  const toggleOnTouch = () => {
    if (window.matchMedia("(hover: none)").matches) setFlipped((f) => !f);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={`${item.label}: ${item.sub.join(", ")}`}
      onClick={toggleOnTouch}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setFlipped((f) => !f);
        }
      }}
      className="group h-60 cursor-pointer outline-none [perspective:1200px] sm:h-56"
    >
      <div
        className={cn(
          "relative h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] [transform-style:preserve-3d] motion-reduce:duration-0",
          "group-hover:[transform:rotateY(180deg)] group-focus-visible:[transform:rotateY(180deg)]",
          flipped && "[transform:rotateY(180deg)]"
        )}
      >
        {/* FRONT */}
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-border bg-white p-5 text-center shadow-[0_1px_2px_rgba(21,18,16,0.04)] [backface-visibility:hidden] group-focus-visible:ring-2 group-focus-visible:ring-brand-orange/30">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-orange/10 text-brand-orange [&_svg]:h-7 [&_svg]:w-7">
            {item.icon}
          </span>
          <h3 className="mt-4 text-[15px] font-semibold leading-snug tracking-tight text-foreground">{item.label}</h3>
        </div>

        {/* BACK — iNOVAA brand gradient */}
        <div
          className="absolute inset-0 flex flex-col rounded-2xl p-4 text-white shadow-[0_24px_48px_-20px_rgba(214,64,159,0.55)] [backface-visibility:hidden] [transform:rotateY(180deg)] sm:p-5"
          style={{ backgroundImage: BRAND_GRADIENT }}
        >
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/20 [&_svg]:h-4 [&_svg]:w-4">
              {item.icon}
            </span>
            <h3 className="text-sm font-semibold leading-snug tracking-tight">{item.label}</h3>
          </div>

          <ul className="mt-3 space-y-1">
            {item.sub.map((s) => (
              <li key={s} className="flex items-center gap-2 text-[13px] leading-snug text-white/90">
                <span className="h-1 w-1 shrink-0 rounded-full bg-white" />
                {s}
              </li>
            ))}
          </ul>

          {item.href && (
            <Link
              href={item.href}
              onClick={(e) => e.stopPropagation()}
              tabIndex={flipped ? 0 : -1}
              className="group/link mt-auto inline-flex items-center gap-1 self-start text-xs font-semibold text-white hover:underline"
            >
              Explore
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default function IndustryCards({
  eyebrow,
  title,
  accent,
  subtitle,
  items,
}: {
  eyebrow?: string;
  title: string;
  accent?: string;
  subtitle?: string;
  items: IndustryCard[];
}) {
  return (
    <section className="bg-surface-2 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          {eyebrow && <p className="label-mono text-xs text-brand-orange">{eyebrow}</p>}
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            {title} {accent && <span className="text-brand-orange">{accent}</span>}
          </h2>
          {subtitle && <p className="mt-3 text-sm text-muted">{subtitle}</p>}
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {items.map((item, i) => (
            <motion.li
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: (i % 5) * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              <FlipCard item={item} />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
