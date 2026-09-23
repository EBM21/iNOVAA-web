import SplitHero from "@/components/ui/SplitHero";
import TrackerHeroVideo from "@/components/TrackerHeroVideo";
import DeviceAnnotation from "@/components/ui/DeviceAnnotation";
import CapabilityList from "@/components/CapabilityList";
import ProductDemo from "@/components/ProductDemo";
import CTASection from "@/components/CTASection";
import { MapPin, Radar, ClipboardCheck, Bell } from "lucide-react";

const items = [
  { icon: <Radar className="h-4.5 w-4.5" strokeWidth={2} />, title: "Live job stages", text: "Scheduled → Reached Site → Work Started → Work Finished → Completed, updating automatically." },
  { icon: <MapPin className="h-4.5 w-4.5" strokeWidth={2} />, title: "GPS-tagged events", text: "Every stage change carries a location, a timestamp, and the technician who triggered it." },
  { icon: <ClipboardCheck className="h-4.5 w-4.5" strokeWidth={2} />, title: "Per-site diagrams", text: "Pin-drop annotations mark exactly which panel, unit, or zone needs attention." },
  { icon: <Bell className="h-4.5 w-4.5" strokeWidth={2} />, title: "Real-time alerts", text: "Dispatch is notified the moment a job goes at-risk or blocked — not at end of day." },
];

const heroStats = [
  { label: "Battery Life", value: "7 Days" },
  { label: "Dust / Water", value: "IP65" },
  { label: "Connectivity", value: "BLE 5.3" },
];

export default function FieldOpsDashboardPage() {
  return (
    <>
      <SplitHero
        eyebrow="Platform · Field Ops Dashboard"
        title="Every job, every crew, one live map"
        subhead="Staged progress and GPS-tagged status events, in one view."
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
      <CapabilityList items={items} />
      <ProductDemo />
      <CTASection />
    </>
  );
}
