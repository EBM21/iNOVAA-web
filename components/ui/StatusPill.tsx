import { cn } from "@/lib/utils";

export type Status = "Cleared" | "At risk" | "Blocked" | "Scheduled" | "Completed" | "In Progress" | "Overdue";

const statusStyles: Record<Status, string> = {
  Cleared: "bg-status-green/10 text-status-green border-status-green/25",
  Completed: "bg-status-green/10 text-status-green border-status-green/25",
  "At risk": "bg-status-amber/10 text-status-amber border-status-amber/25",
  "In Progress": "bg-status-amber/10 text-status-amber border-status-amber/25",
  Blocked: "bg-status-red/10 text-status-red border-status-red/25",
  Overdue: "bg-status-red/10 text-status-red border-status-red/25",
  Scheduled: "bg-status-blue/10 text-status-blue border-status-blue/25",
};

export default function StatusPill({ status, className }: { status: Status; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium whitespace-nowrap",
        statusStyles[status],
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
