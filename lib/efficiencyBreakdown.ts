export type CategoryWorkerShare = { worker: string; task: string; weight: number };

// Per industry, one worker/task/weight list per category (indexed the same way as
// `efficiencyData[i].team[i].categories`: Active Work, Physical Exertion,
// Access/Positioning, Transit/Walking, Idle, Documentation). Weights are relative,
// not fractions of 1 — actual minutes are derived from whichever category total is
// showing, so the breakdown always sums back to that total. Each category draws on
// a different subset of the crew so no one worker shows up identically everywhere.
export const categoryWorkerBreakdown: Record<string, CategoryWorkerShare[][]> = {
  hvac: [
    [
      { worker: "Williams", task: "Tool Use", weight: 5 },
      { worker: "Harris", task: "Diagnostics", weight: 3 },
      { worker: "Doe", task: "Tool Use", weight: 4 },
      { worker: "Turner", task: "Diagnostics", weight: 2 },
    ],
    [
      { worker: "Doe", task: "Lifting", weight: 6 },
      { worker: "Williams", task: "Carrying", weight: 4 },
    ],
    [
      { worker: "Harris", task: "Ladder Access", weight: 11 },
      { worker: "Turner", task: "Overhead Reach", weight: 9 },
    ],
    [
      { worker: "Turner", task: "Walking to Van", weight: 1 },
      { worker: "Williams", task: "Site-to-Site Walk", weight: 1 },
    ],
    [
      { worker: "Harris", task: "Waiting on Parts", weight: 1 },
      { worker: "Doe", task: "Waiting on Access", weight: 1 },
    ],
    [
      { worker: "Doe", task: "Filing Report", weight: 1 },
      { worker: "Turner", task: "Photo Upload", weight: 1 },
    ],
  ],
  solar: [
    [
      { worker: "Anderson", task: "Brushing", weight: 5 },
      { worker: "Reynolds", task: "Mopping", weight: 3 },
      { worker: "Brooks", task: "Brushing", weight: 4 },
      { worker: "Clark", task: "Mopping", weight: 2 },
    ],
    [
      { worker: "Clark", task: "Carrying Water", weight: 6 },
      { worker: "Anderson", task: "Carrying Equipment", weight: 4 },
      { worker: "Reynolds", task: "Inspection", weight: 3 },
      { worker: "Brooks", task: "Inspection", weight: 2 },
    ],
    [
      { worker: "Brooks", task: "Ladder", weight: 11 },
      { worker: "Reynolds", task: "Panel-Row Movement", weight: 9 },
    ],
    [
      { worker: "Reynolds", task: "Between Arrays", weight: 1 },
      { worker: "Clark", task: "Between Arrays", weight: 1 },
    ],
    [
      { worker: "Anderson", task: "Waiting on Water Refill", weight: 1 },
      { worker: "Brooks", task: "Waiting on Access", weight: 1 },
    ],
    [
      { worker: "Reynolds", task: "Before Photos", weight: 1 },
      { worker: "Brooks", task: "After Photos", weight: 1 },
    ],
  ],
  logistics: [
    [
      { worker: "Harris", task: "Scanning", weight: 9 },
      { worker: "Bennett", task: "Sorting", weight: 7 },
      { worker: "D. Foster", task: "Handling", weight: 4 },
    ],
    [
      { worker: "Bennett", task: "Carrying Package", weight: 11 },
      { worker: "B. Foster", task: "Carrying Package", weight: 9 },
    ],
    [
      { worker: "D. Foster", task: "Stairs/Elevator", weight: 1 },
      { worker: "Harris", task: "Unit Finding", weight: 1 },
    ],
    [
      { worker: "B. Foster", task: "Parking to Door", weight: 1 },
      { worker: "Harris", task: "Parking to Door", weight: 1 },
    ],
    [
      { worker: "D. Foster", task: "Waiting for Recipient", weight: 1 },
      { worker: "Bennett", task: "Waiting for Recipient", weight: 1 },
    ],
    [
      { worker: "B. Foster", task: "POD Photo", weight: 1 },
      { worker: "Bennett", task: "Signature", weight: 1 },
    ],
  ],
  hospitality: [
    [
      { worker: "Reed", task: "Wiping", weight: 8 },
      { worker: "Collins", task: "Vacuuming", weight: 7 },
      { worker: "Hayes", task: "Bed-Making", weight: 5 },
    ],
    [
      { worker: "Hughes", task: "Carrying Linens", weight: 11 },
      { worker: "Reed", task: "Restocking", weight: 9 },
    ],
    [
      { worker: "Collins", task: "Room-to-Room", weight: 1 },
      { worker: "Hayes", task: "Cart Trips", weight: 1 },
    ],
    [
      { worker: "Hughes", task: "Within Room", weight: 1 },
      { worker: "Collins", task: "Within Room", weight: 1 },
    ],
    [
      { worker: "Reed", task: "Waiting on Supplies", weight: 1 },
      { worker: "Hayes", task: "Waiting on Supplies", weight: 1 },
    ],
    [
      { worker: "Hughes", task: "Room Status Update", weight: 1 },
      { worker: "Hayes", task: "Room Status Update", weight: 1 },
    ],
  ],
  landscaping: [
    [
      { worker: "Coleman", task: "Mowing", weight: 8 },
      { worker: "Simmons", task: "Trimming", weight: 7 },
      { worker: "Ramsey", task: "Edging/Weeding", weight: 5 },
    ],
    [
      { worker: "O'Brien", task: "Carrying Mulch", weight: 6 },
      { worker: "Coleman", task: "Carrying Debris", weight: 4 },
    ],
    [
      { worker: "Ramsey", task: "Equipment Unload", weight: 1 },
      { worker: "Simmons", task: "Terrain/Gates", weight: 1 },
    ],
    [
      { worker: "O'Brien", task: "Between Zones", weight: 1 },
      { worker: "Ramsey", task: "Between Zones", weight: 1 },
    ],
    [
      { worker: "Coleman", task: "Equipment Issue", weight: 1 },
      { worker: "Simmons", task: "Refueling", weight: 1 },
    ],
    [
      { worker: "Simmons", task: "Before Photos", weight: 1 },
      { worker: "O'Brien", task: "After Photos", weight: 1 },
    ],
  ],
  "facility-services": [
    [
      { worker: "Foster", task: "Floor Cleaning", weight: 6 },
      { worker: "Clark", task: "Patrol Rounds", weight: 5 },
      { worker: "Ramirez", task: "Fixture Repair", weight: 4 },
      { worker: "Mitchell", task: "Restocking", weight: 3 },
    ],
    [
      { worker: "Foster", task: "Carrying Waste", weight: 5 },
      { worker: "Mitchell", task: "Carrying Supplies", weight: 4 },
    ],
    [
      { worker: "Ramirez", task: "Ladder Work", weight: 3 },
      { worker: "Clark", task: "Keyed Areas", weight: 2 },
    ],
    [
      { worker: "Clark", task: "Between Buildings", weight: 1 },
      { worker: "Foster", task: "Between Floors", weight: 1 },
    ],
    [
      { worker: "Mitchell", task: "Waiting on Access", weight: 1 },
      { worker: "Ramirez", task: "Waiting on Parts", weight: 1 },
    ],
    [
      { worker: "Clark", task: "Patrol Log", weight: 1 },
      { worker: "Foster", task: "Checklist Photos", weight: 1 },
    ],
  ],
  manufacturing: [
    [
      { worker: "Moreno", task: "Assembly", weight: 6 },
      { worker: "Walsh", task: "Machine Operation", weight: 5 },
      { worker: "Porter", task: "Maintenance", weight: 4 },
      { worker: "Collins", task: "Packaging", weight: 3 },
    ],
    [
      { worker: "Collins", task: "Palletizing", weight: 5 },
      { worker: "Walsh", task: "Material Handling", weight: 4 },
    ],
    [
      { worker: "Porter", task: "Guarding Removal", weight: 3 },
      { worker: "Walsh", task: "Changeover Setup", weight: 2 },
    ],
    [
      { worker: "Collins", task: "Between Stations", weight: 1 },
      { worker: "Moreno", task: "To Stores", weight: 1 },
    ],
    [
      { worker: "Walsh", task: "Waiting on QA", weight: 1 },
      { worker: "Collins", task: "Waiting on Parts", weight: 1 },
    ],
    [
      { worker: "Porter", task: "PM Record", weight: 1 },
      { worker: "Walsh", task: "Batch Record", weight: 1 },
    ],
  ],
  construction: [
    [
      { worker: "Hayes", task: "Framing", weight: 6 },
      { worker: "Vega", task: "Electrical Install", weight: 5 },
      { worker: "Reed", task: "Window Install", weight: 4 },
      { worker: "Brooks", task: "Site Prep", weight: 2 },
    ],
    [
      { worker: "Brooks", task: "Hauling Debris", weight: 5 },
      { worker: "Hayes", task: "Carrying Lumber", weight: 4 },
    ],
    [
      { worker: "Vega", task: "Scaffold Access", weight: 3 },
      { worker: "Reed", task: "Lift Positioning", weight: 2 },
    ],
    [
      { worker: "Brooks", task: "Across Site", weight: 1 },
      { worker: "Hayes", task: "To Laydown Area", weight: 1 },
    ],
    [
      { worker: "Hayes", task: "Waiting on Materials", weight: 1 },
      { worker: "Reed", task: "Waiting on Trades", weight: 1 },
    ],
    [
      { worker: "Vega", task: "Daily Log", weight: 1 },
      { worker: "Hayes", task: "Progress Photos", weight: 1 },
    ],
  ],
  healthcare: [
    [
      { worker: "Haddad", task: "Home Visit Support", weight: 6 },
      { worker: "Price", task: "Equipment Setup", weight: 4 },
      { worker: "Bennett", task: "Room Turnover", weight: 4 },
      { worker: "Carter", task: "Restocking", weight: 3 },
    ],
    [
      { worker: "Price", task: "Moving Equipment", weight: 5 },
      { worker: "Carter", task: "Carrying Supplies", weight: 4 },
    ],
    [
      { worker: "Price", task: "Lift Transfers", weight: 2 },
      { worker: "Carter", task: "Restricted Stores", weight: 2 },
    ],
    [
      { worker: "Haddad", task: "Between Visits", weight: 1 },
      { worker: "Price", task: "Between Wards", weight: 1 },
    ],
    [
      { worker: "Bennett", task: "Waiting on Handover", weight: 1 },
      { worker: "Carter", task: "Waiting on Delivery", weight: 1 },
    ],
    [
      { worker: "Haddad", task: "Visit Notes", weight: 1 },
      { worker: "Bennett", task: "Task Log", weight: 1 },
    ],
  ],
  retail: [
    [
      { worker: "Ellis", task: "Planogram Reset", weight: 5 },
      { worker: "Fisher", task: "Display Build", weight: 5 },
      { worker: "Kim", task: "Shelving", weight: 4 },
      { worker: "Stone", task: "Audit", weight: 3 },
    ],
    [
      { worker: "Kim", task: "Unloading Delivery", weight: 6 },
      { worker: "Ellis", task: "Carrying Stock", weight: 4 },
    ],
    [
      { worker: "Fisher", task: "Ladder Work", weight: 3 },
      { worker: "Ellis", task: "Fixture Access", weight: 2 },
    ],
    [
      { worker: "Kim", task: "Floor to Stockroom", weight: 1 },
      { worker: "Ellis", task: "Aisle to Aisle", weight: 1 },
    ],
    [
      { worker: "Kim", task: "Waiting on Delivery", weight: 1 },
      { worker: "Fisher", task: "Waiting on Materials", weight: 1 },
    ],
    [
      { worker: "Stone", task: "Compliance Photos", weight: 1 },
      { worker: "Ellis", task: "Reset Sign-off", weight: 1 },
    ],
  ],
  "home-services": [
    [
      { worker: "Russo", task: "Duct Cleaning", weight: 6 },
      { worker: "Patel", task: "IT Repair", weight: 4 },
      { worker: "Grant", task: "Pest Treatment", weight: 4 },
      { worker: "Blake", task: "Lock Change", weight: 2 },
    ],
    [
      { worker: "Russo", task: "Carrying Vacuum Rig", weight: 5 },
      { worker: "Grant", task: "Carrying Sprayer", weight: 3 },
    ],
    [
      { worker: "Russo", task: "Attic Access", weight: 3 },
      { worker: "Grant", task: "Crawlspace Access", weight: 2 },
    ],
    [
      { worker: "Patel", task: "Van to Door", weight: 1 },
      { worker: "Blake", task: "Van to Door", weight: 1 },
    ],
    [
      { worker: "Blake", task: "Waiting on Customer", weight: 1 },
      { worker: "Patel", task: "Waiting on Access", weight: 1 },
    ],
    [
      { worker: "Grant", task: "Treatment Record", weight: 1 },
      { worker: "Russo", task: "Before/After Photos", weight: 1 },
    ],
  ],
  "public-sector": [
    [
      { worker: "Lopez", task: "Street Maintenance", weight: 5 },
      { worker: "Wright", task: "Inspection", weight: 4 },
      { worker: "Ortiz", task: "Drain Clearing", weight: 4 },
      { worker: "Parker", task: "Facilities Repair", weight: 3 },
    ],
    [
      { worker: "Ortiz", task: "Hauling Debris", weight: 5 },
      { worker: "Lopez", task: "Lifting Signage", weight: 4 },
    ],
    [
      { worker: "Ortiz", task: "Manhole Access", weight: 3 },
      { worker: "Wright", task: "Roof Access", weight: 2 },
    ],
    [
      { worker: "Lopez", task: "Between Sites", weight: 1 },
      { worker: "Parker", task: "Between Buildings", weight: 1 },
    ],
    [
      { worker: "Ortiz", task: "Waiting on Traffic Control", weight: 1 },
      { worker: "Lopez", task: "Waiting on Permit", weight: 1 },
    ],
    [
      { worker: "Wright", task: "Inspection Report", weight: 1 },
      { worker: "Parker", task: "Work Order Photos", weight: 1 },
    ],
  ],
};
