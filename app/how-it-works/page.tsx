import SplitHero from "@/components/ui/SplitHero";
import TrackerHeroVideo from "@/components/TrackerHeroVideo";
import DeviceAnnotation from "@/components/ui/DeviceAnnotation";
import HowItWorks from "@/components/HowItWorks";
import WalkthroughSection from "@/components/WalkthroughSection";
import ProductDemo from "@/components/ProductDemo";
import CTASection from "@/components/CTASection";

const heroStats = [
  { label: "Battery Life", value: "7 Days" },
  { label: "Dust / Water", value: "IP65" },
  { label: "Connectivity", value: "BLE 5.3" },
];

export default function HowItWorksPage() {
  return (
    <>
      <SplitHero
        eyebrow="How it works"
        title="Scheduled to signed off, with a trail behind it"
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
      <CTASection />
    </>
  );
}
