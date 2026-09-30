import type { Status } from "@/components/ui/StatusPill";

export type PortalTeamMember = {
  name: string;
  role: string;
  status: "On Site" | "In Route" | "Off Duty";
  avatar: number;
};

export type ScheduleJob = {
  site: string;
  time: string;
  assignee: string;
  status: Status;
};

export type JobHistoryEntry = {
  site: string;
  worker: string;
  date: string;
  stages: { label: string; time: string }[];
};

export type AttendanceRow = {
  name: string;
  avatar: number;
  timeIn: string;
  timeOut: string;
  totalTime: string;
};

// Fixed "today" reference (3:00 PM) used to turn a still-clocked-in row's
// "In progress" total into minutes — keeps the number stable across
// server and client renders instead of depending on the viewer's clock.
const DEMO_NOW_MINUTES = 15 * 60;

function parseClockMinutes(time: string): number | null {
  const match = time.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return null;
  const hours = parseInt(match[1], 10) % 12;
  const minutes = parseInt(match[2], 10);
  return (match[3].toUpperCase() === "PM" ? hours + 12 : hours) * 60 + minutes;
}

function attendanceRowMinutes(row: AttendanceRow): number {
  const match = row.totalTime.match(/(\d+)h(?:\s*(\d+)m)?/);
  if (match) {
    const hours = parseInt(match[1], 10);
    const minutes = match[2] ? parseInt(match[2], 10) : 0;
    return hours * 60 + minutes;
  }
  const start = parseClockMinutes(row.timeIn);
  return start === null ? 0 : Math.max(0, DEMO_NOW_MINUTES - start);
}

// Same source the Attendance tab renders from, so "Total work hours" on
// Overview always matches what the Attendance table adds up to.
export function totalAttendanceMinutes(rows: AttendanceRow[]): number {
  return rows.reduce((sum, r) => sum + attendanceRowMinutes(r), 0);
}

export type EHSChecklistItem = { item: string; completed: boolean };
export type EHSPPERow = { name: string; avatar: number; status: "Compliant" | "Non-Compliant" };
export type EHSIncident = { date: string; type: "Incident" | "Near Miss"; description: string; status: "Resolved" | "Open" };
export type EHSHazard = { date: string; site: string; description: string; severity: "Low" | "Medium" | "High"; status: "Resolved" | "Open" };

export type IndustryPortalData = {
  team: PortalTeamMember[];
  attendanceRate: number;
  schedule: ScheduleJob[];
  jobHistory: JobHistoryEntry[];
  attendance: AttendanceRow[];
  ehs: {
    checklist: EHSChecklistItem[];
    ppe: EHSPPERow[];
    incidents: EHSIncident[];
    hazards: EHSHazard[];
  };
};

// The five standard job stages with their timestamps — keeps the newer industry entries compact.
function stages(arrival: string, reached: string, started: string, completed: string, exit: string) {
  return [
    { label: "Site Arrival", time: arrival },
    { label: "Work Area Reached", time: reached },
    { label: "Work Started", time: started },
    { label: "Work Completed", time: completed },
    { label: "Site Exit", time: exit },
  ];
}

