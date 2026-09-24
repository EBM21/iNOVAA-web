"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function FadeImage({
  src,
  alt,
  className = "",
  delay = 0,
  maskSize = "88% 82%",
}: {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
  maskSize?: string;
}) {
  const mask = `radial-gradient(ellipse ${maskSize} at 50% 50%, black 60%, transparent 100%)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`relative ${className}`}
    >
      <div className="pointer-events-none absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-to-br from-accent-blue/15 via-brand-magenta/10 to-brand-orange/15 blur-3xl" />
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 640px, 100vw"
        className="object-cover"
        style={{ maskImage: mask, WebkitMaskImage: mask }}
      />
    </motion.div>
  );
}
