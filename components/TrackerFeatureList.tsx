"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  BatteryFull,
  MapPin,
  ScanEye,
  ShieldCheck,
  Droplet,
  Bluetooth,
  Cpu,
  WifiOff,
} from "lucide-react";
import Reveal from "./ui/Reveal";

const features = [
  { icon: WifiOff, title: "First Offline Tracking Device", text: "No signal, no problem — the first tracker built to classify and log work fully offline in the field." },
  { icon: BatteryFull, title: "Long Battery Life", text: "Multi-day charge, built for full field days." },
  { icon: MapPin, title: "Real-Time GPS", text: "Live location and route tracking." },
  { icon: ScanEye, title: "Automatic Activity Detection", text: "Classifies work without a check-in." },
  { icon: ShieldCheck, title: "Lightweight & Rugged Build", text: "All-day comfort, built for tough sites." },
  { icon: Droplet, title: "Water & Dust Resistant", text: "IP65 — rain, sweat, and dust handled." },
  { icon: Bluetooth, title: "BLE 5.3 Connectivity", text: "Syncs the moment it's in range." },
  { icon: Cpu, title: "On-Device Classification", text: "ML on the wrist — proof of work, automated." },
];

export default function TrackerFeatureList() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          {/* Photo side */}
          <Reveal className="relative">
            <div className="relative overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-30px_rgba(26,26,31,0.35)]">
              <Image
                src="/tracker-rock-hero.png"
                width={921}
                height={1152}
                sizes="(min-width: 1024px) 45vw, 100vw"
                alt="Orange iNOVAA Tracker wearable resting on a rock at an outdoor job site"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="font-script absolute -top-6 left-4 -rotate-3 text-3xl text-brand-orange sm:-top-8 sm:text-4xl">
              Track. Work. Verify.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="absolute -bottom-8 -right-4 w-44 overflow-hidden rounded-xl border-4 border-background shadow-[0_20px_40px_-14px_rgba(26,26,31,0.4)] sm:-right-8 sm:w-56"
            >
              <Image
                src="/tracker-gps-inset.png"
                width={658}
                height={288}
                sizes="224px"
                alt="iNOVAA Tracker next to a tablet showing a technician's real-time GPS route"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </Reveal>

          {/* Feature list */}
          <div className="mt-10 lg:mt-0">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange">Smart features</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">A wrist-worn activity tracker built for technicians</h2>

            <div className="mt-9 divide-y divide-border">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ x: 4 }}
                  className="group flex items-start gap-4 py-4"
                >
                  <span className="icon-badge-orange flex h-11 w-11 shrink-0 items-center justify-center rounded-full">
                    <f.icon className="h-4.5 w-4.5" strokeWidth={2} />
                  </span>
                  <div>
                    <p className="font-semibold text-foreground">{f.title}</p>
                    <p className="mt-0.5 text-sm text-muted">{f.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