export const portalData: Record<string, IndustryPortalData> = {
  hvac: {
    team: [
      { name: "David Harris", role: "Site Supervisor", status: "In Route", avatar: 56 },
      { name: "John Doe", role: "Lead HVAC Technician", status: "On Site", avatar: 11 },
      { name: "Robert Turner", role: "Field Technician", status: "On Site", avatar: 12 },
      { name: "James Williams", role: "HVAC Technician", status: "Off Duty", avatar: 14 },
    ],
    attendanceRate: 96,
    schedule: [
      { site: "Maple Ridge Business Park", time: "8:00 AM", assignee: "John Doe", status: "In Progress" },
      { site: "Lincoln Heights Office Tower", time: "10:30 AM", assignee: "Robert Turner", status: "Scheduled" },
      { site: "Crestview Corporate Campus", time: "1:00 PM", assignee: "James Williams", status: "Scheduled" },
      { site: "Fairview Medical Center", time: "3:30 PM", assignee: "David Harris", status: "At risk" },
    ],
    jobHistory: [
      {
        site: "Maple Ridge Business Park",
        worker: "John Doe",
        date: "Today",
        stages: [
          { label: "Site Arrival", time: "8:02 AM" },
          { label: "Work Area Reached", time: "8:10 AM" },
          { label: "Work Started", time: "8:15 AM" },
          { label: "Work Completed", time: "10:40 AM" },
          { label: "Site Exit", time: "10:48 AM" },
        ],
      },
      {
        site: "Lincoln Heights Office Tower",
        worker: "Robert Turner",
        date: "Today",
        stages: [
          { label: "Site Arrival", time: "10:32 AM" },
          { label: "Work Area Reached", time: "10:38 AM" },
          { label: "Work Started", time: "10:45 AM" },
          { label: "Work Completed", time: "12:20 PM" },
          { label: "Site Exit", time: "12:26 PM" },
        ],
      },
    ],
    attendance: [
      { name: "John Doe", avatar: 11, timeIn: "7:58 AM", timeOut: "4:32 PM", totalTime: "8h 34m" },
      { name: "Robert Turner", avatar: 12, timeIn: "8:05 AM", timeOut: "4:15 PM", totalTime: "8h 10m" },
      { name: "David Harris", avatar: 56, timeIn: "8:12 AM", timeOut: "—", totalTime: "In progress" },
      { name: "James Williams", avatar: 14, timeIn: "6:45 AM", timeOut: "3:00 PM", totalTime: "8h 15m" },
    ],
    ehs: {
      checklist: [
        { item: "Pre-job safety briefing completed", completed: true },
        { item: "PPE inspection passed", completed: true },
        { item: "Site hazard walkthrough", completed: true },
        { item: "Ladder & fall-protection check", completed: false },
      ],
      ppe: [
        { name: "John Doe", avatar: 11, status: "Compliant" },
        { name: "Robert Turner", avatar: 12, status: "Compliant" },
        { name: "David Harris", avatar: 56, status: "Compliant" },
        { name: "James Williams", avatar: 14, status: "Non-Compliant" },
      ],
      incidents: [
        { date: "Today", type: "Near Miss", description: "Loose panel cover on rooftop unit flagged before contact.", status: "Resolved" },
        { date: "3 days ago", type: "Incident", description: "Minor cut during coil service, first aid administered.", status: "Resolved" },
      ],
      hazards: [
        { date: "Yesterday", site: "Maple Ridge Business Park", description: "Exposed wiring near rooftop access panel.", severity: "Medium", status: "Resolved" },
        { date: "Today", site: "Crestview Corporate Campus", description: "Wet flooring near unit entrance.", severity: "Low", status: "Open" },
      ],
    },
  },
  solar: {
    team: [
      { name: "Michael Anderson", role: "Lead Solar Technician", status: "On Site", avatar: 68 },
      { name: "David Brooks", role: "Site Supervisor", status: "In Route", avatar: 53 },
      { name: "Steven Clark", role: "Solar Technician", status: "Off Duty", avatar: 58 },
      { name: "Matthew Reynolds", role: "Field Technician", status: "On Site", avatar: 57 },
    ],
    attendanceRate: 94,
    schedule: [
      { site: "Sunnyvale Commercial Rooftop", time: "7:30 AM", assignee: "Michael Anderson", status: "In Progress" },
      { site: "Westfield Solar Array", time: "9:45 AM", assignee: "Matthew Reynolds", status: "Scheduled" },
      { site: "Brookstone Industrial Park", time: "12:15 PM", assignee: "Steven Clark", status: "Scheduled" },
      { site: "Hillcrest Distribution Center", time: "2:30 PM", assignee: "David Brooks", status: "At risk" },
    ],
    jobHistory: [
      {
        site: "Sunnyvale Commercial Rooftop",
        worker: "Michael Anderson",
        date: "Today",
        stages: [
          { label: "Site Arrival", time: "7:32 AM" },
          { label: "Work Area Reached", time: "7:40 AM" },
          { label: "Work Started", time: "7:45 AM" },
          { label: "Work Completed", time: "9:15 AM" },
          { label: "Site Exit", time: "9:22 AM" },
        ],
      },
      {
        site: "Westfield Solar Array",
        worker: "Matthew Reynolds",
        date: "Today",
        stages: [
          { label: "Site Arrival", time: "9:48 AM" },
          { label: "Work Area Reached", time: "9:55 AM" },
          { label: "Work Started", time: "10:00 AM" },
          { label: "Work Completed", time: "11:20 AM" },
          { label: "Site Exit", time: "11:28 AM" },
        ],
      },
    ],
    attendance: [
      { name: "Michael Anderson", avatar: 68, timeIn: "7:25 AM", timeOut: "4:00 PM", totalTime: "8h 35m" },
      { name: "Matthew Reynolds", avatar: 57, timeIn: "7:40 AM", timeOut: "3:50 PM", totalTime: "8h 10m" },
      { name: "David Brooks", avatar: 53, timeIn: "8:00 AM", timeOut: "—", totalTime: "In progress" },
      { name: "Steven Clark", avatar: 58, timeIn: "6:50 AM", timeOut: "2:45 PM", totalTime: "7h 55m" },
    ],
    ehs: {
      checklist: [
        { item: "Pre-job safety briefing completed", completed: true },
        { item: "PPE inspection passed", completed: true },
        { item: "Roof access hazard check", completed: true },
        { item: "Fall-protection harness check", completed: false },
      ],
      ppe: [
        { name: "Michael Anderson", avatar: 68, status: "Compliant" },
        { name: "Matthew Reynolds", avatar: 57, status: "Compliant" },
        { name: "David Brooks", avatar: 53, status: "Compliant" },
        { name: "Steven Clark", avatar: 58, status: "Non-Compliant" },
      ],
      incidents: [
        { date: "Today", type: "Near Miss", description: "Slippery panel surface after cleaning flagged before next technician stepped on.", status: "Resolved" },
        { date: "Yesterday", type: "Incident", description: "Minor heat exhaustion, technician rested and rehydrated.", status: "Resolved" },
      ],
      hazards: [
        { date: "Yesterday", site: "Westfield Solar Array", description: "Unsecured extension cord across walkway.", severity: "Medium", status: "Resolved" },
        { date: "Today", site: "Brookstone Industrial Park", description: "Glare hazard near array edge.", severity: "Low", status: "Open" },
      ],
    },
  },
  logistics: {
    team: [
      { name: "Brian Foster", role: "Delivery Associate", status: "Off Duty", avatar: 60 },
      { name: "William Harris", role: "Lead Driver", status: "On Site", avatar: 54 },
      { name: "Aaron Bennett", role: "Route Technician", status: "On Site", avatar: 59 },
      { name: "Daniel Foster", role: "Dispatch Supervisor", status: "In Route", avatar: 13 },
    ],
    attendanceRate: 91,
    schedule: [
      { site: "Crestview Logistics Hub", time: "6:00 AM", assignee: "William Harris", status: "In Progress" },
      { site: "Harborview Distribution Center", time: "9:00 AM", assignee: "Aaron Bennett", status: "Scheduled" },
      { site: "Fairview Delivery Depot", time: "11:30 AM", assignee: "Brian Foster", status: "Scheduled" },
      { site: "Northgate Retail Park", time: "1:45 PM", assignee: "Daniel Foster", status: "At risk" },
    ],
    jobHistory: [
      {
        site: "Crestview Logistics Hub",
        worker: "William Harris",
        date: "Today",
        stages: [
          { label: "Site Arrival", time: "6:02 AM" },
          { label: "Work Area Reached", time: "6:05 AM" },
          { label: "Work Started", time: "6:08 AM" },
          { label: "Work Completed", time: "6:20 AM" },
          { label: "Site Exit", time: "6:22 AM" },
        ],
      },
      {
        site: "Harborview Distribution Center",
        worker: "Aaron Bennett",
        date: "Today",
        stages: [
          { label: "Site Arrival", time: "9:02 AM" },
          { label: "Work Area Reached", time: "9:06 AM" },
          { label: "Work Started", time: "9:10 AM" },
          { label: "Work Completed", time: "9:24 AM" },
          { label: "Site Exit", time: "9:26 AM" },
        ],
      },
    ],
    attendance: [
      { name: "William Harris", avatar: 54, timeIn: "5:50 AM", timeOut: "2:10 PM", totalTime: "8h 20m" },
      { name: "Aaron Bennett", avatar: 59, timeIn: "6:10 AM", timeOut: "2:30 PM", totalTime: "8h 20m" },
      { name: "Daniel Foster", avatar: 13, timeIn: "7:00 AM", timeOut: "—", totalTime: "In progress" },
      { name: "Brian Foster", avatar: 60, timeIn: "5:45 AM", timeOut: "1:50 PM", totalTime: "8h 5m" },
    ],
    ehs: {
      checklist: [
        { item: "Pre-route vehicle inspection", completed: true },
        { item: "PPE (gloves/vest) check", completed: true },
        { item: "Load securement check", completed: true },
        { item: "Backing/parking hazard briefing", completed: false },
      ],
      ppe: [
        { name: "William Harris", avatar: 54, status: "Compliant" },
        { name: "Aaron Bennett", avatar: 59, status: "Compliant" },
        { name: "Daniel Foster", avatar: 13, status: "Compliant" },
        { name: "Brian Foster", avatar: 60, status: "Non-Compliant" },
      ],
      incidents: [
        { date: "Today", type: "Near Miss", description: "Reversing vehicle nearly struck a bollard, spotter used immediately after.", status: "Resolved" },
        { date: "2 days ago", type: "Incident", description: "Minor ankle strain exiting delivery van, reported and logged.", status: "Resolved" },
      ],
      hazards: [
        { date: "Yesterday", site: "Harborview Distribution Center", description: "Blocked emergency exit near loading dock.", severity: "Medium", status: "Resolved" },
        { date: "Today", site: "Northgate Retail Park", description: "Uneven pavement at drop-off zone.", severity: "Low", status: "Open" },
      ],
    },
  },
  hospitality: {
    team: [
      { name: "Patrick Hughes", role: "Room Attendant", status: "Off Duty", avatar: 63 },
      { name: "Thomas Reed", role: "Housekeeping Lead", status: "On Site", avatar: 51 },
      { name: "Christopher Hayes", role: "Floor Supervisor", status: "In Route", avatar: 18 },
      { name: "Andrew Collins", role: "Room Attendant", status: "On Site", avatar: 61 },
    ],
    attendanceRate: 97,
    schedule: [
      { site: "The Ashford Hotel", time: "9:00 AM", assignee: "Thomas Reed", status: "In Progress" },
      { site: "Lakeside Grand Hotel", time: "10:15 AM", assignee: "Andrew Collins", status: "Scheduled" },
      { site: "Riverside Inn & Suites", time: "11:30 AM", assignee: "Patrick Hughes", status: "Scheduled" },
      { site: "The Ashford Hotel", time: "1:00 PM", assignee: "Christopher Hayes", status: "At risk" },
    ],
    jobHistory: [
      {
        site: "The Ashford Hotel — Room 412",
        worker: "Thomas Reed",
        date: "Today",
        stages: [
          { label: "Site Arrival", time: "9:02 AM" },
          { label: "Work Area Reached", time: "9:04 AM" },
          { label: "Work Started", time: "9:06 AM" },
          { label: "Work Completed", time: "9:28 AM" },
          { label: "Site Exit", time: "9:30 AM" },
        ],
      },
      {
        site: "Lakeside Grand Hotel — Room 208",
        worker: "Andrew Collins",
        date: "Today",
        stages: [
          { label: "Site Arrival", time: "10:18 AM" },
          { label: "Work Area Reached", time: "10:20 AM" },
          { label: "Work Started", time: "10:22 AM" },
          { label: "Work Completed", time: "10:44 AM" },
          { label: "Site Exit", time: "10:46 AM" },
        ],
      },
    ],
    attendance: [
      { name: "Thomas Reed", avatar: 51, timeIn: "8:50 AM", timeOut: "5:00 PM", totalTime: "8h 10m" },
      { name: "Andrew Collins", avatar: 61, timeIn: "9:00 AM", timeOut: "5:10 PM", totalTime: "8h 10m" },
      { name: "Christopher Hayes", avatar: 18, timeIn: "9:15 AM", timeOut: "—", totalTime: "In progress" },
      { name: "Patrick Hughes", avatar: 63, timeIn: "8:45 AM", timeOut: "4:50 PM", totalTime: "8h 5m" },
    ],
    ehs: {
      checklist: [
        { item: "Pre-shift safety briefing", completed: true },
        { item: "PPE (gloves) check", completed: true },
        { item: "Chemical handling checklist", completed: true },
        { item: "Cart & equipment safety check", completed: false },
      ],
      ppe: [
        { name: "Thomas Reed", avatar: 51, status: "Compliant" },
        { name: "Andrew Collins", avatar: 61, status: "Compliant" },
        { name: "Christopher Hayes", avatar: 18, status: "Compliant" },
        { name: "Patrick Hughes", avatar: 63, status: "Non-Compliant" },
      ],
      incidents: [
        { date: "Today", type: "Near Miss", description: "Wet floor sign missing outside Room 412, corrected immediately.", status: "Resolved" },
        { date: "Yesterday", type: "Incident", description: "Minor chemical splash, eyewash station used, no injury.", status: "Resolved" },
      ],
      hazards: [
        { date: "Yesterday", site: "The Ashford Hotel", description: "Frayed carpet edge near elevator lobby.", severity: "Medium", status: "Resolved" },
        { date: "Today", site: "Riverside Inn & Suites", description: "Broken cart wheel, tagged out of service.", severity: "Low", status: "Open" },
      ],
    },
  },
  landscaping: {
    team: [
      { name: "Mark Coleman", role: "Crew Lead", status: "On Site", avatar: 52 },
      { name: "Eric Ramsey", role: "Groundskeeper", status: "Off Duty", avatar: 65 },
      { name: "Kevin O'Brien", role: "Site Supervisor", status: "In Route", avatar: 55 },
      { name: "Gary Simmons", role: "Groundskeeper", status: "On Site", avatar: 64 },
    ],
    attendanceRate: 93,
    schedule: [
      { site: "Fairfield Residence", time: "7:00 AM", assignee: "Mark Coleman", status: "In Progress" },
      { site: "Oakwood Estates", time: "9:30 AM", assignee: "Gary Simmons", status: "Scheduled" },
      { site: "Willow Creek Business Park", time: "12:00 PM", assignee: "Eric Ramsey", status: "Scheduled" },
      { site: "Fairfield Residence", time: "2:15 PM", assignee: "Kevin O'Brien", status: "At risk" },
    ],
    jobHistory: [
      {
        site: "Fairfield Residence",
        worker: "Mark Coleman",
        date: "Today",
        stages: [
          { label: "Site Arrival", time: "7:03 AM" },
          { label: "Work Area Reached", time: "7:08 AM" },
          { label: "Work Started", time: "7:12 AM" },
          { label: "Work Completed", time: "8:10 AM" },
          { label: "Site Exit", time: "8:15 AM" },
        ],
      },
      {
        site: "Oakwood Estates",
        worker: "Gary Simmons",
        date: "Today",
        stages: [
          { label: "Site Arrival", time: "9:33 AM" },
          { label: "Work Area Reached", time: "9:38 AM" },
          { label: "Work Started", time: "9:42 AM" },
          { label: "Work Completed", time: "10:30 AM" },
          { label: "Site Exit", time: "10:36 AM" },
        ],
      },
    ],
    attendance: [
      { name: "Mark Coleman", avatar: 52, timeIn: "6:55 AM", timeOut: "3:20 PM", totalTime: "8h 25m" },
      { name: "Gary Simmons", avatar: 64, timeIn: "7:10 AM", timeOut: "3:30 PM", totalTime: "8h 20m" },
      { name: "Kevin O'Brien", avatar: 55, timeIn: "8:00 AM", timeOut: "—", totalTime: "In progress" },
      { name: "Eric Ramsey", avatar: 65, timeIn: "6:45 AM", timeOut: "2:50 PM", totalTime: "8h 5m" },
    ],
    ehs: {
      checklist: [
        { item: "Pre-job equipment inspection", completed: true },
        { item: "PPE (eye/ear protection) check", completed: true },
        { item: "Terrain hazard walkthrough", completed: true },
        { item: "Fuel handling safety check", completed: false },
      ],
      ppe: [
        { name: "Mark Coleman", avatar: 52, status: "Compliant" },
        { name: "Gary Simmons", avatar: 64, status: "Compliant" },
        { name: "Kevin O'Brien", avatar: 55, status: "Compliant" },
        { name: "Eric Ramsey", avatar: 65, status: "Non-Compliant" },
      ],
      incidents: [
        { date: "Today", type: "Near Miss", description: "Mower blade guard loose, flagged before use.", status: "Resolved" },
        { date: "2 days ago", type: "Incident", description: "Minor scrape from branch debris, first aid applied.", status: "Resolved" },
      ],
      hazards: [
        { date: "Yesterday", site: "Oakwood Estates", description: "Irrigation trench left uncovered near walkway.", severity: "Medium", status: "Resolved" },
        { date: "Today", site: "Willow Creek Business Park", description: "Low-hanging branch near equipment path.", severity: "Low", status: "Open" },
      ],
    },
  },
  "facility-services": {
    team: [
      { name: "Paul Mitchell", role: "Site Supervisor", status: "In Route", avatar: 53 },
      { name: "Brian Foster", role: "Cleaning Lead", status: "On Site", avatar: 13 },
      { name: "Tony Ramirez", role: "Maintenance Technician", status: "On Site", avatar: 18 },
      { name: "Steven Clark", role: "Security Officer", status: "Off Duty", avatar: 51 },
    ],
    attendanceRate: 95,
    schedule: [
      { site: "Harborview Office Tower", time: "6:00 AM", assignee: "Brian Foster", status: "In Progress" },
      { site: "Northgate Medical Plaza", time: "9:00 AM", assignee: "Tony Ramirez", status: "Scheduled" },
      { site: "Riverside Retail Center", time: "12:30 PM", assignee: "Paul Mitchell", status: "Scheduled" },
      { site: "Summit Tech Campus", time: "6:00 PM", assignee: "Steven Clark", status: "At risk" },
    ],
    jobHistory: [
      { site: "Harborview Office Tower", worker: "Brian Foster", date: "Today", stages: stages("5:56 AM", "6:04 AM", "6:08 AM", "8:40 AM", "8:47 AM") },
      { site: "Northgate Medical Plaza", worker: "Tony Ramirez", date: "Today", stages: stages("9:02 AM", "9:09 AM", "9:14 AM", "10:35 AM", "10:41 AM") },
    ],
    attendance: [
      { name: "Brian Foster", avatar: 13, timeIn: "5:50 AM", timeOut: "2:10 PM", totalTime: "8h 20m" },
      { name: "Tony Ramirez", avatar: 18, timeIn: "8:45 AM", timeOut: "5:00 PM", totalTime: "8h 15m" },
      { name: "Paul Mitchell", avatar: 53, timeIn: "9:30 AM", timeOut: "—", totalTime: "In progress" },
      { name: "Steven Clark", avatar: 51, timeIn: "10:00 PM", timeOut: "6:05 AM", totalTime: "8h 5m" },
    ],
    ehs: {
      checklist: [
        { item: "Chemical handling briefing completed", completed: true },
        { item: "PPE (gloves/eye protection) check", completed: true },
        { item: "Wet-floor signage placed", completed: true },
        { item: "Ladder inspection before fixture work", completed: false },
      ],
      ppe: [
        { name: "Brian Foster", avatar: 13, status: "Compliant" },
        { name: "Tony Ramirez", avatar: 18, status: "Compliant" },
        { name: "Paul Mitchell", avatar: 53, status: "Compliant" },
        { name: "Steven Clark", avatar: 51, status: "Non-Compliant" },
      ],
      incidents: [
        { date: "Today", type: "Near Miss", description: "Unmarked wet floor in lobby caught before foot traffic.", status: "Resolved" },
        { date: "4 days ago", type: "Incident", description: "Minor strain lifting waste bins, reported and rested.", status: "Resolved" },
      ],
      hazards: [
        { date: "Yesterday", site: "Northgate Medical Plaza", description: "Flickering stairwell lighting on level 2.", severity: "Medium", status: "Resolved" },
        { date: "Today", site: "Summit Tech Campus", description: "Propped-open fire door at east entrance.", severity: "High", status: "Open" },
      ],
    },
  },
  manufacturing: {
    team: [
      { name: "Greg Walsh", role: "Line Lead", status: "On Site", avatar: 54 },
      { name: "Dan Porter", role: "Maintenance Technician", status: "On Site", avatar: 57 },
      { name: "Luis Moreno", role: "Assembly Operator", status: "On Site", avatar: 58 },
      { name: "Ray Collins", role: "Packaging Operator", status: "Off Duty", avatar: 59 },
    ],
    attendanceRate: 97,
    schedule: [
      { site: "Plant 1 — Line 2 Changeover", time: "6:00 AM", assignee: "Greg Walsh", status: "In Progress" },
      { site: "Plant 1 — Press PM", time: "9:30 AM", assignee: "Dan Porter", status: "Scheduled" },
      { site: "Plant 2 — Assembly Cell B", time: "2:00 PM", assignee: "Luis Moreno", status: "Scheduled" },
      { site: "Plant 2 — Packaging Line", time: "10:00 PM", assignee: "Ray Collins", status: "At risk" },
    ],
    jobHistory: [
      { site: "Plant 1 — Line 2 Changeover", worker: "Greg Walsh", date: "Today", stages: stages("5:52 AM", "5:58 AM", "6:03 AM", "7:48 AM", "7:55 AM") },
      { site: "Plant 1 — Press PM", worker: "Dan Porter", date: "Today", stages: stages("9:26 AM", "9:31 AM", "9:40 AM", "11:05 AM", "11:12 AM") },
    ],
    attendance: [
      { name: "Greg Walsh", avatar: 54, timeIn: "5:45 AM", timeOut: "2:15 PM", totalTime: "8h 30m" },
      { name: "Dan Porter", avatar: 57, timeIn: "6:00 AM", timeOut: "2:20 PM", totalTime: "8h 20m" },
      { name: "Luis Moreno", avatar: 58, timeIn: "1:50 PM", timeOut: "—", totalTime: "In progress" },
      { name: "Ray Collins", avatar: 59, timeIn: "9:55 PM", timeOut: "6:00 AM", totalTime: "8h 5m" },
    ],
    ehs: {
      checklist: [
        { item: "Lockout/tagout verified before maintenance", completed: true },
        { item: "PPE (hearing/eye protection) check", completed: true },
        { item: "Machine guarding inspection", completed: true },
        { item: "Forklift pre-use inspection", completed: false },
      ],
      ppe: [
        { name: "Greg Walsh", avatar: 54, status: "Compliant" },
        { name: "Dan Porter", avatar: 57, status: "Compliant" },
        { name: "Luis Moreno", avatar: 58, status: "Non-Compliant" },
        { name: "Ray Collins", avatar: 59, status: "Compliant" },
      ],
      incidents: [
        { date: "Today", type: "Near Miss", description: "Guard interlock bypass found and reset before start-up.", status: "Resolved" },
        { date: "5 days ago", type: "Incident", description: "Minor pinch injury during die change, first aid given.", status: "Resolved" },
      ],
      hazards: [
        { date: "Yesterday", site: "Plant 1 — Line 2", description: "Oil leak under hydraulic press.", severity: "Medium", status: "Resolved" },
        { date: "Today", site: "Plant 2 — Packaging Line", description: "Pallets stacked in forklift lane.", severity: "Medium", status: "Open" },
      ],
    },
  },
  construction: {
    team: [
      { name: "Mike Hayes", role: "Site Foreman", status: "On Site", avatar: 60 },
      { name: "Carlos Vega", role: "Electrician", status: "On Site", avatar: 61 },
      { name: "Scott Reed", role: "Installer", status: "In Route", avatar: 63 },
      { name: "Nate Brooks", role: "Laborer", status: "Off Duty", avatar: 68 },
    ],
    attendanceRate: 92,
    schedule: [
      { site: "Elm Street Mixed-Use — Level 3", time: "7:00 AM", assignee: "Mike Hayes", status: "In Progress" },
      { site: "Elm Street Mixed-Use — Level 2", time: "8:30 AM", assignee: "Carlos Vega", status: "In Progress" },
      { site: "Brookside Townhomes — Unit 6", time: "11:00 AM", assignee: "Scott Reed", status: "Scheduled" },
      { site: "Westfield Warehouse Fit-out", time: "1:30 PM", assignee: "Nate Brooks", status: "At risk" },
    ],
    jobHistory: [
      { site: "Elm Street Mixed-Use — Level 3", worker: "Mike Hayes", date: "Today", stages: stages("6:48 AM", "6:58 AM", "7:05 AM", "11:30 AM", "11:38 AM") },
      { site: "Elm Street Mixed-Use — Level 2", worker: "Carlos Vega", date: "Today", stages: stages("8:25 AM", "8:33 AM", "8:40 AM", "12:10 PM", "12:15 PM") },
    ],
    attendance: [
      { name: "Mike Hayes", avatar: 60, timeIn: "6:40 AM", timeOut: "3:30 PM", totalTime: "8h 50m" },
      { name: "Carlos Vega", avatar: 61, timeIn: "7:00 AM", timeOut: "3:30 PM", totalTime: "8h 30m" },
      { name: "Scott Reed", avatar: 63, timeIn: "7:30 AM", timeOut: "—", totalTime: "In progress" },
      { name: "Nate Brooks", avatar: 68, timeIn: "6:55 AM", timeOut: "3:00 PM", totalTime: "8h 5m" },
    ],
    ehs: {
      checklist: [
        { item: "Toolbox talk completed", completed: true },
        { item: "PPE (hard hat/hi-vis/boots) check", completed: true },
        { item: "Scaffold tag inspection", completed: true },
        { item: "Fall-protection harness check", completed: false },
      ],
      ppe: [
        { name: "Mike Hayes", avatar: 60, status: "Compliant" },
        { name: "Carlos Vega", avatar: 61, status: "Compliant" },
        { name: "Scott Reed", avatar: 63, status: "Compliant" },
        { name: "Nate Brooks", avatar: 68, status: "Non-Compliant" },
      ],
      incidents: [
        { date: "Today", type: "Near Miss", description: "Unsecured material on Level 3 edge removed before a drop.", status: "Resolved" },
        { date: "3 days ago", type: "Incident", description: "Minor hand cut handling sheet metal, first aid given.", status: "Resolved" },
      ],
      hazards: [
        { date: "Yesterday", site: "Elm Street Mixed-Use", description: "Missing guardrail section on Level 3.", severity: "High", status: "Resolved" },
        { date: "Today", site: "Westfield Warehouse Fit-out", description: "Extension cords across main walkway.", severity: "Low", status: "Open" },
      ],
    },
  },
  healthcare: {
    team: [
      { name: "Ben Carter", role: "Support Services Lead", status: "On Site", avatar: 56 },
      { name: "Adam Price", role: "Equipment Porter", status: "On Site", avatar: 11 },
      { name: "Chris Bennett", role: "Clinic Assistant", status: "Off Duty", avatar: 12 },
      { name: "Omar Haddad", role: "Home Care Aide", status: "In Route", avatar: 14 },
    ],
    attendanceRate: 98,
    schedule: [
      { site: "St. Anne's Hospital — Ward 4", time: "7:00 AM", assignee: "Adam Price", status: "In Progress" },
      { site: "Lakeside Clinic — Rooms 1-6", time: "8:00 AM", assignee: "Chris Bennett", status: "Completed" },
      { site: "Home visits — North route", time: "10:00 AM", assignee: "Omar Haddad", status: "In Progress" },
      { site: "St. Anne's Hospital — Sterile Stores", time: "2:00 PM", assignee: "Ben Carter", status: "Scheduled" },
    ],
    jobHistory: [
      { site: "St. Anne's Hospital — Ward 4", worker: "Adam Price", date: "Today", stages: stages("6:55 AM", "7:02 AM", "7:05 AM", "9:15 AM", "9:20 AM") },
      { site: "Lakeside Clinic — Rooms 1-6", worker: "Chris Bennett", date: "Today", stages: stages("7:52 AM", "7:56 AM", "8:00 AM", "9:05 AM", "9:10 AM") },
    ],
    attendance: [
      { name: "Adam Price", avatar: 11, timeIn: "6:50 AM", timeOut: "3:05 PM", totalTime: "8h 15m" },
      { name: "Chris Bennett", avatar: 12, timeIn: "7:45 AM", timeOut: "12:00 PM", totalTime: "4h 15m" },
      { name: "Omar Haddad", avatar: 14, timeIn: "9:40 AM", timeOut: "—", totalTime: "In progress" },
      { name: "Ben Carter", avatar: 56, timeIn: "7:00 AM", timeOut: "3:30 PM", totalTime: "8h 30m" },
    ],
    ehs: {
      checklist: [
        { item: "Infection-control briefing completed", completed: true },
        { item: "PPE (gloves/mask) check", completed: true },
        { item: "Safe patient-area access confirmed", completed: true },
        { item: "Manual handling equipment check", completed: false },
      ],
      ppe: [
        { name: "Adam Price", avatar: 11, status: "Compliant" },
        { name: "Chris Bennett", avatar: 12, status: "Compliant" },
        { name: "Omar Haddad", avatar: 14, status: "Compliant" },
        { name: "Ben Carter", avatar: 56, status: "Non-Compliant" },
      ],
      incidents: [
        { date: "Today", type: "Near Miss", description: "Equipment trolley brake failed on ramp, stopped safely.", status: "Resolved" },
        { date: "6 days ago", type: "Incident", description: "Minor back strain moving a supply cart, reported.", status: "Resolved" },
      ],
      hazards: [
        { date: "Yesterday", site: "St. Anne's Hospital — Ward 4", description: "Spill near nurses' station.", severity: "Low", status: "Resolved" },
        { date: "Today", site: "Home visits — North route", description: "Icy steps at client entrance.", severity: "Medium", status: "Open" },
      ],
    },
  },
  retail: {
    team: [
      { name: "Derek Stone", role: "Area Merchandising Lead", status: "In Route", avatar: 64 },
      { name: "Ryan Ellis", role: "Merchandiser", status: "On Site", avatar: 52 },
      { name: "Jason Kim", role: "Stock Associate", status: "On Site", avatar: 55 },
      { name: "Matt Fisher", role: "Display Specialist", status: "Off Duty", avatar: 65 },
    ],
    attendanceRate: 94,
    schedule: [
      { site: "Downtown Store #12 — Aisle 7 Reset", time: "6:30 AM", assignee: "Ryan Ellis", status: "In Progress" },
      { site: "Downtown Store #12 — Delivery Intake", time: "7:00 AM", assignee: "Jason Kim", status: "In Progress" },
      { site: "Westgate Mall Branch — Audit", time: "11:00 AM", assignee: "Derek Stone", status: "Scheduled" },
      { site: "Eastside Store #4 — Promo Display", time: "2:00 PM", assignee: "Matt Fisher", status: "At risk" },
    ],
    jobHistory: [
      { site: "Downtown Store #12 — Aisle 7 Reset", worker: "Ryan Ellis", date: "Today", stages: stages("6:24 AM", "6:30 AM", "6:34 AM", "8:20 AM", "8:26 AM") },
      { site: "Downtown Store #12 — Delivery Intake", worker: "Jason Kim", date: "Today", stages: stages("6:55 AM", "7:00 AM", "7:02 AM", "9:10 AM", "9:15 AM") },
    ],
    attendance: [
      { name: "Ryan Ellis", avatar: 52, timeIn: "6:20 AM", timeOut: "2:45 PM", totalTime: "8h 25m" },
      { name: "Jason Kim", avatar: 55, timeIn: "6:50 AM", timeOut: "3:00 PM", totalTime: "8h 10m" },
      { name: "Derek Stone", avatar: 64, timeIn: "9:00 AM", timeOut: "—", totalTime: "In progress" },
      { name: "Matt Fisher", avatar: 65, timeIn: "7:30 AM", timeOut: "3:45 PM", totalTime: "8h 15m" },
    ],
    ehs: {
      checklist: [
        { item: "Safe lifting briefing completed", completed: true },
        { item: "Step ladder inspection", completed: true },
        { item: "Stockroom aisles clear", completed: true },
        { item: "Box cutter safety check", completed: false },
      ],
      ppe: [
        { name: "Ryan Ellis", avatar: 52, status: "Compliant" },
        { name: "Jason Kim", avatar: 55, status: "Compliant" },
        { name: "Derek Stone", avatar: 64, status: "Compliant" },
        { name: "Matt Fisher", avatar: 65, status: "Non-Compliant" },
      ],
      incidents: [
        { date: "Today", type: "Near Miss", description: "Overloaded top shelf flagged and reduced before opening.", status: "Resolved" },
        { date: "1 week ago", type: "Incident", description: "Minor cut opening cartons, first aid given.", status: "Resolved" },
      ],
      hazards: [
        { date: "Yesterday", site: "Downtown Store #12", description: "Pallet jack left in customer aisle.", severity: "Medium", status: "Resolved" },
        { date: "Today", site: "Eastside Store #4", description: "Loose display fixture near entrance.", severity: "Low", status: "Open" },
      ],
    },
  },
  "home-services": {
    team: [
      { name: "Owen Blake", role: "Dispatch Lead", status: "In Route", avatar: 53 },
      { name: "Joe Russo", role: "Duct Cleaning Technician", status: "On Site", avatar: 18 },
      { name: "Sam Patel", role: "IT Support Technician", status: "On Site", avatar: 13 },
      { name: "Tyler Grant", role: "Pest Control Technician", status: "Off Duty", avatar: 51 },
    ],
    attendanceRate: 94,
    schedule: [
      { site: "Maple Drive Residence — Duct Cleaning", time: "8:00 AM", assignee: "Joe Russo", status: "In Progress" },
      { site: "Brightline Accounting — IT Call-out", time: "9:30 AM", assignee: "Sam Patel", status: "In Progress" },
      { site: "Cedar Court Apartments — Pest Control", time: "12:00 PM", assignee: "Tyler Grant", status: "Scheduled" },
      { site: "Oak Street Shop — Lock Change", time: "3:00 PM", assignee: "Owen Blake", status: "At risk" },
    ],
    jobHistory: [
      { site: "Maple Drive Residence — Duct Cleaning", worker: "Joe Russo", date: "Today", stages: stages("7:56 AM", "8:02 AM", "8:10 AM", "10:25 AM", "10:32 AM") },
      { site: "Brightline Accounting — IT Call-out", worker: "Sam Patel", date: "Today", stages: stages("9:28 AM", "9:34 AM", "9:38 AM", "10:45 AM", "10:50 AM") },
    ],
    attendance: [
      { name: "Joe Russo", avatar: 18, timeIn: "7:30 AM", timeOut: "4:00 PM", totalTime: "8h 30m" },
      { name: "Sam Patel", avatar: 13, timeIn: "8:45 AM", timeOut: "5:00 PM", totalTime: "8h 15m" },
      { name: "Owen Blake", avatar: 53, timeIn: "8:00 AM", timeOut: "—", totalTime: "In progress" },
      { name: "Tyler Grant", avatar: 51, timeIn: "7:00 AM", timeOut: "3:10 PM", totalTime: "8h 10m" },
    ],
    ehs: {
      checklist: [
        { item: "Customer-site risk check completed", completed: true },
        { item: "PPE (respirator/gloves) check", completed: true },
        { item: "Chemical label & SDS on hand", completed: true },
        { item: "Attic/crawlspace access check", completed: false },
      ],
      ppe: [
        { name: "Joe Russo", avatar: 18, status: "Compliant" },
        { name: "Sam Patel", avatar: 13, status: "Compliant" },
        { name: "Owen Blake", avatar: 53, status: "Compliant" },
        { name: "Tyler Grant", avatar: 51, status: "Non-Compliant" },
      ],
      incidents: [
        { date: "Today", type: "Near Miss", description: "Weak attic joist spotted before stepping off the ladder.", status: "Resolved" },
        { date: "5 days ago", type: "Incident", description: "Minor skin irritation after treatment, rinsed and reported.", status: "Resolved" },
      ],
      hazards: [
        { date: "Yesterday", site: "Maple Drive Residence", description: "Exposed wiring near attic hatch.", severity: "Medium", status: "Resolved" },
        { date: "Today", site: "Cedar Court Apartments", description: "Unlit basement stairwell.", severity: "Low", status: "Open" },
      ],
    },
  },
  "public-sector": {
    team: [
      { name: "Frank Lopez", role: "Public Works Crew Lead", status: "On Site", avatar: 54 },
      { name: "Alan Wright", role: "Facilities Inspector", status: "In Route", avatar: 57 },
      { name: "Victor Ortiz", role: "Maintenance Worker", status: "On Site", avatar: 58 },
      { name: "Neil Parker", role: "Facilities Technician", status: "Off Duty", avatar: 59 },
    ],
    attendanceRate: 96,
    schedule: [
      { site: "Central Park — Paths & Benches", time: "7:00 AM", assignee: "Frank Lopez", status: "In Progress" },
      { site: "Main Street — Storm Drains", time: "8:30 AM", assignee: "Victor Ortiz", status: "In Progress" },
      { site: "City College — Science Block", time: "11:00 AM", assignee: "Alan Wright", status: "Scheduled" },
      { site: "County Records Office", time: "2:00 PM", assignee: "Neil Parker", status: "At risk" },
    ],
    jobHistory: [
      { site: "Central Park — Paths & Benches", worker: "Frank Lopez", date: "Today", stages: stages("6:52 AM", "7:00 AM", "7:06 AM", "9:40 AM", "9:46 AM") },
      { site: "Main Street — Storm Drains", worker: "Victor Ortiz", date: "Today", stages: stages("8:24 AM", "8:31 AM", "8:45 AM", "10:50 AM", "10:58 AM") },
    ],
    attendance: [
      { name: "Frank Lopez", avatar: 54, timeIn: "6:45 AM", timeOut: "3:15 PM", totalTime: "8h 30m" },
      { name: "Victor Ortiz", avatar: 58, timeIn: "7:00 AM", timeOut: "3:20 PM", totalTime: "8h 20m" },
      { name: "Alan Wright", avatar: 57, timeIn: "8:30 AM", timeOut: "—", totalTime: "In progress" },
      { name: "Neil Parker", avatar: 59, timeIn: "7:30 AM", timeOut: "3:40 PM", totalTime: "8h 10m" },
    ],
    ehs: {
      checklist: [
        { item: "Traffic management plan in place", completed: true },
        { item: "PPE (hi-vis/boots/gloves) check", completed: true },
        { item: "Confined-space permit issued", completed: true },
        { item: "Gas detector bump test", completed: false },
      ],
      ppe: [
        { name: "Frank Lopez", avatar: 54, status: "Compliant" },
        { name: "Victor Ortiz", avatar: 58, status: "Compliant" },
        { name: "Alan Wright", avatar: 57, status: "Compliant" },
        { name: "Neil Parker", avatar: 59, status: "Non-Compliant" },
      ],
      incidents: [
        { date: "Today", type: "Near Miss", description: "Vehicle entered work zone, cones repositioned.", status: "Resolved" },
        { date: "1 week ago", type: "Incident", description: "Minor ankle twist on uneven pavement, reported.", status: "Resolved" },
      ],
      hazards: [
        { date: "Yesterday", site: "Main Street", description: "Loose drain grate near crosswalk.", severity: "High", status: "Resolved" },
        { date: "Today", site: "Central Park", description: "Broken bench slat on east path.", severity: "Low", status: "Open" },
      ],
    },
  },
};
