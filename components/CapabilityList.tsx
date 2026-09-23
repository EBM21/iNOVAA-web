"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export default function CapabilityList({
  items,
}: {
  items: { icon: ReactNode; title: string; text: string }[];
}) {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="grid gap-x-12 divide-y divide-border sm:grid-cols-2 sm:gap-y-0 sm:divide-y-0">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ x: 4 }}
              className="group flex items-start gap-4 border-border py-5 sm:border-t sm:[&:nth-child(-n+2)]:border-t-0"
            >
              <span className="icon-badge-orange flex h-11 w-11 shrink-0 items-center justify-center rounded-full">
                {item.icon}
              </span>
              <div>
                <p className="font-semibold text-foreground">{item.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
