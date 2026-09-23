import { cn } from "@/lib/utils";

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const gradients = [
  "from-accent-blue to-accent-teal",
  "from-brand-purple to-brand-magenta",
  "from-brand-magenta to-brand-orange",
  "from-accent-teal to-brand-purple",
];

export default function AvatarChip({
  name,
  size = "sm",
  className,
}: {
  name: string;
  size?: "sm" | "md";
  className?: string;
}) {
  const idx = name.charCodeAt(0) % gradients.length;
  const dims = size === "sm" ? "h-6 w-6 text-[10px]" : "h-9 w-9 text-xs";
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-semibold text-white ring-2 ring-white",
        gradients[idx],
        dims,
        className
      )}
      title={name}
    >
      {initials(name)}
    </span>
  );
}
