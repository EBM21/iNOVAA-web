import SplitHero from "@/components/ui/SplitHero";
import TrackerHeroVideo from "@/components/TrackerHeroVideo";
import DeviceAnnotation from "@/components/ui/DeviceAnnotation";
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
  { label: "Battery Life", value: "7 Days" },
  { label: "Dust / Water", value: "IP65" },
  { label: "Connectivity", value: "BLE 5.3" },
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
        eyebrow="Platform"
        title="Field service management software, one job record"
        subhead="Dispatch, crews, customers, and operators — all on the same live record."
        secondaryLabel="See how it works"
        secondaryHref="/how-it-works"
        stats={heroStats}
        dark
        visual={
          <div className="relative h-full w-full">
            <TrackerHeroVideo />
            <DeviceAnnotation x="4%" y="18%" dir="left" title="Dual-sensor IMU" text="Motion + orientation" delay={0.8} />
            <DeviceAnnotation x="80%" y="62%" dir="left" title="Side action button" text="Manual event tag" delay={1} />
          </div>
        }
      />
      <div className="mx-auto max-w-7xl px-6 pt-8 lg:px-8">
        <TrustBadgeRow badges={trustBadges} />
      </div>
      <PlatformGrid />
      <TrustSection />
      <IconChipRow eyebrow="Works everywhere" title="One platform," accent="every field" items={fields} beige />
      <FaqSection title="iNOVAA Portal questions, answered" faqs={platformFaqs} />
      <RelatedLinks title="Inside the iNOVAA Portal" links={[links.tracker, links.dashboard, links.customerPortal, links.multiTenant, links.howItWorks, links.industries]} />
      <CTASection />
    </>
  );
}
