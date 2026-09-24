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
    label: "iNOVAA Portal — field service software",
    text: "Field service management software that puts dispatch, crews, and customers on one live job record.",
  },
  dashboard: {
    href: "/platform/field-ops-dashboard",
    label: "Field ops dashboard",
    text: "Every job, every crew, and every GPS-tagged status event on one live map.",
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
} satisfies Record<string, RelatedLink>;

// ---------------------------------------------------------------------------
// FAQs — rendered visibly and emitted as FAQPage JSON-LD from the same data.
// ---------------------------------------------------------------------------
export const homeFaqs: Faq[] = [
  {
    q: "What is an IoT wearable tracker for field workers?",
    a: "An IoT wearable tracker for field workers is a small, connected device worn on the wrist that records what a technician is doing on site. The iNOVAA Tracker uses a motion sensor and on-device machine learning to recognize work activity, then syncs that record to the iNOVAA Portal so managers and customers can see verified progress without manual check-ins.",
  },
  {
    q: "How does iNOVAA verify field work automatically?",
    a: "The iNOVAA Tracker classifies hand and arm motion on the wrist, tags each activity with a time and GPS location, and stores it even with no signal. When the device reconnects over Bluetooth, those events move the job through its stages — reached site, work started, work finished — creating automatic proof of work that feeds the dashboard, customer portal, and signed service report.",
  },
  {
    q: "Is iNOVAA the same company as NOVAA?",
    a: "Yes. iNOVAA was previously known as NOVAA. The company, team, iNOVAA Tracker wearable, and iNOVAA Portal field service software are the same — only the name changed.",
  },
  {
    q: "Which industries use iNOVAA?",
    a: "iNOVAA was built inside a solar maintenance company and now runs solar panel cleaning and O&M, HVAC, delivery and logistics, hospitality cleaning, and landscaping crews. Any team that does hands-on work at a customer site can use it as a field workforce tracker.",
  },
  {
    q: "Does the iNOVAA Tracker work without cell signal?",
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
};
