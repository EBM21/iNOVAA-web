import SplitHero from "@/components/ui/SplitHero";
import TrackerHeroVideo from "@/components/TrackerHeroVideo";
import DeviceAnnotation from "@/components/ui/DeviceAnnotation";
import Reveal from "@/components/ui/Reveal";
import CTASection from "@/components/CTASection";
import RelatedLinks from "@/components/RelatedLinks";
import JsonLd from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { links } from "@/lib/content";
import IndustriesCarousel from "@/components/IndustriesCarousel";
import IndustryPortalDashboard from "@/components/IndustryPortalDashboard";
import IconChipRow from "@/components/ui/IconChipRow";
import { Sun, Thermometer, Truck, Sparkles, Trees } from "lucide-react";

const fields = [
  { icon: <Sun className="h-7 w-7" strokeWidth={1.75} />, label: "Solar Maintenance", href: "/industries/solar" },
  { icon: <Thermometer className="h-7 w-7" strokeWidth={1.75} />, label: "HVAC", href: "/industries/hvac" },
  { icon: <Truck className="h-7 w-7" strokeWidth={1.75} />, label: "Delivery & Logistics", href: "/industries/logistics" },
  { icon: <Sparkles className="h-7 w-7" strokeWidth={1.75} />, label: "Hospitality Cleaning", href: "/industries/hospitality" },
  { icon: <Trees className="h-7 w-7" strokeWidth={1.75} />, label: "Landscaping", href: "/industries/landscaping" },
];

const heroStats = [
  { label: "Battery Life", value: "7 Days" },
  { label: "Dust / Water", value: "IP65" },
  { label: "Connectivity", value: "BLE 5.3" },
];

export const metadata = pageMetadata("/industries");

export default function IndustriesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema("/industries")} />
      <SplitHero
        eyebrow="Industries"
        title="A field workforce tracker for crews that work on-site"
        subhead="One live record, five different playbooks."
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
      <IconChipRow title="Five fields," accent="one platform" items={fields} beige />
      <IndustryPortalDashboard slug="hvac" />
      <section className="bg-surface-2 pb-24 pt-4">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Reveal>
            <IndustriesCarousel />
          </Reveal>
        </div>
      </section>
      <RelatedLinks title="Explore iNOVAA by industry" links={[links.solar, links.hvac, links.logistics, links.hospitality, links.landscaping, links.tracker]} />
      <CTASection />
    </>
  );
}
