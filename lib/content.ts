import type { Faq } from "./schema";
import type { RelatedLink } from "@/components/RelatedLinks";

// ---------------------------------------------------------------------------
// Internal links — descriptive anchors reused across pages.
// ---------------------------------------------------------------------------
export const links = {
  tracker: {
    href: "/platform/inovaa-tracker",
    label: "iNOVAA Tracker — IoT wearable",
    text: "The wrist-worn activity tracker for technicians that logs automatic proof of work, even offline.",
  },
  platform: {
    href: "/platform",
    label: "iNOVAA Portal — the software platform",
    text: "The workforce efficiency dashboard the Tracker feeds — jobs, teams, schedules, and attendance on one live record.",
  },
  dashboard: {
    href: "/platform/field-ops-dashboard",
    label: "iNOVAA Portal dashboard",
    text: "The software the Tracker feeds: live job status, team efficiency, schedules, and attendance in one view.",
  },
  customerPortal: {
    href: "/platform/customer-portal",
    label: "Customer portal",
    text: "Live job status, technician ETAs, photos, and signed reports your clients can check themselves.",
  },
  multiTenant: {
    href: "/platform/multi-tenant",
    label: "Multi-tenant & custom branding",
    text: "Isolated, white-labeled portals for every client company on one platform.",
  },
  howItWorks: {
    href: "/how-it-works",
    label: "How automatic proof of work works",
    text: "Follow a job from scheduled to signed off, with the tracker trail behind every stage.",
  },
  industries: {
    href: "/industries",
    label: "Industries we serve",
    text: "Solar, HVAC, logistics, hospitality, and landscaping crews running on one field workforce tracker.",
  },
  connectors: {
    href: "/connectors",
    label: "Integrations & connectors",
    text: "Connect calendars, payments, and CRMs so dispatch never double-enters a job.",
  },
  contact: {
    href: "/contact",
    label: "Book a demo with the iNOVAA team",
    text: "20 minutes, on a job that looks like yours.",
  },
  solar: {
    href: "/industries/solar",
    label: "Solar panel cleaning & O&M",
    text: "Verified cleaning and maintenance visits across distributed solar sites.",
  },
  hvac: {
    href: "/industries/hvac",
    label: "HVAC field service tracking",
    text: "Dispatch-to-sign-off tracking for residential and commercial HVAC technicians.",
  },
  logistics: {
    href: "/industries/logistics",
    label: "Delivery & logistics proof of visit",
    text: "GPS-tagged stops and photo proof for last-mile and route-based teams.",
  },
  hospitality: {
    href: "/industries/hospitality",
    label: "Hospitality cleaning & housekeeping",
    text: "Room-by-room turnover tracking for hotels, rentals, and facilities.",
  },
  landscaping: {
    href: "/industries/landscaping",
    label: "Landscaping crew tracking",
    text: "Stage-by-stage proof of work on every recurring grounds route.",
  },
  "facility-services": {
    href: "/industries/facility-services",
    label: "Facility services tracking",
    text: "Verified cleaning, maintenance, and security rounds across every building you manage.",
  },
  manufacturing: {
    href: "/industries/manufacturing",
    label: "Manufacturing workforce tracking",
    text: "Changeovers, maintenance, and line work measured across every shift.",
  },
  construction: {
    href: "/industries/construction",
    label: "Construction crew tracking",
    text: "Site crews and contractors logged across every active job site.",
  },
  healthcare: {
    href: "/industries/healthcare",
    label: "Healthcare support & home care",
    text: "Verified support tasks and home care visits, logged by time and location.",
  },
  retail: {
    href: "/industries/retail",
    label: "Retail & merchandising teams",
    text: "Resets, deliveries, and branch visits proven store by store.",
  },
  "home-services": {
    href: "/industries/home-services",
    label: "Home & commercial services",
    text: "Call-out work proven on every visit — IT, locksmith, handyman, duct cleaning, pest control.",
  },
  "public-sector": {
    href: "/industries/public-sector",
    label: "Public sector field crews",
    text: "Municipal, campus, and government site work with an auditable record.",
  },
} satisfies Record<string, RelatedLink>;

