"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import BrowserFrame from "./ui/BrowserFrame";
import { portalScreens, type PortalScreenKey } from "@/lib/portalScreens";

// Dark-stage hero visual for software pages: a real Portal screenshot, with the Tracker shown as its data source.
export default function PortalHeroVisual({ screen = "dashboard" }: { screen?: PortalScreenKey }) {
  const shot = portalScreens.find((s) => s.key === screen) ?? portalScreens[0];
  return (
    <div className="relative flex h-full w-full items-center">
      {/* soft ambient glow, same treatment as the Tracker hero */}
      <div
        className="pointer-events-none absolute inset-x-0 top-1/2 h-3/4 -translate-y-1/2 rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(ellipse at center, rgba(249,115,22,0.28), rgba(124,58,237,0.12) 45%, transparent 70%)" }}
      />
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full"
      >
        <BrowserFrame tone="dark" src={shot.src} alt={shot.alt} url={shot.url} preload sizes="(min-width: 1024px) 620px, 92vw" />

      {/* anchored to the frame's corner so it reads as "this feeds that" */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -bottom-8 left-3 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/75 py-2 pl-2 pr-4 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)] backdrop-blur-md sm:-left-6"
      >
        <span className="relative h-11 w-11 overflow-hidden rounded-xl">
          <Image src="/tracker-rock-hero.png" alt="" fill sizes="44px" className="object-cover" />
        </span>
        <span>
          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-white">
            <span className="relative flex h-2 w-2">
              <span className="absolute h-full w-full animate-ping rounded-full bg-accent-teal opacity-75" />
              <span className="relative h-2 w-2 rounded-full bg-accent-teal" />
            </span>
            Fed by the iNOVAA Tracker
          </span>
          <span className="block text-[10px] text-white/50">Wrist activity → live job data</span>
        </span>
      </motion.div>
      </motion.div>
    </div>
  );
}
