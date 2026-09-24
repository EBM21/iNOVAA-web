import { cn } from "@/lib/utils";

export default function TrackerHeroVideo({ className }: { className?: string }) {
  return (
    <div className={cn("hero-zoom relative h-full w-full", className)}>
      {/* Decorative loop: muted, no controls, fixed-size parent so it never shifts layout.
          preload="metadata" keeps the 1 MB file off the critical path until the browser starts playback. */}
      <video
        className="h-full w-full object-contain mix-blend-screen"
        src="/hero-tracker.mp4"
        aria-label="Animated product video of the orange iNOVAA Tracker IoT wearable for field workers"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        disablePictureInPicture
      />
    </div>
  );
}
