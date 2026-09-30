"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import DeviceAnnotation from "./ui/DeviceAnnotation";
import BrowserFrame from "./ui/BrowserFrame";
import SampleBadge from "./ui/SampleBadge";
import { portalScreens } from "@/lib/portalScreens";
import { cn } from "@/lib/utils";

// Slide order: lead with the software, then the device that feeds it, then what's inside the device.
const DASHBOARD = 0;
const TRACKER = 1;
const VIDEO = 2;
const HOLD_S = { [TRACKER]: 4.5, [DASHBOARD]: 5 } as Record<number, number>;
const FADE_S = 1.1;
const EASE = [0.65, 0, 0.35, 1] as const;

// One crossfade treatment shared by every slide.
function Slide({ show, children, className }: { show: boolean; children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: show ? 1 : 0, scale: show ? 1 : 0.96 }}
      transition={{ duration: FADE_S, ease: EASE }}
      className={cn("absolute inset-0", !show && "pointer-events-none", className)}
      aria-hidden={!show}
    >
      {children}
    </motion.div>
  );
}

/**
 * Home hero visual — an automatic three-slide loop: Portal dashboard → Tracker still → assemble video.
 * The dashboard screenshot is preloaded (it's the first slide, so the LCP element). The video isn't
 * requested until the page has loaded, and it's only entered once it can play through; if it isn't
 * ready yet, the loop skips straight back to the dashboard rather than showing an empty stage.
 */
export default function HeroSlider() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoReadyRef = useRef(false);
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(DASHBOARD);
  const [cycle, setCycle] = useState(0); // restarts the progress bar + push-in when a slide is re-entered
  const [loadVideo, setLoadVideo] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);

  const go = (i: number) => {
    if (i !== VIDEO) videoRef.current?.pause();
    setActive(i);
    setCycle((c) => c + 1);
  };

  // Start fetching the video only once the rest of the page has loaded.
  useEffect(() => {
    const start = () => setLoadVideo(true);
    if (document.readyState === "complete") {
      const t = setTimeout(start, 300);
      return () => clearTimeout(t);
    }
    window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, []);

  // Timed slides advance on their own; the video advances when it ends.
  useEffect(() => {
    if (reduceMotion || active === VIDEO) return;
    const t = setTimeout(() => {
      if (active === DASHBOARD) go(TRACKER);
      else go(videoReadyRef.current ? VIDEO : DASHBOARD);
    }, HOLD_S[active] * 1000);
    return () => clearTimeout(t);
  }, [active, cycle, reduceMotion]);

  // Play from the top each time the video slide comes in.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || active !== VIDEO) return;
    v.currentTime = 0;
    v.play().catch(() => go(DASHBOARD));
  }, [active, cycle]);

  const labels = ["Portal", "Tracker", "Inside"];

  return (
    <div className="relative h-full w-full">
      {/* ambient glow shared by every slide */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(249,115,22,0.30), rgba(214,64,159,0.12) 45%, transparent 70%)" }}
      />

      {/* 2 — still product shot */}
      <Slide show={active === TRACKER} className="flex items-center justify-center">
        <div className="relative aspect-[4/5] h-[92%]">
          <div
            className="hero-zoom absolute inset-0 overflow-hidden rounded-[2rem]"
            style={{
              maskImage: "radial-gradient(ellipse closest-side at 50% 50%, black 68%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(ellipse closest-side at 50% 50%, black 68%, transparent 100%)",
            }}
          >
            {/* slow push-in while the still holds */}
            <motion.div
              key={`still-${cycle}`}
              initial={{ scale: 1 }}
              animate={{ scale: reduceMotion || active !== TRACKER ? 1 : 1.05 }}
              transition={{ duration: HOLD_S[TRACKER] + FADE_S, ease: "linear" }}
              className="absolute inset-0"
            >
              <Image
                src="/tracker-rock-hero.png"
                alt="Orange iNOVAA Tracker IoT wearable resting on a rock at sunrise"
                fill
                sizes="(min-width: 1024px) 450px, 80vw"
                className="object-cover"
              />
            </motion.div>
          </div>
          {active === TRACKER && (
            <>
              <DeviceAnnotation x="-10%" y="14%" title="Offline-first" text="Logs with zero signal" delay={0.6} />
              <DeviceAnnotation x="70%" y="78%" title="7-day battery" text="IP65 · built for site work" delay={0.8} />
            </>
          )}
        </div>
      </Slide>

      {/* 3 — scroll-assemble video (fetched after page load) */}
      <Slide show={active === VIDEO}>
        <video
          ref={videoRef}
          className="h-full w-full object-contain mix-blend-screen"
          src={loadVideo ? "/hero-tracker.mp4" : undefined}
          aria-label="Animated assembly of the orange iNOVAA Tracker IoT wearable"
          muted
          playsInline
          preload={loadVideo ? "auto" : "none"}
          disablePictureInPicture
          onCanPlayThrough={() => {
            videoReadyRef.current = true;
          }}
          onLoadedMetadata={(e) => setVideoDuration(e.currentTarget.duration || 0)}
          onEnded={() => go(DASHBOARD)}
        />
      </Slide>

      {/* 1 — the real Portal dashboard the Tracker feeds */}
      <Slide show={active === DASHBOARD} className="flex items-center">
        <div className="relative w-full">
          <p className="mb-4 flex items-center gap-2 text-[11px] font-semibold text-white">
            <span className="relative flex h-2 w-2">
              <span className="absolute h-full w-full animate-ping rounded-full bg-accent-teal opacity-75" />
              <span className="relative h-2 w-2 rounded-full bg-accent-teal" />
            </span>
            iNOVAA Portal
            <span className="font-normal text-white/50">· synced from the Tracker</span>
            <SampleBadge className="ml-auto" />
          </p>
          <motion.div
            key={`dash-${cycle}`}
            initial={{ y: 10 }}
            animate={{ y: 0 }}
            transition={{ duration: FADE_S + 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <BrowserFrame
              tone="dark"
              src={portalScreens[0].src}
              alt={portalScreens[0].alt}
              url={portalScreens[0].url}
              preload
              sizes="(min-width: 1024px) 600px, 92vw"
            />
          </motion.div>
        </div>
      </Slide>

      {/* slide indicators — optional; the slider runs on its own */}
      <div className="absolute bottom-0 left-0 z-20 flex items-center gap-3 sm:bottom-4">
        {labels.map((label, i) => {
          const duration = i === VIDEO ? videoDuration : HOLD_S[i];
          return (
            <button
              key={label}
              type="button"
              onClick={() => go(i === VIDEO && !videoReadyRef.current ? active : i)}
              aria-label={`Show ${label} slide`}
              aria-pressed={active === i}
              className="group flex flex-col items-start gap-1.5"
            >
              <span className="relative h-[3px] w-9 overflow-hidden rounded-full bg-white/15 sm:w-12">
                {active === i && (
                  <motion.span
                    key={`bar-${cycle}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: reduceMotion && i !== VIDEO ? 0 : duration || 0.01, ease: "linear" }}
                    className="absolute inset-0 origin-left rounded-full bg-white"
                  />
                )}
              </span>
              <span
                className={cn(
                  "label-mono text-[9px] transition-colors",
                  active === i ? "text-white/80" : "text-white/35 group-hover:text-white/60"
                )}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

