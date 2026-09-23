export const industryGroups = [
  {
    slug: "solar",
    name: "Solar & Renewable Maintenance",
    blurb: "Panel cleaning crews, asset owners, and O&M providers running distributed sites.",
    sub: ["Solar Panel Cleaning", "Solar Asset Owners", "O&M Providers"],
  },
  {
    slug: "hvac",
    name: "HVAC",
    blurb: "Residential and commercial HVAC teams running scheduled and emergency dispatch.",
    sub: ["Residential HVAC", "Commercial HVAC", "Preventive Maintenance Contractors"],
  },
  {
    slug: "logistics",
    name: "Delivery & Logistics",
    blurb: "Last-mile fleets and route-based crews who need proof of visit, not just proof of delivery.",
    sub: ["Last-Mile Delivery", "Fleet Operations", "Route-Based Field Teams"],
  },
  {
    slug: "hospitality",
    name: "Hospitality Cleaning",
    blurb: "Housekeeping and turnover teams across hotels, short-term rentals, and facilities.",
    sub: ["Hotel Housekeeping Ops", "Vacation Rental Turnover", "Facility Cleaning Contractors"],
  },
  {
    slug: "landscaping",
    name: "Landscaping",
    blurb: "Commercial grounds crews and franchise operators managing recurring routes.",
    sub: ["Commercial Landscaping", "Lawn Care Franchises", "Grounds Maintenance"],
  },
] as const;

export const industryDetails: Record<
  string,
  { scenario: string; site: string; stats: { label: string; value: string }[] }
> = {
  solar: {
    scenario:
      "A panel-cleaning crew logs a job at Sunridge Solar Array, flags Row 4 for low output, and closes with a signed FSR before the next site.",
    site: "Sunridge Solar Array — 4.2 MW, Maricopa County",
    stats: [
      { label: "Avg. output recovery", value: "+6.8%" },
      { label: "Sites tracked", value: "140+" },
      { label: "FSRs signed on-site", value: "98%" },
    ],
  },
  hvac: {
    scenario:
      "Dispatch routes a technician to a commercial rooftop unit, tracks filter and coil service stages, and syncs the report to the property manager's portal.",
    site: "Meridian Office Park — Rooftop Unit 3",
    stats: [
      { label: "First-time fix rate", value: "91%" },
      { label: "Avg. dispatch-to-arrival", value: "34 min" },
      { label: "PM contracts tracked", value: "60+" },
    ],
  },
  logistics: {
    scenario:
      "A last-mile route logs GPS-tagged stop confirmations and delivery photos, giving dispatch proof of visit without a driver call.",
    site: "Route 12 — Last-Mile, Copperline District",
    stats: [
      { label: "Stops with photo proof", value: "100%" },
      { label: "Avg. stops per route", value: "48" },
      { label: "On-time rate", value: "96%" },
    ],
  },
  hospitality: {
    scenario:
      "Housekeeping logs room-by-room turnover status with photo checks, syncing to the front desk the moment a room clears.",
    site: "Palo Verde Hotel — Floor 3 Turnover",
    stats: [
      { label: "Rooms tracked daily", value: "320+" },
      { label: "Avg. turnover time", value: "22 min" },
      { label: "Guest-ready accuracy", value: "99.2%" },
    ],
  },
  landscaping: {
    scenario:
      "A grounds crew works a recurring commercial route, logging stage-by-stage progress across mowing, trimming, and irrigation checks.",
    site: "Canyon Ridge Business Park — Weekly Route",
    stats: [
      { label: "Recurring routes tracked", value: "85" },
      { label: "Crew utilization", value: "88%" },
      { label: "Missed-visit rate", value: "<1%" },
    ],
  },
};

export type EfficiencyCategory = {
  label: string;
  detail: string;
  minutes: number;
  weight: number;
};

export type TeamMember = {
  name: string;
  job: string;
  categories: EfficiencyCategory[];
};

export type EfficiencyIndustry = {
  slug: string;
  tab: string;
  name: string;
  insight: string;
  team: TeamMember[];
};

