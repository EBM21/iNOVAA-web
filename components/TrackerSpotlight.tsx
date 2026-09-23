"use client";

import { motion } from "framer-motion";
import { BatteryFull, MapPin, ScanEye, ShieldCheck, WifiOff } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";

const tiles = [
  { src: "/tracker-rock-hero.png", caption: "Full Assembly", dark: true, large: true },
  { src: "/tracker-detail-sensors.png", caption: "Precision Sensors", dark: true },
  { src: "/tracker-detail-led.png", caption: "Activity LED", dark: false },
  { src: "/tracker-detail-strap.png", caption: "Secure Strap", dark: true },
  { src: "/tracker-detail-wrist.png", caption: "Worn on Wrist", dark: false },
];

const features = [
  { icon: WifiOff, title: "Offline-First", text: "The first tracker built to work with zero signal on site." },
  { icon: BatteryFull, title: "Long Battery Life", text: "Up to 7 days on a single charge." },
  { icon: MapPin, title: "Real-Time GPS", text: "Live location and route tracking." },
  { icon: ScanEye, title: "Activity Detection", text: "Classifies work without a check-in." },
  { icon: ShieldCheck, title: "Rugged & IP65", text: "Built for dust, rain, and job sites." },
];

function Tile({ src, caption, dark, large, delay }: { src: string; caption: string; dark: boolean; large?: boolean; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className={`group relative overflow-hidden rounded-[1.75rem] ${large ? "aspect-[4/3] sm:aspect-square lg:aspect-auto lg:h-full" : "aspect-square"} ${dark ? "bg-studio" : "bg-surface-2"}`}
    >
      <img
        src={src}
        alt={caption}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-4">
        <p className="text-sm font-semibold text-white">{caption}</p>
      </div>
    </motion.div>
  );
}

export default function TrackerSpotlight() {
  const [large, ...rest] = tiles;

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading eyebrow="Tracker Spotlight" index="§02" title="Every angle, in the field" />

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <Tile {...large} delay={0} />
          <div className="grid grid-cols-2 gap-4">
            {rest.map((t, i) => (
              <Tile key={t.caption} {...t} delay={0.08 * (i + 1)} />
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="group rounded-2xl border border-border bg-background p-5 shadow-[0_20px_50px_-30px_rgba(21,18,16,0.25)] transition-shadow duration-300 hover:shadow-[0_28px_60px_-24px_rgba(21,18,16,0.3)]"
            >
              <span className="icon-badge-orange flex h-11 w-11 items-center justify-center rounded-xl">
                <f.icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <p className="mt-4 font-semibold text-foreground">{f.title}</p>
              <p className="mt-1 text-sm text-muted">{f.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
