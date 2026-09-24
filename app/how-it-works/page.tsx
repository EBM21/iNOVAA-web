import SplitHero from "@/components/ui/SplitHero";
import TrackerHeroVideo from "@/components/TrackerHeroVideo";
import DeviceAnnotation from "@/components/ui/DeviceAnnotation";
import HowItWorks from "@/components/HowItWorks";
import WalkthroughSection from "@/components/WalkthroughSection";
import ProductDemo from "@/components/ProductDemo";
import CTASection from "@/components/CTASection";
import RelatedLinks from "@/components/RelatedLinks";
import JsonLd from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { links } from "@/lib/content";

const heroStats = [
  { label: "Battery Life", value: "7 Days" },
  { label: "Dust / Water", value: "IP65" },
  { label: "Connectivity", value: "BLE 5.3" },
];

export const metadata = pageMetadata("/how-it-works");

export default function HowItWorksPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema("/how-it-works")} />
      <SplitHero
        eyebrow="How it works"
        title="How automatic proof of work runs, scheduled to signed off"
        subhead="Every suggestion traceable back to what it read."
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
      <HowItWorks />
      <ProductDemo />
      <WalkthroughSection />
      <RelatedLinks title="Go deeper" links={[links.tracker, links.dashboard, links.customerPortal]} />
      <CTASection />
    </>
  );
}