export const efficiencyData: EfficiencyIndustry[] = [
  {
    slug: "hvac",
    tab: "HVAC",
    name: "HVAC",
    insight: "Rooftop and overhead access work is real labor, not downtime — weighted efficiency reflects that fairly.",
    team: [
      {
        name: "John Doe",
        job: "Rooftop condenser repair",
        categories: [
          { label: "Active Work", detail: "Tool Use + Diagnostics", minutes: 70, weight: 1.0 },
          { label: "Physical Exertion", detail: "Lifting/Carrying", minutes: 25, weight: 0.8 },
          { label: "Access/Positioning", detail: "Ladder, Overhead", minutes: 20, weight: 0.6 },
          { label: "Transit", detail: "Walking", minutes: 15, weight: 0 },
          { label: "Idle", detail: "Waiting / no activity", minutes: 35, weight: 0 },
          { label: "Documentation", detail: "Reporting", minutes: 15, weight: 0 },
        ],
      },
      {
        name: "Robert Turner",
        job: "Furnace inspection",
        categories: [
          { label: "Active Work", detail: "Tool Use + Diagnostics", minutes: 55, weight: 1.0 },
          { label: "Physical Exertion", detail: "Lifting/Carrying", minutes: 15, weight: 0.8 },
          { label: "Access/Positioning", detail: "Ladder, Overhead", minutes: 10, weight: 0.6 },
          { label: "Transit", detail: "Walking", minutes: 20, weight: 0 },
          { label: "Idle", detail: "Waiting / no activity", minutes: 15, weight: 0 },
          { label: "Documentation", detail: "Reporting", minutes: 10, weight: 0 },
        ],
      },
      {
        name: "David Harris",
        job: "Split AC installation",
        categories: [
          { label: "Active Work", detail: "Tool Use + Diagnostics", minutes: 90, weight: 1.0 },
          { label: "Physical Exertion", detail: "Lifting/Carrying", minutes: 30, weight: 0.8 },
          { label: "Access/Positioning", detail: "Ladder, Overhead", minutes: 15, weight: 0.6 },
          { label: "Transit", detail: "Walking", minutes: 10, weight: 0 },
          { label: "Idle", detail: "Waiting / no activity", minutes: 20, weight: 0 },
          { label: "Documentation", detail: "Reporting", minutes: 10, weight: 0 },
        ],
      },
      {
        name: "James Williams",
        job: "Duct cleaning service",
        categories: [
          { label: "Active Work", detail: "Tool Use + Diagnostics", minutes: 45, weight: 1.0 },
          { label: "Physical Exertion", detail: "Lifting/Carrying", minutes: 10, weight: 0.8 },
          { label: "Access/Positioning", detail: "Ladder, Overhead", minutes: 8, weight: 0.6 },
          { label: "Transit", detail: "Walking", minutes: 12, weight: 0 },
          { label: "Idle", detail: "Waiting / no activity", minutes: 25, weight: 0 },
          { label: "Documentation", detail: "Reporting", minutes: 5, weight: 0 },
        ],
      },
    ],
  },
  {
    slug: "solar",
    tab: "Solar Cleaning",
    name: "Solar Cleaning",
    insight: "Built from cleaning our own panels first — this model comes from real solar operations, not theory.",
    team: [
      {
        name: "Michael Anderson",
        job: "Residential rooftop array cleaning",
        categories: [
          { label: "Active Work", detail: "Brushing/Mopping", minutes: 40, weight: 1.0 },
          { label: "Physical Exertion", detail: "Carrying Water/Equipment + Inspection", minutes: 15, weight: 0.8 },
          { label: "Access/Positioning", detail: "Ladder, Panel-Row Movement", minutes: 12, weight: 0.6 },
          { label: "Transit", detail: "Between Arrays", minutes: 8, weight: 0 },
          { label: "Idle", detail: "Waiting / no activity", minutes: 10, weight: 0 },
          { label: "Documentation", detail: "Before/After Photos", minutes: 5, weight: 0 },
        ],
      },
      {
        name: "Matthew Reynolds",
        job: "Commercial array cleaning",
        categories: [
          { label: "Active Work", detail: "Brushing/Mopping", minutes: 60, weight: 1.0 },
          { label: "Physical Exertion", detail: "Carrying Water/Equipment + Inspection", minutes: 20, weight: 0.8 },
          { label: "Access/Positioning", detail: "Ladder, Panel-Row Movement", minutes: 15, weight: 0.6 },
          { label: "Transit", detail: "Between Arrays", minutes: 10, weight: 0 },
          { label: "Idle", detail: "Waiting / no activity", minutes: 12, weight: 0 },
          { label: "Documentation", detail: "Before/After Photos", minutes: 8, weight: 0 },
        ],
      },
      {
        name: "David Brooks",
        job: "Rooftop panel inspection",
        categories: [
          { label: "Active Work", detail: "Brushing/Mopping", minutes: 30, weight: 1.0 },
          { label: "Physical Exertion", detail: "Carrying Water/Equipment + Inspection", minutes: 8, weight: 0.8 },
          { label: "Access/Positioning", detail: "Ladder, Panel-Row Movement", minutes: 10, weight: 0.6 },
          { label: "Transit", detail: "Between Arrays", minutes: 6, weight: 0 },
          { label: "Idle", detail: "Waiting / no activity", minutes: 8, weight: 0 },
          { label: "Documentation", detail: "Before/After Photos", minutes: 3, weight: 0 },
        ],
      },
      {
        name: "Steven Clark",
        job: "Ground-mount array cleaning",
        categories: [
          { label: "Active Work", detail: "Brushing/Mopping", minutes: 50, weight: 1.0 },
          { label: "Physical Exertion", detail: "Carrying Water/Equipment + Inspection", minutes: 18, weight: 0.8 },
          { label: "Access/Positioning", detail: "Ladder, Panel-Row Movement", minutes: 8, weight: 0.6 },
          { label: "Transit", detail: "Between Arrays", minutes: 12, weight: 0 },
          { label: "Idle", detail: "Waiting / no activity", minutes: 15, weight: 0 },
          { label: "Documentation", detail: "Before/After Photos", minutes: 4, weight: 0 },
        ],
      },
    ],
  },
  {
    slug: "logistics",
    tab: "Delivery & Logistics",
    name: "Delivery & Logistics",
    insight: "Access difficulty varies stop-to-stop — ground floor vs. sixth-floor walk-up are very different jobs.",
    team: [
      {
        name: "William Harris",
        job: "Single apartment delivery stop",
        categories: [
          { label: "Active Work", detail: "Scanning/Sorting/Handling", minutes: 3, weight: 1.0 },
          { label: "Physical Exertion", detail: "Carrying Package", minutes: 2, weight: 0.8 },
          { label: "Access/Positioning", detail: "Stairs/Elevator/Unit Finding", minutes: 4, weight: 0.6 },
          { label: "Walking", detail: "Parking to Door", minutes: 1.5, weight: 0 },
          { label: "Idle", detail: "Waiting for Recipient", minutes: 1, weight: 0 },
          { label: "Documentation", detail: "POD Photo/Signature", minutes: 0.5, weight: 0 },
        ],
      },
      {
        name: "Aaron Bennett",
        job: "Multi-unit apartment delivery",
        categories: [
          { label: "Active Work", detail: "Scanning/Sorting/Handling", minutes: 4, weight: 1.0 },
          { label: "Physical Exertion", detail: "Carrying Package", minutes: 2.5, weight: 0.8 },
          { label: "Access/Positioning", detail: "Stairs/Elevator/Unit Finding", minutes: 6, weight: 0.6 },
          { label: "Walking", detail: "Parking to Door", minutes: 2, weight: 0 },
          { label: "Idle", detail: "Waiting for Recipient", minutes: 1.5, weight: 0 },
          { label: "Documentation", detail: "POD Photo/Signature", minutes: 1, weight: 0 },
        ],
      },
      {
        name: "Daniel Foster",
        job: "Ground-floor house delivery",
        categories: [
          { label: "Active Work", detail: "Scanning/Sorting/Handling", minutes: 2, weight: 1.0 },
          { label: "Physical Exertion", detail: "Carrying Package", minutes: 1, weight: 0.8 },
          { label: "Access/Positioning", detail: "Stairs/Elevator/Unit Finding", minutes: 1, weight: 0.6 },
          { label: "Walking", detail: "Parking to Door", minutes: 1, weight: 0 },
          { label: "Idle", detail: "Waiting for Recipient", minutes: 0.5, weight: 0 },
          { label: "Documentation", detail: "POD Photo/Signature", minutes: 0.3, weight: 0 },
        ],
      },
      {
        name: "Brian Foster",
        job: "Sixth-floor walk-up delivery",
        categories: [
          { label: "Active Work", detail: "Scanning/Sorting/Handling", minutes: 3.5, weight: 1.0 },
          { label: "Physical Exertion", detail: "Carrying Package", minutes: 3, weight: 0.8 },
          { label: "Access/Positioning", detail: "Stairs/Elevator/Unit Finding", minutes: 8, weight: 0.6 },
          { label: "Walking", detail: "Parking to Door", minutes: 2, weight: 0 },
          { label: "Idle", detail: "Waiting for Recipient", minutes: 1, weight: 0 },
          { label: "Documentation", detail: "POD Photo/Signature", minutes: 0.5, weight: 0 },
        ],
      },
    ],
  },
  {
    slug: "hospitality",
    tab: "Hospitality Cleaning",
    name: "Hospitality Cleaning",
    insight: "Small, broken-up spaces mean more movement per square foot than any other vertical.",
    team: [
      {
        name: "Thomas Reed",
        job: "Standard hotel room turnover",
        categories: [
          { label: "Active Work", detail: "Wiping/Vacuuming/Bed-Making", minutes: 14, weight: 1.0 },
          { label: "Physical Exertion", detail: "Carrying Linens/Restocking", minutes: 3, weight: 0.8 },
          { label: "Access/Positioning", detail: "Room-to-Room, Cart Trips", minutes: 3, weight: 0.6 },
          { label: "Walking", detail: "Within Room", minutes: 2, weight: 0 },
          { label: "Idle", detail: "Waiting on Supplies", minutes: 2, weight: 0 },
          { label: "Documentation", detail: "Room Status Update", minutes: 1, weight: 0 },
        ],
      },
      {
        name: "Andrew Collins",
        job: "Deep-clean suite turnover",
        categories: [
          { label: "Active Work", detail: "Wiping/Vacuuming/Bed-Making", minutes: 20, weight: 1.0 },
          { label: "Physical Exertion", detail: "Carrying Linens/Restocking", minutes: 5, weight: 0.8 },
          { label: "Access/Positioning", detail: "Room-to-Room, Cart Trips", minutes: 4, weight: 0.6 },
          { label: "Walking", detail: "Within Room", minutes: 3, weight: 0 },
          { label: "Idle", detail: "Waiting on Supplies", minutes: 3, weight: 0 },
          { label: "Documentation", detail: "Room Status Update", minutes: 1.5, weight: 0 },
        ],
      },
      {
        name: "Christopher Hayes",
        job: "Quick refresh (stay-over)",
        categories: [
          { label: "Active Work", detail: "Wiping/Vacuuming/Bed-Making", minutes: 8, weight: 1.0 },
          { label: "Physical Exertion", detail: "Carrying Linens/Restocking", minutes: 1.5, weight: 0.8 },
          { label: "Access/Positioning", detail: "Room-to-Room, Cart Trips", minutes: 1.5, weight: 0.6 },
          { label: "Walking", detail: "Within Room", minutes: 1, weight: 0 },
          { label: "Idle", detail: "Waiting on Supplies", minutes: 1, weight: 0 },
          { label: "Documentation", detail: "Room Status Update", minutes: 0.5, weight: 0 },
        ],
      },
      {
        name: "Patrick Hughes",
        job: "Standard room turnover",
        categories: [
          { label: "Active Work", detail: "Wiping/Vacuuming/Bed-Making", minutes: 13, weight: 1.0 },
          { label: "Physical Exertion", detail: "Carrying Linens/Restocking", minutes: 2.5, weight: 0.8 },
          { label: "Access/Positioning", detail: "Room-to-Room, Cart Trips", minutes: 2.5, weight: 0.6 },
          { label: "Walking", detail: "Within Room", minutes: 2, weight: 0 },
          { label: "Idle", detail: "Waiting on Supplies", minutes: 2.5, weight: 0 },
          { label: "Documentation", detail: "Room Status Update", minutes: 1, weight: 0 },
        ],
      },
    ],
  },
  {
    slug: "landscaping",
    tab: "Landscaping",
    name: "Landscaping",
    insight: "Properties are spread across zones — setup and access overhead is naturally higher here than in a single-unit job.",
    team: [
      {
        name: "Mark Coleman",
        job: "Residential yard maintenance",
        categories: [
          { label: "Active Work", detail: "Mowing/Trimming/Edging/Weeding", minutes: 32, weight: 1.0 },
          { label: "Physical Exertion", detail: "Carrying Mulch/Debris", minutes: 8, weight: 0.8 },
          { label: "Access/Positioning", detail: "Equipment Unload, Terrain/Gates", minutes: 6, weight: 0.6 },
          { label: "Walking", detail: "Between Zones", minutes: 5, weight: 0 },
          { label: "Idle", detail: "Equipment Issue/Refueling", minutes: 6, weight: 0 },
          { label: "Documentation", detail: "Before/After Photos", minutes: 3, weight: 0 },
        ],
      },
      {
        name: "Gary Simmons",
        job: "Commercial grounds mowing route",
        categories: [
          { label: "Active Work", detail: "Mowing/Trimming/Edging/Weeding", minutes: 50, weight: 1.0 },
          { label: "Physical Exertion", detail: "Carrying Mulch/Debris", minutes: 14, weight: 0.8 },
          { label: "Access/Positioning", detail: "Equipment Unload, Terrain/Gates", minutes: 10, weight: 0.6 },
          { label: "Walking", detail: "Between Zones", minutes: 8, weight: 0 },
          { label: "Idle", detail: "Equipment Issue/Refueling", minutes: 8, weight: 0 },
          { label: "Documentation", detail: "Before/After Photos", minutes: 4, weight: 0 },
        ],
      },
      {
        name: "Kevin O'Brien",
        job: "Small residential yard trim",
        categories: [
          { label: "Active Work", detail: "Mowing/Trimming/Edging/Weeding", minutes: 20, weight: 1.0 },
          { label: "Physical Exertion", detail: "Carrying Mulch/Debris", minutes: 4, weight: 0.8 },
          { label: "Access/Positioning", detail: "Equipment Unload, Terrain/Gates", minutes: 3, weight: 0.6 },
          { label: "Walking", detail: "Between Zones", minutes: 3, weight: 0 },
          { label: "Idle", detail: "Equipment Issue/Refueling", minutes: 4, weight: 0 },
          { label: "Documentation", detail: "Before/After Photos", minutes: 2, weight: 0 },
        ],
      },
      {
        name: "Eric Ramsey",
        job: "Irrigation + weekly route",
        categories: [
          { label: "Active Work", detail: "Mowing/Trimming/Edging/Weeding", minutes: 40, weight: 1.0 },
          { label: "Physical Exertion", detail: "Carrying Mulch/Debris", minutes: 10, weight: 0.8 },
          { label: "Access/Positioning", detail: "Equipment Unload, Terrain/Gates", minutes: 8, weight: 0.6 },
          { label: "Walking", detail: "Between Zones", minutes: 6, weight: 0 },
          { label: "Idle", detail: "Equipment Issue/Refueling", minutes: 10, weight: 0 },
          { label: "Documentation", detail: "Before/After Photos", minutes: 3, weight: 0 },
        ],
      },
    ],
  },
];

