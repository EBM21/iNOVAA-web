import SplitHero from "@/components/ui/SplitHero";
import TrackerHeroVideo from "@/components/TrackerHeroVideo";
import DeviceAnnotation from "@/components/ui/DeviceAnnotation";
import ConnectorsWall from "@/components/ConnectorsWall";
import CTASection from "@/components/CTASection";

const heroStats = [
  { label: "Battery Life", value: "7 Days" },
  { label: "Dust / Water", value: "IP65" },
  { label: "Connectivity", value: "BLE 5.3" },
];

export default function ConnectorsPage() {
  return (
    <>
      <SplitHero
        eyebrow="Connectors"
        title="Plug into the stack you already run"
        subhead="Calendars, payments, and CRMs — no double entry."
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
      <ConnectorsWall />
      <CTASection />
    </>
  );
}
