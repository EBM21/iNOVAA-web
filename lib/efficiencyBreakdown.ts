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
};