export const jobStages = [
  "Scheduled",
  "Reached Site",
  "Work Started",
  "Work Finished",
  "Completed",
] as const;

export const platformFeatures = [
  {
    icon: "Radio",
    title: "iNOVAA Tracker (IoT)",
    description:
      "Automatic activity tracking, zero check-ins, battery built for full field days.",
    href: "/platform/inovaa-tracker",
    flagship: true,
  },
  {
    icon: "LayoutDashboard",
    title: "Field Ops Dashboard",
    description:
      "The software the Tracker's data feeds into — a live, GPS-tagged view of every job stage across every crew and site, solar to landscaping.",
    href: "/platform/field-ops-dashboard",
  },
  {
    icon: "Users",
    title: "Customer Portal",
    description:
      "Clients watch their own jobs move — technician ETA, before/after photos, signed reports — without calling to ask.",
    href: "/platform/customer-portal",
  },
  {
    icon: "Building2",
    title: "Multi-Tenant & Custom Branding",
    description:
      "Tenant-isolated data with your own branding on top, so every client company gets a portal that feels like theirs.",
    href: "/platform/multi-tenant",
  },
];

export const roleViews = [
  {
    id: "leadership",
    label: "Leadership",
    role: "Owner / Executive",
    summary: "Portfolio-wide revenue, crew utilization, and overdue jobs in one glance.",
    insight: "Crew utilization is up 12% this month; 3 jobs are overdue across the Phoenix territory.",
    records: [
      { name: "Sunridge Solar Array", owner: "M. Ortega", status: "Cleared", detail: "$18,400 · 4.2 MW" },
      { name: "Desert Bloom HVAC Contract", owner: "K. Reyes", status: "At risk", detail: "$6,200 · Renewal in 9 days" },
      { name: "Copperline Logistics Route 12", owner: "T. Nwosu", status: "Blocked", detail: "$2,100 · Awaiting parts" },
      { name: "Palo Verde Hotel Turnover", owner: "S. Malik", status: "Cleared", detail: "$980 · 32 rooms" },
    ],
  },
  {
    id: "dispatch",
    label: "Dispatch / Ops",
    role: "Operations Coordinator",
    summary: "Schedules, crew assignments, and live job-stage tracking for the day's routes.",
    insight: "2 crews are within 15 minutes of their next stop; 1 job is unassigned for tomorrow.",
    records: [
      { name: "Crew A — J. Alvarez", owner: "Sunridge Solar Array", status: "Scheduled", detail: "Reached Site · 8:42 AM" },
      { name: "Crew B — D. Whitfield", owner: "Meridian HVAC Retrofit", status: "At risk", detail: "Work Started · running 40 min late" },
      { name: "Crew C — R. Castillo", owner: "Route 12 — Last Mile", status: "Cleared", detail: "Completed · 9:58 AM" },
      { name: "Crew D — unassigned", owner: "Canyon Ridge Landscaping", status: "Blocked", detail: "Needs assignment by 2:00 PM" },
    ],
  },
  {
    id: "field",
    label: "Field Technician",
    role: "Technician",
    summary: "Today's assigned jobs, checklists, photo capture, and the FSR waiting on a signature.",
    insight: "3 jobs remaining today; Canyon Ridge FSR is drafted and waiting on your on-site signature.",
    records: [
      { name: "Canyon Ridge Landscaping — Zone 3", owner: "Mowing + irrigation check", status: "At risk", detail: "Annotation: Sprinkler head needs replacement" },
      { name: "Meridian HVAC Retrofit", owner: "Filter + coil service", status: "Scheduled", detail: "ETA 1:30 PM" },
      { name: "Palo Verde Hotel — Floor 3", owner: "Deep clean turnover", status: "Cleared", detail: "FSR signed · 11:02 AM" },
    ],
  },
  {
    id: "customer",
    label: "Customer",
    role: "Client / Site Owner",
    summary: "Their own site's job history, upcoming visit, and signed reports — nothing else.",
    insight: "Your next visit is tomorrow at 9:00 AM. Last service report was signed 6 days ago.",
    records: [
      { name: "Route 12 — Last Mile", owner: "Next delivery window: Sep 18, 9:00 AM", status: "Scheduled", detail: "Assigned: Crew C" },
      { name: "Q3 Delivery Summary", owner: "Signed by T. Nwosu", status: "Cleared", detail: "Aug 29 · PDF + photos" },
      { name: "Route Exception Follow-up", owner: "Pending reschedule", status: "At risk", detail: "ETA Sep 22" },
    ],
  },
] as const;

