import { cn } from "@/lib/utils";

export default function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full border border-border-strong bg-surface px-4 py-1.5 text-xs font-medium tracking-wide text-muted shadow-sm",
        className
      )}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-magenta opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-magenta" />
      </span>
      {children}
    </span>
  );
}
