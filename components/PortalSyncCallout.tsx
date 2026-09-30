"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import BrowserFrame from "./ui/BrowserFrame";
import SampleBadge from "./ui/SampleBadge";
import { portalScreens } from "@/lib/portalScreens";

// Hero cue: the Tracker on stage, with a small thumbnail of the real Portal it syncs to.
export default function PortalSyncCallout({ href = "#portal" }: { href?: string }) {
  const shot = portalScreens[0];
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className="absolute bottom-0 right-0 z-20 w-44 sm:bottom-4 sm:w-56"
    >
      <Link
        href={href}
        className="group block rounded-2xl border border-white/10 bg-black/60 p-2 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.9)] backdrop-blur-md transition-colors duration-300 hover:border-white/25"
      >
        <div className="relative">
          <BrowserFrame compact tone="dark" src={shot.src} alt="Thumbnail of the iNOVAA Portal dashboard the Tracker syncs to" url={shot.url} sizes="224px" />
          <SampleBadge className="absolute bottom-1.5 right-1.5 px-1.5 text-[8px]" />
        </div>
        <span className="mt-2 flex items-center gap-2 px-1 pb-0.5 text-[11px] font-semibold text-white">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute h-full w-full animate-ping rounded-full bg-accent-teal opacity-75" />
            <span className="relative h-2 w-2 rounded-full bg-accent-teal" />
          </span>
          Syncs to the iNOVAA Portal
          <ArrowRight className="ml-auto h-3.5 w-3.5 text-brand-orange transition-transform group-hover:translate-x-0.5" />
        </span>
      </Link>
    </motion.div>
  );
}
