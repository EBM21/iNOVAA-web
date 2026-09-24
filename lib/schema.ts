import { absoluteUrl, sameAs, site, SITE_URL } from "./site";
import { breadcrumbTrail, type RoutePath } from "./seo";

export type Faq = { q: string; a: string };

const ORG_ID = `${SITE_URL}/#organization`;

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: site.name,
  legalName: site.legalName,
  alternateName: site.alternateNames,
  url: absoluteUrl("/"),
  logo: absoluteUrl(site.logo),
  description: site.description,
  email: site.email,
  ...(sameAs.length > 0 && { sameAs }),
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: site.email,
      url: absoluteUrl("/contact"),
      availableLanguage: ["English"],
    },
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: site.name,
  alternateName: ["NOVAA", "iNOVAA field service platform"],
  url: absoluteUrl("/"),
  publisher: { "@id": ORG_ID },
};

export const trackerProductSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": `${absoluteUrl("/platform/inovaa-tracker")}#product`,
  name: "iNOVAA Tracker",
  description:
    "A wrist-worn IoT wearable tracker for field technicians that classifies work activity on-device and logs automatic proof of work, even with zero signal on site.",
  image: [absoluteUrl("/tracker-rock-hero.png"), absoluteUrl("/tracker-parts-diagram.png"), absoluteUrl("/tracker-detail-wrist.png")],
  url: absoluteUrl("/platform/inovaa-tracker"),
  category: "IoT wearable activity tracker",
  brand: { "@type": "Brand", name: site.name },
  manufacturer: { "@id": ORG_ID },
  additionalProperty: [
    { "@type": "PropertyValue", name: "Battery life", value: "Up to 7 days" },
    { "@type": "PropertyValue", name: "Ingress protection", value: "IP65" },
    { "@type": "PropertyValue", name: "Connectivity", value: "Bluetooth Low Energy 5.3" },
    { "@type": "PropertyValue", name: "Microcontroller", value: "XIAO ESP32C3" },
    { "@type": "PropertyValue", name: "Motion sensing", value: "MPU6050 / MPU6500 IMU" },
  ],
};

export const portalSoftwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${absoluteUrl("/platform")}#software`,
  name: "iNOVAA Portal",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Field service management software",
  operatingSystem: "Web browser",
  description:
    "Field service management software with a live field ops dashboard, customer portal, and multi-tenant custom branding, fed by iNOVAA Tracker proof-of-work data.",
  url: absoluteUrl("/platform"),
  publisher: { "@id": ORG_ID },
  featureList: [
    "Live job stages and GPS-tagged status events",
    "Automatic proof of work from the iNOVAA Tracker",
    "Customer portal with technician ETA, photos, and signed reports",
    "Multi-tenant, custom-branded client portals",
    "Offline-first sync for field crews",
  ],
};

export function breadcrumbSchema(path: RoutePath) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbTrail(path).map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function faqSchema(faqs: readonly Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