// ---------------------------------------------------------------------------
// FAQs — rendered visibly and emitted as FAQPage JSON-LD from the same data.
// ---------------------------------------------------------------------------
export const homeFaqs: Faq[] = [
  {
    q: "What is iNOVAA?",
    tag: "A wearable Tracker that feeds a software Portal — field work, measured automatically.",
    a: "iNOVAA is a workforce efficiency platform with two parts. The iNOVAA Tracker is a wearable that automatically records how field workers spend their time on site. The iNOVAA Portal is the software dashboard that turns that data into live job status, team efficiency scores, schedules, and attendance for managers and clients.",
  },
  {
    q: "What is an IoT wearable tracker for field workers?",
    tag: "A wrist device that logs on-site work by itself — no manual check-ins.",
    a: "An IoT wearable tracker for field workers is a small, connected device worn on the wrist that records what a technician is doing on site. The iNOVAA Tracker uses a motion sensor and on-device machine learning to recognize work activity, then syncs that record to the iNOVAA Portal so managers and customers can see verified progress without manual check-ins.",
  },
  {
    q: "How does iNOVAA verify field work automatically?",
    tag: "Wrist motion + time + GPS = proof of work, even offline.",
    a: "The iNOVAA Tracker classifies hand and arm motion on the wrist, tags each activity with a time and GPS location, and stores it even with no signal. When the device reconnects over Bluetooth, those events move the job through its stages — reached site, work started, work finished — creating automatic proof of work that feeds the dashboard, customer portal, and signed service report.",
  },
  {
    q: "Which industries is iNOVAA built for?",
    tag: "Any crew doing hands-on work at a customer site.",
    a: "iNOVAA was born inside a solar maintenance company and is built for solar panel cleaning and O&M, HVAC, delivery and logistics, hospitality cleaning, and landscaping crews. Any team that does hands-on work at a customer site can use it as a field workforce tracker.",
  },
  {
    q: "Does the iNOVAA Tracker work without cell signal?",
    tag: "Yes — it keeps logging offline and syncs when back in range.",
    a: "Yes. The iNOVAA Tracker is offline-first: it keeps classifying and logging work with zero signal on site, then syncs over BLE 5.3 as soon as it is back in range.",
  },
];

export const trackerFaqs: Faq[] = [
  {
    q: "What does the iNOVAA Tracker measure?",
    a: "The iNOVAA Tracker is a wrist-worn activity tracker for technicians. A dual-sensor IMU reads motion and orientation, and an on-device model (a hybrid TFLite and Random Forest classifier) turns those readings into work activity, so the tracker can tell active work from travel or idle time.",
  },
  {
    q: "How long does the battery last?",
    a: "Up to 7 days on a single charge in typical field use, so crews can wear it for a full work week and charge it over the weekend.",
  },
  {
    q: "Is the tracker rugged enough for job sites?",
    a: "Yes. It is rated IP65 against dust and water jets, uses a flexible silicone strap, and is light enough to wear through a full shift on rooftops, in plant rooms, or on delivery routes.",
  },
  {
    q: "Does the worker have to press anything to log work?",
    a: "No. Activity is detected automatically — that is what makes it automatic proof of work. A side action button is there for manual event tags when a technician wants to flag something specific.",
  },
  {
    q: "How does the tracker connect to the iNOVAA Portal?",
    a: "It syncs over Bluetooth Low Energy 5.3. Events recorded offline are stored on the device and uploaded the next time it is in range, then appear on the field ops dashboard and customer portal.",
  },
];

