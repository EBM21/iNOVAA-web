import SplitHero from "@/components/ui/SplitHero";
import PortalHeroVisual from "@/components/PortalHeroVisual";
import PortalShowcase from "@/components/PortalShowcase";
import PlatformGrid from "@/components/PlatformGrid";
import TrustSection from "@/components/TrustSection";
import CTASection from "@/components/CTASection";
import RelatedLinks from "@/components/RelatedLinks";
import JsonLd from "@/components/JsonLd";
import FaqSection from "@/components/FaqSection";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema, portalSoftwareSchema } from "@/lib/schema";
import { links, platformFaqs } from "@/lib/content";
import TrustBadgeRow from "@/components/ui/TrustBadgeRow";
import IconChipRow from "@/components/ui/IconChipRow";
import { MapPin, RefreshCw, Building2, WifiOff, Sun, Thermometer, Truck, Sparkles, Trees } from "lucide-react";

const trustBadges = [
  { icon: <WifiOff className="h-4 w-4 text-white" strokeWidth={2} />, label: "Offline-First" },
  { icon: <MapPin className="h-4 w-4 text-white" strokeWidth={2} />, label: "Live GPS Tracking" },
  { icon: <RefreshCw className="h-4 w-4 text-white" strokeWidth={2} />, label: "Real-Time Sync" },
  { icon: <Building2 className="h-4 w-4 text-white" strokeWidth={2} />, label: "Multi-Tenant" },
];

const heroStats = [
  { label: "Portal Modules", value: "7" },
  { label: "Tracker Sync", value: "Live" },
  { label: "Runs In", value: "Browser" },
];

const fields = [
  { icon: <Sun className="h-7 w-7" strokeWidth={1.75} />, label: "Solar Maintenance", href: "/industries/solar" },
  { icon: <Thermometer className="h-7 w-7" strokeWidth={1.75} />, label: "HVAC", href: "/industries/hvac" },
  { icon: <Truck className="h-7 w-7" strokeWidth={1.75} />, label: "Delivery & Logistics", href: "/industries/logistics" },
  { icon: <Sparkles className="h-7 w-7" strokeWidth={1.75} />, label: "Hospitality Cleaning", href: "/industries/hospitality" },
  { icon: <Trees className="h-7 w-7" strokeWidth={1.75} />, label: "Landscaping", href: "/industries/landscaping" },
];

export const metadata = pageMetadata("/platform");

export default function PlatformPage() {
  return (
    <>
      <JsonLd data={[portalSoftwareSchema, breadcrumbSchema("/platform")]} />
      <SplitHero
        eyebrow="Platform · iNOVAA Portal"
        title={
          <>
            The software that turns Tracker data into <span className="gradient-text">decisions.</span>
          </>
        }
        subhead="The iNOVAA Portal is the workforce efficiency dashboard at the center of the platform — live jobs, team efficiency, schedules, and attendance, fed automatically by the wearable Tracker."
        secondaryLabel="See the Portal"
        secondaryHref="#portal"
        stats={heroStats}
        dark
        visual={<PortalHeroVisual />}
      />
      <div className="mx-auto max-w-7xl px-6 pt-8 lg:px-8">
        <TrustBadgeRow badges={trustBadges} />
      </div>
      <PortalShowcase index="§01" title="Inside the iNOVAA Portal" />
      <PlatformGrid />
      <TrustSection />
      <IconChipRow eyebrow="Works everywhere" title="One platform," accent="every field" items={fields} beige />
      <FaqSection title="iNOVAA Portal questions, answered" faqs={platformFaqs} />
      <RelatedLinks title="Inside the iNOVAA Portal" links={[links.dashboard, links.tracker, links.customerPortal, links.multiTenant, links.howItWorks, links.industries]} />
      <CTASection />
    </>
  );
}