export const productDemoScenarios = [
  {
    id: "hvac",
    tab: "HVAC",
    site: "Meridian Office Tower — Rooftop Unit 3",
    detail: "Commercial HVAC · Downtown Phoenix, AZ",
    status: "At risk" as const,
    sites: [
      { name: "Meridian HVAC Retrofit", active: true },
      { name: "Route 12 — Last Mile", active: false },
      { name: "Palo Verde Hotel Turnover", active: false },
      { name: "Sunridge Solar Array", active: false },
      { name: "Canyon Ridge Landscaping", active: false },
    ],
    task: { name: "Filter + coil service", by: "D. Whitfield", timestamp: "9:14 AM" },
    annotation: "Compressor pressure reading below spec on Unit 3 — recommend part replacement.",
    question: "Which technician is closest to Meridian and carries the replacement part?",
    answer:
      "D. Whitfield is 4.0 mi out with the part in truck stock. ETA moved up to 2:15 PM.",
    citations: [
      { icon: "FileText", label: "Work order — Meridian HVAC Retrofit" },
      { icon: "MapPinned", label: "GPS ping — D. Whitfield, 4.0 mi out" },
      { icon: "PackageCheck", label: "Parts inventory — compressor part in stock" },
    ],
    approver: "K. Reyes",
  },
  {
    id: "logistics",
    tab: "Delivery",
    site: "Route 12 — Last-Mile Delivery",
    detail: "Copperline District · 48 stops",
    status: "Blocked" as const,
    sites: [
      { name: "Route 12 — Last Mile", active: true },
      { name: "Meridian HVAC Retrofit", active: false },
      { name: "Palo Verde Hotel Turnover", active: false },
      { name: "Sunridge Solar Array", active: false },
      { name: "Canyon Ridge Landscaping", active: false },
    ],
    task: { name: "Stop 14 delivery attempt", by: "R. Castillo", timestamp: "1:52 PM" },
    annotation: "Delivery exception at Stop 14 — recipient not available.",
    question: "Can Crew C reroute to finish Route 12 before the depot cutoff?",
    answer: "Crew C has 6 stops left and the 5:00 PM cutoff is 20 minutes away — on pace to finish by 4:40 PM.",
    citations: [
      { icon: "FileText", label: "Delivery manifest — Route 12" },
      { icon: "MapPinned", label: "GPS ping — Crew C, 2.4 mi from Stop 14" },
      { icon: "Clock", label: "Depot cutoff schedule — 5:00 PM" },
    ],
    approver: "T. Nwosu",
  },
  {
    id: "hospitality",
    tab: "Hospitality",
    site: "Palo Verde Hotel — Floor 3 Turnover",
    detail: "Hotel Housekeeping · 20 rooms",
    status: "At risk" as const,
    sites: [
      { name: "Palo Verde Hotel Turnover", active: true },
      { name: "Meridian HVAC Retrofit", active: false },
      { name: "Route 12 — Last Mile", active: false },
      { name: "Sunridge Solar Array", active: false },
      { name: "Canyon Ridge Landscaping", active: false },
    ],
    task: { name: "Deep clean turnover", by: "S. Malik", timestamp: "11:02 AM" },
    annotation: "Room 312 needs a maintenance flag before the next check-in.",
    question: "Is Floor 3 turnover on pace for the 3:00 PM check-in window?",
    answer: "18 of 20 rooms are cleared; Room 312 is flagged for maintenance with a fix ETA of 2:30 PM.",
    citations: [
      { icon: "FileText", label: "Housekeeping checklist — Floor 3" },
      { icon: "MapPinned", label: "Maintenance ticket — Room 312" },
      { icon: "Clock", label: "Check-in schedule — 3:00 PM" },
    ],
    approver: "S. Malik",
  },
  {
    id: "solar",
    tab: "Solar",
    site: "Sunridge Solar Array",
    detail: "4.2 MW · Maricopa County, AZ",
    status: "At risk" as const,
    sites: [
      { name: "Sunridge Solar Array", active: true },
      { name: "Meridian HVAC Retrofit", active: false },
      { name: "Route 12 — Last Mile", active: false },
      { name: "Palo Verde Hotel Turnover", active: false },
      { name: "Canyon Ridge Landscaping", active: false },
    ],
    task: { name: "Reached Panels · Row 4", by: "J. Alvarez", timestamp: "8:57 AM" },
    annotation: "Low PR on Panel Row 4 — recommend inspection before storm.",
    question: "Which crew is closest to Sunridge and can they get there before the storm rolls in?",
    answer:
      "Crew A is 6.1 mi out and already routed toward Sunridge. The storm advisory gives a 60-minute window — moving their ETA up to 11:05 AM keeps them ahead of it.",
    citations: [
      { icon: "FileText", label: "Job schedule — Sunridge Solar Array" },
      { icon: "MapPinned", label: "GPS ping — Crew A, 6.1 mi out" },
      { icon: "CloudRain", label: "NWS storm advisory — Maricopa County" },
    ],
    approver: "K. Reyes",
  },
  {
    id: "landscaping",
    tab: "Landscaping",
    site: "Canyon Ridge Business Park — Weekly Route",
    detail: "Commercial Landscaping · 6 zones",
    status: "Scheduled" as const,
    sites: [
      { name: "Canyon Ridge Landscaping", active: true },
      { name: "Meridian HVAC Retrofit", active: false },
      { name: "Route 12 — Last Mile", active: false },
      { name: "Palo Verde Hotel Turnover", active: false },
      { name: "Sunridge Solar Array", active: false },
    ],
    task: { name: "Zone 4 irrigation check", by: "Crew D", timestamp: "10:20 AM" },
    annotation: "Irrigation Zone 4 not running — needs inspection before the walkthrough.",
    question: "Can the crew fix Zone 4 irrigation before the scheduled walkthrough?",
    answer: "Crew D is on-site now; an irrigation tech is 45 minutes out and the walkthrough isn't until 3:00 PM.",
    citations: [
      { icon: "FileText", label: "Route checklist — Canyon Ridge, Zone 4" },
      { icon: "MapPinned", label: "Irrigation sensor log — Zone 4 offline" },
      { icon: "Clock", label: "Walkthrough schedule — 3:00 PM" },
    ],
    approver: "M. Ortega",
  },
] as const;