export const platformFaqs: Faq[] = [
  {
    q: "What is the iNOVAA Portal?",
    a: "The iNOVAA Portal is field service management software that combines dispatch, a live field ops dashboard, a customer portal, and multi-tenant branding on one job record, with iNOVAA Tracker data providing automatic proof of work.",
  },
  {
    q: "How does the iNOVAA Portal get proof of work from the field?",
    a: "iNOVAA Tracker events — each with a time, a GPS location, and the technician who triggered it — move jobs through their stages automatically. The Portal adds photos and signed reports, so every job closes with a complete, verifiable trail.",
  },
  {
    q: "Can we run several client companies on one account?",
    a: "Yes. The multi-tenant setup gives each client company isolated data and its own branded portal, and franchise operators can run many locations under one parent account.",
  },
];

// ---------------------------------------------------------------------------
// Industry pages — unique copy per industry so no two pages share body text.
// ---------------------------------------------------------------------------
export type IndustryContent = {
  h1: string;
  intro: string[];
  sectionTitle: string;
  useCases: { title: string; text: string }[];
  faqs: Faq[];
  related: RelatedLink[];
};

export const industryContent: Record<string, IndustryContent> = {
  solar: {
    h1: "Solar panel cleaning & O&M workforce tracker",
    intro: [
      "Solar maintenance happens across dozens of distributed sites that nobody in the office can see. iNOVAA started inside a solar maintenance company in Arizona, so the platform is shaped around how solar panel cleaning crews and O&M providers actually work: long rows, remote arrays, spotty signal, and asset owners who want proof the job was done.",
      "Crews wear the iNOVAA Tracker while they clean and inspect. It recognizes cleaning activity on the wrist, logs it offline, and syncs when the truck is back in range — so every solar site visit comes with automatic proof of work, GPS-tagged row notes, and a signed field service report (FSR) the asset owner can open in their portal.",
    ],
    sectionTitle: "How iNOVAA works for solar maintenance teams",
    useCases: [
      { title: "Verified solar panel cleaning", text: "Tracker activity shows how long each array was actually cleaned, not just when the crew clocked in." },
      { title: "Row-level issue flags", text: "Pin-drop annotations mark the exact row or string with soiling, damage, or low output for the next visit." },
      { title: "Asset-owner reporting", text: "Solar asset owners see visit history, before/after photos, and signed FSRs for every site in one customer portal." },
    ],
    faqs: [
      {
        q: "How does iNOVAA prove a solar panel cleaning job was completed?",
        a: "The iNOVAA Tracker logs cleaning activity from the technician's wrist with a timestamp and location, and the job closes with before/after photos and a signed FSR — so solar asset owners get evidence, not just a checkbox.",
      },
      {
        q: "Does it work at remote solar farms with no cell coverage?",
        a: "Yes. The tracker is offline-first and stores every event on the device until it can sync, which is why it was built for utility-scale and rural solar sites in the first place.",
      },
    ],
    related: [links.tracker, links.dashboard, links.customerPortal],
  },
  hvac: {
    h1: "HVAC field service tracker & efficiency dashboard",
    intro: [
      "HVAC work is split between scheduled preventive maintenance and emergency calls that can't wait. iNOVAA gives residential and commercial HVAC contractors one live record for both — dispatch routes the technician, the iNOVAA Tracker logs the work on the wrist, and the property manager sees the result without calling the office.",
      "On a rooftop unit or in a plant room, HVAC technicians rarely have a free hand for an app. The tracker recognizes service activity automatically, moves the job through stages like filter change and coil cleaning, and feeds a worker efficiency dashboard that shows time on tools versus travel for every HVAC technician.",
    ],
    sectionTitle: "How iNOVAA works for HVAC contractors",
    useCases: [
      { title: "Preventive maintenance contracts", text: "Track every PM visit across commercial HVAC contracts with timestamped, sensor-verified proof of work." },
      { title: "Emergency dispatch", text: "See which HVAC technician is closest and what stage each open call is in, updated live from the field." },
      { title: "Technician efficiency", text: "Compare time on tools, travel, and idle time per technician to raise first-time fix rates." },
    ],
    faqs: [
      {
        q: "How does iNOVAA track HVAC technicians on a job?",
        a: "Each HVAC technician wears the iNOVAA Tracker, which detects service activity and tags it with time and location. Stage changes — reached site, work started, work finished — update the field ops dashboard automatically.",
      },
      {
        q: "Can property managers see HVAC service reports?",
        a: "Yes. Commercial clients get a customer portal with live job status, technician ETA, photos, and every signed HVAC service report, searchable by site and unit.",
      },
    ],
    related: [links.tracker, links.dashboard, links.customerPortal],
  },
  logistics: {
    h1: "Delivery & logistics proof-of-visit tracker",
    intro: [
      "Proof of delivery tells you a package arrived. Proof of visit tells you the driver was actually there, how long the stop took, and what happened at the door. iNOVAA gives last-mile delivery fleets and route-based field teams that second layer of evidence.",
      "Drivers wear the iNOVAA Tracker on their route. Every stop gets a GPS-tagged event and optional photo, handling activity is logged automatically, and dispatch sees route progress live — so logistics managers can settle disputes and rebalance routes without calling drivers.",
    ],
    sectionTitle: "How iNOVAA works for delivery and logistics teams",
    useCases: [
      { title: "GPS-tagged stop confirmation", text: "Each delivery or pickup is logged with location and time the moment it happens, not at end of shift." },
      { title: "Photo proof at every stop", text: "Delivery photos attach to the stop record so customer disputes are resolved from evidence." },
      { title: "Live route oversight", text: "Dispatch sees which routes are on pace, which are behind, and which stops need a reschedule." },
    ],
    faqs: [
      {
        q: "What is proof of visit for delivery drivers?",
        a: "Proof of visit is a time- and location-stamped record that a driver physically reached a stop. iNOVAA creates it automatically from the wearable tracker and GPS, alongside standard proof-of-delivery photos.",
      },
      {
        q: "Does iNOVAA replace our routing software?",
        a: "No. iNOVAA connects to the tools you already run through its connectors and adds verified field activity on top, so logistics teams keep their routing while gaining proof of work.",
      },
    ],
    related: [links.tracker, links.dashboard, links.connectors],
  },
  hospitality: {
    h1: "Hotel housekeeping & hospitality cleaning tracker",
    intro: [
      "In hospitality cleaning, every minute a room sits dirty is a minute it can't be sold. iNOVAA helps hotel housekeeping teams, vacation rental turnover crews, and facility cleaning contractors track turnovers room by room and tell the front desk the moment a room is guest-ready.",
      "Housekeepers wear the iNOVAA Tracker during their shift. It recognizes cleaning activity automatically, so supervisors get accurate per-room turnover times without housekeepers stopping to tap a screen, and property owners get photo-checked proof that every hospitality cleaning job met the standard.",
    ],
    sectionTitle: "How iNOVAA works for housekeeping and cleaning teams",
    useCases: [
      { title: "Room-by-room turnover status", text: "Each room moves from dirty to in-progress to guest-ready as the housekeeper works, synced to the front desk." },
      { title: "Vacation rental turnovers", text: "Owners see photo checks and completion time for every rental turnover without visiting the property." },
      { title: "Facility cleaning contracts", text: "Contractors prove the hours and areas cleaned for each facility client with sensor-verified records." },
    ],
    faqs: [
      {
        q: "How does iNOVAA track hotel housekeeping?",
        a: "Housekeepers wear the iNOVAA Tracker, which logs cleaning activity per room automatically. Supervisors see live turnover status and average cleaning time, and the front desk is notified when a room clears.",
      },
      {
        q: "Is it comfortable enough for a full housekeeping shift?",
        a: "Yes. The tracker is lightweight, water resistant to IP65, and uses a soft silicone strap designed to be worn all day.",
      },
    ],
    related: [links.tracker, links.customerPortal, links.multiTenant],
  },
  landscaping: {
    h1: "Landscaping crew tracker & route management",
    intro: [
      "Landscaping businesses live on recurring routes — the same commercial properties every week, often run by crews spread across a franchise. iNOVAA gives commercial landscaping companies, lawn care franchises, and grounds maintenance teams a live view of every route and proof that each property was serviced.",
      "Landscaping crews wear the iNOVAA Tracker while mowing, trimming, and checking irrigation. The tracker logs that work automatically and ties it to the property, so owners see exactly what was done on each visit and franchise operators can compare crews across locations.",
    ],
    sectionTitle: "How iNOVAA works for landscaping companies",
    useCases: [
      { title: "Recurring route tracking", text: "See every stop on a weekly landscaping route and which properties are done, in progress, or skipped." },
      { title: "Stage-by-stage service logs", text: "Mowing, trimming, and irrigation checks are logged as separate stages with time and location." },
      { title: "Franchise-wide visibility", text: "Lawn care franchises run every location under one parent account with isolated data per branch." },
    ],
    faqs: [
      {
        q: "How do I prove my landscaping crew serviced a property?",
        a: "Each crew member's iNOVAA Tracker logs on-site work with time and GPS location, and visits close with photos. Commercial property managers can open the record in their customer portal.",
      },
      {
        q: "Can a lawn care franchise use iNOVAA across locations?",
        a: "Yes. Multi-tenant accounts let a franchise run every location on one platform while keeping each branch's crews, clients, and data separate.",
      },
    ],
    related: [links.tracker, links.multiTenant, links.dashboard],
  },
  "facility-services": {
    h1: "Facility services workforce tracker",
    intro: [
      "Facility services teams — cleaning, building maintenance, and security — work across many buildings, often overnight and out of sight. iNOVAA gives facility managers a live record of which areas were cleaned, which fixtures were repaired, and which patrol rounds were completed, without chasing paper checklists.",
      "Crews wear the iNOVAA Tracker during their shift. It logs hands-on work automatically and tags each task with time and location, so every clean, repair, and patrol lands in the iNOVAA Portal as proof of work the building owner can see.",
    ],
    sectionTitle: "How iNOVAA works for facility services",
    useCases: [
      { title: "Verified cleaning rounds", text: "See which floors and rooms were cleaned, when, and by whom — logged automatically from the wrist." },
      { title: "Maintenance tickets closed on site", text: "Repairs move from open to done with time, location, and photo proof attached." },
      { title: "Security patrol records", text: "Patrol rounds are logged stop by stop, giving clients an auditable record of coverage." },
    ],
    faqs: [
      {
        q: "How does iNOVAA prove a building was cleaned?",
        a: "Each cleaner wears the iNOVAA Tracker, which logs cleaning activity with a time and location. Areas are marked done in the iNOVAA Portal automatically, with optional photos, so managers and clients see verified coverage instead of a signed sheet.",
      },
      {
        q: "Can one account cover many buildings and clients?",
        a: "Yes. Multi-tenant accounts keep each client's buildings, crews, and records separate, while your team sees every site on one dashboard.",
      },
    ],
    related: [links.tracker, links.multiTenant, links.customerPortal],
  },
  manufacturing: {
    h1: "Manufacturing workforce efficiency tracker",
    intro: [
      "On a plant floor, output depends on how much of each shift goes to productive work — and how much disappears into changeovers, waiting on parts, and walking between stations. iNOVAA gives manufacturing teams a clear, automatic picture of where the time goes, line by line and shift by shift.",
      "Operators and maintenance technicians wear the iNOVAA Tracker. It recognizes hands-on work from wrist motion, logs it offline if the plant has poor coverage, and feeds the iNOVAA Portal with efficiency data per person, line, and shift — no manual time sheets.",
    ],
    sectionTitle: "How iNOVAA works for manufacturers",
    useCases: [
      { title: "Changeover visibility", text: "See exactly how long each changeover takes and where time is lost between runs." },
      { title: "Maintenance proof of work", text: "Preventive maintenance tasks are logged with time and location, building a record for every machine." },
      { title: "Shift-by-shift efficiency", text: "Compare active work, material handling, and idle time across lines and shifts." },
    ],
    faqs: [
      {
        q: "Does iNOVAA replace our MES or ERP?",
        a: "No. iNOVAA measures how your workforce spends its time on the floor and connects to the tools you already run. It adds the people side of the picture that machine data doesn't capture.",
      },
      {
        q: "Will the tracker get in the way of operators?",
        a: "It's a lightweight, IP65-rated wristband that works automatically — operators don't need to press anything or use a phone to log their work.",
      },
    ],
    related: [links.tracker, links.dashboard, links.connectors],
  },
  construction: {
    h1: "Construction crew tracker & site progress",
    intro: [
      "Construction runs on crews and subcontractors spread across active sites, where progress is hard to see until something is late. iNOVAA gives general contractors and specialty trades a live view of who is on which site, what stage the work is in, and how the day's hours are actually spent.",
      "Crews wear the iNOVAA Tracker on site. It logs hands-on work automatically, keeps recording without signal on remote or underground sites, and syncs to the iNOVAA Portal — so project managers see verified progress without waiting for end-of-day reports.",
    ],
    sectionTitle: "How iNOVAA works for construction teams",
    useCases: [
      { title: "Crew location & progress", text: "See which crews are on which site and which stages are moving, updated live from the field." },
      { title: "Subcontractor accountability", text: "Give every trade the same verified record of time on site and work completed." },
      { title: "Safety records on the job", text: "Toolbox talks, PPE checks, and hazards are logged alongside the work itself." },
    ],
    faqs: [
      {
        q: "Does it work on sites with no signal?",
        a: "Yes. The iNOVAA Tracker is offline-first — it keeps logging work on remote, underground, or high-rise sites and syncs as soon as it's back in range.",
      },
      {
        q: "Can subcontractors use iNOVAA too?",
        a: "Yes. Each subcontractor can have its own crews and records while the general contractor sees the combined progress across the whole project.",
      },
    ],
    related: [links.tracker, links.dashboard, links.multiTenant],
  },
  healthcare: {
    h1: "Healthcare support & home care visit tracker",
    intro: [
      "Hospital support staff, clinic teams, and home care aides keep care running — moving equipment, turning over rooms, and visiting clients at home. iNOVAA gives operations leaders a verified record of those tasks and visits, so staffing and scheduling decisions rest on real data.",
      "Team members wear the iNOVAA Tracker, which logs activity and location only — it doesn't collect patient information. Every task and visit syncs to the iNOVAA Portal with a timestamp, giving coordinators proof that each round and home visit happened as scheduled.",
    ],
    sectionTitle: "How iNOVAA works for healthcare teams",
    useCases: [
      { title: "Home care visit verification", text: "Confirm each home visit with arrival time, duration, and location — no phone check-ins needed." },
      { title: "Support task tracking", text: "Equipment transport, room turnover, and restocking are logged automatically across wards and clinics." },
      { title: "Fair workload planning", text: "See how time splits between care support, walking, and waiting to balance workloads across the team." },
    ],
    faqs: [
      {
        q: "Does the tracker collect patient or health data?",
        a: "No. The iNOVAA Tracker records the wearer's work activity, time, and location. It doesn't collect patient information.",
      },
      {
        q: "How does iNOVAA verify a home care visit?",
        a: "The aide's tracker logs arrival, time on site, and departure at the client's address. The visit appears in the iNOVAA Portal with a timestamp, so coordinators can confirm it without calling.",
      },
    ],
    related: [links.tracker, links.dashboard, links.customerPortal],
  },
  retail: {
    h1: "Retail & merchandising team tracker",
    intro: [
      "Retail standards are only as good as the last visit — the reset that was supposed to happen, the delivery that needed shelving, the branch that needed an audit. iNOVAA gives retail operations and merchandising teams a verified record of that work across every store.",
      "Store and merchandising teams wear the iNOVAA Tracker while they work. It logs stocking, resets, and display builds automatically with time and location, and the iNOVAA Portal shows head office which stores are done, in progress, or at risk.",
    ],
    sectionTitle: "How iNOVAA works for retail teams",
    useCases: [
      { title: "Planogram & reset compliance", text: "Every reset is logged with time on task and compliance photos, store by store." },
      { title: "Delivery intake & stocking", text: "See how long deliveries take to reach the shelf and where stockroom time goes." },
      { title: "Multi-branch visibility", text: "Compare stores and field merchandisers on one dashboard, with each branch's data kept separate." },
    ],
    faqs: [
      {
        q: "Can iNOVAA track merchandisers visiting many stores?",
        a: "Yes. Each merchandiser's tracker logs arrival, work, and departure at every store, so visit schedules and time on site are verified automatically.",
      },
      {
        q: "Does it show head office which stores are compliant?",
        a: "Yes. The iNOVAA Portal shows reset and visit status for every branch, with photos attached to each completed task.",
      },
    ],
    related: [links.tracker, links.multiTenant, links.dashboard],
  },
  "home-services": {
    h1: "Home & commercial services field tracker",
    intro: [
      "IT support, locksmiths, handyman crews, duct cleaners, pest control, and landscapers all share the same challenge: technicians work alone at customers' homes and businesses, and the office can't see what happened until the invoice. iNOVAA gives service businesses a verified record of every call-out.",
      "Technicians wear the iNOVAA Tracker on each job. It logs arrival, hands-on work, and departure automatically, and the iNOVAA Portal turns that into proof of work you can share with customers and a live view of every technician's day.",
    ],
    sectionTitle: "How iNOVAA works for service businesses",
    useCases: [
      { title: "Proof of every call-out", text: "Each visit is logged with arrival time, time on the job, and before/after photos." },
      { title: "Live technician dispatch", text: "See which technician is on which job and who's free next, updated from the field." },
      { title: "Fair job costing", text: "Know how long each job type really takes — duct cleaning, pest treatment, lock change — to price it right." },
    ],
    faqs: [
      {
        q: "Which service trades does iNOVAA support?",
        a: "Any trade that works at a customer's home or business — IT support, locksmiths, handyman services, duct cleaning, pest control, landscaping, and more.",
      },
      {
        q: "Can customers see proof of the work?",
        a: "Yes. Customers can receive a record of their visit with time on site and photos through the customer portal.",
      },
    ],
    related: [links.tracker, links.customerPortal, links.landscaping],
  },
  "public-sector": {
    h1: "Public sector field crew tracker",
    intro: [
      "Municipal works, campus facilities, and government site crews are accountable to the public — for how time is spent and whether work orders were completed. iNOVAA gives public sector teams an auditable, automatic record of field work across every site.",
      "Crews wear the iNOVAA Tracker on their rounds. It logs hands-on work with time and location, works offline in the field, and syncs to the iNOVAA Portal, so supervisors can report on completed work orders and crew utilization with verified data.",
    ],
    sectionTitle: "How iNOVAA works for public sector teams",
    useCases: [
      { title: "Auditable work orders", text: "Every work order closes with time, location, and photo proof — ready for audits and public reporting." },
      { title: "Coverage across many sites", text: "See which parks, streets, campuses, and buildings were serviced, and which are overdue." },
      { title: "Safety and permit records", text: "Traffic management, confined-space permits, and PPE checks are logged with the job." },
    ],
    faqs: [
      {
        q: "Does iNOVAA produce records suitable for audits?",
        a: "Yes. Each task is logged with a timestamp, location, and the crew member who did it, creating an auditable trail for every work order.",
      },
      {
        q: "Can different departments use one platform?",
        a: "Yes. Multi-tenant accounts let departments or campuses run separately, while leadership sees the combined picture.",
      },
    ],
    related: [links.tracker, links.multiTenant, links.dashboard],
  },
};
