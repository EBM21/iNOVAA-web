// Single source of truth for brand + URL facts used by metadata, sitemap, and JSON-LD.
// Set NEXT_PUBLIC_SITE_URL in each environment; the fallback is the production domain.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://inovaa.ai").replace(/\/$/, "");

export const site = {
  name: "iNOVAA",
  legalName: "iNOVAA, Inc.",
  alternateNames: ["NOVAA", "iNOVAA Tracker", "iNOVAA Portal"],
  tagline: "AI-Powered Field Workforce Wearable & Tracker",
  description:
    "iNOVAA (formerly NOVAA) builds the iNOVAA Tracker, an IoT wearable that turns technicians' hand motions into automatic proof of work, and the iNOVAA Portal, field service management software for solar, HVAC, logistics, hospitality, and landscaping teams.",
  email: "hello@inovaa.ai",
  bookingUrl: "https://cal.inovaa.ai/intro-call",
  logo: "/icon.png",
  ogImage: "/og-image.png",
  // Add the real profile URLs (LinkedIn, X, Instagram, YouTube…) here — they feed Organization.sameAs
  // and the footer social icons. Empty entries are skipped everywhere.
  social: {
    linkedin: "",
    x: "",
    instagram: "",
  },
} as const;

export const sameAs = Object.values(site.social).filter(Boolean);

export const absoluteUrl = (path = "/") => `${SITE_URL}${path === "/" ? "" : path}`;