export const pricingTiers = [
  {
    name: "Starter",
    price: "$300",
    period: "/mo",
    description: "Single-site teams getting off spreadsheets and paper FSRs.",
    features: ["Up to 5 technicians", "Live job dashboard", "Digital FSR + signatures", "Email support"],
  },
  {
    name: "Professional",
    price: "$999",
    period: "/mo",
    description: "Growing crews that need multi-site scheduling and customer portals.",
    features: ["Up to 40 technicians", "Customer portal", "iNOVAA Tracker (IoT) — 10 units", "Priority support"],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "$5,000–$10,000",
    period: "/mo",
    description: "Multi-tenant operators and franchises running custom-branded portals.",
    features: ["Unlimited technicians", "Custom-branded multi-tenant", "Dedicated success manager", "Custom integrations"],
  },
];

export const walkthroughSteps = [
  {
    label: "What it read",
    detail: "The delivery manifest for Route 12, a live GPS ping from Crew C, and the depot's 5:00 PM cutoff schedule.",
  },
  {
    label: "What follows",
    detail: "Crew C has 6 stops remaining and is on pace to finish 20 minutes ahead of the depot cutoff.",
  },
  {
    label: "The message it prepared",
    detail: "A drafted SMS to the customer at Stop 14: a new delivery window after an earlier missed attempt.",
  },
  {
    label: "Where it stops",
    detail: "It does not send the SMS or reroute the crew — both wait on the dispatcher's sign-off before anything goes out.",
  },
  {
    label: "Audit log",
    detail: "Every read, every suggested action, and the final decision are timestamped and attached to the job record.",
  },
];

