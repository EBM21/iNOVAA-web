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
};
