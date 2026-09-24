import type { Metadata, MetadataRoute } from "next";
import { absoluteUrl, site } from "./site";

type RouteSeo = {
  title: string;
  description: string;
  /** Short label used in BreadcrumbList. */
  crumb: string;
  /** Parent path for breadcrumbs; omit for top-level pages. */
  parent?: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
  /** Placeholder pages stay out of the index and the sitemap until they have real content. */
  noindex?: boolean;
};

// Every public route, its unique <title>/description, and where it sits in the site tree.
// sitemap.ts, breadcrumbs, and each page's metadata all read from this map, so adding a page here
// is the one step that wires it into SEO.
export const routes = {
  "/": {
    title: "iNOVAA — AI-Powered Field Workforce Wearable & Tracker",
    description:
      "iNOVAA (formerly NOVAA) is the IoT wearable tracker that turns field work into automatic proof of work. See live jobs, crews, and efficiency. Book a demo.",
    crumb: "Home",
    changeFrequency: "weekly",
    priority: 1,
  },
  "/platform": {
    title: "Field Service Management Software Platform | iNOVAA",
    description:
      "The iNOVAA Portal is field service management software that joins dispatch, crews, customers, and wearable tracker data on one live job record. Book a demo.",
    crumb: "Platform",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  "/platform/inovaa-tracker": {
    title: "IoT Wearable Tracker for Field Workers | iNOVAA Tracker",
    description:
      "The iNOVAA Tracker is a wrist-worn activity tracker for technicians that logs proof of work offline — IP65, 7-day battery, BLE 5.3. See specs & book a demo.",
    crumb: "iNOVAA Tracker",
    parent: "/platform",
    changeFrequency: "monthly",
    priority: 0.95,
  },
  "/platform/field-ops-dashboard": {
    title: "Field Ops Dashboard & Live Workforce Tracking | iNOVAA",
    description:
      "Track every job and crew on one live map. iNOVAA's field ops dashboard shows staged progress, GPS-tagged events, and at-risk alerts in real time. See it live.",
    crumb: "Field Ops Dashboard",
    parent: "/platform",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  "/platform/customer-portal": {
    title: "Field Service Customer Portal with Live Job Status | iNOVAA",
    description:
      "Give clients a customer portal with live job status, technician ETAs, before/after photos, and signed service reports — no more check-in calls. Book a demo.",
    crumb: "Customer Portal",
    parent: "/platform",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  "/platform/multi-tenant": {
    title: "Multi-Tenant, White-Label Field Service Platform | iNOVAA",
    description:
      "Run every client company on one multi-tenant field service platform with custom branding, isolated data, and role-based portals. Talk to the iNOVAA team.",
    crumb: "Multi-Tenant & Custom Branding",
    parent: "/platform",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  "/industries": {
    title: "Field Workforce Tracker for Every Industry | iNOVAA",
    description:
      "See how solar, HVAC, logistics, hospitality, and landscaping crews use the iNOVAA field workforce tracker for automatic proof of work. Find your industry.",
    crumb: "Industries",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  "/industries/solar": {
    title: "Solar Panel Cleaning & O&M Workforce Tracker | iNOVAA",
    description:
      "Verify every solar panel cleaning and O&M visit automatically. iNOVAA tracks crews across distributed sites, flags low-output rows, and closes signed FSRs.",
    crumb: "Solar & Renewable Maintenance",
    parent: "/industries",
    changeFrequency: "monthly",
    priority: 0.85,
  },
  "/industries/hvac": {
    title: "HVAC Field Service Tracker & Efficiency Dashboard | iNOVAA",
    description:
      "Track HVAC technicians from dispatch to sign-off. iNOVAA logs every rooftop and residential service stage automatically and shares reports with clients.",
    crumb: "HVAC",
    parent: "/industries",
    changeFrequency: "monthly",
    priority: 0.85,
  },
  "/industries/logistics": {
    title: "Delivery & Logistics Proof-of-Visit Tracker | iNOVAA",
    description:
      "Get proof of visit, not just proof of delivery. iNOVAA gives last-mile and route-based logistics teams GPS-tagged stops, photos, and live route status.",
    crumb: "Delivery & Logistics",
    parent: "/industries",
    changeFrequency: "monthly",
    priority: 0.85,
  },
  "/industries/hospitality": {
    title: "Hotel Housekeeping & Cleaning Crew Tracker | iNOVAA",
    description:
      "Track hotel housekeeping and rental turnovers room by room. iNOVAA logs cleaning work automatically and tells the front desk the moment a room is ready.",
    crumb: "Hospitality Cleaning",
    parent: "/industries",
    changeFrequency: "monthly",
    priority: 0.85,
  },
  "/industries/landscaping": {
    title: "Landscaping Crew Tracker & Route Management | iNOVAA",
    description:
      "Track landscaping crews on every recurring route. iNOVAA logs mowing, trimming, and irrigation work automatically and proves each visit to clients.",
    crumb: "Landscaping",
    parent: "/industries",
    changeFrequency: "monthly",
    priority: 0.85,
  },
  "/how-it-works": {
    title: "How Automatic Proof of Work Works for Field Teams | iNOVAA",
    description:
      "See how iNOVAA takes a field job from scheduled to signed off — wearable tracker events, AI job stages, and customer sign-off on one trail. See it in action.",
    crumb: "How it works",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  "/connectors": {
    title: "Field Service Software Integrations & Connectors | iNOVAA",
    description:
      "Connect iNOVAA field service management software to the calendars, payment tools, and CRMs you already run. No double entry for dispatch or crews.",
    crumb: "Connectors",
    changeFrequency: "monthly",
    priority: 0.6,
  },
  "/company": {
    title: "About Us — Built by Field Service Operators | iNOVAA",
    description:
      "iNOVAA (formerly NOVAA) began inside an Arizona solar maintenance company. Learn how field crews shaped our wearable tracker and field service platform.",
    crumb: "Company",
    changeFrequency: "yearly",
    priority: 0.6,
  },
  "/contact": {
    title: "Contact Us & Book a Wearable Tracker Demo | iNOVAA",
    description:
      "Contact the iNOVAA team or book a 20-minute demo of the iNOVAA Tracker and Portal on a job that looks like yours. Email hello@inovaa.ai or pick a time.",
    crumb: "Contact",
    changeFrequency: "yearly",
    priority: 0.7,
  },
  "/legal/privacy": {
    title: "Privacy Policy | iNOVAA",
    description: "How iNOVAA collects, stores, and protects job, crew, and customer data across every tenant on the platform.",
    crumb: "Privacy Policy",
    changeFrequency: "yearly",
    priority: 0.2,
    noindex: true,
  },
  "/legal/terms": {
    title: "Terms of Service | iNOVAA",
    description: "The terms governing use of the iNOVAA platform, portal, and iNOVAA Tracker hardware.",
    crumb: "Terms of Service",
    changeFrequency: "yearly",
    priority: 0.2,
    noindex: true,
  },
  "/legal/data-processing": {
    title: "Data Processing | iNOVAA",
    description: "How tenant data is isolated, processed, and retained across the iNOVAA multi-tenant platform.",
    crumb: "Data Processing",
    changeFrequency: "yearly",
    priority: 0.2,
    noindex: true,
  },
} satisfies Record<string, RouteSeo>;

export type RoutePath = keyof typeof routes;

export function pageMetadata(path: RoutePath): Metadata {
  const r: RouteSeo = routes[path];
  const url = absoluteUrl(path);
  const images = [{ url: site.ogImage, width: 1200, height: 630, alt: `${site.name} — ${site.tagline}` }];

  return {
    title: { absolute: r.title },
    description: r.description,
    alternates: { canonical: url },
    ...(r.noindex && { robots: { index: false, follow: true } }),
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_US",
      url,
      title: r.title,
      description: r.description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: r.title,
      description: r.description,
      images: images.map((i) => i.url),
    },
  };
}

/** Home → parent → page, as {name, path} pairs. */
export function breadcrumbTrail(path: RoutePath) {
  const trail: { name: string; path: string }[] = [];
  let current: string | undefined = path;
  while (current) {
    const r: RouteSeo = routes[current as RoutePath];
    trail.unshift({ name: r.crumb, path: current });
    current = r.parent;
  }
  if (path !== "/") trail.unshift({ name: routes["/"].crumb, path: "/" });
  return trail;
}
