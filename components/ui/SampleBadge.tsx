import { cn } from "@/lib/utils";

// Marks a Portal screenshot or stat preview as example data rather than a live customer claim.
export default function SampleBadge({ className, label = "Sample view" }: { className?: string; label?: string }) {
  return (
    <span
      className={cn(
        "label-mono pointer-events-none inline-flex items-center rounded-full border border-white/15 bg-black/60 px-2 py-0.5 text-[9px] text-white/80 backdrop-blur-sm",
        className
      )}
    >
      {label}
    </span>
  );
}
