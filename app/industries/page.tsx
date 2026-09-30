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
import IndustryCards from "@/components/IndustryCards";
import { industries } from "@/lib/industries";
import { industryGroups } from "@/lib/data";

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
        subhead="One live record, every playbook."
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
      <IndustryCards title="Ten fields," accent="one platform" items={industries} />
      <IndustryPortalDashboard slug="hvac" />
      <section className="bg-surface-2 pb-24 pt-4">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Reveal>
            <IndustriesCarousel />
          </Reveal>
        </div>
      </section>
      <RelatedLinks title="Explore iNOVAA by industry" links={industryGroups.map((g) => links[g.slug])} />
      <CTASection />
    </>
  );
}
