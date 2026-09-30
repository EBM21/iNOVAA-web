import Image from "next/image";
import { cn } from "@/lib/utils";
import { PORTAL_SHOT_H, PORTAL_SHOT_W } from "@/lib/portalScreens";

// Browser chrome around a real Portal screenshot. "light" sits on the warm neutral stages,
// "dark" on the black studio stage. The screenshot always keeps its native aspect ratio.
export default function BrowserFrame({
  src,
  alt,
  url,
  sizes = "(min-width: 1280px) 1100px, 100vw",
  preload = false,
  tone = "light",
  compact = false,
  className,
}: {
  src: string;
  alt: string;
  url: string;
  sizes?: string;
  preload?: boolean;
  tone?: "light" | "dark";
  compact?: boolean;
  className?: string;
}) {
  const dark = tone === "dark";
  const dot = compact ? "h-1.5 w-1.5" : "h-2.5 w-2.5";

  return (
    <div
      className={cn(
        "overflow-hidden border",
        compact ? "rounded-md" : "rounded-xl",
        dark
          ? "border-white/10 bg-[#0e1422] shadow-[0_40px_90px_-40px_rgba(0,0,0,0.8)]"
          : "border-black/[0.07] bg-[#fbf8f2] shadow-[0_2px_4px_-2px_rgba(21,18,16,0.08),0_40px_80px_-36px_rgba(21,18,16,0.38)]",
        className
      )}
    >
      <div
        className={cn(
          "relative flex items-center border-b",
          compact ? "h-4 gap-1 px-1.5" : "h-9 gap-1.5 px-3.5",
          dark ? "border-white/[0.06] bg-[#141b2b]" : "border-black/[0.06] bg-[#f4efe4]"
        )}
      >
        <span className={cn("rounded-full bg-[#ff5f57]", dot)} />
        <span className={cn("rounded-full bg-[#febc2e]", dot)} />
        <span className={cn("rounded-full bg-[#28c840]", dot)} />
        {!compact && (
          <span
            className={cn(
              "font-mono-data absolute left-1/2 hidden -translate-x-1/2 rounded-md px-3 py-0.5 text-[11px] sm:block",
              dark ? "bg-white/5 text-white/45" : "bg-black/[0.04] text-muted-2"
            )}
          >
            {url}
          </span>
        )}
      </div>
      <Image
        src={src}
        alt={alt}
        width={PORTAL_SHOT_W}
        height={PORTAL_SHOT_H}
        sizes={sizes}
        quality={90}
        preload={preload}
        className="block h-auto w-full"
      />
    </div>
  );
}
