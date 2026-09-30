// Real screenshots of the iNOVAA Portal. All are 1870 × 841 captures of the live admin app.
export const PORTAL_SHOT_W = 1870;
export const PORTAL_SHOT_H = 841;

export const portalScreens = [
  {
    key: "dashboard",
    tab: "Operations Dashboard",
    src: "/portal-dashboard.png",
    url: "app.inovaa.ai/dashboard",
    caption: "Every job, every status, one screen.",
    alt: "iNOVAA Portal operations dashboard showing capacity, total jobs, completed, pending, missed, and completion rate cards, a daily job execution trend chart, a client portfolio donut, and an Attention Needed list",
  },
  {
    key: "jobs",
    tab: "Jobs & Analytics",
    src: "/portal-jobs.png",
    url: "app.inovaa.ai/jobs",
    caption: "Filter by site, client, or status. Assign in a click.",
    alt: "iNOVAA Portal Jobs & Analytics screen with total, completed, in-progress, and scheduled job counts, search and filters, and a grid of job cards by site and status",
  },
  {
    key: "schedule",
    tab: "Teams & Schedule",
    src: "/portal-schedule.png",
    url: "app.inovaa.ai/teams",
    caption: "A month of shifts, and who's active right now.",
    alt: "iNOVAA Portal team schedule calendar showing shift bars per day, clients, total jobs, scheduled, completed, active now, and missed counts, and a 77% team performance completion ring",
  },
  {
    key: "activity",
    tab: "Field Activity Log",
    src: "/portal-activity.png",
    url: "app.inovaa.ai/activity",
    caption: "Every Tracker reading, live — who, where, and for how long.",
    alt: "iNOVAA Portal Field Activity & Sensor Telemetry screen with total data points, devices online, active jobs, voice notes, and a live activity log of technicians, activity types, sites, durations, and status",
  },
] as const;

export type PortalScreenKey = (typeof portalScreens)[number]["key"];