export const auditLog = [
  { n: 1, time: "10:41:02", text: "Read delivery manifest — Route 12, Crew C" },
  { n: 2, time: "10:41:04", text: "Read GPS ping — Crew C, 2.4 mi from Stop 14" },
  { n: 3, time: "10:41:06", text: "Read depot cutoff schedule — Copperline District, 5:00 PM" },
  { n: 4, time: "10:41:11", text: "Drafted customer SMS — new delivery window 3:40–4:00 PM" },
  { n: 5, time: "10:42:30", text: "Approved by T. Nwosu (Dispatcher) — SMS sent" },
];

export const featureRows = [
  {
    question: "Where is every job, right now?",
    description:
      "One live map and timeline across every crew, every site, every stage — no group texts, no guessing.",
    subcards: [
      { title: "Stage-by-stage tracking", text: "Scheduled through Completed, timestamped automatically." },
      { title: "GPS-tagged events", text: "Every status change carries a location and a technician." },
      { title: "Site diagrams", text: "Pin-drop annotations on equipment, units, and site zones." },
    ],
  },
  {
    question: "Can you prove the work happened?",
    description:
      "Before/after photos, on-site annotations, and a digital FSR signature close every job with evidence attached.",
    subcards: [
      { title: "Before/after capture", text: "Photo evidence attached directly to the job record." },
      { title: "On-site annotations", text: "\"Needs repair,\" \"Access blocked\" — tagged in the moment." },
      { title: "Digital FSR signatures", text: "Signed on-site, synced the second signal returns." },
    ],
  },
  {
    question: "What happens with no signal?",
    description:
      "Field crews keep working at sites with poor connectivity — jobs sync automatically the moment a signal returns.",
    subcards: [
      { title: "Offline-first sync", text: "Every action queues locally and syncs without a second thought." },
      { title: "Automatic activity tracking", text: "iNOVAA Tracker logs activity with no manual check-in." },
      { title: "Conflict-free updates", text: "Multiple crews on one site never overwrite each other's work." },
    ],
  },
];

export const trustCallouts = [
  { title: "Tenant-isolated data", text: "Every client company's data is walled off, even on shared infrastructure." },
  { title: "Role-based portals", text: "Admin, Team, Customer, and Partner each see only what's theirs." },
  { title: "Custom branding", text: "Your logo, your colors, your domain — iNOVAA underneath." },
  { title: "Audit trail on everything", text: "Every read, draft, and approval is timestamped and attached." },
];

export const companyStats = [
  { label: "Founded", value: "2022" },
  { label: "Origin", value: "Solar maintenance" },
  { label: "Industries served", value: "5" },
  { label: "Tenants supported", value: "40+" },
];
