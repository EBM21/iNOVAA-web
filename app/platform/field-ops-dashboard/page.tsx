import SplitHero from "@/components/ui/SplitHero";
import PortalHeroVisual from "@/components/PortalHeroVisual";
import PortalShowcase from "@/components/PortalShowcase";
import CapabilityList from "@/components/CapabilityList";
import ProductDemo from "@/components/ProductDemo";
import CTASection from "@/components/CTASection";
import RelatedLinks from "@/components/RelatedLinks";
import JsonLd from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { links } from "@/lib/content";
import { MapPin, Radar, ClipboardCheck, Bell } from "lucide-react";

const items = [
  { icon: <Radar className="h-4.5 w-4.5" strokeWidth={2} />, title: "Live job stages", text: "Scheduled → Reached Site → Work Started → Work Finished → Completed, updating automatically." },
  { icon: <MapPin className="h-4.5 w-4.5" strokeWidth={2} />, title: "GPS-tagged events", text: "Every stage change carries a location, a timestamp, and the technician who triggered it." },
  { icon: <ClipboardCheck className="h-4.5 w-4.5" strokeWidth={2} />, title: "Per-site diagrams", text: "Pin-drop annotations mark exactly which panel, unit, or zone needs attention." },
  { icon: <Bell className="h-4.5 w-4.5" strokeWidth={2} />, title: "Real-time alerts", text: "Dispatch is notified the moment a job goes at-risk or blocked — not at end of day." },
];

const heroStats = [
  { label: "Portal Modules", value: "7" },
  { label: "Tracker Sync", value: "Live" },
  { label: "Runs In", value: "Browser" },
];

export const metadata = pageMetadata("/platform/field-ops-dashboard");

export default function FieldOpsDashboardPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema("/platform/field-ops-dashboard")} />
      <SplitHero
        eyebrow="Platform · iNOVAA Portal Dashboard"
        title="Field ops dashboard: every job and crew, one live view"
        subhead="The iNOVAA Portal turns Tracker data into live job status, team schedules, and completion rates — in one view."
        secondaryLabel="See the screens"
        secondaryHref="#portal"
        stats={heroStats}
        dark
        visual={<PortalHeroVisual screen="schedule" />}
      />
      <CapabilityList items={items} />
      <PortalShowcase title="Real screens from the iNOVAA Portal" />
      <ProductDemo />
      <RelatedLinks title="Related to the field ops dashboard" links={[links.tracker, links.customerPortal, links.hvac]} />
      <CTASection />
    </>
  );
}
